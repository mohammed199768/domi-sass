import type { Metadata } from "next";
import ContactOrbitClient from "@/features/contact/ContactOrbitClient";
import "@/features/contact/contact-redesign.css";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, BRAND } from "@/config/seo";

export const metadata: Metadata = {
  title: "احجز استشارة | Contact",
  description:
    "احجز استشارة مع DOMINASE لمناقشة موقع، منصة تعليمية، نظام عيادة أو نظام أعمال مخصص، مع واتساب واتصال مباشر عند الحاجة.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Book a Consultation — DOMINASE",
    description:
      "Book a consultation about a website, education platform, clinic system, or custom digital product with DOMINASE.",
    url: `${SITE_URL}/contact`,
    siteName: BRAND.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Consultation — DOMINASE",
    description:
      "Book a consultation about a website, education platform, clinic system, or custom digital product with DOMINASE.",
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Book a Consultation — DOMINASE",
          url: `${SITE_URL}/contact`,
          description:
            "Start a software, education platform, clinic system, website, or custom digital product project with DOMINASE through the guided contact form, with direct channels available when needed.",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Contact",
                item: `${SITE_URL}/contact`,
              },
            ],
          },
        }}
      />
      <ContactOrbitClient />
    </>
  );
}
