import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { flights } from "../services/flights";
import Navbar from "../components/Navbar";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const flight = flights.find((f) => f.id === parseInt(id));

  const [name, setName] = useState("");

  if (!flight) {
    return (
      <div>
        <Navbar />
        <div className="p-6">Flight not found</div>
      </div>
    );
  }

  const handlePay = () => {
    const bookingData = {
      ...flight,
      name: name,
    };

    navigate("/payment", { state: bookingData });
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Booking Page ✈️</h2>

        {/* FLIGHT INFO */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h3 className="font-bold">{flight.airline}</h3>
          <p>
            {flight.from} → {flight.to}
          </p>
          <p>
            {flight.departure} - {flight.arrival}
          </p>
          <p className="text-blue-600 font-bold">${flight.price}</p>
        </div>

        {/* PASSENGER */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h3 className="font-bold mb-2">Passenger Details</h3>

          <input
            className="border p-2 rounded-lg w-full"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* PAYMENT BUTTON */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-bold mb-2">Proceed to Payment</h3>

          <button
            onClick={handlePay}
            className="bg-green-600 text-white w-full py-3 rounded-lg hover:bg-green-700 transition"
          >
            Continue to M-Pesa Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Booking;