---
repository: hornbill-flying
ticket: TICKET-012
title: Membership page
author: Claude Code
status: draft
created: 2026-06-18
related_tickets:
  - TICKET-001
  - TICKET-003
  - TICKET-011
  - TICKET-024
  - TICKET-028
related_design:
  - thoughts/shared/design/website_layout_design.md
  - thoughts/shared/design/brand_identity_writing_style.md
  - thoughts/shared/design/visual_identity.md
---

# TICKET-012 — Membership Page Implementation Plan

## 1. Scope summary

Build the public Membership page at `/membership/`. The page has one primary conversion job: persuade a visitor that the $59/month membership is worth the savings and convenience, then drive them into the membership sign-up flow. It must explain the member vs. non-member PA28 wet-rate difference (`$159/hr` vs. `$185/hr`), list the full benefits, answer common objections in an FAQ accordion, and provide a clear "Start membership" call-to-action.

This ticket produces only the Membership page and the small shared data/components it needs. It does **not** implement the booking backend, the global shell, the Fleet & Pricing page, the Discovery Flight page, or analytics instrumentation. It consumes those from other tickets or defines the data contract for them.

**Out of scope**
- Discovery-flight or membership booking widget logic (handled by TICKET-003 and TICKET-024)
- Global header/footer/layout (TICKET-001)
- Fleet & Pricing detail page (TICKET-011)
- Analytics events plumbing (TICKET-028)

---

## 2. Exact file paths to create or modify

Assume a Next.js 14+ App Router project configured for static export, with a `src/` directory. The project root is `/Users/jack/hornbill-flying/`.

### Files to create

| File | Purpose |
|------|---------|
| `src/app/membership/page.tsx` | The `/membership/` route component composing all page sections and page-level metadata/schema. |
| `src/components/membership/MembershipHero.tsx` | Above-the-fold block with H1, design headline, value prop, and primary/secondary CTAs. |
| `src/components/membership/MembershipPricingCard.tsx` | Pricing card: monthly membership, member wet rate, non-member wet rate, savings note, break-even note. |
| `src/components/membership/MembershipBenefits.tsx` | Checklist of membership benefits with icons. |
| `src/components/membership/MembershipSignupCTA.tsx` | Standalone conversion block with "Start membership" CTA and short trust copy. |
| `src/components/membership/MembershipFAQ.tsx` | FAQ accordion + FAQPage schema for the membership page. |
| `src/content/pricing.ts` | Shared pricing constants (`membershipMonthly`, `memberWetRate`, `nonMemberWetRate`, `discoveryFlight`, etc.) used here and by TICKET-011. |
| `src/content/membership.ts` | Page-specific content: headline, benefits array, savings copy, FAQ items, CTA target. |
| `src/lib/schema/membership.ts` | Reusable JSON-LD builder for the membership `Service`/`Product`/`Offer` schema. |
| `public/images/membership/membership-hero.webp` | Hero image for the membership page (PA28 on the RNO ramp or relevant lifestyle shot). WebP/AVIF, optimized, with explicit dimensions. |

### Files to modify (created by other tickets)

| File | Change |
|------|--------|
| `src/lib/routes.ts` | Add the `/membership/` route entry so the header, footer, sitemap, and breadcrumbs can reference it. |
| `src/app/sitemap.ts` (or `next-sitemap.config.js`) | Include `/membership/` in the generated sitemap with `changefreq: monthly` and `priority: 0.8`. |
| `src/content/site.ts` (TICKET-001) | Ensure brand/NAP data is importable; add any new fields needed by the membership schema builder. |

---

## 3. Reusable components to use from TICKET-001 (shell) and other tickets

### From TICKET-001 — must be ready first

