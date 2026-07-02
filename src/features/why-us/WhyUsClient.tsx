"use client";

/**
 * Why Us — "The method behind DOMINASE."
 *
 * A proof/method experience in five movements:
 *   1. Method hero          — "Built like a system, not a template."
 *   2. The DOMINASE method  — four stages on a liquid process rail (SVG)
 *   3. What makes it different — precise claims, no slogans
 *   4. Execution discipline — how the studio actually works
 *   5. Closing CTA          — entering a serious build process
 *
 * Motion: same one-shot IntersectionObserver reveal system as /why-change —
 * no animation libraries, no pinning, no scrub, no per-frame state. The
 * process rail draws once via pathLength and holds. Reduced motion / no JS:
 * everything renders visible and static.
 */

import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhyPageCtaCluster, { type WhyCtaAction } from "@/components/WhyPageCtaCluster";
import SectionSignalField from "@/components/SectionSignalField";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./why-us.module.css";

/* ── Copy ─────────────────────────────────────────────────────────────────── */

const COPY = {
  en: {
    eyebrow: "DOMINASE / METHOD",
    title: "Built like a system, not a template.",
    subtitle:
      "We design websites the way engineers design structures: diagnose first, architect second, decorate never. What you see is the surface of a working system.",
    heroMetaA: "WHY / US",
    heroMetaB: "METHOD / 04-STAGE",
    methodEyebrow: "The DOMINASE method",
    methodTitle: "Four stages. One system.",
    method: [
      {
        name: "Diagnose",
        body: "We map your customer, your offer, and the one action that matters — before anything is drawn.",
      },
      {
        name: "Architect",
        body: "Structure, message, and path are decided as one system. The design has a job before it has a look.",
      },
      {
        name: "Build",
        body: "Cinematic, bilingual, responsive from the first commit — with performance treated as a constraint, not a hope.",
      },
      {
        name: "Refine",
        body: "After launch we watch, test, and improve. A system that cannot evolve was never a system.",
      },
    ],
    diffEyebrow: "Not a slogan — a position",
    diffTitle: "What makes this different.",
    diffs: [
      ["Business-first structure", "Every screen exists to move a decision forward — nothing is on the page by habit."],
      ["Cinematic but usable", "Motion earns its place or it is cut. Atmosphere never outranks the action."],
      ["Bilingual thinking", "Arabic and English are designed together from the start — not translated at the end."],
      ["Performance-conscious motion", "Nothing animates that would cost your visitors' hardware or your credibility."],
      ["Systems that grow", "Built to accept new pages, offers, and markets without a rebuild."],
    ],
    discEyebrow: "Execution discipline",
    discTitle: "How the studio works.",
    disciplines: [
      ["Clarity before visuals", "The message is settled before the first pixel."],
      ["Motion with purpose", "Every animation answers to a reason."],
      ["Responsive from the start", "Small screens are designed, not shrunk."],
      ["Performance as constraint", "Budgets for weight and motion are set early."],
      ["Brand consistency", "One visual language across every page and state."],
    ],
    ctaEyebrow: "The next step",
    ctaTitle: "This is a build process, not a purchase.",
    ctaBody:
      "If you are ready to treat your website as a working system, we are ready to build it with you — from diagnosis to launch and beyond.",
    ctaPrimary: "Start a build",
    ctaSecondary: "Why change?",
    ctaAria: "Next step links",
  },
  ar: {
    eyebrow: "DOMINASE / المنهجية",
    title: "مبني كنظام، لا كقالب.",
    subtitle:
      "نصمم المواقع كما يصمم المهندسون المنشآت: نشخّص أولًا، ثم نبني الهيكل، ولا نكتفي بالزينة أبدًا. ما تراه هو سطح نظام يعمل.",
    heroMetaA: "لماذا / نحن",
    heroMetaB: "منهجية / 4 مراحل",
    methodEyebrow: "منهجية DOMINASE",
    methodTitle: "أربع مراحل. نظام واحد.",
    method: [
      {
        name: "التشخيص",
        body: "نرسم خريطة عميلك وعرضك والخطوة الوحيدة التي تهم — قبل أن نرسم أي شيء آخر.",
      },
      {
        name: "الهندسة",
        body: "الهيكل والرسالة والمسار تُقرر كنظام واحد. للتصميم وظيفة قبل أن يكون له شكل.",
      },
      {
        name: "البناء",
        body: "سينمائي، ثنائي اللغة، متجاوب من أول سطر — والأداء قيد ملزم، لا أمنية.",
      },
      {
        name: "التحسين",
        body: "بعد الإطلاق نراقب ونختبر ونحسّن. النظام الذي لا يتطور لم يكن نظامًا.",
      },
    ],
    diffEyebrow: "ليست شعارات — بل موقف",
    diffTitle: "ما الذي يجعل هذا مختلفًا.",
    diffs: [
      ["هيكل يبدأ من العمل", "كل شاشة موجودة لتدفع قرارًا إلى الأمام — لا شيء في الصفحة بحكم العادة."],
      ["سينمائي وقابل للاستخدام", "الحركة تستحق مكانها أو تُحذف. الأجواء لا تتقدم على الخطوة أبدًا."],
      ["تفكير ثنائي اللغة", "العربية والإنجليزية تُصممان معًا من البداية — لا تُترجمان في النهاية."],
      ["حركة تراعي الأداء", "لا شيء يتحرك إن كان سيكلف أجهزة زوارك أو مصداقيتك."],
      ["أنظمة قابلة للنمو", "مبنية لتستوعب صفحات وعروضًا وأسواقًا جديدة دون إعادة بناء."],
    ],
    discEyebrow: "انضباط التنفيذ",
    discTitle: "كيف يعمل الاستوديو.",
    disciplines: [
      ["الوضوح قبل الشكل", "تُحسم الرسالة قبل أول بكسل."],
      ["حركة لها غاية", "كل حركة تخضع لسبب."],
      ["تجاوب من البداية", "الشاشات الصغيرة تُصمم، لا تُصغّر."],
      ["الأداء قيد ملزم", "ميزانيات الوزن والحركة تُحدد مبكرًا."],
      ["اتساق الهوية", "لغة بصرية واحدة عبر كل صفحة وحالة."],
    ],
    ctaEyebrow: "الخطوة التالية",
    ctaTitle: "هذه عملية بناء، وليست عملية شراء.",
    ctaBody:
      "إذا كنت مستعدًا للتعامل مع موقعك كنظام يعمل، فنحن مستعدون لبنائه معك — من التشخيص إلى الإطلاق وما بعده.",
    ctaPrimary: "ابدأ البناء",
    ctaSecondary: "لماذا التغيير؟",
    ctaAria: "روابط الخطوة التالية",
  },
} as const;

