"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { gsap, registerMotionLabPlugins, ScrollTrigger } from "../utils/gsapSetup";

const panels = [
  "Discovery",
  "Architecture",
  "Interface",
  "Motion",
  "Launch",
];

export default function HorizontalScrollScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isCompactViewport = useMediaQuery("(max-width: 767px)");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    registerMotionLabPlugins();

    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track || prefersReducedMotion || isCompactViewport) {
      return;
    }

    const context = gsap.context(() => {
      const getScrollAmount = () => {
        const viewportPadding = window.innerWidth < 768 ? 32 : 80;
        return Math.max(0, track.scrollWidth - window.innerWidth + viewportPadding);
      };

      // Vertical scrolling pins this scene while the track translates on the x axis.
      // invalidateOnRefresh keeps the distance correct after resize/font changes.
      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          scrub: 0.85,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    ScrollTrigger.refresh();

    return () => context.revert();
  }, [isCompactViewport, prefersReducedMotion]);

  return (
    <section
      id="horizontal-scroll"
      ref={sectionRef}
      className="relative overflow-x-auto overflow-y-hidden bg-[#050505] px-6 py-20 md:overflow-hidden md:px-10"
    >
      <div className="mx-auto mb-12 flex max-w-7xl flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-pink-200/50">
            Horizontal scroll scene
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black text-white md:text-6xl">
            Vertical scroll, horizontal product journey.
          </h2>
        </div>
        <p className="max-w-md text-base leading-7 text-white/54">
          Useful for project timelines, service process cards, or selected work
          rows where the viewer should feel a guided cinematic progression.
        </p>
      </div>

      <div className="relative h-[68vh] min-h-[520px]">
        <div ref={trackRef} className="flex h-full w-max gap-5 pr-6 md:gap-8 md:pr-20">
          {panels.map((panel, index) => (
            <article
              key={panel}
              className="flex h-full w-[82vw] max-w-[720px] shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.055] p-7 shadow-2xl shadow-black/30 md:w-[62vw] md:p-10"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-[0.24em] text-white/38">
                  0{index + 1}
                </span>
                <span className="rounded-full border border-white/12 px-3 py-1 text-xs font-bold text-white/45">
                  Motion card
                </span>
              </div>
              <div>
                <div className="mb-8 h-52 rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.2),rgba(255,255,255,0.035)),radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.28),transparent_32%)]" />
                <h3 className="text-4xl font-black text-white md:text-6xl">{panel}</h3>
                <p className="mt-5 max-w-xl text-lg leading-8 text-white/56">
                  Placeholder copy for a premium portfolio section. Replace this
                  with the actual project logic when the pattern graduates.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
