---
id: TICKET-016-plan
title: "Implementation plan: Location / RNO page"
ticket: TICKET-016
status: draft
created: 2026-06-18
---

## 1. Scope summary

TICKET-016 builds the public `/location/` page for Hornbill Flight Center. This page has two jobs: help visitors physically find the school at Reno–Tahoe International (KRNO), and capture local-search traffic with exact NAP, geo coordinates, and LocalBusiness + FAQPage schema.

What this ticket produces:

- A statically exported Next.js page at `/location/` (`src/app/location/page.tsx`).
- Page-specific section components covering NAP + map, written directions, parking/airport access, the RNO airspace advantage, and common training routes.
- A reusable `MapEmbed` component that can also be consumed by the footer (TICKET-001) and the Contact page (TICKET-020).
- A static `src/content/location.ts` data file holding address, directions, parking, routes, and FAQ content.
- Page-specific JSON-LD: `BreadcrumbList`, `FAQPage`, and a `LocalBusiness` entity with the exact NAP and geo coordinates (`39.4991, -119.7681`) referenced in the design doc.
- Updates to `src/lib/routes.ts` so Location appears in the header nav, footer, mobile nav, and sitemap.
- Optimized static assets under `public/images/location/`.

This ticket does **not** implement: the booking API/backend, dynamic airport data (METAR/TAF), the full pilot-widgets set, or the Contact page form logic. Those belong to other tickets.

---

## 2. Exact file paths to create or modify

### New page

| File | Purpose |
|------|---------|
| `src/app/location/page.tsx` | The `/location/` route. Composes all sections and injects page metadata + JSON-LD. |

### New page section components

| File | Purpose |
|------|---------|
| `src/sections/location/LocationPageHeader.tsx` | `PageHeader` composition for this page: breadcrumb, H1, subtitle. |
| `src/sections/location/NAPAndMapSection.tsx` | Address card, hours, phone/email CTAs, and map embed. |
| `src/sections/location/DirectionsSection.tsx` | Written driving directions from I-80 / US-395 / downtown Reno and a step list. |
| `src/sections/location/ParkingAndAccessSection.tsx` | FBO access, parking instructions, how to meet your instructor, gate/escort notes. |
| `src/sections/location/AirspaceSection.tsx` | Why KRNO airspace matters: Class C, 4,403 ft elevation, density altitude, mountain flying tie-in. |
| `src/sections/location/RoutesSection.tsx` | Common training routes table/cards: RNO → KRTS, KMLC, KTVL, with altitudes and learning objectives. |
| `src/sections/location/LocationCTASection.tsx` | Bottom conversion block: "Book a discovery flight" + contact links. |

### New shared components introduced by this ticket

| File | Purpose |
|------|---------|
| `src/components/MapEmbed.tsx` | Responsive, accessible map embed (Google Maps iframe with title + lazy loading, plus a no-API static fallback). Used here, in `Footer`, and on `/contact/`. |
| `src/components/RouteCard.tsx` | Small reusable card for a training route: origin, destination, distance, purpose, link. |
| `src/components/NAPCard.tsx` | Reusable address/phone/email/hours block used on Location and Contact pages. |

### New/modified data and content files

| File | Purpose |
|------|---------|
| `src/content/location.ts` | Static data: NAP, hours placeholder, map URL, directions steps, parking notes, airspace bullets, training routes, FAQ pairs. |
| `src/lib/routes.ts` | Add `location: { path: '/location/', label: 'Location', published: true, nav: true, footer: true }` to the route map and include it in the main nav + footer arrays. |

### Static assets (to create or copy from `/images/`)

| File | Purpose |
|------|---------|
| `public/images/location/rno-ramp-hero.webp` | Hero/above-the-fold photo of a Hornbill PA28 on the RNO ramp. Use real aircraft photography; fall back to an approved ramp shot if a Hornbill-specific photo is not yet available. |
| `public/images/location/practice-area-map.svg` | Static SVG map of common training areas and nearby airports. |
| `public/images/location/directions-thumb.jpg` | Optional thumbnail for social sharing / OpenGraph for this page. |

### Files to leave untouched but depend on

