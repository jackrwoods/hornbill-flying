---
id: TICKET-009-plan
title: "Implementation plan: Certified Flight Instructor Instrument (CFII) program page"
ticket: TICKET-009
status: draft
created: 2026-06-18
---

## 1. Scope summary

Build the static Next.js program page at `/programs/cfii/` for the Certified Flight Instructor Instrument (CFII) add-on rating. The page targets current or aspiring CFIs who already hold a CFI certificate and want to teach instrument flying. It explains:

- What the CFII rating allows (give instrument instruction in aircraft, endorse instrument applicants, conduct IPCs).
- Prerequisites: hold a valid CFI certificate and at least a Private Pilot certificate with instrument privileges (Instrument Rating required; CFII candidates must meet the same aeronautical experience and knowledge standards expected of an instrument instructor).
- Training emphasis: instrument instruction techniques, scanning, partial-panel, approach briefings, ACS/PTS standards, and teaching in actual or simulated IFR.
- Required practical test areas from the Flight Instructor Instrument Airman Certification Standards (ACS).
- Realistic part-time and full-time timelines.
- A transparent cost estimate using the published PA28 wet rates and instructor fees.
- CTAs to contact Hornbill, book a discovery flight/consultation, or speak with an instructor.

The page implements `Service`, `Course`, and `FAQPage` JSON-LD schema, unique SEO metadata, a `BreadcrumbList`, and internal links to the CFI, Instrument Rating, Fleet & Pricing, and Discovery Flight pages. It reuses the site shell from TICKET-001 and follows the program-page pattern established by other program tickets.

---

## 2. Exact file paths to create or modify

### Files to create

| File path | Purpose |
|-----------|---------|
| `src/app/programs/cfii/page.tsx` | Page composition. Imports the shell, shared sections, schema helpers, FAQ data, and images. Renders the full CFII page. |
| `src/app/programs/cfii/metadata.ts` (or inline `generateMetadata` in `page.tsx`) | Page-specific `<title>`, `meta description`, OpenGraph, Twitter card, canonical, and robots directives. |
| `src/data/programs/cfii.ts` or `src/content/programs/cfii.json` | Structured content source for prerequisites, training emphasis, practical test areas, timeline, cost, FAQ list, and schema copy. Keeps copy/data separate from presentation. |
| `public/images/programs/cfii-hero.webp` | Hero image: real Hornbill PA28 panel or IFR cross-country shot near the Sierra, WebP/AVIF, optimized. |
| `public/images/programs/cfii-instruction.webp` (optional) | Supporting image for the instruction/teaching section. |
| `src/app/programs/cfii/opengraph-image.tsx` (optional) | Program-specific OG image if the project adopts per-page OG images. |

### Files to modify

| File path | Change |
|-----------|--------|
| `src/app/sitemap.ts` (or equivalent generator) | Add `/programs/cfii/` with `priority: 0.7` and `changeFrequency: 'monthly'`. |
| `src/components/layout/Header.tsx` / nav config | Ensure the Programs dropdown includes a "CFII" link pointing to `/programs/cfii/`. |
| `src/components/layout/Footer.tsx` / footer links | Add "CFII" to the Programs quick links. |
| `src/app/page.tsx` (TICKET-002) | Link the CFII card in the Programs grid to `/programs/cfii/`. |
| `src/data/site.ts` or `src/lib/seo.ts` (TICKET-001) | Reuse for NAP, site URL, brand name, and base schema IDs; add `/programs/cfii/` to any route manifest if one exists. |
| `src/lib/schema/program.ts` (create if not provided by TICKET-001/TICKET-002) | Shared helper that emits `Service` + `Course` + `FAQPage` + `BreadcrumbList` JSON-LD for program pages. |

### Conventions to follow

- Next.js 14+ App Router with `output: 'export'`.
- All routes end with a trailing slash (`/programs/cfii/`).
- Page metadata files use the project's shared metadata helpers.
- Images live under `public/images/programs/` with explicit width/height and descriptive alt text.

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
- Shared metadata utilities (`buildTitle`, `buildCanonical`, `buildOpenGraph`, etc.).
- `site` config (`src/data/site.ts` or `src/lib/config.ts`) — NAP, brand name, URLs, rates.

### From other tickets (use if available; do not duplicate)

