import { Info } from "lucide-react";
import type { Metric } from "@/lib/types";
import { SignalBadge } from "@/components/SignalBadge";

export function MetricCard({ metric }: { metric: Metric }) {
  return (
    <article className="premium-card rounded-lg p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400">{metric.label}</p>
          <p className="mt-2 text-2xl font-bold text-white">{metric.value}</p>
        </div>
        <SignalBadge signal={metric.signal} label={metric.status} />
      </div>
      <p className="mt-2 text-sm font-medium text-gold">{metric.change}</p>
      <div className="mt-3 grid gap-1 text-xs text-slate-500">
        <p>Last updated: {metric.lastUpdated}</p>
        <p>
          Source:{" "}
          {metric.sourceUrl ? (
            <a href={metric.sourceUrl} className="text-slate-400 underline decoration-gold/40 underline-offset-4 hover:text-gold" target="_blank" rel="noreferrer">
              {metric.source}
            </a>
          ) : (
            metric.source
          )}
        </p>
        {metric.updateFrequency ? <p>Update: {metric.updateFrequency}</p> : null}
      </div>
      <div className="mt-4 flex gap-2 border-t border-line pt-3 text-sm leading-6 text-slate-300">
        <Info className="mt-1 h-4 w-4 shrink-0 text-blue" aria-hidden="true" />
        <p>{metric.explanation}</p>
      </div>
    </article>
  );
}
