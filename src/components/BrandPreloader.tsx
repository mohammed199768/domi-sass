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
const MIN_DURATION_MS = 1100;
/** Shorter window for reduced-motion users. */
const MIN_DURATION_REDUCED_MS = 650;
/** Hard ceiling: readiness can fail, but the boot gate must not hang. */
const MAX_READY_WAIT_MS = 4200;
const WINDOW_LOAD_WAIT_MS = 1200;

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function withTimeout(promise: Promise<unknown>, ms: number) {
  return Promise.race([promise, wait(ms)]).then(() => undefined);
}

function markBootShown() {
  try {
    window.sessionStorage.setItem(SESSION_FLAG, "1");
  } catch {
    // Storage can be unavailable in private/restricted contexts.
  }
}

function waitForDocumentInteractive() {
  if (document.readyState === "interactive" || document.readyState === "complete") {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    document.addEventListener("DOMContentLoaded", () => resolve(), { once: true });
  });
}

function waitForWindowLoadBriefly() {
  if (document.readyState === "complete") return Promise.resolve();

  return withTimeout(
    new Promise<void>((resolve) => {
      window.addEventListener("load", () => resolve(), { once: true });
    }),
    WINDOW_LOAD_WAIT_MS,
  );
}

function waitForFonts() {
  if (!("fonts" in document)) return Promise.resolve();
  return document.fonts.ready.then(() => undefined);
}

function waitForNextPaint() {
  return new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => resolve());
    });
  });
}

function waitForImage(image: HTMLImageElement) {
  if (image.complete) return Promise.resolve();

  return new Promise<void>((resolve) => {
    const done = () => resolve();
    image.addEventListener("load", done, { once: true });
    image.addEventListener("error", done, { once: true });
  });
}

function waitForVideoMetadata(video: HTMLVideoElement) {
  if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const done = () => resolve();
    video.addEventListener("loadedmetadata", done, { once: true });
    video.addEventListener("canplay", done, { once: true });
    video.addEventListener("error", done, { once: true });
  });
}

function waitForCriticalVisuals() {
  const criticalNodes = Array.from(
    document.querySelectorAll<HTMLElement>(
      "[data-preload-critical], [data-hero-wordmark]",
    ),
  );

  const checks = criticalNodes.map((node) => {
    if (node instanceof HTMLImageElement) return waitForImage(node);
    if (node instanceof HTMLVideoElement) return waitForVideoMetadata(node);
    return Promise.resolve();
  });

  return Promise.all(checks).then(() => undefined);
}

function waitForAppReady() {
  return withTimeout(
    Promise.all([
      waitForDocumentInteractive(),
      waitForFonts(),
      waitForWindowLoadBriefly(),
      waitForNextPaint().then(waitForCriticalVisuals),
    ]),
    MAX_READY_WAIT_MS,
  );
}

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

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const body = document.body;

    if (show) {
      root.classList.add("domi-booting");
      body.classList.add("domi-booting");
      root.classList.remove("domi-boot-revealed");

      return () => {
        root.classList.remove("domi-booting");
        body.classList.remove("domi-booting");
      };
    }

    root.classList.remove("domi-booting");
    body.classList.remove("domi-booting");
    root.classList.add("domi-boot-revealed");

    const timer = window.setTimeout(() => {
      root.classList.remove("domi-boot-revealed");
    }, 700);

    return () => window.clearTimeout(timer);
  }, [mounted, show]);

  // Auto-dismiss only after critical readiness and the branded minimum window.
  useEffect(() => {
    if (!mounted || show !== true) return;
    const duration = prefersReducedMotion
      ? MIN_DURATION_REDUCED_MS
      : MIN_DURATION_MS;

    let cancelled = false;

    Promise.all([wait(duration), waitForAppReady()]).then(() => {
      if (cancelled) return;
      markBootShown();
      setShow(false);
    });

    return () => {
      cancelled = true;
    };
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
