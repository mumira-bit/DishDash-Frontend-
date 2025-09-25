import React, { useState } from "react";
import { useAuth } from "./AuthContext";

export default function SignUpForm({ onSwitchToLogin }) {
  const { signup } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await signup(username, email, password);
    if (data.error) setError(data.error);
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
        Already have an account? <span onClick={onSwitchToLogin} style={{ cursor: "pointer", color: "blue" }}>Login</span>
      </p>
    </form>
  );
}
