"use client";

import { useRef, useState, useEffect, useCallback } from "react";

/**
 * Visual crop editor: displays the working image and lets the user drag
 * a resizable crop box over it. On confirm, crop coordinates are stored
 * in image state (relative to the current un-cropped image).
 */
export default function CropModal({ image, onCancel, onApply }) {
  const containerRef = useRef(null);
  const [drag, setDrag] = useState(null); // live drag state while selecting
  const [crop, setCrop] = useState(null); // confirmed box {x, y, w, h} in display px

  // Natural → displayed size mapping so coordinates scale correctly
  const naturalW = image.originalWidth;
  const naturalH = image.originalHeight;
  const [displaySize, setDisplaySize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !naturalW || !naturalH) return;
    const rect = el.getBoundingClientRect();
    const scale = Math.min(rect.width / naturalW, rect.height / naturalH, 1);
    setDisplaySize({ w: Math.round(naturalW * scale), h: Math.round(naturalH * scale) });
  }, [naturalW, naturalH]);

  const getPos = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    return {
      x: Math.min(Math.max(e.clientX - rect.left, 0), displaySize.w),
      y: Math.min(Math.max(e.clientY - rect.top, 0), displaySize.h),
    };
  };

  const onPointerDown = (e) => {
    e.preventDefault();
    const start = getPos(e);
    setDrag({ startX: start.x, startY: start.y, x: start.x, y: start.y });
  };

  const onPointerMove = (e) => {
    if (!drag) return;
    const p = getPos(e);
    setDrag((d) => ({ ...d, x: p.x, y: p.y }));
  };

  const onPointerUp = () => {
    if (!drag) return;
    const x = Math.min(drag.x, drag.startX);
    const y = Math.min(drag.y, drag.startY);
    const w = Math.abs(drag.x - drag.startX);
    const h = Math.abs(drag.y - drag.startY);

    // Ignore accidental tiny selections (mis-taps on touch)
    if (w > 10 && h > 10) {
      setCrop({ x, y, w, h });
    }
    setDrag(null);
  };

  const onPointerLeave = () => {
    if (drag) onPointerUp();
  };

  const handleApply = () => {
    if (!crop) return;
    // Scale display-pixel crop box back to natural image pixels
    const scaleX = naturalW / displaySize.w;
    const scaleY = naturalH / displaySize.h;
    onApply({
      x: Math.round(crop.x * scaleX),
      y: Math.round(crop.y * scaleY),
      width: Math.round(crop.w * scaleX),
      height: Math.round(crop.h * scaleY),
    });
  };

  const box = drag
    ? {
        left: Math.min(drag.x, drag.startX),
        top: Math.min(drag.y, drag.startY),
        width: Math.abs(drag.x - drag.startX),
        height: Math.abs(drag.y - drag.startY),
      }
    : crop;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Crop image"
    >
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 max-w-3xl w-full max-h-[90vh] overflow-auto space-y-4">
        <h2 className="text-lg font-bold">Crop Image</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Drag on the image to select the area to keep.
        </p>

        <div
          ref={containerRef}
          className="relative mx-auto touch-none select-none"
          style={{ width: displaySize.w || "100%", height: displaySize.h || 300 }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerLeave}
        >
          <img
            src={image.objectUrl}
            alt="Crop source"
            draggable="false"
            className="w-full h-full object-contain pointer-events-none select-none"
          />
          {box && box.width > 0 && (
            <div
              className="absolute border-2 border-blue-500 bg-blue-500/20 pointer-events-none"
              style={{ left: box.left, top: box.top, width: box.width, height: box.height }}
            >
              <span className="absolute -top-5 left-0 text-xs text-white bg-black/70 px-1 rounded">
                {Math.round((box.width / displaySize.w) * naturalW)} ×{" "}
                {Math.round((box.height / displaySize.h) * naturalH)} px
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={!crop}
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            Apply Crop
          </button>
        </div>
      </div>
    </div>
  );
}
