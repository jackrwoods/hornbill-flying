---
id: TICKET-010-plan
title: "Implementation plan: Mountain Flying program page"
ticket: TICKET-010
status: draft
created: 2026-06-18
---

## 1. Scope summary

Build the static Next.js program page at `/programs/mountain-flying/` for Hornbill Flight Center's single-engine mountain/density-altitude course. This is a **regional differentiator page**: it captures local-search intent for mountain flying training in Reno and the Sierra Nevada while reinforcing Hornbill's real-world, high-elevation flying experience.

The page explains:

- What the mountain flying course covers and who it is for.
- Density-altitude concepts as they apply at Reno–Tahoe (RNO, elevation ~4,415 ft).
- Terrain, ridge, and weather considerations unique to the Sierra Nevada.
- Sample routes from RNO through mountain passes and high-elevation airports.
- Prerequisites (at least a Private Pilot certificate is recommended), typical duration, and cost estimate.
- Safety emphasis: decision-making, go/no-go, escape routes, and checkout standards.
- CTAs to book a discovery flight or consultation and to explore related tools/content.

The page ships with:

- One H1 targeting the primary keyword.
- Unique title tag, meta description, canonical, and OpenGraph/Twitter tags.
- `Service` + `Course` + `FAQPage` JSON-LD schema plus a `BreadcrumbList`.
- Contextual internal links to Location, the Density Altitude calculator tool, the Density Altitude blog post, Fleet & Pricing, Membership, Discovery Flight, Contact, and related program pages.
- Reuse of the site shell and shared components introduced by TICKET-001 and refined by peer program-page tickets.

This ticket does **not** implement the booking API, the density-altitude widget, or the blog post. It only links to them.

---

## 2. Exact file paths to create or modify

All paths are relative to the repository root `/Users/jack/hornbill-flying/`.

### Files to create

| File path | Purpose |
|-----------|---------|
| `src/app/programs/mountain-flying/page.tsx` | Page composition. Imports shell, shared sections, schema helpers, FAQ/route data, and images. Renders the full Mountain Flying page. |
| `src/app/programs/mountain-flying/metadata.ts` (or inline `generateMetadata` in `page.tsx`) | Page-specific `<title>`, `meta description`, OpenGraph, Twitter card, canonical, and robots directives. |
| `src/data/programs/mountain-flying.ts` (or `src/content/programs/mountain-flying.ts` / `.json` if TICKET-001 established `src/content/`) | Structured content source: course overview, density-altitude copy, terrain/weather bullets, route examples, prerequisites, duration, cost, FAQ list, internal links, and schema fields. Keeps copy/data separate from presentation. |
| `public/images/programs/mountain-flying-hero.webp` | Hero image: real Hornbill PA28 in cruise with Sierra Nevada terrain in the background, or a real ramp photo with mountains visible. WebP/AVIF, optimized. |
| `public/images/programs/mountain-flying-ridge.webp` (optional) | Supporting image for terrain/weather section. |
| `public/images/programs/mountain-flying-route-map.svg` (optional) | Static SVG or WebP route map showing sample RNO-area mountain routes, passes, and nearby airports. |
| `src/app/programs/mountain-flying/opengraph-image.tsx` (optional) | Program-specific OG image if the project adopts per-page OG images. |

### Files to modify

| File path | Change |
|-----------|--------|
| `src/app/sitemap.ts` (or `next-sitemap.config.js` / equivalent) | Add `/programs/mountain-flying/` with `priority: 0.7` and `changeFrequency: 'monthly'`. |
| `src/components/layout/Header.tsx` (or the shared nav config) | Ensure the Programs dropdown includes a "Mountain Flying" link pointing to `/programs/mountain-flying/`. |
| `src/components/layout/Footer.tsx` (or footer links config) | Add "Mountain Flying" to the Programs quick links. |
| `src/app/page.tsx` (TICKET-002) | Link the Mountain Flying card in the Programs grid to `/programs/mountain-flying/`. |
| `src/data/site.ts` or `src/lib/config.ts` (TICKET-001) | Reuse for NAP, site URL, brand name, rates, and base schema IDs; add `/programs/mountain-flying/` to any route manifest if one exists. |
| `src/lib/schema/program.ts` (or `src/lib/schema.ts`) | Shared helper that emits `Service` + `Course` + `FAQPage` + `BreadcrumbList` JSON-LD for program pages. Create it here if it does not yet exist from another program ticket. |

