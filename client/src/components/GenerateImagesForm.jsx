import { PenBox, Star } from "lucide-react";
import SelectBtn from "./SelectBtn";
import GradientButton from "./GradientButton";

function GenerateImagesForm({ selected, setSelected }) {
  const styles = [
    "Realistic style",
    "Global style",
    "Anime style",
    "Cartoon style",
    "3D style",
    "Art style",
  ];

  return (
    <div className=" bg-[#FFFFFF] h-[413px] w-full md:w-[507px]   rounded-[10px] border-[1px] border-[#EBEBEB] p-5">
      <div className="flex flex-col gap-7">
        <div className="flex gap-2 items-center">
          <Star className="w-5 h-5 text-green-600" />
          <p className="text-[#000000] font-bold text-[20px]">
            AI Image Generator
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="articleTopic"
            className="text-sm font-semibold text-gray-800"
          >
            Describe Your Image
          </label>

          <textarea
            id="articleTopic"
            type="text"
            className="w-full h-32 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            placeholder="The future of artificial intelligence"
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label>Style</label> {/* "style" to "Style" for convention */}
          {/* -- التغيير هنا --
        أضفنا flex-wrap للسماح بالالتفاف
      */}
          <div className="flex flex-wrap items-center gap-2">
            {styles.map((style) => (
              <SelectBtn
                key={style}
                selected={selected}
                setSelected={setSelected}
                // لم نعد بحاجة لتحديد عرض وارتفاع ثابت هنا
                // className={"w-64 h-9"} <-- تم حذف هذا السطر
                selectColor={"green-600"}
              >
                {style}
              </SelectBtn>
            ))}
          </div>
        </div>
        <GradientButton icon={PenBox} from="#00AD25" to="#04FF50">
          Generate Article
        </GradientButton>
      </div>
    </div>
  );
}

export default GenerateImagesForm;
