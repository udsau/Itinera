// ============================================
// ITINERA
// RESULTS PAGE JAVASCRIPT
// ============================================


// ============================================
// JAIPUR ITINERARY DATA
// ============================================

const jaipurItinerary = [

    // ========================================
    // DAY 1 — ROYAL START
    // ========================================

    {
        day_number: 1,
        day_title: "Royal Start",
        time_slot: "Morning",
        place_name: "Amber Fort",
        estimated_duration: "2.5 hrs",
        food_recommendation:
            "Enjoy traditional Rajasthani breakfast near Amer Road.",
        weather_warning: null,

        photo_url:
            "https://cdn.corenexis.com/f/E7J6PKoJqvo.jpg"
    },


    {
        day_number: 1,
        day_title: "Royal Start",
        time_slot: "Afternoon",
        place_name: "Jal Mahal",
        estimated_duration: "1 hr",
        food_recommendation:
            "Try chai and local snacks while enjoying views of Man Sagar Lake.",
        weather_warning: null,

        photo_url:
            "https://cdn.corenexis.com/f/CdLRqGJ0YfL.jpg"
    },


    {
        day_number: 1,
        day_title: "Royal Start",
        time_slot: "Evening",
        place_name: "Hawa Mahal",
        estimated_duration: "1.5 hrs",
        food_recommendation:
            "Try local lassi or kachori from one of the nearby heritage cafés.",
        weather_warning: null,

        photo_url:
            "https://cdn.corenexis.com/f/PxzB2hIcYQa.jpg"
    },


    // ========================================
    // DAY 2 — PALACES & HERITAGE
    // ========================================

    {
        day_number: 2,
        day_title: "Palaces & Heritage",
        time_slot: "Morning",
        place_name: "City Palace",
        estimated_duration: "2 hrs",
        food_recommendation:
            "Explore local cafés and traditional food around Tripolia Bazaar.",
        weather_warning: null,

        photo_url:
            "https://cdn.corenexis.com/f/vsQNH6mn5Ov.jpg"
    },


    {
        day_number: 2,
        day_title: "Palaces & Heritage",
        time_slot: "Afternoon",
        place_name: "Jantar Mantar",
        estimated_duration: "1.5 hrs",
        food_recommendation:
            "Take a refreshing break at a café in Jaipur's historic old city.",
        weather_warning: null,

        photo_url:
            "https://cdn.corenexis.com/f/nK66T72pMEY.jpg"
    },


    {
        day_number: 2,
        day_title: "Palaces & Heritage",
        time_slot: "Evening",
        place_name: "Albert Hall Museum",
        estimated_duration: "2 hrs",
        food_recommendation:
            "Enjoy coffee or desserts around the peaceful Ram Niwas Garden area.",

        weather_warning:
            "Light rain is expected during this time. This stop offers a comfortable alternative while the weather changes.",

        photo_url:
            "https://cdn.corenexis.com/f/6r0BtCwYzNp.jpg"
    },


    // ========================================
    // DAY 3 — MARKETS & SUNSET
    // ========================================

    {
        day_number: 3,
        day_title: "Markets & Sunset",
        time_slot: "Afternoon",
        place_name: "Nahargarh Fort",
        estimated_duration: "2.5 hrs",
        food_recommendation:
            "Enjoy refreshments while taking in panoramic views of Jaipur.",
        weather_warning: null,

        photo_url:
            "https://cdn.corenexis.com/f/Fs35qjZuLUW.jpg"
    },


    {
        day_number: 3,
        day_title: "Markets & Sunset",
        time_slot: "Evening",
        place_name: "Jaipur Bazaar",
        estimated_duration: "2 hrs",

        sub_places: [
            "Johari Bazaar",
            "Bapu Bazaar",
            "Tripolia Bazaar"
        ],

        food_recommendation:
            "Try local street food and shop for traditional Rajasthani crafts.",

        weather_warning: null,

        photo_url:
            "https://cdn.corenexis.com/f/RxnY8cg229D.jpg"
    },


    {
        day_number: 3,
        day_title: "Markets & Sunset",
        time_slot: "Night",
        place_name: "Chokhi Dhani",
        estimated_duration: "3 hrs",
        food_recommendation:
            "Experience a traditional Rajasthani thali and cultural performances.",
        weather_warning: null,

        photo_url:
            "https://cdn.corenexis.com/f/vs1i4SOIBqm.jpg"
    }

];


// ============================================
// VARANASI ITINERARY DATA
// ============================================

