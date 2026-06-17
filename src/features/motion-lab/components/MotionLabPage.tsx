"use client";

import CinematicTextRevealScene from "./CinematicTextRevealScene";
import ExpandingDotScene from "./ExpandingDotScene";
import HorizontalScrollScene from "./HorizontalScrollScene";
import StickySplitScene from "./StickySplitScene";

const sceneLinks = [
  { href: "#sticky-split", label: "Sticky split" },
  { href: "#horizontal-scroll", label: "Horizontal" },
  { href: "#expanding-dot", label: "Dot transition" },
  { href: "#text-reveal", label: "Text reveal" },
];

export default function MotionLabPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="relative min-h-screen overflow-hidden px-6 py-24 md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.18),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(244,114,182,0.16),transparent_30%)]" />
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-12rem)] max-w-7xl flex-col justify-end">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.32em] text-white/45">
            DOMI SASS / isolated experiments
          </p>
          <h1 className="max-w-5xl text-5xl font-black leading-[0.95] text-white md:text-8xl">
            Motion patterns for premium portfolio storytelling.
          </h1>
          <div className="mt-10 flex max-w-3xl flex-col gap-5 text-base leading-8 text-white/62 md:text-xl">
            <p>
              This route is intentionally separate from the real homepage. Each
              scene focuses on one reusable scroll interaction that can be
              studied, simplified, and later adapted.
            </p>
            <nav aria-label="Motion lab scenes" className="flex flex-wrap gap-3">
              {sceneLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white/75 transition hover:border-white/28 hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <StickySplitScene />
      <HorizontalScrollScene />
      <ExpandingDotScene />
      <CinematicTextRevealScene />

      <section className="px-6 py-28 md:px-10">
        <div className="mx-auto max-w-4xl border-t border-white/10 pt-12">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-white/35">
            End of lab
          </p>
          <h2 className="mt-5 text-3xl font-black text-white md:text-5xl">
            These are motion ingredients, not a redesign.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/58">
            The useful next step is to decide which pattern deserves to graduate
            into the portfolio: hero reveal, project storytelling, or case-study
            opening transitions.
          </p>
        </div>
      </section>
    </main>
  );
}