| Component / utility | Path | Usage on the Membership page |
|---------------------|------|------------------------------|
| `RootLayout` | `src/app/layout.tsx` | Wraps the page; provides fonts, global metadata template, header, footer, and base schema. |
| `Header` | `src/components/layout/Header.tsx` | Sticky header with programs dropdown, persistent "Book a discovery flight" CTA, phone link, and Membership nav link. |
| `Footer` | `src/components/layout/Footer.tsx` | NAP, quick links, legal links. |
| `MobileNav` / `MobileCTABar` | `src/components/layout/MobileNav.tsx`, `MobileCTABar.tsx` | Mobile navigation and sticky CTA. |
| `Container` | `src/components/ui/Container.tsx` | Max-width wrapper. |
| `Section` | `src/components/ui/Section.tsx` | Vertical rhythm wrapper with background-color variants. |
| `PageHeader` | `src/components/ui/PageHeader.tsx` | Breadcrumb + H1 + optional subtitle, if available. |
| `Button` | `src/components/ui/Button.tsx` | Primary/secondary/tertiary CTAs. |
| `CTALink` | `src/components/ui/CTALink.tsx` | Reusable "Book a discovery flight" / "Start membership" link component. |
| `PhoneLink` | `src/components/ui/PhoneLink.tsx` | Click-to-call phone link. |
| `JsonLd` / `SchemaInjector` | `src/components/seo/JsonLd.tsx` | Renders `<script type="application/ld+json">` safely. |
| `BreadcrumbSchema` / `Breadcrumb` | `src/components/seo/BreadcrumbSchema.tsx` or `src/components/ui/Breadcrumb.tsx` | Renders the Home > Membership breadcrumb and schema. |
| `FAQAccordion` | `src/components/FAQAccordion.tsx` | Accessible disclosure accordion used for the FAQ section. |
| `metadata` helper | `src/lib/seo.ts` | Builds title, description, OpenGraph, canonical, Twitter card. |
| `site` config | `src/content/site.ts` | NAP, brand name, URLs, geo coordinates. |
| `schema` helpers | `src/lib/schema.ts` | Builders for Organization, LocalBusiness, EducationalOrganization, BreadcrumbList, FAQPage. |

### From other tickets — reuse when available

| Source ticket | Reusable asset | Membership-page usage |
|---------------|----------------|-----------------------|
| TICKET-011 (Fleet & Pricing) | `src/content/pricing.ts` or `PricingTable` component | Shared aircraft and membership rates. If not ready, create `src/content/pricing.ts` in this ticket and let TICKET-011 extend it later. |
| TICKET-003 (Discovery Flight) | `DiscoveryFlightCTA` component or `/discovery-flight/` route | Secondary "Book a discovery flight" links and the primary CTA fallback if `/book/` is not ready. |
| TICKET-024 (Booking app entry) | `/book/` route and booking widget | Primary "Start membership" CTA deep-links to `/book/?flow=membership`. |
| TICKET-028 (Analytics) | `trackEvent()` helper or data attributes | Fire `membership_signup_started` on CTA click and `membership_signup_completed` if the booking app confirms. |

### Components this ticket may introduce for reuse

- `MembershipPricingCard` — a focused rate card that can be adapted for other pricing pages.
- `MembershipBenefits` — a generic benefits checklist that other pages may reuse.
- `src/content/pricing.ts` — canonical rate constants for the whole site.

---

## 4. Page content/structure, schema markup, and SEO metadata

### Page URL and metadata

- **URL:** `/membership/`
- **Canonical:** `https://hornbillaviation.com/membership/`
- **Title tag:** `PA28 Aircraft Rental Membership in Reno, NV | Hornbill Flight Center`
- **Meta description:** `Join Hornbill's $59/month membership for a $159/hr PA28 wet rate at RNO. Save $26/hr vs. the $185 non-member rate. No contract.` (≤155 characters)
- **OpenGraph:** same title/description; image uses `public/images/membership/membership-hero.webp` or the default OG image from TICKET-001.
- **Twitter card:** `summary_large_image`.

### Heading hierarchy

- One H1 only: `Aircraft rental membership in Reno, NV`
- H2s for each major section
- H3s for sub-sections (e.g., pricing-card labels, FAQ questions rendered as button text)
- No skipped heading levels.

