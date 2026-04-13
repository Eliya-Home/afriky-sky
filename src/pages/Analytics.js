import React from "react";
import Navbar from "../components/Navbar";
import { getBookings, getCommissions, getInvoices } from "../services/storage";
import { getCurrentUser } from "../services/auth";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PieController,
  ArcElement,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PieController,
  ArcElement
);

function Analytics() {
  const user = getCurrentUser();

  const bookings = getBookings();
  const commissions = getCommissions();
  const invoices = getInvoices();

  const myBookings = bookings.filter(b => b.airlineId == user.airlineId);
  const myCommissions = commissions.filter(c => c.airlineId == user.airlineId);
  const myInvoices = invoices.filter(i => i.airlineId == user.airlineId);

  const revenue = myBookings.reduce((a,b)=>a+b.price,0);
  const commission = myCommissions.reduce((a,b)=>a+b.amount,0);
  const invoicesCount = myInvoices.length;

  const barData = {
    labels: ["Revenue", "Commission", "Invoices"],
    datasets: [{
      label: "AFRIKY SKY Stats",
      data: [revenue, commission, invoicesCount],
      backgroundColor: ["blue", "green", "orange"],
    }],
  };

  const pieData = {
    labels: ["Revenue", "Commission"],
    datasets: [{
      data: [revenue, commission],
      backgroundColor: ["#36A2EB", "#FF6384"],
    }],
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">

        <h2 className="text-2xl font-bold mb-4">
          Analytics Dashboard 📊
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <Bar data={barData} />
          <Pie data={pieData} />
        </div>

      </div>
    </div>
  );
}

export default Analytics;