"use client";

import type Lenis from "lenis";

let activeLenis: Lenis | null = null;

export function setActiveLenis(lenis: Lenis | null) {
  activeLenis = lenis;
}

export function getActiveLenis() {
  return activeLenis;
}
