"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import DominaseMediaViewer from "@/components/media/DominaseMediaViewer";
import { useLanguage } from "@/context/LanguageContext";
import {
  orderedProductStories,
} from "@/features/product-stories/productStories";
import { useMediaQuery } from "@/lib/motion/useMediaQuery";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { useBoundedSectionProgress } from "../motion/useBoundedSectionProgress";
import HomeTextMotion from "./HomeTextMotion";

const projects = orderedProductStories.map((story) => ({
  id: story.slug,
  title: story.title,
  category: story.category,
  summary: story.opening,
  accent: story.accent,
  route: `/work/${story.slug}`,
  video: story.homepage.video,
  videoPoster: story.homepage.videoPoster,
  ...story.homepage,
}));

type PortfolioProject = (typeof projects)[number];

const sectionCopy = {
  en: {
    chapter: "The Work / 03",
    title: "Seven living systems.",
    body: "Each resolves a different real-world friction.",
    viewStory: "Open the product story",
    watchFilm: "Watch preview",
    progress: "Product story index",
  },
  ar: {
    chapter: "أعمالنا / ٠٣",
    title: "سبعة أنظمة حيّة.",
    body: "يعالج كلّ منها احتكاكاً حقيقياً مختلفاً.",
    viewStory: "افتح قصة المنتج",
    watchFilm: "شاهد المعاينة",
    progress: "فهرس قصص المنتجات",
  },
} as const;

function smoothHold(value: number) {
  const base = Math.floor(value);
  const fraction = value - base;
  if (fraction <= 0.2) return base;
  if (fraction >= 0.8) return base + 1;
  const t = (fraction - 0.2) / 0.6;
  const eased = t * t * (3 - 2 * t);
  return base + eased;
}

function ProjectVisual({
  project,
  language,
  dir,
  viewStory,
  setCardRef,
  setVideoRef,
}: {
  project: PortfolioProject;
  language: "en" | "ar";
  dir: "ltr" | "rtl";
  viewStory: string;
  setCardRef: (node: HTMLElement | null) => void;
  setVideoRef: (node: HTMLVideoElement | null) => void;
}) {
  return (
    <article
      ref={setCardRef}
      className="home-portfolio-card"
      data-portfolio-card
      data-layout={project.layout}
      style={{ "--project-accent": project.accent } as CSSProperties}
    >
      <div className="home-portfolio-card__visual">
        <figure className="home-portfolio-card__primary">
          <Image
            src={project.primary}
            alt={`${project.title} primary product interface`}
            fill
            sizes="(max-width: 900px) 94vw, 64vw"
            className="home-portfolio-card__poster"
          />
          {project.video ? (
            <video
              ref={setVideoRef}
              muted
              loop
              playsInline
              preload="none"
              poster={project.videoPoster ?? project.primary}
              data-video-src={project.video}
              onPlaying={(event) => {
                event.currentTarget.dataset.playing = "true";
              }}
              onPause={(event) => {
                event.currentTarget.dataset.playing = "false";
              }}
              aria-hidden="true"
              tabIndex={-1}
            />
          ) : null}
        </figure>

        <figure className="home-portfolio-card__secondary">
          <Image
            src={project.secondary}
            alt={`${project.title} supporting product interface`}
            fill
            sizes="(max-width: 900px) 52vw, 30vw"
          />
        </figure>

        <figure className="home-portfolio-card__tertiary">
          <Image
            src={project.tertiary}
            alt={`${project.title} responsive product interface`}
            fill
            sizes="(max-width: 900px) 36vw, 16vw"
          />
        </figure>
      </div>

      <div className="home-portfolio-card__mobile-copy">
        <p>{project.category[language]}</p>
        <h3>
          <HomeTextMotion variant="product">{project.title}</HomeTextMotion>
        </h3>
        <span>{project.summary[language]}</span>
        <small>{project.proof[language]}</small>
        <Link
          href={project.route}
          className="domi-action domi-action--editorial"
        >
          {viewStory}
          <ArrowUpRight
            aria-hidden="true"
            className={dir === "rtl" ? "-scale-x-100" : ""}
          />
        </Link>
      </div>
    </article>
  );
}

