"use client";

import { forwardRef, type CSSProperties, type RefObject } from "react";
import { useLanguage } from "@/context/LanguageContext";

const waterCopy = {
  en: {
    chapter: "Beneath the surface / 01",
    title: "Clarity surfaces.",
    body: "The noise fades. Direction appears.",
    words: ["Clarity", "Direction", "Trust", "Momentum"],
    release: "A product that breathes.",
  },
  ar: {
    chapter: "تحت السطح / ٠١",
    title: "يظهر الوضوح.",
    body: "يهدأ الضجيج، فيظهر الاتجاه.",
    words: ["وضوح", "اتجاه", "ثقة", "تقدّم"],
    release: "منتج ينبض بالحياة.",
  },
} as const;

const WORD_TIMING = [
  { start: 0.08, end: 0.32, depth: 0.72, drift: 12, size: 92 },
  { start: 0.29, end: 0.53, depth: 0.48, drift: -14, size: 76 },
  { start: 0.5, end: 0.74, depth: 0.84, drift: 10, size: 104 },
  { start: 0.71, end: 0.95, depth: 0.64, drift: -12, size: 86 },
] as const;

type BubbleSize = "micro" | "small" | "medium";

type FieldBubble = {
  id: string;
  stream: "left" | "right";
  size: BubbleSize;
  pixels: number;
  x: number;
  y: number;
  start: number;
  end: number;
  depth: number;
  drift: number;
  mobile: boolean;
  duration: number;
  delay: number;
  blur: number;
};

const BUBBLE_FIELD: readonly FieldBubble[] = [
  { id: "l01", stream: "left", size: "micro", pixels: 3, x: 9, y: 66, start: 0.02, end: 0.43, depth: 0.18, drift: 8, mobile: true, duration: 3.8, delay: -0.4, blur: 0.2 },
  { id: "l02", stream: "left", size: "micro", pixels: 4, x: 12, y: 74, start: 0.05, end: 0.48, depth: 0.28, drift: -5, mobile: true, duration: 4.6, delay: -1.8, blur: 0 },
  { id: "l03", stream: "left", size: "small", pixels: 8, x: 16, y: 70, start: 0.09, end: 0.52, depth: 0.42, drift: 10, mobile: true, duration: 5.3, delay: -2.7, blur: 0 },
  { id: "l04", stream: "left", size: "micro", pixels: 2, x: 19, y: 82, start: 0.12, end: 0.55, depth: 0.12, drift: -7, mobile: false, duration: 3.4, delay: -1.1, blur: 0.35 },
  { id: "l05", stream: "left", size: "small", pixels: 12, x: 24, y: 73, start: 0.15, end: 0.59, depth: 0.66, drift: 13, mobile: true, duration: 5.8, delay: -3.5, blur: 0 },
  { id: "l06", stream: "left", size: "micro", pixels: 5, x: 29, y: 79, start: 0.18, end: 0.63, depth: 0.34, drift: -9, mobile: false, duration: 4.2, delay: -0.9, blur: 0.15 },
  { id: "l07", stream: "left", size: "medium", pixels: 24, x: 11, y: 86, start: 0.24, end: 0.68, depth: 0.75, drift: 16, mobile: true, duration: 6.4, delay: -4.2, blur: 0 },
  { id: "l08", stream: "left", size: "small", pixels: 6, x: 21, y: 76, start: 0.3, end: 0.71, depth: 0.24, drift: 8, mobile: false, duration: 4.9, delay: -2.1, blur: 0.2 },
  { id: "l09", stream: "left", size: "micro", pixels: 3, x: 31, y: 84, start: 0.34, end: 0.74, depth: 0.19, drift: -11, mobile: true, duration: 3.7, delay: -1.5, blur: 0.3 },
  { id: "l10", stream: "left", size: "small", pixels: 10, x: 14, y: 81, start: 0.4, end: 0.78, depth: 0.55, drift: 12, mobile: false, duration: 5.5, delay: -3.1, blur: 0 },
  { id: "l11", stream: "left", size: "micro", pixels: 4, x: 27, y: 78, start: 0.45, end: 0.82, depth: 0.31, drift: -8, mobile: false, duration: 4.1, delay: -0.6, blur: 0.1 },
  { id: "l12", stream: "left", size: "small", pixels: 14, x: 9, y: 88, start: 0.53, end: 0.87, depth: 0.69, drift: 15, mobile: true, duration: 6.1, delay: -4.8, blur: 0 },
  { id: "l13", stream: "left", size: "micro", pixels: 2, x: 18, y: 83, start: 0.6, end: 0.91, depth: 0.16, drift: 7, mobile: false, duration: 3.5, delay: -2.3, blur: 0.4 },
  { id: "l14", stream: "left", size: "medium", pixels: 31, x: 30, y: 91, start: 0.64, end: 0.94, depth: 0.82, drift: -14, mobile: true, duration: 7.2, delay: -5.4, blur: 0 },
  { id: "r01", stream: "right", size: "micro", pixels: 3, x: 91, y: 68, start: 0.01, end: 0.39, depth: 0.22, drift: -7, mobile: true, duration: 3.9, delay: -1.2, blur: 0.25 },
  { id: "r02", stream: "right", size: "small", pixels: 7, x: 87, y: 77, start: 0.08, end: 0.47, depth: 0.48, drift: 9, mobile: true, duration: 5.1, delay: -2.8, blur: 0 },
  { id: "r03", stream: "right", size: "micro", pixels: 2, x: 82, y: 73, start: 0.11, end: 0.5, depth: 0.14, drift: 6, mobile: false, duration: 3.3, delay: -0.5, blur: 0.4 },
  { id: "r04", stream: "right", size: "small", pixels: 12, x: 77, y: 84, start: 0.16, end: 0.58, depth: 0.63, drift: -13, mobile: true, duration: 5.9, delay: -4.1, blur: 0 },
  { id: "r05", stream: "right", size: "micro", pixels: 4, x: 70, y: 75, start: 0.21, end: 0.62, depth: 0.3, drift: 8, mobile: true, duration: 4.4, delay: -1.9, blur: 0.1 },
  { id: "r06", stream: "right", size: "medium", pixels: 20, x: 88, y: 88, start: 0.27, end: 0.7, depth: 0.72, drift: -15, mobile: true, duration: 6.3, delay: -5.1, blur: 0 },
  { id: "r07", stream: "right", size: "small", pixels: 6, x: 73, y: 71, start: 0.32, end: 0.73, depth: 0.25, drift: 10, mobile: false, duration: 4.7, delay: -2.5, blur: 0.2 },
  { id: "r08", stream: "right", size: "micro", pixels: 5, x: 92, y: 82, start: 0.36, end: 0.77, depth: 0.19, drift: -8, mobile: true, duration: 4, delay: -0.8, blur: 0.2 },
  { id: "r09", stream: "right", size: "small", pixels: 9, x: 79, y: 79, start: 0.43, end: 0.81, depth: 0.52, drift: 12, mobile: false, duration: 5.4, delay: -3.6, blur: 0 },
  { id: "r10", stream: "right", size: "micro", pixels: 3, x: 69, y: 87, start: 0.48, end: 0.85, depth: 0.16, drift: -6, mobile: false, duration: 3.6, delay: -1.4, blur: 0.35 },
  { id: "r11", stream: "right", size: "medium", pixels: 29, x: 84, y: 92, start: 0.55, end: 0.9, depth: 0.8, drift: 14, mobile: true, duration: 6.9, delay: -5.7, blur: 0 },
  { id: "r12", stream: "right", size: "small", pixels: 14, x: 75, y: 85, start: 0.61, end: 0.93, depth: 0.64, drift: -12, mobile: true, duration: 5.7, delay: -3.9, blur: 0 },
  { id: "r13", stream: "right", size: "micro", pixels: 4, x: 90, y: 76, start: 0.68, end: 0.96, depth: 0.29, drift: 7, mobile: false, duration: 4.3, delay: -2.2, blur: 0.15 },
] as const;

