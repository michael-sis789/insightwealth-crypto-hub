"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localizedPath, type Language } from "@/lib/i18n";

function currentLanguage(pathname: string): Language {
  return pathname.startsWith("/en") ? "en" : "zh";
}

export function Footer() {
  const language = currentLanguage(usePathname());
  const copy =
    language === "en"
      ? "Daily Bitcoin dashboard for BTC price, ETF flows, on-chain indicators, Bull Score and disciplined DCA decisions. Investing depends on discipline, not luck."
      : "每日追蹤BTC、ETF資金流、鏈上指標、牛熊概率與DCA策略。投資靠紀律，不靠運氣；財富靠堅持，不靠奇蹟。";

  return (
    <footer className="mt-20 border-t border-line bg-black/30">
      <div className="container-shell grid gap-8 py-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold text-white">{language === "en" ? "Insight Wealth Crypto Hub" : "洞見財富 Crypto Hub"}</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">{copy}</p>
        </div>
        <div className="grid gap-2 text-sm text-slate-400">
          <Link href={localizedPath("/about", language)}>{language === "en" ? "About" : "關於我們"}</Link>
          <Link href={localizedPath("/contact", language)}>{language === "en" ? "Contact" : "聯絡"}</Link>
          <Link href={localizedPath("/daily-crypto-brief", language)}>{language === "en" ? "Daily Crypto Brief" : "每日簡報"}</Link>
          <a href="https://youtube.com/@9insightwealth" target="_blank" rel="noreferrer">{language === "en" ? "YouTube Channel" : "YouTube 頻道"}</a>
        </div>
        <div className="grid gap-2 text-sm text-slate-400">
          <Link href={localizedPath("/disclaimer", language)}>{language === "en" ? "Disclaimer" : "免責聲明"}</Link>
          <Link href={localizedPath("/privacy", language)}>{language === "en" ? "Privacy Policy" : "隱私政策"}</Link>
          <a href="/sitemap.xml">Sitemap</a>
          <a href="/rss.xml">RSS</a>
        </div>
      </div>
    </footer>
  );
}
