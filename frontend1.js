const BACKEND_URL = "http://127.0.0.1:8000";

const today = new Date().toISOString().split("T")[0];
document.getElementById("checkin").min = today;

async function planTrip() {
    const destination = document.getElementById("destination").value;
    const budget = document.getElementById("budget").value;
    const checkin = document.getElementById("checkin").value;
    const duration = document.getElementById("duration").value;
    const message = document.getElementById("message");

    if (!destination || !budget || !checkin || !duration) {
        message.textContent = "⚠️ Please fill all the details.";
        return;
    }

    if (Number(budget) < 1000) {
        message.textContent = "⚠️ Minimum budget is ₹1,000.";
        return;
    }

    if (Number(duration) < 1 || Number(duration) > 30) {
        message.textContent = "⚠️ Stay duration must be between 1 and 30 days.";
        return;
    }

    const travelData = {
        destination: destination,
        check_in_date: checkin,
        stay_days: Number(duration),
        budget: Number(budget)
    };

    message.textContent = "⏳ Sending trip to backend...";

    try {
        const response = await fetch(`${BACKEND_URL}/api/plan-trip`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(travelData)
        });

        if (!response.ok) {
            throw new Error(`Backend returned ${response.status}`);
        }

        const data = await response.json();

        document.getElementById("dashDestination").textContent = data.trip.destination;
        document.getElementById("dashBudget").textContent = "₹" + Number(data.trip.budget).toLocaleString("en-IN");
        document.getElementById("dashDate").textContent = data.trip.check_in_date;
        document.getElementById("dashDuration").textContent = data.trip.stay_days + " days";
        document.getElementById("tripStatus").textContent = "Trip Ready";
        message.textContent = "✅ Trip details submitted! Opening your itinerary...";

        setTimeout(() => {
            window.location.href = "result.html";
        }, 500);

    } catch (error) {
        console.error(error);
        message.textContent = "❌ Could not connect to the backend. Make sure FastAPI is running on port 8000.";
    }
}
