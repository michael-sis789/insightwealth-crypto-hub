import { Copy, Download } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { NewsCard } from "@/components/NewsCard";
import { SeoContent } from "@/components/SeoContent";
import { getDailyBrief } from "@/lib/crypto-data";
import { makeMetadata } from "@/lib/seo";

export const metadata = makeMetadata("Daily Crypto Brief - 洞見財富每日加密簡報", "每日Top 5 crypto news、市場情緒、DCA觀點、BTC/ETH/Altcoin影響與YouTube影片嵌入區。", "/daily-crypto-brief");

export default function DailyBriefPage() {
  const brief = getDailyBrief();
  const script = `洞見財富每日加密簡報 ${brief.date}\n\n${brief.summary}\n\nDCA觀點：${brief.dcaOpinion}`;
  return (
    <div className="container-shell py-10">
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-gold">Daily Crypto Brief</p>
      <h1 className="mt-3 text-4xl font-black text-white">每日加密市場簡報</h1>
      <p className="mt-3 text-slate-400">{brief.date} · Market Sentiment: {brief.marketSentiment} · Bull Score: {brief.bullScore}/100</p>
      <AdSlot slotId="brief-top" format="horizontal" className="mt-8" />
      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="premium-card rounded-lg p-6"><h2 className="text-2xl font-bold text-white">今日摘要</h2><p className="mt-4 text-lg leading-8 text-slate-300">{brief.summary}</p><p className="mt-4 leading-8 text-slate-300">DCA view：{brief.dcaOpinion}</p></div>
        <div className="premium-card rounded-lg p-6"><h2 className="text-lg font-bold text-white">Video Embed</h2><div className="mt-4 flex aspect-video items-center justify-center rounded border border-line bg-black/40 text-sm text-slate-500">YouTube embed placeholder</div></div>
      </section>
      <section className="mt-8 grid gap-4">{brief.news.map((item, index) => <NewsCard key={item.headline} item={item} index={index} />)}</section>
      <section className="premium-card mt-8 rounded-lg p-6">
        <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-2xl font-bold text-white">Script download / copy</h2><div className="flex gap-2"><button className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm text-slate-300"><Copy className="h-4 w-4" />Copy</button><button className="inline-flex items-center gap-2 rounded-md bg-gold px-3 py-2 text-sm font-bold text-ink"><Download className="h-4 w-4" />Download</button></div></div>
        <pre className="mt-4 max-h-64 overflow-auto rounded bg-black/40 p-4 text-sm leading-6 text-slate-300">{script}</pre>
      </section>
      <SeoContent title="Daily Crypto Brief如何支持每日影片？" paragraphs={[
        "Daily Crypto Brief是洞見財富YouTube頻道的每日內容中樞。它把Top 5 crypto news、市場情緒、Bull Score、DCA view與BTC、ETH、Altcoin影響整理成固定格式，方便每天快速產出影片、短文與社群內容。固定格式可以提高效率，也能讓觀眾形成閱讀習慣。",
        "每日簡報的重點不是追逐最多新聞，而是回答三個問題：今天市場為什麼動？這件事對BTC與ETH有什麼影響？長期投資者應該如何控制風險？這種內容更適合建立信任與重複訪問，而不是製造情緒化標題。",
        "更新方式很簡單：每天只要編輯 `data/daily-brief.json`，頁面就會自動渲染新的日期、摘要、新聞與DCA觀點。建議每篇都保留風險提示，避免保證收益、避免喊單、避免誇張承諾。投資靠紀律，不靠運氣；財富靠堅持，不靠奇蹟。"
      ]} />
      <AdSlot slotId="brief-bottom" format="horizontal" className="mt-10" />
    </div>
  );
}
