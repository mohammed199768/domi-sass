"use client";

import React from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import SalesAlphaVideo from "./SalesAlphaVideo";

const orbitNodes = [
    { en: "Trust", ar: "ثقة", angle: -105 },
    { en: "Booking", ar: "حجز", angle: -75 },
    { en: "Clarity", ar: "وضوح", angle: 105 },
    { en: "Questions", ar: "أسئلة", angle: 75 },
];

export default function AboutSection() {
    const { t, dir } = useLanguage();
    const about = t.about;
    const isArabic = dir === "rtl";
    const prefersReducedMotion = useReducedMotion();
    const copy = isArabic
        ? {
            eyebrow: "من إشارات مبعثرة إلى رحلة قابلة للقياس",
            title: "موقعك ليس صفحة.. إنه مساحة القرار",
            support: "العميل لا يضيع فقط بسبب ضعف الإعلان. غالبا يضيع عندما لا يفهم العرض، لا يرى دليلا كافيا، أو لا يجد خطوة واضحة للتواصل.",
            solutionEyebrow: "النظام",
            solutionTitle: "DOMINASE يحوّل الفجوات إلى نظام واضح.",
            solutionBody: "رسالة، موقع، مسار تواصل، متابعة، ولوحة رؤية تساعدك تعرف أين يتسرب الاهتمام.",
            solutionItems: ["وضوح في العرض", "دليل ثقة مقروء", "متابعة لا تضيع"],
            problemEyebrow: "الفجوة",
            problemTitle: "الفرصة لا تضيع فقط بسبب ضعف الإعلان.",
            problemBody: "تضيع عندما يكون الاهتمام مبعثرا بين السوشيال، واتساب، موقع غير واضح، ومتابعة غير منظمة.",
            problemItems: ["اهتمام بلا مسار", "ثقة بلا دليل", "طلبات بلا متابعة"],
            centerLabel: "نظام القرار",
            centerMicrocopy: "من إشارات مبعثرة إلى رحلة قابلة للقياس.",
        }
        : {
            eyebrow: "From scattered attention to a measurable journey",
            title: "Your website is not a page. It is the decision space.",
            support: "Customers rarely disappear because of one weak ad. They leave when the offer is unclear, proof is thin, or the next step is hard to find.",
            solutionEyebrow: "System",
            solutionTitle: "DOMINASE turns the gaps into a clear operating system.",
            solutionBody: "Message, website, contact path, response rhythm, and visibility layer working together so you can see where attention leaks.",
            solutionItems: ["Clear offer architecture", "Readable trust proof", "Response rhythm that holds momentum"],
            problemEyebrow: "Gap",
            problemTitle: "The opportunity does not only leak from weak advertising.",
            problemBody: "It leaks when attention is scattered across social, WhatsApp, unclear pages, and unstructured response.",
            problemItems: ["Attention without a path", "Trust without proof", "Inquiries without ownership"],
            centerLabel: "Decision System",
            centerMicrocopy: "From scattered signals to a measurable journey.",
        };

    return (
        <section id="about" className="relative py-20 transition-colors duration-300 sm:py-24">
            <div className="mx-auto max-w-7xl px-5 sm:px-6">
                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.25 }}
                    className="spatial-card overflow-hidden rounded-3xl p-5 sm:p-8 lg:p-10"
                >
                    <div className="spatial-card__glow pointer-events-none absolute inset-0" aria-hidden="true" />

                    <div className="relative">
                        <header className="mx-auto max-w-3xl text-center">
                            <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-primary-theme">
                                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-secondary-theme" />
                                {copy.eyebrow}
                            </p>
                            <h2 className="text-balance text-3xl font-black leading-tight text-foreground md:text-4xl">
                                {copy.title}
                            </h2>
                            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg">
                                {copy.support}
                            </p>
                        </header>

                        <div className="mt-12 grid items-center gap-8 lg:mt-16 lg:grid-cols-[minmax(17.5rem,0.82fr)_minmax(28rem,1.36fr)_minmax(17.5rem,0.82fr)] lg:gap-12" dir="ltr">
                            <div className="order-2 lg:order-1">
                                <TextModule
                                    eyebrow={copy.solutionEyebrow}
                                    title={copy.solutionTitle}
                                    body={copy.solutionBody}
                                    items={copy.solutionItems}
                                    dir={dir}
                                />
                            </div>

                            <div className="order-1 lg:order-2">
                                <SystemOrbit centerLabel={copy.centerLabel} microcopy={copy.centerMicrocopy} isArabic={isArabic} dir={dir} />
                            </div>

                            <div className="order-3">
                                <TextModule
                                    eyebrow={copy.problemEyebrow}
                                    title={copy.problemTitle}
                                    body={copy.problemBody}
                                    items={copy.problemItems}
                                    dir={dir}
                                />
                            </div>
                        </div>

                        <div className="mt-12 flex justify-center">
                            <Link href="/why-change" className="btn-primary min-h-12 px-8 py-3">
                                {about.cta}
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function SystemOrbit({
    centerLabel,
    microcopy,
    isArabic,
    dir,
}: {
    centerLabel: string;
    microcopy: string;
    isArabic: boolean;
    dir: "ltr" | "rtl";
}) {
    const orbitStyle = {
        "--orbit-radius": "clamp(190px, 19vw, 270px)",
    } as CSSProperties;

    return (
        <div className="relative mx-auto w-full max-w-[35rem]" dir="ltr">
            <div
                className="relative mx-auto hidden aspect-square w-[clamp(27rem,36vw,34rem)] max-w-full lg:block"
                style={orbitStyle}
                aria-hidden="true"
            >
                <div className="absolute left-1/2 top-1/2 aspect-square w-[calc(var(--orbit-radius)*2)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-theme/16" />
                {orbitNodes.map((node) => (
                    <OrbitNode key={node.en} label={isArabic ? node.ar : node.en} angle={node.angle} dir={dir} />
                ))}
            </div>

            <div className="relative z-10 lg:absolute lg:left-1/2 lg:top-1/2 lg:w-full lg:-translate-x-1/2 lg:-translate-y-1/2">
                <CentralOrb label={centerLabel} microcopy={microcopy} />
            </div>

            <NodeGrid isArabic={isArabic} />
        </div>
    );
}

