# Why Pages — M3: Navbar + Reciprocal CTA Button Cluster — Closeout

**Date:** 2026-06-20
**Status:** Complete — lint, type-check, build, and full visual suite (77/77) all green.

## 1. Summary

Promoted `/why-us` into the main navigation (desktop + mobile) by replacing the
old `About` / `من أنا` scroll item, and built a reciprocal CTA loop between the
two why-pages. `/why-change` now links forward to `/why-us`, and `/why-us` links
back to `/why-change`. Both final CTA clusters were restyled into premium,
centered, rounded-full (pill) buttons through a small shared structural
component, with no redesign of either page's story content and no new
dependencies.

The cinematic scroll film on `/why-change` and the Why Us story page were left
structurally untouched — only the final CTA section markup/styling and the nav
were changed.

## 2. Files changed

| File | Change |
| --- | --- |
| `src/constants/content.ts` | Replaced `nav.about` with `nav.whyUs` in both EN (`Why Us?`) and AR (`لماذا نحن؟`). |
| `src/components/Header.tsx` | Removed About scroll item; added `/why-us` route link next to `/why-change`. |
| `src/components/MobileNav.tsx` | Removed About (`User` icon); added Why Us (`Sparkles` icon) route link. |
| `src/components/WhyPageCtaCluster.tsx` | **New** shared structural CTA cluster component. |
| `src/features/why-change/WhyChangeFilmClient.tsx` | Final CTA now uses the shared cluster with 3 actions incl. `/why-us`. |
| `src/features/why-change/why-change.module.css` | Pill buttons, centered cluster, primary/tertiary intents, focus states, mobile wrap. |
| `src/features/why-us/WhyUsPageClient.tsx` | Final CTA now uses the shared cluster with 3 actions incl. `/why-change`. |
| `src/features/why-us/why-us.module.css` | Pill buttons, centered cluster, tertiary intent, focus states, mobile wrap. |
| `tests/visual/why-change-entry.spec.ts` | Updated nav assertions (Why Us present, About absent, 3 mobile route links). |
| `tests/visual/why-change.visual.spec.ts` | Asserts reciprocal `/why-us` CTA (EN + new AR mobile test). |
| `tests/visual/why-us.visual.spec.ts` | Asserts reciprocal `/why-change` CTA (EN + AR). |
| `tests/visual/__screenshots__/pages.visual.spec.ts/work-index-mobile.png` | Intentional snapshot update — bottom mobile nav row only. |

## 3. Navbar changes

- **Desktop (`Header.tsx`):** nav order is now Expertise → Work → Why Change? →
  **Why Us?** → Case Studies → Signals → Contact. Item count stays at 7 (About
  removed, Why Us added) so the pill nav does not overcrowd.
- **Mobile (`MobileNav.tsx`):** Home → Expertise → Why Change? → **Why Us?** →
  Case Studies → Contact. Item count stays at 6.
- Both use the existing route-link branch, so the active-state styling
  (`text-primary-theme font-bold`) works automatically. `/why-change` and
  `/why-us` are distinct `startsWith` prefixes, so there is no active-state
  collision.
- Scroll links (`#services`, `#portfolio`, `#testimonials`, `#contact`) are
  untouched and still degrade to `/#...` links on non-home routes.

## 4. Removed About nav item

- The navbar `About` (`من أنا`) item was a **scroll link** to the homepage
  `#about` section. It was removed from both the desktop and mobile nav.
- The homepage About **section** (`#about`, `AboutSection`) is unchanged and
  still reachable by scrolling; only its navbar shortcut was replaced. Its own
  diagnostic CTA still routes to `/why-change` (covered by existing tests).
- `nav.about` key was removed from `content.ts` (it had no other consumers).

## 5. Added Why Us nav item

- New `nav.whyUs` translation key: `Why Us?` / `لماذا نحن؟`.
- Route link to `/why-us` (`isRoute: true`) in both navs, placed immediately
  after Why Change for a logical "why" pairing.
- Mobile uses the `Sparkles` icon to visually distinguish it from Why Change's
  `CircleHelp`.

## 6. Why Change CTA update

Final section on `/why-change` now renders a centered pill cluster of three:

| Intent | EN | AR | Route |
| --- | --- | --- | --- |
| primary | Start your project | ابدأ مشروعك | `/#contact` |
| secondary | View case studies | شاهد دراسات الحالة | `/work` |
| tertiary | Why Us? | لماذا نحن؟ | `/why-us` |

