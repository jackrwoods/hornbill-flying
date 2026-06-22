---
id: TICKET-004-plan
title: Private Pilot program page implementation plan
related_ticket: TICKET-004
status: draft
---

# TICKET-004 — Private Pilot program page implementation plan

## 1. Scope summary

Build the `/programs/private-pilot/` route in the Hornbill Flight Center Next.js static-export site. This is the main enrollment page for the Private Pilot License (PPL). It must answer a prospective student's core questions—what the certificate allows, Part 61 requirements, realistic timeline, estimated cost, fleet, instructor choice, financing, and next steps—and drive them toward booking a discovery flight.

The page is a static marketing page composed from shared shell components and a local data file. It ships with:

- One H1 targeting the primary keyword.
- Unique title tag, meta description, canonical, and OpenGraph tags.
- `Service` + `Course` schema for the PPL offering.
- `FAQPage` schema tied to the page FAQ accordion.
- `BreadcrumbList` schema.
- Internal links to Discovery Flight, Fleet & Pricing, Membership, Instructors, Financing, and related program pages.
- A prominent, repeated CTA to book a discovery flight.

## 2. Exact file paths to create or modify

All paths are relative to the repository root `/Users/jack/hornbill-flying/`.

### Files to create

- `src/app/programs/private-pilot/page.tsx`
  - Main page component. Imports content from `src/data/programs/private-pilot.ts` and composes sections using shared/reusable components. Exports page metadata.
- `src/data/programs/private-pilot.ts`
  - Content data file: title, H1, hero image, overview, requirements table, cost estimate, FAQ list, related program links, and schema fields. Keeps copy out of the component so future edits do not touch JSX.
- `src/components/programs/ProgramHero.tsx` (if not already created by TICKET-001/TICKET-002)
  - Reusable hero for program pages: H1, subtitle, primary/secondary CTAs, hero image with explicit width/height, `fetchpriority="high"`, `loading="eager"`, and alt text.
- `src/components/programs/RequirementsTable.tsx` (if not already created)
  - Reusable styled table for FAA aeronautical experience minimums. Used by this page and other program pages.
- `src/components/programs/CostEstimate.tsx` (if not already created)
  - Reusable cost block that renders aircraft-rate math and a total range. Can be replaced or extended by the cost-estimator widget from TICKET-023 when available.
- `src/components/programs/RelatedPrograms.tsx` (if not already created)
  - Card grid linking to sibling program pages.
- `public/images/programs/private-pilot-hero.webp`
  - Hero image: real PA28 on the RNO ramp. Provide WebP/AVIF with explicit dimensions. Fallback source may be approved stock until real photography is available.
- `public/images/programs/private-pilot-fleet.webp` (optional)
  - Supporting image for the fleet-consistency section.

### Files likely to modify

- `src/lib/schema.ts` (if it exists)
  - Add helpers for program `Service` and `Course` schemas and `FAQPage` schema if not provided by TICKET-001. If TICKET-001 already ships generic builders, use them.
- `src/app/sitemap.ts` or `src/lib/sitemap.ts` (if the sitemap is a hardcoded list)
  - Add `/programs/private-pilot/` with `lastmod` and priority.
- `src/components/layout/Header.tsx` (only if the programs dropdown was not pre-populated with every program link in TICKET-001)
  - Add `Private Pilot` under the Programs dropdown.

## 3. Reusable components to use

### From TICKET-001 (site shell)

- `RootLayout` / `src/app/layout.tsx`
  - Wraps the page; provides global fonts, metadata template, base JSON-LD (Organization + LocalBusiness + EducationalOrganization), and analytics.
- `Header` / `src/components/layout/Header.tsx`
  - Sticky header with Programs dropdown, persistent "Book a discovery flight" CTA, and click-to-call phone link.
- `Footer` / `src/components/layout/Footer.tsx`
  - NAP, quick links, legal links, Part 61 statement.
- `MobileNav` (if separate)
  - Hamburger menu and sticky mobile CTA.
- `Container` / `Section` / `SectionHeading`
  - Layout primitives that enforce max-width, vertical rhythm, and consistent section spacing.
- `PrimaryButton`, `SecondaryButton`, `PhoneLink`
  - Branded CTAs. Primary CTA uses `navy-900` background and white text; secondary uses `gold-500` with `navy-900` text.
- `JsonLd` / schema helpers
  - Inject `<script type="application/ld+json">` safely into the page.
- `Breadcrumbs` / `BreadcrumbList` schema helper
  - Render breadcrumb navigation and matching schema.
