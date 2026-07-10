import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const filePath = path.join(root, "data", "youtube-videos.json");
const channelUrl = "https://youtube.com/@9insightwealth";
const videosUrl = "https://www.youtube.com/@9insightwealth/videos";

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "user-agent": "InsightWealthCryptoHubCron/1.0"
    }
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.text();
}

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

function uniqueVideoIds(html) {
  const ids = [...html.matchAll(/"videoId":"([^"]+)"/g)].map((match) => match[1]);
  return [...new Set(ids)].filter((id) => /^[a-zA-Z0-9_-]{8,20}$/.test(id));
}

async function main() {
  const existing = JSON.parse(await readFile(filePath, "utf8"));

  try {
    const html = await fetchText(videosUrl);
    const [latestVideoId] = uniqueVideoIds(html);
    if (!latestVideoId) throw new Error("No videoId found on YouTube videos page");

    const watchUrl = `https://www.youtube.com/watch?v=${latestVideoId}`;
    const embedUrl = `https://www.youtube.com/embed/${latestVideoId}`;
    const oembed = await fetchJson(`https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`);

    const nextData = {
      ...existing,
      channelName: oembed.author_name || existing.channelName || "洞見財富 Insight Wealth",
      channelUrl,
      latestVideoId,
      latestVideoUrl: embedUrl,
      latestWatchUrl: watchUrl,
      latestVideoTitle: oembed.title || existing.latestVideoTitle || "洞見財富每日影片",
      latestThumbnailUrl: oembed.thumbnail_url || existing.latestThumbnailUrl || null,
      lastUpdated: new Date().toISOString(),
      source: "YouTube public channel page + oEmbed",
      description: "洞見財富 YouTube 頻道每日發布 BTC、ETF 資金流、市場情緒、Bull Score 與 DCA 觀點。"
    };

    await writeFile(filePath, `${JSON.stringify(nextData, null, 2)}\n`, "utf8");
    console.log(`YouTube latest video updated: ${nextData.latestVideoTitle} (${latestVideoId})`);
  } catch (error) {
    const nextData = {
      ...existing,
      lastUpdateAttempt: new Date().toISOString(),
      lastUpdateError: error instanceof Error ? error.message : String(error)
    };
    await writeFile(filePath, `${JSON.stringify(nextData, null, 2)}\n`, "utf8");
    console.warn(`YouTube update skipped safely: ${nextData.lastUpdateError}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
