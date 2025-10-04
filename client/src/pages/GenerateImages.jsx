import { useState } from "react";
import GenerateImagesForm from "../components/GenerateImagesForm";
import GenerateImagesOutput from "../components/GenerateImagesOutput";

export default function GenerateImages() {
  const [selected, setSelected] = useState();
  const [prompt, setPrompt] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  async function handleGenerate() {
    try {
      setLoading(true);
      setError("");
      setImageUrl("");
      const stylePrefix = selected ? `${selected}: ` : "";
      const composedPrompt = `${stylePrefix}${prompt}`.trim();
      const res = await fetch(`${URL}/api/v1/ai/generate-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ prompt: composedPrompt, isPublic }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to generate image");
      }
      setImageUrl(data.content);
    } catch (err) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col md:flex-row w-[90%] min-h-screen gap-5 m-5 ">
      <GenerateImagesForm
        selected={selected}
        setSelected={setSelected}
        prompt={prompt}
        setPrompt={setPrompt}
        isPublic={isPublic}
        setIsPublic={setIsPublic}
        loading={loading}
        onGenerate={handleGenerate}
      />
      <GenerateImagesOutput imageUrl={imageUrl} loading={loading} error={error} />
    </div>
  );
}
