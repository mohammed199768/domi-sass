"use client";

import React from "react";

/**
 * BeneathInterfaceSvg V3 — premium visual polish.
 *
 * ViewBox: 600×420. Generous breathing room for every scene.
 * Each of the 6 scenes is a self-contained centered illustration.
 *
 * Modes:
 *  - Desktop (default): all scene groups in DOM, all hidden.
 *    Parent drives autoAlpha via GSAP using the BeneathSvgRefs callback.
 *    Pass refCallback and omit sceneIndex.
 *
 *  - Mobile/Tablet static: render one fully-visible scene group only.
 *    Pass sceneIndex={0..5}. refCallback is optional/ignored in this mode.
 *    Each mobile scene card instantiates its own <BeneathInterfaceSvg sceneIndex={i} />.
 */

export interface BeneathSvgRefs {
  svgEl: SVGSVGElement | null;
  scenes: SVGGElement[];
}

interface Props {
  /** Desktop animated mode: receives GSAP-driven refs */
  refCallback?: (refs: BeneathSvgRefs) => void;
  /** Mobile/tablet static mode: show only this scene (0-based index) */
  sceneIndex?: number;
  "aria-hidden"?: boolean;
}

export default function BeneathInterfaceSvg({
  refCallback,
  sceneIndex,
  "aria-hidden": ariaHidden = true,
}: Props) {
  const svgRef    = React.useRef<SVGSVGElement>(null);
  const sceneRefs = React.useRef<SVGGElement[]>([]);

  const isStaticMode = sceneIndex !== undefined;

  React.useEffect(() => {
    if (!isStaticMode && refCallback) {
      refCallback({
        svgEl: svgRef.current,
        scenes: sceneRefs.current.filter(Boolean),
      });
    }
  }, [refCallback, isStaticMode]);

  const setSceneRef = (i: number) => (el: SVGGElement | null) => {
    if (el) sceneRefs.current[i] = el;
  };

  // In static mode, determine visibility per scene index
  const sceneVisible = (i: number): React.CSSProperties =>
    isStaticMode
      ? { visibility: i === sceneIndex ? "visible" : "hidden" }
      : { visibility: "hidden" };

  // ── Shared geometry ────────────────────────────────────────────────────────
  const VW  = 600;
  const VH  = 420;
  const vcx = VW / 2;   // 300
  const vcy = VH / 2;   // 210

  const PW = 380;
  const PH = 240;
  const PX = vcx - PW / 2;   // 110
  const PY = vcy - PH / 2;   // 90

  const R = 14;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VW} ${VH}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
      className="w-full h-full"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="g-panel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="var(--surface)"       stopOpacity="1" />
          <stop offset="100%" stopColor="var(--surface-hover)" stopOpacity="0.94" />
        </linearGradient>

        <linearGradient id="g-accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="var(--primary)"   stopOpacity="1" />
          <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0.85" />
        </linearGradient>

        <linearGradient id="g-emerald-wash" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="var(--primary)" stopOpacity="0.14" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="g-mint-wash" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="var(--secondary)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0" />
        </linearGradient>

        <radialGradient id="g-assem-glow" cx="50%" cy="50%" r="50%"
          gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="var(--primary)"   stopOpacity="0.22" />
          <stop offset="45%"  stopColor="var(--secondary)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="var(--primary)"   stopOpacity="0" />
        </radialGradient>
      </defs>


      {/* ════════════════════════════════════════════════════════════════════
          SCENE 01 — SURFACE
      ════════════════════════════════════════════════════════════════════ */}
      <g ref={setSceneRef(0)} data-bi-scene="surface" style={sceneVisible(0)}>

        <rect x={PX} y={PY} width={PW} height={PH} rx={R}
          fill="url(#g-panel)" stroke="var(--border)" strokeWidth="1.2" />
        <rect x={PX + R} y={PY} width={PW - R * 2} height="3" rx="1.5"
          fill="url(#g-accent)" />

        <rect x={PX} y={PY} width={PW} height="38" rx={R}
          fill="var(--surface-muted)" opacity="0.9" />
        <circle cx={PX + 22} cy={PY + 19} r="5" fill="var(--border)" opacity="0.65" />
        <circle cx={PX + 40} cy={PY + 19} r="5" fill="var(--border)" opacity="0.65" />
        <circle cx={PX + 58} cy={PY + 19} r="5" fill="var(--primary)" opacity="0.7" />
        <rect x={PX + 78} y={PY + 11} width={PW - 154} height="18" rx="9"
          fill="var(--surface)" opacity="0.55" stroke="var(--border)" strokeWidth="0.8" />

        <rect x={PX + 24} y={PY + 56} width={192} height="20" rx="6"
          fill="var(--primary)" opacity="0.72" />
        <rect x={PX + 24} y={PY + 88}  width={180} height="9" rx="3.5"
          fill="var(--fg)" opacity="0.20" />
        <rect x={PX + 24} y={PY + 104} width={148} height="9" rx="3.5"
          fill="var(--fg)" opacity="0.14" />
        <rect x={PX + 24} y={PY + 120} width={112} height="9" rx="3.5"
          fill="var(--fg)" opacity="0.09" />

        <rect x={PX + 24} y={PY + 146} width={116} height="32" rx="10"
          fill="var(--primary)" opacity="0.88" />
        <rect x={PX + 150} y={PY + 148} width={94} height="28" rx="10"
          fill="none" stroke="var(--primary)" strokeWidth="1.3" opacity="0.45" />

        <rect x={PX + 264} y={PY + 50} width={96} height={PH - 78} rx="10"
          fill="url(#g-emerald-wash)" stroke="var(--border)" strokeWidth="0.8" opacity="0.7" />
        <rect x={PX + 276} y={PY + 68} width={72} height="10" rx="4"
          fill="var(--primary)" opacity="0.28" />
        <rect x={PX + 276} y={PY + 86} width={58} height="7" rx="3"
          fill="var(--fg)" opacity="0.13" />
        <rect x={PX + 276} y={PY + 100} width={64} height="7" rx="3"
          fill="var(--fg)" opacity="0.09" />

        <line x1={PX + 20} y1={PY + PH - 38} x2={PX + PW - 20} y2={PY + PH - 38}
          stroke="var(--border)" strokeWidth="0.8" opacity="0.7" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={PX + 20 + i * 84} y={PY + PH - 28}
            width={72} height="14" rx="5"
            fill="var(--surface-hover)" opacity="0.85"
            stroke="var(--border)" strokeWidth="0.6" />
        ))}
      </g>


      {/* ════════════════════════════════════════════════════════════════════
          SCENE 02 — PRESENTATION
      ════════════════════════════════════════════════════════════════════ */}
      <g ref={setSceneRef(1)} data-bi-scene="presentation" style={sceneVisible(1)}>

        <rect x={PX} y={PY} width={PW} height={PH} rx={R}
          fill="url(#g-panel)" stroke="var(--border)" strokeWidth="1.2" />
        <rect x={PX + R} y={PY} width={PW - R * 2} height="3" rx="1.5"
          fill="url(#g-accent)" />

        <rect x={PX} y={PY} width={PW} height="34" rx={R}
          fill="var(--surface-muted)" opacity="0.88" />
        <rect x={PX + 18} y={PY + 12} width={52} height="11" rx="4"
          fill="var(--primary)" opacity="0.52" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={PX + PW - 130 + i * 42} y={PY + 12} width={30} height="10" rx="3"
            fill="var(--fg)" opacity="0.12" />
        ))}
        <rect x={PX + PW - 50} y={PY + 10} width={32} height="14" rx="6"
          fill="var(--primary)" opacity="0.68" />

        <rect x={PX + 18} y={PY + 44} width={PW - 36} height="70" rx="10"
          fill="url(#g-emerald-wash)" stroke="var(--border)" strokeWidth="0.7" opacity="0.8" />
        <rect x={PX + 30} y={PY + 57} width={210} height="16" rx="5"
          fill="var(--primary)" opacity="0.70" />
        <rect x={PX + 30} y={PY + 79} width={168} height="12" rx="4"
          fill="var(--primary)" opacity="0.38" />

        {[0, 1, 2].map((col) => (
          <g key={col}>
            <rect x={PX + 18 + col * 122} y={PY + 128} width={108} height="70" rx="9"
              fill="var(--surface-hover)" opacity="0.75"
              stroke="var(--border)" strokeWidth="0.7" />
            <circle cx={PX + 36 + col * 122} cy={PY + 150} r="10"
              fill="var(--primary)" opacity={0.22 - col * 0.04}
              stroke="var(--primary)" strokeWidth="1" strokeOpacity="0.38" />
            <circle cx={PX + 36 + col * 122} cy={PY + 150} r="4"
              fill="var(--primary)" opacity={0.55 - col * 0.06} />
            <rect x={PX + 28 + col * 122} y={PY + 166} width={72} height="7" rx="2.5"
              fill="var(--fg)" opacity="0.18" />
            <rect x={PX + 28 + col * 122} y={PY + 179} width={56} height="6" rx="2"
              fill="var(--fg)" opacity="0.11" />
          </g>
        ))}

        <rect x={PX + 18} y={PY + PH - 38} width={PW - 36} height="28" rx="8"
          fill="var(--primary)" opacity="0.12"
          stroke="var(--primary)" strokeWidth="0.8" strokeOpacity="0.32" />
        <rect x={vcx - 56} y={PY + PH - 32} width={112} height="16" rx="6"
          fill="var(--primary)" opacity="0.75" />

        <text x={PX + PW - 16} y={PY + 22} textAnchor="end"
          fontSize="8" fontFamily="var(--font-sans, monospace)" fontWeight="700"
          fill="var(--primary)" opacity="0.75" letterSpacing="0.12em">
          PRESENTATION
        </text>
      </g>


      {/* ════════════════════════════════════════════════════════════════════
          SCENE 03 — INTERACTION
      ════════════════════════════════════════════════════════════════════ */}
      <g ref={setSceneRef(2)} data-bi-scene="interaction" style={sceneVisible(2)}>

        <rect x={PX} y={PY} width={PW} height={PH} rx={R}
          fill="url(#g-panel)" stroke="var(--border)" strokeWidth="1.2" />
        <rect x={PX + R} y={PY} width={PW - R * 2} height="3" rx="1.5"
          fill="var(--secondary)" opacity="0.88" />

        <rect x={PX} y={PY} width={PW} height="34" rx={R}
          fill="var(--surface-muted)" opacity="0.85" />
        <rect x={PX + 18} y={PY + 12} width={64} height="11" rx="4"
          fill="var(--secondary)" opacity="0.50" />
        <text x={PX + PW - 16} y={PY + 22} textAnchor="end"
          fontSize="8" fontFamily="var(--font-sans, monospace)" fontWeight="700"
          fill="var(--secondary)" opacity="0.72" letterSpacing="0.12em">
          INTERACTION
        </text>

        <rect x={PX + 22} y={PY + 50} width={PW - 44} height="4" rx="2"
          fill="var(--border)" opacity="0.55" />
        <rect x={PX + 22} y={PY + 50} width={(PW - 44) * 0.5} height="4" rx="2"
          fill="var(--secondary)" opacity="0.80" />

        {[0, 1, 2, 3].map((i) => {
          const stepW  = 72;
          const stepH  = 48;
          const totalW = stepW * 4 + 24 * 3;
          const startX = vcx - totalW / 2;
          const sx     = startX + i * (stepW + 24);
          const sy     = PY + 66;
          const active = i === 1 || i === 2;
          return (
            <g key={i}>
              <rect x={sx} y={sy} width={stepW} height={stepH} rx="9"
                fill={active ? "var(--surface-hover)" : "var(--surface)"}
                opacity={active ? 1 : 0.65}
                stroke={active ? "var(--secondary)" : "var(--border)"}
                strokeWidth={active ? "1.4" : "0.7"} />
              <circle cx={sx + 14} cy={sy + 14} r="9"
                fill={active ? "var(--secondary)" : "var(--border)"}
                opacity={active ? 0.88 : 0.45} />
              <text x={sx + 14} y={sy + 18} textAnchor="middle"
                fontSize="8" fontFamily="var(--font-sans, monospace)" fontWeight="800"
                fill={active ? "var(--primary-contrast)" : "var(--fg)"} opacity={active ? 0.95 : 0.5}>
                {i + 1}
              </text>
              <rect x={sx + 8} y={sy + 30} width={stepW - 16} height="7" rx="2.5"
                fill="var(--secondary)" opacity={active ? 0.55 : 0.16} />
              {active && (
                <circle cx={sx + stepW / 2} cy={sy - 10} r="5"
                  fill="var(--secondary)" opacity="0.85"
                  />
              )}
              {i < 3 && (() => {
                const ax = sx + stepW + 4;
                const ay = sy + stepH / 2;
                return (
                  <g opacity={i < 2 ? 0.8 : 0.32}>
                    <line x1={ax} y1={ay} x2={ax + 16} y2={ay}
                      stroke="var(--secondary)" strokeWidth="1.4" />
                    <polygon
                      points={`${ax + 14},${ay - 5} ${ax + 22},${ay} ${ax + 14},${ay + 5}`}
                      fill="var(--secondary)" />
                  </g>
                );
              })()}
            </g>
          );
        })}

        <rect x={PX + 22} y={PY + 132} width={PW - 44} height="22" rx="7"
          fill="var(--surface)" opacity="0.85" stroke="var(--border)" strokeWidth="0.8" />
        <rect x={PX + 34} y={PY + 143} width={72} height="6" rx="2"
          fill="var(--fg)" opacity="0.15" />

        {[0, 1].map((i) => (
          <rect key={i}
            x={PX + 22 + i * ((PW - 52) / 2 + 8)} y={PY + 164}
            width={(PW - 52) / 2} height="20" rx="6"
            fill="var(--surface)" opacity="0.85" stroke="var(--border)" strokeWidth="0.8" />
        ))}

        <rect x={PX + 22} y={PY + 196} width={120} height="30" rx="9"
          fill="var(--secondary)" opacity="0.85" />
        <rect x={PX + 152} y={PY + 198} width={90} height="26" rx="9"
          fill="none" stroke="var(--secondary)" strokeWidth="1.1" opacity="0.38" />
      </g>


      {/* ════════════════════════════════════════════════════════════════════
          SCENE 04 — LOGIC
      ════════════════════════════════════════════════════════════════════ */}
      <g ref={setSceneRef(3)} data-bi-scene="logic" style={sceneVisible(3)}>

        <rect x={PX} y={PY} width={PW} height={PH} rx={R}
          fill="url(#g-panel)" stroke="var(--border)" strokeWidth="1.2" />
        <rect x={PX + R} y={PY} width={PW - R * 2} height="3" rx="1.5"
          fill="var(--primary)" opacity="0.88" />

        <rect x={PX} y={PY} width={PW} height="34" rx={R}
          fill="var(--surface-muted)" opacity="0.85" />
        <rect x={PX + 18} y={PY + 12} width={44} height="11" rx="4"
          fill="var(--primary)" opacity="0.52" />
        <text x={PX + PW - 16} y={PY + 22} textAnchor="end"
          fontSize="8" fontFamily="var(--font-sans, monospace)" fontWeight="700"
          fill="var(--primary)" opacity="0.72" letterSpacing="0.12em">
          LOGIC
        </text>

        <circle cx={vcx} cy={PY + 72} r="20"
          fill="var(--surface-hover)"
          stroke="var(--primary)" strokeWidth="2"
          opacity="0.95" />
        <circle cx={vcx} cy={PY + 72} r="8"
          fill="var(--primary)" opacity="0.85" />

        {(() => {
          const branchY  = PY + 148;
          const branches = [
            { bx: PX + 68,  color: "var(--primary)",   size: 14 },
            { bx: vcx,      color: "var(--primary)",   size: 14 },
            { bx: PX + PW - 68, color: "var(--secondary)", size: 14 },
          ];
          return branches.map(({ bx, color, size }, i) => (
            <g key={i}>
              <line
                x1={vcx} y1={PY + 92}
                x2={bx}  y2={branchY - size}
                stroke={color} strokeWidth="1.5"
                strokeDasharray={i === 1 ? "none" : "5 3"}
                opacity="0.55" />
              <polygon
                points={`${bx},${branchY - size} ${bx + size},${branchY} ${bx},${branchY + size} ${bx - size},${branchY}`}
                fill="var(--surface-hover)"
                stroke={color} strokeWidth="1.4"
                opacity="0.88" />
              <circle cx={bx} cy={branchY} r="4.5"
                fill={color} opacity={i === 2 ? 0.55 : 0.70} />
              <line x1={bx} y1={branchY + size} x2={bx} y2={branchY + size + 24}
                stroke={color} strokeWidth="1.2" opacity="0.38" />
              <rect x={bx - 28} y={branchY + size + 24} width={56} height="22" rx="6"
                fill="var(--surface-hover)"
                stroke={color} strokeWidth="0.9"
                opacity="0.78" />
              <rect x={bx - 20} y={branchY + size + 32} width={40} height="6" rx="2"
                fill={color} opacity="0.32" />
            </g>
          ));
        })()}

        {[0, 1, 2].map((i) => {
          const vy = PY + 70 + i * 30;
          return (
            <g key={i} opacity="0.82">
              <circle cx={PX + PW - 30} cy={vy} r="11"
                fill="var(--surface-hover)"
                stroke="var(--primary)" strokeWidth="1" />
              <path d={`M${PX + PW - 38} ${vy} l6 7 l11 -12`}
                stroke="var(--primary)" strokeWidth="2" fill="none"
                strokeLinecap="round" strokeLinejoin="round"
                />
            </g>
          );
        })}
      </g>


      {/* ════════════════════════════════════════════════════════════════════
          SCENE 05 — OPERATIONS
      ════════════════════════════════════════════════════════════════════ */}
      <g ref={setSceneRef(4)} data-bi-scene="operations" style={sceneVisible(4)}>

        <rect x={PX} y={PY} width={PW} height={PH} rx={R}
          fill="url(#g-panel)" stroke="var(--border)" strokeWidth="1.2" />
        <rect x={PX + R} y={PY} width={PW - R * 2} height="3" rx="1.5"
          fill="var(--secondary)" opacity="0.88" />

        <rect x={PX} y={PY} width={68} height={PH} rx={R}
          fill="var(--surface-muted)" opacity="0.88" />
        <rect x={PX + R} y={PY} width={68 - R} height={PH}
          fill="var(--surface-muted)" opacity="0.88" />
        <line x1={PX + 68} y1={PY + 10} x2={PX + 68} y2={PY + PH - 10}
          stroke="var(--border)" strokeWidth="0.8" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={PX + 10} y={PY + 24 + i * 38} width={48} height="26" rx="7"
              fill={i === 0 ? "var(--secondary)" : "transparent"}
              opacity={i === 0 ? 0.22 : 0.5}
              stroke={i === 0 ? "var(--secondary)" : "var(--border)"}
              strokeWidth="0.8" />
            <circle cx={PX + 24} cy={PY + 37 + i * 38} r="5"
              fill={i === 0 ? "var(--secondary)" : "var(--border)"}
              opacity={i === 0 ? 0.88 : 0.45} />
            <rect x={PX + 34} y={PY + 34 + i * 38} width={18} height="6" rx="2"
              fill="var(--fg)" opacity={i === 0 ? 0.22 : 0.1} />
          </g>
        ))}

        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={PX + 80 + i * 98} y={PY + 14} width={86} height="52" rx="9"
              fill="var(--surface-hover)"
              stroke="var(--border)" strokeWidth="0.8"
              opacity="0.88" />
            <rect x={PX + 92 + i * 98} y={PY + 26} width={40} height="12" rx="4"
              fill="var(--secondary)" opacity={0.58 - i * 0.08} />
            <rect x={PX + 92 + i * 98} y={PY + 46} width={54} height="7" rx="2.5"
              fill="var(--fg)" opacity="0.14" />
          </g>
        ))}

        <rect x={PX + 80} y={PY + 76} width={PW - 96} height="18" rx="5"
          fill="var(--surface-muted)" opacity="0.75"
          stroke="var(--border)" strokeWidth="0.6" />
        <rect x={PX + 92} y={PY + 82} width={48} height="6" rx="2"
          fill="var(--fg)" opacity="0.24" />

        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={PX + 80} y={PY + 100 + i * 26} width={PW - 96} height="20" rx="5"
              fill={i % 2 === 0 ? "var(--surface-hover)" : "transparent"}
              opacity={i % 2 === 0 ? 0.55 : 0} />
            <rect x={PX + 92} y={PY + 107 + i * 26} width={54} height="6" rx="2"
              fill="var(--fg)" opacity="0.20" />
            <rect x={PX + 160} y={PY + 107 + i * 26} width={72} height="6" rx="2"
              fill="var(--fg)" opacity="0.13" />
            <circle cx={PX + PW - 36} cy={PY + 110 + i * 26} r="5.5"
              fill={i < 3 ? "var(--secondary)" : "var(--border)"}
              opacity={i < 3 ? (0.9 - i * 0.12) : 0.4}
              />
          </g>
        ))}

        <text x={PX + PW - 16} y={PY + 22} textAnchor="end"
          fontSize="8" fontFamily="var(--font-sans, monospace)" fontWeight="700"
          fill="var(--secondary)" opacity="0.72" letterSpacing="0.12em">
          OPERATIONS
        </text>
      </g>


      {/* ════════════════════════════════════════════════════════════════════
          SCENE 06 — ASSEMBLY
      ════════════════════════════════════════════════════════════════════ */}
      <g ref={setSceneRef(5)} data-bi-scene="assembly" style={sceneVisible(5)}>

        <ellipse cx={vcx} cy={vcy - 10} rx={230} ry={170}
          fill="url(#g-assem-glow)"
          opacity="0.48" />

        {(() => {
          const LW      = 280;
          const LH      = 72;
          const gapY    = 28;
          const gapX    = 22;
          const stackH  = LH * 4 + gapY * 3;
          const stackX  = vcx - LW / 2 - gapX * 1.5;
          const stackY  = vcy - stackH / 2 - 18;

          const layers = [
            { label: "Presentation", color: "var(--primary)",   dot: "var(--primary)" },
            { label: "Interaction",  color: "var(--secondary)", dot: "var(--secondary)" },
            { label: "Logic",        color: "var(--primary)",   dot: "var(--primary)" },
            { label: "Operations",   color: "var(--secondary)", dot: "var(--secondary)" },
          ];

          return (
            <>
              {layers.map((layer, i) => {
                const lx = stackX + i * gapX;
                const ly = stackY + i * (LH + gapY);
                return (
                  <g key={layer.label}>
                    <rect x={lx} y={ly} width={LW} height={LH} rx="10"
                      fill="url(#g-panel)"
                      stroke="var(--border)" strokeWidth="1"
                      opacity="0.94" />
                    <rect x={lx + 10} y={ly} width={LW - 20} height="2.5" rx="1.5"
                      fill={layer.color} opacity="0.70" />
                    <circle cx={lx} cy={ly + LH / 2} r="4.5"
                      fill={layer.dot} opacity="0.80"
                      />
                    <text x={lx + 14} y={ly + 20}
                      fontSize="8" fontFamily="var(--font-sans, monospace)" fontWeight="800"
                      fill={layer.color} opacity="0.88" letterSpacing="0.1em">
                      {layer.label.toUpperCase()}
                    </text>
                    <rect x={lx + 14} y={ly + 30} width={LW * 0.55} height="8" rx="3"
                      fill="var(--fg)" opacity="0.17" />
                    <rect x={lx + 14} y={ly + 44} width={LW * 0.40} height="6" rx="2.5"
                      fill="var(--fg)" opacity="0.10" />
                    <rect x={lx + LW - 54} y={ly + 28} width={40} height="14" rx="5"
                      fill={layer.color} opacity="0.20"
                      stroke={layer.color} strokeWidth="0.8" strokeOpacity="0.38" />
                    {i < 3 && (
                      <g opacity="0.42">
                        <line
                          x1={lx + LW * 0.35} y1={ly + LH}
                          x2={lx + LW * 0.35 + gapX} y2={ly + LH + gapY}
                          stroke={layer.color} strokeWidth="1.2"
                          strokeDasharray="4 3" />
                        <circle
                          cx={lx + LW * 0.35 + gapX / 2}
                          cy={ly + LH + gapY / 2}
                          r="3" fill={layer.color} opacity="0.65" />
                      </g>
                    )}
                  </g>
                );
              })}

              {(() => {
                const markY = stackY + stackH + 28;
                return (
                  <g>
                    <line x1={vcx} y1={stackY + stackH}
                      x2={vcx} y2={markY - 8}
                      stroke="url(#g-accent)" strokeWidth="1.2"
                      strokeDasharray="4 3" opacity="0.45" />
                    <rect x={vcx - 88} y={markY} width={176} height="36" rx="10"
                      fill="var(--surface-muted)" opacity="0.95"
                      stroke="var(--primary)" strokeWidth="1"
                      strokeOpacity="0.55" />
                    <line x1={vcx - 68} y1={markY} x2={vcx + 68} y2={markY}
                      stroke="url(#g-accent)" strokeWidth="1.5"
                      opacity="0.65" strokeLinecap="round" />
                    <text x={vcx} y={markY + 24}
                      textAnchor="middle"
                      fontSize="14" fontFamily="var(--font-sans, system-ui, sans-serif)"
                      fontWeight="900" letterSpacing="0.28em"
                      fill="var(--fg)" opacity="0.92">
                      DOMINASE
                    </text>
                    <circle cx={vcx - 76} cy={markY + 18} r="3"
                      fill="var(--primary)" opacity="0.65" />
                    <circle cx={vcx + 76} cy={markY + 18} r="3"
                      fill="var(--secondary)" opacity="0.55" />
                  </g>
                );
              })()}
            </>
          );
        })()}
      </g>
    </svg>
  );
}
