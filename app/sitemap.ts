import type { MetadataRoute } from "next";
import { site } from "@/lib/seo";

export const dynamic = "force-static";

const routes = ["/", "/btc-dashboard", "/btc-dca-calculator", "/crypto-etf-flow", "/bull-bear-probability", "/crypto-calendar", "/daily-crypto-brief", "/about", "/disclaimer", "/privacy", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date("2026-07-02"),
    changeFrequency: route === "/" || route === "/daily-crypto-brief" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.8
  }));
}
