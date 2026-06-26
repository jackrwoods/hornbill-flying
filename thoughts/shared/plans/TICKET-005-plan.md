---
repository: hornbill-flying
ticket: TICKET-005
title: Sport Pilot program page
author: Claude Code
status: draft
created: 2026-06-18
---

# TICKET-005 — Sport Pilot Program Page Implementation Plan

## 1. Scope summary

Build the public Sport Pilot (SPL) program page at `/programs/sport-pilot/`. The page explains the Sport Pilot pathway at Hornbill Aviation, including FAA requirements, operational limitations, realistic timeline, cost estimate with the membership benefit, fleet fit, and a clear conversion path to book a discovery flight.

This ticket produces only the SPL page. It does not build the booking backend, the global shell, or other program pages, but it defines the content and schema conventions that other program pages should follow.

**Out of scope**
- Discovery flight booking widget logic (handled by TICKET-002 or the dedicated booking API tickets)
- Global header/footer/layout (TICKET-001)
- Other program pages (TICKET-004 Private Pilot, etc.)
- Gift-voucher flow
- Real CFI bios/photos until those assets are available (use placeholders/defaults from TICKET-001)

## 2. Exact file paths to create or modify

Assume a Next.js 14+ static-export project with the App Router and a `src/` directory. Paths may be adjusted if TICKET-001 chooses a flat root layout, but these should be the defaults.

### Files to create

| File | Purpose |
|------|---------|
| `src/app/programs/sport-pilot/page.tsx` | SPL page React component with all sections and embedded JSON-LD |
| `src/app/programs/sport-pilot/layout.tsx` (optional) | Page wrapper if a program-specific layout is needed; otherwise use root layout |
| `src/content/programs/sport-pilot.md` or `sport-pilot.mdx` | Markdown/MDX source for long-form copy if the page is generated from content |
| `src/lib/schema/program.ts` | Reusable helper that builds `Service` + `Course` + `FAQPage` schema objects for any program page |

### Files to modify (created by TICKET-001)

| File | Change |
|------|--------|
| `src/lib/metadata.ts` or `src/app/metadata.ts` | Add the SPL page's default title/description/OG template (or export a helper) |
| `src/lib/schema/organization.ts` | Reuse the base `Organization` / `LocalBusiness` / `EducationalOrganization` object |
| `src/components/ui/Button.tsx` | Use for CTAs |
| `src/components/ui/ProgramCard.tsx` | Reuse styling if programs are rendered from shared cards |
| `src/components/FAQAccordion.tsx` | Reuse the accessible FAQ component for FAQPage schema |
| `src/components/Breadcrumb.tsx` | Add the SPL route to the shared breadcrumb component or render a page-level breadcrumb |
| `public/sitemap.xml` generator | Include `/programs/sport-pilot/` with `lastmod` and `changefreq` |
| `src/app/globals.css` | No direct edits expected, but confirm Tailwind theme tokens cover program page styles |

### Static assets to add (or reference)

| Asset | Suggested path | Notes |
|-------|--------------|-------|
| Hero image of a Hornbill PA28 on the RNO ramp | `public/images/programs/sport-pilot-hero.webp` | Use WebP/AVIF; width/height declared; alt text per brand guide |
| Optional: cockpit or preflight detail shot | `public/images/programs/sport-pilot-detail.webp` | Lazy-loaded, descriptive alt text |

## 3. Reusable components to use from TICKET-001 (shell) and other tickets

### From TICKET-001 (must be ready first)

- `RootLayout` — includes global metadata template, font loading (Instrument Serif, Inter, IBM Plex Mono), and base JSON-LD (`Organization` + `LocalBusiness` + `EducationalOrganization`).
- `Header` — sticky header with programs dropdown, persistent "Book a discovery flight" CTA, and phone link.
- `Footer` — NAP, quick links, legal links.
- `MobileNav` / `MobileCTABar` — hamburger menu and sticky mobile CTA.
- `Button` variants: primary (navy), secondary (gold), tertiary (outline).
- `Container` / `Section` layout primitives.
- `Breadcrumb` component (or shared breadcrumb data source).
- SEO helpers: `DefaultMetadata`, `SchemaScript` (renders `<script type="application/ld+json">`).
- Tailwind theme tokens from `visual_identity.md` (navy, gold, orange, cream, typography).

### From other tickets (may be built in parallel, but should reuse when available)

