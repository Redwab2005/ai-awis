import { PenBox } from "lucide-react";
import { useState } from "react";
import GradientButton from "./GradientButton";
import SelectBtn from "./SelectBtn";

function ArticalForm() {
  const [selected, setSelected] = useState();

  return (
    <div className=" bg-[#FFFFFF] h-[310px] w-full md:w-[507px]   rounded-[10px] border-[1px] border-[#EBEBEB] p-5">
      <div className="flex flex-col gap-7">
        <div className="flex gap-2 items-center">
          <img src="/icons/star.svg" alt=" icon" />
          <p className="text-[#000000] font-bold text-[20px]">
            AI Article Writer
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="articleTopic"
            className="text-sm font-semibold text-gray-800"
          >
            Article Topic
          </label>

          <input
            id="articleTopic"
            type="text"
            className="w-full h-9 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            placeholder="The future of artificial intelligence"
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label>Article Length</label>

          <div className="flex gap-2">
            {/* Short Button */}
            <SelectBtn
              selected={selected}
              setSelected={setSelected}
              selectColor={"blue-500"}
            >
              Short (100 - 200 word)
            </SelectBtn>

            {/* Long Button */}
            <SelectBtn
              selected={selected}
              setSelected={setSelected}
              selectColor={"blue-500"}
            >
              Long (500 - 800 word)
            </SelectBtn>
          </div>
        </div>
        <GradientButton icon={PenBox}>Generate Article</GradientButton>
      </div>
    </div>
  );
}

export default ArticalForm;
