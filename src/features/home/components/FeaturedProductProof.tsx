"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { getHomeContent } from "../content/homeContent";

export default function FeaturedProductProof() {
  const { language, dir } = useLanguage();
  const copy = getHomeContent(language).productProof;
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (reducedMotion) return;
    const desktop = window.matchMedia("(min-width: 1025px)");
    if (!desktop.matches) return;

    const observers = stepRefs.current.map((step, index) => {
      if (!step) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(index);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
      );
      observer.observe(step);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, [reducedMotion]);

  return (
    <section
      id="product-proof"
      className="home-section home-product-proof"
      aria-labelledby="home-product-proof-title"
    >
      <div className="home-shell">
        <header className="home-section-heading home-product-proof__heading">
          <p className="home-eyebrow">{copy.eyebrow}</p>
          <h2 id="home-product-proof-title">{copy.title}</h2>
          <p>{copy.intro}</p>
        </header>

        <div className="home-product-proof__layout">
          <div className="home-product-proof__visual" aria-hidden="true">
            <div className="home-product-proof__frame">
              {copy.states.map((state, index) => (
                <Image
                  key={state.index}
                  src={state.image}
                  alt=""
                  fill
                  sizes="(max-width: 1200px) 54vw, 760px"
                  className="home-product-proof__image"
                  data-active={active === index ? "true" : "false"}
                />
              ))}
            </div>
            <div className="home-product-proof__visual-meta">
              <span>{copy.project}</span>
              <span>
                {copy.progressLabel} {copy.states[active].index} / 03
              </span>
            </div>
          </div>

          <ol className="home-product-proof__steps">
            {copy.states.map((state, index) => (
              <li
                key={state.index}
                ref={(node) => {
                  stepRefs.current[index] = node;
                }}
                className="home-product-proof__step"
                data-active={active === index ? "true" : "false"}
              >
                <figure className="home-product-proof__mobile-figure">
                  <Image
                    src={state.image}
                    alt={state.alt}
                    width={1372}
                    height={656}
                    sizes="(max-width: 1024px) calc(100vw - 40px), 1px"
                  />
                  <figcaption>{state.alt}</figcaption>
                </figure>
                <span aria-hidden="true">{state.index}</span>
                <h3>{state.title}</h3>
                <p>{state.description}</p>
              </li>
            ))}
          </ol>
        </div>

        <Link href="/work/qasr-alfarah" className="home-text-link">
          <span>{copy.caseStudyCTA}</span>
          <ArrowUpRight
            aria-hidden="true"
            className={dir === "rtl" ? "-scale-x-100" : ""}
          />
        </Link>
      </div>
    </section>
  );
}
