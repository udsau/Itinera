import json

from ai_planner import run_pipeline
from osm_map import get_places_coordinates


# --------------------------------
# 1. LOAD YOUR DATA
# --------------------------------

with open("tourist_spots_final.json") as f:
    all_places = json.load(f)

with open("jaipur_varanasi_restaurants_expanded.json") as f:
    all_restaurants = json.load(f)


# --------------------------------
# 2. USER'S TRIP INPUT
# --------------------------------

city = "Jaipur"
stay_days = 2
budget = 15000


# --------------------------------
# 3. GET PLACES FOR THAT CITY
# --------------------------------

places = all_places[city]
restaurants = all_restaurants[city]


# --------------------------------
# 4. TEMPORARY WEATHER DATA
# --------------------------------

# Your teammate currently uses this
# only for testing.

for p in places:
    p["weather_condition"] = (
        "rain"
        if p["location_type"] == "outdoor"
        else "clear"
    )


# --------------------------------
# 5. RUN AI
# --------------------------------

result = run_pipeline(
    city=city,
    places=places,
    restaurants_raw=restaurants,
    stay_days=stay_days,
    budget=budget
)


# --------------------------------
# 6. GET AI'S RECOMMENDED PLACES
# --------------------------------

recommended_places = result["recommended_places"]

print("\nAI RECOMMENDED PLACES:")
for place in recommended_places:
    print("-", place)


# --------------------------------
# 7. SEND PLACES TO OSM
# --------------------------------

locations = get_places_coordinates(
    city,
    recommended_places
)


# --------------------------------
# 8. DISPLAY COORDINATES
# --------------------------------

print("\nOSM LOCATIONS:")

for location in locations:
    print(
        f"{location['name']} -> "
        f"{location['latitude']}, "
        f"{location['longitude']}"
    )