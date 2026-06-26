---
id: TICKET-017-plan
title: "Implementation plan: About page"
ticket: TICKET-017
status: draft
created: 2026-06-18
---

## 1. Scope summary

TICKET-017 builds the public `/about/` page for Hornbill Aviation. The page answers the trust and fit questions prospective students have before they book: who runs the school, why it exists, why Part 61 matters, how safety is handled, why the fleet is intentionally uniform, and what the team culture feels like.

What this ticket produces:

- A new Next.js app-router page at `src/app/about/page.tsx` rendered as `/about/` in the static export.
- Section components under `src/sections/about/` that tell the founder story, explain the Part 61 philosophy, present the safety culture, describe the fleet/consistency rationale, and summarize the team culture.
- On-brand copy stored in `src/content/about.ts` so text can be reviewed and reused for snippets, ads, or future updates without touching markup.
- Strong conversion path: primary CTA to `/discovery-flight/`, secondary CTA to `/contact/`, plus contextual internal links to `/instructors/`, `/fleet/`, `/location/`, and `/blog/`.
- SEO metadata and JSON-LD schema: `Organization` schema on the page (the design doc specifies Organization schema for homepage + about), a self-referencing canonical, OpenGraph/Twitter metadata, and a `BreadcrumbList`.
- No booking widgets, no dynamic API calls, no blog pipeline changes. This is a static, content-driven page.

---

## 2. Exact file paths to create or modify

### New application page

| File | Purpose |
|------|---------|
| `src/app/about/page.tsx` | The `/about/` route page. Composes sections, sets page metadata, injects page-specific JSON-LD, and passes copy from `src/content/about.ts`. |

### New section components

| File | Purpose |
|------|---------|
| `src/sections/about/FounderStorySection.tsx` | Origin story: why the school was started, the meaning of the hornbill name, and the student-first idea. Uses real/placeholder founder photo. |
| `src/sections/about/Part61PhilosophySection.tsx` | Explains Part 61 flexibility in plain language: train at your pace, choose or bring your own instructor, adapt scheduling to real life. |
| `src/sections/about/SafetyCultureSection.tsx` | Safety practices: maintenance before each flight, recurring inspections, go/no-go culture, weather discipline, density-altitude awareness at RNO. |
| `src/sections/about/FleetConsistencySection.tsx` | Why a uniform PA28 fleet matters for predictable handling, cost, and learning. Links to `/fleet/`. |
| `src/sections/about/TeamCultureSection.tsx` | Brief note on the instructor team and culture. Links to `/instructors/` and `/blog/`. |
| `src/sections/about/AboutCTASection.tsx` | Closing section with primary "Book a discovery flight" CTA and secondary "Contact us" CTA. |

### New content data file

| File | Purpose |
|------|---------|
| `src/content/about.ts` | Typed content object with page metadata defaults, section copy, and internal link labels. Keeps copy out of JSX. |

### Static assets to add or reference

| File | Purpose |
|------|---------|
| `public/images/about/founder.jpg` | Founder photo (real when available; otherwise an approved ramp/aircraft shot with a placeholder caption). Must have explicit width/height and descriptive alt text. |
| `public/images/about/pa28-fleet.jpg` | Fleet consistency photo: a Hornbill PA28 on the RNO ramp or in preflight. |
| `public/images/about/team.jpg` | Team/instructor culture photo (real when available; otherwise ramp/operations shot). |
| `public/opengraph-about.jpg` | Optional dedicated 1200×630 OpenGraph image for the About page. If not created, fall back to the default OG image from TICKET-001. |

### Shared files to modify (introduced by TICKET-001)

| File | Purpose |
|------|---------|
| `src/lib/routes.ts` | Register the `/about/` route and ensure `/discovery-flight/`, `/contact/`, `/instructors/`, `/fleet/`, `/location/`, and `/blog/` routes exist for link helpers. |
| `src/lib/schema.ts` | Ensure `buildOrganization`, `buildBreadcrumbList`, and `buildWebPage` helpers are available. Add a `buildAboutPage` helper if it helps merge Organization + BreadcrumbList cleanly. |

---

## 3. Reusable components to use from TICKET-001 (shell) and other tickets

