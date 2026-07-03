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
    eyebrow: "DOMINASE / Diagnosis",
    title: "Standing still is not neutral. It is a quiet decline.",
    subtitle:
      "The market moves, attention scatters, and customer expectations rise every day. A website that stays the same does not hold its position; it falls behind quietly, and the loss compounds before anyone notices it.",
    heroMetaA: "WHY / CHANGE",
    heroMetaB: "SIGNAL / 01",
    chart: {
      title: "Conceptual diagnostic chart: customer expectations rise over time while a static website stays flat, and the gap between them is lost opportunity.",
      axis: "Time / Market movement",
      expectations: "Customer expectations",
      staticSite: "Static website",
      gap: "Lost opportunity",
      marker: "Gap widens",
      signals: ["Attention shifts", "Trust becomes visual", "Speed becomes expected"],
    },
    pressureEyebrow: "Four forces reshaping the market",
    pressureTitle: "The pressure map",
    pressure: [
      {
        title: "Attention has changed",
        body: "Your customer decides in a few seconds, on a small screen, between dozens of options. Attention is no longer simply given — it has to be earned with merit.",
      },
      {
        title: "Trust became visual",
        body: "Before anyone reads the details of your offer, they judge the surface that carries it. Design is no longer decoration; it has become the first signal of your competence.",
      },
      {
        title: "Speed became expected",
        body: "Slow pages and unclear paths are instantly read as neglect. Any hesitation or delay in your website interface becomes hesitation in the customer’s decision.",
      },
      {
        title: "Systems are your reputation",
        body: "Booking, replying, and following up. Your customers feel the strength or weakness of your internal system through the screen, whether you planned for it or not.",
      },
    ],
    leakEyebrow: "The invisible loss",
    leakTitle: "You do not see what leaks.",
    leakBody:
      "The most damaging losses are the quiet ones that never appear in sales reports. They happen one visitor at a time, in the small gap between interest and action.",
    leaks: [
      "Customers who were genuinely interested — but left before they contacted you.",
      "A strong offer — but it reached the customer one screen too late.",
      "A weak first impression — one that does not reflect your real professionalism.",
      "A complicated manual effort for the customer — where one click should have been enough.",
      "Trust that disappeared completely — before the first conversation even began.",
    ],
    leakCaption: "SIGNAL LOSS / UNMEASURED",
    shiftEyebrow: "The strategic shift",
    shiftTitle: "From mere presence to a working system.",
    shiftBefore: "Before",
    shiftAfter: "After",
    shifts: [
      ["From a static digital presence", "to a smart path guided toward action."],
      ["From design as a visual layer", "to design as trust architecture."],
      ["From pages that only describe", "to systems that move and respond."],
      ["From updates treated as a burden", "to continuous improvement that gives you an advantage."],
    ],
    ctaEyebrow: "The next step",
    ctaTitle: "Change is not a luxury or decoration. It is the system your business deserves in order to grow.",
    ctaBody:
      "Start a real conversation with us about what your website should be doing, and what its absence is silently costing you today.",
    ctaPrimary: "Start the diagnosis",
    ctaSecondary: "See the method",
    ctaAria: "Next step links",
  },
  ar: {
    eyebrow: "DOMINASE / التّشخيص",
    title: "الثبات ليس حياداً.. إنه تراجع صامت.",
    subtitle:
      "السوق يتحرك، والانتباه يتشتت، وتوقعات العملاء ترتفع كل يوم. الموقع الذي يبقى كما هو لا يحافظ على مكانه؛ بل يتأخر بهدوء، والخسارة تتراكم فيه قبل أن يلاحظها أحد.",
    heroMetaA: "لماذا / التغيير",
    heroMetaB: "إشارة / 01",
    chart: {
      title: "مخطط تشخيصي مفاهيمي: توقعات العملاء ترتفع مع الزمن بينما يبقى الموقع الثابت كما هو، والفجوة بينهما فرص مهدورة.",
      axis: "الزمن / حركة السوق",
      expectations: "توقعات العملاء",
      staticSite: "موقع ثابت",
      gap: "فرص مهدورة",
      marker: "الفجوة تتسع",
      signals: ["الانتباه يتحول", "الثقة تصبح بصرية", "السرعة تصبح متوقعة"],
    },
    pressureEyebrow: "أربع قوى تُعيد تشكيل السوق",
    pressureTitle: "خريطة الضغط",
    pressure: [
      {
        title: "الانتباه تغيّر",
        body: "عميلك يقرر في ثوانٍ معدودة، على شاشة صغيرة، بين عشرات الخيارات. الانتباه اليوم لم يعد يُمنح ببساطة — بل يجب أن يُنتزع بجدارة.",
      },
      {
        title: "الثقة صارت بصرية",
        body: "قبل أن يقرأ أي شخص تفاصيل عرضك، فإنه يحكم على السطح الذي يعيش عليه هذا العرض. التصميم لم يعد زينة؛ بل أصبح الدليل الأول على كفاءتك.",
      },
      {
        title: "السرعة صارت متوقعة",
        body: "الصفحات البطيئة والمسارات الغامضة تُترجم فوراً كإهمال. تذكّر: أي تردد أو بطء في واجهة موقعك، يتحول مباشرة إلى تردد في قرار العميل.",
      },
      {
        title: "الأنظمة هي سُمعتك",
        body: "الحجز، الرد، والمتابعة. عملاؤك يشعرون بمدى قوة أو ضعف نظامك الداخلي من خلف الشاشة، سواء خططت لذلك أم لا.",
      },
    ],
    leakEyebrow: "الخسارة غير المرئية",
    leakTitle: "أنت لا ترى ما يتسرب.",
    leakBody:
      "الخسائر الأشد فتكاً هي تلك الهادئة التي لا تظهر في تقارير المبيعات. إنها تحدث زائراً تلو الآخر، في تلك الفجوة الصغيرة بين \"الاهتمام\" و\"اتخاذ الخطوة\":",
    leaks: [
      "عملاء كانوا مهتمين حقاً — لكنهم غادروا قبل أن يراسلوك.",
      "عرض قوي — لكنه وصل للعميل متأخراً بشاشة واحدة.",
      "انطباع أول باهت — لا يعكس أبداً حجم احترافيتك على أرض الواقع.",
      "جهد يدوي معقد للعميل — في مكان كان يكفي فيه نقرة زر واحدة.",
      "ثقة تبخرت تماماً — حتى قبل أن تبدأ أول محادثة بينكم.",
    ],
    leakCaption: "فقد الإشارة / غير مقاس",
    shiftEyebrow: "التحول الاستراتيجي",
    shiftTitle: "من مجرد حضور.. إلى نظام يعمل.",
    shiftBefore: "قبل",
    shiftAfter: "بعد",
    shifts: [
      ["من حضور رقمي ثابت", "إلى مسار ذكي موجّه نحو الإجراء."],
      ["من تصميم كواجهة جمالية", "إلى تصميم كهندسة لبناء الثقة."],
      ["من صفحات تكتفي بالوصف", "إلى أنظمة تُحرّك وتتفاعل."],
      ["من تحديثات تُعتبر عبئاً", "إلى تطوير مستمر يمنحك الأفضلية."],
    ],
    ctaEyebrow: "الخطوة التالية",
    ctaTitle: "التغيير ليس ترفاً ولا زينة.. إنه النظام الذي يستحقه عملك لينمو.",
    ctaBody:
      "ابدأ معنا محادثة حقيقية حول ما يجب أن يفعله موقعك، وما الذي يكلفك فقدانه اليوم بصمت.",
    ctaPrimary: "ابدأ التّشخيص",
    ctaSecondary: "شاهد المنهجية",
    ctaAria: "روابط الخطوة التالية",
  },
} as const;

