import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
}

function todayMalaysia() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kuala_Lumpur",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}

function number(value, fallback = null) {
  return Number.isFinite(Number(value)) ? Number(value) : fallback;
}

function money(value) {
  const numeric = number(value);
  if (numeric === null) return "資料暫不可用";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(numeric);
}

function pct(value, digits = 2) {
  const numeric = number(value);
  if (numeric === null) return "資料暫不可用";
  return `${numeric >= 0 ? "+" : ""}${numeric.toFixed(digits)}%`;
}

function sentimentFromScore(score) {
  if (score >= 65) return "Bullish";
  if (score <= 45) return "Bearish";
  return "Neutral";
}

function zhSentiment(sentiment) {
  if (sentiment === "Bullish") return "偏多";
  if (sentiment === "Bearish") return "偏空";
  return "中性";
}

function dcaOpinion(score, fearValue) {
  if (score >= 70) {
    return "今日市場分數偏多，但長期BTC投資者不應因單日分數提高而追高。較合理的做法是維持原本定投節奏，若短線漲幅過快，可把追加資金拆分到多次執行。投資靠紀律，不靠運氣；財富靠堅持，不靠奇蹟。";
  }

  if (score <= 40) {
    return fearValue !== null && fearValue <= 25
      ? "今日市場偏弱且情緒接近恐慌區。若原本就有長期BTC計畫，可用小額分批方式執行DCA，但仍要保留現金與風險邊界，不要一次all-in。"
      : "今日市場偏弱，適合放慢節奏、降低槓桿與避免情緒化交易。長期投資者可等待更明確的價格或資金流確認後再增加DCA金額。";
  }

  return "今日市場沒有給出極端訊號，較適合維持固定DCA與風險管理。不要因短線波動恐慌賣出，也不要因反彈追高；長期BTC配置重點仍是紀律、現金流與倉位控制。";
}

function summaryFor({ sentiment, price, change24h, etf, score }) {
  const direction = change24h > 0.5 ? "短線偏強" : change24h < -0.5 ? "短線承壓" : "短線震盪";
  return `今日BTC市場${zhSentiment(sentiment)}，Bull Score為${score}/100。BTC現貨約${money(price)}，24h變化${pct(change24h)}，價格${direction}；ETF資金流顯示${etf.totalDailyNetFlow}，需要觀察是否延續。長期投資者可把重點放在DCA紀律、風險控制與避免追漲殺跌。`;
}

