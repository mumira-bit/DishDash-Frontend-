import React from "react";
import { useAuth } from "./AuthContext";
import "./HomePage.css";

export default function HomePage({ onNavigate }) {
  const { user } = useAuth();

  const handleNavigation = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">🍳 Welcome to DishDash!</h1>
      
      <p className="homepage-subtitle">
        Discover, create, and share amazing recipes with our community of food lovers.
      </p>

      {user ? (
        <div>
          <div className="welcome-banner">
            <h2>Welcome back, {user.username}! 👋</h2>
            <p>Ready to explore more delicious recipes?</p>
          </div>
          
          <div className="action-buttons">
            <button 
              onClick={() => handleNavigation('recipes')} 
              className="btn btn-primary"
            >
              Browse All Recipes
            </button>
            <button 
              onClick={() => handleNavigation('create-recipe')} 
              className="btn btn-success"
            >
              Create New Recipe
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="welcome-banner guest">
            <h2>Join Our Cooking Community! 🎉</h2>
            <p>Sign up to start sharing your favorite recipes and discover new ones!</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <h3>🍽️ Discover Recipes</h3>
              <p>Browse through hundreds of recipes from our community</p>
            </div>
            <div className="feature-card">
              <h3>👨‍🍳 Share Your Creations</h3>
              <p>Post your own recipes and get feedback from others</p>
            </div>
            <div className="feature-card">
              <h3>⭐ Rate & Review</h3>
              <p>Share your thoughts on recipes you've tried</p>
            </div>
          </div>
          
          <div className="action-buttons">
            <button 
              onClick={() => handleNavigation('signup')} 
              className="btn btn-primary"
            >
              Get Started - Sign Up
            </button>
            <button 
              onClick={() => handleNavigation('login')} 
              className="btn btn-secondary"
            >
              Already have an account? Login
            </button>
          </div>
        </div>
      )}
      
      <div className="featured-section">
        <h2>Featured Recipes</h2>
        <p>Check out some popular recipes from our community</p>
        <div className="recipes-preview">
          <div className="recipe-placeholder">
            <div className="recipe-image"></div>
            <p>Loading recipes...</p>
          </div>
        </div>
        <button 
          onClick={() => handleNavigation('recipes')} 
          className="view-all-link"
        >
          View all recipes →
        </button>
      </div>
    </div>
  );
}