"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import {
  Hero,
  AboutSection,
  BeneathInterfaceSection,
  PortfolioSection,
  TestimonialsSection,
  FlowArt,
  FlowSection
} from "@/features/home";
import Footer from "@/components/Footer";
import { scrollToSection } from "@/lib/motion/scrollToSection";

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const timers = [
      window.setTimeout(() => scrollToSection(hash, { updateHash: false }), 250),
      window.setTimeout(() => scrollToSection(hash, { updateHash: false }), 1250),
    ];

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <main className="min-h-screen font-sans">
      <Header />

      {/*
       * Hero — one viewport, normal document flow. The WebGL shader background
       * lives entirely inside the Hero section (HeroShaderBackground). No
       * sticky gate zone, no scroll trap: the next section simply rises after
       * it as the user scrolls.
       */}
      <Hero />

      {/* All post-hero sections in the Flow Art entrance system */}
      <FlowArt>
        {/* Hero -> AboutSection: light one-shot lift (opacity + translateY + slight scale) */}
        <FlowSection transition="depth-lift">
          <AboutSection />
        </FlowSection>

        {/*
         * BeneathInterfaceSection drives its own GSAP scrub internally.
         * "none" prevents external transform/clip from conflicting.
         */}
        <FlowSection transition="none">
          <BeneathInterfaceSection />
        </FlowSection>

        <FlowSection transition="depth-lift">
          <PortfolioSection />
        </FlowSection>

        {/* Final movement: social proof closes the page; conversion now lives
            on the dedicated /contact page (linked from every CTA). */}
        <FlowSection transition="panel-slide">
          <TestimonialsSection />
        </FlowSection>
      </FlowArt>

      <Footer />
    </main>
  );
}
