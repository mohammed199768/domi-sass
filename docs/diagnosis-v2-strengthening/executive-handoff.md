# Diagnosis V2 Strengthening — Executive Handoff

## Files changed

Only three files were modified by this work:

- `src/data/diagnosis/v2/engineering-diagnosis.json`
- `src/data/diagnosis/v2/general-business-diagnosis.json`
- `src/data/diagnosis/v2/venue-diagnosis.json`

Created (documentation only): `docs/diagnosis-v2-strengthening/{audit-and-design,validation-report,executive-handoff}.md`.

Untouched by design: `clinic-diagnosis.json`, all V1 data, the V2/experimental engine code, runtime routing and flags, routes, `study-profile-assessment`. Note: the working tree contained unrelated pre-existing modifications (README, home components, layout, four test files with whitespace-only diffs, etc.) before this task started — those are not part of this change set.

## Major before/after differences

| | Before | After |
|---|---|---|
| Profiles | 15 per domain, identical condition patterns across all 3 domains, duplicated entries, Arabic titles like "نمط … أولوية 1" | 13–14 bespoke business states per domain (e.g., "Order Book Runs on the Founder's Network", "Tours Happen, Bookings Don't", "Drowning in WhatsApp"), each naming a governing constraint with a sequencing risk note |
| Recommendations | 48 templated recs, one boilerplate `why`/`how` shared by every topic, categories mislabeled, filler recs | 47–48 hand-authored recs per domain: repair/improve/maintain bands, strategic bottleneck cards, quick wins (effort 1), scoped DOMINASE steps that sometimes advise *against* buying, honest `riskNotes`, all bilingual |
| Context | Collected, never used (0 context conditions) | Engineering: client mix (tenders/procurement), quote method, budget. Venue: main channel, seasonality, event type. General-business: new B2B/B2C, product/service, ticket size, purchase frequency, founder/team-led fields. Context changes which cards appear (verified: identical answers + different context ⇒ different advice; one-off purchases swap the retention program for a referral engine via `exclusiveWith`) |
| Coverage | No proposal quality, founder dependence, tenders, tours, deposits, reviews/Maps, off-peak, retention | 5 new topics + recs covering all domain requirements (specialization → margins for engineering; inquiry → guest experience for venue; demand/conversion/ops/retention constraints for general-business) |

## Readiness per domain

- **Engineering — ready for human review.** 11 scenarios validated; profiles and recs behave; tender/procurement/budget context verified.
- **Venue — ready for human review.** 12 scenarios validated; demand vs response vs trust vs closing vs pricing vs utilization problems produce distinct diagnoses.
- **General-business — ready for human review.** 13 scenarios validated; context materially alters output; retention/referral logic verified. Intake grew by 3 required + 2 optional select fields — confirm the added friction is acceptable.
- **Clinic — unchanged**, regression-tested.

Not production-ready claims are made. V1 remains the default engine for all domains; V2 activates only via `DIAGNOSIS_ENGINE_*` env flags or the dev override.

## Unresolved human-review items

1. Native Arabic copy review (all new profile/rec text; machine-authored to a business register but unreviewed by a native speaker).
2. Visual QA via `/internal/diagnosis-qa` (`DIAGNOSIS_QA_ENABLED=true`) on real screens and PDF prints — sandbox validation covered decisions, not rendering aesthetics.
3. General-business intake length (11 fields, 6 required) — product decision.
4. `experimentalParity.test.ts` hardcodes a Windows path; make configurable.
5. Clinic context conditions match English-only option values (pre-existing); the three new domains match EN+AR — consider aligning clinic later.
6. Stale saved V2 sessions for the three domains will show new topics as unanswered; harmless while V1 is default, but clear local sessions before QA.

## Validation summary

Lint (0 errors), `tsc --noEmit` clean, production build passes (run in split compile/generate phases with offline font mocks due to sandbox limits — see validation report; re-run `npm run build` once on a normal machine), all runnable engine/unit/parity/routing tests pass, integrity check (IDs, references, categories, context options EN+AR, bilingual completeness) passes for all 4 domains, reachability sweep (~14k engine runs) shows no dead profiles or unreachable recommendations, and every scenario replays deterministically (identical `decisionHash`). Details in `validation-report.md`.

## Rollback instructions

Rollback is a data-only revert; no code, flags, or routes changed:

```bash
git checkout -- src/data/diagnosis/v2/engineering-diagnosis.json \
                src/data/diagnosis/v2/general-business-diagnosis.json \
                src/data/diagnosis/v2/venue-diagnosis.json
```

(If the docs should also be removed: `rm -r docs/diagnosis-v2-strengthening`.) Additionally, per-domain kill switches remain available at runtime: leave/return `DIAGNOSIS_ENGINE_ENGINEERING|GENERAL_BUSINESS|VENUE` to `v1` (the default), which bypasses V2 data entirely. The invalid-data guard in `diagnosisRegistryRouter` also falls back to V1 automatically if a V2 file fails its shape check. Pre-change copies of the three files were additionally preserved during the work session.

Note: the stale `.next` build directory was removed and regenerated during the validation build (build artifacts only — gitignored, safe to delete or rebuild at any time).
