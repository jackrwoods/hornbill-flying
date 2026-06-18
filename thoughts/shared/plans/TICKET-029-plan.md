---
id: TICKET-029-plan
title: "Implementation plan: Final QA — schema, CWV, accessibility, local SEO, booking E2E"
ticket: TICKET-029
status: draft
created: 2026-06-18
---

## 1. Scope summary

TICKET-029 does **not** add new marketing pages; it builds the pre-launch quality-assurance harness and runs the full validation checklist defined in `thoughts/shared/design/website_layout_design.md:487-498`. The goal is to catch regressions in structure, SEO, performance, accessibility, local SEO, copy voice, and the critical booking conversion path before the site is submitted to Google Search Console or advertised publicly.

What this ticket produces:

- A local QA toolchain under `scripts/qa/` and `e2e/` that can run against the exported `dist/` site on a static file server.
- Automated internal link crawler verifying every public page is reachable from `/` within 3 clicks.
- JSON-LD/schema validator covering every schema type required by the design doc (Organization, LocalBusiness, EducationalOrganization, Service, Course, FAQPage, BreadcrumbList, Article, Event, Offer, AggregateRating, WebSite).
- Core Web Vitals lab test runner (Lighthouse CI or `lighthouse` CLI) with thresholds: LCP ≤2.0 s, INP ≤200 ms (TBT proxy), CLS ≤0.1.
- WCAG 2.2 AA accessibility scanner using axe-core via Playwright/Lighthouse.
- End-to-end booking smoke test that simulates a $0/test Stripe transaction through `/api/bookings` and verifies confirmation email, CRM entry, and nurture sequence triggers.
- NAP byte-for-byte consistency checker across site schema, site footer/contact, and a configurable directory/GBP reference.
- Copy/voice lint script that flags clichés, superlatives, and LLM hedges against `brand_identity_writing_style.md` forbidden-phrase list.
- Mobile UX checklist automation (viewport emulation, sticky CTA visibility, touch-target sizes) plus manual device matrix.
- SEO metadata auditor verifying unique title, H1, and meta description per page; self-referencing canonicals; sitemap integrity; robots.txt policy.
- A consolidated QA report generator (`qa-report.html` + `qa-report.json`) that blocks deploy if any critical check fails.

What this ticket does **not** implement: fixes to underlying code (those are returned to the owning tickets), performance optimizations, new content, the booking backend itself, or GBP directory management (it only validates consistency against reference files).

---

## 2. Exact file paths to create or modify

### QA automation scripts (new files under `scripts/qa/`)

| File | Purpose |
|------|---------|
| `scripts/qa/run-all.ts` | Orchestrates the full QA suite: build, serve `dist/`, run crawlers, CWV, a11y, schema, NAP, voice, E2E, then emit `qa-report.json`. |
| `scripts/qa/config.ts` | Shared QA configuration: `distDir`, test server port, threshold values, NAP reference, sitemap path, ignore list for crawler, directory reference file path. |
| `scripts/qa/serve-dist.ts` | Starts a tiny static server over `dist/`, returns `baseUrl` and a teardown function. |
| `scripts/qa/crawl.ts` | Internal link crawler starting at `/`. Records page depth, status code, incoming links, and orphaned assets. Enforces the "reachable within 3 clicks" rule. |
| `scripts/qa/validate-schema.ts` | Fetches each crawled page, extracts all JSON-LD blocks, validates required schema types, checks `@id` uniqueness, NAP presence in LocalBusiness, and required properties per schema type. |
| `scripts/qa/validate-seo.ts` | Verifies unique `<title>`, `<meta name="description">`, canonical link, H1 text, self-referencing canonical with trailing slash, and OpenGraph/Twitter tags. |
| `scripts/qa/validate-nap.ts` | Byte-for-byte comparison of name, address, phone, email across schema, footer, contact page, and configured GBP/directory reference. |
| `scripts/qa/validate-voice.ts` | Reads rendered text and flags forbidden phrases from the brand writing style guide; also checks H1 and CTA action-verb patterns. |
| `scripts/qa/lighthouse-runner.ts` | Runs Lighthouse on each public page; asserts LCP, CLS, TBT, and accessibility score. |
| `scripts/qa/axe-runner.ts` | Runs axe-core via Playwright against each page; reports critical/serious violations. |
| `scripts/qa/mobile-check.ts` | Emulates 5+ viewports, verifies sticky CTA visibility, hamburger `aria-expanded`, footer NAP visibility, and minimum touch-target size via computed styles. |
| `scripts/qa/sitemap-check.ts` | Validates `sitemap.xml` against `robots.txt`, checks every `<loc>` is reachable, and confirms no unpublished routes leak. |
| `scripts/qa/build-report.ts` | Converts `qa-report.json` into a human-readable `qa-report.html` and prints a CLI summary with exit code. |

