import React, { useEffect, useState } from "react";
import RecipeDetails from "./RecipeDetails";
import { fetchWithCreds } from "../api"; // <- correct path

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const data = await fetchWithCreds("/recipes");
        setRecipes(data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    }
    fetchRecipes();
  }, []);

  if (selectedRecipe) {
    return <RecipeDetails recipe={selectedRecipe} onBack={() => setSelectedRecipe(null)} />;
  }

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} onClick={() => setSelectedRecipe(recipe)}>
            {recipe.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
