---
id: TICKET-028-plan
title: "Implementation plan: Analytics, conversion events, and UTM setup"
ticket: TICKET-028
status: draft
created: 2026-06-18
related_tickets:
  - TICKET-001
  - TICKET-002
  - TICKET-003
  - TICKET-004
  - TICKET-005
  - TICKET-006
  - TICKET-007
  - TICKET-008
  - TICKET-009
  - TICKET-010
  - TICKET-011
  - TICKET-012
  - TICKET-013
  - TICKET-014
  - TICKET-021
  - TICKET-024
  - TICKET-025
  - TICKET-029
related_design:
  - thoughts/shared/design/website_layout_design.md
---

## 1. Scope summary

TICKET-028 wires up Hornbill's day-one measurement stack and exposes a single, reusable events layer that every page ticket can import. It does **not** build any new public page; it modifies the global shell (created in TICKET-001) and ships utilities that downstream tickets call when visitors convert or engage.

What this ticket produces:

- Google Analytics 4 loaded via Google Tag Manager (GTM) with a configurable Measurement ID.
- Microsoft Clarity session-recording/heatmap script with a configurable Project ID.
- A lightweight, typed `dataLayer`-based events library in `src/lib/analytics.ts`.
- A React `AnalyticsProvider` + `useAnalytics()` hook for page-level and component-level event firing.
- Trackable wrappers (`TrackedButton`, `TrackedLink`, `TrackedPhoneLink`, `TrackedCTALink`) that auto-fire `cta_click`, `phone_click`, and `email_click` while preserving the existing TICKET-001 UI behavior.
- UTM parameter capture on first entry and a `buildExternalUrl()` helper that appends consistent UTM tags to outbound links (social, Stratus Financial, Aviation Weather Center, etc.).
- A documented event dictionary for the nine required conversion events:
  - `discovery_flight_booking_started`
  - `discovery_flight_booking_completed`
  - `phone_click`
  - `email_click`
  - `membership_signup_started`
  - `membership_signup_completed`
  - `program_page_view`
  - `instructor_page_view`
  - `blog_subscription`
- Google Search Console domain-property verification via DNS TXT record (launch operations step, not code).
- Environment configuration and a runbook for swapping staging vs. production IDs.

What this ticket does **not** implement:

- The booking backend, payment processing, or calendar availability logic.
- The actual program pages, instructor pages, membership page, blog, or contact page (those tickets fire events by importing this layer).
- Cookie-consent UI beyond a link to the Privacy Policy (TICKET-025).

---

## 2. Exact file paths to create or modify

### New analytics library files

| File | Purpose |
|------|---------|
| `src/types/analytics.ts` | Shared TypeScript types: `AnalyticsEvent`, `ConversionEvent`, `EventProperties`, `UTMParams`, `DataLayerObject`. |
| `src/lib/analytics.ts` | Core event layer: `pushEvent(event, properties)`, typed event-name constants, `dataLayer` bootstrap/typing, and helper functions for each conversion event. |
| `src/lib/utm.ts` | UTM parsing (`getUTMParamsFromURL`, `storeUTMParams`, `readStoredUTMParams`) and `buildExternalUrl(url, utm)` for outbound links. |
| `src/hooks/useAnalytics.ts` | React hook that returns `track`, `trackConversion`, and the currently stored UTM context. |
| `src/components/AnalyticsProvider.tsx` | Client component that initializes the `dataLayer`, captures UTM params on first load, re-captures on router navigation, and provides context to children. |
| `src/components/GoogleTagManager.tsx` | Injects the GTM loader script and the noscript iframe fallback when `NEXT_PUBLIC_GTM_ID` is present. |
| `src/components/MicrosoftClarity.tsx` | Injects the Clarity loader script when `NEXT_PUBLIC_CLARITY_PROJECT_ID` is present. |
| `src/components/TrackedLink.tsx` | Wrapper around Next.js `<Link>` that fires `cta_click` with `link_text`, `href`, and `section` props. |
| `src/components/TrackedButton.tsx` | Wrapper around the TICKET-001 `Button` that fires `cta_click`. |
| `src/components/TrackedCTALink.tsx` | Re-exports/wraps the TICKET-001 `CTALink` so every "Book a discovery flight" CTA is automatically instrumented. |
| `src/components/TrackedPhoneLink.tsx` | Wraps the TICKET-001 `PhoneLink` and fires `phone_click` with the clicked number and page context. |
| `src/components/TrackedEmailLink.tsx` | Wraps mailto links and fires `email_click` with `email_address` and `page_path`. |

