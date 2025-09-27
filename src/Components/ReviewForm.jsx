import React, { useState } from "react";
import { useAuth } from "./AuthContext";

function ReviewForm({ recipeId, onReviewSubmitted, onCancel }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!comment.trim()) {
      setError("Please write a comment");
      return;
    }

    if (!user) {
      setError("You must be logged in to write a review");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log('Submitting review:', { rating, comment, recipeId });
      
      const response = await fetch(`https://dishdash-7lzx.onrender.com/recipes/${recipeId}/reviews`, {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          rating: parseInt(rating), 
          comment: comment.trim() 
        })
      });

      if (response.ok) {
        const reviewData = await response.json();
        console.log('Review created successfully:', reviewData);
        
        // Reset form
        setRating(5);
        setComment("");
        
        // Notify parent component
        if (onReviewSubmitted) {
          onReviewSubmitted(reviewData);
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to submit review");
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div style={{
        padding: "1rem",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        textAlign: "center"
      }}>
        <p>Please log in to write a review.</p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: "#f8f9fa",
      padding: "1.5rem",
      borderRadius: "8px",
      marginBottom: "1rem"
    }}>
      <h4 style={{ marginBottom: "1rem", color: "#333" }}>
        Write a Review
      </h4>

      {error && (
        <div style={{
          backgroundColor: "#fee",
          color: "#c33",
          padding: "0.75rem",
          borderRadius: "4px",
          marginBottom: "1rem",
          fontSize: "0.9rem"
        }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: "1rem" }}>
        <label style={{
          display: "block",
          marginBottom: "0.5rem",
          fontWeight: "500",
          color: "#333"
        }}>
          Rating: {rating} star{rating !== 1 ? 's' : ''}
        </label>
        <input
          type="range"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          disabled={loading}
          style={{
            width: "100%",
            marginBottom: "0.5rem"
          }}
        />
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.9rem",
          color: "#666"
        }}>
          <span>1 star</span>
          <span>5 stars</span>
        </div>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{
          display: "block",
          marginBottom: "0.5rem",
          fontWeight: "500",
          color: "#333"
        }}>
          Your Review
        </label>
        <textarea
          placeholder="Share your thoughts about this recipe..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "1rem",
            resize: "vertical",
            boxSizing: "border-box"
          }}
        />
      </div>

      <div style={{
        display: "flex",
        gap: "0.5rem"
      }}>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            backgroundColor: loading ? "#ccc" : "#28a745",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold"
          }}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
        
        {onCancel && (
          <button
            onClick={onCancel}
            disabled={loading}
            style={{
              backgroundColor: "#6c757d",
              color: "white",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default ReviewForm;