- `ProgramHero` (TICKET-004 or shared program ticket) — consistent program-page hero with H1, subhead, hero image, and primary CTA.
- `DiscoveryFlightCTA` (TICKET-002 or booking ticket) — a section block that links to `/discovery-flight/`.
- `PricingSnapshot` (TICKET-007 Fleet/Pricing) — small reusable card showing member vs non-member wet rate.
- `FleetMiniCard` (TICKET-007) — tail number, avionics, rate.
- `InstructorMiniCard` (TICKET-010 Instructors) — name, focus, "Book with [Name]" link.
- `FAQAccordion` (TICKET-013 FAQ) — accessible accordion that mirrors the FAQPage schema.

### Components this ticket may introduce

- `SportPilotPage` — page-level composition component.
- `ProgramRequirementsList` — FAA minimums vs realistic average list (reusable by other program pages).
- `ProgramTimeline` — full-time vs part-time timeline (reusable).
- `ProgramCostEstimate` — cost table with membership savings (reusable).

## 4. Page content/structure, schema markup, and SEO metadata

### Page URL and metadata

- **URL:** `/programs/sport-pilot/`
- **Canonical:** self-referencing to `https://hornbillaviation.com/programs/sport-pilot/`
- **Title tag:** `Sport Pilot Training in Reno, NV | Hornbill Aviation`
- **Meta description:** `Earn your Sport Pilot certificate at RNO. Part 61 training in a PA28 fleet, flexible scheduling, and a $199 discovery flight. See requirements, timeline, and cost.`
- **OpenGraph:** same title/description plus hero image URL.
- **Twitter card:** summary_large_image.

### Heading hierarchy

- One H1 only: `Sport Pilot training in Reno, NV`
- H2s for major sections
- H3s for sub-sections (e.g., "FAA minimums", "Realistic timeline", "What you can fly")
- No skipped levels.

### Page sections and content

1. **Hero**
   - H1: `Sport Pilot training in Reno, NV`
   - Subheadline: `A faster path to the left seat. Train in a light-sport-eligible PA28, choose your CFI, and fly from Reno–Tahoe (RNO).`
   - Primary CTA button: `Book a discovery flight` → `/discovery-flight/`
   - Secondary CTA link: `See fleet and rates` → `/fleet/`
   - Hero image: Hornbill PA28 on the RNO ramp.

2. **Quick answer box** (AI / answer-engine optimization)
   - 50–70 word direct answer: what a Sport Pilot certificate is, where Hornbill trains, and the first step.

3. **What is a Sport Pilot certificate?**
   - Plain-language summary of privileges and limits.
   - Mention: fly a light-sport aircraft during daytime VFR, carry one passenger, no Class A, B, C, or D unless endorsed, no IFR, no compensation.

