"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import ScrollReelTestimonials, {
    type ScrollReelTestimonial,
} from "./ScrollReelTestimonials";

type TestimonialItem = {
    quote: string;
    author: string;
    role: string;
};

/* UI-only mapping of each testimonial to its project label + placeholder
 * visual (content untouched). Images are temporary project placeholders the
 * user will replace later; the reel falls back to an initials tile if a file
 * is missing, so no broken images ever render. No stock/people portraits. */
const projectMeta: Record<
    number,
    { company: string; image: string; alt: string }
> = {
    0: {
        company: "Curevie",
        image: "/assest/testimonials/curevie-placeholder.jpg",
        alt: "Curevie project testimonial placeholder",
    },
    1: {
        company: "Inkspire",
        image: "/assest/testimonials/inkspire-placeholder.jpg",
        alt: "Inkspire project testimonial placeholder",
    },
    2: {
        company: "Engineering Co.",
        image: "/assest/testimonials/engineering-placeholder.jpg",
        alt: "Engineering project testimonial placeholder",
    },
};

export default function TestimonialsSection() {
    const { t, language, dir } = useLanguage();
    const isArabic = language === "ar";
    const isRtl = dir === "rtl";

    const items: TestimonialItem[] = t.testimonials.items;

    const heading = t.testimonials.title;
    const description = t.testimonials.subtitle;
    const sectionLabel = t.testimonials.title;

    // Adapt the existing (real) testimonials to the reel shape. Quote/author/
    // role copy is passed through unchanged.
    const testimonials: ScrollReelTestimonial[] = items.map((item, i) => ({
        id: i,
        quote: item.quote,
        author: item.author,
        role: item.role,
        company: projectMeta[i]?.company,
        image: projectMeta[i]?.image,
        alt: projectMeta[i]?.alt,
    }));

    return (
        <section
            id="testimonials"
            className="relative overflow-hidden bg-background py-20 transition-colors duration-300 md:py-28"
            aria-labelledby="proof-signals-title"
        >
            {/* Top hairline */}
            <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                    background:
                        "linear-gradient(to right, transparent, color-mix(in srgb, var(--primary) 34%, var(--border)), transparent)",
                }}
                aria-hidden="true"
            />

            <div className="relative mx-auto max-w-5xl px-6">
                {/* Section header */}
                <div className={`mb-12 max-w-3xl ${isRtl ? "ms-auto text-end" : ""}`}>
                    <p className="text-xs font-black uppercase tracking-[0.32em] text-primary-theme">
                        {sectionLabel}
                    </p>
                    <h2
                        id="proof-signals-title"
                        className="mt-4 text-3xl font-black leading-tight text-foreground md:text-5xl"
                    >
                        {heading}
                    </h2>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-muted md:text-lg">
                        {description}
                    </p>
                </div>

                {/* Scroll reel testimonial — one featured testimonial at a time */}
                <ScrollReelTestimonials
                    testimonials={testimonials}
                    isArabic={isArabic}
                />

                {/* CTA */}
                <div className="mt-14 flex justify-center">
                    <Link href="/contact" className="btn-primary px-8 py-3">
                        {t.testimonials.cta}
                    </Link>
                </div>
            </div>
        </section>
    );
}
