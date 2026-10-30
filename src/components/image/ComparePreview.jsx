"use client";

import { useState } from "react";

function formatBytes(bytes) {
  if (!bytes && bytes !== 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Shows the processed image next to the original, or overlaid with a
 * draggable divider so users can compare quality at the same zoom level.
 */
export default function ComparePreview({ image }) {
  const [mode, setMode] = useState("side-by-side"); // or "slider"
  const [split, setSplit] = useState(50);

  const processed = image?.processedUrl;
  if (!image || !processed) return null;

  const saved = image.originalSize - image.processedSize;
  const savedPct = image.originalSize
    ? Math.max(0, Math.round((saved / image.originalSize) * 100))
    : 0;

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Mode switch */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Compare
        </span>
        <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 text-xs">
          <button
            onClick={() => setMode("side-by-side")}
            aria-pressed={mode === "side-by-side"}
            className={`px-3 py-1.5 ${
              mode === "side-by-side"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300"
            }`}
          >
            Side by side
          </button>
          <button
            onClick={() => setMode("slider")}
            aria-pressed={mode === "slider"}
            className={`px-3 py-1.5 ${
              mode === "slider"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300"
            }`}
          >
            Slider
          </button>
        </div>
      </div>

      {/* Image area */}
      <div className="p-4">
        {mode === "side-by-side" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <figure>
              <div className="bg-white dark:bg-black rounded-lg overflow-hidden h-48 flex items-center justify-center">
                <img src={image.objectUrl} alt="Original image" className="max-h-48 max-w-full object-contain" />
              </div>
              <figcaption className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
                <span className="font-medium text-gray-700 dark:text-gray-300">Original</span>
                {" · "}
                {image.originalWidth}×{image.originalHeight}px · {formatBytes(image.originalSize)}
              </figcaption>
            </figure>
            <figure>
              <div className="bg-white dark:bg-black rounded-lg overflow-hidden h-48 flex items-center justify-center">
                <img src={processed} alt="Processed image" className="max-h-48 max-w-full object-contain" />
              </div>
              <figcaption className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
                <span className="font-medium text-gray-700 dark:text-gray-300">Current</span>
                {" · "}
                {formatBytes(image.processedSize)}
                {saved > 0 && (
                  <span className="ml-1 text-green-600 dark:text-green-400 font-medium">
                    (−{savedPct}%)
                  </span>
                )}
              </figcaption>
            </figure>
          </div>
        ) : (
          <div
            className="relative h-64 sm:h-80 overflow-hidden rounded-lg bg-white dark:bg-black select-none"
            style={{ touchAction: "none" }}
          >
            <img src={processed} alt="Processed image" className="absolute inset-0 w-full h-full object-contain" draggable="false" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${split}%` }}>
              <img
                src={image.objectUrl}
                alt="Original image"
                className="absolute inset-0 h-full object-contain"
                style={{ width: `${100 / (split / 100)}%`, maxWidth: "none" }}
                draggable="false"
              />
            </div>
            {/* Divider handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-blue-600 cursor-ew-resize"
              style={{ left: `${split}%` }}
              role="slider"
              aria-label="Comparison divider position"
              aria-valuenow={split}
              aria-valuemin={0}
              aria-valuemax={100}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") setSplit((s) => Math.max(0, s - 5));
                if (e.key === "ArrowRight") setSplit((s) => Math.min(100, s + 5));
              }}
              onPointerDown={(e) => {
                const container = e.currentTarget.parentElement;
                const move = (ev) => {
                  const rect = container.getBoundingClientRect();
                  const pct = ((ev.clientX - rect.left) / rect.width) * 100;
                  setSplit(Math.min(100, Math.max(0, pct)));
                };
                const up = () => {
                  window.removeEventListener("pointermove", move);
                  window.removeEventListener("pointerup", up);
                };
                window.addEventListener("pointermove", move);
                window.addEventListener("pointerup", up);
              }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
                  <path d="M8 7l-4 5 4 5M16 7l4 5-4 5" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
