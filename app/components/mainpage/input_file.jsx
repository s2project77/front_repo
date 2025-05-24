// Enhanced ImageUploader Component
"use client";
import { useState } from "react";
import Image from "next/image";
import { Upload, X, Camera } from "lucide-react";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files[0]) {
      setImage(files[0]);
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div
        className={`relative group transition-all duration-300 ${
          preview ? 'w-32 h-32' : 'w-24 h-24'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
      >
        <label
          htmlFor="fileInput"
          className={`relative flex items-center justify-center w-full h-full border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 overflow-hidden ${
            isDragging
              ? 'border-emerald-400 bg-emerald-50 scale-105'
              : preview
              ? 'border-transparent'
              : 'border-gray-300 hover:border-emerald-400 hover:bg-emerald-50 hover:scale-105'
          }`}
        >
          {preview ? (
            <>
              <Image
                src={preview}
                alt="Uploaded Preview"
                width={128}
                height={128}
                className="object-cover w-full h-full rounded-xl"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-xl flex items-center justify-center">
                <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2">
              <Upload className="text-gray-400 group-hover:text-emerald-500 transition-colors" size={20} />
              <span className="text-xs text-gray-500 group-hover:text-emerald-600 transition-colors text-center px-2">
                {isDragging ? 'Drop here' : 'Upload'}
              </span>
            </div>
          )}
        </label>

        {preview && (
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-all duration-200 hover:scale-110"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <input
        type="file"
        id="fileInput"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploader;
