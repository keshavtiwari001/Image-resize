import ConvertTool from "@/components/image/ConvertTool";
import AdSlot from "@/components/layout/AdSlot";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "PNG to WEBP Converter — Free & Browser-Based | ImageUtility",
  description:
    "Convert PNG images to WEBP format instantly in your browser. Save bandwidth without losing transparency.",
  alternates: { canonical: "/png-to-webp" },
  openGraph: {
    title: "PNG to WEBP Converter — Free & Browser-Based",
    description: "Convert PNG images to WEBP format instantly in your browser.",
    url: `${SITE_URL}/png-to-webp`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "PNG to WEBP Converter — Free & Browser-Based",
    description: "Convert PNG to WEBP instantly in your browser. Private and free.",
  },
};

export default function PngToWebpPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "PNG to WEBP" }]} />
      <header>
        <h1 className="text-3xl font-bold">PNG to WEBP Converter</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Convert PNG images to WEBP — preserving transparency while shrinking file sizes, all locally.
        </p>
      </header>

      <ConvertTool targetFormat="image/webp" outputLabel="WEBP" />

      <AdSlot type="in-content" />

      <section className="space-y-4 text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-semibold">How to Convert PNG to WEBP</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Drop your PNG files into the upload area or click to select.</li>
          <li>Click &ldquo;Convert to WEBP&rdquo; — processed instantly by your browser.</li>
          <li>Download the results individually or as a ZIP file.</li>
        </ol>

        <h2 className="text-2xl font-semibold pt-4">PNG vs WEBP</h2>
        <p>
          WEBP supports alpha transparency just like PNG, but usually at a much smaller file size.
          Converting PNG screenshots, logos, and graphics to WEBP is one of the easiest ways to speed
          up a website without visible quality loss.
        </p>

        <h2 className="text-2xl font-semibold pt-4">Related Tools</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/webp-to-png" className="text-blue-600 dark:text-blue-400 underline">WEBP to PNG</Link>
          <Link href="/jpg-to-webp" className="text-blue-600 dark:text-blue-400 underline">JPG to WEBP</Link>
          <Link href="/image-editor" className="text-blue-600 dark:text-blue-400 underline">Image Editor</Link>
        </div>
      </section>
    </div>
  );
}
