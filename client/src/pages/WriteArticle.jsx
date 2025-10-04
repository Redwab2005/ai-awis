import { useState } from "react";
import ArticalForm from "../components/ArticalForm";
import ArticalOutput from "../components/ArticalOutput";

export default function WriteArticle() {
  const [selectedLength, setSelectedLength] = useState();
  const [topic, setTopic] = useState("");
  const [article, setArticle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  async function handleGenerateArticle() {
    if (!topic.trim()) {
      setError("Please enter an article topic");
      return;
    }
    if (!selectedLength) {
      setError("Please select article length");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setArticle("");

      // Convert selected length to token count
      const lengthMap = {
        "Short (100 - 200 word)": 300,
        "Long (500 - 800 word)": 1000,
      };

      const res = await fetch(`${URL}/api/v1/ai/generate-article`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          prompt: topic.trim(),
          length: lengthMap[selectedLength],
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to generate article");
      }
      setArticle(data.content);
    } catch (err) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* the container */}
      <div className="flex flex-col md:flex-row w-[90%] min-h-screen gap-5 m-5 ">
        {/* the form for the article */}
        <ArticalForm
          selectedLength={selectedLength}
          setSelectedLength={setSelectedLength}
          topic={topic}
          setTopic={setTopic}
          loading={loading}
          onGenerateArticle={handleGenerateArticle}
        />
        {/* the article output */}
        <ArticalOutput article={article} loading={loading} error={error} />
      </div>
    </>
  );
}