- `FaqAccordion` (if created in TICKET-001)
  - Accessible accordion with `details`/`summary` or headless UI disclosure, keyboard support, and FAQPage schema generation.

### From other tickets

- `DiscoveryFlightCTA` or direct link to `/discovery-flight/` from TICKET-003
  - The page's primary conversion path. Use the persistent header CTA plus in-page primary buttons.
- `FleetTable` / `AircraftCard` from TICKET-011 (Fleet & Pricing)
  - Reuse a lightweight variant for the fleet-consistency section, or link to `/fleet/`.
- `MembershipCard` / `PricingCard` from TICKET-012 (Membership)
  - Render the $49/month membership savings message.
- `InstructorCard` from TICKET-013 (Instructors index)
  - Use a compact version in the "Choose your instructor" section.
- `FinancingLink` / `FinancingBanner` from TICKET-018 (Financing)
  - Link to financing options if the component exists.
- `CostEstimator` from TICKET-023 (Pilot tools / widgets) — optional
  - Embed below the static cost section once built, so users can model hours-per-week and membership status.

## 4. Page content / structure

### Metadata (Next.js `metadata` export)

- **Title tag:** `Private Pilot License Training in Reno, NV | Hornbill Flight Center`
- **Meta description:** `Earn your private pilot license at RNO. Part 61, PA28 fleet, choose your CFI. Book a discovery flight and start training today.`
- **Canonical:** `https://www.hornbillaviation.com/programs/private-pilot/`
- **OpenGraph:** same title/description, OG image from hero asset, type `website`.
- **robots:** `index, follow`.

### Page sections and copy outline

1. **Hero**
   - H1: `Private Pilot License Training in Reno, NV`
   - Subheadline: `Train at your pace, choose your instructor, and earn your certificate in a consistent PA28 fleet at Reno–Tahoe (RNO).`
   - Primary CTA button: `Book a discovery flight` → `/discovery-flight/`
   - Secondary CTA: `See the fleet and rates` → `/fleet/`
   - Tertiary: click-to-call phone number.

2. **Quick answer box**
   - 50–70 word plain-language answer to "What is a private pilot license?"
   - Example:
     > A private pilot certificate lets you fly a single-engine airplane in visual flight rules, carry passengers, and rent aircraft for cross-country trips. At Hornbill, you train under Part 61 at RNO, choose the CFI you work with, and fly the same PA28 fleet from first lesson to checkride.

3. **What you'll be able to do after**
   - Bulleted outcome list (no fluff):
     - Fly passengers day or night under VFR in the U.S.
     - Rent Hornbill PA28s for real cross-country flights.
     - Build the foundation for an Instrument Rating or Commercial certificate.

4. **Part 61 requirements**
   - H2: `Part 61 requirements`
   - Lead paragraph: `The FAA sets minimums under Part 61. Most students need more than the minimum to be ready for the checkride.`
   - `RequirementsTable` rows:
     | Requirement | FAA minimum |
     |-------------|-------------|
     | Age | 17 years old to receive the certificate; 16 to solo |
     | Medical | Valid 3rd-class medical certificate (or BasicMed) |
     | Language | Read, speak, write, and understand English |
     | Total flight time | 40 hours |
     | Flight instruction | 20 hours, including 3 hours night, 3 hours instrument, and 3 hours cross-country |
     | Solo flight | 10 hours, including 5 hours solo cross-country with one trip of at least 150 NM and full-stop landings at three points |
     | Towered operations | 3 takeoffs and landings at an airport with an operating control tower |
     | Tests | Pass the FAA knowledge test and practical test (checkride) |
   - Disclaimer: `These are regulatory minimums. Realistic training time is covered below.`

5. **Realistic timeline**
   - H2: `How long it takes`
   - Two-column comparison:
     - Full-time (3–5 lessons/week): ~3–4 months.
     - Part-time (1–2 lessons/week): ~8–12 months.
   - Note: `Weather, scheduling, and study pace affect the timeline. Part 61 means we build the schedule around yours.`

6. **Estimated cost**
   - H2: `Estimated cost`
   - Static cost block showing:
     - Aircraft wet rate: `$159/hour` (member) / `$185/hour` (non-member).
     - Membership: `$49/month`.
     - Example at 50 flight hours (member aircraft only): `50 hrs × $159 = $7,950`.
     - Add instructor time, ground school, medical, knowledge test, checkride, materials.
     - Present realistic total range: `Most students spend roughly $12,000–$16,000 from first lesson to certificate.`
   - Link to `/fleet/` for full rates and `/membership/` for savings.
   - Optional: embed `CostEstimator` widget from TICKET-023 once available.