const varanasiItinerary = [

    // ========================================
    // DAY 1 — SPIRITUAL BEGINNINGS
    // ========================================

    {
        day_number: 1,
        day_title: "Spiritual Beginnings",
        time_slot: "Morning",
        place_name: "Kashi Vishwanath Temple",
        estimated_duration: "2 hrs",
        food_recommendation:
            "Try traditional kachori sabzi and chai in the nearby lanes.",
        weather_warning: null,

        photo_url:
            "https://cdn.corenexis.com/f/d6Wmvaxu9Q5.jpg"
    },


    {
        day_number: 1,
        day_title: "Spiritual Beginnings",
        time_slot: "Afternoon",
        place_name: "Manikarnika Ghat",
        estimated_duration: "1 hr",
        food_recommendation:
            "Explore the nearby old lanes and stop for traditional Banarasi snacks.",
        weather_warning: null,

        photo_url:
            "https://cdn.corenexis.com/f/ZP1Lqi3xs2x.jpg"
    },


    {
        day_number: 1,
        day_title: "Spiritual Beginnings",
        time_slot: "Evening",
        place_name: "Dashashwamedh Ghat",
        estimated_duration: "2 hrs",
        food_recommendation:
            "Enjoy masala chai or local street snacks before the evening Aarti.",
        weather_warning: null,

        photo_url:
            "https://cdn.corenexis.com/f/nHYfZqjv6ce.jpg"
    },


    // ========================================
    // DAY 2 — HERITAGE & CULTURE
    // ========================================

    {
        day_number: 2,
        day_title: "Heritage & Culture",
        time_slot: "Morning",
        place_name: "Sarnath",
        estimated_duration: "3 hrs",
        food_recommendation:
            "Enjoy a peaceful breakfast before exploring the Buddhist heritage site.",
        weather_warning: null,

        photo_url:
            "https://cdn.corenexis.com/f/m5vZ3ylRx3S.jpg"
    },


    {
        day_number: 2,
        day_title: "Heritage & Culture",
        time_slot: "Afternoon",
        place_name: "Ramnagar Fort",
        estimated_duration: "2 hrs",
        food_recommendation:
            "Try local refreshments while exploring the historic riverside area.",
        weather_warning: null,

        photo_url:
            "https://cdn.corenexis.com/f/PF8xBxaXVDK.jpg"
    },


    {
        day_number: 2,
        day_title: "Heritage & Culture",
        time_slot: "Evening",
        place_name: "Assi Ghat",
        estimated_duration: "2 hrs",
        food_recommendation:
            "Relax at a riverside café and enjoy local Banarasi chai.",

        weather_warning:
            "Light rain is expected during this time. The riverside experience may be adjusted depending on weather conditions.",

        photo_url:
            "https://cdn.corenexis.com/f/dtQV7hLS3oV.jpg"
    },


    // ========================================
    // DAY 3 — BANARASI EXPERIENCES
    // ========================================

    {
        day_number: 3,
        day_title: "Banarasi Experiences",
        time_slot: "Morning",
        place_name: "Banaras Hindu University",
        estimated_duration: "2 hrs",
        food_recommendation:
            "Enjoy a relaxed breakfast at one of the local cafés around the university.",
        weather_warning: null,

        photo_url:
            "https://cdn.corenexis.com/f/khvhZVZ7ixG.jpg"
    },


    {
        day_number: 3,
        day_title: "Banarasi Experiences",
        time_slot: "Afternoon",
        place_name: "Banarasi Bazaar",
        estimated_duration: "2 hrs",

        sub_places: [
            "Vishwanath Gali",
            "Godowlia Market",
            "Thatheri Bazaar"
        ],

        food_recommendation:
            "Try Banarasi paan and browse silk, handicrafts and traditional souvenirs.",

        weather_warning: null,

        photo_url:
            "https://cdn.corenexis.com/f/rk8hSUqJe5X.jpg"
    },


    {
        day_number: 3,
        day_title: "Banarasi Experiences",
        time_slot: "Evening",
        place_name: "Ganga Boat Ride",
        estimated_duration: "1.5 hrs",
        food_recommendation:
            "End your journey with chai and light snacks along the riverside.",
        weather_warning: null,

        photo_url:
            "https://cdn.corenexis.com/f/RuMg5iddmy6.jpg"
    }

];


// ============================================
// CITY INFORMATION
// ============================================

const cityData = {

    Jaipur: {

        destination: "Jaipur",
        duration: "3 Days",
        budget: "₹15,000",
        itinerary: jaipurItinerary

    },


    Varanasi: {

        destination: "Varanasi",
        duration: "3 Days",
        budget: "₹12,000",
        itinerary: varanasiItinerary

    }

};


// ============================================
// SELECT DESTINATION
// ============================================

// Currently Jaipur is selected.
//
// Later backend will send the destination
// automatically.

let selectedDestination = "Jaipur";


// ============================================
// ACTIVE DATA
// ============================================

let itineraryData =
    cityData[selectedDestination].itinerary;


let tripInfo = {

    destination:
        cityData[selectedDestination].destination,

    duration:
        cityData[selectedDestination].duration,

    budget:
        cityData[selectedDestination].budget

};


// ============================================
// DOM ELEMENTS
// ============================================

const itineraryContainer =
    document.getElementById("itinerary-container");


// ============================================
// GROUP PLACES BY DAY
// ============================================

function groupByDay(data) {

    const groupedDays = {};


    data.forEach(function (place) {

        if (!groupedDays[place.day_number]) {

            groupedDays[place.day_number] = [];

        }


        groupedDays[place.day_number].push(place);

    });


    return groupedDays;

}


// ============================================
// CREATE ONE PLACE CARD
// ============================================

