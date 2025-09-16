import { useState } from "react";
import RemoveBackGroundForm from "../components/RemoveBackGroundForm";
import RemoveBackgroundOutput from "../components/RemoveBackgroundOutput";

export default function BlogTitles() {
  const [selected, setSelected] = useState();
  return (
    <div className="flex flex-col md:flex-row w-[90%] min-h-screen gap-5 m-5 ">
      <RemoveBackGroundForm selected={selected} setSelected={setSelected}  />
      <RemoveBackgroundOutput />
    </div>
  );
}