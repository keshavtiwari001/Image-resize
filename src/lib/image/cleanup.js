/**
 * Frees the Object URLs held by a working-image state object.
 * Called before replacing or removing an image so large blobs don't
 * linger in memory for the rest of the session.
 */
export function releaseImageUrls(image) {
  if (!image) return;
  if (image.objectUrl) URL.revokeObjectURL(image.objectUrl);
  if (image.processedUrl) URL.revokeObjectURL(image.processedUrl);
}

/**
 * Triggers a download and revokes the URL once the browser has grabbed
 * the data. Revoking immediately would cancel the download, so we wait
 * a tick — long enough for the download to start, short enough that the
 * blob doesn't sit in memory indefinitely.
 */
export function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
