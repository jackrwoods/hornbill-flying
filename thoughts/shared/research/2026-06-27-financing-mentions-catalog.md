---
date: 2026-06-27T16:09:08-0700
researcher: Jack Woods
git_commit: 34728e84525e624f1fbc608f4f1daf257dd82910
branch: main
repository: hornbill-flying
topic: "All instances where Financing is mentioned with links to financing available or dedicated financing pages"
tags: [research, codebase, financing, navigation, seo, stratus]
status: complete
last_updated: 2026-06-27
last_updated_by: Jack Woods
---

# Research: Financing mentions and links across the site

**Date**: 2026-06-27T16:09:08-0700
**Researcher**: Jack Woods
**Git Commit**: [34728e8](https://github.com/jackrwoods/hornbill-flying/commit/34728e84525e624f1fbc608f4f1daf257dd82910)
**Branch**: main
**Repository**: [jackrwoods/hornbill-flying](https://github.com/jackrwoods/hornbill-flying)

## Research Question

Catalog every place the codebase mentions “Financing,” links to “financing available,” or references the dedicated `/financing/` page.

## Summary

The site has a single dedicated financing page at `/financing/` and a single external financing partner, **Stratus Financial**. All financing references funnel users either to the internal `/financing/` informational page or directly to `https://stratusfinancial.com/`. Financing is mentioned in the main navigation, the footer, the `/financing/` page itself, program cost sections, the fleet/pricing page, the cost-estimator tool, two blog posts, and the terms-of-use disclaimer. There is no financing API, loan application form, or payment processing for loans in the codebase.

## Detailed Findings

### Dedicated financing page

- [`src/app/financing/page.tsx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/app/financing/page.tsx) — Next.js app-router page for the `/financing/` route. Exports page metadata, canonical URL, breadcrumb JSON-LD, FAQPage JSON-LD, and composes the section components below.
- [`src/content/financing.ts`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/content/financing.ts) — Central data source for `/financing/`: page meta, hero copy, Stratus partnership copy/requirements, covered costs, payment expectations, budget scenarios, CTA links, and FAQ entries.

### Routing and navigation

- [`src/lib/routes.ts`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/lib/routes.ts) — Site route registry. Defines a published route with `slug: "financing"`, `label: "Financing"`, and `href: "/financing/"`, and registers the same `href` in the footer navigation.
- [`src/components/Footer.tsx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/components/Footer.tsx) — Renders the “Financing” footer link from `getFooterLinks()` (sourced from `src/lib/routes.ts`).

### `/financing/` page sections

All section components live under `src/sections/financing/` and consume data from `src/content/financing.ts`:

- [`FinancingHeroSection.tsx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/sections/financing/FinancingHeroSection.tsx) — Hero/header with breadcrumb and H1.
- [`StratusPartnershipSection.tsx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/sections/financing/StratusPartnershipSection.tsx) — Stratus Financial partnership overview, requirements, application flow, and external CTA to `https://stratusfinancial.com/`.
- [`WhatCanBeFinancedSection.tsx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/sections/financing/WhatCanBeFinancedSection.tsx) — Lists eligible training expenses that can be financed.
- [`PaymentExpectationsSection.tsx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/sections/financing/PaymentExpectationsSection.tsx) — Deposit, pay-as-you-go, cancellation, and refund expectations for financed and non-financed students.
- [`BudgetScenariosSection.tsx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/sections/financing/BudgetScenariosSection.tsx) — Sample monthly training budget scenarios.
- [`FinancingCTASection.tsx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/sections/financing/FinancingCTASection.tsx) — Conversion block linking to program pages and discovery-flight booking.
- [`FinancingFAQSection.tsx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/sections/financing/FinancingFAQSection.tsx) — FAQ accordion wired to FAQPage schema.

### Cross-page financing teasers

- [`src/sections/fleet/FinancingOptionsSection.tsx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/sections/fleet/FinancingOptionsSection.tsx) — Teaser on `/fleet/`; renders a “Financing options” link to `/financing/`. Data source: `src/content/fleet.ts`.
- [`src/sections/programs/private-pilot/PrivatePilotFinancingSection.tsx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/sections/programs/private-pilot/PrivatePilotFinancingSection.tsx) — Teaser on `/programs/private-pilot/`; links to `/financing/`. Data source: `src/content/programs/private-pilot.ts`.
- [`src/sections/programs/cfi/CFICostSection.tsx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/sections/programs/cfi/CFICostSection.tsx) — CTA link to `/financing/`.
- [`src/sections/programs/cfii/CFIICostSection.tsx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/sections/programs/cfii/CFIICostSection.tsx) — CTA link to `/financing/`.

### Program content linking to `/financing/`

- [`src/content/programs/private-pilot.ts`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/content/programs/private-pilot.ts) — `financing` object with title, description, and `href: "/financing/"`.
- [`src/content/programs/commercial-pilot.ts`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/content/programs/commercial-pilot.ts) — `financingHref = "/financing/"` and a “Financing options” link in the cost-breakdown section.
- [`src/content/programs/instrument-rating.ts`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/content/programs/instrument-rating.ts) — `financingHref = "/financing/"` and a “Financing options” link in the cost-breakdown section.
- [`src/content/programs/mountain-flying.ts`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/content/programs/mountain-flying.ts) — `financingHref = "/financing/"` and a “Financing options” link.
- [`src/content/programs/cfi.ts`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/content/programs/cfi.ts) and [`src/content/programs/cfii.ts`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/content/programs/cfii.ts) — Cost-section notes reference the fleet, membership, and financing pages.

### Tools and blog

- [`src/app/tools/cost-estimator/page.tsx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/app/tools/cost-estimator/page.tsx) — Includes a “Financing options” related link to `/financing/`.
- [`src/content/blog/flight-training-reno-nv.mdx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/content/blog/flight-training-reno-nv.mdx) — Inline link text “Financing” pointing to `/financing/`.
- [`src/content/blog/private-pilot-license-cost-nevada.mdx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/content/blog/private-pilot-license-cost-nevada.mdx) — Inline link text “Financing” pointing to `/financing/` and mentions Stratus Financial.

### Legal / disclaimer

- [`src/content/legal/terms.ts`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/content/legal/terms.ts) — Third-party links paragraph mentions “financing partners.”
- [`src/components/tools/Disclaimer.tsx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/components/tools/Disclaimer.tsx) — Standard disclaimer notes the tool is not a substitute for “financial advice.”

### Static assets

- [`public/images/financing/financing-hero.webp`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/public/images/financing/financing-hero.webp) — Hero image for the `/financing/` page.

## Code References

- [`src/lib/routes.ts`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/lib/routes.ts) — Published `/financing/` route and footer link.
- [`src/content/financing.ts`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/content/financing.ts) — All `/financing/` copy, FAQ, and external Stratus URL.
- [`src/app/financing/page.tsx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/app/financing/page.tsx) — `/financing/` Next.js page with metadata and schema.
- [`src/sections/financing/StratusPartnershipSection.tsx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/sections/financing/StratusPartnershipSection.tsx) — External Stratus link (`https://stratusfinancial.com/`) with `data-analytics="stratus_financing_click"`.
- [`src/sections/fleet/FinancingOptionsSection.tsx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/sections/fleet/FinancingOptionsSection.tsx) — `/fleet/` teaser link to `/financing/`.
- [`src/sections/programs/private-pilot/PrivatePilotFinancingSection.tsx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/sections/programs/private-pilot/PrivatePilotFinancingSection.tsx) — `/programs/private-pilot/` teaser link to `/financing/`.
- [`src/sections/programs/commercial-pilot/CommercialCostSection.tsx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/sections/programs/commercial-pilot/CommercialCostSection.tsx) — Commercial cost-section link to `/financing/`.
- [`src/sections/programs/instrument-rating/InstrumentRatingCostSection.tsx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/sections/programs/instrument-rating/InstrumentRatingCostSection.tsx) — Instrument cost-section link to `/financing/`.
- [`src/sections/programs/mountain-flying/MountainFlyingPrerequisitesCostSection.tsx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/sections/programs/mountain-flying/MountainFlyingPrerequisitesCostSection.tsx) — Mountain-flying cost-section link to `/financing/`.
- [`src/sections/programs/cfi/CFICostSection.tsx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/sections/programs/cfi/CFICostSection.tsx) — CFI cost-section link to `/financing/`.
- [`src/sections/programs/cfii/CFIICostSection.tsx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/sections/programs/cfii/CFIICostSection.tsx) — CFII cost-section link to `/financing/`.
- [`src/components/tools/ToolLayout.tsx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/components/tools/ToolLayout.tsx) — Renders related links passed from the cost-estimator page.
- [`src/app/tools/cost-estimator/page.tsx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/app/tools/cost-estimator/page.tsx) — Supplies `{ href: "/financing/", label: "Financing options" }` to `ToolLayout`.
- [`src/content/blog/flight-training-reno-nv.mdx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/content/blog/flight-training-reno-nv.mdx) — Blog link to `/financing/`.
- [`src/content/blog/private-pilot-license-cost-nevada.mdx`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/content/blog/private-pilot-license-cost-nevada.mdx) — Blog link to `/financing/`.
- [`src/content/legal/terms.ts`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/src/content/legal/terms.ts) — Terms mentioning financing partners.

## Architecture Documentation

- **Single source of truth for financing content**: `src/content/financing.ts` holds every string, URL, FAQ item, and budget scenario used by the `/financing/` page sections. Program and fleet pages import smaller financing data objects from their own content files.
- **Navigation pattern**: Routes are declared in `src/lib/routes.ts` with `slug`, `label`, and `href`; the footer and other navigation consumers read from helper functions there.
- **External partner link**: The only external financing link is `https://stratusfinancial.com/`, surfaced in `src/content/financing.ts` and rendered by `StratusPartnershipSection.tsx` with `target="_blank"`, `rel="noopener noreferrer"`, and a `data-analytics` attribute.
- **No financing API or form**: The codebase contains no server actions, API routes, or forms for loan applications. Financing is purely informational and offloads application/approval to Stratus Financial.
- **Schema markup**: The `/financing/` page emits `BreadcrumbList` and `FAQPage` JSON-LD using data from `src/content/financing.ts`.

## Historical Context (from thoughts/)

- [`thoughts/shared/tickets/TICKET-018.md`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/thoughts/shared/tickets/TICKET-018.md) — Original ticket: “Flight training cost is a common objection. The financing page must explain Stratus Financial partnership, payment expectations, and how to plan for training expenses.”
- [`thoughts/shared/plans/TICKET-018-plan.md`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/thoughts/shared/plans/TICKET-018-plan.md) — Implementation plan for `/financing/`. Explicitly out of scope: “Stratus Financial API integrations, loan application forms, live loan calculators, or payment processing. Those remain external links to Stratus Financial or offline processes unless later tickets add integration.”
- [`thoughts/shared/plans/TICKET-004-plan.md`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/thoughts/shared/plans/TICKET-004-plan.md) — Private Pilot program page plan: includes “Finance your training” section with CTA to `/financing/`.
- [`thoughts/shared/plans/TICKET-011-plan.md`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/thoughts/shared/plans/TICKET-011-plan.md) — Fleet & Pricing page plan: `FinancingOptionsSection` with heading “Financing your training” and link to `/financing/`.
- [`thoughts/shared/design/website_layout_design.md`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/thoughts/shared/design/website_layout_design.md) — Site nav includes `Financing | /financing/` with purpose “Stratus Financial, payment expectations | Objection removal.”
- [`thoughts/shared/research/2026-06-17-online-marketing-small-business-flight-school.md`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/thoughts/shared/research/2026-06-17-online-marketing-small-business-flight-school.md) — Recommends applying to become a Stratus Financial partner school and creating a financing page before the first paid ad.

## Related Research

- [`thoughts/shared/research/2026-06-17-flight-school-website-competitor-and-findability-research.md`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/thoughts/shared/research/2026-06-17-flight-school-website-competitor-and-findability-research.md) — Competitor analysis on financing pages and cost content.
- [`thoughts/shared/research/2026-06-17-online-marketing-small-business-flight-school.md`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/thoughts/shared/research/2026-06-17-online-marketing-small-business-flight-school.md) — Marketing research recommending Stratus Financial partnership and cost/financing content.
- [`thoughts/shared/research/2026-06-18-seo-for-small-businesses.md`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/thoughts/shared/research/2026-06-18-seo-for-small-businesses.md) — SEO notes mentioning financing as a value proposition and YMYL-adjacent financial content.

## Open Questions

- Is the Stratus Financial application URL (`https://stratusfinancial.com/`) the final destination, or should it point to a Hornbill-specific partner/application page once the partnership is finalized?
- Should UTM parameters be appended to the Stratus outbound link, as suggested in [`thoughts/shared/plans/TICKET-028-plan.md`](https://github.com/jackrwoods/hornbill-flying/blob/34728e84525e624f1fbc608f4f1daf257dd82910/thoughts/shared/plans/TICKET-028-plan.md)?
- Are there additional financing partners (AOPA Finance, Sallie Mae, Meritize, etc.) to be added, as mentioned in competitor research?
