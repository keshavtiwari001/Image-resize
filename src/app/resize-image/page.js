"use client";

import { useState } from "react";
import ImageUploader from "@/components/image/ImageUploader";
import ImageList from "@/components/image/ImageList";
import ResizeControls from "@/components/image/ResizeControls";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import DownloadPanel from "@/components/image/DownloadPanel";
import { processImage } from "@/lib/image/compressImage";
import { zipImages } from "@/lib/image/zipImages";
import { releaseImageUrls, downloadBlob } from "@/lib/image/cleanup";

export default function ResizeImagePage() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
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

  const handleProcess = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const updatedImages = await Promise.all(
        images.map(async (img) => {
          const targetWidth = parseInt(width) || img.originalWidth;
          const targetHeight = parseInt(height) || img.originalHeight;

          const stateToProcess = {
            ...img,
            width: targetWidth,
            height: targetHeight,
          };
          const { blob, url, size } = await processImage(stateToProcess);
          if (img.processedUrl) URL.revokeObjectURL(img.processedUrl);
          return {
            ...img,
            processedBlob: blob,
            processedUrl: url,
            processedSize: size,
          };
        })
      );
      setImages(updatedImages);
    } catch (err) {
      setError("Failed to resize images: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadAllZip = async () => {
    try {
      const zipBlob = await zipImages(images);
      downloadBlob(zipBlob, "resized-images.zip");
    } catch (err) {
      setError("Failed to create ZIP file: " + err.message);
    }
  };

  const firstImage = images[0];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resize Image" }]} />
      <h1 className="text-3xl font-bold">Resize Image Dimensions</h1>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      {!images.length ? (
        <ImageUploader
          onImagesLoaded={(newImages) => {
            setImages((prev) => [...prev, ...newImages]);
            if (newImages.length > 0) {
              setWidth(newImages[0].originalWidth);
              setHeight(newImages[0].originalHeight);
            }
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

          <ResizeControls
            width={width}
            height={height}
            setWidth={setWidth}
            setHeight={setHeight}
            maintainAspectRatio={maintainAspectRatio}
            setMaintainAspectRatio={setMaintainAspectRatio}
            originalWidth={firstImage?.originalWidth}
            originalHeight={firstImage?.originalHeight}
          />

          <div className="flex gap-4">
            <button
              onClick={handleProcess}
              disabled={isProcessing}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isProcessing ? "Processing..." : "Resize Images"}
            </button>
          </div>

          <DownloadPanel
            images={images}
            onDownloadAll={handleDownloadAllZip}
            suffix="resized"
          />
        </div>
      )}
    </div>
  );
}
