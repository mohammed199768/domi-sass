"use client";

/**
 * Why Change — "The cost of standing still."
 *
 * A strategic diagnostic experience in five movements:
 *   1. Diagnostic hero      — "Standing still is not neutral."
 *   2. Pressure map         — four forces already in motion
 *   3. The invisible loss   — leakage, with a liquid signal line breaking
 *                             into deterministic loss marks (SVG only)
 *   4. The strategic shift  — editorial before → after pairs
 *   5. Closing CTA          — calm, strong, emerald
 *
 * Motion system: one IntersectionObserver arms [data-reveal] elements with a
 * one-shot data-in attribute (no React state, no animation libraries, no
 * pinning, no scrub). CSS transitions do the rest — opacity/transform only.
 * Reduced motion: nothing is armed; the page renders fully visible & static.
 */

import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhyPageCtaCluster, { type WhyCtaAction } from "@/components/WhyPageCtaCluster";
import SectionSignalField from "@/components/SectionSignalField";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./why-change.module.css";

/* ── Copy ─────────────────────────────────────────────────────────────────── */

const COPY = {
  en: {
    eyebrow: "DOMINASE / DIAGNOSTIC",
    title: "Standing still is not neutral.",
    subtitle:
      "Markets move. Attention moves. Expectations rise. A website that stays the same is quietly falling behind — and the loss compounds before it is ever noticed.",
    heroMetaA: "WHY / CHANGE",
    heroMetaB: "SIGNAL / 01",
    pressureEyebrow: "Four forces already in motion",
    pressureTitle: "The pressure map.",
    pressure: [
      {
        title: "Attention moved",
        body: "Your customers decide in seconds, on small screens, between dozens of options. Attention is no longer given — it is won.",
      },
      {
        title: "Trust became visual",
        body: "Before anyone reads your offer, they judge the surface it lives on. Design is now the first proof of competence.",
      },
      {
        title: "Speed became expected",
        body: "Slow pages and unclear paths read as neglect. Hesitation in the interface becomes hesitation in the customer.",
      },
      {
        title: "Systems became reputation",
        body: "Booking, replying, following up — customers feel your internal system through the screen, whether you designed it or not.",
      },
    ],
    leakEyebrow: "The invisible loss",
    leakTitle: "You do not see what leaks.",
    leakBody:
      "The quiet losses rarely appear in any report. They happen one visitor at a time, in the gap between interest and action.",
    leaks: [
      "Leads who were interested — and never wrote",
      "An offer explained one screen too late",
      "A first impression that undersold the work",
      "Manual friction where a single click belonged",
      "Trust spent before the first conversation",
    ],
    leakCaption: "SIGNAL LOSS / UNMEASURED",
    shiftEyebrow: "The strategic shift",
    shiftTitle: "From presence to system.",
    shiftBefore: "Before",
    shiftAfter: "After",
    shifts: [
      ["A static presence", "A guided action path"],
      ["Design as decoration", "Design as trust architecture"],
      ["Pages that describe", "Systems that move"],
      ["Updates as chores", "Iteration as advantage"],
    ],
    ctaEyebrow: "The next step",
    ctaTitle: "Change is not decoration. It is the system your work deserves.",
    ctaBody:
      "Start with a conversation about what your website should be doing — and what it is silently costing you today.",
    ctaPrimary: "Start the shift",
    ctaSecondary: "See the method",
    ctaAria: "Next step links",
  },
  ar: {
    eyebrow: "DOMINASE / تشخيص",
    title: "الثبات ليس حيادًا.",
    subtitle:
      "السوق يتحرك، والانتباه يتحرك، والتوقعات ترتفع. الموقع الذي يبقى كما هو يتأخر بصمت — والخسارة تتراكم قبل أن يلاحظها أحد.",
    heroMetaA: "لماذا / التغيير",
    heroMetaB: "إشارة / 01",
    pressureEyebrow: "أربع قوى تتحرك بالفعل",
    pressureTitle: "خريطة الضغط.",
    pressure: [
      {
        title: "الانتباه تغيّر",
        body: "عميلك يقرر في ثوانٍ، على شاشة صغيرة، بين عشرات الخيارات. الانتباه لم يعد يُمنح — بل يُكسب.",
      },
      {
        title: "الثقة صارت بصرية",
        body: "قبل أن يقرأ أحد عرضك، يحكم على السطح الذي يعيش عليه. التصميم أصبح أول دليل على الكفاءة.",
      },
      {
        title: "السرعة صارت متوقعة",
        body: "الصفحات البطيئة والمسارات الغامضة تُقرأ كإهمال. التردد في الواجهة يتحول إلى تردد لدى العميل.",
      },
      {
        title: "الأنظمة صارت سمعة",
        body: "الحجز والرد والمتابعة — يشعر العملاء بنظامك الداخلي عبر الشاشة، سواء صممته أم لا.",
      },
    ],
    leakEyebrow: "الخسارة غير المرئية",
    leakTitle: "أنت لا ترى ما يتسرب.",
    leakBody:
      "الخسائر الهادئة لا تظهر في التقارير. تحدث زائرًا بعد زائر، في الفجوة بين الاهتمام والخطوة.",
    leaks: [
      "عملاء كانوا مهتمين — ولم يراسلوك",
      "عرض شُرح متأخرًا شاشة واحدة",
      "انطباع أول أقل من مستوى العمل",
      "احتكاك يدوي حيث كان يكفي ضغطة واحدة",
      "ثقة استُهلكت قبل أول محادثة",
    ],
    leakCaption: "فقد الإشارة / غير مقاس",
    shiftEyebrow: "التحول الاستراتيجي",
    shiftTitle: "من حضور إلى نظام.",
    shiftBefore: "قبل",
    shiftAfter: "بعد",
    shifts: [
      ["حضور ثابت", "مسار موجّه نحو الخطوة"],
      ["تصميم كزينة", "تصميم كهندسة ثقة"],
      ["صفحات تصف", "أنظمة تحرّك"],
      ["تحديثات كأعباء", "تطوير كأفضلية"],
    ],
    ctaEyebrow: "الخطوة التالية",
    ctaTitle: "التغيير ليس زينة. إنه النظام الذي يستحقه عملك.",
    ctaBody:
      "ابدأ بمحادثة حول ما يجب أن يفعله موقعك — وما الذي يكلفك اليوم بصمت.",
    ctaPrimary: "ابدأ التحول",
    ctaSecondary: "شاهد المنهجية",
    ctaAria: "روابط الخطوة التالية",
  },
} as const;

