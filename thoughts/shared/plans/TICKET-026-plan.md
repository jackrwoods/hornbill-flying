---
id: TICKET-026-plan
title: "Implementation plan: Student Resources page"
ticket: TICKET-026
status: draft
created: 2026-06-18
---

## 1. Scope summary

TICKET-026 builds the `/student-resources/` page — a hub for current and enrolled students that aggregates weather, medical, syllabi, POH/quick-reference access, flight-planning tools, and FAA resources. The page also serves SEO by capturing long-tail student queries ("Reno pilot weather," "FAA medical certificate guide," "PA28 POH download," etc.) and by linking internally to pilot widgets, blog posts, and program pages.

What this ticket produces:

- A new static Next.js page at `/student-resources/`.
- Reusable section components for resource categories (weather, medical, syllabi/POH, flight planning, FAA resources, quick links).
- A client-side KRNO METAR/TAF widget (or an embedded iframe/link to the dedicated widget page) using NOAA/NWS Aviation Weather API.
- Internal links to `/tools/density-altitude-calculator/`, `/tools/cross-country-estimator/`, `/tools/sunrise-sunset-rno/`, `/tools/practice-area-map/`, `/tools/cost-estimator/`, and relevant `/blog/` posts.
- Schema markup (`WebPage` + `BreadcrumbList` + `FAQPage`) and page-specific SEO metadata.
- Static data file(s) for resource links, syllabus metadata, POH metadata, and medical guidance content.
- Footer/header route registration in `src/lib/routes.ts` and footer quick-links update.

This ticket does **not** implement:

- The full pilot-widgets landing pages (those belong to the widgets ticket).
- The booking API or scheduling widget.
- Real instructor availability (handled by instructor pages and booking ticket).
- Blog post content itself (only links to existing posts).

---

## 2. Exact file paths to create or modify

### New application code

| File | Purpose |
|------|---------|
| `src/app/student-resources/page.tsx` | Static page composition, metadata, JSON-LD. |
| `src/sections/student-resources/HeroSection.tsx` | Page intro with H1, quick answer box, and primary CTA. |
| `src/sections/student-resources/WeatherSection.tsx` | METAR/TAF widget + links to Aviation Weather Center, ForeFlight, SkyVector. |
| `src/sections/student-resources/MedicalSection.tsx` | FAA medical certificate guidance, med examiner lookup link, common questions. |
| `src/sections/student-resources/SyllabiAndPohSection.tsx` | Training syllabi and POH/quick-reference download cards. |
| `src/sections/student-resources/FlightPlanningSection.tsx` | Flight-planning tools, charts, performance links. |
| `src/sections/student-resources/FaaResourcesSection.tsx` | Curated FAA links (AIRMET/SIGMET, NOTAMs, regs, ACs). |
| `src/sections/student-resources/QuickLinksSection.tsx` | Internal links to blog posts, tools, program pages, contact. |
| `src/sections/student-resources/StudentResourcesFAQ.tsx` | FAQ accordion with FAQPage schema. |
| `src/components/MetarTafWidget.tsx` | Standalone METAR/TAF widget for RNO (reusable on this page and widget landing page). |
| `src/components/ResourceCard.tsx` | Card component for a resource: title, description, link(s), tags. |
| `src/components/DownloadCard.tsx` | Card for syllabus/POH with file size/format, download link, last-updated date. |
| `src/content/student-resources.ts` | Static data for all external/internal links, syllabus/POH metadata, FAQ data. |

### Modified files (created by TICKET-001 or earlier tickets)

| File | Change |
|------|--------|
| `src/lib/routes.ts` | Add `/student-resources/` to the published route map and footer quick-links list. |
| `src/components/Footer.tsx` | Add "Student Resources" to footer quick links. |
| `src/app/sitemap.ts` | Include `/student-resources/` with changefreq `monthly`, priority `0.6`. |

### Static assets

| File | Purpose |
|------|---------|
| `public/images/student-resources/hero.webp` | Hero image (e.g., PA28 on the RNO ramp with Sierra backdrop). Must have explicit width/height. |
| `public/downloads/syllabus-private-pilot.pdf` | Placeholder syllabus PDFs. Actual files supplied later; if unavailable, link to external/vendor syllabi and flag with `// TODO: data ticket`. |
| `public/downloads/syllabus-instrument.pdf` | Instrument syllabus PDF placeholder. |
| `public/downloads/poh-n6576j.pdf` | POH/quick-reference for tail N6576J (or link to manufacturer POH if vendor prohibits redistribution). |
| `public/downloads/poh-n7824w.pdf` | POH/quick-reference for tail N7824W. |
| `public/downloads/checklist-pa28.pdf` | Shared PA28 checklist/quick-reference PDF. |

