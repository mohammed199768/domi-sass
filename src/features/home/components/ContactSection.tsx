"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
    const { t, dir, language } = useLanguage();
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
        <section id="contact" className="py-20 bg-foreground text-background transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: dir === 'rtl' ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-background">
                            {t.contact.title}
                        </h2>
                        <p className="opacity-80 text-lg mb-10">
                            {t.contact.subtitle}
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 opacity-90">
                                <div className="w-12 h-12 bg-background/10 rounded-full flex items-center justify-center text-secondary-theme">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <span className="text-lg ltr:font-sans">{t.contact.info.phone}</span>
                            </div>
                            <div className="flex items-center gap-4 opacity-90">
                                <div className="w-12 h-12 bg-background/10 rounded-full flex items-center justify-center text-secondary-theme">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <span className="text-lg">{t.contact.info.email}</span>
                            </div>
                            <div className="flex items-center gap-4 opacity-90">
                                <div className="w-12 h-12 bg-background/10 rounded-full flex items-center justify-center text-secondary-theme">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <span className="text-lg">{t.contact.info.address}</span>
                            </div>
                        </div>

                        <div className="mt-12 relative h-60 w-full rounded-2xl overflow-hidden shadow-2xl opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            <Image
                                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
                                alt="Contact Us"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-surface rounded-3xl p-8 lg:p-10 text-foreground shadow-2xl border border-border"
                    >
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
                                    className="w-full px-4 py-3 rounded-lg bg-surface-hover border border-border focus:border-primary-theme focus:ring-2 focus:ring-primary-theme/20 outline-none transition-all text-foreground"
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
                                    className="w-full px-4 py-3 rounded-lg bg-surface-hover border border-border focus:border-primary-theme focus:ring-2 focus:ring-primary-theme/20 outline-none transition-all text-foreground"
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
                                    className="w-full px-4 py-3 rounded-lg bg-surface-hover border border-border focus:border-primary-theme focus:ring-2 focus:ring-primary-theme/20 outline-none transition-all text-foreground"
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
                                    className="w-full px-4 py-3 rounded-lg bg-surface-hover border border-border focus:border-primary-theme focus:ring-2 focus:ring-primary-theme/20 outline-none transition-all text-foreground"
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
                                className="w-full py-4 bg-primary-theme text-background font-bold rounded-lg shadow-lg shadow-primary-theme/20 transition-colors hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {formStatus === "sending" ? formStatusText[language].sending : t.contact.form.submit}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