### From TICKET-001 (required)

Use these shared shell and primitive components; do not recreate them:

- `app/layout.tsx` — already wraps every page with fonts, base metadata, header, footer, and base JSON-LD.
- `Header` / `MobileNav` — navigation is controlled by `src/lib/routes.ts`; no custom nav logic on this page.
- `Footer` — provides canonical NAP and internal link group.
- `Container` — max-width wrapper with responsive padding.
- `Section` — section wrapper with consistent vertical rhythm and background variants (`cream-50`, `white`, `navy-900`).
- `PageHeader` — breadcrumb + H1 + optional subtitle pattern for inner pages.
- `Button` — primary/secondary/tertiary/accent variants from the visual identity.
- `CTALink` — the persistent "Book a discovery flight" conversion link; use for the primary CTA.
- `PhoneLink` — for any click-to-call link (e.g., "Call us" secondary action).
- `SchemaInjector` — renders `<script type="application/ld+json">` tags from `src/lib/schema.ts`.
- `NavLink` — accessible internal link with active state (use for inline contextual links if appropriate).

### From dependent tickets (use if already available, otherwise stub gracefully)

- `DiscoveryFlightTeaser` from TICKET-002/TICKET-003 — can be reused for the closing CTA if the component API matches; otherwise use `CTALink`/`Button` directly.
- Instructor or fleet summary components from TICKET-011 and TICKET-013 — if a small reusable `InstructorCard` or `AircraftSummaryCard` exists, use it in the team or fleet sections; otherwise keep those sections as bespoke copy blocks.

### Component usage rules

1. Keep the header, footer, and navigation logic in TICKET-001 only.
2. Add the `/about/` route to `src/lib/routes.ts`; never hard-code URLs in copy or CTAs.
3. Use `Section` backgrounds to create visual rhythm: light hero intro, white content blocks, navy safety section if needed for emphasis.
4. All CTAs must be concrete actions ("Book a discovery flight", "See the fleet", "Meet the instructors").

---

## 4. Page content/structure, schema markup, and SEO metadata

### 4.1 URL and metadata

**URL:** `/about/`

**Title tag:**
```
About Hornbill Aviation | Part 61 Flight School in Reno, NV
```

**Meta description:**
```
Hornbill Aviation is a Part 61 flight school at Reno-Tahoe (RNO). Learn our founder story, safety culture, and why we train in a consistent PA28 fleet.
```
Keep under 155 characters.

**Canonical:** self-referencing `https://hornbillaviation.com/about/`.

**OpenGraph:**
- `og:type`: `website`
- `og:title`: mirrors title tag
- `og:description`: mirrors meta description
- `og:image`: `/opengraph-about.jpg` if created, otherwise `/opengraph-default.jpg`
- `og:url`: `https://hornbillaviation.com/about/`

**Twitter card:** `summary_large_image`, title/description/image mirroring OG.

### 4.2 Heading hierarchy

- **H1 (one only):** "Built around how you learn best."  
  Alternative if A/B copy review prefers: "A Part 61 flight school built around your schedule."  
  The H1 must capture the About page lead pillar (real-world experience) plus supporting pillars (flexibility, value).
- **H2:** each section title (Founder story, Why Part 61, Safety culture, One fleet, The team).
- **H3:** sub-section or pull-quote headings inside sections.
- **H4:** small labels/captions (e.g., "Part 61", "Reno-Tahoe (RNO)").

### 4.3 Content structure (in order)

1. **PageHeader / Hero intro**
   - Breadcrumb: `Home > About`
   - H1: see heading hierarchy above.
   - Subtitle: one sentence summarizing the page purpose.  
     Example: "We started Hornbill because flight training should fit your life, not the other way around."
   - Optional: a small fleet or founder hero image with descriptive alt text and explicit dimensions.

2. **FounderStorySection**
   - Narrative: the origin of the school, the meaning behind the hornbill name, and the student-first belief.
   - Keep it specific and human; avoid generic mission statements.
   - Use a real founder photo when available.

3. **Part61PhilosophySection**
   - Explain Part 61 in student terms: flexible pace, choose or bring your own CFI, schedule around work/family.
   - Contrast with rigid, one-size-fits-all programs without disparaging competitors.
   - Link to `/programs/private-pilot/` and `/instructors/` for further reading.