---

## 3. Reusable components to use from TICKET-001 (shell) and other tickets

### From TICKET-001 (must be available before this ticket starts)

| Component | Usage |
|-----------|-------|
| `app/layout.tsx` | Global wrapper, fonts, default metadata, header/footer. |
| `Header` / `MobileNav` | Site navigation; student resources appears in header under "Resources" or footer (design decision: footer-only per design doc lines 67-75). |
| `Footer` | Add quick link to `/student-resources/`. |
| `Container` | Max-width wrappers for every section. |
| `Section` | Consistent vertical spacing and background variants. |
| `PageHeader` | Breadcrumb + H1 + subtitle at top of page. |
| `Button` | CTA buttons for discovery flight, contact, downloads. |
| `CTALink` | "Book a discovery flight" CTA. |
| `PhoneLink` | Click-to-call for scheduling questions. |
| `SchemaInjector` | Inject page-specific JSON-LD. |
| `FAQAccordion` | FAQ section with FAQPage schema support. |
| `src/lib/schema.ts` | Builders for `WebPage`, `BreadcrumbList`, `FAQPage`, `Organization`, etc. |
| `src/lib/seo.ts` | `buildTitle`, `buildCanonical`, `buildOpenGraph`. |
| `src/lib/routes.ts` | Route map; add new entry. |
| `src/lib/config.ts` | NAP and base URL. |

### From dependent / related tickets (use when available)

| Component / Asset | Source | Usage |
|-------------------|--------|-------|
| `MetarTafWidget` | Ideally built by the widgets ticket; this ticket can introduce a minimal version if the widget ticket is later. | Live weather display on the page. |
| `DensityAltitudeCalculator` | Widgets ticket | Link from weather section to `/tools/density-altitude-calculator/`. |
| `CrossCountryEstimator` | Widgets ticket | Link from flight-planning section to `/tools/cross-country-estimator/`. |
| `SunriseSunsetWidget` | Widgets ticket | Link to `/tools/sunrise-sunset-rno/`. |
| `PracticeAreaMap` | Widgets ticket | Link to `/tools/practice-area-map/`. |
| `CostEstimator` | Widgets ticket | Link to `/tools/cost-estimator/`. |
| Blog post pages | Blog ticket | Internal links to `/blog/medical-certificate-guide/`, `/blog/density-altitude-at-krno/`, `/blog/flight-training-reno-nv/`, etc. |
| Program pages | Program-page tickets | Links to `/programs/private-pilot/`, `/programs/instrument-rating/`, etc. |
| Fleet page | Fleet ticket | Link to `/fleet/` for current aircraft/tail numbers. |

---

## 4. Page content/structure, schema markup, and SEO metadata

### Page metadata

| Field | Value |
|-------|-------|
| URL | `/student-resources/` |
| Title tag | `Student Resources for Pilots in Reno, NV | Hornbill Aviation` |
| Meta description | `Weather, METAR/TAF for RNO, FAA medical certificate guidance, training syllabi, POH downloads, flight-planning tools, and Part 61 resources for Hornbill students.` (under 155 chars) |
| Canonical | `https://hornbillaviation.com/student-resources/` |
| OpenGraph | `og:type: website`, title/description mirror, `og:image` default or `/images/student-resources/hero.webp`. |

### Heading hierarchy

- H1: "Student resources for Reno pilots" (or "Pilot resources and training tools")
- H2: each section title (Weather, Medical, Syllabi & POH, Flight Planning, FAA Resources, Quick Links, FAQ)
- H3: resource card titles / subsection titles
- No skipped levels.

### Content sections (in order)

#### 4.1 PageHeader

- Breadcrumb: Home > Student Resources
- H1: "Student resources for Reno pilots"
- Subtitle: "Everything current and enrolled students need in one place: RNO weather, FAA medical guidance, syllabi, POH downloads, flight-planning tools, and quick links to Hornbill programs and pilot tools."
- Secondary CTA: "Book a discovery flight" (for prospective students who land here via SEO).

#### 4.2 Quick Answer Box (above-the-fold)

A concise 50–70 word answer box for AI/answer-engine optimization:

> Hornbill Aviation students can check the latest KRNO METAR/TAF, download training syllabi and PA28 checklists, review FAA medical certificate requirements, and use our Reno-specific flight tools. Everything is organized below and kept current.

#### 4.3 WeatherSection

