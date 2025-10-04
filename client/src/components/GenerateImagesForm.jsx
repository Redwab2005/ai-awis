import { Image, PenBox, Star, Globe } from "lucide-react";
import SelectBtn from "./SelectBtn";
import GradientButton from "./GradientButton";

function GenerateImagesForm({
  selected,
  setSelected,
  prompt,
  setPrompt,
  isPublic,
  setIsPublic,
  loading,
  onGenerate,
}) {
  const styles = [
    "Realistic style",
    "Global style",
    "Anime style",
    "Cartoon style",
    "3D style",
    "Art style",
  ];

  return (
    <div className=" bg-[#FFFFFF] h-[auto] w-full md:w-[507px]   rounded-[10px] border-[1px] border-[#EBEBEB] p-5">
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
            className="w-full h-32 rounded-lg border px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            placeholder="A photo of a green futuristic city at sunset"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
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
        <div className="flex items-center gap-2">
          <input
            id="publicToggle"
            type="checkbox"
            className="h-4 w-4"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          <label htmlFor="publicToggle" className="text-sm text-gray-700 flex items-center gap-1">
            <Globe className="w-4 h-4 text-green-600" /> Make public (show in community)
          </label>
        </div>
        <GradientButton
          icon={Image}
          from="#00AD25"
          to="#04FF50"
          disabled={loading || !prompt.trim()}
          onClick={onGenerate}
        >
          {loading ? "Generating..." : "Generate Image"}
        </GradientButton>
      </div>
    </div>
  );
}

export default GenerateImagesForm;