/* ── Process rail: liquid path connecting the four stages (desktop) ───────── */

const RAIL_NODES = [40, 306, 573, 840];

function MethodRail() {
  return (
    <svg className="wm-rail" viewBox="0 0 880 110" aria-hidden="true" focusable="false">
      <path
        className="wm-rail__path"
        d="M40 66 C 130 66, 200 40, 306 44 S 470 74, 573 66 S 760 36, 840 44"
        pathLength={1}
      />
      {RAIL_NODES.map((x, i) => (
        <circle
          key={x}
          className="wm-rail__node"
          cx={x}
          cy={i === 0 ? 66 : i === 1 ? 44 : i === 2 ? 66 : 44}
          r={5}
          style={{ transitionDelay: `${300 + i * 160}ms` }}
        />
      ))}
      {/* measurement ticks */}
      <line className="wm-rail__tick" x1={173} y1={30} x2={173} y2={40} />
      <line className="wm-rail__tick" x1={706} y1={78} x2={706} y2={88} />
    </svg>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function WhyUsClient() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const t = COPY[isAr ? "ar" : "en"];
  const rootRef = useRef<HTMLElement>(null);

  const ctaActions: WhyCtaAction[] = [
    { label: t.ctaPrimary, href: "/#contact", intent: "primary" },
    { label: t.ctaSecondary, href: "/why-change", intent: "secondary" },
  ];

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

      {/* 1 — Method hero */}
      <section className="wm-hero" aria-labelledby="wm-title">
        <div className="wm-hero__copy">
          <p className="wm-eyebrow" data-reveal>{t.eyebrow}</p>
          <h1 id="wm-title" data-reveal style={{ transitionDelay: "90ms" }}>
            {t.title}
          </h1>
          <p className="wm-hero__subtitle" data-reveal style={{ transitionDelay: "180ms" }}>
            {t.subtitle}
          </p>
          <div data-reveal style={{ transitionDelay: "270ms" }}>
            <WhyPageCtaCluster
              className="wm-cta-cluster"
              buttonClassName="wm-button"
              ariaLabel={t.ctaAria}
              actions={ctaActions}
            />
          </div>
        </div>
        <div className="wm-hero__visual" data-reveal style={{ transitionDelay: "220ms" }} aria-hidden="true">
          <div className="wm-hero__frame">
            <SectionSignalField variant="method" className="wm-hero-signal" />
            <span className="wm-hero__axis" />
            <div className="wm-hero__meta">
              <span>{t.heroMetaA}</span>
              <span>{t.heroMetaB}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — The DOMINASE method */}
      <section className="wm-method" aria-labelledby="wm-method-title">
        <header data-reveal>
          <p className="wm-eyebrow">{t.methodEyebrow}</p>
          <h2 id="wm-method-title">{t.methodTitle}</h2>
        </header>
        <div className="wm-method__rail" data-reveal aria-hidden="true">
          <MethodRail />
        </div>
        <ol className="wm-method__stages">
          {t.method.map((stage, index) => (
            <li key={stage.name} data-reveal style={{ transitionDelay: `${index * 110}ms` }}>
              <span className="wm-method__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{stage.name}</h3>
              <p>{stage.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 3 — What makes this different */}
      <section className="wm-diff" aria-labelledby="wm-diff-title">
        <header data-reveal>
          <p className="wm-eyebrow">{t.diffEyebrow}</p>
          <h2 id="wm-diff-title">{t.diffTitle}</h2>
        </header>
        <ul className="wm-diff__list">
          {t.diffs.map(([claim, proof], index) => (
            <li key={claim} data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
              <span className="wm-diff__mark" aria-hidden="true" />
              <h3>{claim}</h3>
              <p>{proof}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 4 — Execution discipline */}
      <section className="wm-disc" aria-labelledby="wm-disc-title">
        <div className="wm-disc__panel" data-reveal>
          <header>
            <p className="wm-eyebrow">{t.discEyebrow}</p>
            <h2 id="wm-disc-title">{t.discTitle}</h2>
          </header>
          <ol className="wm-disc__list">
            {t.disciplines.map(([rule, note], index) => (
              <li key={rule}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <strong>{rule}</strong>
                <p>{note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 — Closing CTA */}
      <section className="wm-final" aria-labelledby="wm-final-title">
        <div className="wm-final__panel" data-reveal>
          <SectionSignalField variant="method" className="wm-final-signal" />
          <p className="wm-eyebrow">{t.ctaEyebrow}</p>
          <h2 id="wm-final-title">{t.ctaTitle}</h2>
          <p className="wm-final__body">{t.ctaBody}</p>
          <WhyPageCtaCluster
            className="wm-cta-cluster wm-cta-cluster--center"
            buttonClassName="wm-button"
            ariaLabel={t.ctaAria}
            actions={ctaActions}
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
