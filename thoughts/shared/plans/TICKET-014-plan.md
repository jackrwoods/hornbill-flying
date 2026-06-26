---
id: TICKET-014-plan
title: "Implementation plan: Individual instructor pages"
ticket: TICKET-014
status: draft
created: 2026-06-18
---

## 1. Scope summary

TICKET-014 builds the dynamic `/instructors/[slug]/` page template and generates static detail pages for the 4 placeholder flight instructors at launch. Each page is designed to:

- Send strong E-E-A-T signals for the school and the individual CFI.
- Rank for long-tail local queries such as "learn to fly with [Name] Reno" and "flight instructor [Name] RNO".
- Provide a direct conversion path to book a discovery flight or lesson with that specific instructor preselected.
- Link back to the instructor index and cross-link to relevant program pages and the Discovery Flight landing page.

What this ticket produces:

- A dynamic route `src/app/instructors/[slug]/page.tsx` configured for Next.js static export using `generateStaticParams`.
- Static HTML output for each of the 4 launch instructor slugs under `/instructors/[slug]/index.html`.
- A set of reusable instructor-detail section components.
- Extended instructor content data in `src/content/instructors.ts` with bio, specialties, credentials, availability notes, and per-instructor SEO metadata.
- Person schema markup on every instructor page, plus BreadcrumbList and FAQPage schema where applicable.
- A "Book with [Name]" CTA that passes the instructor slug to the booking flow via query parameter.

What this ticket does **not** implement:

- The booking widget itself (handled by the booking-flow ticket). This ticket only ensures the CTA URL includes `?instructor=[slug]` so the widget can preselect the CFI.
- Live availability APIs (`/api/instructors/:slug/availability`). The page links into the booking flow; real-time slots ship later.
- Real instructor photography or certificate numbers. Per the design doc, certificate numbers are intentionally omitted at launch unless the owner explicitly consents. Placeholder bios and approved placeholder/crest images are used instead.

---

## 2. Exact file paths to create or modify

### New application route

| File | Purpose |
|------|---------|
| `src/app/instructors/[slug]/page.tsx` | Dynamic instructor detail page with `generateStaticParams`, page-level schema injection, and composition of all instructor sections. |

### New section components

Create under `src/sections/instructor/` (new folder):

| File | Purpose |
|------|---------|
| `src/sections/instructor/InstructorHeroSection.tsx` | Hero block with instructor photo/placeholder, name, title/tagline, and primary "Book with [Name]" CTA. |
| `src/sections/instructor/InstructorBioSection.tsx` | Long-form bio written in Hornbill voice. |
| `src/sections/instructor/InstructorCredentialsSection.tsx` | Certificates, ratings, total hours, time instructing, certificate number field (rendered only when consent flag is true). |
| `src/sections/instructor/InstructorSpecialtiesSection.tsx` | List of specialties (e.g., primary students, instrument, commercial prep, mountain flying). |
| `src/sections/instructor/InstructorAvailabilitySection.tsx` | Schedule summary, typical availability window, and link to booking flow with this instructor preselected. |
| `src/sections/instructor/InstructorProgramsSection.tsx` | Cards or links to the programs this instructor teaches (SPL, PPL, IR, CPL, CFI, CFII, Mountain Flying). |
| `src/sections/instructor/InstructorFAQSection.tsx` | 3–4 instructor-specific FAQs with FAQPage schema. Optional; include only if useful for launch placeholders. |

### New or modified shared components

| File | Purpose |
|------|---------|
| `src/components/InstructorPortrait.tsx` | Reusable headshot wrapper with consistent aspect ratio, fallback to Hornbill crest placeholder, and descriptive alt text. |
| `src/components/BookingCTALink.tsx` *(optional, extends CTALink)* | A CTA that accepts an `instructor` prop and appends `?instructor=[slug]` to `/discovery-flight/`. |

### Content and data files to modify

