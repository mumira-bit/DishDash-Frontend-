import React, { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import LoginForm from "./Components/LoginForm";
import SignUpForm from "./Components/SignUpForm";
import RecipeList from "./Components/RecipeList";
import RecipeDetails from "./Components/RecipeDetails";
import { AuthProvider } from "./Components/AuthContext";

export default function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  
  useEffect(() => {
    fetch("http://localhost:5555/check_session", {
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
    fetch("http://localhost:5555/logout", {
      method: "DELETE",
      credentials: "include",
    }).then(() => setUser(null));
  };

  return (
    <div>
      <NavBar user={user} onLogout={handleLogout} />

      {!user && (
        <div>
          {showLogin && (
            <LoginForm
              onLogin={(u) => setUser(u)}
              onSwitchToSignUp={() => {
                setShowLogin(false);
                setShowSignUp(true);
              }}
            />
          )}
          {showSignUp && (
            <SignUpForm
              onSignUp={(u) => setUser(u)}
              onSwitchToLogin={() => {
                setShowSignUp(false);
                setShowLogin(true);
              }}
            />
          )}
          {!showLogin && !showSignUp && (
            <div>
              <button onClick={() => setShowLogin(true)}>Login</button>
              <button onClick={() => setShowSignUp(true)}>Sign Up</button>
            </div>
          )}
        </div>
      )}

      {user && (
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ width: "30%" }}>
            <RecipeList onSelectRecipe={setSelectedRecipe} />
          </div>
          <div style={{ width: "70%" }}>
            <RecipeDetail recipeId={selectedRecipe} user={user} />
          </div>
        </div>
      )}
    </div>
  );
}
