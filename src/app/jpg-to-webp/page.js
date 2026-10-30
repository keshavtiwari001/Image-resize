import ConvertTool from "@/components/image/ConvertTool";
import AdSlot from "@/components/layout/AdSlot";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "JPG to WEBP Converter — Free & Browser-Based | ImageUtility",
  description:
    "Convert JPG images to WEBP format instantly in your browser. Smaller files, faster websites, zero uploads.",
  alternates: { canonical: "/jpg-to-webp" },
  openGraph: {
    title: "JPG to WEBP Converter — Free & Browser-Based",
    description: "Convert JPG images to WEBP format instantly in your browser.",
    url: `${SITE_URL}/jpg-to-webp`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "JPG to WEBP Converter — Free & Browser-Based",
    description: "Convert JPG to WEBP instantly in your browser. Private and free.",
  },
};

export default function JpgToWebpPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "JPG to WEBP" }]} />
      <header>
        <h1 className="text-3xl font-bold">JPG to WEBP Converter</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Convert JPG images to smaller, modern WEBP files — entirely in your browser, no uploads needed.
        </p>
      </header>

      <ConvertTool targetFormat="image/webp" outputLabel="WEBP" />

      <AdSlot type="in-content" />

      <section className="space-y-4 text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-semibold">How to Convert JPG to WEBP</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Upload your JPG images via drag & drop or the file picker.</li>
          <li>Click &ldquo;Convert to WEBP&rdquo; — your browser handles the encoding locally.</li>
          <li>Download the WEBP files individually or bundled as a ZIP.</li>
        </ol>

        <h2 className="text-2xl font-semibold pt-4">Why Convert JPG to WEBP?</h2>
        <p>
          WEBP typically produces 25–35% smaller files than JPG at similar visual quality, making it
          ideal for websites, blogs, and e-commerce stores. All modern browsers support WEBP, so it is
          a safe default for web publishing.
        </p>

        <h2 className="text-2xl font-semibold pt-4">Browser Support Note</h2>
        <p>
          WEBP encoding uses your browser&rsquo;s built-in Canvas encoder. All modern Chrome, Edge, Firefox,
          and Safari versions support this natively.
        </p>

        <h2 className="text-2xl font-semibold pt-4">Related Tools</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/webp-to-jpg" className="text-blue-600 dark:text-blue-400 underline">WEBP to JPG</Link>
          <Link href="/png-to-webp" className="text-blue-600 dark:text-blue-400 underline">PNG to WEBP</Link>
          <Link href="/compress-image" className="text-blue-600 dark:text-blue-400 underline">Compress Image</Link>
        </div>
      </section>
    </div>
  );
}
