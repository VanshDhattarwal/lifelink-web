/* =====================================================
   LIFELINK HOSPITAL DATABASE
   DEMO DATA FOR PROTOTYPE
===================================================== */


const hospitals = [

    /* ================= 0–5 KM ================= */

    {
        id: "yashoda-nehrunagar",

        name: "Yashoda Hospital & Research Centre",

        type: "Multi-Speciality Hospital",

        distance: 2.1,

        rating: 4.7,

        emergency: true,

        bloodBank: true,

        address:
        "Nehru Nagar, Ghaziabad",

        phone:
        "+919810922042",

        image:
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=900&q=80",

        blood: [
            "A+",
            "A-",
            "B+",
            "B-",
            "O+",
            "AB+"
        ]
    },


    {
        id: "santosh-ghaziabad",

        name: "Santosh Hospital",

        type: "Multi-Speciality Hospital",

        distance: 3.4,

        rating: 4.6,

        emergency: true,

        bloodBank: true,

        address:
        "Ambedkar Road, Ghaziabad",

        phone:
        "+917827981588",

        image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",

        blood: [
            "A+",
            "B+",
            "B-",
            "O+",
            "AB+"
        ]
    },


    {
        id: "tirupati-ghaziabad",

        name: "Shri Tirupati Hospital",

        type: "General & Multi-Speciality",

        distance: 4.6,

        rating: 4.9,

        emergency: true,

        bloodBank: false,

        address:
        "Kavi Nagar, Ghaziabad",

        phone:
        "+911202782103",

        image:
        "https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?auto=format&fit=crop&w=900&q=80",

        blood: [
            "A+",
            "B+",
            "O+",
            "AB+"
        ]
    },


    /* ================= 5–10 KM ================= */

    {
        id: "manipal-ghaziabad",

        name: "Manipal Hospital Ghaziabad",

        type: "Multi-Speciality Hospital",

        distance: 6.2,

        rating: 4.7,

        emergency: true,

        bloodBank: true,

        address:
        "NH-24, Hapur Road, Ghaziabad",

        phone:
        "+911203535353",

        image:
        "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=900&q=80",

        blood: [
            "A+",
            "A-",
            "B+",
            "O+",
            "O-",
            "AB+",
            "AB-"
        ]
    },


    {
        id: "max-vaishali",

        name: "Max Super Speciality Hospital",

        type: "Super Speciality Hospital",

        distance: 8.1,

        rating: 4.6,

        emergency: true,

        bloodBank: true,

        address:
        "Vaishali, Ghaziabad",

        phone:
        "+918860444888",

        image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80",

        blood: [
            "A+",
            "B+",
            "O+",
            "O-",
            "AB+"
        ]
    },


    {
        id: "yashoda-kaushambi",

        name: "Yashoda Super Speciality Hospital",

        type: "Super Speciality Hospital",

        distance: 9.3,

        rating: 4.5,

        emergency: true,

        bloodBank: true,

        address:
        "Kaushambi, Ghaziabad",

        phone:
        "+911204189500",

        image:
        "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=900&q=80",

        blood: [
            "A+",
            "A-",
            "B+",
            "O+",
            "O-"
        ]
    },


    /* ================= 10–20 KM ================= */

    {
        id: "yashoda-indirapuram",

        name: "Yashoda Medicity",

        type: "Multi-Speciality Hospital",

        distance: 11.5,

        rating: 4.8,

        emergency: true,

        bloodBank: true,

        address:
        "Shakti Khand 2, Indirapuram",

        phone:
        "+918800811811",

        image:
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=900&q=80",

        blood: [
            "A+",
            "A-",
            "B+",
            "B-",
            "O+",
            "O-",
            "AB+"
        ]
    },


    {
        id: "mmg-ghaziabad",

        name: "MMG District Hospital",

        type: "Government Hospital",

        distance: 14.2,

        rating: 2.9,

        emergency: true,

        bloodBank: true,

        address:
        "GT Road, Ghaziabad",

        phone:
        "+911202730038",

        image:
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=900&q=80",

        blood: [
            "A+",
            "B+",
            "O+",
            "O-"
        ]
    },


    {
        id: "nagar-hospital",

        name: "Nagar Hospital",

        type: "Multi-Speciality Hospital",

        distance: 17.3,

        rating: 4.6,

        emergency: true,

        bloodBank: false,

        address:
        "Lohia Nagar, Ghaziabad",

        phone:
        "+918527098226",

        image:
        "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=900&q=80",

        blood: [
            "A+",
            "B+",
            "O+",
            "AB+"
        ]
    }

];



/* =====================================================
   CREATE CARD
===================================================== */

