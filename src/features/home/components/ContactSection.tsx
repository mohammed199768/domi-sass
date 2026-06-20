"use client";

import { useLanguage } from "@/context/LanguageContext";
import ContactForm from "./ContactForm";
import ContactActionsOrbit from "./ContactActionsOrbit";

/**
 * ContactSection — the lightweight Contact Decision Console (HOME M15B).
 *
 * The final decision point, rebuilt as a calm command system rather than a
 * glass-heavy form. Theme-aware solid surfaces, 1px hairline borders, and a thin
 * SVG decision path — premium through composition and typography, not through
 * expensive backdrop-blur or animated shadows.
 *
 * Left: the decision/intelligence column with three routing nodes.
 * Right: the "signal capture" form panel (Formspree).
 *
 * Preserves the `data-contact-portal-reveal` hooks used by the portal pin
 * animation, and adapts cleanly to light/dark and RTL.
 */
export default function ContactSection() {
    const { t } = useLanguage();
    const p = t.contact.portal;

    return (
        <section id="contact" className="relative overflow-hidden py-24 text-foreground transition-colors duration-300 lg:py-32">
            <div className="pointer-events-none absolute inset-x-6 top-10 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid items-stretch gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
                    {/* Left: decision intelligence + routing nodes */}
                    <div data-contact-portal-reveal className="flex flex-col">
                        <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-primary-theme">
                            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-secondary-theme" />
                            {p.eyebrow}
                        </p>
                        <h2 className="mb-5 text-4xl font-black leading-tight text-foreground md:text-5xl">
                            {t.contact.title}
                        </h2>
                        <p className="mb-10 max-w-xl text-lg leading-8 text-muted">
                            {t.contact.subtitle}
                        </p>

                        <ContactActionsOrbit />
                    </div>

                    {/* Right: the "signal capture" form panel — solid surface, hairline border */}
                    <div
                        data-contact-portal-reveal
                        className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8"
                    >
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-theme/35 to-transparent" />
                        <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                            <span className="text-xs font-bold uppercase tracking-[0.24em] text-muted">{p.panelLabel}</span>
                            <span aria-hidden="true" className="flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-secondary-theme" />
                                <span className="h-1.5 w-1.5 rounded-full bg-primary-theme/40" />
                                <span className="h-1.5 w-1.5 rounded-full bg-primary-theme/20" />
                            </span>
                        </div>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