### End-to-end booking test (new files under `e2e/`)

| File | Purpose |
|------|---------|
| `e2e/booking.spec.ts` | Playwright E2E spec: visit `/discovery-flight/`, select standard flight type, pick first available slot, fill booking form with test data, complete Stripe test payment (`4242 4242 4242 4242`), assert confirmation view shows booking reference and `.ics` download, and verify API/webhook side effects. |
| `e2e/helpers/booking.ts` | Test helpers: select date/time, fill form, assert confirmation, capture request/response logs. |
| `e2e/helpers/email.ts` | Polls a test email sink or logs email-sending events to confirm the confirmation email fired. |
| `e2e/helpers/crm.ts` | Polls CRM webhook stub or Attio/Folk/HubSpot test environment to assert CRM entry with correct tags. |
| `e2e/helpers/nurture.ts` | Verifies nurture sequence enqueue record (confirmation, 48h SMS, 24h email) from the booking backend logs or queue. |
| `e2e/fixtures/booking-user.json` | Standard test user data (fake name, email, phone, weight). |

### Reference data and configuration (new files)

| File | Purpose |
|------|---------|
| `qa-reference/nap.json` | Single source of truth for NAP validation: name, address lines, city, state, zip, country, phone (E.164 and display), email. |
| `qa-reference/directories.json` | Optional copy of top-directory/GBP NAP for cross-check (populated by marketing/owner; QA script compares against `nap.json`). |
| `qa-reference/schema-requirements.json` | Machine-readable rules: which schema types are required on which URLs, mandatory properties, and expected values (e.g., geo coordinates). |
| `qa-reference/forbidden-phrases.json` | Phrases and regex patterns from `brand_identity_writing_style.md` to flag in voice lint. |
| `qa-reference/expected-routes.json` | All public routes with expected title/H1/meta conventions for the SEO auditor. |
| `.github/workflows/qa.yml` | CI workflow that builds the static site, starts test server, runs the full QA suite, and fails the PR on critical findings. |
| `lighthouserc.json` | Lighthouse CI configuration with CWV thresholds and page list. |
| `playwright.config.ts` | Playwright configuration for E2E and axe tests, base URL derived from `scripts/qa/config.ts`. |

### Modified shared files

| File | Change |
|------|--------|
| `package.json` | Add dev dependencies: `playwright`, `@axe-core/playwright`, `lighthouse`, `lhci`, `puppeteer` or `playwright` for headless, `cheerio`, `node-fetch` or built-in `fetch`, `commander` or `tsx`. Add npm scripts: `qa`, `qa:schema`, `qa:cwv`, `qa:a11y`, `qa:e2e`, `qa:booking`. |
| `.gitignore` | Ignore `qa-report.*`, `e2e/test-results/`, `.lighthouseci/`, `playwright-report/`. |
| `next.config.ts` | Ensure `distDir: 'dist'` and `trailingSlash: true` so QA scripts know where to serve and what URL shape to expect. |

### Existing project files read by QA (no edits unless fixing a bug returned to another ticket)

