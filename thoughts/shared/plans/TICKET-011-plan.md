---
id: TICKET-011-plan
title: "Implementation plan: Fleet & Pricing page"
ticket: TICKET-011
status: draft
created: 2026-06-18
---

## 1. Scope summary

TICKET-011 builds the `/fleet/` page for Hornbill Aviation. The page's primary job is to earn trust through radical pricing transparency and to pre-qualify prospective students and renters. It surfaces the full PA28 fleet (tail numbers, engine, avionics, notes), the membership vs non-member wet-rate comparison, instructor rates, discovery-flight pricing, financing options, and the cancellation/refund policy. The page must drive visitors toward two conversion paths: starting a membership (`/membership/`) and booking a discovery flight (`/discovery-flight/`).

What this ticket produces:

- The `/fleet/` static page route and metadata.
- Reusable fleet/pricing section components that can later be referenced by the homepage pricing snapshot and the membership page.
- A shared `src/content/fleet.ts` data file containing aircraft, rates, policies, and page-specific FAQ data.
- Service schema with `Offer` markup for aircraft rental and membership rates, plus FAQPage and BreadcrumbList JSON-LD.
- Internal links to Membership, Discovery Flight, Financing, each program page, and the cross-country rentals page.

This ticket does **not** implement: the booking API, the membership signup API, the financing application flow, or live availability widgets. It is a static marketing page that links to those flows.

---

## 2. Exact file paths to create or modify

### New route

| File | Purpose |
|------|---------|
| `src/app/fleet/page.tsx` | The `/fleet/` page composition, metadata export, and JSON-LD injection. |

### New page section components

Create under `src/components/fleet/` (or `src/sections/fleet/` if the project adopts a `sections/` convention; align with whatever TICKET-001/TICKET-002 chose).

| File | Purpose |
|------|---------|
| `src/components/fleet/FleetPageHeader.tsx` | Breadcrumb + H1 + positioning sentence. |
| `src/components/fleet/MembershipComparisonSection.tsx` | Membership vs non-member rate comparison table/card. |
| `src/components/fleet/AircraftCardsSection.tsx` | Per-aircraft cards for the four PA28s. |
| `src/components/fleet/InstructorRateSection.tsx` | Instructor hourly rate block. |
| `src/components/fleet/DiscoveryFlightPriceSection.tsx` | Discovery flight price and CTA. |
| `src/components/fleet/FinancingOptionsSection.tsx` | Financing teaser with link to `/financing/`. |
| `src/components/fleet/CancellationPolicySection.tsx` | Cancellation and refund policy block. |
| `src/components/fleet/FleetFAQSection.tsx` | FAQ accordion using shared `FAQAccordion`; supplies FAQPage schema. |
| `src/components/fleet/FleetCTASection.tsx` | Bottom dual CTA: membership and discovery flight. |

### New shared data file

| File | Purpose |
|------|---------|
| `src/content/fleet.ts` | Central source of truth for fleet/rate data: aircraft array, membership pricing, instructor rate placeholder, discovery-flight price, financing copy, cancellation/refund policy, and fleet-page FAQ items. |

### Static assets

| File | Purpose |
|------|---------|
| `public/images/fleet/n6576j.webp` | Aircraft photo for N6576J (optimized WebP/AVIF, explicit dimensions). |
| `public/images/fleet/n7824w.webp` | Aircraft photo for N7824W. |
| `public/images/fleet/n7969w.webp` | Aircraft photo for N7969W. |
| `public/images/fleet/n0001j.webp` | Aircraft photo for N0001J. |
| `public/images/fleet/fleet-hero.webp` | Optional hero banner for the page header. |

### Files modified (lightly)

| File | Change |
|------|--------|
| `src/lib/routes.ts` (TICKET-001) | Add the `/fleet/` route entry so header nav, footer links, sitemap, and breadcrumbs include it. |
| `src/lib/schema.ts` (TICKET-001) | Ensure schema builders support `Service` with `offers`/`areaServed` and `AggregateOffer`/`Offer` shapes. If not present, extend the builders here. |
| `src/content/programs.ts` (shared) | If not already created, add program data so fleet page can link to `/programs/<slug>/`. Prefer importing from the shared file rather than duplicating. |

