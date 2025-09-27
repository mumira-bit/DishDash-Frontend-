import React, { useState } from "react";
import { useAuth } from "./AuthContext";

export default function LoginForm({ onNavigate }) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Use login from AuthContext
      const result = await login(username, password);

      if (result.success) {
        console.log("Login successful!");
        if (onNavigate) onNavigate("home"); // Navigate to home
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "90vh",
      backgroundColor: "#fdf6e3"
    }}>
      <div style={{
        background: "white",
        padding: "2rem",
        borderRadius: "16px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#333" }}>
          Login
        </h2>

        {error && (
          <div style={{
            backgroundColor: "#fee",
            color: "#c33",
            padding: "0.75rem",
            borderRadius: "4px",
            marginBottom: "1rem",
            textAlign: "center",
            fontSize: "0.9rem"
          }}>
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            margin: "10px 0",
            borderRadius: "8px",
            border: "1px solid #ccc",
            boxSizing: "border-box"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            margin: "10px 0",
            borderRadius: "8px",
            border: "1px solid #ccc",
            boxSizing: "border-box"
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            marginTop: "12px",
            padding: "12px",
            backgroundColor: loading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background-color 0.3s ease"
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => onNavigate && onNavigate("signup")}
              style={{
                color: "#007bff",
                cursor: "pointer",
                fontWeight: "bold",
                textDecoration: "underline"
              }}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
