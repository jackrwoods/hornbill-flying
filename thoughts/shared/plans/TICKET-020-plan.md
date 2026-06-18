---
id: TICKET-020-plan
title: "Implementation plan: Contact page"
ticket: TICKET-020
status: draft
created: 2026-06-18
---

## 1. Scope summary

TICKET-020 builds the public `/contact/` page for the Hornbill Flight Center static Next.js marketing site. The page is the single source of truth for prospective students and visitors who prefer phone, email, or an in-person visit. It must present the exact NAP (name, address, phone), office hours, an embedded map, a working contact form, and direct click-to-call/email links. It also reinforces conversion with a prominent discovery-flight CTA and internal links to the Location and Discovery Flight pages.

What this ticket produces:

- `src/app/contact/page.tsx` and its route-level metadata.
- Reusable `ContactForm` and `MapEmbed` components, usable by the Contact page, the Location page (TICKET-016), and the footer map placeholder.
- Contact page sections that consume the shared shell from TICKET-001.
- Page-specific JSON-LD: `LocalBusiness` (with full contact points, hours, and geo coordinates), `FAQPage`, and `BreadcrumbList`.
- Contact-form submission logic pointing at a configurable backend endpoint.

This ticket does **not** build: the backend contact API itself, the Location page content, the booking widget, or site-wide shell components (those belong to TICKET-001).

---

## 2. Exact file paths to create or modify

### New page and metadata

| File | Purpose |
|------|---------|
| `src/app/contact/page.tsx` | The `/contact/` page, composing all contact sections and page-level schema. |
| `src/app/contact/metadata.ts` (optional) | Route metadata exported for the page; can be co-located in `page.tsx` if preferred. |

### New reusable components

| File | Purpose |
|------|---------|
| `src/components/MapEmbed.tsx` | Responsive, accessible iframe wrapper for the location map; accepts title, src, and loading strategy. |
| `src/components/ContactForm.tsx` | Client form with name, email, phone, message, honeypot, validation, submit state, and success/error messaging. |
| `src/components/ContactInfoCard.tsx` | Small NAP/hours card used in the contact details section and potentially the footer. |

### New contact page sections

| File | Purpose |
|------|---------|
| `src/sections/contact/ContactDetailsSection.tsx` | Address, phone, email, hours, and click-to-call/email actions. |
| `src/sections/contact/ContactMapSection.tsx` | Map embed section with surrounding context text. |
| `src/sections/contact/ContactFormSection.tsx` | Section wrapper for the contact form, including heading and privacy note. |
| `src/sections/contact/ContactFAQSection.tsx` | FAQ accordion with FAQPage schema support. |

### Content / data files to create or modify

| File | Purpose |
|------|---------|
| `src/content/contact.ts` | Contact-specific FAQ entries and any page copy constants. |
| `src/lib/config.ts` | **Modify** to add `contactHours`, `mapEmbedUrl`, `contactFormEndpoint`, and reCAPTCHA site key placeholder. |
| `src/lib/schema.ts` | **Modify** to add `buildContactPageLocalBusiness` and `buildContactPoint` helpers if not already present. |
| `src/lib/routes.ts` | **Modify** to ensure `/contact/` and `/location/` routes are declared (TICKET-001 likely already adds them; confirm). |

### Static assets

| File | Purpose |
|------|---------|
| `public/images/contact/` | Optimized photos for the contact page (optional): ramp/FBO exterior, office, or aircraft at RNO. Not required for MVP. |

### Documentation

| File | Purpose |
|------|---------|
| `thoughts/shared/plans/TICKET-020-plan.md` | This plan. |

---

## 3. Reusable components to use from TICKET-001 (and other tickets)

### Components to import from TICKET-001

These are required and must already exist before this ticket ships.

