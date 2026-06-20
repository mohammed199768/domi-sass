"use client";

import React from "react";
import { useSvgReveal } from "./useSvgReveal";
import { useNodePulse } from "./useNodePulse";

/**
 * HeroOrbitalSignatureSvg — an "orbital command" signature mark for the Hero.
 *
 * Layered behind the hero image as a calm precision-instrument backdrop:
 * three orbital rings, a central monolith node, and a few satellite nodes
 * connected by thin vector lines. Deterministic geometry, no text nodes,
 * theme-aware via CSS color tokens.
 *
 * Node budget: 1 core + 1 core ring + 6 satellites + 6 link lines + 3 orbits.
 */

const VB = 200;
const C = VB / 2;

// Three orbital radii (deterministic).
const ORBITS = [44, 66, 88] as const;

// Six satellite nodes placed at fixed angles on the orbits (deterministic —
// no Math.random). Angles in degrees, measured clockwise from 12 o'clock.
const SATELLITES = [
  { id: "sat-a", orbit: 44, angle: 28 },
  { id: "sat-b", orbit: 66, angle: 122 },
  { id: "sat-c", orbit: 88, angle: 196 },
  { id: "sat-d", orbit: 44, angle: 250 },
  { id: "sat-e", orbit: 66, angle: 312 },
  { id: "sat-f", orbit: 88, angle: 72 },
] as const;

function polar(orbit: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: C + orbit * Math.cos(rad), y: C + orbit * Math.sin(rad) };
}

const SAT_POINTS = SATELLITES.map((s) => ({ ...s, ...polar(s.orbit, s.angle) }));

export default function HeroOrbitalSignatureSvg({ className = "" }: { className?: string }) {
  const { containerRef, played, prefersReducedMotion } = useSvgReveal<HTMLDivElement>();
  const { pulseNode } = useNodePulse(containerRef, !prefersReducedMotion);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none select-none text-primary-theme ${className}`}
    >
      <svg
        viewBox={`0 0 ${VB} ${VB}`}
        className="h-full w-full overflow-visible"
        role="presentation"
        focusable="false"
      >
        {/* Orbital rings — thin silver/accent lines, drawn on enter. */}
        {ORBITS.map((r, i) => (
          <circle
            key={`orbit-${r}`}
            data-draw
            cx={C}
            cy={C}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={0.6}
            opacity={0.18 - i * 0.03}
          />
        ))}

        {/* Thin connecting lines from core to each satellite. */}
        {SAT_POINTS.map((s) => (
          <line
            key={`link-${s.id}`}
            data-draw
            x1={C}
            y1={C}
            x2={s.x}
            y2={s.y}
            stroke="currentColor"
            strokeWidth={0.45}
            opacity={0.2}
          />
        ))}

        {/* Satellite nodes — a few carry data-pulse for the anime.js settle. */}
        {SAT_POINTS.map((s, i) => (
          <circle
            key={`node-${s.id}`}
            data-node
            data-pulse={i % 2 === 0 ? "" : undefined}
            cx={s.x}
            cy={s.y}
            r={2.4}
            fill="currentColor"
            opacity={0.85}
            onMouseEnter={(e) => played.current && pulseNode(e.currentTarget)}
          />
        ))}

        {/* Central monolith mark — soft halo ring + solid core node. */}
        <circle data-node cx={C} cy={C} r={11} fill="currentColor" opacity={0.08} />
        <circle data-node cx={C} cy={C} r={6} fill="none" stroke="currentColor" strokeWidth={0.8} opacity={0.4} />
        <circle data-node data-pulse cx={C} cy={C} r={3.4} fill="currentColor" opacity={0.95} />
      </svg>
    </div>
  );
}
