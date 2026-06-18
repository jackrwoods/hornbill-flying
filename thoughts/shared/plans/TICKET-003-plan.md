# TICKET-003 Implementation Plan — Discovery Flight landing page and booking widget

## 1. Scope summary

Build the public conversion page at `/discovery-flight/` and the client-side booking widget that powers it. The page explains the discovery flight offering and lets a visitor complete a booking in under 60 seconds on mobile:

1. Pick a flight type (standard PA28, Lake Tahoe scenic, or gift voucher).
2. Choose a date/time from live availability.
3. Enter personal details and an optional instructor/weight preference.
4. Pay a deposit or full prepay via Stripe (including Apple Pay / Google Pay).
5. See a confirmation with booking reference, calendar invite, and cancellation/weather policy.

The page also implements `Event` schema for the bookable discovery flight, `FAQPage` schema for the on-page FAQ accordion, `BreadcrumbList`, and unique title/meta. The booking components must be reusable by TICKET-024 (`/book/`).

Out of scope for this ticket: the backend API itself, instructor detail pages, and the homepage. This ticket only defines the frontend contract and calls the endpoints.

---

## 2. Exact file paths to create or modify

### Files to create

| File | Purpose |
|------|---------|
| `/Users/jack/hornbill-flying/src/app/discovery-flight/page.tsx` | Server page: metadata, hero, JSON-LD schemas, renders the booking widget. |
| `/Users/jack/hornbill-flying/src/components/booking/types.ts` | Shared TypeScript types for booking state, flight types, slots, payments. |
| `/Users/jack/hornbill-flying/src/components/booking/constants.ts` | Flight type config, pricing, durations, step labels, deposit amount. |
| `/Users/jack/hornbill-flying/src/components/booking/bookingReducer.ts` | Pure reducer + actions for multi-step booking state. |
| `/Users/jack/hornbill-flying/src/components/booking/BookingWidget.tsx` | Client container that reads `?type=gift`, manages step state, and renders the stepper. |
| `/Users/jack/hornbill-flying/src/components/booking/BookingStepper.tsx` | Visual step indicator (mobile-first, accessible). |
| `/Users/jack/hornbill-flying/src/components/booking/FlightTypeSelector.tsx` | Cards for Standard, Tahoe Scenic, and Gift Voucher. |
| `/Users/jack/hornbill-flying/src/components/booking/AvailabilityCalendar.tsx` | Thumb-friendly calendar + time slots, fetches `/api/availability`. |
| `/Users/jack/hornbill-flying/src/components/booking/InstructorSelector.tsx` | Optional CFI preference dropdown/radio. |
| `/Users/jack/hornbill-flying/src/components/booking/BookingForm.tsx` | First name, last name, phone, email, optional weight. |
| `/Users/jack/hornbill-flying/src/components/booking/PaymentStep.tsx` | Stripe Payment Element / express checkout, posts to `/api/bookings`. |
| `/Users/jack/hornbill-flying/src/components/booking/ConfirmationView.tsx` | Booking reference, .ics download link, cancellation/weather policy. |
| `/Users/jack/hornbill-flying/src/lib/booking/api.ts` | Fetch wrappers for `/api/availability` and `/api/bookings`. |
| `/Users/jack/hornbill-flying/src/lib/booking/ical.ts` | Helper to generate a client-side `.ics` calendar invite from booking details. |
| `/Users/jack/hornbill-flying/src/lib/schema/discoveryFlight.ts` | Builders for `Event` and `FAQPage` JSON-LD. |
| `/Users/jack/hornbill-flying/src/data/instructors.json` | Static instructor list (slug, name, photo, focus) for the selector. |
| `/Users/jack/hornbill-flying/public/images/discovery-flight-hero.jpg` | Hero image (PA28 on the RNO ramp). |
| `/Users/jack/hornbill-flying/public/images/discovery-flight-tahoe.jpg` | Optional scenic flight image. |

### Files to modify

| File | Change |
|------|--------|
| `/Users/jack/hornbill-flying/src/app/sitemap.ts` (created by TICKET-001) | Add `/discovery-flight/` with `priority: 1.0`, `changeFrequency: 'weekly'`. |
| `/Users/jack/hornbill-flying/src/lib/schema/base.ts` (created by TICKET-001) | Reuse `Organization` / `LocalBusiness` builders as the `location`/`organizer` reference in `Event` schema. |
| `/Users/jack/hornbill-flying/tailwind.config.ts` (created by TICKET-001) | Ensure color tokens (navy, gold, cream, orange, success, error) and font families are available. |

