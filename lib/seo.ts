import type { Metadata } from "next";
import { localizedPath } from "@/lib/i18n";

export const site = {
  name: "洞见财富 Crypto Hub",
  englishName: "Insight Wealth Crypto Hub",
  url: "https://insightwealth.live",
  ogImage: "/assets/channel_logo_512.png",
  description: "每日追踪 BTC、ETF资金流、链上指标、市场情绪与DCA投资策略，帮助你用数据看懂加密市场。"
};

export function makeMetadata(title: string, description: string, path = "/", locale: "zh" | "en" = "zh"): Metadata {
  const canonicalPath = locale === "en" ? localizedPath(path, "en") : localizedPath(path, "zh");
  const url = `${site.url}${canonicalPath}`;
  const zhPath = localizedPath(path, "zh");
  const enPath = localizedPath(path, "en");
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "zh-Hant": `${site.url}${zhPath}`,
        en: `${site.url}${enPath}`,
        "x-default": `${site.url}${zhPath}`
      }
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      images: [{ url: site.ogImage, width: 512, height: 512 }],
      locale: locale === "en" ? "en_US" : "zh_TW",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [site.ogImage]
    }
  };
}
