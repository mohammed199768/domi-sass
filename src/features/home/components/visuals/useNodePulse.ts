"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Anime.js micro-interaction layer for the homepage SVG systems (HOME M13).
 *
 * Scope is intentionally tiny:
 *   - one finite settle pulse on a small set of `[data-pulse]` nodes after the
 *     GSAP reveal completes, and
 *   - a finite hover/focus glow handler for individual nodes.
 *
 * It never animates the same property GSAP owns (transform/scale during the
 * reveal) and never starts an infinite loop. Anime.js is loaded with a dynamic
 * import so it stays out of the SSR bundle and only ships when a visual mounts.
 */
type AnimeModule = typeof import("animejs");

export function useNodePulse(
  containerRef: React.RefObject<HTMLElement | null>,
  enabled: boolean
) {
  const animeRef = useRef<AnimeModule | null>(null);
  const settledRef = useRef(false);

  // Lazy-load anime.js once, only on the client and only when motion is allowed.
  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    import("animejs")
      .then((mod) => {
        if (!cancelled) animeRef.current = mod;
      })
      .catch(() => {
        // Visuals already have a correct static state from GSAP; failing to load
        // the micro-interaction layer is non-fatal and intentionally silent.
      });
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  // One finite settle pulse after the reveal finishes.
  const runSettlePulse = useCallback(() => {
    if (!enabled || settledRef.current) return;
    const anime = animeRef.current;
    const root = containerRef.current;
    if (!anime || !root) return;
    settledRef.current = true;

    const pulseTargets = root.querySelectorAll<SVGElement>("[data-pulse]");
    if (pulseTargets.length === 0) return;

    anime.animate(pulseTargets, {
      opacity: [
        { to: 1, duration: 520 },
        { to: 0.55, duration: 720 },
        { to: 0.9, duration: 620 },
      ],
      delay: anime.stagger(140),
      ease: "inOutQuad",
      loop: false,
    });
  }, [enabled, containerRef]);

  // Listen for the GSAP reveal completion event dispatched by useSvgReveal.
  useEffect(() => {
    if (!enabled) return;
    const root = containerRef.current;
    if (!root) return;
    const onDone = () => runSettlePulse();
    root.addEventListener("svgRevealDone", onDone);
    return () => root.removeEventListener("svgRevealDone", onDone);
  }, [enabled, containerRef, runSettlePulse]);

  // Finite hover/focus glow for a single node (called from JSX handlers).
  const pulseNode = useCallback(
    (el: SVGElement | null) => {
      if (!enabled || !el) return;
      const anime = animeRef.current;
      if (!anime) return;
      anime.animate(el, {
        scale: [{ to: 1.35, duration: 220 }, { to: 1, duration: 360 }],
        ease: "outBack",
        loop: false,
      });
    },
    [enabled]
  );

  return { pulseNode };
}
