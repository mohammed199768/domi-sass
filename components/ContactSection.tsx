"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactSection() {
    const { t, dir } = useLanguage();

    return (
        <section id="contact" className="py-20 bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: dir === 'rtl' ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                            {t.contact.title}
                        </h2>
                        <p className="text-gray-300 text-lg mb-10">
                            {t.contact.subtitle}
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-secondary">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <span className="text-lg ltr:font-sans">{t.contact.info.phone}</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-secondary">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <span className="text-lg">{t.contact.info.email}</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-secondary">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <span className="text-lg">{t.contact.info.address}</span>
                            </div>
                        </div>

                        <div className="mt-12 relative h-60 w-full rounded-2xl overflow-hidden shadow-2xl opacity-80">
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
                        className="bg-white rounded-3xl p-8 lg:p-10 text-gray-800 shadow-2xl"
                    >
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                                    {t.contact.form.name}
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                                    {t.contact.form.email}
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
                                    {t.contact.form.phone}
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                                    {t.contact.form.message}
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                ></textarea>
                            </div>
                            <button
                                type="button"
                                className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors shadow-lg"
                            >
                                {t.contact.form.submit}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
