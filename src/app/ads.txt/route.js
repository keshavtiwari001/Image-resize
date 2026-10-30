import { adsenseClient, validAdsenseClient } from "@/lib/ads";

export function GET() {
  if (!validAdsenseClient) return new Response("", { status: 404 });
  return new Response(
    `google.com, ${adsenseClient.replace("ca-", "")}, DIRECT, f08c47fec0942fa0\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}
