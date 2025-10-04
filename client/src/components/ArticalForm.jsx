import { PenBox, Star } from "lucide-react";
import GradientButton from "./GradientButton";
import SelectBtn from "./SelectBtn";

function ArticalForm({ selectedLength, setSelectedLength, topic, setTopic, loading, onGenerateArticle }) {
  return (
    <div className=" bg-[#FFFFFF] h-[auto] w-full md:w-[507px]   rounded-[10px] border-[1px] border-[#EBEBEB] p-5">
      <div className="flex flex-col gap-7">
        <div className="flex gap-2 items-center">
          <Star className="w-5 h-5 text-blue-600" />
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
            className="w-full h-9 rounded-lg border  px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            placeholder="The future of artificial intelligence"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label>Article Length</label>

          <div className="flex gap-2">
            {/* Short Button */}
            <SelectBtn
              selected={selectedLength}
              setSelected={setSelectedLength}
              selectColor={"blue-500"}
            >
              Short (100 - 200 word)
            </SelectBtn>

            {/* Long Button */}
            <SelectBtn
              selected={selectedLength}
              setSelected={setSelectedLength}
              selectColor={"blue-500"}
            >
              Long (500 - 800 word)
            </SelectBtn>
          </div>
        </div>
        <GradientButton
          icon={PenBox}
          disabled={loading || !topic.trim() || !selectedLength}
          onClick={onGenerateArticle}
        >
          {loading ? "Generating..." : "Generate Article"}
        </GradientButton>
      </div>
    </div>
  );
}

export default ArticalForm;
