"use client";

import Link from "next/link";
import { Github, Linkedin, Briefcase, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ConsultationTrigger from "@/components/consultation/ConsultationTrigger";

const columns = {
  en: [
    {
      title: "Services",
      links: [
        ["Web development", "/services/web-development"],
        ["Custom systems", "/services/custom-systems"],
        ["Education platforms", "/services/education-platforms"],
        ["Clinic websites & systems", "/services/clinic-websites"],
      ],
    },
    {
      title: "Work & insights",
      links: [
        ["Work", "/work"],
        ["Insights", "/insights"],
        ["PULSE Gym", "/work/pulse-gym"],
        ["Our Clinic", "/work/our-clinic"],
      ],
    },
    {
      title: "Solutions",
      links: [
        ["Education platforms", "/services/education-platforms"],
        ["Clinic systems", "/services/clinic-websites"],
        ["Business systems", "/services/custom-systems"],
        ["Websites", "/services/web-development"],
      ],
    },
    {
      title: "Company",
      links: [
        ["About", "/about"],
        ["Why DOMINASE?", "/why-us"],
        ["Digital diagnosis", "/diagnosis"],
        ["Jordan", "/markets/jordan"],
        ["Saudi Arabia", "/markets/saudi-arabia"],
        ["Contact", "/contact"],
      ],
    },
  ],
  ar: [
    {
      title: "الخدمات",
      links: [
        ["برمجة وتطوير المواقع", "/services/web-development"],
        ["الأنظمة المخصصة", "/services/custom-systems"],
        ["المنصات التعليمية", "/services/education-platforms"],
        ["مواقع وأنظمة العيادات", "/services/clinic-websites"],
      ],
    },
    {
      title: "الأعمال والمقالات",
      links: [
        ["الأعمال", "/work"],
        ["المقالات", "/insights"],
        ["PULSE Gym", "/work/pulse-gym"],
        ["Our Clinic", "/work/our-clinic"],
      ],
    },
    {
      title: "الحلول",
      links: [
        ["المنصات التعليمية", "/services/education-platforms"],
        ["أنظمة العيادات", "/services/clinic-websites"],
        ["أنظمة الأعمال", "/services/custom-systems"],
        ["المواقع", "/services/web-development"],
      ],
    },
    {
      title: "الشركة",
      links: [
        ["من نحن", "/about"],
        ["لماذا DOMINASE؟", "/why-us"],
        ["التشخيص الرقمي", "/diagnosis"],
        ["الأردن", "/markets/jordan"],
        ["السعودية", "/markets/saudi-arabia"],
        ["التواصل", "/contact"],
      ],
    },
  ],
} as const;

export default function Footer() {
  const { language } = useLanguage();
  const copy = language === "ar"
    ? {
        line: "شركة برمجة ومنتجات رقمية من عمّان، نعمل مع مشاريع في الأردن والسعودية. نبسّط المواقع، المنصات، الأنظمة وتجارب العملاء حتى تصبح أوضح وأسهل في الاستخدام والإدارة.",
        cta: "احجز استشارة",
        rights: "© 2026 DOMINASE. Software & Digital Products.",
      }
    : {
        line: "A software and digital product company from Amman, working with businesses in Jordan and Saudi Arabia. We simplify websites, platforms, systems, and customer journeys so they are easier to use and operate.",
        cta: "Book a consultation",
        rights: "© 2026 DOMINASE. Software & Digital Products.",
      };

  return (
    <footer className="site-footer border-t border-border bg-surface-muted px-5 py-14 text-foreground sm:px-6 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-border pb-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="font-display flex items-center gap-2 text-3xl font-black tracking-wide text-primary-theme">
              <span>DOMINASE</span><span className="mt-2 h-2 w-2 rounded-full bg-secondary-theme" />
            </div>
            <p className="mt-4 max-w-xl text-base leading-8 text-muted">{copy.line}</p>
            <ConsultationTrigger ctaLocation="footer_primary" originType="footer" className="domi-action domi-action--primary mt-6 inline-flex">
              {copy.cta}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </ConsultationTrigger>
          </div>

          <div className="site-footer__links grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {columns[language].map((column) => (
              <details className="site-footer__group" key={column.title}>
                <summary className="text-xs font-black uppercase tracking-[0.16em] text-[var(--domi-accent-readable)]"><span>{column.title}</span><span aria-hidden="true">+</span></summary>
                <ul className="site-footer__list mt-4 space-y-2.5">
                  {column.links.map(([label, href]) => (
                    <li key={href}>
                      <Link className="premium-link text-sm font-semibold" href={href}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 pt-8 md:flex-row">
          <p className="text-sm text-muted">{copy.rights}</p>
          <div className="flex gap-3">
            <a href="https://github.com/mohammed199768" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="premium-surface grid h-11 w-11 place-items-center rounded-full text-muted hover:text-primary-theme"><Github className="h-5 w-5" /></a>
            <a href="https://www.upwork.com/freelancers/~012bcb31d6467e2e71?mp_source=share" target="_blank" rel="noopener noreferrer" aria-label="Upwork" className="premium-surface grid h-11 w-11 place-items-center rounded-full text-muted hover:text-primary-theme"><Briefcase className="h-5 w-5" /></a>
            <a href="https://linkedin.com/in/mohammed199768" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="premium-surface grid h-11 w-11 place-items-center rounded-full text-muted hover:text-primary-theme"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
