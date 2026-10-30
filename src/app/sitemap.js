import { SITE_URL, TOOLS, PAGES } from "@/lib/seo";

export default function sitemap() {
  const now = new Date();

  const toolEntries = TOOLS.map((tool) => ({
    url: `${SITE_URL}${tool.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const pageEntries = PAGES.map((page) => ({
    url: `${SITE_URL}${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: page.slug === "/" ? 1 : 0.5,
  }));

  return [...pageEntries, ...toolEntries];
}
