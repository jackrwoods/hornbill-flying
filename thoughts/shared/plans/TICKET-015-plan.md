---
id: TICKET-015-plan
title: "Implementation plan: Cross-Country / Rentals page"
ticket: TICKET-015
status: draft
created: 2026-06-18
---

## 1. Scope summary

TICKET-015 builds the static Next.js page at `/cross-country-rentals/`. The page explains Hornbill's real-world cross-country rental program: how members and qualified renters can take the same PA28 aircraft they train in on actual trips, what makes that different from a local training-only school, and what policies apply.

What this ticket produces:

- The `/cross-country-rentals/` route, metadata, and composition.
- Page sections covering eligibility, example routes, fleet suitability, checkout requirements, insurance/fuel/overnight policy, and CTAs.
- A reusable `RouteCard` component for origin/destination/route details that can also be used by the Mountain Flying page (TICKET-010).
- A shared data file `src/content/crossCountry.ts` containing route examples, eligibility rules, policies, and FAQ items.
- `FAQPage` schema plus `BreadcrumbList` JSON-LD.
- Internal links to `/fleet/`, `/membership/`, `/location/`, `/programs/mountain-flying/`, `/discovery-flight/`, and `/contact/`.

This ticket does **not** implement: the booking API, live aircraft availability, the cross-country fuel/time estimator widget, or the membership signup flow. It is a static marketing page that links to those flows.

---

## 2. Exact file paths to create or modify

All paths are relative to the repository root `/Users/jack/hornbill-flying/`.

### New route

| File | Purpose |
|------|---------|
| `src/app/cross-country-rentals/page.tsx` | Page composition, metadata export, and JSON-LD injection. |

### New page section components

Create under `src/sections/cross-country/` (or `src/components/cross-country/` if the project conventions from TICKET-001/TICKET-002 chose that directory).

| File | Purpose |
|------|---------|
| `src/sections/cross-country/CrossCountryPageHeader.tsx` | Breadcrumb + H1 + positioning sentence. |
| `src/sections/cross-country/WhatIsDifferentSection.tsx` | Differentiator block contrasting training-only schools vs. Hornbill's rental program. |
| `src/sections/cross-country/EligibilitySection.tsx` | Membership/privileges and renter checkout requirements. |
| `src/sections/cross-country/RouteExamplesSection.tsx` | Example route cards (Tahoe, Monterey, Bend) with distance, flight time, and what the route teaches. |
| `src/sections/cross-country/FleetSuitabilitySection.tsx` | PA28 fleet consistency, IFR-equipped tails, and why the same aircraft works for training and trips. |
| `src/sections/cross-country/PolicySection.tsx` | Insurance, fuel, overnight, cancellation, and minimum-renter rules. |
| `src/sections/cross-country/CTASection.tsx` | Bottom dual CTA to Fleet & Pricing and Membership, plus phone fallback. |
| `src/sections/cross-country/CrossCountryFAQSection.tsx` | FAQ accordion using shared `FAQAccordion`; supplies FAQPage schema. |

### New shared component

| File | Purpose |
|------|---------|
| `src/components/RouteCard.tsx` | Reusable card for a route: origin, destination, distance, estimated flight time, key notes/learning objective. Can be reused by Mountain Flying (TICKET-010) and any future route pages. |

### New shared data file

| File | Purpose |
|------|---------|
| `src/content/crossCountry.ts` | Central source of truth for route examples, eligibility copy, checkout requirements, policy text, FAQ items, and schema fields for the cross-country page. |

### Static assets

| File | Purpose |
|------|---------|
| `public/images/cross-country/cross-country-hero.webp` | Hero image of a Hornbill PA28 loaded for a trip or on a scenic ramp with Sierra/destination backdrop. WebP/AVIF, optimized, explicit dimensions. |
| `public/images/cross-country/route-tahoe.webp` (optional) | Supporting image for Tahoe route. |
| `public/images/cross-country/route-monterey.webp` (optional) | Supporting image for Monterey/Big Sur route. |
| `public/images/cross-country/route-bend.webp` (optional) | Supporting image for Bend route. |

### Files to modify

