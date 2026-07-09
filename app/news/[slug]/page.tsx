import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NewsArticlePage } from "@/components/NewsArticlePage";
import { getNewsArticle, newsArticles } from "@/lib/seo-hub-content";
import { makeMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = getNewsArticle((await params).slug);
  if (!article) return {};
  return makeMetadata(article.zh.title, article.zh.description, `/news/${article.slug}`, "zh");
}

export default async function NewsPage({ params }: PageProps) {
  const article = getNewsArticle((await params).slug);
  if (!article) notFound();
  return <NewsArticlePage article={article} locale="zh" />;
}
