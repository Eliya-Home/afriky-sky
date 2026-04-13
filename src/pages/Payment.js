import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state;

  if (!booking) {
    return (
      <div>
        <Navbar />
        <div className="p-6">No booking found</div>
      </div>
    );
  }

  // =========================
  // INVOICE DOWNLOAD
  // =========================
  const downloadInvoice = async (data) => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/invoice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (result.downloadUrl) {
        const link = document.createElement("a");
        link.href = result.downloadUrl;
        link.setAttribute("download", "invoice.pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    } catch (err) {
      console.log("Invoice error:", err);
    }
  };

  // =========================
  // PAYMENT CONFIRMATION
  // =========================
  const confirmPayment = async () => {
    const finalBooking = {
      ...booking,
      id: Date.now(),
      status: "PAID",
      paymentMethod: "M-PESA / CARD",
    };

    try {
      await downloadInvoice(finalBooking);

      alert("Payment successful & invoice downloaded!");

      navigate("/ticket", {
        state: finalBooking,
      });
    } catch (err) {
      alert("Payment failed");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">
          Payment 💳
        </h2>

        <div className="bg-white p-4 shadow rounded mb-4">
          <p>
            {booking.from} → {booking.to}
          </p>

          <p className="text-blue-600 font-bold">
            ${booking.price}
          </p>
        </div>

        <button
          onClick={confirmPayment}
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          Pay & Generate Invoice
        </button>
      </div>
    </div>
  );
}

export default Payment;