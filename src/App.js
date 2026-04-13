import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Payment from "./pages/Payment";
import Ticket from "./pages/Ticket";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Analytics from "./pages/Analytics";
import AirlineDashboard from "./pages/AirlineDashboard";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<Admin />} />

        <Route
          path="/airline-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AirlineDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/analytics" element={<Analytics />} />

      </Routes>
    </Router>
  );
}

export default App;