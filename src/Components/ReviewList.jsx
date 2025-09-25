import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";

export default function ReviewList({ recipeId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `http://localhost:5555/recipes/${recipeId}/reviews`,
          { credentials: "include" }
        );
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, [recipeId]);

  if (!reviews.length) return <div>No reviews yet.</div>;

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.map((r) => (
        <ReviewCard key={r.id} review={r} />
      ))}
    </div>
  );
}