---

## 3. Reusable components to use from other tickets

### From TICKET-001 (site shell)

- `RootLayout` — wraps the page with fonts, base metadata template, and global JSON-LD.
- `Header` / `Footer` — sticky nav, persistent "Book a discovery flight" CTA, phone link.
- `MobileMenu` — hamburger menu for mobile nav.
- `Button` / `PhoneLink` — primary, secondary, and accent button styles per visual identity.
- `Container` / `Section` — page layout primitives.
- `SchemaScript` — renders JSON-LD `<script type="application/ld+json">` safely.
- `BreadcrumbJsonLd` — builds `BreadcrumbList` schema.
- Global tokens from Tailwind config (colors, typography, spacing).

### From TICKET-002 (homepage)

- `FaqAccordion` + FAQPage schema builder — reuse for the discovery-flight FAQ section if it is ready. If TICKET-002 is not complete, implement a local accordion in this ticket and keep it generic enough to move to the shared UI folder later.

### From instructor pages (TICKET-005 through TICKET-009 or later instructor ticket)

- `/Users/jack/hornbill-flying/src/data/instructors.json` — shared instructor data source. If the instructor page ticket has not yet created it, this ticket creates the file with placeholder names/photos and the instructor page ticket can extend it later.

### Components this ticket creates for reuse by others

- All files under `/Users/jack/hornbill-flying/src/components/booking/` are intended to be reused by TICKET-024 (`/book/`). Keep them generic: flight-type and instructor data passed via props, payment endpoint configurable, confirmation copy overridable.

---

## 4. Page content, structure, schema markup, and SEO metadata

### URL

`/discovery-flight/`

### Title tag

```
Book a Discovery Flight in Reno, NV | $199 | Hornbill Flight Center
```

### Meta description

```
Book a $199 discovery flight at Reno–Tahoe (RNO). Choose a standard PA28, scenic Tahoe flight, or gift voucher. Pick a date, enter your details, and pay online.
```

### Canonical

```
https://<site-url>/discovery-flight/
```

### Page sections (top to bottom)

1. **Hero (above the fold)**
   - H1: `Book a discovery flight in Reno, NV.`
   - Subhead: `45–60 minutes in a PA28 at Reno–Tahoe. $199. No deposit required.`
   - Primary CTA: scrolls to booking widget / starts step 1.
   - Secondary CTA: `Buy a gift voucher` link with `?type=gift`.
   - Trust badges: Part 61 school, PA28 fleet, RNO.
   - Hero image with `fetchpriority="high"`, explicit width/height, alt text: `PA28 Cherokee on the ramp at Reno-Tahoe International Airport`.

2. **What’s included**
   - You sit in the left seat.
   - Preflight and preflight briefing.
   - 45–60 minutes of flight (standard) or 75 minutes (Tahoe scenic).
   - Post-flight debrief.
   - No prior experience required.

3. **Flight type selector / booking widget**
   - Stepper: Flight → Date/Time → Details → Payment → Confirmation.
   - Cards for each flight type.
   - Calendar and time slots.
   - Form fields.
   - Stripe payment.
   - Confirmation view.

4. **Why Hornbill strip**
   - Choose your instructor.
   - Consistent PA28 fleet.
   - Real cross-country experience.
   - Transparent pricing.

5. **FAQ accordion**
   - What happens on a discovery flight?
   - Who can take a discovery flight?
   - What should I bring?
   - Is there a weight limit?
   - What if the weather is bad?
   - How do gift vouchers work?
   - What is your cancellation policy?

6. **Footer** (from TICKET-001)

### Query parameter behavior

- `?type=gift`:
  - Skips date/time selection.
  - Replaces flight type cards with gift voucher purchase copy.
  - Payment step collects purchaser details and recipient name/email (optional).
  - Posts to `/api/gift-vouchers` or to `/api/bookings` with `type: gift`, depending on the backend contract.

### Schema markup

Implement as JSON-LD via `SchemaScript`:

1. **BreadcrumbList**
   - `Home → Discovery Flight`

