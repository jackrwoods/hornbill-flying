# TICKET-007 Implementation Plan: Commercial Pilot program page

## 1. Scope summary

Build the static Next.js program page at `/programs/commercial-pilot/`. The page is aimed at career-track pilots and explains the FAA Part 61 Commercial Pilot certificate pathway at Hornbill Flight Center:

- What the CPL allows (fly for compensation, build time, pathway to CFI/airlines).
- Prerequisites (PPL, current second-class medical, Instrument Rating recommended, English proficient).
- Part 61 aeronautical experience requirements (total time, PIC, cross-country, instrument, complex/technically advanced aircraft considerations).
- Realistic part-time and full-time training timelines.
- A transparent cost estimate using the published PA28 wet rates.
- How the consistent PA28 fleet and real cross-country rentals support CPL training.
- Career pathway context and CTAs to book a consultation/discovery flight.

The page must implement `Service`, `Course`, and `FAQPage` JSON-LD schema, unique SEO metadata, a `BreadcrumbList`, and internal links to related programs and Fleet & Pricing. It should reuse the site shell and shared components created in TICKET-001 and follow the program-page pattern established by other program tickets.

---

## 2. Exact file paths to create or modify

### Files to create

| File path | Purpose |
|-----------|---------|
| `src/app/programs/commercial-pilot/page.tsx` | Page composition. Imports shell, shared sections, schema, FAQ data, and images. Renders the full CPL page. |
| `src/app/programs/commercial-pilot/metadata.ts` (or inline `generateMetadata` in `page.tsx`) | Page-specific `<title>`, `meta description`, OpenGraph, Twitter card, canonical, and robots directives. |
| `src/data/programs/commercial-pilot.ts` or `src/content/programs/commercial-pilot.json` | Structured content source for prerequisites, aeronautical experience, timeline, cost, fleet notes, FAQ list, and schema copy. Keeps copy/data separate from presentation. |
| `public/images/programs/commercial-pilot-hero.webp` | Hero image: real Hornbill PA28 on the RNO ramp or in cruise near the Sierra (WebP/AVIF, optimized). |
| `public/images/programs/commercial-pilot-cross-country.webp` | Supporting image for the real-world-experience / time-building section. |
| `src/app/programs/commercial-pilot/opengraph-image.tsx` (optional) | Program-specific OG image using the heading + Hornbill crest, if the project adopts per-page OG images. |

### Files to modify

| File path | Change |
|-----------|--------|
| `src/app/sitemap.ts` (or equivalent generator) | Add `/programs/commercial-pilot/` with `priority: 0.7` and `changeFrequency: 'monthly'`. |
| `src/components/layout/Header.tsx` / nav config | Ensure the Programs dropdown includes a "Commercial Pilot" link pointing to `/programs/commercial-pilot/`. |
| `src/components/layout/Footer.tsx` / footer links | Add "Commercial Pilot" to the Programs quick links. |
| `src/app/page.tsx` (TICKET-002) | Link the Commercial Pilot card in the Programs grid to `/programs/commercial-pilot/`. |
| `src/data/site.ts` or `src/lib/seo.ts` (TICKET-001) | Reuse for NAP, site URL, brand name, and base schema IDs; add `/programs/commercial-pilot/` to any route manifest if one exists. |
| `src/lib/schema/program.ts` (create if not provided by TICKET-001/TICKET-002) | Shared helper that emits `Service` + `Course` + `FAQPage` + `BreadcrumbList` JSON-LD for program pages. |

### Conventions to follow

- Next.js 14+ App Router with `output: 'export'`.
- All routes end with a trailing slash (`/programs/commercial-pilot/`).
- Page metadata files use the project's shared metadata helpers.
- Images live under `public/images/programs/` with a matching fallback path and explicit width/height.

---

## 3. Reusable components to use from TICKET-001 and other tickets

### From TICKET-001 (site shell)

- `RootLayout` / `SiteShell` — wraps every public page with fonts, theme tokens, and global JSON-LD.
- `Header` — sticky header with Programs dropdown, persistent "Book a discovery flight" CTA, and phone link.
- `Footer` — NAP, quick links, legal links, and global schema NAP consistency.
- `Button` — primary/secondary/tertiary button variants using navy/gold/orange tokens.
- `PhoneLink` / `ClickToCall` — tappable phone number with `tel:` schema and analytics event.
- `Container` / `Section` — max-width and vertical rhythm wrappers.
- `SchemaInjector` / `JsonLd` — renders `<script type="application/ld+json">` safely.
- Shared metadata utilities (title template, canonical, OpenGraph).

