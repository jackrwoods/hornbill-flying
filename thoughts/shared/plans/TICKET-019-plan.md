---
id: TICKET-019-plan
title: "Implementation plan: FAQ page (/faq/)"
ticket: TICKET-019
status: draft
created: 2026-06-18
---

## 1. Scope summary

TICKET-019 builds the public FAQ page at `/faq/`. The page is a curated, expandable accordion of common prospective-student questions covering medical certificates, scheduling, deposits/payment, what to bring, weather and cancellation policy, age limits, time and cost expectations, Part 61 vs Part 141, and next steps after a discovery flight.

What this ticket produces:

- A dedicated `/faq/` route in the Next.js static export.
- On-brand FAQ copy written for prospective students, with concise answers and internal links to discovery flight, program pages, fleet/pricing, and contact.
- An accessible accordion UI using the shared `FAQAccordion` component introduced in TICKET-001.
- FAQPage JSON-LD schema plus BreadcrumbList, following the design doc’s schema priority list.
- SEO metadata (title, description, canonical, OpenGraph/Twitter) and inclusion in the auto-generated sitemap.

This ticket does **not** implement: the booking widget, backend API, contact form backend, live chat, or program detail content. Those are handled by their respective tickets. The FAQ page itself is read-only; it only links to booking/contact destinations.

---

## 2. Exact file paths to create or modify

### New page

| File | Purpose |
|------|---------|
| `src/app/faq/page.tsx` | FAQ page component. Renders `PageHeader`, `FAQAccordion`, contact CTA section, and page-level schema. |

### Content / data

| File | Purpose |
|------|---------|
| `src/content/faq-page.ts` | FAQ page question/answer data array. Shape mirrors `FAQAccordion`’s expected `faqData` prop and feeds FAQPage schema. |

### Shared files to modify

| File | Purpose |
|------|---------|
| `src/lib/routes.ts` | Add the `/faq/` route entry to the public route map so header nav, footer, breadcrumbs, and sitemap include it. |
| `src/app/sitemap.ts` (or `next-sitemap.config.js`) | Ensure `/faq/` is emitted in `sitemap.xml` with `<changefreq>monthly</changefreq>` and `<priority>0.6</priority>`. |
| `src/content/faq.ts` | If homepage FAQ data already exists, reconcile naming so `faq-page.ts` is clearly page-specific; do not duplicate copy. |

### No new public assets required

The FAQ page uses only typography, icons, and UI components. No hero image or OG image beyond the default created in TICKET-001 is needed.

---

## 3. Reusable components to use from TICKET-001 (shell) and other tickets

### From TICKET-001 (required)

| Component | How it is used |
|-----------|----------------|
| `Header` / `Footer` | Wrapped automatically by `app/layout.tsx`. No page-specific change. |
| `Container` | Wraps all page sections for consistent max-width and padding. |
| `Section` | Wraps each content block with consistent vertical spacing and background variants (`cream-50` body, `white` card areas). |
| `PageHeader` | Breadcrumb + H1 + optional subtitle for the FAQ page. |
| `Button` / `CTALink` / `PhoneLink` | Final CTA section and inline links. |
| `FAQAccordion` | Core accordion UI. Must accept the same `faqData` shape used on the homepage so the component stays reusable. |
| `SchemaInjector` | Renders FAQPage and BreadcrumbList JSON-LD. |
| `src/lib/schema.ts` | Use existing `buildFAQPageSchema()` and `buildBreadcrumbListSchema()` helpers, or add them if missing. |
| `src/lib/seo.ts` | Use `buildTitle()`, `buildCanonical()`, `buildOpenGraph()` for metadata. |
| `src/lib/config.ts` | Pull site base URL, NAP, and default brand strings. |

### From dependent tickets (consume when available, but not blockers)

| Component / route | Usage |
|-------------------|-------|
| `/discovery-flight/` route | CTA links and inline references to discovery flight booking. |
| `/programs/*` routes | Inline links to Sport Pilot, Private Pilot, Instrument Rating, Commercial Pilot, CFI, CFII, Mountain Flying. |
| `/fleet/` and `/membership/` routes | Links for cost/what’s-included questions. |
| `/contact/` route | Final CTA and “still have questions” section. |
| `/about/` route | Link for Part 61 philosophy question. |
| `/cancellation-policy/` route | Link for cancellation/weather policy question. |

### Component API contract

- `FAQAccordion` must accept:
  - `id: string` — used for the JSON-LD `@id` and section anchor.
  - `items: Array<{ question: string; answer: string | ReactNode; }>`
  - Optional `className` for styling.
- Each answer must be renderable as plain text for schema (strip or provide a plain-text fallback), while still supporting inline links in the rendered answer.
- Accordion buttons must use the disclosure pattern (`aria-expanded`, `aria-controls`) already established by TICKET-001.

