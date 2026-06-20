"use client";

import { useEffect, useRef } from "react";
import { gsap, registerMotionPlugins } from "@/lib/motion/gsapSetup";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

const modules = [
  ["01", "حسابات الطلاب", "Student Accounts"], ["02", "إدارة الدورات", "Course Management"],
  ["03", "تتبع الحضور", "Attendance Tracking"], ["04", "إعلانات الدورات", "Course Trailers"],
  ["05", "ترتيب المحتوى", "Content Ordering"], ["06", "وضوح الإدارة", "Admin Clarity"],
];

export default function FeatureSystemScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    registerMotionPlugins();
    const section = sectionRef.current;
    if (!section || reducedMotion) return;
    const context = gsap.context(() => {
      gsap.from("[data-module]", { y: 45, opacity: 0, stagger: 0.08, duration: 0.75, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 72%", once: true } });
    }, section);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} dir="rtl" className="bg-[#e8ede8] px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><p className="text-xs font-bold tracking-[.26em] text-[#aa7440]">PLATFORM MODULES</p><h2 className="mt-4 text-4xl font-black sm:text-6xl">منظومة، وليست مجموعة بطاقات.</h2></div>
          <p className="max-w-md text-base leading-8 text-[#46635e]">كل وحدة لها وظيفة واضحة، لكنها تتصل ببقية الوحدات داخل مسار تدريب واحد.</p>
        </div>
        <div className="mt-14 grid overflow-hidden rounded-[2rem] border border-[#174c44]/12 bg-[#174c44]/12 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map(([number, arabic, english], index) => (
            <article key={number} data-module className="relative min-h-64 bg-[#f5f3ed] p-7 sm:p-9">
              <div className="flex items-center justify-between"><span className="text-xs font-bold tracking-[.2em] text-[#aa7440]">MODULE {number}</span><span className={`h-2.5 w-2.5 rounded-full ${index === 2 ? "bg-[#d39c62]" : "bg-[#174c44]"}`} /></div>
              <div className="mt-16"><h3 className="text-2xl font-black text-[#173d38]">{arabic}</h3><p dir="ltr" className="mt-2 text-left font-sans text-xs font-bold uppercase tracking-[.16em] text-[#173d38]/45">{english}</p></div>
              <svg aria-hidden="true" viewBox="0 0 120 22" className="absolute bottom-7 left-7 w-24"><path d="M2 11H118" stroke="#174c44" strokeOpacity=".16"/><circle cx={18 + index * 14} cy="11" r="5" fill={index === 2 ? "#d39c62" : "#174c44"}/></svg>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
