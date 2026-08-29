

/* =========================================================
   LIFELINK SMART EMERGENCY DONOR MATCHING ENGINE
   ========================================================= */


/* =========================================================
   DEMO DONOR DATABASE

   IMPORTANT:
   This data is simulated for hackathon demonstration.
   ========================================================= */


const donors = [

    {
        id: 1,
        name: "Rahul Sharma",
        bloodGroup: "O+",
        city: "Ghaziabad",
        state: "Uttar Pradesh",
        area: "Indirapuram",
        distance: 2.1,
        available: true,
        verified: true,
        lastDonation: "2026-03-10",
        responseTime: 15
    },

    {
        id: 2,
        name: "Priya Verma",
        bloodGroup: "A+",
        city: "Ghaziabad",
        state: "Uttar Pradesh",
        area: "Vaishali",
        distance: 4.5,
        available: true,
        verified: true,
        lastDonation: "2025-11-20",
        responseTime: 25
    },

    {
        id: 3,
        name: "Aman Singh",
        bloodGroup: "O-",
        city: "Ghaziabad",
        state: "Uttar Pradesh",
        area: "Raj Nagar",
        distance: 6.2,
        available: true,
        verified: true,
        lastDonation: "2025-10-15",
        responseTime: 20
    },

    {
        id: 4,
        name: "Sneha Gupta",
        bloodGroup: "B+",
        city: "Noida",
        state: "Uttar Pradesh",
        area: "Sector 62",
        distance: 8.4,
        available: true,
        verified: true,
        lastDonation: "2026-01-10",
        responseTime: 30
    },

    {
        id: 5,
        name: "Vikas Kumar",
        bloodGroup: "O+",
        city: "Ghaziabad",
        state: "Uttar Pradesh",
        area: "Vasundhara",
        distance: 3.8,
        available: true,
        verified: false,
        lastDonation: "2025-09-15",
        responseTime: 40
    },

    {
        id: 6,
        name: "Neha Sharma",
        bloodGroup: "A-",
        city: "Noida",
        state: "Uttar Pradesh",
        area: "Sector 15",
        distance: 12.5,
        available: true,
        verified: true,
        lastDonation: "2025-12-01",
        responseTime: 35
    },

    {
        id: 7,
        name: "Rohan Mehta",
        bloodGroup: "B-",
        city: "Delhi",
        state: "Delhi",
        area: "East Delhi",
        distance: 18.4,
        available: true,
        verified: true,
        lastDonation: "2025-08-10",
        responseTime: 45
    },

    {
        id: 8,
        name: "Karan Malhotra",
        bloodGroup: "AB+",
        city: "Ghaziabad",
        state: "Uttar Pradesh",
        area: "Crossings Republik",
        distance: 7.2,
        available: false,
        verified: true,
        lastDonation: "2025-07-20",
        responseTime: 60
    },

    {
        id: 9,
        name: "Anjali Kapoor",
        bloodGroup: "O-",
        city: "Noida",
        state: "Uttar Pradesh",
        area: "Sector 18",
        distance: 9.1,
        available: true,
        verified: true,
        lastDonation: "2025-09-01",
        responseTime: 18
    },

    {
        id: 10,
        name: "Arjun Patel",
        bloodGroup: "AB-",
        city: "Ghaziabad",
        state: "Uttar Pradesh",
        area: "Kavi Nagar",
        distance: 5.6,
        available: true,
        verified: false,
        lastDonation: "2025-10-10",
        responseTime: 30
    }

];



/* =========================================================
   BLOOD COMPATIBILITY

   Donor blood groups compatible with recipient requirement.

   This is simplified ABO/Rh red-cell compatibility logic
   for a matching prototype. Real clinical matching must
   always be confirmed by qualified medical professionals.
   ========================================================= */


const bloodCompatibility = {

    "O-": ["O-"],

    "O+": ["O+", "O-"],

    "A-": ["A-", "O-"],

    "A+": ["A+", "A-", "O+", "O-"],

    "B-": ["B-", "O-"],

    "B+": ["B+", "B-", "O+", "O-"],

    "AB-": [
        "AB-",
        "A-",
        "B-",
        "O-"
    ],

    "AB+": [
        "AB+",
        "AB-",
        "A+",
        "A-",
        "B+",
        "B-",
        "O+",
        "O-"
    ]

};



/* =========================================================
   CHECK DONATION ELIGIBILITY

   Prototype rule:
   90 days since last donation.

   Real eligibility depends on local regulations and
   medical screening.
   ========================================================= */


function checkEligibility(lastDonation) {

    const today = new Date();

    const lastDate = new Date(lastDonation);

    const difference =
        today.getTime() -
        lastDate.getTime();

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    return days >= 90;

}



