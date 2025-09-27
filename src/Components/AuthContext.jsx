import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Check session once on app load
  useEffect(() => {
    fetch("https://dishdash-7lzx.onrender.com/check_session", {
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  const login = async (username, password) => {
    const res = await fetch("https://dishdash-7lzx.onrender.com/login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      setUser(data); // ✅ update context
      return { success: true };
    } else {
      const error = await res.json();
      return { success: false, error: error.message };
    }
  };

  const signup = async (username, email, password) => {
    const res = await fetch("https://dishdash-7lzx.onrender.com/signup", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify({ username, email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      setUser(data); // ✅ auto-login
      return { success: true };
    } else {
      const error = await res.json();
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    await fetch("https://dishdash-7lzx.onrender.com/logout", {
      method: "DELETE",
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
