"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InteractiveShowcase, {
  type InteractivePanelItem,
} from "@/components/InteractiveShowcase";
import { useLanguage } from "@/context/LanguageContext";
import { services } from "@/data/services";

const SERVICE_MEDIA: Record<string, string> = {
  "web-development": "/media/product-stories/sultan-shadi/identity-home-wide.webp",
  "custom-systems": "/media/product-stories/pulse-gym/admin-overview-wide.webp",
  "education-platforms": "/media/product-stories/manal-alhihi/learning-world-wide.webp",
  "clinic-websites": "/media/product-stories/our-clinic/public-home-wide.webp",
};

const COPY = {
  ar: {
    eyebrow: "DOMINASE / الخدمات",
    title: "ما نبنيه.",
    lead: "أربعة مسارات تبدأ من رحلة المستخدم وطريقة تشغيل العمل، ثم نختار الواجهة والتقنية المناسبة.",
    panelLabel: "استكشف خدمات DOMINASE",
    read: "استكشف الخدمة",
    cta: "لست متأكداً من المسار المناسب؟",
    ctaBody: "احكِ لنا عن المشكلة الحالية، ونحدد معك إن كان المطلوب موقعاً أو نظاماً أو منصة أو مزيجاً بينها.",
    ctaLink: "ابدأ التشخيص",
  },
  en: {
    eyebrow: "DOMINASE / Services",
    title: "What we build.",
    lead: "Four paths that begin with the user journey and the way the work runs, then choose the right interface and technology.",
    panelLabel: "Explore DOMINASE services",
    read: "Explore service",
    cta: "Not sure which path fits?",
    ctaBody: "Tell us the current problem and we can identify whether it needs a site, system, platform, or a combination.",
    ctaLink: "Start diagnosis",
  },
} as const;

export default function ServicesIndexClient() {
  const { language, dir } = useLanguage();
  const copy = COPY[language];

  const items: InteractivePanelItem[] = services.map((service) => {
    const localized = service[language];
    return {
      id: service.slug,
      label: localized.eyebrow,
      title: localized.eyebrow,
      description: localized.title,
      eyebrow: language === "ar" ? "خدمة DOMINASE" : "DOMINASE service",
      meta: String(localized.outcomes.length).padStart(2, "0"),
      image: SERVICE_MEDIA[service.slug],
      imageAlt: `${localized.eyebrow} — ${localized.title}`,
      capabilities: localized.outcomes.slice(0, 3).map((outcome) => outcome.title),
      href: `/services/${service.slug}`,
    };
  });

  return (
    <>
      <Header />
      <main className="services-page">
        <header className="services-intro-card">
          <p>{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <span>{copy.lead}</span>
        </header>

        <InteractiveShowcase
          items={items}
          ariaLabel={copy.panelLabel}
          ctaLabel={copy.read}
          dir={dir}
          variant="services"
        />

        <section className="services-cta">
          <h2>{copy.cta}</h2>
          <p>{copy.ctaBody}</p>
          <Link href="/diagnosis" className="domi-action domi-action--primary">
            {copy.ctaLink}
            <ArrowUpRight aria-hidden="true" className={dir === "rtl" ? "-scale-x-100" : ""} />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