| File | How QA consumes it |
|------|--------------------|
| `dist/**/*.html` | Crawled, parsed, and audited. |
| `dist/sitemap.xml` | Parsed for sitemap checks. |
| `dist/robots.txt` | Parsed to confirm sitemap reference and crawler policy. |
| `src/lib/config.ts` | NAP and base URL reference for schema validation. |
| `src/lib/routes.ts` | Expected route list for internal link crawl. |
| `src/lib/schema.ts` | Schema builder contracts (used to map expected schema types to URLs). |
| `src/content/*.ts` | FAQ and instructor content used to validate rendered text and schema completeness. |

---

## 3. Reusable components to use from TICKET-001 and other tickets

### From TICKET-001 (site shell)

QA reuses the **contracts** and **data sources** established by the shell ticket; it does not import UI components into tests.

| Asset | How QA uses it |
|-------|----------------|
| `src/lib/config.ts` | Canonical base URL, NAP, brand name, phone, email. Used by `validate-schema.ts`, `validate-nap.ts`, and `validate-seo.ts`. |
| `src/lib/routes.ts` | Expected public route map. Used by `crawl.ts` and `sitemap-check.ts` to detect missing/rogue pages. |
| `src/lib/schema.ts` | Expected JSON-LD builder outputs. QA asserts that rendered schema matches the shape produced by these helpers. |
| `src/lib/seo.ts` | Title template and metadata helpers. SEO auditor checks titles/descriptions follow the same template rules. |
| `Header` / `Footer` / `MobileNav` | Not imported, but tested via rendered HTML: persistent CTA, phone link, NAP text, hamburger `aria-expanded`, touch targets. |
| `SchemaInjector` pattern | QA expects JSON-LD to be rendered by the same injection helper and verifies script tag presence and parseability. |

### From other page and widget tickets

| Source | What QA consumes |
|--------|------------------|
| TICKET-002 (Homepage) | Hero H1 text, trust strip, FAQ items, and homepage-specific schema (LocalBusiness + FAQPage). |
| TICKET-003 (Discovery Flight + booking widget) | `/discovery-flight/` HTML, booking widget markup, Event + Offer schema, and the client path used by E2E booking test. |
| TICKET-004 through TICKET-011 (Program pages) | Service + Course schema per program, unique H1/title/meta, internal links to discovery flight and fleet. |
| TICKET-012 / instructor pages | Instructor detail URLs and bios; E-E-A-T check that certificate numbers appear if policy changed. |
| TICKET-013 / fleet & pricing | Pricing numbers, membership vs non-member rates, discovery-flight price consistency across site. |
| TICKET-014 / blog | Article schema on posts, named author, unique titles, internal link checks. |
| TICKET-024 or booking API ticket | `/api/availability`, `/api/bookings`, `/api/webhooks/stripe` endpoints exercised by the E2E booking test. |
| Widget tickets | Pilot-widget pages tested for client-side-only API calls, cached data, and no INP regression. |

### Components / helpers this ticket introduces for reuse

- `scripts/qa/config.ts` — shared thresholds and reference paths; later maintenance tickets can adjust CWV thresholds without editing individual scripts.
- `scripts/qa/serve-dist.ts` — reusable static-server harness for any future dist-level tests.
- `e2e/helpers/booking.ts` — reused by future regression tests when the booking flow changes.
- `qa-reference/*.json` — reference data reused by CI and local QA runs.

---

## 4. Page content/structure, schema markup, and SEO metadata

Because this is a QA ticket, this section defines **validation coverage per page type** rather than new page content. Each page type below lists the structure, schema, and SEO assertions QA must enforce.

### 4.1 Global assertions (every public page)

**Structure**
- Exactly one `<h1>`.
- Logical heading order with no skipped levels (`h1` → `h2` → `h3`, no `h4` before `h3`).
- Header persistent CTA visible on desktop and mobile (or sticky mobile bar): "Book a discovery flight".
- Click-to-call phone link present with `href="tel:+15555551234"`.
- Footer NAP text present and matches `qa-reference/nap.json` byte-for-byte.
- All internal links use trailing-slash canonical URLs.
- No broken internal links (HTTP 200 after JS hydration for any client-routed pages).