function createPlaceCard(place) {


    // ========================================
    // WEATHER WARNING
    // ========================================

    const weatherHTML = place.weather_warning

        ? `

            <div class="weather-warning">

                <strong>
                    Weather update
                </strong>

                <span>
                    ${place.weather_warning}
                </span>

            </div>

        `

        : "";


    // ========================================
    // SUB PLACES
    // ========================================

    const subPlacesHTML = place.sub_places

        ? `

            <div class="sub-places">

                <span class="detail-label">

                    Markets to explore

                </span>

                <div class="sub-places-list">

                    ${place.sub_places.join(" • ")}

                </div>

            </div>

        `

        : "";


    return `

        <article class="place-card">


            <!-- IMAGE -->

            <div class="place-image">

                <img
                    src="${place.photo_url}"
                    alt="${place.place_name}"
                    loading="lazy"
                >

            </div>



            <!-- CONTENT -->

            <div class="place-content">


                <!-- TIME -->

                <div class="place-time">

                    ${place.time_slot}

                </div>



                <!-- PLACE NAME -->

                <h3 class="place-name">

                    ${place.place_name}

                </h3>



                <!-- DURATION -->

                <div class="place-details">

                    <span class="detail-label">

                        Estimated Duration

                    </span>


                    <span class="detail-value">

                        ${place.estimated_duration}

                    </span>

                </div>



                <!-- SUB PLACES -->

                ${subPlacesHTML}



                <!-- FOOD -->

                <div class="food-recommendation">

                    <strong>

                        Nearby recommendation

                    </strong>

                    <br>

                    ${place.food_recommendation}

                </div>



                <!-- WEATHER -->

                ${weatherHTML}


            </div>


        </article>

    `;

}


// ============================================
// CREATE DAY SECTION
// ============================================

function createDaySection(dayNumber, places) {


    const dayTitle =
        places[0].day_title;


    const placesHTML =
        places
            .map(function (place) {

                return createPlaceCard(place);

            })
            .join("");


    return `

        <section class="day-section">


            <!-- DAY HEADER -->

            <div class="day-header">


                <span class="day-number">

                    Day ${dayNumber}

                </span>


                <span class="day-text">

                    — ${dayTitle}

                </span>


            </div>



            <!-- PLACE CARDS -->

            <div class="places-list">

                ${placesHTML}

            </div>


        </section>

    `;

}


// ============================================
// RENDER ITINERARY
// ============================================

function renderItinerary() {


    if (!itineraryContainer) {

        console.error(
            "Itinerary container not found."
        );

        return;

    }


    const groupedDays =
        groupByDay(itineraryData);


    const sortedDays =
        Object.keys(groupedDays)
            .sort(function (a, b) {

                return a - b;

            });


    itineraryContainer.innerHTML =
        sortedDays
            .map(function (day) {

                return createDaySection(
                    day,
                    groupedDays[day]
                );

            })
            .join("");


    observeDaySections();

}


// ============================================
// SCROLL ANIMATION
// ============================================

function observeDaySections() {


    const sections =
        document.querySelectorAll(
            ".day-section"
        );


    const observer =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.1
            }

        );


    sections.forEach(function (section) {

        observer.observe(section);

    });

}


// ============================================
// NUMBER ANIMATION
// ============================================

function animateNumber(element, target) {


    let current = 0;

    const duration = 1000;

    const steps = 40;

    const increment =
        Math.ceil(target / steps);


    const timer =
        setInterval(function () {


            current += increment;


            if (current >= target) {

                current = target;

                clearInterval(timer);

            }


            element.textContent = current;


        }, duration / steps);

}


// ============================================
// UPDATE SUMMARY
// ============================================

function updateSummaryStats() {


    const totalPlaces =
        itineraryData.length;


    const totalDays =
        new Set(

            itineraryData.map(
                function (place) {

                    return place.day_number;

                }
            )

        ).size;


    const placesElement =
        document.getElementById(
            "places-count"
        );


    const daysElement =
        document.getElementById(
            "days-count"
        );


    const budgetElement =
        document.getElementById(
            "budget-count"
        );


    if (placesElement) {

        animateNumber(
            placesElement,
            totalPlaces
        );

    }


    if (daysElement) {

        animateNumber(
            daysElement,
            totalDays
        );

    }


    if (budgetElement) {

        budgetElement.textContent =
            tripInfo.budget;

    }

}


// ============================================
// UPDATE HERO INFORMATION
// ============================================

function updateTripInfo() {


    const destinationElement =
        document.getElementById(
            "destination-name"
        );


    const durationElement =
        document.getElementById(
            "trip-duration"
        );


    const budgetElement =
        document.getElementById(
            "trip-budget"
        );


    if (destinationElement) {

        destinationElement.textContent =
            tripInfo.destination;

    }


    if (durationElement) {

        durationElement.textContent =
            tripInfo.duration;

    }


    if (budgetElement) {

        budgetElement.textContent =
            tripInfo.budget;

    }

}


// ============================================
// INITIALIZE PAGE
// ============================================

document.addEventListener(
    "DOMContentLoaded",

    function () {


        updateTripInfo();


        renderItinerary();


        updateSummaryStats();


    }

);