"use client";

import { useState } from "react";
import ImageUploader from "@/components/image/ImageUploader";
import EditingToolbar from "@/components/image/EditingToolbar";
import ResizeControls from "@/components/image/ResizeControls";
import CompressionControls from "@/components/image/CompressionControls";
import CropModal from "@/components/image/CropModal";
import ComparePreview from "@/components/image/ComparePreview";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import DownloadPanel from "@/components/image/DownloadPanel";
import { processImage } from "@/lib/image/compressImage";
import { zipImages } from "@/lib/image/zipImages";
import { releaseImageUrls, downloadBlob } from "@/lib/image/cleanup";

export default function ImageEditorPage() {
  const [images, setImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCrop, setShowCrop] = useState(false);

  // Current Working Image State
  const currentImage = images[selectedImageIndex];

  const updateCurrentImage = (updates) => {
    setImages((prev) =>
      prev.map((img, idx) => (idx === selectedImageIndex ? { ...img, ...updates } : img))
    );
  };

  const handleProcess = async () => {
    if (!currentImage) return;
    setIsProcessing(true);
    setError(null);

    try {
      const { blob, url, size } = await processImage(currentImage);
      // The new preview replaces the old one — release it before updating state
      if (currentImage.processedUrl) URL.revokeObjectURL(currentImage.processedUrl);
      updateCurrentImage({
        processedBlob: blob,
        processedUrl: url,
        processedSize: size,
      });
    } catch (err) {
      setError("Failed to apply edits: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadZip = async () => {
    try {
      const zipBlob = await zipImages(images);
      downloadBlob(zipBlob, "edited-images.zip");
    } catch (err) {
      setError("Failed to create ZIP: " + err.message);
    }
  };

  const handleApplyCrop = (cropRect) => {
    updateCurrentImage({
      transformations: {
        ...currentImage.transformations,
        crop: cropRect,
      },
    });
    setShowCrop(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {showCrop && currentImage && (
        <CropModal
          image={currentImage}
          onCancel={() => setShowCrop(false)}
          onApply={handleApplyCrop}
        />
      )}

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Image Editor" }]} />
      <div>
        <h1 className="text-3xl font-bold">All-in-One Image Editor</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Crop, rotate, filter, resize, convert, compress, and brand your images locally.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      {!images.length ? (
        <ImageUploader
          onImagesLoaded={(newImages) => {
            setImages(newImages);
            setSelectedImageIndex(0);
            setError(null);
          }}
          onError={setError}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Preview & Actions (first on mobile — users look here first) */}
          <div className="lg:col-span-2 space-y-6 min-w-0">
            <div className="border dark:border-gray-800 rounded-xl p-4 bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center min-h-[350px]">
              {currentImage?.processedUrl ? (
                <ComparePreview image={currentImage} />
              ) : (
                <>
                  <img
                    src={currentImage?.objectUrl}
                    alt="Preview"
                    className="max-h-[400px] max-w-full object-contain rounded drop-shadow"
                  />
                  <div className="mt-4 text-xs text-gray-500 flex gap-4">
                    <span>Original: {currentImage?.originalWidth}×{currentImage?.originalHeight}px ({(currentImage?.originalSize / 1024).toFixed(1)} KB)</span>
                  </div>
                </>
              )}
            </div>

            {/* Action row — full-width buttons stacked on mobile so taps
                never hit the wrong control; inline on larger screens. */}
            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-4">
              <button
                onClick={() => setShowCrop(true)}
                className="px-4 py-3 sm:py-2.5 border border-gray-300 dark:border-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                ✂ Crop
              </button>
              {currentImage?.transformations?.crop ? (
                <button
                  onClick={() =>
                    updateCurrentImage({
                      transformations: { ...currentImage.transformations, crop: null },
                    })
                  }
                  className="px-4 py-3 sm:py-2.5 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 rounded-lg transition"
                >
                  Reset crop
                </button>
              ) : (
                <span className="hidden sm:block" aria-hidden="true" />
              )}
              <button
                onClick={handleProcess}
                disabled={isProcessing}
                className="col-span-2 sm:col-span-1 sm:flex-1 px-6 py-3 sm:py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
              >
                {isProcessing ? "Rendering in browser..." : "Apply & Preview Changes"}
              </button>
            </div>

            <DownloadPanel images={images} onDownloadAll={handleDownloadZip} suffix="edited" />
          </div>

          {/* Right: Editing Toolbars & Settings — min-w-0 stops grid
              children from forcing horizontal page scroll on mobile. */}
          <div className="space-y-6 min-w-0">
            <EditingToolbar
              transformations={currentImage?.transformations}
              onChange={(newTransforms) => updateCurrentImage({ transformations: newTransforms })}
            />

            <ResizeControls
              width={currentImage?.width}
              height={currentImage?.height}
              setWidth={(w) => updateCurrentImage({ width: w })}
              setHeight={(h) => updateCurrentImage({ height: h })}
              maintainAspectRatio={currentImage?.maintainAspectRatio}
              setMaintainAspectRatio={(m) => updateCurrentImage({ maintainAspectRatio: m })}
              originalWidth={currentImage?.originalWidth}
              originalHeight={currentImage?.originalHeight}
            />

            <CompressionControls
              quality={currentImage?.quality || 0.92}
              setQuality={(q) => updateCurrentImage({ quality: q })}
              targetSizeKB={currentImage?.targetSizeKB}
              setTargetSizeKB={(s) => updateCurrentImage({ targetSizeKB: s })}
              format={currentImage?.format || "image/jpeg"}
              setFormat={(f) => updateCurrentImage({ format: f })}
            />
          </div>
        </div>
      )}

      {/* Sticky mobile action bar — the toolbar panels are tall, so on
          phones the Apply button can end up far off-screen. This keeps
          the primary action one tap away without covering content
          (it's part of the flow, not an overlay). */}
      {images.length > 0 && (
        <div className="lg:hidden sticky bottom-0 -mx-4 px-4 py-3 mt-8 bg-white/95 dark:bg-gray-950/95 backdrop-blur border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={handleProcess}
            disabled={isProcessing}
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {isProcessing ? "Rendering in browser..." : "Apply & Preview Changes"}
          </button>
        </div>
      )}
    </div>
  );
}