---

## 3. Reusable components to use from TICKET-001 and other tickets

### From TICKET-001 (shell and shared primitives)

These must already exist before this ticket is implemented.

| Component / helper | Expected path | Usage on `/fleet/` |
|--------------------|---------------|-------------------|
| `RootLayout` | `src/app/layout.tsx` | Wraps the page; provides fonts, global metadata template, header, footer. |
| `Header` / `MobileNav` | `src/components/Header.tsx` / `src/components/MobileNav.tsx` | Persistent navigation; the "Book a discovery flight" CTA and phone link remain available. |
| `Footer` | `src/components/Footer.tsx` | NAP block and quick links. |
| `Container` | `src/components/Container.tsx` | Max-width wrapper for each section. |
| `Section` | `src/components/Section.tsx` | Vertical rhythm and background variants. |
| `PageHeader` | `src/components/PageHeader.tsx` | Breadcrumb + H1 subtitle layout. |
| `Button` | `src/components/Button.tsx` | CTA buttons (primary navy, secondary gold, accent orange). |
| `CTALink` | `src/components/CTALink.tsx` | "Book a discovery flight" repeated CTA. |
| `PhoneLink` | `src/components/PhoneLink.tsx` | Click-to-call link. |
| `Card` / `Badge` | `src/components/Card.tsx`, `src/components/Badge.tsx` | Aircraft cards and tags such as "Cross-country ready" / "IFR equipped". |
| `FAQAccordion` | `src/components/FAQAccordion.tsx` | Accessible accordion that also emits FAQPage schema when paired with schema helpers. |
| `SchemaInjector` / `JsonLd` | `src/components/SchemaInjector.tsx` | Renders JSON-LD scripts. |
| `src/lib/schema.ts` | `src/lib/schema.ts` | Builders for `Service`, `Offer`, `BreadcrumbList`, `FAQPage`. |
| `src/lib/seo.ts` | `src/lib/seo.ts` | `buildTitle`, `buildCanonical`, `buildOpenGraph`, `buildTwitter`. |
| `src/lib/config.ts` | `src/lib/config.ts` | Base URL, NAP, brand defaults, phone number. |
| `src/lib/routes.ts` | `src/lib/routes.ts` | Route map; add `/fleet/` here. |
| `src/types/index.ts` | `src/types/index.ts` | Shared types such as `Aircraft`, `Rate`, `FAQItem`. |

### From other tickets (consume if ready; stub if not)

| Source ticket | Reusable asset | Usage on `/fleet/` |
|---------------|----------------|-------------------|
| TICKET-003 | `/discovery-flight/` page and any shared booking CTA component. | Every "Book a discovery flight" button links here. |
| TICKET-012 | `/membership/` page and membership rate constants. | Membership comparison links here; reuse rate data from `src/content/fleet.ts` so both pages stay consistent. |
| Later financing ticket | `/financing/` page. | Financing section links here; if the page does not yet exist, keep the link but render a small "coming soon" note or point to `/contact/`. |
| TICKET-015 | `/cross-country-rentals/` page. | Link from the aircraft cards and FAQ answer about cross-country rental eligibility. |
| TICKET-005 to TICKET-010 | Program page routes from `src/content/programs.ts`. | Link from the bottom CTA or FAQ ("Which program is right for me?"). |

---

## 4. Page content/structure, schema markup, and SEO metadata

### 4.1 Metadata (`src/app/fleet/page.tsx`)

Use the `metadata` export built with helpers from `src/lib/seo.ts`.

