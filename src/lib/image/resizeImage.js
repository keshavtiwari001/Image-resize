export async function resizeCanvas(canvas, targetWidth, targetHeight) {
  const outputCanvas = document.createElement("canvas");
  outputCanvas.width = targetWidth;
  outputCanvas.height = targetHeight;
  const ctx = outputCanvas.getContext("2d");

  // Smooth scaling settings
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  ctx.drawImage(canvas, 0, 0, targetWidth, targetHeight);
  return outputCanvas;
}

export function calculateDimensions(originalWidth, originalHeight, newWidth, newHeight, maintainAspect = true) {
  if (!maintainAspect) {
    return { width: newWidth || originalWidth, height: newHeight || originalHeight };
  }

  const aspectRatio = originalWidth / originalHeight;

  if (newWidth && !newHeight) {
    return { width: newWidth, height: Math.round(newWidth / aspectRatio) };
  }

  if (newHeight && !newWidth) {
    return { width: Math.round(newHeight * aspectRatio), height: newHeight };
  }

  if (newWidth && newHeight) {
    // Width takes priority if both specified with aspect lock
    return { width: newWidth, height: Math.round(newWidth / aspectRatio) };
  }

  return { width: originalWidth, height: originalHeight };
}