### Conventions to follow

- Next.js 14+ App Router with `output: 'export'`.
- All routes end with a trailing slash (`/programs/mountain-flying/`).
- Page metadata files use the project's shared metadata helpers.
- Images live under `public/images/programs/` with explicit width/height and descriptive alt text that includes location and aircraft.

---

## 3. Reusable components to use from TICKET-001 and other tickets

### From TICKET-001 (site shell)

- `RootLayout` / `SiteShell` — wraps every public page with fonts, theme tokens, and global JSON-LD.
- `Header` — sticky header with Programs dropdown, persistent "Book a discovery flight" CTA, and phone link.
- `Footer` — NAP, quick links, legal links, and global schema NAP consistency.
- `Button` — primary/secondary/tertiary button variants using navy/gold/orange tokens.
- `PhoneLink` / `ClickToCall` — tappable phone number with `tel:` schema and analytics event.
- `Container` / `Section` / `SectionHeading` — max-width and vertical rhythm wrappers.
- `SchemaInjector` / `JsonLd` — renders `<script type="application/ld+json">` safely.
- Shared metadata utilities (`buildTitle`, `buildCanonical`, `buildOpenGraph`, etc.).
- `site` config (`src/data/site.ts` or `src/lib/config.ts`) — NAP, brand name, URLs, rates.

### From other tickets (use if available; do not duplicate)

- `ProgramHero` / `PageHero` — hero section with H1, subheadline, CTAs, and hero image (expected pattern from program-page tickets).
- `QuickAnswerBox` — 50–70 word direct answer block for AI/answer-engine optimization (TICKET-002 pattern).
- `FAQAccordion` — accessible accordion that also supplies `FAQPage` schema items.
- `RateHighlight` / `PricingSnapshot` — pulls member/non-member wet rate and links to `/fleet/`.
- `BookingCTA` / `DiscoveryFlightCTA` — bottom-of-page conversion block that routes to `/discovery-flight/`.
- `RouteCard` (optional, reusable if created here or in Cross-Country ticket) — card showing origin, destination, distance, key pass/airspace, and learning objective.

### Local-only page pieces

- Density-altitude concept block tied to RNO elevation.
- Terrain/weather checklist specific to the Sierra Nevada.
- Route examples list/map from RNO through mountain airports/passes.
- Mountain-flying safety non-negotiables checklist.
- Course detail block: prerequisites, duration, cost, checkout standard.

---

## 4. Page content/structure, schema markup, and SEO metadata

### Page structure (top to bottom)

1. **Metadata & `<head>`**
2. **JSON-LD schemas** (`Organization`/`LocalBusiness` from global context, `BreadcrumbList`, `Service`, `Course`, `FAQPage`)
3. **Sticky header** (TICKET-001)
4. **Hero section**
   - H1: **"Mountain flying training in Reno, NV."**
   - Subhead: outcome-focused sentence such as "Learn to fly the Sierra Nevada safely. Build confidence in density altitude, mountain weather, and high-terrain route planning from Reno–Tahoe (RNO)."
   - Primary CTA: **"Book a discovery flight"** → `/discovery-flight/`.
   - Secondary CTA: **"See the fleet and rates"** → `/fleet/`.
   - Hero image with descriptive alt text (e.g. `PA28 Cherokee in flight near the Sierra Nevada with Reno-Tahoe terrain below`), explicit width/height, `fetchpriority="high"`, `loading="eager"`.
5. **Quick answer box**
   - 50–70 words: "Hornbill Flight Center's Mountain Flying course teaches single-engine pilots to operate safely in the Sierra Nevada and high-desert terrain around Reno–Tahoe (RNO). You study density altitude, mountain weather, ridge crossing, and escape-route planning, then apply it on real routes from RNO with a CFI who knows the local area."
6. **What the course covers**
   - Density-altitude performance and takeoff/landing calculations.
   - Mountain weather patterns, wind, turbulence, and diurnal effects.
   - Terrain avoidance, ridge crossing, and canyon flying judgment.
   - Emergency options and escape routes.
   - High-elevation airport operations.
   - Preflight decision-making and go/no-go frameworks.
