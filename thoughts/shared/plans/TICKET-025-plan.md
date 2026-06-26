---
id: TICKET-025-plan
title: "Implementation plan: Legal pages"
ticket: TICKET-025
status: draft
created: 2026-06-18
---

## 1. Scope summary

TICKET-025 creates the three baseline legal pages required for payment processors, search engines, and user trust:

- `/privacy/` — Privacy Policy
- `/terms/` — Terms of Service
- `/cancellation-policy/` — Cancellation, refund, and weather policy

This ticket is intentionally small and text-focused. It ships three static pages that reuse the TICKET-001 shell, update the global footer with legal links, extend the shared route map, and provide a reusable prose wrapper for long-form content. The cancellation page also reduces booking anxiety by summarizing reschedule and refund rules in plain language and linking from the booking confirmation flow.

This ticket does **not** implement: the booking API, payment processing, the booking confirmation email, membership cancellation billing logic, or final legal counsel review of the actual copy. Those belong to the booking widget, membership, and operator/legal review workflows.

---

## 2. Exact file paths to create or modify

### New application pages

| File | Purpose |
|------|---------|
| `src/app/privacy/page.tsx` | Privacy policy public page at `/privacy/` |
| `src/app/terms/page.tsx` | Terms of service public page at `/terms/` |
| `src/app/cancellation-policy/page.tsx` | Cancellation, refund, and weather policy at `/cancellation-policy/` |

### New content/data files

| File | Purpose |
|------|---------|
| `src/content/legal/privacy.ts` | Section-level privacy copy, effective date, and NAP block |
| `src/content/legal/terms.ts` | Section-level terms copy, effective date, and NAP block |
| `src/content/legal/cancellation.ts` | Cancellation/refund/weather copy, effective date, and FAQ list |

### New reusable component

| File | Purpose |
|------|---------|
| `src/components/Prose.tsx` | Max-width, readable long-form text wrapper for legal pages (keeps line length ~65 characters, consistent vertical rhythm, styled lists/headings) |

### Files to modify from TICKET-001

| File | Change |
|------|--------|
| `src/lib/routes.ts` | Add `privacy`, `terms`, and `cancellationPolicy` route entries with `published: true` so sitemap, breadcrumbs, and navigation can consume them |
| `src/components/Footer.tsx` | Add legal links: Privacy, Terms, and Cancellation/Refund in the quick-links column |
| `src/lib/config.ts` | Confirm NAP object is imported by legal copy data files (no changes required unless the NAP object is not yet exported) |
| `src/app/sitemap.ts` | Should auto-include the new routes once `routes.ts` is updated; verify after build |

---

## 3. Reusable components to use from TICKET-001 (shell) and other tickets

### Components from TICKET-001

| Component | Usage |
|-----------|-------|
| `app/layout.tsx` | Wraps every legal page with fonts, default metadata, header, footer, and base Organization schema |
| `PageHeader` | Breadcrumb + H1 + optional subtitle for each legal page |
| `Container` | Max-width wrapper with responsive padding |
| `Section` | Section wrapper with consistent vertical spacing |
| `SchemaInjector` + `src/lib/schema.ts` | Inject per-page `BreadcrumbList` (and optional `WebPage`) JSON-LD |
| `src/lib/seo.ts` | Build title, canonical, OpenGraph, and Twitter metadata |
| `src/lib/routes.ts` | Single source of truth for legal URLs; used by footer, sitemap, and breadcrumbs |

### New component introduced by this ticket

| Component | Usage |
|-----------|-------|
| `Prose` | Long-form legal text wrapper shared across all three pages |

### Components to coordinate with later tickets

| Ticket / work | What to consume or link |
|---------------|--------------------------|
| TICKET-003 — Discovery Flight landing page and booking widget | Add a link to `/cancellation-policy/` in the booking confirmation view and the confirmation email |
| TICKET-024 — Booking app entry page | Add a link to `/cancellation-policy/` from the `/book/` confirmation state if distinct from TICKET-003 |
| TICKET-011 — Fleet & Pricing page | Link to `/cancellation-policy/` from the cancellation/refund section or replace the inline section with a short summary + link |
| TICKET-012 — Membership page | Link to `/cancellation-policy/` where membership cancellation/refund windows are discussed |
| TICKET-029 — Final QA | Validate legal pages in the full QA pass |

---

## 4. Page content/structure, schema markup, and SEO metadata

### Global legal-page conventions

- **Trailing-slash canonical URLs** (`/privacy/`, `/terms/`, `/cancellation-policy/`).
- **No `noindex`** unless legal counsel specifically requests it. These pages are kept indexed with basic info.
- **Effective date** displayed near the top of each page.
- **NAP block** at the bottom of each page with the exact values from `src/lib/config.ts`:
  - `1008 Gentry Way, Reno, NV 89512`
  - `office@hornbillaviation.com`
  - `555-555-1234`
