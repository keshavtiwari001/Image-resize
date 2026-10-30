import { SITE_NAME, SITE_URL } from "@/lib/seo";
import AdSlot from "@/components/layout/AdSlot";

export const metadata = {
  title: "Online Image Editor — Crop, Rotate, Filter, Watermark | ImageUtility",
  description:
    "Free browser-based image editor: crop, rotate, flip, adjust brightness/contrast/saturation, blur, sharpen, pixelate, add watermarks, text, borders and rounded corners. No uploads.",
  alternates: { canonical: "/image-editor" },
  openGraph: {
    title: "Online Image Editor — Free & Browser-Based",
    description:
      "Crop, rotate, filter, watermark and edit images with multiple sequential steps — all locally in your browser.",
    url: `${SITE_URL}/image-editor`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Online Image Editor — Free & Browser-Based",
    description: "Crop, rotate, filter and watermark images. Private and free.",
  },
};

export default function ImageEditorLayout({ children }) {
  return <>{children}<AdSlot /></>;
}
