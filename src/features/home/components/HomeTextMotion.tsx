"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

export type HomeTextMotionVariant =
  | "signal"
  | "depth"
  | "editorial"
  | "product";

export default function HomeTextMotion({
  children,
  variant,
  className = "",
}: {
  children: ReactNode;
  variant: HomeTextMotionVariant;
  className?: string;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    if (reducedMotion) {
      setEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntered(entry.isIntersecting);
      },
      {
        threshold: [0, 0.18],
        rootMargin: "-6% 0px -8% 0px",
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <span
      ref={nodeRef}
      className={`home-text-motion home-text-motion--${variant}${className ? ` ${className}` : ""}`}
      data-visible={entered ? "true" : "false"}
    >
      <span className="home-text-motion__line">{children}</span>
      {variant === "signal" ? (
        <i className="home-text-motion__signal" aria-hidden="true" />
      ) : null}
    </span>
  );
}
