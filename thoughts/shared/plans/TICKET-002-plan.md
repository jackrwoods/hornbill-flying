---
id: TICKET-002-plan
title: Homepage — Implementation Plan
related_tickets:
  - TICKET-001
  - TICKET-003
  - TICKET-005
  - TICKET-006
  - TICKET-007
  - TICKET-008
  - TICKET-009
  - TICKET-010
  - TICKET-011
  - TICKET-013
  - TICKET-014
related_design:
  - thoughts/shared/design/website_layout_design.md
  - thoughts/shared/design/brand_identity_writing_style.md
  - thoughts/shared/design/visual_identity.md
related_research:
  - thoughts/shared/research/2026-06-17-flight-school-website-competitor-and-findability-research.md
  - thoughts/shared/research/2026-06-17-online-marketing-small-business-flight-school.md
---

# TICKET-002 — Homepage Implementation Plan

## 1. Scope Summary

Build the Hornbill Flight Center homepage at `/`. The page has one primary conversion job: persuade a visitor to book a discovery flight in under three clicks. It must also establish the school's identity as a **Part 61 flight school in Reno, NV** (exact-match SEO target), introduce the four messaging pillars, surface the program catalog, preview instructors, show transparent pricing, display social proof or founder credibility, answer common questions in an FAQ accordion, and link to the latest blog posts.

This ticket is **content and composition only**; no booking API implementation, no widget logic, and no global shell creation. All shared UI, global metadata, and base schema are owned by TICKET-001 and consumed here.

## 2. Project Conventions (set by TICKET-001)

The site is a Next.js 14+ App Router project configured for **static export** (`output: 'export'`). The assumed structure (created/owned by TICKET-001 unless noted otherwise):

```
/Users/jack/hornbill-flying/
├── next.config.js                    # TICKET-001: output: 'export', distDir: 'dist', trailingSlash
├── package.json                      # TICKET-001
├── tailwind.config.ts                # TICKET-001: theme tokens from visual_identity.md
├── src/
│   ├── app/
│   │   ├── layout.tsx                # TICKET-001: RootLayout, fonts, global metadata template
│   │   ├── page.tsx                  # THIS TICKET — homepage composition
│   │   ├── discovery-flight/
│   │   │   └── page.tsx              # TICKET-003: destination for primary CTA
│   │   ├── programs/
│   │   │   ├── sport-pilot/page.tsx  # TICKET-005
│   │   │   ├── private-pilot/page.tsx# TICKET-006
│   │   │   ├── instrument-rating/page.tsx # TICKET-008
│   │   │   ├── commercial-pilot/page.tsx  # TICKET-007
│   │   │   ├── certified-flight-instructor/page.tsx # TICKET-009
│   │   │   ├── cfii/page.tsx         # TICKET-010 or dedicated ticket
│   │   │   └── mountain-flying/page.tsx   # TICKET-011
│   │   ├── instructors/page.tsx      # TICKET-013
│   │   └── blog/page.tsx             # TICKET-014
│   ├── components/
│   │   ├── layout/                   # TICKET-001: Header, Footer, MobileNav, StickyCTA
│   │   ├── ui/                       # TICKET-001: Button, Container, Section, Card, Badge
│   │   ├── seo/                      # TICKET-001: JsonLd, OrganizationSchema, LocalBusinessSchema, BreadcrumbSchema, FAQPageSchema
│   │   └── homepage/                 # THIS TICKET — section components (private to homepage if not reused)
│   ├── content/                      # THIS TICKET + shared content
│   │   ├── programs.ts               # Shared program data for grids
│   │   ├── instructors.ts            # Shared instructor data (previews + full pages)
│   │   ├── faq.ts                    # Shared FAQ data (homepage + discovery-flight + program pages)
│   │   └── site.ts                   # TICKET-001: NAP, brand, social URLs
│   ├── lib/
│   │   ├── seo.ts                    # TICKET-001: metadata helpers, title template
│   │   └── utils.ts                  # TICKET-001: cn(), etc.
│   └── styles/
│       └── globals.css               # TICKET-001: Tailwind + font imports
├── public/
│   └── images/                       # optimized WebP/AVIF assets
│       ├── hero-pa28-rno.webp        # THIS TICKET — real PA28 ramp photo at RNO
│       ├── instructors/              # TICKET-013 — headshots reused here
│       └── logo.jpeg                 # TICKET-001
└── dist/                             # static export output
```

