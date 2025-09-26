import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";

function RecipeList({ onViewDetails }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      console.log('Fetching recipes from backend...');
      const response = await fetch("http://localhost:5002/recipes", {
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        const recipesData = await response.json();
        console.log('Recipes fetched successfully:', recipesData);
        setRecipes(recipesData);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Failed to load recipes. Make sure the backend server is running on port 5002.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        maxWidth: "1200px",
        margin: "2rem auto",
        padding: "2rem",
        textAlign: "center"
      }}>
        <h2>Loading recipes...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        maxWidth: "1200px",
        margin: "2rem auto",
        padding: "2rem",
        textAlign: "center"
      }}>
        <h2 style={{ color: "red" }}>Error</h2>
        <p>{error}</p>
        <button 
          onClick={fetchRecipes}
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
          Try Again
        </button>
      </div>
    );
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
        Browse Recipes ({recipes.length} recipes)
      </h1>
      
      {recipes.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>No recipes found. Try creating one!</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default RecipeList;