- H2: "Reno–Tahoe weather (KRNO)"
- `MetarTafWidget` displaying current METAR and latest TAF for RNO, with plain-language decoding for student pilots.
- Link to full briefing: "Open full briefing on Aviation Weather Center"
- Link to `https://www.aviationweather.gov/` with `rel="noopener noreferrer"` and UTM params if desired.
- Link to `/tools/density-altitude-calculator/` with anchor text "Density altitude calculator for RNO".
- Link to `/blog/density-altitude-at-krno/` (blog cluster post).
- Caution note: "Always obtain a full preflight weather briefing from an official source."

#### 4.4 MedicalSection

- H2: "FAA medical certificate guide"
- Subsection H3: "Which medical certificate do I need?"
  - First/Second/Third class basics and which certificate is required for SPL/PPL/IR/CPL.
- Subsection H3: "How to schedule your exam"
  - Link to FAA MedXPress and the AME locator.
- Subsection H3: "Common medical questions"
  - 3-4 short questions (e.g., glasses, ADHD, medication, BasicMed for Sport Pilot).
- Internal link to `/blog/medical-certificate-guide/`.
- CTA: "Questions? Call us" using `PhoneLink`.

#### 4.5 SyllabiAndPohSection

- H2: "Training syllabi and aircraft documents"
- Intro text: "Download the current syllabi and quick-reference documents for your training. POH links are provided for reference; always verify with the physical POH in the aircraft before flight."
- `DownloadCard` grid:
  - Private Pilot syllabus (PDF)
  - Instrument Rating syllabus (PDF)
  - Commercial Pilot syllabus (PDF, if available)
  - CFI/CFII syllabus outlines (if available)
  - PA28 checklist/quick-reference (PDF)
  - POH quick-reference cards per tail number (N6576J, N7824W, N7969W, N0001J)
- If PDFs are not ready, render cards with "Coming soon" state and link to `/fleet/` for current tail numbers.
- Each card shows: title, description, file format, estimated size, last-updated date, download button.

#### 4.6 FlightPlanningSection

- H2: "Flight-planning tools"
- Tool links (internal widgets when available, external otherwise):
  - Cross-country fuel/time estimator → `/tools/cross-country-estimator/`
  - Sunrise/sunset at RNO → `/tools/sunrise-sunset-rno/`
  - Practice area / local route map → `/tools/practice-area-map/`
  - Cost estimator → `/tools/cost-estimator/`
- External links:
  - ForeFlight (if recommending)
  - SkyVector
  - 1800WXBrief
  - FAA chart supplemental
- Internal link to `/programs/mountain-flying/`.

#### 4.7 FaaResourcesSection

- H2: "Useful FAA resources"
- Curated external links grouped by topic:
  - Regulations & ACs: 14 CFR Part 61, Part 91, AC 61-98B (recency of experience), AC 90-48D
  - Weather: AIRMET/SIGMET, TAF/METAR guide, PIREP
  - NOTAMs: official NOTAM search
  - Safety: FAASTeam, WINGS program
  - Medical: FAA MedXPress, AME locator, BasicMed
- All external links open in new tab with `rel="noopener noreferrer"`.

#### 4.8 QuickLinksSection

- H2: "More from Hornbill"
- Internal link grid:
  - Book a discovery flight → `/discovery-flight/`
  - Fleet & pricing → `/fleet/`
  - Membership → `/membership/`
  - Programs → `/programs/private-pilot/`, `/programs/instrument-rating/`, etc.
  - Blog → `/blog/`
  - Contact / location → `/contact/`, `/location/`
  - Instructor pages → `/instructors/`

#### 4.9 StudentResourcesFAQ

- H2: "Student resources FAQ"
- 5-7 questions with `FAQAccordion` and `FAQPage` schema:
  1. How do I check the weather before a flight at RNO?
  2. Where can I find the current PA28 checklist?
  3. What FAA medical certificate do I need for a Private Pilot?
  4. Can I use BasicMed for flight training?
  5. Where are the local practice areas around Reno?
  6. How do I estimate cross-country fuel for the PA28?
  7. Who do I contact if a syllabus link is broken?

### Schema markup

Inject via `SchemaInjector` in `page.tsx`:

1. **WebPage**
   - `@id`: `https://hornbillaviation.com/student-resources/#webpage`
   - `url`: `https://hornbillaviation.com/student-resources/`
   - `name`: page title
   - `description`: meta description
   - `breadcrumb`: reference BreadcrumbList
   - `isPartOf`: reference WebSite from root layout
