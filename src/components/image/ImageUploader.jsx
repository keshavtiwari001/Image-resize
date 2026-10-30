"use client";

import { useCallback } from "react";
import { loadImage } from "@/lib/image/loadImage";

export default function ImageUploader({ onImagesLoaded, onError }) {
  const handleFiles = async (files) => {
    const loadedImages = [];
    for (const file of files) {
      try {
        const image = await loadImage(file);
        loadedImages.push(image);
      } catch (err) {
        onError(`Failed to load ${file.name}: ${err.message}`);
      }
    }
    if (loadedImages.length > 0) {
      onImagesLoaded(loadedImages);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const onFileChange = (e) => {
    handleFiles(e.target.files);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-12 text-center hover:border-blue-500 transition cursor-pointer"
    >
      <input
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={onFileChange}
        className="hidden"
        id="fileInput"
      />
      <label htmlFor="fileInput" className="cursor-pointer">
        <div className="text-gray-500 dark:text-gray-400">
          <p className="text-lg font-semibold mb-2">Drag & Drop Images</p>
          <p className="text-sm">or click to browse (JPG, PNG, WEBP)</p>
        </div>
      </label>
    </div>
  );
}
