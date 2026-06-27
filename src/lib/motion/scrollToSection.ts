"use client";

import { getActiveLenis } from "./lenisStore";

const DEFAULT_HEADER_OFFSET = 88;
const CORRECTION_THRESHOLD_PX = 24;

type ScrollToSectionOptions = {
  offset?: number;
  updateHash?: boolean;
};

function normalizeTarget(target: string) {
  if (!target || target === "#") {
    return "#home";
  }

  return target.startsWith("#") ? target : `#${target}`;
}

function getTargetTop(href: string, offset: number) {
  const element = href === "#home" ? null : document.querySelector<HTMLElement>(href);
  if (!element) return 0;

  const scrollMarginTop = Number.parseFloat(window.getComputedStyle(element).scrollMarginTop);
  const targetOffset = Math.max(offset, Number.isFinite(scrollMarginTop) ? scrollMarginTop : 0);
  return element.getBoundingClientRect().top + window.scrollY - targetOffset;
}

export function scrollToSection(target: string, options: ScrollToSectionOptions = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const href = normalizeTarget(target);
  const offset = options.offset ?? DEFAULT_HEADER_OFFSET;
  const updateHash = options.updateHash ?? true;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lenis = getActiveLenis();
  const top = getTargetTop(href, offset);

  const correctFinalPosition = () => {
    const correctedTop = getTargetTop(href, offset);
    if (Math.abs(correctedTop - window.scrollY) < CORRECTION_THRESHOLD_PX) return;

    if (lenis && !prefersReducedMotion) {
      lenis.scrollTo(correctedTop, {
        duration: 0.35,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
      return;
    }

    window.scrollTo({
      top: correctedTop,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  if (updateHash) {
    const nextHash = href === "#home" ? window.location.pathname : href;
    window.history.replaceState(null, "", nextHash);
  }

  if (lenis && !prefersReducedMotion) {
    lenis.scrollTo(top, {
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    window.setTimeout(correctFinalPosition, 1150);
    return;
  }

  window.scrollTo({
    top,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
  window.setTimeout(correctFinalPosition, prefersReducedMotion ? 80 : 650);
}