| File | Change |
|------|--------|
| `src/lib/routes.ts` (TICKET-001) | Add the `/cross-country-rentals/` route entry so header nav, footer links, sitemap, and breadcrumbs include it. |
| `src/lib/schema.ts` (TICKET-001) | Ensure schema builders support `Service`, `Offer`, `BreadcrumbList`, and `FAQPage`. Extend if needed for rental-service markup. |
| `src/components/Header.tsx` / `MobileNav.tsx` (TICKET-001) | Add "Cross-Country" to the main nav (design doc lists it as a top-level nav item). |
| `src/components/Footer.tsx` (TICKET-001) | Add "Cross-Country" to quick links. |
| `src/app/page.tsx` (TICKET-002) | Link the "Real-world experience" differentiator or homepage teaser to `/cross-country-rentals/`. |
| `src/app/fleet/page.tsx` (TICKET-011) | Link IFR-equipped aircraft cards and fleet FAQ answer about cross-country rentals to `/cross-country-rentals/`. |
| `src/app/programs/mountain-flying/page.tsx` (TICKET-010) | Link the mountain-flying "Why Hornbill" section and route examples to `/cross-country-rentals/`. |

---

## 3. Reusable components to use from TICKET-001 and other tickets

### From TICKET-001 (shell and shared primitives)

These must already exist before this ticket is implemented.

| Component / helper | Expected path | Usage on `/cross-country-rentals/` |
|--------------------|---------------|------------------------------------|
| `RootLayout` | `src/app/layout.tsx` | Wraps the page; provides fonts, global metadata template, header, footer, and base schema. |
| `Header` / `MobileNav` | `src/components/Header.tsx` / `src/components/MobileNav.tsx` | Persistent navigation; "Book a discovery flight" CTA and phone link remain available. |
| `Footer` | `src/components/Footer.tsx` | NAP block and quick links. |
| `Container` | `src/components/Container.tsx` | Max-width wrapper for each section. |
| `Section` | `src/components/Section.tsx` | Vertical rhythm and background variants. |
| `PageHeader` | `src/components/PageHeader.tsx` | Breadcrumb + H1 + subtitle layout. |
| `Button` | `src/components/Button.tsx` | CTA buttons (primary navy, secondary gold). |
| `CTALink` | `src/components/CTALink.tsx` | "Book a discovery flight" repeated CTA. |
| `PhoneLink` | `src/components/PhoneLink.tsx` | Click-to-call link. |
| `Card` / `Badge` | `src/components/Card.tsx`, `src/components/Badge.tsx` | Route cards and tags such as "IFR equipped" / "Member rental". |
| `FAQAccordion` | `src/components/FAQAccordion.tsx` | Accessible accordion that also supplies FAQPage schema items. |
| `SchemaInjector` | `src/components/SchemaInjector.tsx` | Renders JSON-LD scripts. |
| `src/lib/schema.ts` | `src/lib/schema.ts` | Builders for `Service`, `Offer`, `BreadcrumbList`, `FAQPage`. |
| `src/lib/seo.ts` | `src/lib/seo.ts` | `buildTitle`, `buildCanonical`, `buildOpenGraph`, `buildTwitter`. |
| `src/lib/config.ts` | `src/lib/config.ts` | Base URL, NAP, brand defaults, phone number. |
| `src/lib/routes.ts` | `src/lib/routes.ts` | Route map; add `/cross-country-rentals/` here. |
| `src/types/index.ts` | `src/types/index.ts` | Shared types such as `FAQItem`, `Route`, `CTA`. |

### From other tickets (consume if ready; stub if not)

| Source ticket | Reusable asset | Usage on `/cross-country-rentals/` |
|---------------|----------------|------------------------------------|
| TICKET-011 (Fleet & Pricing) | `src/content/fleet.ts` aircraft data and membership rates. | Reuse tail numbers, engine/avionics copy, and wet rates so the fleet-suitability section stays consistent with `/fleet/`. |
| TICKET-012 (Membership) | `/membership/` page and `$49/month` rate. | Eligibility section links here; CTA section links here. |
| TICKET-016 (Location / RNO) | `/location/` page. | Link from "Home airport" context and route planning notes. |
| TICKET-010 (Mountain Flying) | `/programs/mountain-flying/` page and shared `RouteCard`. | Link to related program; share the `RouteCard` component. |
| TICKET-003 (Discovery Flight) | `/discovery-flight/` page. | Secondary CTA for visitors not yet checked out. |
| TICKET-023 (Pilot tools / widgets) | `/tools/cross-country-estimator/` widget. | Optional link or future inline embed for the fuel/time estimator. |

---

## 4. Page content/structure, schema markup, and SEO metadata

### 4.1 Metadata (`src/app/cross-country-rentals/page.tsx`)

Use the `metadata` export built with helpers from `src/lib/seo.ts`.

- **Title:** `Cross-Country Aircraft Rental in Reno, NV | Hornbill Aviation` (≤60 chars).
- **Meta description:** `Rent a PA28 at RNO for real cross-country trips. Members save with $159/hr wet rates. Fly to Tahoe, Monterey, Bend, and beyond. See requirements.` (≤155 chars).
- **Canonical:** `https://hornbillaviation.com/cross-country-rentals/` (trailing slash, from `site.url`).
- **OpenGraph:** title mirrors page title; description mirrors meta description; image uses the cross-country hero photo or the default OG image from TICKET-001.
- **Twitter card:** `summary_large_image`.

### 4.2 Heading hierarchy

- **H1:** `Cross-country aircraft rental in Reno, NV.` (only one H1).
- **H2:** each major section title (Why Hornbill, Eligibility, Example routes, Fleet, Rental policy, FAQ, Next steps).
- **H3:** route names as card titles, and sub-section labels where needed.
- **H4:** small labels inside cards (Distance, Flight time, Aircraft used).

### 4.3 Section-by-section content

#### Page header (`CrossCountryPageHeader`)

- **Breadcrumb:** `Home` → `/` > `Cross-Country / Rentals` → `/cross-country-rentals/`.
- **H1:** `Cross-country aircraft rental in Reno, NV.`
- **Positioning sentence:** `Don't just practice maneuvers. Rent the same PA28 you trained in and fly real routes from Reno–Tahoe (RNO).`

#### What makes Hornbill different (`WhatIsDifferentSection`)

- Lead with the problem: many schools keep students in the practice area and never let them take the aircraft on real trips.
- Hornbill's difference:
  - You train in a PA28 and rent the same type for trips.
  - Members get priority scheduling and the member wet rate.
  - RNO is a real cross-country gateway: Tahoe, California coast, Oregon, Idaho are practical destinations.
  - You choose your instructor for checkout; we do not assign a rigid "stage check" schedule.
- Messaging pillars: **Real-world experience** (lead) and **Flexibility** (supporting).

#### Eligibility (`EligibilitySection`)

- **Who can rent for cross-country:**
  - Current Hornbill member in good standing, or qualified non-member renter at the non-member wet rate.
  - Hold at least a Private Pilot certificate (or Sport Pilot for appropriate aircraft/light-sport limitations, but PA28 requires at least PPL).
  - Current medical or BasicMed as appropriate.
  - Completed a Hornbill checkout in the PA28.
  - Current flight review, if renting as PIC.
- **Checkout requirements:**
  - Ground review of aircraft systems, performance, and emergency procedures.
  - Local flight with a Hornbill CFI to verify proficiency in the PA28.
  - Cross-country checkout may include a supervised trip for first-time renters.
- Link to `/membership/` for membership benefits and `/fleet/` for aircraft details.

#### Example routes (`RouteExamplesSection`)

Render three route cards using the shared `RouteCard` component.

| Route | Distance (approx) | Estimated flight time (PA28) | What it teaches |
|-------|-------------------|----------------------------|-----------------|
| RNO → Lake Tahoe (KTVL) | ~55 NM | ~35–45 min | Mountain crossing, high-elevation airport, terrain awareness. |
| RNO → Monterey (KMRY) | ~160 NM | ~1 hr 30 min | Coastal route planning, airspace transitions, longer fuel/weather decisions. |
| RNO → Bend (KBDN) | ~280 NM | ~2 hr 30 min | Longer cross-country, alternate planning, performance at destination. |

- Include a note: `Exact time depends on winds, routing, and aircraft. Weather and instructor approval always decide the go/no-go.`
- Link to `/location/` for home-airport context and, once live, to `/tools/cross-country-estimator/`.

#### Fleet suitability (`FleetSuitabilitySection`)

