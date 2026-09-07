import os
import requests
from dotenv import load_dotenv

# Load secret API key from .env file
load_dotenv()
API_KEY = os.getenv("WEATHER_API_KEY")

def get_weather(destination: str) -> dict:
    """
    Fetches live weather data from OpenWeatherMap API and formats 
    it for the AI travel itinerary generator.
    """
    if not API_KEY:
        return {"error": "API key missing. Add WEATHER_API_KEY to your .env file."}

    url = f"https://api.openweathermap.org/data/2.5/weather?q={destination}&appid={API_KEY}&units=metric"

    try:
        response = requests.get(url, timeout=10)
        data = response.json()

        # Handle city not found or invalid API key errors
        if response.status_code != 200:
            return {"error": data.get("message", "City not found.")}

        # Extract primary weather parameters
        condition = data["weather"][0]["main"]
        description = data["weather"][0]["description"].title()
        temp_celsius = round(data["main"]["temp"])

        # Create a weather warning flag for Gemini AI itinerary generator
        rain_conditions = ["Rain", "Drizzle", "Thunderstorm", "Snow"]
        if condition in rain_conditions:
            weather_warning = f"Rain forecasted ({description}). Recommend indoor attractions."
        elif temp_celsius > 38:
            weather_warning = f"High temperature ({temp_celsius}°C). Limit outdoor activities during afternoon."
        else:
            weather_warning = "Clear conditions - ideal for outdoor sightseeing."

        return {
            "city": data["name"],
            "temp_celsius": temp_celsius,
            "condition": condition,
            "description": description,
            "weather_warning": weather_warning
        }

    except requests.exceptions.RequestException as e:
        return {"error": f"Network error: {str(e)}"}

# Local test runner (runs only when executing weather.py directly)
if __name__ == "__main__":
    print(get_weather("Jaipur"))