**Schema**
- Base `Organization`, `LocalBusiness`, `EducationalOrganization`, `WebSite` reachable from the root or every page that references them via `@id`.
- `BreadcrumbList` on every page except 404.
- No duplicate `@id` values within a page.
- All JSON-LD parses cleanly and validates in Schema.org/Rich Results context.

**SEO metadata**
- `<title>` unique per page, follows template, ≤60 chars ideally.
- `<meta name="description">` unique per page, ≤155 chars, includes relevant keyword.
- Canonical `<link rel="canonical">` self-referencing and matches the trailing-slash URL.
- OpenGraph `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name` present.
- Twitter card tags mirror OG.
- `robots.txt` allows all user-agents and references sitemap.

### 4.2 Homepage (`/`)

**Content/structure**
- H1: "Part 61 flight school in Reno, NV." (exact match).
- Hero subheadline includes PA28, instructor choice, RNO, cross-country.
- Primary CTA → `/discovery-flight/`; secondary CTA → `/discovery-flight/?type=gift`.
- Trust strip: Part 61 at RNO, $159/hr member wet rate, 4 named CFIs, real cross-country rentals.
- Programs grid links to all 7 program pages.
- Discovery flight teaser: "$199 for 45–60 minutes. No deposit required."
- FAQ accordion with 5–6 items.

**Schema**
- `Organization`, `LocalBusiness` (with exact NAP and geo coordinates `39.4991, -119.7681`), `EducationalOrganization`, `WebSite`, `BreadcrumbList`, `FAQPage`.
- `AggregateRating` only if ≥5 reviews exist; otherwise absent.

**SEO metadata**
- Title: `Part 61 Flight School in Reno, NV | Hornbill Flight Center`.
- Meta description under 155 chars and contains "discovery flight", "PA28", "RNO".

### 4.3 Discovery Flight page (`/discovery-flight/`)

**Content/structure**
- H1 targets "Book a discovery flight in Reno, NV." or equivalent.
- Flight-type selector (standard, Tahoe scenic, gift voucher), date/time calendar, booking form, payment step, confirmation view.
- Cancellation/weather policy visible.
- Sticky CTA or bottom bar on mobile.

**Schema**
- `Event` for discovery flight with `Offer` ($199 USD, `InStock`), `location` referencing `LocalBusiness`, `eventStatus: EventScheduled`.
- `FAQPage` for discovery-flight FAQ.
- `BreadcrumbList`.

**SEO metadata**
- Unique title and description, includes "$199", "Reno", "RNO", "PA28".

### 4.4 Program pages (`/programs/*/`)

**Content/structure**
- One H1 per page with primary keyword + "Reno, NV".
- Cost/timeline table, membership vs non-member note, CTA to book discovery flight.
- Internal links to related programs, fleet, financing.

**Schema**
- `Service` + `Course` per program, with `educationalCredentialAwarded` and `coursePrerequisites` where applicable.
- `FAQPage` on each page.
- `BreadcrumbList`.

**SEO metadata**
- Unique title/description per program; title formula: `{Program} Training in Reno, NV | Hornbill Flight Center`.

### 4.5 Blog pages (`/blog/` and `/blog/[slug]/`)

**Content/structure**
- Pillar post ≥2,500 words; cluster posts linked.
- Named author with bio and credentials.
- Internal links to program pages and discovery flight.

**Schema**
- `Article` on every post with `author`, `datePublished`, `dateModified`, `headline`, `image`.
- `FAQPage` where applicable.
- `BreadcrumbList`.

### 4.6 Location / Contact page (`/location/`, `/contact/`)

**Content/structure**
- Address, phone, email, hours, map/directions, airport access note.

**Schema**
- `LocalBusiness` and `BreadcrumbList`.
- Geo coordinates present.

### 4.7 Booking app entry (`/book/`)

**Content/structure**
- Flow selector, stepper, help block with phone link, cancellation policy.

**Schema**
- `WebPage`, `Event` + `Offer`, `BreadcrumbList`, optional `FAQPage`.

---

## 5. API/widget/data requirements

### APIs consumed by QA tests