| File | Purpose |
|------|---------|
| `src/content/instructors.ts` | Extend the placeholder instructor array from TICKET-001 with full detail fields: `slug`, `name`, `title`, `tagline`, `bio`, `specialties`, `credentials`, `certificateNumber`, `publishCertificate`, `photo`, `altText`, `typicalAvailability`, `teachesPrograms` (array of program slugs), `bookingSlug`, `metaTitle`, `metaDescription`, and `faq` (optional). |
| `src/lib/routes.ts` | Add a helper to build instructor detail URLs and ensure `INSTRUCTORS_INDEX` route is stable. |
| `src/lib/schema.ts` | Add a `buildPersonSchema(instructor)` helper that emits schema.org `Person` JSON-LD. Optionally add `buildInstructorBreadcrumbList`. |

### Static assets

| File | Purpose |
|------|---------|
| `public/images/instructors/[slug].webp` | Instructor photo or Hornbill crest placeholder for each launch slug. Must have explicit width/height in the component. |

### Documentation

| File | Purpose |
|------|---------|
| `thoughts/shared/plans/TICKET-014-plan.md` | This plan. |

---

## 3. Reusable components to use from TICKET-001 (shell) and other tickets

### From TICKET-001 (must be complete first)

| Component / Helper | How it is used on this page |
|--------------------|----------------------------|
| `app/layout.tsx` | Wraps every instructor page with global metadata, header, footer, and base Organization/LocalBusiness/EducationalOrganization schema. |
| `Header` / `MobileNav` | Persistent navigation, including the global "Book a discovery flight" CTA and phone link. |
| `Footer` | Site-wide NAP and links; must remain byte-for-byte consistent with schema. |
| `Container` | Max-width wrapper for every section. |
| `Section` | Consistent vertical spacing and background variants (cream, white, navy). |
| `PageHeader` | Breadcrumb trail + page H1 block at the top of the page. |
| `Button` | Visual-identity-compliant CTA buttons. |
| `CTALink` | Base "Book a discovery flight" link; extend or compose to add the `?instructor=[slug]` query. |
| `PhoneLink` | Click-to-call phone number if the page includes a "Call to schedule" option. |
| `SchemaInjector` | Renders page-specific JSON-LD `<script type="application/ld+json">` tags. |
| `src/lib/schema.ts` | Use existing Organization/LocalBusiness `@id` references; add a new `Person` builder. |
| `src/lib/seo.ts` | `buildTitle`, `buildCanonical`, `buildOpenGraph`, `buildTwitter` for per-instructor metadata. |
| `src/lib/routes.ts` | Source of truth for the instructors index URL and program page URLs. |
| `src/lib/config.ts` | Site base URL, NAP, brand defaults for schema `worksFor` linkage. |
| `src/content/programs.ts` | Map program slugs to titles and URLs for the "Programs [Name] teaches" section. |

### From TICKET-013 (instructors index page)

TICKET-013 is not strictly a hard blocker, but it should ship before or concurrently with this ticket because both consume the same `src/content/instructors.ts` contract and slug list. Recommended reuse from TICKET-013:

| Component / Pattern | How it is reused |
|---------------------|----------------|
| `src/content/instructors.ts` data contract | Do not duplicate instructor data. Extend the same array with detail fields. |
| Instructor card styling patterns | Match the index-page card colors, typography, and photo treatment for visual continuity. |
| Slug convention | Use the same 4 launch slugs (e.g., `sarah-chen`, `mike-ordonez`, `jordan-patel`, `alex-voss` — final names set by content owner). |

### From the booking widget ticket (expected later)

| Component / API | How this page connects |
|-----------------|------------------------|
| `/discovery-flight/` page + booking widget | The instructor-page CTA links to `/discovery-flight/?instructor=[slug]`. The booking widget must read `?instructor=` and preselect that CFI in the instructor selector step. |
| `/api/instructors/:slug/availability` | Not called on the static detail page at launch. Reserved for a future enhancement that may embed a small availability teaser. |