function createHospitalCard(hospital) {

    const card =
        document.createElement("div");

    card.className =
        "hospital-card";


    let bloodHTML = "";


    hospital.blood.forEach(
        function(group) {

            bloodHTML += `

                <span class="blood">
                    ${group}
                </span>

            `;

        }
    );


    card.innerHTML = `

        <div
            class="hospital-image"
            style="
                background-image:
                url('${hospital.image}');
            "
        >

            <span class="verified">
                ✓ Verified
            </span>

            ${
                hospital.emergency
                ?
                `
                <span class="emergency">
                    🚑 Emergency
                </span>
                `
                :
                ""
            }

        </div>


        <div class="hospital-content">

            <h3>
                ${hospital.name}
            </h3>


            <p class="type">
                ${hospital.type}
            </p>


            <div class="meta">

                <span class="rating">
                    ★ ${hospital.rating}
                </span>

                <span class="distance">
                    📍 ${hospital.distance} km
                </span>

                <span>
                    🕐 24/7
                </span>

            </div>


            <p class="address">
                📍 ${hospital.address}
            </p>


            <p class="blood-title">
                Blood groups available
            </p>


            <div class="blood-list">

                ${bloodHTML}

            </div>


            <button
                class="details-button"
                onclick="
                    openHospitalDetails(
                        '${hospital.id}'
                    )
                "
            >

                View Hospital Details →

            </button>

        </div>

    `;


    return card;

}



/* =====================================================
   LOAD RANGES
===================================================== */

function loadHospitals() {


    const range5 =
        document.getElementById(
            "range-5"
        );


    const range10 =
        document.getElementById(
            "range-10"
        );


    const range20 =
        document.getElementById(
            "range-20"
        );


    hospitals.forEach(
        function(hospital) {


            const card =
                createHospitalCard(
                    hospital
                );


            if (
                hospital.distance <= 5
            ) {

                range5.appendChild(
                    card.cloneNode(true)
                );

            }


            else if (
                hospital.distance <= 10
            ) {

                range10.appendChild(
                    card.cloneNode(true)
                );

            }


            else if (
                hospital.distance <= 20
            ) {

                range20.appendChild(
                    card.cloneNode(true)
                );

            }

        }
    );

}



/* =====================================================
   SEARCH
===================================================== */

function searchHospitals() {


    const search =
        document
        .getElementById(
            "searchInput"
        )
        .value
        .toLowerCase();


    const blood =
        document
        .getElementById(
            "bloodFilter"
        )
        .value;


    document
        .querySelectorAll(
            ".hospital-card"
        )
        .forEach(

            function(card, index) {


                const hospital =
                    hospitals[index %
                    hospitals.length];


                const matchesSearch =

                    hospital.name
                    .toLowerCase()
                    .includes(search)

                    ||

                    hospital.address
                    .toLowerCase()
                    .includes(search);


                const matchesBlood =

                    blood === "all"

                    ||

                    hospital.blood
                    .includes(blood);


                if (
                    matchesSearch &&
                    matchesBlood
                ) {

                    card.style.display =
                        "block";

                }

                else {

                    card.style.display =
                        "none";

                }

            }

        );

}



/* =====================================================
   EMERGENCY
===================================================== */

function showEmergency() {


    document
        .querySelectorAll(
            ".hospital-card"
        )
        .forEach(

            function(card, index) {

                const hospital =
                    hospitals[
                        index %
                        hospitals.length
                    ];


                if (hospital.emergency) {

                    card.style.display =
                        "block";

                }

                else {

                    card.style.display =
                        "none";

                }

            }

        );



    document
        .querySelector(
            ".hospital-range"
        )
        .scrollIntoView({

            behavior: "smooth"

        });

}



/* =====================================================
   OPEN DETAILS
===================================================== */

function openHospitalDetails(
    hospitalId
) {

    window.location.href =
        "hospital-details.html?id="
        +
        hospitalId;

}



/* =====================================================
   LOCATION
===================================================== */

function detectLocation() {


    if (
        !navigator.geolocation
    ) {

        alert(
            "Geolocation is not supported."
        );

        return;

    }


    navigator.geolocation
    .getCurrentPosition(

        function(position) {

            document
            .getElementById(
                "locationText"
            )
            .innerText =
                "Your current location detected";


            alert(
                "Location detected successfully!"
            );

        },


        function() {

            alert(
                "Location permission was not granted. Using demo location."
            );

        }

    );

}



/* =====================================================
   START
===================================================== */

document.addEventListener(
    "DOMContentLoaded",

    function() {

        loadHospitals();

    }
);