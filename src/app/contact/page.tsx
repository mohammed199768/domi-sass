import type { Metadata } from "next";
import ContactOrbitClient from "@/features/contact/ContactOrbitClient";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, BRAND } from "@/config/seo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project conversation with DOMINASE — reach Mohammed Aldomi through WhatsApp, phone, email, or the contact form to discuss your digital product.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact — DOMINASE",
    description:
      "Start a project conversation with DOMINASE — reach Mohammed Aldomi through WhatsApp, phone, email, or the contact form.",
    url: `${SITE_URL}/contact`,
    siteName: BRAND.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — DOMINASE",
    description:
      "Start a project conversation with DOMINASE — reach Mohammed Aldomi through WhatsApp, phone, email, or the contact form.",
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Contact — DOMINASE",
          url: `${SITE_URL}/contact`,
          description:
            "Start a project conversation with DOMINASE through WhatsApp, phone, email, or the contact form.",
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