7. **Density altitude at RNO**
   - RNO field elevation ~4,415 ft; pressure altitude and temperature drive takeoff and climb performance.
   - Explain the relationship between elevation, temperature, pressure, and humidity.
   - Tie to the Hornbill density-altitude calculator: link **"Try the KRNO density-altitude calculator"** → `/tools/density-altitude-calculator/`.
   - Link to the blog post: **"Read: Density altitude at KRNO: what student pilots need to know"** → `/blog/density-altitude-at-krno/`.
8. **Terrain and weather considerations**
   - Sierra Nevada ridge orientation and common passes.
   - Leeside turbulence, mountain waves, and rotor.
   - Afternoon thunderstorms and visibility in the Sierra.
   - Snow, icing, and seasonal closures at nearby airports.
   - Class C airspace around RNO and transition routes.
   - Visual illusions and horizon cues in mountainous terrain.
9. **Sample routes from RNO**
   Present 3–4 example routes as cards or a small table, with distance, key pass/airspace, and what the route teaches:
   - **RNO → Lake Tahoe (KTVL)** — short mountain crossing, high-elevation airport, terrain awareness.
   - **RNO → Truckee–Tahoe (KTRK)** — higher elevation, weather considerations, approach options.
   - **RNO → Minden–Tahoe (KMEV)** — Carson Valley routing, ridge crossing, density-altitude landing.
   - **RNO → Mammoth Lakes (KMMH)** (optional advanced route) — higher terrain, weather windows, performance planning.
   - Include a note: "Exact routes depend on weather, currency, and instructor approval."
10. **Prerequisites, duration, and cost**
    - **Prerequisites:** Hold at least a Private Pilot certificate (strongly recommended); current medical or BasicMed as appropriate; completed a recent flight review or equivalent checkout; comfortable with basic performance calculations.
    - **Duration:** Typically 1–2 ground sessions plus 2–4 instructional flights, depending on experience and weather.
    - **Cost estimate:** Aircraft wet rate ($159/hr member / $185/hr non-member) + instructor rate + possible landing/tie-down fees at destination airports. Show a realistic range; not a guarantee.
    - Link to `/fleet/`, `/membership/`, and `/financing/`.
11. **Safety emphasis**
    - Mountain flying is a judgment course as much as a stick-and-rudder course.
    - Non-negotiables: personal minimums, escape routes, weather window, aircraft performance margins, and a no-pressure go/no-go call.
    - Every mountain flight is briefed; terrain and emergency options are identified before departure.
    - Link to `/about/` for safety philosophy or `/student-resources/` for weather briefing tools.
12. **Why Hornbill for mountain flying**
    - Home airport at RNO sits at high elevation at the foot of the Sierra Nevada.
    - Uniform PA28 fleet with 180 HP engines and performance-friendly configuration (N7824W set up for mountain performance).
    - CFIs with local route experience.
    - Real cross-country rentals let you keep flying the mountains after checkout.
    - Link to `/location/` and `/cross-country-rentals/`.
13. **Related programs and next steps**
    - Cards linking to Private Pilot, Instrument Rating, Cross-Country / Rentals, and Discovery Flight.
14. **FAQ accordion** (8–10 items)
    - Do I need a Private Pilot certificate to take the mountain flying course?
    - How long does the mountain flying course take?
    - What aircraft is used for mountain flying training?
    - What is density altitude and why does it matter at RNO?
    - What weather conditions cancel a mountain flying lesson?
    - Which routes will I fly during the course?
    - Can I rent a Hornbill aircraft for mountain cross-country flights after the course?
    - How much does mountain flying training cost?
    - Is this an FAA certificate or a checkout?
    - Where can I learn more about density altitude at KRNO?
15. **Bottom CTA block**
    - Heading: "Ready to fly the Sierra Nevada?"
    - Primary CTA button to `/discovery-flight/`: "Book a discovery flight".
    - Secondary CTA to `/contact/`: "Talk to an instructor".
    - Phone link fallback.
16. **Footer** (TICKET-001)

### SEO metadata