- `PageHero` or `ProgramHero` — hero section with H1, subheadline, CTAs, and hero image (expected pattern from program-page tickets).
- `QuickAnswerBox` — 50–70 word direct answer block for AI/answer-engine optimization (TICKET-002 pattern).
- `FAQAccordion` — accessible accordion that also supplies `FAQPage` schema items.
- `RateHighlight` / `PricingSnapshot` — pulls member/non-member wet rate and links to `/fleet/`.
- `BookingCTA` — bottom-of-page conversion block that routes to `/discovery-flight/` or `/contact/`.
- `ProgramsGrid` update — homepage component needs the new link (TICKET-002).

### Local-only page pieces

- CFII-specific prerequisites checklist (CFI certificate + instrument privileges).
- Flight Instructor Instrument ACS practical-test-area list.
- CFII timeline estimator.
- Cost estimate table (aircraft + instructor + examiner/ written test fees).

---

## 4. Page content/structure, schema markup, and SEO metadata

### Page structure (top to bottom)

1. **Metadata & `<head>`**
2. **JSON-LD schemas** (`Organization`/`LocalBusiness` from global context, `BreadcrumbList`, `Service`, `Course`, `FAQPage`)
3. **Sticky header** (TICKET-001)
4. **Hero section**
   - H1: **"CFII training in Reno, NV."**
   - Subhead: outcome-focused sentence such as "Add instrument instruction to your CFI certificate. Teach approaches, holds, and partial-panel flying from Reno–Tahoe (RNO)."
   - Primary CTA: **"Talk to an instructor"** or **"Book a consultation"** → `/contact/` (or `/discovery-flight/` if consultation booking exists).
   - Secondary CTA: **"See the fleet and rates"** → `/fleet/`.
   - Hero image with descriptive alt text, explicit width/height, `fetchpriority="high"`, `loading="eager"`.
5. **Quick answer box**
   - 50–70 words: "Hornbill Flight Center offers Part 61 Certified Flight Instructor Instrument (CFII) training at Reno–Tahoe (RNO). You learn to teach instrument procedures in a consistent PA28 fleet, prepare for the Flight Instructor Instrument ACS, and add instrument instruction privileges to your existing CFI certificate."
6. **What the CFII rating gives you**
   - Provide instrument flight instruction in aircraft.
   - Endorse applicants for the Instrument Rating practical test and knowledge test.
   - Conduct instrument proficiency checks (IPCs).
   - Link to `/programs/certified-flight-instructor/` and `/programs/instrument-rating/`.
7. **Prerequisites**
   - Hold a current CFI certificate (airplane category).
   - Hold at least a Private Pilot certificate with instrument rating and instrument privileges current per 14 CFR 61.197 if giving instruction.
   - Be able to read, speak, write, and understand English.
   - Hold at least a third-class medical certificate (or applicable BasicMed limitations understood).
   - Meet the aeronautical experience and knowledge standards required to teach instrument flight.
8. **Training emphasis**
   - Teaching the instrument scan and attitude instrument flying.
   - Approach briefings and teaching IFR approach procedures.
   - Partial-panel and unusual attitude recovery instruction.
   - Teaching holds, DME arcs, and missed approaches.
   - Using simulators or a view-limiting device effectively with students.
   - Evaluating student performance against the Flight Instructor Instrument ACS.
9. **Required practical test areas (Flight Instructor Instrument ACS)**
   - Present as a checklist or accordion:
     - Fundamentals of instructing (if not already CFI; for add-on, evaluated at checkride discretion).
     - Technical subject areas: aeromedical, regulations, airspace, navigation systems, flight instruments, IFR flight planning.
     - Preflight preparation and instruction.
     - Preflight lesson on a maneuver to be performed in flight.
     - Air traffic control clearances and procedures.
     - Flight by reference to instruments.
     - Navigation aids and ATC instructions.
     - Instrument approach procedures.
     - Emergency operations.
     - Postflight evaluation.
   - Add disclaimer: "Your CFI will verify the exact ACS edition and task list for your checkride."
10. **Training timeline**
    - Part-time (2–3 lessons/week): typical completion range.
    - Full-time intensive: typical completion range.
    - Note that CFII training is usually shorter than an initial CFI because the candidate already has instructional experience.
11. **Cost estimate**
    - Break out member aircraft rate, non-member rate, instructor rate, examiner fee, written test fee.
    - Show a realistic total range, not a guarantee.
    - Link to `/fleet/`, `/membership/`, and `/financing/`.
12. **Why Hornbill for CFII**
    - Uniform PA28 fleet with WAAS GPS and IFR-capable aircraft (N6576J, N7824W).
    - High-elevation, Class C, and mountain IFR environment at RNO.
    - Real cross-country rentals for instrument time-building after checkout.
    - Flexible scheduling and instructor choice.
