"use client";

import { useEffect, useRef, type RefObject } from "react";
import { clamp01, HERO_WATER_TRANSITION_START } from "./heroProgress";

const WORK_ENTRY_TAIL_VIEWPORTS = 1;

export type HeroWorkTransitionProgress = {
  hero: number;
  transition: number;
  snap: boolean;
};

/**
 * Native scroll remains the source of truth. The second progress value owns
 * the overlapping handoff from the final water-entry frames through the first
 * 100svh of Work without increasing the hero's 300svh document length.
 */
export function useHeroWorkTransitionProgress(
  heroRef: RefObject<HTMLElement | null>,
  onProgress: (progress: HeroWorkTransitionProgress) => void,
  enabled = true,
) {
  const callbackRef = useRef(onProgress);

  useEffect(() => {
    callbackRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;
    let pendingSnap = false;
    let heroTop = 0;
    let heroRange = 1;
    let transitionStart = 0;
    let transitionRange = 1;
    let wasVisible: boolean | null = null;

    const measure = () => {
      const hero = heroRef.current;
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      heroTop = window.scrollY + rect.top;
      heroRange = Math.max(1, hero.offsetHeight - window.innerHeight);
      transitionStart =
        heroTop + heroRange * HERO_WATER_TRANSITION_START;
      transitionRange = Math.max(
        1,
        heroRange * (1 - HERO_WATER_TRANSITION_START) +
          window.innerHeight * WORK_ENTRY_TAIL_VIEWPORTS,
      );
    };

    const publish = (forceSnap = false) => {
      const hero = heroRef.current;
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const visible = rect.bottom > 0 && rect.top < window.innerHeight;
      const enteredOrLeft = wasVisible !== null && visible !== wasVisible;
      wasVisible = visible;

      callbackRef.current({
        hero: clamp01((window.scrollY - heroTop) / heroRange),
        transition: clamp01(
          (window.scrollY - transitionStart) / transitionRange,
        ),
        snap: forceSnap || enteredOrLeft || document.hidden,
      });
    };

    const schedule = (forceSnap = false) => {
      pendingSnap ||= forceSnap;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const snap = pendingSnap;
        pendingSnap = false;
        publish(snap);
      });
    };

    const handleResize = () => {
      measure();
      schedule(true);
    };
    const handleScroll = () => schedule(false);
    const handleVisibility = () => schedule(true);

    measure();
    schedule(true);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, {
      passive: true,
    });
    document.addEventListener("visibilitychange", handleVisibility);

    const observer = new ResizeObserver(handleResize);
    if (heroRef.current) observer.observe(heroRef.current);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [enabled, heroRef]);
}
