import React, { useState } from "react";
import { loginUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = loginUser(email, password);

    if (user) {
      alert("Login successful");

      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "airline") {
        navigate("/airline-dashboard");
      } else {
        navigate("/dashboard");
      }
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="p-6">
      <h2>Login</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;