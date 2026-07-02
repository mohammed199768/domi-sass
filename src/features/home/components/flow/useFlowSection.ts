"use client";

import { useEffect, useRef } from "react";
import { gsap, registerMotionPlugins, ScrollTrigger } from "@/lib/motion/gsapSetup";
import { useMediaQuery } from "@/lib/motion/useMediaQuery";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

export type FlowTransition =
  | "none"
  | "diagonal-reveal"
  | "depth-lift"
  | "panel-slide"
  | "settle";

/**
 * Drives the cinematic intro for a single homepage section.
 *
 * Design constraints honoured here:
 *  - No ScrollTrigger pinning -> no scroll traps, no Lenis conflict, no
 *    broken sticky/fixed descendants, no 100dvh breakage.
 *  - The transform lives only on `.flow-inner`; it is cleared (clearProps)
 *    once the intro settles so nothing lingers to break sticky children.
 *  - prefers-reduced-motion short-circuits to a normal, fully-visible render.
 *  - On small screens, dramatic effects degrade to gentle opacity/translate.
 *  - Every tween/trigger lives in a section-scoped gsap.context() that is
 *    reverted on unmount, so route changes never leave duplicate triggers.
 */
export function useFlowSection(transition: FlowTransition) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  const prefersReducedMotion = useReducedMotion();
  // Tablets stay in the simplified path to avoid off-canvas staging overflow.
  const isDesktop = useMediaQuery("(min-width: 1025px)");

  useEffect(() => {
    registerMotionPlugins();

    const section = sectionRef.current;
    const inner = innerRef.current;
    if (!section || !inner) {
      return;
    }

    // No transition requested: leave the section exactly as authored.
    if (transition === "none") {
      section.setAttribute("data-flow-state", "settled");
      return;
    }

    // Reduced motion: render normally, nothing animated.
    if (prefersReducedMotion) {
      gsap.set(inner, { clearProps: "all" });
      section.setAttribute("data-flow-state", "settled");
      return;
    }

    // Direct hash navigation guard: if the page loaded with a hash that
    // targets an anchor inside THIS section (e.g. /#contact), render it
    // settled immediately — the target must never sit invisible waiting for
    // a scroll-triggered entrance while anchor-correction scrolls to it.
    const hash = window.location.hash;
    if (hash.length > 1 && /^#[A-Za-z][\w-]*$/.test(hash)) {
      const target = document.getElementById(hash.slice(1));
      if (target && (section === target || section.contains(target))) {
        gsap.set(inner, { clearProps: "all" });
        section.setAttribute("data-flow-state", "settled");
        return;
      }
    }

    section.setAttribute("data-flow-armed", "true");

    const diagonalMask = section.querySelector<HTMLElement>(".flow-diagonal-mask");
    const depthLayer = section.querySelector<HTMLElement>(".flow-depth-layer");

    const settle = () => {
      gsap.set(inner, { clearProps: "all" });
      section.setAttribute("data-flow-state", "settled");
    };

    const ctx = gsap.context(() => {
      const baseTrigger = {
        trigger: section,
        // Start a little before the section's top reaches the viewport bottom.
        start: "top 78%",
        once: true,
        invalidateOnRefresh: true,
      } as const;

      switch (transition) {
        case "diagonal-reveal": {
          gsap.set(inner, {
            opacity: 0,
            clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
          });
          if (diagonalMask) gsap.set(diagonalMask, { opacity: 0, xPercent: -40 });

          const tl = gsap.timeline({
            scrollTrigger: baseTrigger,
            defaults: { ease: "power3.out" },
            onComplete: settle,
          });
          tl.to(inner, {
            opacity: 1,
            clipPath: "polygon(0 0, 140% 0, 100% 100%, 0 100%)",
            duration: 0.95,
          }, 0);
          if (diagonalMask) {
            tl.fromTo(
              diagonalMask,
              { opacity: 0, xPercent: -30 },
              { opacity: 0.9, xPercent: 60, duration: 0.7, ease: "power1.inOut" },
              0
            ).to(diagonalMask, { opacity: 0, duration: 0.35 }, 0.6);
          }
          break;
        }

        case "depth-lift": {
          // The signature editorial reveal: the section rises over the
          // previous one — opacity 0→1, y 48px→0, scale 0.985→1. One-shot,
          // transform + opacity only (no filter blur — brand constraint).
          gsap.set(inner, {
            opacity: 0,
            y: 48,
            scale: 0.985,
            transformOrigin: "center top",
          });
          if (depthLayer) gsap.set(depthLayer, { opacity: 0.7 });

          const tl = gsap.timeline({
            scrollTrigger: baseTrigger,
            defaults: { ease: "power3.out" },
            onComplete: settle,
          });
          tl.to(inner, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
          }, 0);
          if (depthLayer) tl.to(depthLayer, { opacity: 0, duration: 0.8 }, 0.1);
          break;
        }

        case "panel-slide": {
          // Clean editorial panel: same rising language with a restrained
          // lateral drift on desktop (direction-safe, transform only).
          gsap.set(inner, { opacity: 0, xPercent: isDesktop ? 5 : 0, y: 40 });
          const tl = gsap.timeline({
            scrollTrigger: baseTrigger,
            defaults: { ease: "power3.out" },
            onComplete: settle,
          });
          tl.to(inner, { opacity: 1, xPercent: 0, y: 0, duration: 0.95 }, 0);
          break;
        }

        case "settle": {
          // Calm, stable, conversion-focused. Gentle fade + small rise.
          gsap.set(inner, { opacity: 0, y: 28 });
          gsap.to(inner, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { ...baseTrigger, start: "top 85%" },
            onComplete: settle,
          });
          break;
        }
      }
    }, section);

    // Recalculate positions once everything is laid out.
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      section.removeAttribute("data-flow-armed");
    };
  }, [transition, prefersReducedMotion, isDesktop]);

  return { sectionRef, innerRef };
}
