import React from "react";

import { Scissors, Sparkles } from "lucide-react";
import GradientButton from "../components/GradientButton";

const RemoveObjectForm = ({ selected, setSelected }) => {
  return (
    <div className=" bg-[#FFFFFF] h-fit w-full md:w-[507px]  rounded-[10px] border-[1px] border-[#EBEBEB] p-5">
      <div className="flex flex-col gap-7">
        <div className="flex gap-2 items-center">
          <Sparkles className="w-5 h-5 text-[#4A7AFF]" />
          <p className="text-[#000000] font-bold text-[20px]">Object Removal</p>
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
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="articleTopic"
            className="text-sm font-semibold text-gray-800"
          >
            Describe object name to remove
          </label>

          <textarea
            id="articleTopic"
            type="text"
            className="w-full h-32 rounded-lg border px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            placeholder="e.g., watch or spoon , Only single object name"
          />
        </div>

        <GradientButton icon={Scissors} from="#417DF6" to="#8E37EB">
          Remove object
        </GradientButton>
      </div>
    </div>
  );
};

export default RemoveObjectForm;
