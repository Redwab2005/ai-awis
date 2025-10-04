import { useState } from "react";
import BlogTitleForm from "../components/BlogTitleForm";
import BlogTitleOutput from "../components/BlogTitleOutput";

export default function BlogTitles() {
  const [selected, setSelected] = useState();
  const [keyword, setKeyword] = useState("");
  const [titles, setTitles] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  async function handleGenerate() {
    try {
      setLoading(true);
      setError("");
      setTitles("");
      const categoryPrefix = selected ? `${selected} blog about ` : "Blog about ";
      const composedPrompt = `${categoryPrefix}${keyword}`.trim();
      const res = await fetch(`${URL}/api/v1/ai/generate-blog-title`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ prompt: composedPrompt }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to generate blog titles");
      }
      setTitles(data.content);
    } catch (err) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col md:flex-row w-[90%] min-h-screen gap-5 m-5 ">
      <BlogTitleForm
        selected={selected}
        setSelected={setSelected}
        keyword={keyword}
        setKeyword={setKeyword}
        loading={loading}
        onGenerate={handleGenerate}
      />
      <BlogTitleOutput titles={titles} loading={loading} error={error} />
    </div>
  );
}
