"use client";

import { useEffect, useRef } from "react";
import { gsap, registerMotionPlugins, ScrollTrigger } from "@/lib/motion/gsapSetup";
import { useMediaQuery } from "@/lib/motion/useMediaQuery";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

const before = ["ملفات مبعثرة", "روابط متفرقة", "Google Drive", "متابعة يدوية", "حضور غير واضح", "اعتماد الطلاب على الرسائل", "عبء إداري"];
const after = ["حسابات للطلاب", "دورات منظمة", "تتبع الحضور", "إعلانات تشويقية للدورات", "محتوى مرتب", "إدارة أكثر وضوحًا"];

export default function BeforeAfterStickyScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    registerMotionPlugins();
    const section = sectionRef.current;
    if (!section || reducedMotion || isMobile) return;
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.7 } });
      timeline
        .to("[data-before-item]", { x: 35, opacity: 0.22, stagger: 0.035, duration: 0.45 })
        .fromTo("[data-after-item]", { x: -34, opacity: 0.28 }, { x: 0, opacity: 1, stagger: 0.035, duration: 0.5 }, 0.24)
        .fromTo("[data-divider-fill]", { scaleY: 0 }, { scaleY: 1, duration: 0.75, transformOrigin: "top" }, 0.05);
    }, section);
    ScrollTrigger.refresh();
    return () => context.revert();
  }, [isMobile, reducedMotion]);

  return (
    <section ref={sectionRef} dir="rtl" className={`relative bg-[#f3f0e9] px-5 py-24 sm:px-8 lg:px-12 ${reducedMotion ? "" : "md:min-h-[220vh] md:py-0"}`}>
      <div className="mx-auto max-w-7xl md:sticky md:top-0 md:flex md:min-h-screen md:items-center">
        <div className="w-full">
          <p className="text-xs font-bold tracking-[.26em] text-[#aa7440]">BEFORE / AFTER</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-6xl">التنظيم لم يغيّر الشكل فقط، بل غيّر طريقة العمل.</h2>
          <div className="relative mt-14 grid gap-8 md:grid-cols-2 md:gap-20">
            <div className="rounded-[1.8rem] border border-[#6f4b3e]/12 bg-[#e9e2d8] p-6 sm:p-8">
              <p className="text-sm font-black text-[#805c4b]">قبل المنصة</p>
              <ul className="mt-6 grid gap-3">
                {before.map((item, i) => <li key={item} data-before-item className="flex items-center justify-between border-b border-[#805c4b]/10 pb-3 text-base text-[#664e44]"><span>{item}</span><span className="text-xs opacity-40">0{i + 1}</span></li>)}
              </ul>
            </div>
            <div className="rounded-[1.8rem] border border-[#174c44]/14 bg-[#e4ece7] p-6 shadow-[0_24px_70px_rgba(23,76,68,.08)] sm:p-8">
              <p className="text-sm font-black text-[#174c44]">بعد المنصة</p>
              <ul className="mt-6 grid gap-3">
                {after.map((item, i) => <li key={item} data-after-item className="flex items-center justify-between border-b border-[#174c44]/10 pb-3 text-base text-[#31534e]"><span>{item}</span><span className="grid h-6 w-6 place-items-center rounded-full bg-[#174c44] text-[10px] text-white">{i + 1}</span></li>)}
              </ul>
            </div>
            <div className="absolute bottom-4 left-1/2 top-4 hidden w-px -translate-x-1/2 bg-[#174c44]/10 md:block"><span data-divider-fill className="block h-full w-full bg-[#d39c62]" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
