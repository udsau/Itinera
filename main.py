from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Itinera Backend 2")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TripRequest(BaseModel):
    destination: str
    check_in_date: str
    stay_days: int
    budget: float


latest_trip = None


@app.get("/")
def home():
    return {"message": "Itinera Backend 2 is running"}


@app.post("/api/plan-trip")
def plan_trip(trip: TripRequest):
    global latest_trip

    latest_trip = {
        "destination": trip.destination,
        "check_in_date": trip.check_in_date,
        "stay_days": trip.stay_days,
        "budget": trip.budget,
    }

    return {
        "status": "success",
        "trip": latest_trip,
    }


@app.get("/api/latest-trip")
def latest_trip_endpoint():
    if latest_trip is None:
        return {"trip": None, "itinerary": []}

    # Dummy itinerary for testing the frontend connection.
    # Later, replace this block with Backend 1 + AI Engine output.
    places = [
        {
            "day_number": 1,
            "time_slot": "morning",
            "place_name": "Main Landmark",
            "priority_tier": 1,
            "food_recommendation": "Restaurant nearby",
            "weather_warning": "",
            "estimated_duration": "2 hrs",
            "location_type": "outdoor",
            "photo_url": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
        }
    ]
    return {
        "trip": latest_trip,
        "itinerary": places,
    }
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
