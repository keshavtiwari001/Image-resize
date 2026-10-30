export const SITE_NAME = "ImageUtility";
export const SITE_URL = "https://imageutility.example.com";
export const SITE_TAGLINE = "Free browser-based image converter, compressor & editor";

/**
 * Shared Open Graph + Twitter Card fields. Spread into any page's
 * `metadata` object and override title/description as needed.
 */
export const openGraphDefaults = {
  siteName: SITE_NAME,
  type: "website",
  url: SITE_URL,
};

export const twitterDefaults = {
  card: "summary",
};

const TOOLS = [
  {
    slug: "/compress-image",
    title: "Compress Image",
    description: "Reduce JPG, PNG and WEBP file sizes with quality or target size compression.",
  },
  {
    slug: "/resize-image",
    title: "Resize Image",
    description: "Change image pixel dimensions with aspect ratio support.",
  },
  {
    slug: "/image-editor",
    title: "Image Editor",
    description: "Crop, rotate, filter, watermark and edit images in your browser.",
  },
  {
    slug: "/jpg-to-png",
    title: "JPG to PNG",
    description: "Convert JPG images to PNG format.",
  },
  {
    slug: "/png-to-jpg",
    title: "PNG to JPG",
    description: "Convert PNG images to JPG format.",
  },
  {
    slug: "/webp-to-jpg",
    title: "WEBP to JPG",
    description: "Convert WEBP images to JPG format.",
  },
  {
    slug: "/jpg-to-webp",
    title: "JPG to WEBP",
    description: "Convert JPG images to WEBP format.",
  },
  {
    slug: "/png-to-webp",
    title: "PNG to WEBP",
    description: "Convert PNG images to WEBP format.",
  },
  {
    slug: "/webp-to-png",
    title: "WEBP to PNG",
    description: "Convert WEBP images to PNG format.",
  },
  {
    slug: "/image-to-zip",
    title: "Image to ZIP",
    description: "Convert multiple images and download them together as a ZIP file.",
  },
];

const PAGES = [
  { slug: "/", title: "Home", description: "Free browser-based image tools." },
  { slug: "/about", title: "About", description: "About ImageUtility." },
  { slug: "/contact", title: "Contact", description: "Get in touch." },
  { slug: "/privacy-policy", title: "Privacy Policy", description: "How ImageUtility handles data." },
  { slug: "/faq", title: "FAQ", description: "Frequently asked questions." },
  { slug: "/buy-me-a-coffee", title: "Buy Me a Coffee", description: "Support ImageUtility with a small donation." },
];

export { TOOLS, PAGES };