## 3. Exact File Paths to Create or Modify

### Create (this ticket)

1. `src/app/page.tsx` — homepage route composition.
2. `src/components/homepage/Hero.tsx` — above-the-fold hero with H1, subheadline, CTAs, hero image.
3. `src/components/homepage/TrustStrip.tsx` — 4 proof lines under the hero.
4. `src/components/homepage/DifferentiatorCards.tsx` — 4 messaging-pillar cards.
5. `src/components/homepage/ProgramsGrid.tsx` — 7 program cards linking to program pages.
6. `src/components/homepage/DiscoveryFlightTeaser.tsx` — price/duration/CTA block.
7. `src/components/homepage/InstructorPreview.tsx` — 4 instructor cards with booking links.
8. `src/components/homepage/PricingSnapshot.tsx` — membership vs non-member + discovery price.
9. `src/components/homepage/SocialProof.tsx` — testimonials or founder credibility fallback.
10. `src/components/homepage/FAQAccordion.tsx` — 5–6 FAQ items + FAQPage schema.
11. `src/components/homepage/LatestBlog.tsx` — 3 latest blog post teasers.
12. `src/content/programs.ts` — shared program metadata (title, slug, description, icon).
13. `src/content/instructors.ts` — shared instructor preview data (name, slug, photo, specialties, booking link).
14. `src/content/faq.ts` — shared FAQ items for homepage accordion.
15. `src/content/homepage.ts` (or JSON) — hero copy, trust-strip copy, social-proof testimonials, fallback founder block copy.

### Modify (this ticket)

- `src/app/page.tsx` is the only file created by this ticket that modifies the app; no existing code files are edited.
- Optionally extend `src/content/site.ts` (TICKET-001) if homepage needs additional NAP/brand fields not already present; prefer importing from `site.ts` rather than duplicating.

### Reused Files (owned by other tickets — do not implement here)

- `src/app/discovery-flight/page.tsx` → TICKET-003.
- `src/app/programs/*/page.tsx` → TICKET-005 through TICKET-011.
- `src/app/instructors/page.tsx` and `/instructors/[slug]/page.tsx` → TICKET-013.
- `src/app/blog/page.tsx` and `/blog/[slug]/page.tsx` → TICKET-014.
- `src/app/fleet/page.tsx`, `src/app/membership/page.tsx`, `src/app/location/page.tsx`, `src/app/about/page.tsx` → later tickets.

## 4. Reusable Components to Use from TICKET-001 (Shell)

Consume the following shared components from TICKET-001. If any do not exist when this ticket is implemented, block and escalate to TICKET-001.

| Component | Path | Usage on homepage |
|-----------|------|-------------------|
| `RootLayout` | `src/app/layout.tsx` | Wraps `page.tsx`; provides fonts, global metadata template, header/footer. |
| `Header` | `src/components/layout/Header.tsx` | Sticky header with programs dropdown, persistent "Book a discovery flight" CTA, phone link. |
| `MobileStickyBar` | `src/components/layout/MobileStickyBar.tsx` | Bottom/top sticky bar on mobile with CTA + phone icon. |
| `Footer` | `src/components/layout/Footer.tsx` | NAP, quick links, legal links, social links, copyright. |
| `Container` | `src/components/ui/Container.tsx` | Max-width wrapper (`max-w-7xl`, responsive padding). |
| `Section` | `src/components/ui/Section.tsx` | Vertical rhythm wrapper with optional background color prop. |
| `Button` | `src/components/ui/Button.tsx` | Primary/secondary/tertiary CTAs; must support `asChild` for Next.js `<Link>`. |
| `Card` | `src/components/ui/Card.tsx` | White/cream card with rounded corners and subtle shadow. |
| `Badge` | `src/components/ui/Badge.tsx` | Tags such as "Part 61", "Cross-country ready". |
| `JsonLd` | `src/components/seo/JsonLd.tsx` | Render `<script type="application/ld+json">` safely. |
| `OrganizationSchema` | `src/components/seo/OrganizationSchema.tsx` | Organization JSON-LD with name, URL, logo, sameAs. |
| `LocalBusinessSchema` | `src/components/seo/LocalBusinessSchema.tsx` | LocalBusiness/EducationalOrganization JSON-LD with NAP + geo coordinates. |
| `BreadcrumbSchema` | `src/components/seo/BreadcrumbSchema.tsx` | BreadcrumbList JSON-LD for homepage path. |
| `FAQPageSchema` | `src/components/seo/FAQPageSchema.tsx` | FAQPage JSON-LD from FAQ item array. |
| `metadata` helper | `src/lib/seo.ts` | Build title, description, OpenGraph, canonical, Twitter card. |
| `site` config | `src/content/site.ts` | NAP, brand name, URLs, hours, geo, phone, email. |

