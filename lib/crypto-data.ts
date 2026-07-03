import etfFlowJson from "@/data/etf-flow.json";
import dailyBrief from "@/data/daily-brief.json";
import events from "@/data/events.json";
import onchainJson from "@/data/onchain-indicators.json";
import { formatTimestamp, getCached, nowIso, readJsonFile } from "@/lib/cache";
import type { MarketDataPoint, Metric, MetricStatus, ScoreRow, Signal } from "@/lib/types";

type BtcMarket = {
  priceUsd: number | null;
  change24hPct: number | null;
  change7dPct: number | null;
  marketCapUsd: number | null;
};

type FearGreed = {
  value: number;
  classification: string;
  timestamp: string;
};

type FundingRate = {
  symbol: string;
  rate: number;
  fundingTime: string;
};

type OnchainIndicator = {
  value: number | null;
  date: string;
  source: string;
  sourceUrl?: string;
  updateFrequency: string;
  status: MetricStatus;
  explanation: string;
};

const unavailable = "Data temporarily unavailable";
const comingSoon = "Coming Soon";

export function getLastUpdated() {
  return formatTimestamp(nowIso());
}

function money(value: number | null, compact = false) {
  if (value === null || Number.isNaN(value)) return unavailable;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: value > 1000 ? 0 : 2
  }).format(value);
}

function pct(value: number | null, digits = 2) {
  if (value === null || Number.isNaN(value)) return unavailable;
  return `${value >= 0 ? "+" : ""}${value.toFixed(digits)}%`;
}

function ratePct(value: number | null) {
  if (value === null || Number.isNaN(value)) return unavailable;
  return `${(value * 100).toFixed(4)}%`;
}

function statusFromPct(value: number | null, bullishAt = 0, bearishAt = 0): MetricStatus {
  if (value === null || Number.isNaN(value)) return "Unavailable";
  if (value > bullishAt) return "Bullish";
  if (value < bearishAt) return "Bearish";
  return "Neutral";
}

function signalFromStatus(status: MetricStatus): Signal {
  if (status === "Bullish") return "bullish";
  if (status === "Bearish" || status === "Unavailable") return "bearish";
  return "neutral";
}

function metric(input: Omit<Metric, "signal">): Metric {
  return { ...input, signal: signalFromStatus(input.status) };
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "InsightWealthCryptoHub/1.0"
    },
    cache: "no-store"
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return (await res.json()) as T;
}

async function readCachedPoint<T>(name: string, source: string): Promise<MarketDataPoint<T> | null> {
  try {
    const cached = await readJsonFile<{ ok: boolean; value: T; source?: string; lastUpdated?: string; error?: string }>(`data/cache/${name}.json`);
    if (!cached.ok || !cached.value) return null;
    return {
      ok: true,
      value: cached.value,
      source: `${cached.source ?? source} (cached JSON fallback)`,
      lastUpdated: cached.lastUpdated ?? nowIso(),
      cached: true,
      error: cached.error
    };
  } catch {
    return null;
  }
}

