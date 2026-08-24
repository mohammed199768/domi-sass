"use client";

import { CheckCircle2 } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ConsultationTrigger from "@/components/consultation/ConsultationTrigger";
import RelatedPathways from "@/components/RelatedPathways";
import { useLanguage } from "@/context/LanguageContext";
import { serviceRelationships } from "@/data/contentRelationships";
import type { Service } from "@/data/services";
import type { ConsultationService } from "@/components/consultation/ConsultationProvider";

const SERVICE_INTEREST: Record<string, ConsultationService> = {
  "web-development": "website",
  "custom-systems": "system",
  "education-platforms": "education",
  "clinic-websites": "clinic",
};

export default function ServiceDetailClient({ service }: { service: Service }) {
  const { language } = useLanguage();
  const content = service[language];
  const ui = language === "ar"
    ? { problems: "متى تحتاج هذا النوع من المشروع؟", outcomes: "ماذا نبني داخل الحل؟", process: "كيف ننفذ المشروع؟", faq: "أسئلة شائعة", consultation: "احجز استشارة" }
    : { problems: "When does this kind of project make sense?", outcomes: "What goes into the solution?", process: "How we move through the project", faq: "Common questions", consultation: "Book a consultation" };
  const serviceInterest = SERVICE_INTEREST[service.slug];

  return (
    <>
      <Header />
      <main className="service-detail">
        <header className="service-detail__hero">
          <p>{content.eyebrow}</p><h1>{content.title}</h1><span>{content.lead}</span>
          <ConsultationTrigger ctaLocation="service_hero" originType="service" serviceInterest={serviceInterest} className="domi-action domi-action--primary">{ui.consultation}</ConsultationTrigger>
        </header>
        <section className="service-detail__problems"><header><p>01</p><h2>{ui.problems}</h2></header><ul>{content.problems.map((problem) => <li key={problem}><CheckCircle2 aria-hidden="true" /><span>{problem}</span></li>)}</ul></section>
        <section className="service-detail__outcomes"><header><p>02</p><h2>{ui.outcomes}</h2></header><div>{content.outcomes.map((outcome) => <article key={outcome.title}><h3>{outcome.title}</h3><p>{outcome.body}</p></article>)}</div></section>
        <section className="service-detail__process"><header><p>03</p><h2>{ui.process}</h2></header><ol>{content.process.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></li>)}</ol></section>
        <section className="service-detail__faq"><header><p>04</p><h2>{ui.faq}</h2></header><div>{content.faq.map((item) => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></section>
        <RelatedPathways items={serviceRelationships[service.slug] ?? []} ctaLocation={`service_${service.slug}`} serviceInterest={serviceInterest} />
      </main>
      <Footer />
    </>
  );
}
