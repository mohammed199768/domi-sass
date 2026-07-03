"use client";

/**
 * Why Us — "The method behind DOMINASE."
 *
 * A proof/method experience in five movements:
 *   1. Method hero          — "We build an engine for your business growth."
 *   2. The DOMINASE method  — four stages on a liquid process rail (SVG)
 *   3. The DOMINASE commitment — delivery, transparency, support, performance
 *   4. What makes it different — precise claims, no slogans
 *   5. Execution discipline — how the studio actually works
 *   6. Closing CTA          — entering a serious build process
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
    eyebrow: "DOMINASE / Why Us?",
    title: "We do not sell you a ready-made template. We build an engine for your business growth.",
    subtitle:
      "Many websites look beautiful, but fail to bring in customers. The problem? They were designed as artboards, not business systems. At DOMINASE, we do not stop at decoration. We diagnose the challenges your business faces, then build a digital system designed specifically to turn your visitors into real customers.",
    heroMetaA: "WHY / US",
    heroMetaB: "METHOD / 04-STAGE",
    methodEyebrow: "The DOMINASE method",
    methodTitle: "Your journey from idea to execution.",
    method: [
      {
        name: "Diagnosis",
        label: "Understanding before code",
        body: "Before writing a single line of code, we sit with you to understand: Who is your customer? What stops them from buying today? And what is the one action you want them to take? We design based on your business goals, not only our design preferences.",
      },
      {
        name: "Trust architecture",
        label: "Planning",
        body: "We turn your answers into a clear path. Every page, button, and screen is placed for one reason: moving the customer one step closer to a decision and removing any complexity from their way.",
      },
      {
        name: "Living build",
        label: "Cinematic execution",
        body: "Here the magic begins. We turn the plans into a living digital experience, fully responsive across screens, and built to the highest standards of speed and performance.",
      },
      {
        name: "Continuous improvement",
        label: "After launch",
        body: "Our work does not end when the website is delivered. We monitor how real customers interact with your platform, test and improve performance, and make sure the system works at the highest possible efficiency.",
      },
    ],
    commitmentEyebrow: "The DOMINASE commitment",
    commitmentTitle: "Promises that are not negotiable.",
    commitmentIntro:
      "We know exactly what frustrates business owners when working with development agencies: delays, hidden costs, and disappearing communication. That is why we set strict rules that protect your time and investment.",
    commitments: [
      {
        title: "On-time delivery, no excuses",
        body: "Your time is money. The timeline we agree on at the beginning is a serious commitment, not a loose estimate.",
      },
      {
        title: "Full transparency, no surprise costs",
        body: "The price defined after the diagnosis stage is the final price for the agreed scope of work. No hidden fees appear suddenly halfway through.",
      },
      {
        title: "Real support after launch",
        body: "We do not hand you the keys and disappear. We provide a period of technical support and post-launch monitoring to make sure your system runs efficiently, while training you to manage your platform with ease.",
      },
      {
        title: "Performance without compromise",
        body: "Before handover, your website goes through strict performance testing to ensure fast loading and a stable experience across devices and screen sizes.",
      },
    ],
    diffEyebrow: "What makes us different?",
    diffTitle: "How we solve the problems and challenges of your business.",
    diffs: [
      {
        title: "You speak with the minds that build",
        label: "No middle layers",
        body: "The biggest pain clients face is losing their ideas as they pass through sales staff. With us, you sit directly with the design and development team. Your idea moves from your mind to the hands of the people executing it immediately, which ensures deep understanding of your vision and fast execution without imaginary promises.",
      },
      {
        title: "Cinematic experiences that do not sacrifice speed",
        body: "Slow websites kill sales. We combine striking visual motion, cinematic experiences, and three-dimensional depth with fast performance. Every movement on your website has a purpose: guiding the customer’s eye toward the next step without costing your visitors a single second of delay.",
      },
      {
        title: "Systems built to grow",
        label: "Unlike websites that die quickly",
        body: "Are you worried you will need to rebuild your website next year? We build your platform on solid foundations that can expand. Whether you add new services or target different markets, your system is ready to absorb your growth without starting from zero.",
      },
      {
        title: "Native bilingual thinking",
        label: "Arabic and English",
        body: "We do not treat Arabic as a secondary idea or a reversed translation. We design and build every screen to feel complete and comfortable to the user’s eye, whether they read from right or left.",
      },
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
    ctaTitle: "This is not a traditional purchase. It is a partnership to build one of your company’s assets.",
    ctaBody:
      "If you are tired of temporary solutions and slow websites, and you are ready to work with a team that understands the language of your business and executes it technically with precision, we are ready.",
    ctaPrimary: "Start a build conversation",
    ctaSecondary: "Why change?",
    ctaAria: "Next step links",
  },
  ar: {
    eyebrow: "DOMINASE / لماذا نحن؟",
    title: "نحن لا نبيعك قالباً جاهزاً.. نحن نبني محركاً لنمو أعمالك.",
    subtitle:
      "العديد من المواقع تبدو جميلة، لكنها تفشل في جلب العملاء. المشكلة؟ أنها صُممت كلوحات فنية، لا كأنظمة عمل. في DOMINASE، نحن لا نكتفي بالزينة، بل نشخص التحديات التي يواجهها عملك، ثم نبني نظاماً رقمياً مصمماً خصيصاً ليحول زوارك إلى عملاء حقيقيين.",
    heroMetaA: "لماذا / نحن",
    heroMetaB: "منهجية / 4 مراحل",
    methodEyebrow: "منهجية DOMINASE",
    methodTitle: "رحلتك من الفكرة إلى التنفيذ.",
    method: [
      {
        name: "التشخيص",
        label: "الفهم قبل الكود",
        body: "قبل أن نكتب سطراً برمجياً واحداً، نجلس معك لنفهم: من هو عميلك؟ ما الذي يمنعه من الشراء اليوم؟ وما هي الخطوة الوحيدة التي تريد منه اتخاذها؟ نحن نصمم بناءً على أهدافك التجارية، وليس فقط رغباتنا التصميمية.",
      },
      {
        name: "هندسة الثقة",
        label: "التخطيط",
        body: "نحول إجاباتك إلى مسار واضح. كل صفحة، كل زر، وكل شاشة تُوضع لسبب واحد: دفع العميل خطوة إضافية نحو اتخاذ القرار، وإزالة أي تعقيد من طريقه.",
      },
      {
        name: "البناء الحي",
        label: "التنفيذ السينمائي",
        body: "هنا يبدأ السحر. نحول المخططات إلى تجربة رقمية حية، متجاوبة تماماً مع كل الشاشات، وتعمل بأعلى معايير الأداء والسرعة.",
      },
      {
        name: "التحسين المستمر",
        label: "ما بعد الإطلاق",
        body: "عملنا لا ينتهي عند تسليم الموقع. نحن نراقب كيف يتفاعل العملاء الحقيقيون مع منصتك، ونقوم باختبار وتحسين الأداء لضمان أن النظام يعمل بأقصى كفاءة ممكنة.",
      },
    ],
    commitmentEyebrow: "التزام DOMINASE",
    commitmentTitle: "وعود لا تقبل المساومة.",
    commitmentIntro:
      "نحن نعرف تماماً ما يزعج أصحاب الأعمال عند التعامل مع وكالات البرمجة: التأخير، التكاليف المخفية، وانقطاع التواصل. لذلك وضعنا قواعد صارمة تحمي وقتك واستثمارك.",
    commitments: [
      {
        title: "تسليم في الموعد، بلا أعذار",
        body: "وقتك هو مالك. الجدول الزمني الذي نتفق عليه في البداية هو التزام صارم، وليس مجرد تقدير أولي.",
      },
      {
        title: "شفافية تامة، ولا تكاليف مفاجئة",
        body: "السعر الذي يتم تحديده بعد مرحلة التشخيص هو السعر النهائي للعمل المتفق عليه. لا توجد رسوم مخفية تظهر فجأة في منتصف الطريق.",
      },
      {
        title: "دعم حقيقي بعد الإطلاق",
        body: "لن نكتفي بتسليمك المفاتيح ونختفي. نقدم لك فترة دعم فني ومراقبة بعد الإطلاق لضمان أن نظامك يعمل بأقصى كفاءة، مع تدريبك على إدارة منصتك بسهولة تامة.",
      },
      {
        title: "أداء لا يقبل التنازل",
        body: "نضمن لك قبل استلام المشروع أن موقعك قد خضع لاختبارات أداء صارمة، ليضمن سرعة تحميل فائقة وتجربة خالية من الأخطاء على كافة الأجهزة والشاشات.",
      },
    ],
    diffEyebrow: "ما الذي يجعلنا مختلفين؟",
    diffTitle: "كيف نعالج مشاكل وتحديات عملك.",
    diffs: [
      {
        title: "أنت تتحدث مع العقول التي تبني",
        label: "لا يوجد وسطاء",
        body: "أكبر ألم يواجهه العملاء هو ضياع أفكارهم عند نقلها عبر موظفي المبيعات. معنا، أنت تجلس مباشرة مع فريق التصميم والبرمجة. فكرتك تنتقل من عقلك إلى أيدي من ينفذها فوراً، مما يضمن فهماً عميقاً لرؤيتك وسرعة في التنفيذ بدون أي وعود وهمية.",
      },
      {
        title: "تجارب سينمائية.. لا تضحي بالسرعة",
        body: "المواقع البطيئة تقتل المبيعات. نحن ندمج بين الحركات البصرية المذهلة والتجارب السينمائية وثلاثية الأبعاد وبين الأداء السريع. كل حركة في موقعك لها هدف: توجيه عين العميل نحو الخطوة التالية دون أن نكلف أجهزة زوارك ثانية واحدة من التأخير.",
      },
      {
        title: "أنظمة قابلة للنمو",
        label: "عكس المواقع التي تموت سريعاً",
        body: "هل تخشى أن تضطر لإعادة بناء موقعك العام القادم؟ نحن نبني لك منصة بأساسات صلبة قادرة على التوسع. سواء أضفت خدمات جديدة، أو استهدفت أسواقاً مختلفة، نظامك جاهز لاستيعاب نموك دون الحاجة للبدء من الصفر.",
      },
      {
        title: "تفكير أصيل باللغتين",
        label: "العربية والإنجليزية",
        body: "لا نترك اللغة العربية كفكرة ثانوية أو مجرد ترجمة مقلوبة. نحن نصمم ونبني كل شاشة لتكون متكاملة ومريحة لعين المستخدم، سواء كان يقرأ من اليمين أو اليسار.",
      },
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
    ctaTitle: "هذه ليست عملية شراء تقليدية.. إنها شراكة لبناء أصل من أصول شركتك.",
    ctaBody:
      "إذا كنت متعباً من الحلول المؤقتة والمواقع البطيئة، ومستعداً للعمل مع فريق يفهم لغة أعمالك وينفذها تقنياً ببراعة، فنحن جاهزون.",
    ctaPrimary: "ابدأ محادثة بناء",
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
              <span className="wm-method__label">{stage.label}</span>
              <h3>{stage.name}</h3>
              <p>{stage.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 3 — The DOMINASE commitment */}
      <section className="wm-commitment" aria-labelledby="wm-commitment-title">
        <div className="wm-commitment__intro" data-reveal>
          <p className="wm-eyebrow">{t.commitmentEyebrow}</p>
          <h2 id="wm-commitment-title">{t.commitmentTitle}</h2>
          <p>{t.commitmentIntro}</p>
        </div>
        <ol className="wm-commitment__list">
          {t.commitments.map((commitment, index) => (
            <li key={commitment.title} data-reveal style={{ transitionDelay: `${index * 85}ms` }}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{commitment.title}</h3>
              <p>{commitment.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 4 — What makes this different */}
      <section className="wm-diff" aria-labelledby="wm-diff-title">
        <header data-reveal>
          <p className="wm-eyebrow">{t.diffEyebrow}</p>
          <h2 id="wm-diff-title">{t.diffTitle}</h2>
        </header>
        <ul className="wm-diff__list">
          {t.diffs.map((diff, index) => (
            <li key={diff.title} data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
              <span className="wm-diff__mark" aria-hidden="true" />
              <div className="wm-diff__claim">
                {"label" in diff ? <span>{diff.label}</span> : null}
                <h3>{diff.title}</h3>
              </div>
              <p>{diff.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 5 — Execution discipline */}
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

      {/* 6 — Closing CTA */}
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
