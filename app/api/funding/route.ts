import { NextResponse } from "next/server";
import { getFundingRate } from "@/lib/crypto-data";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getFundingRate();
  return NextResponse.json(data, {
    status: data.ok ? 200 : 503,
    headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=900" }
  });
}
