import React from "react";
import { getBookings, getFlights } from "../services/storage";

function Admin() {
  const bookings = getBookings();
  const flights = getFlights();

  return (
    <div className="p-6">
      <h2>Admin Panel</h2>

      <h3>Flights</h3>
      {flights.map(f => (
        <div key={f.id}>{f.from} → {f.to}</div>
      ))}

      <h3>Bookings</h3>
      {bookings.map(b => (
        <div key={b.id}>{b.from} → {b.to}</div>
      ))}
    </div>
  );
}

export default Admin;