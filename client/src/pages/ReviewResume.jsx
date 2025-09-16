import { useState } from "react";
import ReviewResumeForm from "../components/ReviewResumeForm";
import ReviewResumeOutput from "../components/ReviewResumeOutput";

export default function ReviewResume() {
  const [selected, setSelected] = useState();
  return (
    <div className="flex flex-col md:flex-row w-[90%] min-h-screen gap-5 m-5 ">
      <ReviewResumeForm selected={selected} setSelected={setSelected} />
      <ReviewResumeOutput />
    </div>
  );
}