function CentralOrb({ label, microcopy }: { label: string; microcopy: string }) {
    return (
        <div className="mx-auto w-[clamp(260px,32vw,440px)] max-w-full">
            <div className="relative aspect-square rounded-full border border-primary-theme/28 bg-[color-mix(in_srgb,var(--domi-bg)_90%,var(--domi-accent)_10%)] p-3 shadow-[0_34px_90px_-74px_var(--domi-accent)]">
                <div className="absolute inset-3 rounded-full border border-secondary-theme/12" aria-hidden="true" />
                <span className="absolute left-1/2 top-5 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-surface px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary-theme">
                    {label}
                </span>
                <div className="absolute inset-[8%] z-10 aspect-square overflow-hidden rounded-full">
                    <SalesAlphaVideo className="h-full w-full" />
                </div>
            </div>
            <p className="mx-auto mt-5 max-w-xs text-center text-sm font-semibold leading-7 text-foreground/78">
                {microcopy}
            </p>
        </div>
    );
}

function NodeGrid({ isArabic }: { isArabic: boolean }) {
    return (
        <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:hidden">
            {orbitNodes.map((node) => (
                <span key={node.en} className="rounded-full border border-border bg-surface/70 px-3 py-2 text-center text-xs font-black text-foreground/85">
                    {isArabic ? node.ar : node.en}
                </span>
            ))}
        </div>
    );
}

function OrbitNode({ label, angle, dir }: { label: string; angle: number; dir: "ltr" | "rtl" }) {
    const style = {
        transform: `translate(-50%, -50%) rotate(${angle}deg) translate(var(--orbit-radius)) rotate(${-angle}deg)`,
    } as CSSProperties;

    return (
        <div className="absolute left-1/2 top-1/2 z-10" style={style} dir={dir}>
            <div className="flex min-w-24 max-w-32 items-center justify-center rounded-full border border-border bg-surface px-4 py-2 text-xs font-black leading-4 text-foreground shadow-[0_18px_44px_-34px_var(--cool-shadow)]">
                {label}
            </div>
        </div>
    );
}

function TextModule({
    eyebrow,
    title,
    body,
    items,
    dir,
}: {
    eyebrow: string;
    title: string;
    body: string;
    items: string[];
    dir: "ltr" | "rtl";
}) {
    return (
        <div className="relative flex min-h-[20rem] flex-col justify-center rounded-2xl border border-border bg-surface/58 p-5 text-start shadow-[0_24px_70px_-60px_var(--cool-shadow)] sm:p-6" dir={dir}>
            <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary-theme/24 to-transparent" aria-hidden="true" />
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-primary-theme">{eyebrow}</p>
            <h3 className="mt-4 text-xl font-black leading-snug text-foreground sm:text-2xl">{title}</h3>
            <p className="mt-4 text-sm font-medium leading-7 text-muted">{body}</p>
            <ul className="mt-5 space-y-2.5">
                {items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-bold text-foreground/85">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-theme" aria-hidden="true" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
