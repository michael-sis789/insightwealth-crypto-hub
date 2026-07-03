import { AdSlot } from "@/components/AdSlot";
import { EventCard } from "@/components/EventCard";
import { SeoContent } from "@/components/SeoContent";
import { getEvents } from "@/lib/crypto-data";
import { makeMetadata } from "@/lib/seo";

export const metadata = makeMetadata("Crypto Event Calendar - 加密貨幣事件日曆", "追蹤Fed會議、CPI、PCE、SEC決策、ETF期限、Ethereum升級、Bitcoin halving與Token unlock。", "/crypto-calendar");

export default function CalendarPage() {
  const events = getEvents();
  const categories = ["Macro", "BTC", "ETH", "ETF", "Regulation", "Token Unlock"];
  return (
    <div className="container-shell py-10">
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-gold">Crypto Event Calendar</p>
      <h1 className="mt-3 text-4xl font-black text-white">加密貨幣事件日曆</h1>
      <p className="mt-3 max-w-3xl leading-7 text-slate-400">整理未來可能影響BTC、ETH與加密市場流動性的宏觀、監管、ETF、升級與解鎖事件。</p>
      <div className="mt-6 flex flex-wrap gap-2">{categories.map((c) => <button key={c} className="rounded-md border border-line px-3 py-2 text-sm text-slate-300 hover:border-gold/60">{c}</button>)}</div>
      <AdSlot slotId="calendar-top" format="horizontal" className="mt-8" />
      <div className="mt-8 grid gap-4 md:grid-cols-2">{events.map((event) => <EventCard key={`${event.date}-${event.title}`} event={event} />)}</div>
      <SeoContent title="如何用Crypto Calendar管理風險？" paragraphs={[
        "加密市場不是孤立存在的。Fed會議、CPI、PCE、SEC決策、ETF期限、Ethereum升級、Bitcoin halving相關事件、主要token unlock與大型會議，都可能影響市場流動性與風險偏好。Crypto calendar的價值，是讓投資者提前知道哪些日子可能波動放大，而不是等價格劇烈變動後才追新聞。",
        "宏觀事件通常影響BTC與ETH的整體方向。CPI若高於預期，市場可能重新定價利率，風險資產承壓；若低於預期，則可能改善流動性預期。監管與ETF事件會影響資金進入加密市場的管道，尤其是Bitcoin ETF flow與Ethereum ETF相關題材。",
        "Token unlock對山寨幣更直接。大量解鎖不必然造成下跌，但它會增加供給與投資者心理壓力。使用事件日曆時，不要把單一事件當成買賣指令，而要把它納入倉位管理。重大事件前降低槓桿、避免all-in、保留現金，是比猜方向更重要的紀律。"
      ]} />
      <AdSlot slotId="calendar-bottom" format="horizontal" className="mt-10" />
    </div>
  );
}
