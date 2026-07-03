import clsx from "clsx";

type Props = {
  slotId: string;
  format?: "auto" | "horizontal" | "rectangle" | "vertical";
  className?: string;
};

export function AdSlot({ slotId, format = "auto", className }: Props) {
  return (
    <aside className={clsx("rounded-lg border border-dashed border-gold/30 bg-gold/5 p-4 text-center", className)} aria-label="Advertisement">
      {/* Replace ca-pub-XXXXXXXXXXXXXXXX with your AdSense publisher ID.
          Replace data-ad-slot with the actual slot ID assigned in Google AdSense. */}
      <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Advertisement</div>
      <div className="mt-2 text-sm text-slate-400">AdSense slot: {slotId}</div>
      <div className="text-xs text-slate-600">format: {format}</div>
    </aside>
  );
}