### From other tickets (use if available; do not duplicate)

- `PageHero` or `ProgramHero` — hero section with H1, subheadline, CTAs, and hero image (expected pattern from program-page tickets such as TICKET-004 or TICKET-006).
- `QuickAnswerBox` — 50–70 word direct answer block for AI/answer-engine optimization (TICKET-002 pattern).
- `FAQAccordion` — accessible accordion that also supplies `FAQPage` schema items (TICKET-002 or shared).
- `ProgramOverviewCard` / `ChecklistSection` — reusable prerequisites/requirements list styling.
- `RateHighlight` / `PricingSnapshot` — pulls member/non-member wet rate and links to `/fleet/` (TICKET-008).
- `ProgramsGrid` update — homepage component needs the new link (TICKET-002).
- `BookingCTA` — bottom-of-page conversion block that routes to `/discovery-flight/` (TICKET-003).

### Local-only page pieces

- CPL-specific experience-requirements table (Part 61 summary).
- CPL timeline estimator / time-building note.
- Career-pathway mini-diagram (CPL → CFI/CFII → commercial roles).

---

## 4. Page content/structure, schema markup, and SEO metadata

### Page structure (top to bottom)

1. **Metadata & `<head>`**
2. **JSON-LD schemas** (`Organization`/`LocalBusiness` from global context, `BreadcrumbList`, `Service`, `Course`, `FAQPage`)
3. **Sticky header** (TICKET-001)
4. **Hero section**
   - H1: **"Commercial Pilot training in Reno, NV."**
   - Subhead: outcome-focused sentence connecting CPL to real cross-country and career progression.
   - Primary CTA: **"Book a consultation"** → `/discovery-flight/` (or `/contact/` if consultation booking exists).
   - Secondary CTA: **"See the fleet and rates"** → `/fleet/`.
   - Hero image with descriptive alt text, explicit width/height, `fetchpriority="high"`, `loading="eager"`.
5. **Quick answer box**
   - 50–70 words: "Hornbill Flight Center offers Part 61 Commercial Pilot training at Reno–Tahoe (RNO). You build the required 250 hours in a consistent PA28 fleet, fly real cross-country routes, and prepare for the FAA Commercial Pilot checkride."
6. **What the Commercial Pilot certificate gives you**
   - Fly for compensation or hire (subject to limitations).
   - Build flight time toward CFI, CFII, or airline minimums.
   - Link to `/programs/certified-flight-instructor/` and `/programs/cfii/`.
7. **Prerequisites**
   - Hold a Private Pilot certificate.
   - Be able to read, speak, write, and understand English.
   - Hold at least a second-class medical certificate.
   - Instrument Rating strongly recommended before the checkride.
8. **Part 61 aeronautical experience**
   - Present as a clean table or checklist with FAA citations:
     - 250 hours total time
     - 100 hours PIC
     - 50 hours cross-country flight
     - 10 hours instrument training (5 in aircraft)
     - 10 hours in a complex or technically advanced airplane (per 14 CFR 61.129)
     - 2 hours day VFR cross-country within 60 days of checkride
     - 3 hours night VFR within 60 days of checkride
     - 3 hours of instruction within 2 calendar months preceding the practical test
   - Add a short disclaimer: "Your CFI will verify the exact requirements for your situation."
9. **Training timeline**
   - Part-time (2–3 lessons/week): typical range.
   - Full-time intensive: typical range.
   - Note how a single PA28 fleet reduces transition time between aircraft.
10. **Cost estimate**
    - Break out member aircraft rate, non-member rate, instructor rate, checkride/examiner fee, written test fee.
    - Show a realistic total range, not a guarantee.
    - Link to `/fleet/`, `/membership/`, and `/financing/`.
11. **Why Hornbill for CPL**
    - Uniform PA28 fleet (N6576J, N7824W, N7969W, N0001J).
    - WAAS-equipped aircraft for IFR cross-country practice.
    - High-elevation, mountain/density-altitude experience at RNO.
    - Cross-country rental eligibility for time-building after checkout.
12. **Career pathway**
    - CPL → CFI → CFII → airline/other commercial flying.
    - Mention time-building through instruction and cross-country rentals.
13. **FAQ accordion** (8–10 items)
    - Do I need an Instrument Rating first?
    - How long does CPL training take part-time?
    - Can I train in the same PA28 I rent for cross-country time?
    - What counts as a complex or technically advanced aircraft?
    - Does membership save money on time-building?
    - Can I bring my own instructor?
    - What medical certificate do I need?
    - What happens on the checkride?