| Endpoint | Method | Purpose | Test file |
|----------|--------|---------|-----------|
| `/api/availability` | GET | Returns slots for a date range. | `e2e/booking.spec.ts` and widget tests. |
| `/api/bookings` | POST | Creates a booking with test payment token. | `e2e/booking.spec.ts`. |
| `/api/bookings/:id` | GET | Retrieves created booking. | `e2e/helpers/booking.ts`. |
| `/api/webhooks/stripe` | POST | Simulates Stripe payment event; QA script sends a test event. | `e2e/helpers/stripe.ts` (new). |
| `/api/gift-vouchers` | POST | Creates voucher purchase (optional E2E). | `e2e/gift-voucher.spec.ts` (new, optional). |
| `/api/gift-vouchers/:code` | GET | Validates voucher code. | `e2e/gift-voucher.spec.ts`. |

### External data/services touched by QA

| Service | Purpose | Notes |
|---------|---------|-------|
| Stripe (test mode) | Complete a $0/test card transaction. | Use `4242 4242 4242 4242`, any future date, any CVC, any ZIP. |
| Test email sink / Mailgun/Postmark logs | Confirm confirmation email sent. | If no test sink, assert that the backend logs the send and that the email template renders. |
| CRM test workspace (Attio / Folk / HubSpot) | Assert CRM entry created with correct contact and tags. | Use test API key; delete test record after assertion. |
| Queue/log sink | Assert nurture sequence scheduled. | Backend exposes a test-only status endpoint or QA reads logs. |
| NOAA/NWS Aviation Weather API | Widget tests only; assert client-side call and decode. | Do not call in CI if rate-limited; mock response acceptable. |

### Widget-specific QA requirements

- METAR/TAF widget: client-side fetch only, decode present, link to Aviation Weather Center.
- Density altitude calculator: inputs elevation (4,403 ft), altimeter, temperature; outputs pressure/density altitude and caution flag.
- Cross-country fuel/time estimator: origin auto RNO, inputs cruise speed/fuel burn/winds; outputs time, fuel, VFR reserve.
- Sunrise/sunset widget: today’s times at RNO; no server-side call.
- Practice area map: static SVG with labels.
- Cost estimator: sliders produce rough total and timeline.

Each widget page must pass axe-core, have unique title/H1/meta, and include FAQPage schema where the design doc requires it.

---

## 6. Dependencies on other tickets

TICKET-029 is the **last ticket before launch**. It depends on all prior build tickets being code-complete and merged into `main`.

### Must be completed before TICKET-029

| Ticket | What it provides |
|--------|------------------|
| TICKET-001 | Site shell, shared config, routes, base schema, build pipeline. Without this, there is nothing to validate. |
| TICKET-002 | Homepage content and schema. |
| TICKET-003 | Discovery flight landing page + booking widget (client-side flow, Event schema, FAQPage). |
| TICKET-004 through TICKET-011 | All program pages (PPL, SPL, IR, CPL, CFI, CFII, Mountain Flying) with Service/Course schema. |
| TICKET-012 / instructor pages | Instructor list/detail pages. |
| TICKET-013 / fleet & pricing | Pricing consistency, membership page, aircraft cards. |
| TICKET-014 / blog | Blog index + MDX posts with Article schema. |
| TICKET-015 through TICKET-023 | Cross-country, location, about, financing, FAQ, contact, legal pages, student resources, tools/widgets. |
| TICKET-024 or booking API ticket | `/book/` entry, booking API endpoints, Stripe webhook handler, CRM/nurture integration. |

### What this ticket does not depend on

- Real customer reviews (AggregateRating check is conditional).
- Real instructor photos (placeholder pages still validate for schema and links).
- Live production domain (QA runs against local `dist/`).
- GBP being fully verified (NAP reference file can be populated manually; the script checks byte-for-byte consistency once provided).

### What depends on TICKET-029

| Dependent work | What it consumes |
|----------------|------------------|
| Launch / go-live | QA report must pass before GSC submission, DNS cutover, or ad spend. |
| Post-launch maintenance | QA scripts become regression suite for future tickets. |
| Performance/content tickets | Failing QA checks are returned as follow-up tickets. |

