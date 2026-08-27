/* =====================================================
   LIFELINK
   HOSPITAL DETAILS SYSTEM
===================================================== */


/* =====================================================
   BLOOD INVENTORY
===================================================== */

const bloodInventory = {

    "yashoda-nehrunagar": {

        "A+": 12,
        "A-": 4,
        "B+": 9,
        "B-": 2,
        "O+": 15,
        "O-": 3,
        "AB+": 6,
        "AB-": 0

    },


    "santosh-ghaziabad": {

        "A+": 8,
        "A-": 2,
        "B+": 11,
        "B-": 1,
        "O+": 13,
        "O-": 2,
        "AB+": 5,
        "AB-": 0

    },


    "tirupati-ghaziabad": {

        "A+": 5,
        "A-": 0,
        "B+": 7,
        "B-": 2,
        "O+": 9,
        "O-": 1,
        "AB+": 3,
        "AB-": 0

    },


    "manipal-ghaziabad": {

        "A+": 14,
        "A-": 5,
        "B+": 10,
        "B-": 4,
        "O+": 18,
        "O-": 4,
        "AB+": 7,
        "AB-": 1

    },


    "max-vaishali": {

        "A+": 10,
        "A-": 2,
        "B+": 8,
        "B-": 3,
        "O+": 16,
        "O-": 1,
        "AB+": 5,
        "AB-": 0

    },


    "yashoda-kaushambi": {

        "A+": 9,
        "A-": 3,
        "B+": 12,
        "B-": 2,
        "O+": 14,
        "O-": 2,
        "AB+": 6,
        "AB-": 1

    },


    "yashoda-indirapuram": {

        "A+": 13,
        "A-": 4,
        "B+": 9,
        "B-": 3,
        "O+": 17,
        "O-": 2,
        "AB+": 8,
        "AB-": 1

    },


    "mmg-ghaziabad": {

        "A+": 5,
        "A-": 1,
        "B+": 6,
        "B-": 1,
        "O+": 8,
        "O-": 0,
        "AB+": 2,
        "AB-": 0

    },


    "nagar-hospital": {

        "A+": 6,
        "A-": 1,
        "B+": 8,
        "B-": 2,
        "O+": 10,
        "O-": 1,
        "AB+": 4,
        "AB-": 0

    }

};


/* =====================================================
   GET HOSPITAL ID
===================================================== */

const params =
    new URLSearchParams(
        window.location.search
    );


const hospitalId =
    params.get("id");


/* =====================================================
   FIND HOSPITAL
===================================================== */

const hospital =
    hospitals.find(
        function(item) {

            return item.id === hospitalId;

        }
    );


/* =====================================================
   BLOOD STATUS
===================================================== */

function getBloodStatus(units) {

    if (units === 0) {

        return `
            <span class="unavailable">
                ● Unavailable
            </span>
        `;

    }


    if (units <= 3) {

        return `
            <span class="low">
                ● Low Stock
            </span>
        `;

    }


    return `
        <span class="available">
            ● Available
        </span>
    `;

}


/* =====================================================
   LOAD DETAILS
===================================================== */

