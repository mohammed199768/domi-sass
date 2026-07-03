"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

export default function SalesAlphaVideo({ className = "" }: { className?: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const [hasVideoError, setHasVideoError] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || hasVideoError) return;

        video.muted = true;

        if (prefersReducedMotion) {
            video.pause();
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry) return;
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            },
            { threshold: 0.35 },
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, [hasVideoError, prefersReducedMotion]);

    return (
        <div className={`relative h-full w-full ${className}`}>
            <video
                ref={videoRef}
                className={`block h-full w-full object-cover object-center transition-opacity duration-200 ${hasVideoError ? "opacity-0" : "opacity-100"}`}
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="DOMINASE sales system visual"
                onError={() => setHasVideoError(true)}
            >
                <source src="/assest/sales.webm" type="video/webm" />
                <source src="/assest/sales.mov" type="video/quicktime" />
            </video>

            {hasVideoError ? (
                <div
                    className="absolute inset-0 grid place-items-center rounded-full border border-primary-theme/35 bg-surface/30"
                    aria-hidden="true"
                >
                    <div className="relative grid h-36 w-36 place-items-center rounded-full border border-primary-theme/35 bg-primary-theme/[0.06]">
                        <span className="absolute h-24 w-24 rounded-full border border-secondary-theme/25" />
                        <span className="h-3 w-3 rounded-full bg-primary-theme shadow-[0_0_28px_var(--domi-accent)]" />
                    </div>
                </div>
            ) : null}
        </div>
    );
}
