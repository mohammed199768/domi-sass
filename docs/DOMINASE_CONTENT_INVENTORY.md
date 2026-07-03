# DOMINASE Content Inventory

Documentation-only inventory generated from the current workspace. This audit does not rewrite copy and does not change website behavior.

## Audit Snapshot

- Content items found: 1097
- Hardcoded visible/accessibility strings found: 290
- Metadata items found: 19
- Claims flagged: 17
- Rewrite opportunities flagged: 10
- Full machine-readable export: `docs/DOMINASE_CONTENT_MAP.json`

## Files Inspected

- `src/constants/content.ts`
- `src/constants/caseStudies.ts`
- `src/constants/projectCaseStudies.ts`
- `src/constants/contact.ts`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/why-change/page.tsx`
- `src/app/why-us/page.tsx`
- `src/app/work/page.tsx`
- `src/app/work/[slug]/page.tsx`
- `src/app/motion-lab/page.tsx`
- `src/app/case-study-lab/manal/page.tsx`
- `src/features/home/**`
- `src/features/why-change/**`
- `src/features/why-us/**`
- `src/features/work/**`
- `src/features/case-studies/**`
- `src/features/case-study-lab/**`
- `src/components/Header.tsx`
- `src/components/MobileNav.tsx`
- `src/components/Footer.tsx`
- `src/components/BrandPreloader.tsx`
- `src/components/ThemeToggle.tsx`
- `src/components/LanguageToggle.tsx`
- `src/components/WhyPageCtaCluster.tsx`
- `src/components/SectionSignalField.tsx`
- `public/** asset names`

## 1. Content Source Map

This table groups the exact current text by source/component. The JSON export contains every extracted item individually with route, section, file path, component, content type, and notes.

| Page / section | Content type | Exact current text | Language | File path | Component/export | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| / | content-config | Home / Why Us? / Expertise / Work / Why Change? / Case Studies / Signals / Contact | en | src/constants/content.ts | content | 302 strings; full list in JSON. |
| /work/[slug] | case-study-content | Manal Alhihi Training Platform Case Study \| منصة منال الحيحي / A bilingual case study about transforming scattered courses, files, and manual follow-up into an organized training platform. / Training platform case study / Manal Alhihi: From scattered courses to an organized training platform / Turning a training experience built around distributed links, files, and manual follow-up into one clear digital platform for students, courses, attendance, and content. / Training was spread across too many places. / The learning experience depended on disconnected tools and repeated manual coordination. / Scattered files | neutral | src/constants/caseStudies.ts | caseStudies | 506 strings; full list in JSON. |
| / | project-showcase-content | Qasr Al-Farah / Qasr Al-Farah / Wedding Hall Operating Platform / منصة تشغيل لقاعات الأفراح / A complete venue platform shaped as a premium public experience, booking flow, checkout, admin system, and guest memory layer. / منصة متكاملة للقاعات تجمع بين تجربة عامة فاخرة، مسار حجز، دفع، إدارة، وطبقة ذكريات للضيوف. / Brand Entrance / مدخل العلامة | en | src/constants/projectCaseStudies.ts | projectCaseStudies | 96 strings; full list in JSON. |
| /why-change | page-copy | DOMINASE / DIAGNOSTIC / Standing still is not neutral. / Markets move. Attention moves. Expectations rise. A website that stays the same is quietly falling behind — and the loss compounds before it is ever noticed. / WHY / CHANGE / SIGNAL / 01 / Four forces already in motion / The pressure map. / Attention moved | en | src/features/why-change/WhyChangeClient.tsx | WhyChangeClient.COPY | 84 strings; full list in JSON. |
| /why-us | page-copy | DOMINASE / METHOD / Built like a system, not a template. / We design websites the way engineers design structures: diagnose first, architect second, decorate never. What you see is the surface of a working system. / WHY / US / METHOD / 04-STAGE / The DOMINASE method / Four stages. One system. / Diagnose | en | src/features/why-us/WhyUsClient.tsx | WhyUsClient.COPY | 90 strings; full list in JSON. |
| sitewide | metadata | DOMINASE — Cinematic Websites & Operational Digital Systems / Dominase builds cinematic websites, SaaS interfaces, and operational digital systems for businesses that need more than a page. / DOMINASE — Cinematic Websites & Operational Digital Systems / Dominase builds cinematic websites, SaaS interfaces, and operational digital systems for businesses that need more than a page. / https://www.dominase.art / DOMINASE / summary_large_image / DOMINASE — Cinematic Websites & Operational Digital Systems | en | src/app/layout.tsx | metadata | 9 strings; full list in JSON. |
| /why-change | metadata | Why Change? — DOMINASE / Standing still is not neutral. A strategic diagnosis of why static websites quietly lose attention, trust, and customers — and what a real digital system changes. | en | src/app/why-change/page.tsx | metadata | 2 string(s). |
| /why-us | metadata | Why Us? — DOMINASE / Built like a system, not a template. The DOMINASE method: diagnose, architect, build, refine — cinematic, bilingual digital systems engineered around your customer's next step. | en | src/app/why-us/page.tsx | metadata | 2 string(s). |
| /work | metadata | Case Studies — DOMINASE / A collection of DOMINASE digital product case studies showing how scattered workflows became clearer platforms, dashboards, and digital systems. | en | src/app/work/page.tsx | metadata | 2 string(s). |
| /motion-lab | metadata | Motion Lab \| DOMINASE / Isolated scroll animation experiments for DOMINASE product storytelling. | en | src/app/motion-lab/page.tsx | metadata | 2 string(s). |
| /case-study-lab/manal | metadata | منال الحيحي — مختبر دراسة حالة / تجربة حركية لتحويل دورات مبعثرة إلى منصة تدريب منظمة. | ar | src/app/case-study-lab/manal/page.tsx | metadata | 2 string(s). |

## 2. Route-By-Route Content

### `/`

#### Hero

| Area | Key | Language | Exact current text | Source |
| --- | --- | --- | --- | --- |
| Hero | hero.title | en | DIGITAL PRODUCT STUDIO | src/constants/content.ts |
| Hero | hero.headline | en | Digital systems built to move business. | src/constants/content.ts |
| Hero | hero.subheading | en | We design websites, dashboards, and product experiences that turn complexity into trust, clarity, and action. | src/constants/content.ts |
| Hero | hero.primaryCTA | en | Start the build | src/constants/content.ts |
| Hero | hero.secondaryCTA | en | View the method | src/constants/content.ts |
| Hero | hero.title | ar | استوديو منتجات رقمية | src/constants/content.ts |
| Hero | hero.headline | ar | أنظمة رقمية تُحرّك العمل بوضوح. | src/constants/content.ts |
| Hero | hero.subheading | ar | نبني مواقع، لوحات تحكم، وتجارب رقمية تحوّل التعقيد إلى ثقة، وضوح، وفعل. | src/constants/content.ts |
| Hero | hero.primaryCTA | ar | ابدأ البناء | src/constants/content.ts |
| Hero | hero.secondaryCTA | ar | شاهد المنهجية | src/constants/content.ts |

#### Selected Work / Portfolio

| Area | Key | Language | Exact current text | Source |
| --- | --- | --- | --- | --- |
| Selected Work / Portfolio | portfolio.title | en | Selected Product Work | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.subtitle | en | Real interface systems spanning booking platforms, healthcare experiences, surveys, education, dashboards, and conversion-focused presentation. | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.projectCTA | en | View Project | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.items.0.title | en | Qasr Al-Farah | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.items.0.category | en | Wedding Hall Operating Platform | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.items.0.desc | en | A full wedding-hall digital platform combining a premium public website, booking flow, checkout, admin dashboard, digital invitations, RSVP, guest photo uploads, and memory-book experiences. | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.items.1.title | en | Curevie | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.items.1.category | en | Healthcare Digital Experience | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.items.1.desc | en | A healthcare-oriented digital experience shaped around trust, clarity, clean presentation, and a polished medical-grade interface. | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.items.2.title | en | Horvath Survey | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.items.2.category | en | Survey & Business Data Platform | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.items.2.desc | en | A structured survey and data-capture experience focused on readable flows, clean forms, and practical business insight. | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.items.3.title | en | Manal Alhihi Educational Platform | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.items.3.category | en | Educational Platform | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.items.3.desc | en | An educational platform concept built around organized learning content, clear navigation, and a professional student-facing experience. | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.cta | en | See More on GitHub | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.title | ar | أعمال مختارة | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.subtitle | ar | أنظمة واجهات حقيقية تشمل منصات حجز، تجارب صحية، استبيانات، تعليم، لوحات تحكم، وعرض تسويقي موجه للتحويل. | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.projectCTA | ar | عرض المشروع | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.items.0.title | ar | Qasr Al-Farah | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.items.0.category | ar | منصة تشغيل لقاعات الأفراح | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.items.0.desc | ar | منصة رقمية متكاملة لقاعات الأفراح تجمع بين موقع تسويقي فاخر، نظام حجز، دفع، لوحة إدارة، دعوات رقمية، RSVP، رفع صور الضيوف، وتجربة كتاب ذكريات. | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.items.1.title | ar | Curevie | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.items.1.category | ar | تجربة رقمية طبية | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.items.1.desc | ar | تجربة رقمية في المجال الصحي مبنية حول الثقة، الوضوح، العرض النظيف، وواجهة احترافية بطابع طبي. | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.items.2.title | ar | Horvath Survey | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.items.2.category | ar | منصة استبيانات وبيانات أعمال | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.items.2.desc | ar | تجربة استبيانات وجمع بيانات منظمة تركز على وضوح النماذج، سهولة الإدخال، واستخراج معلومات عملية للأعمال. | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.items.3.title | ar | Manal Alhihi Educational Platform | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.items.3.category | ar | منصة تعليمية | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.items.3.desc | ar | منصة تعليمية مبنية حول تنظيم المحتوى، وضوح التنقل، وتجربة احترافية للطلاب والمستخدمين. | src/constants/content.ts |
| Selected Work / Portfolio | portfolio.cta | ar | المزيد على GitHub | src/constants/content.ts |

#### Method / Beneath Interface

| Area | Key | Language | Exact current text | Source |
| --- | --- | --- | --- | --- |
| Method / Beneath Interface | beneathInterface.eyebrow | en | BUILD SYSTEM | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.title | en | Beneath the Interface | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.intro | en | DOMINASE reveals the system behind a serious digital experience. | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.cta | en | Discuss a Project | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.0.index | en | 01 | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.0.label | en | Surface | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.0.headline | en | A website is only the surface. | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.0.body | en | Most visitors see the finished interface. DOMINASE builds what makes it work. | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.1.index | en | 02 | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.1.label | en | Presentation | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.1.headline | en | The visible layer explains the business, shapes perception, and builds trust. | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.1.body | en | Cinematic marketing pages with strong visual direction, conversion-aware structure, and purposeful motion. | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.2.index | en | 03 | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.2.label | en | Interaction | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.2.headline | en | The flow layer guides people through forms, bookings, surveys, RSVP, and next steps. | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.2.body | en | Every step designed to feel clear, fast, and reliable for real users. | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.3.index | en | 04 | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.3.label | en | Logic | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.3.headline | en | The logic layer handles rules, validation, data capture, and business paths. | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.3.body | en | Conditional flows, form intelligence, and routing that makes the experience trustworthy. | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.4.index | en | 05 | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.4.label | en | Operations | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.4.headline | en | The operations layer organizes requests, bookings, content, and admin workflows. | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.4.body | en | Clean dashboards and admin screens so the business runs clearly behind the scenes. | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.5.index | en | 06 | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.5.label | en | Operating Layer | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.5.headline | en | One connected system built to turn attention into action. | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.5.body | en | All four layers — assembled into a single DOMINASE digital operating layer. | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.eyebrow | ar | BUILD SYSTEM | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.title | ar | خلف الواجهة | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.intro | ar | يكشف DOMINASE النظام الذي يقف خلف التجربة الرقمية الجادة. | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.cta | ar | ناقش مشروعك | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.0.index | ar | 01 | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.0.label | ar | السطح | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.0.headline | ar | الموقع هو الطبقة الظاهرة فقط. | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.0.body | ar | معظم الزوار يرون الواجهة النهائية. DOMINASE يبني ما يجعلها تعمل. | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.1.index | ar | 02 | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.1.label | ar | Presentation | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.1.headline | ar | الطبقة الظاهرة تشرح العمل، تشكّل الانطباع، وتبني الثقة. | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.1.body | ar | صفحات تسويقية سينمائية بتوجه بصري قوي، هيكل موجه للتحويل، وحركة هادفة. | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.2.index | ar | 03 | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.2.label | ar | Interaction | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.2.headline | ar | طبقة التفاعل توجه المستخدم عبر النماذج، الحجوزات، الاستبيانات، RSVP، والخطوة التالية. | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.2.body | ar | كل خطوة مصممة لتكون واضحة وسريعة وموثوقة للمستخدمين الحقيقيين. | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.3.index | ar | 04 | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.3.label | ar | Logic | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.3.headline | ar | طبقة المنطق تدير القواعد، التحقق، جمع البيانات، ومسارات العمل. | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.3.body | ar | مسارات شرطية، ذكاء النماذج، وتوجيه البيانات الذي يجعل التجربة موثوقة. | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.4.index | ar | 05 | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.4.label | ar | Operations | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.4.headline | ar | طبقة التشغيل تنظم الطلبات، الحجوزات، المحتوى، ولوحات الإدارة. | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.4.body | ar | لوحات تحكم نظيفة وشاشات إدارة حتى يعمل العمل بوضوح خلف الشاشة. | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.5.index | ar | 06 | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.5.label | ar | Operating Layer | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.5.headline | ar | نظام واحد متصل مبني لتحويل الانتباه إلى إجراء. | src/constants/content.ts |
| Method / Beneath Interface | beneathInterface.scenes.5.body | ar | جميع الطبقات الأربع — مجمّعة في طبقة تشغيل رقمية واحدة من DOMINASE. | src/constants/content.ts |

#### Marketing / Services / Problem / Solution

| Area | Key | Language | Exact current text | Source |
| --- | --- | --- | --- | --- |
| Marketing / Services / Problem / Solution | services.title | en | What DOMINASE Builds | src/constants/content.ts |
| Marketing / Services / Problem / Solution | services.subtitle | en | Cinematic presentation, business logic, and polished frontend execution shaped as one studio process. | src/constants/content.ts |
| Marketing / Services / Problem / Solution | services.items.0.title | en | Cinematic Websites | src/constants/content.ts |
| Marketing / Services / Problem / Solution | services.items.0.desc | en | Premium marketing websites with strong visual direction, precise responsive layouts, purposeful motion, and conversion-aware sections. | src/constants/content.ts |
| Marketing / Services / Problem / Solution | services.items.1.title | en | SaaS & Dashboard Interfaces | src/constants/content.ts |
| Marketing / Services / Problem / Solution | services.items.1.desc | en | Clean operational screens for admin panels, booking management, content flows, data capture, and business workflows. | src/constants/content.ts |
| Marketing / Services / Problem / Solution | services.items.2.title | en | Product Flows | src/constants/content.ts |
| Marketing / Services / Problem / Solution | services.items.2.desc | en | Booking, checkout, surveys, RSVP, education, and onboarding flows designed to feel clear, fast, and reliable for real users. | src/constants/content.ts |
| Marketing / Services / Problem / Solution | services.cta | en | Discuss a Project | src/constants/content.ts |
| Marketing / Services / Problem / Solution | services.title | ar | ماذا تبني DOMINASE | src/constants/content.ts |
| Marketing / Services / Problem / Solution | services.subtitle | ar | عرض سينمائي، منطق أعمال، وتنفيذ واجهات مصقول ضمن عملية استوديو واحدة. | src/constants/content.ts |
| Marketing / Services / Problem / Solution | services.items.0.title | ar | مواقع سينمائية | src/constants/content.ts |
| Marketing / Services / Problem / Solution | services.items.0.desc | ar | مواقع تسويقية فاخرة بتوجه بصري قوي، تخطيطات متجاوبة دقيقة، حركة هادفة، وأقسام مصممة للتحويل. | src/constants/content.ts |
| Marketing / Services / Problem / Solution | services.items.1.title | ar | واجهات SaaS ولوحات تحكم | src/constants/content.ts |
| Marketing / Services / Problem / Solution | services.items.1.desc | ar | شاشات تشغيلية نظيفة للوحات الإدارة، إدارة الحجوزات، مسارات المحتوى، جمع البيانات، وسير عمل الشركات. | src/constants/content.ts |
| Marketing / Services / Problem / Solution | services.items.2.title | ar | مسارات المنتجات | src/constants/content.ts |
| Marketing / Services / Problem / Solution | services.items.2.desc | ar | حجز، دفع، استبيانات، RSVP، تعليم، وتجارب إدخال مصممة لتكون واضحة وسريعة وموثوقة للمستخدمين. | src/constants/content.ts |
| Marketing / Services / Problem / Solution | services.cta | ar | ناقش مشروعك | src/constants/content.ts |

#### Testimonials

| Area | Key | Language | Exact current text | Source |
| --- | --- | --- | --- | --- |
| Testimonials | testimonials.title | en | Proof Signals | src/constants/content.ts |
| Testimonials | testimonials.subtitle | en | The studio is built around practical product surfaces, not placeholder praise. | src/constants/content.ts |
| Testimonials | testimonials.items.0.quote | en | Mohammed brought a calm, organized way of thinking to our digital presence. The Curevie experience feels clear, trusted, and polished without losing the human side we care about. | src/constants/content.ts |
| Testimonials | testimonials.items.0.author | en | Dr. Ahmad Al-Akhras | src/constants/content.ts |
| Testimonials | testimonials.items.0.role | en | Director, Curevie | src/constants/content.ts |
| Testimonials | testimonials.items.1.quote | en | Working with Dominase felt easy and professional from the first conversation. Mohammed understood the brand direction quickly and turned the idea into an interface that feels sharp, practical, and ready for real users. | src/constants/content.ts |
| Testimonials | testimonials.items.1.author | en | Sultan Al-Hajj | src/constants/content.ts |
| Testimonials | testimonials.items.1.role | en | Director, Inkspire | src/constants/content.ts |
| Testimonials | testimonials.items.2.quote | en | The final result had the kind of structure and visual confidence we needed. Mohammed paid attention to the small details, explained the choices clearly, and delivered work that genuinely elevated our company image. | src/constants/content.ts |
| Testimonials | testimonials.items.2.author | en | Eng. Ahmad Khaled | src/constants/content.ts |
| Testimonials | testimonials.items.2.role | en | Owner, Engineering Company | src/constants/content.ts |
| Testimonials | testimonials.cta | en | Start a Serious Build | src/constants/content.ts |
| Testimonials | testimonials.title | ar | إشارات الثقة | src/constants/content.ts |
| Testimonials | testimonials.subtitle | ar | هذا الاستوديو مبني حول أسطح منتجات عملية وليس آراء عملاء وهمية. | src/constants/content.ts |
| Testimonials | testimonials.items.0.quote | ar | Mohammed Aldomi تعامل مع حضور Curevie الرقمي بطريقة منظمة وهادئة. النتيجة كانت تجربة واضحة، موثوقة، ومصقولة، وفي نفس الوقت حافظت على الجانب الإنساني الذي نهتم به. | src/constants/content.ts |
| Testimonials | testimonials.items.0.author | ar | الدكتور أحمد الأخرس | src/constants/content.ts |
| Testimonials | testimonials.items.0.role | ar | مدير شركة Curevie | src/constants/content.ts |
| Testimonials | testimonials.items.1.quote | ar | التعامل مع Dominase كان مريحاً واحترافياً من أول نقاش. فهم Mohammed Aldomi اتجاه العلامة بسرعة، وحوّل الفكرة إلى واجهة حادة، عملية، ومناسبة لمستخدمين حقيقيين. | src/constants/content.ts |
| Testimonials | testimonials.items.1.author | ar | سلطان الحاج | src/constants/content.ts |
| Testimonials | testimonials.items.1.role | ar | مدير شركة Inkspire | src/constants/content.ts |
| Testimonials | testimonials.items.2.quote | ar | النتيجة النهائية كان فيها التنظيم والثقة البصرية التي كنا نحتاجها. Mohammed Aldomi اهتم بالتفاصيل الصغيرة، وشرح اختياراته بوضوح، وقدّم عملاً رفع صورة الشركة فعلاً. | src/constants/content.ts |
| Testimonials | testimonials.items.2.author | ar | المهندس أحمد خالد | src/constants/content.ts |
| Testimonials | testimonials.items.2.role | ar | صاحب شركة هندسية | src/constants/content.ts |
| Testimonials | testimonials.cta | ar | ابدأ بناءً جاداً | src/constants/content.ts |

#### Final CTA

| Area | Key | Language | Exact current text | Source |
| --- | --- | --- | --- | --- |
| Final CTA | finalCTA.title | en | Ready to Build a Sharper Digital Product? | src/constants/content.ts |
| Final CTA | finalCTA.subtext | en | Bring the project, the business context, and the ambition. DOMINASE will help turn it into a polished interface people can trust. | src/constants/content.ts |
| Final CTA | finalCTA.primaryCTA | en | Start a Build | src/constants/content.ts |
| Final CTA | finalCTA.secondaryCTA | en | View the Work | src/constants/content.ts |
| Final CTA | finalCTA.reassurance | en | Available for focused websites, product interfaces, and operational systems. | src/constants/content.ts |
| Final CTA | finalCTA.title | ar | جاهز لبناء منتج رقمي أوضح؟ | src/constants/content.ts |
| Final CTA | finalCTA.subtext | ar | أحضر المشروع، سياق العمل، والطموح. ستساعدك DOMINASE في تحويله إلى واجهة مصقولة يمكن للمستخدمين الوثوق بها. | src/constants/content.ts |
| Final CTA | finalCTA.primaryCTA | ar | ابدأ مشروعك | src/constants/content.ts |
| Final CTA | finalCTA.secondaryCTA | ar | شاهد الأعمال | src/constants/content.ts |
| Final CTA | finalCTA.reassurance | ar | متاح للمواقع المركزة، واجهات المنتجات، والأنظمة التشغيلية. | src/constants/content.ts |

#### Contact / Footer

| Area | Key | Language | Exact current text | Source |
| --- | --- | --- | --- | --- |
| Contact / Footer | contact.title | en | Let's Build Something Useful | src/constants/content.ts |
| Contact / Footer | contact.subtitle | en | Send a message if your business needs a polished website, a SaaS-style interface, a booking flow, or a sharper digital system. | src/constants/content.ts |
| Contact / Footer | contact.info.phone | en | +962779667168 | src/constants/content.ts |
| Contact / Footer | contact.info.email | en | mohammed.aldomi68@gmail.com | src/constants/content.ts |
| Contact / Footer | contact.info.address | en | Amman, Jordan | src/constants/content.ts |
| Contact / Footer | contact.form.name | en | Name | src/constants/content.ts |
| Contact / Footer | contact.form.email | en | Email | src/constants/content.ts |
| Contact / Footer | contact.form.phone | en | Phone Number | src/constants/content.ts |
| Contact / Footer | contact.form.message | en | Project Details | src/constants/content.ts |
| Contact / Footer | contact.form.submit | en | Send Message | src/constants/content.ts |
| Contact / Footer | contact.portal.eyebrow | en | The decision point | src/constants/content.ts |
| Contact / Footer | contact.portal.panelLabel | en | Signal capture | src/constants/content.ts |
| Contact / Footer | contact.portal.fields.name.label | en | Name | src/constants/content.ts |
| Contact / Footer | contact.portal.fields.name.placeholder | en | Your full name | src/constants/content.ts |
| Contact / Footer | contact.portal.fields.phone.label | en | Phone number | src/constants/content.ts |
| Contact / Footer | contact.portal.fields.phone.placeholder | en | Best number to reach you | src/constants/content.ts |
| Contact / Footer | contact.portal.fields.company.label | en | Company | src/constants/content.ts |
| Contact / Footer | contact.portal.fields.company.placeholder | en | Company (optional) | src/constants/content.ts |
| Contact / Footer | contact.portal.submit | en | Start the conversation | src/constants/content.ts |
| Contact / Footer | contact.portal.submitting | en | Sending… | src/constants/content.ts |
| Contact / Footer | contact.portal.errors.name | en | Please enter your name. | src/constants/content.ts |
| Contact / Footer | contact.portal.errors.phone | en | Please enter a phone number. | src/constants/content.ts |
| Contact / Footer | contact.portal.errors.submit | en | Something went wrong. Please try again, or reach me directly below. | src/constants/content.ts |
| Contact / Footer | contact.portal.errors.config | en | Contact form is not configured. Set NEXT_PUBLIC_FORMSPREE_ENDPOINT. | src/constants/content.ts |
| Contact / Footer | contact.portal.success.eyebrow | en | Signal received | src/constants/content.ts |
| Contact / Footer | contact.portal.success.title | en | Your request was sent | src/constants/content.ts |
| Contact / Footer | contact.portal.success.body | en | You just took the first step toward changing how your project shows up to the world. Mohammed will review the details and get back to you soon. | src/constants/content.ts |
| Contact / Footer | contact.portal.success.button | en | Send another message | src/constants/content.ts |
| Contact / Footer | contact.portal.channels.heading | en | Direct routes | src/constants/content.ts |
| Contact / Footer | contact.portal.channels.whatsapp.label | en | Message on WhatsApp | src/constants/content.ts |
| Contact / Footer | contact.portal.channels.whatsapp.caption | en | WhatsApp | src/constants/content.ts |
| Contact / Footer | contact.portal.channels.whatsapp.helper | en | Fastest reply | src/constants/content.ts |
| Contact / Footer | contact.portal.channels.phone.label | en | Call by phone | src/constants/content.ts |
| Contact / Footer | contact.portal.channels.phone.caption | en | Call | src/constants/content.ts |
| Contact / Footer | contact.portal.channels.phone.helper | en | Talk directly | src/constants/content.ts |
| Contact / Footer | contact.portal.channels.email.label | en | Send an email | src/constants/content.ts |
| Contact / Footer | contact.portal.channels.email.caption | en | Email | src/constants/content.ts |
| Contact / Footer | contact.portal.channels.email.helper | en | Formal details | src/constants/content.ts |
| Contact / Footer | contact.title | ar | لنبنِ شيئاً مفيداً | src/constants/content.ts |
| Contact / Footer | contact.subtitle | ar | أرسل رسالة إذا كان عملك يحتاج موقعاً مصقولاً، واجهة بأسلوب SaaS، مسار حجز، أو نظاماً رقمياً أوضح. | src/constants/content.ts |
| Contact / Footer | contact.info.phone | ar | +962779667168 | src/constants/content.ts |
| Contact / Footer | contact.info.email | ar | mohammed.aldomi68@gmail.com | src/constants/content.ts |
| Contact / Footer | contact.info.address | ar | عمّان، الأردن | src/constants/content.ts |
| Contact / Footer | contact.form.name | ar | الاسم | src/constants/content.ts |
| Contact / Footer | contact.form.email | ar | البريد الإلكتروني | src/constants/content.ts |
| Contact / Footer | contact.form.phone | ar | رقم الهاتف | src/constants/content.ts |
| Contact / Footer | contact.form.message | ar | تفاصيل المشروع | src/constants/content.ts |
| Contact / Footer | contact.form.submit | ar | أرسل الرسالة | src/constants/content.ts |
| Contact / Footer | contact.portal.eyebrow | ar | نقطة القرار | src/constants/content.ts |
| Contact / Footer | contact.portal.panelLabel | ar | التقاط الإشارة | src/constants/content.ts |
| Contact / Footer | contact.portal.fields.name.label | ar | الاسم | src/constants/content.ts |
| Contact / Footer | contact.portal.fields.name.placeholder | ar | اسمك الكامل | src/constants/content.ts |
| Contact / Footer | contact.portal.fields.phone.label | ar | رقم الهاتف | src/constants/content.ts |
| Contact / Footer | contact.portal.fields.phone.placeholder | ar | أفضل رقم للتواصل معك | src/constants/content.ts |
| Contact / Footer | contact.portal.fields.company.label | ar | اسم الشركة | src/constants/content.ts |
| Contact / Footer | contact.portal.fields.company.placeholder | ar | اسم الشركة (اختياري) | src/constants/content.ts |
| Contact / Footer | contact.portal.submit | ar | ابدأ المحادثة | src/constants/content.ts |
| Contact / Footer | contact.portal.submitting | ar | جاري الإرسال… | src/constants/content.ts |
| Contact / Footer | contact.portal.errors.name | ar | الرجاء إدخال اسمك. | src/constants/content.ts |
| Contact / Footer | contact.portal.errors.phone | ar | الرجاء إدخال رقم الهاتف. | src/constants/content.ts |
| Contact / Footer | contact.portal.errors.submit | ar | حدث خطأ ما. حاول مرة أخرى، أو تواصل معي مباشرة بالأسفل. | src/constants/content.ts |
| Contact / Footer | contact.portal.errors.config | ar | نموذج التواصل غير مهيأ. الرجاء ضبط NEXT_PUBLIC_FORMSPREE_ENDPOINT. | src/constants/content.ts |
| Contact / Footer | contact.portal.success.eyebrow | ar | تم استلام الإشارة | src/constants/content.ts |
| Contact / Footer | contact.portal.success.title | ar | تم إرسال طلبك بنجاح | src/constants/content.ts |
| Contact / Footer | contact.portal.success.body | ar | أخذت أول خطوة في القرار الذي قد يغيّر طريقة ظهور مشروعك للعالم. سيراجع Mohammed التفاصيل ويتواصل معك قريبًا. | src/constants/content.ts |
| Contact / Footer | contact.portal.success.button | ar | إرسال رسالة أخرى | src/constants/content.ts |
| Contact / Footer | contact.portal.channels.heading | ar | مسارات مباشرة | src/constants/content.ts |
| Contact / Footer | contact.portal.channels.whatsapp.label | ar | راسلني على واتساب | src/constants/content.ts |
| Contact / Footer | contact.portal.channels.whatsapp.caption | ar | واتساب | src/constants/content.ts |
| Contact / Footer | contact.portal.channels.whatsapp.helper | ar | رد أسرع | src/constants/content.ts |
| Contact / Footer | contact.portal.channels.phone.label | ar | اتصل بي هاتفياً | src/constants/content.ts |
| Contact / Footer | contact.portal.channels.phone.caption | ar | اتصال | src/constants/content.ts |
| Contact / Footer | contact.portal.channels.phone.helper | ar | تواصل مباشر | src/constants/content.ts |
| Contact / Footer | contact.portal.channels.email.label | ar | أرسل بريداً إلكترونياً | src/constants/content.ts |
| Contact / Footer | contact.portal.channels.email.caption | ar | بريد | src/constants/content.ts |
| Contact / Footer | contact.portal.channels.email.helper | ar | تفاصيل رسمية | src/constants/content.ts |


### `/why-change`

#### Metadata

| Area | Key | Language | Exact current text | Source |
| --- | --- | --- | --- | --- |
| Metadata | metadata.title | en | Why Change? — DOMINASE | src/app/why-change/page.tsx |
| Metadata | metadata.description | en | Standing still is not neutral. A strategic diagnosis of why static websites quietly lose attention, trust, and customers — and what a real digital system changes. | src/app/why-change/page.tsx |

#### Hero

| Area | Key | Language | Exact current text | Source |
| --- | --- | --- | --- | --- |
| Hero | eyebrow | en | DOMINASE / DIAGNOSTIC | src/features/why-change/WhyChangeClient.tsx |
| Hero | eyebrow | ar | DOMINASE / تشخيص | src/features/why-change/WhyChangeClient.tsx |

#### Hero

| Area | Key | Language | Exact current text | Source |
| --- | --- | --- | --- | --- |
| Hero | title | en | Standing still is not neutral. | src/features/why-change/WhyChangeClient.tsx |
| Hero | title | ar | الثبات ليس حيادًا. | src/features/why-change/WhyChangeClient.tsx |

#### Hero

| Area | Key | Language | Exact current text | Source |
| --- | --- | --- | --- | --- |
| Hero | subtitle | en | Markets move. Attention moves. Expectations rise. A website that stays the same is quietly falling behind — and the loss compounds before it is ever noticed. | src/features/why-change/WhyChangeClient.tsx |
| Hero | subtitle | ar | السوق يتحرك، والانتباه يتحرك، والتوقعات ترتفع. الموقع الذي يبقى كما هو يتأخر بصمت — والخسارة تتراكم قبل أن يلاحظها أحد. | src/features/why-change/WhyChangeClient.tsx |

#### Pressure Map

| Area | Key | Language | Exact current text | Source |
| --- | --- | --- | --- | --- |
| Pressure Map | pressureEyebrow | en | Four forces already in motion | src/features/why-change/WhyChangeClient.tsx |
| Pressure Map | pressureTitle | en | The pressure map. | src/features/why-change/WhyChangeClient.tsx |
| Pressure Map | pressure.0.title | en | Attention moved | src/features/why-change/WhyChangeClient.tsx |
| Pressure Map | pressure.0.body | en | Your customers decide in seconds, on small screens, between dozens of options. Attention is no longer given — it is won. | src/features/why-change/WhyChangeClient.tsx |
| Pressure Map | pressure.1.title | en | Trust became visual | src/features/why-change/WhyChangeClient.tsx |
| Pressure Map | pressure.1.body | en | Before anyone reads your offer, they judge the surface it lives on. Design is now the first proof of competence. | src/features/why-change/WhyChangeClient.tsx |
| Pressure Map | pressure.2.title | en | Speed became expected | src/features/why-change/WhyChangeClient.tsx |
| Pressure Map | pressure.2.body | en | Slow pages and unclear paths read as neglect. Hesitation in the interface becomes hesitation in the customer. | src/features/why-change/WhyChangeClient.tsx |
| Pressure Map | pressure.3.title | en | Systems became reputation | src/features/why-change/WhyChangeClient.tsx |
| Pressure Map | pressure.3.body | en | Booking, replying, following up — customers feel your internal system through the screen, whether you designed it or not. | src/features/why-change/WhyChangeClient.tsx |
| Pressure Map | pressureEyebrow | ar | أربع قوى تتحرك بالفعل | src/features/why-change/WhyChangeClient.tsx |
| Pressure Map | pressureTitle | ar | خريطة الضغط. | src/features/why-change/WhyChangeClient.tsx |
| Pressure Map | pressure.0.title | ar | الانتباه تغيّر | src/features/why-change/WhyChangeClient.tsx |
| Pressure Map | pressure.0.body | ar | عميلك يقرر في ثوانٍ، على شاشة صغيرة، بين عشرات الخيارات. الانتباه لم يعد يُمنح — بل يُكسب. | src/features/why-change/WhyChangeClient.tsx |
| Pressure Map | pressure.1.title | ar | الثقة صارت بصرية | src/features/why-change/WhyChangeClient.tsx |
| Pressure Map | pressure.1.body | ar | قبل أن يقرأ أحد عرضك، يحكم على السطح الذي يعيش عليه. التصميم أصبح أول دليل على الكفاءة. | src/features/why-change/WhyChangeClient.tsx |
| Pressure Map | pressure.2.title | ar | السرعة صارت متوقعة | src/features/why-change/WhyChangeClient.tsx |
| Pressure Map | pressure.2.body | ar | الصفحات البطيئة والمسارات الغامضة تُقرأ كإهمال. التردد في الواجهة يتحول إلى تردد لدى العميل. | src/features/why-change/WhyChangeClient.tsx |
| Pressure Map | pressure.3.title | ar | الأنظمة صارت سمعة | src/features/why-change/WhyChangeClient.tsx |
| Pressure Map | pressure.3.body | ar | الحجز والرد والمتابعة — يشعر العملاء بنظامك الداخلي عبر الشاشة، سواء صممته أم لا. | src/features/why-change/WhyChangeClient.tsx |

#### Invisible Leakage

| Area | Key | Language | Exact current text | Source |
| --- | --- | --- | --- | --- |
| Invisible Leakage | leakEyebrow | en | The invisible loss | src/features/why-change/WhyChangeClient.tsx |
| Invisible Leakage | leakTitle | en | You do not see what leaks. | src/features/why-change/WhyChangeClient.tsx |
| Invisible Leakage | leakBody | en | The quiet losses rarely appear in any report. They happen one visitor at a time, in the gap between interest and action. | src/features/why-change/WhyChangeClient.tsx |
| Invisible Leakage | leaks.0 | en | Leads who were interested — and never wrote | src/features/why-change/WhyChangeClient.tsx |
| Invisible Leakage | leaks.1 | en | An offer explained one screen too late | src/features/why-change/WhyChangeClient.tsx |
| Invisible Leakage | leaks.2 | en | A first impression that undersold the work | src/features/why-change/WhyChangeClient.tsx |
| Invisible Leakage | leaks.3 | en | Manual friction where a single click belonged | src/features/why-change/WhyChangeClient.tsx |
| Invisible Leakage | leaks.4 | en | Trust spent before the first conversation | src/features/why-change/WhyChangeClient.tsx |
| Invisible Leakage | leakCaption | en | SIGNAL LOSS / UNMEASURED | src/features/why-change/WhyChangeClient.tsx |
| Invisible Leakage | leakEyebrow | ar | الخسارة غير المرئية | src/features/why-change/WhyChangeClient.tsx |
| Invisible Leakage | leakTitle | ar | أنت لا ترى ما يتسرب. | src/features/why-change/WhyChangeClient.tsx |
| Invisible Leakage | leakBody | ar | الخسائر الهادئة لا تظهر في التقارير. تحدث زائرًا بعد زائر، في الفجوة بين الاهتمام والخطوة. | src/features/why-change/WhyChangeClient.tsx |
| Invisible Leakage | leaks.0 | ar | عملاء كانوا مهتمين — ولم يراسلوك | src/features/why-change/WhyChangeClient.tsx |
| Invisible Leakage | leaks.1 | ar | عرض شُرح متأخرًا شاشة واحدة | src/features/why-change/WhyChangeClient.tsx |
| Invisible Leakage | leaks.2 | ar | انطباع أول أقل من مستوى العمل | src/features/why-change/WhyChangeClient.tsx |
| Invisible Leakage | leaks.3 | ar | احتكاك يدوي حيث كان يكفي ضغطة واحدة | src/features/why-change/WhyChangeClient.tsx |
| Invisible Leakage | leaks.4 | ar | ثقة استُهلكت قبل أول محادثة | src/features/why-change/WhyChangeClient.tsx |
| Invisible Leakage | leakCaption | ar | فقد الإشارة / غير مقاس | src/features/why-change/WhyChangeClient.tsx |

#### Strategic Shift

| Area | Key | Language | Exact current text | Source |
| --- | --- | --- | --- | --- |
| Strategic Shift | shiftEyebrow | en | The strategic shift | src/features/why-change/WhyChangeClient.tsx |
| Strategic Shift | shiftTitle | en | From presence to system. | src/features/why-change/WhyChangeClient.tsx |
| Strategic Shift | shiftBefore | en | Before | src/features/why-change/WhyChangeClient.tsx |
| Strategic Shift | shiftAfter | en | After | src/features/why-change/WhyChangeClient.tsx |
| Strategic Shift | shifts.0.0 | en | A static presence | src/features/why-change/WhyChangeClient.tsx |
| Strategic Shift | shifts.0.1 | en | A guided action path | src/features/why-change/WhyChangeClient.tsx |
| Strategic Shift | shifts.1.0 | en | Design as decoration | src/features/why-change/WhyChangeClient.tsx |
| Strategic Shift | shifts.1.1 | en | Design as trust architecture | src/features/why-change/WhyChangeClient.tsx |
| Strategic Shift | shifts.2.0 | en | Pages that describe | src/features/why-change/WhyChangeClient.tsx |
| Strategic Shift | shifts.2.1 | en | Systems that move | src/features/why-change/WhyChangeClient.tsx |
| Strategic Shift | shifts.3.0 | en | Updates as chores | src/features/why-change/WhyChangeClient.tsx |
| Strategic Shift | shifts.3.1 | en | Iteration as advantage | src/features/why-change/WhyChangeClient.tsx |
| Strategic Shift | shiftEyebrow | ar | التحول الاستراتيجي | src/features/why-change/WhyChangeClient.tsx |
| Strategic Shift | shiftTitle | ar | من حضور إلى نظام. | src/features/why-change/WhyChangeClient.tsx |
| Strategic Shift | shiftBefore | ar | قبل | src/features/why-change/WhyChangeClient.tsx |
| Strategic Shift | shiftAfter | ar | بعد | src/features/why-change/WhyChangeClient.tsx |
| Strategic Shift | shifts.0.0 | ar | حضور ثابت | src/features/why-change/WhyChangeClient.tsx |
| Strategic Shift | shifts.0.1 | ar | مسار موجّه نحو الخطوة | src/features/why-change/WhyChangeClient.tsx |
| Strategic Shift | shifts.1.0 | ar | تصميم كزينة | src/features/why-change/WhyChangeClient.tsx |
| Strategic Shift | shifts.1.1 | ar | تصميم كهندسة ثقة | src/features/why-change/WhyChangeClient.tsx |
| Strategic Shift | shifts.2.0 | ar | صفحات تصف | src/features/why-change/WhyChangeClient.tsx |
| Strategic Shift | shifts.2.1 | ar | أنظمة تحرّك | src/features/why-change/WhyChangeClient.tsx |
| Strategic Shift | shifts.3.0 | ar | تحديثات كأعباء | src/features/why-change/WhyChangeClient.tsx |
| Strategic Shift | shifts.3.1 | ar | تطوير كأفضلية | src/features/why-change/WhyChangeClient.tsx |

#### CTA

| Area | Key | Language | Exact current text | Source |
| --- | --- | --- | --- | --- |
| CTA | ctaEyebrow | en | The next step | src/features/why-change/WhyChangeClient.tsx |
| CTA | ctaTitle | en | Change is not decoration. It is the system your work deserves. | src/features/why-change/WhyChangeClient.tsx |
| CTA | ctaBody | en | Start with a conversation about what your website should be doing — and what it is silently costing you today. | src/features/why-change/WhyChangeClient.tsx |
| CTA | ctaPrimary | en | Start the shift | src/features/why-change/WhyChangeClient.tsx |
| CTA | ctaSecondary | en | See the method | src/features/why-change/WhyChangeClient.tsx |
| CTA | ctaAria | en | Next step links | src/features/why-change/WhyChangeClient.tsx |
| CTA | ctaEyebrow | ar | الخطوة التالية | src/features/why-change/WhyChangeClient.tsx |
| CTA | ctaTitle | ar | التغيير ليس زينة. إنه النظام الذي يستحقه عملك. | src/features/why-change/WhyChangeClient.tsx |
| CTA | ctaBody | ar | ابدأ بمحادثة حول ما يجب أن يفعله موقعك — وما الذي يكلفك اليوم بصمت. | src/features/why-change/WhyChangeClient.tsx |
| CTA | ctaPrimary | ar | ابدأ التحول | src/features/why-change/WhyChangeClient.tsx |
| CTA | ctaSecondary | ar | شاهد المنهجية | src/features/why-change/WhyChangeClient.tsx |
| CTA | ctaAria | ar | روابط الخطوة التالية | src/features/why-change/WhyChangeClient.tsx |


### `/why-us`

#### Metadata

| Area | Key | Language | Exact current text | Source |
| --- | --- | --- | --- | --- |
| Metadata | metadata.title | en | Why Us? — DOMINASE | src/app/why-us/page.tsx |
| Metadata | metadata.description | en | Built like a system, not a template. The DOMINASE method: diagnose, architect, build, refine — cinematic, bilingual digital systems engineered around your customer's next step. | src/app/why-us/page.tsx |

#### Hero

| Area | Key | Language | Exact current text | Source |
| --- | --- | --- | --- | --- |
| Hero | eyebrow | en | DOMINASE / METHOD | src/features/why-us/WhyUsClient.tsx |
| Hero | eyebrow | ar | DOMINASE / المنهجية | src/features/why-us/WhyUsClient.tsx |

#### Hero

| Area | Key | Language | Exact current text | Source |
| --- | --- | --- | --- | --- |
| Hero | title | en | Built like a system, not a template. | src/features/why-us/WhyUsClient.tsx |
| Hero | title | ar | مبني كنظام، لا كقالب. | src/features/why-us/WhyUsClient.tsx |

#### Hero

| Area | Key | Language | Exact current text | Source |
| --- | --- | --- | --- | --- |
| Hero | subtitle | en | We design websites the way engineers design structures: diagnose first, architect second, decorate never. What you see is the surface of a working system. | src/features/why-us/WhyUsClient.tsx |
| Hero | subtitle | ar | نصمم المواقع كما يصمم المهندسون المنشآت: نشخّص أولًا، ثم نبني الهيكل، ولا نكتفي بالزينة أبدًا. ما تراه هو سطح نظام يعمل. | src/features/why-us/WhyUsClient.tsx |

#### DOMINASE Method

| Area | Key | Language | Exact current text | Source |
| --- | --- | --- | --- | --- |
| DOMINASE Method | methodEyebrow | en | The DOMINASE method | src/features/why-us/WhyUsClient.tsx |
| DOMINASE Method | methodTitle | en | Four stages. One system. | src/features/why-us/WhyUsClient.tsx |
| DOMINASE Method | method.0.name | en | Diagnose | src/features/why-us/WhyUsClient.tsx |
| DOMINASE Method | method.0.body | en | We map your customer, your offer, and the one action that matters — before anything is drawn. | src/features/why-us/WhyUsClient.tsx |
| DOMINASE Method | method.1.name | en | Architect | src/features/why-us/WhyUsClient.tsx |
| DOMINASE Method | method.1.body | en | Structure, message, and path are decided as one system. The design has a job before it has a look. | src/features/why-us/WhyUsClient.tsx |
| DOMINASE Method | method.2.name | en | Build | src/features/why-us/WhyUsClient.tsx |
| DOMINASE Method | method.2.body | en | Cinematic, bilingual, responsive from the first commit — with performance treated as a constraint, not a hope. | src/features/why-us/WhyUsClient.tsx |
| DOMINASE Method | method.3.name | en | Refine | src/features/why-us/WhyUsClient.tsx |
| DOMINASE Method | method.3.body | en | After launch we watch, test, and improve. A system that cannot evolve was never a system. | src/features/why-us/WhyUsClient.tsx |
| DOMINASE Method | methodEyebrow | ar | منهجية DOMINASE | src/features/why-us/WhyUsClient.tsx |
| DOMINASE Method | methodTitle | ar | أربع مراحل. نظام واحد. | src/features/why-us/WhyUsClient.tsx |
| DOMINASE Method | method.0.name | ar | التشخيص | src/features/why-us/WhyUsClient.tsx |
| DOMINASE Method | method.0.body | ar | نرسم خريطة عميلك وعرضك والخطوة الوحيدة التي تهم — قبل أن نرسم أي شيء آخر. | src/features/why-us/WhyUsClient.tsx |
| DOMINASE Method | method.1.name | ar | الهندسة | src/features/why-us/WhyUsClient.tsx |
| DOMINASE Method | method.1.body | ar | الهيكل والرسالة والمسار تُقرر كنظام واحد. للتصميم وظيفة قبل أن يكون له شكل. | src/features/why-us/WhyUsClient.tsx |
| DOMINASE Method | method.2.name | ar | البناء | src/features/why-us/WhyUsClient.tsx |
| DOMINASE Method | method.2.body | ar | سينمائي، ثنائي اللغة، متجاوب من أول سطر — والأداء قيد ملزم، لا أمنية. | src/features/why-us/WhyUsClient.tsx |
| DOMINASE Method | method.3.name | ar | التحسين | src/features/why-us/WhyUsClient.tsx |
| DOMINASE Method | method.3.body | ar | بعد الإطلاق نراقب ونختبر ونحسّن. النظام الذي لا يتطور لم يكن نظامًا. | src/features/why-us/WhyUsClient.tsx |

#### Differentiators

| Area | Key | Language | Exact current text | Source |
| --- | --- | --- | --- | --- |
| Differentiators | diffEyebrow | en | Not a slogan — a position | src/features/why-us/WhyUsClient.tsx |
| Differentiators | diffTitle | en | What makes this different. | src/features/why-us/WhyUsClient.tsx |
| Differentiators | diffs.0.0 | en | Business-first structure | src/features/why-us/WhyUsClient.tsx |
| Differentiators | diffs.0.1 | en | Every screen exists to move a decision forward — nothing is on the page by habit. | src/features/why-us/WhyUsClient.tsx |
| Differentiators | diffs.1.0 | en | Cinematic but usable | src/features/why-us/WhyUsClient.tsx |
| Differentiators | diffs.1.1 | en | Motion earns its place or it is cut. Atmosphere never outranks the action. | src/features/why-us/WhyUsClient.tsx |
| Differentiators | diffs.2.0 | en | Bilingual thinking | src/features/why-us/WhyUsClient.tsx |
| Differentiators | diffs.2.1 | en | Arabic and English are designed together from the start — not translated at the end. | src/features/why-us/WhyUsClient.tsx |
| Differentiators | diffs.3.0 | en | Performance-conscious motion | src/features/why-us/WhyUsClient.tsx |
| Differentiators | diffs.3.1 | en | Nothing animates that would cost your visitors' hardware or your credibility. | src/features/why-us/WhyUsClient.tsx |
| Differentiators | diffs.4.0 | en | Systems that grow | src/features/why-us/WhyUsClient.tsx |
| Differentiators | diffs.4.1 | en | Built to accept new pages, offers, and markets without a rebuild. | src/features/why-us/WhyUsClient.tsx |
| Differentiators | diffEyebrow | ar | ليست شعارات — بل موقف | src/features/why-us/WhyUsClient.tsx |
| Differentiators | diffTitle | ar | ما الذي يجعل هذا مختلفًا. | src/features/why-us/WhyUsClient.tsx |
| Differentiators | diffs.0.0 | ar | هيكل يبدأ من العمل | src/features/why-us/WhyUsClient.tsx |
| Differentiators | diffs.0.1 | ar | كل شاشة موجودة لتدفع قرارًا إلى الأمام — لا شيء في الصفحة بحكم العادة. | src/features/why-us/WhyUsClient.tsx |
| Differentiators | diffs.1.0 | ar | سينمائي وقابل للاستخدام | src/features/why-us/WhyUsClient.tsx |
| Differentiators | diffs.1.1 | ar | الحركة تستحق مكانها أو تُحذف. الأجواء لا تتقدم على الخطوة أبدًا. | src/features/why-us/WhyUsClient.tsx |
| Differentiators | diffs.2.0 | ar | تفكير ثنائي اللغة | src/features/why-us/WhyUsClient.tsx |
| Differentiators | diffs.2.1 | ar | العربية والإنجليزية تُصممان معًا من البداية — لا تُترجمان في النهاية. | src/features/why-us/WhyUsClient.tsx |
| Differentiators | diffs.3.0 | ar | حركة تراعي الأداء | src/features/why-us/WhyUsClient.tsx |
| Differentiators | diffs.3.1 | ar | لا شيء يتحرك إن كان سيكلف أجهزة زوارك أو مصداقيتك. | src/features/why-us/WhyUsClient.tsx |
| Differentiators | diffs.4.0 | ar | أنظمة قابلة للنمو | src/features/why-us/WhyUsClient.tsx |
| Differentiators | diffs.4.1 | ar | مبنية لتستوعب صفحات وعروضًا وأسواقًا جديدة دون إعادة بناء. | src/features/why-us/WhyUsClient.tsx |

#### Execution Discipline

| Area | Key | Language | Exact current text | Source |
| --- | --- | --- | --- | --- |
| Execution Discipline | discEyebrow | en | Execution discipline | src/features/why-us/WhyUsClient.tsx |
| Execution Discipline | discTitle | en | How the studio works. | src/features/why-us/WhyUsClient.tsx |
| Execution Discipline | disciplines.0.0 | en | Clarity before visuals | src/features/why-us/WhyUsClient.tsx |
| Execution Discipline | disciplines.0.1 | en | The message is settled before the first pixel. | src/features/why-us/WhyUsClient.tsx |
| Execution Discipline | disciplines.1.0 | en | Motion with purpose | src/features/why-us/WhyUsClient.tsx |
| Execution Discipline | disciplines.1.1 | en | Every animation answers to a reason. | src/features/why-us/WhyUsClient.tsx |
| Execution Discipline | disciplines.2.0 | en | Responsive from the start | src/features/why-us/WhyUsClient.tsx |
| Execution Discipline | disciplines.2.1 | en | Small screens are designed, not shrunk. | src/features/why-us/WhyUsClient.tsx |
| Execution Discipline | disciplines.3.0 | en | Performance as constraint | src/features/why-us/WhyUsClient.tsx |
| Execution Discipline | disciplines.3.1 | en | Budgets for weight and motion are set early. | src/features/why-us/WhyUsClient.tsx |
| Execution Discipline | disciplines.4.0 | en | Brand consistency | src/features/why-us/WhyUsClient.tsx |
| Execution Discipline | disciplines.4.1 | en | One visual language across every page and state. | src/features/why-us/WhyUsClient.tsx |
| Execution Discipline | discEyebrow | ar | انضباط التنفيذ | src/features/why-us/WhyUsClient.tsx |
| Execution Discipline | discTitle | ar | كيف يعمل الاستوديو. | src/features/why-us/WhyUsClient.tsx |
| Execution Discipline | disciplines.0.0 | ar | الوضوح قبل الشكل | src/features/why-us/WhyUsClient.tsx |
| Execution Discipline | disciplines.0.1 | ar | تُحسم الرسالة قبل أول بكسل. | src/features/why-us/WhyUsClient.tsx |
| Execution Discipline | disciplines.1.0 | ar | حركة لها غاية | src/features/why-us/WhyUsClient.tsx |
| Execution Discipline | disciplines.1.1 | ar | كل حركة تخضع لسبب. | src/features/why-us/WhyUsClient.tsx |
| Execution Discipline | disciplines.2.0 | ar | تجاوب من البداية | src/features/why-us/WhyUsClient.tsx |
| Execution Discipline | disciplines.2.1 | ar | الشاشات الصغيرة تُصمم، لا تُصغّر. | src/features/why-us/WhyUsClient.tsx |
| Execution Discipline | disciplines.3.0 | ar | الأداء قيد ملزم | src/features/why-us/WhyUsClient.tsx |
| Execution Discipline | disciplines.3.1 | ar | ميزانيات الوزن والحركة تُحدد مبكرًا. | src/features/why-us/WhyUsClient.tsx |
| Execution Discipline | disciplines.4.0 | ar | اتساق الهوية | src/features/why-us/WhyUsClient.tsx |
| Execution Discipline | disciplines.4.1 | ar | لغة بصرية واحدة عبر كل صفحة وحالة. | src/features/why-us/WhyUsClient.tsx |

#### CTA

| Area | Key | Language | Exact current text | Source |
| --- | --- | --- | --- | --- |
| CTA | ctaEyebrow | en | The next step | src/features/why-us/WhyUsClient.tsx |
| CTA | ctaTitle | en | This is a build process, not a purchase. | src/features/why-us/WhyUsClient.tsx |
| CTA | ctaBody | en | If you are ready to treat your website as a working system, we are ready to build it with you — from diagnosis to launch and beyond. | src/features/why-us/WhyUsClient.tsx |
| CTA | ctaPrimary | en | Start a build | src/features/why-us/WhyUsClient.tsx |
| CTA | ctaSecondary | en | Why change? | src/features/why-us/WhyUsClient.tsx |
| CTA | ctaAria | en | Next step links | src/features/why-us/WhyUsClient.tsx |
| CTA | ctaEyebrow | ar | الخطوة التالية | src/features/why-us/WhyUsClient.tsx |
| CTA | ctaTitle | ar | هذه عملية بناء، وليست عملية شراء. | src/features/why-us/WhyUsClient.tsx |
| CTA | ctaBody | ar | إذا كنت مستعدًا للتعامل مع موقعك كنظام يعمل، فنحن مستعدون لبنائه معك — من التشخيص إلى الإطلاق وما بعده. | src/features/why-us/WhyUsClient.tsx |
| CTA | ctaPrimary | ar | ابدأ البناء | src/features/why-us/WhyUsClient.tsx |
| CTA | ctaSecondary | ar | لماذا التغيير؟ | src/features/why-us/WhyUsClient.tsx |
| CTA | ctaAria | ar | روابط الخطوة التالية | src/features/why-us/WhyUsClient.tsx |


### `/work`

#### Metadata / JSON-LD

| Area | Key | Language | Exact current text | Source |
| --- | --- | --- | --- | --- |
| Metadata / JSON-LD | metadata.title | en | Case Studies — DOMINASE | src/app/work/page.tsx |
| Metadata / JSON-LD | metadata.description | en | A collection of DOMINASE digital product case studies showing how scattered workflows became clearer platforms, dashboards, and digital systems. | src/app/work/page.tsx |

#### Listing copy

| Area | Key | Language | Exact current text | Source |
| --- | --- | --- | --- | --- |
| Listing copy | metadata.title | en | Case Studies — DOMINASE | src/app/work/page.tsx |
| Listing copy | metadata.description | en | A collection of DOMINASE digital product case studies showing how scattered workflows became clearer platforms, dashboards, and digital systems. | src/app/work/page.tsx |


### `/work/[slug]`

#### Grouped by project slug

| Project slug | Content area | Exact current text | Source |
| --- | --- | --- | --- |
| manal-alhihi | title | Manal Alhihi: From scattered courses to an organized training platform | src/constants/caseStudies.ts |
| manal-alhihi | subtitle/positioning | Turning a training experience built around distributed links, files, and manual follow-up into one clear digital platform for students, courses, attendance, and content. | src/constants/caseStudies.ts |
| manal-alhihi | problem/before | Training was spread across too many places. | src/constants/caseStudies.ts |
| manal-alhihi | solution/transformation | The scattered pieces became one system. | src/constants/caseStudies.ts |
| manal-alhihi | outcome/result | The result was not simply a better-looking interface, but a training experience that is clearer to use, manage, and follow. | src/constants/caseStudies.ts |
| manal-alhihi | CTA | Start a focused digital product | src/constants/caseStudies.ts |
| qasr-alfarah | title | Qasr Al-Farah: From a paper agenda to a digital booking and memory experience | src/constants/caseStudies.ts |
| qasr-alfarah | subtitle/positioning | Transforming the wedding hall experience from manual follow-up and repeated phone calls into a digital system that organizes bookings, invitations, and guest interaction after the event. | src/constants/caseStudies.ts |
| qasr-alfarah | problem/before | Before the system: details were scattered and pressure was daily. | src/constants/caseStudies.ts |
| qasr-alfarah | solution/transformation | A booking request became a connected event journey. | src/constants/caseStudies.ts |
| qasr-alfarah | outcome/result | The result was not simply a better-looking interface, but a clearer experience for booking and follow-up. Clients can understand the next step, while the team has a more organized path for requests, event details, and guest interaction. | src/constants/caseStudies.ts |
| qasr-alfarah | CTA | See how the hall moved from manual follow-up to a usable digital experience | src/constants/caseStudies.ts |
| curevie | title | Curevie: From unclear care requests to an organized home healthcare experience | src/constants/caseStudies.ts |
| curevie | subtitle/positioning | Transforming the home healthcare experience into a clear digital presence that helps the family understand services, choose the type of care, and communicate with greater confidence. | src/constants/caseStudies.ts |
| curevie | problem/before | Before the platform: The family seeks care... but the path is unclear. | src/constants/caseStudies.ts |
| curevie | solution/transformation | The experience became a more organized digital presence. | src/constants/caseStudies.ts |
| curevie | outcome/result | The result was not simply a better-looking website, but a digital experience that helps the family understand the service, feel confident, and take the step to communicate clearly when home care is needed. | src/constants/caseStudies.ts |
| curevie | CTA | See how home healthcare services became a clearer, more reassuring digital experience | src/constants/caseStudies.ts |
| horvath-survey | title | HORVÁTH: From scattered AI readiness assessment to a clear measurement platform | src/constants/caseStudies.ts |
| horvath-survey | subtitle/positioning | Building an AI Readiness Index platform that measures organizational readiness across strategic and operational dimensions, transforming answers into visual results and prioritized recommendations. | src/constants/caseStudies.ts |
| horvath-survey | problem/before | Before the system: AI readiness was a broad question that was hard to measure. | src/constants/caseStudies.ts |
| horvath-survey | solution/transformation | The experience became an integrated digital assessment platform. | src/constants/caseStudies.ts |
| horvath-survey | outcome/result | The result was not just a survey page, but an integrated assessment system that transforms user answers into a clearer reading of the organization's AI readiness. | src/constants/caseStudies.ts |
| horvath-survey | CTA | Discover how AI readiness transforms into a clear assessment | src/constants/caseStudies.ts |

## 3. Bilingual Map

The main content systems are bilingual across English and Arabic. Rows marked `Possibly duplicated` usually contain brand names, URLs, or proper nouns that intentionally match. Rows marked `Hardcoded only` are visible strings found in components rather than the bilingual content configs.

| English copy | Arabic copy | Status | File path | Key |
| --- | --- | --- | --- | --- |
| Home | الرئيسية | Complete | src/constants/content.ts | content.nav.home |
| Why Us? | لماذا نحن؟ | Complete | src/constants/content.ts | content.nav.whyUs |
| Expertise | الخبرات | Complete | src/constants/content.ts | content.nav.services |
| Work | الأعمال | Complete | src/constants/content.ts | content.nav.portfolio |
| Why Change? | لماذا التغيير؟ | Complete | src/constants/content.ts | content.nav.whyChange |
| Case Studies | دراسات الحالة | Complete | src/constants/content.ts | content.nav.caseStudies |
| Signals | إشارات الثقة | Complete | src/constants/content.ts | content.nav.testimonials |
| Contact | تواصل | Complete | src/constants/content.ts | content.nav.contact |
| Start a Build | ابدأ مشروعك | Complete | src/constants/content.ts | content.nav.cta |
| DIGITAL PRODUCT STUDIO | استوديو منتجات رقمية | Complete | src/constants/content.ts | content.hero.title |
| Digital systems built to move business. | أنظمة رقمية تُحرّك العمل بوضوح. | Complete | src/constants/content.ts | content.hero.headline |
| We design websites, dashboards, and product experiences that turn complexity into trust, clarity, and action. | نبني مواقع، لوحات تحكم، وتجارب رقمية تحوّل التعقيد إلى ثقة، وضوح، وفعل. | Complete | src/constants/content.ts | content.hero.subheading |
|  |  | Possibly duplicated | src/constants/content.ts | content.hero.supportingLine |
| Start the build | ابدأ البناء | Complete | src/constants/content.ts | content.hero.primaryCTA |
| View the method | شاهد المنهجية | Complete | src/constants/content.ts | content.hero.secondaryCTA |
| Why the website matters | لماذا الموقع مهم؟ | Complete | src/constants/content.ts | content.about.eyebrow |
| A website is not a page. It is the decision point. | الموقع ليس صفحة. إنه نقطة القرار. | Complete | src/constants/content.ts | content.about.title |
| Customers may discover you on social media, but they decide when they find a place that explains your offer, builds trust, and gives them a clear next step. | قد يكتشفك العميل من السوشال ميديا، لكنه يقرر عندما يجد مكانًا واضحًا يشرح عرضك، يبني الثقة، ويعطيه الخطوة التالية. | Complete | src/constants/content.ts | content.about.summary |
| Turn attention into trust | يحوّل الانتباه إلى ثقة | Complete | src/constants/content.ts | content.about.points.0 |
| Turn trust into action | يحوّل الثقة إلى إجراء | Complete | src/constants/content.ts | content.about.points.1 |
| Turn action into a customer | يحوّل الإجراء إلى عميل | Complete | src/constants/content.ts | content.about.points.2 |
| Why your company needs a website | لماذا تحتاج شركتك إلى موقع؟ | Complete | src/constants/content.ts | content.about.cta |
| What DOMINASE Builds | ماذا تبني DOMINASE | Complete | src/constants/content.ts | content.services.title |
| Cinematic presentation, business logic, and polished frontend execution shaped as one studio process. | عرض سينمائي، منطق أعمال، وتنفيذ واجهات مصقول ضمن عملية استوديو واحدة. | Complete | src/constants/content.ts | content.services.subtitle |
| Cinematic Websites | مواقع سينمائية | Complete | src/constants/content.ts | content.services.items.0.title |
| Premium marketing websites with strong visual direction, precise responsive layouts, purposeful motion, and conversion-aware sections. | مواقع تسويقية فاخرة بتوجه بصري قوي، تخطيطات متجاوبة دقيقة، حركة هادفة، وأقسام مصممة للتحويل. | Complete | src/constants/content.ts | content.services.items.0.desc |
| development | development | Possibly duplicated | src/constants/content.ts | content.services.items.0.icon |
| SaaS & Dashboard Interfaces | واجهات SaaS ولوحات تحكم | Complete | src/constants/content.ts | content.services.items.1.title |
| Clean operational screens for admin panels, booking management, content flows, data capture, and business workflows. | شاشات تشغيلية نظيفة للوحات الإدارة، إدارة الحجوزات، مسارات المحتوى، جمع البيانات، وسير عمل الشركات. | Complete | src/constants/content.ts | content.services.items.1.desc |
| consulting | consulting | Possibly duplicated | src/constants/content.ts | content.services.items.1.icon |
| Product Flows | مسارات المنتجات | Complete | src/constants/content.ts | content.services.items.2.title |
| Booking, checkout, surveys, RSVP, education, and onboarding flows designed to feel clear, fast, and reliable for real users. | حجز، دفع، استبيانات، RSVP، تعليم، وتجارب إدخال مصممة لتكون واضحة وسريعة وموثوقة للمستخدمين. | Complete | src/constants/content.ts | content.services.items.2.desc |
| marketing | marketing | Possibly duplicated | src/constants/content.ts | content.services.items.2.icon |
| Discuss a Project | ناقش مشروعك | Complete | src/constants/content.ts | content.services.cta |
| BUILD SYSTEM | BUILD SYSTEM | Possibly duplicated | src/constants/content.ts | content.beneathInterface.eyebrow |
| Beneath the Interface | خلف الواجهة | Complete | src/constants/content.ts | content.beneathInterface.title |
| DOMINASE reveals the system behind a serious digital experience. | يكشف DOMINASE النظام الذي يقف خلف التجربة الرقمية الجادة. | Complete | src/constants/content.ts | content.beneathInterface.intro |
| Discuss a Project | ناقش مشروعك | Complete | src/constants/content.ts | content.beneathInterface.cta |
| surface | surface | Possibly duplicated | src/constants/content.ts | content.beneathInterface.scenes.0.id |
| 01 | 01 | Possibly duplicated | src/constants/content.ts | content.beneathInterface.scenes.0.index |
| Surface | السطح | Complete | src/constants/content.ts | content.beneathInterface.scenes.0.label |
| A website is only the surface. | الموقع هو الطبقة الظاهرة فقط. | Complete | src/constants/content.ts | content.beneathInterface.scenes.0.headline |
| Most visitors see the finished interface. DOMINASE builds what makes it work. | معظم الزوار يرون الواجهة النهائية. DOMINASE يبني ما يجعلها تعمل. | Complete | src/constants/content.ts | content.beneathInterface.scenes.0.body |
| presentation | presentation | Possibly duplicated | src/constants/content.ts | content.beneathInterface.scenes.1.id |
| 02 | 02 | Possibly duplicated | src/constants/content.ts | content.beneathInterface.scenes.1.index |
| Presentation | Presentation | Possibly duplicated | src/constants/content.ts | content.beneathInterface.scenes.1.label |
| The visible layer explains the business, shapes perception, and builds trust. | الطبقة الظاهرة تشرح العمل، تشكّل الانطباع، وتبني الثقة. | Complete | src/constants/content.ts | content.beneathInterface.scenes.1.headline |
| Cinematic marketing pages with strong visual direction, conversion-aware structure, and purposeful motion. | صفحات تسويقية سينمائية بتوجه بصري قوي، هيكل موجه للتحويل، وحركة هادفة. | Complete | src/constants/content.ts | content.beneathInterface.scenes.1.body |
| interaction | interaction | Possibly duplicated | src/constants/content.ts | content.beneathInterface.scenes.2.id |
| 03 | 03 | Possibly duplicated | src/constants/content.ts | content.beneathInterface.scenes.2.index |
| Interaction | Interaction | Possibly duplicated | src/constants/content.ts | content.beneathInterface.scenes.2.label |
| The flow layer guides people through forms, bookings, surveys, RSVP, and next steps. | طبقة التفاعل توجه المستخدم عبر النماذج، الحجوزات، الاستبيانات، RSVP، والخطوة التالية. | Complete | src/constants/content.ts | content.beneathInterface.scenes.2.headline |
| Every step designed to feel clear, fast, and reliable for real users. | كل خطوة مصممة لتكون واضحة وسريعة وموثوقة للمستخدمين الحقيقيين. | Complete | src/constants/content.ts | content.beneathInterface.scenes.2.body |
| logic | logic | Possibly duplicated | src/constants/content.ts | content.beneathInterface.scenes.3.id |
| 04 | 04 | Possibly duplicated | src/constants/content.ts | content.beneathInterface.scenes.3.index |
| Logic | Logic | Possibly duplicated | src/constants/content.ts | content.beneathInterface.scenes.3.label |
| The logic layer handles rules, validation, data capture, and business paths. | طبقة المنطق تدير القواعد، التحقق، جمع البيانات، ومسارات العمل. | Complete | src/constants/content.ts | content.beneathInterface.scenes.3.headline |
| Conditional flows, form intelligence, and routing that makes the experience trustworthy. | مسارات شرطية، ذكاء النماذج، وتوجيه البيانات الذي يجعل التجربة موثوقة. | Complete | src/constants/content.ts | content.beneathInterface.scenes.3.body |
| operations | operations | Possibly duplicated | src/constants/content.ts | content.beneathInterface.scenes.4.id |
| 05 | 05 | Possibly duplicated | src/constants/content.ts | content.beneathInterface.scenes.4.index |
| Operations | Operations | Possibly duplicated | src/constants/content.ts | content.beneathInterface.scenes.4.label |
| The operations layer organizes requests, bookings, content, and admin workflows. | طبقة التشغيل تنظم الطلبات، الحجوزات، المحتوى، ولوحات الإدارة. | Complete | src/constants/content.ts | content.beneathInterface.scenes.4.headline |
| Clean dashboards and admin screens so the business runs clearly behind the scenes. | لوحات تحكم نظيفة وشاشات إدارة حتى يعمل العمل بوضوح خلف الشاشة. | Complete | src/constants/content.ts | content.beneathInterface.scenes.4.body |
| assembly | assembly | Possibly duplicated | src/constants/content.ts | content.beneathInterface.scenes.5.id |
| 06 | 06 | Possibly duplicated | src/constants/content.ts | content.beneathInterface.scenes.5.index |
| Operating Layer | Operating Layer | Possibly duplicated | src/constants/content.ts | content.beneathInterface.scenes.5.label |
| One connected system built to turn attention into action. | نظام واحد متصل مبني لتحويل الانتباه إلى إجراء. | Complete | src/constants/content.ts | content.beneathInterface.scenes.5.headline |
| All four layers — assembled into a single DOMINASE digital operating layer. | جميع الطبقات الأربع — مجمّعة في طبقة تشغيل رقمية واحدة من DOMINASE. | Complete | src/constants/content.ts | content.beneathInterface.scenes.5.body |
| Selected Product Work | أعمال مختارة | Complete | src/constants/content.ts | content.portfolio.title |
| Real interface systems spanning booking platforms, healthcare experiences, surveys, education, dashboards, and conversion-focused presentation. | أنظمة واجهات حقيقية تشمل منصات حجز، تجارب صحية، استبيانات، تعليم، لوحات تحكم، وعرض تسويقي موجه للتحويل. | Complete | src/constants/content.ts | content.portfolio.subtitle |
| View Project | عرض المشروع | Complete | src/constants/content.ts | content.portfolio.projectCTA |
| Qasr Al-Farah | Qasr Al-Farah | Possibly duplicated | src/constants/content.ts | content.portfolio.items.0.title |
| Wedding Hall Operating Platform | منصة تشغيل لقاعات الأفراح | Complete | src/constants/content.ts | content.portfolio.items.0.category |
| A full wedding-hall digital platform combining a premium public website, booking flow, checkout, admin dashboard, digital invitations, RSVP, guest photo uploads, and memory-book experiences. | منصة رقمية متكاملة لقاعات الأفراح تجمع بين موقع تسويقي فاخر، نظام حجز، دفع، لوحة إدارة، دعوات رقمية، RSVP، رفع صور الضيوف، وتجربة كتاب ذكريات. | Complete | src/constants/content.ts | content.portfolio.items.0.desc |
| /assest/resize/qaser-alfarah.png | /assest/resize/qaser-alfarah.png | Possibly duplicated | src/constants/content.ts | content.portfolio.items.0.image |
| # | # | Possibly duplicated | src/constants/content.ts | content.portfolio.items.0.link |
| qasr-al-farah | qasr-al-farah | Possibly duplicated | src/constants/content.ts | content.portfolio.items.0.slug |
| Curevie | Curevie | Possibly duplicated | src/constants/content.ts | content.portfolio.items.1.title |
| Healthcare Digital Experience | تجربة رقمية طبية | Complete | src/constants/content.ts | content.portfolio.items.1.category |
| A healthcare-oriented digital experience shaped around trust, clarity, clean presentation, and a polished medical-grade interface. | تجربة رقمية في المجال الصحي مبنية حول الثقة، الوضوح، العرض النظيف، وواجهة احترافية بطابع طبي. | Complete | src/constants/content.ts | content.portfolio.items.1.desc |
| /assest/curevie3.jpeg | /assest/curevie3.jpeg | Possibly duplicated | src/constants/content.ts | content.portfolio.items.1.image |
| # | # | Possibly duplicated | src/constants/content.ts | content.portfolio.items.1.link |
| curevie | curevie | Possibly duplicated | src/constants/content.ts | content.portfolio.items.1.slug |
| Horvath Survey | Horvath Survey | Possibly duplicated | src/constants/content.ts | content.portfolio.items.2.title |
| Survey & Business Data Platform | منصة استبيانات وبيانات أعمال | Complete | src/constants/content.ts | content.portfolio.items.2.category |
| A structured survey and data-capture experience focused on readable flows, clean forms, and practical business insight. | تجربة استبيانات وجمع بيانات منظمة تركز على وضوح النماذج، سهولة الإدخال، واستخراج معلومات عملية للأعمال. | Complete | src/constants/content.ts | content.portfolio.items.2.desc |
| /assest/resize/horvath1.jpg | /assest/resize/horvath1.jpg | Possibly duplicated | src/constants/content.ts | content.portfolio.items.2.image |
| # | # | Possibly duplicated | src/constants/content.ts | content.portfolio.items.2.link |
| horvath-survey | horvath-survey | Possibly duplicated | src/constants/content.ts | content.portfolio.items.2.slug |
| Manal Alhihi Educational Platform | Manal Alhihi Educational Platform | Possibly duplicated | src/constants/content.ts | content.portfolio.items.3.title |
| Educational Platform | منصة تعليمية | Complete | src/constants/content.ts | content.portfolio.items.3.category |
| An educational platform concept built around organized learning content, clear navigation, and a professional student-facing experience. | منصة تعليمية مبنية حول تنظيم المحتوى، وضوح التنقل، وتجربة احترافية للطلاب والمستخدمين. | Complete | src/constants/content.ts | content.portfolio.items.3.desc |
| /assest/resize/manal-alhihi.png | /assest/resize/manal-alhihi.png | Possibly duplicated | src/constants/content.ts | content.portfolio.items.3.image |
| # | # | Possibly duplicated | src/constants/content.ts | content.portfolio.items.3.link |
| manal-alhihi | manal-alhihi | Possibly duplicated | src/constants/content.ts | content.portfolio.items.3.slug |
| See More on GitHub | المزيد على GitHub | Complete | src/constants/content.ts | content.portfolio.cta |
| Proof Signals | إشارات الثقة | Complete | src/constants/content.ts | content.testimonials.title |
| The studio is built around practical product surfaces, not placeholder praise. | هذا الاستوديو مبني حول أسطح منتجات عملية وليس آراء عملاء وهمية. | Complete | src/constants/content.ts | content.testimonials.subtitle |
| Mohammed brought a calm, organized way of thinking to our digital presence. The Curevie experience feels clear, trusted, and polished without losing the human side we care about. | Mohammed Aldomi تعامل مع حضور Curevie الرقمي بطريقة منظمة وهادئة. النتيجة كانت تجربة واضحة، موثوقة، ومصقولة، وفي نفس الوقت حافظت على الجانب الإنساني الذي نهتم به. | Complete | src/constants/content.ts | content.testimonials.items.0.quote |
| Dr. Ahmad Al-Akhras | الدكتور أحمد الأخرس | Complete | src/constants/content.ts | content.testimonials.items.0.author |
| Director, Curevie | مدير شركة Curevie | Complete | src/constants/content.ts | content.testimonials.items.0.role |
| Working with Dominase felt easy and professional from the first conversation. Mohammed understood the brand direction quickly and turned the idea into an interface that feels sharp, practical, and ready for real users. | التعامل مع Dominase كان مريحاً واحترافياً من أول نقاش. فهم Mohammed Aldomi اتجاه العلامة بسرعة، وحوّل الفكرة إلى واجهة حادة، عملية، ومناسبة لمستخدمين حقيقيين. | Complete | src/constants/content.ts | content.testimonials.items.1.quote |
| Sultan Al-Hajj | سلطان الحاج | Complete | src/constants/content.ts | content.testimonials.items.1.author |
| Director, Inkspire | مدير شركة Inkspire | Complete | src/constants/content.ts | content.testimonials.items.1.role |
| The final result had the kind of structure and visual confidence we needed. Mohammed paid attention to the small details, explained the choices clearly, and delivered work that genuinely elevated our company image. | النتيجة النهائية كان فيها التنظيم والثقة البصرية التي كنا نحتاجها. Mohammed Aldomi اهتم بالتفاصيل الصغيرة، وشرح اختياراته بوضوح، وقدّم عملاً رفع صورة الشركة فعلاً. | Complete | src/constants/content.ts | content.testimonials.items.2.quote |
| Eng. Ahmad Khaled | المهندس أحمد خالد | Complete | src/constants/content.ts | content.testimonials.items.2.author |
| Owner, Engineering Company | صاحب شركة هندسية | Complete | src/constants/content.ts | content.testimonials.items.2.role |
| Start a Serious Build | ابدأ بناءً جاداً | Complete | src/constants/content.ts | content.testimonials.cta |
| Let's Build Something Useful | لنبنِ شيئاً مفيداً | Complete | src/constants/content.ts | content.contact.title |
| Send a message if your business needs a polished website, a SaaS-style interface, a booking flow, or a sharper digital system. | أرسل رسالة إذا كان عملك يحتاج موقعاً مصقولاً، واجهة بأسلوب SaaS، مسار حجز، أو نظاماً رقمياً أوضح. | Complete | src/constants/content.ts | content.contact.subtitle |
| +962779667168 | +962779667168 | Possibly duplicated | src/constants/content.ts | content.contact.info.phone |
| mohammed.aldomi68@gmail.com | mohammed.aldomi68@gmail.com | Possibly duplicated | src/constants/content.ts | content.contact.info.email |
| Amman, Jordan | عمّان، الأردن | Complete | src/constants/content.ts | content.contact.info.address |
| Name | الاسم | Complete | src/constants/content.ts | content.contact.form.name |
| Email | البريد الإلكتروني | Complete | src/constants/content.ts | content.contact.form.email |
| Phone Number | رقم الهاتف | Complete | src/constants/content.ts | content.contact.form.phone |
| Project Details | تفاصيل المشروع | Complete | src/constants/content.ts | content.contact.form.message |
| Send Message | أرسل الرسالة | Complete | src/constants/content.ts | content.contact.form.submit |
| The decision point | نقطة القرار | Complete | src/constants/content.ts | content.contact.portal.eyebrow |
| Signal capture | التقاط الإشارة | Complete | src/constants/content.ts | content.contact.portal.panelLabel |
| Name | الاسم | Complete | src/constants/content.ts | content.contact.portal.fields.name.label |
| Your full name | اسمك الكامل | Complete | src/constants/content.ts | content.contact.portal.fields.name.placeholder |
| Phone number | رقم الهاتف | Complete | src/constants/content.ts | content.contact.portal.fields.phone.label |
| Best number to reach you | أفضل رقم للتواصل معك | Complete | src/constants/content.ts | content.contact.portal.fields.phone.placeholder |
| Company | اسم الشركة | Complete | src/constants/content.ts | content.contact.portal.fields.company.label |
| Company (optional) | اسم الشركة (اختياري) | Complete | src/constants/content.ts | content.contact.portal.fields.company.placeholder |
| Start the conversation | ابدأ المحادثة | Complete | src/constants/content.ts | content.contact.portal.submit |
| Sending… | جاري الإرسال… | Complete | src/constants/content.ts | content.contact.portal.submitting |
| Please enter your name. | الرجاء إدخال اسمك. | Complete | src/constants/content.ts | content.contact.portal.errors.name |
| Please enter a phone number. | الرجاء إدخال رقم الهاتف. | Complete | src/constants/content.ts | content.contact.portal.errors.phone |
| Something went wrong. Please try again, or reach me directly below. | حدث خطأ ما. حاول مرة أخرى، أو تواصل معي مباشرة بالأسفل. | Complete | src/constants/content.ts | content.contact.portal.errors.submit |
| Contact form is not configured. Set NEXT_PUBLIC_FORMSPREE_ENDPOINT. | نموذج التواصل غير مهيأ. الرجاء ضبط NEXT_PUBLIC_FORMSPREE_ENDPOINT. | Complete | src/constants/content.ts | content.contact.portal.errors.config |
| Signal received | تم استلام الإشارة | Complete | src/constants/content.ts | content.contact.portal.success.eyebrow |
| Your request was sent | تم إرسال طلبك بنجاح | Complete | src/constants/content.ts | content.contact.portal.success.title |
| You just took the first step toward changing how your project shows up to the world. Mohammed will review the details and get back to you soon. | أخذت أول خطوة في القرار الذي قد يغيّر طريقة ظهور مشروعك للعالم. سيراجع Mohammed التفاصيل ويتواصل معك قريبًا. | Complete | src/constants/content.ts | content.contact.portal.success.body |
| Send another message | إرسال رسالة أخرى | Complete | src/constants/content.ts | content.contact.portal.success.button |
| Direct routes | مسارات مباشرة | Complete | src/constants/content.ts | content.contact.portal.channels.heading |
| Message on WhatsApp | راسلني على واتساب | Complete | src/constants/content.ts | content.contact.portal.channels.whatsapp.label |
| WhatsApp | واتساب | Complete | src/constants/content.ts | content.contact.portal.channels.whatsapp.caption |
| Fastest reply | رد أسرع | Complete | src/constants/content.ts | content.contact.portal.channels.whatsapp.helper |
| Call by phone | اتصل بي هاتفياً | Complete | src/constants/content.ts | content.contact.portal.channels.phone.label |
| Call | اتصال | Complete | src/constants/content.ts | content.contact.portal.channels.phone.caption |
| Talk directly | تواصل مباشر | Complete | src/constants/content.ts | content.contact.portal.channels.phone.helper |
| Send an email | أرسل بريداً إلكترونياً | Complete | src/constants/content.ts | content.contact.portal.channels.email.label |
| Email | بريد | Complete | src/constants/content.ts | content.contact.portal.channels.email.caption |
| Formal details | تفاصيل رسمية | Complete | src/constants/content.ts | content.contact.portal.channels.email.helper |
| Product Thinking | تفكير منتج | Complete | src/constants/content.ts | content.features.0.title |
| Every section, screen, and interaction is shaped around what the business needs users to understand or do next. | كل قسم وشاشة وتفاعل يتم بناؤه حول ما يحتاج المستخدم أن يفهمه أو يفعله بعد ذلك. | Complete | src/constants/content.ts | content.features.0.desc |
| Frontend Precision | دقة في الواجهة | Complete | src/constants/content.ts | content.features.1.title |
| Responsive layouts, polished motion, clean hierarchy, and performance-aware implementation across modern interfaces. | تخطيطات متجاوبة، حركة مصقولة، تسلسل بصري واضح، وتنفيذ واعٍ بالأداء عبر واجهات حديثة. | Complete | src/constants/content.ts | content.features.1.desc |
| Business Workflows | سير عمل للأعمال | Complete | src/constants/content.ts | content.features.2.title |
| Practical systems for bookings, dashboards, surveys, education, healthcare, checkout, and content operations. | أنظمة عملية للحجز، لوحات التحكم، الاستبيانات، التعليم، الصحة، الدفع، وتشغيل المحتوى. | Complete | src/constants/content.ts | content.features.2.desc |
| Generic Websites Do Not Create Product Confidence | المواقع العامة لا تبني ثقة المنتج | Complete | src/constants/content.ts | content.problem.title |
| Most business sites look presentable but fail to explain the offer, guide the user, or support real operations. The result is a digital presence that feels disconnected from the business behind it. | معظم مواقع الأعمال تبدو مقبولة لكنها لا تشرح العرض، لا توجه المستخدم، ولا تدعم العمليات الحقيقية. النتيجة حضور رقمي منفصل عن قيمة العمل نفسه. | Complete | src/constants/content.ts | content.problem.description |
| Built around real project surfaces | مبني حول واجهات مشاريع حقيقية | Complete | src/constants/content.ts | content.socialProof.trustedBy |
| "A strong digital product should feel premium on the surface and practical underneath." | "المنتج الرقمي القوي يجب أن يبدو فاخراً على السطح وعملياً في الداخل." | Complete | src/constants/content.ts | content.socialProof.testimonial |
| - Mohammed Aldomi, Founder | - Mohammed Aldomi، المؤسس | Complete | src/constants/content.ts | content.socialProof.attribution |
| A Studio Built Around Working Digital Systems | استوديو مبني حول أنظمة رقمية تعمل | Complete | src/constants/content.ts | content.solution.title |
| Clear Presentation | عرض واضح | Complete | src/constants/content.ts | content.solution.benefits.0.title |
| Premium pages that make the offer, story, and action path obvious. | صفحات فاخرة تجعل العرض والقصة ومسار الإجراء واضحين. | Complete | src/constants/content.ts | content.solution.benefits.0.desc |
| Operational Depth | عمق تشغيلي | Complete | src/constants/content.ts | content.solution.benefits.1.title |
| Interfaces for dashboards, bookings, forms, and business workflows. | واجهات للوحات التحكم، الحجوزات، النماذج، وسير عمل الشركات. | Complete | src/constants/content.ts | content.solution.benefits.1.desc |
| Polished Experience | تجربة مصقولة | Complete | src/constants/content.ts | content.solution.benefits.2.title |
| Motion, spacing, imagery, and responsive behavior tuned to feel sharp and intentional. | حركة، مسافات، صور، وسلوك متجاوب مضبوط ليبدو حاداً ومقصوداً. | Complete | src/constants/content.ts | content.solution.benefits.2.desc |
| Ready to Build a Sharper Digital Product? | جاهز لبناء منتج رقمي أوضح؟ | Complete | src/constants/content.ts | content.finalCTA.title |
| Bring the project, the business context, and the ambition. DOMINASE will help turn it into a polished interface people can trust. | أحضر المشروع، سياق العمل، والطموح. ستساعدك DOMINASE في تحويله إلى واجهة مصقولة يمكن للمستخدمين الوثوق بها. | Complete | src/constants/content.ts | content.finalCTA.subtext |
| Start a Build | ابدأ مشروعك | Complete | src/constants/content.ts | content.finalCTA.primaryCTA |
| View the Work | شاهد الأعمال | Complete | src/constants/content.ts | content.finalCTA.secondaryCTA |
| Available for focused websites, product interfaces, and operational systems. | متاح للمواقع المركزة، واجهات المنتجات، والأنظمة التشغيلية. | Complete | src/constants/content.ts | content.finalCTA.reassurance |
| DOMINASE — Digital Product Studio by Mohammed Aldomi. | DOMINASE — Digital Product Studio by Mohammed Aldomi. | Possibly duplicated | src/constants/content.ts | content.footer.tagline |
| © 2026 DOMINASE. Built by Mohammed Aldomi. | © 2026 DOMINASE. Built by Mohammed Aldomi. | Possibly duplicated | src/constants/content.ts | content.footer.rights |
| Portfolio | الأعمال | Complete | src/constants/content.ts | content.footer.links.0 |
| Contact | تواصل | Complete | src/constants/content.ts | content.footer.links.1 |
| Training platform case study | دراسة حالة لمنصة تدريب | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.eyebrow |
| Manal Alhihi: From scattered courses to an organized training platform | المدربة منال الحيحي: من دورات مبعثرة إلى منصة تدريب منظمة | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.title |
| Turning a training experience built around distributed links, files, and manual follow-up into one clear digital platform for students, courses, attendance, and content. | تحويل تجربة التدريب من روابط وملفات موزعة ومتابعة يدوية إلى منصة رقمية تجمع الطلاب، الدورات، الحضور، والمحتوى في مكان واحد واضح. | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.positioning |
| Training was spread across too many places. | كانت تجربة التدريب موزعة بين أماكن كثيرة. | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.before.title |
| The learning experience depended on disconnected tools and repeated manual coordination. | اعتمد مسار التعلم على أدوات منفصلة وتنسيق يدوي متكرر. | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.before.intro |
| Scattered files | ملفات مبعثرة | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.before.points.0 |
| Separate links | روابط متفرقة | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.before.points.1 |
| Google Drive | Google Drive | Possibly duplicated | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.before.points.2 |
| Manual follow-up | متابعة يدوية | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.before.points.3 |
| Unclear attendance | حضور غير واضح | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.before.points.4 |
| Message-dependent students | اعتماد الطلاب على الرسائل | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.before.points.5 |
| Administrative burden | عبء إداري | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.before.points.6 |
| The scattered pieces became one system. | تحولت الأجزاء المبعثرة إلى نظام واحد. | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.transformation.title |
| Files, links, student records, and attendance signals were reorganized around a central training platform. | أعيد تنظيم الملفات والروابط وسجلات الطلاب وإشارات الحضور حول منصة تدريب مركزية. | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.transformation.body |
| One structured place for learning and administration. | مكان منظم واحد للتعلم والإدارة. | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.after.title |
| The platform gives students a clearer path and gives administration a calmer operating view. | تمنح المنصة الطلاب مسارًا أوضح، وتمنح الإدارة رؤية تشغيلية أكثر هدوءًا. | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.after.intro |
| Student accounts | حسابات للطلاب | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.after.points.0 |
| Organized courses | دورات منظمة | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.after.points.1 |
| Attendance tracking | تتبع الحضور | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.after.points.2 |
| Course trailers | إعلانات تشويقية للدورات | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.after.points.3 |
| Ordered content | محتوى مرتب | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.after.points.4 |
| Clearer administration | إدارة أكثر وضوحًا | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.after.points.5 |
| A learning journey with visible structure. | رحلة تعلم ببنية مرئية واضحة. | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.storyboard.title |
| The interface carries the same organization from the platform entrance into course discovery and content detail. | تحمل الواجهة التنظيم نفسه من مدخل المنصة إلى استكشاف الدورات وتفاصيل المحتوى. | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.storyboard.intro |
| /assest/resize/manal-alhihi3.png | /assest/resize/manal-alhihi3.png | Possibly duplicated | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.storyboard.screenshots.0.src |
| Manal Alhihi training platform landing interface | واجهة الدخول إلى منصة تدريب منال الحيحي | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.storyboard.screenshots.0.alt |
| Platform entrance | مدخل المنصة | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.storyboard.screenshots.0.caption |
| /assest/resize/manal-alhihi1.png | /assest/resize/manal-alhihi1.png | Possibly duplicated | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.storyboard.screenshots.1.src |
| Organized course content in the Manal Alhihi platform | محتوى دورات منظم داخل منصة منال الحيحي | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.storyboard.screenshots.1.alt |
| Course structure | هيكلة الدورات | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.storyboard.screenshots.1.caption |
| /assest/resize/manal-alhihi.png | /assest/resize/manal-alhihi.png | Possibly duplicated | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.storyboard.screenshots.2.src |
| Manal Alhihi platform interface overview | نظرة عامة على واجهة منصة منال الحيحي | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.storyboard.screenshots.2.alt |
| Student experience | تجربة الطالب | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.storyboard.screenshots.2.caption |
| Six modules, one training flow. | ست وحدات ضمن مسار تدريب واحد. | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.featuresTitle |
| Each module solves a specific operational need while remaining connected to the complete learning journey. | تعالج كل وحدة حاجة تشغيلية محددة، وتبقى متصلة برحلة التعلم الكاملة. | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.featuresIntro |
| Student Accounts | حسابات الطلاب | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.features.0.title |
| A clear personal entry point for every learner. | مدخل شخصي واضح لكل طالب. | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.features.0.description |
| Course Management | إدارة الدورات | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.features.1.title |
| Courses gathered and managed in an ordered structure. | جمع الدورات وإدارتها ضمن هيكل مرتب. | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.features.1.description |
| Attendance Tracking | تتبع الحضور | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.features.2.title |
| Attendance status visible without manual guesswork. | حالة حضور واضحة دون تخمين يدوي. | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.features.2.description |
| Course Trailers | إعلانات الدورات | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.features.3.title |
| A focused preview before students enter a course. | معاينة مركزة قبل دخول الطالب إلى الدورة. | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.features.3.description |
| Content Ordering | ترتيب المحتوى | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.features.4.title |
| Learning material presented in a deliberate sequence. | عرض المواد التعليمية ضمن تسلسل مقصود. | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.features.4.description |
| Admin Clarity | وضوح الإدارة | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.features.5.title |
| A calmer view of students, courses, and follow-up. | رؤية أهدأ للطلاب والدورات والمتابعة. | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.features.5.description |
| The result was not simply a better-looking interface, but a training experience that is clearer to use, manage, and follow. | النتيجة لم تكن مجرد واجهة أجمل، بل تجربة تدريب أوضح وأسهل في الإدارة والمتابعة. | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.result |
| Start a focused digital product | ابدأ بناء منتج رقمي واضح | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.cta |
| Back to portfolio | العودة إلى معرض الأعمال | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.backHome |
| Introduction | المقدمة | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.chapters.0 |
| Before | قبل | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.chapters.1 |
| Transformation | التحول | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.chapters.2 |
| After | بعد | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.chapters.3 |
| Storyboard | المشاهد | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.chapters.4 |
| System | النظام | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.chapters.5 |
| Result | النتيجة | Complete | src/constants/caseStudies.ts | caseStudies.manal-alhihi.content.chapters.6 |
| Wedding hall booking case study | دراسة حالة لنظام حجز قاعة أفراح | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.eyebrow |
| Qasr Al-Farah: From a paper agenda to a digital booking and memory experience | قصر الفرح: من أجندة ورقية إلى تجربة حجز وذاكرة رقمية | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.title |
| Transforming the wedding hall experience from manual follow-up and repeated phone calls into a digital system that organizes bookings, invitations, and guest interaction after the event. | تحويل تجربة قاعة الأفراح من متابعة يدوية ومكالمات متكررة إلى نظام رقمي ينظّم الحجز، الدعوات، وتفاعل الضيوف بعد المناسبة. | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.positioning |
| Before the system: details were scattered and pressure was daily. | قبل النظام: التفاصيل موزعة والضغط يومي | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.before.title |
| Booking relied on a paper agenda, phone calls, and manual follow-up. Every request demanded close attention, while a delayed response could confuse a client or let an opportunity slip away. | كانت تجربة الحجز تعتمد على الأجندة الورقية، المكالمات، والمتابعة اليدوية. كل حجز يحتاج انتباهًا عاليًا، وكل تأخير بالرد قد يربك العميل أو يفتح المجال لضياع فرصة. | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.before.intro |
| A paper agenda that was difficult to search quickly. | أجندة ورقية يصعب الرجوع لها بسرعة. | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.before.points.0 |
| Repeated calls to confirm the same details. | مكالمات متكررة لتأكيد نفس التفاصيل. | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.before.points.1 |
| A booking could be forgotten or an interested client answered too late. | احتمال نسيان حجز أو تأخير الرد على عميل مهتم. | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.before.points.2 |
| Bride, groom, and event details were difficult to track. | صعوبة متابعة بيانات العريس والعروس والمناسبة. | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.before.points.3 |
| A basic website did not explain the value of the experience. | موقع بسيط لا يشرح قيمة التجربة. | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.before.points.4 |
| Visitors could see the hall but had no clear path to book it. | الزائر يرى القاعة، لكن لا يجد مسارًا واضحًا للحجز. | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.before.points.5 |
| When every booking hangs between paper notes and phone calls. | عندما يصبح كل حجز معلّقًا بين الورق والمكالمات. | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.before.microcopy |
| A booking request became a connected event journey. | تحول طلب الحجز إلى رحلة مناسبة مترابطة. | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.transformation.title |
| Calendar blocks, event details, invitation links, RSVP responses, and guest messages settle into one operational flow. | تنتظم مواعيد التقويم، تفاصيل المناسبة، روابط الدعوة، ردود الحضور، ورسائل الضيوف ضمن مسار تشغيلي واحد. | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.transformation.body |
| After the system: a clearer journey from the first visit to the last memory. | بعد النظام: رحلة أوضح من أول زيارة إلى آخر ذكرى | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.after.title |
| Booking became part of an organized digital experience. Clients understand the next step and submit a request, while the team manages details in one place. After the event, guest interaction becomes a digital book of messages and memories. | أصبح الحجز جزءًا من تجربة رقمية منظمة. العميل يفهم الخطوة التالية، يرسل طلبه، والإدارة تتابع التفاصيل من مكان واحد. وبعد المناسبة، يتحول التفاعل إلى دفتر رقمي يحفظ رسائل الضيوف وذكرياتهم. | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.after.intro |
| A clear booking flow for receiving requests. | مسار حجز واضح لاستقبال طلبات الحجز. | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.after.points.0 |
| Event data organized instead of scattered across paper and calls. | تنظيم بيانات المناسبة بدل تشتتها بين الورق والمكالمات. | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.after.points.1 |
| A consistent experience across phone, tablet, and laptop. | تجربة متوافقة مع الهاتف، التابلت، واللابتوب. | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.after.points.2 |
| Personal invitation links for the bride and groom. | روابط دعوة مخصصة للعريس والعروس. | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.after.points.3 |
| Clearer RSVP and guest participation. | تأكيد حضور ومشاركة ضيوف بطريقة أوضح. | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.after.points.4 |
| A digital memory book for messages and moments. | دفتر ذكريات رقمي للرسائل والذكريات. | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.after.points.5 |
| From exhausting manual follow-up to a booking experience the team can manage with confidence. | من متابعة يدوية مرهقة إلى تجربة حجز يمكن إدارتها بثقة. | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.after.microcopy |
| The journey continues beyond the booking. | رحلة تستمر بعد اكتمال الحجز. | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.storyboard.title |
| The system connects the operational booking path with the public hall experience, responsive access, and a lasting guest-memory layer. | يربط النظام بين مسار الحجز التشغيلي، حضور القاعة الرقمي، الوصول المتجاوب، وطبقة ذكريات تبقى بعد المناسبة. | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.storyboard.intro |
| /assest/resize/qaser-alfarah3.png | /assest/resize/qaser-alfarah3.png | Possibly duplicated | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.storyboard.screenshots.0.src |
| concept | concept | Possibly duplicated | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.storyboard.screenshots.0.presentation |
| Paper agenda and phone calls for wedding hall bookings before the system. | أجندة ورقية ومكالمات لحجوزات قاعة أفراح قبل النظام. | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.storyboard.screenshots.0.alt |
| Before the system: bookings scattered between paper and phone calls. | قبل النظام: حجوزات موزعة بين الورق والمكالمات. | Complete | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.storyboard.screenshots.0.caption |
| /assest/resize/qaser-alfarah3.png | /assest/resize/qaser-alfarah3.png | Possibly duplicated | src/constants/caseStudies.ts | caseStudies.qasr-alfarah.content.storyboard.screenshots.1.src |

_The JSON export contains 650 bilingual/hardcoded map rows._

## 4. Hardcoded Content List

These visible or accessibility-facing strings are hardcoded in components. Most should move to a content config later if they need translation, reuse, or editorial governance.

| Text | File path | Component | Type | Should move later? |
| --- | --- | --- | --- | --- |
| (() => { const themeStorageKey = "dominase-theme"; const isHome = window.location.pathname === "/"; try { const savedTheme = window.localStorage.getItem(themeStorageKey); const theme = isHome \|\| (savedTheme !== "light" && savedTheme !== "dark") ? "dark" : savedTheme; document.documentElement.dataset.theme = theme; } catch { document.documentElement.dataset.theme = "dark"; } try { if (window.sessionStorage.getItem("dominase-boot-shown") !== "1") { document.documentElement.classList.add("domi-booting"); } } catch { document.documentElement.classList.add("domi-booting"); } })(); | src/app/layout.tsx | layout | string-literal | hardcoded visible/control string candidate |
| Manal Alhihi Educational Platform | src/app/work/page.tsx | page | property:name | hardcoded visible data in component |
| Qasr Al-Farah | src/app/work/page.tsx | page | property:name | hardcoded visible data in component |
| Horvath Survey | src/app/work/page.tsx | page | property:name | hardcoded visible data in component |
| DOMINASE | src/app/work/[slug]/page.tsx | page | property:name | hardcoded visible data in component |
| Mohammed Aldomi | src/app/work/[slug]/page.tsx | page | property:name | hardcoded visible data in component |
| DOMINASE — loading | src/components/BrandPreloader.tsx | BrandPreloader | aria-label | visible/accessibility string |
| DOMINASE | src/components/BrandPreloader.tsx | BrandPreloader | jsx-text | literal JSX text |
| Digital Product Studio · Calibrating interface | src/components/BrandPreloader.tsx | BrandPreloader | jsx-text | literal JSX text |
| DOMINASE | src/components/Footer.tsx | Footer | jsx-text | literal JSX text |
| Digital Product Studio | src/components/Footer.tsx | Footer | jsx-text | literal JSX text |
| GitHub | src/components/Footer.tsx | Footer | aria-label | visible/accessibility string |
| Upwork | src/components/Footer.tsx | Footer | aria-label | visible/accessibility string |
| LinkedIn | src/components/Footer.tsx | Footer | aria-label | visible/accessibility string |
| لماذا نحن؟ | src/components/Footer.tsx | Footer | string-literal | hardcoded visible/control string candidate |
| Why Us? | src/components/Footer.tsx | Footer | string-literal | hardcoded visible/control string candidate |
| لماذا التغيير؟ | src/components/Footer.tsx | Footer | string-literal | hardcoded visible/control string candidate |
| Why Change? | src/components/Footer.tsx | Footer | string-literal | hardcoded visible/control string candidate |
| bg-surface/92 border-b border-border shadow-[0_14px_34px_var(--cool-shadow)] py-4 | src/components/Header.tsx | Header | string-literal | hardcoded visible/control string candidate |
| bg-transparent py-6 | src/components/Header.tsx | Header | string-literal | hardcoded visible/control string candidate |
| DOMINASE | src/components/Header.tsx | Header | jsx-text | literal JSX text |
| Digital Product Studio | src/components/Header.tsx | Header | jsx-text | literal JSX text |
| text-primary-theme font-bold | src/components/Header.tsx | Header | string-literal | hardcoded visible/control string candidate |
| text-muted hover:text-primary-theme | src/components/Header.tsx | Header | string-literal | hardcoded visible/control string candidate |
| Switch language | src/components/Header.tsx | Header | aria-label | visible/accessibility string |
| AR | src/components/Header.tsx | Header | string-literal | hardcoded visible/control string candidate |
| EN | src/components/Header.tsx | Header | string-literal | hardcoded visible/control string candidate |
| Toggle language | src/components/LanguageToggle.tsx | LanguageToggle | aria-label | visible/accessibility string |
| عربي | src/components/LanguageToggle.tsx | LanguageToggle | string-literal | hardcoded visible/control string candidate |
| EN | src/components/LanguageToggle.tsx | LanguageToggle | string-literal | hardcoded visible/control string candidate |
| text-primary-theme font-bold | src/components/MobileNav.tsx | MobileNav | string-literal | hardcoded visible/control string candidate |
| text-muted hover:text-primary-theme | src/components/MobileNav.tsx | MobileNav | string-literal | hardcoded visible/control string candidate |
| DATA | src/features/case-studies/AiReadinessIndexSvg.tsx | AiReadinessIndexSvg | string-literal | hardcoded visible/control string candidate |
| CAPABILITIES | src/features/case-studies/AiReadinessIndexSvg.tsx | AiReadinessIndexSvg | string-literal | hardcoded visible/control string candidate |
| STRATEGY | src/features/case-studies/AiReadinessIndexSvg.tsx | AiReadinessIndexSvg | string-literal | hardcoded visible/control string candidate |
| GOVERNANCE | src/features/case-studies/AiReadinessIndexSvg.tsx | AiReadinessIndexSvg | string-literal | hardcoded visible/control string candidate |
| VALUE | src/features/case-studies/AiReadinessIndexSvg.tsx | AiReadinessIndexSvg | string-literal | hardcoded visible/control string candidate |
| TECH | src/features/case-studies/AiReadinessIndexSvg.tsx | AiReadinessIndexSvg | string-literal | hardcoded visible/control string candidate |
| READINESS INDEX | src/features/case-studies/AiReadinessIndexSvg.tsx | AiReadinessIndexSvg | jsx-text | literal JSX text |
| 68 / 100 | src/features/case-studies/AiReadinessIndexSvg.tsx | AiReadinessIndexSvg | jsx-text | literal JSX text |
| DATA OPS | src/features/case-studies/AiReadinessIndexSvg.tsx | AiReadinessIndexSvg | property:text | hardcoded visible data in component |
| AI GOV | src/features/case-studies/AiReadinessIndexSvg.tsx | AiReadinessIndexSvg | property:text | hardcoded visible data in component |
| LEAD IN | src/features/case-studies/AiReadinessIndexSvg.tsx | AiReadinessIndexSvg | jsx-text | literal JSX text |
| flex h-full w-max flex-row | src/features/case-studies/CaseStudyHorizontalJourney.tsx | CaseStudyHorizontalJourney | string-literal | hardcoded visible/control string candidate |
| block w-full | src/features/case-studies/CaseStudyHorizontalJourney.tsx | CaseStudyHorizontalJourney | string-literal | hardcoded visible/control string candidate |
| gap-7 md:grid-cols-[1.12fr_.88fr] | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mt-5 text-3xl md:text-4xl | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mt-7 text-4xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mt-5 text-base md:text-lg | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mt-8 text-lg leading-9 sm:text-xl | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| مرّر لاكتشاف القصة | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| Scroll to follow the story | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| gap-7 md:grid-cols-[.82fr_1.18fr] md:items-center | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mt-4 text-3xl md:text-4xl | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mt-6 text-4xl sm:text-6xl | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mt-4 text-base leading-7 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mt-6 text-lg leading-8 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mt-4 text-xs leading-6 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mt-7 text-sm leading-7 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| min-h-[18rem] p-5 md:min-h-[21rem] | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| min-h-[31rem] p-7 sm:p-10 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| min-h-16 p-3 text-sm | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| min-h-24 p-5 text-base | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| sm:translate-y-5 sm:-rotate-2 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| sm:-translate-y-2 sm:rotate-1 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| sm:translate-y-9 sm:-rotate-1 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| gap-6 md:grid-cols-[.8fr_1.2fr] md:items-center | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mt-5 text-4xl sm:text-6xl | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| text-sm leading-7 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| text-base leading-8 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| p-2 md:p-4 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| p-3 sm:p-7 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mb-5 gap-4 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mb-8 gap-5 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| min-h-20 gap-3 p-4 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| min-h-36 gap-5 p-6 sm:p-8 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| h-8 w-8 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| h-10 w-10 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| BOOKING? | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | jsx-text | literal JSX text |
| mt-5 gap-4 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mt-10 gap-5 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| md:grid-cols-2 max-w-5xl mx-auto | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| md:grid-cols-2 xl:grid-cols-4 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| md:grid-cols-2 xl:grid-cols-3 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| min-h-0 px-4 py-3 text-xs | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| min-h-24 px-5 py-4 text-sm | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| gap-6 md:grid-cols-[.72fr_1.28fr] md:items-center | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mt-4 text-sm leading-7 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| min-h-0 p-4 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| min-h-56 p-6 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mt-14 text-xl | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mt-2 text-xs leading-6 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mt-3 text-sm leading-7 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mt-5 text-2xl md:text-3xl | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mt-8 text-4xl leading-[1.35] sm:text-6xl lg:text-7xl | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mt-6 gap-6 pt-6 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mt-12 gap-10 pt-10 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mb-2 text-base | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mb-4 text-xl | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| text-xs leading-5 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mt-5 pt-5 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mt-10 pt-10 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mb-3 text-xl | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| text-xs leading-6 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| text-sm leading-relaxed | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mt-6 gap-3 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| mt-12 gap-4 | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| px-5 py-2.5 text-sm | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| px-6 py-3 text-sm | src/features/case-studies/CaseStudyPanels.tsx | CaseStudyPanels | string-literal | hardcoded visible/control string candidate |
| max-h-[34svh] md:max-h-[36svh] lg:max-h-[40svh] | src/features/case-studies/transformationSvgClass.ts | transformationSvgClass | string-literal | hardcoded visible/control string candidate |
| max-h-[50svh] lg:max-h-[65vh] | src/features/case-studies/transformationSvgClass.ts | transformationSvgClass | string-literal | hardcoded visible/control string candidate |
| ملفات مبعثرة | src/features/case-study-lab/manal/BeforeAfterStickyScene.tsx | BeforeAfterStickyScene | string-literal | hardcoded visible/control string candidate |
| روابط متفرقة | src/features/case-study-lab/manal/BeforeAfterStickyScene.tsx | BeforeAfterStickyScene | string-literal | hardcoded visible/control string candidate |
| Google Drive | src/features/case-study-lab/manal/BeforeAfterStickyScene.tsx | BeforeAfterStickyScene | string-literal | hardcoded visible/control string candidate |
| متابعة يدوية | src/features/case-study-lab/manal/BeforeAfterStickyScene.tsx | BeforeAfterStickyScene | string-literal | hardcoded visible/control string candidate |
| حضور غير واضح | src/features/case-study-lab/manal/BeforeAfterStickyScene.tsx | BeforeAfterStickyScene | string-literal | hardcoded visible/control string candidate |
| اعتماد الطلاب على الرسائل | src/features/case-study-lab/manal/BeforeAfterStickyScene.tsx | BeforeAfterStickyScene | string-literal | hardcoded visible/control string candidate |
| عبء إداري | src/features/case-study-lab/manal/BeforeAfterStickyScene.tsx | BeforeAfterStickyScene | string-literal | hardcoded visible/control string candidate |
| حسابات للطلاب | src/features/case-study-lab/manal/BeforeAfterStickyScene.tsx | BeforeAfterStickyScene | string-literal | hardcoded visible/control string candidate |
| دورات منظمة | src/features/case-study-lab/manal/BeforeAfterStickyScene.tsx | BeforeAfterStickyScene | string-literal | hardcoded visible/control string candidate |
| تتبع الحضور | src/features/case-study-lab/manal/BeforeAfterStickyScene.tsx | BeforeAfterStickyScene | string-literal | hardcoded visible/control string candidate |
| إعلانات تشويقية للدورات | src/features/case-study-lab/manal/BeforeAfterStickyScene.tsx | BeforeAfterStickyScene | string-literal | hardcoded visible/control string candidate |
| محتوى مرتب | src/features/case-study-lab/manal/BeforeAfterStickyScene.tsx | BeforeAfterStickyScene | string-literal | hardcoded visible/control string candidate |
| إدارة أكثر وضوحًا | src/features/case-study-lab/manal/BeforeAfterStickyScene.tsx | BeforeAfterStickyScene | string-literal | hardcoded visible/control string candidate |
| md:min-h-[220vh] md:py-0 | src/features/case-study-lab/manal/BeforeAfterStickyScene.tsx | BeforeAfterStickyScene | string-literal | hardcoded visible/control string candidate |
| BEFORE / AFTER | src/features/case-study-lab/manal/BeforeAfterStickyScene.tsx | BeforeAfterStickyScene | jsx-text | literal JSX text |
| التنظيم لم يغيّر الشكل فقط، بل غيّر طريقة العمل. | src/features/case-study-lab/manal/BeforeAfterStickyScene.tsx | BeforeAfterStickyScene | jsx-text | literal JSX text |
| قبل المنصة | src/features/case-study-lab/manal/BeforeAfterStickyScene.tsx | BeforeAfterStickyScene | jsx-text | literal JSX text |
| بعد المنصة | src/features/case-study-lab/manal/BeforeAfterStickyScene.tsx | BeforeAfterStickyScene | jsx-text | literal JSX text |
| THE CORE EXPERIMENT / SVG | src/features/case-study-lab/manal/ChaosToPlatformSvgScene.tsx | ChaosToPlatformSvgScene | jsx-text | literal JSX text |
| من الفوضى إلى نظام واحد | src/features/case-study-lab/manal/ChaosToPlatformSvgScene.tsx | ChaosToPlatformSvgScene | jsx-text | literal JSX text |
| تتحرك الملفات والروابط ونقاط الحضور نحو منصة مركزية، ثم تتصل كأجزاء من تجربة تدريب واحدة. | src/features/case-study-lab/manal/ChaosToPlatformSvgScene.tsx | ChaosToPlatformSvgScene | jsx-text | literal JSX text |
| scattered inputs | src/features/case-study-lab/manal/ChaosToPlatformSvgScene.tsx | ChaosToPlatformSvgScene | jsx-text | literal JSX text |
| connected platform | src/features/case-study-lab/manal/ChaosToPlatformSvgScene.tsx | ChaosToPlatformSvgScene | jsx-text | literal JSX text |
| رسم تجريدي يوضح انتقال ملفات ودورات مبعثرة إلى منصة تدريب منظمة | src/features/case-study-lab/manal/ChaosToPlatformSvgScene.tsx | ChaosToPlatformSvgScene | aria-label | visible/accessibility string |
| STATIC FINAL STATE / MOBILE | src/features/case-study-lab/manal/ChaosToPlatformSvgScene.tsx | ChaosToPlatformSvgScene | jsx-text | literal JSX text |
| حسابات الطلاب | src/features/case-study-lab/manal/FeatureSystemScene.tsx | FeatureSystemScene | string-literal | hardcoded visible/control string candidate |
| Student Accounts | src/features/case-study-lab/manal/FeatureSystemScene.tsx | FeatureSystemScene | string-literal | hardcoded visible/control string candidate |
| إدارة الدورات | src/features/case-study-lab/manal/FeatureSystemScene.tsx | FeatureSystemScene | string-literal | hardcoded visible/control string candidate |
| Course Management | src/features/case-study-lab/manal/FeatureSystemScene.tsx | FeatureSystemScene | string-literal | hardcoded visible/control string candidate |
| تتبع الحضور | src/features/case-study-lab/manal/FeatureSystemScene.tsx | FeatureSystemScene | string-literal | hardcoded visible/control string candidate |
| Attendance Tracking | src/features/case-study-lab/manal/FeatureSystemScene.tsx | FeatureSystemScene | string-literal | hardcoded visible/control string candidate |
| إعلانات الدورات | src/features/case-study-lab/manal/FeatureSystemScene.tsx | FeatureSystemScene | string-literal | hardcoded visible/control string candidate |
| Course Trailers | src/features/case-study-lab/manal/FeatureSystemScene.tsx | FeatureSystemScene | string-literal | hardcoded visible/control string candidate |
| ترتيب المحتوى | src/features/case-study-lab/manal/FeatureSystemScene.tsx | FeatureSystemScene | string-literal | hardcoded visible/control string candidate |
| Content Ordering | src/features/case-study-lab/manal/FeatureSystemScene.tsx | FeatureSystemScene | string-literal | hardcoded visible/control string candidate |
| وضوح الإدارة | src/features/case-study-lab/manal/FeatureSystemScene.tsx | FeatureSystemScene | string-literal | hardcoded visible/control string candidate |
| Admin Clarity | src/features/case-study-lab/manal/FeatureSystemScene.tsx | FeatureSystemScene | string-literal | hardcoded visible/control string candidate |
| PLATFORM MODULES | src/features/case-study-lab/manal/FeatureSystemScene.tsx | FeatureSystemScene | jsx-text | literal JSX text |
| منظومة، وليست مجموعة بطاقات. | src/features/case-study-lab/manal/FeatureSystemScene.tsx | FeatureSystemScene | jsx-text | literal JSX text |
| كل وحدة لها وظيفة واضحة، لكنها تتصل ببقية الوحدات داخل مسار تدريب واحد. | src/features/case-study-lab/manal/FeatureSystemScene.tsx | FeatureSystemScene | jsx-text | literal JSX text |
| MODULE | src/features/case-study-lab/manal/FeatureSystemScene.tsx | FeatureSystemScene | jsx-text | literal JSX text |
| CASE STUDY MOTION LAB / 01 | src/features/case-study-lab/manal/ManalHeroScene.tsx | ManalHeroScene | jsx-text | literal JSX text |
| المدربة منال الحيحي: من دورات مبعثرة إلى منصة تدريب منظمة | src/features/case-study-lab/manal/ManalHeroScene.tsx | ManalHeroScene | jsx-text | literal JSX text |
| تحويل تجربة التدريب من روابط وملفات موزعة ومتابعة يدوية إلى منصة رقمية تجمع الطلاب، الدورات، الحضور، والمحتوى في مكان واحد واضح. | src/features/case-study-lab/manal/ManalHeroScene.tsx | ManalHeroScene | jsx-text | literal JSX text |
| شاهد التحول | src/features/case-study-lab/manal/ManalHeroScene.tsx | ManalHeroScene | jsx-text | literal JSX text |
| THE RESULT | src/features/case-study-lab/manal/ResultStatementScene.tsx | ResultStatementScene | jsx-text | literal JSX text |
| النتيجة لم تكن مجرد واجهة أجمل، بل تجربة تدريب أوضح وأسهل في الإدارة والمتابعة. | src/features/case-study-lab/manal/ResultStatementScene.tsx | ResultStatementScene | jsx-text | literal JSX text |
| Manal Alhihi Training Platform / Motion Study | src/features/case-study-lab/manal/ResultStatementScene.tsx | ResultStatementScene | jsx-text | literal JSX text |
| طبقة القرار | src/features/home/components/AboutSection.tsx | AboutSection | string-literal | hardcoded visible/control string candidate |
| Decision layer | src/features/home/components/AboutSection.tsx | AboutSection | string-literal | hardcoded visible/control string candidate |
| flex-1 min-w-0 | src/features/home/components/BeneathInterfaceSection.tsx | BeneathInterfaceSection | string-literal | hardcoded visible/control string candidate |
| w-[46%] shrink-0 | src/features/home/components/BeneathInterfaceSection.tsx | BeneathInterfaceSection | string-literal | hardcoded visible/control string candidate |
| flex items-center gap-8 p-8 | src/features/home/components/BeneathInterfaceSection.tsx | BeneathInterfaceSection | string-literal | hardcoded visible/control string candidate |
| flex flex-col gap-6 p-6 | src/features/home/components/BeneathInterfaceSection.tsx | BeneathInterfaceSection | string-literal | hardcoded visible/control string candidate |
| 0 20px 80px | src/features/home/components/BeneathInterfaceSection.tsx | BeneathInterfaceSection | string-literal | hardcoded visible/control string candidate |
| 0 16px 80px | src/features/home/components/BeneathInterfaceSection.tsx | BeneathInterfaceSection | string-literal | hardcoded visible/control string candidate |
| items-end text-end | src/features/home/components/BeneathInterfaceSection.tsx | BeneathInterfaceSection | string-literal | hardcoded visible/control string candidate |
| items-start text-start | src/features/home/components/BeneathInterfaceSection.tsx | BeneathInterfaceSection | string-literal | hardcoded visible/control string candidate |
| DOMINASE | src/features/home/components/BeneathInterfaceSvg.tsx | BeneathInterfaceSvg | jsx-text | literal JSX text |
| w-full rounded-xl border border-border bg-surface-hover px-4 py-3.5 text-foreground outline-none transition-colors duration-200 placeholder:text-muted/60 focus:border-primary-theme focus:ring-2 focus:ring-primary-theme/25 aria-[invalid=true]:border-red-500/70 aria-[invalid=true]:ring-red-500/20 | src/features/home/components/ContactForm.tsx | ContactForm | string-literal | hardcoded visible/control string candidate |
| Leave this field empty | src/features/home/components/ContactForm.tsx | ContactForm | jsx-text | literal JSX text |
| Features | src/features/home/components/FeaturesSection.tsx | FeaturesSection | jsx-text | literal JSX text |
| DOMINASE | src/features/home/components/Hero.tsx | Hero | jsx-text | literal JSX text |
| attribute vec2 aPosition; void main() { gl_Position = vec4(aPosition, 0.0, 1.0); } | src/features/home/components/HeroShaderBackground.tsx | HeroShaderBackground | string-literal | hardcoded visible/control string candidate |
| precision highp float; uniform vec2 uResolution; uniform float uTime; uniform vec3 uBgA; /* obsidian base (top) */ uniform vec3 uBgB; /* obsidian surface (bottom) */ uniform vec3 uAccent; /* emerald */ uniform vec3 uAccentSoft; /* mint (bright accent) */ uniform float uIntensity; /* overall signal energy */ const float SPEED = 0.2; const float SCALE = 4.5; const int LINE_COUNT = 12; /* Deterministic pseudo-random wave (sum of incommensurate cosines). */ float wave(float t) { return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0; } float plasmaY(float x, float fade, float offset) { return wave(x * 0.2 + uTime * SPEED) * fade + offset; } void main() { vec2 uv = gl_FragCoord.xy / uResolution.xy; vec2 space = (gl_FragCoord.xy - uResolution.xy * 0.5) / uResolution.x * 2.0 * SCALE; /* Energy concentrates mid-frame horizontally, fades at edges. */ float horizontalFade = 1.0 - (cos(uv.x * 6.28318) * 0.5 + 0.5); float verticalFade = 1.0 - (cos(uv.y * 6.28318) * 0.5 + 0.5); /* Slow atmospheric warp — cinematic drift, not chaos. */ space.y += wave(space.x * 0.5 + uTime * SPEED * 0.2) * (0.4 + horizontalFade * 0.5); /* Readability mask: attenuate line energy behind the Hero copy. */ float centerMask = smoothstep(0.16, 0.6, length((uv - vec2(0.5, 0.52)) * vec2(1.0, 1.35))); /* Obsidian base — vertical blend of the two theme background tokens. */ vec3 col = mix(uBgA, uBgB, uv.y); col *= 0.72 + 0.28 * verticalFade; vec3 lines = vec3(0.0); for (int l = 0; l < LINE_COUNT; l++) { float i = float(l); float offsetTime = uTime * SPEED * 1.33; float offsetPos = i + space.x * 0.5; float rand = wave(offsetPos + offsetTime) * 0.5 + 0.5; float halfWidth = mix(0.012, 0.14, rand * horizontalFade) * 0.5; float offset = wave(offsetPos + offsetTime * (1.0 + i / float(LINE_COUNT))) * mix(0.7, 2.1, horizontalFade); float linePos = plasmaY(space.x, horizontalFade, offset); float d = abs(linePos - space.y); /* Soft body + crisp core, no glow bloom. */ float line = smoothstep(halfWidth, 0.0, d) * 0.45 + smoothstep(halfWidth * 0.15 + 0.01, halfWidth * 0.15, d) * 0.8; lines += line * mix(uAccent, uAccentSoft, rand * 0.55) * rand; } col += lines * uIntensity * (0.3 + 0.7 * centerMask); gl_FragColor = vec4(col, 1.0); } | src/features/home/components/HeroShaderBackground.tsx | HeroShaderBackground | string-literal | hardcoded visible/control string candidate |
| Cluttered desk with papers and notes | src/features/home/components/ProblemSection.tsx | ProblemSection | alt | visible/accessibility string |
| Close project showcase | src/features/home/components/ProjectShowcaseModal.tsx | ProjectShowcaseModal | aria-label | visible/accessibility string |
| Previous screenshot | src/features/home/components/ProjectShowcaseModal.tsx | ProjectShowcaseModal | aria-label | visible/accessibility string |
| Next screenshot | src/features/home/components/ProjectShowcaseModal.tsx | ProjectShowcaseModal | aria-label | visible/accessibility string |
| w-5 bg-white | src/features/home/components/ProjectShowcaseModal.tsx | ProjectShowcaseModal | string-literal | hardcoded visible/control string candidate |
| w-1.5 bg-white/40 hover:bg-white/60 | src/features/home/components/ProjectShowcaseModal.tsx | ProjectShowcaseModal | string-literal | hardcoded visible/control string candidate |
| border-transparent opacity-50 hover:opacity-80 | src/features/home/components/ProjectShowcaseModal.tsx | ProjectShowcaseModal | string-literal | hardcoded visible/control string candidate |
| لقطة | src/features/home/components/ProjectShowcaseModal.tsx | ProjectShowcaseModal | string-literal | hardcoded visible/control string candidate |
| Screen | src/features/home/components/ProjectShowcaseModal.tsx | ProjectShowcaseModal | string-literal | hardcoded visible/control string candidate |
| Previous | src/features/home/components/ProjectShowcaseModal.tsx | ProjectShowcaseModal | aria-label | visible/accessibility string |
| Next | src/features/home/components/ProjectShowcaseModal.tsx | ProjectShowcaseModal | aria-label | visible/accessibility string |
| عرض دراسة الحالة الكاملة | src/features/home/components/ProjectShowcaseModal.tsx | ProjectShowcaseModal | string-literal | hardcoded visible/control string candidate |
| View full case study | src/features/home/components/ProjectShowcaseModal.tsx | ProjectShowcaseModal | string-literal | hardcoded visible/control string candidate |
| مشروع من DOMINASE بقيادة Mohammed Aldomi | src/features/home/components/ProjectShowcaseModal.tsx | ProjectShowcaseModal | string-literal | hardcoded visible/control string candidate |
| A DOMINASE project by Mohammed Aldomi | src/features/home/components/ProjectShowcaseModal.tsx | ProjectShowcaseModal | string-literal | hardcoded visible/control string candidate |
| Manal Alhihi | src/features/home/components/SelectedWorkCarousel.tsx | SelectedWorkCarousel | property:title | hardcoded visible data in component |
| Qaser Al Farah | src/features/home/components/SelectedWorkCarousel.tsx | SelectedWorkCarousel | property:title | hardcoded visible data in component |
| SELECTED WORK | src/features/home/components/SelectedWorkCarousel.tsx | SelectedWorkCarousel | string-literal | hardcoded visible/control string candidate |
| عرض دراسة الحالة | src/features/home/components/SelectedWorkCarousel.tsx | SelectedWorkCarousel | string-literal | hardcoded visible/control string candidate |
| View Case Study | src/features/home/components/SelectedWorkCarousel.tsx | SelectedWorkCarousel | string-literal | hardcoded visible/control string candidate |
| Selected Work | src/features/home/components/SelectedWorkCarousel.tsx | SelectedWorkCarousel | string-literal | hardcoded visible/control string candidate |
| flex-row-reverse text-end | src/features/home/components/SelectedWorkCarousel.tsx | SelectedWorkCarousel | string-literal | hardcoded visible/control string candidate |
| مرر للاستكشاف | src/features/home/components/SelectedWorkCarousel.tsx | SelectedWorkCarousel | string-literal | hardcoded visible/control string candidate |
| Scroll to explore | src/features/home/components/SelectedWorkCarousel.tsx | SelectedWorkCarousel | string-literal | hardcoded visible/control string candidate |
| Beta Inc. | src/features/home/components/SocialProof.tsx | SocialProof | string-literal | hardcoded visible/control string candidate |
| Gamma LLC | src/features/home/components/SocialProof.tsx | SocialProof | string-literal | hardcoded visible/control string candidate |
| Delta Co. | src/features/home/components/SocialProof.tsx | SocialProof | string-literal | hardcoded visible/control string candidate |
| Epsilon Group | src/features/home/components/SocialProof.tsx | SocialProof | string-literal | hardcoded visible/control string candidate |
| Zeta Solutions | src/features/home/components/SocialProof.tsx | SocialProof | string-literal | hardcoded visible/control string candidate |
| Clean organized workspace | src/features/home/components/SolutionSection.tsx | SolutionSection | alt | visible/accessibility string |
| 0 32px 80px -32px var(--cool-shadow) | src/features/home/components/TestimonialsSection.tsx | TestimonialsSection | string-literal | hardcoded visible/control string candidate |
| 0 8px 24px -12px var(--cool-shadow) | src/features/home/components/TestimonialsSection.tsx | TestimonialsSection | string-literal | hardcoded visible/control string candidate |
| ما لاحظه العملاء بعد البناء. | src/features/home/components/TestimonialsSection.tsx | TestimonialsSection | string-literal | hardcoded visible/control string candidate |
| What clients noticed after the build. | src/features/home/components/TestimonialsSection.tsx | TestimonialsSection | string-literal | hardcoded visible/control string candidate |
| آراء حقيقية من مشاريع كان فيها الوضوح، الثقة، والتنفيذ مهمين. | src/features/home/components/TestimonialsSection.tsx | TestimonialsSection | string-literal | hardcoded visible/control string candidate |
| Real feedback from projects where clarity, trust, and execution mattered. | src/features/home/components/TestimonialsSection.tsx | TestimonialsSection | string-literal | hardcoded visible/control string candidate |
| إشارات ثقة | src/features/home/components/TestimonialsSection.tsx | TestimonialsSection | string-literal | hardcoded visible/control string candidate |
| Proof Signals | src/features/home/components/TestimonialsSection.tsx | TestimonialsSection | string-literal | hardcoded visible/control string candidate |
| ms-auto text-end | src/features/home/components/TestimonialsSection.tsx | TestimonialsSection | string-literal | hardcoded visible/control string candidate |
| تقييمات العملاء | src/features/home/components/TestimonialsSection.tsx | TestimonialsSection | string-literal | hardcoded visible/control string candidate |
| Client testimonials carousel | src/features/home/components/TestimonialsSection.tsx | TestimonialsSection | string-literal | hardcoded visible/control string candidate |
| items-end text-end | src/features/home/components/TestimonialsSection.tsx | TestimonialsSection | string-literal | hardcoded visible/control string candidate |
| min-h-[17rem] sm:min-h-[14rem] md:min-h-[12rem] lg:min-h-[18rem] xl:min-h-[15rem] | src/features/home/components/TestimonialsSection.tsx | TestimonialsSection | string-literal | hardcoded visible/control string candidate |
| min-h-[10rem] md:min-h-[9rem] | src/features/home/components/TestimonialsSection.tsx | TestimonialsSection | string-literal | hardcoded visible/control string candidate |
| text-lg font-black leading-[1.85] text-foreground md:text-xl lg:text-[1.35rem] lg:leading-[1.75] | src/features/home/components/TestimonialsSection.tsx | TestimonialsSection | string-literal | hardcoded visible/control string candidate |
| text-xl font-black leading-snug text-foreground md:text-2xl lg:text-[1.65rem] lg:leading-snug | src/features/home/components/TestimonialsSection.tsx | TestimonialsSection | string-literal | hardcoded visible/control string candidate |
| الشهادة السابقة | src/features/home/components/TestimonialsSection.tsx | TestimonialsSection | string-literal | hardcoded visible/control string candidate |
| Previous testimonial | src/features/home/components/TestimonialsSection.tsx | TestimonialsSection | string-literal | hardcoded visible/control string candidate |
| التنقل بين الشهادات | src/features/home/components/TestimonialsSection.tsx | TestimonialsSection | string-literal | hardcoded visible/control string candidate |
| Testimonial navigation | src/features/home/components/TestimonialsSection.tsx | TestimonialsSection | string-literal | hardcoded visible/control string candidate |
| شهادة | src/features/home/components/TestimonialsSection.tsx | TestimonialsSection | string-literal | hardcoded visible/control string candidate |
| الشهادة التالية | src/features/home/components/TestimonialsSection.tsx | TestimonialsSection | string-literal | hardcoded visible/control string candidate |
| Next testimonial | src/features/home/components/TestimonialsSection.tsx | TestimonialsSection | string-literal | hardcoded visible/control string candidate |
| Serious digital products deserve a memorable first impression | src/features/motion-lab/components/CinematicTextRevealScene.tsx | CinematicTextRevealScene | string-literal | hardcoded visible/control string candidate |
| Cinematic text reveal | src/features/motion-lab/components/CinematicTextRevealScene.tsx | CinematicTextRevealScene | jsx-text | literal JSX text |
| Use this for one or two meaningful statements only. Repeating this pattern everywhere makes a premium site feel noisy. | src/features/motion-lab/components/CinematicTextRevealScene.tsx | CinematicTextRevealScene | jsx-text | literal JSX text |
| Expanding dot transition | src/features/motion-lab/components/ExpandingDotScene.tsx | ExpandingDotScene | jsx-text | literal JSX text |
| One small gesture can become the next world. | src/features/motion-lab/components/ExpandingDotScene.tsx | ExpandingDotScene | jsx-text | literal JSX text |
| This pattern can bridge two sections, open a case study, or turn a tiny UI action into a cinematic background transition. | src/features/motion-lab/components/ExpandingDotScene.tsx | ExpandingDotScene | jsx-text | literal JSX text |
| Horizontal scroll scene | src/features/motion-lab/components/HorizontalScrollScene.tsx | HorizontalScrollScene | jsx-text | literal JSX text |
| Vertical scroll, horizontal product journey. | src/features/motion-lab/components/HorizontalScrollScene.tsx | HorizontalScrollScene | jsx-text | literal JSX text |
| Useful for project timelines, service process cards, or selected work rows where the viewer should feel a guided cinematic progression. | src/features/motion-lab/components/HorizontalScrollScene.tsx | HorizontalScrollScene | jsx-text | literal JSX text |
| Motion card | src/features/motion-lab/components/HorizontalScrollScene.tsx | HorizontalScrollScene | jsx-text | literal JSX text |
| Placeholder copy for a premium portfolio section. Replace this with the actual project logic when the pattern graduates. | src/features/motion-lab/components/HorizontalScrollScene.tsx | HorizontalScrollScene | jsx-text | literal JSX text |
| Sticky split | src/features/motion-lab/components/MotionLabPage.tsx | MotionLabPage | property:label | hardcoded visible data in component |
| Dot transition | src/features/motion-lab/components/MotionLabPage.tsx | MotionLabPage | property:label | hardcoded visible data in component |
| Text reveal | src/features/motion-lab/components/MotionLabPage.tsx | MotionLabPage | property:label | hardcoded visible data in component |
| DOMINASE / isolated experiments | src/features/motion-lab/components/MotionLabPage.tsx | MotionLabPage | jsx-text | literal JSX text |
| Motion patterns for premium portfolio storytelling. | src/features/motion-lab/components/MotionLabPage.tsx | MotionLabPage | jsx-text | literal JSX text |
| This route is intentionally separate from the real homepage. Each scene focuses on one reusable scroll interaction that can be studied, simplified, and later adapted. | src/features/motion-lab/components/MotionLabPage.tsx | MotionLabPage | jsx-text | literal JSX text |
| Motion lab scenes | src/features/motion-lab/components/MotionLabPage.tsx | MotionLabPage | aria-label | visible/accessibility string |
| End of lab | src/features/motion-lab/components/MotionLabPage.tsx | MotionLabPage | jsx-text | literal JSX text |
| These are motion ingredients, not a redesign. | src/features/motion-lab/components/MotionLabPage.tsx | MotionLabPage | jsx-text | literal JSX text |
| The useful next step is to decide which pattern deserves to graduate into the portfolio: hero reveal, project storytelling, or case-study opening transitions. | src/features/motion-lab/components/MotionLabPage.tsx | MotionLabPage | jsx-text | literal JSX text |
| 01 / Context | src/features/motion-lab/components/StickySplitScene.tsx | StickySplitScene | property:eyebrow | hardcoded visible data in component |
| Frame the product before showing the interface. | src/features/motion-lab/components/StickySplitScene.tsx | StickySplitScene | property:title | hardcoded visible data in component |
| A premium case study should first make the viewer understand the pressure, audience, and business stakes. | src/features/motion-lab/components/StickySplitScene.tsx | StickySplitScene | property:body | hardcoded visible data in component |
| 02 / System | src/features/motion-lab/components/StickySplitScene.tsx | StickySplitScene | property:eyebrow | hardcoded visible data in component |
| Let the visual side stay stable while the story advances. | src/features/motion-lab/components/StickySplitScene.tsx | StickySplitScene | property:title | hardcoded visible data in component |
| The right panel acts like a fixed evidence board. The left side changes the narrative without losing visual orientation. | src/features/motion-lab/components/StickySplitScene.tsx | StickySplitScene | property:body | hardcoded visible data in component |
| 03 / Outcome | src/features/motion-lab/components/StickySplitScene.tsx | StickySplitScene | property:eyebrow | hardcoded visible data in component |
| End with a memorable proof moment. | src/features/motion-lab/components/StickySplitScene.tsx | StickySplitScene | property:title | hardcoded visible data in component |
| The final state can introduce metrics, a launch shot, or a stronger call to open the complete case study. | src/features/motion-lab/components/StickySplitScene.tsx | StickySplitScene | property:body | hardcoded visible data in component |
| Project evidence | src/features/motion-lab/components/StickySplitScene.tsx | StickySplitScene | jsx-text | literal JSX text |
| Scroll state | src/features/motion-lab/components/StickySplitScene.tsx | StickySplitScene | jsx-text | literal JSX text |
| DOMINASE | src/features/why-change/WhyChangeClient.tsx | WhyChangeClient | jsx-text | literal JSX text |
| Scattered courses | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | property:beforeEn | hardcoded visible data in component |
| دورات مبعثرة | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | property:beforeAr | hardcoded visible data in component |
| Training platform | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | property:afterEn | hardcoded visible data in component |
| منصة تدريب | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | property:afterAr | hardcoded visible data in component |
| Paper booking | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | property:beforeEn | hardcoded visible data in component |
| حجوزات ورقية | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | property:beforeAr | hardcoded visible data in component |
| Digital wedding system | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | property:afterEn | hardcoded visible data in component |
| نظام أفراح رقمي | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | property:afterAr | hardcoded visible data in component |
| Unclear care requests | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | property:beforeEn | hardcoded visible data in component |
| طلبات رعاية غير واضحة | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | property:beforeAr | hardcoded visible data in component |
| Healthcare coordination | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | property:afterEn | hardcoded visible data in component |
| تنسيق الرعاية الصحية | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | property:afterAr | hardcoded visible data in component |
| Broad AI question | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | property:beforeEn | hardcoded visible data in component |
| سؤال عام عن الذكاء الاصطناعي | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | property:beforeAr | hardcoded visible data in component |
| Readiness index | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | property:afterEn | hardcoded visible data in component |
| مؤشر الجاهزية | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | property:afterAr | hardcoded visible data in component |
| دراسات حالة تُظهر التحول، لا مجرد الشكل | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | string-literal | hardcoded visible/control string candidate |
| Case studies showing transformation, not just form | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | string-literal | hardcoded visible/control string candidate |
| كل مشروع يوثّق انتقالًا واضحًا: من تجربة مبعثرة إلى نظام رقمي منظم. | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | string-literal | hardcoded visible/control string candidate |
| Every project documents a clear transition: from scattered chaos to an organized digital system. | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | string-literal | hardcoded visible/control string candidate |
| معرض الأعمال | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | string-literal | hardcoded visible/control string candidate |
| Portfolio | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | string-literal | hardcoded visible/control string candidate |
| شجرة التحول | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | string-literal | hardcoded visible/control string candidate |
| Transformation tree | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | string-literal | hardcoded visible/control string candidate |
| عرض دراسة الحالة | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | string-literal | hardcoded visible/control string candidate |
| View case study | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | string-literal | hardcoded visible/control string candidate |
| مشاريع التحول | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | string-literal | hardcoded visible/control string candidate |
| Transformation projects | src/features/work/TransformationTreeClient.tsx | TransformationTreeClient | string-literal | hardcoded visible/control string candidate |

