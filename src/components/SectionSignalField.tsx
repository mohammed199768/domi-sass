"use client";

/**
 * SectionSignalField — the DOMINASE "Liquid Signal" mark.
 *
 * A small deterministic SVG field: a few emerald/mint signal droplets aligned
 * along thin liquid curves, with pearl measurement ticks. It reads as organic
 * but engineered — particles settling into a precise form.
 *
 * Motion contract (all CSS-driven, one-shot):
 *  - Lines draw in via stroke-dashoffset (pathLength=1) on section entrance.
 *  - Droplets fade/settle in with small staggered delays.
 *  - Entrance is triggered ONCE by an IntersectionObserver that writes a data
 *    attribute directly on the SVG (zero React state, zero re-render), then
 *    disconnects. After the reveal the field is fully static.
 *
 * Safety:
 *  - No canvas / WebGL / Lottie / filters / backdrop-filter.
 *  - No infinite animation; nothing runs after the one-shot entrance.
 *  - 13 elements max, deterministic coordinates (no randomness).
 *  - pointer-events: none, aria-hidden, absolutely positioned inside the
 *    host section (host must be position:relative + overflow guarded).
 *  - Hidden on small screens and under prefers-reduced-motion the entrance is
 *    skipped (field renders in its final static state).
 */

import { useEffect, useRef } from "react";
import "./section-signal-field.css";

type Variant = "diagnostic" | "method";

type Props = {
  /** diagnostic = sharper, slightly tense curves (why-change);
      method = calm architectural arcs (why-us). */
  variant?: Variant;
  /** Extra class for per-page placement (size/position handled by caller). */
  className?: string;
};

/* Deterministic geometry per variant: 3 liquid paths + 8 droplets + 2 ticks. */
const GEOMETRY: Record<
  Variant,
  {
    paths: string[];
    drops: { x: number; y: number; r: number; tone: "emerald" | "mint" | "pearl" }[];
    ticks: { x1: number; y1: number; x2: number; y2: number }[];
  }
> = {
  diagnostic: {
    paths: [
      "M6 118 C 60 128, 88 60, 148 74 S 236 34, 294 46",
      "M18 146 C 92 150, 150 108, 208 116 S 268 92, 292 84",
      "M40 34 C 84 26, 118 58, 164 48",
    ],
    drops: [
      { x: 6, y: 118, r: 2.4, tone: "emerald" },
      { x: 148, y: 74, r: 3.2, tone: "emerald" },
      { x: 294, y: 46, r: 2.6, tone: "mint" },
      { x: 208, y: 116, r: 2.2, tone: "mint" },
      { x: 292, y: 84, r: 1.8, tone: "pearl" },
      { x: 40, y: 34, r: 1.8, tone: "pearl" },
      { x: 164, y: 48, r: 2.4, tone: "emerald" },
      { x: 92, y: 142, r: 1.6, tone: "pearl" },
    ],
    ticks: [
      { x1: 236, y1: 30, x2: 236, y2: 40 },
      { x1: 118, y1: 100, x2: 128, y2: 100 },
    ],
  },
  method: {
    paths: [
      "M8 96 C 70 96, 110 52, 170 52 S 264 84, 292 84",
      "M24 130 C 96 130, 160 110, 220 110 S 276 122, 292 122",
      "M60 30 C 110 30, 150 44, 200 44",
    ],
    drops: [
      { x: 8, y: 96, r: 2.4, tone: "emerald" },
      { x: 170, y: 52, r: 3.2, tone: "emerald" },
      { x: 292, y: 84, r: 2.6, tone: "mint" },
      { x: 220, y: 110, r: 2.2, tone: "mint" },
      { x: 292, y: 122, r: 1.8, tone: "pearl" },
      { x: 60, y: 30, r: 1.8, tone: "pearl" },
      { x: 200, y: 44, r: 2.4, tone: "emerald" },
      { x: 110, y: 122, r: 1.6, tone: "pearl" },
    ],
    ticks: [
      { x1: 246, y1: 66, x2: 246, y2: 76 },
      { x1: 96, y1: 74, x2: 106, y2: 74 },
    ],
  },
};

export default function SectionSignalField({
  variant = "method",
  className,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    /* Reduced motion: skip the entrance entirely — final static state. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      svg.dataset.in = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          /* One-shot: write the attribute directly (no React state) and stop. */
          svg.dataset.in = "true";
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  const geo = GEOMETRY[variant];

  return (
    <svg
      ref={svgRef}
      className={`signal-field${className ? ` ${className}` : ""}`}
      viewBox="0 0 300 160"
      aria-hidden="true"
      data-in="false"
      focusable="false"
    >
      {geo.paths.map((d, i) => (
        <path
          key={d}
          className="signal-field__flow"
          d={d}
          pathLength={1}
          style={{ transitionDelay: `${i * 140}ms` }}
        />
      ))}
      {geo.ticks.map((t) => (
        <line
          key={`${t.x1}-${t.y1}`}
          className="signal-field__tick"
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
        />
      ))}
      {geo.drops.map((p, i) => (
        <circle
          key={`${p.x}-${p.y}`}
          className={`signal-field__drop signal-field__drop--${p.tone}`}
          cx={p.x}
          cy={p.y}
          r={p.r}
          style={{ transitionDelay: `${220 + i * 90}ms` }}
        />
      ))}
    </svg>
  );
}