- `src/app/layout.tsx` (TICKET-001) — provides global fonts, metadata defaults, header, footer, and base Organization/WebSite schema.
- `src/lib/seo.ts` (TICKET-001) — metadata helpers.
- `src/lib/schema.ts` (TICKET-001) — JSON-LD builders for `BreadcrumbList`, `FAQPage`, `LocalBusiness`, `PostalAddress`, `GeoCoordinates`.
- `src/components/SchemaInjector.tsx` (TICKET-001) — renders JSON-LD.

---

## 3. Reusable components to use from TICKET-001 (and other tickets)

### From TICKET-001 (required)

- `app/layout.tsx` — wraps the page with header/footer and global metadata.
- `Header` / `MobileNav` — Location is added to `routes.ts`, so nav updates automatically.
- `Footer` — reuses the same `NAPCard`/`MapEmbed` data; footer NAP must remain byte-for-byte identical.
- `Container`, `Section`, `PageHeader` — layout primitives.
- `Button`, `CTALink`, `PhoneLink` — conversion and click-to-call links.
- `SchemaInjector` + `src/lib/schema.ts` — page-specific JSON-LD.
- `FAQAccordion` — renders the FAQ section and emits `FAQPage` schema when given an `id` and FAQ data.
- `NavLink` — for internal footer/header links if needed.

### Introduced by this ticket for reuse

- `MapEmbed` — used by footer and Contact page.
- `NAPCard` — used by Contact page.
- `RouteCard` — may be reused by the Mountain Flying program page (TICKET-010) or Student Resources (TICKET-026).

### From other tickets (soft / content links only)

- `DiscoveryFlightTeaser` or `CTALink` from TICKET-003 — CTA destination `/discovery-flight/`.
- Program page link to `/programs/mountain-flying/` (TICKET-010).
- Link to `/fleet/` (TICKET-011).
- Link to `/contact/` (TICKET-020).

---

## 4. Page content/structure, schema markup, and SEO metadata

### 4.1 URL, title, meta, canonical, OpenGraph

| Element | Value |
|---------|-------|
| URL | `/location/` (trailing slash canonical) |
| Title | `Location & Directions — Reno–Tahoe (RNO) \| Hornbill Flight Center` |
| Meta description | `Visit Hornbill Flight Center at KRNO. Directions, parking, and airport access for our Reno, NV flight school. Book a discovery flight or call 555-555-1234.` |
| Canonical | `https://hornbillaviation.com/location/` |
| H1 | `Find us at Reno–Tahoe (RNO).` |
| Subheadline | `We're a Part 61 flight school at KRNO, minutes from downtown Reno. Here's how to visit, park, and start training.` |
| og:title | Same as title |
| og:description | Same as meta description |
| og:image | `/images/location/directions-thumb.jpg` (or fallback to `/opengraph-default.jpg`) |
| og:type | `website` |

Title/description should be produced with `buildTitle`, `buildCanonical`, and `buildOpenGraph` from `src/lib/seo.ts`.

### 4.2 Content sections (in order)

1. **LocationPageHeader**
   - Breadcrumb: `Home > Location`.
   - H1: `Find us at Reno–Tahoe (RNO).`
   - Subtitle: `We're a Part 61 flight school at KRNO, minutes from downtown Reno. Here's how to visit, park, and start training.`
   - Quick CTA row: `Call 555-555-1234`, `Get directions`, `Book a discovery flight`.

2. **NAPAndMapSection**
   - Left column: `NAPCard` with:
     - Address: `1008 Gentry Way, Reno, NV 89512`
     - Phone: `555-555-1234` (linked `tel:+15555551234`)
     - Email: `office@hornbillaviation.com` (linked `mailto:`)
     - Office hours placeholder: `Mon–Fri: 8:00 AM – 6:00 PM; Sat–Sun: 8:00 AM – 4:00 PM` (flag with `// TODO: data ticket` until owner confirms)
     - CTA button: `Book a discovery flight` → `/discovery-flight/`
   - Right column: `MapEmbed` showing KRNO / the FBO location with geo coordinates `39.4991, -119.7681`.

