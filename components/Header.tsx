"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, CalendarDays, Calculator, Languages, LineChart, Newspaper } from "lucide-react";
import { localizedPath, navItems, type Language } from "@/lib/i18n";

const icons = [BarChart3, Calculator, LineChart, BarChart3, CalendarDays, Newspaper];

function currentLanguage(pathname: string): Language {
  return pathname.startsWith("/en") ? "en" : "zh";
}

function rememberLanguage(language: Language) {
  document.cookie = `iw_lang=${language}; path=/; max-age=31536000; samesite=lax`;
  window.localStorage.setItem("iw_lang", language);
}

export function Header() {
  const pathname = usePathname();
  const language = currentLanguage(pathname);
  const otherLanguage: Language = language === "en" ? "zh" : "en";
  const switchHref = localizedPath(pathname, otherLanguage);
  const homeHref = localizedPath("/", language);
  const ctaHref = localizedPath("/btc-dashboard", language);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/88 backdrop-blur">
      <div className="container-shell flex min-h-20 items-center justify-between gap-4 py-3">
        <Link href={homeHref} className="flex items-center gap-3" aria-label="Insight Wealth Crypto Hub Home">
          <Image src="/assets/channel_logo.png" alt="洞見財富 logo" width={44} height={44} className="rounded" priority />
          <div>
            <div className="text-base font-bold text-white">{language === "en" ? "Insight Wealth" : "洞見財富"}</div>
            <div className="text-xs uppercase tracking-[0.18em] text-gold">Crypto Hub</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item, index) => {
            const Icon = icons[index];
            return (
              <Link key={item.href} href={localizedPath(item.href, language)} className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white">
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item[language]}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={switchHref}
            onClick={() => rememberLanguage(otherLanguage)}
            className="inline-flex items-center gap-1 rounded-md border border-line px-3 py-2 text-sm text-slate-300 hover:border-gold/50 hover:text-gold"
          >
            <Languages className="h-4 w-4" />
            {otherLanguage === "en" ? "EN" : "中文"}
          </Link>
          <Link href={ctaHref} className="rounded-md bg-gold px-4 py-2 text-sm font-bold text-ink hover:bg-[#f1c75d]">
            {language === "en" ? "Today" : "今日數據"}
          </Link>
        </div>
      </div>
      <div className="container-shell flex gap-2 overflow-x-auto pb-3 lg:hidden">
        {navItems.map((item) => (
          <Link key={item.href} href={localizedPath(item.href, language)} className="whitespace-nowrap rounded-md border border-line px-3 py-2 text-sm text-slate-300">
            {item[language]}
          </Link>
        ))}
      </div>
    </header>
  );
}
