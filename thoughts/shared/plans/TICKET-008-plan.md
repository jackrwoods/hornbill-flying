---
id: TICKET-008
title: Certified Flight Instructor (CFI) program page implementation plan
status: draft
priority: high
created: 2026-06-18
updated: 2026-06-18
---

# TICKET-008 — Certified Flight Instructor (CFI) program page

Implementation plan for `/programs/certified-flight-instructor/` in the Hornbill Flight Center Next.js static-export site.

## 1. Scope summary

This ticket builds the **Certified Flight Instructor (CFI)** program landing page. The page must:

- Target advanced pilots who already hold a Commercial Pilot certificate and instrument privileges.
- Explain the CFI pathway, eligibility, training emphasis, checkride preparation, realistic timeline, and cost.
- Reinforce the four brand pillars: flexibility, consistency, real-world experience, and value.
- Provide clear CTAs to book a CFI consultation or contact the school.
- Implement the required schema markup (Service, Course, FAQPage, BreadcrumbList) and SEO metadata.
- Link internally to prerequisite and related program pages, the instructors index, fleet/pricing, and membership pages.

The page is a **static marketing page** with no booking widget of its own; conversion CTAs route to the existing consultation/contact flow.

## 2. Exact file paths to create or modify

All paths are absolute and assume the Next.js App Router project layout established by TICKET-001.

### Create

- `/Users/jack/hornbill-flying/src/app/programs/certified-flight-instructor/page.tsx`
  - React server component that renders the CFI page, imports the program data file, and exports `metadata`.
- `/Users/jack/hornbill-flying/src/data/programs/certified-flight-instructor.json`
  - Content and structured-data source of truth for the page: title, H1, section copy, FAQ list, internal links, image references, and Course/Service schema fields.
- `/Users/jack/hornbill-flying/public/images/programs/cfi-hero.webp`
  - Hero image: real PA28 cockpit/instruction scene at RNO (or a brand-approved training photo). WebP/AVIF, compressed, with explicit width/height.
- `/Users/jack/hornbill-flying/public/images/programs/cfi-instructor-pa28.webp`
  - Supporting section image for the "why Hornbill" or lesson-planning section.

### Modify / coordinate with other tickets

- `/Users/jack/hornbill-flying/src/app/sitemap.ts` (owned by TICKET-001)
  - Ensure `/programs/certified-flight-instructor/` is included in the auto-generated sitemap. If the sitemap is fully dynamic (e.g., crawls `src/app` routes), no change is needed; otherwise add the static route.
- `/Users/jack/hornbill-flying/src/app/programs/private-pilot/page.tsx`, `/Users/jack/hornbill-flying/src/app/programs/commercial-pilot/page.tsx`, `/Users/jack/hornbill-flying/src/app/programs/instrument-rating/page.tsx`, `/Users/jack/hornbill-flying/src/app/programs/cfii/page.tsx`
  - Add reciprocal internal links back to the CFI page once those pages are built.
- `/Users/jack/hornbill-flying/src/app/instructors/page.tsx`
  - Link to the CFI page from any instructor card whose CFI teaches initial CFI candidates, once the instructors index is ready.

## 3. Reusable components to use from TICKET-001 and other tickets

### From TICKET-001 (site shell)

- `RootLayout` (`/Users/jack/hornbill-flying/src/app/layout.tsx`)
  - Provides global `<html>/<body>`, header, footer, mobile sticky CTA, phone link, and site-wide metadata template.
- `PageHead` helper or `metadata` factory (`/Users/jack/hornbill-flying/src/lib/metadata.ts`)
  - Generates title template, canonical, OpenGraph, and Twitter card tags.
- `SchemaRenderer` (`/Users/jack/hornbill-flying/src/components/schema-renderer.tsx`)
  - Injects JSON-LD script tags safely and deduplicates shell schemas.
- `BreadcrumbList` (`/Users/jack/hornbill-flying/src/components/breadcrumb-list.tsx`)
  - Renders the BreadcrumbList schema and visible breadcrumb nav.
- `CtaButton` / `PhoneLink` (`/Users/jack/hornbill-flying/src/components/ui/cta-button.tsx`, `/Users/jack/hornbill-flying/src/components/ui/phone-link.tsx`)
  - Primary conversion buttons and click-to-call link with analytics attributes.
