"use client";

import Link from "next/link";
import { ArrowUpRight, CalendarHeart, GraduationCap, Layers3 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import ConsultationTrigger from "@/components/consultation/ConsultationTrigger";

const COPY = {
  ar: {
    eyebrow: "ابدأ من النتيجة",
    title: "اختر المستقبل الذي تريد أن تبنيه.",
    body: "بدل نموذج تواصل عام، اختر المسار الأقرب لفكرتك وسنأخذك مباشرة إلى الأسئلة التي تحدد شكل المنتج الصحيح.",
    screen: "DOMINASE / Interactive project paths",
    paths: [
      {
        id: "education",
        icon: GraduationCap,
        eyebrow: "للأساتذة والأكاديميات",
        title: "ابنِ مستقبلك التعليمي.",
        body: "منصة باسمك لإدارة المحتوى، الطلاب، الاختبارات، البيع والمتابعة بدون الاعتماد على أدوات مبعثرة.",
        bullets: ["منصة فردية أو متعددة المدرسين", "فيديو، اختبارات وتتبع تقدم", "إدارة وبيع من مكان واحد"],
        cta: "ابدأ منصتك التعليمية",
        href: "/contact?path=education",
        secondaryCta: null,
        secondaryHref: null,
      },
      {
        id: "clinic",
        icon: CalendarHeart,
        eyebrow: "للعيادات والأنظمة",
        title: "ابنِ نظاماً يشتغل معك، لا عليك.",
        body: "من موقع العيادة والحجز إلى CRM أو نظام أعمال مخصص: نبني المسار الذي يجمع العميل والعملية في تجربة واحدة أوضح.",
        bullets: ["CTA وحجز حسب الخدمة والحملة", "CRM ومتابعة للفرص", "لوحات تحكم وعمليات مخصصة"],
        cta: "ابدأ نظام أعمال",
        href: "/contact?path=system",
        secondaryCta: "ابدأ موقع أو نظام عيادة",
        secondaryHref: "/contact?path=clinic",
      },
    ],
    footer: "عندك مشروع مختلف؟",
    general: "احجز استشارة",
  },
  en: {
    eyebrow: "Start from the outcome",
    title: "Choose the future you want to build.",
    body: "Instead of a generic contact form, choose the path closest to your idea and go straight to the questions that shape the right product.",
    screen: "DOMINASE / Interactive project paths",
    paths: [
      {
        id: "education",
        icon: GraduationCap,
        eyebrow: "For instructors and academies",
        title: "Build your education future.",
        body: "A platform under your brand for content, students, assessments, sales, and progress tracking — without scattered tools.",
        bullets: ["Single or multi-instructor", "Video, quizzes, progress tracking", "Sales and admin in one place"],
        cta: "Start your education platform",
        href: "/contact?path=education",
        secondaryCta: null,
        secondaryHref: null,
      },
      {
        id: "clinic",
        icon: CalendarHeart,
        eyebrow: "For clinics and business systems",
        title: "Build a system that works with you, not against you.",
        body: "From clinic booking to CRM or a custom operations system, we connect the customer-facing journey to the workflow behind it.",
        bullets: ["Campaign-aware CTA and booking", "CRM and lead follow-up", "Custom dashboards and workflows"],
        cta: "Start a business system",
        href: "/contact?path=system",
        secondaryCta: "Start a clinic website or system",
        secondaryHref: "/contact?path=clinic",
      },
    ],
    footer: "Building something else?",
    general: "Book a consultation",
  },
} as const;

export default function HomeActionGateway() {
  const ref = useRef<HTMLElement>(null);
  const { language, dir } = useLanguage();
  const copy = COPY[language];
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0.1, 0.55, 0.9], [16, 0, -2]);
  const scale = useTransform(scrollYProgress, [0.08, 0.55, 0.92], [0.86, 1, 0.98]);
  const translateY = useTransform(scrollYProgress, [0.08, 0.55], [70, 0]);
  const headingY = useTransform(scrollYProgress, [0.08, 0.5], [80, -8]);
  const path = copy.paths[active];
  const Icon = path.icon;

  return (
    <section ref={ref} id="start" className="future-cta" aria-labelledby="future-cta-title">
      <motion.header className="future-cta__heading" style={{ y: headingY }}>
        <p>{copy.eyebrow}</p>
        <h2 id="future-cta-title">{copy.title}</h2>
        <span>{copy.body}</span>
      </motion.header>

      <div className="future-cta__perspective">
        <motion.div className="future-cta__device" style={{ rotateX, scale, y: translateY }}>
          <header className="future-cta__topbar">
            <div><span>DOMINASE</span><i /></div>
            <p>{copy.screen}</p>
          </header>

          <div className="future-cta__tabs" role="tablist" aria-label={copy.eyebrow}>
            {copy.paths.map((item, index) => {
              const TabIcon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  onClick={() => setActive(index)}
                >
                  <TabIcon aria-hidden="true" />
                  <span>{item.eyebrow}</span>
                </button>
              );
            })}
          </div>

          <motion.div
            key={`${language}-${path.id}`}
            className="future-cta__body"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
          >
            <div className="future-cta__icon"><Icon aria-hidden="true" /></div>
            <p>{path.eyebrow}</p>
            <h3>{path.title}</h3>
            <span>{path.body}</span>
            <ul>
              {path.bullets.map((bullet) => <li key={bullet}><i /><span>{bullet}</span></li>)}
            </ul>
            <div className="future-cta__path-actions">
              <ConsultationTrigger ctaLocation={`home_path_${path.id}`} originType="home" serviceInterest={path.id === "education" ? "education" : "system"} className="domi-action domi-action--primary">
                {language === "ar" ? "احجز استشارة" : "Book a consultation"}<ArrowUpRight aria-hidden="true" className={dir === "rtl" ? "-scale-x-100" : ""} />
              </ConsultationTrigger>
              <Link href={path.id === "education" ? "/services/education-platforms" : "/services/custom-systems"} className="domi-action domi-action--secondary">
                {language === "ar" ? "استكشف الخدمة" : "Explore service"}<ArrowUpRight aria-hidden="true" className={dir === "rtl" ? "-scale-x-100" : ""} />
              </Link>
            </div>
          </motion.div>

          <footer>
            <span><Layers3 aria-hidden="true" />{copy.footer}</span>
            <ConsultationTrigger ctaLocation="home_gateway_footer" originType="home">{copy.general}<ArrowUpRight aria-hidden="true" /></ConsultationTrigger>
          </footer>
        </motion.div>
      </div>
    </section>
  );
}