- **One H1 per page**, provided by `PageHeader`.
- **H2** for major sections, **H3** for sub-sections.
- **Brand voice**: plain-language where possible; avoid aviation clichés and LLM hedges per `brand_identity_writing_style.md`. Legal disclaimers remain factual and calm.

---

### 4.1 `/privacy/` — Privacy Policy

**URL:** `/privacy/`

**Title tag:** `Privacy Policy | Hornbill Aviation`

**Meta description (≤155 chars):**
```
Read how Hornbill Aviation collects, uses, and protects your information when you book flights or browse our site.
```

**Canonical:** `https://hornbillaviation.com/privacy/`

**OpenGraph / Twitter:** default site image and title/description mirrors.

**Content structure:**

1. `PageHeader`
   - Breadcrumb: Home > Privacy Policy
   - H1: `Privacy Policy`
   - Subtitle / effective date
2. `Section` > `Prose`
   - **Introduction**: short statement that Hornbill respects privacy and the policy explains data practices.
   - **What we collect**: contact info (name, email, phone), booking details (flight type, preferred instructor, optional weight), website usage (cookies/analytics), and payment info handled by the payment processor.
   - **How we use it**: schedule flights, communicate booking details, send reminders, process payments, improve the website.
   - **How we share it**: flight instructors for scheduling, payment processor, email/SMS provider, analytics; no sale of personal information.
   - **Cookies and analytics**: GA4 / GTM / Clarity usage and how users can manage cookies.
   - **Data security**: reasonable safeguards; no system is fully secure.
   - **Your choices**: opt out of marketing emails, request data access or deletion, update contact info.
   - **Children's privacy**: site is not directed at children under 13.
   - **Changes to this policy**: effective date and how updates are posted.
   - **Contact us**: NAP block with link to `/contact/`.

**Schema markup:**
- Base `Organization` / `LocalBusiness` / `EducationalOrganization` / `WebSite` from root layout (already present).
- `BreadcrumbList`: `Home` → `Privacy Policy`.

---

### 4.2 `/terms/` — Terms of Service

**URL:** `/terms/`

**Title tag:** `Terms of Service | Hornbill Aviation`

**Meta description (≤155 chars):**
```
Read the terms of service for Hornbill Aviation, including flight training, aircraft rental, and website use.
```

**Canonical:** `https://hornbillaviation.com/terms/`

**Content structure:**

1. `PageHeader`
   - Breadcrumb: Home > Terms of Service
   - H1: `Terms of Service`
   - Subtitle / effective date
2. `Section` > `Prose`
   - **Acceptance of terms**: using the site or booking a service means accepting these terms.
   - **Use of the website**: permitted use, account responsibility, accuracy of information.
   - **Flight training and rentals**: eligibility, renter qualifications, instructor assignments, aircraft condition, preflight responsibility, FAR compliance.
   - **Bookings and payments**: deposits, payment timing, payment processor; link to `/cancellation-policy/` for refund rules.
   - **Cancellations and weather**: summary sentence + link to `/cancellation-policy/`.
   - **Assumption of risk**: aviation involves inherent risk; release and liability limitation (flag for legal counsel review).
   - **Intellectual property**: website content, logo, photography ownership.
   - **Third-party links**: links to FAA, weather, financing partners, etc.
   - **Changes to terms**: updates posted with a new effective date.
   - **Governing law**: State of Nevada.
   - **Contact us**: NAP block with link to `/contact/`.

**Schema markup:**
- Base organization schemas from layout.
- `BreadcrumbList`: `Home` → `Terms of Service`.

---

### 4.3 `/cancellation-policy/` — Cancellation, Refund & Weather Policy

**URL:** `/cancellation-policy/`

**Title tag:** `Cancellation, Refund & Weather Policy | Hornbill Aviation`

**Meta description (≤155 chars):**
```
Our cancellation, refund, and weather policy for discovery flights and lessons at Hornbill Aviation in Reno, NV.
```

**Canonical:** `https://hornbillaviation.com/cancellation-policy/`

**Content structure:**

1. `PageHeader`
   - Breadcrumb: Home > Cancellation, Refund & Weather Policy
   - H1: `Cancellation, refund & weather policy`
   - Subtitle: reduce booking anxiety with clear rules
