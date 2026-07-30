import { TrustPage } from "@/components/TrustPage";
import { editorialPolicy } from "@/lib/trust-content";
import { makeMetadata } from "@/lib/seo";

export const metadata = makeMetadata("編輯政策 - 洞見財富 Crypto Hub", "洞見財富的內容標準、資料來源、原創分析、風險提示與AdSense友好的發布原則。", "/editorial-policy");

export default function EditorialPolicyPage() {
  return <TrustPage slug="editorial-policy" {...editorialPolicy} />;
}
