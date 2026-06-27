"use client";

import Header from "@/components/Header";
import {
  Hero,
  AboutSection,
  BeneathInterfaceSection,
  PortfolioSection,
  TestimonialsSection,
  ContactPortalSection,
  FlowArt,
  FlowSection
} from "@/features/home";
import HeroScrollTransition from "@/features/home/components/HeroScrollTransition";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen font-sans">
      <Header />

      {/*
       * DOMINASE Gate Transition
       *
       * A cinematic 200vh sticky scroll zone where the Hero is the subject:
       *  - Camera stage zooms toward the DOMINASE wordmark
       *  - Wordmark counter-scales (gate depth illusion)
       *  - Supporting copy + CTAs fade out
       *  - Hero fades to background; gate seam ignites and dissolves
       *
       * The first section (AboutSection) appears in normal document flow
       * immediately after the gate zone ends — no scroll traps, no duplicate
       * DOM, no overflow issues. Its entrance animation is handled by FlowArt.
       */}
      <HeroScrollTransition hero={<Hero />} />

      {/* All post-hero sections in the Flow Art entrance system */}
      <FlowArt>
        {/* Hero -> AboutSection: "ominous-gate" folds in with the DOMINASE gate overlapping */}
        <FlowSection transition="ominous-gate">
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

        <FlowSection transition="panel-slide">
          <TestimonialsSection />
        </FlowSection>

        {/* Final conversion section: calm, stable. */}
        <FlowSection transition="settle">
          <ContactPortalSection />
        </FlowSection>
      </FlowArt>

      <Footer />
    </main>
  );
}