13. **Related pathways**
    - CFI → CFII career progression.
    - Link back to `/programs/certified-flight-instructor/` and `/programs/instrument-rating/`.
14. **FAQ accordion** (8–10 items)
    - Do I need a CFI certificate before adding CFII?
    - Can I teach instrument flying with a CFII?
    - How is the CFII checkride different from the initial CFI?
    - What aircraft will I use for CFII training?
    - How long does CFII training take?
    - Can I train part-time while teaching as a CFI?
    - What written tests are required?
    - Does membership reduce the cost?
15. **Bottom CTA block**
    - Heading: "Ready to teach instrument flying?"
    - CTA button to `/contact/`: "Talk to an instructor" or to `/discovery-flight/`: "Book a consultation".
    - Phone link fallback.
16. **Footer** (TICKET-001)

### SEO metadata

| Element | Value |
|---------|-------|
| Title tag | `CFII Training in Reno, NV | Certified Flight Instructor Instrument | Hornbill Flight Center` |
| Meta description | `Add instrument instruction to your CFI certificate at RNO. Part 61 CFII training in a PA28 fleet with real IFR experience. Contact Hornbill today.` (under 155 characters) |
| Canonical | `https://<domain>/programs/cfii/` |
| OpenGraph title | same as title tag |
| OpenGraph description | same as meta description |
| OpenGraph image | program-specific or default Hornbill OG image |
| Twitter card | `summary_large_image` |
| Robots | `index, follow` |

### Schema markup

Implement the following JSON-LD graphs. Reuse the shared `Organization`/`LocalBusiness` entity from TICKET-001 as the `provider`.

1. **BreadcrumbList**
   - `Home` → `Programs` → `CFII`
2. **Service** (schema.org)
   - `@type`: `Service`
   - `name`: `CFII Training — Certified Flight Instructor Instrument — Hornbill Flight Center`
   - `serviceType`: `FlightTraining`
   - `provider`: Hornbill LocalBusiness/Organization entity (referenced by `@id`)
   - `areaServed`: Reno, NV
   - `description`: concise service description
   - `url`: `https://<domain>/programs/cfii/`
3. **Course** (schema.org)
   - `@type`: `Course`
   - `name`: `Certified Flight Instructor Instrument (CFII) course`
   - `description`: outcome-focused course summary
   - `provider`: Hornbill EducationalOrganization/Organization
   - `coursePrerequisites`: current CFI certificate, instrument rating/privileges, English proficiency, medical certificate
   - `occupationalCredentialAwarded`: `Certified Flight Instructor Instrument (CFII) Certificate (FAA Part 61)`
   - `timeRequired`: typical full-time/part-time range
   - `educationalCredentialAwarded`: same as occupational credential
   - `teaches`: `Instrument flight instruction`
4. **FAQPage**
   - `@type`: `FAQPage`
   - `mainEntity`: array of `Question`/`Answer` pairs drawn from the accordion.

Ensure all schema uses `@id`-based references so the provider entity is not duplicated across pages. Add a `sameAs` or `@id` link to the global Organization/LocalBusiness.

### Copy guidelines

- Follow `thoughts/shared/design/brand_identity_writing_style.md`:
  - Sentence-case headings.
  - Second person ("you").
  - Specific numbers and names: PA28, RNO, Part 61, $159/hr wet, $185/hr non-member.
  - No aviation clichés, empty superlatives, or LLM hedges.
  - CTAs begin with a verb.
- Reinforce messaging pillars: **Flexibility** (instructor choice, scheduling around teaching) and **Consistency** (uniform PA28 fleet) as lead/supporting.

---

## 5. API/widget/data requirements

### Data sources

- Static content file: `src/data/programs/cfii.ts` or `src/content/programs/cfii.json`.
- Shared site constants: `src/lib/seo.ts` / `src/data/site.ts` for NAP, brand info, rates, aircraft list, and base schema IDs.
- Reuse the global aircraft/fleet data for tail numbers and avionics rather than hardcoding them on the page.
- Reuse the global program route map so navigation and sitemap stay in sync.

### External APIs

- **No external API calls required for the static page itself.**
- The page may link to the booking flow built in TICKET-003 (`/discovery-flight/`) or to `/contact/`.
- Optional future enhancement: embed a METAR/TAF widget or density-altitude widget on a student-resources page; out of scope for the CFII program page.

### Widgets