- **Title:** `PA28 Fleet & Pricing in Reno, NV | Hornbill Aviation` (≤60 chars).
- **Meta description:** `Transparent PA28 wet rates at RNO. Members fly for $159/hr, non-members $185/hr. See tails, avionics, instructor rates, discovery flights, and financing.` (≤155 chars).
- **Canonical:** `https://hornbillaviation.com/fleet/` (trailing slash, from `site.url`).
- **OpenGraph:** title mirrors page title; description mirrors meta description; image uses a fleet photo or the default OG image from TICKET-001.
- **Twitter card:** `summary_large_image`.

### 4.2 Heading hierarchy

- **H1:** `Our PA28 fleet and transparent rates.` (or equivalent; only one H1 on the page).
- **H2:** each major section title (Membership vs non-member, Aircraft, Instructor rate, Discovery flight, Financing, Cancellation policy, FAQ).
- **H3:** aircraft tail numbers as card titles.
- **H4:** small labels inside cards (Engine, Avionics, Notes).

### 4.3 Section-by-section content

#### Page header (`FleetPageHeader`)

- **Breadcrumb:** `Home` → `/` > `Fleet & Pricing` → `/fleet/`.
- **H1:** `Our PA28 fleet and transparent rates.`
- **Positioning sentence:** `Every wet rate is listed here. No fuel surcharge, no hidden fees, no surprise markup when you switch aircraft.`

#### Membership comparison (`MembershipComparisonSection`)

Render as a responsive table or three pricing cards.

| Plan | Monthly | PA28 wet rate | Who it's for |
|------|---------|---------------|--------------|
| Member | $49/month | $159/hr | Students and renters who fly regularly. |
| Non-member | — | $185/hr | Occasional renters or visitors. |

- Highlight the member card as the preferred option.
- Add a savings note: `Save $26/hr. At about 2.3 hours per month, membership pays for itself.`
- CTA: `See membership details` → `/membership/`.

#### Aircraft cards (`AircraftCardsSection`)

Four cards in a 1-column (mobile) → 2-column (tablet) → 4-column (desktop) grid.

Each card must include:

- Aircraft exterior photo (real or placeholder until photoshoot).
- Tail number as H3 (e.g., `N6576J`).
- Engine: `180 HP Lycoming`.
- Avionics list.
- Notes.
- Wet rate badge: `Member $159/hr` / `Non-member $185/hr` (or reuse comparison data).

**Aircraft data (from design doc):**

| Tail | Engine | Avionics | Notes |
|------|--------|----------|-------|
| N6576J | 180 HP Lycoming | Dual Garmin G5 units, WAAS Garmin 375 GPS | Cruise prop for efficient IFR cross-country flying. |
| N7824W | 180 HP Lycoming | Dual Garmin G5 units, WAAS Garmin 480 GPS | Set up for performance around the mountains. |
| N7969W | 180 HP Lycoming | VFR panel | Training and local rental workhorse. |
| N0001J | 180 HP Lycoming | VFR panel | Training and local rental workhorse. |

- Add an internal link to `/cross-country-rentals/` from the IFR-equipped aircraft cards.

#### Instructor rate (`InstructorRateSection`)

- **Heading:** `CFI instruction rates.`
- **Content:** instructor hourly rate block. Use a placeholder value in `src/content/fleet.ts` (e.g., `instructorRate: null` or a confirmed number) and replace once operations confirms the rate.
- If the rate is confirmed at build time, display it as `CFI instruction: $XX/hr`.
- Include a note: `Ground and flight instruction billed separately from aircraft rental.`

#### Discovery flight price (`DiscoveryFlightPriceSection`)

- **Heading:** `Discovery flight.`
- **Price:** `$199`.
- **Duration:** `45–60 minutes`.
- **Deposit:** `No deposit required.`
- **CTA:** `Book a discovery flight` → `/discovery-flight/`.
- Brief bullet list of what's included: pre-flight briefing, hands-on time, post-flight debrief.

#### Financing options (`FinancingOptionsSection`)

- **Heading:** `Financing your training.`
- Mention the partnership with Stratus Financial (per design doc) and link to `/financing/`.
- If `/financing/` is not yet live, render a short note: `Financing details coming soon — call or email to discuss options.`

