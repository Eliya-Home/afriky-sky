import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { flights } from "../services/flights";
import { predictPrice } from "../services/ai";

function Home() {
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [prediction, setPrediction] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  // FILTER LOGIC
  const filteredFlights = flights.filter((f) => {
    return (
      f.from.toLowerCase().includes(from.toLowerCase()) &&
      f.to.toLowerCase().includes(to.toLowerCase())
    );
  });

  // AI PRICE FUNCTION
  const checkPrice = async (flight) => {
    setLoadingAI(true);
    setPrediction("");

    const res = await predictPrice(flight);

    setPrediction(res);
    setLoadingAI(false);
  };

  return (
    <div>
      <Navbar />

      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">
          Search Flights ✈️
        </h2>

        {/* SEARCH */}
        <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-3">
          <input
            className="border p-2 rounded w-full"
            placeholder="From (e.g. Dar)"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />

          <input
            className="border p-2 rounded w-full"
            placeholder="To (e.g. Nairobi)"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        {/* FLIGHTS */}
        <div className="grid gap-4">
          {filteredFlights.map((flight) => (
            <div
              key={flight.id}
              className="bg-white p-4 rounded-xl shadow"
            >
              <h3 className="font-bold text-lg">
                {flight.airline}
              </h3>

              <p>
                {flight.from} → {flight.to}
              </p>

              <p>
                {flight.departure} - {flight.arrival}
              </p>

              <p className="text-blue-600 font-bold">
                ${flight.price}
              </p>

              {/* ACTIONS */}
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() =>
                    navigate(`/booking/${flight.id}`)
                  }
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Book
                </button>

                {/* AI PRICE BUTTON */}
                <button
                  onClick={() => checkPrice(flight)}
                  className="bg-purple-600 text-white px-3 py-1 rounded"
                >
                  Predict Price 📈
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* AI RESULT */}
        {loadingAI && (
          <p className="mt-4 text-gray-600">
            Analyzing price...
          </p>
        )}

        {prediction && (
          <div className="bg-white p-4 mt-4 rounded shadow">
            <h3 className="font-bold">AI Price Advice:</h3>
            <p>{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;