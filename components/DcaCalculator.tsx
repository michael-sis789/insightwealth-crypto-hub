"use client";

import { useMemo, useState } from "react";
import { Share2 } from "lucide-react";
import { calculateBestWorstMonth, calculateMaxDrawdown, formatPriceDataUpdatedAt, getBtcPriceMeta, getDcaSeries } from "@/lib/dca-data";
import { ChartCard } from "@/components/ChartCard";

function sanitizeAmountInput(value: string) {
  return value.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1");
}

function normalizeAmountInput(value: string) {
  if (!value) return "";
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return "";
  return String(numericValue);
}

function formatNumber(value: number, maximumFractionDigits = 0) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(value);
}

export function DcaCalculator() {
  const priceMeta = getBtcPriceMeta();
  const [startDate, setStartDate] = useState(priceMeta.from ?? "2025-07-03");
  const [endDate, setEndDate] = useState(priceMeta.to ?? "2026-07-02");
  const [amountInput, setAmountInput] = useState("500");
  const [currency, setCurrency] = useState("USD");
  const [frequency, setFrequency] = useState("Monthly");
  const [strategy, setStrategy] = useState("Fixed DCA");
  const priceDataUpdatedAt = formatPriceDataUpdatedAt();

  const amount = Number(amountInput);
  const isDateRangeValid = new Date(`${endDate}T00:00:00.000Z`) > new Date(`${startDate}T00:00:00.000Z`);
  const isAmountValid = Number.isFinite(amount) && amount > 0;

  const results = useMemo(() => {
    if (!isDateRangeValid || !isAmountValid) return null;

    const series = getDcaSeries(amount, frequency, startDate, endDate, strategy, currency);
    const latest = series[series.length - 1];
    if (!latest) return null;

    const btc = latest.value / latest.price;
    const roi = latest.invested > 0 ? ((latest.value - latest.invested) / latest.invested) * 100 : 0;
    const years = Math.max(1 / 12, (new Date(`${endDate}T00:00:00.000Z`).getTime() - new Date(`${startDate}T00:00:00.000Z`).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    const annualized = latest.invested > 0 ? Math.pow(latest.value / latest.invested, 1 / years) - 1 : 0;
    const { bestMonth, worstMonth } = calculateBestWorstMonth(series);

    return {
      series,
      latest,
      btc,
      roi,
      annualized,
      maxDrawdown: calculateMaxDrawdown(series),
      bestMonth,
      worstMonth,
      currency
    };
  }, [amount, currency, endDate, frequency, isAmountValid, isDateRangeValid, startDate, strategy]);

  const resultCards = results ? [
    ["Total invested", `${results.currency} ${formatNumber(results.latest.invested)}`],
    ["Current value", `${results.currency} ${formatNumber(results.latest.value)}`],
    ["BTC accumulated", results.btc.toFixed(4)],
    ["Profit / Loss", `${results.currency} ${formatNumber(results.latest.value - results.latest.invested)}`],
    ["ROI", `${results.roi.toFixed(1)}%`],
    ["Annualized return", `${(results.annualized * 100).toFixed(1)}%`],
    ["Maximum drawdown", `${results.maxDrawdown.toFixed(1)}%`],
    ["Best month", results.bestMonth],
    ["Worst month", results.worstMonth]
  ] : [];

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]" data-calculator="btc-dca">
      <form className="premium-card rounded-lg p-5" onSubmit={(event) => event.preventDefault()}>
        <h2 className="text-lg font-bold text-white">DCA參數</h2>
        <label className="mt-4 block text-sm text-slate-300">開始日期<input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-2 w-full rounded-md border border-line bg-ink px-3 py-2" /></label>
        <label className="mt-4 block text-sm text-slate-300">結束日期<input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="mt-2 w-full rounded-md border border-line bg-ink px-3 py-2" /></label>
        {!isDateRangeValid ? <p className="mt-3 rounded-md border border-bearish/30 bg-bearish/10 px-3 py-2 text-sm text-bearish">结束日期必须晚于开始日期</p> : null}
        <label className="mt-4 block text-sm text-slate-300">
          投資金額
          <input
            type="text"
            inputMode="decimal"
            min="0"
            placeholder="500"
            value={amountInput}
            onChange={(e) => setAmountInput(sanitizeAmountInput(e.target.value))}
            onBlur={() => setAmountInput((value) => normalizeAmountInput(value))}
            className="mt-2 w-full rounded-md border border-line bg-ink px-3 py-2"
          />
        </label>
        <label className="mt-4 block text-sm text-slate-300">貨幣<select value={currency} onChange={(e) => setCurrency(e.target.value)} className="mt-2 w-full rounded-md border border-line bg-ink px-3 py-2"><option>USD</option><option>MYR</option></select></label>
        <label className="mt-4 block text-sm text-slate-300">頻率<select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="mt-2 w-full rounded-md border border-line bg-ink px-3 py-2"><option>Daily</option><option>Weekly</option><option>Monthly</option></select></label>
        <label className="mt-4 block text-sm text-slate-300">策略<select value={strategy} onChange={(e) => setStrategy(e.target.value)} className="mt-2 w-full rounded-md border border-line bg-ink px-3 py-2"><option>Fixed DCA</option><option>Buy more when Fear & Greed is low</option><option>Buy more when BTC drops 20%</option><option>DCA in and DCA out</option></select></label>
        <div className="mt-4 space-y-1 text-xs leading-6 text-slate-500">
          <p>历史价格来源：CoinGecko，每日缓存更新。</p>
          <p>价格数据更新时间：{priceDataUpdatedAt}</p>
          {priceMeta.from && priceMeta.to ? <p>可用区间：{priceMeta.from} 至 {priceMeta.to}</p> : null}
        </div>
      </form>
      <div className="grid gap-6">
        {results ? (
          <>
            <div className="grid gap-3 md:grid-cols-3">
              {resultCards.map(([label, value]) => (
            <div key={label} className="premium-card rounded-lg p-4">
              <p className="text-sm text-slate-400">{label}</p>
              <p className="mt-2 text-xl font-bold text-white">{value}</p>
            </div>
              ))}
            </div>
            <ChartCard title="定投投入、組合價值與BTC價格" data={results.series} />
            <div className="premium-card rounded-lg p-5">
              <p className="text-lg font-bold text-white">如果你從{startDate.slice(0, 4)}年開始{frequency === "Monthly" ? "每月" : frequency === "Weekly" ? "每週" : "每日"}定投{formatNumber(amount, 2)} {results.currency} BTC，到{endDate}將變成：{results.currency} {formatNumber(results.latest.value)}。</p>
              <button type="button" className="mt-4 inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2 font-bold text-ink"><Share2 className="h-4 w-4" />把這個結果分享給朋友</button>
              <p className="mt-3 text-sm text-slate-500">策略：{strategy}。本結果僅供教育與模型示範，不構成投資建議。</p>
            </div>
          </>
        ) : (
          <div className="premium-card rounded-lg p-6">
            <p className="text-lg font-bold text-white">請輸入有效的日期與投資金額</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {!isDateRangeValid
                ? "结束日期必须晚于开始日期"
                : !isAmountValid
                  ? "金額可以暫時留空，輸入大於0的數字後會立即重新計算。"
                  : "所选日期范围暂无价格数据，请缩短日期范围或稍后再试。"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