### Modified shared files (extend from TICKET-001)

| File | Change |
|------|--------|
| `src/app/layout.tsx` | Mount `AnalyticsProvider`, `GoogleTagManager`, and `MicrosoftClarity` inside the root layout so scripts load on every public page. Keep the existing base JSON-LD/Organization/LocalBusiness schema untouched. |
| `src/lib/config.ts` | Add an `analytics` object with `gtmId`, `clarityProjectId`, `searchConsoleVerification`, and `measurementId` placeholders. Read values from `process.env` with safe fallbacks. |
| `src/components/CTALink.tsx` | Export a second named export `CTALink` (untracked) and ensure the tracked version can be used as a drop-in replacement; no visual change. |
| `src/components/PhoneLink.tsx` | Same as above: keep the base component and allow `TrackedPhoneLink` to compose it. |
| `src/components/Button.tsx` | Ensure `Button` supports `data-analytics-event` and `data-analytics-section` attributes, or accept an `onClick` that `TrackedButton` can compose. |
| `next.config.ts` | Add `env` block or ensure `NEXT_PUBLIC_*` variables are available at build time. Document that static export bakes these IDs into the bundle. |
| `.env.example` | Create or append analytics environment variables: `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_CLARITY_PROJECT_ID`, `NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION`. |

### Documentation / runbook

| File | Purpose |
|------|---------|
| `docs/analytics-runbook.md` | Step-by-step launch checklist for GTM container publish, GA4 custom event configuration, Clarity project creation, and Search Console DNS TXT verification. (Optional; can live as comments in the ticket if the project does not yet have a `docs/` folder.) |

---

## 3. Reusable components to use from TICKET-001 (shell) and other tickets

### From TICKET-001 (must already exist)

| Component / file | How TICKET-028 uses it |
|------------------|------------------------|
| `app/layout.tsx` | Mounts analytics providers and scripts on every public page. |
| `src/lib/config.ts` | Reads site base URL, brand name, NAP, and now analytics IDs. |
| `src/lib/routes.ts` | Provides canonical internal route paths so event payloads can record `page_path` consistently. |
| `src/lib/utils.ts` | Uses `cn()` if building styled wrapper components. |
| `src/components/Header.tsx` | Header CTA will be swapped or augmented with `TrackedCTALink` to capture clicks. |
| `src/components/MobileNav.tsx` | Mobile "Book a discovery flight" and phone links use `TrackedCTALink` / `TrackedPhoneLink`. |
| `src/components/Footer.tsx` | Footer phone/email use tracked wrappers. |
| `src/components/CTALink.tsx` | Base component wrapped by `TrackedCTALink`. |
| `src/components/PhoneLink.tsx` | Base component wrapped by `TrackedPhoneLink`. |
| `src/components/Button.tsx` | Base component wrapped by `TrackedButton`. |
| `src/components/SchemaInjector.tsx` | Confirms base JSON-LD is not broken by newly injected third-party scripts. |

### Components expected from dependent tickets

These tickets do not block TICKET-028, but they are the consumers of the events layer:

| Ticket | What it consumes from TICKET-028 |
|--------|----------------------------------|
| TICKET-002 (Homepage) | `TrackedCTALink`, `TrackedPhoneLink`, `TrackedButton` for hero CTAs, trust strip, and section CTAs. |
| TICKET-003 (Discovery Flight landing page) | `trackDiscoveryFlightBookingStarted(type)`, `trackDiscoveryFlightBookingCompleted(reference)` from `src/lib/analytics.ts`. |
| TICKET-004 through TICKET-011 (Program pages) | `trackProgramPageView(slug)` from `src/lib/analytics.ts`. |
| TICKET-012 (Membership page) | `trackMembershipSignupStarted()` and `trackMembershipSignupCompleted()` from `src/lib/analytics.ts`. |
| TICKET-013 (Instructors index) | `trackInstructorPageView(slug)` for each instructor card click and the index page itself. |
| TICKET-014 (Individual instructor pages) | `trackInstructorPageView(slug)` on page load and `TrackedCTALink` for "Book with [Name]" CTAs. |
| TICKET-021 (Blog infrastructure) | `trackBlogSubscription()` for the email-subscribe component. |
| TICKET-024 (Booking app entry) | Imports core analytics and extends it in `src/lib/booking-analytics.ts` with booking-step events (`booking_flow_started`, `booking_step_changed`, `booking_completed`). |
| TICKET-025 (Legal pages) | Privacy Policy references GA4/GTM/Clarity cookies; analytics layer must not break legal page rendering. |
| TICKET-029 (Final QA) | Validates analytics events, GTM/Clarity loading, and Search Console verification. |

