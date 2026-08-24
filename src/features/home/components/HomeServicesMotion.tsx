"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { FadeIn } from "./HomeMotionPrimitives";

const COPY = {
  ar: {
    eyebrow: "ما الذي نبنيه",
    title: "SERVICES",
    intro: "مواقع، منصات وأنظمة مصممة حول نتيجة واضحة — لا حول قائمة مميزات طويلة.",
    cta: "شاهد كل الخدمات",
    items: [
      { no: "01", name: "مواقع وبرمجيات الويب", description: "مواقع سريعة وواضحة مصممة للثقة، التحويل، والظهور في البحث — وليس لمجرد الحضور." },
      { no: "02", name: "منصات تعليمية", description: "تجربة كاملة للمحتوى، الطلاب، الاختبارات، التقدم، البيع والإدارة تحت اسمك." },
      { no: "03", name: "أنظمة أعمال مخصصة", description: "لوحات تحكم، CRM، صلاحيات، تقارير وسير عمل يناسب طريقة شغلك بدل إجبار فريقك على أدوات مشتتة." },
      { no: "04", name: "مواقع وأنظمة عيادات", description: "من الإعلان والـCTA إلى الحجز والمتابعة وإدارة الفرص، مع تجربة مريحة للمريض وفريق العيادة." },
      { no: "05", name: "UX/UI + Product Strategy", description: "نرتب المشكلة، الرحلة، الهيكل والتفاعل قبل أن تتحول إلى كود حتى يكون المنتج أبسط وأكثر قابلية للاستخدام والنمو." },
    ],
  },
  en: {
    eyebrow: "What we build",
    title: "SERVICES",
    intro: "Websites, platforms, and systems shaped around a clear outcome — not a long feature list.",
    cta: "Explore all services",
    items: [
      { no: "01", name: "Websites & Web Development", description: "Fast, clear digital experiences designed for trust, conversion, and discoverability — not just presence." },
      { no: "02", name: "Education Platforms", description: "Content, students, assessments, progress, sales, and administration under your own product and brand." },
      { no: "03", name: "Custom Business Systems", description: "Dashboards, CRM, permissions, reporting, and workflows shaped around how your team actually operates." },
      { no: "04", name: "Clinic Websites & Systems", description: "From campaign CTA to booking and follow-up, connecting the patient journey to the clinic operation behind it." },
      { no: "05", name: "UX/UI + Product Strategy", description: "We shape the problem, journey, information structure, and interactions before they become code." },
    ],
  },
} as const;

export default function HomeServicesMotion() {
  const { language, dir } = useLanguage();
  const copy = COPY[language];

  return (
    <section className="motion-services" aria-labelledby="motion-services-title">
      <div className="motion-services__shell">
        <FadeIn y={36} className="motion-services__heading">
          <p>{copy.eyebrow}</p>
          <h2 id="motion-services-title">{copy.title}</h2>
          <span>{copy.intro}</span>
        </FadeIn>
        <div className="motion-services__list">
          {copy.items.map((item, index) => (
            <FadeIn key={item.no} delay={index * 0.08} y={34} className="motion-services__item">
              <span className="motion-services__number" aria-hidden="true">{item.no}</span>
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.15} y={20} className="motion-services__cta">
          <Link href="/services" className="motion-pill motion-pill--dark">
            {copy.cta}
            <ArrowUpRight aria-hidden="true" className={dir === "rtl" ? "-scale-x-100" : ""} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
