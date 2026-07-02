"use client";

import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhyPageCtaCluster, { type WhyCtaAction } from "@/components/WhyPageCtaCluster";
import SectionSignalField from "@/components/SectionSignalField";
import { useLanguage } from "@/context/LanguageContext";
import { gsap, registerMotionPlugins } from "@/lib/motion/gsapSetup";
import WhyChangeProgressSpine from "./WhyChangeProgressSpine";
import WhyChangeSceneFrame from "./WhyChangeSceneFrame";
import WhyChangeSources from "./WhyChangeSources";
import WhyChangeContinuityRail from "./WhyChangeContinuityRail";
import { whyChangeScenes } from "./whyChangeScenes";
import styles from "./why-change.module.css";

export default function WhyChangeFilmClient() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const filmRef = useRef<HTMLElement>(null);

  const whyChangeCtaActions: WhyCtaAction[] = [
    { label: isAr ? "ابدأ مشروعك" : "Start your project", href: "/#contact", intent: "primary" },
    { label: isAr ? "شاهد دراسات الحالة" : "View case studies", href: "/work", intent: "secondary" },
    { label: isAr ? "لماذا نحن؟" : "Why Us?", href: "/why-us", intent: "tertiary" },
  ];

  useEffect(() => {
    registerMotionPlugins();
    const root = filmRef.current;
    if (!root) return;

    let cancelled = false;
    let animeModule: typeof import("animejs") | null = null;
    let activeMicroAnimation: { cancel?: () => void; pause?: () => void } | null = null;
    const pulsed = new Set<number>();
    const loadAnime = () => import("animejs").then((module) => {
      if (!cancelled) animeModule = module;
    }).catch(() => undefined);

    const pulseScene = (scene: Element, index: number) => {
      activeMicroAnimation?.cancel?.();
      activeMicroAnimation?.pause?.();
      activeMicroAnimation = null;
      if (pulsed.has(index) || !animeModule) return;
      const nodes = scene.querySelectorAll("[data-anime-node], [data-anime-arrow]");
      if (!nodes.length) return;
      pulsed.add(index);
      activeMicroAnimation = animeModule.animate(nodes, {
        opacity: [{ to: 0.45, duration: 120 }, { to: 1, duration: 420 }],
        delay: animeModule.stagger(55), ease: "outQuad", loop: false,
      });
    };

    const context = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1100px) and (prefers-reduced-motion: no-preference)", () => {
        void loadAnime();
        const scenes = gsap.utils.toArray<HTMLElement>("[data-why-scene]", root);
        const flowPath = root.querySelector<SVGPathElement>("[data-flow-path]");
        if (!scenes.length) return;
        gsap.set(scenes, { autoAlpha: 0, yPercent: 5, scale: 0.985 });
        gsap.set(scenes[0], { autoAlpha: 1, yPercent: 0, scale: 1 });
        gsap.set(root.querySelectorAll("[data-scene-guide]"), { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.set(scenes[0].querySelectorAll("[data-scene-guide]"), { strokeDashoffset: 0 });
        if (flowPath) gsap.set(flowPath, { strokeDasharray: 1, strokeDashoffset: 1 });

        root.dataset.activeScene = scenes[0].dataset.sceneId ?? "shift";
        root.dataset.sceneIndex = "0";
        scenes.forEach((scene, index) => {
          scene.dataset.sceneActive = index === 0 ? "true" : "false";
          scene.setAttribute("aria-hidden", index === 0 ? "false" : "true");
        });

        const progressFill = root.querySelector("[data-progress-fill]");
        const progressNumber = root.querySelector("[data-progress-number]");
        let activeIndex = 0;
        const timeline = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: `+=${(scenes.length - 1) * 130}%`,
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate(self) {
              const next = Math.min(scenes.length - 1, Math.round(self.progress * (scenes.length - 1)));
              if (next !== activeIndex) {
                activeIndex = next;
                root.dataset.activeScene = scenes[next].dataset.sceneId ?? String(next);
                root.dataset.sceneIndex = String(next);
                scenes.forEach((scene, index) => {
                  scene.dataset.sceneActive = index === next ? "true" : "false";
                  scene.setAttribute("aria-hidden", index === next ? "false" : "true");
                });
                if (progressNumber) progressNumber.textContent = String(next + 1).padStart(2, "0");
                pulseScene(scenes[next], next);
              }
            },
          },
        });

        if (progressFill) timeline.to(progressFill, { scaleY: 1, duration: scenes.length - 1, ease: "none" }, 0);
        if (flowPath) timeline.to(flowPath, { strokeDashoffset: 0, duration: 2.2, ease: "power1.inOut" }, 0);
        scenes.slice(1).forEach((scene, index) => {
          const at = index + 0.72;
          const previous = scenes[index];
          timeline.to(previous, { autoAlpha: 0, yPercent: -5, scale: 0.985, duration: 0.32 }, at)
            .fromTo(scene, { autoAlpha: 0, yPercent: 6, scale: 0.985 }, { autoAlpha: 1, yPercent: 0, scale: 1, duration: 0.44 }, at + 0.16)
            .fromTo(scene.querySelectorAll("[data-chart-path]"), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.48, stagger: 0.04 }, at + 0.26);
          timeline.fromTo(scene.querySelectorAll("[data-scene-guide]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.7, stagger: 0.12 }, at + 0.2);
          const asset = scene.querySelector(".why-scene__asset");
          if (asset) timeline.fromTo(asset, { y: 18, scale: 0.985 }, { y: -3, scale: 1, duration: 0.62, ease: "power3.out" }, at + 0.15);
          const stat = scene.querySelector("[data-stat]");
          if (stat) timeline.fromTo(stat, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.3 }, at + 0.3);

        });
      });

      mm.add("(max-width: 1099px), (prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-why-scene]", { clearProps: "all" });
        gsap.set("[data-chart-path]", { clearProps: "all" });
      });
    }, root);

    return () => {
      cancelled = true;
      activeMicroAnimation?.cancel?.();
      activeMicroAnimation?.pause?.();
      activeMicroAnimation = null;
      context.revert();
    };
  }, [language]);

  return (
    <main className={`${styles.page} why-change-page`} lang={language} dir={isAr ? "rtl" : "ltr"}>
      <Header />
      <section className="why-film-intro" aria-labelledby="why-change-title">
        <SectionSignalField variant="diagnostic" className="why-intro-signal-field" />
        <div className="why-film-intro__signal" aria-hidden="true"><i /><span>WHY / CHANGE</span></div>
        <p className="why-kicker">{isAr ? "قصة تشخيصية تتحرك معك" : "A scroll-controlled diagnostic story"}</p>
        <h1 id="why-change-title">{isAr ? "لماذا التغيير؟" : "Why Change?"}</h1>
        <p>{isAr ? "الإعلان يجلب النقرة. لكن ماذا يحدث بعدها؟" : "Advertising earns the click. But what happens after it?"}</p>
        <a className="why-scroll-cue" href="#why-film-stage"><span>{isAr ? "ابدأ القصة" : "Enter the film"}</span><i aria-hidden="true" /></a>
      </section>

      <section ref={filmRef} id="why-film-stage" className="why-film" data-active-scene="shift" data-scene-index="0" aria-label={isAr ? "قصة لماذا التغيير" : "Why Change story"}>
        <div className="why-film__ambient" aria-hidden="true" />
        <WhyChangeContinuityRail />
        <div className="why-film__stage">
          {whyChangeScenes.map((scene, index) => <WhyChangeSceneFrame key={scene.id} scene={scene} isAr={isAr} index={index} />)}
        </div>
        <WhyChangeProgressSpine count={whyChangeScenes.length} isAr={isAr} />
      </section>

      <section className="why-final-cta" aria-labelledby="why-final-title">
        <SectionSignalField variant="diagnostic" className="why-cta-signal-field" />
        <p className="why-kicker">{isAr ? "لا تدفع الانتباه نحو فراغ" : "Do not send attention into a leak"}</p>
        <h2 id="why-final-title">{isAr ? "ابنِ مكانًا يحوّل الاهتمام إلى خطوة." : "Build the place that turns interest into action."}</h2>
        <WhyPageCtaCluster
          className="why-cta-cluster"
          buttonClassName="why-button"
          ariaLabel={isAr ? "روابط الخطوة التالية" : "Next step links"}
          actions={whyChangeCtaActions}
        />
      </section>
      <WhyChangeSources isAr={isAr} />
      <Footer />
    </main>
  );
}
