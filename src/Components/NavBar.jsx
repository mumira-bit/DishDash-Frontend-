import React from "react";
import { useAuth } from "./AuthContext";

export default function NavBar({ onNavigate }) {
  const { user, logout } = useAuth();

  const handleNavigation = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <nav style={{ 
      padding: "1rem", 
      borderBottom: "1px solid #ccc",
      backgroundColor: "#f8f9fa",
      display: "flex",
      alignItems: "center",
      gap: "1rem"
    }}>
      <button 
        onClick={() => handleNavigation('home')}
        style={{ 
          marginRight: "1rem", 
          fontWeight: "bold", 
          textDecoration: "none", 
          color: "#007bff",
          fontSize: "1.2rem",
          background: "none",
          border: "none",
          cursor: "pointer"
        }}
      >
        🍳 DishDash
      </button>
      
      {user ? (
        <>
          <button 
            onClick={() => handleNavigation('recipes')}
            style={{ 
              textDecoration: "none", 
              color: "#007bff",
              padding: "0.5rem",
              borderRadius: "4px",
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#e9ecef"}
            onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
          >
            Browse Recipes
          </button>
          <button 
            onClick={() => handleNavigation('create-recipe')}
            style={{ 
              textDecoration: "none", 
              color: "#007bff",
              padding: "0.5rem",
              borderRadius: "4px",
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#e9ecef"}
            onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
          >
            Create Recipe
          </button>
          
          <span style={{ marginLeft: "auto", marginRight: "1rem" }}>
            Hello, {user.username}!
          </span>
          <button 
            onClick={logout}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <span style={{ marginLeft: "auto", marginRight: "1rem" }}>
            Discover your taste ~
          </span>
          <button 
            onClick={() => handleNavigation('login')}
            style={{ 
              textDecoration: "none", 
              color: "#007bff",
              padding: "0.5rem",
              borderRadius: "4px",
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#e9ecef"}
            onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
          >
            Login
          </button>
          <button 
            onClick={() => handleNavigation('signup')}
            style={{ 
              textDecoration: "none", 
              color: "#007bff",
              padding: "0.5rem",
              borderRadius: "4px",
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#e9ecef"}
            onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
          >
            Sign Up
          </button>
        </>
      )}
    </nav>
  );
}