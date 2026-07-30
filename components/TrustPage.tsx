import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/seo";

type Section = {
  heading: string;
  paragraphs: string[];
};

type TrustPageProps = {
  slug: string;
  label: string;
  title: string;
  description: string;
  sections: Section[];
  faq: Array<{ q: string; a: string }>;
};

export function TrustPage({ slug, label, title, description, sections, faq }: TrustPageProps) {
  const url = `${site.url}/${slug}`;
  return (
    <main className="container-shell py-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url,
          publisher: {
            "@type": "Organization",
            name: "Insight Wealth",
            url: site.url,
            email: "hello@insightwealth.live",
            logo: `${site.url}/assets/channel_logo_512.png`
          }
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a }
          }))
        }}
      />
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-gold">{label}</p>
      <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight text-white">{title}</h1>
      <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300">{description}</p>

      <div className="prose-finance mt-10 max-w-4xl">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-white">常見問題</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {faq.map((item) => (
            <article key={item.q} className="premium-card rounded-lg p-5">
              <h3 className="font-bold text-white">{item.q}</h3>
              <p className="mt-3 leading-7 text-slate-300">{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-lg border border-line bg-panel/60 p-6">
        <h2 className="text-xl font-bold text-white">相關頁面</h2>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link className="rounded-md border border-gold/40 px-4 py-2 text-gold hover:bg-gold/10" href="/btc-dashboard">BTC儀表盤</Link>
          <Link className="rounded-md border border-gold/40 px-4 py-2 text-gold hover:bg-gold/10" href="/daily-crypto-brief">每日簡報</Link>
          <Link className="rounded-md border border-gold/40 px-4 py-2 text-gold hover:bg-gold/10" href="/disclaimer">免責聲明</Link>
          <Link className="rounded-md border border-gold/40 px-4 py-2 text-gold hover:bg-gold/10" href="/contact">聯絡我們</Link>
        </div>
      </section>
    </main>
  );
}
