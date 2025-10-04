import { PenBox, Loader } from "lucide-react";

function ArticalOutput({ article, loading, error }) {
  const showPlaceholder = !article && !loading && !error;
  
  return (
    <div className=" bg-[#FDFDFE] flex flex-col gap-6  p-4 rounded-[10px] w-full md:w-[507px] h-[437px] border-[1px] border-[#EBEBEB]">
      <div className="flex gap-2 items-center ">
        <PenBox className="w-6 h-6 text-blue-600" />
        <p className="text-slate-950  text-[20px]">Generated article</p>
      </div>
      
      {loading && (
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-sm text-gray-600">Generating article...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-red-600 text-sm text-center">{error}</p>
        </div>
      )}
      
      {article && !loading && !error && (
        <div className="flex-1 overflow-auto">
          <div className="whitespace-pre-wrap text-gray-800 text-sm leading-relaxed bg-white p-4 rounded border">
            {article}
          </div>
        </div>
      )}
      
      {showPlaceholder && (
        <div className="flex flex-col gap-2 items-center justify-center flex-1 ">
          <PenBox className="w-[36px] h-[36px] text-gray-400" />
          <p className="text-gray-400 text-center">
            Enter a topic and click "Generate Article" to get started
          </p>
        </div>
      )}
    </div>
  );
}

export default ArticalOutput;
