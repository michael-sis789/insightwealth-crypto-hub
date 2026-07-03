import { AdSlot } from "@/components/AdSlot";
import { DcaCalculator } from "@/components/DcaCalculator";
import { SeoContent } from "@/components/SeoContent";
import { makeMetadata } from "@/lib/seo";

export const metadata = makeMetadata("BTC DCA Calculator - 比特幣定投計算器", "使用BTC DCA calculator測算每日、每週、每月定投比特幣的投入、收益、ROI、年化報酬、最大回撤與策略差異。", "/btc-dca-calculator");

export default function DcaPage() {
  return (
    <div className="container-shell py-10">
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-gold">BTC DCA Calculator</p>
      <h1 className="mt-3 text-4xl font-black text-white">比特幣定投計算器</h1>
      <p className="mt-3 max-w-3xl leading-7 text-slate-400">輸入日期、金額、幣別、頻率與策略，估算長期DCA的BTC累積、收益、ROI與回撤。</p>
      <AdSlot slotId="dca-top" format="horizontal" className="mt-8" />
      <div className="mt-8"><DcaCalculator /></div>
      <SeoContent title="什麼是BTC定投？" paragraphs={[
        "BTC定投，也就是Bitcoin DCA，是指在固定時間投入固定金額購買比特幣。它的核心不是猜最低點，而是用紀律分散買入時間，降低一次性買在高點的風險。對長期投資者來說，BTC DCA calculator可以幫助你理解不同開始日期、定投頻率與投入金額對最終結果的影響。",
        "定投適合不想頻繁交易、也不想被市場情緒牽著走的人。加密市場波動大，短期價格可能因ETF資金流、宏觀利率、監管新聞或合約清算劇烈波動。如果投資者每次都想猜底部，容易在恐慌時停手，在上漲時追高。DCA的價值，是把決策從情緒交給規則。",
        "但定投不是保證獲利。BTC仍然可能長時間下跌，最大回撤可能非常深，因此金額必須控制在不影響生活與現金流的範圍內。較成熟的做法，是固定DCA為主，並在Fear & Greed偏低、BTC回撤較深、長期鏈上估值不高時小幅提高投入；當市場極度貪婪或個人部位過大時，則可以降低投入或做DCA out。",
        "什麼時候適合DCA買入？通常是你有長期投資期限、穩定現金流、願意承受高波動，並且不使用高槓桿時。什麼時候適合DCA賣出？當資產配置過度集中、牛市情緒極熱、或你需要為生活目標鎖定部分收益時，可以按計畫分批退出。投資靠紀律，不靠運氣；財富靠堅持，不靠奇蹟。"
      ]} />
      <AdSlot slotId="dca-bottom" format="horizontal" className="mt-10" />
      <p className="mt-6 text-sm text-slate-500">Disclaimer: 本計算器僅用於教育與情境分析，不是投資建議。</p>
    </div>
  );
}