async function main() {
  const [marketCache, fearGreedCache, fundingCache, bullScoreCache, etf, onchain] = await Promise.all([
    readJson("data/cache/btc-market.json"),
    readJson("data/cache/fear-greed.json"),
    readJson("data/cache/funding-rate.json"),
    readJson("data/cache/bull-score.json"),
    readJson("data/etf-flow.json"),
    readJson("data/onchain-indicators.json")
  ]);

  const price = marketCache.value?.priceUsd ?? null;
  const change24h = number(marketCache.value?.change24hPct, null);
  const change7d = number(marketCache.value?.change7dPct, null);
  const fearValue = number(fearGreedCache.value?.value, null);
  const fearClass = fearGreedCache.value?.classification ?? "Unavailable";
  const fundingRate = number(fundingCache.value?.rate, null);
  const score = number(bullScoreCache.value, 50);
  const sentiment = sentimentFromScore(score);

  const brief = {
    date: todayMalaysia(),
    marketSentiment: sentiment,
    bullScore: score,
    summary: summaryFor({ sentiment, price, change24h, etf, score }),
    news: [
      {
        headline: `BTC現貨約${money(price)}，24h變化${pct(change24h)}`,
        source: marketCache.source ?? "CoinGecko / Binance",
        summary: `BTC 7日變化為${pct(change7d)}。短線價格只是一個溫度計，長期投資者更應觀察是否配合ETF資金流與市場情緒改善。`,
        whyItMatters: "價格是最直接的市場訊號，但單獨使用容易追漲殺跌，必須和情緒、資金流與槓桿資料一起看。",
        btcImpact: change24h > 0.5 ? "中性偏多" : change24h < -0.5 ? "中性偏空" : "中性",
        ethImpact: "中性",
        altcoinImpact: "分化"
      },
      {
        headline: `Fear & Greed為${fearValue ?? "暫不可用"}，分類：${fearClass}`,
        source: fearGreedCache.source ?? "Alternative.me Fear & Greed API",
        summary: fearValue !== null && fearValue <= 25
          ? "市場處於恐慌區，長期投資者可更重視分批與現金流管理。"
          : fearValue !== null && fearValue >= 75
            ? "市場接近貪婪區，追高風險上升，應降低情緒化加倉。"
            : "市場情緒未進入極端區間，較適合按原定策略執行DCA。",
        whyItMatters: "情緒指標可以幫助投資者避免在極端恐慌或極端貪婪時做出衝動決策。",
        btcImpact: fearValue !== null && fearValue <= 25 ? "長期偏多" : fearValue !== null && fearValue >= 75 ? "短期偏空" : "中性",
        ethImpact: "中性",
        altcoinImpact: fearValue !== null && fearValue >= 75 ? "波動風險上升" : "分化"
      },
      {
        headline: `Bitcoin ETF日淨流：${etf.totalDailyNetFlow}`,
        source: etf.source ?? "Manual ETF JSON",
        summary: `${etf.interpretation} 目前ETF資料標示為每日更新，不當作即時交易訊號。`,
        whyItMatters: "ETF資金流是本輪BTC需求端的重要觀察點，能反映機構資金是否持續進場。",
        btcImpact: etf.status === "Bullish" ? "偏多" : etf.status === "Bearish" ? "偏空" : "中性",
        ethImpact: "中性",
        altcoinImpact: "間接影響風險偏好"
      },
      {
        headline: `Funding Rate：${fundingRate === null ? "資料暫不可用" : `${(fundingRate * 100).toFixed(4)}%`}`,
        source: fundingCache.source ?? "Binance USD-M Futures fundingRate API",
        summary: fundingRate !== null && fundingRate > 0.0003
          ? "多頭槓桿偏擁擠，短線回撤風險上升。"
          : fundingRate !== null && fundingRate < -0.0001
            ? "空頭壓力較高，若價格企穩可能出現反彈。"
            : "槓桿情緒尚未極端，需配合價格與OI觀察。",
        whyItMatters: "資金費率可以觀察合約市場是否過度偏多或偏空，避免在槓桿擁擠時追高。",
        btcImpact: fundingRate !== null && fundingRate > 0.0003 ? "短期偏空" : fundingRate !== null && fundingRate < -0.0001 ? "中性偏多" : "中性",
        ethImpact: "中性",
        altcoinImpact: "高槓桿幣種波動更大"
      },
      {
        headline: `鏈上指標：MVRV ${onchain.indicators?.mvrv?.value ?? "Coming Soon"}，NUPL ${onchain.indicators?.nupl?.value ?? "Coming Soon"}`,
        source: onchain.indicators?.mvrv?.source ?? onchain.label ?? "Daily on-chain JSON",
        summary: `Puell Multiple目前為${onchain.indicators?.puell?.value ?? "Coming Soon"}。鏈上資料以日更或人工確認為主，重點是觀察長期估值溫度，不是短線追單訊號。`,
        whyItMatters: "MVRV、NUPL與Puell可幫助判斷BTC週期溫度，避免只看價格做決策。",
        btcImpact: "長期參考",
        ethImpact: "間接參考",
        altcoinImpact: "間接參考"
      }
    ],
    dcaOpinion: dcaOpinion(score, fearValue)
  };

  await writeFile(path.join(root, "data", "daily-brief.json"), `${JSON.stringify(brief, null, 2)}\n`, "utf8");
  console.log(`Daily brief updated: ${brief.date}, Bull Score ${brief.bullScore}/100`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