| Component | How it is used on the Contact page |
|-------------|------------------------------------|
| `app/layout.tsx` | Wraps the page; provides fonts, default metadata, header, footer, and base schema. |
| `Header` / `MobileNav` / `Footer` | Persistent navigation and NAP consistency via the footer. |
| `Container` | Max-width wrapper for each section. |
| `Section` | Section wrapper with consistent vertical spacing and background variants. |
| `PageHeader` | Breadcrumb + H1 + optional subtitle for the top of the page. |
| `Button` | Primary/secondary CTAs ("Book a discovery flight", "Call now"). |
| `PhoneLink` | Single source of truth for the click-to-call number and `tel:` link. |
| `CTALink` | Reusable "Book a discovery flight" link. |
| `SchemaInjector` | Renders page-specific JSON-LD. |
| `FAQAccordion` | Accessible accordion used by the contact FAQ; must support the `faqData` shape and FAQPage schema generation. |

### Components this ticket introduces for shared reuse

| Component | Future consumers |
|-----------|------------------|
| `MapEmbed` | `Footer` map placeholder (TICKET-001), `/location/` page (TICKET-016), and any other pages that embed a map. |
| `ContactForm` | Could be reused on a future "Contact an instructor" modal or membership inquiry page. |
| `ContactInfoCard` | Could be reused on the Location page, About page, or in the mobile sticky action bar. |

### Components expected from dependent tickets

- The discovery-flight booking widget from the booking ticket will be linked to from this page via `CTALink`; no direct component dependency.
- The Location page (TICKET-016) will link back to `/contact/` and reuse `MapEmbed` and `ContactInfoCard`. Coordinate the map embed source URL so both pages stay consistent.

---

## 4. Page content/structure, schema markup, and SEO metadata

### 4.1 URL and metadata

**URL:** `/contact/`

**Title tag:**
```
Contact Hornbill Flight Center in Reno, NV | Hornbill Flight Center
```

**Meta description (under 155 characters):**
```
Call 555-555-1234 or email office@hornbillaviation.com. Visit us at 1008 Gentry Way, Reno, NV. Book a discovery flight or send a message.
```

**Canonical:** self-referencing `https://hornbillaviation.com/contact/`

**OpenGraph / Twitter:**
- `og:title` mirrors the title tag.
- `og:description` mirrors the meta description.
- `og:image`: use the site default `/opengraph-default.jpg` unless a contact-specific image is created.
- `og:type`: `website`
- `twitter:card`: `summary_large_image`

### 4.2 Content structure (in order)

1. **PageHeader**
   - Breadcrumb: `Home > Contact`
   - H1: "Contact Hornbill Flight Center"
   - Subheadline: "Call, email, or stop by. We're here to answer questions and help you book your first flight."

2. **ContactDetailsSection**
   - **Address block:**
     - Hornbill Flight Center
     - 1008 Gentry Way
     - Reno, NV 89512
     - Link text: "Get directions" → external Google Maps directions URL (configured in `src/lib/config.ts`).
   - **Phone block:**
     - Label: "Phone"
     - Value: `555-555-1234` rendered via `PhoneLink` (`tel:+15555551234`).
   - **Email block:**
     - Label: "Email"
     - Value: `office@hornbillaviation.com` as `mailto:office@hornbillaviation.com` with subject prefill "Question about flight training".
   - **Hours block:**
     - Office hours table. Use exact hours from `src/lib/config.ts`. Example placeholder (replace with real hours when known):
       - Monday–Friday: 8:00 a.m. – 6:00 p.m.
       - Saturday: 9:00 a.m. – 5:00 p.m.
       - Sunday: 10:00 a.m. – 4:00 p.m.
   - **Quick actions:**
     - "Book a discovery flight" → `/discovery-flight/` (primary CTA)
     - "Call now" → `tel:+15555551234` (secondary)

3. **ContactMapSection**
   - H2: "Find us at Reno–Tahoe (RNO)"
   - Short copy: "We're based at 1008 Gentry Way, right on the RNO field. Free visitor parking is available near the office."
   - `MapEmbed` centered on the address (coordinates 39.4991, -119.7681 or the exact hangar/FBO location once confirmed).
   - Link to `/location/` for detailed directions, parking, and airport access.

