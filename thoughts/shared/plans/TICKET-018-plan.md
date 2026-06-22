---
id: TICKET-018-plan
title: "Implementation plan: Financing page"
ticket: TICKET-018
status: draft
created: 2026-06-18
---

# TICKET-018 — Financing Page Implementation Plan

## 1. Scope summary

Build the Hornbill Flight Center financing page at `/financing/`. Flight training cost is one of the most common objections prospective students raise; this page must remove that friction by explaining the Stratus Financial partnership, the application process, what training costs can be financed, the school's payment expectations (deposits, pay-as-you-go), and sample monthly budget scenarios. The page also links to program pages, the Fleet & Pricing page, the Membership page, and the Discovery Flight booking page, and it implements `FAQPage` schema to capture cost-related long-tail search queries.

What this ticket produces:

- The `/financing/` static Next.js page.
- Reusable section components for financing content (hero/intro, Stratus partnership, financing details, payment expectations, budget scenarios, related links, FAQ).
- A shared data file `src/content/financing.ts` containing Stratus terms, sample budgets, and FAQ entries.
- FAQPage JSON-LD schema with cost and financing questions.
- SEO metadata unique to this page.
- Internal links to `/programs/private-pilot/`, `/fleet/`, `/membership/`, and `/discovery-flight/`.

This ticket does **not** implement: Stratus Financial API integrations, loan application forms, live loan calculators, or payment processing. Those remain external links to Stratus Financial or offline processes unless later tickets add integration.

---

## 2. Exact file paths to create or modify

### Create (this ticket)

| File | Purpose |
|------|---------|
| `src/app/financing/page.tsx` | The `/financing/` route. Composes sections, exports metadata, and injects page-specific JSON-LD. |
| `src/sections/financing/FinancingHeroSection.tsx` | Page header: H1, short value prop, and key reassurance line. Uses `PageHeader` primitive. |
| `src/sections/financing/StratusPartnershipSection.tsx` | Overview of Stratus Financial partnership, who qualifies, and how the partnership helps students. |
| `src/sections/financing/WhatCanBeFinancedSection.tsx` | List of covered costs: flight time, instructor time, ground school, materials, examiner fees, etc. |
| `src/sections/financing/PaymentExpectationsSection.tsx` | Deposits, pay-as-you-go model, cancellation/refund timing, and what Stratus does not cover. |
| `src/sections/financing/BudgetScenariosSection.tsx` | Sample monthly training budgets (part-time, moderate, accelerated) with total ranges. |
| `src/sections/financing/FinancingCTASection.tsx` | Conversion block with CTAs to discovery flight booking and Private Pilot program page. |
| `src/sections/financing/FinancingFAQSection.tsx` | FAQ accordion with cost/financing questions and FAQPage schema wiring. |
| `src/content/financing.ts` | Central data: Stratus copy, financing details, payment expectations, sample budgets, FAQ items, and internal link targets. |

### Modify (this ticket)

- `src/lib/routes.ts` (TICKET-001) — add the published financing route entry.
- `src/content/faq.ts` (TICKET-001/TICKET-002) — **optional**: if a global FAQ is used on multiple pages, do not duplicate financing-specific questions here; keep them in `src/content/financing.ts` to preserve page-specific FAQPage schema.
- `next.config.ts` (TICKET-001) — no changes required if `trailingSlash: true` already covers `/financing/`.

### Static assets

| File | Purpose |
|------|---------|
| `public/images/financing/financing-hero.webp` | Hero image for the financing page (optional; can reuse a PA28/fleet image if no dedicated asset exists). Use real aircraft at RNO when available. |

---

## 3. Reusable components to use from TICKET-001 (shell) and other tickets

### Components from TICKET-001 (hard prerequisite)

