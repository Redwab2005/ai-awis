import React from "react";

import { Eraser, Sparkles } from "lucide-react";
import GradientButton from "../components/GradientButton";

const RemoveBackGroundForm = ({ selected, setSelected }) => {
  return (
    <div className=" bg-[#FFFFFF] h-[260px] w-full md:w-[507px]  rounded-[10px] border-[1px] border-[#EBEBEB] p-5">
      <div className="flex flex-col gap-7">
        <div className="flex gap-2 items-center">
          <Sparkles className="w-5 h-5 text-[#FF4938]" />
          <p className="text-[#000000] font-bold text-[20px]">
            Background Removal
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="blogkeyword"
            className="text-sm font-semibold text-gray-800"
          >
            Upload image
          </label>

          {/* hidden input */}
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setSelected(e.target.files[0])}
            className="hidden"
          />

          {/* styled button */}
          <label
            htmlFor="file-upload"
            className="px-4 py-2 rounded-lg  text-gray-600 text-sm cursor-pointer outline outline-1 outline-gray-300 hover:bg-gray-200 "
          >
            Choose File
          </label>
          {/* show file name if selected */}
          {selected && (
            <p className="mt-2 text-xs text-gray-600">
              Selected: {selected.name}
            </p>
          )}

          <p className="text-xs text-gray-500">Supported formats: JPG, PNG</p>
        </div>

        <GradientButton icon={Eraser} from="#F6AB41" to="#FF4938">
          Remove background
        </GradientButton>
      </div>
    </div>
  );
};

export default RemoveBackGroundForm;