---

## 4. Page content/structure, schema markup, and SEO metadata

### Public pages created by this ticket

None. TICKET-028 is a global-layer ticket. It does not add a new route or page-level metadata export.

### Script and metadata injection

- `src/app/layout.tsx` remains the single source of truth for global metadata (title template, OpenGraph, canonical, favicon). TICKET-028 only appends analytics script components inside the `<body>` and does not override `metadata`.
- `GoogleTagManager` renders the standard GTM loader:
  - `<script>` in `<head>` via `dangerouslySetInnerHTML` or a dedicated inline script.
  - `<noscript><iframe>` immediately after `<body>` open.
- `MicrosoftClarity` renders the standard Clarity loader as a deferred inline script.
- Both components are **no-ops** when their respective env vars are empty, so local/staging builds do not error if IDs are missing.

### UTM parameter conventions

Capture on first entry and store in `sessionStorage` (preferred) with `localStorage` fallback for cross-session attribution:

| Parameter | Usage |
|-----------|-------|
| `utm_source` | External referrer category: `google`, `facebook`, `instagram`, `yelp`, `nextdoor`, `email`, `sms`, `brochure`, `partner` |
| `utm_medium` | Channel type: `organic`, `cpc`, `social`, `email`, `qr`, `referral`, `print` |
| `utm_campaign` | Campaign slug, e.g., `reno-discovery-launch`, `holiday-gift-voucher-2026` |
| `utm_term` | Optional keyword for paid search, e.g., `private pilot reno` |
| `utm_content` | Optional creative/ad variant, e.g., `hero-video`, `footer-link` |

Rules:

- UTM params are **only appended to external links** (social profiles, Stratus Financial application, Aviation Weather Center, FAA MedXPress, etc.).
- Internal Hornbill links never carry UTM parameters; use event context instead.
- If a returning visit arrives without UTMs, reuse the last stored non-empty UTM set for up to 30 minutes (session window), then clear.
- `document.referrer` is captured as a separate `referrer` event property, not as a fake UTM.

### Conversion event dictionary

Every event pushed to `dataLayer` includes:

```text
{
  event: '<event_name>',
  page_path: '<canonical path>',
  page_title: '<document.title>',
  utm_source, utm_medium, utm_campaign, utm_term, utm_content,
  ...event-specific properties
}
```

Event-specific properties:

| Event | Fired when | Required properties |
|-------|------------|---------------------|
| `discovery_flight_booking_started` | Visitor selects a flight type and proceeds to date/time or details | `flight_type`: `standard` / `tahoe` / `gift` |
| `discovery_flight_booking_completed` | Payment succeeds and confirmation view renders | `flight_type`, `booking_reference`, `instructor_slug` (optional), `value_usd` |
| `phone_click` | Any `tel:` link is clicked | `phone_number`, `link_text`, `section` |
| `email_click` | Any `mailto:` link is clicked | `email_address`, `link_text`, `section` |
| `membership_signup_started` | Visitor clicks "Start membership" CTA | `location`: `membership_page` / `fleet_page` / `pricing_section` |
| `membership_signup_completed` | Membership purchase/sign-up API returns success | `plan`: `monthly`, `value_usd` |
| `program_page_view` | Program page component mounts (not just route load) | `program_slug`: e.g., `private-pilot`, `instrument-rating` |
| `instructor_page_view` | Instructors index or individual instructor page mounts | `instructor_slug`: index uses `index`, detail uses the slug |
| `blog_subscription` | Blog email subscribe form submits successfully | `source_page`: blog index or post slug |

Helper functions in `src/lib/analytics.ts` should expose one strongly typed function per event so page tickets cannot miss required properties.

---

## 5. API/widget/data requirements

### External scripts and services

