import ConvertTool from "@/components/image/ConvertTool";
import AdSlot from "@/components/layout/AdSlot";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "WEBP to PNG Converter — Free & Browser-Based | ImageUtility",
  description:
    "Convert WEBP images to PNG format instantly in your browser. Lossless output, zero uploads.",
  alternates: { canonical: "/webp-to-png" },
  openGraph: {
    title: "WEBP to PNG Converter — Free & Browser-Based",
    description: "Convert WEBP images to PNG format instantly in your browser.",
    url: `${SITE_URL}/webp-to-png`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "WEBP to PNG Converter — Free & Browser-Based",
    description: "Convert WEBP to PNG instantly in your browser. Private and free.",
  },
};

export default function WebpToPngPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "WEBP to PNG" }]} />
      <header>
        <h1 className="text-3xl font-bold">WEBP to PNG Converter</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Convert WEBP images to lossless PNG files right in your browser — fast, private, and free.
        </p>
      </header>

      <ConvertTool targetFormat="image/png" outputLabel="PNG" />

      <AdSlot type="in-content" />

      <section className="space-y-4 text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-semibold">How to Convert WEBP to PNG</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Upload your WEBP files using drag & drop or the file picker.</li>
          <li>Click &ldquo;Convert to PNG&rdquo; — your browser performs the conversion locally.</li>
          <li>Download the PNG files individually or all at once via ZIP.</li>
        </ol>

        <h2 className="text-2xl font-semibold pt-4">Why Convert WEBP to PNG?</h2>
        <p>
          PNG is the safer choice when you need pixel-perfect lossless output, full transparency
          support, or compatibility with design tools that don&rsquo;t accept WEBP. Since PNG is lossless,
          the converted file will typically be larger than the original WEBP.
        </p>

        <h2 className="text-2xl font-semibold pt-4">Related Tools</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/webp-to-jpg" className="text-blue-600 dark:text-blue-400 underline">WEBP to JPG</Link>
          <Link href="/jpg-to-png" className="text-blue-600 dark:text-blue-400 underline">JPG to PNG</Link>
          <Link href="/resize-image" className="text-blue-600 dark:text-blue-400 underline">Resize Image</Link>
        </div>
      </section>
    </div>
  );
}
