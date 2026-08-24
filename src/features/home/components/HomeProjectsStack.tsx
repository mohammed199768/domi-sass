"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type CSSProperties } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { orderedProductStories } from "@/features/product-stories/productStories";
import { FadeIn } from "./HomeMotionPrimitives";

const FEATURED = orderedProductStories.slice(0, 4);

const COPY = {
  ar: {
    eyebrow: "أعمال مختارة",
    title: "SELECTED WORK",
    intro: "منتجات حقيقية مبنية حول مشكلة واضحة، وتجربة نقدر نعرضها بدون مبالغة.",
    open: "افتح قصة المنتج",
  },
  en: {
    eyebrow: "Selected work",
    title: "SELECTED WORK",
    intro: "Real products built around real friction, with enough detail to show how the system actually works.",
    open: "Open product story",
  },
} as const;

function ProjectCard({
  story,
  index,
  total,
  language,
  dir,
  open,
}: {
  story: (typeof FEATURED)[number];
  index: number;
  total: number;
  language: "ar" | "en";
  dir: "rtl" | "ltr";
  open: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const targetScale = 1 - (total - 1 - index) * 0.025;
  const scale = useTransform(scrollYProgress, [0, 0.48, 1], [1, 1, targetScale]);
  const y = useTransform(scrollYProgress, [0, 0.55, 1], [30, 0, -8]);

  return (
    <div ref={ref} className="motion-projects__slot">
      <motion.article
        className="motion-projects__card"
        style={{
          scale,
          y,
          top: `calc(6.5rem + ${index * 12}px)`,
          "--project-accent": story.accent,
        } as unknown as CSSProperties}
      >
        <div className="motion-projects__top">
          <span className="motion-projects__number">{String(index + 1).padStart(2, "0")}</span>
          <div className="motion-projects__meta">
            <p>{story.category[language]}</p>
            <h3>{story.title}</h3>
          </div>
          <Link href={`/work/${story.slug}`} className="motion-pill motion-pill--ghost motion-projects__link">
            {open}
            <ArrowUpRight aria-hidden="true" className={dir === "rtl" ? "-scale-x-100" : ""} />
          </Link>
        </div>

        <div className="motion-projects__visuals">
          <div className="motion-projects__left">
            <figure>
              <Image src={story.homepage.secondary} alt="" fill sizes="(max-width: 800px) 92vw, 34vw" />
            </figure>
            <figure>
              <Image src={story.homepage.tertiary} alt="" fill sizes="(max-width: 800px) 92vw, 34vw" />
            </figure>
          </div>
          <figure className="motion-projects__main">
            <Image
              src={story.homepage.primary}
              alt={`${story.title} ${story.category[language]}`}
              fill
              sizes="(max-width: 800px) 92vw, 58vw"
            />
          </figure>
        </div>
      </motion.article>
    </div>
  );
}

export default function HomeProjectsStack() {
  const { language, dir } = useLanguage();
  const copy = COPY[language];

  return (
    <section id="projects" className="motion-projects" aria-labelledby="motion-projects-title">
      <div className="motion-projects__shell">
        <FadeIn y={34} className="motion-projects__heading">
          <p>{copy.eyebrow}</p>
          <h2 id="motion-projects-title">{copy.title}</h2>
          <span>{copy.intro}</span>
        </FadeIn>
        <div className="motion-projects__stack">
          {FEATURED.map((story, index) => (
            <ProjectCard
              key={story.slug}
              story={story}
              index={index}
              total={FEATURED.length}
              language={language}
              dir={dir}
              open={copy.open}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
