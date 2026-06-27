"use client";

import { useEffect, useRef } from "react";
import { gsap, registerMotionPlugins, ScrollTrigger } from "@/lib/motion/gsapSetup";
import { useMediaQuery } from "@/lib/motion/useMediaQuery";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

export type FlowTransition =
  | "none"
  | "ominous-gate"
  | "diagonal-reveal"
  | "depth-lift"
  | "panel-slide"
  | "settle";

/**
 * Drives the cinematic intro for a single homepage section.
 *
 * Design constraints honoured here:
 *  - No ScrollTrigger pinning -> no scroll traps, no Lenis conflict, no
 *    broken sticky/fixed descendants, no 100dvh breakage.
 *  - The transform lives only on `.flow-inner`; it is cleared (clearProps)
 *    once the intro settles so nothing lingers to break sticky children.
 *  - prefers-reduced-motion short-circuits to a normal, fully-visible render.
 *  - On small screens, dramatic effects degrade to gentle opacity/translate.
 *  - Every tween/trigger lives in a section-scoped gsap.context() that is
 *    reverted on unmount, so route changes never leave duplicate triggers.
 */
export function useFlowSection(transition: FlowTransition) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const gateLineRef = useRef<HTMLDivElement | null>(null);

  const prefersReducedMotion = useReducedMotion();
  // Tablets stay in the simplified path to avoid off-canvas staging overflow.
  const isDesktop = useMediaQuery("(min-width: 1025px)");

  useEffect(() => {
    registerMotionPlugins();

    const section = sectionRef.current;
    const inner = innerRef.current;
    if (!section || !inner) {
      return;
    }

    // No transition requested: leave the section exactly as authored.
    if (transition === "none") {
      section.setAttribute("data-flow-state", "settled");
      return;
    }

    // Reduced motion: render normally, nothing animated.
    if (prefersReducedMotion) {
      gsap.set(inner, { clearProps: "all" });
      section.setAttribute("data-flow-state", "settled");
      return;
    }

    section.setAttribute("data-flow-armed", "true");

    const overlay = overlayRef.current;
    const gateLine = gateLineRef.current;
    const diagonalMask = section.querySelector<HTMLElement>(".flow-diagonal-mask");
    const depthLayer = section.querySelector<HTMLElement>(".flow-depth-layer");

    const settle = () => {
      gsap.set(inner, { clearProps: "all" });
      section.setAttribute("data-flow-state", "settled");
    };

    const ctx = gsap.context(() => {
      const baseTrigger = {
        trigger: section,
        // Start a little before the section's top reaches the viewport bottom.
        start: "top 78%",
        once: true,
        invalidateOnRefresh: true,
      } as const;

      switch (transition) {
        case "ominous-gate": {
          // The dramatic one. The incoming section emerges THROUGH the
          // DOMINASE gate: it arrives clean (no rotation/overflow) — opacity
          // 0 -> 1, scale 0.94 -> 1, y 56px -> 0 — while the cyan/violet gate
          // seam ignites and the obsidian/violet fog dissolves.
          if (isDesktop) {
            gsap.set(inner, {
              y: 56,
              scale: 0.94,
              opacity: 0,
              transformOrigin: "center top",
            });
            if (overlay) gsap.set(overlay, { opacity: 1 });
            if (gateLine) gsap.set(gateLine, { scaleX: 0.12, opacity: 0 });

            const tl = gsap.timeline({
              scrollTrigger: { ...baseTrigger, start: "top 82%" },
              defaults: { ease: "power3.out" },
              onComplete: settle,
            });

            // Gate seam ignites, then the section rises through it.
            if (gateLine) {
              tl.to(gateLine, { opacity: 1, scaleX: 1, duration: 0.5 }, 0);
            }
            tl.to(
              inner,
              { y: 0, scale: 1, opacity: 1, duration: 1.15 },
              0.12
            );
            if (overlay) {
              tl.to(overlay, { opacity: 0, duration: 0.9 }, 0.55);
            }
            if (gateLine) {
              tl.to(gateLine, { opacity: 0, duration: 0.45 }, 0.95);
            }
          } else {
            // Mobile: keep the mood (fog + lift) but drop heavy rotation.
            gsap.set(inner, { yPercent: 6, opacity: 0.9 });
            if (overlay) gsap.set(overlay, { opacity: 1 });
            const tl = gsap.timeline({
              scrollTrigger: baseTrigger,
              defaults: { ease: "power2.out" },
              onComplete: settle,
            });
            tl.to(inner, { yPercent: 0, opacity: 1, duration: 0.8 }, 0);
            if (overlay) tl.to(overlay, { opacity: 0, duration: 0.7 }, 0.2);
          }
          break;
        }

        case "diagonal-reveal": {
          gsap.set(inner, {
            opacity: 0,
            clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
          });
          if (diagonalMask) gsap.set(diagonalMask, { opacity: 0, xPercent: -40 });

          const tl = gsap.timeline({
            scrollTrigger: baseTrigger,
            defaults: { ease: "power3.out" },
            onComplete: settle,
          });
          tl.to(inner, {
            opacity: 1,
            clipPath: "polygon(0 0, 140% 0, 100% 100%, 0 100%)",
            duration: 0.95,
          }, 0);
          if (diagonalMask) {
            tl.fromTo(
              diagonalMask,
              { opacity: 0, xPercent: -30 },
              { opacity: 0.9, xPercent: 60, duration: 0.7, ease: "power1.inOut" },
              0
            ).to(diagonalMask, { opacity: 0, duration: 0.35 }, 0.6);
          }
          break;
        }

        case "depth-lift": {
          // Lifts upward out of a soft depth. transform + opacity only
          // (no filter blur — brand performance constraint).
          gsap.set(inner, {
            opacity: 0,
            yPercent: 7,
            scale: 0.985,
          });
          if (depthLayer) gsap.set(depthLayer, { opacity: 0.7 });

          const tl = gsap.timeline({
            scrollTrigger: baseTrigger,
            defaults: { ease: "power3.out" },
            onComplete: settle,
          });
          tl.to(inner, {
            opacity: 1,
            yPercent: 0,
            scale: 1,
            duration: 1,
          }, 0);
          if (depthLayer) tl.to(depthLayer, { opacity: 0, duration: 0.8 }, 0.1);
          break;
        }

        case "panel-slide": {
          // Clean editorial panel slides in from the side (LTR-safe).
          gsap.set(inner, { opacity: 0, xPercent: isDesktop ? 8 : 0, yPercent: 4 });
          const tl = gsap.timeline({
            scrollTrigger: baseTrigger,
            defaults: { ease: "power3.out" },
            onComplete: settle,
          });
          tl.to(inner, { opacity: 1, xPercent: 0, yPercent: 0, duration: 0.9 }, 0);
          break;
        }

        case "settle": {
          // Calm, stable, conversion-focused. Gentle fade + tiny rise.
          gsap.set(inner, { opacity: 0, yPercent: 3 });
          gsap.to(inner, {
            opacity: 1,
            yPercent: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { ...baseTrigger, start: "top 85%" },
            onComplete: settle,
          });
          break;
        }
      }
    }, section);

    // Recalculate positions once everything is laid out.
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      section.removeAttribute("data-flow-armed");
    };
  }, [transition, prefersReducedMotion, isDesktop]);

  return { sectionRef, innerRef, overlayRef, gateLineRef };
}
