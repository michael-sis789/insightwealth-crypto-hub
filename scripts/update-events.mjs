import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const eventsPath = path.join(root, "data", "events.json");

const monthNumber = {
  January: "01",
  February: "02",
  March: "03",
  April: "04",
  May: "05",
  June: "06",
  July: "07",
  August: "08",
  September: "09",
  October: "10",
  November: "11",
  December: "12",
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Sept: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12"
};

const cpiFallback2026 = [
  { referenceMonth: "July 2026", date: "2026-08-12" },
  { referenceMonth: "August 2026", date: "2026-09-11" },
  { referenceMonth: "September 2026", date: "2026-10-14" },
  { referenceMonth: "October 2026", date: "2026-11-10" }
];

function todayMalaysia() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kuala_Lumpur",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}

function toIsoDate(year, monthName, dayText) {
  const month = monthNumber[monthName.replace(".", "")];
  if (!month) return null;
  const dayMatch = dayText.match(/(\d{1,2})(?!.*\d)/);
  if (!dayMatch) return null;
  return `${year}-${month}-${dayMatch[1].padStart(2, "0")}`;
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      accept: "text/html,application/xhtml+xml",
      "user-agent": "InsightWealthCryptoHubCron/1.0"
    }
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.text();
}

function stripHtml(value) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

async function fetchFomcEvents(year) {
  const sourceUrl = "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm";
  const html = await fetchText(sourceUrl);
  const section = html.split(`${year} FOMC Meetings`)[1]?.split(`${year - 1} FOMC Meetings`)[0] ?? "";
  const regex = /fomc-meeting__month[^>]*>\s*<strong>([^<]+)<\/strong>[\s\S]*?fomc-meeting__date[^>]*>([^<]+)<\/div>/g;
  const events = [];
  for (const match of section.matchAll(regex)) {
    const date = toIsoDate(year, match[1], match[2]);
    if (!date) continue;
    events.push({
      date,
      title: "FOMC利率決議與主席記者會",
      category: "Macro",
      impact: "high",
      explanation: "聯準會利率決議、點陣圖或主席措辭可能影響美元流動性、風險資產估值與BTC短期波動。",
      assets: ["BTC", "ETH", "US Stocks"],
      source: "Federal Reserve FOMC calendar",
      sourceUrl
    });
  }
  return events;
}

async function fetchBeaEvents(year) {
  const sourceUrl = "https://www.bea.gov/news/schedule";
  const html = await fetchText(sourceUrl);
  const regex = /<div class="release-date">([^<]+)<\/div>[\s\S]{0,700}?<td class="release-title[^>]*>([\s\S]*?)<\/td>/g;
  const events = [];
  for (const match of html.matchAll(regex)) {
    const title = stripHtml(match[2]);
    if (!/Personal Income and Outlays/i.test(title)) continue;
    const [monthName, dayText] = match[1].split(/\s+/);
    const date = toIsoDate(year, monthName, dayText);
    if (!date) continue;
    events.push({
      date,
      title: "美國PCE / Personal Income公布",
      category: "Macro",
      impact: "high",
      explanation: `${title}。PCE通膨與個人收入會影響市場對Fed政策路徑與風險資產流動性的預期。`,
      assets: ["BTC", "ETH", "US Stocks"],
      source: "U.S. Bureau of Economic Analysis release schedule",
      sourceUrl
    });
  }
  return events;
}

function cpiEvents(today) {
  return cpiFallback2026
    .filter((event) => event.date >= today)
    .map((event) => ({
      date: event.date,
      title: "美國CPI公布",
      category: "Macro",
      impact: "high",
      explanation: `${event.referenceMonth} CPI在美東時間8:30公布。若通膨高於預期，可能提高利率壓力；若低於預期，可能改善風險資產情緒。`,
      assets: ["BTC", "ETH", "Altcoins"],
      source: "BLS CPI release schedule",
      sourceUrl: "https://www.bls.gov/schedule/news_release/cpi.htm"
    }));
}

function nextFridayEvents(today) {
  const start = new Date(`${today}T00:00:00Z`);
  const events = [];
  for (let i = 0; events.length < 4 && i < 40; i += 1) {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + i);
    if (date.getUTCDay() !== 5) continue;
    const iso = date.toISOString().slice(0, 10);
    events.push({
      date: iso,
      title: "Bitcoin ETF週度資金流檢查",
      category: "ETF",
      impact: "medium",
      explanation: "週度檢查IBIT、FBTC、ARKB、BITB、GBTC與總淨流入，判斷機構需求是否延續。",
      assets: ["BTC"],
      source: "Insight Wealth weekly ETF review workflow",
      sourceUrl: "https://insightwealth.live/bitcoin-etf-flow"
    });
  }
  return events;
}

function keepManualFutureEvents(existing, today) {
  const manualCategories = new Set(["BTC", "ETH", "Regulation", "Token Unlock"]);
  return existing
    .filter((event) => event.date >= today && manualCategories.has(event.category))
    .map((event) => ({
      ...event,
      source: event.source || "Manual crypto event watchlist",
      sourceUrl: event.sourceUrl || "https://insightwealth.live/crypto-calendar"
    }));
}

function dedupeSort(events, today) {
  const seen = new Set();
  return events
    .filter((event) => event.date >= today)
    .filter((event) => {
      const key = `${event.date}|${event.title}|${event.category}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => `${a.date}${a.title}`.localeCompare(`${b.date}${b.title}`))
    .slice(0, 24);
}

async function safely(label, fn) {
  try {
    const events = await fn();
    console.log(`${label}: ${events.length} event(s)`);
    return events;
  } catch (error) {
    console.warn(`${label} skipped: ${error instanceof Error ? error.message : String(error)}`);
    return [];
  }
}

async function main() {
  const today = todayMalaysia();
  const year = Number(today.slice(0, 4));
  const existing = JSON.parse(await readFile(eventsPath, "utf8"));

  const [fomc, bea] = await Promise.all([
    safely("FOMC calendar", () => fetchFomcEvents(year)),
    safely("BEA PCE calendar", () => fetchBeaEvents(year))
  ]);

  const events = dedupeSort([
    ...keepManualFutureEvents(existing, today),
    ...fomc,
    ...bea,
    ...cpiEvents(today),
    ...nextFridayEvents(today)
  ], today);

  await writeFile(eventsPath, `${JSON.stringify(events, null, 2)}\n`, "utf8");
  console.log(`Saved ${events.length} future events to data/events.json; removed events before ${today}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
