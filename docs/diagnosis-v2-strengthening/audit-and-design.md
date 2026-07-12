# Diagnosis V2 Strengthening — Audit & Design

Scope: `engineering`, `general-business`, `venue` V2 data (`src/data/diagnosis/v2/`). Benchmark: `clinic` V2 (untouched). Engine untouched.

## 1. Why the three domains were weak

The dimensions, topics, and level anchors were solid (grounded in `04_STRATEGY_MAPS`), but everything decision-bearing above them was machine-templated:

- **Profiles were structural clones.** All three domains shared the exact same 13 condition patterns (`{D1 gapMin 1, D3 currentMin 3}` …), with duplicates (profile-01 = 07 = 13) and Arabic titles literally reading "نمط الشركة الهندسية: أولوية 1". Profiles described priority slots, not business states.
- **Recommendations were per-topic boilerplate.** One repair/improve pair per topic with identical `why`/`how` text ("Fix the missing foundation… Assign one owner and a review date…") that never mentioned anything specific to consulting sales cycles, wedding bookings, or B2C checkouts. Several categories were mislabeled (e.g., a proposal-follow-up rec filed under `quickWins`), tags were duplicated, and filler recs (`steady-mid-*`, `controlled-path-*`) existed to occupy categories rather than to advise.
- **Context was collected but never used.** All three `contextForm`s asked questions; zero recommendations carried `contextAll`/`contextAny`. Clinic used context; the targets didn't.
- **No domain-required coverage.** Engineering had nothing on proposal quality, founder-relationship dependence, tenders, or decision committees. Venue had nothing on tours/closing, deposits, reviews/Maps, or off-peak strategy. General-business had no retention topic and no way to distinguish B2B from B2C, product from service, or high from low ticket.

## 2. Clinic quality principles extracted (and reused)

1. **Profiles are named business states with a governing constraint** ("Trusted but Hard to Book"), built from topic-level conditions plus a supporting dimension condition, with a real `riskNote` about sequencing.
2. **Conditions are asymmetric on purpose**: repair fires at `currentMax ~2.5, gapMin 1`; improve fires in the middle band; maintain fires at `currentMin ~4.4, gapMax 0.5`. Modes are always explicit.
3. **Every rec argues its own case**: bilingual `why` (mechanism, not slogan), 3 concrete `how` steps, `websiteImplication` / `systemImplication` only when true, `dominaseFit` that sometimes says "don't buy anything," and honest `riskNotes`.
4. **Context recs** (`v2-context-*`) that only make sense given an intake answer.
5. **Early-stage and high-maturity content** so weak and strong businesses get different, honest advice — including "you may not need a rebuild."
6. **Dedupe groups + per-category caps** are used so severity variants of the same fix never co-appear.

## 3. Engine decision path (verified before redesign)

- Score: per-topic `gap = max(0, target − current)`, weighted roll-ups per dimension.
- Profile matching: specificity-scored (topic condition ≈ 6 pts > dimension ≈ 3 > tags ≈ 1; + per-condition, evidence, notConditions, `profilePriority × 0.5`). **Consequence used in design:** specific-issue profiles beat generic ones only if generic profiles are written with low-specificity `dimensionMin` maps — so "ready to scale" and fallback profiles use map conditions, letting topic-anchored profiles win when both match.
- Ranking: `priority×4` dominates, then `strongestGap×3`, specificity, impact/urgency/effort. **Consequence:** repairs p5, strategic p4–5, improves p3–4, quick wins p2–3, maintain p2; context-confirmed recs get priority/impact boosts so category caps don't silently erase the context effect.
- Selection: maxTotal 9, maxPerCategory 2, mode caps, maintain suppression when ≥3 severe-topic recs. **Consequence:** dedupe groups were assigned semantically (e.g., `eng:quote-intake` shared by the repair, the improve, and the WhatsApp-context variant) so at most one of a family appears.
- Context: select values are stored as the *localized* option strings, so every context condition uses `oneOf: [English, Arabic]`. (Clinic only matches English — a known clinic limitation we did not copy.)
- Profiles cannot see context (engine constraint, not changed). Context therefore affects eligibility and ranking of recommendations, which satisfies the differentiation requirement without touching the shared engine.

