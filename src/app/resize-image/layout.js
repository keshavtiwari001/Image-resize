import { SITE_NAME, SITE_URL } from "@/lib/seo";
import AdSlot from "@/components/layout/AdSlot";

export const metadata = {
  title: "Resize Image by Pixels — Free & Browser-Based | ImageUtility",
  description:
    "Change image width and height in pixels with automatic aspect-ratio locking. Resize JPG, PNG and WEBP images locally in your browser — no uploads.",
  alternates: { canonical: "/resize-image" },
  openGraph: {
    title: "Resize Image by Pixels — Free & Browser-Based",
    description:
      "Change image width and height in pixels with automatic aspect-ratio locking. No uploads.",
    url: `${SITE_URL}/resize-image`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Resize Image by Pixels — Free & Browser-Based",
    description: "Resize images by pixel dimensions. Private and free.",
  },
};

export default function ResizeImageLayout({ children }) {
  return <>{children}<AdSlot /></>;
}
