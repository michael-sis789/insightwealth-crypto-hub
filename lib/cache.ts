type CacheEntry<T> = {
  value: T;
  timestamp: number;
};

const memoryCache = new Map<string, CacheEntry<unknown>>();

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
