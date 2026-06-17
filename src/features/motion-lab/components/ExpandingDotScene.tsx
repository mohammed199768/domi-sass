"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { gsap, registerMotionLabPlugins, ScrollTrigger } from "../utils/gsapSetup";

export default function ExpandingDotScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    registerMotionLabPlugins();

    const section = sectionRef.current;
    const dot = dotRef.current;
    const content = contentRef.current;

    if (!section || !dot || !content) {
      return;
    }

    if (prefersReducedMotion) {
      gsap.set(dot, { scale: 42 });
      gsap.set(content, { opacity: 1, y: 0 });
      return;
    }

    const context = gsap.context(() => {
      gsap.set(dot, { scale: 1, transformOrigin: "50% 50%" });
      gsap.set(content, { opacity: 0, y: 44 });

      // Scale is GPU-friendly and avoids layout recalculation. The dot grows
      // into the scene background while the content reveals after coverage.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=140%",
            scrub: 0.75,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        .to(dot, { scale: 58, ease: "power2.inOut", duration: 1 })
        .to(content, { opacity: 1, y: 0, ease: "power2.out", duration: 0.38 }, 0.68);
    }, section);

    ScrollTrigger.refresh();

    return () => context.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="expanding-dot"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f1ea] px-6 py-24 text-[#080808] md:px-10"
    >
      <div
        ref={dotRef}
        className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#050505]"
      />
      <div ref={contentRef} className="relative z-10 mx-auto max-w-5xl text-center text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-white/42">
          Expanding dot transition
        </p>
        <h2 className="mt-6 text-5xl font-black leading-none md:text-8xl">
          One small gesture can become the next world.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/62">
          This pattern can bridge two sections, open a case study, or turn a
          tiny UI action into a cinematic background transition.
        </p>
      </div>
    </section>
  );
}
