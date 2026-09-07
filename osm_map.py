import requests
import time


def get_coordinates(place_name: str, city_name: str) -> dict:
    """
    Converts a place name into latitude and longitude
    using OpenStreetMap's Nominatim service.
    """

    url = "https://nominatim.openstreetmap.org/search"

    params = {
        "q": f"{place_name}, {city_name}",
        "format": "json",
        "limit": 1
    }

    headers = {
        "User-Agent": "TravelPlanner/1.0"
    }

    try:
        response = requests.get(
            url,
            params=params,
            headers=headers,
            timeout=10
        )

        response.raise_for_status()
        data = response.json()

        if not data:
            return {
                "name": place_name,
                "error": "Location not found"
            }

        return {
            "name": place_name,
            "latitude": float(data[0]["lat"]),
            "longitude": float(data[0]["lon"])
        }

    except requests.exceptions.RequestException as e:
        return {
            "name": place_name,
            "error": f"Network error: {str(e)}"
        }


def get_places_coordinates(city_name: str, places: list) -> list:
    """
    Converts a list of place names into coordinates.
    """

    results = []

    for place in places:
        result = get_coordinates(place, city_name)

        if "latitude" in result and "longitude" in result:
            results.append(result)

        time.sleep(1)

    return results