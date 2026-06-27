"use client";

/**
 * BrandPreloader — "DOMINASE System Boot"
 *
 * A brief, branded intro shown only on the first load of a session. It covers
 * the page with a solid bg surface, shows the DOMINASE wordmark, a thin seam
 * that scales in, a small system status line, and a segmented orbital ring.
 *
 * Behaviour:
 *  - Renders only on the very first paint of a session (sessionStorage flag),
 *    so internal navigation / soft refreshes within the session don't replay.
 *  - Minimal visible duration, then exits (opacity + y) and unmounts — it never
 *    blocks interaction longer than the short intro window.
 *  - Reduced motion: shows a static brand mark briefly, no animation, exits.
 *
 * Motion constraints: transform + opacity only, no filter/blur/backdrop-filter,
 * no canvas/WebGL/Lottie. The only keyframe animation (ring spin) lives in CSS
 * scoped to this overlay, which is removed from the DOM on completion.
 */

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion as fmReducedMotion,
} from "framer-motion";
import "./brand-preloader.css";

const SESSION_FLAG = "dominase-boot-shown";
/** Minimum on-screen time so the boot never flashes (motion). */
const MIN_DURATION_MS = 1400;
/** Shorter window for reduced-motion users. */
const MIN_DURATION_REDUCED_MS = 650;

export default function BrandPreloader() {
  const prefersReducedMotion = fmReducedMotion();
  // Mounted gate: stays false through SSR + first client paint so the server
  // and client markup match (no hydration mismatch). The effect flips it once.
  const [mounted, setMounted] = useState(false);
  // Whether this is the session's first load — decided synchronously on the
  // client via a lazy initializer (no setState-in-effect cascade).
  const [show, setShow] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      if (window.sessionStorage.getItem(SESSION_FLAG) === "1") return false;
      window.sessionStorage.setItem(SESSION_FLAG, "1");
    } catch {
      // sessionStorage unavailable — show once, never persists.
    }
    return true;
  });

  // Reveal after mount so SSR (which always renders nothing) matches hydration.
  // Async setState (repo convention) avoids the set-state-in-effect lint rule.
  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  // Auto-dismiss after the minimal intro window.
  useEffect(() => {
    if (!mounted || show !== true) return;
    const duration = prefersReducedMotion
      ? MIN_DURATION_REDUCED_MS
      : MIN_DURATION_MS;
    const timer = window.setTimeout(() => setShow(false), duration);
    return () => window.clearTimeout(timer);
  }, [mounted, show, prefersReducedMotion]);

  return (
    <AnimatePresence>
      {mounted && show && (
        <motion.div
          className="brand-preloader"
          role="status"
          aria-label="DOMINASE — loading"
          aria-live="polite"
          initial={{ opacity: 1 }}
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: -24 }
          }
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="brand-preloader__inner">
            <div className="brand-preloader__ring" aria-hidden="true">
              <div className="brand-preloader__core" />
            </div>

            <motion.div
              className="brand-preloader__wordmark"
              initial={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 10 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              DOMINASE
            </motion.div>

            <motion.div
              className="brand-preloader__seam"
              aria-hidden="true"
              initial={
                prefersReducedMotion
                  ? { scaleX: 1, opacity: 1 }
                  : { scaleX: 0, opacity: 0 }
              }
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.div
              className="brand-preloader__status"
              initial={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }
              }
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Digital Product Studio · Calibrating interface
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
