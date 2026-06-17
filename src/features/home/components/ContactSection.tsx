"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, MapPin, Phone } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrevvlod";

const formStatusText = {
    en: {
        sending: "Sending...",
        success: "Message sent. I will get back to you soon.",
        error: "Something went wrong. Please try again or email me directly.",
    },
    ar: {
        sending: "جاري الإرسال...",
        success: "تم إرسال الرسالة. سأرد عليك قريباً.",
        error: "حدث خطأ أثناء الإرسال. حاول مرة أخرى أو راسلني مباشرة.",
    },
};

export default function ContactSection() {
    const { t, language } = useLanguage();
    const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        setFormStatus("sending");

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Formspree request failed");
            }

            form.reset();
            setFormStatus("success");
        } catch {
            setFormStatus("error");
        }
    };

    return (
        <section id="contact" className="relative overflow-hidden py-24 text-white transition-colors duration-300 lg:py-32">
            <div className="pointer-events-none absolute inset-x-6 top-10 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
                    {/* Contact Info */}
                    <div data-contact-portal-reveal className="lg:sticky lg:top-28">
                        <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 text-white">
                            {t.contact.title}
                        </h2>
                        <p className="text-white/72 text-lg leading-8 mb-10">
                            {t.contact.subtitle}
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-white/86">
                                <div className="w-12 h-12 bg-white/8 rounded-full flex items-center justify-center text-secondary-theme border border-white/10">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <span className="text-lg ltr:font-sans">{t.contact.info.phone}</span>
                            </div>
                            <div className="flex items-center gap-4 text-white/86">
                                <div className="w-12 h-12 bg-white/8 rounded-full flex items-center justify-center text-secondary-theme border border-white/10">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <span className="text-lg">{t.contact.info.email}</span>
                            </div>
                            <div className="flex items-center gap-4 text-white/86">
                                <div className="w-12 h-12 bg-white/8 rounded-full flex items-center justify-center text-secondary-theme border border-white/10">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <span className="text-lg">{t.contact.info.address}</span>
                            </div>
                        </div>

                        <div className="mt-12 relative h-60 w-full rounded-3xl overflow-hidden shadow-2xl opacity-72 grayscale transition-all duration-500 hover:opacity-95 hover:grayscale-0 border border-white/10">
                            <Image
                                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
                                alt="Contact Us"
                                fill
                                sizes="(max-width: 1024px) 100vw, 42vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                        </div>
                    </div>

                    {/* Form */}
                    <div
                        data-contact-portal-reveal
                        className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.94] p-6 text-foreground shadow-2xl shadow-black/35 backdrop-blur-xl dark:bg-surface/92 sm:p-8 lg:p-10"
                    >
                        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <input type="hidden" name="_subject" value="New portfolio contact message" />
                            <div>
                                <label htmlFor="name" className="block text-sm font-bold text-muted mb-2">
                                    {t.contact.form.name}
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    autoComplete="name"
                                    className="w-full px-4 py-3.5 rounded-xl bg-surface-hover border border-border focus:border-primary-theme focus:ring-4 focus:ring-primary-theme/15 outline-none transition-all text-foreground shadow-inner shadow-black/[0.02]"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-muted mb-2">
                                    {t.contact.form.email}
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="w-full px-4 py-3.5 rounded-xl bg-surface-hover border border-border focus:border-primary-theme focus:ring-4 focus:ring-primary-theme/15 outline-none transition-all text-foreground shadow-inner shadow-black/[0.02]"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-bold text-muted mb-2">
                                    {t.contact.form.phone}
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    autoComplete="tel"
                                    className="w-full px-4 py-3.5 rounded-xl bg-surface-hover border border-border focus:border-primary-theme focus:ring-4 focus:ring-primary-theme/15 outline-none transition-all text-foreground shadow-inner shadow-black/[0.02]"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-bold text-muted mb-2">
                                    {t.contact.form.message}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    className="w-full px-4 py-3.5 rounded-xl bg-surface-hover border border-border focus:border-primary-theme focus:ring-4 focus:ring-primary-theme/15 outline-none transition-all text-foreground shadow-inner shadow-black/[0.02]"
                                ></textarea>
                            </div>
                            {formStatus !== "idle" && (
                                <p
                                    role="status"
                                    className={`text-sm font-semibold ${formStatus === "success"
                                        ? "text-emerald-600"
                                        : formStatus === "error"
                                            ? "text-red-600"
                                            : "text-muted"
                                        }`}
                                >
                                    {formStatusText[language][formStatus]}
                                </p>
                            )}
                            <button
                                type="submit"
                                disabled={formStatus === "sending"}
                                className="w-full py-4 bg-primary-theme text-background font-bold rounded-xl shadow-lg shadow-primary-theme/20 transition-all hover:-translate-y-0.5 hover:bg-opacity-90 hover:shadow-xl hover:shadow-primary-theme/25 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                            >
                                {formStatus === "sending" ? formStatusText[language].sending : t.contact.form.submit}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
