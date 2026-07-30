import { TrustPage } from "@/components/TrustPage";
import { sourceDirectory } from "@/lib/trust-content";
import { makeMetadata } from "@/lib/seo";

export const metadata = makeMetadata("資料來源目錄 - 洞見財富 Crypto Hub", "查看洞見財富使用的BTC價格、情緒、ETF、鏈上、宏觀事件與本地JSON快取資料來源。", "/sources");

export default function SourcesPage() {
  return <TrustPage slug="sources" {...sourceDirectory} />;
}