## 5. Reusable Components to Use from Other Tickets

The homepage should import shared data/components where they exist. If the owning ticket is not yet complete, stub the data file locally and replace once available.

| Source ticket | Reusable asset | Homepage usage |
|---------------|----------------|----------------|
| TICKET-005 to TICKET-011 | `src/content/programs.ts` (if created by first program ticket) | Program cards grid. |
| TICKET-013 | `src/content/instructors.ts` | Instructor preview cards. |
| TICKET-014 | `src/content/blog.ts` or MDX loader | Latest 3 blog post teasers. |
| TICKET-003 | `DiscoveryFlightCTA` or `BookingButton` component | Repeated CTAs pointing to `/discovery-flight/`. |
| TICKET-004 / pricing ticket | `PricingTable` or rate constants | Pricing snapshot section. |

**Strategy:** Define `src/content/programs.ts`, `src/content/instructors.ts`, and `src/content/faq.ts` in this ticket if they do not yet exist. Program-page tickets and instructor/blog tickets can later import from the same files, making the homepage the first consumer and co-owner of the shared data layer.

## 6. Page Content / Structure

### 6.1 Document metadata (`src/app/page.tsx`)

Use Next.js `metadata` export via the helper from `src/lib/seo.ts`.

- **Title:** `Part 61 Flight School in Reno, NV | Hornbill Flight Center`
- **Meta description:** `Book a discovery flight at Hornbill Flight Center. Part 61 training in a PA28 fleet at RNO. Choose your instructor and fly real cross-country routes.` (≤155 chars)
- **Canonical:** `https://hornbillaviation.com/` (from `site.url`)
- **OpenGraph:** title mirrors page title; description mirrors meta description; image uses hero image or default OG image from TICKET-001.
- **Twitter card:** summary_large_image.

### 6.2 Schema markup (in `<head>`/JSON-LD)

Render in this order:

1. **Organization** — name, alternateName (Hornbill), URL, logo, sameAs (social profiles if active).
2. **LocalBusiness** + **EducationalOrganization** (combined `@graph` or separate scripts) — exact NAP from `site.ts`:
   - Name: Hornbill Flight Center
   - Address: 1008 Gentry Way, Reno, NV 89512
   - Phone: 555-555-1234
   - Email: office@hornbillaviation.com
   - Geo: `{ "@type": "GeoCoordinates", "latitude": 39.4991, "longitude": -119.7681 }`
   - URL: `https://hornbillaviation.com/`
   - Price range: `$$`
   - Opening hours: from `site.ts`
3. **WebSite** (optional) — `url`, `name`, `potentialAction` search target.
4. **BreadcrumbList** — single item for home: `Home` → `/`.
5. **FAQPage** — only the 5–6 questions in the homepage FAQ accordion.

### 6.3 Section-by-section content

#### Hero (`Hero.tsx`)

- **Background:** real PA28 ramp photo at RNO (`public/images/hero-pa28-rno.webp`).
- **H1:** `Part 61 flight school in Reno, NV.`
- **Subheadline:** `Train in a consistent PA28 fleet, choose your instructor, and fly real cross-country routes from Reno–Tahoe (RNO).`
- **Primary CTA button:** `Book a discovery flight` → `/discovery-flight/`
- **Secondary CTA button:** `Buy a gift voucher` → `/discovery-flight/?type=gift`
- **Tertiary:** click-to-call phone link in header/sticky bar (persistent on mobile), not duplicated in hero.
- **Hero image requirements:** Next.js `<Image>`, explicit `width` and `height`, `fetchpriority="high"`, `loading="eager"`, `alt="PA28 Cherokee on the ramp at Reno-Tahoe International Airport (RNO)"`, `sizes="100vw"`, placeholder="blur" if base64 available.

