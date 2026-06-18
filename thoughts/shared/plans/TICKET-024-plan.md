---
id: TICKET-024-plan
title: "Implementation plan: Booking app entry page"
ticket: TICKET-024
status: draft
created: 2026-06-18
---

## 1. Scope summary

TICKET-024 builds the `/book/` page: a lightweight, mobile-first entry point that hosts the discovery-flight booking flow and leaves clear extension points for future lesson scheduling. The page does not implement the booking backend, payment processing, or calendar availability logic itself; it provides the shell, routing, state orchestration, and marketing wrapper that the booking widget components slot into.

What this ticket produces:

- A new Next.js page route at `/book/` (`src/app/book/page.tsx`).
- A `BookingFlow` state container (`src/components/booking/BookingFlow.tsx`) that selects and renders the active booking sub-flow based on URL search params and internal stepper state.
- A persistent, mobile-friendly stepper/progress header that stays visible as the user moves through the booking steps.
- Deep-linking support so marketing CTAs can route users directly into specific flows and steps:
  - `/book/?flow=discovery`
  - `/book/?flow=discovery&type=gift`
  - `/book/?flow=discovery&step=datetime`
  - `/book/?flow=lesson`
- A dedicated discovery-flight landing experience inside `/book/` for the primary conversion path, plus a separate marketing page placeholder note for `/discovery-flight/` if that page is built by another ticket.
- Reusable booking layout primitives (`BookingShell`, `BookingStep`, `BookingActions`) used by the booking widget components.
- SEO metadata and JSON-LD (`WebPage`, `Event`, `FAQPage`) appropriate for a bookable service page.
- Skeleton/loading/error fallbacks for the booking widget so the shell renders instantly even when widget data is loading.
- Analytics events for booking flow started, step changed, and booking completed (fired through a lightweight analytics wrapper already stubbed in TICKET-001).

What this ticket does **not** implement:

