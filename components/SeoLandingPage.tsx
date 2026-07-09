import { AdSlot } from "@/components/AdSlot";
import { InternalLinks } from "@/components/InternalLinks";
import { JsonLd } from "@/components/JsonLd";
import { expandedBody, type Locale, type SeoPage } from "@/lib/seo-hub-content";
import { site } from "@/lib/seo";

type Props = {
  page: SeoPage;
  locale: Locale;
  children?: React.ReactNode;
};

export function SeoLandingPage({ page, locale, children }: Props) {
  const copy = page[locale];
  const path = locale === "en" ? `/en/${page.slug}` : `/${page.slug}`;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a }
    }))
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "en" ? "Home" : "首頁", item: `${site.url}${locale === "en" ? "/en" : ""}` },
      { "@type": "ListItem", position: 2, name: copy.h1, item: `${site.url}${path}` }
    ]
  };

  return (
    <div className="container-shell py-10">
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-gold">Insight Wealth SEO Hub</p>
      <h1 className="mt-3 max-w-5xl text-4xl font-black leading-tight text-white md:text-5xl">{copy.h1}</h1>
      <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-300">{copy.summary}</p>
      <p className="mt-4 text-sm text-slate-500">{locale === "en" ? "Last updated" : "最後更新"}: {copy.lastUpdated}</p>

      <AdSlot slotId={`${locale}-${page.slug}-top`} format="horizontal" className="mt-8" />

      {children ? <div className="mt-8">{children}</div> : null}

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {copy.keyTakeaways.map((item) => (
          <div key={item} className="premium-card rounded-lg p-5">
            <p className="text-sm font-bold text-gold">{locale === "en" ? "Key point" : "重點"}</p>
            <p className="mt-3 leading-7 text-slate-300">{item}</p>
          </div>
        ))}
      </section>

      <article className="prose-finance mt-10 max-w-4xl">
        {expandedBody(copy, locale).map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
      </article>

      <section className="premium-card mt-10 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white">{locale === "en" ? "Data sources" : "資料來源"}</h2>
        <ul className="mt-4 grid gap-2 text-slate-300">
          {copy.dataSources.map((source) => <li key={source}>• {source}</li>)}
        </ul>
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

      <section className="mt-8 rounded-lg border border-line bg-panel/60 p-5 text-sm leading-7 text-slate-400">
        {locale === "en"
          ? "Disclaimer: This page is for educational and informational purposes only. It is not financial advice. Crypto assets are volatile, and past performance does not guarantee future results."
          : "免責聲明：本頁僅供教育與資訊用途，不構成財務建議。加密資產波動劇烈，過去表現不保證未來結果。"}
      </section>

      <AdSlot slotId={`${locale}-${page.slug}-bottom`} format="horizontal" className="mt-10" />
    </div>
  );
}