---

## 7. Verification steps

### 7.1 Build and environment setup

1. Run `npm install` to install QA dependencies.
2. Run `npm run build` to produce `dist/`.
3. Confirm `dist/` contains `index.html`, `404/index.html`, `sitemap.xml`, `robots.txt`, and all route folders.
4. Run `npx playwright install` to ensure browsers are available for E2E and axe tests.

### 7.2 Internal link crawl

1. Run `npx tsx scripts/qa/crawl.ts`.
2. Confirm every route in `src/lib/routes.ts` with `published: true` is reachable.
3. Confirm every reachable page is within 3 clicks of `/`.
4. Confirm no 4xx/5xx internal links and no orphaned CSS/JS/image assets referenced by a page.

### 7.3 Schema validation

1. Run `npx tsx scripts/qa/validate-schema.ts`.
2. For each public HTML page, confirm required schema types from `qa-reference/schema-requirements.json` are present.
3. Validate extracted JSON-LD against Schema.org using a local JSON Schema check or Google Rich Results Test snippet mode.
4. Confirm NAP in LocalBusiness matches `qa-reference/nap.json` exactly:
   - Name: Hornbill Flight Center
   - Address: 1008 Gentry Way, Reno, NV 89512
   - Phone: +1-555-555-1234
   - Email: office@hornbillaviation.com
   - Geo: latitude 39.4991, longitude -119.7681
5. Confirm no duplicate `@id` values and all cross-references use absolute URLs.
6. Confirm Event/Offer on `/discovery-flight/` has price `199.00`, currency `USD`, availability `InStock`.

### 7.4 Core Web Vitals

1. Run `npm run qa:cwv` (Lighthouse CI or CLI runner).
2. Test on desktop and mobile emulation for homepage, `/discovery-flight/`, `/programs/private-pilot/`, `/fleet/`, `/book/`.
3. Assert thresholds:
   - LCP ≤2.0 s
   - CLS ≤0.1
   - TBT (lab proxy for INP) ≤200 ms
4. Confirm hero image has explicit `width`/`height`, `fetchpriority="high"`, and uses WebP/AVIF.
5. Confirm fonts use `display=swap` and only required weights load.
6. Confirm no layout shift from late-loading web fonts or un sized images.

### 7.5 Accessibility audit

1. Run `npm run qa:a11y` (Playwright + axe-core against each public page).
2. Target WCAG 2.2 AA with zero critical or serious violations.
3. Manually verify:
   - Color contrast: `gold-500` on `navy-900` passes for large text/UI; `gold-500` is not used as normal text on `cream-50`/`white`.
   - Heading hierarchy: one H1, no skipped levels.
   - Mobile nav hamburger toggles `aria-expanded` and has focus management.
   - All form inputs have visible labels and focus rings.
   - Touch targets are ≥44 px.

### 7.6 SEO metadata audit

1. Run `npx tsx scripts/qa/validate-seo.ts`.
2. Confirm every public page has a unique `<title>` and `<meta name="description">`.
3. Confirm H1 is unique per page and matches expected primary keyword.
4. Confirm canonical link is self-referencing with trailing slash.
5. Confirm `robots.txt` allows all and references sitemap.
6. Confirm `sitemap.xml` includes every published route and only published routes.
7. Confirm OpenGraph/Twitter tags are present and use absolute URLs.

### 7.7 Booking E2E

1. Run `npm run qa:booking` or `npx playwright test e2e/booking.spec.ts`.
2. Steps:
   - Visit `/discovery-flight/`.
   - Select standard PA28 discovery flight.
   - Select first available date/time slot (stub or real availability).
   - Fill first name, last name, phone, email, optional weight.
   - Complete Stripe test payment.
   - Assert confirmation view shows booking reference, flight details, calendar invite download, and cancellation/weather policy.
