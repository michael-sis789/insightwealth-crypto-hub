import { promises as fs } from "node:fs";
import path from "node:path";

type CacheEntry<T> = {
  value: T;
  timestamp: number;
};

const memoryCache = new Map<string, CacheEntry<unknown>>();
const cacheDir = path.join(process.cwd(), "data", "cache");

export function nowIso() {
  return new Date().toISOString();
}

export function formatTimestamp(iso?: string) {
  if (!iso) return "Data temporarily unavailable";
  return new Intl.DateTimeFormat("zh-TW", {
    timeZone: "Asia/Kuala_Lumpur",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(iso));
}

export async function getCached<T>(key: string, ttlSeconds: number, fetcher: () => Promise<T>): Promise<{ value: T; cached: boolean; timestamp: string }> {
  const existing = memoryCache.get(key) as CacheEntry<T> | undefined;
  const now = Date.now();

  if (existing && now - existing.timestamp < ttlSeconds * 1000) {
    return { value: existing.value, cached: true, timestamp: new Date(existing.timestamp).toISOString() };
  }

  const value = await fetcher();
  memoryCache.set(key, { value, timestamp: now });
  return { value, cached: false, timestamp: new Date(now).toISOString() };
}

export async function readJsonFile<T>(relativePath: string): Promise<T> {
  const file = path.join(process.cwd(), relativePath);
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw) as T;
}

export async function writeJsonFile(relativePath: string, data: unknown) {
  const file = path.join(process.cwd(), relativePath);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export async function writeCacheFile(name: string, data: unknown) {
  await fs.mkdir(cacheDir, { recursive: true });
  await fs.writeFile(path.join(cacheDir, `${name}.json`), `${JSON.stringify(data, null, 2)}\n`, "utf8");
}
