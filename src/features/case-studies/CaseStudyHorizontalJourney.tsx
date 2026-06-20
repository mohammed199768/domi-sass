"use client";

import Link from "next/link";
import { Globe } from "lucide-react";
import { useEffect, useRef } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { useLanguage } from "@/context/LanguageContext";
import { gsap, registerMotionPlugins, ScrollTrigger } from "@/lib/motion/gsapSetup";
import { useMediaQuery } from "@/lib/motion/useMediaQuery";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { caseStudyJourneyConfig } from "./caseStudyJourneyConfig";
import type { CaseStudy } from "./contracts";
import {
  CaseStudyAfterPanel,
  CaseStudyBeforePanel,
  CaseStudyFeaturesPanel,
  CaseStudyIntroPanel,
  CaseStudyResultPanel,
  CaseStudyStoryboardPanel,
  CaseStudyTransformationPanel,
} from "./CaseStudyPanels";
import { caseStudyThemeRegistry } from "./themeRegistry";

type Props = { study: CaseStudy };

export default function CaseStudyHorizontalJourney({ study }: Props) {
  const { language, toggleLanguage } = useLanguage();
  const content = study.content[language];
  const theme = caseStudyThemeRegistry[study.visualTheme];
  const isArabic = language === "ar";
  const reducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery(caseStudyJourneyConfig.desktopMediaQuery);
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    registerMotionPlugins();
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || !isDesktop || reducedMotion) return;

    const context = gsap.context(() => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const horizontalTween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance() * caseStudyJourneyConfig.scrollDistanceMultiplier}`,
          scrub: caseStudyJourneyConfig.trackScrub,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => gsap.set(progressRef.current, { scaleX: self.progress }),
        },
      });

      const svgPanel = track.querySelector<HTMLElement>("[data-panel='transformation']");
      const nodes = gsap.utils.toArray<SVGElement>("[data-system-node]", svgPanel ?? undefined);
      const paths = gsap.utils.toArray<SVGPathElement>("[data-system-path]", svgPanel ?? undefined);
      const dots = gsap.utils.toArray<SVGCircleElement>("[data-system-dot]", svgPanel ?? undefined);

      if (svgPanel) {
        gsap.timeline({ scrollTrigger: { trigger: svgPanel, containerAnimation: horizontalTween, start: "left 75%", end: "center center", scrub: caseStudyJourneyConfig.visualScrub } })
          .to(nodes, { x: 0, y: 0, rotation: 0, stagger: 0.05, duration: 0.65, ease: "power2.inOut" })
          .to(dots, { x: 0, y: 0, stagger: 0.025, duration: 0.5 }, 0.15)
          .to(paths, { strokeDashoffset: 0, stagger: 0.04, duration: 0.45 }, 0.36)
          .fromTo("[data-platform-core]", { opacity: 0.58, scale: 0.96 }, { opacity: 1, scale: 1, transformOrigin: "center", duration: 0.4 }, 0.38);
      }
    }, section);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, [isDesktop, reducedMotion]);

  const horizontal = isDesktop && !reducedMotion;
  const direction = isArabic ? "rtl" : "ltr";

  return (
    <main lang={language} dir={direction} className={`min-h-screen bg-background text-foreground ${isArabic ? "font-arabic" : "font-sans"}`}>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2 text-xl font-black text-primary-theme" aria-label={content.backHome}>Domi<span className="mt-1 h-2 w-2 rounded-full bg-secondary-theme" /></Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button type="button" onClick={toggleLanguage} aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"} className="flex h-9 items-center gap-2 rounded-full border border-border bg-surface px-3 text-xs font-black text-primary-theme"><Globe className="h-3.5 w-3.5" />{isArabic ? "EN" : "AR"}</button>
          </div>
        </div>
      </header>

      {horizontal && <div aria-hidden="true" className="fixed inset-x-0 top-16 z-40 h-0.5 bg-border"><div ref={progressRef} className="h-full origin-left scale-x-0 bg-secondary-theme" /></div>}

      <section ref={sectionRef} dir="ltr" aria-label={content.eyebrow} className={`overflow-hidden pt-16 ${horizontal ? "h-screen" : ""}`}>
        <div ref={trackRef} dir="ltr" style={{ gap: caseStudyJourneyConfig.panelGap }} className={horizontal ? "flex h-full w-max flex-row" : "block w-full"}>
          <div dir={direction}><CaseStudyIntroPanel study={study} content={content} isArabic={isArabic} theme={theme} /></div>
          <div dir={direction}><CaseStudyBeforePanel content={content} theme={theme} /></div>
          <div dir={direction}><CaseStudyTransformationPanel content={content} finalState={!horizontal} theme={theme} /></div>
          <div dir={direction}><CaseStudyAfterPanel content={content} /></div>
          <div dir={direction}><CaseStudyStoryboardPanel content={content} /></div>
          <div dir={direction}><CaseStudyFeaturesPanel content={content} /></div>
          <div dir={direction}><CaseStudyResultPanel content={content} /></div>
        </div>
      </section>
    </main>
  );
}
