import clsx from "clsx";
import type { Signal } from "@/lib/types";

const labels: Record<Signal, string> = {
  bullish: "Bullish",
  neutral: "Neutral",
  bearish: "Bearish"
};

export function SignalBadge({ signal, label }: { signal: Signal; label?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
        signal === "bullish" && "border-bullish/40 bg-bullish/10 text-bullish",
        signal === "neutral" && "border-neutral/40 bg-neutral/10 text-neutral",
        signal === "bearish" && "border-bearish/40 bg-bearish/10 text-bearish"
      )}
    >
      {label ?? labels[signal]}
    </span>
  );
}
