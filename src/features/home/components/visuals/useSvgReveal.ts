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
 * FAIL-SAFE CONTRACT:
 *   The SVGs render fully visible by default (no SSR/CSS hidden state). JS only
 *   ever *hides then reveals* — so if the effect never runs, throws, or the
 *   ScrollTrigger fails to fire (a real mobile + smooth-scroll edge case), the
 *   visuals stay visible instead of becoming invisible holes. A short fallback
 *   timer also forces the final visible state if the trigger hasn't fired.
 *
 * Reduced motion: visuals are left in their default visible state, no timeline
 * is created. The returned `played` ref gates Anime.js so it never fights GSAP
 * or runs under reduced motion.
 */
export function useSvgReveal<T extends HTMLElement>() {
  const containerRef = useRef<T>(null);
  const played = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const draws = Array.from(root.querySelectorAll<SVGPathElement>("[data-draw]"));
    const nodes = Array.from(root.querySelectorAll<SVGElement>("[data-node]"));

    // Force everything to its final visible state. Used by reduced-motion and as
    // the fallback / cleanup so the visuals can never be left invisible.
    const showFinal = () => {
      draws.forEach((p) => {
        p.style.strokeDasharray = "none";
        p.style.strokeDashoffset = "0";
        p.style.opacity = "";
      });
      gsap.set(nodes, { clearProps: "opacity,transform" });
      played.current = true;
    };

    if (prefersReducedMotion) {
      showFinal();
      return;
    }

    registerMotionPlugins();

    // Measure path lengths for the draw effect. getTotalLength can throw on some
    // engines for unusual paths — guard it so a single bad path can't break the
    // whole reveal (and never blanks the page).
    let canDraw = true;
    try {
      draws.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = String(len);
        p.style.strokeDashoffset = String(len);
      });
    } catch {
      canDraw = false;
      draws.forEach((p) => {
        p.style.strokeDasharray = "none";
        p.style.strokeDashoffset = "0";
      });
    }

    let fired = false;
    const ctx = gsap.context(() => {
      gsap.set(nodes, { opacity: 0, scale: 0.4, transformOrigin: "center center" });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: root,
          start: "top 92%",
          once: true,
          onEnter: () => {
            fired = true;
          },
        },
        onComplete: () => {
          played.current = true;
          root.dispatchEvent(new CustomEvent("svgRevealDone"));
        },
      });

      if (canDraw) {
        tl.to(draws, {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.08,
          ease: "power2.inOut",
        });
      }

      tl.to(
        nodes,
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.07, ease: "back.out(2)" },
        canDraw ? "-=0.55" : 0
      );
    }, containerRef);

    // Nudge ScrollTrigger after layout settles (smooth-scroll libraries can
    // delay the first update on mobile).
    const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh());

    // Fallback: if the trigger never fires (in-view-at-load on touch devices,
    // or a stalled smooth-scroll), force the final visible state so nothing is
    // left hidden. This is the safety net for the mobile white-screen case.
    const fallback = window.setTimeout(() => {
      if (!fired && !played.current) {
        ctx.revert();
        showFinal();
        root.dispatchEvent(new CustomEvent("svgRevealDone"));
      }
    }, 1600);

    return () => {
      window.cancelAnimationFrame(refreshId);
      window.clearTimeout(fallback);
      ctx.revert();
      played.current = false;
    };
  }, [prefersReducedMotion]);

  return { containerRef, played, prefersReducedMotion };
}
