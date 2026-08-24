# DOMINASE release SEO URL audit

Audit date: 2026-08-25  
Canonical origin: `https://www.dominase.art`  
Validation basis: Next.js production build, route/source inspection, metadata and structured-data review.

## Audit conventions

- **Status** is the expected production response after the successful static/SSG build. Dynamic diagnosis URLs were validated through their registry and build route.
- **Language** is `AR + EN on one URL`: the interface has an Arabic/English client-side toggle, but no separate indexable locale URLs or `hreflang` alternates. This avoids duplicate locale URLs but limits language-specific search landing pages.
- Every indexable row has a self-referencing canonical and one visible page-level H1 by component contract.
- Global JSON-LD supplies `Organization` and `WebSite`. The schema column lists additional page-specific types.
- `/case-study-lab/manal`, `/internal/diagnosis-qa`, and `/motion-lab` are intentionally excluded from the indexable table because they are lab/QA routes with `noindex` and are disallowed in `robots.txt`.

## Indexable URL table

| URL | Status | Indexable | Title / H1 intent | Canonical | Language | Page schema | Sitemap | Primary intent | Key internal entry points |
|---|---:|:---:|---|:---:|---|---|:---:|---|---|
| `/` | 200 | Yes | Software and digital products; value proposition | Self | AR + EN on one URL | Global Organization, WebSite | Yes | Commercial / brand | Header, logo, footer |
| `/about` | 200 | Yes | About DOMINASE and its product approach | Self | AR + EN on one URL | AboutPage | Yes | Brand trust | Header, footer |
| `/contact` | 200 | Yes | Book a consultation / project context | Self | AR + EN on one URL | ContactPage | Yes | Conversion | Footer and contextual contact links |
| `/diagnosis` | 200 | Yes | Choose a digital growth diagnosis | Self | AR + EN on one URL | WebPage | Yes | Interactive evaluation | Header solutions, footer |
| `/diagnosis/clinic` | 200 | Yes | Clinic growth diagnosis | Self | AR + EN on one URL | WebApplication | Yes | Clinic evaluation | Diagnosis hub |
| `/diagnosis/venue` | 200 | Yes | Venue growth diagnosis | Self | AR + EN on one URL | WebApplication | Yes | Venue evaluation | Diagnosis hub |
| `/diagnosis/engineering` | 200 | Yes | Engineering company growth diagnosis | Self | AR + EN on one URL | WebApplication | Yes | Engineering evaluation | Diagnosis hub |
| `/diagnosis/general-business` | 200 | Yes | General business growth diagnosis | Self | AR + EN on one URL | WebApplication | Yes | Business evaluation | Diagnosis hub |
| `/services` | 200 | Yes | Software development service overview | Self | AR + EN on one URL | Global only | Yes | Commercial category | Header, footer, homepage |
| `/services/web-development` | 200 | Yes | Web development for clarity, SEO, and conversion | Self | AR + EN on one URL | Service, BreadcrumbList, FAQPage | Yes | Service lead generation | Services hub, related insights/work, footer |
| `/services/custom-systems` | 200 | Yes | Custom operational systems and dashboards | Self | AR + EN on one URL | Service, BreadcrumbList, FAQPage | Yes | Service lead generation | Services hub, related insights/work, footer |
| `/services/education-platforms` | 200 | Yes | Branded education platform development | Self | AR + EN on one URL | Service, BreadcrumbList, FAQPage | Yes | Service lead generation | Services hub, markets, footer |
| `/services/clinic-websites` | 200 | Yes | Clinic websites, booking, tracking, and systems | Self | AR + EN on one URL | Service, BreadcrumbList, FAQPage | Yes | Service lead generation | Services hub, related insights/work, footer |
| `/work` | 200 | Yes | Selected websites, systems, and platforms | Self | AR + EN on one URL | CollectionPage | Yes | Portfolio proof | Header, footer, homepage |
| `/work/pulse-gym` | 200 | Yes | Gym member and operations product story | Self | AR + EN on one URL | CreativeWork, BreadcrumbList | Yes | Proof / custom systems | Work hub, homepage, related pathways |
| `/work/our-clinic` | 200 | Yes | Clinic patient, booking, and operations story | Self | AR + EN on one URL | CreativeWork, BreadcrumbList | Yes | Proof / clinic systems | Work hub, homepage, related pathways |
| `/work/sultan-shadi` | 200 | Yes | Identity-led editorial website story | Self | AR + EN on one URL | CreativeWork, BreadcrumbList | Yes | Proof / web development | Work hub, homepage, related pathways |
| `/work/qasr-alfarah` | 200 | Yes | Venue website and conversion story | Self | AR + EN on one URL | CreativeWork, BreadcrumbList | Yes | Proof / venue website | Work hub, homepage |
| `/work/horvath-survey` | 200 | Yes | Survey product experience story | Self | AR + EN on one URL | CreativeWork, BreadcrumbList | Yes | Proof / custom product | Work hub, homepage |
| `/work/manal-alhihi` | 200 | Yes | Professional identity and website story | Self | AR + EN on one URL | CreativeWork, BreadcrumbList | Yes | Proof / web development | Work hub, homepage |
| `/work/curevie` | 200 | Yes | Healthcare digital experience story | Self | AR + EN on one URL | CreativeWork, BreadcrumbList | Yes | Proof / clinic systems | Work hub, homepage |
| `/insights` | 200 | Yes | Software, SEO, UX, CTA, and systems articles | Self | AR + EN on one URL | Global only | Yes | Informational category | Header, footer, homepage |
| `/insights/seo-discoverability-2026` | 200 | Yes | Search discoverability foundations | Self | AR + EN on one URL | BlogPosting, BreadcrumbList | Yes | Informational SEO | Insights hub, service/work pathways |
| `/insights/cta-that-matches-intent` | 200 | Yes | Match calls to action to user intent | Self | AR + EN on one URL | BlogPosting, BreadcrumbList | Yes | Conversion education | Insights hub, service/work pathways |
| `/insights/website-as-a-system` | 200 | Yes | Connect a website to operations and CRM | Self | AR + EN on one URL | BlogPosting, BreadcrumbList | Yes | Systems education | Insights hub, service/work pathways |
| `/insights/customer-behavior-changed` | 200 | Yes | Modern customer expectations and mobile UX | Self | AR + EN on one URL | BlogPosting, BreadcrumbList | Yes | UX education | Insights hub, service/work pathways |
| `/insights/pixels-crm-and-the-path-after-ads` | 200 | Yes | Connect campaigns, tracking, booking, and CRM | Self | AR + EN on one URL | BlogPosting, BreadcrumbList | Yes | Measurement education | Insights hub, service/work pathways |
| `/markets/jordan` | 200 | Yes | Software development company in Jordan | Self | AR + EN on one URL | WebPage | Yes | Geographic commercial | Footer solutions, service links |
| `/markets/saudi-arabia` | 200 | Yes | Digital products for the Saudi market | Self | AR + EN on one URL | WebPage | Yes | Geographic commercial | Footer solutions, service links |
| `/studio` | 200 | Yes | DOMINASE studio and capabilities | Self | AR + EN on one URL | CollectionPage | Yes | Brand / capability | Header company, footer |
| `/why-change` | 200 | Yes | Why a website should become a measurable journey | Self | AR + EN on one URL | WebPage | Yes | Problem awareness | Footer company, homepage pathways |
| `/why-us` | 200 | Yes | Why DOMINASE and how the team works | Self | AR + EN on one URL | AboutPage | Yes | Vendor consideration | Header, footer |

