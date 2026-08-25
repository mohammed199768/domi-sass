"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useId, useRef, useState, type KeyboardEvent } from "react";

export type InteractivePanelItem = {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  eyebrow?: string;
  meta?: string;
  href?: string;
  capabilities?: string[];
  accent?: string;
};

type InteractiveShowcaseProps = {
  items: InteractivePanelItem[];
  ariaLabel: string;
  ctaLabel: string;
  dir: "rtl" | "ltr";
  variant: "services" | "work";
};

export default function InteractiveShowcase({
  items,
  ariaLabel,
  ctaLabel,
  dir,
  variant,
}: InteractiveShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const instanceId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (index: number, moveFocus = false) => {
    const nextIndex = Math.max(0, Math.min(items.length - 1, index));
    setActiveIndex(nextIndex);
    if (moveFocus) tabRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    const forwardKey = dir === "rtl" ? "ArrowLeft" : "ArrowRight";
    const backwardKey = dir === "rtl" ? "ArrowRight" : "ArrowLeft";

    if (event.key === "ArrowDown" || event.key === forwardKey) nextIndex = index + 1;
    if (event.key === "ArrowUp" || event.key === backwardKey) nextIndex = index - 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = items.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      select((nextIndex + items.length) % items.length, true);
    }
  };

  const activeItem = items[activeIndex];

  return (
    <section
      className={`interactive-showcase interactive-showcase--${variant}`}
      aria-label={ariaLabel}
      dir={dir}
      style={{ "--showcase-accent": activeItem?.accent || "var(--primary)" } as React.CSSProperties}
    >
      <div className="interactive-showcase__rail-wrap">
        <div className="interactive-showcase__rail-label" aria-hidden="true">
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          <i />
          <span>{String(items.length).padStart(2, "0")}</span>
        </div>
        <div className="interactive-showcase__rail" role="tablist" aria-label={ariaLabel}>
          {items.map((item, index) => {
            const selected = index === activeIndex;
            return (
              <button
                ref={(node) => { tabRefs.current[index] = node; }}
                key={item.id}
                id={`${instanceId}-tab-${item.id}`}
                className="interactive-showcase__tab"
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${instanceId}-panel-${item.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                <span>{item.label}</span>
                <small>{item.meta}</small>
              </button>
            );
          })}
        </div>
      </div>

      <div className="interactive-showcase__stage">
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((item, index) => {
            const distance = index - activeIndex;
            if (Math.abs(distance) > 1) return null;
            const selected = distance === 0;

            return (
              <motion.article
                key={item.id}
                id={`${instanceId}-panel-${item.id}`}
                role="tabpanel"
                aria-labelledby={`${instanceId}-tab-${item.id}`}
                aria-hidden={!selected}
                className="interactive-showcase__panel"
                initial={reduceMotion ? false : { opacity: 0, scale: .94 }}
                animate={{
                  opacity: selected ? 1 : .32,
                  scale: selected ? 1 : .92,
                  x: distance * (dir === "rtl" ? -18 : 18),
                  y: distance * 18,
                  rotate: reduceMotion ? 0 : distance * 1.2,
                  zIndex: selected ? 3 : 1,
                }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: .9 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 245, damping: 28, mass: .72 }
                }
                style={{ pointerEvents: selected ? "auto" : "none" }}
              >
                <figure className="interactive-showcase__media">
                  <Image
                    src={item.image}
                    alt={selected ? item.imageAlt : ""}
                    fill
                    loading="lazy"
                    sizes="(max-width: 760px) 94vw, (max-width: 1100px) 62vw, 760px"
                  />
                </figure>

                <div className="interactive-showcase__content">
                  <div className="interactive-showcase__copy">
                    {item.eyebrow && <p>{item.eyebrow}</p>}
                    <h2>{item.title}</h2>
                    <span>{item.description}</span>
                  </div>

                  {item.capabilities && item.capabilities.length > 0 && (
                    <ul className="interactive-showcase__capabilities">
                      {item.capabilities.slice(0, 3).map((capability) => (
                        <li key={capability}>{capability}</li>
                      ))}
                    </ul>
                  )}

                  {item.href && (
                    <Link
                      href={item.href}
                      className="domi-action domi-action--primary interactive-showcase__cta"
                      tabIndex={selected ? 0 : -1}
                    >
                      {ctaLabel}
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