- `Container`, `Section`, `SectionHeader`, `Prose` layout primitives (`/Users/jack/hornbill-flying/src/components/layout/`)
  - Consistent vertical rhythm, max-width, and prose styling from the visual identity tokens.

### From other tickets (use if available; otherwise build equivalent pieces in this ticket or a shared program-page component)

- `ProgramHero` / `PageHero` (likely from TICKET-002 Homepage or TICKET-004 Private Pilot)
  - Hero with background image, H1, subheadline, and CTAs.
- `ProgramPricingCard` (TICKET-011 Fleet & Pricing)
  - Reusable rate summary for member/non-member aircraft and instructor rates.
- `FaqAccordion` (TICKET-001 or TICKET-004)
  - Accessible FAQ list that also emits FAQPage JSON-LD.
- `InstructorPreview` / `InstructorCard` (TICKET-013/014)
  - Optional section highlighting the CFI who leads CFI candidates, with a "Book with [Name]" link.

If the project does not yet have a shared **program page shell**, this ticket should introduce a lightweight `ProgramPageShell` component in `/Users/jack/hornbill-flying/src/components/program-page-shell.tsx` and use it here. The shell should be reused by TICKET-005, TICKET-006, TICKET-007, TICKET-009, and TICKET-010.

## 4. Page content, structure, schema, and SEO metadata

### URL and navigation

- **Route:** `/programs/certified-flight-instructor/`
- **Breadcrumb:** Home > Programs > Certified Flight Instructor
- **Header nav:** Appears under the "Programs" dropdown as "Certified Flight Instructor (CFI)".

### SEO metadata

- **Title tag:** `Certified Flight Instructor Training in Reno, NV | Hornbill Flight Center`
- **Meta description:** `Earn your CFI certificate at Hornbill Flight Center in Reno, NV. Part 61 training for aspiring flight instructors: FOI, spin proficiency, lesson planning, and checkride prep. Book a consultation.`
- **Canonical:** `https://www.hornbillaviation.com/programs/certified-flight-instructor/`
- **OpenGraph:**
  - `og:title` same as title tag
  - `og:description` same as meta description
  - `og:type`: `website`
  - `og:url`: canonical URL
  - `og:image`: `/images/programs/cfi-hero.webp`

### Heading hierarchy

- One H1 only: `Certified Flight Instructor (CFI) training in Reno, NV`
- H2 sections: Who this is for, What you'll learn, Timeline, Cost estimate, Why train at Hornbill, Meet your CFI lead (optional), Frequently asked questions
- H3 subsections as needed inside "What you'll learn" and "Cost estimate"

### Page sections and content

1. **Hero**
   - H1: `Certified Flight Instructor (CFI) training in Reno, NV`
   - Subheadline: `Learn to teach pilots in a consistent PA28 fleet at Reno-Tahoe (RNO). Part 61 CFI training that covers Fundamentals of Instruction, spin proficiency, lesson planning, and practical-test preparation.`
   - Primary CTA: `Book a CFI consultation` → `/book/?type=cfi-consultation` (or `/contact/?subject=CFI%20training` if the booking app does not yet support consultation types)
   - Secondary CTA: `Call us` (click-to-call)
   - Hero image with alt text: `CFI candidate reviewing a flight lesson plan with a Hornbill instructor in a PA28 at Reno-Tahoe International Airport`

2. **Quick answer box (AI / answer-engine optimization)**
   - 50–70 word direct answer:
     > "Hornbill's CFI program prepares commercial pilots with instrument privileges to become FAA-certified flight instructors. Training emphasizes the Fundamentals of Instruction, spin proficiency endorsement, lesson planning, and the practical test standards for single-engine airplane instruction in our consistent PA28 fleet at RNO."

3. **Who this is for (prerequisites)**
   - Hold a Commercial Pilot certificate.
   - Hold an instrument rating (or instrument privileges).
   - Be at least 18 years old and able to read, speak, write, and understand English.
   - Hold at least a Third-Class medical certificate when acting as PIC during instruction (or meet the requirements for the flight portions you lead).
   - Internal link to `/programs/commercial-pilot/` and `/programs/instrument-rating/`.