4. **ContactFormSection**
   - H2: "Send us a message"
   - Copy: "Have a question about training, memberships, or rentals? Fill out the form and we'll reply within one business day."
   - `ContactForm` fields:
     - Full name (required)
     - Email address (required, validated)
     - Phone number (optional, validated if provided)
     - Message (required, textarea, max 2000 characters)
     - Honeypot field (hidden from users, rejected if filled)
     - Optional Google reCAPTCHA v2/v3 or hCaptcha token (controlled by env/config)
   - Submit button label: "Send message"
   - Success state: "Thanks. We received your message and will reply soon."
   - Error state: "Something went wrong. Please call 555-555-1234 or email us directly."
   - Privacy note below form: "We only use this information to respond to your question."

5. **ContactFAQSection**
   - H2: "Common questions"
   - 4–6 concise FAQs, for example:
     1. "Can I visit the school before signing up?"
     2. "Do I need an appointment for a discovery flight?"
     3. "What should I bring to my first lesson?"
     4. "How do I schedule a rental or lesson?"
     5. "Is parking free at the office?"
   - Rendered with `FAQAccordion` and FAQPage schema.

### 4.3 Heading hierarchy

- H1: "Contact Hornbill Flight Center" only.
- H2: "Find us at Reno–Tahoe (RNO)", "Send us a message", "Common questions".
- H3: Section subheads inside cards if needed.

### 4.4 Schema markup

Inject the following JSON-LD via `SchemaInjector` on `/contact/`:

1. **LocalBusiness** (enhanced with contact details)
   - `@id`: `https://hornbillaviation.com/#localbusiness`
   - `name`: `Hornbill Flight Center`
   - `url`: `https://hornbillaviation.com/`
   - `image`: site hero image
   - `telephone`: `+1-555-555-1234`
   - `email`: `office@hornbillaviation.com`
   - `address` (PostalAddress): `1008 Gentry Way, Reno, NV 89512`
   - `geo`: `{ @type: GeoCoordinates, latitude: 39.4991, longitude: -119.7681 }`
   - `priceRange`: `$$`
   - `openingHoursSpecification`: full weekly schedule from config
   - `contactPoint`: `ContactPoint` with `contactType: "customer service"`, same phone/email, available hours
   - `makesOffer`: reference to discovery flight / lesson services (reuse existing Service builders if available)

2. **BreadcrumbList**
   - Item 1: `Home` → `/`
   - Item 2: `Contact` → `/contact/`

3. **FAQPage**
   - Generated from the contact FAQ data in `src/content/contact.ts`.
   - Each entry has `mainEntity` with `name` (question) and `acceptedAnswer.text` (answer).

4. **Organization / EducationalOrganization**
   - Already injected in the root layout by TICKET-001; do not duplicate. The contact page only injects page-specific schema.

---

## 5. API/widget/data requirements

### 5.1 Contact form endpoint

The form must submit to a backend endpoint. Because the site is a Next.js static export, the endpoint lives outside the exported bundle (custom API backend) and is configured in `src/lib/config.ts` as `contactFormEndpoint`.

**Endpoint contract:**
- `POST https://api.hornnbillaviation.com/v1/contact` (or equivalent)
- Request body (JSON):
  ```json
  {
    "name": "string, required",
    "email": "string, required, valid email",
    "phone": "string, optional, E.164 or domestic format",
    "message": "string, required, max 2000 chars",
    "honeypot": "string, reject if non-empty",
    "recaptchaToken": "string, if reCAPTCHA enabled",
    "page": "/contact/"
  }
  ```
- Success response: `{ "success": true }` (HTTP 200/201)
- Error response: `{ "success": false, "error": "Human-readable message" }` (HTTP 400/422/500)

**Frontend behavior:**
- Validate fields client-side before submit.
- Show loading state on the submit button.
- On success, replace the form with a success message and fire analytics event `contact_form_submitted`.
- On error, display the error message and keep the form populated so the user can retry or use click-to-call/email fallback.
- If `contactFormEndpoint` is empty, fall back to a `mailto:` action with the form fields pre-filled so the page still works before the backend ships.

### 5.2 Analytics events

