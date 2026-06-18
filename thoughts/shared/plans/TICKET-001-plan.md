---
id: TICKET-001-plan
title: "Implementation plan: Site shell, shared components, and global SEO setup"
ticket: TICKET-001
status: draft
created: 2026-06-18
---

## 1. Scope summary

TICKET-001 establishes the foundation for the Hornbill Flight Center static Next.js marketing site. This ticket builds the shared site shell and global SEO infrastructure that every subsequent page ticket will consume. Because other tickets depend on these shared assets, this work must be completed first and must be as stable as possible.

What this ticket produces:

- A new Next.js 15+ project configured for **static export** (`output: 'export'`, `distDir: 'dist'`).
- Tailwind CSS v4 setup with the Hornbill color, typography, and spacing tokens derived from `thoughts/shared/design/visual_identity.md`.
- The global root layout (`app/layout.tsx`), error boundary, and 404 page.
- Reusable shell components used on every public page:
  - `Header` — sticky desktop and mobile header with logo, primary navigation, programs dropdown, persistent CTA, and phone link.
  - `Footer` — NAP block, quick links, legal links, map placeholder, social links, and Part 61 statement.
  - `MobileNav` — hamburger disclosure menu with touch targets ≥44 px.
  - `Container`, `Section`, `PageHeader`, `Button`, `PhoneLink`, `CTALink` primitives.
- Global metadata / SEO plumbing:
  - Title template and default meta description.
  - OpenGraph/Twitter image defaults.
  - Canonical URL helper.
  - Favicon and `manifest.json`.
  - `robots.txt` referencing the sitemap and allowing AI crawlers.
  - Auto-generated `sitemap.xml` via `next-sitemap`.
- Base JSON-LD schema components for `Organization`, `LocalBusiness`, and `EducationalOrganization` with the exact NAP from the design doc, plus a shared `SchemaInjector` helper.
- A documented file/folder convention and component API contract for downstream tickets.
- The **home page** shell at `/` with the hero, trust strip, and key sections referenced in the design doc. (This page may be later refined, but the homepage structure must ship here to validate the shell.)

This ticket does **not** implement: the booking API backend, the full booking widget, Stripe, blog content, program detail pages beyond the homepage program-grid teaser, pilot widgets, or individual instructor pages. Those are handled by dependent tickets.

---

## 2. Exact file paths to create or modify

### Project bootstrapping (new files)

Create the following root files to bootstrap the project. Assume the project root is `/Users/jack/hornbill-flying/`, consistent with the repository.

| File | Purpose |
|------|---------|
| `package.json` | Next.js 15, React 19, TypeScript, Tailwind CSS v4, `next-sitemap`, `eslint-config-next`, `sharp` for image optimization. |
| `next.config.ts` | Static export config, trailing-slash URLs, image unoptimization for static export, `distDir: 'dist'`. |
| `tsconfig.json` | Standard Next.js TypeScript paths (`@/*` → `./src/*`). |
| `tailwind.config.ts` | Theme tokens, font families, colors, screens, plugins. |
| `postcss.config.mjs` | Tailwind CSS v4 PostCSS plugin registration. |
| `eslint.config.mjs` | Next.js core web vitals + TypeScript aware rules. |
| `.nvmrc` | Node version pin (e.g., `20`). |

### Application code (new files under `src/`)

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout with fonts, global metadata, header/footer wrapper. |
| `src/app/page.tsx` | Homepage that composes all homepage sections. |
| `src/app/not-found.tsx` | 404 page, reachable at `/404.html` via static export. |
| `src/app/global-error.tsx` | Global error boundary. |
| `src/app/robots.ts` | Dynamic `robots.txt` route. |
| `src/app/sitemap.ts` | Dynamic `sitemap.xml` route (fallback if `next-sitemap` is not used at build time; one approach only). |
| `src/app/manifest.ts` | `manifest.json` for PWA basics. |
| `src/app/apple-icon.tsx` | Apple touch icon generated route. |
| `src/app/icon.tsx` | Favicon SVG generated from logo. |
| `src/lib/config.ts` | Single source of truth for site config: base URL, NAP, social URLs, brand defaults. |
| `src/lib/seo.ts` | Metadata helpers (`buildTitle`, `buildCanonical`, `buildOpenGraph`, `buildTwitter`). |
| `src/lib/schema.ts` | JSON-LD builders for Organization, LocalBusiness, EducationalOrganization, WebSite, BreadcrumbList, FAQPage, and a generic `SchemaInjector`. |
| `src/lib/routes.ts` | Route map object used by navigation, footer, sitemap, and breadcrumbs. |
| `src/lib/utils.ts` | `cn()` utility and other helpers. |
| `src/types/index.ts` | Shared TypeScript types (NavItem, Route, CTA, NAP, etc.). |
| `src/styles/globals.css` | Global CSS, Tailwind imports, font loading, custom utilities. |