2. `Section` > `Prose`
   - **Effective date**
   - **Discovery flights**
     - Free cancellation/reschedule window (proposed: up to 24 hours before scheduled flight).
     - Late cancellation fee / deposit forfeiture if inside the window.
     - No-show policy.
   - **Flight lessons**
     - Same 24-hour reschedule/cancellation window.
     - How to cancel/reschedule (call, text, online link).
   - **Membership cancellation**
     - Cancel anytime; no long-term contract (align with `thoughts/shared/design/website_layout_design.md:369`).
     - Prorated/refund rules if applicable.
   - **Weather and safety**
     - If weather or aircraft availability makes the flight unsafe, we reschedule at no charge or offer a full refund.
     - Decision is made by the instructor / PIC; notifications go out as early as possible.
     - Examples: high winds, low ceilings, density-altitude concerns, maintenance.
   - **Refund methods**
     - Refunds returned to original payment method; processing time.
     - Gift vouchers refunded as voucher credit unless otherwise required.
   - **Gift vouchers**
     - Vouchers do not expire; can be transferred; rescheduling follows the same window.
3. `Section` > `FAQAccordion` (optional but recommended)
   - FAQ items to support `FAQPage` schema:
     - “What if I’m running late?”
     - “Can I reschedule my discovery flight online?”
     - “What weather conditions cancel a flight?”
     - “Do gift vouchers expire?”
     - “What is the membership cancellation policy?”
4. `Section`
   - CTA: `Book a discovery flight` → `/discovery-flight/`
   - Secondary: `Contact us` → `/contact/`

**Schema markup:**
- Base organization schemas from layout.
- `BreadcrumbList`: `Home` → `Cancellation, Refund & Weather Policy`.
- `FAQPage` if the FAQ accordion is included.

**Special note:** Final cancellation windows and refund rules must be approved by the flight school operator and, if available, legal counsel. Use placeholders in `src/content/legal/cancellation.ts` flagged with `// TODO: operator approval` until confirmed.

---

## 5. API/widget/data requirements

### APIs used directly by TICKET-025

None. All legal pages are fully static.

### Data/content files to create

| File | Data |
|------|------|
| `src/content/legal/privacy.ts` | `effectiveDate`, `sections[]` with heading + body, `napBlock` imported from `src/lib/config.ts` |
| `src/content/legal/terms.ts` | `effectiveDate`, `sections[]`, `governingLaw`, `napBlock` |
| `src/content/legal/cancellation.ts` | `effectiveDate`, `discoveryWindow`, `lessonWindow`, `membershipPolicy`, `weatherPolicy`, `refundPolicy`, `giftVoucherPolicy`, `faq[]`, CTAs |

### External integrations

- No new analytics or third-party scripts beyond what TICKET-001 already provides.
- The privacy policy text must accurately describe the analytics and payment integrations implemented by TICKET-001 (GA4/GTM/Clarity placeholders) and the booking widget (Stripe/payment processor). Keep the description generic enough to remain true if the exact processor name changes, e.g., “PCI-compliant payment processor” rather than “Stripe” unless the school confirms the processor.

---

## 6. Dependencies on other tickets

### Hard dependencies (must be complete first)

| Ticket | Why it blocks TICKET-025 |
|--------|----------------------------|
| **TICKET-001** — Site shell, shared components, and global SEO setup | Provides `layout.tsx`, `PageHeader`, `Container`, `Section`, `SchemaInjector`, `Footer`, `src/lib/routes.ts`, `src/lib/seo.ts`, `src/lib/schema.ts`, and `src/lib/config.ts`. Without these, the legal pages have no shell, no base schema, and no route map to extend. |

### Soft / coordination dependencies

| Ticket | What to coordinate |
|--------|--------------------|
| **TICKET-003** — Discovery Flight landing page and booking widget | Add a clear link to `/cancellation-policy/` in the booking confirmation view and the confirmation email so students see the policy immediately after booking. |
| **TICKET-024** — Booking app entry page | If the `/book/` confirmation state is separate from the discovery-flight widget, add the cancellation-policy link there too. |
| **TICKET-011** — Fleet & Pricing page | Link to `/cancellation-policy/` from the cancellation/refund section; keep language consistent with this ticket. |
| **TICKET-012** — Membership page | Reference the same cancellation/reschedule windows and link to `/cancellation-policy/`. |
| **TICKET-019** — FAQ page | If the FAQ page also covers cancellation, link to `/cancellation-policy/` rather than duplicating full policy text. |
| **TICKET-029** — Final QA | Include these pages in the full QA, schema, and accessibility pass. |

### Operator / legal review

- The actual policy copy in `src/content/legal/*.ts` must be reviewed and approved by the flight school operator (and legal counsel if available) before the site is published. This ticket provides the structure and placeholders; it does not provide legally binding language.

---

## 7. Verification steps

### 7.1 Build and export verification

1. Run `npm install` (if not already done) and `npm run build`.
2. Confirm the `dist/` folder contains:
   - `privacy/index.html`
   - `terms/index.html`
   - `cancellation-policy/index.html`
