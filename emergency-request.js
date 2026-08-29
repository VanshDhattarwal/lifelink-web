const form = document.getElementById("emergencyForm");

const resultSection =
    document.getElementById("resultSection");


let countdownInterval = null;


/* =========================================
   BLOOD COMPATIBILITY
========================================= */

const bloodCompatibility = {

    "A+": ["A+", "A-", "O+", "O-"],

    "A-": ["A-", "O-"],

    "B+": ["B+", "B-", "O+", "O-"],

    "B-": ["B-", "O-"],

    "AB+": [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-"
    ],

    "AB-": [
        "A-",
        "B-",
        "AB-",
        "O-"
    ],

    "O+": [
        "O+",
        "O-"
    ],

    "O-": [
        "O-"
    ]

};


/* =========================================
   FORM SUBMISSION
========================================= */

form.addEventListener(
    "submit",

    function (event) {

        event.preventDefault();


        const bloodGroup =
            document.getElementById("bloodGroup").value;

        const patientName =
            document.getElementById("patientName").value;

        const units =
            document.getElementById("units").value;

        const hospital =
            document.getElementById("hospital").value;

        const city =
            document.getElementById("city").value;

        const contact =
            document.getElementById("contact").value;

        const requiredTime =
            document.getElementById("requiredTime").value;

        const notes =
            document.getElementById("notes").value;


        const priorityElement =
            document.querySelector(
                'input[name="priority"]:checked'
            );


        if (!priorityElement) {

            alert("Please select an emergency priority.");

            return;
        }


        const priority =
            priorityElement.value;


        const request = {

            id: Date.now(),

            bloodGroup,

            patientName,

            units,

            hospital,

            city,

            contact,

            priority,

            requiredTime,

            notes,

            createdAt:
                new Date().toISOString(),

            status: "Active"

        };


        /* SAVE LOCALLY */

        localStorage.setItem(

            "lifeLinkEmergencyRequest",

            JSON.stringify(request)

        );


        /* SHOW RESULT */

        showEmergencyRequest(request);


        /* SCROLL TO RESULT */

        setTimeout(function () {

            resultSection.scrollIntoView({

                behavior: "smooth"

            });

        }, 200);

    }

);


/* =========================================
   SHOW EMERGENCY REQUEST
========================================= */

function showEmergencyRequest(request) {


    resultSection.classList.remove("hidden");


    document.getElementById(
        "resultBlood"
    ).textContent = request.bloodGroup;


    document.getElementById(
        "resultPatient"
    ).textContent = request.patientName;


    document.getElementById(
        "resultHospital"
    ).textContent = request.hospital;


    document.getElementById(
        "resultCity"
    ).textContent = request.city;


    document.getElementById(
        "resultUnits"
    ).textContent =
        request.units + " Unit(s)";


    document.getElementById(
        "resultContact"
    ).textContent =
        request.contact;


    const formattedTime =
        new Date(
            request.requiredTime
        ).toLocaleString();


    document.getElementById(
        "resultTime"
    ).textContent =
        formattedTime;


    /* PRIORITY */

    const priorityElement =
        document.getElementById(
            "requestPriority"
        );


    if (request.priority === "Critical") {

        priorityElement.textContent =
            "🔴 CRITICAL";

    }

    else if (request.priority === "Urgent") {

        priorityElement.textContent =
            "🟠 URGENT";

    }

    else {

        priorityElement.textContent =
            "🟢 NORMAL";

    }


    /* COMPATIBLE GROUPS */

    showCompatibleGroups(
        request.bloodGroup
    );


    /* AI ANALYSIS */

    generateEmergencyAnalysis(
        request
    );


    /* COUNTDOWN */

    startCountdown(
        request.requiredTime
    );


    /* ACTION BUTTONS */

    setupActions(request);

}


/* =========================================
   COMPATIBLE BLOOD GROUPS
========================================= */

function showCompatibleGroups(bloodGroup) {


    const container =
        document.getElementById(
            "compatibleGroups"
        );


    container.innerHTML = "";


    const groups =
        bloodCompatibility[bloodGroup] || [];


    groups.forEach(function (group) {


        const element =
            document.createElement("div");


        element.className =
            "blood-group";


        element.textContent =
            group;


        container.appendChild(
            element
        );

    });

}


/* =========================================
   EMERGENCY ANALYSIS
========================================= */

