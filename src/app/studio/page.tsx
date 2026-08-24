import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import HomeStudioProfile from "@/features/home/components/HomeStudioProfile";
import { BRAND, SITE_URL } from "@/config/seo";

export const metadata: Metadata = {
  title: "Studio | الاستوديو",
  description:
    "DOMINASE Studio — لقطات من المنتجات، الواجهات، الأفلام، التجارب البصرية والمشاريع التي نبنيها في الأردن والسعودية.",
  alternates: { canonical: "/studio" },
  openGraph: {
    title: "DOMINASE Studio",
    description: "Products, interfaces, films, and visual experiments from DOMINASE.",
    url: `${SITE_URL}/studio`,
    siteName: BRAND.siteName,
    type: "website",
  },
};

export default function StudioPage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "DOMINASE Studio",
        url: `${SITE_URL}/studio`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
      }} />
      <Header />
      <main className="pt-20">
        <h1 className="sr-only">DOMINASE Studio</h1>
        <HomeStudioProfile />
      </main>
      <Footer />
    </>
  );
}