## Intentional non-indexable routes

| URL | Expected status | Directive | Reason |
|---|---:|---|---|
| `/case-study-lab/manal` | 200 | `noindex, nofollow`; robots disallow | Internal case-study laboratory |
| `/internal/diagnosis-qa` | 200 | `noindex, nofollow`; robots disallow | Internal diagnosis QA |
| `/motion-lab` | 200 | `noindex, nofollow`; robots disallow | Internal motion laboratory |

## Release findings

1. Titles, descriptions, canonicals, Open Graph, Twitter metadata, sitemap generation, and schema are present across the core public routes.
2. Service pages expose `Service`, breadcrumb, and FAQ structured data; article pages use dated `BlogPosting`; work pages use `CreativeWork` and breadcrumb data.
3. Sitemap dates are deterministic rather than changing on every request. Editorial entries use their real published dates.
4. The release adds a semantic relationship network among service, work, and insight pages, plus compact footer discovery paths. This reduces orphan risk and gives crawlers and users contextual next steps.
5. The main unresolved strategic SEO limitation is the one-URL language toggle. Separate Arabic and English routes with `hreflang` would require an information-architecture migration and should be treated as a future project, not a release-day patch.
6. Search performance, indexing coverage, conversions, and Core Web Vitals require production analytics and search-console baselines. No unverified KPI values are asserted in this audit.
