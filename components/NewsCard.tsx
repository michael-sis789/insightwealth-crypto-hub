type News = {
  headline: string;
  source: string;
  summary: string;
  whyItMatters: string;
  btcImpact: string;
  ethImpact: string;
  altcoinImpact: string;
};

export function NewsCard({ item, index }: { item: News; index: number }) {
  return (
    <article className="premium-card rounded-lg p-5">
      <div className="flex gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-gold text-sm font-bold text-ink">{index + 1}</span>
        <div>
          <h3 className="text-lg font-bold text-white">{item.headline}</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">{item.source}</p>
        </div>
      </div>
      <p className="mt-4 leading-7 text-slate-300">{item.summary}</p>
      <p className="mt-3 text-sm leading-6 text-slate-400">為什麼重要：{item.whyItMatters}</p>
      <div className="mt-4 grid gap-2 text-sm md:grid-cols-3">
        <span className="rounded border border-line px-3 py-2 text-slate-300">BTC: {item.btcImpact}</span>
        <span className="rounded border border-line px-3 py-2 text-slate-300">ETH: {item.ethImpact}</span>
        <span className="rounded border border-line px-3 py-2 text-slate-300">Altcoin: {item.altcoinImpact}</span>
      </div>
    </article>
  );
}
