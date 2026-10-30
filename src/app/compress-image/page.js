"use client";

import { useState } from "react";
import ImageUploader from "@/components/image/ImageUploader";
import ImageList from "@/components/image/ImageList";
import CompressionControls from "@/components/image/CompressionControls";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import DownloadPanel from "@/components/image/DownloadPanel";
import { processImage } from "@/lib/image/compressImage";
import { zipImages } from "@/lib/image/zipImages";
import { releaseImageUrls, downloadBlob } from "@/lib/image/cleanup";

export default function CompressImagePage() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [quality, setQuality] = useState(0.8);
  const [targetSizeKB, setTargetSizeKB] = useState(null);
  const [format, setFormat] = useState("image/jpeg");
  const [isProcessing, setIsProcessing] = useState(false);

  const removeImage = (id) => {
    setImages((prev) =>
      prev.filter((img) => {
        if (img.id !== id) return true;
        releaseImageUrls(img); // free the blob before dropping the reference
        return false;
      })
    );
  };

  const clearAll = () => {
    images.forEach(releaseImageUrls);
    setImages([]);
  };

  const handleProcess = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const updatedImages = await Promise.all(
        images.map(async (img) => {
          const stateToProcess = {
            ...img,
            quality,
            targetSizeKB,
            format,
          };
          const { blob, url, size } = await processImage(stateToProcess);
          // Re-processing replaces the old preview — release it first
          if (img.processedUrl) URL.revokeObjectURL(img.processedUrl);
          return {
            ...img,
            processedBlob: blob,
            processedUrl: url,
            processedSize: size,
            format,
          };
        })
      );
      setImages(updatedImages);
    } catch (err) {
      setError("Failed to process images: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadAllZip = async () => {
    try {
      const zipBlob = await zipImages(images);
      downloadBlob(zipBlob, "compressed-images.zip");
    } catch (err) {
      setError("Failed to create ZIP file: " + err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compress Image" }]} />
      <h1 className="text-3xl font-bold">Compress Images</h1>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      {!images.length ? (
        <ImageUploader
          onImagesLoaded={(newImages) => {
            setImages((prev) => [...prev, ...newImages]);
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

          <CompressionControls
            quality={quality}
            setQuality={setQuality}
            targetSizeKB={targetSizeKB}
            setTargetSizeKB={setTargetSizeKB}
            format={format}
            setFormat={setFormat}
          />

          <div className="flex gap-4">
            <button
              onClick={handleProcess}
              disabled={isProcessing}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isProcessing ? "Processing..." : "Compress Images"}
            </button>
          </div>

          <DownloadPanel
            images={images}
            onDownloadAll={handleDownloadAllZip}
            suffix="compressed"
          />
        </div>
      )}
    </div>
  );
}
