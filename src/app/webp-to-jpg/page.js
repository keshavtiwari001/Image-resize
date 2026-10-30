import ConvertTool from "@/components/image/ConvertTool";
import AdSlot from "@/components/layout/AdSlot";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "WEBP to JPG Converter — Free & Browser-Based | ImageUtility",
  description:
    "Convert WEBP images to JPG format instantly in your browser. Maximum compatibility, zero uploads.",
  alternates: { canonical: "/webp-to-jpg" },
  openGraph: {
    title: "WEBP to JPG Converter — Free & Browser-Based",
    description: "Convert WEBP images to JPG format instantly in your browser.",
    url: `${SITE_URL}/webp-to-jpg`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "WEBP to JPG Converter — Free & Browser-Based",
    description: "Convert WEBP to JPG instantly in your browser. Private and free.",
  },
};

export default function WebpToJpgPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "WEBP to JPG" }]} />
      <header>
        <h1 className="text-3xl font-bold">WEBP to JPG Converter</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Convert WEBP images to the universally supported JPG format — processed entirely in your browser.
        </p>
      </header>

      <ConvertTool targetFormat="image/jpeg" outputLabel="JPG" />

      <AdSlot type="in-content" />

      <section className="space-y-4 text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-semibold">How to Convert WEBP to JPG</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Drag your WEBP files into the upload area or click to browse.</li>
          <li>Click &ldquo;Convert to JPG&rdquo; — conversion happens locally, instantly.</li>
          <li>Download converted JPGs individually or as a ZIP archive.</li>
        </ol>

        <h2 className="text-2xl font-semibold pt-4">Why Convert WEBP to JPG?</h2>
        <p>
          While WEBP is efficient and widely supported by modern browsers, some older applications,
          CMS platforms, and devices still require JPG. Converting ensures maximum compatibility
          for email attachments, legacy software, and print shops.
        </p>

        <h2 className="text-2xl font-semibold pt-4">Related Tools</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/jpg-to-webp" className="text-blue-600 dark:text-blue-400 underline">JPG to WEBP</Link>
          <Link href="/webp-to-png" className="text-blue-600 dark:text-blue-400 underline">WEBP to PNG</Link>
          <Link href="/compress-image" className="text-blue-600 dark:text-blue-400 underline">Compress Image</Link>
        </div>
      </section>
    </div>
  );
}
