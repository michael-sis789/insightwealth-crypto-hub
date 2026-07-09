import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, CalendarDays, Calculator, LineChart } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { MetricCard } from "@/components/MetricCard";
import { JsonLd } from "@/components/JsonLd";
import { YouTubePanel } from "@/components/YouTubePanel";
import { makeMetadata, site } from "@/lib/seo";
import { getBtcDashboardData, getDailyBrief } from "@/lib/crypto-data";

export const metadata = makeMetadata("洞見財富 Crypto Hub - BTC數據、ETF資金流與DCA工具", "洞見財富 Crypto Hub 提供BTC市場儀表盤、Bitcoin DCA calculator、ETF資金流、牛熊概率與每日加密市場簡報。");
export const dynamic = "force-dynamic";

const tools = [
  { href: "/btc-dca-calculator", title: "BTC DCA Calculator", icon: Calculator, text: "測算長期定投BTC的投入、收益、回撤與風險。" },
  { href: "/bitcoin-etf-flow", title: "Bitcoin ETF Flow", icon: LineChart, text: "追蹤IBIT、FBTC、ARKB、BITB、GBTC等ETF流向。" },
  { href: "/btc-bull-bear-indicator", title: "Bull Bear Indicator", icon: BarChart3, text: "用價格、情緒、ETF、鏈上與槓桿資料形成0-100分模型。" },
  { href: "/bitcoin-fear-greed-index", title: "Fear & Greed Index", icon: CalendarDays, text: "判斷市場恐懼、貪婪與DCA節奏。" }
];

export default async function HomePage() {
  const dashboard = await getBtcDashboardData();
  const brief = getDailyBrief();
  const summary = dashboard.metrics.filter((m) => ["price", "fearGreed", "etfFlow", "bullScore", "dcaOpinion"].includes(m.id));
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url, inLanguage: "zh-Hant" }} />
      <section className="relative overflow-hidden border-b border-line">
        <Image src="/assets/chart_background.png" alt="" fill priority className="object-cover opacity-20" />
        <div className="container-shell relative grid min-h-[620px] items-center gap-10 py-16 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold">Insight Wealth Crypto Hub</p>
            <h1 className="mt-5 max-w-4xl text-balance text-5xl font-black leading-tight text-white md:text-7xl">洞見財富 Crypto Hub</h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-300">Free Bitcoin dashboard, DCA calculator, ETF flow tracker and crypto market sentiment tools. 不是加密百科，而是每日BTC決策儀表盤，用價格、情緒、ETF資金、Bull Score與DCA觀點看懂今天市場。</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/btc-dashboard" className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-3 font-bold text-ink">查看今日BTC儀表盤 <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/btc-dca-calculator" className="rounded-md border border-gold/40 px-5 py-3 font-bold text-gold hover:bg-gold/10">使用DCA計算器</Link>
            </div>
          </div>
          <div className="premium-card rounded-lg p-5">
            <Image src="/assets/channel_logo_512.png" alt="洞見財富" width={160} height={160} className="mx-auto rounded-lg" />
            <p className="mt-6 text-center text-lg font-bold text-white">投資靠紀律，不靠運氣；財富靠堅持，不靠奇蹟。</p>
          </div>
        </div>
      </section>
      <div className="container-shell py-10">
        <AdSlot slotId="home-top-banner" format="horizontal" />
        <section className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {summary.map((metric) => <MetricCard key={metric.id} metric={metric} />)}
        </section>
        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="premium-card rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white">今天市場一句話總結</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">{brief.summary}</p>
          </div>
          <AdSlot slotId="home-sidebar" format="rectangle" className="hidden lg:block" />
        </section>
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white">Latest Daily Crypto Brief</h2>
          <Link href="/daily-crypto-brief" className="mt-4 block rounded-lg border border-line bg-panel/70 p-5 hover:border-gold/50">
            <p className="text-sm text-gold">{brief.date} · Bull Score {brief.bullScore}/100</p>
            <p className="mt-2 text-lg font-bold text-white">{brief.news[0].headline}</p>
            <p className="mt-2 text-slate-400">{brief.news[0].summary}</p>
          </Link>
        </section>
        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <YouTubePanel />
          <div className="premium-card rounded-lg p-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Editorial Standard</p>
            <h2 className="mt-3 text-2xl font-bold text-white">我們如何降低薄內容風險</h2>
            <div className="mt-4 space-y-4 leading-8 text-slate-300">
              <p>洞見財富不是搬運價格的小工具站。每天的首頁、BTC儀表盤與每日簡報會把同一組核心問題整理成可閱讀的判斷框架：BTC價格是否只是短線波動？ETF資金是否確認需求？市場情緒是否過熱或恐慌？長期投資者是否應該維持DCA紀律？</p>
              <p>所有數據都標示來源與更新時間。無法可靠即時取得的資料，例如部分鏈上指標與ETF流量，不會被包裝成即時數據。這讓讀者知道哪些資訊適合短期觀察，哪些只適合長期週期分析。</p>
              <p>投資靠紀律，不靠運氣；財富靠堅持，不靠奇蹟。本站所有內容都以教育為目的，不提供買賣建議，不承諾收益，也不鼓勵all-in或追漲殺跌。</p>
            </div>
          </div>
        </section>
        <AdSlot slotId="home-in-content" format="horizontal" className="mt-10" />
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white">Popular Tools</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="premium-card rounded-lg p-5 hover:border-gold/60">
                <tool.icon className="h-7 w-7 text-gold" />
                <h3 className="mt-4 font-bold text-white">{tool.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{tool.text}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
