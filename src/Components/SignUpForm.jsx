import React, { useState } from "react";
import { useAuth } from "./AuthContext";

export default function SignUpForm({ onSwitchToLogin }) {
  const { login } = useAuth(); // For simplicity, login user after signup
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) return setError("Please fill all fields");
    login({ username }); // Simulate signup
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "1rem", maxWidth: "300px" }}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Signup</button>
      <p>
        Already have an account?{" "}
        <span onClick={onSwitchToLogin} style={{ cursor: "pointer", color: "blue" }}>
          Login
        </span>
      </p>
    </form>
  );
}
