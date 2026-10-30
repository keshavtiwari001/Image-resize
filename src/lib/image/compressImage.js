import { applyEditsToCanvas } from "./editImage";
import { resizeCanvas } from "./resizeImage";
import { encodeCanvas } from "./encodeImage";

/**
 * Compresses a canvas to a blob with a specific format and quality.
 */
export async function canvasToBlob(canvas, format, quality) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), format, quality);
  });
}

/**
 * Iteratively attempts to compress a canvas to reach a target file size in KB.
 */
export async function compressToTargetSize(canvas, format, targetSizeKB, maxIterations = 8) {
  const targetBytes = targetSizeKB * 1024;
  let minQ = 0.01;
  let maxQ = 1.0;
  let bestBlob = null;
  let currentQ = 0.92;

  // Initial check at 0.92
  let blob = await canvasToBlob(canvas, format, currentQ);
  if (blob.size <= targetBytes) {
    bestBlob = blob;
    minQ = 0.92;
  } else {
    maxQ = 0.92;
  }

  for (let i = 0; i < maxIterations; i++) {
    currentQ = (minQ + maxQ) / 2;
    blob = await canvasToBlob(canvas, format, currentQ);

    if (blob.size <= targetBytes) {
      bestBlob = blob;
      minQ = currentQ;
      // If we are within 5% of target, stop
      if (blob.size >= targetBytes * 0.95) break;
    } else {
      maxQ = currentQ;
    }
  }

  // If even at lowest quality it exceeds target size, try downscaling canvas dimensions
  if (!bestBlob && canvas.width > 200 && canvas.height > 200) {
    const scaleFactor = 0.8;
    const scaledCanvas = await resizeCanvas(
      canvas,
      Math.round(canvas.width * scaleFactor),
      Math.round(canvas.height * scaleFactor)
    );
    return await compressToTargetSize(scaledCanvas, format, targetSizeKB, 4);
  }

  return bestBlob || blob;
}

/**
 * Unified pipeline function that applies all sequential operations to an image:
 * 1. Geometric transforms & Edits (Crop, Rotate, Flip, Filters, Overlays)
 * 2. Pixel Resize
 * 3. Format Conversion & Compression (Quality or Target Size)
 */
export async function processImage(imageState) {
  const { width, height, format, quality, targetSizeKB, transformations } = imageState;

  // 1. Load source image element
  const sourceImg = await new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = imageState.objectUrl;
  });

  // 2. Apply editing transformations
  let workingCanvas = await applyEditsToCanvas(sourceImg, transformations || {});

  // 3. Apply resizing if width/height differ from current working canvas dimensions
  if (width && height && (workingCanvas.width !== width || workingCanvas.height !== height)) {
    workingCanvas = await resizeCanvas(workingCanvas, width, height);
  }

  // 4. Compress / Convert (runs in a Web Worker when the browser supports
  // OffscreenCanvas, keeping the UI responsive during target-size search)
  const outFormat = format || "image/jpeg";
  const { blob: finalBlob, size } = await encodeCanvas(
    workingCanvas,
    outFormat,
    quality || 0.92,
    targetSizeKB || null
  );

  return {
    blob: finalBlob,
    url: URL.createObjectURL(finalBlob),
    size,
  };
}
