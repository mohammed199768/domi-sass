"use client";

import React from "react";
import { useSvgReveal } from "./useSvgReveal";
import { useNodePulse } from "./useNodePulse";

/**
 * TransformationConstellationSvg — a compact "transformation network" that
 * echoes the /work Transformation Tree without duplicating it.
 *
 * A central root node branches via curved vector lines to four endpoint nodes,
 * one per transformation theme (training platform, wedding booking, healthcare
 * coordination, AI readiness). Accents derive from the DOMINASE theme so the brand
 * language stays consistent. Decorative, no text nodes inside the SVG.
 *
 * Node budget: 1 root + 1 root halo + 4 branches + 4 endpoint rings + 4 endpoint cores.
 */

const VB = 200;
const C = VB / 2;

// Four endpoints in the four corners of the viewBox using restrained theme accents.
const NODES = [
  { id: "training", accent: "var(--domi-accent)", x: 44, y: 50 },
  { id: "wedding", accent: "var(--domi-accent-bright)", x: 156, y: 50 },
  { id: "healthcare", accent: "var(--domi-accent)", x: 44, y: 150 },
  { id: "readiness", accent: "var(--domi-accent-soft)", x: 156, y: 150 },
] as const;

// Smooth cubic branch from root to endpoint, gently bowed like /work.
function branchPath(x: number, y: number): string {
  const cpx1 = C + (x - C) * 0.3;
  const cpy1 = C + (y - C) * 0.1;
  const cpx2 = C + (x - C) * 0.7;
  const cpy2 = C + (y - C) * 0.9;
  return `M ${C} ${C} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${x} ${y}`;
}

export default function TransformationConstellationSvg({ className = "" }: { className?: string }) {
  const { containerRef, played, prefersReducedMotion } = useSvgReveal<HTMLDivElement>();
  const { pulseNode } = useNodePulse(containerRef, !prefersReducedMotion);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      <svg
        viewBox={`0 0 ${VB} ${VB}`}
        className="h-full w-full overflow-visible"
        role="presentation"
        focusable="false"
      >
        {/* Four transformation branches */}
        {NODES.map((n) => (
          <path
            key={`branch-${n.id}`}
            data-draw
            d={branchPath(n.x, n.y)}
            fill="none"
            stroke={n.accent}
            strokeWidth={0.9}
            strokeLinecap="round"
            opacity={0.55}
          />
        ))}

        {/* Endpoint nodes — outer accent ring + inner core (pulse target) */}
        {NODES.map((n) => (
          <g key={`node-${n.id}`}>
            <circle data-node cx={n.x} cy={n.y} r={5} fill={n.accent} opacity={0.16} />
            <circle
              data-node
              data-pulse
              cx={n.x}
              cy={n.y}
              r={2.6}
              fill={n.accent}
              opacity={0.95}
              onMouseEnter={(e) => played.current && pulseNode(e.currentTarget)}
            />
          </g>
        ))}

        {/* Central root — soft halo + solid dot, using theme primary token */}
        <circle data-node cx={C} cy={C} r={7} className="fill-primary-theme" opacity={0.12} />
        <circle data-node data-pulse cx={C} cy={C} r={3} className="fill-primary-theme" opacity={0.9} />
      </svg>
    </div>
  );
}
