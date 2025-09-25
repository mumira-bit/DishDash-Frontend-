import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import "./LoginForm.css"

export default function LoginForm({ onSwitchToSignup }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) return setError("Please fill all fields");
    login({ username: email });
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "1rem", maxWidth: "300px" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
      <p>
        Don't have an account?{" "}
        <span onClick={onSwitchToSignup} style={{ cursor: "pointer", color: "blue" }}>
          Signup
        </span>
      </p>
    </form>
  );
}
