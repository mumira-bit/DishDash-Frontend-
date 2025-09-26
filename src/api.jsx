const BASE_URL = "http://localhost:5002"; 

export async function fetchWithCreds(url, options = {}) {
  try {
    const res = await fetch(BASE_URL + url, {
      credentials: "include", 
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    return res.json();
  } catch (err) {
    console.error("API fetch error:", err);
    throw err;
  }
}

export const recipeAPI = {
  getAllRecipes: () => fetchWithCreds("/recipes"),
  getRecipe: (id) => fetchWithCreds(`/recipes/${id}`),
  getRecipeReviews: (id) => fetchWithCreds(`/recipes/${id}/reviews`),
  createRecipe: (recipeData) => fetchWithCreds("/recipes", {
    method: "POST",
    body: JSON.stringify(recipeData)
  }),
  updateRecipe: (id, recipeData) => fetchWithCreds(`/recipes/${id}`, {
    method: "PATCH", 
    body: JSON.stringify(recipeData)
  }),
  deleteRecipe: (id) => fetchWithCreds(`/recipes/${id}`, {
    method: "DELETE"
  })
};