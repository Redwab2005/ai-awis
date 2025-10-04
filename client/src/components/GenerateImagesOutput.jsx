import { ImageIcon, Loader } from "lucide-react";

function GenerateImagesOutput({ imageUrl, loading, error }) {
  const showPlaceholder = !imageUrl && !loading && !error;
  return (
    <div className=" bg-[#FDFDFE] flex flex-col gap-6  p-4 rounded-[10px] w-full md:w-[507px] h-[437px] border-[1px] border-[#EBEBEB]">
      <div className="flex gap-2 items-center ">
        <ImageIcon className="w-6 h-6 text-green-600" />
        <p className="text-slate-950  text-[20px]">Generated image</p>
      </div>
      {loading && (
        <div className="flex flex-1 items-center justify-center">
          <Loader className="w-8 h-8 animate-spin text-green-600" />
        </div>
      )}
      {error && (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      {imageUrl && !loading && !error && (
        <div className="flex-1 overflow-hidden rounded-md">
          <img src={imageUrl} alt="Generated" className="w-full h-full object-contain bg-white" />
        </div>
      )}
      {showPlaceholder && (
        <div className="flex flex-col gap-2 items-center justify-center flex-1 ">
          <ImageIcon className="w-[36px] h-[36px] text-gray-400" />
          <p className="text-gray-400">
            Describe an image and click "Generate Image" to get started
          </p>
        </div>
      )}
    </div>
  );
}

export default GenerateImagesOutput;
