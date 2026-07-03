import { AdSlot } from "@/components/AdSlot";
import { SeoContent } from "@/components/SeoContent";
import { SignalBadge } from "@/components/SignalBadge";
import { getEtfFlowData } from "@/lib/crypto-data";
import { makeMetadata } from "@/lib/seo";

export const metadata = makeMetadata("Bitcoin ETF Flow Tracker - 比特幣ETF資金流", "追蹤IBIT、FBTC、ARKB、BITB、GBTC與其他Bitcoin ETF每日資金流、AUM與7日/30日趨勢。", "/crypto-etf-flow");

export default function EtfFlowPage() {
  const data = getEtfFlowData();
  return (
    <div className="container-shell py-10">
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-gold">Crypto ETF Flow Tracker</p>
      <h1 className="mt-3 text-4xl font-black text-white">比特幣ETF資金流</h1>
      <p className="mt-3 max-w-3xl leading-7 text-slate-400">追蹤現貨Bitcoin ETF每日流入流出，觀察機構資金需求是否延續。</p>
      <AdSlot slotId="etf-top" format="horizontal" className="mt-8" />
      <section className="mt-8 grid gap-4 md:grid-cols-4">
        {[["Total daily net flow", data.totalDailyNetFlow], ["7-day net flow", data.sevenDayNetFlow], ["30-day net flow", data.thirtyDayNetFlow], ["Streak", data.streak]].map(([label, value]) => (
          <div key={label} className="premium-card rounded-lg p-5"><p className="text-sm text-slate-400">{label}</p><p className="mt-2 text-2xl font-bold text-white">{value}</p></div>
        ))}
      </section>
      <div className="mt-8 overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[720px] border-collapse bg-panel/70 text-left text-sm">
          <thead className="bg-white/5 text-slate-300"><tr>{["ETF", "Issuer", "Daily Flow", "Total AUM", "Status"].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr></thead>
          <tbody>{data.funds.map((fund) => <tr key={fund.ticker} className="border-t border-line"><td className="px-4 py-4 font-bold text-white">{fund.ticker}</td><td className="px-4 py-4 text-slate-300">{fund.issuer}</td><td className="px-4 py-4 text-gold">{fund.dailyFlow}</td><td className="px-4 py-4 text-slate-300">{fund.totalAum}</td><td className="px-4 py-4"><SignalBadge signal={fund.status === "Bullish" ? "bullish" : fund.status === "Bearish" ? "bearish" : "neutral"} label={fund.status} /></td></tr>)}</tbody>
        </table>
      </div>
      <section className="premium-card mt-8 rounded-lg p-6"><h2 className="text-2xl font-bold text-white">Interpretation</h2><p className="mt-4 leading-8 text-slate-300">{data.interpretation}</p></section>
      <SeoContent title="為什麼Bitcoin ETF flow重要？" paragraphs={[
        "Bitcoin ETF flow是本輪BTC市場最重要的需求端指標之一。現貨ETF讓傳統金融資金可以用熟悉的工具配置比特幣，因此IBIT、FBTC、ARKB、BITB與GBTC的流入流出，往往反映機構與顧問渠道的風險偏好。當ETF連續多日淨流入，通常代表市場願意在當前價格區間承接BTC；當ETF出現大幅淨流出，則可能代表短期需求轉弱。",
        "ETF資金流不能單獨使用。若ETF流入強，但BTC價格沒有跟上，可能代表賣壓同樣強；若ETF流出但價格穩定，則可能代表市場吸收能力不差。最好的做法，是把ETF flow與BTC market dashboard中的Fear & Greed、MVRV、Funding Rate和Open Interest一起觀察。",
        "對DCA投資者來說，ETF資金流可以幫助判斷是否提高或降低定投節奏。連續流入配合中性估值，屬於較健康環境；極度貪婪配合高槓桿，則不宜追高。投資靠紀律，不靠運氣；財富靠堅持，不靠奇蹟。"
      ]} />
      <AdSlot slotId="etf-bottom" format="horizontal" className="mt-10" />
      <p className="mt-6 text-sm text-slate-500">資料目前由 `data/etf-flow.json` 手動更新，未來可接入SoSoValue或Farside風格API。</p>
    </div>
  );
}
