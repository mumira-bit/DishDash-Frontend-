import React, { useState } from "react";

function RecipeForm({ onClose, onNavigate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    if (!title || !description) {
      alert("Please fill in required fields");
      return;
    }
    
    
    alert("Recipe saved successfully!");
    
    
    if (onNavigate) {
      onNavigate('recipes');
    } else if (onClose) {
      onClose();
    }
  };

  const handleCancel = () => {
    if (onNavigate) {
      onNavigate('recipes');
    } else if (onClose) {
      onClose();
    }
  };

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
          Add Recipe
        </h2>

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
            Description *
          </label>
          <textarea
            placeholder="Describe your recipe"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
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
            Image URL
          </label>
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
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
            style={{
              flex: 1,
              backgroundColor: "#e91e63",
              color: "white",
              padding: "0.75rem 1rem",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.3s ease"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#c2185b"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#e91e63"}
          >
            Save Recipe
          </button>
          <button
            onClick={handleCancel}
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
            onMouseOver={(e) => e.target.style.backgroundColor = "#5a6268"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#6c757d"}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeForm;