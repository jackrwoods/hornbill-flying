---
id: TICKET-023-plan
title: "Implementation plan: Pilot tools / widgets"
ticket: TICKET-023
status: draft
related_tickets:
  - TICKET-001
  - TICKET-003
  - TICKET-004
  - TICKET-005
  - TICKET-006
  - TICKET-007
  - TICKET-008
  - TICKET-009
  - TICKET-010
  - TICKET-011
  - TICKET-012
  - TICKET-013
  - TICKET-014
related_design:
  - thoughts/shared/design/website_layout_design.md
  - thoughts/shared/design/brand_identity_writing_style.md
  - thoughts/shared/design/visual_identity.md
---

# TICKET-023 — Pilot Tools / Widgets Implementation Plan

## 1. Scope summary

TICKET-023 builds six pilot-focused tools for the Hornbill Aviation static Next.js site. Each tool ships as an isolated, client-side React component with its own landing page under `/tools/<slug>/`. The tools drive repeat traffic, earn backlinks, and reinforce topical authority around RNO, PA28 training, and Part 61 instruction.

What this ticket produces:

- A `/tools/` hub page linking all six widgets (optional but strongly recommended for navigation and SEO).
- Six dedicated tool pages:
  1. **KRNO METAR / TAF display** — current observation and forecast for Reno–Tahoe.
  2. **Density altitude calculator** — with RNO elevation pre-filled.
  3. **Cross-country fuel / time estimator** — PA28 defaults and sample routes.
  4. **RNO sunrise / sunset display** — including civil twilight and legal evening flight time.
  5. **Practice area / local route map** — static SVG with nearby airports and airspace notes.
  6. **Flight training cost estimator** — sliders for certificate, schedule, membership, and instructor rate.
- Shared widget layout primitives, calculation helpers, and a `src/content/tools.ts` data file.
- FAQPage schema + BreadcrumbList schema on every tool page.
- Links from each tool to the relevant program page, blog post, `/fleet/`, `/membership/`, `/student-resources/`, and `/discovery-flight/`.

This ticket does **not** implement: the booking API backend, program detail pages, fleet/pricing pages, instructor pages, or blog content. It consumes those through shared data files and stable shell components built by earlier tickets.

---

## 2. Project conventions (set by TICKET-001)

The site is a Next.js 15+ App Router project configured for **static export** (`output: 'export'`, `distDir: 'dist'`, trailing-slash URLs). The assumed root is `/Users/jack/hornbill-flying/` and the source tree follows the conventions established in `thoughts/shared/plans/TICKET-001-plan.md`.

Tool pages live in `src/app/tools/`. Widget UI lives in `src/components/tools/`. Shared calculation logic lives in `src/lib/`. Tool metadata and per-page FAQ content live in `src/content/tools.ts`.

---

## 3. Exact file paths to create or modify

### Create — tool routes

| File | Purpose |
|------|---------|
| `src/app/tools/page.tsx` | `/tools/` hub page: card grid linking to each widget. |
| `src/app/tools/metar/page.tsx` | `/tools/metar/` — KRNO METAR/TAF display. |
| `src/app/tools/density-altitude/page.tsx` | `/tools/density-altitude/` — density altitude calculator. |
| `src/app/tools/cross-country-estimator/page.tsx` | `/tools/cross-country-estimator/` — fuel/time estimator. |
| `src/app/tools/sunrise-sunset/page.tsx` | `/tools/sunrise-sunset/` — RNO sunrise/sunset times. |
| `src/app/tools/practice-area-map/page.tsx` | `/tools/practice-area-map/` — static SVG route map. |
| `src/app/tools/cost-estimator/page.tsx` | `/tools/cost-estimator/` — flight training cost estimator. |

### Create — shared widget components

| File | Purpose |
|------|---------|
| `src/components/tools/ToolLayout.tsx` | Shared wrapper: `PageHeader`, `Container`, `Section`, optional sidebar, disclaimer, and related-links block. |
| `src/components/tools/ToolCard.tsx` | Compact card used on the `/tools/` hub. |
| `src/components/tools/ToolInput.tsx` | Reusable labeled input / select / slider with error state. |
| `src/components/tools/ToolResult.tsx` | Styled result panel for calculator outputs. |
| `src/components/tools/Disclaimer.tsx` | Standard disclaimer text: not a substitute for official weather, FAA planning, or financial advice. |
| `src/components/tools/MetarTool.tsx` | Client component: fetch, decode, and display METAR. |
| `src/components/tools/TafTool.tsx` | Client component: fetch, decode, and display TAF. |
| `src/components/tools/DensityAltitudeTool.tsx` | Client component: density altitude calculator. |
| `src/components/tools/CrossCountryEstimatorTool.tsx` | Client component: fuel/time estimator. |
| `src/components/tools/SunriseSunsetTool.tsx` | Client component: sunrise/sunset display. |
| `src/components/tools/PracticeAreaMapSvg.tsx` | Static, accessible SVG map component. |
| `src/components/tools/CostEstimatorTool.tsx` | Client component: cost estimator. |

### Create — calculation / data helpers

| File | Purpose |
|------|---------|
| `src/lib/tools.ts` | Shared TypeScript types for widget inputs, results, and FAQ items. |
| `src/lib/weather.ts` | NOAA METAR/TAF fetch helpers, cache logic, and simple plain-language decoding. |
| `src/lib/density.ts` | Pressure altitude and density altitude formulas. |
| `src/lib/flightPlanning.ts` | Great-circle distance, fuel/time estimation, VFR reserve, airport coordinate table. |
| `src/lib/solar.ts` | Thin wrapper around `suncalc` for RNO lat/lon. |
| `src/lib/cost.ts` | Cost estimator logic using rates, program hours, and membership. |
| `src/content/tools.ts` | Tool metadata array (slug, title, description, path), per-tool FAQ data, and widget default constants. |

### Create — static assets

| File | Purpose |
|------|---------|
| `public/images/tools/practice-area-map.svg` | Static practice-area / local route map. |
| `public/images/tools/tools-og.jpg` | Optional dedicated OpenGraph image for tool pages; can reuse the default from TICKET-001. |

### Modify — existing project files

| File | Change |
|------|--------|
| `package.json` | Add `suncalc` as a runtime dependency. |
| `src/lib/routes.ts` (TICKET-001) | Add `/tools/`, `/tools/metar/`, `/tools/density-altitude/`, `/tools/cross-country-estimator/`, `/tools/sunrise-sunset/`, `/tools/practice-area-map/`, `/tools/cost-estimator/`. Mark as `published: true`. |
| `src/components/layout/Footer.tsx` (TICKET-001) | Add a "Pilot tools" or "Student resources" quick link pointing to `/tools/` or `/student-resources/`. |
| `src/app/student-resources/page.tsx` (TICKET-012) | Add a "Pilot tools" section linking each widget. If TICKET-012 is not yet ready, note the link destination and add it during that ticket. |

---

## 4. Reusable components to use from TICKET-001 (and other tickets)

### From TICKET-001 (shell)

| Component / helper | Path | Usage |
|--------------------|------|-------|
| `RootLayout` | `src/app/layout.tsx` | Wraps every tool page. |
| `Header` / `MobileStickyBar` / `Footer` | `src/components/layout/*` | Consistent navigation, CTA, and footer on all tool pages. |
| `Container` | `src/components/ui/Container.tsx` | Max-width wrapper. |
| `Section` | `src/components/ui/Section.tsx` | Vertical rhythm. |
| `PageHeader` | `src/components/ui/PageHeader.tsx` | Breadcrumb + H1 + subtitle for tool pages. |
| `Button` | `src/components/ui/Button.tsx` | CTA and form actions. |
| `CTALink` | `src/components/CTALink.tsx` | "Book a discovery flight" links. |
| `PhoneLink` | `src/components/PhoneLink.tsx` | Click-to-call. |
| `JsonLd` / `SchemaInjector` | `src/components/seo/*` | Render JSON-LD scripts. |
| `BreadcrumbSchema` | `src/components/seo/BreadcrumbSchema.tsx` | BreadcrumbList on every tool page. |
| `FAQPageSchema` | `src/components/seo/FAQPageSchema.tsx` | FAQPage schema from `src/content/tools.ts`. |
| `FAQAccordion` | `src/components/FAQAccordion.tsx` | Accessible disclosure UI reusing the same FAQ data. |
| `metadata` helpers | `src/lib/seo.ts` | Title, description, OpenGraph, canonical builders. |
| `site` config | `src/lib/config.ts` / `src/content/site.ts` | NAP, base URL, brand defaults. |

### From other tickets (consume via shared data files)

| Source | Asset | Tool usage |
|--------|-------|------------|
| TICKET-004 (fleet/pricing) | `src/content/pricing.ts` or equivalent | Cost estimator aircraft rates; fuel estimator default fuel burn / cruise speed. |
| TICKET-005–TICKET-011 (programs) | `src/content/programs.ts` | Cost estimator target certificates, hour ranges, and links to program pages. |
| TICKET-013 (instructors) | `src/content/instructors.ts` | Cost estimator instructor rate option and instructor links. |
| TICKET-014 (blog) | Blog post slugs | Tool pages link to `/blog/density-altitude-at-krno/` and other relevant posts. |
| TICKET-003 (discovery flight) | `/discovery-flight/` route | Every tool page ends with a "Book a discovery flight" CTA. |

**Strategy:** If the owning tickets are not complete, stub the required data constants directly in `src/content/tools.ts` or `src/lib/cost.ts` with explicit `// TODO` comments and replace them once the canonical data files land.

---

## 5. Page content/structure, schema markup, and SEO metadata

All tool pages use the same layout contract:

- One and only one H1.
- Title format: `{Primary keyword} | Hornbill Aviation`.
- Meta description ≤ 155 characters, includes "RNO" or "Reno" and the tool's primary keyword.
- Self-referencing canonical with trailing slash.
- `BreadcrumbList`: `Home` → `Tools` → `{Tool name}`.
- `FAQPage` schema rendered from the same FAQ array used by the accordion.
- CTA block at the bottom: "Ready to fly?" with "Book a discovery flight" and click-to-call phone.

### 5.1 `/tools/` — Pilot tools hub

**Title:** `Pilot Tools for Reno–Tahoe (RNO) | Hornbill Aviation`  
**Meta description:** `Free pilot tools for RNO: METAR/TAF, density altitude, cross-country fuel estimator, sunrise/sunset, practice area map, and flight training cost calculator.`  
**H1:** `Pilot tools for RNO`  

**Sections:**
1. Intro paragraph (50–70 words) explaining the tools are for student pilots and renters at RNO.
2. Six `ToolCard` links in a 2- or 3-column grid, each with title, one-line description, and link.
3. CTA: "Start with a discovery flight."

**Schema:** `BreadcrumbList` only (no FAQ unless FAQ added to the hub).

### 5.2 `/tools/metar/` — KRNO METAR & TAF

**Title:** `KRNO METAR & TAF | Hornbill Aviation`  
**Meta description:** `Current METAR and forecast TAF for Reno–Tahoe (KRNO). Decoded in plain language for student pilots and renters.`  
**H1:** `Reno–Tahoe (KRNO) METAR and TAF`  

**Sections:**
1. Quick answer box (50–70 words): what the current observation shows and where the data comes from.
2. `MetarTool` card:
   - Raw METAR string.
   - Decoded fields: wind, visibility, ceiling/ clouds, temperature/dewpoint, altimeter.
   - Timestamp and "Refresh" button.
3. `TafTool` card:
   - Raw TAF string.
   - Plain-language forecast periods.
4. Official source link: `https://aviationweather.gov/` with text "Full briefing on Aviation Weather Center".
5. `Disclaimer`: this is not a legal preflight briefing.
6. FAQ accordion (3–4 items):
   - What is a METAR?
   - What is a TAF?
   - How often is this data updated?
   - Can I use this for my pre-flight briefing?

**Schema:** `BreadcrumbList`, `FAQPage`.

### 5.3 `/tools/density-altitude/` — Density altitude calculator

**Title:** `Density Altitude Calculator for KRNO | Hornbill Aviation`  
**Meta description:** `Calculate pressure altitude and density altitude for Reno–Tahoe. RNO elevation pre-filled at 4,403 ft. Built for PA28 pilots.`  
**H1:** `Density altitude calculator`  

**Sections:**
1. Quick answer box explaining density altitude in one sentence.
2. `DensityAltitudeTool` inputs:
   - Elevation (default `4403` ft — RNO field elevation).
   - Altimeter setting (default `29.92` inHg).
   - Temperature (°F or °C toggle).
3. Outputs:
   - Pressure altitude.
   - Density altitude.
   - ISA deviation.
   - Caution flag if density altitude exceeds a safe threshold for training (e.g., > 6,500 ft).
4. Link to `/programs/mountain-flying/` and blog post `/blog/density-altitude-at-krno/`.
5. FAQ:
   - Why does density altitude matter at RNO?
   - What is pressure altitude?
   - How accurate is this estimate?

**Schema:** `BreadcrumbList`, `FAQPage`.

### 5.4 `/tools/cross-country-estimator/` — Fuel / time estimator

**Title:** `Cross-Country Fuel & Time Estimator | Hornbill Aviation`  
**Meta description:** `Estimate flight time and fuel for PA28 trips from RNO. Pre-loaded routes to Tahoe, Monterey, and Bend.`  
**H1:** `Cross-country fuel and time estimator`  

**Sections:**
1. Quick answer box: "Enter origin, destination, and cruise settings to get straight-line time and fuel."
2. `CrossCountryEstimatorTool` inputs:
   - Origin (default `RNO`).
   - Destination (free text + sample-route quick-fill).
   - Cruise speed (default `115` kt).
   - Fuel burn (default `9` gph).
   - Wind component (optional, +/- knots).
3. Outputs:
   - Straight-line distance (nm).
   - Estimated flight time (h + min).
   - Fuel required + VFR reserve.
4. Sample routes table:
   - RNO → Tahoe (KTVL)
   - RNO → Monterey (KMRY)
   - RNO → Bend (KBDN)
5. Links to `/fleet/`, `/cross-country-rentals/`, and `/programs/private-pilot/`.
6. FAQ:
   - Does this include wind and routing?
   - How is the fuel reserve calculated?
   - Can I rent a PA28 for these trips?

**Schema:** `BreadcrumbList`, `FAQPage`.

### 5.5 `/tools/sunrise-sunset/` — RNO sunrise / sunset

**Title:** `RNO Sunrise & Sunset Times | Hornbill Aviation`  
**Meta description:** `Today's sunrise, sunset, and civil twilight times for Reno–Tahoe (RNO). Plan your last legal evening flight.`  
**H1:** `Sunrise and sunset at RNO`  

**Sections:**
1. Quick answer box with today's sunrise and sunset in one sentence.
2. `SunriseSunsetTool` date selector (default today).
3. Outputs:
   - Sunrise.
   - Sunset.
   - Morning civil twilight start.
   - Evening civil twilight end (last legal evening flight time for VFR landings without night currency).
   - Earliest reasonable morning training slot.
4. Link to `/book/` or `/discovery-flight/`.
5. FAQ:
   - What is civil twilight?
   - When is the last legal evening flight?
   - Are these times exact for the ramp at RNO?

**Schema:** `BreadcrumbList`, `FAQPage`.

### 5.6 `/tools/practice-area-map/` — Training area map

**Title:** `Reno Training Area & Local Route Map | Hornbill Aviation`  
**Meta description:** `Common practice areas and nearby airports around RNO for student pilots. Static map with airspace and altitude notes.`  
**H1:** `Practice area and local route map`  

**Sections:**
1. Quick answer box describing the map.
2. `PracticeAreaMapSvg` with labels:
   - RNO
   - Common practice area
   - Nearby airports: KRTS, KMLC, KLOL, KSPZ
   - Sierra ridge
   - Class C boundary
   - Recommended altitude / airspace notes
3. Legend and text notes (e.g., "Confirm with current sectional chart before flight").
4. Link to `/location/`, `/programs/mountain-flying/`, and `/student-resources/`.
5. FAQ:
   - Where is the practice area relative to RNO?
   - What airports are nearby for touch-and-go practice?
   - Is this map current for airspace?

**Schema:** `BreadcrumbList`, `FAQPage`.

### 5.7 `/tools/cost-estimator/` — Flight training cost estimator

**Title:** `Flight Training Cost Estimator | Hornbill Aviation`  
**Meta description:** `Estimate total cost and timeline for Sport, Private, Instrument, Commercial, CFI, or CFII training at Hornbill.`  
**H1:** `Flight training cost estimator`  

**Sections:**
1. Quick answer box: "Choose your certificate and schedule to see a rough cost range and completion timeline."
2. `CostEstimatorTool` inputs:
   - Target certificate (dropdown from `src/content/programs.ts`).
   - Estimated flight hours per week.
   - Membership toggle.
   - Instructor rate (default from `src/content/pricing.ts` or stub).
3. Outputs:
   - Estimated total cost range (low / high).
   - Estimated weeks to completion.
   - Hour breakdown: aircraft rental, instructor time, membership, exam fees (clearly labeled as estimates).
4. Links to `/fleet/`, `/financing/`, `/membership/`, and relevant program pages.
5. FAQ:
   - How accurate is this estimate?
   - What is included in the cost?
   - Does membership really save money?

**Schema:** `BreadcrumbList`, `FAQPage`.

---

## 6. API/widget/data requirements

### External APIs

| Widget | Endpoint / source | Usage notes |
|--------|-------------------|-------------|
| METAR/TAF | `https://aviationweather.gov/api/data/metar?ids=KRNO&format=json` and `https://aviationweather.gov/api/data/taf?ids=KRNO&format=json` | Call from the browser after hydration. Cache for 60 seconds in component state / `localStorage` keyed by timestamp. Provide a manual refresh button and a fallback link to Aviation Weather Center if the fetch fails or is blocked by CORS. |
| Sunrise/sunset | `suncalc` npm package | No external network call. Compute locally from RNO lat/lon (`39.4991, -119.7681`). |

**CORS risk for METAR/TAF:** `aviationweather.gov` does not reliably send `Access-Control-Allow-Origin`. If browser fetch is blocked, route weather calls through the Hornbill custom API backend at `${NEXT_PUBLIC_API_BASE_URL}/api/weather?type=metar|taf&station=KRNO`. The widget's fetch helper should read `NEXT_PUBLIC_API_BASE_URL` and fall back to the official link if both endpoints fail.

### Data files and constants

| File | Data |
|------|------|
| `src/content/tools.ts` | Tool metadata (slug, title, shortDescription, icon, path), per-tool FAQ items, default widget values, sample routes, caution thresholds. |
| `src/lib/flightPlanning.ts` | Airport coordinate table for RNO, KTVL, KMRY, KBDN, and others used by the fuel estimator. Great-circle distance helper. VFR reserve rules. |
| `src/lib/density.ts` | RNO elevation (`4403` ft), standard altimeter, ISA lapse rate, density-altitude formula. |
| `src/lib/cost.ts` | Program hour estimates (e.g., SPL 20, PPL 40–55, IR 35–50, CPL additional hours beyond PPL, CFI/CFII). Aircraft rates (`$159/hr` member / `$185/hr` non-member from design doc). Membership `$49/month`. Instructor rate placeholder until TICKET-004 lands. |
| `public/images/tools/practice-area-map.svg` | Hand-coded SVG map. |

### Environment variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL of the custom Hornbill API backend. Used for the weather proxy fallback and for any future widget API calls. |

### No-server rule

All live data fetching happens in the browser. The static export contains only HTML, JS, CSS, and the SVG map. The build does not call external APIs.

---

## 7. Dependencies on other tickets

| Ticket | Why it blocks or supports this work |
|--------|--------------------------------------|
| **TICKET-001** (site shell, shared components, global SEO) | **Hard prerequisite.** Tool pages need `layout.tsx`, header, footer, `Container`, `Section`, `PageHeader`, `Button`, `CTALink`, `SchemaInjector`, `BreadcrumbSchema`, `FAQPageSchema`, and `src/lib/routes.ts`. |
| **TICKET-003** (discovery flight page) | **Soft prerequisite.** Every tool page CTAs link to `/discovery-flight/`. The page should exist; if not, the link is still valid but may 404. |
| **TICKET-004** (fleet / pricing) | **Soft prerequisite.** Cost estimator and fuel estimator need real rates, aircraft defaults, and fuel burn. Stub values can be used until this ticket lands. |
| **TICKET-005–TICKET-011** (program pages) | **Soft prerequisite.** Cost estimator certificate list and hour ranges should match canonical program data. Stub if needed. |
| **TICKET-012** (student resources) | **Soft prerequisite.** Footer and student-resources page should link back to the tools. Can be done in parallel; add links during that ticket. |
| **TICKET-013** (instructors) | **Soft prerequisite.** Cost estimator instructor-rate dropdown can use real instructor data if available; otherwise stub a default rate. |
| **TICKET-014** (blog) | **Soft prerequisite.** Tool pages link to relevant blog posts (e.g., density altitude). If blog is not live, omit or link to `/blog/` hub. |
| Custom API backend / booking backend | **Soft dependency only for METAR/TAF proxy fallback.** If NOAA CORS works, no backend dependency. |

**Suggested execution order:**
1. Merge TICKET-001.
2. Add tool routes to `src/lib/routes.ts` and install `suncalc`.
3. Build `ToolLayout`, `ToolInput`, `ToolResult`, `Disclaimer`, and `src/content/tools.ts`.
4. Implement the non-API widgets first (density altitude, fuel estimator, sunrise/sunset, practice map, cost estimator) because they can be tested offline.
5. Implement METAR/TAF widget, test CORS, and wire the fallback/proxy path.
6. Build `/tools/` hub page.
7. Add footer / student-resources links.
8. Run build and verification steps.

---

## 8. Verification steps

### 8.1 Build and routing

- [ ] Run `npm install` and `npm run build`; confirm no errors.
- [ ] Confirm `dist/tools/index.html`, `dist/tools/metar/index.html`, `dist/tools/density-altitude/index.html`, `dist/tools/cross-country-estimator/index.html`, `dist/tools/sunrise-sunset/index.html`, `dist/tools/practice-area-map/index.html`, and `dist/tools/cost-estimator/index.html` exist.
- [ ] Run a link checker on `dist/` and confirm all `/tools/*` internal links resolve.
- [ ] Confirm all tool routes are present in the generated `sitemap.xml`.

### 8.2 Schema and SEO

- [ ] For every tool page, validate `BreadcrumbList` and `FAQPage` schema with Google Rich Results Test and Schema.org validator.
- [ ] Confirm each page has exactly one H1 matching the planned headline.
- [ ] Confirm each page has a unique `<title>` and `<meta name="description">` under 155 characters.
- [ ] Confirm each page has a self-referencing canonical tag with a trailing slash.
- [ ] Confirm OpenGraph tags (`og:title`, `og:description`, `og:url`, `og:image`) are populated.

### 8.3 Widget correctness

- [ ] **METAR/TAF:** With a live network, the widget loads current data; raw and decoded strings are visible; timestamp is shown; refresh works. If NOAA CORS is blocked, the fallback link to Aviation Weather Center is shown or the proxy endpoint returns data.
- [ ] **Density altitude:** Test known conditions (e.g., standard day at sea level should produce pressure altitude ≈ 0 and density altitude ≈ 0). At RNO elevation `4403`, altimeter `29.92`, OAT matching ISA, density altitude should approximate field elevation.
- [ ] **Fuel estimator:** Sample routes RNO→KTVL, RNO→KMRY, RNO→KBDN produce non-zero time and fuel values. VFR reserve is added. Invalid inputs (e.g., unknown airport) show a helpful error.
- [ ] **Sunrise/sunset:** Compare today's values for RNO (`39.4991, -119.7681`) to a reliable source; civil twilight and last legal evening flight time are correct.
- [ ] **Practice map:** The SVG renders clearly on desktop and mobile; labels are legible; the page has a text alternative / descriptive caption.
- [ ] **Cost estimator:** Toggling membership changes the total; selecting different certificates changes hours and cost range; no negative or zero outputs with valid inputs.

### 8.4 UX, accessibility, and brand

- [ ] Run a WCAG 2.2 AA audit on each tool page; confirm no critical contrast, focus, or label errors.
- [ ] Confirm all interactive inputs have visible labels and focus rings (`gold-500`).
- [ ] Confirm touch targets are ≥ 44 px on mobile.
- [ ] Confirm the sticky "Book a discovery flight" CTA and phone link are reachable on every tool page.
- [ ] Read all tool copy against the forbidden-phrase list in `brand_identity_writing_style.md`; remove clichés, superlatives, and LLM hedges.
- [ ] Confirm copy uses specific numbers and names: RNO, PA28, $159/hr, $49/month, 4,403 ft, etc.

### 8.5 Performance

- [ ] Confirm tool pages score LCP ≤ 2.0 s, CLS ≤ 0.1, and no long tasks on initial load.
- [ ] Confirm external weather fetches happen after hydration and do not block LCP.
- [ ] Confirm the SVG map is inlined or loaded as a static asset (no runtime map library).

### 8.6 Cross-linking

- [ ] Confirm each tool page links to at least one related program page, `/fleet/`, `/membership/`, `/discovery-flight/`, or `/student-resources/` where relevant.
- [ ] Confirm the `/tools/` hub links to all six widgets.
- [ ] Confirm the footer links to `/tools/` or `/student-resources/`.
