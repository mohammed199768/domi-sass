"use client";

/**
 * DOMINASE Gate Transition
 *
 * A sticky scroll zone that drives a cinematic, directed "depth gate" on the
 * Hero. Cinematic choreography (gate scroll progress 0 → 1):
 *
 *   0.00 – 0.22  Hero fully stable — let the user read, no aggressive motion.
 *   0.22 – 0.46  Supporting copy fades down (copy first, CTAs after);
 *                DOMINASE stays visually dominant.
 *   0.46 – 0.68  Camera stage zooms in (1 → 1.22) while the DOMINASE wordmark
 *                counter-scales (1 → 0.74) — feels like entering the wordmark.
 *                Gate seam draws in.
 *   0.68 – 0.84  Peak gate moment: controlled portal; calibration signal marks
 *                align around the seam (behind the wordmark).
 *   0.84 – 1.00  Hero dissolves; stage settles (1.22 → 0.94). The next section
 *                (handled by FlowArt/FlowSection) arrives clean.
 *
 * After the gate zone the next section begins in normal document flow — no
 * duplicate DOM, no scroll trap, no overflow. Its entrance is owned by
 * FlowArt's "ominous-gate" FlowSection.
 *
 * Motion constraints:
 *  - MotionValues only — zero React setState during scroll
 *  - opacity + transform only — no filter / blur / backdrop-filter
 *  - will-change set only by Framer Motion on actively-animating elements
 *  - Reduced motion: renders Hero normally; gate zone has zero height
 *  - Mobile: shortened gate zone, no large scale on wordmark
 */

import React, { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useReducedMotion as fmReducedMotion,
    type MotionValue,
} from "framer-motion";
import GeometricSignalField from "./GeometricSignalField";
import "./hero-gate.css";

// ── Public API ────────────────────────────────────────────────────────────────

interface HeroScrollTransitionProps {
    /** The Hero section node */
    hero: React.ReactNode;
}

export default function HeroScrollTransition({ hero }: HeroScrollTransitionProps) {
    const prefersReducedMotion = fmReducedMotion();

    // Reduced motion: plain Hero with no sticky zone
    if (prefersReducedMotion) {
        return <>{hero}</>;
    }

    return <GateZone hero={hero} />;
}

// ── Gate zone: sticky scroll driver ──────────────────────────────────────────

function GateZone({ hero }: { hero: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // ── Camera stage scale: hold, zoom in (0.46–0.68), settle out ─────────────
    const stageScale = useTransform(
        scrollYProgress,
        [0, 0.46, 0.68, 0.84, 1.0],
        [1, 1, 1.22, 1.22, 0.94]
    );

    // ── Hero container opacity: dissolve only in the final phase ──────────────
    const heroOpacity = useTransform(
        scrollYProgress,
        [0.84, 1.0],
        [1, 0]
    );

    // ── Supporting copy (headline / subheadline): fade + drift down ───────────
    // Copy leads (0.22 → 0.42); DOMINASE stays dominant.
    const copyOpacity = useTransform(
        scrollYProgress,
        [0.22, 0.42],
        [1, 0]
    );
    const copyY = useTransform(
        scrollYProgress,
        [0.22, 0.42],
        [0, 22]
    );

    // ── CTAs: fade down slightly after the copy (0.28 → 0.46) ─────────────────
    const ctaOpacity = useTransform(
        scrollYProgress,
        [0.28, 0.46],
        [1, 0]
    );
    const ctaY = useTransform(
        scrollYProgress,
        [0.28, 0.46],
        [0, 22]
    );

    // ── Wordmark: counter-scale during the zoom (gate depth illusion) ─────────
    const wordmarkScale = useTransform(
        scrollYProgress,
        [0.46, 0.68],
        [1, 0.74]
    );

    // ── Gate seam: draws in as the zoom begins, peaks, then dissolves ─────────
    const gateLineScaleX = useTransform(
        scrollYProgress,
        [0.46, 0.62, 0.78, 0.9],
        [0, 1, 1, 0]
    );
    const gateLineOpacity = useTransform(
        scrollYProgress,
        [0.46, 0.6, 0.84, 0.94],
        [0, 1, 1, 0]
    );

    // ── Ambient vignette: deepens through the zoom, eases at the peak ─────────
    const vignetteOpacity = useTransform(
        scrollYProgress,
        [0.46, 0.68, 0.84, 1.0],
        [0, 0.6, 0.6, 0]
    );

    return (
        /*
         * Outer scroll driver: height = total scroll budget for the gate.
         * Desktop 260vh / tablet 220vh / mobile 170vh — set in hero-gate.css.
         */
        <div ref={containerRef} className="hero-gate-scroll-driver">

            {/* Sticky viewport: exactly one screen tall */}
            <div className="hero-gate-sticky">

                {/* Camera stage: scales like a zoom lens */}
                <motion.div
                    className="hero-gate-stage"
                    style={{ scale: stageScale, opacity: heroOpacity }}
                >
                    {/*
                     * CSS variable bridge: propagates MotionValues as CSS custom
                     * properties so [data-hero-wordmark] and [data-hero-*] targets
                     * inside the Hero subtree receive the counter-scale + fade
                     * without any changes to Hero.tsx itself.
                     */}
                    <WordmarkCSSBridge
                        wordmarkScale={wordmarkScale}
                        copyOpacity={copyOpacity}
                        copyY={copyY}
                        ctaOpacity={ctaOpacity}
                        ctaY={ctaY}
                    />

                    {/* The Hero component — completely unchanged */}
                    {hero}
                </motion.div>

                {/*
                 * Calibration geometry — restrained signal marks that align
                 * around the seam during the gate. Sits BEHIND the hero stage
                 * (z-index in hero-gate.css) so it never covers DOMINASE.
                 */}
                <GeometricSignalField progress={scrollYProgress} />

                {/* Ambient centre vignette during gate peak */}
                <motion.div
                    aria-hidden="true"
                    className="hero-gate-vignette"
                    style={{ opacity: vignetteOpacity }}
                />

                {/* DOMINASE seam of light */}
                <motion.div
                    aria-hidden="true"
                    className="hero-gate-line"
                    style={{ scaleX: gateLineScaleX, opacity: gateLineOpacity }}
                />

            </div>
        </div>
    );
}

// ── CSS variable bridge ───────────────────────────────────────────────────────

function WordmarkCSSBridge({
    wordmarkScale,
    copyOpacity,
    copyY,
    ctaOpacity,
    ctaY,
}: {
    wordmarkScale: MotionValue<number>;
    copyOpacity: MotionValue<number>;
    copyY: MotionValue<number>;
    ctaOpacity: MotionValue<number>;
    ctaY: MotionValue<number>;
}) {
    return (
        <motion.div
            aria-hidden="true"
            className="hero-gate-css-bridge"
            style={{
                "--_gate-wm-scale": wordmarkScale,
                "--_gate-copy-opacity": copyOpacity,
                "--_gate-copy-y": copyY,
                "--_gate-cta-opacity": ctaOpacity,
                "--_gate-cta-y": ctaY,
            } as React.CSSProperties}
        />
    );
}