---

## 4. Page content/structure, schema markup, and SEO metadata

### 4.1 URL and metadata

| Element | Value |
|---------|-------|
| **URL** | `/faq/` |
| **Title tag** | `Flight School FAQ: Discovery Flights, Medical, Cost & Scheduling | Hornbill Flight Center` |
| **Meta description** | `Answers to common flight training questions. Medical certificates, what to bring, weather cancellations, Part 61 vs 141, cost, and how to book a discovery flight at RNO.` |
| **Canonical** | `https://hornbillaviation.com/faq/` (self-referencing, trailing slash) |
| **OpenGraph type** | `website` |
| **Twitter card** | `summary_large_image` |

Title tag rules applied:
- Primary keyword first (`Flight School FAQ`).
- Secondary intent keywords included: discovery flights, medical, cost, scheduling.
- Brand at the end.
- Total length under 60 characters.

### 4.2 Content structure (in viewport order)

1. **PageHeader**
   - Breadcrumb: `Home > FAQ`
   - H1: `Flight school FAQ`
   - Subtitle: `Straight answers about learning to fly at Reno–Tahoe (RNO). If you don’t see your question, call or text us.`

2. **Intro paragraph**
   - 1–2 sentences framing the page as a decision-helper, not a legal document.
   - Example: `Every student asks these questions before their first lesson. Here are the answers we give in the briefing room.`

3. **FAQAccordion** — grouped by topic but rendered as a single accordion. Topics map to the question list below.

4. **Still have questions section**
   - H2: `Still have questions?`
   - Copy: `Call or text us, or book a discovery flight and ask your CFI in person.`
   - Primary CTA: `Book a discovery flight` → `/discovery-flight/`
   - Secondary CTA: `Call Hornbill Flight Center` (tappable phone link)
   - Tertiary link: `Contact page` → `/contact/`

### 4.3 FAQ questions and answers (content spec)

The `src/content/faq-page.ts` array should contain exactly these items, in this order, with on-brand copy following `brand_identity_writing_style.md`. Answers must be concise (40–80 words) to satisfy AI/answer-engine optimization and schema best practices.

1. **Do I need a medical certificate before my discovery flight?**
   - Answer: `No. A discovery flight is a normal passenger flight for medical purposes, so no FAA medical is required. If you enroll, you’ll need at least a third-class medical for Private Pilot or Sport Pilot. We’ll point you to the right AME before you solo.`
   - Internal link: `/programs/private-pilot/`, `/programs/sport-pilot/`

2. **How do I schedule a discovery flight or lesson?**
   - Answer: `Book online through our discovery flight page or call us. Once you’re a student, you schedule directly with your instructor or through our booking system. We do not force you into a fixed classroom schedule.`
   - Internal link: `/discovery-flight/`, `/contact/`

3. **What does the discovery flight cost, and is there a deposit?**
   - Answer: `Discovery flights are $199 for 45–60 minutes of flight time. No deposit is required when you book; payment is handled at the flight or via optional full prepay. Gift vouchers are also available.`
   - Internal link: `/discovery-flight/`, `/discovery-flight/?type=gift`

4. **What should I bring to my first flight?**
   - Answer: `Bring a government-issued photo ID and sunglasses. Wear comfortable clothes and closed-toe shoes. We provide headsets and a preflight briefing. Leave bulky bags in the car; space in the PA28 is limited.`

5. **What happens if the weather is bad on the day of my flight?**
   - Answer: `We check the weather the evening before and the morning of your flight. If visibility, ceiling, or wind is outside safe limits, we reschedule at no charge. Safety is the only reason we cancel.`
   - Internal link: `/cancellation-policy/`

6. **What is your cancellation and refund policy?**
   - Answer: `Discovery flights can be rescheduled with 24 hours’ notice. No-show bookings are charged the full flight fee. Prepaid vouchers and deposits are refundable within 30 days of purchase if unused.`
   - Internal link: `/cancellation-policy/`

7. **Is there an age limit to start flight training?**
   - Answer: `You can start training at any age. To fly solo, you must be 16. To hold a Private Pilot certificate, you must be 17. There is no upper age limit; we train students who are changing careers and students who are retired.`
   - Internal link: `/programs/private-pilot/`, `/programs/sport-pilot/`

8. **How long does it take to earn a Private Pilot certificate?**
   - Answer: `Part-time students typically finish in 6–12 months flying once or twice a week. Full-time students can finish in 2–4 months. The FAA requires 40 hours minimum, but most students need 55–75 hours to checkride-ready at RNO.`
   - Internal link: `/programs/private-pilot/`