#### Trust Strip (`TrustStrip.tsx`)

4 items, single row on desktop, 2x2 grid on mobile:

1. `Part 61 school at RNO`
2. `Wet PA28 rental from $159/hr with membership`
3. `4 named CFIs with certificate numbers`
4. `Real cross-country rentals`

Style: `sky-100` or `cream-50` background, `navy-900` text, `IBM Plex Mono` for the data labels if used elsewhere.

#### What Makes Hornbill Different (`DifferentiatorCards.tsx`)

4 white/cream cards, each with a small icon, heading, and one-sentence body:

1. **Flexibility** — `Part 61 training means your schedule, your pace. Choose your instructor or bring your own.`
2. **Consistency** — `One PA28 fleet, similarly equipped. Predictable handling and costs from first lesson to checkride.`
3. **Real-world experience** — `Cross-country rentals from day one. Plan a route, file, and go — instead of repeating the same practice area.`
4. **Value** — `$159/hr wet with membership. Transparent pricing, no fuel surcharge, no hidden fees.`

#### Programs Grid (`ProgramsGrid.tsx`)

7 cards linking to program pages. Use shared `src/content/programs.ts`.

| Program | Slug | Short description |
|---------|------|-------------------|
| Sport Pilot | `/programs/sport-pilot/` | Light-sport certificate with no medical required. |
| Private Pilot | `/programs/private-pilot/` | Fly passengers anywhere in the U.S. after your checkride. |
| Instrument Rating | `/programs/instrument-rating/` | Train for clouds, approaches, and real IFR confidence. |
| Commercial Pilot | `/programs/commercial-pilot/` | Build the hours and skills for a professional pilot career. |
| Certified Flight Instructor | `/programs/certified-flight-instructor/` | Teach the next generation of pilots. |
| CFII | `/programs/cfii/` | Add instrument instruction to your CFI certificate. |
| Mountain Flying | `/programs/mountain-flying/` | Sierra Nevada density-altitude and terrain course. |

Each card: icon or small image, title, 1-line description, CTA link text `See program`.

#### Discovery Flight Teaser (`DiscoveryFlightTeaser.tsx`)

Standalone section with `navy-900` or `gold-500` background to break the page:

- Headline: `Discovery flight: $199 for 45–60 minutes`
- Subtext: `No deposit required. You sit in the left seat, handle the controls, and decide if flying is for you.`
- Bullets: `Real aircraft at RNO`, `Choose your instructor`, `Gift vouchers available`
- CTA: `Book a discovery flight` → `/discovery-flight/`
- Secondary link: `Buy as a gift` → `/discovery-flight/?type=gift`

#### Instructor Preview (`InstructorPreview.tsx`)

4 cards from `src/content/instructors.ts`:

- Headshot/placeholder
- Name
- Specialty tags (e.g., `Private Pilot`, `Instrument`, `Mountain Flying`)
- Link: `Book with [Name]` → `/instructors/[slug]/` (or directly to discovery-flight with `?instructor=[slug]` if TICKET-003 supports it)
- Footer link: `Meet all instructors` → `/instructors/`

#### Pricing Snapshot (`PricingSnapshot.tsx`)

Compact table or 3-column cards:

| Item | Value |
|------|-------|
| Membership | `$49/month` |
| Member PA28 wet rate | `$159/hr` |
| Non-member PA28 wet rate | `$185/hr` |
| Discovery flight | `$199` |

CTA: `See full fleet and rates` → `/fleet/`

#### Social Proof (`SocialProof.tsx`)

Conditional logic:

- If 3+ testimonials exist in `src/content/homepage.ts`: render 3 testimonial cards with name, optional photo, star rating, quote.
- If fewer than 3 testimonials or no Google reviews: render a **founder/instructor credibility block** instead. Use real names, credentials, and a short credibility statement.
- Add `AggregateRating` schema only when 5+ reviews exist.

