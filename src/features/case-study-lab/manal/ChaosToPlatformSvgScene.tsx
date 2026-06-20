"use client";

import { useEffect, useRef } from "react";
import { gsap, registerMotionPlugins, ScrollTrigger } from "@/lib/motion/gsapSetup";
import { useMediaQuery } from "@/lib/motion/useMediaQuery";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { connectionPaths, courseModulePath, fileCardPath } from "./svgPaths";

const scattered = [
  { id: "course-a", x: -235, y: -142, rotate: -10 },
  { id: "course-b", x: 230, y: -150, rotate: 8 },
  { id: "course-c", x: -245, y: 148, rotate: 7 },
  { id: "course-d", x: 240, y: 150, rotate: -8 },
];

export default function ChaosToPlatformSvgScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    registerMotionPlugins();
    const section = sectionRef.current;
    const svg = svgRef.current;
    if (!section || !svg) return;

    const context = gsap.context(() => {
      const items = gsap.utils.toArray<SVGGElement>("[data-organize]", svg);
      const paths = gsap.utils.toArray<SVGPathElement>("[data-connect]", svg);
      const dots = gsap.utils.toArray<SVGCircleElement>("[data-attendance]", svg);
      const morphs = gsap.utils.toArray<SVGPathElement>("[data-morph]", svg);

      if (reducedMotion || isMobile) {
        gsap.set(items, { x: 0, y: 0, rotate: 0, opacity: 1 });
        gsap.set(paths, { strokeDashoffset: 0, opacity: 1 });
        gsap.set(dots, { x: 0, y: 0, opacity: 1 });
        morphs.forEach((path) => path.setAttribute("d", courseModulePath));
        return;
      }

      items.forEach((item, index) => {
        const state = scattered[index];
        gsap.set(item, { x: state.x, y: state.y, rotate: state.rotate, transformOrigin: "center" });
      });
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 0.25 });
      });
      dots.forEach((dot, index) => {
        gsap.set(dot, { x: index % 2 === 0 ? -180 - index * 9 : 175 + index * 7, y: (index - 3) * 45 });
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to("[data-chaos-label]", { opacity: 0, y: -14, duration: 0.16 })
        .to(items, { x: 0, y: 0, rotate: 0, duration: 0.65, stagger: 0.035, ease: "power2.inOut" }, 0.08)
        .to(morphs, { attr: { d: courseModulePath }, duration: 0.52, ease: "power2.inOut" }, 0.13)
        .to(dots, { x: 0, y: 0, duration: 0.56, stagger: 0.025, ease: "power2.inOut" }, 0.18)
        .to(paths, { strokeDashoffset: 0, opacity: 1, duration: 0.5, stagger: 0.04 }, 0.38)
        .fromTo("[data-platform-core]", { opacity: 0.55, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.42, transformOrigin: "center" }, 0.4)
        .fromTo("[data-system-label]", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.2 }, 0.78);
    }, section);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, [isMobile, reducedMotion]);

  return (
    <section id="transformation" ref={sectionRef} dir="rtl" className={`relative min-h-fit border-y border-[#174c44]/10 bg-[#0d2926] text-[#f8f5ee] ${reducedMotion ? "" : "md:min-h-[300vh]"}`}>
      <div className="py-20 md:sticky md:top-0 md:flex md:min-h-screen md:items-center md:py-10">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold tracking-[0.26em] text-[#d7aa78]">THE CORE EXPERIMENT / SVG</p>
              <h2 className="mt-3 text-3xl font-black sm:text-5xl">من الفوضى إلى نظام واحد</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-white/55 sm:text-base">تتحرك الملفات والروابط ونقاط الحضور نحو منصة مركزية، ثم تتصل كأجزاء من تجربة تدريب واحدة.</p>
          </div>

          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#102f2b] p-2 shadow-[0_40px_100px_rgba(0,0,0,.28)] sm:p-5">
            <p data-chaos-label className="absolute left-5 top-4 z-10 text-[10px] font-bold uppercase tracking-[.22em] text-white/35 sm:left-8 sm:top-7">scattered inputs</p>
            <p data-system-label className="absolute right-5 top-4 z-10 text-[10px] font-bold uppercase tracking-[.22em] text-[#d7aa78] opacity-100 sm:right-8 sm:top-7 md:opacity-0">connected platform</p>
            <svg ref={svgRef} viewBox="0 0 1000 620" role="img" aria-label="رسم تجريدي يوضح انتقال ملفات ودورات مبعثرة إلى منصة تدريب منظمة" className="h-auto w-full min-w-0">
              <defs>
                <linearGradient id="manal-core" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f7f2e8"/><stop offset="1" stopColor="#dfe9e3"/></linearGradient>
                <filter id="soft-shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#061512" floodOpacity=".24"/></filter>
              </defs>
              <g opacity=".16" stroke="#dce9e3" strokeWidth="1">
                {Array.from({ length: 11 }, (_, i) => <path key={`v-${i}`} d={`M${i * 100} 0V620`} />)}
                {Array.from({ length: 7 }, (_, i) => <path key={`h-${i}`} d={`M0 ${i * 100 + 10}H1000`} />)}
              </g>

              {connectionPaths.map((d) => <path key={d} data-connect d={d} fill="none" stroke="#d39c62" strokeWidth="3" strokeLinecap="round" />)}

              <g data-platform-core filter="url(#soft-shadow)">
                <rect x="380" y="130" width="240" height="360" rx="28" fill="url(#manal-core)" />
                <rect x="405" y="157" width="190" height="38" rx="11" fill="#174c44" />
                <circle cx="570" cy="176" r="7" fill="#d39c62" />
                <rect x="405" y="215" width="85" height="92" rx="13" fill="#174c44" opacity=".12" />
                <rect x="503" y="215" width="92" height="92" rx="13" fill="#d39c62" opacity=".25" />
                <rect x="405" y="326" width="190" height="135" rx="13" fill="#174c44" opacity=".09" />
                {[0, 1, 2, 3].map((i) => <g key={i}><circle cx="425" cy={351 + i * 27} r="6" fill="#174c44" opacity=".75"/><rect x="440" y={346 + i * 27} width={92 - i * 7} height="9" rx="4.5" fill="#174c44" opacity=".22"/></g>)}
              </g>

              {[
                { x: 140, y: 146, id: "course-a" }, { x: 692, y: 146, id: "course-b" },
                { x: 140, y: 364, id: "course-c" }, { x: 692, y: 364, id: "course-d" },
              ].map((card, index) => (
                <g key={card.id} transform={`translate(${card.x} ${card.y})`}>
                  <g data-organize>
                    <path data-morph d={fileCardPath} fill="#f7f2e8" opacity=".96" />
                    <rect x="17" y="18" width="40" height="7" rx="3.5" fill="#174c44" opacity=".72" />
                    <rect x="17" y="34" width={index % 2 ? 82 : 105} height="6" rx="3" fill="#174c44" opacity=".18" />
                    <rect x="17" y="50" width="68" height="6" rx="3" fill="#d39c62" opacity=".45" />
                  </g>
                </g>
              ))}

              {[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} data-attendance cx={420 + i * 31} cy="510" r="8" fill={i === 4 ? "#d39c62" : "#eaf2ed"} opacity=".9" />)}
            </svg>
          </div>
          <p className="mt-5 text-center text-xs font-bold tracking-[.18em] text-white/35 md:hidden">STATIC FINAL STATE / MOBILE</p>
        </div>
      </div>
    </section>
  );
}
