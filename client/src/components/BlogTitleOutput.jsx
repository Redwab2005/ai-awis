import { Hash, Loader } from "lucide-react";

function BlogTitleOutput({ titles, loading, error }) {
  const showPlaceholder = !titles && !loading && !error;
  
  return (
    <div className=" bg-[#FDFDFE] flex flex-col gap-6  p-4 rounded-[10px] w-full md:w-[507px] h-[437px] border-[1px] border-[#EBEBEB]">
      <div className="flex gap-2 items-center ">
        <Hash className="w-6 h-6 text-purple-600" />
        <p className="text-slate-950  text-[20px]">Generated titles</p>
      </div>
      
      {loading && (
        <div className="flex flex-1 items-center justify-center">
          <Loader className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      )}
      
      {error && (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      
      {titles && !loading && !error && (
        <div className="flex-1 overflow-auto">
          <div className="whitespace-pre-wrap text-gray-800 text-sm leading-relaxed">
            {titles}
          </div>
        </div>
      )}
      
      {showPlaceholder && (
        <div className="flex flex-col gap-2 items-center justify-center flex-1 ">
          <Hash className="w-[36px] h-[36px] text-gray-400" />
          <p className="text-gray-400">
            Enter keywords and click "Generate Titles" to get started
          </p>
        </div>
      )}
    </div>
  );
}

export default BlogTitleOutput;
