"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Boxes,
  Film,
  LayoutGrid,
  Layers,
  Play,
} from "lucide-react";
import { useRef, useState, type CSSProperties } from "react";
import { useLanguage } from "@/context/LanguageContext";
import StudioMediaViewer from "@/components/media/StudioMediaViewer";
import {
  getStudioMedia,
  studioGridItems,
  studioProfile,
  type StudioMedia,
  type StudioTab,
} from "@/features/home/studio/studioProfile";
import HomeTextMotion from "./HomeTextMotion";
import "../styles/home-studio-profile.css";

const sectionCopy = {
  en: { eyebrow: "Studio", line: "Ideas, products, and worlds in motion." },
  ar: { eyebrow: "الاستوديو", line: "أفكار ومنتجات وعوالم تتحرّك." },
} as const;

const tabs: { id: StudioTab; en: string; ar: string; icon: typeof Film }[] = [
  { id: "posts", en: "Stories", ar: "قصص", icon: LayoutGrid },
  { id: "films", en: "Films", ar: "أفلام", icon: Film },
  { id: "projects", en: "Projects", ar: "مشاريع", icon: Boxes },
];

type OpenState = { items: StudioMedia[]; index: number } | null;

function GridTile({
  media,
  language,
  onOpen,
  featured,
}: {
  media: StudioMedia;
  language: "en" | "ar";
  onOpen: (el: HTMLElement) => void;
  featured?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isCarousel = media.kind === "carousel";

  const enter = () => {
    const v = videoRef.current;
    if (!v) return;
    if (!v.getAttribute("src") && media.videoSrc) {
      v.src = media.videoSrc;
      v.load();
    }
    v.play().catch(() => undefined);
  };
  const leave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <button
      type="button"
      className="studio-tile"
      data-aspect={media.aspect}
      data-featured={featured ? "true" : undefined}
      onClick={(e) => onOpen(e.currentTarget)}
      onMouseEnter={featured ? enter : undefined}
      onMouseLeave={featured ? leave : undefined}
      onFocus={featured ? enter : undefined}
      onBlur={featured ? leave : undefined}
      aria-label={`${media.title[language]} — ${
        isCarousel ? (language === "ar" ? "قصة" : "story") : language === "ar" ? "فيلم" : "film"
      }`}
    >
      <Image
        src={media.thumb}
        alt=""
        fill
        sizes="(max-width: 720px) 33vw, 22rem"
        className="studio-tile__poster"
        loading="lazy"
      />
      {featured && media.videoSrc ? (
        <video
          ref={videoRef}
          className="studio-tile__preview"
          muted
          loop
          playsInline
          preload="none"
          poster={media.poster}
          aria-hidden="true"
          tabIndex={-1}
        />
      ) : null}

      <span className="studio-tile__scrim" aria-hidden="true" />

      <span className="studio-tile__badge" aria-hidden="true">
        {isCarousel ? (
          <>
            <Layers />
            {media.slides ? <i>{media.slides.length}</i> : null}
          </>
        ) : (
          <Play />
        )}
      </span>

      <span className="studio-tile__foot">
        <strong>{media.title[language]}</strong>
        {!isCarousel && media.duration ? <em>{media.duration}</em> : null}
      </span>
    </button>
  );
}