4. **SafetyCultureSection**
   - Concrete practices: every aircraft inspected before each flight, recurring maintenance schedule, weather go/no-go culture, density-altitude awareness at RNO.
   - Tone: calm and factual. No reassurance theater.
   - Link to `/location/` for the density-altitude / Class C context.

5. **FleetConsistencySection**
   - Why a uniform PA28 fleet matters: predictable handling, predictable costs, easier progression from first lesson to cross-country.
   - Mention the wet rate and membership value ($159/hr member, $185/hr non-member).
   - CTA: "See the fleet and rates" → `/fleet/`.

6. **TeamCultureSection**
   - Brief note on the instructor team, instructor choice, and the culture of learning by doing.
   - CTA: "Meet the instructors" → `/instructors/`.
   - Link to `/blog/` for ongoing stories and student perspectives.

7. **AboutCTASection**
   - Primary CTA: "Book a discovery flight" → `/discovery-flight/`.
   - Secondary CTA: "Contact us" → `/contact/` (or click-to-call phone link).
   - Closing line lowering friction: "No commitment. Just questions or a first flight."

### 4.4 Internal links required by the ticket

The design doc explicitly requires internal links from `/about/` to:

- `/instructors/`
- `/fleet/`
- `/location/`
- `/blog/`

Also include contextual links to `/discovery-flight/` and `/contact/` for conversion.

### 4.5 Schema markup

Inject the following JSON-LD via `SchemaInjector` in `src/app/about/page.tsx`:

1. **Organization** (design doc priority: homepage + about)
   - `@id`: `<baseUrl>/#organization` (same `@id` used in root layout so search engines merge the entity).
   - `name`: `Hornbill Aviation`
   - `url`: `<baseUrl>/`
   - `logo`: `<baseUrl>/logo.jpeg`
   - `sameAs`: active social profile URLs and Google Business Profile URL.
   - `description`: short brand description drawn from `src/content/about.ts`.
   - Optionally include `knowsAbout`: `Flight Training`, `Part 61 Pilot Training`, `PA28 Aircraft`.

2. **WebPage**
   - `@id`: `<baseUrl>/about/#webpage`
   - `url`: `<baseUrl>/about/`
   - `name`: page title
   - `description`: meta description
   - `isPartOf`: references `/#website`
   - `about`: references `/#organization`
   - `breadcrumb`: references the BreadcrumbList `@id`

3. **BreadcrumbList**
   - `@id`: `<baseUrl>/about/#breadcrumb`
   - Two items: Home (`/`) and About (`/about/`).

Do **not** inject `LocalBusiness` or `EducationalOrganization` on this page unless the root layout already injects them globally. The design doc only requires `Organization` on the About page; the global layout from TICKET-001 handles the rest.

---

## 5. API/widget/data requirements

- **No external APIs.** The About page is fully static.
- **No booking widgets.** Conversion links route to `/discovery-flight/` and `/contact/`.
- **No pilot widgets.** Keep METAR/TAF, density-altitude calculator, and other tools on their own pages or in the student resources area.
- **Data sources:**
  - `src/content/about.ts` — page copy, link labels, and metadata overrides.
  - `src/lib/config.ts` — site base URL, NAP, and brand defaults.
  - `src/lib/routes.ts` — route map for all internal links.
  - `src/lib/schema.ts` — JSON-LD builder functions.

---

## 6. Dependencies on other tickets

### Must be completed first

- **TICKET-001 — Site shell, shared components, and global SEO setup**  
  The About page cannot be built until the layout shell, route map, metadata helpers, schema helpers, color/typography tokens, and shared primitive components exist.

### Should be completed before or concurrently with this ticket

The About page links to these pages, so their routes and content should be available before launch to avoid dead links or placeholder 404s:

- **TICKET-003 — Discovery Flight page** (CTA target `/discovery-flight/`)
- **TICKET-011 — Fleet & Pricing page** (internal link `/fleet/`)
- **TICKET-013 — Instructors index page** (internal link `/instructors/`)
- **TICKET-016 — Location / RNO page** (internal link `/location/`)
- **TICKET-020 — Contact page** (secondary CTA target `/contact/`)
- **TICKET-021/TICKET-022 — Blog infrastructure and launch content** (internal link `/blog/`)

