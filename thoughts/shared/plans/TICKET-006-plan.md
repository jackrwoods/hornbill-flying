---
date: 2026-06-18
ticket: TICKET-006
title: Instrument Rating program page implementation plan
status: draft
---

# TICKET-006 — Instrument Rating program page

## 1. Scope summary

Build the public Instrument Rating (IR) program page at `/programs/instrument-rating/` in the Next.js static-export site.

The page targets PPL holders who are searching for instrument rating training in Reno, NV, and must:

- Explain what an FAA Instrument Rating is and what it qualifies the holder to do.
- List prerequisites, aeronautical experience, and realistic part-time/full-time timelines.
- Highlight Hornbill’s IFR-capable, WAAS-equipped dual-Garmin-G5 PA28 fleet and the value of training at RNO (Class C, mountain/density-altitude environment).
- Provide a transparent cost estimate using the membership/non-member wet rates and a CFII/instructor rate.
- Drive visitors to the discovery-flight or consultation booking flow.
- Reuse the shell, typography, color system, schema helpers, and shared UI components created by TICKET-001.
- Implement `Service`, `Course`, `FAQPage`, and `BreadcrumbList` JSON-LD; unique title/meta; a self-referencing canonical; and descriptive internal links.

This ticket is **frontend-only**. No new booking API endpoints or widgets are created here.

## 2. Exact file paths to create or modify

### Files to create

| File | Purpose |
|------|---------|
| `src/app/programs/instrument-rating/page.tsx` | Page component that composes the IR program page. Exports Next.js `metadata` and JSON-LD. |
| `src/data/programs/instrument-rating.ts` (or `.mdx`) | Source of truth for page content: title, H1, meta, quick-answer text, sections, cost table, aircraft list, FAQ items, internal links. |
| `src/app/programs/instrument-rating/opengraph-image.alt.txt` | Alt text for the generated/share OpenGraph image. (If using a static asset, place `opengraph-image.jpg`/`.webp` in this folder.) |

### Files to modify (created by other tickets)

| File | Change |
|------|--------|
| `next.config.js` at repo root | Ensure `output: 'export'` and `trailingSlash: true` are set so the route renders to `out/programs/instrument-rating/index.html`. |
| `src/app/sitemap.ts` or `src/app/sitemap.xml/route.ts` | Add `/programs/instrument-rating/` to the auto-generated sitemap with `changefreq: 'monthly'`, `priority: 0.8`. |
| `src/lib/constants.ts` (or `src/lib/site.ts`) | Confirm the canonical base URL and program route constants are available; no new constants needed unless adding a `PROGRAMS` map. |
| `src/lib/schema.ts` | Confirm helpers exist for `buildServiceSchema`, `buildCourseSchema`, `buildFaqPageSchema`, `buildBreadcrumbListSchema`, and `buildOrganizationSchema`. If not, extend them in coordination with TICKET-001. |
| `src/app/programs/private-pilot/page.tsx` (TICKET-003) and related program pages | Add a reciprocal internal link to the Instrument Rating page where appropriate, e.g. in a “Next steps” or related-programs section. |

### Static assets to place or reference

| Asset | Source |
|-------|--------|
| `public/images/programs/instrument-rating-hero.webp` | Use the existing repo asset `images/n6576j-instrument-panel-instrument-rating-reno-nevada.BxcVyLIY_1HzB6s.webp`, renamed and optimized for WebP/AVIF with explicit width/height. |
| `public/images/programs/instrument-cross-country.webp` | Use `images/instrument-training-reno-flight-lessons.uBfxqRYx_hXOiQ.webp` if a secondary image is needed. |

## 3. Reusable components to use from TICKET-001 and other tickets

Use the shared components introduced by TICKET-001. Do **not** recreate header, footer, layout, base schema, or base metadata helpers.

### Layout / shell (TICKET-001)

- `src/app/layout.tsx` — root layout, font loading, base JSON-LD, metadata template.
- `src/components/layout/Header.tsx` — sticky header with programs dropdown, persistent “Book a discovery flight” CTA, and tappable phone link.
- `src/components/layout/Footer.tsx` — footer with byte-for-byte NAP, quick links, legal links.
- `src/components/layout/MobileStickyBar.tsx` — bottom-sticky CTA + phone on mobile.
- `src/components/ui/SectionWrapper.tsx` — consistent section padding, max-width, background toggles (cream/white/navy).

### Typography / design tokens (TICKET-001)

- Tailwind theme tokens from `tailwind.config.ts`: `navy-900`, `navy-800`, `cream-50`, `gold-500`, `orange-500`, `ink`, `ink-light`, `sky-100`.
- Font classes: `font-heading` (Instrument Serif), `font-body` (Inter), `font-mono` (IBM Plex Mono).

