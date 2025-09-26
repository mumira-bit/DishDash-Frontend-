const BASE_URL = "https://dishdash-7lzx.onrender.com/"; 

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
  // --- Recipes ---
  getAllRecipes: () => fetchWithCreds("/recipes"),
  getRecipe: (id) => fetchWithCreds(`/recipes/${id}`),
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
  }),

  // --- Reviews ---
  getRecipeReviews: (recipeId) => fetchWithCreds(`/recipes/${recipeId}/reviews`),
  createReview: (recipeId, reviewData) => fetchWithCreds(`/recipes/${recipeId}/reviews`, {
    method: "POST",
    body: JSON.stringify(reviewData)
  }),
  updateReview: (reviewId, reviewData) => fetchWithCreds(`/reviews/${reviewId}`, {
    method: "PATCH",
    body: JSON.stringify(reviewData)
  }),
  deleteReview: (reviewId) => fetchWithCreds(`/reviews/${reviewId}`, {
    method: "DELETE"
  }),
};


