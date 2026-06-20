# HOME M15 — CONTACT CONVERSION PORTAL WITH FORMSPREE CLOSEOUT

## Summary
Refactored the homepage Contact section into a focused conversion portal: a premium React form
(name / phone / optional company) that submits to Formspree without leaving the page and shows a
calm on-brand success state in place, flanked by three glassmorphic contact-channel circles
(WhatsApp, phone, email) orbiting the decision point. The section keeps the existing DOMINASE
"portal" identity (obsidian, glass, champagne/cyan accent), preserves the portal pin-reveal
animation, and works in Arabic/English, light/dark, and reduced motion. No homepage redesign, no
brand changes, no heavy or continuous motion.

## Files added
- `src/constants/contact.ts` — typed `CONTACT_CHANNELS` (WhatsApp/phone/email) derived from the
  existing `content.ts` contact info (single source of truth, no fake data), plus
  `FORMSPREE_ENDPOINT` resolved from `NEXT_PUBLIC_FORMSPREE_ENDPOINT` with the project's existing
  endpoint as fallback.
- `src/features/home/components/ContactForm.tsx` — the form (states, validation, honeypot,
  Formspree submit, success state).
- `src/features/home/components/ContactActionsOrbit.tsx` — the three orbital contact circles.
- `.env.example` — documents `NEXT_PUBLIC_FORMSPREE_ENDPOINT`.
- `tests/visual/contact-portal.spec.ts` — functional tests (network mocked).
- `docs/home/HOME_M15_CONTACT_CONVERSION_PORTAL_CLOSEOUT.md` — this doc.

## Files changed
- `src/features/home/components/ContactSection.tsx` — rebuilt as the conversion portal layout
  (intent column + orbit, focused form panel); keeps the `data-contact-portal-reveal` hooks the
  portal pin animation depends on.
- `src/constants/content.ts` — added a bilingual `contact.portal` block (labels, placeholders,
  validation, submit/submitting, success copy, channel labels). Legacy `contact.form`/`info`
  left intact.
- `src/styles/globals.css` — added the one-shot `contact-success-in` keyframe (motion-safe only).
- `src/features/home/index.ts` — exports `ContactForm` and `ContactActionsOrbit`.

## Formspree implementation
- Endpoint from `NEXT_PUBLIC_FORMSPREE_ENDPOINT` (build-time inlined → no hydration mismatch),
  falling back to the project's existing `https://formspree.io/f/xrevvlod` so the form works out
  of the box. No fake endpoint is hardcoded.
- Submit via `fetch` `POST` with `FormData` and `Accept: application/json`; the page never
  reloads or navigates.
- States: `idle` → `submitting` → `success` | `error`. The submit button is disabled while
  submitting and an in-flight guard prevents duplicate submissions.
- On a non-OK response the request throws and the UI shows an inline error while keeping the user
  on the form.
- If the endpoint were ever unset (`FORMSPREE_ENDPOINT_MISSING`), the form shows a clear inline
  configuration error instead of crashing.

## Form fields
- **Name** — required (`الاسم` / `Name`).
- **Phone** — required, `type=tel` (`رقم الهاتف` / `Phone number`).
- **Company** — optional, placeholder marks it optional (`اسم الشركة` / `Company`).
- No email/message fields (the previous form's email + textarea were intentionally dropped per
  the brief).
- A visually-hidden, off-tab-tree **honeypot** (`company_url`); if filled, the submit is treated
  as success without sending.
- Values are trimmed; name/phone required validation runs before any network call.

## Success state
On success the form body is replaced in place (no navigation) by an `aria-live="polite"` panel
with the gold check, the exact bilingual title/body, and a **Send another message** /
`إرسال رسالة أخرى` button that resets state and clears the fields. The panel fades/slides in via
the motion-safe `contact-success-in` keyframe (instant under reduced motion).

## Contact action circles
Three circular glass buttons (`ContactActionsOrbit`) for WhatsApp, phone, and email:
- Real hrefs from `CONTACT_CHANNELS`: `https://wa.me/962779667168` (new tab), `tel:+962779667168`,
  `mailto:mohammed.aldomi68@gmail.com`. WhatsApp reuses the existing mobile number (no separate
  WhatsApp line exists; documented in `contact.ts`).
