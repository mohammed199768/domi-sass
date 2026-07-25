"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useLanguage } from "@/context/LanguageContext";
import { orderedProductStories } from "@/features/product-stories/productStories";

export default function TransformationTreeClient() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  return (
    <main
      className="work-index"
      lang={language}
      dir={isAr ? "rtl" : "ltr"}
    >
      <Header />

      <section className="work-index__hero" aria-labelledby="work-index-title">
        <div className="work-index__hero-line" aria-hidden="true" />
        <p>{isAr ? "أعمال مختارة / 07" : "Selected work / 07"}</p>
        <h1 id="work-index-title">
          {isAr ? (
            <>
              منتجات حقيقية.
              <br />
              أنظمة مترابطة.
            </>
          ) : (
            <>
              Real products.
              <br />
              Connected systems.
            </>
          )}
        </h1>
        <div className="work-index__hero-note">
          <span>
            {isAr
              ? "سبع قصص منتج تُظهر التجربة العامة والعمليات التي تعمل خلفها."
              : "Seven product stories connecting the visible experience to the operations behind it."}
          </span>
          <small>{isAr ? "مرّر للاستكشاف" : "Scroll to explore"}</small>
        </div>
      </section>

      <section
        className="work-index__grid"
        aria-label={isAr ? "قصص المنتجات" : "Product stories"}
      >
        {orderedProductStories.map((story, index) => (
          <article
            className="work-index__item"
            key={story.slug}
            style={
              {
                "--work-accent": story.accent,
                "--work-soft": story.accentSoft,
                "--work-backdrop": story.backdrop,
              } as CSSProperties
            }
          >
            <Link
              className="work-index__card"
              href={`/work/${story.slug}`}
              aria-label={`${isAr ? "عرض قصة" : "View story"}: ${story.title}`}
            >
              <figure>
                <Image
                  alt={story.category[language]}
                  fill
                  priority={index < 2}
                  sizes={
                    index === 0
                      ? "(max-width: 900px) 100vw, 66vw"
                      : "(max-width: 900px) 100vw, 50vw"
                  }
                  src={story.homepage.primary}
                />
                <span className="work-index__image-wash" aria-hidden="true" />
                <span className="work-index__sequence" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </figure>

              <div className="work-index__copy">
                <p>{story.category[language]}</p>
                <h2>{story.title}</h2>
                <span>{story.summary[language]}</span>
                <span className="domi-action domi-action--editorial">
                  {isAr ? "استكشف القصة" : "Explore the story"}
                  <b aria-hidden="true">↗</b>
                </span>
              </div>
            </Link>
          </article>
        ))}
      </section>

      <section className="work-index__close">
        <p>{isAr ? "لديك احتكاك يحتاج إلى نظام؟" : "Have friction that needs a system?"}</p>
        <h2>
          {isAr ? "ابدأ بالتشخيص." : "Start with a diagnosis."}
        </h2>
        <Link className="domi-action domi-action--primary" href="/diagnosis">
          {isAr ? "شخّص مشروعك" : "Diagnose your project"}
          <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <Footer />
    </main>
  );
}