2. **Event** (for the standard discovery flight)
   - `@type`: `Event`
   - `name`: `Discovery Flight — Hornbill Flight Center`
   - `description`: one-sentence summary
   - `eventStatus`: `https://schema.org/EventScheduled`
   - `eventAttendanceMode`: `https://schema.org/OfflineEventAttendanceMode`
   - `location`: references the `Place` / `LocalBusiness` for RNO (reuse base schema from TICKET-001)
   - `organizer`: Organization schema for Hornbill Flight Center
   - `offers`:
     - `price`: `199`
     - `priceCurrency`: `USD`
     - `availability`: `https://schema.org/InStock`
     - `url`: canonical URL
   - `duration`: `PT1H` (or `PT75M` for scenic variant)

3. **FAQPage**
   - Each FAQ item pairs an accordion entry with a `Question`/`AcceptedAnswer` JSON-LD object.

4. **Base schemas** (`Organization`, `LocalBusiness`, `EducationalOrganization`) come from the global layout built by TICKET-001; this page only adds page-specific schemas.

### Heading hierarchy

- H1: hero headline
- H2: section titles ("What’s included", "Book your flight", "Frequently asked questions")
- H3: card titles, FAQ questions
- No skipped levels.

---

## 5. API, widget, and data requirements

### Required API endpoints

| Endpoint | Method | Payload / Params | Returns |
|----------|--------|------------------|---------|
| `/api/availability` | `GET` | `flightType`, `start` (ISO date), `days` (default 14), optional `instructorSlug` | Array of available slots: `{ date, time, instructorId, aircraftTail, durationMinutes }` |
| `/api/bookings` | `POST` | `{ flightType, date, time, instructorPreference, customer: { firstName, lastName, phone, email, weight }, payment: { ... }, notes }` | `{ bookingReference, status, flight, customer, paymentAmount, icalUrl? }` |
| `/api/gift-vouchers` | `POST` | `{ flightType: 'gift', purchaser: {...}, recipient: {...}, payment: {...} }` | `{ voucherCode, expiryDate, status }` |
| `/api/instructors` | `GET` | — | `[{ slug, name, photo, focusArea, certificateNumber? }]` |

### Endpoint behavior assumptions

- `/api/availability` must return only slots where an aircraft **and** a CFI are simultaneously free.
- It must filter out maintenance windows, instructor unavailability, sunrise/sunset limits, and minimum turnaround.
- It must support a 14-day rolling window.
- All endpoints must be served over HTTPS and share the same origin as the static site (or support CORS if hosted separately).

### Payment

