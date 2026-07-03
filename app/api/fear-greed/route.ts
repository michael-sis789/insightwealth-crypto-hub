import { NextResponse } from "next/server";
import { getFearGreed } from "@/lib/crypto-data";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getFearGreed();
  return NextResponse.json(data, {
    status: data.ok ? 200 : 503,
    headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=21600" }
  });
}