### SEO / schema (TICKET-001)

- `src/lib/seo/metadata.ts` — title template, OpenGraph defaults, canonical helper.
- `src/components/seo/JsonLd.tsx` — injects `<script type="application/ld+json">` safely.
- `src/lib/schema.ts` — schema builders for graph-style markup.
- `src/components/ui/Breadcrumb.tsx` — renders visible breadcrumbs and yields schema data.

### UI primitives (TICKET-001)

- `src/components/ui/CTAButton.tsx` — primary, secondary, tertiary, accent variants.
- `src/components/ui/FaqAccordion.tsx` — accessible disclosure FAQ with FAQPage schema output.
- `src/components/ui/ProgramCard.tsx` — card for related programs grid.
- `src/components/ui/PricingTable.tsx` — if a shared pricing/cost table component is provided.

### Booking / conversion (TICKET-004)

- `src/components/booking/DiscoveryFlightCTA.tsx` or `BookingCTABand.tsx` — reusable discovery-flight CTA section. If not ready, build the page with a plain `CTAButton` linking to `/discovery-flight/`.

### Fleet / instructors (TICKET-010 / TICKET-011 / TICKET-012)

- Shared data files: `src/data/fleet.ts` and `src/data/instructors.ts`. Read aircraft IFR avionics and instructor CFII specialties from these sources rather than hard-coding.
- `src/components/fleet/AircraftCard.tsx` — optional, if available, to display IFR-capable aircraft.

## 4. Page content/structure, schema markup, and SEO metadata

### 4.1 URL and metadata

| Element | Value |
|---------|-------|
| URL | `/programs/instrument-rating/` |
| Canonical | `https://www.hornbillaviation.com/programs/instrument-rating/` |
| Title tag | `Instrument Rating Training in Reno, NV | Hornbill Aviation` |
| Meta description | `Earn your FAA Instrument Rating at Reno–Tahoe. Part 61 IFR training in a WAAS-equipped PA28 fleet with Garmin G5 avionics. Book a discovery flight or consultation.` |
| OpenGraph title | same as title tag |
| OpenGraph description | same as meta description |
| OpenGraph image | `/images/programs/instrument-rating-og.webp` (1200×628) showing the N6576J panel or IFR cockpit |

Guidelines: one H1, title under 60 chars, meta under 155 chars, self-referencing canonical.

### 4.2 Breadcrumb

Visible breadcrumb + `BreadcrumbList` schema:

```
Home > Programs > Instrument Rating
```

### 4.3 Page sections

1. **Hero**
   - H1: `Instrument Rating training in Reno, NV`
   - Subheadline: brief value prop — train in a WAAS-equipped PA28 fleet at RNO, build real IFR experience, keep your schedule.
   - Primary CTA: `Book a discovery flight` → `/discovery-flight/`
   - Secondary CTA: `See the fleet and rates` → `/fleet/`
   - Tertiary action: tappable phone number.
   - Hero image: IFR panel / N6576J cockpit, explicit width/height, `fetchpriority="high"`, `loading="eager"`, descriptive alt text including “PA28 instrument panel at Reno–Tahoe International Airport”.

2. **Quick answer box (AEO snippet)**
   - 50–70 word direct answer for featured snippets / AI Overviews:
   - *“Hornbill Aviation offers Part 61 Instrument Rating training at Reno–Tahoe (RNO). You train in a WAAS GPS, dual Garmin G5 PA28 fleet, logging the 40 hours of actual or simulated instrument time the FAA requires, with a schedule built around yours.”*

3. **What the rating gives you**
   - Define the Instrument Rating: fly under IFR, file instrument flight plans, operate in marginal weather with proper planning.
   - Who it’s for: current PPL holders who want to add safety and utility.

4. **Prerequisites**
   - PPL (Airplane Single-Engine Land).
   - Current FAA medical certificate or BasicMed (for operating privileges / checkride).
   - English proficient.
   - A current logbook / flight review if needed.
   - Present as a clean list or table.

5. **Aeronautical experience / training requirements**
   - FAA minimums (Part 61 §61.65):
     - 50 hours cross-country PIC.
     - 40 hours actual or simulated instrument time.
     - 15 hours of instrument training with a CFII.
     - Long cross-country under IFR (250 nm along airways or ATC-directed routing, with instrument approaches at three different airports).
   - Ground school / written exam (FAA IRA) and checkride.
   - Realistic averages: most part-time students finish in 3–6 months; full-time in 6–10 weeks.

