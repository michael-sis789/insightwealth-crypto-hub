import { TrustPage } from "@/components/TrustPage";
import { methodology } from "@/lib/trust-content";
import { makeMetadata } from "@/lib/seo";

export const metadata = makeMetadata("資料方法論 - Insight Wealth Crypto Hub", "了解Insight Wealth如何更新BTC價格、Fear & Greed、ETF Flow、鏈上指標、事件日曆與Bull Score。", "/methodology");

export default function MethodologyPage() {
  return <TrustPage slug="methodology" {...methodology} />;
}
