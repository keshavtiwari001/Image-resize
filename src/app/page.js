import Link from 'next/link';
import AdSlot from '@/components/layout/AdSlot';

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Image Lite
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
          Private, fast, browser-based tools. No server uploads.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/compress-image" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
            Compress
          </Link>
          <Link href="/resize-image" className="px-8 py-3 bg-gray-100 dark:bg-gray-800 font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            Resize
          </Link>
          <Link href="/image-editor" className="px-8 py-3 bg-gray-100 dark:bg-gray-800 font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            Edit
          </Link>
        </div>
      </section>

      <AdSlot type="top-banner" />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 border rounded-xl dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <h3 className="font-bold mb-2">Conversion</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Instant format swaps between JPG, PNG, WEBP.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-blue-600 dark:text-blue-400">
            <Link href="/jpg-to-png">JPG → PNG</Link>
            <Link href="/png-to-jpg">PNG → JPG</Link>
            <Link href="/jpg-to-webp">JPG → WEBP</Link>
            <Link href="/webp-to-jpg">WEBP → JPG</Link>
          </div>
        </div>
        <div className="p-6 border rounded-xl dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <h3 className="font-bold mb-2">Compression</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Reduce file size while keeping visual quality.</p>
          <Link href="/compress-image" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Try Compressor →</Link>
        </div>
        <div className="p-6 border rounded-xl dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <h3 className="font-bold mb-2">Editor</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Crop, resize, and rotate in your browser.</p>
          <Link href="/image-editor" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Open Editor →</Link>
        </div>
      </section>

      <AdSlot type="bottom-banner" />
    </div>
  );
}