- Hornbill's PA28 fleet is consistent across training and rental, so handling is predictable.
- Highlight IFR-equipped tails for longer/night/IMC trips:
  - `N6576J` — dual Garmin G5, WAAS Garmin 375, cruise prop.
  - `N7824W` — dual Garmin G5, WAAS Garmin 480, mountain-performance setup.
- VFR tails (`N7969W`, `N0001J`) are available for fair-weather trips and local rentals.
- Rates: member `$159/hr` wet, non-member `$185/hr` wet (from `src/content/fleet.ts`).
- Link to `/fleet/` for full aircraft details and photos.

#### Rental policy (`PolicySection`)

- **Insurance:** renters must meet insurance requirements; coverage details are provided during checkout. (Use exact operations policy when available.)
- **Fuel:** wet rate includes fuel. Renter refuels as directed; reimbursement policy for fuel away from home base.
- **Overnight/multi-day:** trips are allowed with advance scheduling and operations approval; minimum daily hour rules may apply.
- **Reservation/cancellation:** priority scheduling for members; 12-hour cancellation window for members; longer lead time may apply for peak weekends.
- **Currency:** PIC must be current for the flight conditions (day/night, passenger, IFR if applicable).
- Placeholder text must be flagged `// TODO: confirm with operations` and replaced before launch.

#### Bottom CTA (`CTASection`)

- Heading: `Ready to plan your first trip?`
- Primary CTA: `See the fleet and rates` → `/fleet/`.
- Secondary CTA: `Start a membership` → `/membership/`.
- Tertiary: `Book a discovery flight` → `/discovery-flight/` (for visitors not yet qualified).
- Phone link fallback.

#### FAQ (`CrossCountryFAQSection`)

7–9 questions using `FAQAccordion` and emitting FAQPage JSON-LD.

Suggested questions:

1. Can I rent a Hornbill aircraft for a cross-country trip?
2. Do I need a membership to rent for cross-country?
3. What are the checkout requirements for cross-country rental?
4. Which aircraft can I take on a cross-country?
5. Can I fly to Tahoe, Monterey, or Bend from RNO?
6. What does the wet rate include?
7. Can I keep the aircraft overnight?
8. What insurance do I need?
9. How do I schedule a cross-country rental?

### 4.4 Schema markup

Render the following JSON-LD on `/cross-country-rentals/` in addition to the base `Organization`/`LocalBusiness`/`EducationalOrganization` already injected by the root layout.

1. **BreadcrumbList**
   - Item 1: `Home` → `https://hornbillaviation.com/`
   - Item 2: `Cross-Country / Rentals` → `https://hornbillaviation.com/cross-country-rentals/`

2. **Service** (for the aircraft rental / cross-country rental service)
   - `@type`: `Service`
   - `name`: `Cross-Country Aircraft Rental — PA28 — Reno, NV`
   - `provider`: references `/#organization` and `/#localbusiness`
   - `areaServed`: Reno, NV / KRNO
   - `offers`: `Offer` objects for:
     - Member PA28 wet rate: `$159.00` / `USD` / `unitCode: HUR`
     - Non-member PA28 wet rate: `$185.00` / `USD` / `unitCode: HUR`
     - Monthly membership: `$59.00` / `USD` / `unitCode: MON`
   - `serviceType`: `Aircraft Rental`

3. **FAQPage**
   - Main entity: the FAQ items from `CrossCountryFAQSection`.

Do **not** emit `AggregateRating` until real reviews exist.

### 4.5 Internal links

Every page must include 3–5 contextual internal links. On `/cross-country-rentals/`:

1. `See the fleet and rates` → `/fleet/`
2. `Start a membership` → `/membership/`
3. `Visit our location at RNO` → `/location/`
4. `Mountain Flying course` → `/programs/mountain-flying/`
5. `Book a discovery flight` → `/discovery-flight/`
6. `Contact us` → `/contact/` (fallback)

---

## 5. API/widget/data requirements

### APIs used directly by TICKET-015

None. This is a static marketing page. All data is sourced from `src/content/crossCountry.ts` and `src/content/fleet.ts`.

### Data files to create or modify

| File | Data shape |
|------|------------|
| `src/content/crossCountry.ts` | Export `hero`, `differentiators`, `eligibility`, `checkout`, `routes` (array of `Route` objects), `fleetCopy`, `policies`, `faqs`, and `ctas`. |
| `src/content/fleet.ts` (TICKET-011) | Import `aircraft`, `membershipRates` for the fleet-suitability and rate sections. |

