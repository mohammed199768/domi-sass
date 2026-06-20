"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { gsap, registerMotionPlugins } from "@/lib/motion/gsapSetup";
import WhyUsTrustFrame from "./WhyUsTrustFrame";
import WhyUsStorySection from "./WhyUsStorySection";
import WhyUsProcessRail from "./WhyUsProcessRail";
import { whyUsHero, whyUsProcess, whyUsStories } from "./whyUsContent";
import styles from "./why-us.module.css";

export default function WhyUsPageClient() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const locale = isAr ? "ar" : "en";
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerMotionPlugins();
    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const reveals = gsap.utils.toArray<HTMLElement>("[data-why-us-reveal]", root);
        gsap.set(reveals, { autoAlpha: 0, y: 28 });

        gsap.fromTo(
          root.querySelectorAll("[data-why-us-hero]"),
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        );

        gsap.fromTo(
          root.querySelector("[data-why-us-hero-frame]"),
          { autoAlpha: 0, y: 26, scale: 0.985 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out", delay: 0.14 },
        );

        gsap.utils.toArray<HTMLElement>("[data-why-us-reveal]", root).forEach((element) => {
          gsap.to(element, {
            autoAlpha: 1,
            y: 0,
            duration: 0.68,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
              once: true,
            },
          });
        });

        const processPath = root.querySelector<SVGPathElement>("[data-process-path]");
        const processSection = root.querySelector("[data-process-section]");
        if (processPath && processSection) {
          gsap.fromTo(
            processPath,
            { strokeDasharray: 1, strokeDashoffset: 1 },
            {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: processSection,
                start: "top 72%",
                end: "bottom 62%",
                scrub: 0.45,
              },
            },
          );
          gsap.fromTo(
            root.querySelectorAll("[data-process-node]"),
            { scale: 0, transformOrigin: "center" },
            {
              scale: 1,
              duration: 0.36,
              stagger: 0.08,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: processSection,
                start: "top 68%",
                once: true,
              },
            },
          );
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-why-us-reveal], [data-why-us-hero], [data-why-us-hero-frame]", { clearProps: "all" });
        gsap.set("[data-process-path], [data-process-node]", { clearProps: "all" });
      });
    }, root);

    return () => context.revert();
  }, [language]);

  const pageCopy = isAr ? {
    kicker: "DOMINASE / الدليل",
    heroLabel: "شراكة تبدأ بالفهم",
    bridgeEyebrow: "العميل هو بطل القصة",
    bridgeTitle: "دورنا أن نمنحك الخطة والأدوات والطريق الواضح.",
    bridgeBody: "لا نضع شركتنا في مركز القصة. نضع عميلك هناك، ثم نبني النظام الذي يساعده على الفهم والثقة واتخاذ الخطوة التالية.",
    processEyebrow: "خطة مرئية، لا وعود غامضة",
    processTitle: "كيف نعمل معك؟",
    processIntro: "ست خطوات واضحة تنقل المشروع من الأسئلة الأولى إلى إطلاق يمكن فهمه ودعمه.",
    mattersEyebrow: "لماذا هذا يهم؟",
    mattersTitle: "لأن التخمين مكلف، والوضوح قابل للتحسين.",
    matters: [
      ["قرارات أوضح", "نعرف ما الذي نبنيه، ولمن، وما الخطوة التي يجب أن يدعمها."],
      ["اختبار بدل الافتراض", "نراجع الرسالة والمسار والتنفيذ، ثم نحسن ما يحتاج إلى تحسين."],
      ["شراكة مسؤولة", "يبقى العمل مفهومًا لك، من أول قرار إلى ما بعد الإطلاق."],
    ],
    ctaEyebrow: "الخطوة التالية",
    ctaTitle: "إذا كنت تريد موقعًا يبدو جميلًا فقط، فهناك كثيرون يمكنهم تنفيذه.",
    ctaBody: "أما إذا كنت تريد موقعًا يفهم عميلك، يعرض قيمتك بوضوح، ويكبر مع مشروعك… فنحن نبنيه معك من الفكرة إلى الإطلاق وما بعده.",
    primary: "ابدأ بناء موقعك معنا",
    secondary: "شاهد دراسات الحالة",
  } : {
    kicker: "DOMINASE / THE GUIDE",
    heroLabel: "A partnership that starts with understanding",
    bridgeEyebrow: "The customer is the hero",
    bridgeTitle: "Our role is to give you the plan, the tools, and a clear path.",
    bridgeBody: "We do not place ourselves at the center of the story. We place your customer there, then build the system that helps them understand, trust, and take the next step.",
    processEyebrow: "A visible plan, not a vague promise",
    processTitle: "How we work with you.",
    processIntro: "Six clear steps move the project from its first questions to a launch you can understand and support.",
    mattersEyebrow: "Why this matters",
    mattersTitle: "Because guessing is expensive, and clarity can be improved.",
    matters: [
      ["Clearer decisions", "We know what we are building, who it serves, and which next step it must support."],
      ["Testing over assumption", "We review the message, path, and implementation, then improve what evidence says needs attention."],
      ["Responsible partnership", "The work stays understandable to you from the first decision through launch and beyond."],
    ],
    ctaEyebrow: "The next step",
    ctaTitle: "If you only want a website that looks good, many people can build it.",
    ctaBody: "But if you want a website that understands your customer, communicates your value clearly, and grows with your business, we build it with you from idea to launch and beyond.",
    primary: "Start building your website with us",
    secondary: "View case studies",
  };

  return (
    <main ref={rootRef} className={styles.page} lang={language} dir={isAr ? "rtl" : "ltr"}>
      <Header />

      <section className="why-us-hero" aria-labelledby="why-us-title">
        <div className="why-us-hero__copy">
          <p className="why-us-kicker" data-why-us-hero>{pageCopy.kicker}</p>
          <h1 id="why-us-title" data-why-us-hero>{whyUsHero.title[locale]}</h1>
          <p className="why-us-hero__opening" data-why-us-hero>{whyUsHero.opening[locale]}</p>
          <p className="why-us-hero__core" data-why-us-hero>{whyUsHero.core[locale]}</p>
        </div>
        <div className="why-us-hero__visual" data-why-us-hero-frame>
          <WhyUsTrustFrame
            src="/assest/whyUs/undraw_handshake-deal_nwk6.svg"
            label={pageCopy.heroLabel}
            alt=""
            priority
          />
        </div>
        <a href="#why-us-story" className="why-us-scroll-cue">
          <span>{isAr ? "اتبع المسار" : "Follow the guide path"}</span>
          <i aria-hidden="true" />
        </a>
      </section>

      <section className="why-us-bridge" data-why-us-reveal aria-labelledby="why-us-bridge-title">
        <p className="why-us-kicker">{pageCopy.bridgeEyebrow}</p>
        <h2 id="why-us-bridge-title">{pageCopy.bridgeTitle}</h2>
        <p>{pageCopy.bridgeBody}</p>
      </section>

      <section id="why-us-story" className="why-us-story" aria-label={isAr ? "مبادئ العمل" : "Working principles"}>
        {whyUsStories.map((section, index) => (
          <WhyUsStorySection key={section.id} section={section} index={index} isAr={isAr} />
        ))}
      </section>

      <section className="why-us-process" data-process-section aria-labelledby="why-us-process-title">
        <header data-why-us-reveal>
          <p className="why-us-kicker">{pageCopy.processEyebrow}</p>
          <h2 id="why-us-process-title">{pageCopy.processTitle}</h2>
          <p>{pageCopy.processIntro}</p>
        </header>
        <WhyUsProcessRail steps={whyUsProcess} isAr={isAr} />
      </section>

      <section className="why-us-matters" aria-labelledby="why-us-matters-title">
        <header data-why-us-reveal>
          <p className="why-us-kicker">{pageCopy.mattersEyebrow}</p>
          <h2 id="why-us-matters-title">{pageCopy.mattersTitle}</h2>
        </header>
        <div>
          {pageCopy.matters.map(([title, body], index) => (
            <article key={title} data-why-us-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="why-us-cta" aria-labelledby="why-us-cta-title">
        <div data-why-us-reveal>
          <p className="why-us-kicker">{pageCopy.ctaEyebrow}</p>
          <h2 id="why-us-cta-title">{pageCopy.ctaTitle}</h2>
          <p>{pageCopy.ctaBody}</p>
          <div className="why-us-cta__actions">
            <Link href="/#contact" className="why-us-button why-us-button--primary">{pageCopy.primary}</Link>
            <Link href="/work" className="why-us-button">{pageCopy.secondary}</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