#### Cancellation/refund policy (`CancellationPolicySection`)

- **Heading:** `Cancellation and refund policy.`
- Display the policy text stored in `src/content/fleet.ts`.
- Example placeholder (to be replaced with exact operations policy): `Discovery flights and rentals can be cancelled or rescheduled with at least 24 hours' notice. No-shows may be charged the full booking amount. Refunds are processed to the original payment method within 5–10 business days.`

#### FAQ (`FleetFAQSection`)

5–8 questions specific to fleet/pricing. Use `FAQAccordion` and emit `FAQPage` JSON-LD.

Suggested questions:

1. What does "wet rate" mean?
2. Can I rent an aircraft for a cross-country trip?
3. Do I need a membership to fly?
4. What is included in the discovery flight?
5. How are instructor hours billed?
6. What is the cancellation policy?
7. Are there any fuel surcharges?

#### Bottom CTA (`FleetCTASection`)

- Primary CTA: `Book a discovery flight` → `/discovery-flight/`.
- Secondary CTA: `Start a membership` → `/membership/`.
- Tertiary: click-to-call phone link.

### 4.4 Schema markup

Render the following JSON-LD on `/fleet/` in addition to the base Organization/LocalBusiness/EducationalOrganization already injected by the root layout.

1. **BreadcrumbList**
   - Item 1: `Home` → `https://hornbillaviation.com/`
   - Item 2: `Fleet & Pricing` → `https://hornbillaviation.com/fleet/`

2. **Service** (for the aircraft rental / flight training service)
   - `@type`: `Service`
   - `name`: `PA28 Aircraft Rental & Flight Training`
   - `provider`: references `/#organization` and `/#localbusiness`
   - `areaServed`: Reno, NV / KRNO
   - `offers`: array of `Offer` objects for:
     - Member PA28 wet rate: `$159.00` / `priceCurrency: USD` / `unitCode: HUR` (per hour)
     - Non-member PA28 wet rate: `$185.00` / `priceCurrency: USD` / `unitCode: HUR`
     - Monthly membership: `$59.00` / `priceCurrency: USD` / `unitCode: MON`
     - Discovery flight: `$199.00` / `priceCurrency: USD`
   - `serviceType`: `Flight Training` / `Aircraft Rental`

3. **FAQPage**
   - Main entity: the FAQ items from `FleetFAQSection`.

4. **AggregateOffer** (optional, if all aircraft share the same member/non-member rates)
   - `lowPrice`: `159.00`
   - `highPrice`: `185.00`
   - `priceCurrency`: `USD`
   - `offers`: individual `Offer` objects per rate.

Do **not** emit `AggregateRating` until real reviews exist.

### 4.5 Internal links

Every page must include 3–5 contextual internal links. On `/fleet/`:

1. `See membership details` → `/membership/`
2. `Book a discovery flight` → `/discovery-flight/`
3. `Cross-country rentals` → `/cross-country-rentals/`
4. `Financing options` → `/financing/` (or `/contact/` if not yet live)
5. `Private Pilot training` → `/programs/private-pilot/` (from FAQ or CTA area)

---

## 5. API/widget/data requirements

### APIs used directly by TICKET-011

None. This is a static marketing page. All data is sourced from `src/content/fleet.ts` and `src/lib/config.ts`.

### Data files to create or modify

| File | Data shape |
|------|------------|
| `src/content/fleet.ts` | Export `aircraft`, `membershipRates`, `instructorRate`, `discoveryFlight`, `financing`, `cancellationPolicy`, `fleetFAQs`. Each aircraft object: `{ tail, engine, avionics, notes, photo, slug, ifrEquipped }`. |
| `src/lib/config.ts` (read-only here) | Pull base URL and NAP for canonical URLs and phone link. |

### Widgets / dynamic features deferred

