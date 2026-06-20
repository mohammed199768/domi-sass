"use client";

import { useEffect, useRef } from "react";
import { gsap, registerMotionPlugins, ScrollTrigger } from "@/lib/motion/gsapSetup";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

/**
 * Shared scroll-enter reveal for the homepage SVG systems.
 *
 * Ownership split (HOME M13):
 *   - GSAP owns the one-time scroll-enter choreography:
 *       * stroke-dashoffset line drawing on `[data-draw]` paths
 *       * node pop-in on `[data-node]`
 *   - Anime.js (loaded by each component via `useNodePulse`) owns isolated
 *     local micro-pulses and runs only AFTER this reveal completes.
 *
 * Reduced motion: every element is placed in its final static state and no
 * timeline is created. The returned `played` ref lets callers gate Anime.js
 * so it never fights GSAP or runs under reduced motion.
 */
export function useSvgReveal<T extends HTMLElement>() {
  const containerRef = useRef<T>(null);
  const played = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    registerMotionPlugins();

    const root = containerRef.current;
    if (!root) return;

    const draws = root.querySelectorAll<SVGPathElement>("[data-draw]");
    const nodes = root.querySelectorAll<SVGElement>("[data-node]");

    if (prefersReducedMotion) {
      // Final static state — no drawing, no pop, no pulse.
      draws.forEach((p) => {
        p.style.strokeDasharray = "none";
        p.style.strokeDashoffset = "0";
        p.style.opacity = "1";
      });
      gsap.set(nodes, { opacity: 1, scale: 1, transformOrigin: "center center" });
      played.current = true;
      return;
    }

    // Prepare paths for stroke drawing (measured once, deterministic geometry).
    draws.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = String(len);
      p.style.strokeDashoffset = String(len);
    });

    const ctx = gsap.context(() => {
      gsap.set(nodes, { opacity: 0, scale: 0.4, transformOrigin: "center center" });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          once: true,
        },
        onComplete: () => {
          played.current = true;
          root.dispatchEvent(new CustomEvent("svgRevealDone"));
        },
      });

      tl.to(draws, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.08,
        ease: "power2.inOut",
      }).to(
        nodes,
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.07, ease: "back.out(2)" },
        "-=0.55"
      );
    }, containerRef);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      played.current = false;
    };
  }, [prefersReducedMotion]);

  return { containerRef, played, prefersReducedMotion };
}
