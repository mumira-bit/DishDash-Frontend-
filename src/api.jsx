const BASE_URL = "http://localhost:5555";

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
