/**
 * Image processing worker: runs the CPU-heavy parts of the pipeline
 * (iterative target-size encoding) off the main thread so the UI stays
 * responsive during multi-iteration binary search on large images.
 *
 * Messages IN:  { id, canvas: OffscreenCanvas, format, quality, targetSizeKB }
 * Messages OUT: { id, type: "done", blob, size } | { id, type: "error", message }
 */

self.onmessage = async (event) => {
  const { id, canvas, format, quality, targetSizeKB } = event.data;
  try {
    const blob = targetSizeKB
      ? await compressToTargetSize(canvas, format, targetSizeKB)
      : await canvas.convertToBlob({ type: format, quality: quality ?? 0.92 });

    self.postMessage({ id, type: "done", blob, size: blob.size });
  } catch (err) {
    self.postMessage({ id, type: "error", message: err.message });
  }
};

/**
 * Binary-searches quality until the encoded blob fits under the target size.
 * Same algorithm as the main-thread version (compressImage.js) but operates
 * on an OffscreenCanvas via convertToBlob.
 */
async function compressToTargetSize(canvas, format, targetSizeKB, maxIterations = 8) {
  const targetBytes = targetSizeKB * 1024;
  let minQ = 0.01;
  let maxQ = 1.0;
  let bestBlob = null;

  let blob = await canvas.convertToBlob({ type: format, quality: 0.92 });
  if (blob.size <= targetBytes) {
    bestBlob = blob;
    minQ = 0.92;
  } else {
    maxQ = 0.92;
  }

  for (let i = 0; i < maxIterations; i++) {
    const q = (minQ + maxQ) / 2;
    blob = await canvas.convertToBlob({ type: format, quality: q });

    if (blob.size <= targetBytes) {
      bestBlob = blob;
      minQ = q;
      // Within 5% of target — good enough, avoids extra iterations
      if (blob.size >= targetBytes * 0.95) break;
    } else {
      maxQ = q;
    }
  }

  return bestBlob || blob;
}
