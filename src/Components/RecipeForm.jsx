import React, { useState } from "react";
import { useAuth } from "./AuthContext";

function RecipeForm({ onClose, onNavigate }) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!title || !instructions || !prepTime) {
      setError("Please fill in all required fields");
      return;
    }

    if (!user) {
      setError("You must be logged in to create a recipe");
      return;
    }

    const prepTimeNum = parseInt(prepTime);
    if (isNaN(prepTimeNum) || prepTimeNum <= 0) {
      setError("Prep time must be a positive number");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      console.log('Creating recipe:', { title, instructions, prep_time: prepTimeNum });
      
      const response = await fetch("http://localhost:5002/recipes", {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          instructions: instructions.trim(),
          prep_time: prepTimeNum
        })
      });
      
      if (response.ok) {
        const createdRecipe = await response.json();
        console.log('Recipe created successfully:', createdRecipe);
        alert("Recipe created successfully!");
        
        // Clear form
        setTitle("");
        setInstructions("");
        setPrepTime("");
        
        // Navigate back to recipes
        if (onNavigate) {
          onNavigate('recipes');
        } else if (onClose) {
          onClose();
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create recipe");
      }
    } catch (error) {
      console.error('Error creating recipe:', error);
      setError("Network error. Make sure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onNavigate) {
      onNavigate('recipes');
    } else if (onClose) {
      onClose();
    }
  };

  if (!user) {
    return (
      <div style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "2rem",
        textAlign: "center"
      }}>
        <h2>Please log in to create a recipe</h2>
        <button onClick={() => onNavigate && onNavigate('login')}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: "600px",
      margin: "2rem auto",
      padding: "0 1rem"
    }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        padding: "2rem"
      }}>
        <h2 style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#e91e63",
          marginBottom: "1.5rem",
          textAlign: "center"
        }}>
          Create New Recipe
        </h2>

        {error && (
          <div style={{
            backgroundColor: "#fee",
            color: "#c33",
            padding: "0.75rem",
            borderRadius: "4px",
            marginBottom: "1rem",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "500",
            color: "#333"
          }}>
            Recipe Title *
          </label>
          <input
            type="text"
            placeholder="Enter recipe title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "1rem",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "500",
            color: "#333"
          }}>
            Instructions *
          </label>
          <textarea
            placeholder="Enter cooking instructions (step by step)"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={6}
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "1rem",
              resize: "vertical",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <label style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "500",
            color: "#333"
          }}>
            Prep Time (minutes) *
          </label>
          <input
            type="number"
            placeholder="30"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            min="1"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "1rem",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{
          display: "flex",
          gap: "1rem"
        }}>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              flex: 1,
              backgroundColor: loading ? "#ccc" : "#e91e63",
              color: "white",
              padding: "0.75rem 1rem",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.3s ease"
            }}
          >
            {loading ? "Creating..." : "Create Recipe"}
          </button>
          <button
            onClick={handleCancel}
            disabled={loading}
            style={{
              flex: 1,
              backgroundColor: "#6c757d",
              color: "white",
              padding: "0.75rem 1rem",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.3s ease"
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeForm;