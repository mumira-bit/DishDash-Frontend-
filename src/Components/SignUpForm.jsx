import React from "react";
import RecipeCard from "./RecipeCard";

const dummyRecipes = [
  { id: 1, title: "Spaghetti Bolognese", description: "Classic Italian pasta with rich meat sauce" },
  { id: 2, title: "Chicken Curry", description: "Spicy and creamy curry with tender chicken" },
  { id: 3, title: "Caesar Salad", description: "Fresh romaine with parmesan and croutons" },
  { id: 4, title: "Beef Stir Fry", description: "Quick and easy stir fry with vegetables" },
  { id: 5, title: "Chocolate Cake", description: "Decadent chocolate cake with rich frosting" },
  { id: 6, title: "Fish Tacos", description: "Grilled fish with fresh salsa and lime" },
];

function RecipeList({ onViewDetails }) {
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
        {dummyRecipes.map((recipe) => (
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