/* ── Leak signal: a liquid line that breaks into loss marks ───────────────── */

function LeakSignal({ caption }: { caption: string }) {
  return (
    <figure className="wc-leak-figure" aria-hidden="true">
      <svg className="wc-leak-svg" viewBox="0 0 340 210" focusable="false">
        {/* Healthy signal flowing in */}
        <path
          className="wc-leak-flow"
          d="M8 96 C 60 92, 104 64, 152 70 S 208 96, 224 100"
          pathLength={1}
        />
        {/* Break node */}
        <circle className="wc-leak-node" cx={224} cy={100} r={3.4} />
        {/* Weakened continuation */}
        <path
          className="wc-leak-fade"
          d="M224 100 C 252 104, 284 100, 330 92"
          pathLength={1}
        />
        {/* Loss marks scattering below the break — deterministic */}
        <line className="wc-leak-mark" x1={230} y1={116} x2={236} y2={126} style={{ transitionDelay: "900ms" }} />
        <line className="wc-leak-mark" x1={246} y1={128} x2={250} y2={138} style={{ transitionDelay: "1020ms" }} />
        <circle className="wc-leak-drop" cx={238} cy={150} r={2.2} style={{ transitionDelay: "1140ms" }} />
        <circle className="wc-leak-drop" cx={258} cy={160} r={1.7} style={{ transitionDelay: "1260ms" }} />
        <circle className="wc-leak-drop" cx={272} cy={146} r={1.4} style={{ transitionDelay: "1380ms" }} />
        {/* Measurement ticks */}
        <line className="wc-leak-tick" x1={152} y1={56} x2={152} y2={66} />
        <line className="wc-leak-tick" x1={90} y1={84} x2={100} y2={84} />
      </svg>
      <figcaption className="wc-leak-caption">
        <span>DOMINASE</span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function WhyChangeClient() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const t = COPY[isAr ? "ar" : "en"];
  const rootRef = useRef<HTMLElement>(null);

  const ctaActions: WhyCtaAction[] = [
    { label: t.ctaPrimary, href: "/#contact", intent: "primary" },
    { label: t.ctaSecondary, href: "/why-us", intent: "secondary" },
  ];

  /* One-shot reveal system: observer arms [data-reveal] → data-in.
     Progressive enhancement — without JS (or with reduced motion) the page
     is fully visible because hiding is scoped to [data-motion="armed"]. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    root.dataset.motion = "armed";
    const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.in = "true";
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
    );
    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      delete root.dataset.motion;
    };
  }, [language]);

  return (
    <main
      ref={rootRef}
      className={styles.page}
      lang={language}
      dir={isAr ? "rtl" : "ltr"}
    >
      <Header />

      {/* 1 — Diagnostic hero */}
      <section className="wc-hero" aria-labelledby="wc-title">
        <div className="wc-hero__copy">
          <p className="wc-eyebrow" data-reveal>{t.eyebrow}</p>
          <h1 id="wc-title" data-reveal style={{ transitionDelay: "90ms" }}>
            {t.title}
          </h1>
          <p className="wc-hero__subtitle" data-reveal style={{ transitionDelay: "180ms" }}>
            {t.subtitle}
          </p>
          <div data-reveal style={{ transitionDelay: "270ms" }}>
            <WhyPageCtaCluster
              className="wc-cta-cluster"
              buttonClassName="wc-button"
              ariaLabel={t.ctaAria}
              actions={ctaActions}
            />
          </div>
        </div>

        <div className="wc-hero__visual" data-reveal style={{ transitionDelay: "220ms" }} aria-hidden="true">
          <div className="wc-hero__frame">
            <SectionSignalField variant="diagnostic" className="wc-hero-signal" />
            <span className="wc-hero__scanline" />
            <div className="wc-hero__meta">
              <span>{t.heroMetaA}</span>
              <span>{t.heroMetaB}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Pressure map */}
      <section className="wc-pressure" aria-labelledby="wc-pressure-title">
        <header data-reveal>
          <p className="wc-eyebrow">{t.pressureEyebrow}</p>
          <h2 id="wc-pressure-title">{t.pressureTitle}</h2>
        </header>
        <ol className="wc-pressure__list">
          {t.pressure.map((force, index) => (
            <li key={force.title} data-reveal style={{ transitionDelay: `${index * 80}ms` }}>
              <span className="wc-pressure__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{force.title}</h3>
              <p>{force.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 3 — The invisible loss */}
      <section className="wc-leak" aria-labelledby="wc-leak-title">
        <div className="wc-leak__copy">
          <p className="wc-eyebrow" data-reveal>{t.leakEyebrow}</p>
          <h2 id="wc-leak-title" data-reveal style={{ transitionDelay: "80ms" }}>
            {t.leakTitle}
          </h2>
          <p className="wc-leak__body" data-reveal style={{ transitionDelay: "160ms" }}>
            {t.leakBody}
          </p>
          <ul className="wc-leak__list">
            {t.leaks.map((leak, index) => (
              <li key={leak} data-reveal style={{ transitionDelay: `${200 + index * 70}ms` }}>
                <span aria-hidden="true" />
                {leak}
              </li>
            ))}
          </ul>
        </div>
        <div className="wc-leak__visual" data-reveal style={{ transitionDelay: "240ms" }}>
          <LeakSignal caption={t.leakCaption} />
        </div>
      </section>

      {/* 4 — The strategic shift */}
      <section className="wc-shift" aria-labelledby="wc-shift-title">
        <header data-reveal>
          <p className="wc-eyebrow">{t.shiftEyebrow}</p>
          <h2 id="wc-shift-title">{t.shiftTitle}</h2>
        </header>
        <dl className="wc-shift__list">
          {t.shifts.map(([before, after], index) => (
            <div className="wc-shift__row" key={before} data-reveal style={{ transitionDelay: `${index * 90}ms` }}>
              <dt>
                <small>{t.shiftBefore}</small>
                {before}
              </dt>
              <span className="wc-shift__arrow" aria-hidden="true" />
              <dd>
                <small>{t.shiftAfter}</small>
                {after}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 5 — Closing CTA */}
      <section className="wc-final" aria-labelledby="wc-final-title">
        <div className="wc-final__panel" data-reveal>
          <SectionSignalField variant="diagnostic" className="wc-final-signal" />
          <p className="wc-eyebrow">{t.ctaEyebrow}</p>
          <h2 id="wc-final-title">{t.ctaTitle}</h2>
          <p className="wc-final__body">{t.ctaBody}</p>
          <WhyPageCtaCluster
            className="wc-cta-cluster wc-cta-cluster--center"
            buttonClassName="wc-button"
            ariaLabel={t.ctaAria}
            actions={ctaActions}
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
