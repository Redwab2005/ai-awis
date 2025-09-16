import { Hash, Star } from "lucide-react";
import SelectBtn from "./SelectBtn";
import GradientButton from "./GradientButton";

function BlogTitleForm({ selected, setSelected }) {
  const categories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];

  return (
    <div className=" bg-[#FFFFFF] h-[370px] w-full md:w-[507px]   rounded-[10px] border-[1px] border-[#EBEBEB] p-5">
      <div className="flex flex-col gap-7">
        <div className="flex gap-2 items-center">
          <Star className="w-5 h-5 text-purple-600" />
          <p className="text-[#000000] font-bold text-[20px]">
            AI Title Generator
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="blogkeyword"
            className="text-sm font-semibold text-gray-800"
          >
            Keyword
          </label>

          <input
            id="blogkeyword"
            type="text"
            className="w-full h-9 rounded-lg border  px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            placeholder="The future of artificial intelligence"
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label>Category</label>
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((style) => (
              <SelectBtn
                key={style}
                selected={selected}
                setSelected={setSelected}
                selectColor={"purple-600"}
              >
                {style}
              </SelectBtn>
            ))}
          </div>
        </div>
        <GradientButton icon={Hash} from="#C341F6" to="#8E37EB">
          Generate Article
        </GradientButton>
      </div>
    </div>
  );
}

export default BlogTitleForm;
