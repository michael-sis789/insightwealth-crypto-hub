import { AdSlot } from "@/components/AdSlot";
import { SeoContent } from "@/components/SeoContent";
import { SignalBadge } from "@/components/SignalBadge";
import { getBullBearModel } from "@/lib/crypto-data";
import { makeMetadata } from "@/lib/seo";

export const metadata = makeMetadata("Bitcoin Bull Bear Indicator - BTC牛熊概率模型", "使用BTC價格趨勢、Fear & Greed、ETF Flow、MVRV、NUPL、Funding Rate、Open Interest與穩定幣趨勢建立牛熊概率。", "/bull-bear-probability");
export const dynamic = "force-dynamic";

export default async function BullBearPage() {
  const model = await getBullBearModel();
  return (
    <div className="container-shell py-10">
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-gold">Bull vs Bear Probability</p>
      <h1 className="mt-3 text-4xl font-black text-white">比特幣牛熊概率</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="premium-card rounded-lg p-6"><p className="text-slate-400">Bull Probability</p><p className="mt-2 text-5xl font-black text-bullish">{model.bullProbability}%</p></div>
        <div className="premium-card rounded-lg p-6"><p className="text-slate-400">Bear Probability</p><p className="mt-2 text-5xl font-black text-bearish">{model.bearProbability}%</p></div>
        <div className="premium-card rounded-lg p-6"><p className="text-slate-400">Market Status</p><div className="mt-4"><SignalBadge signal={model.status === "Bullish" ? "bullish" : model.status === "Bearish" ? "bearish" : "neutral"} label={model.status} /></div></div>
      </div>
      <AdSlot slotId="bull-bear-top" format="horizontal" className="mt-8" />
      <div className="mt-8 overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[760px] border-collapse bg-panel/70 text-left text-sm">
          <thead className="bg-white/5 text-slate-300"><tr>{["Indicator", "Current Value", "Signal", "Score", "Explanation"].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr></thead>
          <tbody>{model.rows.map((row) => <tr key={row.indicator} className="border-t border-line"><td className="px-4 py-3 font-semibold text-white">{row.indicator}</td><td className="px-4 py-3 text-slate-300">{row.currentValue}</td><td className="px-4 py-3"><SignalBadge signal={row.signal === "Bullish" ? "bullish" : row.signal === "Bearish" ? "bearish" : "neutral"} label={row.signal} /></td><td className="px-4 py-3 text-gold">+{row.score}</td><td className="px-4 py-3 text-slate-400">{row.explanation}</td></tr>)}</tbody>
        </table>
      </div>
      <section className="premium-card mt-8 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white">AI-style market explanation</h2>
        <p className="mt-4 text-lg leading-8 text-slate-300">今天市場評分為{model.bullProbability}/100。分數由最新可用API資料與每日ETF/鏈上JSON共同計算；若某項API暫時不可用，該項不會用假數字補分。價格、情緒與資金費率應配合風險管理使用，不適合追高或all-in，較適合以DCA與倉位紀律處理。</p>
      </section>
      <SeoContent title="Bitcoin bull bear indicator如何使用？" paragraphs={[
        "Bitcoin bull bear indicator不是水晶球，而是一個把多個市場維度標準化的風險框架。投資者常犯的錯誤，是只看BTC價格或單一新聞標題就做決策。洞見財富的牛熊模型把BTC price trend、Bitcoin ETF flow、Crypto fear greed、MVRV、NUPL、Funding Rate、Open Interest、Stablecoin trend與BTC dominance放入同一張表，目的是讓投資者知道目前市場的勝率、風險與擁擠程度。",
        "分數高不代表可以all-in，分數低也不代表一定要恐慌賣出。真正重要的是紀律：當分數中性偏多時，適合維持DCA、避免追漲；當分數過熱時，適合檢查倉位、降低槓桿、保留現金；當分數低迷但基本面沒有崩壞時，長期投資者可以分批累積。投資靠紀律，不靠運氣；財富靠堅持，不靠奇蹟。",
        "這個模型的最佳用途，是作為每週或每日複盤工具。你可以把它與自己的投資計畫結合，例如只在市場低迷時提高DCA金額，或在極端貪婪時停止追價。所有分數都應配合個人現金流、風險承受能力與投資期限判斷。"
      ]} />
      <AdSlot slotId="bull-bear-bottom" format="horizontal" className="mt-10" />
      <p className="mt-6 text-sm text-slate-500">本頁不構成財務建議。過去表現不保證未來結果。</p>
    </div>
  );
}