3. **DirectionsSection**
   - H2: `Driving directions`
   - Three origin routes:
     - From I-80 east/west
     - From US-395 / Carson City or Sparks
     - From downtown Reno
   - Each route is an ordered list with concrete steps. Steps are placeholders until owner/FBO confirms; mark with `// TODO: data ticket`.
   - Example placeholder structure (not final copy):
     - "From I-80, take Exit 16 for US-395 N. Continue to E Plumb Ln and follow signs for general aviation / Atlantic Aviation."
   - Link text: `Open in Google Maps`.

4. **ParkingAndAccessSection**
   - H2: `Parking and airport access`
   - Bullets:
     - Visitor parking location.
     - Check-in at the FBO front desk.
     - How we meet you on the ramp.
     - Gate/escort procedures and what to bring (driver's license for airport access if required).
   - Include a `// TODO: data ticket` note to verify exact FBO, gate codes, and escort policy.

5. **AirspaceSection**
   - H2: `Why training at RNO matters`
   - Content blocks:
     - **Class C airspace intro:** RNO sits inside Reno–Tahoe Class C. Students learn real ATC communications from the first lesson.
     - **Elevation and density altitude:** Field elevation 4,403 ft MSL. Summer afternoons mean high density altitude; students learn performance planning early. Link to blog post `/blog/density-altitude-krno/` and the Mountain Flying program `/programs/mountain-flying/`.
     - **Nearby airports and practice areas:** KRTS (Reno Stead), KMLC, KLOL, KSPZ. Use the practice-area map SVG.
     - **Mountain flying tie-in:** Link to `/programs/mountain-flying/`.

6. **RoutesSection**
   - H2: `Common training routes`
   - Three `RouteCard` components:
     - **RNO → KRTS** — pattern work, uncontrolled-field procedures.
     - **RNO → KMLC** — short-field / high-elevation landing practice.
     - **RNO → KTVL (Lake Tahoe)** — mountain flying introduction; link to `/programs/mountain-flying/`.
   - Each card shows approx. distance, typical altitude block, and one learning objective.
   - Link to `/cross-country-rentals/` (TICKET-015) for longer trips.

7. **FAQ section (`FAQAccordion`)**
   - H2: `Location questions`
   - Questions (examples; finalize in `src/content/location.ts`):
     - Where exactly is Hornbill Flight Center located?
     - How do I get to the ramp from the terminal?
     - Where do I park?
     - What should I bring to my first lesson?
     - Is the school inside Class C airspace?
     - What is density altitude, and why does it matter at RNO?
   - Must emit `FAQPage` schema.

8. **LocationCTASection**
   - H2: `Ready to visit?`
   - Copy: `The easiest way to see the school is a discovery flight. Or call, text, or email us and we'll walk you through parking and access.`
   - Primary CTA: `Book a discovery flight` → `/discovery-flight/`
   - Secondary CTA: `Contact us` → `/contact/`

### 4.3 Schema markup

Page-specific JSON-LD (in addition to whatever Organization/WebSite schema the root layout emits from TICKET-001):

1. **LocalBusiness** (if not already emitted globally; otherwise extend the global entity)
   - `@id`: `https://hornbillaviation.com/location/#localbusiness`
   - `@type`: `["LocalBusiness", "EducationalOrganization"]`
   - `name`: `Hornbill Flight Center`
   - `image`: `https://hornbillaviation.com/images/location/rno-ramp-hero.webp`
   - `url`: `https://hornbillaviation.com/location/`
   - `telephone`: `+1-555-555-1234`
   - `email`: `office@hornbillaviation.com`
   - `priceRange`: `$$`
   - `address` (`PostalAddress`):
     - `@type`: `PostalAddress`
     - `streetAddress`: `1008 Gentry Way`
     - `addressLocality`: `Reno`
     - `addressRegion`: `NV`
     - `postalCode`: `89512`
     - `addressCountry`: `US`
   - `geo` (`GeoCoordinates`):
     - `latitude`: `39.4991`
     - `longitude`: `-119.7681`
   - `hasMap`: `https://www.google.com/maps/search/?api=1&query=39.4991,-119.7681`
   - `openingHoursSpecification`: placeholder hours array (TODO data ticket)
   - `areaServed`: `{ @type: "City", name: "Reno", containedIn: { @type: "State", name: "Nevada" } }`

2. **BreadcrumbList**
   - Item 1: `Home` → `/`
   - Item 2: `Location` → `/location/`

3. **FAQPage**
   - Injected by `FAQAccordion` using the FAQ data in `src/content/location.ts`.

4. **Optional: HowTo** for driving directions
   - If implemented, use it for the written directions block so Google can surface step-by-step directions. Defer if schema surface becomes too complex.

### 4.4 Heading hierarchy and accessibility

- One H1 only (`LocationPageHeader`).
- Each section title is an H2.
- Card titles and route names are H3.
- Map iframe must have a descriptive `title` attribute, e.g., "Map of Hornbill Flight Center at Reno–Tahoe International Airport".
- Phone and email links use proper `tel:` and `mailto:` schemes with visible text.
- Color contrast must pass WCAG 2.2 AA: `ink` on `cream-50`, `white` on `navy-900`, `gold-500` only for large buttons/icons on light backgrounds.

---

## 5. API/widget/data requirements

### APIs / external services

- **Google Maps Embed API** (or equivalent iframe source). If an API key is not available, implement a no-API fallback:
  - Static OpenStreetMap or Google Maps static image linked to the live Google Maps search URL.
  - Lazy-load the iframe so it does not block LCP.
- No custom backend API is required for this page.

### Data needed from the owner / operations team

The following details must be confirmed and updated in `src/content/location.ts` before launch:

1. Exact FBO name and address (is it Atlantic Aviation, Signature, or another FBO at KRNO?).
2. Verified driving directions from I-80, US-395, and downtown Reno.
3. Visitor parking instructions and any gate/escort requirements.
4. Office hours (weekday and weekend).
5. Whether students/guests need an escort badge or driver's license for ramp access.
6. Confirmation of the geo coordinates and NAP byte-for-byte consistency with GBP and citations.
7. Preferred common training routes and altitude blocks (KRTS, KMLC, KTVL, etc.).

Until confirmed, use placeholder values marked with `// TODO: data ticket` and do not block development.

### Static assets

- Real RNO ramp photo of a Hornbill PA28.
- Practice-area SVG map (labels: practice area, KRTS, KMLC, KLOL, KSPZ, Class C boundary, Sierra ridge).
- Optional: FBO/parking diagram if available.

---

## 6. Dependencies on other tickets

### Hard dependencies (must be done first)

- **TICKET-001: Site shell, shared components, and global SEO setup**
  - Provides `app/layout.tsx`, `Header`, `Footer`, `Container`, `Section`, `PageHeader`, `Button`, `CTALink`, `PhoneLink`, `SchemaInjector`, `FAQAccordion`, `src/lib/routes.ts`, `src/lib/seo.ts`, and `src/lib/schema.ts`.
  - The Location route must be added to `routes.ts` as part of this ticket, but only after TICKET-001 has created the routes file and nav/footer arrays.

### Soft dependencies (content links; not build-blocking)

| Ticket | Why it matters | Fallback if not ready |
|--------|----------------|-----------------------|
| TICKET-010: Mountain Flying program page | Internal link to `/programs/mountain-flying/` | Link still points to URL; 404 gracefully or hide card until published |
| TICKET-011: Fleet & Pricing page | Internal link to `/fleet/` | Link still points to URL |
| TICKET-015: Cross-Country / Rentals page | Link to `/cross-country-rentals/` for longer trips | Omit link or link to `/fleet/` |
| TICKET-020: Contact page | Link to `/contact/` | Link still points to URL |
| TICKET-003: Discovery Flight landing page | Primary CTA destination `/discovery-flight/` | Critical path; should be complete before Location page goes live, but regular `<a>` link will not break the build |
| TICKET-022: Blog launch content | Link to `/blog/density-altitude-krno/` | Omit link until post exists |

### Optional dependencies

- TICKET-023 (Pilot tools / widgets): If density-altitude or METAR widgets exist before launch, link/embed them from the AirspaceSection. Not required.
- TICKET-028 (Analytics): Add the same conversion data attributes used elsewhere (e.g., `data-analytics="phone_click"` on `PhoneLink`).

---

## 7. Verification steps

### 7.1 Build and export verification

1. Run `npm install` and `npm run build`.
2. Confirm `dist/location/index.html` is generated.
3. Confirm `dist/sitemap.xml` includes `https://hornbillaviation.com/location/`.
4. Confirm no Next.js server-only features are used in `src/app/location/` (no API routes, no `headers()`/`cookies()`, no `revalidate`).

### 7.2 Schema validation

1. Copy the rendered `/location/index.html` source and run it through:
   - Google Rich Results Test
   - Schema.org validator
2. Confirm JSON-LD contains:
   - `LocalBusiness` with geo coordinates `39.4991, -119.7681`.
   - `PostalAddress` with `1008 Gentry Way, Reno, NV 89512`.
   - `telephone`: `+1-555-555-1234` and `email`: `office@hornbillaviation.com`.
   - `BreadcrumbList` with Home and Location items.
   - `FAQPage` with the location FAQ questions.
3. Ensure NAP is byte-for-byte identical across:
   - The page body
   - The footer (TICKET-001)
   - `src/lib/config.ts`
   - `src/content/location.ts`
   - All JSON-LD scripts

### 7.3 SEO and metadata checks

1. Title tag must be exactly: `Location & Directions — Reno–Tahoe (RNO) | Hornbill Flight Center`.
2. Meta description must be ≤ 155 characters and include "Reno," "RNO," "directions," and "parking".
3. Canonical must be `https://hornbillaviation.com/location/` (trailing slash).
4. OpenGraph image must resolve and be 1200×630 or close.
5. Heading hierarchy: exactly one H1, no skipped H2/H3 levels.

### 7.4 Accessibility and UX checks

1. Run axe-core or Lighthouse; target WCAG 2.2 AA with no critical errors.
2. Map iframe has a non-empty `title` attribute.
3. Phone/email links are keyboard-focusable and have visible focus states.
4. Touch targets for CTAs and nav links are ≥ 44 px.
5. Directions text is readable on mobile without horizontal scrolling.
6. Practice-area SVG map has screen-reader fallback text or `aria-label`.

### 7.5 Core Web Vitals checks

1. Run Lighthouse on `/location/`:
   - LCP ≤ 2.0 s
   - CLS ≤ 0.1
   - INP estimate ≤ 200 ms
2. Hero image has explicit `width`/`height` and uses WebP/AVIF.
3. Map iframe is lazy-loaded and wrapped in an aspect-ratio container to prevent layout shift.
4. No render-blocking third-party scripts in the `<head>` of this page.

### 7.6 Content and brand-voice checks

1. Review all copy against the forbidden-phrase list in `brand_identity_writing_style.md`:
   - No "unlock your potential," "soar to new heights," "sky's the limit," "world-class," "passion for aviation," "it's important to note," "at the end of the day," "ultimately."
2. Confirm claims are specific: RNO, KRNO, PA28, Part 61, 4,403 ft, $159/hr member rate, $199 discovery flight.
3. Confirm CTAs begin with a verb: "Book," "Call," "Get directions," "Contact us."
4. Confirm all `// TODO: data ticket` placeholders for directions/parking/hours are tracked in a follow-up ticket.

### 7.7 Manual smoke tests

1. Serve `dist/` locally (`npx serve@latest dist`).
2. Navigate to `/location/`.
3. Click the phone link: confirm `tel:+15555551234`.
4. Click the email link: confirm `mailto:office@hornbillaviation.com`.
5. Click "Get directions": confirm it opens the correct map query.
6. Click "Book a discovery flight": confirm it navigates to `/discovery-flight/`.
7. Resize viewport to 320 px, 375 px, 414 px; confirm map, NAP card, and CTAs are usable.
8. Verify footer NAP matches the page body exactly.

---

## 8. Implementation order (suggested)

1. Confirm TICKET-001 is complete and `routes.ts` exists.
2. Add the Location route to `routes.ts` and update nav/footer arrays.
3. Create `src/content/location.ts` with placeholder data (mark TODOs).
4. Create `MapEmbed`, `NAPCard`, and `RouteCard` shared components.
5. Build the Location page and section components.
6. Add page-specific metadata and JSON-LD in `page.tsx`.
7. Optimize and copy static assets to `public/images/location/`.
8. Run build, schema validation, Lighthouse, and manual smoke tests.
9. Create a follow-up data ticket to replace placeholder directions, parking, and hours with owner-verified facts.