7. **Fleet consistency**
   - H2: `Train in the same PA28 fleet`
   - Copy: `Switching aircraft should not feel like switching airplanes. Our PA28 fleet is similarly equipped, so handling, panel layout, and performance stay predictable.`
   - Mention dual Garmin G5 and WAAS GPS in IFR-capable aircraft.
   - CTA: `Meet the fleet` → `/fleet/`

8. **Instructor choice**
   - H2: `Choose your instructor`
   - Copy: `Pick the CFI whose schedule and style fit you. Already have a CFI? You can bring your own instructor to Hornbill.`
   - Link to `/instructors/`.

9. **Financing**
   - H2: `Finance your training`
   - Copy: `We partner with Stratus Financial to help students spread training costs over time.`
   - CTA: `See financing options` → `/financing/`

10. **FAQ accordion**
    - H2: `Frequently asked questions`
    - Use `FaqAccordion` with FAQPage schema.
    - Questions:
      1. How old do I need to be to get a private pilot certificate?
      2. Do I need a medical certificate before I start?
      3. How long does private pilot training take?
      4. How much does it cost to get a PPL at Hornbill?
      5. Can I choose my flight instructor or bring my own?
      6. What aircraft will I train in?
      7. Is Hornbill Part 61 or Part 141?
      8. What happens on a discovery flight?
    - Answers must follow brand voice: specific, no clichés, no LLM hedges.

11. **Related programs / next steps**
    - H2: `Explore more training`
    - Cards linking to Sport Pilot, Instrument Rating, Commercial Pilot, Mountain Flying, Discovery Flight, and Membership.

### Schema markup

- **Service**
  - `@type`: `Service`
  - `serviceType`: `Private Pilot License Training`
  - `provider`: reference to Organization/LocalBusiness (Hornbill Flight Center)
  - `areaServed`: `{ @type: City, name: Reno, containedInPlace: { @type: State, name: Nevada } }`
  - `hasOfferCatalog` or `offers` with the discovery flight as an entry point (optional)
  - `audience`: `{ @type: Audience, audienceType: Prospective pilots }`

- **Course**
  - `@type`: `Course`
  - `name`: `Private Pilot License Training`
  - `courseCode`: `PPL`
  - `educationalCredentialAwarded`: `Private Pilot Certificate — Airplane Single-Engine Land (ASEL)`
  - `provider`: Hornbill Flight Center
  - `description`: short course summary
  - `coursePrerequisites`: `Minimum 17 years old, English proficient, valid 3rd-class medical or BasicMed, and completed FAA knowledge test prior to checkride.`
  - `teaches`: `Visual flight rules, single-engine aircraft operation, cross-country navigation, FAA private pilot practical test standards`
  - `timeToComplete`: `P3M` to `P1Y` depending on schedule
  - `availableAtOrFrom`: RNO location

- **FAQPage**
  - `mainEntity` array of `Question` / `AcceptedAnswer` pairs matching the accordion content.

- **BreadcrumbList**
  - Item 1: Home → `/`
  - Item 2: Programs → `/programs/` (if a programs index page is built; otherwise link to `/` with name "Programs")
  - Item 3: Private Pilot → `/programs/private-pilot/`

- Organization/LocalBusiness/EducationalOrganization schemas are inherited from the global layout per TICKET-001.

### Accessibility and UX

- Exactly one H1 on the page.
- Logical heading order: H1 → H2 → H3 for subsections if needed.
- Accordion is keyboard navigable (`Tab`, `Enter`/`Space`) and announces state with `aria-expanded`.
- Phone number is a `tel:` link.
- CTA buttons use descriptive text (`Book a discovery flight`, not `Click here`).
- Touch targets ≥44 px.
- Hero image has descriptive alt text including location and aircraft, e.g.:
  `PA28 Cherokee on the ramp at Reno-Tahoe International Airport`.

## 5. API / widget / data requirements

- **No server-side API calls on this page.** It is a static marketing page.
- **Booking flow:** CTAs link to `/discovery-flight/` (built in TICKET-003). No direct booking widget is required on this page.
- **Content data:** Store all copy, FAQ items, requirements rows, cost assumptions, and related links in `src/data/programs/private-pilot.ts`.
- **Optional widget:** Once TICKET-023 builds the `CostEstimator`, this page can import and embed it below the static cost section with `program="ppl"` props.
- **Analytics:** fire `program_page_view` with `{ program: 'private-pilot' }` on page load (TICKET-028). Fire `discovery_flight_booking_started` when the primary CTA is clicked.