---

## 4. Page content/structure, schema markup, and SEO metadata

### 4.1 URL and routing

- Canonical URL pattern: `https://hornbillaviation.com/instructors/[slug]/`
- Trailing slash enforced by `next.config.ts` (`trailingSlash: true`).
- `generateStaticParams` must return all slugs present in `src/content/instructors.ts` where `published === true`.
- Add a `notFound()` guard for unknown slugs so invalid paths return the 404 page created in TICKET-001.

### 4.2 SEO metadata per instructor

**Title tag template:**
```
[Name] — Flight Instructor in Reno, NV | Hornbill Aviation
```
Example: `Sarah Chen — Flight Instructor in Reno, NV | Hornbill Aviation`

**Meta description template (under 155 characters):**
```
Train with [Name], a Part 61 CFI at Reno-Tahoe (RNO). Specialties: [specialty1], [specialty2]. Book a discovery flight with [Name].
```
Stored per-instructor in `src/content/instructors.ts` as `metaDescription`.

**Canonical:**
- Self-referencing: `https://hornbillaviation.com/instructors/[slug]/`

**OpenGraph / Twitter:**
- `og:title` mirrors title tag.
- `og:description` mirrors meta description.
- `og:image` uses the instructor photo if available, otherwise the site default OG image from TICKET-001.
- `og:type`: `profile` (schema.org `profile` / Open Graph `profile` where supported; fallback to `website`).
- `twitter:card`: `summary_large_image`.

### 4.3 Page content structure (in order)

1. **PageHeader section**
   - Breadcrumb: `Home > Instructors > [Name]`
   - H1: `[Name]` (e.g., "Sarah Chen")
   - Subtitle / title: "Certified Flight Instructor, Hornbill Aviation"

2. **InstructorHeroSection**
   - Portrait image (`InstructorPortrait`) on one side.
   - Name, tagline, and 2–3 line intro on the other side.
   - Primary CTA button: "Book a discovery flight with [Name]" → `/discovery-flight/?instructor=[slug]`
   - Secondary link: "Back to all instructors" → `/instructors/`

3. **InstructorBioSection**
   - H2: "About [Name]"
   - 2–4 short paragraphs written in the Hornbill voice (warm, credible, specific).
   - Mention PA28 experience and RNO/local area familiarity where true.

4. **InstructorCredentialsSection**
   - H2: "Credentials & experience"
   - Bulleted list:
     - Certificates and ratings held (e.g., CFI, CFII, Commercial, Instrument).
     - Total flight hours (if known/sharable).
     - Hours instructing (if known/sharable).
     - Certificate number: rendered only if `publishCertificate === true`. If false, omit entirely — do not show placeholder text like "Certificate number on request."
   - Optional: short FAA safety emphasis without reassurance theater.

5. **InstructorSpecialtiesSection**
   - H2: "Specialties"
   - 3–6 specialty tags/cards:
     - Primary flight training / first-time students
     - Instrument rating prep
     - Commercial pilot training
     - Mountain flying / high-density-altitude instruction
     - CFI/CFII mentorship
     - International students / anxious students (only if true)

6. **InstructorProgramsSection**
   - H2: "Programs [Name] teaches"
   - Cards or list items linking to each relevant program page from `teachesPrograms`:
     - `/programs/private-pilot/`
     - `/programs/instrument-rating/`
     - etc.
   - Each link uses descriptive anchor text, e.g., "Private Pilot training".

7. **InstructorAvailabilitySection**
   - H2: "Schedule a lesson with [Name]"
   - Typical availability window (e.g., "Weekdays 7 a.m.–12 p.m. and weekends by appointment").
   - Note that exact slots are shown in the booking flow.
   - Primary CTA: "Book with [Name]" → `/discovery-flight/?instructor=[slug]`
   - Secondary action: click-to-call `PhoneLink` for scheduling questions.

