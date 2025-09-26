import React from "react";

function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div style={{
        textAlign: "center",
        padding: "2rem",
        color: "#666"
      }}>
        <p>No reviews yet. Be the first to review this recipe!</p>
      </div>
    );
  }

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <h3 style={{ 
        marginBottom: "1rem", 
        color: "#333",
        borderBottom: "2px solid #eee",
        paddingBottom: "0.5rem"
      }}>
        Reviews ({reviews.length})
      </h3>
      
      {reviews.map((review) => (
        <div
          key={review.id}
          style={{
            backgroundColor: "white",
            padding: "1.5rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            borderLeft: "4px solid #007bff"
          }}
        >
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "0.5rem"
          }}>
            <div>
              <strong style={{ color: "#333", fontSize: "1.1rem" }}>
                {review.user?.username || "Anonymous"}
              </strong>
              <div style={{
                color: "#ffa500",
                fontSize: "1.2rem",
                marginTop: "0.25rem"
              }}>
                {renderStars(review.rating)}
                <span style={{ 
                  marginLeft: "0.5rem", 
                  fontSize: "0.9rem", 
                  color: "#666" 
                }}>
                  ({review.rating}/5)
                </span>
              </div>
            </div>
            <div style={{
              fontSize: "0.9rem",
              color: "#666"
            }}>
              {review.created_at ? formatDate(review.created_at) : ""}
            </div>
          </div>
          
          <p style={{
            color: "#555",
            lineHeight: "1.5",
            margin: "0",
            fontSize: "1rem"
          }}>
            {review.comment}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;