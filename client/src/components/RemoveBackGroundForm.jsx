import React from "react";

import { Eraser, Sparkles, Upload } from "lucide-react";
import GradientButton from "../components/GradientButton";

const RemoveBackGroundForm = ({ selectedFile, setSelectedFile, loading, onRemoveBackground }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }
      setSelectedFile(file);
    }
  };

  return (
    <div className=" bg-[#FFFFFF] h-[auto] w-full md:w-[507px]  rounded-[10px] border-[1px] border-[#EBEBEB] p-5">
      <div className="flex flex-col gap-7">
        <div className="flex gap-2 items-center">
          <Sparkles className="w-5 h-5 text-[#FF4938]" />
          <p className="text-[#000000] font-bold text-[20px]">
            Background Removal
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="file-upload"
            className="text-sm font-semibold text-gray-800"
          >
            Upload image
          </label>

          {/* hidden input */}
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={loading}
          />

          {/* styled button */}
          <label
            htmlFor="file-upload"
            className={`px-4 py-2 rounded-lg text-sm cursor-pointer outline outline-1 outline-gray-300 hover:bg-gray-200 flex items-center gap-2 ${
              loading ? "opacity-50 cursor-not-allowed" : "text-gray-600"
            }`}
          >
            <Upload className="w-4 h-4" />
            Choose File
          </label>
          
          {/* show file name if selected */}
          {selectedFile && (
            <div className="mt-2 p-2 bg-gray-50 rounded border">
              <p className="text-xs text-gray-600">
                Selected: {selectedFile.name}
              </p>
              <p className="text-xs text-gray-500">
                Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}

          <p className="text-xs text-gray-500">Supported formats: JPG, PNG (Max 5MB)</p>
        </div>

        <GradientButton
          icon={Eraser}
          from="#F6AB41"
          to="#FF4938"
          disabled={loading || !selectedFile}
          onClick={onRemoveBackground}
        >
          {loading ? "Processing..." : "Remove Background"}
        </GradientButton>
      </div>
    </div>
  );
};

export default RemoveBackGroundForm;
