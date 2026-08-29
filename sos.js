/* =====================================
   LIFELINK SOS + SUPABASE
===================================== */

const SUPABASE_URL = "https://fbahuxymejybknrrhepk.supabase.co";

const SUPABASE_KEY = "sb_publishable_Bkk8fEL18bToQEQrMZgJAQ_iqTxmUlJ";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


/* =====================================
   USER LOCATION
===================================== */

let userLatitude = null;
let userLongitude = null;


/* =====================================
   BLOOD COMPATIBILITY
===================================== */

const compatibility = {

    "A+": ["A+", "A-", "O+", "O-"],

    "A-": ["A-", "O-"],

    "B+": ["B+", "B-", "O+", "O-"],

    "B-": ["B-", "O-"],

    "AB+": [
        "A+", "A-",
        "B+", "B-",
        "AB+", "AB-",
        "O+", "O-"
    ],

    "AB-": [
        "A-",
        "B-",
        "AB-",
        "O-"
    ],

    "O+": ["O+", "O-"],

    "O-": ["O-"]

};


/* =====================================
   START APPLICATION
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("🩸 LifeLink SOS started");


    /* =====================================
       TEST SUPABASE CONNECTION
    ===================================== */

    testSupabaseConnection();


    /* =====================================
       START SOS BUTTON
    ===================================== */

    const startSOSButton =
        document.getElementById("startSOS");

    const sosFormSection =
        document.getElementById("sosFormSection");


    if (startSOSButton) {

        startSOSButton.addEventListener("click", () => {

            console.log("🚨 SOS clicked!");

            sosFormSection.classList.remove("hidden");

            sosFormSection.scrollIntoView({
                behavior: "smooth"
            });

        });

    }


    /* =====================================
       GET LOCATION
    ===================================== */

    const locationButton =
        document.getElementById("getLocation");


    if (locationButton) {

        locationButton.addEventListener("click", () => {

            getUserLocation();

        });

    }


    /* =====================================
       ACTIVATE SOS
    ===================================== */

    const activateButton =
        document.getElementById("activateSOS");


    if (activateButton) {

        activateButton.addEventListener("click", async () => {

            await activateSOS();

        });

    }

});


/* =====================================
   TEST SUPABASE
===================================== */

async function testSupabaseConnection() {

    const { data, error } =
        await supabaseClient
            .from("donors")
            .select("*");


    if (error) {

        console.error(
            "❌ Supabase error:",
            error
        );

    } else {

        console.log(
            "✅ Supabase database connected!"
        );

        console.log(
            "🩸 Donors:",
            data
        );

    }

}


/* =====================================
   GET USER LOCATION
===================================== */

function getUserLocation() {

    const status =
        document.getElementById(
            "locationStatus"
        );


    if (!navigator.geolocation) {

        status.textContent =
            "❌ Location is not supported by this browser.";

        return;

    }


    status.textContent =
        "📍 Getting your emergency location...";


    navigator.geolocation.getCurrentPosition(

        function (position) {

            userLatitude =
                position.coords.latitude;

            userLongitude =
                position.coords.longitude;


            status.textContent =
                "✅ Emergency location captured successfully.";

            console.log(
                "📍 Location:",
                userLatitude,
                userLongitude
            );

        },


        function (error) {

            console.error(error);

            status.textContent =
                "❌ Unable to get location. Please allow location access.";

        },


        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );

}


/* =====================================
   ACTIVATE SOS
===================================== */

async function activateSOS() {

    const bloodGroup =
        document.getElementById(
            "bloodGroup"
        ).value;


    const hospital =
        document.getElementById(
            "hospital"
        ).value.trim();


    const urgencyElement =
        document.querySelector(
            'input[name="urgency"]:checked'
        );


    /* VALIDATION */

    if (!bloodGroup) {

        alert(
            "Please select the required blood group."
        );

        return;

    }


    if (!hospital) {

        alert(
            "Please enter the hospital name."
        );

        return;

    }


    if (!urgencyElement) {

        alert(
            "Please select the emergency level."
        );

        return;

    }


    const urgency =
        urgencyElement.value;


    const activateButton =
        document.getElementById(
            "activateSOS"
        );


    activateButton.disabled = true;

    activateButton.textContent =
        "⏳ ACTIVATING SOS...";


    /* =====================================
       SAVE REQUEST TO SUPABASE
    ===================================== */

    const { data, error } =
        await supabaseClient
            .from("emergency_requests")
            .insert([

                {

                    blood_group: bloodGroup,

                    hospital: hospital,

                    urgency: urgency,

                    latitude: userLatitude,

                    longitude: userLongitude,

                    status: "ACTIVE"

                }

            ])
            .select();


    if (error) {

        console.error(
            "❌ SOS save error:",
            error
        );

        alert(
            "Unable to save emergency request: " +
            error.message
        );


        activateButton.disabled = false;

        activateButton.textContent =
            "🚨 ACTIVATE EMERGENCY SOS";

        return;

    }


    console.log(
        "🚨 SOS saved successfully:",
        data
    );


    /* CREATE REQUEST OBJECT */

    const sosRequest = {

        id: data[0].id,

        bloodGroup: bloodGroup,

        hospital: hospital,

        urgency: urgency,

        latitude: userLatitude,

        longitude: userLongitude,

        status: "ACTIVE"

    };


    /* SHOW RESULT */

    showSOSResult(sosRequest);


    /* FIND REAL DONORS */

    await findCompatibleDonors(
        sosRequest
    );


    /* SHOW ALERT STATUS */

    showEmergencyAlertStatus(
        sosRequest
    );


    activateButton.textContent =
        "🚨 SOS ACTIVATED";


}


