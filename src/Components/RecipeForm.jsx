import React, { useState } from "react";
import { fetchWithCreds } from "../api";
import { useAuth } from "./AuthContext";

 function RecipeForm() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prepTime, setPrepTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Login to post recipe");

    await fetchWithCreds("/recipes", {
      method: "POST",
      body: JSON.stringify({ title, instructions, prep_time: prepTime, user_id: user.id }),
    });

    setTitle("");
    setInstructions("");
    setPrepTime("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "1rem" }}>
      <h2>Add Recipe</h2>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
      <input placeholder="Prep Time (min)" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} />
      <button type="submit">Add Recipe</button>
    </form>
  );
}
export default RecipeForm