## 5. Claims And Credibility Audit

| Claim | Category | Flag | Route | File path | Notes |
| --- | --- | --- | --- | --- | --- |
| Digital systems built to move business. | business outcome claim | Needs evidence | / | src/constants/content.ts | Strong promise; later rewrite should connect to proof or narrow the promise. |
| We design websites, dashboards, and product experiences that turn complexity into trust, clarity, and action. | service claim | Too generic | / | src/constants/content.ts | Clear service positioning but abstract without examples. |
| Premium marketing websites with strong visual direction, precise responsive layouts, purposeful motion, and conversion-aware sections. | quality claim | Safe | / | src/constants/content.ts | Describes service characteristics rather than measurable outcomes. |
| Clean operational screens for admin panels, booking management, content flows, data capture, and business workflows. | service claim | Safe | / | src/constants/content.ts | Concrete service list. |
| Real interface systems spanning booking platforms, healthcare experiences, surveys, education, dashboards, and conversion-focused presentation. | factual claim | Needs evidence | / | src/constants/content.ts | References real project surfaces; should remain tied to case studies. |
| The studio is built around practical product surfaces, not placeholder praise. | quality claim | Needs human rewrite | / | src/constants/content.ts | Meta-positioning is useful but could sound defensive. |
| Three named testimonial quotes from Curevie, Inkspire, and an Engineering Company. | testimonial/client claim | Needs evidence | / | src/constants/content.ts | Keep only if permission and attribution are verified. |
| Standing still is not neutral. | business outcome claim | Could be stronger | /why-change | src/features/why-change/WhyChangeClient.tsx | Memorable but broad; later rewrite can ground it in concrete business situations. |
| A website that stays the same is quietly falling behind. | business outcome claim | Needs evidence | /why-change | src/features/why-change/WhyChangeClient.tsx | Plausible, but categorical. |
| Design is now the first proof of competence. | quality claim | Too salesy | /why-change | src/features/why-change/WhyChangeClient.tsx | Strong rhetorical claim; could be softened or supported. |
| Built like a system, not a template. | service claim | Safe | /why-us | src/features/why-us/WhyUsClient.tsx | Brand position, not a metric. |
| Arabic and English are designed together from the start ? not translated at the end. | service claim | Safe | /why-us | src/features/why-us/WhyUsClient.tsx | Concrete process claim. |
| Nothing animates that would cost your visitors' hardware or your credibility. | performance claim | Needs evidence | /why-us | src/features/why-us/WhyUsClient.tsx | Absolute wording should be verified against implementation and softened later. |
| Every project documents a clear transition: from scattered chaos to an organized digital system. | business outcome claim | Needs evidence | /work | src/features/work/TransformationTreeClient.tsx | Core case-study promise; should be supported by screenshots and problem/result detail. |
| The Horvath survey became a lead generation tool, not just a survey. | business outcome claim | Needs evidence | /work/[slug] | src/constants/caseStudies.ts | Business outcome claim; should be backed by client/result context if kept. |
| The Qasr Al-Farah system made booking clearer from first visit to guest memory. | business outcome claim | Needs evidence | /work/[slug] | src/constants/caseStudies.ts | Useful narrative, but outcome specifics should be verified. |
| The Manal Alhihi platform made training clearer to use, manage, and follow. | business outcome claim | Needs evidence | /work/[slug] | src/constants/caseStudies.ts | Safe if framed as qualitative result; stronger with evidence. |

