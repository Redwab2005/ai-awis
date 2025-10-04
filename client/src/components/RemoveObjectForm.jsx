import React from "react";

import { Scissors, Sparkles, Upload } from "lucide-react";
import GradientButton from "../components/GradientButton";

const RemoveObjectForm = ({ selectedFile, setSelectedFile, objectName, setObjectName, loading, onRemoveObject }) => {
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
    <div className=" bg-[#FFFFFF] h-fit w-full md:w-[507px]  rounded-[10px] border-[1px] border-[#EBEBEB] p-5">
      <div className="flex flex-col gap-7">
        <div className="flex gap-2 items-center">
          <Sparkles className="w-5 h-5 text-[#4A7AFF]" />
          <p className="text-[#000000] font-bold text-[20px]">Object Removal</p>
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
        
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="objectName"
            className="text-sm font-semibold text-gray-800"
          >
            Describe object name to remove
          </label>

          <input
            id="objectName"
            type="text"
            className="w-full h-9 rounded-lg border px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            placeholder="e.g., tv, car, person, bottle, chair"
            value={objectName}
            onChange={(e) => setObjectName(e.target.value)}
            disabled={loading}
          />
          <p className="text-xs text-gray-500">
            Enter a single object name (e.g., "tv", "car", "person"). Avoid spaces and special characters.
          </p>
        </div>

        <GradientButton
          icon={Scissors}
          from="#417DF6"
          to="#8E37EB"
          disabled={loading || !selectedFile || !objectName.trim()}
          onClick={onRemoveObject}
        >
          {loading ? "Processing..." : "Remove Object"}
        </GradientButton>
      </div>
    </div>
  );
};

export default RemoveObjectForm;
