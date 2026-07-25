"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useMediaQuery } from "@/lib/motion/useMediaQuery";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { getHomeContent } from "../content/homeContent";
import HomeMethodVisual from "./HomeMethodVisual";
import HomeTextMotion from "./HomeTextMotion";

export default function HomeMethod() {
  const { language } = useLanguage();
  const copy = getHomeContent(language).method;
  const reducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 901px)");
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
        { rootMargin: "-38% 0px -42% 0px", threshold: 0 },
      );
      observer.observe(step);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, [reducedMotion]);

  return (
    <section
      id="method"
      className="home-method"
      data-home-method
      aria-labelledby="home-method-title"
    >
      <div className="home-method__background" aria-hidden="true" />
      <div className="home-method__shell">
        <header className="home-method__heading">
          <p className="home-chapter-label">{copy.eyebrow} / 02</p>
          <h2 id="home-method-title">
            <HomeTextMotion variant="signal">{copy.title}</HomeTextMotion>
          </h2>
          <p>{copy.intro}</p>
        </header>

        <div className="home-method__layout">
          <div className="home-method__visual-column">
            <HomeMethodVisual
              active={isDesktop && !reducedMotion ? active : 3}
              stages={copy.stages}
            />
          </div>

          <ol className="home-method__steps">
            {copy.stages.map((stage, index) => (
              <li
                key={stage.index}
                ref={(node) => {
                  stepRefs.current[index] = node;
                }}
                className="home-method__step"
                data-active={active === index ? "true" : "false"}
              >
                <span aria-hidden="true">{stage.index}</span>
                <div>
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                </div>
                <i aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
