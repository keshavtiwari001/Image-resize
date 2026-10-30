import ContactForm from "@/components/ContactForm";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "Contact Us | ImageUtility",
  description:
    "Get in touch with the ImageUtility team. Send feedback, report bugs, or suggest new image features.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact ImageUtility",
    description: "Send feedback, report bugs, or suggest new image features.",
    url: `${SITE_URL}/contact`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact ImageUtility",
    description: "Send feedback or report bugs.",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Questions, feedback, or bug reports — we&rsquo;d love to hear from you.
        </p>
      </header>

      <ContactForm />
      <section className="space-y-3 text-gray-600 dark:text-gray-400">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">How we can help</h2>
        <p>Send feedback, suggest a feature, or report a problem. For bug reports, include the tool name, your browser, and the steps that caused the issue.</p>
        <p>For privacy questions, read our <Link href="/privacy-policy" className="underline">Privacy Policy</Link> or contact us by email once our contact address is available.</p>
      </section>
    </div>
  );
}
