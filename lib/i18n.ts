export const languages = {
  zh: {
    code: "zh",
    htmlLang: "zh-Hant",
    label: "中文",
    prefix: "",
    name: "洞見財富 Crypto Hub"
  },
  en: {
    code: "en",
    htmlLang: "en",
    label: "English",
    prefix: "/en",
    name: "Insight Wealth Crypto Hub"
  }
} as const;

export type Language = keyof typeof languages;

export const navItems = [
  { href: "/btc-dashboard", zh: "BTC儀表盤", en: "BTC Dashboard" },
  { href: "/btc-dca-calculator", zh: "DCA計算器", en: "DCA Calculator" },
  { href: "/crypto-etf-flow", zh: "ETF資金流", en: "ETF Flow" },
  { href: "/bull-bear-probability", zh: "牛熊概率", en: "Bull/Bear Score" },
  { href: "/crypto-calendar", zh: "事件日曆", en: "Crypto Calendar" },
  { href: "/daily-crypto-brief", zh: "每日簡報", en: "Daily Brief" }
] as const;

export const localizedRoutes = [
  "/",
  "/btc-dashboard",
  "/btc-dca-calculator",
  "/crypto-etf-flow",
  "/bull-bear-probability",
  "/crypto-calendar",
  "/daily-crypto-brief",
  "/about",
  "/disclaimer",
  "/privacy",
  "/contact"
] as const;

export function localizedPath(path: string, language: Language) {
  const normalized = path === "" ? "/" : path;
  if (language === "zh") return normalized === "/en" ? "/" : normalized.replace(/^\/en(?=\/|$)/, "") || "/";
  const withoutLocale = normalized.replace(/^\/zh(?=\/|$)/, "").replace(/^\/en(?=\/|$)/, "") || "/";
  return withoutLocale === "/" ? "/en" : `/en${withoutLocale}`;
}

export function routeFromSlug(slug?: string[]) {
  if (!slug || slug.length === 0) return "/";
  return `/${slug.join("/")}`;
}
