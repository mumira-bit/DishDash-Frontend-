import React from "react";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

function RecipeDetail({ recipe, onBack }) {
  return (
    <div style={{ padding: "1rem" }}>
      <button onClick={onBack}>Back</button>
      <h2>{recipe.title}</h2>
      <p>{recipe.instructions}</p>
      <p>Prep Time: {recipe.prep_time} min</p>

      <h3>Reviews</h3>
      <ReviewList recipeId={recipe.id} />
      <ReviewForm recipeId={recipe.id} />
    </div>
  );
}
export default RecipeDetail