#### FAQ Accordion (`FAQAccordion.tsx`)

5–6 questions from `src/content/faq.ts`. Each item is a disclosure (button + `aria-expanded`, answer panel). Render `FAQPageSchema` with the same data.

Suggested questions:

1. `What is a discovery flight?`
2. `How much does flight training cost at Hornbill?`
3. `What is Part 61 training?`
4. `Can I choose my flight instructor?`
5. `Do you offer gift vouchers for discovery flights?`
6. `Where are you located?`

#### Latest Blog (`LatestBlog.tsx`)

3 most recent posts. Data source:

- If TICKET-014 provides a loader function, import it.
- Otherwise stub `src/content/blog.ts` with the 3 latest post teasers: title, slug, date, excerpt, category.

## 7. API / Widget / Data Requirements

- **No runtime API calls on the homepage itself.** It is a static Next.js page.
- **Booking API surface** is consumed by the linked `/discovery-flight/` page (TICKET-003), not this page.
- **Data files** (TypeScript modules or JSON) drive all dynamic content so the homepage can be statically generated at build time.
- **Images** must be committed to `public/images/` in WebP/AVIF format with explicit dimensions.
- **No pilot widgets** (METAR, density altitude, etc.) on the homepage; those live on dedicated tool pages (future ticket).

## 8. Dependencies on Other Tickets

| Ticket | Why it blocks/depends |
|--------|-----------------------|
| **TICKET-001** (Site shell, shared components, global SEO setup) | **Hard prerequisite.** Homepage needs `layout.tsx`, header, footer, fonts, theme, base schema helpers, and `site.ts` config. Do not start TICKET-002 until TICKET-001 is merged. |
| **TICKET-003** (Discovery Flight page) | **Hard prerequisite for the primary CTA.** Every CTA on the homepage links to `/discovery-flight/`. The page must exist and render. |
| **TICKET-005–TICKET-011** (Program pages) | **Soft prerequisite.** Homepage links to all 7 program pages. They need not be final, but routes should resolve (even if placeholder). Program data can be stubbed in `src/content/programs.ts` and refined later. |
| **TICKET-013** (Instructors index) | **Soft prerequisite.** Instructor preview cards use `src/content/instructors.ts`. If instructor pages are not ready, stub 4 placeholder instructors with slugs and a note to replace photos/bios later. |
| **TICKET-014** (Blog) | **Soft prerequisite.** Latest-blog section needs 3 posts. If blog is not ready, stub `src/content/blog.ts` with launch teaser posts. |
| TICKET-004 / fleet-pricing ticket | Soft dependency for the pricing snapshot. Rates are already defined in the design doc; can be hard-coded in `src/content/site.ts` or `src/content/pricing.ts` and reconciled later. |

**Execution order:**

1. Merge TICKET-001.
2. Build homepage sections using stub data files for programs, instructors, FAQ, and blog.
3. Merge TICKET-003 so CTAs have a real destination.
4. As program/instructor/blog tickets land, replace stub data with canonical shared content files.

## 9. Verification Steps

### 9.1 Automated / local checks

- [ ] Run `next build` and confirm static export completes with no errors.
- [ ] Confirm `dist/index.html` exists and contains the expected HTML.
- [ ] Run `npm run lint` (or equivalent) and resolve all lint errors.
- [ ] Run TypeScript check (`tsc --noEmit`) and resolve all type errors.
- [ ] Validate heading hierarchy with axe or similar: exactly one H1, logical H2→H3 order, no skipped levels.
- [ ] Confirm all internal links resolve (run a link checker on `dist/`): `/discovery-flight/`, `/programs/*`, `/instructors/`, `/fleet/`, `/blog/`.
- [ ] Run Lighthouse in Chrome DevTools: target LCP ≤2.0s, CLS ≤0.1, INP ≤200ms.
- [ ] Confirm hero image has `fetchpriority="high"`, explicit `width`/`height`, and WebP/AVIF source.

### 9.2 SEO / schema validation

