import { content } from "./content";

/**
 * CONTACT_CHANNELS — the single typed source of truth for the contact action
 * circles in the conversion portal (HOME M15).
 *
 * The raw phone and email reuse the values already defined in `content.ts`
 * (English block), so there is exactly one place to update real contact data.
 * No fake numbers are introduced here.
 *
 * WhatsApp: there is no separate WhatsApp number in the project, so the primary
 * mobile number is reused (it is a WhatsApp-capable Jordanian mobile). If a
 * dedicated WhatsApp line is ever added, set `WHATSAPP_NUMBER_E164` below.
 */

const RAW_PHONE = content.en.contact.info.phone; // e.g. "+962779667168"
const RAW_EMAIL = content.en.contact.info.email;

// E.164 digits only (no "+", spaces, or dashes) — required by wa.me / tel cleanup.
const PHONE_DIGITS = RAW_PHONE.replace(/[^\d]/g, "");
const WHATSAPP_NUMBER_E164 = PHONE_DIGITS;

export type ContactChannelId = "whatsapp" | "phone" | "email";

export type ContactChannel = {
  id: ContactChannelId;
  /** Fully-formed, click-safe href. */
  href: string;
  /** The human-readable value, safe to show (e.g. the number / email). */
  display: string;
  /** Whether the link should open in a new tab (WhatsApp web/app). */
  external: boolean;
};

export const CONTACT_CHANNELS: Record<ContactChannelId, ContactChannel> = {
  whatsapp: {
    id: "whatsapp",
    href: `https://wa.me/${WHATSAPP_NUMBER_E164}`,
    display: RAW_PHONE,
    external: true,
  },
  phone: {
    id: "phone",
    href: `tel:${RAW_PHONE}`,
    display: RAW_PHONE,
    external: false,
  },
  email: {
    id: "email",
    href: `mailto:${RAW_EMAIL}`,
    display: RAW_EMAIL,
    external: false,
  },
};

export const CONTACT_CHANNEL_ORDER: ContactChannelId[] = ["whatsapp", "phone", "email"];

/**
 * Formspree endpoint. Prefer the public env var; fall back to the project's
 * existing endpoint so the form keeps working out of the box. Real deployments
 * should set NEXT_PUBLIC_FORMSPREE_ENDPOINT (see .env.example).
 */
export const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim() || "https://formspree.io/f/xrevvlod";

/** True only when neither an env var nor a usable fallback endpoint exists. */
export const FORMSPREE_ENDPOINT_MISSING = !FORMSPREE_ENDPOINT;
