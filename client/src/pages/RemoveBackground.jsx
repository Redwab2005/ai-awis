import { useState } from "react";
import RemoveBackGroundForm from "../components/RemoveBackGroundForm";
import RemoveBackgroundOutput from "../components/RemoveBackgroundOutput";

export default function RemoveBackground() {
  const [selectedFile, setSelectedFile] = useState();
  const [processedImageUrl, setProcessedImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  async function handleRemoveBackground() {
    if (!selectedFile) {
      setError("Please select an image first");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setProcessedImageUrl("");

      const formData = new FormData();
      formData.append("image", selectedFile);

      const res = await fetch(`${URL}/api/v1/ai/remove-background`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to remove background");
      }
      setProcessedImageUrl(data.content);
    } catch (err) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col md:flex-row w-[90%] min-h-screen gap-5 m-5 ">
      <RemoveBackGroundForm
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        loading={loading}
        onRemoveBackground={handleRemoveBackground}
      />
      <RemoveBackgroundOutput
        processedImageUrl={processedImageUrl}
        loading={loading}
        error={error}
      />
    </div>
  );
}
