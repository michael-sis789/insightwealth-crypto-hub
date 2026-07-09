import { AdSlot } from "@/components/AdSlot";
import { DcaCalculator } from "@/components/DcaCalculator";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import { getSeoPage } from "@/lib/seo-hub-content";
import { makeMetadata } from "@/lib/seo";

export const metadata = makeMetadata("BTC DCA Calculator - 比特幣定投計算器", "使用BTC DCA calculator測算每日、每週、每月定投比特幣的投入、收益、ROI、年化報酬、最大回撤與策略差異。", "/btc-dca-calculator");

export default function DcaPage() {
  const page = getSeoPage("btc-dca-calculator");
  if (!page) return null;
  return (
    <SeoLandingPage page={page} locale="zh">
      <AdSlot slotId="dca-tool-top" format="horizontal" />
      <div className="mt-8"><DcaCalculator /></div>
    </SeoLandingPage>
  );
}
