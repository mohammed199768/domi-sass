# HOME M15B — LIGHTWEIGHT CONTACT DECISION CONSOLE CLOSEOUT

## Summary
Redesigned the Contact section's visual layer into a lightweight, brand-aligned **decision
console** while keeping all M15 functionality intact (Formspree submit, same-page success state,
bilingual content, contact links, validation, honeypot, accessibility). Heavy glassmorphism and
backdrop blur are gone; the section is now built from solid theme-aware surfaces, 1px hairline
borders, and a thin SVG decision path. The form reads as a "Signal capture" panel and the three
contact channels read as intelligent **routing nodes** on a decision line — not floating social
circles. Light mode is now a warm off-white console instead of a hard black block.

## What was wrong with M15
- Too much glassmorphism / `backdrop-blur-xl` on large panels and circles (GPU cost, generic
  premium-form look).
- Heavy dark block in **both** themes — the portal overlay forced obsidian even in light mode, so
  light mode looked broken.
- Heavy layered shadows (`shadow-2xl shadow-black/40`, animated `hover:shadow` glows).
- The three contact circles read as isolated social buttons floating beside text, not as routing
  options inside a system.
- Visual weight without strategic structure.

## Files changed
- `src/features/home/components/ContactPortalSection.tsx` — the expanding portal surface is now
  **theme-aware** (`#f4f5f7` light / `#080808` dark) so light mode is a warm surface, not a black
  block; the atmosphere overlay is now two static low-opacity token radial accents (no blur, no
  animated shadow). Pin-reveal mechanics unchanged.
- `src/features/home/components/ContactSection.tsx` — rebuilt as the console: two-column
  composition (decision column + "Signal capture" form panel), brand tokens
  (`text-foreground`/`bg-surface`/`border-border`/`text-muted`), hairline dividers, a single
  light `shadow-sm`, and a panel status header. No glass/blur.
- `src/features/home/components/ContactActionsOrbit.tsx` — rebuilt from glass circles into solid
  routing nodes (icon + label + helper) on a thin vertical SVG decision line; hover = border
  accent + marker color, no blur.
- `src/features/home/components/ContactForm.tsx` — all surfaces moved to brand tokens; inputs are
  solid `bg-surface-hover` + hairline border; success state redesigned ("Signal received" badge);
  submit button keeps the champagne/cyan accent with a simple color transition (no shadow/translate
  animation).
- `src/constants/content.ts` — added `portal.panelLabel`, `portal.success.eyebrow`, and per-channel
  `helper` text (bilingual): WhatsApp "Fastest reply / رد أسرع", Call "Talk directly / تواصل مباشر",
  Email "Formal details / تفاصيل رسمية"; channel heading → "Direct routes / مسارات مباشرة".
- (`src/styles/globals.css` keyframe and `src/constants/contact.ts` from M15 are unchanged and
  reused.)

## Visual redesign
- **Concept:** a Contact Decision Console. Left = decision copy + routing nodes; right = the
  "Signal capture" form panel with a status header (`label` + three signal dots). A thin vertical
  SVG decision line links the routing nodes.
- **Surfaces:** solid `bg-surface` panels, `border-border` hairlines, subtle token gradient
  hairline at the panel top, one static `shadow-sm`. Composition/typography/SVG carry the premium
  feel — not blur.
- **Routing nodes:** each channel is a solid node row (icon tile + caption + helper + status
  marker) that highlights its border and marker on hover/focus.

## Performance reductions
- Removed every `backdrop-blur` / `backdrop-filter` in the section.
- Removed `shadow-2xl shadow-black/40` and all animated `hover:shadow` glows; only one static
  `shadow-sm` remains on the form panel.
- No large `filter: blur()` elements; the only decorative layer is two static low-opacity
  `color-mix` radial accents (no blur, no animation).
- Hover/focus uses `transition-colors` (and tiny transforms) — no animated layout properties, no
  RAF loops, no continuous animation. The one-time SVG line draw and the success fade are the only
  motion, both gated by reduced motion.

## Contact routing nodes
Three solid nodes from `CONTACT_CHANNELS` (real hrefs, no fakes):
- WhatsApp → `https://wa.me/962779667168` (new tab) — "Fastest reply / رد أسرع".
- Call → `tel:+962779667168` — "Talk directly / تواصل مباشر".
- Email → `mailto:mohammed.aldomi68@gmail.com` — "Formal details / تفاصيل رسمية".
Lucide icons (existing system), descriptive bilingual `aria-label`s, visible focus ring, on a thin
SVG decision line that mirrors correctly in RTL (start-anchored). They remain visible in the
success state.

## Success state
Same-page, `aria-live="polite"`, rendered inside the form panel: a rounded confirmation badge,
"Signal received / تم استلام الإشارة" eyebrow, the unchanged bilingual title + body, and the
"Send another message / إرسال رسالة أخرى" reset button. Lightweight (no modal/glass), motion-safe
fade-in, instant under reduced motion. Routing nodes stay visible beside it.

## Light / dark behavior
- **Light:** warm off-white console surface, soft silver borders, deep-navy text/icons, restrained
  champagne accent; orange CTA with dark text (good contrast). No black block.
- **Dark:** obsidian console, low static glow, premium contrast; pink accent, dark-text CTA.
- Both driven by existing brand tokens, so the section follows the global theme rather than forcing
  a single mood.

## Mobile behavior
At 390px the columns stack: decision copy → routing nodes (full-width node rows) → form panel. The
SVG decision line is hidden below `sm` (nodes stack), no horizontal overflow, no clipped buttons.
Verified in EN/light and AR/dark.

## Tests / validation
- Existing `tests/visual/contact-portal.spec.ts` (6 tests) all still pass unchanged — the redesign
  is token/markup-level, not behavioral: field rendering, required validation, mocked success +
  reset, Formspree error, valid wa.me/tel/mailto hrefs, Arabic labels + no mobile overflow.
- `npm run lint` — Passed (2 pre-existing unrelated `LanguageContext.tsx` warnings).
- `npx tsc --noEmit` — Passed.
- `npm run build` — Passed.
- `npm run test:visual` — 59 passed. No `/work` or case-study snapshots changed; homepage
  top-of-page snapshots unaffected (contact is below the fold). Manual QA captures (dark/light
  desktop, mobile EN-light, mobile AR-dark, dark success) all confirmed the console look, theme
  correctness, RTL mirroring, and the visible routing nodes.

## Remaining risks
- The portal section still follows the global theme via the wrapper's expanding surface; if the
  global tokens change drastically, re-check the `#f4f5f7` / `#080808` dot colors used during the
  expansion frames (they bridge to `bg-surface`/`bg-background` underneath).
- No dedicated contact visual snapshot is committed (functional tests + manual QA cover it) to keep
  the baseline lean; a future milestone could add one now that the layout is settled.
- WhatsApp still reuses the primary mobile (set `WHATSAPP_NUMBER_E164` in `contact.ts` for a
  dedicated line).

## Next recommended milestone
**HOME M16 — contact analytics & settled snapshot:** add lightweight intent events (routing-node
clicks vs. form submit), optional Formspree reCAPTCHA, and commit one dedicated contact-section
visual snapshot per theme (dark desktop + mobile Arabic) now that the decision-console layout is
final.
