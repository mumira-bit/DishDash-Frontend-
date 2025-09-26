import React, { useState } from "react";
import { useAuth } from "./AuthContext";

export default function LoginForm({ onSwitchToSignup, onNavigate }) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!username || !password) {
      setError("Please fill all fields");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      console.log('Attempting login with:', { username, password });
      
      const response = await fetch("http://localhost:5002/login", {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('Login successful:', userData);
        
        // Update auth context
        login(userData);
        
        // Navigate to home
        if (onNavigate) onNavigate('home');
      } else {
        const errorData = await response.json();
        console.log('Login failed:', errorData);
        setError(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error - make sure backend is running');
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
        <h2 style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "#333"
        }}>
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
        
        <div style={{
          backgroundColor: "#e3f2fd",
          padding: "0.75rem",
          borderRadius: "4px",
          marginBottom: "1rem",
          fontSize: "0.9rem",
          color: "#1976d2"
        }}>
          <strong>Test Account:</strong><br/>
          Username: testuser<br/>
          Password: password123
        </div>
        
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
        
        <div style={{
          textAlign: "center",
          marginTop: "1rem"
        }}>
          <p>
            Don't have an account?{" "}
            <span 
              onClick={onSwitchToSignup || (() => onNavigate && onNavigate('signup'))}
              style={{
                color: "#007bff",
                cursor: "pointer",
                fontWeight: "bold"
              }}
              onMouseOver={(e) => e.target.style.textDecoration = "underline"}
              onMouseOut={(e) => e.target.style.textDecoration = "none"}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}