/* =========================================================
   GET COMPATIBILITY TYPE
   ========================================================= */


function getCompatibilityType(
    donorBloodGroup,
    requiredBloodGroup
) {

    if (
        donorBloodGroup === requiredBloodGroup
    ) {

        return "Exact Match";

    }


    if (
        bloodCompatibility[requiredBloodGroup]
            .includes(donorBloodGroup)
    ) {

        return "Compatible Match";

    }


    return "Not Compatible";

}



/* =========================================================
   SMART MATCH SCORE

   Maximum Score = 100

   Blood Match       = 40
   Distance          = 20
   Availability      = 15
   Eligibility       = 15
   Verification      = 5
   Response Time     = 5
   ========================================================= */


function calculateMatchScore(
    donor,
    request
) {

    let score = 0;


    /* ---------------- BLOOD ---------------- */

    const compatibility =
        getCompatibilityType(
            donor.bloodGroup,
            request.bloodGroup
        );


    if (
        compatibility === "Exact Match"
    ) {

        score += 40;

    }

    else if (
        compatibility === "Compatible Match"
    ) {

        score += 30;

    }



    /* ---------------- DISTANCE ---------------- */

    if (donor.distance <= 3) {

        score += 20;

    }

    else if (donor.distance <= 5) {

        score += 17;

    }

    else if (donor.distance <= 10) {

        score += 13;

    }

    else if (donor.distance <= 20) {

        score += 8;

    }

    else {

        score += 4;

    }



    /* ---------------- AVAILABILITY ---------------- */

    if (donor.available) {

        score += 15;

    }



    /* ---------------- ELIGIBILITY ---------------- */

    const eligible =
        checkEligibility(
            donor.lastDonation
        );


    if (eligible) {

        score += 15;

    }



    /* ---------------- VERIFICATION ---------------- */

    if (donor.verified) {

        score += 5;

    }



    /* ---------------- RESPONSE TIME ---------------- */

    if (donor.responseTime <= 20) {

        score += 5;

    }

    else if (donor.responseTime <= 30) {

        score += 4;

    }

    else if (donor.responseTime <= 45) {

        score += 2;

    }

    else {

        score += 1;

    }



    /* ---------------- EMERGENCY BOOST ---------------- */

    if (
        request.urgency === "critical" &&
        donor.distance <= 5
    ) {

        score += 5;

    }



    return Math.min(score, 100);

}



/* =========================================================
   MATCH DONORS
   ========================================================= */


function findSmartMatches(request) {


    const compatibleGroups =
        bloodCompatibility[
            request.bloodGroup
        ] || [];


    const matches = donors
        .filter(function (donor) {


            /* Compatible blood group */

            const bloodMatch =
                compatibleGroups.includes(
                    donor.bloodGroup
                );


            /* Available */

            const available =
                donor.available === true;


            /* Eligible */

            const eligible =
                checkEligibility(
                    donor.lastDonation
                );


            /* Within radius */

            const withinRadius =
                donor.distance <= request.radius;


            /* Location */

            const sameCity =
                donor.city
                    .toLowerCase()
                    .includes(
                        request.city.toLowerCase()
                    )


                ||

                request.city
                    .toLowerCase()
                    .includes(
                        donor.city.toLowerCase()
                    );


            return (
                bloodMatch &&
                available &&
                eligible &&
                withinRadius &&
                sameCity
            );

        })


        .map(function (donor) {


            const compatibility =
                getCompatibilityType(
                    donor.bloodGroup,
                    request.bloodGroup
                );


            const score =
                calculateMatchScore(
                    donor,
                    request
                );


            return {

                ...donor,

                compatibility: compatibility,

                score: score

            };

        })


        .sort(function (a, b) {

            return b.score - a.score;

        });


    return matches;

}



/* =========================================================
   GET MATCH LABEL
   ========================================================= */


function getMatchLabel(score) {

    if (score >= 90) {

        return {
            label: "🏆 BEST MATCH",
            className: "best-match"
        };

    }


    if (score >= 75) {

        return {
            label: "⭐ STRONG MATCH",
            className: "strong-match"
        };

    }


    if (score >= 60) {

        return {
            label: "✓ GOOD MATCH",
            className: "good-match"
        };

    }


    return {

        label: "COMPATIBLE MATCH",
        className: "compatible-match"

    };

}



/* =========================================================
   DISPLAY RESULTS
   ========================================================= */


