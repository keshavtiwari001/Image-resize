import ConvertTool from "@/components/image/ConvertTool";
import AdSlot from "@/components/layout/AdSlot";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "Convert Multiple Images & Download as ZIP — Free | ImageUtility",
  description:
    "Batch-convert multiple JPG, PNG or WEBP images and download them together as a single ZIP file — processed entirely in your browser.",
  alternates: { canonical: "/image-to-zip" },
  openGraph: {
    title: "Image to ZIP — Batch Convert & Download | ImageUtility",
    description:
      "Batch-convert multiple images and download them as a single ZIP file, entirely in your browser.",
    url: `${SITE_URL}/image-to-zip`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Image to ZIP — Batch Convert & Download",
    description: "Convert multiple images and download as ZIP. Private and free.",
  },
};

export default function ImageToZipPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Image to ZIP" }]} />
      <header>
        <h1 className="text-3xl font-bold">Image to ZIP Converter</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Convert multiple images at once and download them as a single ZIP archive — all processed
          locally in your browser.
        </p>
      </header>

      <ConvertTool targetFormat="image/jpeg" outputLabel="JPG" />

      <AdSlot type="in-content" />

      <section className="space-y-4 text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-semibold">How It Works</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Drag & drop or select multiple images (JPG, PNG, or WEBP).</li>
          <li>Click &ldquo;Convert&rdquo; — each image is converted locally on your device.</li>
          <li>Click &ldquo;Download ZIP&rdquo; to save all converted images in one archive.</li>
        </ol>

        <h2 className="text-2xl font-semibold pt-4">Why ZIP Downloads?</h2>
        <p>
          When you need to convert a batch of images, downloading them one by one is tedious. The
          ZIP archive bundles everything into a single file created entirely on your device — the
          images are never uploaded anywhere.
        </p>

        <h2 className="text-2xl font-semibold pt-4">Related Tools</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/jpg-to-webp" className="text-blue-600 dark:text-blue-400 underline">JPG to WEBP</Link>
          <Link href="/compress-image" className="text-blue-600 dark:text-blue-400 underline">Compress Image</Link>
          <Link href="/resize-image" className="text-blue-600 dark:text-blue-400 underline">Resize Image</Link>
          <Link href="/image-editor" className="text-blue-600 dark:text-blue-400 underline">Image Editor</Link>
        </div>
      </section>
    </div>
  );
}