### Widgets / dynamic features deferred

- Live aircraft availability and booking are **not** on this page. CTAs link to `/discovery-flight/` (TICKET-003) and `/fleet/` (TICKET-011).
- The cross-country fuel/time estimator widget at `/tools/cross-country-estimator/` is implemented by TICKET-023; this page links to it once live.

### External integrations

- Analytics events: track `membership_signup_started` when the membership CTA is clicked, `discovery_flight_booking_started` when the discovery-flight CTA is clicked, and `fleet_page_view` when the fleet link is clicked. Use the event helpers established by TICKET-001.

---

## 6. Dependencies on other tickets

### Must be completed first

| Ticket | What this ticket needs from it |
|--------|--------------------------------|
| **TICKET-001** | Site shell, shared components (`Header`, `Footer`, `Container`, `Section`, `PageHeader`, `Button`, `CTALink`, `PhoneLink`, `Card`, `Badge`, `FAQAccordion`, `SchemaInjector`), config (`src/lib/config.ts`), routes (`src/lib/routes.ts`), schema helpers (`src/lib/schema.ts`), metadata helpers (`src/lib/seo.ts`). **Blocking.** |

### Can proceed in parallel, but links/data may need stubs

| Ticket | Relationship |
|--------|--------------|
| **TICKET-003** | `/discovery-flight/` is a secondary CTA destination. If not live, link to it anyway; the route resolves once TICKET-003 ships. |
| **TICKET-011** | `/fleet/` is the primary CTA and the source of aircraft/rate data. Define canonical rates in `src/content/fleet.ts` so this page imports them rather than duplicating. |
| **TICKET-012** | `/membership/` is the secondary CTA. The `$49/month` membership and benefits are referenced from the eligibility/CTA sections. |
| **TICKET-016** | `/location/` is linked from route-planning and home-airport context. If not live, omit the link or point to `/contact/`. |
| **TICKET-010** | `/programs/mountain-flying/` is linked as a related program. The `RouteCard` component built here should be reusable by Mountain Flying. |
| **TICKET-023** | `/tools/cross-country-estimator/` is linked as a future resource. If not live, omit the link. |
| **TICKET-020** | `/contact/` is used as a fallback for not-yet-live pages and as a tertiary contact option. |

### What depends on this ticket

- **Mountain Flying (`TICKET-010`)** can reuse `RouteCard` and should link to `/cross-country-rentals/`.
- **Fleet & Pricing (`TICKET-011`)** should link its cross-country-rental FAQ answer and IFR aircraft cards to `/cross-country-rentals/`.
- **Homepage (`TICKET-002`)** may link the "Real-world experience" differentiator to `/cross-country-rentals/`.

---

## 7. Verification steps

### 7.1 Build and export verification

1. Run `npm run build` and confirm the `dist/` folder contains `cross-country-rentals/index.html`.
2. Confirm the static export completed without server-only features.
3. Serve `dist/` locally and navigate to `/cross-country-rentals/`.

### 7.2 Schema validation

1. Run the generated `/cross-country-rentals/index.html` through Google Rich Results Test (live or by copying the JSON-LD block).
2. Validate with validator.schema.org in "code snippet" mode.
3. Confirm JSON-LD contains:
   - `Service` with valid `offers` array including member rate, non-member rate, and membership.
   - `BreadcrumbList` with Home and Cross-Country / Rentals items.
   - `FAQPage` with the cross-country questions.
4. Confirm no duplicate `@id` values and all absolute URLs use the production base URL from `src/lib/config.ts`.

### 7.3 SEO metadata checks

1. Verify title is exactly `Cross-Country Aircraft Rental in Reno, NV | Hornbill Aviation`.
2. Verify meta description is ≤155 chars and contains "PA28", "RNO", "cross-country", "Tahoe", "Monterey", "Bend", or "rates".
3. Verify canonical is self-referencing with trailing slash.
4. Verify the sitemap includes `/cross-country-rentals/`.
5. Verify `robots.txt` allows `/cross-country-rentals/`.

### 7.4 Content and copy checks