6. **Training structure**
   - Stage 1: basic attitude instrument flying, partial panel.
   - Stage 2: radio / GPS / WAAS navigation, holds, DME arcs, approach procedures.
   - Stage 3: IFR cross-country planning and flying in the RNO area.
   - Stage 4: checkride prep.
   - Tie to messaging pillars: **Flexibility** (Part 61, choose your CFII) and **Consistency** (same PA28 fleet).

7. **Aircraft & avionics**
   - Highlight IFR-capable PA28s:
     - N6576J — dual Garmin G5, WAAS Garmin 375 GPS.
     - N7824W — dual Garmin G5, WAAS Garmin 480 GPS.
   - Mention that VFR-only aircraft are used for select training tasks but IFR dual instruction happens in the WAAS-equipped aircraft.
   - Link to `/fleet/` for full fleet cards and rates.

8. **Cost estimate**
   - Transparent table (example placeholders — owner must confirm numbers):
     - Aircraft rental (member wet): $159/hr.
     - Aircraft rental (non-member wet): $185/hr.
     - CFII instruction: $XX/hr (confirm with owner).
     - Ground school / written exam fee: $XXX.
     - Checkride aircraft + instructor: $XXX.
     - Total realistic range: $8,500–$11,500 (varies with proficiency and preparation).
   - Include note: prices do not include FAA examiner fee, headset, or materials unless specified.
   - Link to `/fleet/`, `/membership/`, `/financing/`.

9. **Why train IFR at Hornbill / RNO**
   - Uniform PA28 fleet = predictable handling during partial-panel and approach work.
   - WAAS GPS approaches available locally.
   - Real IFR cross-country routes to Tahoe, Monterey, Bend, etc.
   - Density-altitude and mountain-weather decision-making unique to the Sierra.
   - Choose your CFII or bring your own.

10. **Discovery-flight / consultation CTA band**
    - Headline: `Start your Instrument Rating`
    - CTA: `Book a discovery flight` or `Schedule a consultation` → `/discovery-flight/` (or `/book/` if available).
    - Include reassurance: no deposit, low commitment.

11. **Related programs grid**
    - Cards linking to:
      - `/programs/private-pilot/` (prerequisite)
      - `/programs/commercial-pilot/`
      - `/programs/cfii/`
      - `/programs/mountain-flying/`
    - Use the shared `ProgramCard` component.

12. **FAQ accordion**
    - 6–8 rating-specific questions. Examples:
      - Do I need a current medical to start instrument training?
      - How long does the Instrument Rating take part-time?
      - Can I do my instrument training in my own aircraft?
      - What avionics do your IFR trainers have?
      - Does the price include the checkride and examiner fee?
      - Do you offer IPCs or instrument refresher training?
      - What happens if weather cancels an IFR lesson?
    - Render with the shared `FaqAccordion` component and output `FAQPage` schema.

### 4.4 Schema markup

Embed a single JSON-LD `@graph` in the page `<head>` containing:

- `Organization` and/or `LocalBusiness` + `EducationalOrganization` (reference the IDs defined in the root layout if possible; include again only if the page is used standalone for validation).
- `BreadcrumbList` for the visible breadcrumb.
- `Service`:
  - `serviceType`: `"Instrument Rating Flight Training"`
  - `provider`: reference to organization
  - `areaServed`: Reno, NV / RNO
  - `url`: canonical URL
  - `description`: concise service summary
  - `hasOfferCatalog`: link to `/fleet/` or program pricing
- `Course`:
  - `name`: `"Instrument Rating Training"`
  - `description`: summary
  - `educationalCredentialAwarded`: `"FAA Instrument Rating — Airplane"`
  - `coursePrerequisites`: PPL, current medical/BasicMed, English proficient
  - `provider`: reference to organization
  - `url`: canonical URL
- `FAQPage`:
  - generated from the FAQ section Q&A array.

Validate every schema object with Google’s Rich Results Test and the Schema Markup Validator before marking the ticket complete.

## 5. API/widget/data requirements

- **No new API endpoints** are required for this page.
- **Data dependencies** (read-only):
  - `src/data/programs/instrument-rating.ts` for page copy, FAQ, and metadata.
  - `src/data/fleet.ts` (TICKET-010) for IFR-capable aircraft details and wet rates.
  - `src/data/instructors.ts` (TICKET-011) for CFII names/slugs if displaying “train with a CFII” preview.
- **Booking integration**: reuse the `DiscoveryFlightCTA` or `BookingCTABand` from TICKET-004. Until that ticket is ready, use a standard `CTAButton` linking to `/discovery-flight/`.
- **Analytics**: fire the `program_page_view` event for Instrument Rating on page load; fire `discovery_flight_booking_started` when the primary CTA is clicked; fire `phone_click` on tel links. GA4/GTM setup is owned by TICKET-028 / TICKET-001.