4. **Requirements**
   - FAA minimums list:
     - Be at least 17 years old.
     - Hold at least a third-class medical certificate (or valid U.S. driver's license under Sport Pilot rules).
     - Log 20 hours total flight time (15 with a CFI, 5 solo).
     - Pass the FAA Sport Pilot knowledge test.
     - Pass the Sport Pilot practical test (checkride).
   - Note: Hornbill trains in a non-LSA PA28, so clarify that the student will train in the same fleet and take the checkride in an aircraft that meets the checkride requirements, or explain the pathway if the student intends to operate LSA afterward. If Hornbill does not offer an LSA, state that clearly and position SPL as the entry point that can later convert to Private Pilot.

5. **Timeline**
   - Full-time pace: 4–6 weeks (weather and examiner availability dependent).
   - Part-time pace: 3–6 months at 1–2 lessons per week.
   - Call out that Part 61 pacing follows the student's schedule.

6. **Cost estimate**
   - Table or card with:
     - Aircraft rental: `20 hours × $159/hr` (member rate) vs `$185/hr` (non-member).
     - Instructor: `15 hours dual × $XX/hr` (use actual instructor rate once set; placeholder `$70/hr`).
     - Ground instruction / pre/post-flight briefings: estimate.
     - Materials / test fees: knowledge test fee + checkride examiner fee (ranges).
     - Membership: `$49/month` if it saves money at typical usage.
   - Show two totals: member estimate and non-member estimate.
   - Include a clear disclaimer that costs vary with individual progress.

7. **Fleet fit**
   - One or two sentences: train in the same PA28 fleet as Private Pilot students, so skills transfer directly if you continue.
   - Link to `/fleet/`.

8. **From Sport Pilot to Private Pilot**
   - Short section explaining the upgrade path and that hours count toward PPL (with limitations on LSA time; be accurate).
   - Link to `/programs/private-pilot/`.

9. **Discovery flight CTA section**
   - Headline: `Your first lesson is a discovery flight.`
   - Text: `Fly for 45–60 minutes with a CFI, handle the controls, and see if training fits your life. No deposit required.`
   - Price: `$199`
   - Button: `Book a discovery flight`

10. **FAQ accordion** (5–7 questions)
    - Example questions:
      - What is the difference between Sport Pilot and Private Pilot?
      - Can I fly at night with a Sport Pilot certificate?
      - What medical certificate do I need for Sport Pilot?
      - How long does Sport Pilot training take?
      - Can I use my Sport Pilot training toward a Private Pilot certificate?
      - Does Hornbill have a light-sport aircraft?
      - What does the $199 discovery flight include?

11. **Breadcrumb**
    - Home > Programs > Sport Pilot

12. **Internal links**
    - Link to `/programs/private-pilot/`, `/fleet/`, `/membership/`, `/discovery-flight/`, `/instructors/`, `/faq/`.

### Schema markup

Embed the following JSON-LD in `<head>` via a `SchemaScript` component.

1. **Service** (primary schema for the program)
2. **Course** (complementary; includes prerequisites and credential awarded)
3. **FAQPage** (for the FAQ accordion)
4. **BreadcrumbList** (for the breadcrumb)
5. **Organization** / **LocalBusiness** / **EducationalOrganization** references (re-use base schema from TICKET-001)

#### Example Service schema

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Sport Pilot Training",
  "provider": {
    "@type": "FlightSchool",
    "name": "Hornbill Aviation",
    "url": "https://hornbillaviation.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1008 Gentry Way",
      "addressLocality": "Reno",
      "addressRegion": "NV",
      "postalCode": "89512",
      "addressCountry": "US"
    }
  },
  "areaServed": {
    "@type": "City",
    "name": "Reno, NV"
  },
  "description": "Part 61 Sport Pilot certificate training at Reno-Tahoe (RNO). Train in a PA28 fleet with a CFI you choose.",
  "offers": {
    "@type": "Offer",
    "price": "199",
    "priceCurrency": "USD",
    "description": "Discovery flight — first lesson"
  }
}
```

#### Example Course schema

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Sport Pilot Certificate",
  "description": "Part 61 Sport Pilot training at Hornbill Aviation in Reno, NV.",
  "provider": {
    "@type": "Organization",
    "name": "Hornbill Aviation",
    "sameAs": "https://hornbillaviation.com"
  },
  "coursePrerequisites": "At least 17 years old; able to read, speak, write, and understand English; hold a third-class medical certificate or valid U.S. driver's license under Sport Pilot rules.",
  "educationalCredentialAwarded": "FAA Sport Pilot Certificate"
}
```

#### FAQPage schema

Mirror each FAQ accordion item with a `Question` / `AcceptedAnswer` pair. Keep answers concise (under 300 characters where possible) and accurate.

