import { Hash, Newspaper, Paperclip, Star, Upload, FileText } from "lucide-react";
import GradientButton from "./GradientButton";

function ReviewResumeForm({ selectedFile, setSelectedFile, loading, onReviewResume }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      // Check file type
      if (file.type !== "application/pdf") {
        alert("Please select a PDF file");
        return;
      }
      setSelectedFile(file);
    }
  };

  return (
    <div className=" bg-[#FFFFFF] h-fit w-full md:w-[507px]   rounded-[10px] border-[1px] border-[#EBEBEB] p-5">
      <div className="flex flex-col gap-7">
        <div className="flex gap-2 items-center">
          <Star className="w-5 h-5 text-green-500" />
          <p className="text-[#000000] font-bold text-[20px]">Resume Review</p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="resume-upload"
            className="text-sm font-semibold text-gray-800"
          >
            Upload Resume
          </label>

          {/* hidden input */}
          <input
            id="resume-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
            disabled={loading}
          />

          {/* styled button */}
          <label
            htmlFor="resume-upload"
            className={`px-4 py-2 rounded-lg text-sm cursor-pointer outline outline-1 outline-gray-300 hover:bg-gray-200 flex items-center gap-2 ${
              loading ? "opacity-50 cursor-not-allowed" : "text-gray-600"
            }`}
          >
            <Upload className="w-4 h-4" />
            Choose PDF File
          </label>
          
          {/* show file name if selected */}
          {selectedFile && (
            <div className="mt-2 p-2 bg-gray-50 rounded border">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-red-600" />
                <p className="text-xs text-gray-600">
                  Selected: {selectedFile.name}
                </p>
              </div>
              <p className="text-xs text-gray-500">
                Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}

          <p className="text-xs text-gray-500 font-light mt-1">
            Supports PDF resume only (Max 5MB)
          </p>
        </div>
        <GradientButton
          icon={Newspaper}
          from="#00DA83"
          to="#009BB3"
          disabled={loading || !selectedFile}
          onClick={onReviewResume}
        >
          {loading ? "Reviewing..." : "Review Resume"}
        </GradientButton>
      </div>
    </div>
  );
}

export default ReviewResumeForm;