- Reuse the global phone-link component for click-to-call.
- Reuse the booking/contact CTA component. Do not build a new inline booking widget on this page.

---

## 6. Dependencies on other tickets

| Ticket / work | Dependency type | Why it blocks or matters |
|---------------|-----------------|--------------------------|
| **TICKET-001** (Site shell, shared components, global SEO setup) | Hard blocker | Site shell, layout, header/footer, navigation, global metadata/schema helpers, color/typography tokens, and robots/sitemap base must exist before this page can render correctly. |
| **TICKET-002** (Homepage) | Hard blocker for navigation reachability | Homepage Programs grid must link to `/programs/cfii/` so the page is reachable within three clicks from home. |
| **TICKET-003** (Discovery Flight / booking) | Soft dependency | CTA destination `/discovery-flight/` or `/contact/` should exist; the page can use a fallback `/contact/` link until TICKET-003 is ready. |
| **CFI program page ticket** (e.g., `/programs/certified-flight-instructor/`) | Soft dependency | Internal links to the CFI page should be verified; CFII is an add-on to CFI, so the relationship should be clear. The CFII page can be published first and links updated when the CFI page lands. |
| **Instrument Rating program page ticket** (e.g., `/programs/instrument-rating/`) | Soft dependency | Internal links to the Instrument Rating page should be verified; the CFII page can reference it once available. |
| **Fleet & Pricing ticket** (e.g., TICKET-008) | Soft dependency | `/fleet/` link and rate details should exist; copy can reference planned rates from site constants. |
| **Contact page ticket** | Soft dependency | If the primary CTA uses `/contact/`, that page should exist before launch. |

**Recommended sequence:** complete TICKET-001 first, then implement this page alongside or after the other program pages so shared program components stabilize. Link to unfinished pages can point to `/contact/` or `/discovery-flight/` as a temporary fallback.

---

## 7. Verification steps

### Build & route checks

- [ ] `npm run build` (or `next build`) completes with static export enabled.
- [ ] Output directory contains `out/programs/cfii/index.html`.
- [ ] The auto-generated `sitemap.xml` includes `/programs/cfii/`.
- [ ] `robots.txt` allows indexing of the page.
- [ ] Self-referencing canonical is present and points to `https://<domain>/programs/cfii/`.

### Schema validation

- [ ] Copy the page source JSON-LD into Google's Rich Results Test and confirm no errors for `Service`, `Course`, `FAQPage`, and `BreadcrumbList`.
- [ ] Verify the `provider` entity references the same `@id` used by the global Organization/LocalBusiness schema.
- [ ] Confirm `FAQPage` has a `mainEntity` array with `acceptedAnswer.text` values.
- [ ] Validate with [schema.org validator](https://validator.schema.org/) and resolve any warnings for required fields.

### SEO & metadata checks

- [ ] Title tag matches `CFII Training in Reno, NV | Certified Flight Instructor Instrument | Hornbill Flight Center`.
- [ ] Meta description is under 155 characters and includes "CFII", "Reno", "RNO", "PA28", and "Part 61".
- [ ] OpenGraph and Twitter card tags are present and unique to this page.
- [ ] Canonical URL is `https://<domain>/programs/cfii/`.
- [ ] Exactly one H1 on the page: "CFII training in Reno, NV."

### Content & copy checks

- [ ] Heading hierarchy is logical (H1 → H2 → H3) with no skipped levels.
- [ ] Copy passes brand review: no clichés, superlatives, LLM hedges; sentence case; second person; specific numbers.
- [ ] All CTAs begin with a verb and link to valid routes.
- [ ] The practical-test-areas list reflects the current Flight Instructor Instrument ACS (add an ACS edition disclaimer in fine print).

### Internal link & navigation checks

- [ ] Header Programs dropdown links to `/programs/cfii/`.
- [ ] Footer Programs quick links include CFII.
- [ ] Homepage Programs grid links to `/programs/cfii/`.
- [ ] Page contains contextual internal links to `/programs/certified-flight-instructor/`, `/programs/instrument-rating/`, `/fleet/`, `/membership/`, `/financing/`, `/contact/`, and `/discovery-flight/`.
- [ ] No broken internal links (run a link crawler or `next export` + `htmltest`).

### Performance checks

- [ ] Hero image is WebP/AVIF, has explicit `width`/`height`, `fetchpriority="high"`, and `loading="eager"`.
- [ ] Lighthouse/PageSpeed Insights: LCP ≤ 2.0 s, CLS ≤ 0.1, INP ≤ 200 ms.
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
