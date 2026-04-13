import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  getBookings,
  getCommissions,
  getInvoices,
} from "../services/storage";
import { getCurrentUser } from "../services/auth";

function AirlineDashboard() {
  const user = getCurrentUser();

  const [invoices, setInvoices] = useState(getInvoices());

  const bookings = getBookings();
  const commissions = getCommissions();

  const myBookings = bookings.filter(
    (b) => b.airlineId == user.airlineId
  );

  const myInvoices = invoices.filter(
    (i) => i.airlineId == user.airlineId
  );

  const myCommissions = commissions.filter(
    (c) => c.airlineId == user.airlineId
  );

  const totalSales = myBookings.reduce(
    (a, b) => a + b.price,
    0
  );

  const totalCommission = myCommissions.reduce(
    (a, b) => a + b.amount,
    0
  );

  const handlePayment = (invoice) => {
    alert(`
💳 PAYMENT DETAILS

Invoice ID: ${invoice.id}
Amount: $${invoice.amount}

Paybill: 123456
Account: AFRIKY SKY

OR link:
${invoice.paymentLink}
    `);
  };

  const markPaid = (id) => {
    const updated = invoices.map((inv) =>
      inv.id === id ? { ...inv, status: "paid" } : inv
    );

    localStorage.setItem("invoices", JSON.stringify(updated));
    setInvoices(updated);
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">

        <h2 className="text-2xl font-bold mb-4">
          Airline Dashboard 📊
        </h2>

        {/* SUMMARY */}
        <div className="bg-white p-4 rounded shadow mb-4">
          <p>Total Sales: ${totalSales}</p>
          <p>Total Commission: ${totalCommission}</p>
        </div>

        {/* INVOICES */}
        <h3 className="font-bold mb-2">Invoices 📄</h3>

        {myInvoices.map((inv) => (
          <div key={inv.id} className="border p-3 mb-3">
            <p>ID: {inv.id}</p>
            <p>Amount: ${inv.amount}</p>
            <p>Status: {inv.status}</p>

            <div className="flex gap-2 mt-2">

              <button
                onClick={() => handlePayment(inv)}
                className="bg-purple-600 text-white px-3 py-1"
              >
                Pay Now 💳
              </button>

              {inv.status === "unpaid" && (
                <button
                  onClick={() => markPaid(inv.id)}
                  className="bg-green-600 text-white px-3 py-1"
                >
                  Mark Paid
                </button>
              )}

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default AirlineDashboard;