| Service | What is loaded | Configuration |
|---------|----------------|---------------|
| Google Tag Manager | GTM loader + dataLayer bootstrap | `NEXT_PUBLIC_GTM_ID` |
| Google Analytics 4 | Configured inside the GTM container; Measurement ID stored in env for reference | `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| Microsoft Clarity | Session recording + heatmap loader | `NEXT_PUBLIC_CLARITY_PROJECT_ID` |
| Google Search Console | Domain property verification via DNS TXT record | `NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION` (the verification token, for documentation) |

### APIs implemented by this ticket

None. This is a static marketing site. Analytics events are pushed client-side to `window.dataLayer` and consumed by the third-party scripts loaded in the browser.

### Data files to create

| File | Data |
|------|------|
| `src/lib/config.ts` | `analytics.gtmId`, `analytics.gaMeasurementId`, `analytics.clarityProjectId`, `analytics.searchConsoleToken`. |
| `src/types/analytics.ts` | Event and UTM TypeScript contracts. |
| `src/content/utm-defaults.ts` (optional) | Default UTM sets for recurring outbound destinations (social profiles, Stratus Financial, Aviation Weather Center) so links stay consistent. |

### Data expected from dependent tickets

- Booking confirmation data (booking reference, flight type, value) from TICKET-003/TICKET-024 to complete `discovery_flight_booking_completed`.
- Membership sign-up confirmation from TICKET-012 to complete `membership_signup_completed`.
- Blog subscription confirmation from TICKET-021 to complete `blog_subscription`.

---

## 6. Dependencies on other tickets

### Must be completed first

| Ticket | Why it blocks TICKET-028 |
|--------|--------------------------|
| TICKET-001 | Owns `src/app/layout.tsx`, `src/lib/config.ts`, `src/lib/routes.ts`, `CTALink`, `PhoneLink`, `Button`, `Header`, `Footer`, and base schema. Analytics scripts mount inside the layout and track those components. |

### Depends on this ticket (consumers of the events layer)

| Ticket | What it needs from TICKET-028 |
|--------|-------------------------------|
| TICKET-002 | Tracked CTA/phone wrappers so homepage conversion events reach GA4/Clarity. |
| TICKET-003 | `trackDiscoveryFlightBookingStarted` / `trackDiscoveryFlightBookingCompleted` helpers and tracked CTAs on the landing page. |
| TICKET-004 through TICKET-011 | `trackProgramPageView(slug)` helper for each program page. |
| TICKET-012 | `trackMembershipSignupStarted` / `trackMembershipSignupCompleted` helpers. |
| TICKET-013 / TICKET-014 | `trackInstructorPageView(slug)` helper and tracked "Book with [Name]" CTAs. |
| TICKET-021 | `trackBlogSubscription()` helper and tracked subscribe button. |
| TICKET-024 | Core analytics import to build `src/lib/booking-analytics.ts` and fire booking-step events. |
| TICKET-025 | Privacy Policy references GA4/GTM/Clarity; analytics layer must be stable before legal copy is finalized. |
| TICKET-029 | Final QA validates the full analytics stack, conversion events, and Search Console verification. |

### Cross-cutting ordering recommendation

1. TICKET-001 ships the shell.
2. TICKET-028 ships the analytics layer.
3. Page tickets (TICKET-002 onward) import tracked wrappers and event helpers.
4. Booking widget tickets (TICKET-003, TICKET-024) wire up the booking-specific events.
5. TICKET-029 verifies the end-to-end measurement stack.

---

## 7. Verification steps

### 7.1 Build and export verification

1. Run `npm install` and `npm run build`.
2. Confirm the `dist/` folder is created and contains `index.html` with the GTM/Clarity scripts present only when env vars are set.
3. Verify that no server-only Next.js APIs are used in analytics code (`headers()`, `cookies()`, API routes).
4. Confirm the build succeeds with env vars empty (graceful no-op behavior).

### 7.2 Unit / helper tests (where test tooling exists)

1. Test `pushEvent` pushes an object to `window.dataLayer` with `event`, `page_path`, `page_title`, and stored UTM fields.
2. Test `buildExternalUrl('https://example.com', { utm_source: 'google', utm_medium: 'cpc' })` returns a URL with correctly encoded query params.
3. Test `getUTMParamsFromURL` parses all five UTM params from a query string and ignores unrelated params.
4. Test each typed conversion helper (`trackDiscoveryFlightBookingStarted`, etc.) rejects calls missing required properties at the TypeScript level.

### 7.3 Integration checks in the browser

1. Open the site locally or on a preview URL with `?utm_source=test&utm_medium=email&utm_campaign=qa`.
2. Inspect `window.dataLayer` in DevTools and confirm the initial UTM context event (`analytics_context`) is pushed.
3. Click the header "Book a discovery flight" CTA and confirm a `cta_click` event with `link_text`, `href`, `section: header`.
4. Click the phone number and confirm a `phone_click` event with the correct number and section.
5. Navigate to a program page stub and confirm a `program_page_view` event with the correct `program_slug`.
6. Submit a blog-subscribe stub and confirm a `blog_subscription` event.

### 7.4 GTM / GA4 validation

1. Open GTM Preview mode and load the site; confirm the container fires.
2. Trigger each conversion event and confirm GA4 receives it via the GA4 DebugView.
3. In GA4, verify custom event names match exactly:
   - `discovery_flight_booking_started`
   - `discovery_flight_booking_completed`
   - `phone_click`
   - `email_click`
   - `membership_signup_started`
   - `membership_signup_completed`
   - `program_page_view`
   - `instructor_page_view`
   - `blog_subscription`
4. Verify GA4 custom dimensions exist for `flight_type`, `program_slug`, `instructor_slug`, `booking_reference`, and stored UTM parameters.

### 7.5 Microsoft Clarity validation

1. Load the site with `NEXT_PUBLIC_CLARITY_PROJECT_ID` set.
2. Open the Clarity dashboard for the project and confirm recordings are captured.
3. Verify heatmaps and scroll maps populate for the homepage and discovery-flight page.

### 7.6 Google Search Console verification

1. Add the domain property `hornbillaviation.com` in Google Search Console.
2. Copy the DNS TXT verification token.
3. Add the TXT record at the domain registrar/DNS provider.
4. Click "Verify" in GSC and confirm ownership.
5. Document the verification token in `src/lib/config.ts` (as a reference string) and the runbook.
6. Submit the sitemap (generated by TICKET-001) at `https://hornbillaviation.com/sitemap.xml`.