const HomeWaterChapter = forwardRef<
  HTMLDivElement,
  {
    staticMode?: boolean;
    particleCanvasRef?: RefObject<HTMLCanvasElement | null>;
  }
>(function HomeWaterChapter(
  { staticMode = false, particleCanvasRef },
  ref,
) {
  const { language } = useLanguage();
  const copy = waterCopy[language];

  return (
    <div
      ref={ref}
      className={`home-water-stage${
        staticMode
          ? " home-water-stage--static"
          : " home-water-stage--transition"
      }`}
      aria-labelledby={staticMode ? undefined : "home-water-title"}
    >
      <div className="home-water__depth" aria-hidden="true">
        <span className="home-water__haze" />
        <span className="home-water__caustics" />
        <span className="home-water__signal-veil" />
        {BUBBLE_FIELD.map((bubble) => (
          <span
            key={bubble.id}
            className={`home-water-field-bubble home-water-field-bubble--${bubble.size}`}
            data-water-bubble
            data-water-layer={bubble.depth >= 0.58 ? "foreground" : "background"}
            data-water-stream={bubble.stream}
            data-mobile={String(bubble.mobile)}
            data-water-start={String(bubble.start)}
            data-water-end={String(bubble.end)}
            data-water-depth={String(bubble.depth)}
            data-water-drift={String(bubble.drift)}
            style={
              {
                "--bubble-x": `${bubble.x}%`,
                "--bubble-y": `${bubble.y}%`,
                "--bubble-size": `${bubble.pixels}px`,
                "--bubble-duration": `${bubble.duration}s`,
                "--bubble-delay": `${bubble.delay}s`,
                "--bubble-blur": `${bubble.blur}px`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      {particleCanvasRef ? (
        <canvas
          ref={particleCanvasRef}
          className="home-water__particles"
          aria-hidden="true"
          tabIndex={-1}
        />
      ) : null}

      <header className="home-water__heading">
        <p>{copy.chapter}</p>
        <h2 id={staticMode ? undefined : "home-water-title"}>{copy.title}</h2>
        <span>{copy.body}</span>
      </header>

      <ol className="home-water__bubbles">
        {copy.words.map((word, index) => {
          const timing = WORD_TIMING[index];
          return (
            <li
              key={word}
              data-water-bubble
              data-water-layer="word"
              data-water-start={String(timing.start)}
              data-water-end={String(timing.end)}
              data-water-depth={String(timing.depth)}
              data-water-drift={String(timing.drift)}
              style={{ "--word-size": `${timing.size}px` } as CSSProperties}
            >
              <strong>{word}</strong>
            </li>
          );
        })}
      </ol>

      <p className="home-water__release">{copy.release}</p>
      <div className="home-water__work-lead" aria-hidden="true">
        <span />
        <i />
      </div>
    </div>
  );
});

export default HomeWaterChapter;
