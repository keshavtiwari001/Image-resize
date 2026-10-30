// Public AdSense identifiers are embedded at build time by Next.js.
export const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";
export const validAdsenseClient = /^ca-pub-\d{16}$/.test(adsenseClient);
export const adsEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true" && validAdsenseClient;
export const adSlots = {
  "top-banner": process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP || "",
  "in-content": process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT || "",
  "bottom-banner": process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM || "",
};