## 6. Human Rewrite Opportunities

No rewrites are implemented here. These are diagnostic notes for a future copy pass.

| Current text / area | Route | Section | Opportunity |
| --- | --- | --- | --- |
| Digital systems built to move business. | / | hero | Unclear value; business promise needs a more human, specific reason to care. |
| turn complexity into trust, clarity, and action | / | hero | Abstract triad; risks sounding agency-like. |
| Beneath the Interface | / | method | Strong concept, but several layer descriptions are technical and could use more client-facing stakes. |
| Proof Signals | / | testimonials | Interesting label; may feel less human than testimonials/social proof. |
| Standing still is not neutral. | /why-change | hero | Strong but abstract; needs concrete customer/business tension. |
| You do not see what leaks. | /why-change | leakage | Good diagnostic frame; later rewrite can add examples from real business behavior. |
| Built like a system, not a template. | /why-us | hero | Good brand line; needs a more human follow-through. |
| Cinematic but usable | /why-us | differentiators | Clear but could show tradeoffs DOMINASE makes in practice. |
| Case-study copy uses many transformation claims. | /work/[slug] | case studies | Needs more human client context, constraints, and concrete proof points. |
| Some Arabic literals appear mojibake-encoded in source output. | sitewide | bilingual | Verify actual browser rendering and normalize source encoding before serious Arabic rewrite. |

Biggest patterns:

- The homepage hero is clear but abstract; it needs a sharper human reason to act.
- The why-pages have strong strategic framing, but several claims need proof or concrete examples.
- Case studies describe transformation well, but they need more lived context, constraints, and evidence.
- Testimonials/client quotes should be permission-verified before being made more prominent.
- Arabic coverage exists in major content systems, but some source literals render as mojibake in code output and should be normalized before a serious Arabic rewrite.
- Many labels live inside components; future rewrite should centralize them for bilingual consistency.

## 7. Suggested Future Rewrite Structure

1. Phase 1: Homepage hero, service positioning, final CTA, and contact conversion copy.
2. Phase 2: `/why-change` diagnostic narrative and proof examples.
3. Phase 3: `/why-us` method narrative, differentiators, and execution discipline.
4. Phase 4: `/work` and `/work/[slug]` case-study storytelling, proof, and outcomes.
5. Phase 5: Microcopy, aria labels, preloader text, SEO metadata, and Arabic normalization.