14. **Bottom CTA block**
    - Heading: "Ready to fly for a living?"
    - CTA button to `/discovery-flight/`: "Book a discovery flight" or "Book a consultation".
    - Phone link fallback.
15. **Footer** (TICKET-001)

### SEO metadata

| Element | Value |
|---------|-------|
| Title tag | `Commercial Pilot License Training in Reno, NV | Hornbill Flight Center` |
| Meta description | `Earn your Commercial Pilot certificate at RNO. Part 61 CPL training in a consistent PA28 fleet with real cross-country experience. Book a consultation.` (under 155 characters; adjust as needed) |
| Canonical | `https://<domain>/programs/commercial-pilot/` |
| OpenGraph title | same as title tag |
| OpenGraph description | same as meta description |
| OpenGraph image | program-specific or default Hornbill OG image |
| Twitter card | `summary_large_image` |
| Robots | `index, follow` |

### Schema markup

Implement the following JSON-LD graphs. Reuse the shared `Organization`/`LocalBusiness` entity from TICKET-001 as the `provider`.

1. **BreadcrumbList**
   - `Home` → `Programs` → `Commercial Pilot`
2. **Service** (schema.org)
   - `@type`: `Service`
   - `name`: `Commercial Pilot License (CPL) Training — Hornbill Flight Center`
   - `serviceType`: `FlightTraining`
   - `provider`: Hornbill LocalBusiness/Organization entity
   - `areaServed`: Reno, NV
   - `description`: concise service description
   - `url`: `https://<domain>/programs/commercial-pilot/`
3. **Course** (schema.org)
   - `@type`: `Course`
   - `name`: `Commercial Pilot License course`
   - `description`: outcome-focused course summary
   - `provider`: Hornbill EducationalOrganization/Organization
   - `coursePrerequisites`: PPL, second-class medical, instrument rating recommended
   - `occupationalCredentialAwarded`: `Commercial Pilot Certificate (FAA Part 61)`
   - `timeRequired`: typical full-time/part-time range
   - `educationalCredentialAwarded`: same as occupational credential
   - `teaches`: `Commercial piloting`
4. **FAQPage**
   - `@type`: `FAQPage`
   - `mainEntity`: array of `Question`/`Answer` pairs drawn from the accordion.

Ensure all schema uses `@id`-based references so the provider entity is not duplicated across pages.

### Copy guidelines

- Follow the brand writing style guide:
  - Sentence-case headings.
  - Second person ("you").
  - Specific numbers and names: PA28, RNO, Part 61, $159/hr wet, $185/hr non-member.
  - No aviation clichés, empty superlatives, or LLM hedges.
  - CTAs begin with a verb.
- Reinforce messaging pillars: **Flexibility** and **Consistency** as lead/supporting.

---

## 5. API/widget/data requirements

### Data sources

- Static content file: `src/data/programs/commercial-pilot.ts` or `src/content/programs/commercial-pilot.json`.
- Shared site constants: `src/lib/seo.ts` / `src/data/site.ts` for NAP, brand info, rates, aircraft list, and base schema IDs.
- Reuse the global aircraft/fleet data for tail numbers and avionics rather than hardcoding them on the page.

### External APIs

- **No external API calls required for the static page itself.**
- The page may link to the booking flow built in TICKET-003 (`/discovery-flight/`).
- Optional future enhancement: embed a density-altitude widget or cost estimator from the Useful Widgets section of the design doc; out of scope for initial launch unless already built.

### Widgets

- Reuse the global phone-link component for click-to-call.
- Reuse the booking CTA component. Do not build a new inline booking widget on this page.

---

## 6. Dependencies on other tickets

| Ticket | Dependency type | Why it blocks or matters |
|--------|----------------|--------------------------|
| **TICKET-001** | Hard blocker | Site shell, layout, header/footer, navigation, global metadata/schema helpers, color/typography tokens, and robots/sitemap base must exist before this page can render correctly. |
| **TICKET-002** | Hard blocker for navigation reachability | Homepage programs grid must link to `/programs/commercial-pilot/` so the page is reachable within three clicks from home. |
| **TICKET-003** | Soft dependency | CTA destination `/discovery-flight/` should exist; the page can use a fallback `/contact/` link until TICKET-003 is ready. |
| **TICKET-004** (Private Pilot) / **TICKET-005** (Sport Pilot) / **TICKET-006** (Instrument Rating) | Soft dependency | Internal links to prerequisite program pages should be verified; the page can be published first and links updated when those pages land. |
| **TICKET-008** (Fleet & Pricing) | Soft dependency | `/fleet/` link and rate details should exist; copy can reference planned rates from site constants. |
| **TICKET-011** (CFI) / **TICKET-012** (CFII) | Soft dependency | Career-pathway links to `/programs/certified-flight-instructor/` and `/programs/cfii/` should be verified before launch. |

