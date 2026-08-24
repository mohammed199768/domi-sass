"use client";

import React, { useRef, useState, type ElementType, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Magnet({
  children,
  padding = 120,
  strength = 4,
  className,
}: {
  children: ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const reset = () => {
    setActive(false);
    setOffset({ x: 0, y: 0 });
  };

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;
    const inside =
      event.clientX >= rect.left - padding &&
      event.clientX <= rect.right + padding &&
      event.clientY >= rect.top - padding &&
      event.clientY <= rect.bottom + padding;

    if (!inside) {
      reset();
      return;
    }

    setActive(true);
    setOffset({ x: dx / strength, y: dy / strength });
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: active ? "transform 0.3s ease-out" : "transform 0.6s ease-in-out",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

function AnimatedUnit({
  children,
  progress,
  start,
  end,
  className = "domi-char",
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  className?: string;
}) {
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  return (
    <span className={className} aria-hidden="true">
      <span className="domi-char__placeholder">{children}</span>
      <motion.span className="domi-char__active" style={{ opacity }}>
        {children}
      </motion.span>
    </span>
  );
}

export function AnimatedText({
  text,
  className,
  as: Tag = "p",
  mode = "characters",
}: {
  text: string;
  className?: string;
  as?: ElementType;
  mode?: "characters" | "words";
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const units = mode === "words" ? text.trim().split(/\s+/) : Array.from(text);
  const range = Math.max(1, units.length - 1);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {units.map((unit, index) => {
        const start = (index / range) * 0.78;
        const end = Math.min(1, start + 0.22);
        const renderedUnit = mode === "characters" && unit === " " ? "\u00A0" : unit;

        return (
          <React.Fragment key={`${unit}-${index}`}>
            <AnimatedUnit
              progress={scrollYProgress}
              start={start}
              end={end}
              className={mode === "words" ? "domi-char domi-word" : "domi-char"}
            >
              {renderedUnit}
            </AnimatedUnit>
            {mode === "words" && index < units.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </Tag>
  );
}
