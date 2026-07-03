"use client";

/**
 * ScrollReelTestimonials — DOMINASE-native scroll reel testimonial section.
 *
 * Structural inspiration: a counter-moving 3-column "reel" with a featured
 * tile and a staged text reveal. The visual language is DOMINASE (obsidian /
 * deep navy / pearl / mist with an emerald–cyan accent), NOT the reference
 * styling.
 *
 * Behaviour:
 *  - One featured testimonial at a time. Finite navigation (prev disabled on
 *    first, next disabled on last). No autoplay, no drag, no modal.
 *  - Reel: three vertical columns. The middle column carries the featured
 *    project tile; the side columns counter-translate. transform + opacity
 *    only — no blur/backdrop-filter/mix-blend, no heavy shadows.
 *  - Text reveal on change only: English → per character, Arabic → per word.
 *  - prefers-reduced-motion: reveal + reel slide are disabled (handled in CSS
 *    and by gating the reel transition), navigation is instant.
 *  - Featured image is fail-safe: on load error it hides and a premium
 *    initials tile is shown instead — no broken-image icons.
 */

import * as React from "react";
import clsx from "clsx";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

export type ScrollReelTestimonial = {
  id: string | number;
  quote: string;
  author: string;
  role?: string;
  company?: string;
  image?: string;
  alt?: string;
};

export type ScrollReelTestimonialsProps = {
  testimonials: ScrollReelTestimonial[];
  isArabic?: boolean;
  className?: string;
};

/* Reel geometry — one "pitch" between featured tiles in the middle column. */
const CELL = 116; // px, featured/placeholder cell size
const GAP = 12; // px, gap between cells
const STEP = 3 * (CELL + GAP); // one featured + two spacers
const EXIT_MS = 220; // old text out before new text mounts
const SLIDE_MS = 640; // reel slide + interaction lock

