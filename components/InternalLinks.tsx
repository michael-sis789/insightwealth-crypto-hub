import Link from "next/link";
import { localizedPath, type Language } from "@/lib/i18n";

const links = [
  { href: "/btc-dashboard", zh: "BTC儀表盤", en: "BTC Dashboard" },
  { href: "/btc-dca-calculator", zh: "DCA計算器", en: "DCA Calculator" },
  { href: "/btc-bull-bear-indicator", zh: "牛熊指標", en: "Bull/Bear Indicator" },
  { href: "/bitcoin-etf-flow", zh: "ETF資金流", en: "ETF Flow" },
  { href: "/bitcoin-fear-greed-index", zh: "恐懼貪婪", en: "Fear & Greed" },
  { href: "/bitcoin-mvrv", zh: "MVRV估值", en: "MVRV" },
  { href: "/bitcoin-nupl", zh: "NUPL盈虧", en: "NUPL" },
  { href: "/bitcoin-puell-multiple", zh: "Puell礦工指標", en: "Puell Multiple" },
  { href: "/daily-crypto-brief", zh: "最新每日簡報", en: "Latest Daily Brief" }
];

export function InternalLinks({ language }: { language: Language }) {
  return (
    <section className="premium-card rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white">{language === "en" ? "Related tools" : "相關工具"}</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {links.map((link) => (
          <Link key={link.href} href={localizedPath(link.href, language)} data-analytics="internal-tool-link" className="rounded-md border border-line px-4 py-3 text-sm font-semibold text-slate-300 hover:border-gold/50 hover:text-gold">
            {link[language]}
          </Link>
        ))}
      </div>
    </section>
  );
}