### Component library (new files under `src/components/`)

| File | Purpose |
|------|---------|
| `src/components/Header.tsx` | Sticky header: logo, nav, programs dropdown, CTA, phone link. |
| `src/components/MobileNav.tsx` | Disclosure menu for mobile; uses `aria-expanded`. |
| `src/components/Footer.tsx` | Site footer with NAP, links, map placeholder, legal. |
| `src/components/Logo.tsx` | Brand logo component with text name "Hornbill Flight Center". |
| `src/components/PhoneLink.tsx` | Click-to-call link with tel schema and analytics data attribute. |
| `src/components/CTALink.tsx` | "Book a discovery flight" link/button used in header and across pages. |
| `src/components/Button.tsx` | Reusable button variants (primary, secondary, tertiary, accent) per visual identity. |
| `src/components/Container.tsx` | Max-width wrapper with responsive padding. |
| `src/components/Section.tsx` | Section wrapper with consistent vertical spacing and background variants. |
| `src/components/PageHeader.tsx` | Breadcrumb + H1 + optional subtitle for inner pages (built here for reuse). |
| `src/components/SchemaInjector.tsx` | Renders JSON-LD `<script type="application/ld+json">` tags. |
| `src/components/NavLink.tsx` | Accessible nav link with active state. |
| `src/components/ProgramCard.tsx` | Teaser card for program grid. |
| `src/components/InstructorPreviewCard.tsx` | Teaser for instructor preview. |
| `src/components/TrustStrip.tsx` | Four-item trust strip below hero. |
| `src/components/FAQAccordion.tsx` | Accessible accordion with FAQPage schema support. |
| `src/components/LatestPosts.tsx` | Teaser for 3 latest blog posts (accepts placeholder posts for now). |
| `src/components/SocialProof.tsx` | Testimonials block with conditional rendering until 5+ reviews exist. |
| `src/components/PricingSnapshot.tsx` | Membership vs non-member pricing snapshot. |
| `src/components/DiscoveryFlightTeaser.tsx` | Teaser section for discovery flight with CTA. |

### Homepage sections (new files under `src/sections/home/`)

| File | Purpose |
|------|---------|
| `src/sections/home/HeroSection.tsx` | Above-the-fold hero with H1, CTAs, trust strip, hero image. |
| `src/sections/home/DifferentiatorsSection.tsx` | Four cards for messaging pillars. |
| `src/sections/home/ProgramsGridSection.tsx` | Grid of program teaser cards. |
| `src/sections/home/DiscoveryFlightSection.tsx` | Discovery flight teaser. |
| `src/sections/home/InstructorPreviewSection.tsx` | 4 instructor previews. |
| `src/sections/home/PricingSnapshotSection.tsx` | Pricing snapshot. |
| `src/sections/home/SocialProofSection.tsx` | Testimonials / founder credibility block. |
| `src/sections/home/FAQSection.tsx` | FAQ accordion. |
| `src/sections/home/BlogTeaserSection.tsx` | Latest blog posts. |

### Static assets and content

| File | Purpose |
|------|---------|
| `public/logo.jpeg` | Copy of `images/logo.jpeg` for static serving. |
| `public/images/hero/` | Optimized hero images from `images/`. |
| `public/opengraph-default.jpg` | Default OG image (1200×630). |
| `src/content/programs.ts` | Static program metadata used by nav dropdown, homepage grid, and future program pages. |
| `src/content/instructors.ts` | Placeholder instructor metadata for the preview section and future instructor pages. |
| `src/content/faq.ts` | Homepage FAQ data. |

### Documentation and configuration

| File | Purpose |
|------|---------|
| `thoughts/shared/plans/TICKET-001-plan.md` | This plan. |

---

## 3. Reusable components to use from TICKET-001 (and other tickets)

### Components TICKET-001 introduces for shared use

All components listed in Section 2 are intended to be reused by subsequent tickets. The most important ones to get right are:

- `app/layout.tsx` — wraps every page with fonts, metadata defaults, header, footer, and base schema.
- `Header` / `MobileNav` — the navigation contract must be stable; downstream tickets only add new route entries to `src/lib/routes.ts`.
- `Footer` — contains canonical NAP; must be byte-for-byte consistent with schema and GBP.
- `PhoneLink` — single source of truth for the click-to-call number.
- `CTALink` — single source of truth for the "Book a discovery flight" CTA.
- `Button` — visual identity compliant variants.
- `Container` / `Section` / `PageHeader` — layout primitives every page uses.
- `SchemaInjector` + `src/lib/schema.ts` — every page ticket will import these to add page-specific schema.
- `FAQAccordion` — used on homepage, discovery flight page, program pages, and FAQ page with FAQPage schema.

### Components expected from dependent tickets

TICKET-001 must define extension points but not implement these:

- `DiscoveryFlightPicker`, `InstructorSelector`, `BookingForm`, `PaymentStep`, `ConfirmationView` — introduced by the booking widget ticket.
- Pilot widgets (METAR/TAF, density altitude calculator, fuel/time estimator, sunrise/sunset, route map, cost estimator) — introduced by a dedicated widgets ticket and linked from student resources.
- Blog post components and MDX pipeline — introduced by the blog ticket.
- Program detail page content blocks and instructor detail page blocks — introduced by program and instructor tickets.

### Component API contract for downstream tickets

Downstream tickets should:

1. Import shared layout primitives from `@/components/*` and do not re-create header/footer logic.
2. Add new routes to `src/lib/routes.ts` rather than hard-coding URLs.
3. Compose page metadata with `buildTitle`, `buildCanonical`, and `buildOpenGraph` from `src/lib/seo.ts`.
4. Add page-specific JSON-LD with `SchemaInjector` and helpers from `src/lib/schema.ts`.
5. Use `FAQAccordion` with an `id` prop and the `faqData` shape so FAQPage schema can be merged at build time.
6. Add images to `public/images/<page>/` and import with explicit width/height.

---

## 4. Page content/structure, schema markup, and SEO metadata

### 4.1 Global defaults (every page)

**Title template:**
```
%s | Hornbill Flight Center
```
Default title segment: `"Part 61 flight school in Reno, NV"`.

**Default meta description:**
```
Train with a Part 61 flight school at Reno-Tahoe (RNO). Choose your instructor, fly a consistent PA28 fleet, and book a discovery flight today.
```
Keep under 155 characters; allow per-page override.

**Canonical behavior:**
- Self-referencing canonical on every page.
- Trailing-slash URLs are canonical (Next.js `trailingSlash: true`).

**OpenGraph defaults:**
- `og:type`: `website`
- `og:site_name`: `Hornbill Flight Center`
- `og:image`: `/opengraph-default.jpg` (absolute URL)
- `og:locale`: `en_US`

**Twitter defaults:**
- `twitter:card`: `summary_large_image`
- `twitter:title` / `twitter:description` mirror page title/description.

**Base JSON-LD (injected in root layout):**

1. `Organization`
   - `@id`: `<baseUrl>/#organization`
   - `name`: `Hornbill Flight Center`
   - `url`: `<baseUrl>/`
   - `logo`: `<baseUrl>/logo.jpeg`
   - `sameAs`: GBP + social URLs (only active profiles).
2. `LocalBusiness` (subtype of `EducationalOrganization` is not directly valid as a subtype in schema.org; represent as `LocalBusiness` + `makesOffer` referencing educational services)
   - `@id`: `<baseUrl>/#localbusiness`
   - `name`: `Hornbill Flight Center`
   - `image`: hero image
   - `address` (PostalAddress): `1008 Gentry Way, Reno, NV 89512`
   - `telephone`: `+1-555-555-1234`
   - `email`: `office@hornbillaviation.com`
   - `geo`: `{ @type: GeoCoordinates, latitude: 39.4991, longitude: -119.7681 }`
   - `priceRange`: `$$`
   - `openingHoursSpecification`: office hours TBD (place placeholder; exact hours belong to a follow-up data ticket if unknown).
   - `url`: `<baseUrl>/`
3. `EducationalOrganization`
   - `@id`: `<baseUrl>/#educationalorganization`
   - `name`: `Hornbill Flight Center`
   - `address` references the same PostalAddress `@id`.
   - `hasCredential`: sport, private, instrument, commercial, CFI, CFII training.
