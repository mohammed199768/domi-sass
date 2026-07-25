"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import DominaseMediaViewer from "@/components/media/DominaseMediaViewer";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useLanguage } from "@/context/LanguageContext";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import {
  getNextProductStory,
  type ProductStory,
  type StoryMedia,
} from "./productStories";

function StoryMediaFrame({
  item,
  language,
  index,
}: {
  item: StoryMedia;
  language: "en" | "ar";
  index: number;
}) {
  if (item.type === "video") {
    return (
      <DominaseMediaViewer
        src={item.src}
        poster={item.poster ?? ""}
        title={item.title[language]}
        context={item.eyebrow[language]}
        actionLabel={language === "ar" ? "شاهد الفيلم" : "Watch the film"}
        aspect="cinema"
      />
    );
  }

  return (
    <figure
      className="product-story__media-frame"
      data-layout={item.layout}
      data-fit={item.fit ?? "cover"}
      data-has-overlay={item.overlay ? "true" : undefined}
    >
      <Image
        src={item.src}
        alt={item.alt[language]}
        fill
        sizes={
          item.layout === "portrait"
            ? "(max-width: 800px) 78vw, 34vw"
            : "(max-width: 800px) 94vw, 78vw"
        }
        priority={index === 0}
      />
      {item.overlay ? (
        <div
          className="product-story__media-overlay"
          data-variant={item.overlay.variant ?? "mobile"}
        >
          <Image
            src={item.overlay.src}
            alt={item.overlay.alt[language]}
            fill
            sizes="(max-width: 800px) 34vw, 15vw"
          />
        </div>
      ) : null}
      <span aria-hidden="true" />
    </figure>
  );
}