2. **BreadcrumbList**
   - Item 1: Home (`https://hornbillaviation.com/`)
   - Item 2: Student Resources (`https://hornbillaviation.com/student-resources/`)
3. **FAQPage**
   - `mainEntity`: array of Question/Answer pairs from `StudentResourcesFAQ`.
4. **Organization / LocalBusiness / EducationalOrganization** — inherited from root layout; no duplication needed unless page-specific offers are added.

If the syllabi/POH section is treated as a downloadable collection, optionally add:

- **DataDownload** or **DigitalDocument** (one per PDF) linked under the page's `WebPage` `hasPart` or `mainEntity`. Keep schema minimal at launch; validate first.

---

## 5. API/widget/data requirements

### Live API used on this page

| API | Endpoint | Purpose | Behavior |
|-----|----------|---------|----------|
| NOAA/NWS Aviation Weather API | `https://aviationweather.gov/api/data/metar?ids=KRNO` and `https://aviationweather.gov/api/data/taf?ids=KRNO` | Current METAR and TAF for RNO | Client-side fetch only; called after hydration in `MetarTafWidget`. Cache for 5 minutes. Show loading, error, and stale states. |

### Widget requirements

| Widget | Implementation | Notes |
|--------|---------------|-------|
| `MetarTafWidget` | Build in this ticket if not already built by widgets ticket. | Decode METAR/TAF into plain language (wind, visibility, ceiling, temperature, altimeter). Link to Aviation Weather Center. |
| Density altitude calculator | Link to `/tools/density-altitude-calculator/` (built by widgets ticket). | If widget ticket is not ready, hide link or show "Coming soon". |
| Cross-country estimator | Link to `/tools/cross-country-estimator/`. | Same fallback. |
| Sunrise/sunset | Link to `/tools/sunrise-sunset-rno/`. | Same fallback. |
| Practice area map | Link to `/tools/practice-area-map/`. | Same fallback. |
| Cost estimator | Link to `/tools/cost-estimator/`. | Same fallback. |

### Static data file requirements

Create `src/content/student-resources.ts` exporting:

```ts
export interface ExternalResource {
  title: string;
  url: string;
  description: string;
  category: 'weather' | 'medical' | 'faa' | 'planning';
  isFaa?: boolean;
}

export interface DownloadableDocument {
  title: string;
  slug: string;
  description: string;
  filePath?: string; // /downloads/...  (undefined = coming soon)
  externalUrl?: string;
  format: 'PDF';
  size?: string; // e.g. "1.2 MB"
  lastUpdated?: string; // ISO date
  tailNumber?: string; // for POH cards
}

export interface StudentFaqItem {
  question: string;
  answer: string;
}
```

Data contents (initial):

- External resources: Aviation Weather Center, 1800WXBrief, ForeFlight, SkyVector, FAA MedXPress, AME locator, BasicMed, NOTAM search, AIRMET/SIGMET, Part 61, Part 91, AC 61-98B, AC 90-48D, FAASTeam.
- Downloadables: private pilot syllabus, instrument syllabus, PA28 checklist, POH quick-reference cards per tail.
- FAQ: 5-7 items.

### External link maintenance

- Add a monthly calendar reminder (or data ticket) to verify all external links are still valid.
- Use a link-checker script in CI if available; otherwise manual verification before each deploy.

---

## 6. Dependencies on other tickets

### Must be completed before TICKET-026

| Ticket | What it provides | Why it blocks this ticket |
|--------|------------------|---------------------------|
| TICKET-001 | Site shell, layout, metadata helpers, schema helpers, header/footer, route map, Container/Section/PageHeader/Button/CTALink/PhoneLink/SchemaInjector/FAQAccordion. | The student-resources page cannot compose its UI without the shared shell. |
| (Content/data ticket, if separate) | Final tail numbers, syllabus/POH files or URLs, office hours, instructor names. | Download cards and program links need accurate data. If unavailable, placeholders flagged `// TODO: data ticket` are acceptable. |

### Should be completed or partially ready before TICKET-026 (soft dependencies)

| Ticket / Work | What it provides | Why it matters |
|---------------|------------------|----------------|
| Pilot widgets ticket(s) | `MetarTafWidget` and landing pages at `/tools/*`. | The page looks incomplete without live weather or links to tools. This ticket can introduce a minimal `MetarTafWidget` if widgets are not ready. |
| Blog ticket | Cluster posts (medical certificate guide, density altitude at KRNO, etc.). | Internal links from student resources to blog improve SEO and user flow. |
| Program pages | `/programs/*` published. | Links from quick-links and medical sections need valid destinations. |
| Fleet page | `/fleet/` with tail numbers and rates. | Syllabi/POH section references current aircraft. |
| Contact page | `/contact/` and `/location/`. | Students need a clear support path. |

