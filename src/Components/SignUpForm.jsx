import React, { useState } from "react";
import { useAuth } from "./AuthContext";

export default function SignUpForm({ onNavigate }) {
  const { signup } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!username || !email || !password) { setError("Fill all fields"); return; }
    if (password.length < 6) { setError("Password min 6 chars"); return; }

    setLoading(true);
    setError("");

    const result = await signup(username, email, password);
    if (result.success) {
      onNavigate("home"); 
    } else {
      setError(result.error || "Signup failed");
    }

    setLoading(false);
  };

  return (
    <div>
      {/* keep your existing styling and inputs */}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </button>
      {error && <div>{error}</div>}
    </div>
  );
}
