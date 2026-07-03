import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const filePath = path.join(root, "data", "onchain-indicators.json");

const today = new Date().toISOString().slice(0, 10);

function statusFor(metric, value) {
  if (typeof value !== "number" || Number.isNaN(value)) return "Unavailable";

  if (metric === "mvrv") {
    if (value < 1.2) return "Bullish";
    if (value > 2.4) return "Bearish";
    return "Neutral";
  }

  if (metric === "nupl") {
    if (value < 0.25) return "Bullish";
    if (value > 0.65) return "Bearish";
    return "Neutral";
  }

  if (metric === "puell") {
    if (value < 0.7) return "Bullish";
    if (value > 2.5) return "Bearish";
    return "Neutral";
  }

  return "Neutral";
}

function explanationFor(metric, value) {
  const explanations = {
    mvrv: `MVRV衡量BTC市值相對已實現市值的位置。目前讀數為${value}，用於判斷長期估值溫度，不適合單獨作為短線交易訊號。`,
    nupl: `NUPL衡量市場整體未實現盈虧。目前讀數為${value}，越高代表獲利盤越多，越低代表市場壓力更明顯。`,
    puell: `Puell Multiple衡量礦工日收入相對一年平均值。目前讀數為${value}，用於觀察礦工收入與週期壓力。`,
    realizedPrice: `Realized Price代表鏈上成本基礎的近似值。目前讀數為${value}美元，作為長期估值背景資料。`
  };

  return explanations[metric] ?? "Updated daily from verified on-chain source.";
}

async function readExisting() {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "InsightWealthCryptoHub/1.0"
    }
  });

  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

async function fetchBlockchainMvrv() {
  const url = "https://api.blockchain.info/charts/mvrv?timespan=30days&format=json&sampled=false";
  const payload = await fetchJson(url);
  if (payload.status !== "ok" || !Array.isArray(payload.values) || payload.values.length === 0) {
    throw new Error(`Blockchain.com mvrv unavailable: ${payload.status ?? "unknown"}`);
  }

  const latest = payload.values[payload.values.length - 1];
  if (typeof latest.y !== "number") throw new Error("Blockchain.com mvrv latest value missing");

  return {
    value: Number(latest.y.toFixed(4)),
    date: new Date(latest.x * 1000).toISOString().slice(0, 10),
    source: "Blockchain.com",
    sourceUrl: url
  };
}

async function fetchBgeometrics(metric, endpoint, valueKey) {
  const url = `https://bitcoin-data.com/v1/${endpoint}/last`;
  const payload = await fetchJson(url);
  const value = Number(payload[valueKey]);
  if (!Number.isFinite(value)) throw new Error(`BGeometrics ${endpoint} value missing`);

  return {
    value: Number(value.toFixed(metric === "realizedPrice" ? 2 : 4)),
    date: payload.d ?? today,
    source: "BGeometrics",
    sourceUrl: url
  };
}

async function fetchCoinMetricsMvrv() {
  const url = "https://community-api.coinmetrics.io/v4/timeseries/asset-metrics?assets=btc&metrics=CapMVRVCur&frequency=1d&page_size=1";
  const payload = await fetchJson(url);
  const row = payload.data?.[0];
  const value = Number(row?.CapMVRVCur);
  if (!Number.isFinite(value)) throw new Error("Coin Metrics CapMVRVCur missing");

  return {
    value: Number(value.toFixed(4)),
    date: row.time.slice(0, 10),
    source: "Coin Metrics Community API",
    sourceUrl: url
  };
}

function applyIndicator(existing, key, result) {
  existing.indicators[key] = {
    ...existing.indicators[key],
    value: result.value,
    date: result.date,
    source: result.source,
    sourceUrl: result.sourceUrl,
    updateFrequency: "Updated daily",
    status: statusFor(key, result.value),
    explanation: explanationFor(key, result.value)
  };
}

async function tryUpdate(label, updater) {
  try {
    const result = await updater();
    console.log(`Updated ${label}:`, result);
    return result;
  } catch (error) {
    console.warn(`Skipped ${label}: ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
}

async function main() {
  const existing = await readExisting();
  existing.lastUpdated = today;
  existing.label = "Updated daily / manually verified";
  existing.notes = "Daily Bitcoin on-chain indicators. Never replace unavailable values with mock data.";

  const blockchainMvrv = await tryUpdate("Blockchain.com MVRV", fetchBlockchainMvrv);
  const bgeometricsMvrv = blockchainMvrv ? null : await tryUpdate("BGeometrics MVRV", () => fetchBgeometrics("mvrv", "mvrv", "mvrv"));
  const coinMetricsMvrv = blockchainMvrv || bgeometricsMvrv ? null : await tryUpdate("Coin Metrics MVRV fallback", fetchCoinMetricsMvrv);
  const mvrv = blockchainMvrv ?? bgeometricsMvrv ?? coinMetricsMvrv;
  if (mvrv) applyIndicator(existing, "mvrv", mvrv);

  const nupl = await tryUpdate("BGeometrics NUPL", () => fetchBgeometrics("nupl", "nupl", "nupl"));
  if (nupl) applyIndicator(existing, "nupl", nupl);

  const puell = await tryUpdate("BGeometrics Puell Multiple", () => fetchBgeometrics("puell", "puell-multiple", "puellMultiple"));
  if (puell) applyIndicator(existing, "puell", puell);

  const realizedPrice = await tryUpdate("BGeometrics Realized Price", () => fetchBgeometrics("realizedPrice", "realized-price", "realizedPrice"));
  if (realizedPrice) applyIndicator(existing, "realizedPrice", realizedPrice);

  await fs.writeFile(filePath, `${JSON.stringify(existing, null, 2)}\n`, "utf8");
  console.log(`Saved ${path.relative(root, filePath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
