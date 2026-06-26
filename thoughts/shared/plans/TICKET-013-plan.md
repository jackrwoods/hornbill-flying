---
id: TICKET-013-plan
title: "Implementation plan: Instructors index page"
ticket: TICKET-013
status: draft
created: 2026-06-18
---

## 1. Scope summary

TICKET-013 builds the `/instructors/` team-overview page for the Hornbill Aviation static Next.js marketing site. This page introduces all four launch CFIs, surfaces their specialties and bios, and provides a clear path to book with each instructor.

What this ticket produces:

- The public index page at `/instructors/`.
- A richer, reusable `InstructorCard` component (distinct from the homepage `InstructorPreviewCard`).
- A shared, canonical instructor data source in `src/content/instructors.ts` that is also consumed by TICKET-014 (individual instructor pages).
- Page-specific sections: hero/page header, instructor grid, trust/philosophy copy, FAQ accordion, and a bottom discovery-flight CTA.
- JSON-LD schema: `BreadcrumbList`, one `Person` schema object per instructor, and `FAQPage` if an FAQ section is included.
- SEO metadata (title, description, canonical, OpenGraph/Twitter) aligned with the site-wide conventions established in TICKET-001.

This ticket does **not** implement:

- Individual instructor detail pages (TICKET-014).
- The booking widget or `/api/*` backend (dedicated booking ticket).
- Real instructor photography or certificate numbers at launch (per the resolved design decision to use placeholders and omit certificate numbers until consent/availability is confirmed).

---

## 2. Exact file paths to create or modify

### New page

| File | Purpose |
|------|---------|
| `src/app/instructors/page.tsx` | The `/instructors/` route component. Composes sections, sets page metadata, and injects page-specific JSON-LD. |

### New section components

| File | Purpose |
|------|---------|
| `src/sections/instructors/InstructorsPageHeader.tsx` | Breadcrumb + H1 + intro paragraph about instructor choice. |
| `src/sections/instructors/InstructorGridSection.tsx` | Responsive grid of 4 `InstructorCard` components. |
| `src/sections/instructors/InstructorsFAQSection.tsx` | FAQ accordion with `FAQPage` schema (optional but recommended). |
| `src/sections/instructors/InstructorsCTASection.tsx` | Bottom conversion block: "Not sure which instructor fits you? Book a discovery flight." |

### New shared components

| File | Purpose |
|------|---------|
| `src/components/InstructorCard.tsx` | Detailed card: placeholder photo, name, specialties tags, bio, certificate-number slot (hidden at launch), and "Book with [Name]" CTA. |
| `src/components/InstructorPhoto.tsx` | Avatar/placeholder wrapper with consistent aspect ratio and alt text. |

### Modified shared files

| File | Change |
|------|--------|
| `src/content/instructors.ts` | Extend the placeholder data from TICKET-001 into the canonical launch dataset. Add `slug`, `name`, `specialties[]`, `bio`, `photo` (placeholder path), `certificateNumber` (null/commented at launch), `bookingLink`, and `programs[]`. |
| `src/lib/schema.ts` | Add a `buildPerson(instructor)` helper for `Person` JSON-LD and a `buildItemList(persons[])` helper if the grid is represented as an `ItemList` of `Person` items. |
| `src/lib/routes.ts` | Ensure the `/instructors/` route and the 4 instructor detail routes are declared (detail routes may be marked `published: false` until TICKET-014 ships if they are not yet built). |

### Static assets

| File | Purpose |
|------|---------|
| `public/images/instructors/placeholder-avatar.svg` | Generic avatar used for all 4 CFIs at launch. Should be a neutral silhouette or initials-style fallback, not a specific gender/race depiction. |

### Documentation

| File | Purpose |
|------|---------|
| `thoughts/shared/plans/TICKET-013-plan.md` | This plan. |

---

## 3. Reusable components to use from TICKET-001 (shell) and other tickets

### Components from TICKET-001 to import directly

| Component | How it is used on `/instructors/` |
|-----------|------------------------------------|
| `Header` / `Footer` | Provided automatically by `app/layout.tsx`; no direct import needed in the page. |
| `Container` | Wraps every section at the standard max-width. |
| `Section` | Provides consistent vertical spacing and background variants. |
| `PageHeader` | Breadcrumb + H1 wrapper for the top of the page. |
| `Button` | "Book with [Name]" and bottom CTA button styling. |
| `CTALink` | Discovery-flight CTA (consistent with header CTA). |
| `PhoneLink` | Optional phone CTA in the bottom section. |
| `SchemaInjector` | Injects `Person`, `BreadcrumbList`, and `FAQPage` JSON-LD. |
| `FAQAccordion` | Renders the FAQ section with FAQPage schema support. |