**Note on the design headline:** The design doc specifies the headline *"Fly more for less. Stay in the air without the markup."* Use it as the large, visually prominent subheadline under the H1 to match the design intent while preserving the SEO-focused H1.

### Page sections and content

1. **Hero (`MembershipHero`)**
   - H1: `Aircraft rental membership in Reno, NV`
   - Subheadline (design headline): `Fly more for less. Stay in the air without the markup.`
   - One-line value prop: `Pay $59 a month and fly the same PA28 fleet for $159/hr wet — instead of $185/hr.`
   - Primary CTA: `Start membership` → `/book/?flow=membership` (fallback to `/discovery-flight/` if `/book/` is not ready)
   - Secondary CTA: `See full fleet and rates` → `/fleet/`
   - Hero image: `public/images/membership/membership-hero.webp` with explicit width/height, `fetchpriority="high"`, `loading="eager"`, alt text per brand guide (e.g., `Hornbill PA28 Cherokee on the ramp at Reno-Tahoe International Airport (RNO)`).

2. **Quick answer box**
   - 50–70 word direct answer: what the Hornbill membership is, what it costs, and who it benefits.
   - Example: `Hornbill's membership is a $59/month subscription for pilots training or renting at Reno–Tahoe. Members pay $159/hr wet for our PA28 fleet, saving $26/hr over the non-member rate. There is no contract, and it includes priority scheduling, unlimited ground school, and cross-country rental eligibility.`

3. **Pricing card (`MembershipPricingCard`)**
   - **Monthly membership:** `$59/month`
   - **Member PA28 wet rate:** `$159/hr`
   - **Non-member PA28 wet rate:** `$185/hr`
   - **Savings:** `$26/hr`
   - **Break-even note:** `At just over 2 hours per month, the membership pays for itself.`
   - Include a short disclaimer that rates are subject to change and rental availability depends on maintenance/schedule.

4. **Benefits list (`MembershipBenefits`)**
   - Discounted PA28 wet rate
   - Priority scheduling
   - Unlimited ground school access
   - 12-hour cancellation window
   - Cross-country rental eligibility
   - No long-term contract

5. **Membership CTA section (`MembershipSignupCTA`)**
   - Headline: `Start flying for less this month.`
   - Supporting copy: `No contract. Cancel anytime. Sign up online and the member rate applies to your next flight.`
   - Primary CTA: `Start membership` → `/book/?flow=membership`
   - Secondary link: `Questions? Call or text us` using the `PhoneLink` component.

6. **FAQ accordion (`MembershipFAQ`)**
   - 5–7 questions. Suggested list:
     1. What is included in the $59/month membership?
     2. How much do I save per flight hour?
     3. Is there a contract or minimum commitment?
     4. Can non-members still rent aircraft?
     5. Does the membership include instructor fees?
     6. Can I use the member rate for cross-country rentals?
     7. How do I cancel or change my membership?
   - Each answer is concise, factual, and references `/fleet/` or `/discovery-flight/` where relevant.

7. **Breadcrumb**
   - Home > Membership

8. **Internal links**
   - `/fleet/` — "See full fleet and rates"
   - `/discovery-flight/` — "Book a discovery flight"
   - `/book/?flow=membership` — "Start membership"
   - `/contact/` — "Contact us" (for questions)

### Schema markup

Embed the following JSON-LD in `<head>` via `JsonLd`/`SchemaInjector`:

1. **Organization** / **LocalBusiness** / **EducationalOrganization** — base schema from TICKET-001, referenced by `@id`.
2. **BreadcrumbList** — Home > Membership.
3. **FAQPage** — mirrors the FAQ accordion questions/answers.
4. **Service** + **Offer** for the membership:
   - `@type`: `Service`
   - `name`: `PA28 Aircraft Rental Membership`
   - `provider`: reference to the base `LocalBusiness` `@id`
   - `areaServed`: Reno, NV
   - `description`: brief value prop
   - `offers`:
     - `@type`: `Offer`
     - `name`: `Monthly Membership`
     - `price`: `59`
     - `priceCurrency`: `USD`
     - `priceValidUntil`: optional (e.g., end of current year)
     - `availability`: `https://schema.org/InStock`

