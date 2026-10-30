import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const faqs = [
  {
    q: "Is the image compressor free?",
    a: "Yes. All tools — compression, conversion, resizing, and editing — are completely free with no usage limits, watermarks, or sign-up requirements.",
  },
  {
    q: "What image formats are supported?",
    a: "You can upload JPG, PNG, and WEBP files, and convert between any of these formats. Conversion pairs supported: JPG↔PNG, JPG↔WEBP, PNG↔WEBP.",
  },
  {
    q: "What is the maximum file size?",
    a: "There is no server-side limit because files never leave your device. The practical limit is your device's available memory. Most browsers handle images up to several thousand pixels wide without issue; very large images on low-memory mobile devices may fail with a friendly error message.",
  },
  {
    q: "Does compression reduce image quality?",
    a: "Some quality reduction is inherent to lossy formats (JPG, WEBP). The quality slider lets you choose the trade-off, and target-size compression finds the highest quality that fits your size goal. PNG output is lossless, so resizing is the main factor affecting its file size.",
  },
  {
    q: "Are uploaded images stored?",
    a: "No. Images are processed locally in your browser and never uploaded to any server. When you close the tab, they are gone from memory.",
  },
  {
    q: "How long are uploaded images retained?",
    a: "They aren't retained at all. Files exist only in your browser's memory during your session and are discarded when you close or refresh the page.",
  },
  {
    q: "Can I convert JPG to WebP?",
    a: "Yes — use the JPG to WEBP tool. WEBP usually produces 25–35% smaller files than JPG at similar visual quality.",
  },
  {
    q: "Can I compress PNG images?",
    a: "Yes. You can compress PNGs either as PNG (lossless, smaller dimensions help most) or convert them to JPG/WEBP for much smaller lossy output.",
  },
  {
    q: "Can I use the compressed images commercially?",
    a: "Yes. You keep all rights to your images — we never claim ownership of anything you process. The tool itself is provided as-is, without warranty.",
  },
  {
    q: "Does the tool work on mobile?",
    a: "Yes. The site is fully responsive and works on smartphones and tablets. Processing speed depends on your device's capabilities.",
  },
  {
    q: "Why is my converted image larger than the original?",
    a: "This happens when converting to a lossless format (e.g., WEBP → PNG) or when the original was already heavily compressed. Converting JPG → PNG almost always increases file size because PNG stores pixels losslessly.",
  },
  {
    q: "Can I reduce an image to 20 KB?",
    a: "Often yes, but it depends on the image's dimensions and content. For 20 KB, the tool may automatically reduce dimensions as well as quality. Photos at very small targets will look best when also resized down.",
  },
  {
    q: "Can I reduce an image to 50 KB?",
    a: "Yes — select the 50 KB target on the compressor. The tool iteratively adjusts quality (and dimensions if needed) until the file fits under 50 KB.",
  },
  {
    q: "Can I resize an image and compress it at the same time?",
    a: "Yes. In the Image Editor, set your target dimensions and a target file size or quality — both are applied in a single processing pass, so you don't need to download between steps.",
  },
  {
    q: "Can I perform multiple edits before downloading?",
    a: "Yes. The Image Editor chains operations: crop, rotate, flip, filters, watermark, resize, format conversion, and compression all apply to the same working image in one session.",
  },
];

export const metadata = {
  title: "Frequently Asked Questions | ImageUtility",
  description:
    "Answers about image compression, conversion, resizing, privacy, and how browser-based image processing works.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Frequently Asked Questions | ImageUtility",
    description:
      "Answers about image compression, conversion, resizing, privacy, and how browser-based image processing works.",
    url: `${SITE_URL}/faq`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Frequently Asked Questions | ImageUtility",
    description: "Answers about compression, conversion, resizing, and privacy.",
  },
};

// Google can show these Q&As directly in search results (FAQ rich results).
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function FaqPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <header>
        <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Everything about using ImageUtility — compression, formats, privacy, and more.
        </p>
      </header>

      <div className="space-y-4">
        {faqs.map((item, i) => (
          <details
            key={i}
            className="group border rounded-lg dark:border-gray-800 bg-gray-50 dark:bg-gray-900 open:bg-white dark:open:bg-gray-900"
          >
            <summary className="cursor-pointer px-4 py-3 font-medium text-gray-900 dark:text-gray-100 select-none">
              {item.q}
            </summary>
            <p className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400">{item.a}</p>
          </details>
        ))}
      </div>

      <div className="pt-4 text-sm">
        <p className="text-gray-600 dark:text-gray-400">
          Didn&rsquo;t find your answer? <Link href="/contact" className="text-blue-600 dark:text-blue-400 underline">Contact us</Link>.
        </p>
      </div>
    </div>
  );
}
