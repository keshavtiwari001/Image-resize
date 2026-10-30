import JSZip from 'jszip';

export async function zipImages(images) {
  const zip = new JSZip();

  images.forEach((img, index) => {
    if (img.processedBlob) {
      const extension = img.format.split('/')[1] || 'jpg';
      const nameWithoutExt = img.originalName.replace(/\.[^/.]+$/, "");
      const fileName = `${nameWithoutExt}-processed.${extension}`;
      zip.file(fileName, img.processedBlob);
    }
  });

  return await zip.generateAsync({ type: 'blob' });
}