4. `WebSite`
   - `@id`: `<baseUrl>/#website`
   - `url`: `<baseUrl>/`
   - `publisher` references `/#organization`.

### 4.2 Homepage (`/`)

**URL:** `/`
**Title:** `Part 61 Flight School in Reno, NV | Hornbill Flight Center`
**Meta description:**
```
Earn your pilot certificate at RNO. Part 61 training in a PA28 fleet, choose your CFI, and book a $199 discovery flight with no deposit.
```

**Content structure (in order):**

1. **HeroSection**
   - H1: "Part 61 flight school in Reno, NV."
   - Subheadline: "Train in a consistent PA28 fleet, choose your instructor, and fly real cross-country routes from Reno–Tahoe (RNO)."
   - Primary CTA: "Book a discovery flight" → `/discovery-flight/`
   - Secondary CTA: "Buy a gift voucher" → `/discovery-flight/?type=gift`
   - Hero image: `public/images/hero/hero-image.BhmeJT7E_Z1oh9we.webp` with explicit width/height, `fetchpriority="high"`, `loading="eager"`, alt: "PA28 Cherokee on the ramp at Reno-Tahoe International Airport".
   - Trust strip (4 items): Part 61 school at RNO, wet PA28 rental from $159/hr with membership, 4 named CFIs with certificate numbers, real cross-country rentals.
2. **DifferentiatorsSection**
   - 4 cards: Flexibility, Consistency, Real-world experience, Value.
3. **ProgramsGridSection**
   - Cards for SPL, PPL, IR, CPL, CFI, CFII, Mountain Flying; each links to its future program page URL.
4. **DiscoveryFlightSection**
   - "Discovery flight: $199 for 45–60 minutes. No deposit required." + what happens + repeat CTA.
5. **InstructorPreviewSection**
   - 4 instructor previews with name, specialty, "Book with [Name]" link to instructor detail page.
6. **PricingSnapshotSection**
   - Membership vs non-member wet rate, discovery flight price, CTA to `/fleet/`.
7. **SocialProofSection**
   - Conditional: if 5+ reviews exist, show 3 named testimonials + Google review badge. Else, show founder/instructor credibility block. For launch, render the credibility block.
8. **FAQSection**
   - 5–6 questions with FAQPage schema.
9. **BlogTeaserSection**
   - 3 latest blog post teasers.

**Schema markup (homepage-specific):**
- `Organization` + `LocalBusiness` + `EducationalOrganization` (base).
- `WebSite`.
- `BreadcrumbList` with one item: Home.
- `FAQPage` on the FAQ accordion.
- `AggregateRating` only once 5+ reviews exist; hide schema until then.

**Heading hierarchy:**
- H1: hero headline only.
- H2: each section title.
- H3: card titles.
- H4: small labels inside cards.

### 4.3 404 page (`/404/`)

**Title:** `Page Not Found | Hornbill Flight Center`
**Content:**
- H1: "Page not found"
- Copy: "That route is not in our flight plan."
- CTA links: "Book a discovery flight", "Back to home", "View programs".

### 4.4 robots.txt and sitemap

**robots.txt:**
```
User-agent: *
Allow: /

Sitemap: https://hornbillaviation.com/sitemap.xml
```
- Do not add blanket AI crawler blocks unless later requested.
- Reference exact production domain in `src/lib/config.ts`.

**sitemap.xml:**
- Generated from `src/lib/routes.ts`.
- Include `<loc>`, `<lastmod>` (build date), `<changefreq>` per route type, `<priority>` per route type.
- Routes for future pages can be pre-declared in `routes.ts` with `published: false` and filtered out until their ticket ships.

### 4.5 URL convention (establishes contract for all tickets)

- Trailing slashes on all public routes.
- Lowercase, hyphenated path segments.
- Program pages under `/programs/<slug>/`.
- Instructor pages under `/instructors/<slug>/`.
- Blog under `/blog/<slug>/`.
- Tools/widgets under `/tools/<slug>/`.
- Booking entry point at `/book/` and dedicated landing at `/discovery-flight/`.

---

## 5. API/widget/data requirements

### APIs used directly by TICKET-001

None. TICKET-001 is a purely static build. All data is hard-coded in content files under `src/content/` and `src/lib/config.ts`.

### Data files to create

