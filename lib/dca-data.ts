import btcDailyPrices from "@/data/btc-daily-prices.json";
import btcPriceMeta from "@/data/btc-daily-prices-meta.json";

export type DcaPoint = {
  date: string;
  price: number;
  invested: number;
  value: number;
};

type PriceRow = {
  date: string;
  usd: number;
  myr: number;
};

const priceRows = (btcDailyPrices as PriceRow[]).filter((row) => row.date && typeof row.usd === "number" && typeof row.myr === "number");

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function dateMs(date: string) {
  return new Date(`${date}T00:00:00.000Z`).getTime();
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function addMonths(date: Date, months: number) {
  const next = new Date(date);
  next.setUTCMonth(next.getUTCMonth() + months);
  return next;
}

function stepDate(date: Date, frequency: string) {
  if (frequency === "Daily") return addDays(date, 1);
  if (frequency === "Weekly") return addDays(date, 7);
  return addMonths(date, 1);
}

function strategyMultiplier(strategy: string, price: number, previousPrice: number | null, index: number) {
  if (strategy === "Buy more when BTC drops 20%" && previousPrice && price <= previousPrice * 0.8) return 1.5;
  if (strategy === "Buy more when Fear & Greed is low" && index % 5 === 2) return 1.35;
  if (strategy === "DCA in and DCA out" && index > 0 && index % 8 === 0) return 0.6;
  return 1;
}

function isInRange(row: PriceRow, startDate: string, endDate: string) {
  return row.date >= startDate && row.date <= endDate;
}

function nearestPrice(targetDate: string, rows: PriceRow[], currency: string) {
  const target = dateMs(targetDate);
  let nearest: PriceRow | null = null;
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (const row of rows) {
    const distance = Math.abs(dateMs(row.date) - target);
    if (distance < nearestDistance) {
      nearest = row;
      nearestDistance = distance;
    }
  }

  if (!nearest) return null;
  return currency === "MYR" ? nearest.myr : nearest.usd;
}

export function getBtcPriceMeta() {
  return btcPriceMeta as {
    lastUpdated: string | null;
    source: string;
    sourceUrl: string;
    updateFrequency: string;
    count: number;
    from: string | null;
    to: string | null;
  };
}

export function formatPriceDataUpdatedAt() {
  const meta = getBtcPriceMeta();
  if (!meta.lastUpdated) return "暂无价格数据";
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Kuala_Lumpur",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(meta.lastUpdated));
}

export function getDcaSeries(amount: number, frequency: string, startDate: string, endDate: string, strategy: string, currency: string): DcaPoint[] {
  const start = new Date(`${startDate}T00:00:00.000Z`);
  const end = new Date(`${endDate}T00:00:00.000Z`);
  if (!Number.isFinite(amount) || amount <= 0 || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) return [];

  const selectedRows = priceRows.filter((row) => isInRange(row, startDate, endDate));
  if (selectedRows.length === 0) return [];

  const series: DcaPoint[] = [];
  let btc = 0;
  let invested = 0;
  let current = start;
  let previousPrice: number | null = null;
  let index = 0;

  while (current <= end && index < 10000) {
    const currentDate = isoDate(current);
    const price = nearestPrice(currentDate, selectedRows, currency);
    if (!price) break;

    const contribution = amount * strategyMultiplier(strategy, price, previousPrice, index);
    invested += contribution;
    btc += contribution / price;
    series.push({
      date: currentDate,
      price: Math.round(price),
      invested: Math.round(invested),
      value: Math.round(btc * price)
    });
    previousPrice = price;
    current = stepDate(current, frequency);
    index += 1;
  }

  const finalPrice = nearestPrice(endDate, selectedRows, currency);
  if (series.length > 0 && finalPrice) {
    const latest = series[series.length - 1];
    series[series.length - 1] = {
      ...latest,
      date: endDate,
      price: Math.round(finalPrice),
      value: Math.round(btc * finalPrice)
    };
  }

  return series;
}

export function calculateMaxDrawdown(series: DcaPoint[]) {
  let peak = 0;
  let maxDrawdown = 0;
  for (const point of series) {
    peak = Math.max(peak, point.value);
    if (peak > 0) maxDrawdown = Math.min(maxDrawdown, (point.value - peak) / peak);
  }
  return maxDrawdown * 100;
}

export function calculateBestWorstMonth(series: DcaPoint[]) {
  if (series.length < 2) return { bestMonth: "N/A", worstMonth: "N/A" };

  let best = { date: series[1].date.slice(0, 7), change: -Infinity };
  let worst = { date: series[1].date.slice(0, 7), change: Infinity };
  for (let index = 1; index < series.length; index += 1) {
    const previous = series[index - 1];
    const current = series[index];
    if (previous.value <= 0) continue;
    const change = (current.value - previous.value) / previous.value;
    if (change > best.change) best = { date: current.date.slice(0, 7), change };
    if (change < worst.change) worst = { date: current.date.slice(0, 7), change };
  }

  return { bestMonth: best.date, worstMonth: worst.date };
}
