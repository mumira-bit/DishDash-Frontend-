import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { recipeAPI } from "../api"; 

function RecipeList({ onViewDetails }) {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    recipeAPI.getAllRecipes()
      .then(setRecipes)
      .catch((err) => {
        console.error("Failed to fetch recipes:", err);
        setError("Could not load recipes");
      });
  }, []);

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  if (!recipes.length) {
    return <p style={{ textAlign: "center" }}>Loading recipes...</p>;
  }

  return (
    <div style={{
      maxWidth: "1200px",
      margin: "2rem auto",
      padding: "0 1rem"
    }}>
      <h1 style={{
        fontSize: "2rem",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "2rem",
        color: "#333"
      }}>
        Browse Recipes
      </h1>
      
      <div style={{
        display: "grid",
        gap: "1.5rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))"
      }}>
        {recipes.map((recipe) => (
          <RecipeCard 
            key={recipe.id} 
            recipe={recipe} 
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