Styling: `border-radius: 999px`, hairline borders, restrained cyan
(`--why-signal`) hover glow, champagne (`--why-champagne`) tertiary accent,
subtle gradient on the primary, `translateY(-2px)` hover, visible focus outline.
The section and cluster are now center-aligned. On mobile, buttons wrap to full
width (capped at 26rem) for large tap targets.

## 7. Why Us CTA update

Final section on `/why-us` now renders a centered pill cluster of three:

| Intent | EN | AR | Route |
| --- | --- | --- | --- |
| primary | Start building your website with us | ابدأ بناء موقعك معنا | `/#contact` |
| secondary | View case studies | شاهد دراسات الحالة | `/work` |
| tertiary | Why Change? | لماذا التغيير؟ | `/why-change` |

Styling mirrors the Why Change cluster but uses the `--wu-*` palette and the
page's inverted-panel `currentColor` button scheme (primary inverts panel/ink;
dark mode handled). Tertiary uses the `--wu-decision` champagne accent. Mobile
keeps the existing full-width stacked behavior.

## 8. Shared CTA component

`src/components/WhyPageCtaCluster.tsx` — a deliberately small **structural**
component (not a visual one):

- Accepts translated `actions: { label, href, intent }[]` and renders accessible
  `next/link` anchors in order.
- Maps `intent` (`primary` | `secondary` | `tertiary`) to a BEM-style modifier
  (`${buttonClassName}--${intent}`) so each page keeps its own palette-aware
  classes (`why-button` vs `why-us-button`) — neither page is redesigned and the
  two distinct CSS variable systems (`--why-*` vs `--wu-*`) are preserved.
- Renders a `<nav aria-label>` landmark; no nested buttons/anchors; no animation
  (all visuals live in each page's CSS module).

This was chosen over a fully-styled shared component because the two pages have
genuinely different palettes and an inverted panel on Why Us; forcing one style
onto both would have been a redesign. The component shares layout, semantics, and
intent mapping without over-engineering.

## 9. Tests / validation

**Automated (all green):**
- `npm run lint` — 0 errors (2 pre-existing warnings in `LanguageContext.tsx`, unrelated).
- `npx tsc --noEmit` — clean.
- `npm run build` — succeeds; `/why-change` and `/why-us` prerendered.
- `npm run test:visual` — **77/77 passed.**

**Test additions/updates:**
- Navbar no longer shows About / من أنا (desktop + mobile assertions).
- Navbar includes Why Us / لماذا نحن? → `/why-us` (desktop + mobile, EN + AR).
- Mobile nav has exactly 3 route links and no horizontal overflow at 390px.
- `/why-change` final CTA includes `/why-us` (EN + new AR mobile test).
- `/why-us` final CTA includes `/why-change` (EN + AR).
- All CTA links assert correct routes (`/#contact`, `/work`, reciprocal route).
- Arabic and English labels asserted in both clusters.

**Snapshot policy:** Only one snapshot updated — `work-index-mobile.png` — whose
diff was confirmed to be exclusively the bottom mobile-nav row (About→Why Us).
No case-study, `/work` card, modal, or why-page film snapshots were regenerated.

## 10. Remaining risks

- **Why Us CTA screenshots within tolerance:** `why-us-dark-desktop.png` and
  `why-us-light-ar-mobile.png` passed without regeneration — the pill restyle
  landed inside the diff threshold. If a future stricter threshold flags them,
  regenerate those two intentionally.
- **Mobile nav density:** 6 items at 390px is comfortable today. Adding a 7th
  mobile item later would risk crowding the labels (already at `text-[9px]`).
- **`metadataBase` build warning** is pre-existing and unrelated to this work.
- **`baseline-browser-mapping` stale-data warning** is a tooling notice, not a
  failure.

## 11. Next recommended milestone

**Why Pages M4 — Cross-page continuity polish:** add a lightweight "you are here"
visual relationship between the two why-pages (e.g. an eyebrow/breadcrumb on each
page naming the sibling), and consider a consolidated `whyPagesContent.ts` so the
reciprocal labels/routes live in one source of truth rather than inline per page.
Optionally add an analytics hook on the reciprocal CTA clicks to measure the
why-change ↔ why-us loop engagement.
