"use client";

import { useEffect, useRef } from "react";
import { gsap, registerMotionPlugins, ScrollTrigger } from "@/lib/motion/gsapSetup";
import { useMediaQuery } from "@/lib/motion/useMediaQuery";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import ContactSection from "./ContactSection";

export default function ContactPortalSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const atmosphereRef = useRef<HTMLDivElement>(null);
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        registerMotionPlugins();

        const section = sectionRef.current;
        const dot = dotRef.current;
        const atmosphere = atmosphereRef.current;

        if (!section || !dot || !atmosphere) {
            return;
        }

        const revealItems = section.querySelectorAll("[data-contact-portal-reveal]");

        if (prefersReducedMotion || !isDesktop) {
            gsap.set(dot, { scale: 42, opacity: 1 });
            gsap.set(atmosphere, { opacity: 1 });
            gsap.set(revealItems, { clearProps: "all", opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" });
            return;
        }

        const context = gsap.context(() => {
            gsap.set(dot, {
                scale: 0.35,
                opacity: 0.96,
                transformOrigin: "50% 50%",
            });
            gsap.set(atmosphere, { opacity: 0 });
            gsap.set(revealItems, {
                opacity: 0,
                y: 54,
                clipPath: "inset(12% 0% 0% 0%)",
            });

            // One controlled portal timeline: the circle expands using transform
            // scale, then the existing contact content reveals once the contact
            // atmosphere has mostly covered the viewport.
            gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "+=115%",
                    scrub: 0.75,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            })
                .to(dot, {
                    scale: 62,
                    ease: "power2.inOut",
                    duration: 0.68,
                }, 0.16)
                .to(atmosphere, {
                    opacity: 1,
                    ease: "none",
                    duration: 0.22,
                }, 0.5)
                .to(revealItems, {
                    opacity: 1,
                    y: 0,
                    clipPath: "inset(0% 0% 0% 0%)",
                    stagger: 0.075,
                    ease: "power3.out",
                    duration: 0.38,
                }, 0.68);
        }, section);

        ScrollTrigger.refresh();

        return () => context.revert();
    }, [isDesktop, prefersReducedMotion]);

    return (
        <div ref={sectionRef} className="relative isolate overflow-hidden bg-background transition-colors duration-300">
            <div
                ref={dotRef}
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-[48%] z-0 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#070707] dark:bg-[#020202]"
            />
            <div
                ref={atmosphereRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.08),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_36%),linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.24))]"
            />
            <div className="relative z-10">
                <ContactSection />
            </div>
        </div>
    );
}
