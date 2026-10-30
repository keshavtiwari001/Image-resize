import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-900 dark:border-gray-800 text-gray-600 dark:text-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">Image Lite</h3>
          <p className="text-xs">Fast, local image tools.</p>
          <Link href="/about" className="inline-block mt-3 text-sm hover:underline">About Us</Link>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3 text-sm">Tools</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/compress-image">Compress</Link></li>
            <li><Link href="/resize-image">Resize</Link></li>
            <li><Link href="/image-editor">Edit</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3 text-sm">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3 text-sm">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/buy-me-a-coffee">Coffee ☕</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