export default function HomeSelectedWork() {
  const { language, dir } = useLanguage();
  const copy = sectionCopy[language];
  const reducedMotion = useReducedMotion();
  // Orbit now animates on capable phones too (not desktop-only), gated on a
  // sane viewport height so it stays smooth; reduced-motion still opts out.
  const capableViewport = useMediaQuery("(min-height: 480px)");
  const enhanced = capableViewport && !reducedMotion;
  const orbitRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];

  const applyProgress = useCallback((progress: number) => {
    const section = orbitRef.current;
    if (!section) return;

    const raw = progress * (projects.length - 1);
    const current = smoothHold(raw);
    const nextActive = Math.max(
      0,
      Math.min(projects.length - 1, Math.round(current)),
    );
    setActiveIndex((previous) =>
      previous === nextActive ? previous : nextActive,
    );
    section.style.setProperty("--portfolio-progress", `${progress}`);

    const radiusX = Math.min(window.innerWidth * 0.36, 520);
    const radiusY = Math.min(window.innerHeight * 0.19, 180);

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const delta = index - current;
      const limited = Math.max(-3.4, Math.min(3.4, delta));
      const angle = limited * 0.82;
      const distance = Math.abs(delta);
      const x = Math.sin(angle) * radiusX;
      const y = (1 - Math.cos(angle)) * radiusY + distance * 8;
      const scale = Math.max(0.28, 1 - distance * 0.4);
      const opacity = Math.max(0, 1 - distance * 0.68);
      const rotate = angle * 8;

      card.style.opacity = `${opacity}`;
      card.style.zIndex = `${100 - Math.round(distance * 10)}`;
      card.style.transform = `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`;
      card.dataset.active = distance < 0.5 ? "true" : "false";
    });
  }, []);

  useBoundedSectionProgress(orbitRef, applyProgress, enhanced);

  useEffect(() => {
    if (enhanced || reducedMotion) return;
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = cards.indexOf(visible.target as HTMLElement);
        if (index >= 0) setActiveIndex(index);
      },
      { threshold: [0.35, 0.55, 0.75], rootMargin: "-12% 0px -18% 0px" },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [enhanced, reducedMotion]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index !== activeIndex || reducedMotion) {
        video.pause();
        if (index !== activeIndex && video.getAttribute("src")) {
          video.removeAttribute("src");
          video.load();
        }
        return;
      }

      const source = video.dataset.videoSrc;
      if (source && !video.getAttribute("src")) {
        video.src = source;
        video.load();
      }
      const play = () => video.play().catch(() => undefined);
      if (video.readyState >= 2) play();
      else video.addEventListener("canplay", play, { once: true });
    });
  }, [activeIndex, reducedMotion]);

  const jumpToProject = (index: number) => {
    const section = orbitRef.current;
    if (!section) return;
    const top = window.scrollY + section.getBoundingClientRect().top;
    const range = Math.max(1, section.offsetHeight - window.innerHeight);
    const progress = index / Math.max(1, projects.length - 1);
    window.scrollTo({
      top: top + range * progress,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      id="portfolio"
      className="home-portfolio"
      data-cinematic-chapter
      aria-labelledby="home-portfolio-title"
    >
      <section
        ref={orbitRef}
        className="home-portfolio__orbit"
        data-enhanced={enhanced ? "true" : "false"}
        aria-label={copy.title}
      >
        <div className="home-portfolio__orbit-sticky">
          <header className="home-portfolio__orbit-heading">
            <p>{copy.chapter}</p>
            <h2 id="home-portfolio-title">{copy.title}</h2>
            <span>{copy.body}</span>
          </header>

          <div className="home-portfolio__cards">
            {projects.map((project, index) => (
              <ProjectVisual
                key={project.id}
                project={project}
                language={language}
                dir={dir}
                viewStory={copy.viewStory}
                setCardRef={(node) => {
                  cardRefs.current[index] = node;
                }}
                setVideoRef={(node) => {
                  videoRefs.current[index] = node;
                }}
              />
            ))}
          </div>

          <div
            className="home-portfolio__active-copy"
            key={`${language}-${activeProject.id}`}
          >
            <p>
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              {activeProject.category[language]}
            </p>
            <h3>
              <HomeTextMotion variant="product">
                {activeProject.title}
              </HomeTextMotion>
            </h3>
            <span>{activeProject.summary[language]}</span>
            <small>{activeProject.proof[language]}</small>
            <div className="home-portfolio__active-actions">
              <Link
                href={activeProject.route}
                className="domi-action domi-action--editorial"
              >
                {copy.viewStory}
                <ArrowUpRight
                  aria-hidden="true"
                  className={dir === "rtl" ? "-scale-x-100" : ""}
                />
              </Link>
              {activeProject.video ? (
                <DominaseMediaViewer
                  src={activeProject.video}
                  poster={
                    activeProject.videoPoster ?? activeProject.primary
                  }
                  title={activeProject.title}
                  context={activeProject.category[language]}
                  actionLabel={copy.watchFilm}
                  presentation="action"
                />
              ) : null}
            </div>
          </div>

          <div
            className="home-portfolio__index"
            role="group"
            aria-label={copy.progress}
          >
            {projects.map((project, index) => (
              <button
                type="button"
                key={project.id}
                onClick={() => jumpToProject(index)}
                aria-label={`${String(index + 1).padStart(2, "0")} — ${project.title}`}
                aria-pressed={activeIndex === index}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <i />
              </button>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
