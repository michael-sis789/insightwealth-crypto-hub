import { NextResponse } from "next/server";
import { getBtcMarket } from "@/lib/crypto-data";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getBtcMarket();
  return NextResponse.json(data, {
    status: data.ok ? 200 : 503,
    headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=120" }
  });
}