1. Read every line of copy against the forbidden-phrase list in `brand_identity_writing_style.md`:
   - No "soar", "unlock your potential", "world-class", "premier", "aviation family", "passion for aviation", LLM hedges.
2. Verify all claims are specific: tail numbers, `$159/hr`, `$185/hr`, `$49/month`, `RNO`, `PA28`, `KTVL`, `KMRY`, `KBDN`.
3. Verify the H1 is the only H1 on the page and uses sentence case.
4. Verify CTAs are concrete: "See the fleet and rates", "Start a membership", "Book a discovery flight".
5. Verify the policy text has been replaced with the real operations policy, not left as placeholder.

### 7.5 Accessibility and UX checks

1. Run axe-core or Lighthouse accessibility audit; target WCAG 2.2 AA with no critical errors.
2. Verify route cards use semantic headings and do not skip levels.
3. Verify hero image has descriptive alt text including location and aircraft: `PA28 Cherokee loaded for a cross-country trip at Reno-Tahoe International Airport (RNO)`.
4. Verify all images have explicit `width`/`height` and use WebP/AVIF.
5. Verify heading hierarchy: H1 → H2 → H3 → H4 with no skipped levels.
6. Verify mobile layout: cards stack, CTAs are thumb-reachable, nav label fits on small screens.
7. Verify keyboard navigation through the FAQ accordion and CTAs.

### 7.6 Core Web Vitals checks

1. Run Lighthouse on `/cross-country-rentals/`.
2. Targets:
   - LCP ≤ 2.0 s
   - CLS ≤ 0.1
   - INP ≤ 200 ms (lab estimate)
3. Confirm the hero image uses `fetchpriority="high"` and `loading="eager"`.
4. Confirm route card images below the fold are lazy-loaded.
5. Confirm no layout shift from the route cards or CTA section.

### 7.7 NAP and local SEO checks

1. Confirm footer NAP matches schema byte-for-byte: `1008 Gentry Way, Reno, NV 89512`, `+1-555-555-1234`, `office@hornbillaviation.com`.
2. Confirm the phone link uses `tel:+15555551234`.
3. Confirm the page includes internal links to `/fleet/`, `/membership/`, `/location/`, `/programs/mountain-flying/`, and `/discovery-flight/`.

### 7.8 Cross-ticket contract checks

1. Confirm `src/content/crossCountry.ts` exports a stable `routes` array that Mountain Flying (TICKET-010) can reuse via `RouteCard`.
2. Confirm `/cross-country-rentals/` was added to `src/lib/routes.ts` and appears in the header nav, footer quick links, sitemap, and breadcrumb.
3. Confirm `src/lib/schema.ts` exposes a `buildServiceOffer` or equivalent helper for the `Offer` array.
4. Confirm rate data is imported from `src/content/fleet.ts` and not duplicated.

### 7.9 Manual smoke tests

1. Serve `dist/` and navigate to `/cross-country-rentals/`.
2. Click every CTA and confirm it lands on the expected route.
3. Verify the three route cards display origin, destination, distance, and estimated flight time.
4. Verify the FAQ accordion expands/collapses and each answer is visible.
5. Verify the page looks correct at 320 px, 375 px, 414 px, 768 px, and 1440 px viewports.
6. View the page with JavaScript disabled to ensure static content is visible.

---

## 8. Implementation order (suggested)

1. Confirm TICKET-001 is complete and shared components are stable.
2. Add `/cross-country-rentals/` to `src/lib/routes.ts` and the header/footer nav.
3. Create `src/components/RouteCard.tsx` as a reusable component.
4. Create `src/content/crossCountry.ts` with route examples, eligibility, policies, and FAQ items.
5. Collect or create optimized images in `public/images/cross-country/`.
6. Build `CrossCountryPageHeader`, `WhatIsDifferentSection`, `EligibilitySection`, `RouteExamplesSection`, `FleetSuitabilitySection`, `PolicySection`, `CrossCountryFAQSection`, and `CTASection`.
7. Compose the sections in `src/app/cross-country-rentals/page.tsx`, add metadata, and inject JSON-LD.
8. Run the build, fix errors, and execute verification steps.
9. Coordinate with TICKET-010 (Mountain Flying) to share `RouteCard` and reciprocal links.
10. Coordinate with TICKET-011 (Fleet & Pricing) to ensure reciprocal links and shared rate data.