function generateEmergencyAnalysis(request) {


    const analysis =
        document.getElementById(
            "aiAnalysis"
        );


    let message = "";


    if (request.priority === "Critical") {

        message =
            `Critical blood requirement recorded for ${request.bloodGroup}. ` +
            `${request.units} unit(s) are required at ${request.hospital} in ${request.city}. ` +
            `Use the donor matching feature to review potentially compatible donors and contact the hospital immediately for emergency coordination.`;

    }

    else if (request.priority === "Urgent") {

        message =
            `Urgent requirement recorded for ${request.bloodGroup} blood in ${request.city}. ` +
            `LifeLink can help organize potentially compatible donor matches based on the available request information.`;

    }

    else {

        message =
            `Blood requirement recorded successfully. ` +
            `You can use LifeLink donor matching to review potentially compatible donor groups for ${request.bloodGroup}.`;

    }


    analysis.textContent =
        message;

}


/* =========================================
   COUNTDOWN
========================================= */

function startCountdown(requiredTime) {


    if (countdownInterval) {

        clearInterval(
            countdownInterval
        );

    }


    function updateCountdown() {


        const now =
            new Date().getTime();


        const target =
            new Date(requiredTime).getTime();


        const difference =
            target - now;


        const countdown =
            document.getElementById(
                "countdown"
            );


        if (difference <= 0) {

            countdown.textContent =
                "⚠️ Required Time Reached";

            clearInterval(
                countdownInterval
            );

            return;
        }


        const hours =
            Math.floor(
                difference /
                (1000 * 60 * 60)
            );


        const minutes =
            Math.floor(
                (
                    difference %
                    (1000 * 60 * 60)
                )
                /
                (1000 * 60)
            );


        const seconds =
            Math.floor(
                (
                    difference %
                    (1000 * 60)
                )
                /
                1000
            );


        countdown.textContent =
            `${hours}h ${minutes}m ${seconds}s`;

    }


    updateCountdown();


    countdownInterval =
        setInterval(
            updateCountdown,
            1000
        );

}


/* =========================================
   ACTION BUTTONS
========================================= */

function setupActions(request) {


    const findDonorsBtn =
        document.getElementById(
            "findDonorsBtn"
        );


    const directionsBtn =
        document.getElementById(
            "directionsBtn"
        );


    const shareBtn =
        document.getElementById(
            "shareBtn"
        );


    /* FIND DONORS */

    findDonorsBtn.onclick =
        function () {


            localStorage.setItem(

                "lifeLinkMatchingRequest",

                JSON.stringify({

                    bloodGroup:
                        request.bloodGroup,

                    city:
                        request.city,

                    priority:
                        request.priority

                })

            );


            /*
            Change this filename if your
            donor matching page has another name
            */

            window.location.href =
                "findblood.html";

        };


    /* DIRECTIONS */

    directionsBtn.onclick =
        function () {


            const location =
                encodeURIComponent(

                    request.hospital +
                    " " +
                    request.city

                );


            window.open(

                `https://www.google.com/maps/search/?api=1&query=${location}`,

                "_blank"

            );

        };


    /* SHARE */

    shareBtn.onclick =
        async function () {


            const shareText =

                `🚨 LifeLink Emergency Blood Request\n\n` +

                `Blood Group: ${request.bloodGroup}\n` +

                `Units Required: ${request.units}\n` +

                `Hospital: ${request.hospital}\n` +

                `Location: ${request.city}\n` +

                `Priority: ${request.priority}\n\n` +

                `Please contact the requester or hospital to verify and coordinate assistance.`;


            if (navigator.share) {


                try {

                    await navigator.share({

                        title:
                            "LifeLink Emergency Request",

                        text:
                            shareText

                    });

                }

                catch (error) {

                    console.log(
                        "Sharing cancelled"
                    );

                }

            }

            else {


                navigator.clipboard.writeText(
                    shareText
                );


                alert(
                    "Emergency request copied to clipboard!"
                );

            }

        };

}


/* =========================================
   LOAD SAVED REQUEST
========================================= */

window.addEventListener(

    "DOMContentLoaded",

    function () {


        const savedRequest =
            localStorage.getItem(
                "lifeLinkEmergencyRequest"
            );


        if (savedRequest) {


            try {


                const request =
                    JSON.parse(savedRequest);


                /*
                We don't automatically show old requests
                as newly active emergencies.
                The saved data remains available locally.
                */


            }

            catch (error) {

                console.log(
                    "Could not load saved request"
                );

            }

        }

    }

);