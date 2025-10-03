const URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
export const recentCreations = async () => {
  const res = await fetch(`${URL}/api/v1/ai/recent-creations`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch recent creations");
  }
  const data = await res.json();
  return data;
};
