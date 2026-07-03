import clsx from "clsx";

type EventItem = {
  date: string;
  title: string;
  category: string;
  impact: string;
  explanation: string;
  assets: string[];
};

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="premium-card rounded-lg p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gold">{event.date}</p>
          <h3 className="mt-1 text-lg font-bold text-white">{event.title}</h3>
        </div>
        <span
          className={clsx(
            "rounded-full border px-3 py-1 text-xs font-bold uppercase",
            event.impact === "high" && "border-bearish/40 bg-bearish/10 text-bearish",
            event.impact === "medium" && "border-neutral/40 bg-neutral/10 text-neutral",
            event.impact === "low" && "border-blue/40 bg-blue/10 text-blue"
          )}
        >
          {event.impact}
        </span>
      </div>
      <p className="mt-3 text-sm text-slate-400">{event.category}</p>
      <p className="mt-3 leading-7 text-slate-300">{event.explanation}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {event.assets.map((asset) => (
          <span key={asset} className="rounded border border-line px-2 py-1 text-xs text-slate-400">
            {asset}
          </span>
        ))}
      </div>
    </article>
  );
}