8. **InstructorFAQSection** *(optional for launch placeholders; include if it improves long-tail SEO)*
   - H2: "Questions about training with [Name]"
   - 3–4 FAQs such as:
     - "Can I request [Name] for my discovery flight?"
     - "What ratings does [Name] teach?"
     - "Does [Name] teach mountain flying at RNO?"
   - Uses `FAQAccordion` from TICKET-001 with FAQPage schema.

9. **Bottom navigation**
   - Link back to `/instructors/` with anchor text "Meet the rest of the team".
   - Link to `/discovery-flight/` with anchor text "Book a discovery flight".

### 4.4 Heading hierarchy

- One H1 only: instructor name in `PageHeader`.
- H2: each major section title.
- H3: specialty cards, program card titles, FAQ questions.
- No skipped levels.

### 4.5 Internal links (minimum 3–5 per page)

1. Back to `/instructors/` (breadcrumb + bottom link).
2. "Book a discovery flight with [Name]" → `/discovery-flight/?instructor=[slug]`.
3. At least 2 links to relevant program pages from `teachesPrograms`.
4. Link to `/fleet/` from the availability section if aircraft consistency is mentioned.

### 4.6 Schema markup

**Person schema (`buildPersonSchema`)** — inject via `SchemaInjector`:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://hornbillaviation.com/instructors/[slug]/#person",
  "name": "[Name]",
  "jobTitle": "Certified Flight Instructor",
  "worksFor": {
    "@id": "https://hornbillaviation.com/#organization"
  },
  "url": "https://hornbillaviation.com/instructors/[slug]/",
  "image": "https://hornbillaviation.com/images/instructors/[slug].webp",
  "description": "[Short bio / meta description]",
  "knowsAbout": [
    "Primary flight training",
    "Instrument rating",
    "Mountain flying",
    "PA28 instruction"
  ],
  "areaServed": {
    "@type": "City",
    "name": "Reno",
    "containedInPlace": {
      "@type": "State",
      "name": "Nevada"
    }
  }
}
```

Rules:
- `worksFor` references the Organization `@id` from the root layout (`https://hornbillaviation.com/#organization`).
- `knowsAbout` is derived from `specialties` + `teachesPrograms`.
- `image` is absolute. Use the Hornbill crest placeholder if no real photo exists.
- Only include `hasCredential` if `publishCertificate === true` and real data is present. Do not fabricate certificate numbers.

