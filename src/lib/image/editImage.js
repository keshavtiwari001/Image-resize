/**
 * Applies full canvas edits including crop, rotate, flip, filters, watermarks, borders, and rounded corners.
 */
export async function applyEditsToCanvas(sourceImg, options = {}) {
  const {
    crop = null, // { x, y, width, height }
    rotate = 0, // 0, 90, 180, 270
    flipH = false,
    flipV = false,
    grayscale = false,
    brightness = 100, // percentage (default 100)
    contrast = 100, // percentage (default 100)
    saturation = 100, // percentage (default 100)
    blur = 0, // px
    sharpen = 0, // 0 to 100
    pixelate = 0, // pixel size (e.g., 8)
    watermark = null, // { text, position, opacity, size, color }
    textOverlay = null, // { text, position, size, color, align }
    border = null, // { width, style, color }
    roundCorners = 0, // radius in px
  } = options;

  // 1. Determine base cropped bounds
  const cropX = crop ? crop.x : 0;
  const cropY = crop ? crop.y : 0;
  const cropW = crop ? crop.width : sourceImg.naturalWidth || sourceImg.width;
  const cropH = crop ? crop.height : sourceImg.naturalHeight || sourceImg.height;

  // 2. Create intermediate canvas for rotation & flipping
  const isRotated90or270 = rotate === 90 || rotate === 270;
  const canvasW = isRotated90or270 ? cropH : cropW;
  const canvasH = isRotated90or270 ? cropW : cropH;

  const canvas = document.createElement("canvas");
  canvas.width = canvasW;
  canvas.height = canvasH;
  const ctx = canvas.getContext("2d");

  // 3. Set up CSS-like filters on context
  const filterParts = [];
  if (grayscale) filterParts.push("grayscale(100%)");
  if (brightness !== 100) filterParts.push(`brightness(${brightness}%)`);
  if (contrast !== 100) filterParts.push(`contrast(${contrast}%)`);
  if (saturation !== 100) filterParts.push(`saturate(${saturation}%)`);
  if (blur > 0) filterParts.push(`blur(${blur}px)`);

  if (filterParts.length > 0) {
    ctx.filter = filterParts.join(" ");
  }

  // 4. Handle transformations (Translate, Rotate, Flip)
  ctx.save();
  ctx.translate(canvasW / 2, canvasH / 2);

  if (rotate !== 0) {
    ctx.rotate((rotate * Math.PI) / 180);
  }

  ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);

  // Draw the cropped section centered
  ctx.drawImage(
    sourceImg,
    cropX,
    cropY,
    cropW,
    cropH,
    -cropW / 2,
    -cropH / 2,
    cropW,
    cropH
  );
  ctx.restore();

  // Reset filter for overlays & borders
  ctx.filter = "none";

  // 5. Pixelation effect (if enabled)
  if (pixelate > 1) {
    const pSize = Math.max(2, Math.floor(pixelate));
    const smallW = Math.max(1, Math.floor(canvasW / pSize));
    const smallH = Math.max(1, Math.floor(canvasH / pSize));

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = smallW;
    tempCanvas.height = smallH;
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.imageSmoothingEnabled = false;
    tempCtx.drawImage(canvas, 0, 0, smallW, smallH);

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.drawImage(tempCanvas, 0, 0, smallW, smallH, 0, 0, canvasW, canvasH);
    ctx.imageSmoothingEnabled = true;
  }

  // 6. Sharpening (convolution filter)
  if (sharpen > 0) {
    const imgData = ctx.getImageData(0, 0, canvasW, canvasH);
    const weight = (sharpen / 100) * 1.5;
    // 3x3 sharpen kernel
    const kernel = [
      0, -weight, 0,
      -weight, 1 + 4 * weight, -weight,
      0, -weight, 0
    ];
    applyConvolution(imgData, kernel);
    ctx.putImageData(imgData, 0, 0);
  }

  // 7. Watermark Text
  if (watermark && watermark.text) {
    ctx.save();
    ctx.globalAlpha = watermark.opacity ?? 0.5;
    ctx.font = `${watermark.size || 24}px sans-serif`;
    ctx.fillStyle = watermark.color || "#ffffff";
    ctx.textBaseline = "bottom";

    let textX = 20;
    let textY = canvasH - 20;

    if (watermark.position === "top-left") {
      ctx.textBaseline = "top";
      textX = 20;
      textY = 20;
    } else if (watermark.position === "top-right") {
      ctx.textBaseline = "top";
      ctx.textAlign = "right";
      textX = canvasW - 20;
      textY = 20;
    } else if (watermark.position === "bottom-right") {
      ctx.textAlign = "right";
      textX = canvasW - 20;
      textY = canvasH - 20;
    } else if (watermark.position === "center") {
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      textX = canvasW / 2;
      textY = canvasH / 2;
    }

    ctx.fillText(watermark.text, textX, textY);
    ctx.restore();
  }

  // 8. Custom Text Overlay (positioned like the watermark)
  if (textOverlay && textOverlay.text) {
    ctx.save();
    ctx.font = `${textOverlay.size || 32}px sans-serif`;
    ctx.fillStyle = textOverlay.color || "#000000";
    ctx.textAlign = textOverlay.align || "left";
    ctx.textBaseline = "top";

    const margin = 20;
    let textX = margin;
    let textY = margin;
    const position = textOverlay.position || "top-left";

    if (position === "top-right") {
      ctx.textAlign = textOverlay.align === "left" ? "right" : textOverlay.align || "right";
      textX = canvasW - margin;
    } else if (position === "bottom-left") {
      textY = canvasH - margin - (textOverlay.size || 32);
    } else if (position === "bottom-right") {
      ctx.textAlign = textOverlay.align === "left" ? "right" : textOverlay.align || "right";
      textX = canvasW - margin;
      textY = canvasH - margin - (textOverlay.size || 32);
    } else if (position === "center") {
      ctx.textAlign = "center";
      textX = canvasW / 2;
      textY = canvasH / 2 - (textOverlay.size || 32) / 2;
    }

    ctx.fillText(textOverlay.text, textX, textY);
    ctx.restore();
  }

  // 9. Rounded Corners / Border Output Canvas
  let finalCanvas = canvas;

  if (roundCorners > 0 || (border && border.width > 0)) {
    finalCanvas = document.createElement("canvas");
    finalCanvas.width = canvasW;
    finalCanvas.height = canvasH;
    const finalCtx = finalCanvas.getContext("2d");

    if (roundCorners > 0) {
      finalCtx.beginPath();
      finalCtx.roundRect(0, 0, canvasW, canvasH, roundCorners);
      finalCtx.clip();
    }

    finalCtx.drawImage(canvas, 0, 0);

    // Apply Border if configured
    if (border && border.width > 0) {
      finalCtx.lineWidth = border.width;
      finalCtx.strokeStyle = border.color || "#000000";
      // Dashed borders need a dash pattern; solid is the canvas default.
      if (border.style === "dashed") {
        finalCtx.setLineDash([border.width * 2, border.width * 2]);
      }
      if (roundCorners > 0) {
        finalCtx.stroke();
      } else {
        finalCtx.strokeRect(0, 0, canvasW, canvasH);
      }
    }
  }

  return finalCanvas;
}

/**
 * Basic convolution filter for canvas imageData (e.g. sharpening).
 */
function applyConvolution(imageData, kernel) {
  const side = Math.round(Math.sqrt(kernel.length));
  const halfSide = Math.floor(side / 2);
  const src = new Uint8ClampedArray(imageData.data);
  const dst = imageData.data;
  const w = imageData.width;
  const h = imageData.height;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dstOff = (y * w + x) * 4;
      let r = 0, g = 0, b = 0;

      for (let cy = 0; cy < side; cy++) {
        for (let cx = 0; cx < side; cx++) {
          const scx = Math.min(w - 1, Math.max(0, x + cx - halfSide));
          const scy = Math.min(h - 1, Math.max(0, y + cy - halfSide));
          const srcOff = (scy * w + scx) * 4;
          const wt = kernel[cy * side + cx];
          r += src[srcOff] * wt;
          g += src[srcOff + 1] * wt;
          b += src[srcOff + 2] * wt;
        }
      }

      dst[dstOff] = Math.min(255, Math.max(0, r));
      dst[dstOff + 1] = Math.min(255, Math.max(0, g));
      dst[dstOff + 2] = Math.min(255, Math.max(0, b));
    }
  }
}
