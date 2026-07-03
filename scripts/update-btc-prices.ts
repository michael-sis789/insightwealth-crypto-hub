import { promises as fs } from "node:fs";
import path from "node:path";

type PriceRow = {
  date: string;
  usd: number;
  myr: number;
};

type CoinGeckoMarketChart = {
  prices: [number, number][];
};

const root = process.cwd();
const dailyPath = path.join(root, "data", "btc-daily-prices.json");
const monthlyPath = path.join(root, "data", "btc-monthly-prices.json");
const metaPath = path.join(root, "data", "btc-daily-prices-meta.json");
const sourceUrl = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart";

function isoDate(timestamp: number) {
  return new Date(timestamp).toISOString().slice(0, 10);
}

function todayUtc() {
  return new Date().toISOString().slice(0, 10);
}

async function readExistingPrices() {
  try {
    const raw = await fs.readFile(dailyPath, "utf8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((row) => row?.date && typeof row.usd === "number" && typeof row.myr === "number") as PriceRow[];
  } catch {
    return [];
  }
}

async function fetchJson(url: string): Promise<CoinGeckoMarketChart> {
  const res = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "InsightWealthCryptoHub/1.0"
    }
  });

  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return (await res.json()) as CoinGeckoMarketChart;
}

async function fetchPrices(currency: "usd" | "myr") {
  const url = `${sourceUrl}?vs_currency=${currency}&days=365&interval=daily&precision=2`;

  const payload = await fetchJson(url);
  return new Map(payload.prices.map(([timestamp, price]) => [isoDate(timestamp), Number(price.toFixed(2))]));
}

function mergePrices(existing: PriceRow[], usd: Map<string, number>, myr: Map<string, number>) {
  const byDate = new Map(existing.map((row) => [row.date, row]));
  let added = 0;

  for (const [date, usdPrice] of usd.entries()) {
    const myrPrice = myr.get(date);
    if (typeof myrPrice !== "number") continue;
    if (byDate.has(date)) continue;
    added += 1;
    byDate.set(date, { date, usd: usdPrice, myr: myrPrice });
  }

  return {
    rows: [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date)),
    added
  };
}

function buildMonthly(rows: PriceRow[]) {
  const byMonth = new Map<string, PriceRow>();
  for (const row of rows) {
    byMonth.set(row.date.slice(0, 7), row);
  }
  return [...byMonth.values()].sort((a, b) => a.date.localeCompare(b.date));
}

async function writeJson(filePath: string, value: unknown) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function main() {
  const existing = await readExistingPrices();
  const latestExisting = existing.at(-1)?.date;

  if (latestExisting === todayUtc()) {
    const monthly = buildMonthly(existing);
    await writeJson(monthlyPath, monthly);
    await writeJson(metaPath, {
      lastUpdated: new Date().toISOString(),
      source: "CoinGecko",
      sourceUrl,
      updateFrequency: "Daily cached update",
      count: existing.length,
      from: existing[0]?.date ?? null,
      to: latestExisting,
      added: 0,
      note: "No missing dates detected."
    });
    console.log("BTC daily prices already up to date.");
    return;
  }

  const [usd, myr] = await Promise.all([fetchPrices("usd"), fetchPrices("myr")]);
  const { rows, added } = mergePrices(existing, usd, myr);

  if (rows.length === 0) throw new Error("CoinGecko returned no usable BTC price rows.");

  await writeJson(dailyPath, rows);
  await writeJson(monthlyPath, buildMonthly(rows));
  await writeJson(metaPath, {
    lastUpdated: new Date().toISOString(),
    source: "CoinGecko",
    sourceUrl,
    updateFrequency: "Daily cached update",
    count: rows.length,
    from: rows[0]?.date ?? null,
    to: rows.at(-1)?.date ?? null,
    added
  });

  console.log(`Saved ${rows.length} daily BTC price rows. Added ${added} new dates.`);
}

main().catch(async (error) => {
  console.error(`BTC price update failed safely: ${error instanceof Error ? error.message : String(error)}`);
  try {
    const existing = await readExistingPrices();
    await writeJson(metaPath, {
      lastUpdated: new Date().toISOString(),
      source: "CoinGecko",
      sourceUrl,
      updateFrequency: "Daily cached update",
      count: existing.length,
      from: existing[0]?.date ?? null,
      to: existing.at(-1)?.date ?? null,
      error: error instanceof Error ? error.message : String(error)
    });
  } catch {
    // Keep the original failure visible in stderr without masking it.
  }
  process.exitCode = 1;
});
