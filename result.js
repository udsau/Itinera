const BACKEND_URL = "http://127.0.0.1:8000";

let tripData = {
    destination: "",
    budget: 0,
    currency: "₹",
    check_in_date: "",
    stay_days: 0
};

let itineraryData = [];

/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/latest-trip`);
        if (!response.ok) throw new Error("No trip available");

        const payload = await response.json();

if (!payload.trip) {
    throw new Error("No trip available");   
}

tripData = payload.trip;
itineraryData = payload.itinerary || [];

        renderHero();
        renderItinerary();
        renderSummary();
        setupScrollAnimations();
    } catch (error) {
        console.error(error);
        document.getElementById("destinationName").textContent = "No trip found";
        document.getElementById("tripDuration").textContent = "—";
        document.getElementById("tripBudget").textContent = "—";
        document.getElementById("itineraryContainer").innerHTML =
            "<p style=\"padding: 2rem;\">Please go back to the input page and create a trip first.</p>";
    }
});

/* =====================================================
   HERO
===================================================== */

function renderHero() {

    const uniqueDays = [
        ...new Set(
            itineraryData.map(item => item.day_number)
        )
    ];


    document.getElementById("tripDuration").textContent =
    `${tripData.stay_days} Days`;


    document.getElementById("tripDuration").textContent =
        `${uniqueDays.length} Days`;


    document.getElementById("tripBudget").textContent =
    `${tripData.currency || "₹"}${Number(tripData.budget).toLocaleString("en-IN")}`;

}


/* =====================================================
   GROUP PLACES BY DAY
===================================================== */

function groupByDay(data) {

    return data.reduce((groups, item) => {

        const day = item.day_number;


        if (!groups[day]) {

            groups[day] = [];

        }


        groups[day].push(item);


        return groups;

    }, {});

}


/* =====================================================
   CHECK IF DAY IS WEATHER-ADAPTED

   If 70% or more places are indoor,
   show a day-level weather message.

   location_type is used only internally.
   It is NOT displayed as a badge.
===================================================== */

function isIndoorWeatherDay(places) {

    const indoorPlaces = places.filter(
        place => place.location_type === "indoor"
    );


    return (
        indoorPlaces.length / places.length >= 0.7
    );

}


/* =====================================================
   RENDER ITINERARY
===================================================== */

function renderItinerary() {

    const container =
        document.getElementById("itineraryContainer");


    const groupedDays =
        groupByDay(itineraryData);


    Object.keys(groupedDays).forEach(dayNumber => {

        const places =
            groupedDays[dayNumber];


        /* Create day section */

        const daySection =
            document.createElement("section");


        daySection.classList.add(
            "day-section"
        );


        /* Day Header */

        const dayHeader =
            document.createElement("div");


        dayHeader.classList.add(
            "day-header"
        );


        dayHeader.innerHTML = `

            <div class="day-title">

                <span class="day-number">
                    ${String(dayNumber).padStart(2, "0")}
                </span>

                <span class="day-text">
                    Day ${dayNumber}
                </span>

            </div>

        `;


        daySection.appendChild(dayHeader);



        /* =================================
           FULL DAY WEATHER MESSAGE
        ================================= */

        if (isIndoorWeatherDay(places)) {

            const weatherBanner =
                document.createElement("div");


            weatherBanner.classList.add(
                "indoor-day-banner"
            );


            weatherBanner.innerHTML = `

                <strong>Today's plan has been adapted.</strong>
                Rain is expected, so this day's experiences have
                been arranged for more comfortable travel.

            `;


            daySection.appendChild(weatherBanner);

        }



        /* =================================
           ONE CAROUSEL PER DAY
        ================================= */

        const carousel =
            createDayCarousel(places);


        daySection.appendChild(carousel);



        /* =================================
           PLACE CARDS
        ================================= */

        const placesList =
            document.createElement("div");


        placesList.classList.add(
            "places-list"
        );


        places.forEach(place => {

            const card =
                createPlaceCard(place);


            placesList.appendChild(card);

        });


        daySection.appendChild(placesList);


        container.appendChild(daySection);

    });

}


/* =====================================================
   CREATE DAY CAROUSEL
===================================================== */

function createDayCarousel(places) {

    const wrapper =
        document.createElement("div");


    wrapper.classList.add(
        "day-carousel-wrapper"
    );


    const carousel =
        document.createElement("div");


    carousel.classList.add(
        "day-carousel"
    );


    /* Create slides */

    places.forEach((place, index) => {

        const slide =
            document.createElement("div");


        slide.classList.add(
            "carousel-slide"
        );


        slide.innerHTML = `

            <img
                src="${place.photo_url}"
                alt="${place.place_name}"
                loading="${index === 0 ? "eager" : "lazy"}"
            >

            <div class="carousel-caption">
                ${place.place_name}
            </div>

        `;


        carousel.appendChild(slide);

    });


    wrapper.appendChild(carousel);



    /* =================================
       DOT INDICATORS
    ================================= */

    const dotsContainer =
        document.createElement("div");


    dotsContainer.classList.add(
        "carousel-dots"
    );


    places.forEach((place, index) => {

        const dot =
            document.createElement("button");


        dot.classList.add("dot");


        dot.setAttribute(
            "aria-label",
            `View ${place.place_name}`
        );


        if (index === 0) {

            dot.classList.add("active");

        }


        /* Click dot to navigate */

        dot.addEventListener("click", () => {

            const slides =
                carousel.querySelectorAll(
                    ".carousel-slide"
                );


            carousel.scrollTo({

                left: slides[index].offsetLeft,

                behavior: "smooth"

            });

        });


        dotsContainer.appendChild(dot);

    });


    wrapper.appendChild(dotsContainer);



    /* =================================
       UPDATE ACTIVE DOT ON SWIPE
    ================================= */

    carousel.addEventListener("scroll", () => {

        const slides =
            carousel.querySelectorAll(
                ".carousel-slide"
            );


        const dots =
            dotsContainer.querySelectorAll(
                ".dot"
            );


        let closestIndex = 0;

        let closestDistance = Infinity;


        slides.forEach((slide, index) => {

            const distance =
                Math.abs(
                    slide.offsetLeft -
                    carousel.scrollLeft
                );


            if (distance < closestDistance) {

                closestDistance = distance;

                closestIndex = index;

            }

        });


        dots.forEach(dot => {

            dot.classList.remove("active");

        });


        dots[closestIndex]
            .classList.add("active");

    });


    return wrapper;

}


/* =====================================================
   CREATE PLACE CARD
===================================================== */

function createPlaceCard(place) {

    const card =
        document.createElement("article");


    card.classList.add(
        "place-card"
    );


    /* =================================
       CONDITIONAL WEATHER MESSAGE

       Only rendered when weather_warning
       exists.
    ================================= */

    let weatherHTML = "";


    if (
        place.weather_warning &&
        place.weather_warning.trim() !== ""
    ) {

        weatherHTML = `

            <div class="weather-warning">

                <strong>
                    Weather update
                </strong>

                <br>

                ${place.weather_warning}

            </div>

        `;

    }


    /* =================================
       CARD CONTENT
    ================================= */

    card.innerHTML = `

        <div class="place-card-top">

            <div>

                <div class="place-time">
                    ${formatTimeSlot(place.time_slot)}
                </div>


                <h3 class="place-name">
                    ${place.place_name}
                </h3>

            </div>

        </div>



        <!-- DETAILS -->

        <div class="place-details">

            <div class="detail">

                Estimated duration

                <strong>
                    ${place.estimated_duration || "Flexible"}
                </strong>

            </div>

        </div>



        <!-- FOOD -->

        <div class="food-recommendation">

            <strong>
                Nearby recommendation
            </strong>

            <br>

            ${place.food_recommendation}

        </div>



        <!-- CONDITIONAL WEATHER UPDATE -->

        ${weatherHTML}

    `;


    return card;

}


/* =====================================================
   FORMAT TIME SLOT
===================================================== */

function formatTimeSlot(timeSlot) {

    return (
        timeSlot.charAt(0).toUpperCase() +
        timeSlot.slice(1)
    );

}


/* =====================================================
   SUMMARY
===================================================== */

function renderSummary() {

    const placesCount =
        itineraryData.length;


    const daysCount =
        new Set(
            itineraryData.map(
                item => item.day_number
            )
        ).size;


    animateCount(
        document.getElementById("placesCount"),
        placesCount
    );


    animateCount(
        document.getElementById("daysCount"),
        daysCount
    );


    animateCount(
        document.getElementById("budgetCount"),
        tripData.budget,
        "₹"
    );

}


/* =====================================================
   NUMBER COUNT ANIMATION
===================================================== */

function animateCount(
    element,
    target,
    prefix = ""
) {

    const duration = 1400;

    const startTime =
        performance.now();


    function update(currentTime) {

        const elapsed =
            currentTime - startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        /* Ease-out animation */

        const ease =
            1 - Math.pow(
                1 - progress,
                3
            );


        const current =
            Math.floor(
                target * ease
            );


        element.textContent =
            prefix +
            current.toLocaleString("en-IN");


        if (progress < 1) {

            requestAnimationFrame(update);

        }

    }


    requestAnimationFrame(update);

}


/* =====================================================
   SCROLL ANIMATION
===================================================== */

function setupScrollAnimations() {

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

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
                threshold: 0.15
            }

        );


    const daySections =
        document.querySelectorAll(
            ".day-section"
        );


    daySections.forEach(section => {

        observer.observe(section);

    });

}