"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

type ViewportVideoProps = {
    /** Public-path source, e.g. "/assest/marketing.webm". */
    src: string;
    /** Fallback MP4 source, e.g. "/assest/marketing.mp4" */
    fallbackSrc?: string;
    className?: string;
    /** Optional poster — only pass a file that actually exists. */
    poster?: string;
    /** Visible fraction that triggers playback (default 0.35). */
    threshold?: number;
    /** Wait for metadata during the first boot reveal. */
    preloadCritical?: boolean;
};

/**
 * A decorative, muted, looping video that plays only while it is in view.
 *
 * Uses a single IntersectionObserver (no scroll listeners) to play when the
 * element is sufficiently visible and pause when it leaves. Respects
 * prefers-reduced-motion: reduced-motion users never get autoplay — the
 * element stays paused on its first frame / poster.
 *
 * Renders identical markup on server and client (all attributes are static),
 * so it introduces no hydration mismatch.
 */
export default function ViewportVideo({
    src,
    fallbackSrc,
    className = "",
    poster,
    threshold = 0.35,
    preloadCritical = false,
}: ViewportVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Guarantee muted so the browser permits programmatic autoplay.
        video.muted = true;

        // Reduced motion: never autoplay; hold on the first frame / poster.
        if (prefersReducedMotion) {
            video.pause();
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (!entry) return;
                if (entry.isIntersecting) {
                    // play() can reject (e.g. not yet allowed); ignore safely.
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            },
            { threshold },
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, [prefersReducedMotion, threshold]);

    return (
        <video
            ref={videoRef}
            className={className}
            poster={poster}
            muted
            loop
            playsInline
            preload="metadata"
            data-preload-critical={preloadCritical ? "" : undefined}
            aria-hidden="true"
            tabIndex={-1}
        >
            <source src={src} type={src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
            {fallbackSrc && <source src={fallbackSrc} type={fallbackSrc.endsWith('.mp4') ? 'video/mp4' : 'video/webm'} />}
        </video>
    );
}
