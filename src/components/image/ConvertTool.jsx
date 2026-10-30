"use client";

import { useState } from "react";
import ImageUploader from "@/components/image/ImageUploader";
import ImageList from "@/components/image/ImageList";
import DownloadPanel from "@/components/image/DownloadPanel";
import { processImage } from "@/lib/image/compressImage";
import { zipImages } from "@/lib/image/zipImages";
import { releaseImageUrls, downloadBlob } from "@/lib/image/cleanup";

export default function ConvertTool({ targetFormat, outputLabel }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const removeImage = (id) => {
    setImages((prev) =>
      prev.filter((img) => {
        if (img.id !== id) return true;
        releaseImageUrls(img);
        return false;
      })
    );
  };

  const clearAll = () => {
    images.forEach(releaseImageUrls);
    setImages([]);
  };

  const handleConvert = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const updatedImages = await Promise.all(
        images.map(async (img) => {
          const stateToProcess = {
            ...img,
            format: targetFormat,
            targetSizeKB: null,
          };
          const { blob, url, size } = await processImage(stateToProcess);
          if (img.processedUrl) URL.revokeObjectURL(img.processedUrl);
          return {
            ...img,
            processedBlob: blob,
            processedUrl: url,
            processedSize: size,
            format: targetFormat,
          };
        })
      );
      setImages(updatedImages);
    } catch (err) {
      setError("Conversion failed: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadZip = async () => {
    try {
      const zipBlob = await zipImages(images);
      downloadBlob(zipBlob, `converted-${outputLabel.toLowerCase()}.zip`);
    } catch (err) {
      setError("Failed to create ZIP: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      {!images.length ? (
        <ImageUploader
          onImagesLoaded={(newImages) => {
            setImages(newImages);
            setError(null);
          }}
          onError={setError}
        />
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Images ({images.length})</h2>
            <button
              onClick={clearAll}
              className="text-sm text-red-600 dark:text-red-400 hover:underline"
            >
              Clear all
            </button>
          </div>

          <ImageList images={images} onRemove={removeImage} />

          <div className="flex gap-4">
            <button
              onClick={handleConvert}
              disabled={isProcessing}
              className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {isProcessing
                ? "Converting in your browser..."
                : `Convert to ${outputLabel}`}
            </button>
          </div>

          <DownloadPanel images={images} onDownloadAll={handleDownloadZip} suffix="converted" />
        </div>
      )}
    </div>
  );
}
