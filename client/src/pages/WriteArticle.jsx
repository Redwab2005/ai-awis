import ArticalForm from "../components/ArticalForm";
import ArticalOutput from "../components/ArticalOutput";
export default function WriteArticle() {
  return (
    <>
      {/* the container */}
      <div className="flex flex-col md:flex-row w-[90%] min-h-screen gap-5 m-5 ">
        {/* the form for the article */}
        <ArticalForm />
        {/* the article output */}
        <ArticalOutput />
      </div>
    </>
  );
}
