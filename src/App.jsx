import React, { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import HomePage from "./Components/HomePage";
import LoginForm from "./Components/LoginForm";
import SignUpForm from "./Components/SignUpForm";
import RecipeList from "./Components/RecipeList";
import RecipeDetail from "./Components/RecipeDetail";
import RecipeForm from "./Components/RecipeForm";
import { AuthProvider, useAuth } from "./Components/AuthContext";
import "./App.css";

function AppContent() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { user, logout, setUser } = useAuth();

  // Check session on load
  useEffect(() => {
    fetch("https://dishdash-7lzx.onrender.com/check_session", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, [setUser]);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (page !== "detail") setSelectedRecipe(null);
  };

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setCurrentPage("detail");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "login":
        return <LoginForm onNavigate={handleNavigate} />;
      case "signup":
        return <SignUpForm onNavigate={handleNavigate} />;
      case "recipes":
        return <RecipeList onViewDetails={handleViewRecipe} />;
      case "detail":
        return (
          <RecipeDetail
            recipe={selectedRecipe}
            onBack={() => handleNavigate("recipes")}
          />
        );
      case "create-recipe":
        return <RecipeForm onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="app">
      <NavBar onNavigate={handleNavigate} user={user} logout={logout} />
      {renderPage()}
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  const logout = async () => {
    try {
      await fetch("https://dishdash-7lzx.onrender.com/logout", {
        method: "DELETE",
        credentials: "include",
      });
      setUser(null);
    } catch {
      setUser(null);
    }
  };

  return (
    <AuthProvider value={{ user, setUser, logout }}>
      <AppContent />
    </AuthProvider>
  );
}