function displayResults(
    matches,
    request
) {


    const donorResults =
        document.getElementById(
            "donorResults"
        );


    const resultsSummary =
        document.getElementById(
            "resultsSummary"
        );


    const emergencyStatus =
        document.getElementById(
            "emergencyStatus"
        );


    donorResults.innerHTML = "";


    /* ---------------- NO MATCHES ---------------- */

    if (matches.length === 0) {


        donorResults.innerHTML = `

            <div class="no-results">

                <div class="empty-icon">
                    🔍
                </div>

                <h3>
                    No Eligible Matches Found
                </h3>

                <p>

                    We couldn't find an eligible compatible donor
                    within the selected ${request.radius} KM radius.

                </p>

                <button
                    class="expand-search-btn"
                    onclick="expandSearch()"
                >

                    📍 Expand Search Radius

                </button>

            </div>

        `;


        resultsSummary.textContent =
            "No eligible compatible donors found in the selected area.";


        updateStatistics([]);


        return;

    }



    /* ---------------- SUMMARY ---------------- */


    resultsSummary.textContent =
        `${matches.length} eligible compatible donor match(es) found for ${request.bloodGroup}.`;


    if (
        request.urgency === "critical"
    ) {

        emergencyStatus.innerHTML =
            "🔴 CRITICAL";

        emergencyStatus.className =
            "emergency-status critical-status";

    }

    else if (
        request.urgency === "high"
    ) {

        emergencyStatus.innerHTML =
            "🟠 HIGH PRIORITY";

        emergencyStatus.className =
            "emergency-status high-status";

    }

    else {

        emergencyStatus.innerHTML =
            "🟢 NORMAL";

        emergencyStatus.className =
            "emergency-status normal-status";

    }



    /* ---------------- CREATE CARDS ---------------- */


    matches.forEach(
        function (
            donor,
            index
        ) {


            const matchInfo =
                getMatchLabel(
                    donor.score
                );


            const card =
                document.createElement("div");


            card.className =
                `donor-card smart-donor-card ${matchInfo.className}`;


            card.innerHTML = `


                <div class="match-rank">

                    #${index + 1}

                </div>


                <div class="match-label ${matchInfo.className}">

                    ${matchInfo.label}

                </div>


                <div class="donor-top">

                    <div class="blood-circle">

                        ${donor.bloodGroup}

                    </div>


                    <div>

                        <h3>

                            ${donor.name}

                        </h3>


                        <p class="donor-location">

                            📍 ${donor.area}, ${donor.city}

                        </p>

                    </div>

                </div>


                <div class="score-section">

                    <div class="score-header">

                        <span>
                            Smart Match Score
                        </span>

                        <strong>
                            ${donor.score}%
                        </strong>

                    </div>


                    <div class="score-bar">

                        <div
                            class="score-fill"
                            style="width: ${donor.score}%"
                        ></div>

                    </div>

                </div>


                <div class="donor-info-grid">


                    <div>

                        <span>🩸 Match</span>

                        <strong>

                            ${donor.compatibility}

                        </strong>

                    </div>


                    <div>

                        <span>📍 Distance</span>

                        <strong>

                            ${donor.distance} KM

                        </strong>

                    </div>


                    <div>

                        <span>⚡ Response</span>

                        <strong>

                            ~${donor.responseTime} min

                        </strong>

                    </div>


                    <div>

                        <span>🛡️ Status</span>

                        <strong class="available-text">

                            Available

                        </strong>

                    </div>

                </div>


                <div class="verification-row">

                    ${

                        donor.verified

                            ?

                            "✅ Verified Donor"

                            :

                            "⚠️ Verification Pending"

                    }

                </div>


                <button
                    class="contact-donor-btn"
                    onclick="contactDonor(${donor.id})"
                >

                    📞 Contact Donor

                </button>


            `;


            donorResults.appendChild(card);

        }
    );


    updateStatistics(matches);

}



/* =========================================================
   UPDATE STATISTICS
   ========================================================= */


function updateStatistics(matches) {


    document.getElementById(
        "totalMatches"
    ).textContent =
        matches.length;


    if (
        matches.length === 0
    ) {


        document.getElementById(
            "bestScore"
        ).textContent =
            "0%";


        document.getElementById(
            "nearestDistance"
        ).textContent =
            "--";


        return;

    }


    document.getElementById(
        "bestScore"
    ).textContent =
        matches[0].score + "%";


    const nearest =
        [...matches].sort(
            function (a, b) {

                return a.distance - b.distance;

            }
        )[0];


    document.getElementById(
        "nearestDistance"
    ).textContent =
        nearest.distance + " KM";

}



/* =========================================================
   FORM SUBMISSION
   ========================================================= */