If these tickets are not yet complete when About is implemented, register their routes in `src/lib/routes.ts` from TICKET-001 and render the sections with stub links that will become valid once the dependent pages land. Do **not** ship `/about/` to production with broken internal links.

### No direct dependency on

- Booking API backend.
- Stripe or payment widgets.
- Pilot widgets (METAR, density altitude, fuel estimator, etc.).
- Blog MDX pipeline details (only the `/blog/` URL needs to exist).

---

## 7. Verification steps

### Build and routing

- [ ] `npm run build` completes without errors and produces a static export at `dist/about/index.html`.
- [ ] `npm run dev` renders `/about/` correctly in the browser.
- [ ] The page is reachable from the site header "About" link and from the footer quick-links block.

### Content and brand

- [ ] Copy is reviewed against `thoughts/shared/design/brand_identity_writing_style.md`: no clichés, no empty superlatives, no LLM hedges, concrete numbers and names used where possible.
- [ ] The student is the subject of most sentences ("you" not "we").
- [ ] H1 is unique and one per page; heading hierarchy is logical and does not skip levels.
- [ ] All CTAs use concrete verbs ("Book", "See", "Meet", "Contact").

### Links and navigation

- [ ] Internal links to `/instructors/`, `/fleet/`, `/location/`, `/blog/`, `/discovery-flight/`, and `/contact/` resolve.
- [ ] No hard-coded URLs in JSX; all links are sourced from `src/lib/routes.ts`.
- [ ] Click-to-call phone link uses the canonical number `+1-555-555-1234`.

### SEO metadata

- [ ] Title tag matches the planned title and does not exceed 60 characters.
- [ ] Meta description is under 155 characters and includes "Part 61", "Reno", and "PA28".
- [ ] Canonical URL is self-referencing and uses a trailing slash.
- [ ] OpenGraph and Twitter card tags are present and use absolute URLs.
- [ ] The page has a unique OG image or correctly falls back to the default.

### Schema markup

- [ ] `Organization` JSON-LD is present and valid JSON.
- [ ] `Organization` `@id` matches the root layout entity (`<baseUrl>/#organization`).
- [ ] `BreadcrumbList` JSON-LD is present with two items: Home and About.
- [ ] `WebPage` JSON-LD is present and references the BreadcrumbList and Organization.
- [ ] Validate the page with Google's Rich Results Test and the Schema.org validator; fix any warnings/errors.

### Performance and accessibility

- [ ] Hero/section images have explicit `width` and `height` and use `loading="lazy"` except for any above-the-fold hero image (which may use `fetchpriority="high"` and `loading="eager"`).
- [ ] All images have descriptive `alt` text that includes location/aircraft context where appropriate.
- [ ] Page passes a WCAG 2.2 AA automated audit (contrast, keyboard focus, heading order, link labels).
- [ ] Lighthouse/PageSpeed Insights scores target: LCP ≤2.0s, CLS ≤0.1, no mobile usability errors.

### NAP and local SEO

- [ ] Address, phone, and email references are byte-for-byte consistent with `src/lib/config.ts`, the footer, the contact page, and the design doc NAP:  
  `1008 Gentry Way, Reno, NV 89512; office@hornbillaviation.com; 555-555-1234`.

### Copy review checklist (from brand doc)

- [ ] Does the About copy sound like something a real instructor would say to a prospective student?
- [ ] Are claims specific (names, numbers, places, aircraft types)?
- [ ] Does it answer the obvious worries a reader would have (cost predictability, safety, flexibility, why Part 61)?
- [ ] Is the tone appropriate for an About page (warm, credible, specific)?

---

## Related documents

- `thoughts/shared/tickets/TICKET-017.md`
- `thoughts/shared/design/website_layout_design.md`
- `thoughts/shared/design/brand_identity_writing_style.md`
- `thoughts/shared/design/visual_identity.md`
- `thoughts/shared/plans/TICKET-001-plan.md`