function loadHospitalDetails() {

    const container =
        document.getElementById(
            "hospitalDetails"
        );


    /* =========================
       HOSPITAL NOT FOUND
    ========================== */

    if (!hospital) {

        container.innerHTML = `

            <div class="details-container">

                <div class="blood-section">

                    <h2>
                        Hospital Not Found
                    </h2>

                    <p>
                        We couldn't find the
                        hospital you're looking for.
                    </p>

                    <a
                        href="hospitals.html"
                        class="direction"
                    >
                        ← Back to Hospitals
                    </a>

                </div>

            </div>

        `;

        return;

    }


    /* =========================
       INVENTORY
    ========================== */

    const inventory =
        bloodInventory[
            hospital.id
        ];


    let bloodCards = "";


    Object.entries(inventory)
        .forEach(
            function([group, units]) {

                bloodCards += `

                    <div class="blood-card">

                        <h3>
                            ${group}
                        </h3>

                        <div class="units">

                            ${units}

                            <small>
                                units
                            </small>

                        </div>

                        ${getBloodStatus(units)}

                    </div>

                `;

            }
        );


    /* =========================
       PAGE
    ========================== */

    container.innerHTML = `

        <div class="details-container">


            <!-- =====================
                 HOSPITAL HERO
            ====================== -->

            <section
                class="hospital-detail-hero"
            >


                <div
                    class="detail-image"

                    style="
                        background-image:
                        url('${hospital.image}');
                    "
                ></div>


                <div class="detail-info">


                    <span>
                        ♥ LIFELINK VERIFIED
                    </span>


                    <h1>
                        ${hospital.name}
                    </h1>


                    <p class="detail-type">
                        ${hospital.type}
                    </p>


                    <div class="detail-meta">


                        <span>
                            ★ ${hospital.rating}
                        </span>


                        <span>
                            📍
                            ${hospital.distance} km
                            away
                        </span>


                        <span>
                            🕐 Open 24/7
                        </span>


                        ${
                            hospital.emergency
                            ?
                            `
                            <span>
                                🚑 Emergency
                            </span>
                            `
                            :
                            ""
                        }


                        ${
                            hospital.bloodBank
                            ?
                            `
                            <span>
                                🩸 Blood Bank
                            </span>
                            `
                            :
                            ""
                        }

                    </div>


                    <p class="detail-address">

                        📍 ${hospital.address}

                    </p>


                    <div class="detail-buttons">


                        <a
                            href="
                            https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hospital.address)}
                            "

                            target="_blank"

                            class="direction"
                        >

                            🗺 Get Directions

                        </a>


                        <a
                            href="tel:${hospital.phone}"

                            class="call"
                        >

                            📞 Call Hospital

                        </a>


                    </div>


                </div>

            </section>



            <!-- =====================
                 BLOOD INVENTORY
            ====================== -->

            <section class="blood-section">


                <h2>
                    🩸 Blood Availability
                </h2>


                <p>
                    Current blood inventory
                    available at this hospital.
                </p>


                <div class="blood-grid">

                    ${bloodCards}

                </div>


            </section>



            <!-- =====================
                 SERVICES
            ====================== -->

            <section class="services">


                <h2>
                    Hospital Services
                </h2>


                <div class="service-grid">


                    <div class="service">

                        <strong>
                            🚑 Emergency & Trauma
                        </strong>

                        <p>
                            Emergency medical
                            assistance available
                            around the clock.
                        </p>

                    </div>


                    <div class="service">

                        <strong>
                            🩸 Blood Bank
                        </strong>

                        <p>
                            Blood collection,
                            storage and transfusion
                            services.
                        </p>

                    </div>


                    <div class="service">

                        <strong>
                            🫀 ICU & Critical Care
                        </strong>

                        <p>
                            Critical care facilities
                            for emergency patients.
                        </p>

                    </div>


                    <div class="service">

                        <strong>
                            🏥 Multi-Speciality
                        </strong>

                        <p>
                            Multiple medical
                            departments and
                            specialists.
                        </p>

                    </div>


                    <div class="service">

                        <strong>
                            🧪 Diagnostic Laboratory
                        </strong>

                        <p>
                            Medical testing and
                            diagnostic facilities.
                        </p>

                    </div>


                    <div class="service">

                        <strong>
                            💊 Pharmacy
                        </strong>

                        <p>
                            Medicine and pharmacy
                            services available.
                        </p>

                    </div>


                </div>

            </section>



            <!-- =====================
                 PROTOTYPE NOTICE
            ====================== -->

            <div class="demo-notice">

                ⚠️

                <strong>
                    Prototype data:
                </strong>

                The blood inventory displayed
                on this page is demonstration
                data for the LifeLink prototype.

                In the production system,
                authorized hospital staff will
                update availability through the
                Hospital Dashboard.

            </div>


        </div>

    `;

}


/* =====================================================
   START
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    loadHospitalDetails
);