4. **What you'll learn**
   - **Fundamentals of Instruction (FOI):** The learning process, human behavior and effective communication, teaching process, assessment, and instructor responsibilities.
   - **Technical subject areas:** Aerodynamics, aircraft systems, runway incursion avoidance, federal aviation regulations, airspace, and risk management as they apply to instruction.
   - **Spin proficiency:** Required spin awareness, prevention, and recovery endorsement before the practical test.
   - **Lesson planning and delivery:** Preparing preflight and in-flight lessons, explaining maneuvers, demonstrating, and debriefing student performance.
   - **Checkride preparation:** Review of the applicable Airman Certification Standards (ACS) and mock practical-test sessions.
   - Internal link to `/programs/cfii/` for instructors who want to add instrument instruction.

5. **Training timeline**
   - Full-time commitment: approximately 4–6 weeks of ground, flight, and self-study.
   - Part-time commitment: typically 2–4 months, depending on schedule and prior teaching experience.
   - Timeline assumes the candidate already meets the CPL + instrument prerequisites.

6. **Cost estimate**
   - Use the central pricing constants from the design doc and TICKET-011:
     - Aircraft rental: $159/hr wet (member) / $185/hr wet (non-member)
     - Membership: $49/month
     - Instructor rate: published on `/fleet/`
     - Examiner fee: estimated $700–$900 (paid directly to the DPE; not to Hornbill)
   - Present a transparent range rather than a fixed total, because CFI candidate hours vary widely with prior experience.
   - Include a link to `/fleet/` and `/membership/` for current rates.
   - Include a link to `/financing/` if available.

7. **Why train at Hornbill**
   - **Consistency:** Train and teach in a uniform PA28 fleet — predictable handling, costs, and avionics.
   - **Flexibility:** Choose the instructor you work best with, or bring your own; schedule around your life.
   - **Real-world experience:** CFIs at Hornbill fly real cross-country routes, not just practice-area patterns.
   - **Value:** $159/hr member wet rate, transparent pricing, no hidden fuel surcharges.
   - Internal link to `/instructors/`.

8. **Meet your CFI lead** (optional until instructor pages are ready)
   - If instructor placeholder pages from TICKET-013/014 exist, embed the card for the CFI who mentors CFI candidates.
   - CTA: `Book with [Name]` → `/instructors/[slug]/` or booking flow with instructor preselected.

9. **FAQ accordion**
   - 5–6 questions, for example:
     - Do I need a Commercial Pilot certificate to start CFI training?
     - Does Hornbill offer CFII add-on training?
     - What is the spin proficiency endorsement?
     - How long does CFI training usually take?
     - Can I instruct at Hornbill after I earn my CFI?
     - What aircraft will I train in?
   - Each FAQ pair is also emitted as FAQPage schema.

10. **Bottom CTA**
    - Heading: `Ready to teach the next generation of pilots?`
    - Primary CTA: `Book a CFI consultation`
    - Secondary CTA: `See the fleet and rates`

### Schema markup

Inject the following JSON-LD via the shared `SchemaRenderer`. All IDs and provider references point to the Organization/LocalBusiness schema already loaded by TICKET-001.

- **BreadcrumbList**
  - `Home` → `/`
  - `Programs` → `/programs/`
  - `Certified Flight Instructor` → `/programs/certified-flight-instructor/`

- **Service**
  - `@type`: `Service`
  - `serviceType`: `Certified Flight Instructor Training`
  - `provider`: reference to Hornbill Organization
  - `areaServed`: Reno, NV / Washoe County
  - `hasOfferCatalog`: links to `/fleet/`, `/membership/`, and consultation booking

- **Course**
  - `@type`: `Course`
  - `name`: `Certified Flight Instructor (CFI) — Airplane Single-Engine`
  - `description`: same as meta description
  - `provider`: Hornbill Flight Center
  - `courseMode`: `in-person`
  - `educationalLevel`: `advanced`
  - `teaches`: `["Fundamentals of Instruction", "Spin proficiency", "Lesson planning", "Practical test preparation"]`
  - `occupationalCredentialAwarded`: `FAA Certified Flight Instructor Certificate (Airplane Single-Engine)`
  - `coursePrerequisites`: `Hold a Commercial Pilot certificate with instrument privileges and meet FAA CFI eligibility requirements`
  - `hasCourseCode`: `CFI-ASE`
  - `url`: canonical page URL
  - `isPartOf`: `/programs/`

