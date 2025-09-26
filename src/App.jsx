import React, { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import HomePage from "./Components/HomePage";
import LoginForm from "./Components/LoginForm";
import SignUpForm from "./Components/SignUpForm";
import RecipeList from "./Components/RecipeList";
import RecipeDetail from "./Components/RecipeDetail";
import RecipeForm from "./Components/RecipeForm";
import { AuthProvider } from "./Components/AuthContext";
import "./App.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for existing session - in production this would call your backend
    fetch("http://localhost:5002/check_session", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = () => {
    fetch("http://localhost:5002/logout", {
      method: "DELETE",
      credentials: "include",
    }).then(() => setUser(null));
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (page !== 'detail') {
      setSelectedRecipe(null);
    }
  };

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setCurrentPage('detail');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginForm onNavigate={handleNavigate} />;
      case 'signup':
        return <SignUpForm onNavigate={handleNavigate} />;
      case 'recipes':
        return <RecipeList onViewDetails={handleViewRecipe} />;
      case 'detail':
        return <RecipeDetail recipe={selectedRecipe} onBack={() => handleNavigate('recipes')} />;
      case 'create-recipe':
        return <RecipeForm onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <AuthProvider value={{ user, logout: handleLogout }}>
      <div className="app">
        <NavBar onNavigate={handleNavigate} />
        {renderPage()}
      </div>
    </AuthProvider>
  );
}