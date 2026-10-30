import ConvertTool from "@/components/image/ConvertTool";
import AdSlot from "@/components/layout/AdSlot";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "JPG to PNG Converter — Free & Browser-Based | ImageUtility",
  description:
    "Convert JPG images to PNG format instantly in your browser. No uploads, no registration — fast, private, and free.",
  alternates: { canonical: "/jpg-to-png" },
  openGraph: {
    title: "JPG to PNG Converter — Free & Browser-Based",
    description:
      "Convert JPG images to PNG format instantly in your browser. No uploads, no registration.",
    url: `${SITE_URL}/jpg-to-png`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "JPG to PNG Converter — Free & Browser-Based",
    description: "Convert JPG to PNG instantly in your browser. Private and free.",
  },
};

export default function JpgToPngPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "JPG to PNG" }]} />
      <header>
        <h1 className="text-3xl font-bold">JPG to PNG Converter</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Convert JPG images to high-quality PNG files. Everything runs locally in your browser — your images are never uploaded.
        </p>
      </header>

      <ConvertTool targetFormat="image/png" outputLabel="PNG" />

      <AdSlot type="in-content" />

      <section className="space-y-4 text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-semibold">How to Convert JPG to PNG</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Click &ldquo;Choose Images&rdquo; or drag your JPG files into the upload area.</li>
          <li>Click &ldquo;Convert to PNG&rdquo; — processing happens instantly in your browser.</li>
          <li>Download your converted PNG files individually or as a ZIP.</li>
        </ol>

        <h2 className="text-2xl font-semibold pt-4">Why Convert JPG to PNG?</h2>
        <p>
          PNG is a lossless format that supports transparency. Converting from JPG to PNG is useful
          when you need crisp graphics, text-heavy screenshots, or plan to add transparent overlays —
          though note that converting cannot restore quality already lost in JPG compression.
        </p>

        <h2 className="text-2xl font-semibold pt-4">Related Tools</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/png-to-jpg" className="text-blue-600 dark:text-blue-400 underline">PNG to JPG</Link>
          <Link href="/jpg-to-webp" className="text-blue-600 dark:text-blue-400 underline">JPG to WEBP</Link>
          <Link href="/compress-image" className="text-blue-600 dark:text-blue-400 underline">Compress Image</Link>
          <Link href="/image-editor" className="text-blue-600 dark:text-blue-400 underline">Image Editor</Link>
        </div>
      </section>
    </div>
  );
}
