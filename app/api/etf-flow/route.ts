import { NextResponse } from "next/server";
import { getEtfFlowData } from "@/lib/crypto-data";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    value: getEtfFlowData(),
    source: "Manual JSON - updated daily",
    cached: true
  }, {
    headers: { "Cache-Control": "s-maxage=86400, stale-while-revalidate=604800" }
  });
}
