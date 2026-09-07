from osm_map import get_places_coordinates


city = "Jaipur"

places = [
    "Hawa Mahal",
    "City Palace",
    "Amber Fort"
]

locations = get_places_coordinates(city, places)

print(locations)