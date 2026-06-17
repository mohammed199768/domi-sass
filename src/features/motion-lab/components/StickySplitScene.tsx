"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { gsap, registerMotionLabPlugins, ScrollTrigger } from "../utils/gsapSetup";

const steps = [
  {
    eyebrow: "01 / Context",
    title: "Frame the product before showing the interface.",
    body: "A premium case study should first make the viewer understand the pressure, audience, and business stakes.",
  },
  {
    eyebrow: "02 / System",
    title: "Let the visual side stay stable while the story advances.",
    body: "The right panel acts like a fixed evidence board. The left side changes the narrative without losing visual orientation.",
  },
  {
    eyebrow: "03 / Outcome",
    title: "End with a memorable proof moment.",
    body: "The final state can introduce metrics, a launch shot, or a stronger call to open the complete case study.",
  },
];

export default function StickySplitScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const copyRefs = useRef<HTMLDivElement[]>([]);
  const visualRefs = useRef<HTMLDivElement[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    registerMotionLabPlugins();

    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const copyItems = copyRefs.current;
    const visualItems = visualRefs.current;

    if (prefersReducedMotion) {
      gsap.set([...copyItems, ...visualItems], { clearProps: "all", opacity: 1, y: 0 });
      return;
    }

    const context = gsap.context(() => {
      gsap.set(copyItems.slice(1), { opacity: 0, y: 48 });
      gsap.set(visualItems.slice(1), { opacity: 0, scale: 0.94 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // The section uses CSS sticky for the full-screen layout. ScrollTrigger
      // only controls which text/visual state is active during the scroll.
      steps.slice(1).forEach((_, index) => {
        const currentIndex = index;
        const nextIndex = index + 1;

        timeline
          .to(copyItems[currentIndex], { opacity: 0, y: -42, duration: 0.35 })
          .to(visualItems[currentIndex], { opacity: 0, scale: 1.04, duration: 0.35 }, "<")
          .fromTo(copyItems[nextIndex], { opacity: 0, y: 54 }, { opacity: 1, y: 0, duration: 0.48 })
          .fromTo(visualItems[nextIndex], { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.48 }, "<");
      });
    }, section);

    ScrollTrigger.refresh();

    return () => context.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="sticky-split"
      ref={sectionRef}
      className="relative min-h-[320vh] border-y border-white/10 bg-[#080808]"
    >
      <div className="sticky top-0 flex min-h-screen items-center px-6 py-20 md:px-10">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="relative min-h-[420px]">
            {steps.map((step, index) => (
              <div
                key={step.eyebrow}
                ref={(node) => {
                  if (node) copyRefs.current[index] = node;
                }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-teal-200/60">
                  {step.eyebrow}
                </p>
                <h2 className="mt-6 max-w-xl text-4xl font-black leading-tight text-white md:text-6xl">
                  {step.title}
                </h2>
                <p className="mt-6 max-w-lg text-lg leading-8 text-white/58">
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.04] p-5 shadow-2xl shadow-black/40">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(45,212,191,0.25),transparent_26%),radial-gradient(circle_at_82%_78%,rgba(244,114,182,0.18),transparent_30%)]" />
            {steps.map((step, index) => (
              <div
                key={step.title}
                ref={(node) => {
                  if (node) visualRefs.current[index] = node;
                }}
                className="absolute inset-5 rounded-[1.5rem] border border-white/12 bg-[#101010]/88 p-6 backdrop-blur"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <span className="text-xs font-bold uppercase tracking-[0.24em] text-white/38">
                    Project evidence
                  </span>
                  <span className="h-2.5 w-2.5 rounded-full bg-teal-300 shadow-[0_0_24px_rgba(45,212,191,0.8)]" />
                </div>
                <div className="mt-8 grid gap-4">
                  <div className="h-48 rounded-2xl bg-gradient-to-br from-white/18 via-white/[0.06] to-transparent" />
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-24 rounded-xl bg-white/[0.07]" />
                    <div className="h-24 rounded-xl bg-white/[0.11]" />
                    <div className="h-24 rounded-xl bg-white/[0.07]" />
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="h-3 w-5/6 rounded-full bg-white/18" />
                    <div className="h-3 w-2/3 rounded-full bg-white/10" />
                    <div className="h-3 w-1/2 rounded-full bg-white/10" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-sm text-white/42">
                  <span>{step.eyebrow}</span>
                  <span>Scroll state {index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