Fire the following events (mapped to GA4 / GTM data layer):
- `phone_click` when the phone link is tapped.
- `email_click` when the email link is tapped.
- `contact_form_submitted` on successful form submission.
- `contact_form_error` on submission failure.

### 5.3 Map embed

- Use a Google Maps embed iframe URL or a privacy-friendly OpenStreetMap embed URL stored in `src/lib/config.ts` as `mapEmbedUrl`.
- Coordinates: 39.4991, -119.7681 for RNO until the exact hangar/FBO coordinates are confirmed.
- Iframe must have `title` attribute, `loading="lazy"`, and a container with `aspect-ratio` or responsive height. Include a fallback link to open directions in a new tab.

### 5.4 Data files

| File | Data to add |
|------|-------------|
| `src/lib/config.ts` | `contactHours` array; `mapEmbedUrl`; `googleMapsDirectionsUrl`; `contactFormEndpoint`; `recaptchaSiteKey` (optional). |
| `src/content/contact.ts` | `contactFaq` array of `{ question, answer }`; optional page copy constants. |

---

## 6. Dependencies on other tickets

### Must be completed first

| Ticket | Why it blocks TICKET-020 |
|--------|--------------------------|
| **TICKET-001** (Site shell, shared components, and global SEO setup) | Provides the layout, header, footer, navigation, metadata helpers, schema helpers, `src/lib/config.ts`, `src/lib/routes.ts`, `Container`, `Section`, `PageHeader`, `Button`, `PhoneLink`, `CTALink`, `SchemaInjector`, and `FAQAccordion`. Cannot build `/contact/` without these. |

### Should be available near the same time

| Ticket | Coordination needed |
|--------|---------------------|
| **TICKET-016** (Location / RNO page) | Both pages display the address, map, and directions. This ticket creates `MapEmbed` and `ContactInfoCard`; TICKET-016 should reuse them rather than duplicate. Link from `/contact/` to `/location/` and vice versa. |
| **TICKET-014** or booking widget ticket | The contact form backend endpoint may be owned by the same custom API effort that powers booking. Agree on the endpoint URL, request shape, and response shape. If the backend is not ready, use the `mailto:` fallback and ship the UI. |

### What this ticket does not depend on

- Real instructor photos/bios.
- Blog content.
- Pilot widgets (METAR, density altitude, etc.).
- Fleet & Pricing page content (links to `/fleet/` and `/membership/` can be added later).
- 5+ reviews.

### What depends on TICKET-020

| Dependent work | What it consumes from TICKET-020 |
|----------------|----------------------------------|
| Location page (TICKET-016) | `MapEmbed`, `ContactInfoCard`, shared map/directions config. |
| 404 page (TICKET-027) | May link to `/contact/` as a recovery path. |
| Footer refinements | May reuse `ContactInfoCard` for the footer NAP block. |

---

## 7. Verification steps

### 7.1 Build and export verification

1. Run `npm install` and `npm run build`.
2. Confirm `dist/contact/index.html` exists and contains the rendered page.
3. Verify no server-only Next.js features are used in the contact page or its components.

### 7.2 Content and copy checks

1. Verify the exact NAP appears on the page:
   - Address: `1008 Gentry Way, Reno, NV 89512`
   - Phone: `555-555-1234`
   - Email: `office@hornbillaviation.com`
2. Confirm the footer NAP matches the contact page NAP byte-for-byte.
3. Review copy against the forbidden-phrase list in `brand_identity_writing_style.md`: no clichés, superlatives, or LLM hedges.
4. Confirm CTAs are action-first: "Book a discovery flight", "Call now", "Send message", "Get directions".

### 7.3 Schema validation

1. Validate the rendered `/contact/index.html` with:
   - Google Rich Results Test
   - Schema.org validator (validator.schema.org)
2. Confirm JSON-LD contains:
   - `LocalBusiness` with correct NAP, phone, email, geo coordinates `39.4991, -119.7681`, `priceRange`, `openingHoursSpecification`, and `contactPoint`.
   - `BreadcrumbList` with Home and Contact items.
   - `FAQPage` generated from the contact FAQ.