- **FAQPage**
  - `@type`: `FAQPage`
  - `mainEntity`: array of Question/Answer pairs drawn from the FAQ accordion.

- **Organization / LocalBusiness / EducationalOrganization**
  - Already present via TICKET-001 shell; ensure the CFI page does not duplicate them but references them by `@id`.

### Internal links

Every page must include 3–5 contextual internal links. For the CFI page:

- `/programs/commercial-pilot/` (prerequisite)
- `/programs/instrument-rating/` (prerequisite)
- `/programs/cfii/` (natural next step)
- `/instructors/` (team and hiring context)
- `/fleet/` (rates and aircraft)
- `/membership/` (value and savings)
- `/contact/` or `/book/?type=cfi-consultation` (conversion)

## 5. API / widget / data requirements

- **No external APIs on this page.** The page is fully static.
- **Booking CTA:** route to the existing consultation booking/contact flow. The target path depends on which ticket delivers consultation scheduling first:
  - Preferred: `/book/?type=cfi-consultation` (TICKET-003 or a later booking API ticket).
  - Fallback: `/contact/?subject=CFI%20training` (TICKET-017 or the contact-page ticket).
- **Data source:** all copy and structured-data values live in `/Users/jack/hornbill-flying/src/data/programs/certified-flight-instructor.json` so other program pages can follow the same pattern.
- **Pricing constants:** import from the shared pricing config (`/Users/jack/hornbill-flying/src/lib/pricing.ts`) or read the JSON constants established by TICKET-011, so the page never hardcodes rates that can drift.
- **NAP constants:** import from `/Users/jack/hornbill-flying/src/lib/site-config.ts` (created by TICKET-001).

## 6. Dependencies on other tickets

| Ticket | Why it must be done first |
|--------|---------------------------|
| **TICKET-001** | Site shell, layout, global metadata, schema renderer, breadcrumb component, sitemap, Tailwind theme tokens, and NAP config must exist before this page is built. |
| **TICKET-004 (Private Pilot)** or another early program ticket | If a shared `ProgramPageShell` or program-section component is introduced, wait for it so the CFI page matches the rest of the program section. If no shared component exists, this ticket creates the shell and blocks later program tickets. |
| **TICKET-006 (Instrument Rating)** | CFI prerequisites reference instrument privileges; a reciprocal link from the IR page to CFI should exist. |
| **TICKET-007 (Commercial Pilot)** | CFI prerequisites reference Commercial Pilot certificate; a reciprocal link from the CPL page to CFI should exist. |
| **TICKET-009 (CFII)** | The CFI page links forward to the CFII add-on page; the CFII page should link back to CFI. |
| **TICKET-011 (Fleet & Pricing)** | Current aircraft/instructor rates must be defined before the cost-estimate section can reference them accurately. |
| **TICKET-012 (Membership)** | Membership savings and eligibility are part of the value proposition; link target must exist. |
| **TICKET-013/014 (Instructors)** | Optional "Meet your CFI lead" section and instructor-specific CTAs depend on instructor pages/stubs. |

If any dependent page is not ready when this ticket is implemented, create stub routes with minimal content and reciprocal links so the static export succeeds and internal linking is complete.

## 7. Verification steps

### Build and routing

1. Run `next build` with `output: 'export'` configured. Confirm the route `/programs/certified-flight-instructor/` is emitted as `out/programs/certified-flight-instructor/index.html`.
2. Verify the route is reachable from the homepage within three clicks (Home → Programs dropdown → Certified Flight Instructor).
3. Run `next lint` with no errors or warnings related to this page.

### SEO and metadata

4. Inspect the generated `<head>`:
   - Title tag matches the planned title exactly.
   - Meta description is present and under 155 characters.
   - Canonical and OpenGraph tags are correct.
   - Self-referencing canonical points to `/programs/certified-flight-instructor/`.
5. Confirm the page has exactly one H1 and the H1 includes the target keyword phrase "Certified Flight Instructor training in Reno, NV".
6. Confirm heading hierarchy has no skipped levels (H1 → H2 → H3 as appropriate).

### Schema markup

