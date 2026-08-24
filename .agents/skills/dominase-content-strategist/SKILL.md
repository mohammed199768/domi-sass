# DOMINASE Content Strategist Skill

## 1. Purpose

This skill guides content work for DOMINASE, a premium digital product studio by Mohammed Aldomi.

DOMINASE is the main brand. Mohammed Aldomi is the founder and leader, not the hero subject.

The content must help rewrite the site into a more human, credible, business-aware, bilingual brand voice.

Use this skill when working on DOMINASE copy, bilingual content, claims, case studies, metadata, CTAs, forms, navigation labels, testimonials, or microcopy.

## 2. Source of Truth

Before rewriting anything, always read:

- `docs/DOMINASE_CONTENT_INVENTORY.md`
- `docs/DOMINASE_CONTENT_MAP.json`
- `src/constants/content.ts`
- `src/features/why-change/WhyChangeClient.tsx`
- `src/features/why-us/WhyUsClient.tsx`
- `src/constants/caseStudies.ts`
- `src/constants/projectCaseStudies.ts`
- `src/app/layout.tsx`
- `src/app/why-change/page.tsx`
- `src/app/why-us/page.tsx`
- `src/app/work/page.tsx`

Do not guess content locations.
Do not rewrite from memory.
Use the audit files first.

If content appears hardcoded in a component, confirm whether it is visible, accessibility-facing, metadata-only, schema-only, or technical before changing it.

## 3. Brand Context

DOMINASE is:

- premium
- cinematic
- technical
- calm
- sharp
- business-aware
- human
- precise
- bilingual

DOMINASE is not:

- a generic agency
- a fake huge corporation
- a cheap template studio
- a hype brand
- a purely personal portfolio

The site should feel like:

A focused digital product studio that builds websites, dashboards, booking flows, case-study experiences, and operational interfaces for businesses that need their digital presence to feel sharper, clearer, and more useful.

## 4. Voice Rules

Write with:

- clarity
- confidence
- restraint
- practical business context
- human reasoning
- concrete examples
- credible claims
- calm premium tone

Avoid:

- fake luxury language
- inflated agency slogans
- overusing "cinematic"
- overusing "system"
- overusing "trust / clarity / action"
- robotic phrasing
- vague transformation language
- fake metrics
- fake testimonials
- fake guarantees
- pretending DOMINASE is larger than it is

Prefer sentences that explain why something matters to a business owner, operator, founder, director, or team.

## 5. Brand Hierarchy

Keep the hierarchy clear:

- DOMINASE is the studio brand.
- Mohammed Aldomi is the founder, strategist, and builder behind the studio.
- The client or business problem is often the emotional center of the copy.
- The website, dashboard, booking flow, or interface is the work product.

Do not turn the site into a personal biography.
Do not hide Mohammed Aldomi if founder credibility matters.
Do not make founder language louder than the DOMINASE brand.

## 6. Content Strategy Principles

Every rewritten page should answer:

- What business problem is this addressing?
- What does the visitor feel or struggle with before DOMINASE?
- What changes after the work is done?
- What specific kind of digital surface is being built?
- Why should the reader believe the claim?
- What should the reader do next?

Prefer concrete before/after language over abstract brand adjectives.
Prefer operational examples over decorative descriptions.
Prefer believable specificity over broad promises.

## 7. Bilingual Rules

English and Arabic must be treated as parallel brand experiences, not a primary version plus a weak translation.

When rewriting bilingual content:

- Write English and Arabic together when possible.
- Preserve meaning, tone, and business intent across both languages.
- Do not translate literally if the Arabic becomes stiff.
- Do not leave English labels inside Arabic copy unless they are product terms, brand names, or intentionally bilingual UI labels.
- Check direction-sensitive copy and CTA length.
- Keep Arabic human, direct, and professionally natural.

Flag any missing side as:

- `Arabic missing`
- `English missing`
- `Hardcoded only`
- `Needs Arabic normalization`
- `Possibly duplicated intentionally`

## 8. Claims And Credibility Rules

Never invent:

- metrics
- client names
- testimonials
- revenue outcomes
- conversion increases
- performance scores
- awards
- team size
- years of experience
- tools used in a client project unless confirmed

Before keeping or strengthening a claim, classify it:

- factual claim
- service claim
- quality claim
- performance claim
- business outcome claim
- testimonial/client claim
- unverifiable or risky claim

Use these flags:

- `Safe`
- `Needs evidence`
- `Too generic`
- `Too salesy`
- `Needs human rewrite`
- `Could be stronger`

