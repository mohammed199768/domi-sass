import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import InsightArticleClient from "@/features/insights/InsightArticleClient";
import "@/features/insights/insights.css";
import { insightBySlug, insights } from "@/data/insights";
import { SITE_URL, BRAND } from "@/config/seo";

export function generateStaticParams() {
  return insights.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = insightBySlug[slug];
  if (!article) return {};
  return {
    title: article.ar.title,
    description: article.ar.excerpt,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: {
      title: article.ar.title,
      description: article.ar.excerpt,
      url: `${SITE_URL}/insights/${slug}`,
      siteName: BRAND.siteName,
      type: "article",
      publishedTime: article.published,
      locale: BRAND.locale,
      alternateLocale: [BRAND.localeAlternate],
      images: [{ url: article.cover, alt: article.ar.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.ar.title,
      description: article.ar.excerpt,
      images: [article.cover],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = insightBySlug[slug];
  if (!article) notFound();

  return (
    <>
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: article.ar.title,
          description: article.ar.excerpt,
          datePublished: article.published,
          dateModified: article.published,
          image: `${SITE_URL}${article.cover}`,
          author: { "@type": "Organization", name: "DOMINASE", url: SITE_URL },
          publisher: { "@id": `${SITE_URL}/#organization` },
          mainEntityOfPage: `${SITE_URL}/insights/${slug}`,
          inLanguage: "ar",
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "DOMINASE", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Insights", item: `${SITE_URL}/insights` },
            { "@type": "ListItem", position: 3, name: article.ar.title, item: `${SITE_URL}/insights/${slug}` },
          ],
        },
      ]} />
      <InsightArticleClient article={article} />
    </>
  );
}
