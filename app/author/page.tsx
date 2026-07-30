import { TrustPage } from "@/components/TrustPage";
import { authorPage } from "@/lib/trust-content";
import { makeMetadata } from "@/lib/seo";

export const metadata = makeMetadata("作者與研究團隊 - 洞見財富", "了解洞見財富的研究流程、內容範圍、YouTube頻道與聯絡方式。", "/author");

export default function AuthorPage() {
  return <TrustPage slug="author" {...authorPage} />;
}
