import React from "react";

function ReviewCard({ review }) {
  return (
    <div style={{ border: "1px solid #ddd", margin: "0.5rem 0", padding: "0.5rem", borderRadius: "5px" }}>
      <strong>Rating: {review.rating}</strong>
      <p>{review.comment}</p>
    </div>
  );
}
export default ReviewCard