## 6. Dependencies on other tickets

### Hard dependencies (must be completed first)

- **TICKET-001 — Site shell, shared components, and global SEO setup**
  - The page cannot render without `RootLayout`, `Header`, `Footer`, shared metadata helpers, base schema, color/typography tokens, and navigation.

### Soft dependencies (CTAs and links work best when these pages exist)

- **TICKET-003 — Discovery Flight landing page and booking widget**
  - Primary CTA destination. The page is still useful if this is incomplete, but conversion path must be available before launch.
- **TICKET-011 — Fleet & Pricing page**
  - Secondary CTA to `/fleet/` and cost-section links.
- **TICKET-012 — Membership page**
  - Cost section references the $49/month membership and `/membership/` link.
- **TICKET-013 — Instructors index page**
  - "Choose your instructor" section links to `/instructors/`.
- **TICKET-018 — Financing page**
  - Financing section links to `/financing/`.
- **TICKET-005, TICKET-006, TICKET-007, TICKET-010 — Other program pages**
  - Sibling program links in the "Explore more training" section.
- **TICKET-023 — Pilot tools / widgets (optional)**
  - Cost estimator widget can be embedded later.

## 7. Verification steps

### Build and static export

- [ ] `npm run build` completes without errors and `out/programs/private-pilot/index.html` is generated.
- [ ] `next.config.js` has `output: 'export'` and `trailingSlash: true` (or equivalent) so the route resolves at `/programs/private-pilot/`.

### SEO / metadata checks

- [ ] Page has exactly one `<h1>` with text `Private Pilot License Training in Reno, NV`.
- [ ] `<title>` tag matches the specified title tag.
- [ ] `<meta name="description">` matches the specified meta description (≤155 chars).
- [ ] Self-referencing canonical URL is present.
- [ ] OpenGraph title, description, and image tags are present.
- [ ] No duplicate or missing title/meta compared to other program pages.

### Schema validation

- [ ] Run the exported HTML through [validator.schema.org](https://validator.schema.org) and confirm:
  - `Service` parses with `provider`, `areaServed`, and `serviceType`.
  - `Course` parses with `educationalCredentialAwarded` and `coursePrerequisites`.
  - `FAQPage` parses with all accordion questions/answers.
  - `BreadcrumbList` parses with valid item list.
- [ ] Run Google Rich Results Test on the live or locally served page and confirm zero errors for the above schemas.

### Link and content checks

- [ ] All internal links resolve to existing routes:
  - `/discovery-flight/`
  - `/fleet/`
  - `/membership/`
  - `/instructors/`
  - `/financing/`
  - `/programs/sport-pilot/`
  - `/programs/instrument-rating/`
  - `/programs/commercial-pilot/`
  - `/programs/mountain-flying/`
- [ ] Copy review against `thoughts/shared/design/brand_identity_writing_style.md`: no clichés, no empty superlatives, no LLM hedges, specific numbers, active voice, "you" centered.
- [ ] Requirements table matches FAA Part 61 private pilot aeronautical experience minimums.

### Accessibility checks

- [ ] Heading hierarchy is logical (no skipped levels).
- [ ] FAQ accordion is keyboard operable and exposes `aria-expanded`.
- [ ] Phone link is `tel:` and CTAs have ≥44 px touch targets.
- [ ] Hero image has alt text and explicit `width`/`height`.
- [ ] Color contrast passes WCAG 2.2 AA for body text and large-button text.

### Performance checks

- [ ] Lighthouse score: Performance ≥90, Accessibility ≥90, Best Practices ≥90, SEO ≥95.
- [ ] LCP ≤2.0s; hero image is WebP/AVIF with `fetchpriority="high"`.
- [ ] No layout shift from late-loading images or unstyled content.

### Automated tests (optional but recommended)

- [ ] Add `/src/__tests__/programs/private-pilot.test.tsx` (or Playwright) that asserts:
  - H1 text
  - presence of at least one primary CTA linking to `/discovery-flight/`
  - FAQ count ≥6
  - JSON-LD contains `@type: Course`, `@type: Service`, and `@type: FAQPage`

### Analytics

- [ ] Confirm `program_page_view` event fires with `{ program: 'private-pilot' }`.
- [ ] Confirm CTA click fires `discovery_flight_booking_started` event.
