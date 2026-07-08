import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Calculator, HelpCircle, ShieldCheck } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import { MetricCard } from "@/components/MetricCard";
import { getBtcDashboardData, getDailyBrief, getEvents } from "@/lib/crypto-data";
import { localizedRoutes, routeFromSlug } from "@/lib/i18n";
import { makeMetadata, site } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

const pageCopy: Record<string, { title: string; description: string; heading: string; intro: string; faq: Array<{ q: string; a: string }> }> = {
  "/": {
    title: "Insight Wealth Crypto Hub - Bitcoin Dashboard, DCA Calculator and ETF Flow",
    description: "A bilingual Bitcoin dashboard and crypto decision hub with BTC price, Fear & Greed, ETF flows, Bull Score, DCA tools and risk management guides.",
    heading: "Insight Wealth Crypto Hub",
    intro: "A daily Bitcoin decision dashboard for long-term investors. Track BTC price, Fear & Greed, ETF flows, on-chain signals, Bull Score and disciplined DCA strategy in one clean view.",
    faq: [
      { q: "What is Insight Wealth Crypto Hub?", a: "It is a daily Bitcoin decision dashboard and education hub focused on BTC data, ETF flows, sentiment, DCA and risk management." },
      { q: "Is this financial advice?", a: "No. The website is for education and information only. Crypto assets are volatile and users must do their own research." }
    ]
  },
  "/btc-dashboard": {
    title: "BTC Market Dashboard - Live Bitcoin Price, Fear & Greed, ETF Flow and On-chain Data",
    description: "Track Bitcoin price, 24h change, Fear & Greed, ETF flows, MVRV, NUPL, Puell Multiple, funding rate and Bull Score.",
    heading: "BTC Market Dashboard",
    intro: "The BTC Dashboard answers one question: what should a long-term Bitcoin investor know today? It prioritizes price, sentiment, ETF flow, Bull Score and DCA opinion before advanced indicators.",
    faq: [
      { q: "How often does BTC price update?", a: "BTC price uses server-side cached API data and updates frequently. Historical calculator data is stored locally to avoid API limits." },
      { q: "Are on-chain metrics real time?", a: "No. MVRV, NUPL and Puell are daily or manually verified indicators. The page always shows source and update date." }
    ]
  },
  "/btc-dca-calculator": {
    title: "Bitcoin DCA Calculator - Backtest BTC Dollar Cost Averaging",
    description: "Use the Bitcoin DCA calculator to estimate total invested, BTC accumulated, current value, ROI and drawdown from local historical price data.",
    heading: "Bitcoin DCA Calculator",
    intro: "Backtest a disciplined Bitcoin DCA plan using cached local historical BTC prices. The calculator helps compare frequency, date range and strategy without calling external APIs for every visitor.",
    faq: [
      { q: "What is DCA?", a: "Dollar cost averaging means investing a fixed amount on a schedule instead of trying to time the perfect market entry." },
      { q: "Does DCA guarantee profit?", a: "No. DCA can reduce timing risk, but Bitcoin remains volatile and past performance does not guarantee future returns." }
    ]
  },
  "/crypto-etf-flow": {
    title: "Bitcoin ETF Flow Tracker - IBIT, FBTC, ARKB, BITB and GBTC",
    description: "Track daily and weekly Bitcoin ETF flows with issuer-level tables, interpretation and source labels.",
    heading: "Bitcoin ETF Flow Tracker",
    intro: "ETF flow is an important institutional demand signal for Bitcoin. This page separates daily flow, weekly flow, AUM and interpretation without pretending the data is real time.",
    faq: [
      { q: "Is ETF flow real time?", a: "No. ETF flow is updated daily from manual JSON or verified sources and is labelled with source and date." },
      { q: "Why does ETF flow matter?", a: "Persistent inflows can indicate institutional demand, while outflows may show distribution or weaker demand." }
    ]
  },
  "/bull-bear-probability": {
    title: "Bitcoin Bull Bear Indicator - Bull Score and Market Probability",
    description: "A transparent Bull vs Bear score based on Bitcoin trend, Fear & Greed, ETF flow, funding and on-chain indicators.",
    heading: "Bitcoin Bull vs Bear Probability",
    intro: "The Bull Score turns multiple market inputs into a simple 0-100 framework. It is not a trading signal; it is a structured risk-awareness tool for long-term BTC investors.",
    faq: [
      { q: "What does a high Bull Score mean?", a: "It means the selected indicators lean more constructive, but it does not mean investors should chase price." },
      { q: "What does a low Bull Score mean?", a: "It means risk is elevated or market conditions are weak. It can also create better DCA zones for patient investors." }
    ]
  },
  "/crypto-calendar": {
    title: "Crypto Event Calendar - Fed, CPI, ETF, Regulation and Token Unlocks",
    description: "Follow upcoming crypto and macro events that matter for Bitcoin, Ethereum, ETFs, regulation and market risk.",
    heading: "Crypto Event Calendar",
    intro: "Important macro and crypto events can change liquidity, sentiment and volatility. This calendar highlights what long-term BTC investors should watch.",
    faq: [
      { q: "Which events matter most?", a: "Fed meetings, inflation data, ETF decisions, regulation and major unlocks tend to affect liquidity and risk appetite." },
      { q: "Should I trade every event?", a: "No. The calendar is for preparation and risk awareness, not short-term prediction." }
    ]
  },
  "/daily-crypto-brief": {
    title: "Daily Crypto Brief - Bitcoin News, Bull Score and DCA View",
    description: "Daily Bitcoin market summary with Top 5 data points, sentiment, ETF flow, DCA view, video notes and investor risk framing.",
    heading: "Daily Crypto Brief",
    intro: "A concise daily brief for Bitcoin investors and Insight Wealth YouTube viewers. It turns market data into a structured summary, not hype.",
    faq: [
      { q: "How is the brief updated?", a: "The daily data updater refreshes market data, Bull Score and a structured brief that can support the YouTube workflow." },
      { q: "Does the brief include investment advice?", a: "No. It provides educational context and risk reminders only." }
    ]
  },
  "/about": {
    title: "About Insight Wealth - Independent Bitcoin and Crypto Research",
    description: "Insight Wealth is an independent research platform focused on Bitcoin, crypto, AI, long-term investing and data-driven analysis.",
    heading: "About Insight Wealth",
    intro: "We are an independent research platform focused on Bitcoin, crypto, AI, long-term investing and data-driven analysis. We do not provide financial advice.",
    faq: [{ q: "What is the goal of this website?", a: "The goal is to help long-term BTC investors understand what matters today using clear data and risk-aware tools." }]
  },
  "/contact": {
    title: "Contact Insight Wealth",
    description: "Contact Insight Wealth for website, research, content and collaboration inquiries.",
    heading: "Contact",
    intro: "For questions, corrections or collaboration inquiries, contact hello@insightwealth.live.",
    faq: [{ q: "How can I contact Insight Wealth?", a: "Email hello@insightwealth.live." }]
  },
  "/privacy": {
    title: "Privacy Policy - Insight Wealth Crypto Hub",
    description: "Privacy policy for Insight Wealth Crypto Hub, including analytics, cookies and advertising disclosures.",
    heading: "Privacy Policy",
    intro: "We use privacy-conscious site operations, analytics and advertising tools to improve the website. This page explains the main categories of data involved.",
    faq: [{ q: "Does the site use analytics?", a: "Yes. Google Analytics is used to understand traffic, language, country, returning visitors and engagement." }]
  },
  "/disclaimer": {
    title: "Disclaimer - Educational Crypto Data, Not Financial Advice",
    description: "Insight Wealth Crypto Hub is for educational and informational purposes only. Nothing is financial advice.",
    heading: "Disclaimer",
    intro: "This website is for educational and informational purposes only. Nothing here is financial advice. Crypto assets are volatile and past performance does not guarantee future returns.",
    faq: [{ q: "Is this financial advice?", a: "No. All content is educational and users must do their own research." }]
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const route = routeFromSlug((await params).slug);
  const copy = pageCopy[route];
  if (!copy) return makeMetadata("Insight Wealth Crypto Hub", site.description, "/", "en");
  return makeMetadata(copy.title, copy.description, route, "en");
}

export function generateStaticParams() {
  return localizedRoutes.map((route) => ({
    slug: route === "/" ? undefined : route.slice(1).split("/")
  }));
}

function schemaFor(route: string, copy: (typeof pageCopy)[string]) {
  const url = `${site.url}${route === "/" ? "/en" : `/en${route}`}`;
  return [
    { "@context": "https://schema.org", "@type": "WebSite", name: site.englishName, url: `${site.url}/en`, inLanguage: "en" },
    { "@context": "https://schema.org", "@type": "Organization", name: "Insight Wealth", url: site.url, logo: `${site.url}/assets/channel_logo_512.png`, email: "hello@insightwealth.live" },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/en` }, { "@type": "ListItem", position: 2, name: copy.heading, item: url }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: copy.faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }
  ];
}

function ToolsGrid() {
  const tools = [
    ["Bitcoin DCA Calculator", "/en/btc-dca-calculator", "Backtest disciplined Bitcoin accumulation."],
    ["ETF Flow Tracker", "/en/crypto-etf-flow", "Track institutional Bitcoin ETF demand."],
    ["Bull/Bear Score", "/en/bull-bear-probability", "Read a transparent market probability framework."],
    ["Crypto Calendar", "/en/crypto-calendar", "Watch macro, ETF and regulation events."]
  ];
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {tools.map(([title, href, text]) => (
        <Link key={href} href={href} className="premium-card rounded-lg p-5 hover:border-gold/60">
          <Calculator className="h-6 w-6 text-gold" />
          <h3 className="mt-4 font-bold text-white">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
        </Link>
      ))}
    </div>
  );
}

export default async function EnglishPage({ params }: PageProps) {
  const route = routeFromSlug((await params).slug);
  const copy = pageCopy[route];
  if (!copy) notFound();

  const [dashboard, brief] = await Promise.all([getBtcDashboardData(), Promise.resolve(getDailyBrief())]);
  const primary = dashboard.metrics.filter((metric) => ["price", "fearGreed", "etfFlow", "bullScore", "dcaOpinion"].includes(metric.id));
  const events = getEvents().slice(0, 4);

  return (
    <>
      {schemaFor(route, copy).map((item, index) => <JsonLd key={index} data={item} />)}
      <section className="border-b border-line bg-panel/30">
        <div className="container-shell py-14">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-gold">Insight Wealth</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">{copy.heading}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{copy.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/en/btc-dashboard" className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-3 font-bold text-ink">Open Dashboard <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/en/btc-dca-calculator" className="rounded-md border border-gold/40 px-5 py-3 font-bold text-gold hover:bg-gold/10">Use DCA Calculator</Link>
          </div>
        </div>
      </section>

      <div className="container-shell py-10">
        <AdSlot slotId={`en-${route === "/" ? "home" : route.slice(1)}-top`} format="horizontal" />

        {(route === "/" || route === "/btc-dashboard") && (
          <section className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {primary.map((metric) => <MetricCard key={metric.id} metric={metric} />)}
          </section>
        )}

        {route === "/daily-crypto-brief" && (
          <section className="mt-10 grid gap-4">
            <div className="premium-card rounded-lg p-6">
              <p className="text-sm text-gold">{brief.date} · Bull Score {brief.bullScore}/100</p>
              <h2 className="mt-3 text-2xl font-bold text-white">{brief.news[0].headline}</h2>
              <p className="mt-4 leading-8 text-slate-300">{brief.summary}</p>
              <p className="mt-4 leading-8 text-slate-400">{brief.dcaOpinion}</p>
            </div>
          </section>
        )}

        {route === "/crypto-calendar" && (
          <section className="mt-10 grid gap-4 md:grid-cols-2">
            {events.map((event) => (
              <article key={event.title} className="premium-card rounded-lg p-5">
                <p className="text-sm text-gold">{event.date} · {event.category} · {event.impact}</p>
                <h2 className="mt-2 text-xl font-bold text-white">{event.title}</h2>
                <p className="mt-3 leading-7 text-slate-300">{event.explanation}</p>
              </article>
            ))}
          </section>
        )}

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
          <article className="premium-card rounded-lg p-6">
            <div className="flex items-center gap-2 text-gold"><BookOpen className="h-5 w-5" /><span className="text-sm font-bold uppercase tracking-[0.2em]">AI-readable summary</span></div>
            <h2 className="mt-4 text-2xl font-bold text-white">What long-term Bitcoin investors should know</h2>
            <p className="mt-4 leading-8 text-slate-300">
              Insight Wealth is not a crypto encyclopedia. Each page is designed to answer one focused question for long-term BTC investors: what matters today, what changed, what data source supports it, and how should risk be managed without all-in behavior or panic selling.
            </p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="text-slate-400"><tr><th className="border-b border-line py-3">Signal</th><th className="border-b border-line py-3">Purpose</th><th className="border-b border-line py-3">Update style</th></tr></thead>
                <tbody className="text-slate-300">
                  <tr><td className="border-b border-line py-3">BTC Price</td><td className="border-b border-line py-3">Current market temperature</td><td className="border-b border-line py-3">Cached live API</td></tr>
                  <tr><td className="border-b border-line py-3">Fear & Greed</td><td className="border-b border-line py-3">Crowd sentiment</td><td className="border-b border-line py-3">Daily source / cached</td></tr>
                  <tr><td className="border-b border-line py-3">ETF Flow</td><td className="border-b border-line py-3">Institutional demand</td><td className="border-b border-line py-3">Daily manual JSON</td></tr>
                  <tr><td className="border-b border-line py-3">MVRV / NUPL / Puell</td><td className="border-b border-line py-3">Cycle valuation context</td><td className="border-b border-line py-3">Daily or verified manual</td></tr>
                </tbody>
              </table>
            </div>
          </article>
          <AdSlot slotId={`en-${route === "/" ? "home" : route.slice(1)}-sidebar`} format="rectangle" />
        </section>

        <section className="mt-10">
          <div className="flex items-center gap-2 text-gold"><ShieldCheck className="h-5 w-5" /><h2 className="text-2xl font-bold text-white">Risk and editorial policy</h2></div>
          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            This website is educational only. We never display fake real-time numbers. If reliable real-time data is unavailable, the page shows source, date, last updated time or coming soon. Crypto assets are volatile; no page guarantees profit.
          </p>
        </section>

        <AdSlot slotId={`en-${route === "/" ? "home" : route.slice(1)}-bottom`} format="horizontal" className="mt-10" />

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white">Popular tools</h2>
          <ToolsGrid />
        </section>

        <section className="mt-10">
          <div className="flex items-center gap-2 text-gold"><HelpCircle className="h-5 w-5" /><h2 className="text-2xl font-bold text-white">FAQ</h2></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {copy.faq.map((item) => (
              <article key={item.q} className="premium-card rounded-lg p-5">
                <h3 className="font-bold text-white">{item.q}</h3>
                <p className="mt-3 leading-7 text-slate-300">{item.a}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
