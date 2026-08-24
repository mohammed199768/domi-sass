import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ServiceDetailClient from "@/features/services/ServiceDetailClient";
import "@/features/services/services.css";
import { serviceBySlug, services } from "@/data/services";
import { SITE_URL, BRAND } from "@/config/seo";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug[slug];
  if (!service) return {};
  return {
    title: service.ar.eyebrow,
    description: service.ar.lead,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: service.ar.title,
      description: service.ar.lead,
      url: `${SITE_URL}/services/${slug}`,
      siteName: BRAND.siteName,
      type: "website",
      locale: BRAND.locale,
      alternateLocale: [BRAND.localeAlternate],
    },
    twitter: {
      card: "summary_large_image",
      title: service.ar.title,
      description: service.ar.lead,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceBySlug[slug];
  if (!service) notFound();

  return (
    <>
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.ar.eyebrow,
          description: service.ar.lead,
          url: `${SITE_URL}/services/${slug}`,
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: [
            { "@type": "Country", name: "Jordan" },
            { "@type": "Country", name: "Saudi Arabia" },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "DOMINASE", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
            { "@type": "ListItem", position: 3, name: service.ar.eyebrow, item: `${SITE_URL}/services/${slug}` },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.ar.faq.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        },
      ]} />
      <ServiceDetailClient service={service} />
    </>
  );
}
