import React from "react";

function RecipeDetail({ recipe, onBack }) {
  if (!recipe) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Recipe not found</h2>
        <button 
          onClick={onBack}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "1rem"
          }}
        >
          Back to Recipes
        </button>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: "800px",
      margin: "2rem auto",
      padding: "0 1rem"
    }}>
      <button 
        onClick={onBack}
        style={{
          color: "#007bff",
          background: "none",
          border: "none",
          cursor: "pointer",
          marginBottom: "1.5rem",
          fontSize: "1rem"
        }}
        onMouseOver={(e) => e.target.style.textDecoration = "underline"}
        onMouseOut={(e) => e.target.style.textDecoration = "none"}
      >
        ← Back to Recipes
      </button>
      
      <div style={{
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          color: "#333"
        }}>
          {recipe.title}
        </h1>
        
        <div style={{
          height: "300px",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#666"
        }}>
          Recipe Image Placeholder
        </div>
        
        <p style={{
          fontSize: "1.125rem",
          color: "#555",
          marginBottom: "2rem",
          lineHeight: "1.6"
        }}>
          {recipe.description}
        </p>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem"
        }}>
          <div>
            <h3 style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              color: "#333"
            }}>
              Ingredients
            </h3>
            <ul style={{
              listStyle: "disc",
              paddingLeft: "1.5rem",
              lineHeight: "1.6"
            }}>
              <li>Sample ingredient 1</li>
              <li>Sample ingredient 2</li>
              <li>Sample ingredient 3</li>
              <li>Sample ingredient 4</li>
            </ul>
          </div>
          
          <div>
            <h3 style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              color: "#333"
            }}>
              Instructions
            </h3>
            <ol style={{
              listStyle: "decimal",
              paddingLeft: "1.5rem",
              lineHeight: "1.6"
            }}>
              <li>First step of preparation</li>
              <li>Second step of cooking</li>
              <li>Third step of seasoning</li>
              <li>Final serving instructions</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;