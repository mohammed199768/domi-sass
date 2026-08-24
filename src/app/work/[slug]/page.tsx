import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/config/seo";
import ProductStoryExperience from "@/features/product-stories/ProductStoryExperience";
import {
  productStories,
  productStoryOrder,
} from "@/features/product-stories/productStories";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return productStoryOrder.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = productStories[slug];
  if (!story) return {};

  return {
    title: story.seo.title,
    description: story.seo.description,
    alternates: {
      canonical: `/work/${slug}`,
    },
    openGraph: {
      title: story.seo.title,
      description: story.seo.description,
      url: `${SITE_URL}/work/${slug}`,
      images: [{ url: story.cover }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: story.seo.title,
      description: story.seo.description,
      images: [story.cover],
    },
  };
}

export default async function WorkProductStoryPage({ params }: PageProps) {
  const { slug } = await params;
  const story = productStories[slug];
  if (!story) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: story.title,
      description: story.summary.en,
      url: `${SITE_URL}/work/${slug}`,
      image: `${SITE_URL}${story.cover}`,
      creator: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "DOMINASE" },
      inLanguage: ["en", "ar"],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "DOMINASE", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/work` },
        { "@type": "ListItem", position: 3, name: story.title, item: `${SITE_URL}/work/${slug}` },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductStoryExperience story={story} />
    </>
  );
}