- Lucide icons (the project's existing icon system): `MessageCircle`, `Phone`, `Mail`.
- Row/stacked on mobile, spaced with subtle silver SVG connector lines on ≥ sm; premium
  hover/focus glow (champagne accent), visible focus ring.
- Descriptive bilingual `aria-label`s; captions don't rely on color alone.

## Bilingual content
All new strings live in `content.ts` under `contact.portal` for both `en` and `ar`: field
labels + placeholders, name/phone/submit/config validation messages, submit + submitting text,
success title/body/button, channel heading + per-channel label/caption. Arabic and English are
both polished; RTL verified (channels and form mirror correctly).

## Accessibility notes
- Every input has a real `<label htmlFor>`; required fields use `aria-invalid` + `aria-describedby`
  pointing at the inline error when invalid.
- Submit errors use `role="alert"`; the success panel uses `aria-live="polite"`.
- Visible focus rings on all inputs, the submit button, the channel links, and the reset button.
- Channel circles have descriptive labels; status is never conveyed by color alone (icon + text).
- The honeypot label is hidden and `tabIndex={-1}`, off the keyboard path.

## Motion / performance decisions
- One-time only: the contact channel connector lines draw once on enter via the shared
  `useSvgReveal` hook (which no-ops under reduced motion, leaving lines visible). The portal
  pin-reveal is unchanged.
- Hover/focus uses CSS transitions only (translate/scale/glow) — no JS loop.
- Success transition is a single motion-safe keyframe.
- No WebGL/Canvas, no RAF loops, no infinite orbits/pulses, no continuous mouse-follow, no heavy
  blurs. Reduced motion: no draw, instant success, everything usable.

## Tests added / updated
`tests/visual/contact-portal.spec.ts` (network mocked, never hits real Formspree):
1. renders name/phone/company (and asserts no textarea).
2. required validation blocks submit, sets `aria-invalid`, sends no request.
3. successful mocked submit → success state; **Send another message** resets to an empty form.
4. Formspree error keeps the user on the page and shows the error.
5. WhatsApp/`tel:`/`mailto:` hrefs match valid patterns and have labels.
6. Arabic labels render and the homepage has no horizontal overflow at 390px.

## Validation results
- [x] `npm run lint` — Passed (only the 2 pre-existing `LanguageContext.tsx` warnings).
- [x] `npx tsc --noEmit` — Passed.
- [x] `npm run build` — Passed.
- [x] `npm run test:visual` — 59 passed (6 new contact tests + all existing). No `/work` or
  case-study snapshots changed. The existing homepage top-of-page snapshots are unaffected (the
  contact section is below the fold and not captured); a previously-known intermittent hero
  animation-timing flake on `homepage light desktop` passes in isolation and passed in the full
  run. No new contact snapshots were added (functional tests cover the behavior), keeping the
  baseline lean.

## Remaining risks
- **WhatsApp number** reuses the primary mobile; if a dedicated WhatsApp line is wanted, set
  `WHATSAPP_NUMBER_E164` in `src/constants/contact.ts`.
- **`.env*` is gitignored**, so `.env.example` is local documentation; the build relies on the
  fallback endpoint until `NEXT_PUBLIC_FORMSPREE_ENDPOINT` is set in the deploy environment.
- **Contact section is intentionally dark in both themes** (the portal identity), matching the
  prior behavior; the accent color still switches per theme (pink dark / orange light).
- Formspree free-tier rate limits / spam are mitigated only by the honeypot; consider Formspree's
  built-in reCAPTCHA if abuse appears.

## Next recommended milestone
**HOME M16 — contact analytics & spam hardening:** add lightweight submit/intent events
(channel clicks vs. form submits), a success-confirmation email template via Formspree, and
optional Formspree reCAPTCHA, plus a small dedicated contact-section visual snapshot (dark
desktop + mobile Arabic) now that the portal layout is settled.