5. (Optional) **Product** schema for the membership as a subscription-like product; only add if it does not conflict with the Service schema.

---

## 5. API/widget/data requirements

### APIs

This page is static and requires no runtime API calls for its primary content. However, it connects to the booking layer through the CTA.

- **Booking API** — the "Start membership" CTA needs a destination that can create a membership signup:
  - Preferred: deep-link to `/book/?flow=membership` and let the booking app entry page (TICKET-024) handle the signup form/payment.
  - Fallback: link to `/discovery-flight/` or `/contact/` if the booking app is not ready.
  - If the backend needs a dedicated endpoint, coordinate with the booking ticket to add `POST /api/memberships` or extend `POST /api/bookings` with `product: membership`.

### Widgets

- No mandatory widgets on the Membership page.
- Optional future enhancement: a small client-side savings calculator (hours/month input → savings output) can be added by a later tools ticket without changing the page structure.

### Data files

| File | Data |
|------|------|
| `src/content/pricing.ts` | Canonical rates: `membershipMonthly: 59`, `memberWetRate: 159`, `nonMemberWetRate: 185`, `discoveryFlight: 199`, plus currency and last-updated date. |
| `src/content/membership.ts` | Page copy: H1, subheadline, value prop, benefits array, savings copy, CTA label/href, FAQ question/answer pairs. |
| `src/lib/schema/membership.ts` | Builder function that takes the membership data and returns a `Service`/`Offer` JSON-LD object. |

---

## 6. Dependencies on other tickets

| Ticket | Why it blocks or is required |
|--------|------------------------------|
| **TICKET-001** (Site shell) | **Hard prerequisite.** Provides `layout.tsx`, header, footer, fonts, theme, metadata helpers, base schema, `site.ts`, and the route/sitemap conventions. Do not start TICKET-012 until TICKET-001 is merged. |
| **TICKET-024** (Booking app entry) | **Medium/soft prerequisite.** The primary CTA should link to `/book/?flow=membership`. If `/book/` is not ready, the CTA can temporarily point to `/discovery-flight/` or `/contact/` and be updated later. |
| **TICKET-011** (Fleet & Pricing) | **Soft prerequisite.** The page links to `/fleet/` and should share the same rate constants. Create `src/content/pricing.ts` in this ticket if it does not exist; TICKET-011 will adopt/extend it. |
| **TICKET-003** (Discovery Flight) | **Soft prerequisite.** Secondary CTAs and FAQ answers link to `/discovery-flight/`. The link can resolve to a placeholder until TICKET-003 ships. |
| **TICKET-028** (Analytics) | **Soft prerequisite.** The CTA should carry a `data-event="membership_signup_started"` attribute so analytics instrumentation can fire the event when TICKET-028 lands. |

**Execution order:**

1. Merge TICKET-001.
2. Create the membership page, content files, and pricing data file using the design doc rates.
3. If `/book/` is ready (TICKET-024), point the primary CTA there; otherwise point to `/discovery-flight/` or `/contact/`.
4. Merge alongside or after TICKET-011 so rate consistency can be verified.

---

## 7. Verification steps

### Automated / local checks

- [ ] Run `next build` and confirm the static export completes with no errors.
- [ ] Confirm `dist/membership/index.html` exists.
- [ ] Run `npm run lint` and resolve all lint errors.
- [ ] Run TypeScript check (`tsc --noEmit`) and resolve all type errors.
- [ ] Validate heading hierarchy with axe-core or Lighthouse: exactly one H1, logical H2→H3 order, no skipped levels.
- [ ] Run a link checker against `dist/` and confirm these resolve:
  - `/`
  - `/fleet/`
  - `/discovery-flight/`
  - `/book/?flow=membership` (or the chosen CTA destination)
  - `/contact/`
- [ ] Run Lighthouse: target Performance ≥ 90, LCP ≤ 2.0s, CLS ≤ 0.1.

### SEO / schema validation