### Components introduced by this ticket

- `InstructorCard` — consumed here and not expected elsewhere until TICKET-014 possibly reuses it on the individual instructor page as a "more instructors" cross-sell.
- `InstructorPhoto` — shared with TICKET-014 for consistent avatar handling.

### Data source shared with TICKET-014

- `src/content/instructors.ts` is the single source of truth for instructor slugs, names, bios, specialties, and booking links. TICKET-014 must consume the same file for its `/instructors/[slug]/` dynamic routes.

### Components expected from later tickets

- `BookingForm` / `DiscoveryFlightPicker` — not used directly on this page; the index links to instructor detail pages and to `/discovery-flight/?instructor=[slug]` for preselection.
- Real `InstructorPhoto` images — deferred until CFIs are hired/photographed; placeholder is used here.

---

## 4. Page content/structure, schema markup, and SEO metadata

### 4.1 URL and metadata

| Element | Value |
|---------|-------|
| URL | `/instructors/` |
| Canonical | `https://hornbillaviation.com/instructors/` |
| Title | `Flight Instructors in Reno, NV | Hornbill Aviation` |
| Meta description | `Meet the CFIs at Hornbill Aviation. Part 61 flight instruction at RNO, choose your instructor, and book a discovery flight with the CFI who fits your goals.` |
| H1 | `Part 61 flight instructors in Reno, NV` |
| Subtitle / lead | `Choose the CFI who fits your goals and schedule.` |
| OpenGraph | `og:type: website`, `og:title` mirrors page title, `og:description` mirrors meta description, `og:image` falls back to `/opengraph-default.jpg`. |
| Twitter | `twitter:card: summary_large_image`, title/description mirrored. |

**Metadata constraints:**

- Title must be unique and under 60 characters.
- Meta description must be under 155 characters and include "RNO" and "discovery flight".

### 4.2 Content structure (in order)

1. **InstructorsPageHeader**
   - Breadcrumb: `Home > Instructors`.
   - H1: `Part 61 flight instructors in Reno, NV`.
   - Intro copy (2–3 sentences): explain that Hornbill is a Part 61 school where students choose or bring their own instructor, and that all CFIs train in the same PA28 fleet.
   - Optional quick stat: `4 CFIs · 1 consistent PA28 fleet · train at RNO`.

2. **InstructorGridSection**
   - Responsive grid: 1 column on mobile, 2 on tablet, 4 on desktop.
   - Each card receives its data from `src/content/instructors.ts`.

3. **InstructorsFAQSection** (recommended)
   - 4 questions:
     1. "Can I choose my instructor at Hornbill?"
     2. "Can I bring my own CFI?"
     3. "How do I book a flight with a specific instructor?"
     4. "What if my preferred instructor is unavailable?"

4. **InstructorsCTASection**
   - Heading (H2): `Not sure which instructor is right for you?`
   - Body: suggest booking a discovery flight to meet the team.
   - Primary CTA: `Book a discovery flight` → `/discovery-flight/`.
   - Secondary action: click-to-call `PhoneLink`.

### 4.3 Instructor card content

Each `InstructorCard` must render:

- **Photo:** `InstructorPhoto` placeholder (or real photo when available) with `width`/`height` and descriptive `alt` text: `Headshot of [Name], Certified Flight Instructor at Hornbill Aviation`.
- **Name:** H3, e.g. `Sarah Chen`.
- **Specialties:** 2–4 tag pills, e.g. `Private Pilot`, `Instrument Rating`, `Anxious students`, `Mountain flying`.
- **Bio:** 2–3 sentence paragraph, warm/credible tone per the brand writing style guide.
- **Certificate number:** Hidden at launch (resolved decision: certificate numbers intentionally omitted). Leave a conditional render block with a TODO/data-ticket comment so it can be enabled per-CFI once consent is obtained.
- **Primary CTA:** `Book with [Name]` → `/instructors/[slug]/`.
- **Secondary link:** `View full profile` → `/instructors/[slug]/`.

### 4.4 JSON-LD schema markup

Inject the following via `SchemaInjector`:

1. **BreadcrumbList**
   - Item 1: `Home` → `https://hornbillaviation.com/`
   - Item 2: `Instructors` → `https://hornbillaviation.com/instructors/`

