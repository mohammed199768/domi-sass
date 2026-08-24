# DOMINASE CTA inventory

Release date: 2026-08-25

## Classification

| Class | Purpose | Release treatment |
|---|---|---|
| A. Global primary conversion | Start the consultation | Standardized to `احجز استشارة` / `Book a consultation` and opens the reusable three-step flow |
| B. Contextual navigation | Continue the current task or journey | Preserved when it is the most logical next action |
| C. Content discovery | Read an article or explore an idea | Preserved and placed in editorial relationship clusters |
| D. Product/service discovery | Explore a service, solution, or related work | Preserved and connected through semantic pathways |
| E. Contact/conversion | Submit context, contact the studio, or continue an existing contact workflow | Primary commercial instances promoted to the consultation flow; the real contact route remains available |
| F. Redundant/duplicated | Repeated generic project/contact prompts with no distinct intent | Demoted, consolidated, or replaced by one primary consultation action |

## Surface inventory

| Surface | Previous role | Classification | Release result |
|---|---|---|---|
| Desktop header | Generic commercial action | A / F | One persistent consultation trigger |
| Mobile navigation | Generic commercial action | A / F | Consultation trigger retained as the strongest mobile action |
| Homepage hero | Start-project conversion | A | Consultation trigger; contextual homepage exploration remains secondary |
| Homepage action gateway | Mixed project/solution prompts | A + D | Consultation is primary; education and systems routes remain contextual |
| Footer commercial block | Generic contact/project prompt | A | Consultation trigger plus compact discovery groups |
| Footer links | Broad discovery list | B + C + D | Reorganized into Services, Work & Insights, Solutions, and Company |
| Service detail hero | Start service/project action | A | Consultation opens with the service interest preselected |
| Service detail ending | Generic conversion | C + D + A | Related work, related insight, then consultation |
| Work detail | View/continue portfolio journey | B + C + D + A | Project navigation preserved; adds related service, insight, and consultation |
| Insight article inline | Continue reading/learn more | C + D | One relevant commercial/service link after the first section |
| Insight article ending | Generic article CTA | C + D + A | Related service/work or insight plus consultation |
| Insights index ending | Generic contact | A | Consultation trigger |
| Jordan / Saudi market pages | Start-project conversion | A + D | Consultation primary; real service links remain contextual |
| About ending | Generic project/contact action | A | Consultation trigger |
| Why Change / Why Us | Generic commercial action | A | Consultation trigger; editorial navigation preserved |
| Contact route | Existing lead form | E | Route remains crawlable and usable; consultation is the dominant cross-site path |
| Diagnosis hub and flows | Start/continue diagnosis | B | Diagnosis actions remain contextual and are not replaced |
| Work cards | View project | B / D | Preserved |
| Article cards | Read article | C | Preserved |
| Language and theme controls | Interface settings | B | Unchanged |
| WhatsApp utility | Existing direct-contact utility | E | Preserved; not promoted over consultation |

## Conversion event inventory

- `consultation_open`
- `consultation_step_1_complete`
- `consultation_step_2_complete`
- `consultation_submit`
- `consultation_success`
- `related_service_click`
- `related_work_click`
- `related_insight_click`

The adapter forwards these events only when the existing page exposes `gtag` or `dataLayer`; it does not install a second analytics platform and does not send contact details as analytics fields.
