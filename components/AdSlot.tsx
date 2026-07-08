import clsx from "clsx";

type Props = {
  slotId: string;
  format?: "auto" | "horizontal" | "rectangle" | "vertical";
  className?: string;
};

export function AdSlot({ slotId, format = "auto", className }: Props) {
  return (
    <aside className={clsx("rounded-lg border border-dashed border-gold/30 bg-gold/5 p-4 text-center", className)} aria-label="Advertisement">
      {/* AdSense publisher ID is loaded globally in app/layout.tsx: ca-pub-7206423892750616.
          Replace slotId values with real AdSense ad unit slot IDs after Google creates them. */}
      <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Advertisement</div>
      <div className="mt-2 text-sm text-slate-400">AdSense slot: {slotId}</div>
      <div className="text-xs text-slate-600">format: {format}</div>
    </aside>
  );
}