- The actual booking API backend (`/api/availability`, `/api/bookings`, etc.).
- Stripe payment integration or gift-voucher purchase logic.
- Real-time calendar availability, instructor scheduling, or aircraft maintenance windows.
- The individual booking widget sub-components (`DiscoveryFlightPicker`, `InstructorSelector`, `BookingForm`, `PaymentStep`, `ConfirmationView`) beyond stub wrappers that the booking widget ticket will later replace.
- The `/discovery-flight/` dedicated landing page content if that is ticketed separately (this ticket's `/book/?flow=discovery` path is the functional booking entry point; `/discovery-flight/` can redirect or embed the same flow).

---

## 2. Exact file paths to create or modify

### New page routes

| File | Purpose |
|------|---------|
| `src/app/book/page.tsx` | `/book/` page. Reads `flow`, `type`, `step`, and `instructor` search params, renders `BookingFlow`, and supplies page metadata + schema. |
| `src/app/book/layout.tsx` | Optional nested layout for the booking page. Removes footer distractions if desired, keeps header, adds a sticky bottom CTA bar on mobile, and injects booking-specific JSON-LD. |

### New booking shell components

Create under `src/components/booking/`:

| File | Purpose |
|------|---------|
| `src/components/booking/BookingFlow.tsx` | Core state machine. Accepts initial `flow`, `type`, `step`, and `instructorSlug` from URL. Manages the active sub-flow and current step. Renders the correct widget wrapper and stepper. |
| `src/components/booking/BookingShell.tsx` | Page-level wrapper: title area, progress/stepper, main content area, and help sidebar/contact block. |
| `src/components/booking/BookingStepper.tsx` | Horizontal or vertical stepper showing current step among: Flight type → Date/Time → Details → Payment → Confirmation. Sticky on mobile. |
| `src/components/booking/BookingStep.tsx` | Consistent step card wrapper with padding, focus management, and `aria-live` region for step changes. |
| `src/components/booking/BookingActions.tsx` | Back / Next / Cancel button group with consistent disabled/loading states. |
| `src/components/booking/BookingErrorBoundary.tsx` | Local error boundary that catches widget crashes and shows a friendly "Let's finish this over the phone" fallback. |
| `src/components/booking/BookingSkeleton.tsx` | Skeleton loader shown while widget chunks/data load. |
| `src/components/booking/FlowSelector.tsx` | Tab or card selector at the top of `/book/` when no `flow` param is present: "Discovery flight", "Lesson scheduling", "Gift voucher". |

### Widget wrapper/stub components (to be replaced by the booking widget ticket)

| File | Purpose |
|------|---------|
| `src/components/booking/DiscoveryFlightPicker.tsx` | Stub wrapper for the flight-type + date/time picker. Accepts `selectedType`, `onSelectType`, `selectedSlot`, `onSelectSlot`, and `availability` props. |
| `src/components/booking/InstructorSelector.tsx` | Stub wrapper for preferred-instructor selection. Accepts `preferredInstructor`, `onSelect`, and `instructors` props. |
| `src/components/booking/BookingForm.tsx` | Stub wrapper for the student details form (first name, last name, phone, email, optional weight). |
| `src/components/booking/PaymentStep.tsx` | Stub wrapper for payment step (deposit or full prepay). |
| `src/components/booking/ConfirmationView.tsx` | Stub wrapper for confirmation step. |
| `src/components/booking/GiftVoucherFlow.tsx` | Stub wrapper that routes the gift-voucher purchase flow (purchaser details, recipient message, payment, voucher code). |
| `src/components/booking/LessonSchedulingFlow.tsx` | Stub wrapper and extension point for future lesson booking. |

### Supporting content and configuration

| File | Purpose |
|------|---------|
| `src/content/booking.ts` | Static configuration for booking flows: discovery flight types (standard, Tahoe scenic, gift), step definitions, field defaults, cancellation/weather policy copy, and pricing constants. |
| `src/lib/booking.ts` | URL param parsing helpers (`getInitialBookingState`), step validation helpers, and flow guards. |
| `src/lib/booking-analytics.ts` | Analytics wrapper for booking-specific events: `booking_flow_started`, `booking_step_changed`, `booking_completed`, etc. |
| `src/hooks/useBookingParams.ts` | Hook that reads and updates search params without a full page reload, preserving flow/step state in the URL. |
| `src/hooks/useBookingAvailability.ts` | Stub hook that will later call `/api/availability`; returns mock data for development. |
| `src/types/booking.ts` | Booking-specific TypeScript types: `BookingFlowType`, `BookingStepId`, `DiscoveryFlightType`, `TimeSlot`, `BookingFormData`, `GiftVoucherData`, etc. |

### Modified shared files (extend from TICKET-001)

| File | Change |
|------|--------|
| `src/lib/routes.ts` | Add `/book/`, `/discovery-flight/`, and `/gift-voucher/` route entries. |
| `src/lib/schema.ts` | Add schema builders for `Event` (discovery flight), `Offer` (pricing), and `Order` (booking confirmation). |
| `src/lib/seo.ts` | Add `buildBookPageMetadata` helper if needed; otherwise use existing `buildTitle`/`buildCanonical`/`buildOpenGraph`. |
| `src/components/CTALink.tsx` | Ensure the primary CTA can deep-link to `/book/?flow=discovery` when context is the booking page. |
| `src/components/Header.tsx` | Verify the persistent header CTA still links to `/discovery-flight/` or `/book/?flow=discovery` per final routing decision. |

### Static assets

| File | Purpose |
|------|---------|
| `public/images/booking/hero-booking.webp` | Optional hero image for the booking page background (PA28 on the RNO ramp). |
| `public/opengraph-booking.jpg` | Dedicated OG image for `/book/` and `/discovery-flight/` (1200×630, CTA-focused). |

---

## 3. Reusable components to use from TICKET-001 (shell) and other tickets

### From TICKET-001 (must already exist)

| Component / file | How TICKET-024 uses it |
|------------------|------------------------|
| `app/layout.tsx` | Root layout wrapping `/book/`. Provides fonts, base metadata, header, footer, and base JSON-LD. |
| `Header` | Persistent sticky header on the booking page. The primary CTA may be hidden or changed to "Back to site" when inside the booking flow to reduce distractions. |
| `Footer` | Optionally omitted or simplified in the nested booking layout, but the global footer NAP should remain accessible from `/book/` for local SEO. |
| `MobileNav` | Header mobile menu remains functional on `/book/`. |
| `Container` | Centers the booking shell content. |
| `Section` | Wraps the booking page sections (intro, flow selector, widget area, help block). |
| `PageHeader` | Renders the `/book/` page breadcrumb + H1 + subtitle. |
| `Button` | Primary/secondary/tertiary buttons for the stepper actions. |
| `CTALink` | Links back to marketing pages or to the discovery-flight flow. |
| `PhoneLink` | "Questions? Call us" fallback in the help sidebar and error state. |
| `SchemaInjector` | Injects `/book/` page-specific JSON-LD. |
| `src/lib/schema.ts` | Import `buildOrganization`, `buildLocalBusiness`, and extend with `buildEvent`, `buildOffer`, `buildBreadcrumbList`. |
| `src/lib/seo.ts` | Compose title, canonical, OpenGraph for `/book/`. |
| `src/lib/routes.ts` | Read route definitions for internal links. |
| `src/lib/config.ts` | Read NAP, pricing constants, and base URL for schema. |
| `src/types/index.ts` | Extend shared types with booking-specific types if not placed in `src/types/booking.ts`. |
| `src/content/programs.ts` | Populate the "Related programs" links in the help sidebar. |
| `src/content/instructors.ts` | Populate the `InstructorSelector` list. |
| `src/content/faq.ts` | Optionally reuse FAQ data for a booking FAQ accordion. |

### From other tickets (consumption/extension points)

| Source | What is consumed |
|--------|------------------|
| Discovery flight landing page ticket (if separate from this one) | `/discovery-flight/` may embed `BookingFlow` via import, or redirect to `/book/?flow=discovery`. |
| Booking widget / API ticket | The stub wrappers in this ticket (`DiscoveryFlightPicker`, `BookingForm`, `PaymentStep`, `ConfirmationView`, `InstructorSelector`) are replaced with real implementations that call `/api/availability` and `/api/bookings`. |
| Instructor detail pages | Individual instructor pages link to `/book/?flow=discovery&instructor=<slug>` to pre-select a preferred CFI. |
| Program pages | Each program page links to `/book/?flow=discovery` or `/book/?flow=lesson` as the next step. |
| Gift voucher ticket (if separate) | `/book/?flow=discovery&type=gift` activates the `GiftVoucherFlow`. |

---

## 4. Page content/structure, schema markup, and SEO metadata

### 4.1 URL and metadata

| Element | Value |
|---------|-------|
| URL | `/book/` |
| Title | `Book a discovery flight or schedule training | Hornbill Flight Center` |
| Meta description | `Book a discovery flight, buy a gift voucher, or schedule flight training at Hornbill Flight Center in Reno, NV. Part 61 school at RNO with a PA28 fleet.` |
| Canonical | `https://hornbillaviation.com/book/` |
| OG image | `/opengraph-booking.jpg` |
| OG type | `website` |

### 4.2 Content structure (in order)

1. **Booking intro / PageHeader**
   - Breadcrumb: `Home > Book`
   - H1: `Book your flight`
   - Subtitle: `Choose a discovery flight, schedule training, or buy a gift voucher.`
2. **Flow selector** (only visible when no `flow` param)
   - Card 1: `Discovery flight` → `/book/?flow=discovery`
   - Card 2: `Schedule a lesson` → `/book/?flow=lesson` (disabled or "coming soon" badge at launch)
   - Card 3: `Gift voucher` → `/book/?flow=discovery&type=gift`
3. **Booking stepper** (visible once a flow is selected)
   - Steps: Flight type → Date & time → Your details → Payment → Confirmation
4. **Active step content area**
   - Renders `DiscoveryFlightPicker`, `BookingForm`, `PaymentStep`, `ConfirmationView`, or `GiftVoucherFlow`.
   - Each step wrapped in `BookingStep` with `aria-live="polite"`.
5. **Help / trust sidebar or bottom block**
   - Phone link: `Questions? Call 555-555-1234`
   - Cancellation/weather policy summary.
   - "What to expect" micro-copy for first-time visitors.
6. **Booking FAQ** (optional)
   - 4–5 questions with `FAQPage` schema.

### 4.3 Deep-linking state map

| URL | Rendered state |
|-----|----------------|
| `/book/` | Flow selector only |
| `/book/?flow=discovery` | Discovery flight, step 1 (flight type) |
| `/book/?flow=discovery&type=standard` | Discovery flight, standard type pre-selected |
| `/book/?flow=discovery&type=tahoe` | Discovery flight, Tahoe scenic type pre-selected |
| `/book/?flow=discovery&type=gift` | Gift voucher purchase flow |
| `/book/?flow=discovery&step=datetime` | Discovery flight, skip to date/time step |
| `/book/?flow=discovery&instructor=<slug>` | Discovery flight with preferred instructor pre-selected |
| `/book/?flow=lesson` | Lesson scheduling stub / "coming soon" |

`step` param values: `flight`, `datetime`, `details`, `payment`, `confirmation`.

### 4.4 Schema markup

Inject the following JSON-LD via `SchemaInjector` on `/book/`:

1. **WebPage**
   - `@id`: `<baseUrl>/book/#webpage`
   - `name`: `Book a discovery flight or schedule training`
   - `url`: `<baseUrl>/book/`
   - `isPartOf`: `<baseUrl>/#website`
   - `about`: references `/#localbusiness`
2. **BreadcrumbList**
   - Item 1: `Home` → `/`
   - Item 2: `Book` → `/book/`
3. **Event** (for the discovery flight as a bookable service)
   - `@id`: `<baseUrl>/book/#discovery-flight`
   - `name`: `Discovery Flight at Hornbill Flight Center`
   - `description`: `45–60 minute introductory flight in a PA28 at Reno–Tahoe (RNO).`
   - `eventStatus`: `https://schema.org/EventScheduled`
   - `eventAttendanceMode`: `https://schema.org/OfflineEventAttendanceMode`
   - `location`: references `/#localbusiness`
   - `offers`:
     - `@type`: `Offer`
     - `price`: `199.00`
     - `priceCurrency`: `USD`
     - `availability`: `https://schema.org/InStock`
     - `url`: `<baseUrl>/book/?flow=discovery`
4. **FAQPage** (if booking FAQ is included)
   - MainEntity array of `Question`/`Answer` pairs drawn from `src/content/booking.ts`.

Do **not** inject `AggregateRating` on this page unless 5+ reviews exist globally.

### 4.5 Heading hierarchy

- H1: `Book your flight`
- H2: Flow selector title, active step label, FAQ section title, help block title
- H3: Individual flow cards, FAQ questions
- No skipped heading levels.

### 4.6 Brand and copy requirements

- Follow `brand_identity_writing_style.md`:
  - Use "Book a discovery flight" not "Unlock the sky".
  - State prices plainly: "Discovery flight: $199. No deposit required."
  - Avoid superlatives and LLM hedges.
- The page should answer the worry: "What if I need to cancel?" with a clear policy statement.
- Keep the form to ≤5 visible fields per step.

---

## 5. API/widget/data requirements

### APIs consumed (frontend calls)

| Endpoint | Method | Purpose | Caller |
|----------|--------|---------|--------|
| `/api/availability` | GET | Returns available discovery-flight slots for a date range, filtered by aircraft/instructor/type. | `useBookingAvailability.ts` stub → replaced by booking widget ticket. |
| `/api/bookings` | POST | Creates a discovery flight or lesson booking. | `PaymentStep` real implementation. |
| `/api/instructors/:slug/availability` | GET | Returns availability for a specific CFI. | `InstructorSelector` real implementation. |
| `/api/gift-vouchers` | POST | Creates a gift voucher purchase. | `GiftVoucherFlow` real implementation. |
| `/api/gift-vouchers/:code` | GET | Validates a voucher code at redemption time. | `PaymentStep` real implementation. |

### What this ticket provides for the API layer

- Stub data in `src/hooks/useBookingAvailability.ts` so the page renders and the stepper can be tested without a backend.
- A typed `BookingFormData` shape that the API request body will follow.
- Analytics event firing points where the real API calls will later be hooked in.

### Widget dependencies

- Calendar/date picker component for step 2 (provided later by booking widget ticket). This ticket reserves a slot in `DiscoveryFlightPicker`.
- Stripe Elements or Stripe Checkout integration for step 4 (provided later). This ticket reserves the `PaymentStep` wrapper.

### Data files to create

| File | Data |
|------|------|
| `src/content/booking.ts` | Discovery flight types, step order, default pricing, policy copy, related program links, booking FAQ. |
| `src/types/booking.ts` | TypeScript interfaces for flows, steps, form data, slots, instructors. |
| `src/lib/booking.ts` | URL state helpers and validation. |
| `src/lib/booking-analytics.ts` | Event names and safe `window.gtag`/dataLayer push wrapper. |

### External integrations (placeholders only)

- Google Analytics 4: fire `booking_flow_started`, `booking_step_changed`, `booking_completed` events through the TICKET-001 analytics stub.
- Stripe: no direct integration in this ticket; `PaymentStep` is a stub.
- CRM webhook: no direct integration; stub a success callback in `ConfirmationView`.

---

## 6. Dependencies on other tickets

### Must be completed before TICKET-024

| Ticket | What it provides |
|--------|------------------|
| TICKET-001 | Site shell (`Header`, `Footer`, `Container`, `Section`, `PageHeader`, `Button`, `CTALink`, `PhoneLink`, `SchemaInjector`), global metadata/schema helpers (`src/lib/seo.ts`, `src/lib/schema.ts`, `src/lib/routes.ts`, `src/lib/config.ts`), route conventions, and homepage CTA links. This is a hard dependency. |

### Should ideally be completed before, but stubs are acceptable

| Ticket / work | What it provides |
|---------------|------------------|
| Instructor content ticket (e.g., TICKET-012 or similar) | Real `src/content/instructors.ts` data for the `InstructorSelector`. If not ready, the selector can show placeholder instructors with a "coming soon" state. |
| Discovery flight landing page ticket (if separate) | Content and imagery for `/discovery-flight/`; this ticket's `/book/?flow=discovery` is the functional equivalent. |

### What TICKET-024 does not depend on

- Booking API backend (will use stubs).
- Stripe payment integration (will use stubs).
- Real instructor photos/bios (placeholders acceptable).
- Blog content.
- Pilot widgets.

### What depends on TICKET-024

| Dependent work | What it consumes |
|----------------|------------------|
| Booking widget/API ticket | `BookingFlow`, `BookingShell`, `BookingStepper`, `BookingStep`, `BookingActions`, typed stubs, `src/content/booking.ts`, `src/types/booking.ts`, `useBookingParams.ts`, `useBookingAvailability.ts`. |
| Homepage / program pages | The `/book/?flow=discovery` deep-link target for CTAs. |
| Instructor detail pages | The `/book/?flow=discovery&instructor=<slug>` deep-link target. |
| Gift voucher ticket (if separate) | The `/book/?flow=discovery&type=gift` path and `GiftVoucherFlow` stub. |
| Lesson scheduling ticket | The `/book/?flow=lesson` extension point and `LessonSchedulingFlow` stub. |

---

## 7. Verification steps

### 7.1 Build and export verification

1. Run `npm install` and `npm run build`.
2. Confirm `dist/book/index.html` is generated.
3. Confirm `dist/book/index.html` contains the `/book/` page content and no server-only features (no `revalidate`, no API route imports in the page bundle).
4. Verify the nested `src/app/book/layout.tsx` does not break static export.

### 7.2 Routing and deep-linking verification

1. Serve `dist/` with a static server (e.g., `npx serve@latest dist`).
2. Visit `/book/` and confirm the flow selector renders.
3. Visit `/book/?flow=discovery` and confirm the discovery flight stepper starts at step 1.
4. Visit `/book/?flow=discovery&type=gift` and confirm the gift-voucher stub/placeholder renders.
5. Visit `/book/?flow=discovery&step=datetime` and confirm the stepper jumps to date/time (stub content acceptable).
6. Visit `/book/?flow=lesson` and confirm a "coming soon" or disabled state.
7. Confirm that changing steps updates the URL search params without a full page reload (client-side navigation via Next.js `useSearchParams` + `useRouter`).

### 7.3 Schema validation

1. Run the generated `/book/index.html` through:
   - Google Rich Results Test
   - Schema.org validator
2. Confirm JSON-LD includes:
   - `WebPage` with correct `@id`, `name`, and `url`
   - `BreadcrumbList` with Home and Book items
   - `Event` for discovery flight with `Offer` ($199, USD, `InStock`)
3. Confirm no duplicate `@id` values.
4. Confirm `Event` `location` references the same `LocalBusiness` `@id` used globally.

### 7.4 SEO metadata checks

1. Verify title tag: `Book a discovery flight or schedule training | Hornbill Flight Center`.
2. Verify meta description is under 155 characters and contains "discovery flight", "Reno, NV", "RNO".
3. Verify canonical is self-referencing with trailing slash: `https://hornbillaviation.com/book/`.
4. Verify OG image is the dedicated booking OG image or the default.

### 7.5 Accessibility and UX checks

1. Run axe-core or Lighthouse accessibility audit on `/book/`; target WCAG 2.2 AA with no critical errors.
2. Verify the stepper is keyboard-navigable and announces step changes via `aria-live`.
3. Verify focus is managed when advancing to the next step (focus moves to the step heading).
4. Verify form inputs have visible labels and focus rings.
5. Verify mobile layout:
   - Stepper is thumb-tappable or collapses to a progress bar.
   - Primary action buttons are ≥44 px tall.
   - Sticky progress/stepper does not obscure content.
6. Verify color contrast follows the visual identity (no `gold-500` on `cream-50` for body text).

### 7.6 Booking shell contract checks

1. Confirm `BookingFlow` accepts and initializes from URL params correctly.
2. Confirm `BookingActions` always provides a visible "Back" path except on step 1.
3. Confirm stub widget wrappers have the exact prop interfaces that the real booking widget ticket expects.
4. Confirm `src/types/booking.ts` exports stable types used by the stubs.

### 7.7 Content and copy checks

1. Read all `/book/` copy against the forbidden-phrase list in `brand_identity_writing_style.md`.
2. Verify the H1 is "Book your flight" or equivalent, not a cliché.
3. Verify the cancellation/weather policy is visible and plain.
4. Verify CTA text is action-first: "Book a discovery flight", "Buy a gift voucher", "Schedule a lesson".

### 7.8 Analytics checks

1. Confirm `booking_flow_started` fires when a user selects a flow.
2. Confirm `booking_step_changed` fires when the step changes.
3. Confirm `booking_completed` fires on the confirmation stub step (even though no real backend call exists yet).
4. Confirm `phone_click` fires if the help sidebar phone link is clicked.

### 7.9 Cross-ticket contract checks

1. Confirm `/book/` is added to `src/lib/routes.ts` with `published: true`.
2. Confirm `src/lib/schema.ts` exposes `buildEvent` and `buildOffer` helpers.
3. Confirm `CTALink` can produce a deep-link URL to `/book/?flow=discovery`.
4. Confirm the booking page does not import server-only Next.js APIs.

---

## 8. Implementation order (suggested)

1. Create `src/types/booking.ts` and `src/content/booking.ts`.
2. Create `src/lib/booking.ts` and `src/hooks/useBookingParams.ts`.
3. Create `src/lib/booking-analytics.ts`.
4. Create layout primitives: `BookingStep`, `BookingActions`, `BookingShell`, `BookingStepper`, `BookingErrorBoundary`, `BookingSkeleton`, `FlowSelector`.
5. Create stub widget wrappers: `DiscoveryFlightPicker`, `InstructorSelector`, `BookingForm`, `PaymentStep`, `ConfirmationView`, `GiftVoucherFlow`, `LessonSchedulingFlow`.
6. Create `BookingFlow` state container and wire stubs.
7. Create `src/app/book/layout.tsx` and `src/app/book/page.tsx`.
8. Extend `src/lib/routes.ts` and `src/lib/schema.ts` from TICKET-001.
9. Add SEO metadata and JSON-LD to the booking page.
10. Run build, fix errors, and execute verification steps.
11. Update ticket status and create handoff notes for the booking widget/API ticket owner.
