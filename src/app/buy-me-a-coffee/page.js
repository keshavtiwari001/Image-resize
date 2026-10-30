import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

// TODO: Replace with your actual Buy Me a Coffee profile URL.
const BUY_ME_A_COFFEE_URL = "https://www.buymeacoffee.com/your-username";

export const metadata = {
  title: "Buy Me a Coffee | ImageUtility",
  description:
    "Support ImageUtility — a free, browser-based image tool. If it saves you time, consider buying us a coffee.",
  alternates: { canonical: "/buy-me-a-coffee" },
  openGraph: {
    title: "Buy Me a Coffee | ImageUtility",
    description:
      "Support ImageUtility — a free, browser-based image tool. If it saves you time, consider buying us a coffee.",
    url: `${SITE_URL}/buy-me-a-coffee`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Buy Me a Coffee | ImageUtility",
    description: "Support a free, browser-based image tool.",
  },
};

const SUPPORT_TIERS = [
  {
    emoji: "☕",
    name: "Single Coffee",
    price: "$3",
    description: "A one-time thank-you. Every coffee keeps the tools free and ad-light.",
  },
  {
    emoji: "☕☕",
    name: "Double Shot",
    price: "$5",
    description: "Helps cover hosting and domain costs for another month.",
  },
  {
    emoji: "☕☕☕",
    name: "Coffee Pot",
    price: "$10",
    description: "Funds new features — batch editing, more formats, and beyond.",
  },
];

export default function BuyMeACoffeePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 text-gray-700 dark:text-gray-300">
      <header className="text-center">
        <div className="text-5xl mb-4" aria-hidden="true">☕</div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Buy Us a Coffee</h1>
        <p className="mt-3 text-lg">
          {SITE_NAME} is free, runs entirely in your browser, and never uploads your images.
          If it saves you time, a small coffee keeps it that way.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {SUPPORT_TIERS.map((tier) => (
          <div
            key={tier.name}
            className="p-6 border rounded-xl bg-gray-50 dark:bg-gray-900 dark:border-gray-800 text-center"
          >
            <div className="text-3xl mb-2" aria-hidden="true">{tier.emoji}</div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{tier.name}</h2>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 my-2">{tier.price}</p>
            <p className="text-sm">{tier.description}</p>
          </div>
        ))}
      </section>

      <section className="text-center">
        <a
          href={BUY_ME_A_COFFEE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-300 transition"
        >
          ☕ Buy Me a Coffee
        </a>
        <p className="mt-3 text-sm">
          Payments are handled securely by Buy Me a Coffee. You can also support us by
          sharing {SITE_NAME} with a friend.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Where Your Support Goes</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Hosting and domain costs</li>
          <li>Development of new tools and features</li>
          <li>Keeping the site free — no accounts, no watermarks, no upload limits</li>
        </ul>
      </section>

      <section className="pt-4">
        <Link href="/" className="text-blue-600 dark:text-blue-400 underline">← Back to Home</Link>
      </section>
    </div>
  );
}
