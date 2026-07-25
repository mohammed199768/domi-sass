"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function HomeServices() {
  const { t, dir } = useLanguage();

  return (
    <section
      id="services"
      className="home-section home-services"
      aria-labelledby="home-services-title"
    >
      <div className="home-shell">
        <header className="home-section-heading home-services__heading">
          <p className="home-eyebrow">{t.services.title}</p>
          <h2 id="home-services-title">{t.services.title}</h2>
          <p>{t.services.subtitle}</p>
        </header>

        <ol className="home-services__list">
          {t.services.items.map((service, index) => (
            <li key={service.title} className="home-services__item">
              <span className="home-services__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <span className="home-services__signal" aria-hidden="true" />
            </li>
          ))}
        </ol>

        <Link href="/contact" className="home-text-link">
          <span>{t.services.cta}</span>
          <ArrowUpRight
            aria-hidden="true"
            className={dir === "rtl" ? "-scale-x-100" : ""}
          />
        </Link>
      </div>
    </section>
  );
}
