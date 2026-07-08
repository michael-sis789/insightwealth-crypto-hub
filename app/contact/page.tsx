import { makeMetadata } from "@/lib/seo";

export const metadata = makeMetadata("Contact - 聯絡洞見財富", "聯絡洞見財富 Crypto Hub，提供合作、內容建議與資料更新回饋。", "/contact");

export default function ContactPage() {
  return (
    <main className="container-shell py-10">
      <h1 className="text-4xl font-black text-white">Contact</h1>
      <div className="premium-card mt-6 max-w-3xl rounded-lg p-6">
        <p className="leading-8 text-slate-300">合作、內容建議、資料錯誤回報或YouTube頻道相關事宜，請聯絡：</p>
        <a href="mailto:hello@insightwealth.live" className="mt-4 inline-flex rounded-md border border-gold/40 px-4 py-3 font-bold text-gold hover:bg-gold/10">
          hello@insightwealth.live
        </a>
        <div className="mt-6 border-t border-line pt-6">
          <h2 className="text-xl font-bold text-white">YouTube 頻道</h2>
          <p className="mt-3 leading-7 text-slate-300">每日影片、市場簡報與BTC長期投資觀點會發布在洞見財富 YouTube 頻道。</p>
          <a href="https://youtube.com/@9insightwealth" target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-md bg-gold px-4 py-3 font-bold text-ink hover:bg-[#f1c75d]">
            前往 @9insightwealth
          </a>
        </div>
      </div>
    </main>
  );
}
