/**
 * Download panel shown after processing. `suffix` names the operation
 * (e.g. "compressed", "converted", "edited") so downloaded files read
 * like "photo-converted.png" instead of always "-compressed".
 */
export default function DownloadPanel({ images, onDownloadAll, suffix = "processed" }) {
  const processedImages = images.filter((img) => img.processedBlob);
  if (processedImages.length === 0) return null;

  const downloadOne = (img) => {
    const a = document.createElement("a");
    a.href = img.processedUrl;
    const baseName = img.originalName.replace(/\.[^/.]+$/, "");
    const ext = (img.format || "image/jpeg").split("/")[1];
    a.download = `${baseName}-${suffix}.${ext}`;
    a.click();
  };

  return (
    <div className="p-6 border rounded-xl dark:border-gray-800 bg-blue-50 dark:bg-blue-900/20 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <h3 className="font-bold">Ready to Download</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {processedImages.length} {processedImages.length === 1 ? "image" : "images"} processed.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {processedImages.length === 1 ? (
          <button
            onClick={() => downloadOne(processedImages[0])}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Download {suffix ? suffix.charAt(0).toUpperCase() + suffix.slice(1) : "Image"}
          </button>
        ) : (
          <>
            {processedImages.map((img) => (
              <button
                key={img.id}
                onClick={() => downloadOne(img)}
                className="px-4 py-2 border border-blue-600 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/40 transition truncate max-w-[180px]"
                title={`Download ${img.originalName}`}
              >
                {img.originalName}
              </button>
            ))}
            <button
              onClick={onDownloadAll}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Download ZIP
            </button>
          </>
        )}
      </div>
    </div>
  );
}
