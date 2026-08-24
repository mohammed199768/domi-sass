"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ConsultationTrigger from "@/components/consultation/ConsultationTrigger";
import type { ConsultationService } from "@/components/consultation/ConsultationProvider";
import { useLanguage } from "@/context/LanguageContext";
import { trackDominaseEvent } from "@/lib/analytics";
import type { RelatedPathway } from "@/data/contentRelationships";

export default function RelatedPathways({ items, ctaLocation, serviceInterest }: { items: RelatedPathway[]; ctaLocation: string; serviceInterest?: ConsultationService }) {
  const { language, dir } = useLanguage();
  const heading = language === "ar" ? "خطوات مرتبطة" : "Related next steps";
  const consultation = language === "ar" ? "احجز استشارة" : "Book a consultation";
  return (
    <section className="related-pathways" aria-labelledby={`${ctaLocation}-related-title`}>
      <header><p>{language === "ar" ? "تابع من هنا" : "Continue from here"}</p><h2 id={`${ctaLocation}-related-title`}>{heading}</h2></header>
      <div className="related-pathways__grid">
        {items.slice(0, 2).map((item) => {
          const content = item[language];
          const eventName = item.kind === "service" ? "related_service_click" : item.kind === "work" ? "related_work_click" : "related_insight_click";
          return (
            <Link key={item.href} href={item.href} onClick={() => trackDominaseEvent(eventName, { page_path: window.location.pathname, language, cta_location: ctaLocation, destination: item.href })}>
              <span>{content.category}</span><h3>{content.title}</h3><p>{content.description}</p><small>{language === "ar" ? "استكشف" : "Explore"}<ArrowUpRight aria-hidden="true" className={dir === "rtl" ? "-scale-x-100" : ""} /></small>
            </Link>
          );
        })}
      </div>
      <ConsultationTrigger ctaLocation={`${ctaLocation}_consultation`} serviceInterest={serviceInterest} className="domi-action domi-action--primary">{consultation}<ArrowUpRight aria-hidden="true" className={dir === "rtl" ? "-scale-x-100" : ""} /></ConsultationTrigger>
    </section>
  );
}