| File | Data |
|------|------|
| `src/lib/config.ts` | Site base URL, brand name, NAP (address, phone, email), office hours placeholder, social URLs. |
| `src/content/programs.ts` | Program `slug`, `title`, `shortDescription`, `url`, `icon`, `targetCertificate`, `duration`, `costRange`. |
| `src/content/instructors.ts` | Placeholder instructor `slug`, `name`, `specialties`, `photo`, `certificateNumber` (omitted at launch per owner), `bio`, `bookingLink`. |
| `src/content/faq.ts` | FAQ `question`/`answer` pairs for homepage FAQPage schema. |

### Widgets / booking deferred to later tickets

- Booking widget components and `/api/*` routes are not in scope. However, TICKET-001 must reserve the component namespace and create the CTA links that point to `/discovery-flight/` and `/book/`.
- Pilot widgets (METAR, density altitude, fuel estimator, sunrise/sunset, route map, cost estimator) are not in scope. TICKET-001 only adds the persistent CTA, footer link to `/student-resources/`, and route placeholders.

### External integrations mentioned but not implemented

- Google Analytics 4 / GTM — add placeholder env vars and script component stub; do not load unless Measurement ID is present.
- Microsoft Clarity — add placeholder env var; script component stub.
- Stripe — not in scope.

---

## 6. Dependencies on other tickets

TICKET-001 is the foundation. It should have **no implementation dependencies** on other tickets and must ship first. However, downstream tickets will depend on it, so the plan must be explicit about what they consume.

### What TICKET-001 does not depend on

- No program detail page content needed.
- No booking backend needed.
- No real instructor photos or bios needed (use placeholders).
- No blog posts needed for the shell, but the homepage blog-teaser can render placeholder posts.
- No real customer reviews needed.

### What depends on TICKET-001 (for planning awareness)

| Dependent work | What it consumes from TICKET-001 |
|----------------|----------------------------------|
| Program pages (SPL, PPL, IR, CPL, CFI, CFII, Mountain Flying) | `PageHeader`, `Container`, `Section`, `Button`, `CTALink`, `PhoneLink`, `SchemaInjector`, `FAQAccordion`, `src/lib/schema.ts` Service/Course helpers, `src/content/programs.ts`. |
| Discovery Flight landing page | `Header`, `Footer`, `CTALink`, `PhoneLink`, `SchemaInjector`, `FAQAccordion`, base schema. |
| Booking widget ticket | `Button`, `Container`, form styling, route conventions. |
| Instructor list/detail pages | `PageHeader`, `Container`, `Section`, `PhoneLink`, `CTALink`, `src/content/instructors.ts`, schema helpers. |
| Fleet & Pricing page | `Container`, `Section`, `Button`, `src/lib/config.ts` pricing data. |
| Membership page | Same primitives + CTA. |
| Blog ticket | `Container`, `Section`, metadata helpers, `SchemaInjector` Article schema, route conventions. |
| Location / Contact page | `Footer` NAP, LocalBusiness schema, map placeholder. |
| Pilot widgets ticket | `/tools/` route convention, `Container`, `Section`, footer link. |
| Legal pages | `PageHeader`, `Container`, `Section`, base layout. |

### Optional future data tickets

If office hours or exact instructor details are not available at launch, create placeholder values in `src/lib/config.ts` and `src/content/instructors.ts` and flag them with a `// TODO: data ticket` comment for follow-up.

---

## 7. Verification steps

### 7.1 Build and export verification

1. Run `npm install` and `npm run build` (which executes `next build` + `next-sitemap` if configured).
2. Confirm the `dist/` folder is created and contains:
   - `index.html`
   - `404/index.html`
   - `sitemap.xml`
   - `robots.txt`
   - Static JS/CSS/image assets.
3. Verify no Next.js server-only features are used (no API routes, no `revalidate`, no `headers()`/`cookies()` calls).

### 7.2 Schema validation

1. For homepage and 404, run each generated HTML through:
   - Google Rich Results Test (live or local copy).
   - Schema.org validator (validator.schema.org) using "code snippet" mode.
2. Confirm JSON-LD is parseable and contains:
   - `Organization`, `LocalBusiness`, `EducationalOrganization`, `WebSite`, `BreadcrumbList`, and `FAQPage` on the homepage.
   - Exact NAP: `1008 Gentry Way, Reno, NV 89512`, `+1-555-555-1234`, `office@hornbillaviation.com`.
   - Geo coordinates `39.4991, -119.7681` in `LocalBusiness`.
