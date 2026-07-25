"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getHomeContent } from "../content/homeContent";
import HomeTextMotion from "./HomeTextMotion";

function firstSentence(value: string) {
  const match = value.match(/^.*?[.!؟](?:\s|$)/u);
  return match?.[0]?.trim() || value;
}

export default function HomeTrust() {
  const { language, t } = useLanguage();
  const copy = getHomeContent(language).trust;
  const [active, setActive] = useState(0);
  const testimonial = t.testimonials.items[active];

  return (
    <section
      id="testimonials"
      className="home-trust"
      aria-labelledby="home-trust-title"
    >
      <div className="home-trust__shell">
        <header className="home-trust__heading">
          <p className="home-chapter-label">{copy.eyebrow} / 04</p>
          <h2 id="home-trust-title">
            <HomeTextMotion variant="editorial">
              {copy.title}
            </HomeTextMotion>
          </h2>
          <span>{copy.intro}</span>
        </header>

        <div className="home-trust__quote">
          <span aria-hidden="true">“</span>
          <blockquote key={active}>
            <p>{firstSentence(testimonial.quote)}</p>
            <footer>
              <cite>{testimonial.author}</cite>
              <span>{testimonial.role}</span>
            </footer>
          </blockquote>
        </div>

        <div
          className="home-trust__selectors"
          role="group"
          aria-label={copy.selectorLabel}
        >
          {t.testimonials.items.map((item, index) => (
            <button
              key={item.author}
              type="button"
              aria-pressed={active === index}
              onClick={() => setActive(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.author}</strong>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
