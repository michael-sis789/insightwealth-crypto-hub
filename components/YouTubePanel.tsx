import Link from "next/link";
import { ExternalLink, PlayCircle, Youtube } from "lucide-react";
import youtubeData from "@/data/youtube-videos.json";

type Props = {
  title?: string;
  compact?: boolean;
};

export function YouTubePanel({ title = "洞見財富每日影片", compact = false }: Props) {
  return (
    <section className="premium-card rounded-lg p-6">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-red-500/15 text-red-300">
          <Youtube className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">YouTube</p>
          <h2 className="mt-2 text-2xl font-bold text-white">{title}</h2>
          <p className="mt-3 leading-7 text-slate-300">{youtubeData.description}</p>
        </div>
      </div>

      {youtubeData.latestVideoUrl ? (
        <div className="mt-5 overflow-hidden rounded-lg border border-line bg-black">
          <iframe
            title={youtubeData.latestVideoTitle}
            src={youtubeData.latestVideoUrl}
            className="aspect-video w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="mt-5 flex aspect-video items-center justify-center rounded-lg border border-line bg-black/40 text-center">
          <div className="px-6">
            <PlayCircle className="mx-auto h-10 w-10 text-gold" aria-hidden="true" />
            <p className="mt-3 text-sm leading-6 text-slate-400">
              今日影片發布後，可在 <code className="rounded bg-black/40 px-1.5 py-0.5 text-gold">data/youtube-videos.json</code> 加入影片嵌入連結。
            </p>
          </div>
        </div>
      )}

      <div className={compact ? "mt-5" : "mt-6 flex flex-wrap gap-3"}>
        <a
          href={youtubeData.channelUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-gold px-4 py-3 text-sm font-bold text-ink hover:bg-[#f1c75d]"
        >
          前往 YouTube 頻道
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
        {!compact && (
          <Link href="/daily-crypto-brief" className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-4 py-3 text-sm font-bold text-gold hover:bg-gold/10">
            閱讀今日文字簡報
          </Link>
        )}
      </div>
    </section>
  );
}