2. **Person** (one per instructor)
   - `@type`: `Person`
   - `name`: instructor full name
   - `jobTitle`: `Certified Flight Instructor`
   - `worksFor`: reference to `/#organization` (absolute URL)
   - `knowsAbout`: array of specialties (e.g. `Private Pilot Training`, `Instrument Rating`, `Mountain Flying`)
   - `description`: short bio
   - `url`: `https://hornbillaviation.com/instructors/[slug]/`
   - `image`: placeholder avatar URL (or real photo URL)
   - Do **not** include `identifier` / certificate number at launch.

3. **ItemList** (optional, wraps the grid)
   - `@type`: `ItemList`
   - `itemListElement`: array of `ListItem` objects, each with `position` and `item` referencing the corresponding `Person` `@id`.
   - Use absolute `@id` for each Person: `https://hornbillaviation.com/instructors/[slug]/#person`

4. **FAQPage** (if FAQ section is included)
   - `@type`: `FAQPage`
   - `mainEntity`: array of `Question`/`Answer` pairs drawn from the FAQ section data.

### 4.5 Internal links

| Source | Target | Anchor text example |
|--------|--------|---------------------|
| Instructor card | `/instructors/[slug]/` | `Book with [Name]` / `View full profile` |
| Intro copy | `/programs/private-pilot/` | `Private Pilot training` |
| Intro copy | `/about/` | `our Part 61 philosophy` |
| Bottom CTA | `/discovery-flight/` | `Book a discovery flight` |
| Bottom CTA | `tel:+15555551234` | `555-555-1234` |

### 4.6 Heading hierarchy

- H1: page title only.
- H2: section titles (`Meet the team`, `Common questions`, `Ready to fly?`).
- H3: each instructor name.
- H4/H5: specialty tags and small labels only if needed.

---

## 5. API/widget/data requirements

### External APIs

None. This page is fully static.

### Data files

| File | Data to add/update |
|------|----------------------|
| `src/content/instructors.ts` | Launch dataset for 4 placeholder CFIs. Shape: `slug`, `name`, `specialties: string[]`, `bio: string`, `photo: string`, `certificateNumber: string \| null`, `bookingLink: string`, `programs: string[]`. |
| `src/content/faq.ts` or `src/content/instructors-faq.ts` | FAQ items for the instructors page. Prefer adding to a page-specific file to keep the homepage FAQ isolated. |

### Booking preselection

- The card CTA links to `/instructors/[slug]/` (TICKET-014).
- As a lightweight preselection shortcut, the bottom CTA can link to `/discovery-flight/?instructor=[slug]` so that the booking widget (later ticket) can prefill the preferred instructor. The index page does not need to read or validate that query parameter.

### Images

- Use `public/images/instructors/placeholder-avatar.svg` for all 4 instructors at launch.
- When real photos are available, update only the `photo` path in `src/content/instructors.ts`; no code change required.

---

## 6. Dependencies on other tickets

### Must be done first

| Ticket | Why it blocks TICKET-013 |
|--------|--------------------------|
| TICKET-001 | Provides the site shell (`Header`, `Footer`, layout, metadata helpers, `SchemaInjector`, `Container`, `Section`, `PageHeader`, `Button`, `CTALink`, `PhoneLink`, `FAQAccordion`, `src/lib/schema.ts`, `src/lib/routes.ts`, base Organization/LocalBusiness schema). |

### Must be coordinated with

| Ticket | Coordination point |
|--------|--------------------|
| TICKET-014 | Shared `src/content/instructors.ts` data shape and slug names must match. Slugs, names, and URLs used on the index page must align with the dynamic routes generated by TICKET-014. Either ticket can own the initial creation of `src/content/instructors.ts`; the other must consume it without duplication. |

### What depends on this ticket

| Ticket | What it consumes from TICKET-013 |
|--------|----------------------------------|
| TICKET-014 | The canonical `src/content/instructors.ts` dataset and the `/instructors/[slug]/` URL convention. |
| Booking widget ticket | The `?instructor=[slug]` preselection convention (if adopted) and the CTA wording "Book with [Name]". |

---

## 7. Verification steps

### 7.1 Build and export verification

1. Run `npm run build`.
2. Confirm `dist/instructors/index.html` exists and contains no 404 or server-only references.
3. Confirm `dist/instructors/index.html` is reachable from `dist/index.html` via the header nav or footer link.

### 7.2 Schema validation

1. Copy the rendered HTML for `/instructors/` into:
   - Google Rich Results Test.
   - Schema.org validator (code-snippet mode).
