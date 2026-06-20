"use client";

import React from "react";
import { useSvgReveal } from "./useSvgReveal";
import { useNodePulse } from "./useNodePulse";

/**
 * ServiceOrbitSvg — a calm core with five service nodes orbiting it.
 *
 * Represents the studio's service surface (cinematic websites, dashboards,
 * backend systems, case-study systems, automation) as precision instrumentation
 * rather than icon decoration: a central core, two subtle rings, and five nodes
 * connected by thin arcs. Theme-aware via CSS color tokens, no text inside SVG.
 *
 * Node budget: 1 core + 1 core ring + 2 orbit rings + 5 links + 5 nodes.
 */

const VB = 200;
const C = VB / 2;
const ORBIT = 78;

// Five service nodes at fixed angles (deterministic — no Math.random).
const SERVICES = [
  { id: "websites", angle: 0 },
  { id: "dashboards", angle: 72 },
  { id: "backend", angle: 144 },
  { id: "casestudies", angle: 216 },
  { id: "automation", angle: 288 },
] as const;

function polar(angleDeg: number, r = ORBIT) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: C + r * Math.cos(rad), y: C + r * Math.sin(rad) };
}

const NODE_POINTS = SERVICES.map((s) => ({ ...s, ...polar(s.angle) }));

export default function ServiceOrbitSvg({ className = "" }: { className?: string }) {
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
        {/* Two subtle orbit rings */}
        <circle data-draw cx={C} cy={C} r={ORBIT} fill="none" stroke="currentColor" strokeWidth={0.6} opacity={0.16} />
        <circle data-draw cx={C} cy={C} r={ORBIT - 18} fill="none" stroke="currentColor" strokeWidth={0.45} opacity={0.1} />

        {/* Thin link arcs from core to each service node */}
        {NODE_POINTS.map((n) => (
          <line
            key={`link-${n.id}`}
            data-draw
            x1={C}
            y1={C}
            x2={n.x}
            y2={n.y}
            stroke="currentColor"
            strokeWidth={0.45}
            opacity={0.2}
          />
        ))}

        {/* Service nodes — secondary-theme accent, alternating pulse targets */}
        {NODE_POINTS.map((n, i) => (
          <g key={`node-${n.id}`}>
            <circle data-node cx={n.x} cy={n.y} r={4.5} className="fill-secondary-theme" opacity={0.14} />
            <circle
              data-node
              data-pulse={i % 2 === 0 ? "" : undefined}
              cx={n.x}
              cy={n.y}
              r={2.4}
              className="fill-secondary-theme"
              opacity={0.9}
              onMouseEnter={(e) => played.current && pulseNode(e.currentTarget)}
            />
          </g>
        ))}

        {/* Calm core */}
        <circle data-node cx={C} cy={C} r={10} fill="currentColor" opacity={0.08} />
        <circle data-node cx={C} cy={C} r={5.5} fill="none" stroke="currentColor" strokeWidth={0.8} opacity={0.4} />
        <circle data-node data-pulse cx={C} cy={C} r={3} fill="currentColor" opacity={0.95} />
      </svg>
    </div>
  );
}
