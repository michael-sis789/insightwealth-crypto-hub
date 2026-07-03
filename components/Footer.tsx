import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-black/30">
      <div className="container-shell grid gap-8 py-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold text-white">洞見財富 Crypto Hub</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
            每日追蹤BTC、ETF資金流、鏈上指標、牛熊概率與DCA策略。投資靠紀律，不靠運氣；財富靠堅持，不靠奇蹟。
          </p>
        </div>
        <div className="grid gap-2 text-sm text-slate-400">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/daily-crypto-brief">Daily Crypto Brief</Link>
        </div>
        <div className="grid gap-2 text-sm text-slate-400">
          <Link href="/disclaimer">Disclaimer</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <a href="/sitemap.xml">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
