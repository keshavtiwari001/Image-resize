export async function loadImage(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("File is not a valid image."));
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      resolve({
        id: crypto.randomUUID(),
        file,
        originalName: file.name,
        originalSize: file.size,
        originalWidth: img.width,
        originalHeight: img.height,
        originalType: file.type,
        objectUrl,
        format: file.type,
        quality: 0.92,
        targetSizeKB: null,
        width: img.width,
        height: img.height,
        maintainAspectRatio: true,
        transformations: {
          crop: null,
          rotate: 0,
          flipH: false,
          flipV: false,
          grayscale: false,
          brightness: 100,
          contrast: 100,
          saturation: 100,
          blur: 0,
          sharpen: 0,
          pixelate: 0,
          removeExif: true,
          watermark: null,
          textOverlay: null,
          border: null,
          roundCorners: 0,
        },
        processedBlob: null,
        processedUrl: null,
        processedSize: null,
        processingStatus: "idle",
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Unable to load image."));
    };

    img.src = objectUrl;
  });
}