/* =====================================
   SHOW SOS RESULT
===================================== */

function showSOSResult(request) {

    const result =
        document.getElementById(
            "sosResult"
        );


    result.classList.remove("hidden");


    document.getElementById(
        "resultBlood"
    ).textContent =
        request.bloodGroup;


    document.getElementById(
        "resultHospital"
    ).textContent =
        request.hospital;


    document.getElementById(
        "resultUrgency"
    ).textContent =
        request.urgency;


    document.getElementById(
        "resultLocation"
    ).textContent =
        request.latitude !== null
            ? "Current location captured"
            : "Location not available";


    result.scrollIntoView({

        behavior: "smooth"

    });

}


/* =====================================
   FIND REAL DONORS FROM SUPABASE
===================================== */

async function findCompatibleDonors(request) {

    const status =
        document.getElementById(
            "matchingStatus"
        );


    const results =
        document.getElementById(
            "donorResults"
        );


    status.textContent =
        "🤖 LifeLink AI is searching the donor network...";


    results.innerHTML = "";


    const compatibleGroups =
        compatibility[
            request.bloodGroup
        ] || [];


    /* GET REAL DONORS */

    const { data: donors, error } =
        await supabaseClient
            .from("donors")
            .select("*")
            .eq("available", true);


    if (error) {

        console.error(
            "❌ Donor search error:",
            error
        );


        status.textContent =
            "❌ Unable to search the donor network.";

        return;

    }


    /* FILTER BLOOD COMPATIBILITY */

    const matches =
        donors.filter((donor) => {

            return compatibleGroups.includes(
                donor.blood_group
            );

        });


    /* SORT BY DISTANCE */

    matches.forEach((donor) => {

        donor.distance =
            calculateDistance(

                request.latitude,

                request.longitude,

                donor.latitude,

                donor.longitude

            );

    });


    matches.sort((a, b) => {

        return a.distance - b.distance;

    });


    /* SHOW RESULT */

    status.textContent =
        `✅ Found ${matches.length} compatible available donor(s).`;


    if (matches.length === 0) {

        results.innerHTML = `

            <div class="no-donors">

                <h3>⚠️ No compatible donors found</h3>

                <p>
                    LifeLink could not find an available
                    compatible donor in the current network.
                </p>

            </div>

        `;

        return;

    }


    /* CREATE DONOR CARDS */

    matches.forEach((donor, index) => {

        const card =
            document.createElement("div");


        card.className =
            "donor-card";


        const distanceText =
            Number.isFinite(donor.distance)
                ? donor.distance.toFixed(1) + " km away"
                : "Location unavailable";


        card.innerHTML = `

            <div>

                <strong>
                    🩸 ${donor.blood_group}
                </strong>

                <h3>
                    ${donor.name || "Registered Donor"}
                </h3>

                <p>
                    🟢 Available for donation
                </p>

            </div>


            <div>

                📍 ${distanceText}

                <p>
                    Match Priority: #${index + 1}
                </p>

            </div>

        `;


        results.appendChild(card);

    });


}


/* =====================================
   CALCULATE DISTANCE
===================================== */

function calculateDistance(
    lat1,
    lon1,
    lat2,
    lon2
) {

    if (

        lat1 === null ||
        lon1 === null ||
        lat2 === null ||
        lon2 === null

    ) {

        return Infinity;

    }


    const R = 6371;


    const dLat =
        degreesToRadians(lat2 - lat1);


    const dLon =
        degreesToRadians(lon2 - lon1);


    const a =

        Math.sin(dLat / 2) *
        Math.sin(dLat / 2)

        +

        Math.cos(
            degreesToRadians(lat1)
        )

        *

        Math.cos(
            degreesToRadians(lat2)
        )

        *

        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);


    const c =

        2 *

        Math.atan2(

            Math.sqrt(a),

            Math.sqrt(1 - a)

        );


    return R * c;

}


function degreesToRadians(degrees) {

    return degrees * (
        Math.PI / 180
    );

}


/* =====================================
   EMERGENCY ALERT STATUS
===================================== */

function showEmergencyAlertStatus(request) {

    const status =
        document.getElementById(
            "alertStatus"
        );


    status.textContent =
        "🔄 SOS request saved. Matching compatible donors...";


    setTimeout(() => {

        status.textContent =
            "🔔 Emergency request is LIVE in the LifeLink network. Compatible donor notifications require a push-notification backend.";

    }, 1500);

}