3. Ensure no duplicate `@id` values and all absolute URLs are correct.
4. Confirm the `LocalBusiness` schema on this page references the same PostalAddress `@id` used in the root-layout schema (TICKET-001).

### 7.4 SEO metadata checks

1. Verify title tag: `Contact Hornbill Flight Center in Reno, NV | Hornbill Flight Center`.
2. Verify meta description is under 155 characters and includes "discovery flight", phone, and address signals.
3. Verify canonical link is self-referencing with trailing slash: `https://hornbillaviation.com/contact/`.
4. Verify OpenGraph and Twitter tags are present and use absolute image URLs.

### 7.5 Form functionality checks

1. Submit the form with all required fields and confirm a network request is sent to `contactFormEndpoint`.
2. Verify client-side validation prevents submission of invalid email or empty required fields.
3. Verify the honeypot field is hidden and rejects submissions if populated (test only in dev).
4. Verify success state displays and analytics event `contact_form_submitted` is fired.
5. Simulate a 500 response and confirm the error state displays with fallback phone/email links.
6. If `contactFormEndpoint` is unset, confirm the form falls back to a `mailto:` action.
7. Accessibility: confirm every input has an associated `<label>`, error messages are linked via `aria-describedby`/`aria-invalid`, and focus moves to the first error on failed validation.

### 7.6 Interaction and UX checks

1. Tap the phone number on a mobile viewport and confirm it opens the dialer (`tel:+15555551234`).
2. Tap the email link and confirm it opens a mailto with a pre-filled subject.
3. Tap "Get directions" and confirm it opens the configured Google Maps directions URL in a new tab.
4. Verify the map embed is responsive and does not overflow its container on 320 px, 375 px, 414 px, and 768 px viewports.
5. Verify the page header has exactly one H1 and heading levels do not skip.

### 7.7 Accessibility checks

1. Run axe-core or Lighthouse accessibility audit on `/contact/`; target WCAG 2.2 AA with no critical errors.
2. Confirm color contrast passes for all text/background combinations used on the page.
3. Verify the map iframe has a descriptive `title` attribute and a visible text alternative link.
4. Verify the form can be completed and submitted using only the keyboard.

### 7.8 Cross-ticket contract checks

1. Confirm `MapEmbed` is placed in `src/components/` and exported for TICKET-016 to import.
2. Confirm `ContactInfoCard` uses data from `src/lib/config.ts` so the Location page can render the same NAP without duplication.
3. Confirm new routes or config keys are added to `src/lib/routes.ts` and `src/lib/config.ts` using the conventions established by TICKET-001.
4. Confirm the contact page metadata is built with `buildTitle`, `buildCanonical`, and `buildOpenGraph` from `src/lib/seo.ts` rather than hard-coded.

### 7.9 Manual smoke tests

1. Serve `dist/` locally.
2. Navigate to `/contact/`.
3. Verify the header CTA and phone link persist on mobile.
4. Verify all internal links (`/discovery-flight/`, `/location/`) resolve.
5. Verify footer NAP matches schema and page content.

---

## 8. Implementation order (suggested)

1. Confirm TICKET-001 is merged and `src/lib/config.ts`, `src/lib/schema.ts`, `src/lib/seo.ts`, `src/lib/routes.ts`, and shared components exist.
2. Update `src/lib/config.ts` with contact hours, map embed URL, directions URL, and contact form endpoint.
3. Extend `src/lib/schema.ts` with `ContactPoint` and contact-page `LocalBusiness` helpers if needed.
4. Create `src/components/MapEmbed.tsx`, `src/components/ContactInfoCard.tsx`, and `src/components/ContactForm.tsx`.
5. Create `src/content/contact.ts` with FAQ data.
6. Create contact page sections under `src/sections/contact/`.
7. Compose `src/app/contact/page.tsx` with metadata and schema injection.
8. Run `npm run build`, fix any type or export errors, then execute verification steps.
9. Update ticket status and hand off to TICKET-016 (Location) for `MapEmbed` reuse and reciprocal linking.
