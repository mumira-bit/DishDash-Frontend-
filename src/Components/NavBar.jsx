import React from "react";
import { useAuth } from "./AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();

  return (
  <nav
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem 2rem",
      backgroundColor: "#ff6f61",
      color: "#fff",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      borderRadius: "0 0 10px 10px",
      fontFamily: "Arial, sans-serif",
    }}
  >
    <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>DishDash</div>

    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      {user ? (
        <>
          <span style={{ fontWeight: "500" }}>Hello, {user.username}</span>
          <button
            onClick={logout}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#fff",
              color: "#c91b1bff",
              fontWeight: "bold",
              transition: "all 0.2s",
            }}
          
          >
            Logout
          </button>
        </>
      ) : (
        <span style={{ fontStyle: "italic" }}>Discover your taste</span>
      )}
    </div>
  </nav>
);

}
