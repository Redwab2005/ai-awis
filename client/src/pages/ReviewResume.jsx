import { useState } from "react";
import ReviewResumeForm from "../components/ReviewResumeForm";
import ReviewResumeOutput from "../components/ReviewResumeOutput";

export default function ReviewResume() {
  const [selectedFile, setSelectedFile] = useState();
  const [reviewResult, setReviewResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  async function handleReviewResume() {
    if (!selectedFile) {
      setError("Please select a PDF file first");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setReviewResult("");

      const formData = new FormData();
      formData.append("resume", selectedFile);

      const res = await fetch(`${URL}/api/v1/ai/resume-review`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to review resume");
      }
      setReviewResult(data.content);
    } catch (err) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col md:flex-row w-[90%] min-h-screen gap-5 m-5 ">
      <ReviewResumeForm
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        loading={loading}
        onReviewResume={handleReviewResume}
      />
      <ReviewResumeOutput
        reviewResult={reviewResult}
        loading={loading}
        error={error}
      />
    </div>
  );
}
