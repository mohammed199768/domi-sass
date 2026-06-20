"use client";

import { MessageCircle, Phone, Mail } from "lucide-react";
import type { ComponentType } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT_CHANNELS, CONTACT_CHANNEL_ORDER, type ContactChannelId } from "@/constants/contact";
import { useSvgReveal } from "./visuals/useSvgReveal";

const ICONS: Record<ContactChannelId, ComponentType<{ className?: string }>> = {
  whatsapp: MessageCircle,
  phone: Phone,
  email: Mail,
};

/**
 * ContactActionsOrbit — the three direct contact routes presented as nodes in a
 * decision path (HOME M15B). Not floating glass circles: each route is a solid
 * theme-aware node (icon + label + helper) sitting on a thin vertical SVG
 * decision line, so it reads as intelligent routing inside the console.
 *
 * - Real hrefs from CONTACT_CHANNELS (single source of truth, no fakes).
 * - The decision line draws once on enter via the shared useSvgReveal hook
 *   (no-ops under reduced motion, leaving it visible). No blur, no glass, no
 *   continuous animation — only one-time draw + CSS border/transform on hover.
 */
export default function ContactActionsOrbit() {
  const { t } = useLanguage();
  const c = t.contact.portal.channels;
  const { containerRef } = useSvgReveal<HTMLDivElement>();

  const labels: Record<ContactChannelId, { label: string; caption: string; helper: string }> = {
    whatsapp: c.whatsapp,
    phone: c.phone,
    email: c.email,
  };

  return (
    <div ref={containerRef} className="relative mt-auto">
      <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-muted">{c.heading}</p>

      <div className="relative">
        {/* Thin vertical decision path linking the three route nodes. The path
            sits behind the node markers; it is start-anchored so it mirrors in
            RTL. Drawn once via useSvgReveal, static under reduced motion. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 4 200"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-y-3 start-[26px] hidden w-1 text-primary-theme sm:block"
        >
          <line data-draw x1="2" y1="0" x2="2" y2="200" stroke="currentColor" strokeWidth="1" opacity="0.28" />
        </svg>

        <ul className="relative flex flex-col gap-3">
          {CONTACT_CHANNEL_ORDER.map((id) => {
            const channel = CONTACT_CHANNELS[id];
            const Icon = ICONS[id];
            const { label, caption, helper } = labels[id];
            return (
              <li key={id}>
                <a
                  href={channel.href}
                  aria-label={label}
                  {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-xl border border-border bg-surface px-4 py-3 outline-none transition-colors duration-200 hover:border-secondary-theme/60 focus-visible:border-secondary-theme focus-visible:ring-2 focus-visible:ring-secondary-theme/40"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-border bg-surface-hover text-primary-theme transition-colors duration-200 group-hover:border-secondary-theme/50 group-hover:text-secondary-theme">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-sm font-black text-foreground">{caption}</span>
                    <span className="text-xs text-muted">{helper}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="ms-auto h-2 w-2 shrink-0 rounded-full bg-border transition-colors duration-200 group-hover:bg-secondary-theme"
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