/* ── Gap chart: the strategic diagnostic behind the hero claim ────────────────
 * Conceptual, not analytical: no numbers, no percentages, no fake data.
 * One rising emerald line (customer expectations), one flat muted line
 * (a static website), and the hatched region between them — the quiet,
 * compounding loss. The chart keeps LTR geometry in both languages (time
 * axes read left-to-right universally); only the labels are localized. */

type GapChartCopy = {
  title: string;
  axis: string;
  expectations: string;
  staticSite: string;
  gap: string;
  marker: string;
  signals: readonly string[];
};

function GapChart({ c }: { c: GapChartCopy }) {
  // Signal dots sitting on the expectations curve, with their micro-labels.
  const signalDots = [
    { x: 116, y: 148 },
    { x: 202, y: 120 },
    { x: 284, y: 87 },
  ];

  return (
    <svg
      className="wc-gap-chart"
      viewBox="0 0 380 240"
      role="img"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      style={{ direction: "ltr" }}
    >
      <title>{c.title}</title>
      <defs>
        {/* Diagonal hatch — reads as "unmeasured loss", not as filled data. */}
        <pattern id="wc-gap-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" className="wc-gap-hatchline" />
        </pattern>
      </defs>

      {/* Axes */}
      <line className="wc-gap-axis" x1="34" y1="200" x2="352" y2="200" />
      <line className="wc-gap-axis" x1="34" y1="200" x2="34" y2="34" />
      {[114, 193, 272].map((x) => (
        <line key={x} className="wc-gap-axis" x1={x} y1="200" x2={x} y2="204" />
      ))}
      <text className="wc-gap-axis-label" x="193" y="222" textAnchor="middle">
        {c.axis}
      </text>

      {/* Legend */}
      <line className="wc-gap-swatch wc-gap-swatch--rise" x1="34" y1="20" x2="54" y2="20" />
      <text className="wc-gap-legend" x="60" y="23">{c.expectations}</text>
      <line className="wc-gap-swatch wc-gap-swatch--flat" x1="34" y1="36" x2="54" y2="36" />
      <text className="wc-gap-legend" x="60" y="39">{c.staticSite}</text>

      {/* The widening gap — hatched, conceptual */}
      <path
        className="wc-gap-area"
        d="M34 164 C 120 154, 210 110, 344 56 L344 158 L34 166 Z"
        fill="url(#wc-gap-hatch)"
      />
      <text className="wc-gap-area-label" x="252" y="136" textAnchor="middle">
        {c.gap}
      </text>

      {/* Static website — flat, muted */}
      <path className="wc-gap-flat" d="M34 164 L344 158" pathLength={1} />

      {/* Customer expectations — rising, emerald */}
      <path className="wc-gap-rise" d="M34 164 C 120 154, 210 110, 344 56" pathLength={1} />

      {/* Signal points along the rising line */}
      {signalDots.map((dot, i) => (
        <g key={dot.x}>
          <circle className="wc-gap-dot" cx={dot.x} cy={dot.y} r="3" style={{ transitionDelay: `${700 + i * 140}ms` }} />
          <text className="wc-gap-signal" x={dot.x} y={dot.y - 10} textAnchor="middle">
            {c.signals[i]}
          </text>
        </g>
      ))}

      {/* Diagnostic marker at the widest point */}
      <circle className="wc-gap-dot wc-gap-dot--end" cx="344" cy="56" r="3.6" style={{ transitionDelay: "1150ms" }} />
      <line className="wc-gap-bracket" x1="352" y1="56" x2="352" y2="158" />
      <line className="wc-gap-bracket" x1="348" y1="56" x2="356" y2="56" />
      <line className="wc-gap-bracket" x1="348" y1="158" x2="356" y2="158" />
      <text className="wc-gap-marker" x="352" y="44" textAnchor="end">
        {c.marker}
      </text>
    </svg>
  );
}

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
    { label: t.ctaPrimary, href: "/contact", intent: "primary" },
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

        <div className="wc-hero__visual" data-reveal style={{ transitionDelay: "220ms" }}>
          <div className="wc-hero__frame">
            <GapChart c={t.chart} />
            <div className="wc-hero__meta" aria-hidden="true">
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
