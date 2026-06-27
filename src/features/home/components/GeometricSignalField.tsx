"use client";

/**
 * GeometricSignalField — restrained "calibration geometry"
 *
 * A small, fixed set of precise SVG marks (10 points + 2 connector lines) that
 * are *scroll-driven only*. They read as engineering measurement / interface
 * alignment marks around the DOMINASE gate seam — not random particles.
 *
 * Behaviour (mapped onto Hero Gate progress):
 *   < 0.44        hidden (opacity 0) — invisible during hero reading time
 *   0.44 → 0.56   fade in
 *   0.56 → 0.72   align: a tiny inward settle into the formation
 *   0.72 → 0.84   hold subtly (peak)
 *   0.84 → 1.00   fade out
 *
 * Why this is safe:
 *  - No canvas / WebGL / Lottie / filters / backdrop-filter.
 *  - No continuous/infinite animation; everything maps to the gate progress
 *    MotionValue passed in. No per-frame React state.
 *  - transform + opacity only (no box-shadow / glow animation).
 *  - pointer-events: none — never blocks clicks.
 *  - Sits behind the wordmark (z-index in hero-gate.css) and never brighter
 *    than DOMINASE (low opacities, fine strokes).
 *  - Reduced motion: renders nothing. Mobile: hidden via CSS.
 *
 * Coordinate space: a 100×100 SVG viewBox (preserveAspectRatio none stretches
 * it to the sticky viewport). The gate seam sits at y = 50. The formation is
 * near-symmetric about x = 50.
 */

import {
  motion,
  useTransform,
  useReducedMotion as fmReducedMotion,
  type MotionValue,
} from "framer-motion";

type Accent = "pearl" | "cyan" | "violet";

type Point = {
  /** final formation position (viewBox units) */
  x: number;
  y: number;
  /** tiny inward drift applied before alignment (formation settles in) */
  dx: number;
  dy: number;
  /** dot radius in viewBox units */
  r: number;
  accent: Accent;
  /** secondary mark — thinned out on tablet to keep 6–8 points */
  extra?: boolean;
};

/*
 * Deterministic, near-symmetric calibration formation about x = 50:
 *  - 2 cyan seam points above/below the seam
 *  - left + right clusters (3 each) as measurement marks
 *  - 2 small pearl axis ticks straddling the centre
 * Movement is intentionally small (a settle, not a flight across the screen).
 */
const POINTS: Point[] = [
  // Central seam points (primary cyan accents)
  { x: 50, y: 38, dx: 0, dy: -3, r: 0.7, accent: "cyan" },
  { x: 50, y: 62, dx: 0, dy: 3, r: 0.7, accent: "cyan" },

  // Left cluster — secondary reference points
  { x: 38, y: 44, dx: -2.5, dy: 0, r: 0.5, accent: "violet", extra: true },
  { x: 32, y: 50, dx: -3.5, dy: 0, r: 0.55, accent: "cyan" },
  { x: 38, y: 56, dx: -2.5, dy: 0, r: 0.5, accent: "violet", extra: true },

  // Right cluster — secondary reference points (mirror)
  { x: 62, y: 44, dx: 2.5, dy: 0, r: 0.5, accent: "violet", extra: true },
  { x: 68, y: 50, dx: 3.5, dy: 0, r: 0.55, accent: "cyan" },
  { x: 62, y: 56, dx: 2.5, dy: 0, r: 0.5, accent: "violet", extra: true },

  // Axis ticks straddling the centre (small pearl/mist marks)
  { x: 46, y: 50, dx: 1, dy: 0, r: 0.35, accent: "pearl" },
  { x: 54, y: 50, dx: -1, dy: 0, r: 0.35, accent: "pearl" },
];

/* Two thin connector lines: left cluster → seam → right cluster (along y = 50). */
const CONNECTORS: { x1: number; x2: number }[] = [
  { x1: 32, x2: 46 }, // left lead-in to the centre
  { x1: 54, x2: 68 }, // centre to the right cluster
];

const accentClass: Record<Accent, string> = {
  pearl: "signal-dot signal-dot--pearl",
  cyan: "signal-dot signal-dot--cyan",
  violet: "signal-dot signal-dot--violet",
};

interface GeometricSignalFieldProps {
  /** Hero Gate scroll progress (0 → 1). */
  progress: MotionValue<number>;
}

export default function GeometricSignalField({
  progress,
}: GeometricSignalFieldProps) {
  const prefersReducedMotion = fmReducedMotion();
  if (prefersReducedMotion) return null;

  return (
    <svg
      className="hero-gate-signal-field"
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {CONNECTORS.map((c, i) => (
        <ConnectorLine key={`l${i}`} x1={c.x1} x2={c.x2} progress={progress} />
      ))}
      {POINTS.map((p, i) => (
        <SignalDot key={`p${i}`} point={p} progress={progress} />
      ))}
    </svg>
  );
}

/*
 * Shared visibility envelope. Inactive points read faintly, peak around the
 * gate hold, then fade out — never brighter than the wordmark.
 */
const FADE_KEYS = [0.44, 0.56, 0.72, 0.84, 1.0] as const;

function SignalDot({
  point,
  progress,
}: {
  point: Point;
  progress: MotionValue<number>;
}) {
  const { x, y, dx, dy, r, accent, extra } = point;

  // Small inward settle (formation aligns) — finishes by 0.72.
  const cx = useTransform(progress, [0.44, 0.72], [x + dx, x]);
  const cy = useTransform(progress, [0.44, 0.72], [y + dy, y]);
  const opacity = useTransform(
    progress,
    [...FADE_KEYS],
    [0, 0.32, 0.62, 0.62, 0]
  );

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      opacity={opacity}
      className={`${accentClass[accent]}${extra ? " signal-extra" : ""}`}
    />
  );
}

function ConnectorLine({
  x1,
  x2,
  progress,
}: {
  x1: number;
  x2: number;
  progress: MotionValue<number>;
}) {
  // Lines stay fainter than the points; same envelope, lower ceiling.
  const opacity = useTransform(
    progress,
    [...FADE_KEYS],
    [0, 0.16, 0.36, 0.36, 0]
  );

  return (
    <motion.line
      x1={x1}
      y1={50}
      x2={x2}
      y2={50}
      opacity={opacity}
      className="signal-line signal-extra"
    />
  );
}