If evidence is missing, either soften the claim or mark it for owner verification. Do not fabricate proof.

## 9. Page Strategy

### Homepage `/`

Primary job:

Explain what DOMINASE builds and why it matters in human, business-aware language.

The homepage should make the reader understand:

- DOMINASE builds serious digital product surfaces, not generic pages.
- The work includes websites, dashboards, booking flows, forms, case-study experiences, and operational interfaces.
- The studio cares about perception, usability, business flow, and execution quality.
- The next step is a serious project conversation.

Avoid making the homepage only visual, only technical, or only founder-focused.

### `/why-change`

Primary job:

Make the cost of standing still feel real without fearmongering.

The page should feel:

- diagnostic
- strategic
- tense but controlled
- concrete
- business-aware

Good content patterns:

- missed leads
- unclear offers
- outdated impressions
- manual friction
- slow follow-up
- customers who hesitate because the digital path is unclear

Avoid vague doom language.

### `/why-us`

Primary job:

Explain the method behind DOMINASE in a way that builds confidence.

The page should feel:

- precise
- architectural
- calm
- confident
- methodical

Good content patterns:

- diagnose before design
- architecture before visuals
- bilingual thinking from the start
- responsive and performance constraints
- refinement after launch

Avoid sounding like a generic agency process page.

### `/work`

Primary job:

Frame the portfolio as transformations from messy or unclear workflows into organized digital experiences.

The work index should help readers compare projects quickly:

- project type
- before state
- after state
- interface/system built
- reason to open the case study

### `/work/[slug]`

Primary job:

Make each case study credible, specific, and human.

Each case study should include:

- the client/business context
- the before state
- the operational or user friction
- what DOMINASE built
- how the experience changed
- what can be shown as proof
- a CTA connected to the project type

Do not invent results. If no measured result exists, frame outcomes qualitatively and honestly.

## 10. Microcopy Rules

Microcopy includes:

- buttons
- forms
- validation messages
- success messages
- error messages
- preloader text
- aria labels
- alt text
- tooltips
- schema names/descriptions
- mobile nav labels
- language/theme labels

Microcopy should be:

- short
- useful
- human
- accessible
- bilingual where user-facing

Form errors should explain what to fix.
Success messages should confirm the action and set expectation.
ARIA labels should describe the action, not the visual.
Alt text should describe meaningful content, not decorative assets.

## 11. Metadata And SEO Rules

Metadata should be accurate, restrained, and page-specific.

For each route, check:

- `title`
- `description`
- OpenGraph title/description when present
- schema/JSON-LD names and descriptions
- image alt text if visible or meaningful

Do not stuff keywords.
Do not make unverifiable claims in metadata.
Keep descriptions clear enough for a human search result.

## 12. Case Study Rules

Case studies must not read like generic portfolio cards.

Use a simple story spine:

1. Before: what was confusing, manual, scattered, slow, or unclear?
2. Shift: what changed in the structure or experience?
3. Build: what was actually designed or implemented?
4. After: what is now clearer, easier, more organized, or more credible?
5. Proof: what can the reader see in the screenshots, flow, or interface?

Do not claim measured impact unless the project owner has confirmed it.
Do not overstate the client problem.
Do not make the client look careless.
Keep the tone respectful and practical.

## 13. Rewrite Workflow

When asked to rewrite content:

1. Read the source-of-truth files.
2. Identify the route, section, language, and exact current copy.
3. Check the inventory and content map for related strings.
4. Classify claims and risk.
5. Draft the rewrite in English and Arabic if the content is bilingual.
6. Preserve existing structure unless explicitly asked to restructure.
7. Keep changes scoped to content files and relevant metadata.
8. Run validation if any project files change.

When asked only for strategy, do not edit website source files.

## 14. Content Quality Checklist

Before finalizing rewritten DOMINASE copy, verify:

- The copy says what DOMINASE actually does.
- The copy sounds human, not inflated.
- The business reason is clear.
- The CTA matches the reader's likely stage.
- Claims are credible or flagged.
- Arabic and English are both present where needed.
- Hardcoded visible strings are not forgotten.
- Metadata reflects the updated page.
- No fake metrics, fake testimonials, or fake client claims were added.
- DOMINASE remains the main brand.

## 15. Output Expectations

When reporting content work, include:

- files read
- files changed
- route and section changed
- English/Arabic coverage
- claim risks introduced, removed, or softened
- metadata affected
- validation run

If no source files were changed, say so clearly.
