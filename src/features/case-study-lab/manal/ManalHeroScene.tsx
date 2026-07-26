"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion/gsapSetup";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

export default function ManalHeroScene() {
  const rootRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion) return;

    const context = gsap.context(() => {
      gsap.from("[data-hero-reveal]", {
        y: 34,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
      });
      gsap.from("[data-hero-node]", {
        scale: 0.7,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "back.out(1.4)",
      });
    }, root);

    return () => context.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={rootRef} dir="rtl" className="relative isolate min-h-[100svh] overflow-hidden px-5 py-24 sm:px-8 lg:px-12">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(120deg,var(--color-manal-wash-1)_0%,var(--color-manal-wash-2)_58%,var(--color-manal-wash-3)_100%)]" />
      <div className="absolute -left-40 top-[-12rem] -z-10 h-[38rem] w-[38rem] rounded-full border border-manal-green/10" />
      <div className="absolute -left-16 top-[-4rem] -z-10 h-[20rem] w-[20rem] rounded-full border border-manal-gold/20" />

      <div className="mx-auto grid min-h-[calc(100svh-12rem)] max-w-7xl items-center gap-14 lg:grid-cols-[1.08fr_.92fr]">
        <div className="max-w-4xl">
          <p data-hero-reveal className="text-xs font-bold tracking-[0.26em] text-manal-gold-deep sm:text-sm">
            CASE STUDY MOTION LAB / 01
          </p>
          <h1 data-hero-reveal className="mt-6 text-balance text-4xl font-black leading-[1.35] text-manal-ink sm:text-6xl lg:text-[4.65rem]">
            المدربة منال الحيحي: من دورات مبعثرة إلى منصة تدريب منظمة
          </h1>
          <p data-hero-reveal className="mt-8 max-w-3xl text-base leading-9 text-manal-green-muted sm:text-xl sm:leading-10">
            تحويل تجربة التدريب من روابط وملفات موزعة ومتابعة يدوية إلى منصة رقمية تجمع الطلاب، الدورات، الحضور، والمحتوى في مكان واحد واضح.
          </p>
          <a data-hero-reveal href="#transformation" className="mt-10 inline-flex items-center gap-3 rounded-full border border-manal-green/20 bg-white/55 px-5 py-3 text-sm font-bold text-manal-green backdrop-blur transition hover:border-manal-green/40 hover:bg-white">
            شاهد التحول
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[30rem]">
          <div className="absolute inset-[15%] rounded-[2.2rem] border border-manal-green/15 bg-white/65 shadow-[0_30px_90px_rgba(23,76,68,.13)] backdrop-blur-sm">
            <div className="m-5 h-8 rounded-lg bg-manal-green/10" />
            <div className="grid grid-cols-2 gap-3 px-5">
              <div className="h-28 rounded-xl bg-manal-green/10" />
              <div className="h-28 rounded-xl bg-manal-gold/18" />
              <div className="col-span-2 h-16 rounded-xl border border-manal-green/10" />
            </div>
          </div>
          {[
            "right-[2%] top-[12%]",
            "left-[4%] top-[32%]",
            "right-[0] bottom-[18%]",
            "left-[18%] bottom-[3%]",
          ].map((position, index) => (
            <span key={position} data-hero-node className={`absolute ${position} grid h-12 w-12 place-items-center rounded-2xl border border-manal-green/15 bg-manal-canvas-warm shadow-lg`}>
              <span className={`h-2.5 w-2.5 rounded-full ${index === 1 ? "bg-manal-gold" : "bg-manal-green"}`} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
