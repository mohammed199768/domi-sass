"use client";

/**
 * DominaseCursor — "Emerald Signal" custom cursor.
 *
 * Visual: a small precise pearl/emerald core dot, a thin trailing ring, and a
 * faint horizontal calibration tick that appears on interactive targets.
 * Premium technical — no glow blobs, no particles, no playful bounce.
 *
 * Activation: only on precise-pointer, hover-capable devices without reduced
 * motion — `(hover: hover) and (pointer: fine)` + no `prefers-reduced-motion`.
 * Touch/coarse/tablet/reduced-motion users keep the native cursor untouched
 * (the component renders nothing and never hides the native cursor).
 *
 * States (via data-state on the fixed layer, styled in dominase-cursor.css):
 *  - "default"      core dot + low-opacity ring
 *  - "interactive"  ring expands + brightens, calibration tick fades in
 *  - "text"         custom cursor hides; native text cursor shows (inputs,
 *                   textareas, selects, [data-cursor="text"]) — readability
 *                   is never harmed
 *  - "pressed"      slight ring contraction on pointerdown
 *
 * Performance contract:
 *  - zero React state updates after mount — refs + direct style writes only
 *  - one RAF loop, self-stopping: it parks itself once dot/ring converge and
 *    restarts on the next pointer event
 *  - transform: translate3d only — no top/left, no box-shadow/filter animation
 *  - paused on document hidden; all listeners + RAF cleaned up on unmount
 *  - interaction detection via pointerover/out event delegation (composedPath
 *    not needed — `closest()` from the event target)
 *  - layer is position:fixed + pointer-events:none → no clicks blocked, no
 *    overflow created
 */

import { useEffect, useRef } from "react";
import "./dominase-cursor.css";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  '[role="button"]',
  "summary",
  "label",
  '[data-cursor="interactive"]',
].join(",");

const TEXT_SELECTOR = [
  "input",
  "textarea",
  "select",
  '[contenteditable="true"]',
  '[data-cursor="text"]',
].join(",");

/** Ring follow factor per 60fps frame (frame-rate compensated in the loop). */
const RING_LERP = 0.22;
/** Below this distance (px) the loop considers itself converged and parks. */
const EPSILON = 0.05;

export default function DominaseCursor() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    /* Activation gate — precise hover pointer, no reduced motion. */
    const fineQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let active = false;
    let cleanupActive: (() => void) | null = null;

    const enable = () => {
      if (active) return;
      active = true;

      const dot = layer.querySelector<HTMLElement>(".domi-cursor__dot");
      const ring = layer.querySelector<HTMLElement>(".domi-cursor__ring");
      if (!dot || !ring) return;

      document.documentElement.classList.add("domi-cursor-on");
      layer.dataset.state = "default";

      /* Position state — refs only, never React state. */
      let px = -100;
      let py = -100;
      let rx = -100;
      let ry = -100;
      let rafId = 0;
      let running = false;
      let lastTs = 0;
      let seen = false;

      const step = (ts: number) => {
        const dt = lastTs ? Math.min((ts - lastTs) / (1000 / 60), 3) : 1;
        lastTs = ts;

        /* Core dot: precise, snaps to the pointer. */
        dot.style.transform = `translate3d(${px}px, ${py}px, 0)`;

        /* Ring: trails with frame-rate-compensated lerp. */
        const t = 1 - Math.pow(1 - RING_LERP, dt);
        rx += (px - rx) * t;
        ry += (py - ry) * t;
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;

        if (Math.abs(px - rx) < EPSILON && Math.abs(py - ry) < EPSILON) {
          /* Converged — park the loop until the next pointer event. */
          running = false;
          lastTs = 0;
          return;
        }
        rafId = requestAnimationFrame(step);
      };

      const wake = () => {
        if (!running && !document.hidden) {
          running = true;
          rafId = requestAnimationFrame(step);
        }
      };

      const onPointerMove = (e: PointerEvent) => {
        if (e.pointerType === "touch") return;
        px = e.clientX;
        py = e.clientY;
        if (!seen) {
          /* First contact: place the ring immediately, no fly-in. */
          seen = true;
          rx = px;
          ry = py;
          layer.dataset.visible = "true";
        }
        wake();
      };

      /* ── Interaction state via event delegation ── */
      const onPointerOver = (e: PointerEvent) => {
        const el = e.target;
        if (!(el instanceof Element)) return;
        if (el.closest(TEXT_SELECTOR)) {
          layer.dataset.state = "text";
        } else if (el.closest(INTERACTIVE_SELECTOR)) {
          layer.dataset.state = "interactive";
        } else {
          layer.dataset.state = "default";
        }
      };

      const onPointerDown = () => {
        if (layer.dataset.state !== "text") layer.dataset.pressed = "true";
      };
      const onPointerUp = () => {
        delete layer.dataset.pressed;
      };

      /* Hide when the pointer leaves the window; show on return. */
      const onLeaveWindow = (e: PointerEvent) => {
        if (!e.relatedTarget) layer.dataset.visible = "false";
      };
      const onEnterWindow = () => {
        if (seen) layer.dataset.visible = "true";
      };

      const onVisibilityChange = () => {
        if (document.hidden) {
          running = false;
          cancelAnimationFrame(rafId);
          lastTs = 0;
        } else {
          wake();
        }
      };

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerover", onPointerOver, { passive: true });
      document.addEventListener("pointerdown", onPointerDown, { passive: true });
      document.addEventListener("pointerup", onPointerUp, { passive: true });
      document.addEventListener("pointerout", onLeaveWindow, { passive: true });
      document.addEventListener("pointerenter", onEnterWindow, { passive: true });
      document.addEventListener("visibilitychange", onVisibilityChange);

      cleanupActive = () => {
        running = false;
        cancelAnimationFrame(rafId);
        window.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerover", onPointerOver);
        document.removeEventListener("pointerdown", onPointerDown);
        document.removeEventListener("pointerup", onPointerUp);
        document.removeEventListener("pointerout", onLeaveWindow);
        document.removeEventListener("pointerenter", onEnterWindow);
        document.removeEventListener("visibilitychange", onVisibilityChange);
        document.documentElement.classList.remove("domi-cursor-on");
        layer.dataset.visible = "false";
        cleanupActive = null;
        active = false;
      };
    };

    const sync = () => {
      const shouldEnable = fineQuery.matches && !motionQuery.matches;
      if (shouldEnable) enable();
      else cleanupActive?.();
    };

    fineQuery.addEventListener("change", sync);
    motionQuery.addEventListener("change", sync);
    sync();

    return () => {
      fineQuery.removeEventListener("change", sync);
      motionQuery.removeEventListener("change", sync);
      cleanupActive?.();
    };
  }, []);

  return (
    <div
      ref={layerRef}
      className="domi-cursor"
      data-visible="false"
      aria-hidden="true"
    >
      <div className="domi-cursor__dot" />
      <div className="domi-cursor__ring">
        <span className="domi-cursor__tick" />
      </div>
    </div>
  );
}