export default function ProductStoryExperience({
  story,
}: {
  story: ProductStory;
}) {
  const { language, dir } = useLanguage();
  const reducedMotion = useReducedMotion();
  const nextStory = getNextProductStory(story.slug);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeChapter, setActiveChapter] = useState(0);
  const chapterCount = story.media.length + 1;

  useEffect(() => {
    const sections = chapterRefs.current.filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!current) return;
        const index = sections.indexOf(current.target as HTMLElement);
        if (index >= 0) setActiveChapter(index);
      },
      {
        threshold: [0.2, 0.4, 0.65],
        rootMargin: "-24% 0px -42% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [story.slug]);

  const moveToChapter = (index: number) => {
    const bounded = Math.max(0, Math.min(chapterCount - 1, index));
    chapterRefs.current[bounded]?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const localized = (value: { en: string; ar: string }) => value[language];

  return (
    <>
      <Header />
      <main
        className="product-story"
        lang={language}
        dir={dir}
        style={
          {
            "--story-accent": story.accent,
            "--story-accent-soft": story.accentSoft,
            "--story-backdrop": story.backdrop,
          } as CSSProperties
        }
      >
        <a className="product-story__skip" href="#product-story-content">
          {language === "ar" ? "انتقل إلى قصة المنتج" : "Skip to product story"}
        </a>

        <nav
          className="product-story__rail"
          aria-label={
            language === "ar" ? "فصول قصة المنتج" : "Product story chapters"
          }
        >
          <Link href="/work" className="product-story__back">
            {dir === "rtl" ? (
              <ArrowRight aria-hidden="true" />
            ) : (
              <ArrowLeft aria-hidden="true" />
            )}
            <span>{language === "ar" ? "الأعمال" : "Work"}</span>
          </Link>

          <div
            className="product-story__chapter-index"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={chapterCount}
            aria-valuenow={activeChapter + 1}
          >
            <span>{String(activeChapter + 1).padStart(2, "0")}</span>
            <div>
              {Array.from({ length: chapterCount }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => moveToChapter(index)}
                  aria-label={
                    index === 0
                      ? language === "ar"
                        ? "بداية القصة"
                        : "Story opening"
                      : localized(story.media[index - 1].eyebrow)
                  }
                  aria-current={activeChapter === index ? "step" : undefined}
                >
                  <i />
                </button>
              ))}
            </div>
            <span>{String(chapterCount).padStart(2, "0")}</span>
          </div>

          <div className="product-story__chapter-controls">
            <button
              type="button"
              onClick={() => moveToChapter(activeChapter - 1)}
              disabled={activeChapter === 0}
              aria-label={
                language === "ar" ? "الفصل السابق" : "Previous chapter"
              }
            >
              <ArrowUp aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => moveToChapter(activeChapter + 1)}
              disabled={activeChapter === chapterCount - 1}
              aria-label={language === "ar" ? "الفصل التالي" : "Next chapter"}
            >
              <ArrowDown aria-hidden="true" />
            </button>
          </div>
        </nav>

        <section
          ref={(node) => {
            chapterRefs.current[0] = node;
          }}
          className="product-story__hero"
          aria-labelledby="product-story-title"
        >
          <Image
            src={story.cover}
            alt=""
            fill
            priority
            sizes="100vw"
            className="product-story__hero-image"
          />
          <div className="product-story__hero-scrim" aria-hidden="true" />
          <div className="product-story__hero-copy">
            <p>{localized(story.category)}</p>
            <h1 id="product-story-title">{story.title}</h1>
            <strong>{localized(story.opening)}</strong>
            <span>{localized(story.summary)}</span>
            <button
              type="button"
              className="domi-action domi-action--primary"
              onClick={() => moveToChapter(1)}
            >
              {language === "ar" ? "ابدأ القصة" : "Begin the story"}
              <ArrowDown aria-hidden="true" />
            </button>
          </div>
          <div className="product-story__hero-mark" aria-hidden="true">
            <span>DOMINASE</span>
            <i />
            <small>PRODUCT STORY / 0{story.media.length}</small>
          </div>
        </section>

        <div id="product-story-content">
          {story.media.map((item, index) => (
            <section
              key={item.id}
              id={`${story.slug}-${item.id}`}
              ref={(node) => {
                chapterRefs.current[index + 1] = node;
              }}
              className="product-story__chapter"
              data-layout={item.layout}
              data-side={index % 2 === 0 ? "start" : "end"}
              aria-labelledby={`${story.slug}-${item.id}-title`}
            >
              <div className="product-story__chapter-copy">
                <p>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {localized(item.eyebrow)}
                </p>
                <h2 id={`${story.slug}-${item.id}-title`}>
                  {localized(item.title)}
                </h2>
                <span>{localized(item.caption)}</span>
              </div>

              <div className="product-story__chapter-media">
                <StoryMediaFrame
                  item={item}
                  language={language}
                  index={index}
                />
              </div>
            </section>
          ))}
        </div>

        <section
          className="product-story__next"
          aria-labelledby="product-story-next-title"
        >
          <div className="product-story__next-copy">
            <p>{language === "ar" ? "القصة التالية" : "Next product story"}</p>
            <h2 id="product-story-next-title">{nextStory.title}</h2>
            <span>{localized(nextStory.summary)}</span>
            <div>
              <Link
                href={`/work/${nextStory.slug}`}
                className="domi-action domi-action--primary"
              >
                {language === "ar" ? "استكشف القصة" : "Explore the story"}
                <ArrowUpRight
                  aria-hidden="true"
                  className={dir === "rtl" ? "-scale-x-100" : ""}
                />
              </Link>
              <Link
                href="/diagnosis"
                className="domi-action domi-action--secondary"
              >
                {language === "ar" ? "ابدأ بالتشخيص" : "Start with diagnosis"}
              </Link>
            </div>
          </div>

          <Link
            href={`/work/${nextStory.slug}`}
            className="product-story__next-media"
            aria-label={`${language === "ar" ? "القصة التالية" : "Next story"}: ${nextStory.title}`}
          >
            <Image
              src={nextStory.homepage.primary}
              alt=""
              fill
              sizes="(max-width: 800px) 92vw, 48vw"
            />
            <span>{nextStory.title}</span>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
