# Diagnosis V2 Strengthening — Validation Report

All validation ran against the real engine (`buildNormalizedDiagnosisResultV2`) with the applied data files. Every scenario was executed twice and compared by `decisionHash` (deterministic replay). Web/PDF parity holds because both render the same normalized result object (verified by the existing parity test across all 4 domains).

## 1. Focused scenarios and observed results

Legend: profile → selected recommendations (category:id, mode). Full transcripts were reviewed for relevance, ordering, and absence of unrelated/contradictory cards.

### Engineering
| Scenario | Profile | Key observed decisions |
|---|---|---|
| Very weak, ambitious targets (1.5→4.5) | `eng_reset_ambitious` | 5 repairs (portfolio, credentials, project-type pages, RFQ, proposal cadence) + proof-bottleneck strategic + portfolio dominase step |
| Average (3→4) | `eng_balanced_evidence_map` (authored fallback) | improve-band only: proposal quality, ideal project, process page, plain language, case-study outcomes |
| Mature (4.5→5) | `eng_high_maturity_engine` | 4 maintain cards only; no repairs, no upsell |
| Isolated severe gap: proposal follow-up | `eng_proposals_leaking` | cadence repair + follow-up-leak strategic + response standard + repeat-client + follow-up template + pipeline dominase |
| Strong marketing, weak sales | `eng_quote_friction` | RFQ repair, cadence repair, pipeline repair, quote-gate strategic, RFQ dominase — zero marketing/proof cards |
| Founder-dependent demand | `eng_referral_locked` | referral-concentration strategic, proof strategic, partner systematization, portfolio upgrades |
| Boundary current 2 / target 4 | `eng_early_stage_foundations` | early-stage wins over reset at gap 2 (by design; reset takes over at gap ≥2.5) |
| Context: quotes via WhatsApp vs CRM (same answers) | same profile | WhatsApp → `eng-conv-quote-method-upgrade`; CRM → `eng-follow-crm-adoption`. Materially different advice from context alone |
| Tenders + weak credentials | `eng_procurement_blocked` | credentials hub repair, credentials strip, decision-committee card |
| Early stage, modest targets | `eng_early_stage_foundations` | repairs + early-fundamentals strategic + ideal-project |

### Venue
| Scenario | Profile | Key observed decisions |
|---|---|---|
| Very weak, ambitious | `venue_reset_ambitious` | gallery/date-check/tour/review/follow-up repairs + visual-bottleneck strategic + visual & date-check dominase |
| Average | `venue_balanced_evidence_map` | improve band: package tiers, unify channels, tour close, response SLA, curation, testimonials |
| Mature | `venue_high_maturity_engine` | 4 maintain cards only |
| Isolated severe: tours don't close | `venue_tour_no_close` | tour-invite repair + tour-close strategic + tour-next-step quick win + booking-system dominase |
| Beautiful, weak conversion | `venue_dm_chaos` | date-check, cadence, tour repairs; response-speed + tour-close strategics; zero gallery/content cards |
| Weak reputation + seasonal | `venue_seasonal_cliff` | review system repair + reputation strategic + off-peak engine + Maps quick win |
| Undershown (gallery weak, ops strong) | `venue_undershown` | gallery rebuild + visual strategic + visual dominase + hero/Maps quick wins |
| Context: Instagram vs WhatsApp (same answers) | same profile | Instagram → IG-capture rec; WhatsApp → WhatsApp first-reply template rec |
| Off-peak-gaps context | `venue_seasonal_cliff` | off-peak engine, vendor referrals, corporate weekday offer |
| Early stage, modest targets | `venue_early_stage_foundations` | repairs + early strategic + discovery-first dominase (no build upsell) |
| Price opacity | `venue_price_opacity` | package tiers repair, price ranges, price-mystery strategic, budget-fit qualification |

### General-business
| Scenario | Profile | Key observed decisions |
|---|---|---|
| Very weak, ambitious | `gen_reset_ambitious` | offer/CTA/proof/follow-up/mobile repairs + clarity strategic + message-pass dominase |
| Average | `gen_balanced_evidence_map` | improve band, mixed categories |
| Mature | `gen_high_maturity_engine` | 4 maintain cards only |
| Isolated severe: follow-up | `gen_leaky_followup` | cadence repair + follow-up-leak strategic + capture/CRM dominase |
| Strong marketing, weak conversion | `gen_traffic_no_action` | CTA + mobile repairs, conversion-leak strategic, conversion dominase, capture |
| Strong acquisition, weak retention | `gen_one_time_only` | retention-blindspot strategic + retention program |
| Same + one-off purchase context | `gen_one_time_only` | **referral engine replaces retention program** (`exclusiveWith` + context) |
| B2B / high-ticket / founder-led context | same profile as neutral | + high-ticket consultation path + founder handoff |
| B2C / small-ticket / product / local context | same answers | + local Maps/reviews card, proof placement — different set than B2B run |
| No-website context | fallback profile | one-page credible site repair fires only with that context |
| Early stage, modest targets | `gen_early_stage_foundations` | repairs + early-fundamentals strategic |
| WhatsApp overload | `gen_whatsapp_overload` | WhatsApp structure + lead board repairs + quick replies |

