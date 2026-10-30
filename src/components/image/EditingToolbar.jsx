"use client";

import { useState } from "react";

export default function EditingToolbar({ transformations = {}, onChange }) {
  const [activeTab, setActiveTab] = useState("transform");

  const update = (key, val) => {
    onChange({
      ...transformations,
      [key]: val,
    });
  };

  const updateNested = (parentKey, childKey, val) => {
    onChange({
      ...transformations,
      [parentKey]: {
        ...(transformations[parentKey] || {}),
        [childKey]: val,
      },
    });
  };

  const TABS = [
    { id: "transform", label: "Transform" },
    { id: "filters", label: "Filters & Effects" },
    { id: "overlays", label: "Watermark & Text" },
    { id: "style", label: "Borders & Corners" },
  ];

  return (
    <div className="border rounded-xl dark:border-gray-800 bg-gray-50 dark:bg-gray-900 space-y-6">
      {/* Tabs — horizontally scrollable on narrow screens without
          shifting the page layout. hide-scrollbar keeps it clean. */}
      <div
        role="tablist"
        aria-label="Editing tools"
        className="flex gap-4 text-sm font-medium px-4 pt-4 pb-2 overflow-x-auto hide-scrollbar snap-x"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 pt-1 px-1 whitespace-nowrap shrink-0 border-b-2 transition ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* All tab panels share this padding wrapper */}
      <div className="px-4 pb-4">

      {/* Tab Content: Transform */}
      {activeTab === "transform" && (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-2">Rotate</label>
            <div className="flex flex-wrap gap-2">
              {[0, 90, 180, 270].map((deg) => (
                <button
                  key={deg}
                  onClick={() => update("rotate", deg)}
                  className={`px-4 py-2 text-xs rounded-lg border ${
                    (transformations.rotate || 0) === deg
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-blue-500"
                  }`}
                >
                  {deg}°
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Flip</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => update("flipH", !transformations.flipH)}
                className={`px-4 py-2 text-xs rounded-lg border ${
                  transformations.flipH
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-blue-500"
                }`}
              >
                Flip Horizontal
              </button>
              <button
                onClick={() => update("flipV", !transformations.flipV)}
                className={`px-4 py-2 text-xs rounded-lg border ${
                  transformations.flipV
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-blue-500"
                }`}
              >
                Flip Vertical
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Filters */}
      {activeTab === "filters" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="grayscale"
              checked={!!transformations.grayscale}
              onChange={(e) => update("grayscale", e.target.checked)}
              className="rounded accent-blue-600"
            />
            <label htmlFor="grayscale" className="text-sm">Grayscale</label>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Brightness</span>
              <span>{transformations.brightness ?? 100}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={transformations.brightness ?? 100}
              onChange={(e) => update("brightness", parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg dark:bg-gray-700 accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Contrast</span>
              <span>{transformations.contrast ?? 100}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={transformations.contrast ?? 100}
              onChange={(e) => update("contrast", parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg dark:bg-gray-700 accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Saturation</span>
              <span>{transformations.saturation ?? 100}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={transformations.saturation ?? 100}
              onChange={(e) => update("saturation", parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg dark:bg-gray-700 accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Blur</span>
              <span>{transformations.blur ?? 0}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={transformations.blur ?? 0}
              onChange={(e) => update("blur", parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg dark:bg-gray-700 accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Sharpen</span>
              <span>{transformations.sharpen ?? 0}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={transformations.sharpen ?? 0}
              onChange={(e) => update("sharpen", parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg dark:bg-gray-700 accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Pixelate Intensity</span>
              <span>{transformations.pixelate ?? 0}</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={transformations.pixelate ?? 0}
              onChange={(e) => update("pixelate", parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg dark:bg-gray-700 accent-blue-600"
            />
          </div>
        </div>
      )}

      {/* Tab Content: Overlays */}
      {activeTab === "overlays" && (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Watermark Text</label>
            <input
              type="text"
              placeholder="e.g. © My Brand"
              value={transformations.watermark?.text || ""}
              onChange={(e) => updateNested("watermark", "text", e.target.value)}
              className="w-full px-3 py-1.5 text-sm border rounded dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
          {transformations.watermark?.text && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs block mb-1">Position</label>
                  <select
                    value={transformations.watermark?.position || "bottom-right"}
                    onChange={(e) => updateNested("watermark", "position", e.target.value)}
                    className="w-full px-2 py-1 text-xs border rounded dark:bg-gray-800 dark:border-gray-700"
                  >
                    <option value="bottom-right">Bottom Right</option>
                    <option value="bottom-left">Bottom Left</option>
                    <option value="top-right">Top Right</option>
                    <option value="top-left">Top Left</option>
                    <option value="center">Center</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs block mb-1">Opacity</label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={transformations.watermark?.opacity ?? 0.5}
                    onChange={(e) => updateNested("watermark", "opacity", parseFloat(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded dark:bg-gray-700 accent-blue-600"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Size</span>
                    <span>{transformations.watermark?.size ?? 24}px</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="120"
                    value={transformations.watermark?.size ?? 24}
                    onChange={(e) => updateNested("watermark", "size", parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded dark:bg-gray-700 accent-blue-600"
                  />
                </div>
                <div>
                  <label className="text-xs block mb-1">Color</label>
                  <input
                    type="color"
                    value={transformations.watermark?.color || "#ffffff"}
                    onChange={(e) => updateNested("watermark", "color", e.target.value)}
                    className="w-10 h-6 p-0 border rounded cursor-pointer"
                  />
                </div>
              </div>
            </>
          )}

          {/* Custom Text Overlay */}
          <div className="pt-2 border-t dark:border-gray-800">
            <label className="text-sm font-medium block mb-1">Add Text</label>
            <input
              type="text"
              placeholder="Text to place on the image"
              value={transformations.textOverlay?.text || ""}
              onChange={(e) => updateNested("textOverlay", "text", e.target.value)}
              className="w-full px-3 py-1.5 text-sm border rounded dark:bg-gray-800 dark:border-gray-700"
            />
            {transformations.textOverlay?.text && (
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Font Size</span>
                    <span>{transformations.textOverlay?.size ?? 32}px</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="150"
                    value={transformations.textOverlay?.size ?? 32}
                    onChange={(e) => updateNested("textOverlay", "size", parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded dark:bg-gray-700 accent-blue-600"
                  />
                </div>
                <div>
                  <label className="text-xs block mb-1">Position</label>
                  <select
                    value={transformations.textOverlay?.position || "top-left"}
                    onChange={(e) => updateNested("textOverlay", "position", e.target.value)}
                    className="w-full px-2 py-1 text-xs border rounded dark:bg-gray-800 dark:border-gray-700"
                  >
                    <option value="top-left">Top Left</option>
                    <option value="top-right">Top Right</option>
                    <option value="bottom-left">Bottom Left</option>
                    <option value="bottom-right">Bottom Right</option>
                    <option value="center">Center</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs block mb-1">Color</label>
                  <input
                    type="color"
                    value={transformations.textOverlay?.color || "#000000"}
                    onChange={(e) => updateNested("textOverlay", "color", e.target.value)}
                    className="w-10 h-6 p-0 border rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-xs block mb-1">Alignment</label>
                  <select
                    value={transformations.textOverlay?.align || "left"}
                    onChange={(e) => updateNested("textOverlay", "align", e.target.value)}
                    className="w-full px-2 py-1 text-xs border rounded dark:bg-gray-800 dark:border-gray-700"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab Content: Style */}
      {activeTab === "style" && (
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Rounded Corners</span>
              <span>{transformations.roundCorners ?? 0}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={transformations.roundCorners ?? 0}
              onChange={(e) => update("roundCorners", parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg dark:bg-gray-700 accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Border Width</span>
              <span>{transformations.border?.width ?? 0}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={transformations.border?.width ?? 0}
              onChange={(e) => updateNested("border", "width", parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg dark:bg-gray-700 accent-blue-600"
            />
          </div>

          {transformations.border?.width > 0 && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs block mb-1">Border Style</label>
                <select
                  value={transformations.border?.style || "solid"}
                  onChange={(e) => updateNested("border", "style", e.target.value)}
                  className="w-full px-2 py-1 text-xs border rounded dark:bg-gray-800 dark:border-gray-700"
                >
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                </select>
              </div>
              <div>
                <label className="text-xs block mb-1">Border Color</label>
                <input
                  type="color"
                  value={transformations.border?.color || "#000000"}
                  onChange={(e) => updateNested("border", "color", e.target.value)}
                  className="w-10 h-8 p-0 border rounded cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
}
