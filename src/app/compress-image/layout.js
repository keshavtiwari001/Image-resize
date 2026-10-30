import { SITE_NAME, SITE_URL } from "@/lib/seo";
import AdSlot from "@/components/layout/AdSlot";

export const metadata = {
  title: "Compress Image to Target Size (20 KB–1 MB) — Free | ImageUtility",
  description:
    "Compress JPG, PNG and WEBP images to an exact target file size or by quality — 20 KB, 50 KB, 100 KB, 200 KB, 500 KB, 1 MB or custom. Runs entirely in your browser.",
  alternates: { canonical: "/compress-image" },
  openGraph: {
    title: "Compress Image to Target Size — Free & Browser-Based",
    description:
      "Compress JPG, PNG and WEBP images to an exact target file size or by quality. Runs entirely in your browser.",
    url: `${SITE_URL}/compress-image`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Compress Image to Target Size — Free & Browser-Based",
    description: "Compress images to 20 KB, 50 KB, 100 KB and more. Private and free.",
  },
};

export default function CompressImageLayout({ children }) {
  return <>{children}<AdSlot /></>;
}