3. Verify confirmation email was sent and contains booking reference, instructor/what-to-wear/parking info.
4. Verify CRM entry created with tag/source matching discovery flight.
5. Verify nurture sequence enqueued: immediate confirmation, 48h SMS reminder, 24h pre-flight email.
6. If gift-voucher test is included, verify voucher purchase and redemption code path.

### 7.8 Mobile UX check

1. Run `npx tsx scripts/qa/mobile-check.ts` for viewports: 320×568, 375×667, 390×844, 414×896, 768×1024.
2. Confirm sticky header or bottom bar with "Book a discovery flight" CTA is visible and tappable on every tested page.
3. Confirm phone link is tappable and uses `tel:`.
4. Confirm calendar/time slots in booking widget are thumb-tappable (≥44 px).
5. Confirm Apple Pay / Google Pay UI is available if Stripe supports the test environment.
6. Confirm no horizontal overflow at any viewport.

### 7.9 Local SEO / NAP

1. Run `npx tsx scripts/qa/validate-nap.ts`.
2. Confirm NAP is byte-for-byte identical across:
   - `LocalBusiness` JSON-LD
   - `Organization` JSON-LD (where address appears)
   - Site footer
   - `/contact/` page
   - `/location/` page
   - `qa-reference/directories.json` (GBP + top 10 directories, populated by owner/marketing)
3. Confirm Google Business Profile primary category is "Flight School" if directory data is provided.
4. Confirm geo coordinates in schema match RNO.

### 7.10 Copy/voice check

1. Run `npx tsx scripts/qa/validate-voice.ts`.
2. Confirm no forbidden phrases from `brand_identity_writing_style.md` are present:
   - "passion for aviation", "unlock your potential", "soar to new heights", "sky's the limit", "world-class", "premier", "best-in-class", "aviation family", "in today's world", "it's important to note", "at the end of the day", "ultimately", etc.
3. Confirm CTAs begin with verbs: "Book", "See", "Meet", "Start", "Call".
4. Confirm homepage H1 exactly matches design.
5. Confirm prices are stated plainly ("$199", "$159/hr wet") and not hidden behind vague affordability claims.

### 7.11 Google Search Console readiness

1. Confirm sitemap submitted and indexed status can be checked after deploy.
2. Confirm no `noindex` tags on public pages.
3. Confirm canonicals and trailing-slash URLs are consistent so GSC does not report duplicate pages.
4. Confirm `robots.txt` allows AI crawlers and search bots (no blanket blocking).

### 7.12 Consolidated report

1. Run `npm run qa` (full suite).
2. Inspect `qa-report.json` and `qa-report.html`.
3. Ensure the script exits non-zero if any critical check fails.
4. Attach `qa-report.html` to the launch sign-off.

---

## 8. Implementation order (suggested)

1. Create `qa-reference/*.json` reference files with NAP, forbidden phrases, schema requirements, and expected routes.
2. Add QA dev dependencies and npm scripts to `package.json`; update `.gitignore`.
3. Build shared QA utilities: `scripts/qa/config.ts`, `scripts/qa/serve-dist.ts`.
4. Implement the internal link crawler (`scripts/qa/crawl.ts`).
5. Implement schema validator (`scripts/qa/validate-schema.ts`).
6. Implement SEO metadata auditor (`scripts/qa/validate-seo.ts`).
7. Implement NAP consistency checker (`scripts/qa/validate-nap.ts`).
8. Implement copy/voice linter (`scripts/qa/validate-voice.ts`).
9. Configure Lighthouse CI (`lighthouserc.json`) and CWV runner.
10. Configure Playwright and axe-core; write `scripts/qa/axe-runner.ts` and `scripts/qa/mobile-check.ts`.
11. Write E2E booking spec and helpers (`e2e/booking.spec.ts`, `e2e/helpers/*`).
12. Write `scripts/qa/run-all.ts` and `scripts/qa/build-report.ts` to produce consolidated report.
13. Add GitHub Actions workflow `.github/workflows/qa.yml`.
14. Wait for all dependent build tickets to merge, then run the full suite.
15. File follow-up tickets for any failing checks, re-run QA after fixes, and attach final `qa-report.html` to launch approval.
