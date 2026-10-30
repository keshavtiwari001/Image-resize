import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import Script from "next/script";
import { adsEnabled, adsenseClient, validAdsenseClient } from "@/lib/ads";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Image Lite | Fast Image Tools",
  description: "Fast, private, browser-based image tools. Compress, resize, and edit.",
};

// Runs before paint so the correct theme is applied on first render,
// preventing a light-to-dark flash for dark-mode users.
const themeInitScript = `
try {
  var t = localStorage.getItem("${THEME_STORAGE_KEY}") || "system";
  var dark = t === "dark" || (t === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  if (dark) document.documentElement.classList.add("dark");
} catch (e) {}
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      // The theme-init script adds the `dark` class before hydration,
      // which React would otherwise report as a mismatch. This is the
      // standard escape hatch for theme scripts (same as next-themes).
      suppressHydrationWarning
    >
      <head>
        {validAdsenseClient && <meta name="google-adsense-account" content={adsenseClient} />}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <Header />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">{children}</main>
        <Footer />
        {adsEnabled && (
          <Script
            id="google-adsense"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
