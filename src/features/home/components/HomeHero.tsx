"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import HomeHeroMedia from "./HomeHeroMedia";
import HomeTextMotion from "./HomeTextMotion";
import HomeWaterChapter from "./HomeWaterChapter";

const story = {
  en: {
    chapter: "Signal / 00",
    role: "Digital Product Studio",
    title: "Signal.",
    support: "Direction gives the idea form.",
    cue: "Direct the film",
    beats: [
      {
        index: "01",
        eyebrow: "Request",
        title: "Unformed.",
        body: "A need, not yet a product.",
      },
      {
        index: "02",
        eyebrow: "Shift",
        title: "Direction.",
        body: "Decisions align into one path.",
      },
      {
        index: "03",
        eyebrow: "Outcome",
        title: "Built to Move.",
        body: "A working system, ready to improve.",
      },
    ],
    mobileFrames: [
      {
        src: "/assest/home/hero/frames/frame-01.webp",
        label: "Request",
        text: "Not yet a product.",
      },
      {
        src: "/assest/home/hero/frames/frame-26.webp",
        label: "Direction",
        text: "Decisions align.",
      },
      {
        src: "/assest/home/hero/frames/frame-39.webp",
        label: "System",
        text: "The path takes form.",
      },
      {
        src: "/assest/home/hero/frames/frame-49.webp",
        label: "Product",
        text: "Ready to move.",
      },
    ],
  },
  ar: {
    chapter: "إشارة / ٠٠",
    role: "استوديو منتجات رقمية",
    title: "إشارة.",
    support: "يمنح الاتجاه الفكرة شكلاً.",
    cue: "قُد المشهد",
    beats: [
      {
        index: "٠١",
        eyebrow: "الطلب",
        title: "بلا ملامح.",
        body: "حاجة لم تصبح منتجاً بعد.",
      },
      {
        index: "٠٢",
        eyebrow: "التحول",
        title: "اتجاه.",
        body: "تنتظم القرارات في مسار واحد.",
      },
      {
        index: "٠٣",
        eyebrow: "النتيجة",
        title: "نبني للتقدّم.",
        body: "نظام يعمل ويتحسّن.",
      },
    ],
    mobileFrames: [
      {
        src: "/assest/home/hero/frames/frame-01.webp",
        label: "طلب",
        text: "لم تصبح منتجاً بعد.",
      },
      {
        src: "/assest/home/hero/frames/frame-26.webp",
        label: "اتجاه",
        text: "تنتظم القرارات.",
      },
      {
        src: "/assest/home/hero/frames/frame-39.webp",
        label: "نظام",
        text: "يتّخذ المسار شكلاً.",
      },
      {
        src: "/assest/home/hero/frames/frame-49.webp",
        label: "منتج",
        text: "جاهز للتقدّم.",
      },
    ],
  },
} as const;

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const waterStageRef = useRef<HTMLDivElement>(null);
  const waterParticleCanvasRef = useRef<HTMLCanvasElement>(null);
  const staticWaterParticleCanvasRef = useRef<HTMLCanvasElement>(null);
  const { language } = useLanguage();
  const copy = story[language];
  const filmBeats = copy.beats;

  return (
    <section
      ref={sectionRef}
      id="home"
      className="home-hero"
      data-home-hero
      data-cinematic-chapter
      data-beat="0"
      aria-labelledby="home-hero-title"
    >
      <div className="home-hero__sticky">
        <HomeHeroMedia
          sectionRef={sectionRef}
          waterStageRef={waterStageRef}
          waterParticleCanvasRef={waterParticleCanvasRef}
          staticWaterParticleCanvasRef={staticWaterParticleCanvasRef}
        />

        <div className="home-hero__frame-lines" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        <header className="home-hero__opening">
          <p className="home-hero__chapter">{copy.chapter}</p>
          <p className="home-hero__brand" dir="ltr">
            DOMINASE
          </p>
          <p className="home-hero__role">{copy.role}</p>
          <h1 id="home-hero-title">
            <HomeTextMotion variant="signal">{copy.title}</HomeTextMotion>
          </h1>
          <p className="home-hero__support">{copy.support}</p>
        </header>

        <ol className="home-hero__beats">
          {filmBeats.map((beat, index) => (
            <li key={beat.index} data-film-beat={index + 1}>
              <p>
                <span>{beat.index}</span>
                {beat.eyebrow}
              </p>
              <strong>{beat.title}</strong>
              <span>{beat.body}</span>
            </li>
          ))}
        </ol>

        <div className="home-hero__timeline" aria-hidden="true">
          <span className="home-hero__timeline-label">00</span>
          <span className="home-hero__timeline-track">
            <i />
          </span>
          <span className="home-hero__timeline-label">49</span>
        </div>

        <p className="home-hero__scroll-cue">
          <ArrowDown aria-hidden="true" />
          <span>{copy.cue}</span>
        </p>

      </div>

      <HomeWaterChapter
        ref={waterStageRef}
        particleCanvasRef={waterParticleCanvasRef}
      />

      <div className="home-hero__mobile-story">
        {copy.mobileFrames.map((frame, index) => (
          <figure key={frame.src}>
            <div>
              <Image
                src={frame.src}
                alt=""
                fill
                sizes="(max-width: 900px) calc(100vw - 2rem), 68rem"
                priority={index === 0}
              />
            </div>
            <figcaption>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{frame.label}</strong>
              <p>{frame.text}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <HomeWaterChapter
        staticMode
        particleCanvasRef={staticWaterParticleCanvasRef}
      />
    </section>
  );
}
