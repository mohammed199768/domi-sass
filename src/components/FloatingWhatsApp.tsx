"use client";

/**
 * FloatingWhatsApp — global direct line to the studio.
 *
 * Uses the existing single source of truth (CONTACT_CHANNELS.whatsapp from
 * src/constants/contact.ts — +962779667168 via wa.me); no duplicated contact
 * data. Quiet emerald product control: border, shadow, transform hover only.
 * No emoji, no pulsing, no backdrop-filter.
 */

import { useLanguage } from "@/context/LanguageContext";
import { CONTACT_CHANNELS } from "@/constants/contact";
import WhatsAppMark from "@/components/icons/WhatsAppMark";

export default function FloatingWhatsApp() {
    const { language } = useLanguage();
    const label = language === "ar" ? "تواصل معنا عبر واتساب" : "Chat with us on WhatsApp";

    return (
        <a
            href={CONTACT_CHANNELS.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="fixed right-5 z-30 grid h-12 w-12 place-items-center rounded-full border border-[color-mix(in_srgb,var(--domi-accent)_35%,var(--domi-border-strong))] bg-surface text-primary-theme shadow-[0_18px_50px_-24px_var(--domi-accent-shadow)] transition-[transform,border-color,color] duration-200 hover:-translate-y-0.5 hover:border-primary-theme hover:text-secondary-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-theme active:translate-y-0"
            style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.25rem)" }}
        >
            <WhatsAppMark className="h-5 w-5" />
        </a>
    );
}
