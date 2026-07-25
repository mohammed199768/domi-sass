"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getHomeContent } from "../content/homeContent";

export default function HomeSkipLink() {
  const { language } = useLanguage();
  return (
    <a href="#main-content" className="home-skip-link">
      {getHomeContent(language).skipLink}
    </a>
  );
}