3. Confirm each page is reachable at the trailing-slash URLs (`/privacy/`, `/terms/`, `/cancellation-policy/`) when serving `dist/` with `npx serve@latest dist`.

### 7.2 Schema validation

1. Run each generated HTML file through:
   - Google Rich Results Test (live URL or local snippet mode)
   - Schema.org validator (`validator.schema.org`) in code-snippet mode
2. Verify JSON-LD is parseable and contains:
   - Base `Organization`, `LocalBusiness`, `EducationalOrganization`, and `WebSite` from the root layout.
   - A per-page `BreadcrumbList` with valid `itemListElement` entries.
   - `FAQPage` schema on `/cancellation-policy/` if the FAQ accordion is included.
3. Ensure no duplicate `@id` values and all absolute URLs use the production domain from `src/lib/config.ts`.

### 7.3 SEO metadata checks

1. Verify each page has a unique, descriptive `<title>` matching the planned title tag.
2. Verify each page has a unique `<meta name="description">` under 155 characters.
3. Verify each page has a self-referencing canonical with a trailing slash.
4. Verify `robots.txt` does not block any legal page and the sitemap includes the three new routes.
5. Verify OpenGraph and Twitter metadata are populated (can fall back to site defaults).

### 7.4 Footer and navigation checks

1. Verify `src/components/Footer.tsx` includes links to `/privacy/`, `/terms/`, and `/cancellation-policy/`.
2. Verify those links use the route keys from `src/lib/routes.ts`, not hard-coded strings.
3. Click every footer legal link in the exported build and confirm it lands on the correct page with no 404.
4. Verify the mobile footer (if distinct) also surfaces the legal links or that they are reachable within 3 clicks from the home page.

### 7.5 Booking confirmation coordination

1. Review the TICKET-003 (and TICKET-024 if applicable) confirmation component/email template.
2. Confirm a link to `/cancellation-policy/` is present in both the on-screen confirmation and the confirmation email.
3. Confirm the link text is descriptive, e.g., `Cancellation and weather policy`, not `Click here`.

### 7.6 Accessibility checks

1. One H1 per legal page; no skipped heading levels.
2. All legal links are reachable by keyboard.
3. Link text is descriptive (`Terms of Service`, not `here`).
4. Color contrast passes WCAG 2.2 AA for body text (`ink` on `cream-50` or `white`).
5. Line length for legal prose stays close to ~65 characters on desktop.
6. Touch targets for footer links are ≥44 px on mobile.

### 7.7 Content and copy checks

1. Read all three pages against the forbidden-phrase list in `brand_identity_writing_style.md`:
   - No “unlock your potential”, “soar to new heights”, “sky’s the limit”, “world-class”, “passionate team”, etc.
   - No LLM hedges such as “it’s important to note”, “in today’s world”, “at the end of the day”, “ultimately”.
2. Verify the NAP block on each page matches `src/lib/config.ts` byte-for-byte:
   - `1008 Gentry Way, Reno, NV 89512`
   - `office@hornbillaviation.com`
   - `555-555-1234`
3. Verify the privacy policy accurately reflects the analytics/payment tools actually in use.
4. Verify the cancellation page links to `/discovery-flight/` and `/contact/`.
5. Flag any `// TODO: operator approval` placeholders and confirm they are resolved before launch.

### 7.8 Cross-ticket contract checks

1. Confirm `src/lib/routes.ts` exports legal route objects that other tickets can import.
2. Confirm no legal URL is hard-coded anywhere except in `src/lib/routes.ts`.
3. Confirm `Prose` uses only Tailwind utilities already available from TICKET-001; do not introduce new theme tokens unless also added to `tailwind.config.ts` by TICKET-001.

---

## 8. Implementation order (suggested)

1. Wait for or verify completion of TICKET-001 (shell, routes, footer, schema helpers).
2. Create `src/components/Prose.tsx` for long-form legal text.
3. Create content data files under `src/content/legal/` with operator-review placeholders.
4. Add legal route entries to `src/lib/routes.ts`.
5. Update `src/components/Footer.tsx` to include the legal links.
6. Create `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, and `src/app/cancellation-policy/page.tsx` composing `PageHeader`, `Container`, `Section`, `Prose`, `FAQAccordion`, and `SchemaInjector`.
7. Run `npm run build`, verify the three pages export correctly, and run the verification steps above.
8. Coordinate with TICKET-003/TICKET-024 owners to add the `/cancellation-policy/` link in booking confirmations.
9. Submit final copy to the operator/legal counsel for approval before launch.
10. Update ticket status and hand off to TICKET-029 (Final QA).
