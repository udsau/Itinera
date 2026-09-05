"""
Your AI decision engine, v2 — rain-flag -> schedule (with swap+drop) -> meal.

Reordered from the original version so each step only relies on information
that actually exists yet: meal recommendations now attach AFTER scheduling,
not before, which fixes the inconsistent slot bug from testing. Weather
swapping now happens at scheduling time (where picking between alternatives
actually makes sense), not on the flat candidate list.

SETUP:
1. pip install -q -U google-genai
2. Set your key:  $env:GEMINI_API_KEY="your-key-here"      (Windows)
                  export GEMINI_API_KEY="your-key-here"    (Mac/Linux)
3. Put this file in the same folder as:
   - tourist_spots_final.json
   - jaipur_varanasi_restaurants_expanded.json
4. Run: python ai_engine.py
"""

import os
import json
import time
from google import genai

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])


def call_ai(system_prompt: str, input_data: dict, retries: int = 3) -> dict:
    """Sends data to Gemini with a system prompt, returns parsed JSON.
    Falls back gracefully if the model wraps JSON in markdown fences, and
    retries with a longer wait specifically for quota/rate-limit errors."""
    for attempt in range(retries):
        try:
            interaction = client.interactions.create(
                model="gemini-flash-lite-latest",  # higher free-tier quota than -latest
                system_instruction=system_prompt,
                input=json.dumps(input_data),
            )
            text = interaction.output_text.strip()
            if text.startswith("```"):
                text = text.strip("`")
                text = text.split("\n", 1)[1] if "\n" in text else text
            return json.loads(text)
        except Exception as e:
            if attempt < retries - 1:
                is_quota_error = "quota" in str(e).lower() or "429" in str(e)
                wait = 45 if is_quota_error else 3 * (attempt + 1)
                print(f"  Hit an error ({e}). Retrying in {wait}s...")
                time.sleep(wait)
            else:
                raise


def flatten_restaurants(city_restaurant_data: dict) -> list:
    """Turns the 5_star/4_star/3_star buckets into one flat list."""
    return [r for tier in city_restaurant_data.values() for r in tier]


def compute_budget_tier(total_budget: int, stay_days: int) -> str:
    """Rough per-meal budget -> cost_category tier. Simple math, not AI."""
    per_meal_budget = total_budget / stay_days / 2  # ~2 main meals/day
    if per_meal_budget < 800:
        return "budget"
    elif per_meal_budget < 2000:
        return "mid_range"
    elif per_meal_budget < 4000:
        return "premium"
    return "luxury"


# ---------- The 3 prompts, in their NEW order ----------

RAIN_FLAG_PROMPT = """You are the weather-flagging step of a trip-planning pipeline. You receive a
list of candidate places and mark which ones are risky to visit given the
current weather, WITHOUT removing, adding, or reordering anything.

You will receive "places", a JSON array. Each place has:
- place_name, location_type ("indoor"/"outdoor"/"mixed"), weather_condition,
  priority_tier (1, 2, or 3 - 1 is most important), popularity_rank

RULES:
1. If location_type is "outdoor" and weather_condition is bad (rain, storm,
   snow), mark weather_risk: true.
2. If location_type is "mixed", mark weather_risk: true only when weather is
   SEVERE (storm, heavy rain, extreme heat) - light rain alone isn't enough.
3. "indoor" places are always weather_risk: false.
4. Preserve every other field exactly as given.

Return ONLY valid JSON, no other text:
{ "places": [ { "place_name": "...", "location_type": "...", "priority_tier": 0,
"popularity_rank": 0, "weather_risk": false } ] }"""

SCHEDULE_PROMPT = """You are the scheduling step of a trip-planning pipeline. You receive
weather-flagged candidate places and fit the best ones into real days and time
slots, preferring weather-safe alternatives over risky ones when possible, and
dropping low-priority stops if there isn't enough time.

You will receive:
- "places": JSON array (place_name, location_type, priority_tier,
  popularity_rank, weather_risk)
- "travel_time_mins": nested lookup - each place_name maps to a dict of
  {other_place_name: minutes}, covering every pair.
- "stay_days": number of days
- "hours_per_day": usable hours per day (assume 8 if not given)

RULES:
1. When choosing which places to schedule, if a place has weather_risk: true
   and there is an UNUSED place (not scheduled elsewhere) with weather_risk:
   false and a similar priority_tier, prefer scheduling that alternative
   instead. If no such alternative exists, schedule the risky place anyway.
2. For any consecutive scheduled pair where EITHER has weather_risk: true, add
   15 extra minutes to the travel time between them when checking if a day
   fits within hours_per_day.
3. Distribute places across days 1 to stay_days, grouping nearby places (using
   travel_time_mins), roughly ordered by popularity_rank within each day.
4. Each day has exactly 3 slots: "Morning", "Afternoon", "Evening".
5. If a day exceeds hours_per_day, drop priority_tier 3 places first, then
   tier 2 if still needed. Never drop tier 1 unless truly necessary.
6. For each scheduled place: if it was kept DESPITE weather_risk being true (no
   safe alternative was available), write a weather_warning under 15 words for
   a tourist. Otherwise weather_warning is null.
7. If a travel_time_mins pair is missing, assume 30 minutes.

Return ONLY valid JSON, no other text:
{ "itinerary": [ { "day_number": 1, "time_slot": "Morning", "place_name": "...",
"priority_tier": 0, "weather_warning": null } ] }"""

