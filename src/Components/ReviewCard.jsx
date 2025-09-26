import React from "react";

function ReviewCard({ review }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "1rem",
      marginBottom: "1rem",
      backgroundColor: "#fafafa"
    }}>
      <p style={{ fontWeight: "bold" }}>
        ⭐ {review.rating} / 5
      </p>
      <p>{review.comment}</p>
      <small>
        by <strong>{review.user?.username}</strong> on{" "}
        {review.created_at ? new Date(review.created_at).toLocaleDateString() : "N/A"}
      </small>
    </div>
  );
}

export default ReviewCard;
