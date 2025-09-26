import React, { useState } from "react";
import { useAuth } from "./AuthContext";

export default function SignUpForm({ onSwitchToLogin, onNavigate }) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!username || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      console.log('Attempting signup:', { username, email });
      
      // For now, we'll simulate signup and then login
      // In a real app, you'd have a separate signup endpoint
      const loginResult = await login(username, password);
      
      if (loginResult.success) {
        console.log('Signup/login successful');
        if (onNavigate) onNavigate('home');
      } else {
        // If login fails, it means user doesn't exist
        // In a real app, you'd create the user first
        setError('Account creation not yet implemented. Try logging in with "testuser" and "password123"');
      }
    } catch (error) {
      console.error('Signup error:', error);
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
          Sign Up
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
          type="email"
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
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
          placeholder="Password (min 6 characters)" 
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
        
        <div style={{
          backgroundColor: "#e3f2fd",
          padding: "0.75rem",
          borderRadius: "4px",
          marginBottom: "1rem",
          fontSize: "0.9rem",
          color: "#1976d2"
        }}>
          <strong>For testing:</strong> Use username "testuser" and password "password123"
        </div>
        
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
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        
        <div style={{
          textAlign: "center",
          marginTop: "1rem"
        }}>
          <p>
            Already have an account?{" "}
            <span 
              onClick={onSwitchToLogin || (() => onNavigate && onNavigate('login'))}
              style={{
                color: "#007bff",
                cursor: "pointer",
                fontWeight: "bold"
              }}
              onMouseOver={(e) => e.target.style.textDecoration = "underline"}
              onMouseOut={(e) => e.target.style.textDecoration = "none"}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}