7. Validate the page with Google's Rich Results Test and the Schema.org validator:
   - `Course` schema has `provider`, `occupationalCredentialAwarded`, `coursePrerequisites`, and `url`.
   - `Service` schema has `serviceType`, `provider`, and `areaServed`.
   - `FAQPage` schema includes all FAQ pairs.
   - `BreadcrumbList` includes the three expected items with valid `item` URLs.
   - Organization/LocalBusiness/EducationalOrganization schemas are present via the shell and referenced by ID.
8. Confirm JSON-LD scripts are deduplicated and not duplicated on the page.

### Accessibility

9. Keyboard-navigate the page: all CTAs, breadcrumb, FAQ accordion, and internal links are reachable and operable with `Tab` and `Enter`.
10. Run a WCAG 2.2 AA contrast check; no failures on body text or CTA buttons.
11. Confirm hero and section images have descriptive `alt` text and explicit `width`/`height` to prevent layout shift.
12. Verify the FAQ accordion uses `aria-expanded`, `aria-controls`, and proper button/heading structure.

### Content and brand voice

13. Read every sentence out loud. Confirm:
   - No aviation clichés ("take your dreams to new heights", "soar above the rest").
   - No empty superlatives ("best", "premier", "world-class").
   - No LLM hedges ("it's important to note", "at the end of the day").
   - Second person ("you") is used naturally.
   - Prices are transparent and match the design doc: `$159/hr` member wet, `$185/hr` non-member, `$49/month` membership.
14. Confirm the NAP (1008 Gentry Way, Reno, NV 89512; office@hornbillaviation.com; 555-555-1234) matches the shell/footer exactly if it appears on this page.

### Internal links and conversion

15. Verify every internal link resolves to a route that will exist in the static export (or has a stub):
    - `/programs/commercial-pilot/`
    - `/programs/instrument-rating/`
    - `/programs/cfii/`
    - `/instructors/`
    - `/fleet/`
    - `/membership/`
    - `/contact/` or `/book/?type=cfi-consultation`
16. Click the primary CTA on desktop and mobile; confirm it routes to the consultation/contact path and that analytics events fire if the measurement layer is present.

### Performance

17. Run PageSpeed Insights on the deployed/static page:
    - Largest Contentful Paint (LCP) ≤ 2.0 s
    - Cumulative Layout Shift (CLS) ≤ 0.1
    - Interaction to Next Paint (INP) ≤ 200 ms
18. Confirm the hero image is WebP/AVIF, has explicit dimensions, and uses `fetchpriority="high"` and `loading="eager"`.
19. Confirm no render-blocking resources are introduced by this page beyond what the shell already loads.

### Cross-page consistency

20. Compare the CFI page against the Private Pilot, Commercial Pilot, Instrument Rating, CFII, and Mountain Flying program pages once built:
    - Same section order and component structure.
    - Same CTA style and analytics attributes.
    - Same schema pattern (Service + Course + FAQPage + BreadcrumbList).
    - Consistent spelling of program names and brand terminology.

---

## Related documents

- `/Users/jack/hornbill-flying/thoughts/shared/tickets/TICKET-008.md`
- `/Users/jack/hornbill-flying/thoughts/shared/design/website_layout_design.md`
- `/Users/jack/hornbill-flying/thoughts/shared/design/brand_identity_writing_style.md`
- `/Users/jack/hornbill-flying/thoughts/shared/design/visual_identity.md`
- `/Users/jack/hornbill-flying/thoughts/shared/tickets/TICKET-001.md`
- `/Users/jack/hornbill-flying/thoughts/shared/tickets/TICKET-004.md`
- `/Users/jack/hornbill-flying/thoughts/shared/tickets/TICKET-006.md`
- `/Users/jack/hornbill-flying/thoughts/shared/tickets/TICKET-007.md`
- `/Users/jack/hornbill-flying/thoughts/shared/tickets/TICKET-009.md`
- `/Users/jack/hornbill-flying/thoughts/shared/tickets/TICKET-011.md`
- `/Users/jack/hornbill-flying/thoughts/shared/tickets/TICKET-012.md`
- `/Users/jack/hornbill-flying/thoughts/shared/tickets/TICKET-013.md`
- `/Users/jack/hornbill-flying/thoughts/shared/tickets/TICKET-014.md`
