import { canvasToBlob, compressToTargetSize } from "./compressImage";

let worker = null;
let messageId = 0;
const pending = new Map();

/**
 * Encodes a canvas to a Blob, preferring a Web Worker (OffscreenCanvas) so
 * the iterative target-size search doesn't block the UI. Falls back to the
 * main thread when workers or OffscreenCanvas aren't available.
 *
 * Returns { blob, size }.
 */
export async function encodeCanvas(canvas, format, quality, targetSizeKB) {
  const supportsWorker =
    typeof window !== "undefined" &&
    typeof window.Worker !== "undefined" &&
    typeof canvas.transferControlToOffscreen === "function";

  if (supportsWorker) {
    try {
      return await encodeInWorker(canvas, format, quality, targetSizeKB);
    } catch {
      // Worker path failed (e.g. Safari quirks) — fall through to main thread.
    }
  }

  const blob = targetSizeKB
    ? await compressToTargetSize(canvas, format, targetSizeKB)
    : await canvasToBlob(canvas, format, quality);
  return { blob, size: blob.size };
}

function getWorker() {
  if (worker) return worker;
  worker = new Worker(new URL("../../workers/imageWorker.js", import.meta.url));
  worker.onmessage = (event) => {
    const { id, type, blob, size, message } = event.data;
    const entry = pending.get(id);
    if (!entry) return;
    pending.delete(id);
    if (type === "done") entry.resolve({ blob, size });
    else entry.reject(new Error(message));
  };
  worker.onerror = () => {
    // Fail all pending requests; the caller falls back to the main thread.
    pending.forEach((entry) => entry.reject(new Error("Worker crashed")));
    pending.clear();
  };
  return worker;
}

function encodeInWorker(canvas, format, quality, targetSizeKB) {
  return new Promise((resolve, reject) => {
    const id = ++messageId;
    const offscreen = canvas.transferControlToOffscreen();
    getWorker().postMessage(
      { id, canvas: offscreen, format, quality, targetSizeKB },
      [offscreen]
    );
    pending.set(id, { resolve, reject });
  });
}
