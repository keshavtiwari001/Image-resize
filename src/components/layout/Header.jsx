import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Image Lite
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-4 text-sm">
            <Link href="/compress-image" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              Compress
            </Link>
            <Link href="/resize-image" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              Resize
            </Link>
            <Link href="/image-editor" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              Edit
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
