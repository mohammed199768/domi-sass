"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getHomeContent } from "../content/homeContent";

export default function HomeSystemLayers() {
  const { language } = useLanguage();
  const copy = getHomeContent(language).systemLayers;

  return (
    <section
      id="system-layers"
      className="home-section home-system-layers"
      aria-labelledby="home-system-layers-title"
    >
      <div className="home-shell home-system-layers__layout">
        <header className="home-section-heading">
          <p className="home-eyebrow">{copy.eyebrow}</p>
          <h2 id="home-system-layers-title">{copy.title}</h2>
          <p>{copy.intro}</p>
        </header>

        <ol className="home-system-layers__diagram">
          {copy.layers.map((layer) => (
            <li key={layer.index}>
              <span aria-hidden="true">{layer.index}</span>
              <div>
                <h3>{layer.title}</h3>
                <p>{layer.description}</p>
              </div>
            </li>
          ))}
          <span className="home-system-layers__line" aria-hidden="true" />
        </ol>
      </div>
    </section>
  );
}
