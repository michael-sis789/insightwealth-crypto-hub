import { makeMetadata } from "@/lib/seo";

export const metadata = makeMetadata("Disclaimer - 免責聲明", "洞見財富 Crypto Hub 內容僅供教育與資訊用途，不構成財務建議。", "/disclaimer");

export default function DisclaimerPage() {
  return <main className="container-shell py-10"><h1 className="text-4xl font-black text-white">Disclaimer 免責聲明</h1><div className="prose-finance mt-6 max-w-3xl"><p>This website is for educational and informational purposes only. Nothing on this website is financial, investment, legal, tax, or trading advice.</p><p>加密資產波動劇烈，價格可能在短時間內大幅上升或下跌。過去表現不保證未來結果。任何投資決策都應由使用者自行研究、獨立判斷，並承擔相應風險。</p><p>洞見財富 Crypto Hub 提供的模型、分數、指標、計算器與簡報，只是教育用途的市場觀察工具，不應被視為買入、賣出或持有任何資產的建議。</p></div></main>;
}