- [ ] Google Rich Results Test: homepage passes with Organization, LocalBusiness, EducationalOrganization, BreadcrumbList, FAQPage, and WebSite entities.
- [ ] Verify title tag in `<head>`: `Part 61 Flight School in Reno, NV | Hornbill Flight Center`.
- [ ] Verify meta description ≤155 characters and includes "discovery flight," "PA28," and "RNO."
- [ ] Verify self-referencing canonical tag points to `https://hornbillaviation.com/`.
- [ ] Verify OpenGraph tags use title, description, URL, and image.
- [ ] Validate JSON-LD with [schema.org validator](https://validator.schema.org/); no errors or warnings for required fields.
- [ ] Confirm NAP in LocalBusiness schema matches footer, header, and `site.ts` byte-for-byte:
  - `1008 Gentry Way, Reno, NV 89512`
  - `555-555-1234`
  - `office@hornbillaviation.com`
- [ ] Confirm geo coordinates in LocalBusiness schema: `39.4991, -119.7681`.

### 9.3 Conversion / UX checks

- [ ] From homepage, book a discovery flight in ≤3 clicks/taps.
- [ ] Gift-voucher CTA passes `?type=gift` to `/discovery-flight/`.
- [ ] Phone number is tappable on mobile and triggers click-to-call.
- [ ] Sticky mobile CTA and phone link are visible and reachable.
- [ ] Hero H1 text exactly matches: `Part 61 flight school in Reno, NV.`
- [ ] CTA buttons use concrete verbs: "Book," "Buy," "See," "Meet."
- [ ] No clichés or superlatives in copy (audit against `brand_identity_writing_style.md` avoid-list).

### 9.4 Accessibility checks

- [ ] WCAG 2.2 AA audit: color contrast, keyboard navigation, focus indicators.
- [ ] FAQ accordion buttons have `aria-expanded` and control the answer panel via `aria-controls`.
- [ ] Hero image has descriptive alt text including location and aircraft.
- [ ] All interactive elements have ≥44 px touch targets on mobile.
- [ ] Skip-to-content link present in `layout.tsx` (TICKET-001) and works.

### 9.5 Cross-browser / device

- [ ] Test on 5+ viewport sizes (iPhone SE, iPhone Pro, iPad, desktop 1080p, desktop 1440p).
- [ ] Verify no layout shift on hero image load.
- [ ] Confirm mobile hamburger menu opens/closes and traps focus correctly (owned by TICKET-001, but homepage must not break it).

## 10. Open Questions / Risks

| Risk | Mitigation |
|------|------------|
| Real PA28 ramp photo not available | Use the `hero-image.BhmeJT7E_Z1oh9we.webp` asset from `images/` if it depicts the actual aircraft at RNO; otherwise schedule a photoshoot and use an approved placeholder with a TODO comment. |
| Real instructor bios/photos not ready at launch | Stub 4 instructor cards with placeholder names/slugs and explicit TODOs; replace once CFIs are hired/photographed. |
| Blog not ready | Stub 3 teaser posts in `src/content/blog.ts` and hide or mark as "coming soon" until TICKET-014 lands. |
| Discovery flight page not ready | Stub a redirect/placeholder at `/discovery-flight/` so CTAs do not 404; prioritize merging TICKET-003. |

## 11. Acceptance Criteria

- [ ] Homepage renders at `/` in the static export with no build errors.
- [ ] Exactly one H1 reads `Part 61 flight school in Reno, NV.`
- [ ] Primary CTA `Book a discovery flight` is visible above the fold on desktop and in the sticky mobile bar.
- [ ] Secondary CTA `Buy a gift voucher` links to `/discovery-flight/?type=gift`.
- [ ] Trust strip, 4 differentiator cards, 7 program cards, discovery teaser, instructor preview, pricing snapshot, FAQ accordion, and latest-blog section are all present and styled per `visual_identity.md`.
- [ ] All required schema markup validates in Google Rich Results Test.
- [ ] Title, meta description, canonical, and OpenGraph tags are correct and unique to the homepage.
- [ ] Hero image has explicit dimensions, `fetchpriority="high"`, and `loading="eager"`.
- [ ] NAP is byte-for-byte consistent across footer, schema, and `site.ts`.
- [ ] No empty superlatives, aviation clichés, or LLM hedges in final copy.
