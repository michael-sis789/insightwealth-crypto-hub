import { makeMetadata } from "@/lib/seo";

export const metadata = makeMetadata("Privacy Policy - 隱私政策", "洞見財富 Crypto Hub 的隱私政策與廣告、分析工具說明。", "/privacy");

export default function PrivacyPage() {
  return <main className="container-shell py-10"><h1 className="text-4xl font-black text-white">Privacy Policy 隱私政策</h1><div className="prose-finance mt-6 max-w-3xl"><p>本網站可能使用網站分析、Cookie與Google AdSense等工具，以改善內容、衡量流量並展示相關廣告。當AdSense正式啟用後，Google可能使用Cookie依照使用者的瀏覽情境展示廣告。</p><p>本網站不要求使用者建立帳號，也不主動收集敏感個人資料。若你透過聯絡表單或Email提供資訊，我們只會用於回覆相關訊息。</p><p>你可以在瀏覽器中停用Cookie，或透過Google廣告設定管理個人化廣告偏好。</p></div></main>;
}
