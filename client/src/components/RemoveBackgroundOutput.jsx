import { Eraser, Loader } from "lucide-react";

function RemoveBackgroundOutput({ processedImageUrl, loading, error }) {
  const showPlaceholder = !processedImageUrl && !loading && !error;
  
  return (
    <div className=" bg-[#FDFDFE] flex flex-col gap-6  p-4 rounded-[10px] w-full md:w-[507px] h-[437px] border-[1px] border-[#EBEBEB]">
      <div className="flex gap-2 items-center ">
        <Eraser className="w-6 h-6 text-[#FF4938]" />
        <p className="text-slate-950  text-[20px]">Processed Image</p>
      </div>
      
      {loading && (
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader className="w-8 h-8 animate-spin text-[#FF4938]" />
            <p className="text-sm text-gray-600">Removing background...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-red-600 text-sm text-center">{error}</p>
        </div>
      )}
      
      {processedImageUrl && !loading && !error && (
        <div className="flex-1 overflow-hidden rounded-md bg-white">
          <div className="w-full h-full flex items-center justify-center">
            <img 
              src={processedImageUrl} 
              alt="Background removed" 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
      
      {showPlaceholder && (
        <div className="flex flex-col gap-2 items-center justify-center flex-1 ">
          <Eraser className="w-[36px] h-[36px] text-gray-400" />
          <p className="text-gray-400 text-center">
            Upload an image and click "Remove Background" to get started
          </p>
        </div>
      )}
    </div>
  );
}

export default RemoveBackgroundOutput;
