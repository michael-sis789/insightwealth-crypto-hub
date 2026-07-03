import { makeMetadata } from "@/lib/seo";

export const metadata = makeMetadata("About - 洞見財富 Crypto Hub", "了解洞見財富 Crypto Hub 的定位：用數據、紀律與長期思維解讀加密市場。", "/about");

export default function AboutPage() {
  return (
    <main className="container-shell py-10">
      <h1 className="text-4xl font-black text-white">About 洞見財富</h1>
      <div className="prose-finance mt-6 max-w-3xl">
        <p>We are an independent research platform.</p>
        <p>我們專注於Bitcoin、Crypto、AI、長期投資與data driven analysis。</p>
        <p>這個網站不是加密貨幣百科，而是每日決策儀表盤。每一頁都只回答一個問題：What should a long-term BTC investor know today?</p>
        <p>因此，我們優先呈現BTC Price、Fear & Greed、ETF Flow、Bull Score與DCA Opinion，避免讓長期投資者被過多指標干擾。進階鏈上與衍生品資料只作為背景分析，不作為單獨買賣訊號。</p>
        <p>我們不提供財務建議，不承諾收益，不鼓勵all-in，也不製造恐慌。核心理念是：投資靠紀律，不靠運氣；財富靠堅持，不靠奇蹟。</p>
      </div>
    </main>
  );
}
