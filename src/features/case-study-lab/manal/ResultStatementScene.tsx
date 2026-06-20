"use client";

import { useEffect, useRef } from "react";
import { gsap, registerMotionPlugins } from "@/lib/motion/gsapSetup";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

export default function ResultStatementScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    registerMotionPlugins();
    const section = sectionRef.current;
    if (!section || reducedMotion) return;
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 65%", once: true } });
      timeline.from("[data-result-line]", { scaleX: 0, duration: 0.9, ease: "power3.inOut", transformOrigin: "right" }).from("[data-result-copy]", { y: 45, opacity: 0, duration: 1, ease: "power3.out" }, 0.25);
    }, section);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} dir="rtl" className="relative isolate grid min-h-[95svh] place-items-center overflow-hidden bg-[#0d2926] px-5 py-28 text-[#f7f3eb] sm:px-8 lg:px-12">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_80%,rgba(211,156,98,.17),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(117,170,155,.13),transparent_30%)]" />
      <div className="mx-auto w-full max-w-6xl">
        <div data-result-line className="h-px w-full bg-gradient-to-l from-[#d39c62] via-[#d39c62]/40 to-transparent" />
        <div data-result-copy className="py-14 sm:py-20">
          <p className="text-xs font-bold tracking-[.26em] text-[#d7aa78]">THE RESULT</p>
          <h2 className="mt-7 text-balance text-4xl font-black leading-[1.45] sm:text-6xl lg:text-7xl">النتيجة لم تكن مجرد واجهة أجمل، بل تجربة تدريب أوضح وأسهل في الإدارة والمتابعة.</h2>
          <p className="mt-10 font-sans text-xs font-bold uppercase tracking-[.22em] text-white/35">Manal Alhihi Training Platform / Motion Study</p>
        </div>
        <div data-result-line className="h-px w-full bg-gradient-to-r from-[#d39c62] via-[#d39c62]/40 to-transparent" />
      </div>
    </section>
  );
}