3. Ensure no duplicate `@id` values and all references use absolute URLs.

### 7.3 SEO metadata checks

1. Verify homepage title is exactly: `Part 61 Flight School in Reno, NV | Hornbill Flight Center`.
2. Verify meta description is under 155 characters and contains "discovery flight", "PA28", "RNO".
3. Verify canonical link is self-referencing with trailing slash.
4. Verify `robots.txt` allows all user-agents and references the sitemap.
5. Verify `sitemap.xml` includes homepage and only published routes.

### 7.4 Accessibility and UX checks

1. Run axe-core or Lighthouse accessibility audit; target WCAG 2.2 AA with no critical errors.
2. Verify color contrast:
   - `gold-500` on `navy-900` passes AA for large text/UI components.
   - `gold-500` is not used as normal text on `cream-50` or `white`.
   - Body text is `ink` on `cream-50` or `white`.
3. Verify heading hierarchy: one H1 per page, no skipped levels.
4. Verify mobile nav:
   - Hamburger button has `aria-expanded` toggled.
   - Touch targets ≥44 px.
   - Focus trap or clear focus order inside open menu.
5. Verify keyboard navigation through header dropdown, footer links, and CTAs.

### 7.5 Core Web Vitals checks

1. Run Lighthouse on the exported `dist/index.html` (or via a local static server).
2. Targets:
   - LCP ≤ 2.0 s
   - CLS ≤ 0.1
   - INP ≤ 200 ms (lab estimate via Lighthouse TBT proxy)
3. Confirm hero image has explicit width/height, `fetchpriority="high"`, and uses WebP/AVIF.
4. Confirm fonts use `display=swap` and only required weights are loaded.

### 7.6 Content and copy checks

1. Read homepage copy against the forbidden-phrase list in `brand_identity_writing_style.md`:
   - No "unlock your potential", "soar to new heights", "sky's the limit", etc.
   - No LLM hedging.
2. Verify homepage H1 matches design: "Part 61 flight school in Reno, NV."
3. Verify CTAs are action-first: "Book a discovery flight", "Buy a gift voucher", "View programs".

### 7.7 Cross-ticket contract checks

1. Confirm `src/lib/routes.ts` exports a stable object that other tickets can extend.
2. Confirm `src/lib/schema.ts` exposes builders for `Service`, `Course`, `Article`, `FAQPage`, `BreadcrumbList`, and `AggregateRating`.
3. Confirm all shared components have a documented prop interface in `src/types/index.ts`.
4. Confirm page tickets can add metadata by importing `buildTitle`/`buildCanonical`/`buildOpenGraph` without editing `layout.tsx`.

### 7.8 Manual smoke tests

1. Serve `dist/` with `npx serve@latest dist` or similar.
2. Navigate to `/`, `/404/`, `/sitemap.xml`, `/robots.txt`, `/manifest.json`.
3. Verify header CTA and phone link are sticky/persistent on mobile viewport (320 px, 375 px, 414 px).
4. Verify footer NAP matches the schema exactly.
5. Verify all homepage section CTAs link to the correct future URLs.

---

## 8. Implementation order (suggested)

1. Bootstrap project files (`package.json`, `next.config.ts`, `tsconfig.json`, Tailwind, PostCSS, ESLint).
2. Add global styles and load fonts from Google Fonts in `src/styles/globals.css`.
3. Create `src/lib/config.ts`, `src/lib/seo.ts`, `src/lib/schema.ts`, `src/lib/routes.ts`, `src/types/index.ts`, `src/lib/utils.ts`.
4. Create layout primitives: `Container`, `Section`, `Button`, `PhoneLink`, `CTALink`, `NavLink`, `SchemaInjector`.
5. Create `Logo`, `Header`, `MobileNav`, `Footer`.
6. Create root layout, 404 page, and global error boundary.
7. Create dynamic `robots.ts`, `sitemap.ts`, and `manifest.ts`.
8. Create static content files (`programs.ts`, `instructors.ts`, `faq.ts`).
9. Build homepage section components and compose them in `app/page.tsx`.
10. Configure `next-sitemap` or keep the dynamic `sitemap.ts` (pick one).
11. Run build, fix errors, then execute verification steps.
12. Update ticket status and create handoff notes for dependent ticket owners.
