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
          <Link href={localizedPath("/start-here", language)}>{language === "en" ? "Start Here" : "新手指南"}</Link>
          <Link href={localizedPath("/bitcoin-investor-toolkit", language)}>{language === "en" ? "Bitcoin Investor Toolkit" : "BTC投資者工具包"}</Link>
          <Link href={localizedPath("/crypto-faq", language)}>{language === "en" ? "Crypto FAQ" : "Crypto FAQ常見問題"}</Link>
          <Link href={localizedPath("/about", language)}>{language === "en" ? "About" : "關於我們"}</Link>
          <Link href={localizedPath("/author", language)}>{language === "en" ? "Author" : "作者"}</Link>
          <Link href={localizedPath("/editorial-policy", language)}>{language === "en" ? "Editorial Policy" : "編輯政策"}</Link>
          <Link href={localizedPath("/contact", language)}>{language === "en" ? "Contact" : "聯絡"}</Link>
          <Link href={localizedPath("/daily-crypto-brief", language)}>{language === "en" ? "Daily Crypto Brief" : "每日簡報"}</Link>
          <Link href={localizedPath("/bitcoin-fear-greed-index", language)}>{language === "en" ? "Fear & Greed Guide" : "恐懼貪婪教學"}</Link>
          <a href="https://youtube.com/@9insightwealth" target="_blank" rel="noreferrer">{language === "en" ? "YouTube Channel" : "YouTube 頻道"}</a>
        </div>
        <div className="grid gap-2 text-sm text-slate-400">
          <Link href={localizedPath("/content-quality", language)}>{language === "en" ? "Content Quality" : "內容品質標準"}</Link>
          <Link href={localizedPath("/methodology", language)}>{language === "en" ? "Methodology" : "資料方法論"}</Link>
          <Link href={localizedPath("/sources", language)}>{language === "en" ? "Sources" : "資料來源"}</Link>
          <Link href={localizedPath("/bitcoin-mvrv", language)}>{language === "en" ? "MVRV Guide" : "MVRV教學"}</Link>
          <Link href={localizedPath("/bitcoin-nupl", language)}>{language === "en" ? "NUPL Guide" : "NUPL教學"}</Link>
          <Link href={localizedPath("/bitcoin-puell-multiple", language)}>{language === "en" ? "Puell Guide" : "Puell教學"}</Link>
          <Link href={localizedPath("/disclaimer", language)}>{language === "en" ? "Disclaimer" : "免責聲明"}</Link>
          <Link href={localizedPath("/privacy", language)}>{language === "en" ? "Privacy Policy" : "隱私政策"}</Link>
          <a href="/sitemap.xml">Sitemap</a>
          <a href="/rss.xml">RSS</a>
        </div>
      </div>
    </footer>
  );
}
