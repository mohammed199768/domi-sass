"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { gsap, registerMotionLabPlugins, ScrollTrigger } from "../utils/gsapSetup";

const headline = "Serious digital products deserve a memorable first impression";

export default function CinematicTextRevealScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wordRefs = useRef<HTMLSpanElement[]>([]);
  const prefersReducedMotion = useReducedMotion();
  const words = headline.split(" ");

  useEffect(() => {
    registerMotionLabPlugins();

    const section = sectionRef.current;
    const wordItems = wordRefs.current;

    if (!section) {
      return;
    }

    if (prefersReducedMotion) {
      gsap.set(wordItems, { clearProps: "all", opacity: 1, y: 0 });
      return;
    }

    const context = gsap.context(() => {
      gsap.set(wordItems, { opacity: 0, y: 44 });

      // The DOM keeps real words in reading order. The span wrappers only give
      // GSAP safe transform targets for a staggered reveal.
      gsap.to(wordItems, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.055,
        scrollTrigger: {
          trigger: section,
          start: "top 62%",
          once: true,
        },
      });
    }, section);

    ScrollTrigger.refresh();

    return () => context.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="text-reveal"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-[#080808] px-6 py-24 md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <p className="mb-8 text-sm font-semibold uppercase tracking-[0.32em] text-teal-200/52">
          Cinematic text reveal
        </p>
        <h2
          className="max-w-6xl text-5xl font-black leading-[1.02] text-white md:text-8xl"
          aria-label={headline}
        >
          {words.map((word, index) => (
            <span key={`${word}-${index}`} className="mr-[0.28em] inline-block overflow-hidden align-bottom">
              <span
                ref={(node) => {
                  if (node) wordRefs.current[index] = node;
                }}
                aria-hidden="true"
                className="inline-block will-change-transform"
              >
                {word}
              </span>
            </span>
          ))}
        </h2>
        <p className="mt-10 max-w-2xl text-lg leading-8 text-white/56">
          Use this for one or two meaningful statements only. Repeating this
          pattern everywhere makes a premium site feel noisy.
        </p>
      </div>
    </section>
  );
}