| Element | Value |
|---------|-------|
| Title tag | `Mountain Flying Course in Reno, NV | Sierra Nevada Training | Hornbill Flight Center` |
| Meta description | `Learn mountain flying and density altitude at RNO. Part 61 Sierra Nevada course in a PA28 fleet. Book a discovery flight or consultation today.` (under 155 characters) |
| Canonical | `https://<domain>/programs/mountain-flying/` |
| OpenGraph title | same as title tag |
| OpenGraph description | same as meta description |
| OpenGraph image | program-specific or default Hornbill OG image |
| Twitter card | `summary_large_image` |
| Robots | `index, follow` |

### Schema markup

Implement the following JSON-LD graphs. Reuse the shared `Organization`/`LocalBusiness` entity from TICKET-001 as the `provider`.

1. **BreadcrumbList**
   - `Home` → `Programs` → `Mountain Flying`
2. **Service** (schema.org)
   - `@type`: `Service`
   - `name`: `Mountain Flying Course — Sierra Nevada — Hornbill Flight Center`
   - `serviceType`: `FlightTraining`
   - `provider`: Hornbill LocalBusiness/Organization entity (referenced by `@id`)
   - `areaServed`: Reno, NV / Sierra Nevada region
   - `description`: concise service description
   - `url`: `https://<domain>/programs/mountain-flying/`
3. **Course** (schema.org)
   - `@type`: `Course`
   - `name`: `Mountain Flying and Density-Altitude Course`
   - `description`: outcome-focused course summary
   - `provider`: Hornbill EducationalOrganization/Organization
   - `coursePrerequisites`: Private Pilot certificate recommended, current flight review, appropriate medical certificate
   - `educationalCredentialAwarded`: `Mountain Flying Course Completion — Hornbill Flight Center` (this is not an FAA certificate)
   - `timeRequired`: typical duration range
   - `teaches`: `Mountain flying, density-altitude operations, high-terrain weather and decision-making`
4. **FAQPage**
   - `@type`: `FAQPage`
   - `mainEntity`: array of `Question`/`Answer` pairs drawn from the accordion.

Ensure all schema uses `@id`-based references so the provider entity is not duplicated across pages.

### Copy guidelines

- Follow `thoughts/shared/design/brand_identity_writing_style.md`:
  - Sentence-case headings.
  - Second person ("you").
  - Specific numbers and names: PA28, RNO, KRNO, KTVL, KTRK, KMEV, Part 61, $159/hr wet, $185/hr non-member, 4,415 ft.
  - No aviation clichés, empty superlatives, or LLM hedges.
  - CTAs begin with a verb.
- Reinforce messaging pillars: **Real-world experience** (lead) and **Consistency** (supporting). This page is the clearest expression of "real-world flying" at Hornbill.

---

## 5. API/widget/data requirements

### Data sources

- Static content file: `src/data/programs/mountain-flying.ts` or `src/content/programs/mountain-flying.json`.
- Shared site constants: `src/lib/seo.ts` / `src/data/site.ts` for NAP, brand info, rates, aircraft list, and base schema IDs.
- Reuse the global aircraft/fleet data for tail numbers and avionics rather than hardcoding them on the page.
- Reuse the global program route map so navigation and sitemap stay in sync.

### External APIs

- **No external API calls required for the static page itself.**
- The page links to the booking flow built in TICKET-003 (`/discovery-flight/`) and to `/contact/`.
- The density-altitude calculator at `/tools/density-altitude-calculator/` is implemented in TICKET-023; this page only links to it.

### Widgets

- Reuse the global phone-link component for click-to-call.
- Reuse the booking/contact CTA component. Do not build a new inline booking widget on this page.
- Optionally embed the density-altitude calculator inline once TICKET-023 is complete; for launch, a prominent link is sufficient.

---

## 6. Dependencies on other tickets

