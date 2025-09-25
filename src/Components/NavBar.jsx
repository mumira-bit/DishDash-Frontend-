import React from "react";
import { useAuth } from "./AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <span style={{ marginRight: "1rem", fontWeight: "bold" }}>Welcome to DishDash</span>
      {user ? (
        <>
          <span style={{ marginRight: "1rem" }}>Hello, {user.username}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <span>discover your taste</span>
      )}
    </nav>
  );
}
