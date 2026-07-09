import { site } from "@/lib/seo";
import { newsArticles, seoPages } from "@/lib/seo-hub-content";

export const dynamic = "force-static";

const items = [
  ...newsArticles.map((article) => ({
    title: article.zh.title,
    href: `/news/${article.slug}`,
    description: article.zh.description
  })),
  ...seoPages.map((page) => ({
    title: page.zh.title,
    href: `/${page.slug}`,
    description: page.zh.description
  })),
  {
    title: "Daily Crypto Brief",
    href: "/daily-crypto-brief",
    description: "每日 BTC、ETF 資金流、市場情緒、牛熊分數與 DCA 觀點。"
  },
  {
    title: "BTC Market Dashboard",
    href: "/btc-dashboard",
    description: "追蹤 BTC 價格、Fear & Greed、ETF Flow、MVRV、NUPL 與 Puell Multiple。"
  },
  {
    title: "Bitcoin DCA Calculator",
    href: "/btc-dca-calculator",
    description: "使用本地快取歷史價格回測 BTC 定投策略。"
  }
];

function escapeXml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}

export function GET() {
  const now = new Date().toUTCString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${site.url}</link>
    <description>${escapeXml(site.description)}</description>
    <language>zh-Hant</language>
    <lastBuildDate>${now}</lastBuildDate>
    ${items
      .map(
        (item) => `<item>
      <title>${escapeXml(item.title)}</title>
      <link>${site.url}${item.href}</link>
      <guid>${site.url}${item.href}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${now}</pubDate>
    </item>`
      )
      .join("\n    ")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