## 4. Design changes per domain

### Engineering (15 topics, 14 profiles, 47 recs)
- **New topics:** `eng_relationship_dependence` (D1 — demand beyond the founder's network) and `eng_proposal_quality` (D5 — proposals as decision documents, not price sheets). New optional context field `clientMix` (private / corporate & procurement / government & tenders / mixed).
- **Profiles:** referral-locked order book, expert-but-undershown proof, generalist price pressure, procurement-filter failure, quote friction, proposals leaking, pipeline blindness, jargon wall, system disconnect, plus reset/early/ready-to-scale/high-maturity/fallback. Boundary control via `notConditions` (e.g., undershown-proof defers to positioning when project focus is the deeper break).
- **Recs:** tender credentials pack (context-gated B2G), decision-committee selling (context: corporate/large budgets), consultation-first path for large projects, proposal-quality upgrade, partner/referral systematization, repeat-client revenue plan, CRM-adoption rec (context: quotes already run through a CRM), response-time standard, cost-factor filtering.

### Venue (15 topics, 14 profiles, 48 recs)
- **New topics:** `venue_tour_conversion` (D3 — tour invitation and closing: holds, offers, deposit path) and `venue_reviews_reputation` (D1 — reviews + Google Maps + post-event collection).
- **Profiles:** separate the demand problem (invisible: weak gallery + weak reviews) from response (beautiful-but-slow), channel chaos (DM overload), pricing friction (price mystery), closing (tours-no-close), follow-up leak, utilization (seasonal cliff), reputation capture, and visual under-show — plus reset/early/ready/maturity/fallback.
- **Recs:** date-check flow, first-reply completeness/SLA, tour invitation + post-tour hold/deposit path, deposit & cancellation terms, review system + Maps, real-event stories, family-circle testimonials, honest price ranges, off-peak offers gated on having a follow-up base, vendor referral network, Instagram-context capture, WhatsApp-context first-reply template, seasonality-context off-peak engine.

### General-business (14 topics, 13 profiles, 48 recs)
- **New topic:** `gen_repeat_retention` (D4). **New context fields:** `businessModel` (B2B/B2C/both), `offerType` (product/service), `ticketSize`, `purchaseFrequency`, `salesOwner` — the high-impact signals that make "general" advice specific.
- **Profiles:** constraint-oriented — invisible offer (demand), commodity trap (differentiation), trust gap (proof), traffic-no-action (conversion), leaky follow-up, WhatsApp overload, untracked growth (measurement), one-time-only (retention) — plus reset/early/ready/maturity/fallback.
- **Context materially changes decisions:** B2B → buying-committee content + case studies; B2C → fast-decision funnel; high ticket → consultation path; product → checkout-step reduction; local service → Maps/reviews; founder-led sales → process capture & handoff; one-off purchases → the referral engine *replaces* the retention program (`exclusiveWith` + shared dedupe group, context-gated).

## 5. Major structural decisions and rationale

- **Kept the question sets, added surgically.** The strategy-map-derived questions measure observable behavior; replacing them would have destroyed grounded content for no decision gain. Added only the topics required to detect issues the domains were blind to (5 new topics total).
- **Replaced 100% of profiles and recommendations.** Template content had no salvage value; the failure mode was uniformity, not individual errors.
- **Generic-strong profiles use low-specificity map conditions** so that a strong firm with one severe topic gets the specific diagnosis (verified: tender scenario now selects `eng_procurement_blocked`, not `eng_ready_to_scale`).
- **Isolated severe topics get strategic coverage via `anyConditions`** (dimension average + any-severe-topic), because one severe topic in a five-topic dimension dilutes the dimension average below strategic thresholds.
- **Early-stage vs ambitious-reset boundary** is drawn by target realism: low current + modest targets → early-stage foundations (blocked by `notConditions` when gaps ≥2.5); low current + high targets → reset with sequencing advice.
- **No engine changes.** Every requirement was met with data. The one engine-level temptation (context-aware profiles) was avoided; context lives in recommendation eligibility as designed.