**BreadcrumbList schema** (`buildInstructorBreadcrumbList`):

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://hornbillaviation.com/" },
    { "@type": "ListItem", "position": 2, "name": "Instructors", "item": "https://hornbillaviation.com/instructors/" },
    { "@type": "ListItem", "position": 3, "name": "[Name]", "item": "https://hornbillaviation.com/instructors/[slug]/" }
  ]
}
```

**FAQPage schema** (if FAQ section is included):
- Use the same `FAQAccordion` + schema pattern as TICKET-001.
- Merge instructor FAQ data into page JSON-LD.

**Organization / LocalBusiness / EducationalOrganization:**
- Injected by root layout from TICKET-001. Do not duplicate; reference by `@id`.

---

## 5. API/widget/data requirements

### Data files consumed

| File | Fields used |
|------|-------------|
| `src/content/instructors.ts` | Full instructor detail object (see Section 2). |
| `src/content/programs.ts` | Program `slug`, `title`, `url`, `shortDescription` for cross-linking. |
| `src/lib/config.ts` | `baseUrl`, `organizationName`, NAP for schema `worksFor`. |
| `src/lib/routes.ts` | Route helpers for instructors index and program pages. |

### Booking flow integration

- The instructor detail page CTA links to `/discovery-flight/?instructor=[slug]`.
- The booking widget ticket must:
  - Read the `instructor` query parameter on `/discovery-flight/`.
  - Preselect the matching CFI in the `InstructorSelector` step.
  - Fall back gracefully if the slug is unknown or the CFI becomes unavailable.
- At launch the page does **not** call `/api/instructors/:slug/availability` directly.

### Widgets / external APIs

- No client-side external API calls on this page.
- Optional future enhancement: embed a small "next available slots" teaser that calls `/api/instructors/[slug]/availability` after hydration. This is out of scope for launch; reserve a component slot if desired.

---

## 6. Dependencies on other tickets (what must be done first)

### Hard dependencies (must ship before TICKET-014)

| Ticket | What it provides | Why it blocks this ticket |
|--------|------------------|---------------------------|
| **TICKET-001** | Site shell, layout primitives (`Container`, `Section`, `PageHeader`, `Button`, `CTALink`, `PhoneLink`, `SchemaInjector`), `src/lib/schema.ts`, `src/lib/seo.ts`, `src/lib/routes.ts`, `src/lib/config.ts`, `src/content/instructors.ts` baseline, header/footer, 404 page. | The instructor detail page cannot be built without the shared shell, schema helpers, and the instructor data file. |

### Soft dependencies (should ship before or concurrently)

| Ticket | What it provides | Coordination needed |
|--------|------------------|---------------------|
| **TICKET-013** | Instructors index page at `/instructors/` and shared `src/content/instructors.ts` contract. | Both tickets read from and extend the same instructors data file. Agree on slug names, data shape, and placeholder content before either page ships. Ideally build the index first so detail pages have a stable parent. |
| **Booking widget ticket** (TICKET number TBD) | `/discovery-flight/` page and booking widget that reads `?instructor=[slug]`. | The CTA URL is set in this ticket, but the preselect behavior is implemented by the booking widget. Coordinate query parameter naming (`instructor`) across both tickets. |

### Dependencies this ticket creates for later work

| Later work | What it consumes from TICKET-014 |
|------------|----------------------------------|
| Booking widget | The `?instructor=[slug]` query and the slug values from `src/content/instructors.ts`. |
| Live availability widget | Slugs and instructor data for `/api/instructors/:slug/availability`. |
| Blog author pages | Author slug mapping to instructor detail pages (`authors/[slug].json` → `/instructors/[slug]/`). |
| Local SEO / GBP | Individual instructor pages as citation destinations. |

---

## 7. Verification steps

### 7.1 Build and export verification

1. Run `npm run build` after TICKET-001 is merged.
2. Confirm the `dist/` folder contains the following generated pages:
   - `dist/instructors/[slug]/index.html` for each of the 4 launch slugs.
   - Static assets under `dist/images/instructors/`.
3. Verify `generateStaticParams` does not produce routes for instructors marked `published: false`.
4. Verify unknown slugs return the 404 page from TICKET-001 (test by visiting `/instructors/unknown/`).

### 7.2 Schema validation

1. Validate the generated HTML for each instructor page with:
   - Google Rich Results Test.
   - Schema.org validator (validator.schema.org) using "code snippet" mode.
2. Confirm JSON-LD contains:
   - `Person` schema with `name`, `jobTitle`, `worksFor` referencing `/#organization`, `url`, `image`, `description`, and `knowsAbout`.
   - `BreadcrumbList` with 3 items: Home, Instructors, [Name].
   - `FAQPage` schema if the FAQ section is included.
3. Verify `worksFor` and other cross-references use absolute URLs and match the `@id` values emitted by TICKET-001.
4. Verify no certificate number is present in Person schema when `publishCertificate === false`.
5. Verify `image` URLs are absolute and images exist in `public/images/instructors/`.

### 7.3 SEO metadata checks

1. Verify each instructor page has a unique title tag matching the template:
   `[Name] — Flight Instructor in Reno, NV | Hornbill Aviation`.