- Live aircraft availability is **not** on this page. Discovery flight booking links to `/discovery-flight/` (TICKET-003).
- Membership signup is **not** implemented here. The "Start a membership" CTA links to `/membership/` (TICKET-012).
- Financing application flow is handled by the future `/financing/` page or by Stratus Financial's external application link.

### External integrations

- Stratus Financial link/mention only. No API calls.
- Analytics events: track `membership_signup_started` when the membership CTA is clicked, and `discovery_flight_booking_started` when the discovery flight CTA is clicked. Use the data attributes or event helpers established by TICKET-001.

---

## 6. Dependencies on other tickets

### Must be completed first

| Ticket | What this ticket needs from it |
|--------|--------------------------------|
| **TICKET-001** | Site shell, shared components (`Header`, `Footer`, `Container`, `Section`, `PageHeader`, `Button`, `CTALink`, `PhoneLink`, `Card`, `Badge`, `FAQAccordion`, `SchemaInjector`), config (`src/lib/config.ts`), routes (`src/lib/routes.ts`), schema helpers (`src/lib/schema.ts`), metadata helpers (`src/lib/seo.ts`). **Blocking.** |

### Can proceed in parallel, but links may need stubs

| Ticket | Relationship |
|--------|--------------|
| **TICKET-003** | `/discovery-flight/` is the primary conversion target for CTAs on this page. If not live, link to `/discovery-flight/` anyway; the route will resolve once TICKET-003 ships. |
| **TICKET-012** | `/membership/` is the secondary conversion target and shares membership rate data. Define the canonical rates in `src/content/fleet.ts` so both pages stay in sync. |
| **TICKET-004** to **TICKET-010** | Program pages are linked from the FAQ/CTA area. The program data in `src/content/programs.ts` should exist; if not, create minimal stubs here so links render. |
| **TICKET-015** | `/cross-country-rentals/` is linked from IFR-equipped aircraft cards and the FAQ answer about cross-country rentals. |
| **Later financing ticket** | `/financing/` is linked from the financing section. If unavailable, render a placeholder sentence and point to `/contact/`. |

### What depends on this ticket

- **Homepage (`TICKET-002`)** may reuse the pricing snapshot data from `src/content/fleet.ts` instead of duplicating rates.
- **Membership page (`TICKET-012`)** should consume `membershipRates` from `src/content/fleet.ts` to avoid drift.
- **Any future program page** can link to `/fleet/` as the canonical pricing reference.

---

## 7. Verification steps

### 7.1 Build and export verification

1. Run `npm run build` and confirm the `dist/` folder contains `fleet/index.html`.
2. Confirm the static export completed without server-only features.
3. Serve `dist/` locally and navigate to `/fleet/`.

### 7.2 Schema validation

1. Run the generated `/fleet/index.html` through Google Rich Results Test (live or by copying the JSON-LD block).
2. Validate with validator.schema.org in "code snippet" mode.
3. Confirm JSON-LD contains:
   - `Service` with valid `offers` array including member rate, non-member rate, membership, and discovery flight.
   - `BreadcrumbList` with Home and Fleet & Pricing items.
   - `FAQPage` with the fleet-page questions.
4. Confirm no duplicate `@id` values and all absolute URLs use the production base URL from `src/lib/config.ts`.

### 7.3 SEO metadata checks

1. Verify title is exactly `PA28 Fleet & Pricing in Reno, NV | Hornbill Aviation`.
2. Verify meta description is ≤155 chars and contains "PA28", "wet rates", "RNO", and "discovery flights".
3. Verify canonical is self-referencing with trailing slash.
4. Verify the sitemap includes `/fleet/`.
5. Verify `robots.txt` allows `/fleet/`.

### 7.4 Content and copy checks

1. Read every line of copy against the forbidden-phrase list in `brand_identity_writing_style.md`:
   - No "soar", "unlock your potential", "world-class", "premier", "aviation family", "passion for aviation", LLM hedges.
