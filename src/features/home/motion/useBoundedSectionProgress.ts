"use client";

import { useEffect, useRef, type RefObject } from "react";
import { clamp01 } from "./heroProgress";

export function useBoundedSectionProgress(
  sectionRef: RefObject<HTMLElement | null>,
  onProgress: (progress: number) => void,
  enabled = true,
) {
  const callbackRef = useRef(onProgress);

  useEffect(() => {
    callbackRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !enabled) return;

    let top = 0;
    let range = 1;
    let visible = false;
    let ticking = false;
    let raf = 0;

    const measure = () => {
      const rect = section.getBoundingClientRect();
      top = window.scrollY + rect.top;
      range = Math.max(1, section.offsetHeight - window.innerHeight);
    };

    const apply = () => {
      callbackRef.current(clamp01((window.scrollY - top) / range));
    };

    const schedule = () => {
      if (!visible || ticking) return;
      ticking = true;
      raf = window.requestAnimationFrame(() => {
        ticking = false;
        apply();
      });
    };

    measure();
    apply();

    const intersection = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          measure();
          apply();
        }
      },
      { rootMargin: "20% 0px 20% 0px" },
    );
    const resize = new ResizeObserver(() => {
      measure();
      apply();
    });

    intersection.observe(section);
    resize.observe(section);
    window.addEventListener("scroll", schedule, { passive: true });

    return () => {
      intersection.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [enabled, sectionRef]);
}