2. Verify meta descriptions are under 155 characters, include the instructor name, "Reno", and "book a discovery flight".
3. Verify canonical is self-referencing with trailing slash.
4. Verify OpenGraph `og:title`, `og:description`, and `og:image` are set per instructor.
5. Verify `robots.txt` allows `/instructors/` and the sitemap includes each instructor detail URL.

### 7.4 Content and copy checks

1. Read every instructor page against the brand writing style guide:
   - No aviation clichés ("soar to new heights", "passion for aviation", "unlock your potential").
   - No LLM hedges ("it's important to note", "at the end of the day").
   - No empty superlatives ("world-class", "best", "premier").
   - Active voice, student-centered "you" where appropriate.
2. Verify bios lead with the human, then the credentials (per brand identity Section 9).
3. Verify certificate numbers are omitted unless `publishCertificate === true`.
4. Verify all 4 placeholder instructor pages are internally consistent in structure.

### 7.5 Accessibility and UX checks

1. Run axe-core or Lighthouse accessibility audit on each instructor page; target WCAG 2.2 AA with no critical errors.
2. Verify the instructor portrait has descriptive `alt` text (e.g., "Sarah Chen, Certified Flight Instructor at Hornbill Aviation").
3. Verify heading hierarchy: one H1, logical H2/H3 progression, no skipped levels.
4. Verify CTA buttons are reachable by keyboard and have visible focus states.
5. Verify touch targets are ≥44 px on mobile.
6. Verify the page is usable at 320 px, 375 px, and 414 px viewports.

### 7.6 Link and navigation checks

1. Verify breadcrumb links: Home → `/`, Instructors → `/instructors/`, current page unlinked.
2. Verify "Back to all instructors" and "Meet the rest of the team" links point to `/instructors/`.
3. Verify "Book with [Name]" CTA links to `/discovery-flight/?instructor=[slug]` with the correct slug.
4. Verify each program link under "Programs [Name] teaches" points to the correct program page URL from `src/content/programs.ts`.
5. Run an internal link crawl; confirm every instructor detail page is reachable from the instructors index within 2 clicks.

### 7.7 Cross-ticket contract checks

1. Confirm `src/content/instructors.ts` exposes a stable interface that both TICKET-013 (index) and TICKET-014 (detail) consume.
2. Confirm `src/lib/schema.ts` exposes `buildPersonSchema(instructor)` and `buildInstructorBreadcrumbList(instructor)`.
3. Confirm `src/lib/seo.ts` can build per-page metadata from instructor data without editing `layout.tsx`.
4. Confirm the slug values in `src/content/instructors.ts` match the URLs generated by `generateStaticParams`.

### 7.8 Manual smoke tests

1. Serve `dist/` locally (`npx serve@latest dist`).
2. Visit each generated instructor page:
   - `/instructors/slug-1/`
   - `/instructors/slug-2/`
   - `/instructors/slug-3/`
   - `/instructors/slug-4/`
3. Click the "Book with [Name]" CTA and confirm the URL contains `?instructor=[slug]`.
4. Confirm the header CTA and phone link remain sticky/persistent on mobile.
5. Confirm footer NAP matches the schema and design doc exactly.

---

## 8. Implementation order (suggested)

1. Finalize the `src/content/instructors.ts` data contract with TICKET-013 owner; add detail fields needed for individual pages.
2. Add `buildPersonSchema` and `buildInstructorBreadcrumbList` helpers to `src/lib/schema.ts`.
3. Add route helpers for instructor detail pages to `src/lib/routes.ts` if not already present.
4. Create `InstructorPortrait` component and `BookingCTALink` wrapper.
5. Build section components under `src/sections/instructor/`.
6. Create `src/app/instructors/[slug]/page.tsx` with `generateStaticParams`, metadata, and section composition.
7. Add/optimize placeholder instructor images in `public/images/instructors/`.
8. Run build, fix errors, and execute verification steps.
9. Coordinate with booking widget ticket owner to confirm `?instructor=[slug]` preselect behavior.
10. Update ticket status and create handoff notes for dependent tickets.
