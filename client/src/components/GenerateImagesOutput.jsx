import { ImageIcon } from "lucide-react";

function GenerateImagesOutput() {
  return (
    <div className=" bg-[#FDFDFE] flex flex-col gap-20  p-4 rounded-[10px] w-full md:w-[507px] h-[437px] border-[1px] border-[#EBEBEB]">
      <div className="flex gap-2 items-center ">
        <ImageIcon className="w-6 h-6 text-green-600" />
        <p className="text-slate-950  text-[20px]">Generated image</p>
      </div>
      <div className="flex flex-col gap-2 items-center ">
        <ImageIcon className="w-[36px] h-[36px] text-gray-400" />
        <p className="text-gray-400">
          Describe an image and click "Generate Image" to get started
        </p>
      </div>
    </div>
  );
}

export default GenerateImagesOutput;