- Use Stripe:
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` env variable.
  - Load Stripe.js via `@stripe/stripe-js`.
  - Use Stripe Payment Element (or Checkout redirect) to support Apple Pay / Google Pay.
  - The backend creates the PaymentIntent/Checkout session; the frontend only confirms/submits the resulting token/payment method alongside booking data.
- Default mode: $0 deposit, payment collected at the time of the flight. Optional mode: full $199 prepay or a smaller deposit (amount defined in `constants.ts` and controlled by an env flag).
- Gift voucher mode: charge full voucher price at purchase.

### Calendar invite

- Generate a client-side `.ics` file from the confirmation data using `/Users/jack/hornbill-flying/src/lib/booking/ical.ts`.
- Alternatively, if the backend exposes `/api/bookings/:id/ical`, use that URL.

### Confirmation data

- Booking reference (e.g., `HB-XXXXXX`).
- Flight type, date, time, aircraft tail, instructor name if assigned.
- Add-to-calendar link.
- Cancellation/weather policy link to `/cancellation-policy/` (TICKET-025).
- Immediate confirmation email/SMS is a backend responsibility; the frontend only displays the confirmation view.

### Analytics events

Fire in the booking widget:

- `discovery_flight_booking_started` — when step 1 is first interacted with.
- `discovery_flight_booking_completed` — on successful `/api/bookings` response.
- `discovery_flight_gift_voucher_started` / `discovery_flight_gift_voucher_completed` — in gift mode.

Use the global analytics helper established by TICKET-001 (or add it if it does not yet exist).

---

## 6. Dependencies on other tickets

| Ticket | Why it must be done first |
|--------|---------------------------|
| **TICKET-001** | Provides `RootLayout`, `Header`, `Footer`, shared UI primitives, global metadata, Tailwind theme, base schema builders, and `sitemap.ts`. |
| **TICKET-002** | Provides the `FaqAccordion` component and FAQPage schema builder. If not ready, this ticket can build a local version, but reuse is preferred. |
| **Backend API** | `/api/availability`, `/api/bookings`, `/api/gift-vouchers`, and `/api/instructors` must be implemented and deployed before the live booking flow can work. The frontend can be developed against mocks until then. |
| **Stripe setup** | Stripe account, publishable key, and backend payment-intent creation must be ready. |
| **Hero / scenic images** | Real or approved placeholder PA28 ramp and Tahoe images must exist in `/public/images/`. |
| **TICKET-025** | `/cancellation-policy/` page is linked from the confirmation view and FAQ. It can be stubbed, but final copy must exist before launch. |

### Downstream dependency

- **TICKET-024** (`/book/`) reuses the booking components created in this ticket. Therefore, TICKET-003 should be implemented before or concurrently with TICKET-024, with the shared component interface agreed upon.

---

## 7. Verification steps

### Automated tests

- Unit test `bookingReducer.ts` for step transitions, invalid transitions, and reset.
- Unit test `ical.ts` to assert valid `.ics` output and required fields.
- Unit test `api.ts` fetch wrappers for success, network error, and 4xx/5xx handling.
- Component test `BookingForm.tsx`:
  - Required fields block submission.
  - Phone/email validation shows accessible error messages.
- Component test `FlightTypeSelector.tsx`:
  - `?type=gift` defaults to gift mode.
  - Selecting a flight type advances to calendar.
- Component test `AvailabilityCalendar.tsx`:
  - Calls `/api/availability` with correct params.
  - Shows loading, empty, and error states.
- Schema snapshot tests for `buildEventJsonLd()` and FAQPage builder.

### Manual checks

- Open `/discovery-flight/` on a 375 px-wide device. Complete a booking mock in under 60 seconds.
- Verify thumb-friendly date/time chips (minimum 44 × 44 px touch targets).
- Verify sticky or always-visible primary CTA on mobile.
- Verify Apple Pay / Google Pay appear in Stripe Payment Element when supported.
- Confirm no step shows more than 5 visible form fields.
- Test `/discovery-flight/?type=gift`:
  - skips date/time,
  - shows gift-specific confirmation with voucher code.

### SEO and schema validation

- Validate `/discovery-flight/` in [Google Rich Results Test](https://search.google.com/test/rich-results):
  - `Event` schema present with valid `offers` price, `location`, `organizer`.
  - `FAQPage` schema present.
  - `BreadcrumbList` present.
- Run the page through the [Schema.org validator](https://validator.schema.org/).
- Confirm title tag and meta description are unique vs. homepage and all program pages.
- Confirm self-referencing canonical is present.

### Performance

- Run Lighthouse / PageSpeed Insights:
  - LCP ≤ 2.0 s
  - INP ≤ 200 ms
  - CLS ≤ 0.1
- Verify hero image is WebP/AVIF, has explicit `width`/`height`, `fetchpriority="high"`, `loading="eager"`.

### Accessibility

- WCAG 2.2 AA audit:
  - Keyboard navigable stepper and calendar.
  - Focus management moves to the next step title on transition.
  - Form labels, `aria-describedby` for errors, `aria-live` for dynamic availability updates.
  - Color contrast passes for navy/cream/gold combinations per visual identity.

### End-to-end booking

- With backend available, complete a test booking using Stripe test card.
- Verify `/api/bookings` receives correct payload.
- Verify confirmation view shows booking reference, date/time, and add-to-calendar download.
- Verify confirmation email/SMS is received (backend check).
- Verify CRM entry and nurture sequence trigger (backend check).

### Static export

- Run `next build` (static export).
- Confirm `/out/discovery-flight/index.html` exists and renders correctly when opened via a static server.
- Confirm all booking widget JS chunks load and the widget works in the exported build.

---

## 8. Open questions to resolve during implementation

1. What is the exact price for the Lake Tahoe scenic discovery flight? The design doc lists it as 75 minutes but does not specify a price. Default to $199 unless told otherwise.
2. Is the default payment mode $0 deposit (pay at flight) or a $25–$50 deposit? The design doc lists both. Use an env flag (`NEXT_PUBLIC_DISCOVERY_FLIGHT_DEPOSIT_MODE`) to switch, defaulting to $0 deposit at launch.
3. Does the backend expose `/api/gift-vouchers` separately or is gift purchase handled via `/api/bookings` with `type: gift`? Choose whichever the backend implements; document the contract in `src/lib/booking/api.ts`.
4. Are real instructor names/photos available at launch? If not, use placeholder data in `src/data/instructors.json` and replace later.