| Component | Path | Usage on financing page |
|-----------|------|--------------------------|
| `RootLayout` | `src/app/layout.tsx` | Wraps the page; provides fonts, global metadata template, header, footer. |
| `Header` / `MobileNav` | `src/components/layout/Header.tsx`, `MobileNav.tsx` | Navigation with programs dropdown and persistent CTA. |
| `Footer` | `src/components/layout/Footer.tsx` | Site footer with NAP and quick links. |
| `Container` | `src/components/ui/Container.tsx` | Max-width wrapper for all sections. |
| `Section` | `src/components/ui/Section.tsx` | Vertical rhythm and background variants. |
| `PageHeader` | `src/components/ui/PageHeader.tsx` | Breadcrumb + H1 + subtitle for inner pages. |
| `Button` | `src/components/ui/Button.tsx` | Primary/secondary/tertiary CTAs. |
| `CTALink` | `src/components/CTALink.tsx` | "Book a discovery flight" action. |
| `PhoneLink` | `src/components/PhoneLink.tsx` | Click-to-call link. |
| `Card` | `src/components/ui/Card.tsx` | White/cream cards for budget scenarios and details. |
| `FAQAccordion` | `src/components/FAQAccordion.tsx` | Accessible accordion with FAQPage schema support. |
| `SchemaInjector` / `JsonLd` | `src/components/seo/JsonLd.tsx` or `SchemaInjector.tsx` | Render page-specific JSON-LD. |
| `BreadcrumbSchema` | `src/components/seo/BreadcrumbSchema.tsx` | BreadcrumbList JSON-LD. |
| `FAQPageSchema` | `src/components/seo/FAQPageSchema.tsx` | FAQPage JSON-LD from FAQ item array. |
| metadata helper | `src/lib/seo.ts` | Build title, description, OpenGraph, canonical. |
| `site` config | `src/content/site.ts` or `src/lib/config.ts` | NAP, brand, URLs. |

### Components / data from other tickets (soft prerequisites)

| Source ticket | Asset | Usage |
|---------------|-------|-------|
| TICKET-006 — Private Pilot page | `/programs/private-pilot/` route and shared `src/content/programs.ts` | CTA link to Private Pilot program; budget scenarios reference PPL costs. |
| TICKET-004 — Fleet & Pricing page | `/fleet/` route and shared rate constants | Link to full rates; budget scenarios reference `$159/hr` member rate and `$185/hr` non-member rate. |
| TICKET-014 or later — Membership page | `/membership/` route and membership constants | Link to membership page; budget scenarios note `$49/month` membership. |
| TICKET-003 — Discovery Flight page | `/discovery-flight/` route | Primary CTA for booking a discovery flight. |
| TICKET-015 or legal ticket | `/cancellation-policy/` route | Link from payment expectations section if refund/cancellation policy lives on a dedicated page. |

---

## 4. Page content/structure, schema markup, and SEO metadata

### 4.1 Document metadata (`src/app/financing/page.tsx`)

Use Next.js `metadata` export via the helper from `src/lib/seo.ts`.

- **URL:** `/financing/`
- **Title:** `Flight Training Financing in Reno, NV | Hornbill Flight Center`
- **Meta description:** `Finance your flight training at Hornbill Flight Center through Stratus Financial. Learn what costs are covered, how to apply, and see sample monthly budgets for PPL training at RNO.` (≤155 characters)
- **Canonical:** `https://hornbillaviation.com/financing/`
- **OpenGraph:** title mirrors page title; description mirrors meta description; image uses page hero or default OG image from TICKET-001.
- **Twitter card:** `summary_large_image`.

### 4.2 Schema markup

Render in this order:

1. **BreadcrumbList** — `Home` → `Financing`.
2. **FAQPage** — financing-specific questions and answers from the FAQ accordion.
3. **WebPage** (optional) — `@id`: `https://hornbillaviation.com/financing/#webpage`, name, description, url.

Do not duplicate the base `Organization` / `LocalBusiness` / `EducationalOrganization` schemas already injected by `RootLayout`; rely on the global layout for those.

### 4.3 Section-by-section content

#### Financing Hero (`FinancingHeroSection.tsx`)

- Uses `PageHeader` primitive.
- **Breadcrumb:** `Home / Financing`
- **H1:** `Flight training financing in Reno, NV`
- **Subtitle:** `Train now and pay over time. Hornbill partners with Stratus Financial to help qualified students cover the cost of certificates, ratings, and flight time.`
- **Quick reassurance line:** `No hidden fees. Transparent rates. Flexible scheduling.`
- Optional hero background image (PA28 at RNO) with overlay.

