"use client";

export default function CompressionControls({
  quality,
  setQuality,
  targetSizeKB,
  setTargetSizeKB,
  format,
  setFormat
}) {
  const targetSizes = [20, 50, 100, 200, 500, 1000];

  return (
    <div className="p-6 border rounded-xl dark:border-gray-800 bg-gray-50 dark:bg-gray-900 space-y-6">
      <h3 className="text-lg font-bold">Compression Settings</h3>

      {/* Format Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Output Format</label>
        <div className="flex flex-wrap gap-2">
          {['image/jpeg', 'image/png', 'image/webp'].map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`px-4 py-1.5 text-xs rounded-full border ${
                format === f
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-blue-500'
              }`}
            >
              {f.split('/')[1].toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Quality Slider (only if no target size) */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <label className="text-sm font-medium">Quality ({Math.round(quality * 100)}%)</label>
          {targetSizeKB && (
            <button
              onClick={() => setTargetSizeKB(null)}
              className="text-xs text-blue-600 underline"
            >
              Use quality slider
            </button>
          )}
        </div>
        <input
          type="range"
          min="0.05"
          max="1"
          step="0.01"
          value={quality}
          disabled={!!targetSizeKB}
          onChange={(e) => {
            setQuality(parseFloat(e.target.value));
            setTargetSizeKB(null);
          }}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
        />
      </div>

      {/* Target Size Buttons — wrap freely; the custom input gets its own
          full-width row on phones so it can't overflow or get clipped. */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Target File Size</label>
        <div className="flex flex-wrap gap-2 items-center">
          {targetSizes.map((size) => (
            <button
              key={size}
              onClick={() => setTargetSizeKB(size)}
              className={`px-4 py-1.5 text-xs rounded-lg border ${
                targetSizeKB === size
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-blue-500'
              }`}
            >
              {size < 1000 ? `${size} KB` : `${size/1000} MB`}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            placeholder="Custom size"
            aria-label="Custom target size in kilobytes"
            className="w-28 px-2 py-1.5 text-xs border rounded dark:bg-gray-800 dark:border-gray-700"
            onChange={(e) => setTargetSizeKB(parseInt(e.target.value) || null)}
          />
          <span className="text-xs text-gray-500">KB</span>
        </div>
      </div>
    </div>
  );
}
