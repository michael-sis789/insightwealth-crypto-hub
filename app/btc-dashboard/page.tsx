import { RefreshCw } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { ChartCard } from "@/components/ChartCard";
import { MetricCard } from "@/components/MetricCard";
import { SeoContent } from "@/components/SeoContent";
import { makeMetadata } from "@/lib/seo";
import { getBtcDashboardData } from "@/lib/crypto-data";

export const metadata = makeMetadata("BTC Market Dashboard - 比特幣鏈上指標與市場儀表盤", "追蹤BTC live price、Fear & Greed、MVRV、NUPL、Puell Multiple、ETF Net Flow、funding rate與open interest。", "/btc-dashboard");
export const dynamic = "force-dynamic";

export default async function BtcDashboardPage() {
  const data = await getBtcDashboardData();
  const primaryMetricIds = ["price", "fearGreed", "etfFlow", "bullScore", "dcaOpinion"];
  const primaryMetrics = data.metrics.filter((metric) => primaryMetricIds.includes(metric.id));
  const advancedMetrics = data.metrics.filter((metric) => !primaryMetricIds.includes(metric.id));
  return (
    <div className="container-shell py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-gold">BTC Market Dashboard</p>
          <h1 className="mt-3 text-4xl font-black text-white">BTC市場儀表盤</h1>
          <p className="mt-3 max-w-2xl leading-7 text-slate-400">每天只回答一個問題：長期BTC投資者今天應該知道什麼？先看價格、情緒、ETF資金、Bull Score與DCA觀點，再看進階指標。</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm text-slate-300"><RefreshCw className="h-4 w-4" />Refresh data</button>
      </div>
      <p className="mt-4 text-sm text-slate-500">Last updated: {data.lastUpdated}</p>
      <AdSlot slotId="btc-dashboard-top" format="horizontal" className="mt-8" />
      <section className="mt-8">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-white">今日決策重點</h2>
            <p className="mt-2 text-sm text-slate-400">首頁與儀表盤優先呈現這五項，避免資訊過載。</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">{primaryMetrics.map((metric) => <MetricCard key={metric.id} metric={metric} />)}</div>
      </section>
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-white">進階分析</h2>
        <p className="mt-2 text-sm text-slate-400">這些資料用於確認背景風險，不應單獨作為交易訊號。</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{advancedMetrics.map((metric) => <MetricCard key={metric.id} metric={metric} />)}</div>
      </section>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <ChartCard title="BTC價格與市場價值趨勢" data={data.chart} />
        <AdSlot slotId="btc-dashboard-sidebar" format="vertical" className="hidden lg:block" />
      </div>
      <SeoContent title="如何閱讀BTC Market Dashboard？" paragraphs={[
        "BTC market dashboard的目的不是預測下一根K線，而是幫助投資者建立一個一致的市場觀察框架。單一指標經常會失真，例如價格上漲可能來自真實買盤，也可能只是合約空單清算；ETF流入可能代表機構需求改善，但如果同時出現Funding Rate過熱，短線風險也會上升。因此，洞見財富把BTC價格、Bitcoin ETF flow、Crypto fear greed、MVRV、NUPL、Puell Multiple、Open Interest與Stablecoin supply放在同一個頁面，讓投資者用多維度資料判斷市場位置。",
        "MVRV與NUPL屬於BTC鏈上指標，適合觀察週期估值。當MVRV處於極低區間，市場常常接近長期投資者願意累積的位置；當MVRV與NUPL同時進入高位，代表大量持有人已有未實現獲利，市場容易受到獲利了結影響。Puell Multiple則觀察礦工收入與市場週期，對長線週期判斷有參考價值。",
        "合約資料如Funding Rate與Open Interest適合判斷槓桿擁擠程度。價格上漲但資金費率極高，通常表示追多風險增加；價格下跌但恐慌情緒過度，有時反而適合用小額DCA累積。投資靠紀律，不靠運氣；財富靠堅持，不靠奇蹟。使用這個儀表盤時，應把它視為風險管理工具，而不是保證獲利的交易訊號。"
      ]} />
      <AdSlot slotId="btc-dashboard-bottom" format="horizontal" className="mt-10" />
      <p className="mt-6 text-sm leading-6 text-slate-500">Disclaimer: 本頁內容僅供教育與資訊用途，不構成任何投資建議。加密資產波動劇烈，請自行研究並控制風險。</p>
    </div>
  );
}
