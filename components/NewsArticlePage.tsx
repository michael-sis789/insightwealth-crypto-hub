import { AdSlot } from "@/components/AdSlot";
import { InternalLinks } from "@/components/InternalLinks";
import { JsonLd } from "@/components/JsonLd";
import type { Locale, NewsArticle } from "@/lib/seo-hub-content";
import { site } from "@/lib/seo";

export function NewsArticlePage({ article, locale }: { article: NewsArticle; locale: Locale }) {
  const copy = article[locale];
  const path = locale === "en" ? `/en/news/${article.slug}` : `/news/${article.slug}`;

  return (
    <div className="container-shell py-10">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: copy.title,
        description: copy.description,
        datePublished: article.date,
        dateModified: article.date,
        inLanguage: locale === "en" ? "en" : "zh-Hant",
        mainEntityOfPage: `${site.url}${path}`,
        publisher: { "@type": "Organization", name: "Insight Wealth", url: site.url }
      }} />
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-gold">Daily Video Article</p>
      <h1 className="mt-3 max-w-5xl text-4xl font-black leading-tight text-white md:text-5xl">{copy.h1}</h1>
      <p className="mt-4 text-sm text-slate-500">{article.date}</p>
      <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300">{copy.summary}</p>

      <AdSlot slotId={`${locale}-news-${article.slug}-top`} format="horizontal" className="mt-8" />

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="premium-card rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white">{locale === "en" ? "Video" : "影片"}</h2>
          {article.videoUrl ? (
            <iframe title={copy.title} src={article.videoUrl} className="mt-4 aspect-video w-full rounded border border-line" allowFullScreen />
          ) : (
            <div className="mt-4 flex aspect-video items-center justify-center rounded border border-line bg-black/40 px-6 text-center text-sm leading-6 text-slate-400">
              {locale === "en" ? "YouTube embed placeholder. Add the final video URL after upload." : "YouTube影片嵌入位置。影片上傳後可加入正式連結。"}
            </div>
          )}
        </div>
        <div className="premium-card rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white">{locale === "en" ? "5 key points" : "5個重點"}</h2>
          <ol className="mt-4 grid gap-3 text-sm leading-6 text-slate-300">
            {copy.keyPoints.map((point, index) => <li key={point}><span className="font-bold text-gold">{index + 1}.</span> {point}</li>)}
          </ol>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="premium-card rounded-lg p-5"><h2 className="font-bold text-gold">{locale === "en" ? "Market impact" : "市場影響"}</h2><p className="mt-3 leading-7 text-slate-300">{copy.marketImpact}</p></div>
        <div className="premium-card rounded-lg p-5"><h2 className="font-bold text-gold">BTC</h2><p className="mt-3 leading-7 text-slate-300">{copy.btcImpact}</p></div>
        <div className="premium-card rounded-lg p-5"><h2 className="font-bold text-gold">ETH</h2><p className="mt-3 leading-7 text-slate-300">{copy.ethImpact}</p></div>
      </section>

      <section className="premium-card mt-8 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white">{locale === "en" ? "Risk warning and DCA opinion" : "風險提示與DCA觀點"}</h2>
        <p className="mt-4 leading-8 text-slate-300">{copy.riskWarning}</p>
        <p className="mt-4 leading-8 text-slate-300">{copy.dcaOpinion}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-white">FAQ</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {copy.faq.map((item) => (
            <article key={item.q} className="premium-card rounded-lg p-5">
              <h3 className="font-bold text-white">{item.q}</h3>
              <p className="mt-3 leading-7 text-slate-300">{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <InternalLinks language={locale} />
      <AdSlot slotId={`${locale}-news-${article.slug}-bottom`} format="horizontal" className="mt-10" />
    </div>
  );
}