#### Stratus Financial Partnership (`StratusPartnershipSection.tsx`)

- **H2:** `Financing through Stratus Financial`
- Body copy explaining:
  - Hornbill Flight Center partners with Stratus Financial, a lender focused on aviation training.
  - Students apply directly with Stratus; approval decisions come from Stratus, not Hornbill.
  - Funds are disbursed to the school for flight training as the student progresses.
  - Mention that Stratus may offer options for U.S. citizens and permanent residents with qualifying credit.
- **External CTA:** `See Stratus financing options` → `https://stratusfinancial.com/` (or the school's specific Stratus partner link if available). Mark as external link with `rel="noopener noreferrer"` and `target="_blank"`.
- **Internal CTA:** `See training costs` → `/fleet/`

#### What Costs Can Be Financed (`WhatCanBeFinancedSection.tsx`)

- **H2:** `What flight training costs can be financed`
- Card or list layout covering:
  - Aircraft rental / flight time (wet hourly rates)
  - Flight instructor time
  - Ground school and training materials
  - FAA written exam fees
  - FAA checkride / examiner fees
  - Headset and pilot supplies (if bundled in Stratus-approved budget)
- Include a note: `Exact eligible expenses depend on your Stratus loan terms. We review the budget with you before your first flight.`
- Link to `/fleet/` for current rates and `/programs/private-pilot/` for PPL cost breakdown.

#### Payment Expectations (`PaymentExpectationsSection.tsx`)

- **H2:** `How payments work at Hornbill`
- Sub-sections:
  - **Pay-as-you-go:** Students pay after each lesson or as their account balance reaches a small threshold. No large upfront lump sum required unless financing covers it.
  - **Account deposit:** New students may start with a modest deposit (e.g., $500–$1,000) to keep the account active; exact amount stated clearly without ambiguity.
  - **Financed students:** Stratus disburses funds to the school; the student signs off on lesson charges as they are applied.
  - **Non-financed students:** Credit card, debit, or ACH accepted. Payment is due at time of service or per the student's deposit balance.
  - **Cancellation policy:** Reference `/cancellation-policy/` or include a one-line summary: `Cancellations inside 24 hours may be charged at the instructor and aircraft rate.`
- Avoid guarantees about loan approval; direct students to Stratus for eligibility.

#### Sample Monthly Budget Scenarios (`BudgetScenariosSection.tsx`)

- **H2:** `Sample monthly training budgets`
- Intro: `Budgets vary by how often you fly, your membership status, and how much ground school you do at home. These are sample ranges, not quotes.`
- Three cards:

| Scenario | Flights / month | Approx. monthly flight cost* | Notes |
|----------|-----------------|-------------------------------|-------|
| Part-time (2 flights/week) | 8 hours | ~$1,272 member / ~$1,480 non-member | Includes aircraft + instructor estimate. Steady, lower monthly pressure. |
| Moderate (3 flights/week) | 12 hours | ~$1,908 member / ~$2,220 non-member | Faster progress; good for students targeting a certificate in 6–9 months. |
| Accelerated (5+ flights/week) | 20 hours | ~$3,180 member / ~$3,700 non-member | Full-time pace; financing often makes cash flow manageable. |

- *Add explicit footnote:* `*Sample assumes member rate of $159/hr wet and non-member rate of $185/hr wet, plus estimated instructor time. Rates and instructor fees subject to change; see /fleet/ for current pricing.`
- Add membership note: `Add $49/month for membership. Membership pays for itself at just over 2 flight hours per month.` Link to `/membership/`.

#### Financing CTAs (`FinancingCTASection.tsx`)

- **H2:** `Ready to plan your training budget?`
- Primary CTA: `Book a discovery flight` → `/discovery-flight/`
- Secondary CTA: `See Private Pilot training` → `/programs/private-pilot/`
- Tertiary CTA: `Call us` via `PhoneLink` (`tel:+15555551234`)

#### FAQ (`FinancingFAQSection.tsx`)

- Uses `FAQAccordion` + `FAQPageSchema`.
- **H2:** `Financing questions`
- Suggested 6–8 questions from `src/content/financing.ts`:

1. `Can I finance my entire private pilot license?`
2. `How do I apply for Stratus Financial flight training financing?`
3. `What flight training costs are covered by Stratus Financial?`
4. `Do I need good credit to qualify for flight training financing?`
5. `Can I finance a discovery flight?`
6. `Is there a deposit required to start flight training at Hornbill?`
7. `How does pay-as-you-go training work?`
8. `Can I combine financing with a membership for lower hourly rates?`

- Answers must be specific, honest, and direct. Do not guarantee approval or rates; direct students to Stratus for exact terms.

### 4.4 Heading hierarchy

- H1: page title only.
- H2: each major section title.
- H3: sub-section or card titles inside budget scenarios and cost breakdown.
- H4: small labels (e.g., footnote headings, card metadata).

---

## 5. API/widget/data requirements

### Runtime APIs

- **None.** This is a static Next.js page. All content is generated at build time from `src/content/financing.ts`.

### External links

- Stratus Financial website link. If a Hornbill-specific partner URL is provided later, update `src/content/financing.ts`; until then, use the general Stratus URL and mark it external.

### Data files to create

| File | Data |
|------|------|
| `src/content/financing.ts` | `stratus` block (name, description, applyUrl, requirements), `coveredCosts[]`, `paymentExpectations` block (deposit, payAsYouGo, cancellationNote), `budgetScenarios[]` (name, hoursPerMonth, memberMonthlyEstimate, nonMemberMonthlyEstimate, note), `faqs[]` (question/answer pairs), `links` (internal route refs). |

### Widgets / calculators

- A full interactive loan or training cost calculator is **not** in scope for this ticket. The budget scenarios table is static. If a future ticket adds the cost estimator widget from the design doc (Widget 6), link to it from this page.

---

## 6. Dependencies on other tickets

| Ticket | Why it blocks/depends |
|--------|-----------------------|
| **TICKET-001** — Site shell, shared components, global SEO setup | **Hard prerequisite.** Requires `layout.tsx`, `Header`, `Footer`, fonts, theme, `PageHeader`, `Section`, `Container`, `Button`, `CTALink`, `PhoneLink`, `FAQAccordion`, schema helpers, `src/lib/seo.ts`, and `src/lib/routes.ts`. |
| **TICKET-003** — Discovery Flight page | **Soft prerequisite.** The primary CTA links to `/discovery-flight/`. Route should resolve. |
| **TICKET-004** — Fleet & Pricing page | **Soft prerequisite.** Multiple internal links point to `/fleet/` for current rates. Budget scenario footnotes reference fleet pricing. |
| **TICKET-006** — Private Pilot program page | **Soft prerequisite.** CTA links to `/programs/private-pilot/` and sample budgets assume PPL training. |
| Membership page (future ticket; may be TICKET-015 or similar) | **Soft prerequisite.** Link to `/membership/` and membership rate `$49/month` should be consistent. |
| Cancellation / Refund Policy page (future legal ticket) | **Soft prerequisite.** Payment expectations section may link to `/cancellation-policy/`. If unavailable, include a one-line in-page summary. |

### What this ticket does not depend on

- No Stratus Financial API integration or loan application form is required.
- No real customer financing testimonials are required at launch.
- No booking backend API is consumed on this page.

---

## 7. Verification steps

### 7.1 Build and export verification

1. Run `npm install` and `npm run build`.
2. Confirm `dist/financing/index.html` is generated.
3. Confirm no build errors or TypeScript errors (`tsc --noEmit`).
4. Confirm no Next.js server-only features are used on the page.

### 7.2 SEO / metadata checks

1. Verify title tag: `Flight Training Financing in Reno, NV | Hornbill Flight Center`.
2. Verify meta description is ≤155 characters and contains "Stratus Financial," "Reno," "flight training," and "RNO" or "Hornbill."
3. Verify canonical link is `https://hornbillaviation.com/financing/` with trailing slash.
4. Verify OpenGraph title, description, URL, and image tags are present and use absolute URLs.
5. Verify only one H1 exists on the page and reads `Flight training financing in Reno, NV`.

### 7.3 Schema validation

1. Run the generated `/financing/index.html` through Google Rich Results Test and the Schema.org validator.
2. Confirm `BreadcrumbList` JSON-LD contains:
   - `Home` → `https://hornbillaviation.com/`
   - `Financing` → `https://hornbillaviation.com/financing/`
3. Confirm `FAQPage` JSON-LD contains all FAQ items from `src/content/financing.ts` with `acceptedAnswer` and `text` fields.
4. Confirm no duplicate `@id` values and all internal URLs use absolute URLs.
5. Confirm base `Organization` / `LocalBusiness` schemas from the layout still validate (no regressions).

### 7.4 Link and navigation checks

1. Run a link crawler on `dist/` and confirm all internal links resolve:
   - `/discovery-flight/`
   - `/programs/private-pilot/`
   - `/fleet/`
   - `/membership/`
   - `/cancellation-policy/` (if linked; if page does not yet exist, remove link or stub route)
2. Confirm the Stratus Financial external link uses `rel="noopener noreferrer"` and `target="_blank"`.
3. Confirm the phone link uses `tel:+15555551234`.
4. Confirm the page is reachable from the site header/footer within 3 clicks.

### 7.5 Accessibility checks

1. Run an axe-core or Lighthouse accessibility audit; target WCAG 2.2 AA with no critical errors.
2. Confirm FAQ accordion buttons have `aria-expanded`, `aria-controls`, and associated answer panels with `id`.
3. Confirm all interactive elements (CTAs, accordion toggles, external link) have ≥44 px touch targets on mobile.
4. Confirm color contrast matches the visual identity (e.g., `gold-500` not used as normal text on light backgrounds).
5. Verify heading hierarchy: one H1, logical H2→H3 progression, no skipped levels.

### 7.6 Copy / brand voice checks

1. Audit final copy against `brand_identity_writing_style.md`:
   - No "unlock your potential," "soar to new heights," "world-class," "premier," or aviation clichés.
   - No LLM hedges: "it's important to note," "in today's world," "at the end of the day," "ultimately."
2. Verify claims are specific and honest:
   - Rates match design doc (`$159/hr` member, `$185/hr` non-member, `$49/month` membership).
   - Stratus terms are not overstated; no guarantee of approval or specific APR.
3. Verify CTAs use concrete verbs: "Book," "See," "Call," "Apply."

### 7.7 Content accuracy checks

1. Verify all budget scenario math is internally consistent and includes a disclaimer that figures are estimates.
2. Verify the financing-covered-costs list is accurate to Stratus Financial's typical aviation training loan scope (do not claim expenses the school cannot confirm).
3. Verify payment expectations language matches the school's actual policy or includes a TODO/placeholder if policy is not yet finalized.

### 7.8 Cross-ticket contract checks

1. Confirm `src/lib/routes.ts` has a published `/financing/` entry and the sitemap includes it.
2. Confirm no hard-coded URLs are used outside `src/content/financing.ts` and `src/lib/routes.ts`.
3. Confirm FAQ data shape matches the contract expected by `FAQAccordion` and `FAQPageSchema` from TICKET-001.

---

## 8. Implementation order (suggested)

1. Add `/financing/` route entry to `src/lib/routes.ts`.
2. Create `src/content/financing.ts` with Stratus copy, covered costs, payment expectations, sample budgets, FAQ items, and link targets.
3. Build section components in `src/sections/financing/` in the order listed in Section 4.
4. Compose `src/app/financing/page.tsx`, export metadata, and inject `BreadcrumbSchema` + `FAQPageSchema`.
5. Add a hero image to `public/images/financing/` (or reuse an existing fleet/PA28 image).
6. Run `npm run build`, fix errors, and execute verification steps.
7. Update ticket status and create handoff notes for any dependent content or legal-page tickets.
