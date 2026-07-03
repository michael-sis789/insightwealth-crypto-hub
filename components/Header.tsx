import Image from "next/image";
import Link from "next/link";
import { BarChart3, CalendarDays, Calculator, LineChart, Newspaper } from "lucide-react";

const nav = [
  { href: "/btc-dashboard", label: "BTC儀表盤", icon: BarChart3 },
  { href: "/btc-dca-calculator", label: "DCA計算器", icon: Calculator },
  { href: "/crypto-etf-flow", label: "ETF資金流", icon: LineChart },
  { href: "/bull-bear-probability", label: "牛熊概率", icon: BarChart3 },
  { href: "/crypto-calendar", label: "事件日曆", icon: CalendarDays },
  { href: "/daily-crypto-brief", label: "每日簡報", icon: Newspaper }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/88 backdrop-blur">
      <div className="container-shell flex min-h-20 items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3" aria-label="洞見財富 Crypto Hub Home">
          <Image src="/assets/channel_logo.png" alt="洞見財富 logo" width={44} height={44} className="rounded" priority />
          <div>
            <div className="text-base font-bold text-white">洞見財富</div>
            <div className="text-xs uppercase tracking-[0.18em] text-gold">Crypto Hub</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white">
              <item.icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/btc-dashboard" className="rounded-md bg-gold px-4 py-2 text-sm font-bold text-ink hover:bg-[#f1c75d]">
          今日數據
        </Link>
      </div>
      <div className="container-shell flex gap-2 overflow-x-auto pb-3 lg:hidden">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap rounded-md border border-line px-3 py-2 text-sm text-slate-300">
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