def enforce_priority_order(itinerary: list, flagged_places: list) -> list:
    """Safety net, no AI involved: if the schedule kept a lower-priority place
    while a higher-priority one got dropped, swap them in. This is a hard
    rule (never drop tier 1 while tier 3 survives), and code enforces hard
    rules more reliably than trusting the AI to always follow them."""
    scheduled_names = {item["place_name"] for item in itinerary}
    by_name = {p["place_name"]: p for p in flagged_places}
    unscheduled = [p for name, p in by_name.items() if name not in scheduled_names]
    unscheduled.sort(key=lambda p: p["priority_tier"])  # best (lowest number) first

    for item in itinerary:
        for candidate in unscheduled:
            if candidate["priority_tier"] < item["priority_tier"]:
                item["place_name"] = candidate["place_name"]
                item["priority_tier"] = candidate["priority_tier"]
                item["weather_warning"] = (
                    "Weather may affect this spot today."
                    if candidate.get("weather_risk") else None
                )
                scheduled_names.add(candidate["place_name"])
                unscheduled.remove(candidate)
                break

    return itinerary


def attach_food_recommendations(itinerary: list, restaurants_raw: dict,
                                 budget_tier: str) -> list:
    """Pure code, no AI call. This is just sorting/filtering, which code does
    reliably every time -- unlike the AI, which was skipping days and picking
    the wrong slot when this was left as a prompt."""
    cost_order = ["budget", "mid_range", "premium", "luxury"]
    max_idx = cost_order.index(budget_tier)

    affordable = [r for r in flatten_restaurants(restaurants_raw)
                  if cost_order.index(r["cost_category"]) <= max_idx]
    affordable.sort(key=lambda r: -r["rating"])  # best-rated first

    used_restaurant_names = set()
    days = sorted(set(item["day_number"] for item in itinerary))

    for day in days:
        day_items = [item for item in itinerary if item["day_number"] == day]
        target = next((item for item in day_items
                       if item["time_slot"] == "Afternoon"), None)
        if target is None and day_items:
            target = day_items[0]  # fallback: no Afternoon slot that day
        if target is None:
            continue

        pick = next((r for r in affordable
                     if r["name"] not in used_restaurant_names), None)
        target["food_recommendation"] = pick["name"] if pick else None
        if pick:
            used_restaurant_names.add(pick["name"])

    for item in itinerary:
        item.setdefault("food_recommendation", None)

    return itinerary


def run_pipeline(places: list, restaurants_raw: dict, stay_days: int,
                  budget: int, hours_per_day: int = 8) -> dict:
    """Runs rain-flag -> schedule -> meal, in that order."""
    step1 = call_ai(RAIN_FLAG_PROMPT, {"places": places})

    travel_times = {p["place_name"]: p["travel_time_mins"] for p in places}
    step2 = call_ai(SCHEDULE_PROMPT, {
        "places": step1["places"],
        "travel_time_mins": travel_times,
        "stay_days": stay_days,
        "hours_per_day": hours_per_day,
    })
    step2["itinerary"] = enforce_priority_order(step2["itinerary"], step1["places"])

    final_itinerary = attach_food_recommendations(
        itinerary=step2["itinerary"],
        restaurants_raw=restaurants_raw,
        budget_tier=compute_budget_tier(budget, stay_days),
    )
    return {"itinerary": final_itinerary}


if __name__ == "__main__":
    with open("tourist_spots_final.json") as f:
        all_places = json.load(f)
    with open("jaipur_varanasi_restaurants_expanded.json") as f:
        all_restaurants = json.load(f)

    city = "Jaipur"
    places = all_places[city]

    # fake test: pretend it's raining today, to check the rain-flag step fires
    for p in places:
        p["weather_condition"] = "rain" if p["location_type"] == "outdoor" else "clear"

    result = run_pipeline(
        places=places,
        restaurants_raw=all_restaurants[city],
        stay_days=2,
        budget=15000,
    )

    print(json.dumps(result, indent=2))