document
    .getElementById(
        "donorSearchForm"
    )
    .addEventListener(
        "submit",
        function (event) {


            event.preventDefault();


            const request = {


                bloodGroup:
                    document.getElementById(
                        "bloodGroup"
                    ).value,


                state:
                    document.getElementById(
                        "state"
                    ).value.trim(),


                city:
                    document.getElementById(
                        "city"
                    ).value.trim(),


                area:
                    document.getElementById(
                        "area"
                    ).value.trim(),


                radius:
                    Number(
                        document.getElementById(
                            "radius"
                        ).value
                    ),


                urgency:
                    document.getElementById(
                        "urgency"
                    ).value,


                requiredTime:
                    document.getElementById(
                        "requiredTime"
                    ).value

            };


            startMatching(
                request
            );

        }
    );



/* =========================================================
   MATCHING ANIMATION
   ========================================================= */


function startMatching(request) {


    const status =
        document.getElementById(
            "matchingStatus"
        );


    const text =
        document.getElementById(
            "matchingText"
        );


    status.style.display =
        "block";


    text.textContent =
        "Checking blood compatibility...";


    setTimeout(
        function () {


            text.textContent =
                "Analyzing donor availability...";


        },
        700
    );


    setTimeout(
        function () {


            text.textContent =
                "Calculating distance and eligibility...";


        },
        1400
    );


    setTimeout(
        function () {


            const matches =
                findSmartMatches(
                    request
                );


            status.style.display =
                "none";


            displayResults(
                matches,
                request
            );


            document
                .getElementById(
                    "resultsSection"
                )
                .scrollIntoView({

                    behavior: "smooth"

                });


        },
        2100
    );

}



/* =========================================================
   CONTACT DONOR

   DEMO ONLY
   ========================================================= */


function contactDonor(donorId) {


    const donor =
        donors.find(
            function (person) {

                return person.id === donorId;

            }
        );


    if (!donor) {

        return;

    }


    alert(

        `Demo Contact Request\n\n` +

        `Donor: ${donor.name}\n` +

        `Blood Group: ${donor.bloodGroup}\n\n` +

        `In a production version, LifeLink would securely notify the donor after consent and verification.`

    );

}



/* =========================================================
   EXPAND SEARCH
   ========================================================= */


function expandSearch() {


    const radius =
        document.getElementById(
            "radius"
        );


    radius.value =
        "50";


    document
        .getElementById(
            "donorSearchForm"
        )
        .scrollIntoView({

            behavior: "smooth"

        });


    alert(
        "Search radius expanded to 50 KM. Click Find Smart Matches again."
    );

}



/* =========================================================
   EMERGENCY REQUEST
   ========================================================= */


document
    .getElementById(
        "emergencyRequestBtn"
    )
    .addEventListener(
        "click",
        function () {


            const bloodGroup =
                document.getElementById(
                    "bloodGroup"
                ).value;


            const city =
                document.getElementById(
                    "city"
                ).value;


            const state =
                document.getElementById(
                    "state"
                ).value;


            const urgency =
                document.getElementById(
                    "urgency"
                ).value;


            if (
                !bloodGroup ||
                !city ||
                !state
            ) {


                alert(
                    "Please enter blood group, state and city before creating an emergency request."
                );


                document
                    .getElementById(
                        "donorSearchForm"
                    )
                    .scrollIntoView({

                        behavior: "smooth"

                    });


                return;

            }


            let priorityText =
                "🟢 Normal";


            if (
                urgency === "high"
            ) {

                priorityText =
                    "🟠 High Priority";

            }


            if (
                urgency === "critical"
            ) {

                priorityText =
                    "🔴 Critical Emergency";

            }


            document.getElementById(
                "modalBloodGroup"
            ).textContent =
                bloodGroup;


            document.getElementById(
                "modalLocation"
            ).textContent =
                `${city}, ${state}`;


            document.getElementById(
                "modalPriority"
            ).textContent =
                priorityText;


            document.getElementById(
                "emergencyMessage"
            ).textContent =
                `LifeLink has prepared a ${urgency} priority donor matching request for ${bloodGroup} blood in ${city}.`;


            document.getElementById(
                "emergencyModal"
            ).style.display =
                "flex";

        }
    );



/* =========================================================
   CLOSE MODAL
   ========================================================= */


document
    .getElementById(
        "closeModal"
    )
    .addEventListener(
        "click",
        closeEmergencyModal
    );


document
    .getElementById(
        "closeEmergencyModal"
    )
    .addEventListener(
        "click",
        closeEmergencyModal
    );



function closeEmergencyModal() {


    document.getElementById(
        "emergencyModal"
    ).style.display =
        "none";

}



/* =========================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
   ========================================================= */


window.addEventListener(
    "click",
    function (event) {


        const modal =
            document.getElementById(
                "emergencyModal"
            );


        if (
            event.target === modal
        ) {

            closeEmergencyModal();

        }

    }
);