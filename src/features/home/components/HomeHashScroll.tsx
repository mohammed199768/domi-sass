"use client";

import { useEffect } from "react";
import { scrollToSection } from "@/lib/motion/scrollToSection";

export default function HomeHashScroll() {
  useEffect(() => {
    if (!window.location.hash) return;
    const first = window.setTimeout(
      () => scrollToSection(window.location.hash, { updateHash: false }),
      250,
    );
    const second = window.setTimeout(
      () => scrollToSection(window.location.hash, { updateHash: false }),
      1100,
    );
    return () => {
      window.clearTimeout(first);
      window.clearTimeout(second);
    };
  }, []);

  return null;
}