2. Verify all claims are specific: tail numbers, `$159/hr`, `$185/hr`, `$49/month`, `$199`, `RNO`, `PA28`.
3. Verify the H1 is the only H1 on the page and uses sentence case.
4. Verify CTAs are concrete: "Book a discovery flight", "Start a membership", "See membership details".
5. Verify the cancellation/refund policy text has been replaced with the real operations policy, not left as placeholder.
6. Verify the instructor rate has been confirmed or is clearly marked as "confirm with operations" in `src/content/fleet.ts`.

### 7.5 Accessibility and UX checks

1. Run axe-core or Lighthouse accessibility audit; target WCAG 2.2 AA with no critical errors.
2. Verify the membership comparison table uses proper `<table>`, `<thead>`, `<tbody>`, `<th scope="...">` markup.
3. Verify aircraft card images have descriptive alt text including tail number and location: `PA28 Cherokee N6576J on the ramp at Reno-Tahoe International Airport (RNO)`.
4. Verify all images have explicit `width`/`height` and use WebP/AVIF.
5. Verify heading hierarchy: H1 → H2 → H3 → H4 with no skipped levels.
6. Verify mobile layout: cards stack, table scrolls horizontally if needed, CTAs are thumb-reachable.
7. Verify keyboard navigation through the FAQ accordion and CTAs.

### 7.6 Core Web Vitals checks

1. Run Lighthouse on `/fleet/`.
2. Targets:
   - LCP ≤ 2.0 s
   - CLS ≤ 0.1
   - INP ≤ 200 ms (lab estimate)
3. Confirm fleet photos are lazy-loaded below the fold and the hero/header image (if any) uses `fetchpriority="high"`.
4. Confirm no layout shift from the pricing table or aircraft cards.

### 7.7 NAP and local SEO checks

1. Confirm footer NAP matches schema byte-for-byte: `1008 Gentry Way, Reno, NV 89512`, `+1-555-555-1234`, `office@hornbillaviation.com`.
2. Confirm the phone link uses `tel:+15555551234`.
3. Confirm the page includes internal links to `/membership/`, `/discovery-flight/`, `/cross-country-rentals/`, and `/programs/private-pilot/`.

### 7.8 Cross-ticket contract checks

1. Confirm `src/content/fleet.ts` exports stable constants that `TICKET-012` (membership) and `TICKET-002` (homepage pricing snapshot) can import.
2. Confirm `/fleet/` was added to `src/lib/routes.ts` and appears in the header nav, footer quick links, sitemap, and breadcrumb.
3. Confirm `src/lib/schema.ts` exposes a `buildServiceOffer` or equivalent helper for `Offer` arrays.

### 7.9 Manual smoke tests

1. Serve `dist/` and navigate to `/fleet/`.
2. Click every CTA and confirm it lands on the expected route.
3. Verify the membership comparison clearly shows the $26/hr savings.
4. Verify all four aircraft cards display tail, engine, avionics, and notes.
5. Verify the FAQ accordion expands/collapses and each answer is visible.
6. Verify the page looks correct at 320 px, 375 px, 414 px, 768 px, and 1440 px viewports.

---

## 8. Implementation order (suggested)

1. Confirm TICKET-001 is complete and shared components are stable.
2. Add `/fleet/` to `src/lib/routes.ts`.
3. Create `src/content/fleet.ts` with confirmed aircraft data, placeholder instructor rate, and policy text.
4. Collect or create optimized aircraft images in `public/images/fleet/`.
5. Build `FleetPageHeader`, `MembershipComparisonSection`, `AircraftCardsSection`, `InstructorRateSection`, `DiscoveryFlightPriceSection`, `FinancingOptionsSection`, `CancellationPolicySection`, `FleetFAQSection`, and `FleetCTASection`.
6. Compose the sections in `src/app/fleet/page.tsx`, add metadata, and inject JSON-LD.
7. Run the build, fix errors, and execute verification steps.
8. Update ticket status and notify owners of TICKET-002, TICKET-012, and any program-page tickets that `src/content/fleet.ts` is available for reuse.
