import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

/**
 * Breadcrumb navigation with BreadcrumbList JSON-LD structured data.
 * `items` is an array of { label, href } — the last item is the current page.
 */
export default function Breadcrumbs({ items }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-500 dark:text-gray-400 mb-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-gray-800 dark:hover:text-gray-200">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-gray-700 dark:text-gray-300">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