#### BreadcrumbList schema

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://hornbillaviation.com/"},
    {"@type": "ListItem", "position": 2, "name": "Programs", "item": "https://hornbillaviation.com/programs/"},
    {"@type": "ListItem", "position": 3, "name": "Sport Pilot", "item": "https://hornbillaviation.com/programs/sport-pilot/"}
  ]
}
```

## 5. API/widget/data requirements

### APIs

This page is static and requires no runtime API calls for its primary content. However, it may reference:

- `/api/availability` (booking backend) — used only by the embedded discovery-flight booking widget if that widget is present on this page. The page itself should default to a CTA link if the widget is not yet built.
- `/api/instructors` (optional) — only if the page dynamically lists available CFIs. Default to static content from instructor data files.

### Widgets

- No mandatory widgets on the SPL page.
- Optional: a small "Flight training cost estimator" widget (TICKET-025 or later tools ticket) can be embedded at the bottom of the cost section if available.

### Data files

- `src/content/programs/sport-pilot.md` (or `.mdx`) with frontmatter:
  - `title`
  - `description`
  - `h1`
  - `slug: sport-pilot`
  - `heroImage`
  - `price`
  - `duration`
  - `nextProgram: private-pilot`
  - `tags`
  - `faq` array
- `src/data/instructors.json` (TICKET-010) — only if the page renders an instructor mini-card.
- `src/data/fleet.json` (TICKET-007) — only if the page renders a fleet mini-card.

## 6. Dependencies on other tickets

| Ticket | Why it blocks or is required |
|--------|------------------------------|
| **TICKET-001** | Critical. Provides the site shell, layout, header/footer, metadata helper, schema base, Tailwind theme, and routing convention. Must be merged before this page renders correctly. |
| **TICKET-007** (Fleet & Pricing) | Medium. The SPL page links to `/fleet/` and references member/non-member rates and aircraft details. If unavailable, hardcode the rates from `website_layout_design.md` and update once TICKET-007 lands. |
| **TICKET-010** (Instructors) | Low. The page may include an instructor mini-card. Use placeholder content from TICKET-001 if not ready. |
| **TICKET-013** (FAQ) | Low. Reuses the FAQ accordion component. The page can ship with its own accordion if the shared one is delayed. |
| **TICKET-002** (Homepage/Discovery Flight) | Low/Medium. The primary CTA links to `/discovery-flight/`. The link can point to the URL even if the page is still in progress. |

## 7. Verification steps

### Automated tests

1. **Build passes** — `next build` and static export complete without errors.
2. **Route exists** — `out/programs/sport-pilot/index.html` is generated.
3. **Link integrity** — internal links resolve (use a link checker against the exported `out/` directory):
   - `/discovery-flight/`
   - `/programs/private-pilot/`
   - `/fleet/`
   - `/membership/`
   - `/instructors/`
   - `/faq/`
4. **Accessibility tests** — axe-core or Playwright reports no WCAG 2.2 AA violations:
   - One H1 only.
   - Heading hierarchy is sequential.
   - CTA buttons have accessible names.
   - FAQ accordion uses `aria-expanded` and keyboard navigation.
   - Color contrast passes (gold-on-navy CTA passes; gold-on-cream text avoided).
5. **Lighthouse checks** —
   - Performance ≥ 90 (LCP ≤ 2.0s, CLS ≤ 0.1).
   - Accessibility ≥ 95.
   - Best Practices ≥ 90.
   - SEO ≥ 95.

### Manual checks

1. **Title/H1/meta** — confirm:
   - Title: `Sport Pilot Training in Reno, NV | Hornbill Aviation`
   - H1: `Sport Pilot training in Reno, NV`
   - Meta description includes "discovery flight," "PA28," and "RNO."
2. **Schema validation** — paste the rendered page URL or HTML into Google's Rich Results Test and confirm:
   - Service schema is detected.
   - Course schema is detected.
   - FAQPage schema is detected.
   - BreadcrumbList schema is detected.
   - No errors or warnings that are fixable.
3. **Brand voice review** — read copy against `brand_identity_writing_style.md`:
   - No clichés: "passion for aviation," "soar to new heights," "unlock your potential."
   - No LLM hedges: "it's important to note," "in today's world," "at the end of the day."
   - Specific numbers and names are used.
   - CTA is concrete: "Book a discovery flight."
4. **Mobile UX** — test on a mobile viewport:
   - Hero CTA is tappable.
   - Sticky header/footer do not obscure content.
   - Cost table is readable without horizontal scroll (use stacked cards on mobile if needed).
5. **NAP consistency** — ensure the address and phone in schema/footer match `website_layout_design.md`:
   - `1008 Gentry Way, Reno, NV 89512`
   - `office@hornbillaviation.com`
   - `555-555-1234`

### Content accuracy

1. Verify all FAA requirements against current 14 CFR §61.313 and §61.315 (or have a CFI review).
2. Confirm Hornbill's actual aircraft eligibility for Sport Pilot training/checkride before publishing.
3. Confirm final instructor rates, examiner fees, and knowledge-test fees before publishing cost numbers.

### Sign-off checklist

- [ ] Page builds and exports to `/programs/sport-pilot/index.html`
- [ ] Exactly one H1, sequential headings
- [ ] Title, meta description, canonical, and OG tags present and correct
- [ ] Service + Course + FAQPage + BreadcrumbList JSON-LD present and validated by Rich Results Test
- [ ] All internal links reachable
- [ ] Mobile layout tested
- [ ] Brand voice checklist passed
- [ ] CFI or chief instructor has reviewed technical accuracy
