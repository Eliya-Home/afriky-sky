import React from "react";
import { getFlights } from "../services/storage";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const flights = getFlights();

  return (
    <div className="p-6">
      <h2>Available Flights ✈️</h2>

      {flights.map((f) => (
        <div key={f.id} className="border p-3 m-2">
          <p>{f.from} → {f.to}</p>
          <p>${f.price}</p>

          <button onClick={() => navigate("/payment", { state: f })}>
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;