2. Verify JSON-LD contains:
   - One valid `BreadcrumbList` with Home → Instructors.
   - One valid `Person` per instructor with `name`, `jobTitle`, `worksFor`, `knowsAbout`, `description`, `url`, and `image`.
   - If `ItemList` is used, verify `itemListElement` positions are sequential and `item` references resolve to Person `@id` values.
   - If FAQ section is included, one valid `FAQPage` with all 4 Q&A pairs.
3. Confirm no certificate numbers are emitted in schema or visible copy at launch.
4. Confirm all schema `@id` and `url` values use absolute `https://hornbillaviation.com/instructors/[slug]/` URLs.

### 7.3 SEO metadata checks

1. Title is exactly `Flight Instructors in Reno, NV | Hornbill Aviation` and under 60 characters.
2. Meta description is under 155 characters and contains "RNO" and "discovery flight".
3. Canonical link is self-referencing with trailing slash: `https://hornbillaviation.com/instructors/`.
4. OpenGraph and Twitter tags are present and populated.
5. H1 is unique and matches the page title keyword theme.

### 7.4 Content and copy checks

1. Read all page copy against the forbidden-phrase list in `brand_identity_writing_style.md`:
   - No "soar", "unlock your potential", "sky's the limit", exclamation-point hype, or LLM hedging.
2. Verify the lead pillar is **Flexibility** (per brand identity pillar mapping for Instructors).
3. Verify each instructor bio is warm, credible, and personal; lead with the human, then credentials.
4. Verify certificate numbers are not shown.

### 7.5 Accessibility and UX checks

1. Run axe-core or Lighthouse accessibility audit; target WCAG 2.2 AA.
2. Verify color contrast:
   - `gold-500` on `navy-900` for CTA highlights passes AA for large text.
   - Body text is `ink` on `cream-50` or `white`.
3. Verify heading hierarchy: one H1, no skipped levels.
4. Verify instructor cards are keyboard-navigable and CTAs have visible focus rings.
5. Verify touch targets for specialty tags and CTAs are ≥44 px.
6. Verify placeholder avatars have meaningful `alt` text including the instructor name.

### 7.6 Responsive and visual checks

1. Inspect at 320 px, 375 px, 414 px, 768 px, 1024 px, and 1280+ px.
2. Confirm the grid collapses gracefully: 1 → 2 → 4 columns.
3. Confirm card text does not overflow at any breakpoint; use line clamps for bios if needed.
4. Confirm the page header breadcrumb is visible and readable on mobile.

### 7.7 Link and navigation checks

1. Each of the 4 "Book with [Name]" CTAs links to the correct `/instructors/[slug]/`.
2. Each "View full profile" link targets the same URL.
3. Bottom "Book a discovery flight" CTA links to `/discovery-flight/`.
4. Phone link uses `tel:+15555551234`.
5. Header and footer links to `/instructors/` remain reachable and do not produce a 404.

### 7.8 Core Web Vitals checks

1. Run Lighthouse on the exported `/instructors/index.html`.
2. Targets:
   - LCP ≤ 2.0 s
   - CLS ≤ 0.1
   - INP ≤ 200 ms (lab estimate)
3. Confirm placeholder avatars are small SVGs or optimized WebP/AVIF, not large unoptimized raster files.
4. Confirm no layout shift occurs when cards render (fixed card heights or aspect-ratio boxes).

### 7.9 Cross-ticket contract checks

1. `src/content/instructors.ts` uses the same shape expected by TICKET-014.
2. `src/lib/schema.ts` exposes a `buildPerson()` helper reusable by TICKET-014.
3. Instructor slugs are URL-safe, lowercase, hyphenated, and match the dynamic route convention `/instructors/[slug]/`.

---

## 8. Implementation order (suggested)

1. Confirm TICKET-001 is complete and the project builds.
2. Add/extend `src/content/instructors.ts` with the 4 launch instructor records.
3. Add `buildPerson()` (and optional `buildItemList()`) to `src/lib/schema.ts`.
4. Create `src/components/InstructorPhoto.tsx` and `src/components/InstructorCard.tsx`.
5. Create section components under `src/sections/instructors/`.
6. Create `src/app/instructors/page.tsx` with metadata, schema injection, and section composition.
7. Add the placeholder avatar asset to `public/images/instructors/`.
8. Update `src/lib/routes.ts` if route declarations are required for sitemap/header/footer.
9. Run `npm run build`, fix errors, and execute verification steps.
10. Coordinate slug/data shape with TICKET-014 owner before either ticket ships.
