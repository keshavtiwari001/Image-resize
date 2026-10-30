"use client";

export default function ResizeControls({
  width,
  height,
  setWidth,
  setHeight,
  maintainAspectRatio,
  setMaintainAspectRatio,
  originalWidth,
  originalHeight
}) {
  const handleWidthChange = (e) => {
    const val = parseInt(e.target.value) || '';
    setWidth(val);
    if (maintainAspectRatio && val && originalWidth && originalHeight) {
      const aspectRatio = originalWidth / originalHeight;
      setHeight(Math.round(val / aspectRatio));
    }
  };

  const handleHeightChange = (e) => {
    const val = parseInt(e.target.value) || '';
    setHeight(val);
    if (maintainAspectRatio && val && originalWidth && originalHeight) {
      const aspectRatio = originalWidth / originalHeight;
      setWidth(Math.round(val * aspectRatio));
    }
  };

  return (
    <div className="p-6 border rounded-xl dark:border-gray-800 bg-gray-50 dark:bg-gray-900 space-y-4">
      <h3 className="text-lg font-bold">Resize Dimensions</h3>

      {/* Common aspect-ratio presets: fit the longest side to the current width */}
      <div>
        <label className="text-sm font-medium block mb-2">Aspect Ratio Presets</label>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Original", ratio: null },
            { label: "1:1", ratio: 1 },
            { label: "4:3", ratio: 4 / 3 },
            { label: "3:2", ratio: 3 / 2 },
            { label: "16:9", ratio: 16 / 9 },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                if (!preset.ratio || !originalWidth || !originalHeight) return;
                // A preset changes the shape, so the original aspect lock
                // must come off or it would immediately overwrite the height.
                if (maintainAspectRatio) setMaintainAspectRatio(false);
                const w = parseInt(width) || originalWidth;
                const h = Math.round(w / preset.ratio);
                setWidth(w);
                setHeight(h);
              }}
              disabled={!preset.ratio || !originalWidth}
              className="px-3 py-1 text-xs rounded border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 disabled:opacity-40 hover:border-blue-500 transition"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium block mb-1">Width (px)</label>
          <input
            type="number"
            value={width}
            onChange={handleWidthChange}
            placeholder={originalWidth ? `${originalWidth}` : "Width"}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Height (px)</label>
          <input
            type="number"
            value={height}
            onChange={handleHeightChange}
            placeholder={originalHeight ? `${originalHeight}` : "Height"}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="aspectRatio"
          checked={maintainAspectRatio}
          onChange={(e) => setMaintainAspectRatio(e.target.checked)}
          className="rounded accent-blue-600"
        />
        <label htmlFor="aspectRatio" className="text-sm text-gray-700 dark:text-gray-300">
          Maintain Aspect Ratio
        </label>
      </div>
    </div>
  );
}
