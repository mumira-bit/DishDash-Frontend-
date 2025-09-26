import React, { useEffect, useState } from "react";
import { recipeAPI } from "../api";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

function RecipeDetail({ recipe, onBack }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!recipe) return;

    async function fetchReviews() {
      try {
        const data = await recipeAPI.getRecipeReviews(recipe.id);
        setReviews(data || []);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    }

    fetchReviews();
  }, [recipe]);

  function handleReviewAdded(newReview) {
    setReviews((prev) => [...prev, newReview]);
  }

  if (!recipe) return <p>Loading recipe...</p>;

  return (
    <div>
      <button onClick={onBack}>← Back to recipes</button>
      <h1>{recipe.title}</h1>
      <p>{recipe.instructions}</p>
      <p>Prep time: {recipe.prep_time} mins</p>

      <h2>Reviews</h2>
      <ReviewList recipeId={recipe.id} reviews={reviews} />
      <ReviewForm recipeId={recipe.id} onReviewAdded={handleReviewAdded} />
    </div>
  );
}

export default RecipeDetail;
