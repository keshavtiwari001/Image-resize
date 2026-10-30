import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "Privacy Policy | ImageUtility",
  description:
    "How ImageUtility handles your data: browser-based image processing, no uploads, no tracking of your files.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | ImageUtility",
    description: "Browser-based image processing: no uploads, no tracking of your files.",
    url: `${SITE_URL}/privacy-policy`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | ImageUtility",
    description: "How ImageUtility handles your data.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 text-gray-700 dark:text-gray-300">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mt-2">Last updated: October 30, 2026</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Overview</h2>
        <p>
          ImageUtility is a browser-based image tool. This policy explains exactly what happens to
          your data when you use it. We keep this policy accurate and update it whenever the
          implementation changes.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Image & File Processing</h2>
        <p>
          All image processing (conversion, compression, resizing, editing) happens entirely on your
          device using your web browser&rsquo;s built-in capabilities. Your image files are:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Not uploaded</strong> to any server during processing.</li>
          <li><strong>Not stored</strong> on any server or database.</li>
          <li><strong>Not accessible</strong> to us or anyone else.</li>
        </ul>
        <p>
          When you close or refresh the browser tab, processed images held in memory are discarded.
          Nothing is retained unless you explicitly download a file to your device.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Information We Collect</h2>
        <p>Currently, we do not require accounts and do not collect personal information through the tool itself. The contact form (see below) is the only place you may voluntarily share information with us.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Local Storage & Cookies</h2>
        <p>
          We use your browser&rsquo;s local storage only to remember interface preferences such as your
          chosen theme (light, dark, or system). When advertising is enabled, Google and its
          partners may also use cookies and similar technologies as described below.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Analytics</h2>
        <p>
          At this time, no analytics service is integrated. If analytics are added in the future
          (e.g., privacy-respecting page-view counters), this section will describe exactly what is
          collected and why before it goes live.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Advertising</h2>
        <p>
          When enabled, Google AdSense displays advertisements to help keep these tools free.
          Google and its partners may collect IP addresses, browser and device information,
          and use cookies or identifiers to deliver, personalize, and measure ads. Image processing
          remains on your device; our image tools do not upload your files to Google.
        </p>
        <p>
          Where required, a consent message lets you manage advertising choices. You can also
          manage personalization in <a href="https://myadcenter.google.com/" className="underline">Google My Ad Center</a>.
          Learn more about <a href="https://policies.google.com/technologies/partner-sites" className="underline">how Google uses information from partner sites</a>.
          Advertising scripts are not loaded when advertising is disabled.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Contact Form</h2>
        <p>
          When a contact address is configured, the contact form opens your own email client with your message pre-filled — the
          form data (name, email, message) is sent by you directly via email and is not transmitted
          through our website. If you email us, we receive your name, email address, and message, and
          will use them only to respond to you.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Data Retention</h2>
        <p>
          Since we do not receive or store your images, there is nothing for us to retain. Emails you
          send us are kept only as long as needed to handle your request.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Your Rights</h2>
        <p>
          Depending on your location (e.g., EU/EEA under GDPR, California under CCPA), you may have
          rights regarding personal data you have shared with us — such as access, correction, or
          deletion. Since we collect almost no personal data, these rights primarily apply to emails
          you have sent us. Contact us via the <Link href="/contact" className="text-blue-600 dark:text-blue-400 underline">contact page</Link> to exercise them.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Changes to This Policy</h2>
        <p>
          We will update this page whenever our data practices change and revise the &ldquo;last updated&rdquo;
          date above.
        </p>
      </section>
    </div>
  );
}
