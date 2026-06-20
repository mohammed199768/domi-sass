"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

/**
 * FitToViewport — scales its content down (never up) so a whole case-study
 * chapter fits inside one viewport during the horizontal "fit" journey, instead
 * of clipping or forcing a vertical scroll.
 *
 * How it works:
 *  - The outer stage fills the panel (the available width/height the shell gives
 *    it after its own padding).
 *  - The inner content keeps its natural, readable size and is measured.
 *  - We compute `scale = min(1, availW / contentW, availH / contentH)` and apply
 *    `transform: scale(scale)` with `transform-origin: center`, clamped to a
 *    readable minimum so text never becomes unreadably small.
 *
 * It updates only on layout changes (ResizeObserver on both stage and content)
 * and on font load — there is NO requestAnimationFrame / continuous loop.
 *
 * SSR-safe: before measurement the content renders at scale 1 (the natural
 * layout), so server output and first paint match the un-scaled content.
 */
export default function FitToViewport({
  minScale = 0.72,
  className = "",
  children,
}: {
  minScale?: number;
  className?: string;
  children: ReactNode;
}) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const content = contentRef.current;
    if (!stage || !content) return;

    const measure = () => {
      // Natural (un-scaled) content size. We read scrollWidth/Height so the
      // current transform does not feed back into the measurement.
      const contentWidth = content.scrollWidth;
      const contentHeight = content.scrollHeight;
      if (contentWidth === 0 || contentHeight === 0) return;

      const availWidth = stage.clientWidth;
      const availHeight = stage.clientHeight;
      if (availWidth === 0 || availHeight === 0) return;

      const next = Math.min(1, availWidth / contentWidth, availHeight / contentHeight);
      const clamped = Math.max(minScale, Number.isFinite(next) ? next : 1);
      // Round to avoid sub-pixel thrash re-renders.
      setScale((prev) => (Math.abs(prev - clamped) > 0.004 ? clamped : prev));
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    observer.observe(content);

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    return () => observer.disconnect();
  }, [minScale, children]);

  // Recompute once after mount in case fonts/layout settled late.
  useEffect(() => {
    const id = window.setTimeout(() => {
      const stage = stageRef.current;
      const content = contentRef.current;
      if (!stage || !content) return;
      const next = Math.min(
        1,
        stage.clientWidth / content.scrollWidth,
        stage.clientHeight / content.scrollHeight,
      );
      const clamped = Math.max(minScale, Number.isFinite(next) ? next : 1);
      setScale((prev) => (Math.abs(prev - clamped) > 0.004 ? clamped : prev));
    }, 120);
    return () => window.clearTimeout(id);
  }, [minScale]);

  return (
    <div ref={stageRef} className={`flex h-full w-full items-center justify-center ${className}`}>
      <div
        ref={contentRef}
        style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
        className="w-full"
      >
        {children}
      </div>
    </div>
  );
}