export default function HomeStudioProfile() {
  const { language, dir } = useLanguage();
  const copy = sectionCopy[language];
  const p = studioProfile;
  const [tab, setTab] = useState<StudioTab>("posts");
  const [open, setOpen] = useState<OpenState>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const gridItems = studioGridItems(tab);

  const openHighlight = (mediaId: string, el: HTMLElement) => {
    const items = p.highlights
      .map((h) => getStudioMedia(h.mediaId))
      .filter((m): m is StudioMedia => Boolean(m));
    const index = Math.max(
      0,
      items.findIndex((m) => m.id === mediaId),
    );
    restoreRef.current = el;
    setOpen({ items, index });
  };

  const openTile = (index: number, el: HTMLElement) => {
    restoreRef.current = el;
    setOpen({ items: gridItems, index });
  };

  return (
    <section id="studio" className="home-studio" aria-labelledby="home-studio-name">
      <div className="home-studio__shell">
        <p className="home-studio__eyebrow">{copy.eyebrow}</p>

        {/* ── profile header ── */}
        <header className="home-studio__profile">
          <span className="home-studio__avatar">
            <Image src={p.avatar} alt="DOMINASE" width={132} height={132} priority />
          </span>

          <div className="home-studio__identity">
            <div className="home-studio__name-row">
              <h2 id="home-studio-name" dir="ltr">
                <HomeTextMotion variant="editorial">
                  {p.name}
                </HomeTextMotion>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="home-studio__verified">
                  <path d="M12 1.8 14.5 4l3.2-.3 1 3 2.8 1.6L22.2 12l1.3 2.9-2.8 1.6-1 3-3.2-.3L12 22.2 9.5 20l-3.2.3-1-3-2.8-1.6L3.8 12 2.5 9.1l2.8-1.6 1-3L9.5 4z" />
                  <path d="m8.5 12 2.3 2.3 4.7-4.8" fill="none" stroke="#04130d" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </h2>

              <div className="home-studio__actions">
                <Link href={p.actions.primary.href} className="domi-action domi-action--primary">
                  {p.actions.primary.label[language]}
                </Link>
                <Link href={p.actions.secondary.href} className="domi-action domi-action--secondary">
                  {p.actions.secondary.label[language]}
                </Link>
                <Link href={p.actions.editorial.href} className="domi-action domi-action--editorial">
                  {p.actions.editorial.label[language]}
                  <ArrowUpRight aria-hidden="true" className={dir === "rtl" ? "-scale-x-100" : ""} />
                </Link>
              </div>
            </div>

            <p className="home-studio__category">{p.category[language]}</p>

            <ul className="home-studio__stats" aria-label={language === "ar" ? "فئات الاستوديو" : "Studio categories"}>
              {p.stats.map((s) => (
                <li key={s.label.en}>
                  <strong>{s.value}</strong>
                  <span>{s.label[language]}</span>
                </li>
              ))}
            </ul>

            <p className="home-studio__bio">
              {p.bio[language]}
              <a href={`https://${p.domain}`} target="_blank" rel="noreferrer">
                {p.domain}
              </a>
            </p>
          </div>
        </header>

        {/* ── highlights ── */}
        <ul className="home-studio__highlights" aria-label={language === "ar" ? "أبرز اللقطات" : "Highlights"}>
          {p.highlights.map((h) => (
            <li key={h.id}>
              <button type="button" onClick={(e) => openHighlight(h.mediaId, e.currentTarget)}>
                <span className="home-studio__highlight-ring">
                  <Image src={h.cover} alt="" width={72} height={72} loading="lazy" />
                </span>
                <small>{h.label[language]}</small>
              </button>
            </li>
          ))}
        </ul>

        {/* ── tabs ── */}
        <div className="home-studio__tabs" role="tablist" aria-label={language === "ar" ? "أرشيف الوسائط" : "Media archive"}>
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                className="home-studio__tab"
                data-active={tab === t.id}
                onClick={() => setTab(t.id)}
              >
                <Icon aria-hidden="true" />
                <span>{language === "ar" ? t.ar : t.en}</span>
              </button>
            );
          })}
        </div>

        {/* ── grid ── */}
        <div className="home-studio__grid" style={{ "--studio-cols": 3 } as CSSProperties}>
          {gridItems.map((media, i) => (
            <GridTile
              key={media.id}
              media={media}
              language={language}
              featured={media.featured}
              onOpen={(el) => openTile(i, el)}
            />
          ))}
        </div>

        <p className="home-studio__line">{copy.line}</p>
      </div>

      {open ? (
        <StudioMediaViewer
          items={open.items}
          index={open.index}
          onIndexChange={(index) => setOpen((s) => (s ? { ...s, index } : s))}
          onClose={() => setOpen(null)}
          language={language}
          dir={dir}
          profile={{ name: p.name, avatar: p.avatar, category: p.category[language] }}
          restoreRef={restoreRef}
        />
      ) : null}
    </section>
  );
}
