import React from "react";

function RecipeCard({ recipe, onViewDetails }) {
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(recipe);
    }
  };

  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "12px",
      padding: "1.5rem",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      backgroundColor: "white",
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "pointer"
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
    }}>
      <h3 style={{
        fontSize: "1.125rem",
        fontWeight: "bold",
        marginBottom: "0.5rem",
        color: "#333"
      }}>
        {recipe.title}
      </h3>
      <p style={{
        color: "#666",
        marginBottom: "1rem",
        lineHeight: "1.4"
      }}>
        {recipe.description}
      </p>
      <button
        onClick={handleViewDetails}
        style={{
          color: "#007bff",
          fontWeight: "500",
          background: "none",
          border: "none",
          cursor: "pointer",
          textDecoration: "none"
        }}
        onMouseOver={(e) => e.target.style.textDecoration = "underline"}
        onMouseOut={(e) => e.target.style.textDecoration = "none"}
      >
        View Details →
      </button>
    </div>
  );
}

export default RecipeCard;