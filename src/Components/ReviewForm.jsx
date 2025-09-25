import React, { useState } from "react";
import { fetchWithCreds } from "../api";
import { useAuth } from "./AuthContext";

 function ReviewForm({ recipeId }) {
  const { user } = useAuth();
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Login to post review");
    await fetchWithCreds(`/recipes/${recipeId}/reviews`, {
      method: "POST",
      body: JSON.stringify({ rating, comment, user_id: user.id }),
    });
    setRating("");
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <input placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} />
      <input placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
      <button type="submit">Submit Review</button>
    </form>
  );
} 
export default ReviewForm