### What depends on TICKET-026

| Downstream work | What it consumes |
|-----------------|------------------|
| Pilot widgets landing pages | Link back to `/student-resources/` as the parent hub. |
| Blog posts | Link to `/student-resources/` from relevant cluster posts. |
| Footer/header updates | Student resources link added to `routes.ts` and footer. |

---

## 7. Verification steps

### 7.1 Build and export verification

1. Run `npm run build` and confirm `dist/student-resources/index.html` is created.
2. Serve `dist/` with `npx serve@latest dist`.
3. Navigate to `/student-resources/` and confirm it renders without errors.
4. Confirm no server-only Next.js features are used in the page or its sections.

### 7.2 SEO metadata checks

1. Title tag: `Student Resources for Pilots in Reno, NV | Hornbill Aviation`.
2. Meta description under 155 characters and includes "Reno," "RNO," "METAR/TAF," "syllabi," "POH."
3. Canonical is self-referencing with trailing slash: `https://hornbillaviation.com/student-resources/`.
4. OpenGraph and Twitter tags populated; image is absolute URL.
5. H1 is unique and matches planned text.
6. Heading hierarchy has no skipped levels and only one H1.

### 7.3 Schema validation

1. Inject JSON-LD and validate with Google Rich Results Test and validator.schema.org.
2. Confirm presence of:
   - `WebPage`
   - `BreadcrumbList` with Home and Student Resources items
   - `FAQPage` with all FAQ items
3. Confirm no duplicate `@id` values and all absolute URLs use the production domain.
4. Confirm FAQ answers are complete sentences (not just links).

### 7.4 Content and link verification

1. Run a link checker on `/student-resources/index.html`:
   - All internal links resolve (no 404).
   - All external links use `https://`, `rel="noopener noreferrer"`, and open in new tab.
2. Verify external links point to current FAA pages (Part 61, Part 91, MedXPress, AME locator, BasicMed, NOTAM, AIRMET/SIGMET).
3. Verify Aviation Weather Center link is correct.
4. Verify download links point to files in `public/downloads/` or are clearly marked "Coming soon."
5. Check copy against `brand_identity_writing_style.md` forbidden-phrase list.

### 7.5 Widget and API verification

1. `MetarTafWidget`:
   - Loads current METAR for RNO within a few seconds.
   - Displays TAF if available.
   - Handles API failure gracefully with a retry link to Aviation Weather Center.
   - Does not call the API during static build (client-side only).
2. Confirm widget links to `/tools/*` point to routes that either exist or are marked "Coming soon" gracefully.

### 7.6 Accessibility checks

1. Run axe-core or Lighthouse accessibility audit; target WCAG 2.2 AA.
2. Confirm all download buttons have accessible names including file type.
3. Confirm external links announce "opens in new tab" visually or via screen-reader text.
4. Verify color contrast passes AA for all text/background combinations.
5. Verify focus order is logical through resource cards and FAQ accordion.

### 7.7 Responsive and mobile checks

1. Test page at 320 px, 375 px, 414 px, 768 px, 1024 px, 1440 px.
2. Confirm resource cards stack vertically on mobile.
3. Confirm `MetarTafWidget` text does not overflow horizontally.
4. Confirm footer quick-link to Student Resources is tappable (≥44 px touch target).

### 7.8 Sitemap and navigation

1. Confirm `src/lib/routes.ts` includes `/student-resources/`.
2. Confirm generated `sitemap.xml` includes `https://hornbillaviation.com/student-resources/` with `changefreq` monthly and priority `0.6`.
3. Confirm footer quick-links render "Student Resources."

---

## 8. Implementation order (suggested)

1. Verify TICKET-001 shell is merged and stable.
2. Add `/student-resources/` route to `src/lib/routes.ts` and update `Footer` quick links.
3. Create `src/content/student-resources.ts` with all external links, downloadable metadata, and FAQ data.
4. Create `public/downloads/` folder and add placeholder/actual PDFs.
5. Create reusable components `ResourceCard`, `DownloadCard`, and `MetarTafWidget`.
6. Create section components under `src/sections/student-resources/`.
7. Compose page in `src/app/student-resources/page.tsx` with metadata and schema.
8. Update `src/app/sitemap.ts` to include the new route.
9. Run build, execute verification steps, fix issues.
10. Update ticket status and add handoff notes for widget/blog tickets.
