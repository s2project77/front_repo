"use client"; // Only needed for App Router in Next.js

import { useState } from "react";
import Image from "next/image";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Generate preview URL
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <label
        htmlFor="fileInput"
        className="relative flex items-center justify-center w-20 h-20 border-2 border-dashed border-gray-400 rounded-lg mt-4  cursor-pointer hover:border-blue-500"
      >
        {preview ? (
          <Image
            src={preview}
            alt="Uploaded Preview"
            width={100}
            height={100}
            className="object-cover w-full h-full rounded-lg"
          />
        ) : (
          <span className="text-gray-500 text-4xl">+</span>
        )}
      </label>

      {/* Hidden File Input */}
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
