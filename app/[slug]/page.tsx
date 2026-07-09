import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import { getSeoPage, seoPages } from "@/lib/seo-hub-content";
import { makeMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return seoPages.filter((page) => page.slug !== "btc-dca-calculator").map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = getSeoPage((await params).slug);
  if (!page) return {};
  return makeMetadata(page.zh.title, page.zh.description, `/${page.slug}`, "zh");
}

export default async function SeoHubPage({ params }: PageProps) {
  const page = getSeoPage((await params).slug);
  if (!page) notFound();
  return <SeoLandingPage page={page} locale="zh" />;
}