export async function getBtcMarket(): Promise<MarketDataPoint<BtcMarket>> {
  try {
    const result = await getCached("btc-market", 60, async () => {
      try {
        const rows = await fetchJson<Array<{
          current_price: number;
          price_change_percentage_24h: number | null;
          price_change_percentage_7d_in_currency: number | null;
          market_cap: number | null;
        }>>("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&price_change_percentage=7d");
        const btc = rows[0];
        if (!btc) throw new Error("CoinGecko returned no bitcoin row");
        return {
          value: {
            priceUsd: btc.current_price ?? null,
            change24hPct: btc.price_change_percentage_24h ?? null,
            change7dPct: btc.price_change_percentage_7d_in_currency ?? null,
            marketCapUsd: btc.market_cap ?? null
          },
          source: "CoinGecko API"
        };
      } catch (coinGeckoError) {
        const ticker = await fetchJson<{ lastPrice: string; priceChangePercent: string }>("https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT");
        return {
          value: {
            priceUsd: Number(ticker.lastPrice),
            change24hPct: Number(ticker.priceChangePercent),
            change7dPct: null,
            marketCapUsd: null
          },
          source: `Binance public ticker fallback (${coinGeckoError instanceof Error ? coinGeckoError.message : "CoinGecko failed"})`
        };
      }
    });

    return {
      ok: true,
      value: result.value.value,
      source: result.value.source,
      lastUpdated: result.timestamp,
      cached: result.cached
    };
  } catch (error) {
    const cached = await readCachedPoint<BtcMarket>("btc-market", "CoinGecko API / Binance fallback");
    if (cached) return cached;
    return { ok: false, value: null, source: "CoinGecko API / Binance fallback", lastUpdated: nowIso(), cached: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function getFearGreed(): Promise<MarketDataPoint<FearGreed>> {
  try {
    const result = await getCached("fear-greed", 60 * 60, async () => {
      const payload = await fetchJson<{ data: Array<{ value: string; value_classification: string; timestamp: string }> }>("https://api.alternative.me/fng/?limit=1&format=json");
      const row = payload.data[0];
      if (!row) throw new Error("Alternative.me returned no data");
      return {
        value: {
          value: Number(row.value),
          classification: row.value_classification,
          timestamp: new Date(Number(row.timestamp) * 1000).toISOString()
        },
        source: "Alternative.me Fear & Greed API"
      };
    });

    return { ok: true, value: result.value.value, source: result.value.source, lastUpdated: result.timestamp, cached: result.cached };
  } catch (error) {
    const cached = await readCachedPoint<FearGreed>("fear-greed", "Alternative.me Fear & Greed API");
    if (cached) return cached;
    return { ok: false, value: null, source: "Alternative.me Fear & Greed API", lastUpdated: nowIso(), cached: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function getFundingRate(): Promise<MarketDataPoint<FundingRate>> {
  try {
    const result = await getCached("funding-rate", 5 * 60, async () => {
      const rows = await fetchJson<Array<{ symbol: string; fundingRate: string; fundingTime: number }>>("https://fapi.binance.com/fapi/v1/fundingRate?symbol=BTCUSDT&limit=1");
      const row = rows[0];
      if (!row) throw new Error("Binance returned no funding row");
      return {
        value: {
          symbol: row.symbol,
          rate: Number(row.fundingRate),
          fundingTime: new Date(row.fundingTime).toISOString()
        },
        source: "Binance USD-M Futures fundingRate API"
      };
    });

    return { ok: true, value: result.value.value, source: result.value.source, lastUpdated: result.timestamp, cached: result.cached };
  } catch (error) {
    const cached = await readCachedPoint<FundingRate>("funding-rate", "Binance USD-M Futures fundingRate API");
    if (cached) return cached;
    return { ok: false, value: null, source: "Binance USD-M Futures fundingRate API", lastUpdated: nowIso(), cached: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export function getEtfFlowData() {
  return etfFlowJson;
}

export function getOnchainIndicators(): Record<"mvrv" | "nupl" | "puell", OnchainIndicator> {
  return onchainJson.indicators as Record<"mvrv" | "nupl" | "puell", OnchainIndicator>;
}

function isOlderThanDays(date: string | undefined, days: number) {
  if (!date) return true;
  const parsed = new Date(`${date}T00:00:00.000Z`).getTime();
  if (Number.isNaN(parsed)) return true;
  return Date.now() - parsed > days * 24 * 60 * 60 * 1000;
}

function onchainMetric(indicator: OnchainIndicator, label: string, id: string): Metric {
  const stale = indicator.value !== null && isOlderThanDays(indicator.date, 7);
  return metric({
    id,
    label,
    value: indicator.value === null ? comingSoon : String(indicator.value),
    change: stale ? "Stale data" : indicator.updateFrequency,
    status: stale ? "Stale" : indicator.status,
    lastUpdated: indicator.date,
    source: indicator.source,
    sourceUrl: indicator.sourceUrl,
    updateFrequency: indicator.updateFrequency,
    explanation: stale ? `${indicator.explanation} 此資料已超過7天，請先執行 npm run update:onchain 或人工確認後再使用。` : indicator.explanation
  });
}

function dcaOpinionFromScore(score: number, fearValue: number | null) {
  if (score >= 70) return "偏多但避免追高";
  if (score <= 40) return fearValue !== null && fearValue <= 25 ? "恐慌區可分批DCA" : "降低倉位節奏";
  return "維持紀律DCA";
}

export async function getBtcDashboardData() {
  const [market, fearGreed, funding] = await Promise.all([getBtcMarket(), getFearGreed(), getFundingRate()]);
  const etf = getEtfFlowData();
  const onchain = getOnchainIndicators();
  const bullModel = await getBullBearModel();
  const dcaOpinion = dcaOpinionFromScore(bullModel.bullProbability, fearGreed.value?.value ?? null);

  const metrics: Metric[] = [
    metric({
      id: "price",
      label: "BTC Price",
      value: market.ok ? money(market.value?.priceUsd ?? null) : unavailable,
      change: market.ok ? `24h ${pct(market.value?.change24hPct ?? null)}` : unavailable,
      status: statusFromPct(market.value?.change24hPct ?? null),
      lastUpdated: formatTimestamp(market.lastUpdated),
      source: `${market.source}${market.cached ? " (cached)" : ""}`,
      explanation: market.ok ? "BTC現貨價格來自CoinGecko；若CoinGecko不可用，價格與24h變化回退到Binance公開ticker。" : unavailable
    }),
    metric({
      id: "fearGreed",
      label: "Fear & Greed",
      value: fearGreed.ok ? String(fearGreed.value?.value) : unavailable,
      change: fearGreed.ok ? fearGreed.value?.classification ?? "" : unavailable,
      status: fearGreed.value ? (fearGreed.value.value >= 75 ? "Bearish" : fearGreed.value.value <= 25 ? "Bullish" : "Neutral") : "Unavailable",
      lastUpdated: formatTimestamp(fearGreed.lastUpdated),
      source: `${fearGreed.source}${fearGreed.cached ? " (cached)" : ""}`,
      sourceUrl: "https://alternative.me/crypto/fear-and-greed-index/",
      updateFrequency: "Auto, about every 6 hours / daily source update",
      explanation: fearGreed.ok ? "Alternative.me情緒指數每日更新，極端恐懼常代表市場壓力，極端貪婪則提高追高風險。" : unavailable
    }),
    metric({
      id: "etfFlow",
      label: "ETF Flow",
      value: etf.totalDailyNetFlow,
      change: etf.streak,
      status: etf.status as MetricStatus,
      lastUpdated: etf.lastUpdated,
      source: etf.source,
      updateFrequency: "Updated daily",
      explanation: `${etf.interpretation} ETF資料不標示為即時，適合作為每日資金方向判斷。`
    }),
    metric({
      id: "bullScore",
      label: "Bull Score",
      value: `${bullModel.bullProbability}/100`,
      change: bullModel.status,
      status: bullModel.status,
      lastUpdated: getLastUpdated(),
      source: "Insight Wealth model",
      updateFrequency: "Auto recalculated from latest available data",
      explanation: "綜合BTC價格、Fear & Greed、ETF Flow、Funding與每日鏈上資料，回答長期BTC投資者今天應該知道的市場偏向。"
    }),
    metric({
      id: "dcaOpinion",
      label: "DCA Opinion",
      value: dcaOpinion,
      change: "Long-term BTC view",
      status: bullModel.bullProbability >= 70 ? "Neutral" : bullModel.bullProbability <= 40 ? "Bullish" : "Neutral",
      lastUpdated: getLastUpdated(),
      source: "Insight Wealth model",
      updateFrequency: "Auto recalculated from Bull Score",
      explanation: "定投觀點優先考慮風險管理與長期紀律，不鼓勵all-in、恐慌賣出或追漲殺跌。"
    }),
    metric({
      id: "change7d",
      label: "7日變化",
      value: market.ok ? pct(market.value?.change7dPct ?? null) : unavailable,
      change: "CoinGecko 7d",
      status: statusFromPct(market.value?.change7dPct ?? null, 1, -1),
      lastUpdated: formatTimestamp(market.lastUpdated),
      source: `${market.source}${market.cached ? " (cached)" : ""}`,
      explanation: market.value?.change7dPct === null ? "Binance fallback不提供7日變化，因此此欄暫時不可用。" : "7日價格趨勢用於觀察短中期動能。"
    }),
    metric({
      id: "marketCap",
      label: "Market Cap",
      value: market.ok ? money(market.value?.marketCapUsd ?? null, true) : unavailable,
      change: "Auto update",
      status: market.value?.marketCapUsd ? "Neutral" : "Unavailable",
      lastUpdated: formatTimestamp(market.lastUpdated),
      source: `${market.source}${market.cached ? " (cached)" : ""}`,
      explanation: market.value?.marketCapUsd === null ? "Binance fallback不提供市值，因此不顯示假數字。" : "市值用於衡量BTC整體資產規模。"
    }),
    metric({
      id: "funding",
      label: "Funding Rate",
      value: funding.ok ? ratePct(funding.value?.rate ?? null) : unavailable,
      change: funding.ok ? "BTCUSDT perpetual" : unavailable,
      status: funding.value ? (funding.value.rate > 0.0003 ? "Bearish" : funding.value.rate < -0.0001 ? "Bullish" : "Neutral") : "Unavailable",
      lastUpdated: formatTimestamp(funding.lastUpdated),
      source: `${funding.source}${funding.cached ? " (cached)" : ""}`,
      explanation: funding.ok ? "資金費率越高，代表多頭槓桿越擁擠；負費率則代表空頭壓力較高。" : unavailable
    }),
    onchainMetric(onchain.mvrv, "MVRV", "mvrv"),
    onchainMetric(onchain.nupl, "NUPL", "nupl"),
    onchainMetric(onchain.puell, "Puell Multiple", "puell")
  ];

  return {
    lastUpdated: getLastUpdated(),
    metrics,
    chart: [
      { date: "Now", price: market.value?.priceUsd ?? 0, invested: 0, value: market.value?.priceUsd ?? 0 }
    ]
  };
}

function scoreFromStatus(status: MetricStatus, bullish: number, neutral = 0, bearish = -bullish) {
  if (status === "Bullish") return bullish;
  if (status === "Bearish") return bearish;
  if (status === "Unavailable" || status === "Stale") return 0;
  return neutral;
}

function onchainScoreStatus(indicator: OnchainIndicator) {
  if (indicator.value !== null && isOlderThanDays(indicator.date, 7)) return "Stale" as const;
  return indicator.status;
}

export async function getBullBearModel() {
  const [market, fearGreed, funding] = await Promise.all([getBtcMarket(), getFearGreed(), getFundingRate()]);
  const etf = getEtfFlowData();
  const onchain = getOnchainIndicators();

  const rows: ScoreRow[] = [
    {
      indicator: "BTC Price Trend",
      currentValue: pct(market.value?.change24hPct ?? null),
      signal: statusFromPct(market.value?.change24hPct ?? null, 0.5, -0.5),
      score: scoreFromStatus(statusFromPct(market.value?.change24hPct ?? null, 0.5, -0.5), 12),
      explanation: market.ok ? "使用CoinGecko或Binance最新24h價格變化。" : unavailable
    },
    {
      indicator: "Fear & Greed",
      currentValue: fearGreed.ok ? `${fearGreed.value?.value} (${fearGreed.value?.classification})` : unavailable,
      signal: fearGreed.value ? (fearGreed.value.value <= 25 ? "Bullish" : fearGreed.value.value >= 75 ? "Bearish" : "Neutral") : "Unavailable",
      score: fearGreed.value ? (fearGreed.value.value <= 25 ? 8 : fearGreed.value.value >= 75 ? -8 : 3) : 0,
      explanation: "情緒極端時反向風險更高，非單獨交易訊號。"
    },
    {
      indicator: "ETF Flow",
      currentValue: etf.totalDailyNetFlow,
      signal: etf.status as MetricStatus,
      score: scoreFromStatus(etf.status as MetricStatus, 15),
      explanation: "ETF資金流來自每日手動JSON更新，不標示為即時。"
    },
    {
      indicator: "MVRV",
      currentValue: onchain.mvrv.value === null ? comingSoon : String(onchain.mvrv.value),
      signal: onchainScoreStatus(onchain.mvrv),
      score: scoreFromStatus(onchainScoreStatus(onchain.mvrv), 8, 4, -8),
      explanation: onchain.mvrv.explanation
    },
    {
      indicator: "NUPL",
      currentValue: onchain.nupl.value === null ? comingSoon : String(onchain.nupl.value),
      signal: onchainScoreStatus(onchain.nupl),
      score: scoreFromStatus(onchainScoreStatus(onchain.nupl), 7, 3, -7),
      explanation: onchain.nupl.explanation
    },
    {
      indicator: "Puell Multiple",
      currentValue: onchain.puell.value === null ? comingSoon : String(onchain.puell.value),
      signal: onchainScoreStatus(onchain.puell),
      score: scoreFromStatus(onchainScoreStatus(onchain.puell), 5, 2, -5),
      explanation: onchain.puell.explanation
    },
    {
      indicator: "Funding Rate",
      currentValue: funding.ok ? ratePct(funding.value?.rate ?? null) : unavailable,
      signal: funding.value ? (funding.value.rate > 0.0003 ? "Bearish" : funding.value.rate < -0.0001 ? "Bullish" : "Neutral") : "Unavailable",
      score: funding.value ? (funding.value.rate > 0.0003 ? -8 : funding.value.rate < -0.0001 ? 6 : 4) : 0,
      explanation: "Funding由Binance public futures API更新，正費率過高代表槓桿擁擠。"
    }
  ];

  const rawScore = 50 + rows.reduce((sum, row) => sum + row.score, 0);
  const bullProbability = Math.max(0, Math.min(100, Math.round(rawScore)));
  const status: MetricStatus = bullProbability >= 65 ? "Bullish" : bullProbability <= 45 ? "Bearish" : "Neutral";
  return {
    rows,
    bullProbability,
    bearProbability: 100 - bullProbability,
    status
  };
}

export function getEvents() {
  return events;
}

export function getDailyBrief() {
  return dailyBrief;
}
