"use client";

import { getActiveLenis } from "./lenisStore";

const DEFAULT_HEADER_OFFSET = 88;

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

export function scrollToSection(target: string, options: ScrollToSectionOptions = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const href = normalizeTarget(target);
  const offset = options.offset ?? DEFAULT_HEADER_OFFSET;
  const updateHash = options.updateHash ?? true;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lenis = getActiveLenis();
  const element = href === "#home" ? null : document.querySelector<HTMLElement>(href);
  const top = element ? element.getBoundingClientRect().top + window.scrollY - offset : 0;

  if (updateHash) {
    const nextHash = href === "#home" ? window.location.pathname : href;
    window.history.replaceState(null, "", nextHash);
  }

  if (lenis && !prefersReducedMotion) {
    lenis.scrollTo(top, {
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    return;
  }

  window.scrollTo({
    top,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
}