9. **How much does flight training cost?**
   - Answer: `Total cost depends on aircraft hours, instructor hours, and how often you fly. Member wet rate is $159/hour for our PA28 fleet. See the full cost breakdown on our Fleet & Pricing page, including membership, materials, and checkride estimates.`
   - Internal link: `/fleet/`, `/membership/`

10. **What is Part 61 training, and how is it different from Part 141?**
    - Answer: `Part 61 is flexible, one-on-one instruction built around your schedule. Part 141 is a structured, FAA-approved curriculum often used by large academies. Hornbill is Part 61, so you choose your instructor, your pace, and your aircraft.`
    - Internal link: `/about/`

11. **Can I choose my instructor?**
    - Answer: `Yes. You can fly with any Hornbill CFI, or bring your own if they meet insurance and checkout requirements. The instructor-student relationship matters, and we don’t assign you to whoever is available.`
    - Internal link: `/instructors/`

12. **What programs do you offer?**
    - Answer: `We offer Sport Pilot, Private Pilot, Instrument Rating, Commercial Pilot, Certified Flight Instructor, Flight Instructor Instrument, and a Mountain Flying course at RNO. Every program uses the same PA28 fleet, so your training stays consistent.`
    - Internal link: `/programs/sport-pilot/`, `/programs/private-pilot/`, `/programs/instrument-rating/`, `/programs/commercial-pilot/`, `/programs/certified-flight-instructor/`, `/programs/cfii/`, `/programs/mountain-flying/`

13. **Can I rent the aircraft after I get my certificate?**
    - Answer: `Yes. Members can rent our PA28s for cross-country and local flights after a checkout. Non-members can also rent at $185/hour wet. We want you to use your certificate for real trips, not just training patterns.`
    - Internal link: `/cross-country-rentals/`, `/membership/`

14. **Where are you located?**
    - Answer: `Hornbill Flight Center is based at Reno–Tahoe International Airport (RNO), 1008 Gentry Way, Reno, NV 89512. Our location page has directions, parking instructions, and what to expect when you arrive at the airport.`
    - Internal link: `/location/`

15. **What should I do after my discovery flight?**
    - Answer: `If you want to continue, we’ll match you with an instructor, set a rough schedule, and outline a training plan. Most students book their first lesson the same day as the discovery flight.`
    - Internal link: `/discovery-flight/`, `/contact/`

### 4.4 Schema markup

**FAQPage JSON-LD**

- `@context`: `https://schema.org`
- `@type`: `FAQPage`
- `@id`: `https://hornbillaviation.com/faq/#faqpage`
- `mainEntity`: array of `Question` / `Answer` pairs derived from `src/content/faq-page.ts`.
  - Each `Question` has `name` (the question text).
  - Each `Answer` has `text` (plain-text answer; strip inline links and limit to the prose answer).
- Include the page in the site-wide `@graph` if the project uses a combined graph pattern.

**BreadcrumbList JSON-LD**

- `@type`: `BreadcrumbList`
- Item 1: `Home` → `https://hornbillaviation.com/`
- Item 2: `FAQ` → `https://hornbillaviation.com/faq/`

**Base schemas**

- `Organization`, `LocalBusiness`, and `EducationalOrganization` are already injected by the root layout from TICKET-001. The FAQ page does not need to repeat them.

### 4.5 Heading hierarchy

- H1: `Flight school FAQ` (only one per page, in `PageHeader`).
- H2: `Still have questions?` section title.
- Accordion question text must use the HTML element designated for accordion titles (likely `<h3>` or a styled `<button>` inside a heading). If the accordion uses headings, the structure is:
  - H1 → H2 (Still have questions) and H3 (accordion question labels) at the same logical level.
- Avoid skipping levels.

### 4.6 Internal linking

- Include 3–5 contextual inline links per answer where relevant (per design doc on-page SEO rules).
- All links use descriptive anchor text (`Fleet & Pricing page`, `discovery flight page`, `contact page`) not `click here`.
- Every link target must exist in `src/lib/routes.ts` so broken-link checks can validate it.

---

## 5. Any API/widget/data requirements

### No external APIs

The FAQ page is fully static. No booking API, METAR, calendar, or payment integrations are required on this page.

### No widgets

Pilot widgets (METAR, density-altitude calculator, etc.) are not part of this page. They are implemented in a separate widgets ticket and linked from student resources.

### Data source

All content is static TypeScript data in `src/content/faq-page.ts`. The build process reads this file at static-export time; no runtime CMS or database is involved.

### Analytics events to add

Use the analytics infrastructure established in TICKET-001 or a dedicated analytics ticket:

- `faq_question_expanded` — fires when an accordion item opens (helpful for identifying unanswered questions).
- `phone_click` — on the tappable phone link.
- `discovery_flight_booking_started` — on the primary CTA.
- `contact_page_click` — on the tertiary contact link.

