export type Signal = "bullish" | "neutral" | "bearish";
export type MetricStatus = "Bullish" | "Neutral" | "Bearish" | "Unavailable" | "Stale";

export type Metric = {
  id: string;
  label: string;
  value: string;
  change: string;
  status: MetricStatus;
  signal: Signal;
  lastUpdated: string;
  source: string;
  sourceUrl?: string;
  updateFrequency?: string;
  explanation: string;
};

export type ScoreRow = {
  indicator: string;
  currentValue: string;
  signal: MetricStatus;
  score: number;
  explanation: string;
};

export type MarketDataPoint<T> = {
  ok: boolean;
  value: T | null;
  source: string;
  lastUpdated: string;
  cached: boolean;
  error?: string;
};
