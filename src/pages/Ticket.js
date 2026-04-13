import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { QRCodeCanvas } from "qrcode.react";

function Ticket() {
  const location = useLocation();
  const navigate = useNavigate();

  const ticket = location.state;

  if (!ticket) {
    return (
      <div>
        <Navbar />
        <div className="p-6">No ticket found</div>
      </div>
    );
  }

  // ===== DOWNLOAD FUNCTION =====
  const handleDownload = () => {
    window.print();
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">

        <h2 className="text-2xl font-bold mb-4">
          🎫 Your Flight Ticket
        </h2>

        {/* TICKET CARD */}
        <div className="bg-white shadow p-6 rounded">

          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-bold">
                AFRIKY SKY AIRLINES
              </h3>

              <p className="text-gray-600">
                {ticket.from} → {ticket.to}
              </p>

              <p className="mt-2">
                💰 Price: <b>${ticket.price}</b>
              </p>

              <p>
                💳 Payment: {ticket.paymentMethod}
              </p>

              <p>
                🆔 Booking ID: {ticket.id}
              </p>
            </div>

            {/* QR CODE */}
            <div className="text-center">
              <QRCodeCanvas
                value={JSON.stringify(ticket)}
                size={120}
              />
              <p className="text-xs mt-2">Scan Ticket</p>
            </div>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="mt-4 flex gap-2">

          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2"
          >
            Download Ticket
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-600 text-white px-4 py-2"
          >
            Back to Flights
          </button>

        </div>

      </div>
    </div>
  );
}

export default Ticket;