- [ ] Confirm the title tag is exactly: `PA28 Aircraft Rental Membership in Reno, NV | Hornbill Flight Center`.
- [ ] Confirm the meta description is ≤ 155 characters and includes "Reno," "$59," "$159," "PA28."
- [ ] Confirm the canonical tag is self-referencing: `https://hornbillaviation.com/membership/`.
- [ ] Confirm OpenGraph tags use the page title, description, URL, and image.
- [ ] Validate the page in Google's Rich Results Test and confirm:
  - `FAQPage` schema is detected.
  - `BreadcrumbList` schema is detected.
  - `Service` + `Offer` schema is detected.
  - No critical errors or warnings.
- [ ] Validate JSON-LD with the Schema.org validator; no duplicate `@id` values.
- [ ] Confirm NAP in the base schema matches the footer and `site.ts` byte-for-byte:
  - `1008 Gentry Way, Reno, NV 89512`
  - `555-555-1234`
  - `office@hornbillaviation.com`
- [ ] Confirm geo coordinates `39.4991, -119.7681` are present in the base `LocalBusiness` schema.

### Conversion / UX checks

- [ ] The H1 text is exactly: `Aircraft rental membership in Reno, NV`.
- [ ] The design headline *"Fly more for less. Stay in the air without the markup."* is visible under the H1.
- [ ] The pricing card clearly shows `$59/month`, `$159/hr` member rate, `$185/hr` non-member rate, and the `$26/hr` savings note.
- [ ] The benefits list includes all six items from the design doc.
- [ ] The "Start membership" CTA is visible above the fold on desktop and in the sticky mobile bar/header.
- [ ] The "Start membership" CTA links to `/book/?flow=membership` (or the agreed fallback).
- [ ] Phone number is tappable on mobile and triggers click-to-call.
- [ ] Internal links use descriptive text ("See full fleet and rates", "Book a discovery flight"), not "Click here".

### Accessibility checks

- [ ] WCAG 2.2 AA audit: color contrast, keyboard navigation, focus indicators.
- [ ] FAQ accordion buttons have `aria-expanded`, `aria-controls`, and keyboard-operable disclosure.
- [ ] Hero image has descriptive alt text including location and aircraft.
- [ ] All interactive elements have ≥ 44 px touch targets on mobile.
- [ ] Focus order moves logically through hero, pricing card, benefits, CTA, and FAQ.

### Brand voice / copy checks

- [ ] Review copy against `brand_identity_writing_style.md`:
  - No clichés: "passion for aviation," "soar to new heights," "unlock your potential."
  - No LLM hedges: "it's important to note," "in today's world," "at the end of the day."
  - Specific numbers and names used ($59, $159, $185, PA28, RNO).
  - CTAs begin with a verb: "Start," "See," "Book."
- [ ] Ensure the page does not sound punitive toward non-members; present the non-member rate as a transparent alternative.

### Sign-off checklist

- [ ] Page builds and exports to `/membership/index.html`.
- [ ] Exactly one H1, sequential headings.
- [ ] Title, meta description, canonical, and OG tags present and correct.
- [ ] FAQPage + BreadcrumbList + Service/Offer JSON-LD present and validated by Rich Results Test.
- [ ] All internal links reachable.
- [ ] Mobile layout tested on iPhone SE and iPhone Pro sizes.
- [ ] Brand voice checklist passed.
- [ ] Rate constants in `src/content/pricing.ts` match the design doc and the Fleet & Pricing page plan.

---

## 8. Open questions / risks

| Risk | Mitigation |
|------|------------|
| `/book/?flow=membership` destination not ready | Point CTA to `/discovery-flight/` or `/contact/` initially; update once TICKET-024 ships. |
| No dedicated membership-signup API endpoint | Coordinate with booking ticket to extend `POST /api/bookings` or create `POST /api/memberships`. |
| Real membership hero photo unavailable | Use the crest or an approved PA28 ramp photo from `images/` with a TODO to replace with a dedicated shot. |
| Rate changes after launch | Store rates in `src/content/pricing.ts` and update both Membership and Fleet & Pricing pages from that single source. |
