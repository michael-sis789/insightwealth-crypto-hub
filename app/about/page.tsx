import { makeMetadata } from "@/lib/seo";

export const metadata = makeMetadata("About - 洞見財富 Crypto Hub", "了解洞見財富 Crypto Hub 的定位、資料來源、編輯原則與YouTube每日市場簡報。", "/about");

export default function AboutPage() {
  return (
    <main className="container-shell py-10">
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-gold">Independent Research Platform</p>
      <h1 className="mt-3 text-4xl font-black text-white">About 洞見財富</h1>
      <div className="prose-finance mt-6 max-w-4xl">
        <p>洞見財富是一個獨立研究平台，專注於Bitcoin、Crypto、AI、長期投資與data driven analysis。我們建立 InsightWealth.live 的目的，不是製作另一個加密貨幣百科，而是建立一個每日決策儀表盤，幫助長期BTC投資者快速理解今天最重要的市場資訊。</p>
        <p>每一頁都圍繞同一個問題設計：What should a long-term BTC investor know today? 因此，我們優先呈現BTC Price、Fear & Greed、ETF Flow、Bull Score與DCA Opinion。其他進階指標，例如MVRV、NUPL、Puell Multiple、Funding Rate與Open Interest，會放在背景分析中使用，不會被包裝成單一買賣信號。</p>
        <h2>資料與更新原則</h2>
        <p>網站使用公開API、本地JSON快取與人工確認資料。BTC價格、Fear & Greed與Funding Rate會透過公開來源更新；ETF Flow與部分鏈上資料若無可靠免費即時API，會清楚標示為每日更新或人工確認。當資料不可用時，網站不會顯示假數字，而是顯示資料暫時不可用、Coming Soon、Stale data或最後更新時間。</p>
        <h2>影片與網站如何配合</h2>
        <p>洞見財富YouTube頻道會把每日市場資料轉成更容易理解的影音內容。網站則保留可搜尋、可引用、可回看的文字版本、資料來源、計算器與相關工具。這種結構讓觀眾看完影片後，可以回到網站檢查數據、閱讀完整簡報，或使用DCA計算器重新檢視自己的長期策略。</p>
        <h2>我們不做什麼</h2>
        <p>我們不提供財務建議，不承諾收益，不鼓勵all-in，也不製造恐慌。Bull Score、DCA Opinion與市場簡報只是教育用途的風險管理框架，不是買入、賣出或持有任何資產的建議。核心理念是：投資靠紀律，不靠運氣；財富靠堅持，不靠奇蹟。</p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["Focus", "Bitcoin、Crypto、AI、長期投資與資料驅動分析。"],
          ["Workflow", "每日更新BTC核心資料、簡報、DCA觀點與YouTube內容。"],
          ["Standard", "標示來源、更新時間與限制，不把不可用資料偽裝成即時數據。"]
        ].map(([title, text]) => (
          <div key={title} className="premium-card rounded-lg p-5">
            <h2 className="font-bold text-gold">{title}</h2>
            <p className="mt-3 leading-7 text-slate-300">{text}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
