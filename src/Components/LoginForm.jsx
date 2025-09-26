import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import "./LoginForm.css";

export default function LoginForm({ onSwitchToSignup, onNavigate }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }
    
    // Simulate login
    login({ username: email.split('@')[0] || email });
    if (onNavigate) onNavigate('home');
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        
        <input 
          type="email"
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button onClick={handleSubmit}>Login</button>
        
        <div className="switch-auth">
          <p>
            Don't have an account?{" "}
            <span 
              onClick={onSwitchToSignup || (() => onNavigate && onNavigate('signup'))}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}