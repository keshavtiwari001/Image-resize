import ConvertTool from "@/components/image/ConvertTool";
import AdSlot from "@/components/layout/AdSlot";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "PNG to JPG Converter — Free & Browser-Based | ImageUtility",
  description:
    "Convert PNG images to JPG format instantly in your browser. Reduce file size with no uploads required.",
  alternates: { canonical: "/png-to-jpg" },
  openGraph: {
    title: "PNG to JPG Converter — Free & Browser-Based",
    description: "Convert PNG images to JPG format instantly in your browser.",
    url: `${SITE_URL}/png-to-jpg`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "PNG to JPG Converter — Free & Browser-Based",
    description: "Convert PNG to JPG instantly in your browser. Private and free.",
  },
};

export default function PngToJpgPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "PNG to JPG" }]} />
      <header>
        <h1 className="text-3xl font-bold">PNG to JPG Converter</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Convert PNG images to compressed JPG files right in your browser — no uploads, no quality surprises.
        </p>
      </header>

      <ConvertTool targetFormat="image/jpeg" outputLabel="JPG" />

      <AdSlot type="in-content" />

      <section className="space-y-4 text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-semibold">How to Convert PNG to JPG</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Upload one or more PNG files using drag & drop or the file picker.</li>
          <li>Click &ldquo;Convert to JPG&rdquo; — the conversion runs locally on your device.</li>
          <li>Download your JPG files individually or all at once as a ZIP.</li>
        </ol>

        <h2 className="text-2xl font-semibold pt-4">Good to Know: Transparency</h2>
        <p>
          PNG supports transparent backgrounds; JPG does not. During conversion, transparent areas
          are filled with a solid background so the result looks correct in any viewer.
        </p>

        <h2 className="text-2xl font-semibold pt-4">Related Tools</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/jpg-to-png" className="text-blue-600 dark:text-blue-400 underline">JPG to PNG</Link>
          <Link href="/png-to-webp" className="text-blue-600 dark:text-blue-400 underline">PNG to WEBP</Link>
          <Link href="/compress-image" className="text-blue-600 dark:text-blue-400 underline">Compress Image</Link>
        </div>
      </section>
    </div>
  );
}