---

## 6. Dependencies on other tickets

### Hard blockers (must be done first)

| Ticket | Why it blocks |
|--------|---------------|
| **TICKET-001** | Provides the site shell, shared layout, header/footer, `FAQAccordion`, `PageHeader`, `SchemaInjector`, `routes.ts`, SEO helpers, and static-export config. The FAQ page cannot exist without these. |

### Soft dependencies (consume when ready, but FAQ page can link to placeholders)

| Ticket / page | Dependency detail |
|---------------|-------------------|
| Discovery flight page | FAQ answers link to `/discovery-flight/`. The FAQ page can render even if the target page is a stub, but the link must resolve in `routes.ts`. |
| Program pages | Inline links to `/programs/*`. Same stub/link-contract rule applies. |
| Contact page | The final CTA links to `/contact/`. |
| Fleet & Pricing page | Links to `/fleet/` and `/membership/`. |
| Cancellation policy page | Links to `/cancellation-policy/`. |
| Location page | Links to `/location/`. |
| Instructors page | Links to `/instructors/`. |
| Cross-country rentals page | Links to `/cross-country-rentals/`. |
| Analytics setup | If analytics events are part of a separate ticket, the FAQ page can ship without them and add the event attributes in a follow-up. |

### Ordering recommendation

Build TICKET-019 immediately after TICKET-001 and concurrently with the discovery flight page and program pages, because the FAQ copy references all of them. Keep the route map updated so links are never 404s at build time.

---

## 7. Verification steps (tests, manual checks, schema validation)

### Automated tests

| Check | How |
|-------|-----|
| Static export succeeds | `next build` completes with no errors and emits `dist/faq/index.html`. |
| Route reachable | `dist/faq/index.html` exists and is linked from header/footer/sitemap. |
| Internal links valid | Run a link crawl over `dist/`. All `/discovery-flight/`, `/programs/*`, `/fleet/`, `/membership/`, `/contact/`, `/cancellation-policy/`, `/location/`, `/instructors/`, `/cross-country-rentals/`, and `/about/` links resolve to `index.html` files. |
| Heading hierarchy | Automated a11y check (axe-core or Playwright) confirms exactly one H1 and no skipped heading levels. |
| Accordion accessibility | Automated check confirms accordion buttons have `aria-expanded` and `aria-controls`, and focus moves correctly. |
| Schema JSON validity | Parse the generated JSON-LD script tags with `ajv` or manual validation against Schema.org expectations. |

### Manual / QA checks

| Check | Criteria |
|-------|----------|
| Mobile rendering | Accordion is readable and tappable at 375 px; touch targets ≥44 px; no horizontal overflow. |
| Copy/voice review | No clichés (`soar to new heights`, `passion for aviation`, `world-class`, `unlock your potential`), no LLM hedges (`it’s important to note`, `at the end of the day`), no empty superlatives. Every claim has a number or specific name. |
| NAP consistency | Address/phone/email on this page matches `src/lib/config.ts`, footer, and schema byte-for-byte. |
| CTA placement | Primary CTA appears at least twice: once near the top (inline link in intro) and once in the final section. |
| Link anchor text | No `click here`, `learn more`, or `read more` links. |

### Schema validation

| Check | Tool / method |
|-------|---------------|
| FAQPage Rich Results eligibility | Submit the deployed `/faq/` URL to Google Rich Results Test. Expect green eligibility for FAQPage. |
| BreadcrumbList | Validate in Rich Results Test or Search Console Enhancements. |
| General schema | Validate all JSON-LD with Schema Markup Validator. |
| AI/answer-engine optimization | Confirm each answer is 40–80 words, starts with a direct answer, and is citable as plain text. |

### Performance / SEO checks

| Check | Target |
|-------|--------|
| LCP | ≤ 2.0 s (page has no hero image, so LCP should be text-driven and fast). |
| INP | ≤ 200 ms on the accordion interactions. |
| CLS | ≤ 0.1. |
| Title / description | Title under 60 characters; description under 155 characters; both unique vs. other pages. |
| Canonical | Self-referencing with trailing slash. |
| Sitemap | `/faq/` present with `lastmod`, `changefreq=monthly`, `priority=0.6`. |

### Final review checklist before merge

- [ ] `next build` passes and outputs `dist/faq/index.html`.
- [ ] FAQPage schema validates in Rich Results Test.
- [ ] BreadcrumbList schema validates.
- [ ] All internal links resolve.
- [ ] Exactly one H1.
- [ ] No brand/copy clichés or LLM hedges.
- [ ] Mobile accordion usable.
- [ ] Route added to `src/lib/routes.ts` and sitemap.
- [ ] Analytics event attributes added (or follow-up ticket created).
