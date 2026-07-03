/**
 * Central SEO configuration for DOMINASE.
 *
 * All brand, contact, and social data here is sourced from existing public
 * content already visible on the site (content.ts, contact.ts, Footer.tsx).
 * Nothing is invented or fabricated.
 */

/** Production canonical domain. */
export const SITE_URL = "https://www.dominase.art";

/** Core brand identity. */
export const BRAND = {
  siteName: "DOMINASE",
  brandName: "DOMINASE",
  founderName: "Mohammed Aldomi",
  tagline: "Digital Product Studio",
  locale: "en",
  localeAlternate: "ar",
} as const;

/** Default metadata applied via the root layout. */
export const META_DEFAULTS = {
  title: "DOMINASE — Digital Product Studio",
  titleTemplate: "%s — DOMINASE",
  description:
    "DOMINASE builds websites, digital systems, dashboards, booking flows, and product interfaces for businesses that need clarity, trust, and operational depth.",
  ogImage: "/opengraph-image.png",
} as const;

/**
 * Public social / professional links.
 * Sourced from Footer.tsx and contact.ts — no invented links.
 */
export const SOCIAL_LINKS = {
  github: "https://github.com/mohammed199768",
  upwork:
    "https://www.upwork.com/freelancers/~012bcb31d6467e2e71?mp_source=share",
  linkedin: "https://linkedin.com/in/mohammed199768",
} as const;

/**
 * Public contact info.
 * Sourced from content.ts (en.contact.info) — no invented data.
 */
export const CONTACT = {
  phone: "+962779667168",
  email: "mohammed.aldomi68@gmail.com",
  address: "Amman, Jordan",
} as const;
