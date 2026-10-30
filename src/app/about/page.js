import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "About Us | ImageUtility",
  description:
    "Learn about ImageUtility — a free, browser-based image tool for converting, compressing, and editing images without uploads.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About ImageUtility",
    description:
      "A free, browser-based image tool for converting, compressing, and editing images without uploads.",
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About ImageUtility",
    description: "A free browser-based image tool. No uploads.",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 text-gray-700 dark:text-gray-300">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">About Us</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Simple image tools that work in your browser.</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Who We Are</h2>
        <p>
          ImageUtility provides free online tools for converting, compressing, resizing, and editing
          images. Our aim is to make everyday image tasks accessible without creating an account
          or uploading your files to a server.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">What This Tool Does</h2>
        <p>ImageUtility lets you:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Convert between JPG, PNG, and WEBP formats</li>
          <li>Compress images by quality slider or exact target file size (20 KB to 1 MB)</li>
          <li>Resize images by pixel dimensions with optional aspect ratio lock</li>
          <li>Edit images: crop, rotate, flip, filters, watermarks, text, borders, and rounded corners</li>
          <li>Process multiple images at once and download them as a ZIP</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">How Browser-Based Processing Works</h2>
        <p>
          When you select an image, your browser reads the file directly from your device using the
          File API. All conversion, compression, and editing happens on your own device using the HTML5
          Canvas API and modern JavaScript. The file is rendered, transformed, and re-encoded locally —
          then offered back to you as a download.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Are My Images Stored or Uploaded?</h2>
        <p>
          No. The tool runs entirely client-side — your images never leave your device. There is no
          server involved in image processing, no database, and no cloud storage. When you close or
          refresh the page, the processed images exist only in your browser&rsquo;s memory until you download
          them.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Why We Built It</h2>
        <p>
          Whether you&rsquo;re optimizing photos for a website, meeting a strict file-size limit for a form
          submission, or quickly editing screenshots, we believe image tools should be instant, private,
          and free — without sign-ups, watermarks, or waiting in queues.
        </p>
      </section>

      <section className="pt-4">
        <p className="mb-4">
          Have feedback or need help? Visit our <Link href="/contact" className="text-blue-600 dark:text-blue-400 underline">Contact Us</Link> page.
          Read our <Link href="/privacy-policy" className="text-blue-600 dark:text-blue-400 underline">Privacy Policy</Link> for details about image processing and advertising.
        </p>
        <Link href="/" className="text-blue-600 dark:text-blue-400 underline">← Back to Home</Link>
      </section>
    </div>
  );
}
