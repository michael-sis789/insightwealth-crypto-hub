import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const cacheDir = path.join(process.cwd(), "data", "cache");
await mkdir(cacheDir, { recursive: true });

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "InsightWealthCryptoHubCron/1.0"
    }
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

async function safely(name, fn) {
  try {
    const value = await fn();
    const payload = { ok: true, source: value.source, lastUpdated: new Date().toISOString(), value: value.value };
    await writeFile(path.join(cacheDir, `${name}.json`), `${JSON.stringify(payload, null, 2)}\n`, "utf8");
    console.log(`updated ${name}`);
    return payload;
  } catch (error) {
    const payload = { ok: false, lastUpdated: new Date().toISOString(), error: error instanceof Error ? error.message : String(error) };
    await writeFile(path.join(cacheDir, `${name}.json`), `${JSON.stringify(payload, null, 2)}\n`, "utf8");
    console.log(`failed ${name}: ${payload.error}`);
    return payload;
  }
}

const market = await safely("btc-market", async () => {
  try {
    const rows = await fetchJson("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&price_change_percentage=7d");
    const btc = rows[0];
    if (!btc) throw new Error("CoinGecko returned no bitcoin row");
    return {
      source: "CoinGecko API",
      value: {
        priceUsd: btc.current_price ?? null,
        change24hPct: btc.price_change_percentage_24h ?? null,
        change7dPct: btc.price_change_percentage_7d_in_currency ?? null,
        marketCapUsd: btc.market_cap ?? null
      }
    };
  } catch (error) {
    const ticker = await fetchJson("https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT");
    return {
      source: `Binance public ticker fallback (${error instanceof Error ? error.message : "CoinGecko failed"})`,
      value: {
        priceUsd: Number(ticker.lastPrice),
        change24hPct: Number(ticker.priceChangePercent),
        change7dPct: null,
        marketCapUsd: null
      }
    };
  }
});

const fearGreed = await safely("fear-greed", async () => {
  const payload = await fetchJson("https://api.alternative.me/fng/?limit=1&format=json");
  const row = payload.data?.[0];
  if (!row) throw new Error("Alternative.me returned no data");
  return {
    source: "Alternative.me Fear & Greed API",
    value: {
      value: Number(row.value),
      classification: row.value_classification,
      timestamp: new Date(Number(row.timestamp) * 1000).toISOString()
    }
  };
});

const funding = await safely("funding-rate", async () => {
  const rows = await fetchJson("https://fapi.binance.com/fapi/v1/fundingRate?symbol=BTCUSDT&limit=1");
  const row = rows[0];
  if (!row) throw new Error("Binance returned no funding row");
  return {
    source: "Binance USD-M Futures fundingRate API",
    value: {
      symbol: row.symbol,
      rate: Number(row.fundingRate),
      fundingTime: new Date(row.fundingTime).toISOString()
    }
  };
});

const etf = JSON.parse(await readFile(path.join(process.cwd(), "data", "etf-flow.json"), "utf8"));
const onchain = JSON.parse(await readFile(path.join(process.cwd(), "data", "onchain-indicators.json"), "utf8"));

function scoreFromStatus(status, bullish, neutral = 0, bearish = -bullish) {
  if (status === "Bullish") return bullish;
  if (status === "Bearish") return bearish;
  return neutral;
}

let score = 50;
if (market.ok && typeof market.value.change24hPct === "number") score += market.value.change24hPct > 0.5 ? 12 : market.value.change24hPct < -0.5 ? -12 : 0;
if (fearGreed.ok && typeof fearGreed.value.value === "number") score += fearGreed.value.value <= 25 ? 8 : fearGreed.value.value >= 75 ? -8 : 3;
if (funding.ok && typeof funding.value.rate === "number") score += funding.value.rate > 0.0003 ? -8 : funding.value.rate < -0.0001 ? 6 : 4;
score += scoreFromStatus(etf.status, 15);
score += scoreFromStatus(onchain.indicators.mvrv.status, 8, 4, -8);
score += scoreFromStatus(onchain.indicators.nupl.status, 7, 3, -7);
score += scoreFromStatus(onchain.indicators.puell.status, 5, 2, -5);

const bullScore = {
  ok: true,
  source: "Calculated from latest cached API data plus daily ETF/on-chain JSON",
  lastUpdated: new Date().toISOString(),
  value: Math.max(0, Math.min(100, Math.round(score)))
};

await writeFile(path.join(cacheDir, "bull-score.json"), `${JSON.stringify(bullScore, null, 2)}\n`, "utf8");
console.log(`bull score recalculated: ${bullScore.value}`);