## 2. Structural verification

- **Integrity check** (script, all 4 domains): unique IDs; all condition `topicId`/`dimensionId`/map references resolve; all categories valid; all context conditions reference existing fields and *existing option strings* (EN + AR); `exclusiveWith` targets exist; every rec and profile carries complete Arabic fields (`titleAr, whyAr, howAr, websiteImplicationAr, systemImplicationAr, dominaseFitAr, riskNotesAr, summaryAr, riskNoteAr`); every topic has 5 EN + 5 AR level anchors. **PASS (0 failures).**
- **Reachability sweep** (~3.6k–5.7k engine runs per domain: 10 uniform bases, single-topic dips/spikes, pairwise dips, dimension dips, × all context options): **no dead profiles, no unreachable recommendations** in any target domain.
- **Deterministic replay:** every scenario re-run produced an identical `decisionHash`. The engine is pure; data changes cannot affect this, and none did.
- **Web/PDF parity:** `webPdfParity.test.ts` passes for all 4 domains (same normalized object feeds both).
- **No clinic / V1 regression:** `git diff` confirms `clinic-diagnosis.json`, all V1 data, and all engine/runtime code are byte-identical. Clinic scenario test and all engine unit tests pass.

## 3. Defects found and corrected during validation

1. Context recs were silently erased by dedupe/mode caps → context runs looked identical to neutral runs. Fixed with dedicated dedupe groups and priority/impact boosts for context-confirmed recs (eng CRM-adoption, venue WhatsApp first-reply).
2. Generic `eng_ready_to_scale` out-competed the specific `eng_procurement_blocked` in the tender scenario. Fixed by demoting generic-strong profiles to low-specificity `dimensionMin` map conditions (applied to all three domains).
3. Early-stage scenarios received an off-peak campaign rec (venue) targeting "past inquiries" that don't exist yet. Gated on `D4 currentMin 2.5`.
4. Isolated severe follow-up topic (general-business) missed its strategic/dominase cards because the dimension average diluted below thresholds. Fixed with `anyConditions` (severe-topic OR dimension-average).
5. Early-stage strategic/dominase cards were displaced by category caps (engineering). Priority raised so the early-stage story leads for early-stage businesses.
6. `ven-dom-offpeak-engine` unreachable due to a shared dedupe group. Split into its own group.
7. Two stray CJK characters in venue copy (authoring typos). Removed; a script confirms none remain.

## 4. Tests and commands run

- `npx tsx` on all `src/features/diagnosis/v2/__tests__/*.test.ts` — pass, except `experimentalParity.test.ts` which reads a hardcoded Windows path (`C:/Users/domim/Desktop/dominase json/09_PILOT_EXPERIMENTS/...`) unavailable in the validation sandbox. This failure is environmental and pre-existing (fails identically on unmodified checkout); it does not exercise the three changed files.
- `npx tsx` on all `src/features/diagnosis/experimental-v2/__tests__/*.test.ts` — pass.
- `npm run lint` — 0 errors (2 pre-existing warnings in unrelated `src/lib/pdf-empty-module.js`).
- `npx tsc --noEmit` — clean.
- Production build — completed successfully. Sandbox notes: the validation VM enforces a ~45s process cap and has no access to `fonts.googleapis.com`, so the build ran as `next build --experimental-build-mode compile` then `generate` (both exit 0; "Compiled successfully", 24/24 static pages including `/diagnosis` routes, `BUILD_ID` produced) with `NEXT_FONT_GOOGLE_MOCKED_RESPONSES` supplying offline font CSS. The type-check phase skipped by split mode is covered by the separate clean `tsc --noEmit`. A plain `npm run build` on a normal machine is expected to pass identically and should be re-run once outside the sandbox.
- Scenario harness + integrity + reachability scripts (kept out of the repo per deliverable constraints; commands reproducible via `npx tsx` against `resultAdapter`).

## 5. Remaining issues

- `experimentalParity.test.ts` should have its `KNOWLEDGE_ROOT` path made configurable; currently only runnable on the original Windows machine.
- Clinic's context conditions match English option values only; Arabic-mode users won't trigger clinic's 4 context recs. The three strengthened domains match both languages; clinic was left untouched per constraints — worth a follow-up.
- Profile matching cannot see context (engine design). General-business context differentiates recommendations strongly, but profile *titles* remain context-neutral.
- Human review of Arabic copy is recommended before any rollout (native-speaker pass), plus a visual QA session via `/internal/diagnosis-qa` (`DIAGNOSIS_QA_ENABLED=true`) — not possible in this environment.
- Changed topic sets mean stale saved sessions (localStorage answers keyed by topic id) will treat new topics as unanswered (current=1, target=1) for these three domains. V1 remains the default engine, so no production user impact; note for QA.