function initialsOf(t: ScrollReelTestimonial) {
  const source = (t.company || t.author || "").trim();
  const words = source.split(/\s+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return source.slice(0, 2).toUpperCase();
}

/* ── Placeholder cell (quiet DOMINASE tile, no blur / no noise) ──────────── */
function Cell() {
  return (
    <div
      aria-hidden="true"
      className="shrink-0 rounded-2xl border border-border"
      style={{
        width: CELL,
        height: CELL,
        background:
          "linear-gradient(160deg, color-mix(in srgb, var(--surface) 94%, transparent), color-mix(in srgb, var(--surface-hover) 70%, transparent))",
      }}
    />
  );
}

/* ── Initials fallback tile ─────────────────────────────────────────────── */
function InitialsTile({
  initials,
  label,
}: {
  initials: string;
  label?: string;
}) {
  return (
    <div
      className="relative flex flex-col items-center justify-center gap-1.5 shrink-0 overflow-hidden rounded-2xl border text-center"
      style={{
        width: CELL,
        height: CELL,
        borderColor: "color-mix(in srgb, var(--primary) 30%, var(--border))",
        background:
          "linear-gradient(150deg, color-mix(in srgb, var(--primary) 16%, var(--surface)), var(--surface))",
      }}
    >
      <span className="font-mono text-xl font-black tracking-wide text-primary-theme">
        {initials}
      </span>
      {label && (
        <span className="max-w-[90%] truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
          {label}
        </span>
      )}
    </div>
  );
}

/* ── Featured tile — real image with fail-safe initials fallback ─────────── */
function Featured({ t }: { t: ScrollReelTestimonial }) {
  const [errored, setErrored] = React.useState(false);
  const initials = initialsOf(t);
  const label = t.company;

  if (!t.image || errored) {
    return <InitialsTile initials={initials} label={label} />;
  }

  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-2xl border border-border bg-surface"
      style={{
        width: CELL,
        height: CELL,
        boxShadow: "0 18px 40px -30px var(--cool-shadow)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={t.image}
        alt={t.alt ?? ""}
        loading="lazy"
        onError={() => setErrored(true)}
        className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
      />
      {/* Quiet accent sheen — opacity only, no blur / no mix-blend. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(155deg, transparent 45%, color-mix(in srgb, var(--primary) 22%, transparent))",
        }}
      />
    </div>
  );
}

/* ── Staged text reveal ─────────────────────────────────────────────────────
 * English → per character, Arabic → per word (calmer for RTL). Spaces render
 * as plain text nodes between units so natural line-wrapping is preserved. */
function RevealText({
  text,
  perWord,
  startIndex,
  staggerMs,
}: {
  text: string;
  perWord: boolean;
  startIndex: number;
  staggerMs: number;
}) {
  const words = text.split(" ");
  let idx = startIndex;

  return (
    <>
      {words.map((word, wi) => {
        const trailingSpace = wi < words.length - 1;

        if (perWord) {
          const delay = idx * staggerMs;
          idx++;
          return (
            <React.Fragment key={wi}>
              <span
                className="dominase-reel-unit"
                style={{ animationDelay: `${delay}ms` }}
              >
                {word}
              </span>
              {trailingSpace ? " " : null}
            </React.Fragment>
          );
        }

        // Per character; keep each word unbreakable so chars don't split lines.
        const chars = (
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((ch, ci) => {
              const delay = idx * staggerMs;
              idx++;
              return (
                <span
                  key={ci}
                  className="dominase-reel-unit"
                  style={{ animationDelay: `${delay}ms` }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        );
        if (trailingSpace) idx++; // account for the space in the stagger

        return (
          <React.Fragment key={wi}>
            {chars}
            {trailingSpace ? " " : null}
          </React.Fragment>
        );
      })}
    </>
  );
}

export default function ScrollReelTestimonials({
  testimonials,
  isArabic = false,
  className,
}: ScrollReelTestimonialsProps) {
  const reducedMotion = useReducedMotion();
  const count = testimonials.length;

  // Navigation index vs displayed index kept separate so the exiting block and
  // the entering block never render together.
  const [index, setIndex] = React.useState(0);
  const [displayIndex, setDisplayIndex] = React.useState(0);
  const [exiting, setExiting] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  const animating = React.useRef(false);
  const timeouts = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  React.useEffect(() => {
    // Enable the reel slide transition only after first paint so it starts at
    // its offset without an entrance slide.
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setMounted(true))
    );
    const pending = timeouts.current;
    return () => {
      cancelAnimationFrame(raf);
      pending.forEach(clearTimeout);
    };
  }, []);

  const paginate = React.useCallback(
    (dir: 1 | -1) => {
      if (animating.current) return;
      const next = index + dir;
      if (next < 0 || next >= count) return;

      if (reducedMotion) {
        setIndex(next);
        setDisplayIndex(next);
        return;
      }

      animating.current = true;
      setIndex(next);
      setExiting(true);
      timeouts.current.push(
        setTimeout(() => {
          setDisplayIndex(next);
          setExiting(false);
        }, EXIT_MS)
      );
      timeouts.current.push(
        setTimeout(() => {
          animating.current = false;
        }, SLIDE_MS)
      );
    },
    [index, count, reducedMotion]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      paginate(isArabic ? -1 : 1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      paginate(isArabic ? 1 : -1);
    }
  };

  // Middle column: 3 lead cells, then featured + 2 spacers per entry, 3 trail.
  const middleItems = React.useMemo(() => {
    const items: Array<{ type: "cell" } | { type: "featured"; i: number }> = [];
    for (let i = 0; i < 3; i++) items.push({ type: "cell" });
    testimonials.forEach((_, i) => {
      items.push({ type: "featured", i });
      if (i < count - 1) items.push({ type: "cell" }, { type: "cell" });
    });
    for (let i = 0; i < 3; i++) items.push({ type: "cell" });
    return items;
  }, [testimonials, count]);

  const sideCellCount = 4 + 2 * count;
  const centerIdx = (count - 1) / 2;
  const middleY = (centerIdx - index) * STEP;
  const sideY = -middleY;

  const colStyle = (y: number): React.CSSProperties => ({
    transform: `translateY(${y}px)`,
    transition:
      mounted && !reducedMotion
        ? `transform ${SLIDE_MS}ms cubic-bezier(0.65,0,0.35,1)`
        : "none",
  });

  if (count === 0) return null;

  const current = testimonials[displayIndex];
  const openQuote = isArabic ? "”" : "“";
  const arrowBtn =
    "grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-muted transition-colors duration-200 hover:enabled:border-primary-theme/50 hover:enabled:text-primary-theme disabled:cursor-default disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={isArabic ? "تقييمات العملاء" : "Client testimonials"}
      tabIndex={0}
      onKeyDown={onKeyDown}
      dir={isArabic ? "rtl" : "ltr"}
      className={clsx(
        "relative flex w-full flex-col overflow-hidden rounded-3xl border border-border bg-surface outline-none focus-visible:ring-2 focus-visible:ring-primary-theme md:flex-row md:min-h-[22rem]",
        className
      )}
      style={{ boxShadow: "0 30px 70px -50px var(--cool-shadow)" }}
    >
      {/* Reel */}
      <div
        aria-hidden="true"
        className="relative h-52 w-full shrink-0 self-stretch overflow-hidden border-b border-border md:h-auto md:w-[320px] md:border-b-0 md:border-e"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--surface-muted) 60%, transparent), transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center gap-3">
          {/* Left column (counter-moves) */}
          <div className="flex shrink-0 flex-col gap-3" style={colStyle(sideY)}>
            {Array.from({ length: sideCellCount }).map((_, i) => (
              <Cell key={i} />
            ))}
          </div>

          {/* Middle column (featured tiles) */}
          <div className="flex shrink-0 flex-col gap-3" style={colStyle(middleY)}>
            {middleItems.map((item, i) =>
              item.type === "featured" ? (
                <Featured key={i} t={testimonials[item.i]} />
              ) : (
                <Cell key={i} />
              )
            )}
          </div>

          {/* Right column (counter-moves) */}
          <div className="flex shrink-0 flex-col gap-3" style={colStyle(sideY)}>
            {Array.from({ length: sideCellCount }).map((_, i) => (
              <Cell key={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className={clsx(
          "flex min-w-0 flex-1 flex-col justify-between gap-8 px-6 py-8 md:px-10 md:py-10",
          isArabic ? "text-right" : "text-left"
        )}
      >
        <div className="flex flex-col gap-4">
          <span
            className="block font-black leading-none text-primary-theme/25"
            style={{ fontSize: "3rem" }}
            aria-hidden="true"
          >
            {openQuote}
          </span>

          {/* Text stage. An invisible in-flow copy sizes the stage to the
              current quote so the absolutely-positioned animated block never
              clips at any width. */}
          <div className="relative w-full" aria-live="polite">
            <div aria-hidden="true" className="invisible flex flex-col gap-4">
              <p
                className={clsx(
                  "m-0 font-semibold text-foreground",
                  isArabic
                    ? "text-base leading-[1.9] sm:text-lg"
                    : "text-base leading-8 sm:text-lg"
                )}
              >
                {current.quote}
              </p>
              <div className="text-sm">
                <p className="font-black text-foreground">{current.author}</p>
                {(current.role || current.company) && (
                  <p className="font-semibold text-muted">
                    {[current.role, current.company]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                )}
              </div>
            </div>

            <div
              key={displayIndex}
              className={clsx(
                "absolute inset-x-0 top-0 flex flex-col gap-4",
                exiting && "dominase-reel-exit"
              )}
            >
              <p
                className={clsx(
                  "m-0 font-semibold text-foreground",
                  isArabic
                    ? "text-base leading-[1.9] sm:text-lg"
                    : "text-base leading-8 sm:text-lg"
                )}
              >
                <RevealText
                  text={current.quote}
                  perWord={isArabic}
                  startIndex={0}
                  staggerMs={isArabic ? 14 : 5}
                />
              </p>
              <div className="text-sm">
                <p className="font-black text-foreground">
                  <RevealText
                    text={current.author}
                    perWord
                    startIndex={0}
                    staggerMs={isArabic ? 14 : 5}
                  />
                </p>
                {(current.role || current.company) && (
                  <p className="font-semibold text-muted">
                    {[current.role, current.company]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Controls — outside the quote/tile area, keyboard accessible. */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => paginate(-1)}
            disabled={index === 0}
            aria-label={isArabic ? "السابق" : "Previous testimonial"}
            className={arrowBtn}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="rtl:-scale-x-100"
            >
              <path
                d="M10 12L6 8l4-4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className="font-mono text-xs font-semibold tracking-widest text-muted">
            {index + 1} / {count}
          </span>
          <button
            type="button"
            onClick={() => paginate(1)}
            disabled={index === count - 1}
            aria-label={isArabic ? "التالي" : "Next testimonial"}
            className={arrowBtn}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="rtl:-scale-x-100"
            >
              <path
                d="M6 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
