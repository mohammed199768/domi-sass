# WHY US M1 — Premium Trust + Process Story Page Closeout

## Summary

/why-us is a bilingual strategic trust page that explains why Mohammed Aldomi / DOMINASE is the right guide to build a website or digital system. It keeps the customer in the hero role and presents DOMINASE through a clear method: customer-first clarity, direct communication, deliberate consulting, support after launch, cross-system product experience, and architecture designed to accommodate change.

## Files added

- src/app/why-us/page.tsx
- src/features/why-us/WhyUsPageClient.tsx
- src/features/why-us/whyUsContent.ts
- src/features/why-us/WhyUsStorySection.tsx
- src/features/why-us/WhyUsTrustFrame.tsx
- src/features/why-us/WhyUsProcessRail.tsx
- src/features/why-us/why-us.module.css
- tests/visual/why-us.visual.spec.ts
- tests/visual/__screenshots__/why-us.visual.spec.ts/why-us-dark-desktop.png
- tests/visual/__screenshots__/why-us.visual.spec.ts/why-us-light-ar-mobile.png
- docs/why-us/WHY_US_M1_STORY_PAGE_CLOSEOUT.md

## Files changed

- src/components/Footer.tsx: added the bilingual /why-us entry point.

The user-provided public/assest/whyUs directory is now an intentional page asset source. No supplied SVG was edited.

## Route structure

The server route owns static metadata and renders one client story component. Bilingual content, seven guide principles, and six process steps are predefined in whyUsContent.ts. Reusable story, image-frame, and process-rail components keep layout and motion responsibilities separate.

## Content structure

The page follows a guide-story arc:

1. A business needs more than a beautiful interface.
2. The system must clarify value and reduce customer hesitation.
3. DOMINASE starts with the customer's decision rather than a template.
4. Direct communication keeps decisions and context intact.
5. Support continues into real use and agreed follow-up.
6. Cross-system experience informs the work without forcing a template.
7. Consulting challenges unnecessary features and clarifies priorities.
8. Architecture anticipates responsible change without claiming to predict every future need.
9. Visible scope and checkpoints reduce pre-project uncertainty.
10. A six-step plan shows exactly how the project moves from understanding to launch.
11. The final CTA distinguishes aesthetic execution from customer-aware partnership.

No metrics, guarantees, or unproven commercial outcomes were added.

## Image usage

Eight supplied SVGs are used:

- undraw_handshake-deal_nwk6.svg — hero partnership.
- undraw_ideas-flow_lwpa.svg — clarity and message flow.
- undraw_online-meetings_zutp.svg — direct communication.
- undraw_active-support_v6g0.svg — post-launch support.
- undraw_mobile-web_eqrb.svg — cross-system experience.
- Consultative sales-amico.svg — consulting and prioritization.
- Server-rafiki.svg — architecture and future change.
- undraw_questions_52ic.svg — hesitation before the decision.

The hero image loads eagerly. All seven below-fold illustrations are lazy-loaded through next/image. Assets sit inside transparent editorial stages with partial corners, hairline signals, and captions rather than filled cards or glass panels.

## Visual direction

The page uses a warm ivory / deep navy theme in light mode and obsidian / cyan / champagne in dark mode. A central guide line and decision nodes connect the seven working principles. Alternating image and copy positions provide editorial pacing while preserving intentional RTL composition. Surfaces use hairlines and whitespace; there is no heavy blur or glassmorphism.

## Process section

The process rail contains six steps:

1. Understand the project / نفهم المشروع
2. Map the path / نرسم المسار
3. Shape the message / نبني الرسالة
4. Design the experience / نصمم التجربة
5. Build and test / نطور ونختبر
6. Launch and support / نطلق وندعم

Desktop uses one inline SVG path with six checkpoint nodes. Tablet removes the SVG and uses a compact grid. Mobile uses a static vertical rail with CSS nodes.

## Motion and performance decisions

- No pinned sequence, scroll snap, Canvas, WebGL, Lottie, or Anime.js.
- GSAP owns a finite hero entrance, section rises, one process-line draw, and six finite node reveals.
- Motion uses opacity, translateY, scale, and stroke-dashoffset only.
- No infinite loops, animated filters, particles, mouse-follow, or custom requestAnimationFrame.
- Reduced motion clears GSAP presentation properties, keeps all sections visible, and renders the process rail statically.
- Larger illustrated SVGs are below the fold and lazy-loaded.

## Bilingual content

Every hero statement, principle, paragraph, process step, decision block, and CTA has a polished English and Arabic version. The English is strategic rather than literal. Arabic uses direct diagnostic language and RTL-specific grid composition and typography. The existing LanguageContext remains the only language state.

## Navigation entry point

The shared footer now includes:

- Why Us?
- لماذا نحن؟

No Header or MobileNav item was added because M2 already established seven desktop destinations and six mobile actions. Adding another would reduce clarity and conflict with the requirement not to overcrowd navigation. The footer provides a safe site-wide route entry.

## SEO notes

Title: Why Us? — Mohammed Aldomi

Description: A strategic page explaining how Mohammed Aldomi builds websites and digital systems around clarity, conversion, direct communication, and long-term support.

The route is statically generated.

## Tests and validation

- English /why-us title, seven guide principles, six process steps, CTA hrefs, and footer route.
- Arabic title, process copy, CTA, and 390px horizontal-overflow safety.
- Eight selected user-provided images load with non-zero natural width.
- Reduced motion has no pinning, visible static content, and a completed static process rail.
- Dark desktop and light Arabic mobile visual baselines.
- npm run lint: passes with two pre-existing unused catch-variable warnings in LanguageContext.tsx.
- npx tsc --noEmit: passes.
- npm run build: passes; /why-us is statically generated.
- npm run test:visual: 76/76 passes.
- Browser harness reported no console errors, page errors, or hydration warnings.

## Remaining risks

Consultative sales-amico.svg and Server-rafiki.svg are larger than the selected unDraw assets. They are lazy-loaded and only appear below the fold, but a later asset-pipeline pass could optimize their SVG markup if network traces show material cost. The Footer is intentionally the only global navigation entry; discoverability should be evaluated before replacing another primary Header or mobile destination.

## Next recommended milestone

Add distinct analytics labels to the /why-us Footer entry, primary contact CTA, and case-studies CTA. Then review route completion and CTA behavior before changing navigation prominence or adding more motion.