## 6. Dependencies on other tickets

### Hard dependencies (must be done first)

- **TICKET-001 — Site shell, shared components, and global SEO setup**
  - Must provide `layout.tsx`, header/footer, metadata template, typography/color tokens, schema helpers, and sitemap generation before this page can render correctly.
- **TICKET-004 — Discovery Flight landing page and booking widget**
  - The primary CTA on this page links to `/discovery-flight/`. The discovery-flight page and route must exist first.

### Soft / coordination dependencies

- **TICKET-003 — Private Pilot program page**: the IR page links to PPL as a prerequisite. Build PPL first, or stub the route and reciprocal link after PPL is ready.
- **TICKET-010 — Fleet & Pricing page**: provides aircraft/rate data and the destination for “See the fleet and rates.”
- **TICKET-008 — Commercial Pilot, TICKET-009 — CFII, TICKET-010 — Mountain Flying program pages**: the “Related programs” grid links to these routes. If they are not ready, stub the URLs and update the grid when those tickets land.
- **TICKET-011 — Instructors index page**: if the page shows CFII preview cards.
- **TICKET-028 — Analytics, conversion events, and UTM setup**: for verifying `program_page_view` and CTA click events.

## 7. Verification steps

### Build / routing

- [ ] `npm run build` (or `next build`) completes with static export.
- [ ] `out/programs/instrument-rating/index.html` exists and is reachable.
- [ ] No build-time errors from missing shared components or schema helpers.
- [ ] Sitemap contains `/programs/instrument-rating/`.
- [ ] Internal link crawl finds the page within 3 clicks from home and all linked routes resolve (or are explicitly stubbed and tracked).

### SEO / metadata

- [ ] Exactly one `<h1>` on the page, text: `Instrument Rating training in Reno, NV`.
- [ ] Title tag matches plan and is ≤60 characters.
- [ ] Meta description matches plan and is ≤155 characters.
- [ ] Self-referencing canonical tag is present and correct.
- [ ] OpenGraph tags populated with title, description, image, and URL.
- [ ] All image alt text is descriptive and includes location/aircraft where relevant; hero image has explicit `width`/`height`, `fetchpriority="high"`, `loading="eager"`.

### Schema markup

- [ ] JSON-LD `@graph` includes `Service`, `Course`, `FAQPage`, and `BreadcrumbList`.
- [ ] `Course` includes `educationalCredentialAwarded` and `coursePrerequisites`.
- [ ] `Service` includes `serviceType`, `provider`, `areaServed`, and `url`.
- [ ] `FAQPage` includes all visible FAQ items with `@type: Question` / `AcceptedAnswer`.
- [ ] Validate with Google Rich Results Test and Schema Markup Validator; zero critical errors.

### Copy / brand

- [ ] Copy reviewed against `brand_identity_writing_style.md`:
  - No empty superlatives, aviation clichés, or LLM hedges.
  - Active voice, second person (“you”), specific numbers and names.
  - Sentence-case headings.
- [ ] Cost table and aircraft details match `website_layout_design.md` and `visual_identity.md`.
- [ ] NAP in footer/schema matches homepage byte-for-byte (1008 Gentry Way, Reno, NV 89512; 555-555-1234; office@hornbillaviation.com).

### Accessibility / UX

- [ ] WCAG 2.2 AA manual audit: heading hierarchy (H1 → H2 → H3), keyboard navigation, visible focus states, form labels (if any), color contrast ≥4.5:1 for body, 3:1 for large text/UI.
- [ ] CTA buttons pass 6:1 contrast ratio against background.
- [ ] Mobile: sticky CTA visible, touch targets ≥44 px, no horizontal scroll.
- [ ] Page tested at 320 px and 1440 px widths.

### Performance

- [ ] PageSpeed Insights / Lighthouse:
  - LCP ≤ 2.0 s
  - INP ≤ 200 ms
  - CLS ≤ 0.1
- [ ] Hero image is WebP/AVIF, < 100 KB if possible, with `srcset` for mobile/desktop.
- [ ] No render-blocking third-party scripts above the fold.

### Analytics / conversion

- [ ] `program_page_view` event fires with program name on page load.
- [ ] CTA clicks fire `discovery_flight_booking_started`.
- [ ] `tel:` link clicks fire `phone_click`.
- [ ] Events visible in GA4 DebugView or data layer.

### Owner sign-off

- [ ] Confirm final cost numbers, CFII rates, and checkride estimate with the owner.
- [ ] Confirm aircraft tail numbers and avionics match the actual fleet before publishing.
- [ ] Confirm NAP matches Google Business Profile and all directory listings.