| Ticket / work | Dependency type | Why it blocks or matters |
|---------------|-----------------|--------------------------|
| **TICKET-001** (Site shell, shared components, global SEO setup) | Hard blocker | Site shell, layout, header/footer, navigation, global metadata/schema helpers, color/typography tokens, and robots/sitemap base must exist before this page can render correctly. |
| **TICKET-002** (Homepage) | Hard blocker for navigation reachability | Homepage Programs grid must link to `/programs/mountain-flying/` so the page is reachable within three clicks from home. |
| **TICKET-003** (Discovery Flight landing page and booking widget) | Soft dependency | Primary CTA destination `/discovery-flight/` should exist; the page can use a fallback `/contact/` link until TICKET-003 is ready. |
| **TICKET-011** (Fleet & Pricing page) | Soft dependency | `/fleet/` link and rate details should exist; copy can reference planned rates from site constants. |
| **TICKET-012** (Membership page) | Soft dependency | Cost section references the $49/month membership and `/membership/` link. |
| **TICKET-016** (Location / RNO page) | Soft dependency | Internal link to `/location/` for directions, airspace, and local context. The page works without it but benefits when the Location page is live. |
| **TICKET-022** (Blog launch content) | Soft dependency | Link to `/blog/density-altitude-at-krno/` should be verified; use a fallback to `/blog/` or omit the link until the post exists. |
| **TICKET-023** (Pilot tools / widgets) | Soft dependency | Link to `/tools/density-altitude-calculator/` should be verified; for launch, the link can point to `/student-resources/` or be hidden until the tool is live. |
| **TICKET-004** (Private Pilot program page) | Soft dependency | PPL is a recommended prerequisite; internal link to `/programs/private-pilot/` should be verified. |
| **TICKET-015** (Cross-Country / Rentals page) | Soft dependency | "Why Hornbill" section links to `/cross-country-rentals/`. |
| **TICKET-020** (Contact page) | Soft dependency | Secondary CTA to `/contact/` should exist before launch if used as a fallback. |

**Recommended sequence:** complete TICKET-001 first, then implement this page alongside or after other program pages so shared program components stabilize. Links to unfinished pages can point to `/contact/` or `/discovery-flight/` as a temporary fallback.

---

## 7. Verification steps

### Build & route checks

- [ ] `npm run build` (or `next build`) completes with static export enabled.
- [ ] Output directory contains `out/programs/mountain-flying/index.html`.
- [ ] The auto-generated `sitemap.xml` includes `/programs/mountain-flying/`.
- [ ] `robots.txt` allows indexing of the page.
- [ ] Self-referencing canonical is present and points to `https://<domain>/programs/mountain-flying/`.

### Schema validation

- [ ] Copy the page source JSON-LD into Google's Rich Results Test and confirm no errors for `Service`, `Course`, `FAQPage`, and `BreadcrumbList`.
- [ ] Verify the `provider` entity references the same `@id` used by the global Organization/LocalBusiness schema.
- [ ] Confirm `FAQPage` has a `mainEntity` array with `acceptedAnswer.text` values.
- [ ] Validate with [schema.org validator](https://validator.schema.org/) and resolve any warnings for required fields.

### SEO & metadata checks

- [ ] Title tag matches `Mountain Flying Course in Reno, NV | Sierra Nevada Training | Hornbill Flight Center`.
- [ ] Meta description is under 155 characters and includes "mountain flying", "Reno", "RNO", "density altitude", "PA28", and "Part 61".
- [ ] OpenGraph and Twitter card tags are present and unique to this page.
- [ ] Canonical URL is `https://<domain>/programs/mountain-flying/`.
- [ ] Exactly one H1 on the page: "Mountain flying training in Reno, NV."

### Content & copy checks

- [ ] Heading hierarchy is logical (H1 → H2 → H3) with no skipped levels.
- [ ] Copy passes brand review: no clichés, superlatives, LLM hedges; sentence case; second person; specific numbers.
- [ ] All CTAs begin with a verb and link to valid routes.
- [ ] Density-altitude copy is accurate for RNO field elevation and emphasizes safety, not thrill-seeking.
- [ ] Route examples include realistic airports, passes, and a weather/instructor-approval disclaimer.

### Internal link & navigation checks

- [ ] Header Programs dropdown links to `/programs/mountain-flying/`.
- [ ] Footer Programs quick links include Mountain Flying.
- [ ] Homepage Programs grid links to `/programs/mountain-flying/`.
- [ ] Page contains contextual internal links to `/tools/density-altitude-calculator/`, `/blog/density-altitude-at-krno/`, `/location/`, `/fleet/`, `/membership/`, `/financing/`, `/cross-country-rentals/`, `/programs/private-pilot/`, `/discovery-flight/`, and `/contact/`.
- [ ] No broken internal links (run a link crawler or `next export` + `htmltest`).

### Performance checks

- [ ] Hero image is WebP/AVIF, has explicit `width`/`height`, `fetchpriority="high"`, and `loading="eager"`.
- [ ] SVG route map (if used) is optimized and does not block rendering.
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
