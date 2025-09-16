import { Hash, Newspaper, Paperclip, Star } from "lucide-react";
import GradientButton from "./GradientButton";

function ReviewResumeForm() {
  return (
    <div className=" bg-[#FFFFFF] h-fit w-full md:w-[507px]   rounded-[10px] border-[1px] border-[#EBEBEB] p-5">
      <div className="flex flex-col gap-7">
        <div className="flex gap-2 items-center">
          <Star className="w-5 h-5 text-green-500" />
          <p className="text-[#000000] font-bold text-[20px]">Resume Review</p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="blogkeyword"
            className="text-sm font-semibold text-gray-800"
          >
            Upload Resume
          </label>

          <input
            id="blogkeyword"
            type="file"
            accept="application/pdf"
            className="w-full h-9 rounded-lg border border-gray-300 text-center file:bg-inherit file:border-none file:text-gray-400 text-gray-400  px-3 text-sm "
            placeholder="Choose a file to upload"
          />

          <p class="text-xs text-gray-500 font-light mt-1">
            Supports PDF resume only.
          </p>
        </div>
        <GradientButton icon={Newspaper} from="#00DA83" to="#009BB3">
          Review Resume
        </GradientButton>
      </div>
    </div>
  );
}

export default ReviewResumeForm;
