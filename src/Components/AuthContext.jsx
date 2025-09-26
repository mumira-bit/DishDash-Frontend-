import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for existing session on app load
    fetch("http://localhost:5002/check_session", { 
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Not logged in');
        }
      })
      .then((data) => {
        console.log('Session check success:', data);
        setUser(data);
      })
      .catch((error) => {
        console.log('No active session:', error);
        setUser(null);
      });
  }, []);

  const login = async (username, password) => {
    try {
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
        console.log('Login success:', userData);
        setUser(userData);
        return { success: true };
      } else {
        const errorData = await response.json();
        console.log('Login failed:', errorData);
        return { success: false, error: errorData.message };
      }
    } catch (error) {
      console.log('Login error:', error);
      return { success: false, error: 'Network error' };
    }
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:5002/logout", {
        method: "DELETE",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('Logout success');
      setUser(null);
    } catch (error) {
      console.log('Logout error:', error);
      setUser(null); // Logout locally even if server request fails
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}