**Recommended sequence:** complete TICKET-001 first, then build TICKET-007 alongside or after the other program pages so shared program components stabilize. Link to unfinished pages can point to `/discovery-flight/` as a temporary fallback.

---

## 7. Verification steps

### Build & route checks

- [ ] `npm run build` (or `next build`) completes with the static export enabled.
- [ ] Output directory contains `out/programs/commercial-pilot/index.html`.
- [ ] The auto-generated `sitemap.xml` includes `/programs/commercial-pilot/`.
- [ ] `robots.txt` allows indexing of the page.
- [ ] Self-referencing canonical is present and correct.

### Schema validation

- [ ] Copy the page source JSON-LD into Google's Rich Results Test and confirm no errors for `Service`, `Course`, `FAQPage`, and `BreadcrumbList`.
- [ ] Verify the `provider` entity references the same `@id` used by the global Organization/LocalBusiness schema.
- [ ] Confirm `FAQPage` has a `mainEntity` array with `acceptedAnswer.text` values.

### SEO & metadata checks

- [ ] Title tag matches `Commercial Pilot License Training in Reno, NV | Hornbill Flight Center`.
- [ ] Meta description is under 155 characters and includes "CPL", "Reno", "RNO", "PA28", and "Part 61".
- [ ] OpenGraph and Twitter card tags are present and unique.
- [ ] Canonical URL is `https://<domain>/programs/commercial-pilot/`.

### Content & copy checks

- [ ] Exactly one H1 on the page: "Commercial Pilot training in Reno, NV."
- [ ] Heading hierarchy is logical (H1 → H2 → H3) with no skipped levels.
- [ ] Copy passes brand review: no clichés, superlatives, LLM hedges; sentence case; second person; specific numbers.
- [ ] All CTAs begin with a verb and link to valid routes.

### Internal link & navigation checks

- [ ] Header Programs dropdown links to `/programs/commercial-pilot/`.
- [ ] Footer Programs quick links include Commercial Pilot.
- [ ] Homepage Programs grid links to `/programs/commercial-pilot/`.
- [ ] Page contains contextual internal links to `/programs/private-pilot/`, `/programs/instrument-rating/`, `/programs/certified-flight-instructor/`, `/programs/cfii/`, `/fleet/`, `/membership/`, `/financing/`, and `/discovery-flight/`.
- [ ] No broken internal links (run a link crawler or `next export` + `htmltest`).

### Performance checks

- [ ] Hero image is WebP/AVIF, has explicit `width`/`height`, `fetchpriority="high"`, and `loading="eager"`.
- [ ] Lighthouse/PageSpeed Insights: LCP ≤ 2.0s, CLS ≤ 0.1, INP ≤ 200ms.
- [ ] No render-blocking third-party scripts on initial load.

### Accessibility checks

- [ ] Run an axe-core or Lighthouse accessibility audit and confirm no WCAG 2.2 AA violations.
- [ ] FAQ accordion is keyboard-navigable (Enter/Space toggles, arrow keys move focus) and uses `aria-expanded`.
- [ ] Color contrast passes AA for all text/background combinations.
- [ ] CTA buttons have visible focus states and touch targets ≥ 44 px.

### Mobile UX checks

- [ ] Page renders correctly on iPhone SE/Pro and a mid-size Android device.
- [ ] Sticky header CTA and phone link remain tappable without overlap.
- [ ] Hero text remains readable; image does not push CTA below the fold.

### NAP consistency

- [ ] Address and phone on the page/footer match the global NAP exactly (`1008 Gentry Way, Reno, NV 89512`; `555-555-1234`; `office@hornbillaviation.com`).
- [ ] NAP matches Google Business Profile and schema byte-for-byte.

### Manual sanity checks

- [ ] Click every CTA and confirm it reaches the expected destination.
- [ ] Inspect JSON-LD in the rendered HTML to confirm it is minified but valid.
- [ ] View the page with JavaScript disabled to ensure static content is visible.
