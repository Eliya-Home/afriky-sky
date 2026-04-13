import React, { useState } from "react";
import { getAirlines } from "../services/storage";
import { saveUser } from "../services/auth";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [airlineId, setAirlineId] = useState("");

  const airlines = getAirlines();

  const register = () => {
    saveUser({
      email,
      password,
      role: "admin",
      airlineId,
    });

    alert("Registered");
  };

  return (
    <div className="p-6">
      <h2>Register Airline</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <select onChange={(e) => setAirlineId(e.target.value)}>
        <option>Select Airline</option>
        {airlines.map((a) => (
          <option value={a.id}>{a.name}</option>
        ))}
      </select>

      <button onClick={register}>
        Register
      </button>
    </div>
  );
}

export default Auth;