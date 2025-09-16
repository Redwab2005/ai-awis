import { useState } from "react";
import BlogTitleForm from "../components/BlogTitleForm";
import BlogTitleOutput from "../components/BlogTitleOutput";

export default function BlogTitles() {
  const [selected, setSelected] = useState();
  return (
    <div className="flex flex-col md:flex-row w-[90%] min-h-screen gap-5 m-5 ">
      <BlogTitleForm selected={selected} setSelected={setSelected} />
      <BlogTitleOutput />
    </div>
  );
}
