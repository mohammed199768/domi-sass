"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatedText, FadeIn } from "./HomeMotionPrimitives";

const COPY = {
  ar: {
    eyebrow: "عن DOMINASE",
    title: "MAKE IT SIMPLE.",
    lines: [
      "نفهم قبل أن نبني.",
      "نبسّط قبل أن نضيف.",
      "ونصمم حول النتيجة.",
    ],
    cta: "كيف نشتغل",
  },
  en: {
    eyebrow: "About DOMINASE",
    title: "MAKE IT SIMPLE.",
    lines: [
      "Understand before we build.",
      "Simplify before we add.",
      "Design around the outcome.",
    ],
    cta: "How we work",
  },
} as const;

const DECOR = [
  { src: "/mobile-mockup/gym5.png", className: "motion-about__asset motion-about__asset--tl" },
  { src: "/mobile-mockup/sultanshadi (1).png", className: "motion-about__asset motion-about__asset--tr" },
] as const;

export default function HomeAboutMotion() {
  const { language, dir } = useLanguage();
  const copy = COPY[language];
  const revealMode = language === "ar" ? "words" : "characters";

  return (
    <section className="motion-about" aria-labelledby="motion-about-title">
      <div className="motion-about__grid" aria-hidden="true" />
      {DECOR.map((item, index) => (
        <FadeIn
          key={item.src}
          delay={0.08 + index * 0.08}
          x={index % 2 === 0 ? -70 : 70}
          y={0}
          duration={0.9}
          className={item.className}
        >
          <Image src={item.src} alt="" fill sizes="(max-width: 760px) 88px, 220px" />
        </FadeIn>
      ))}

      <div className="motion-about__content">
        <FadeIn y={36}>
          <p className="motion-about__eyebrow">{copy.eyebrow}</p>
          <h2 id="motion-about-title">{copy.title}</h2>
        </FadeIn>
        <div className="motion-about__lines">
          {copy.lines.map((line) => (
            <AnimatedText
              key={line}
              text={line}
              mode={revealMode}
              className="motion-about__text motion-about__text--line"
            />
          ))}
        </div>
        <FadeIn delay={0.15} y={22} className="motion-about__action">
          <Link href="/about" className="motion-pill motion-pill--primary">
            {copy.cta}
            <ArrowUpRight aria-hidden="true" className={dir === "rtl" ? "-scale-x-100" : ""} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
