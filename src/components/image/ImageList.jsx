export default function ImageList({ images, onRemove }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((img) => (
        <div key={img.id} className="border dark:border-gray-800 rounded-lg p-2 flex flex-col gap-2 bg-gray-50 dark:bg-gray-900">
          <img
            src={img.objectUrl}
            alt={img.originalName}
            className="w-full h-32 object-contain rounded bg-white dark:bg-black"
          />
          <div className="text-xs truncate" title={img.originalName}>{img.originalName}</div>
          <div className="text-xs text-gray-500">{(img.originalSize / 1024).toFixed(1)} KB</div>
          <button
            onClick={() => onRemove(img.id)}
            className="text-xs text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