### 7.7 Schema and SEO non-regression

1. Run Google Rich Results Test on the homepage and confirm existing `Organization`, `LocalBusiness`, `EducationalOrganization`, `WebSite`, `BreadcrumbList`, and `FAQPage` schema are still valid.
2. Confirm the analytics script injection does not duplicate `<head>` metadata or move canonical tags.
3. Confirm the GTM `<noscript>` iframe is placed directly after `<body>` open and does not wrap or break schema `<script>` tags.

### 7.8 Privacy and compliance check

1. Read the Privacy Policy draft (TICKET-025) and confirm it mentions Google Analytics 4, Google Tag Manager, and Microsoft Clarity cookies/usage.
2. Confirm no personally identifiable information (PII) is pushed to `dataLayer` beyond what the user voluntarily submits in forms (e.g., do not push raw email addresses to GA4).
3. Confirm `dataLayer` events are sanitized: phone numbers and email addresses are hashed or omitted from GA4 event parameters if required by privacy policy.

### 7.9 UTM convention audit

1. Inspect every outbound link in the footer, header, and content pages and confirm they use `buildExternalUrl` with consistent UTM source/medium/campaign values.
2. Confirm internal links do **not** contain `utm_*` query parameters.
3. Confirm that when a user arrives with fresh UTMs, the stored set updates and subsequent events include the new values.

### 7.10 Mobile and Core Web Vitals non-regression

1. Run Lighthouse on `/` and confirm analytics scripts do not push LCP above 2.0 s.
2. Defer or async-load GTM/Clarity scripts so they are not render-blocking.
3. Verify INP remains ≤ 200 ms; event pushes are synchronous fire-and-forget and do not block interaction response.

---

## 8. Implementation order (suggested)

1. Add analytics config fields to `src/lib/config.ts` and `next.config.ts` env exposure.
2. Create `src/types/analytics.ts` and `src/lib/analytics.ts` with the typed event layer.
3. Create `src/lib/utm.ts` for UTM capture and external-link building.
4. Create `src/hooks/useAnalytics.ts`.
5. Create `AnalyticsProvider`, `GoogleTagManager`, and `MicrosoftClarity` components.
6. Create tracked wrappers: `TrackedLink`, `TrackedButton`, `TrackedCTALink`, `TrackedPhoneLink`, `TrackedEmailLink`.
7. Modify `src/app/layout.tsx` to mount providers and scripts.
8. Add `.env.example` entries and draft the analytics runbook.
9. Build a small test page or use existing TICKET-001 homepage to verify events in `dataLayer`.
10. Run build, execute verification steps, and update ticket status.
