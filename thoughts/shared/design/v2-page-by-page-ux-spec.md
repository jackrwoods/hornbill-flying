---
date: 2026-07-11
author: Claude Code (design workflow)
repository: hornbill-flying
related_research:
  - thoughts/shared/research/2026-06-17-flight-school-website-competitor-and-findability-research.md
  - thoughts/shared/research/2026-06-17-online-marketing-small-business-flight-school.md
  - thoughts/shared/research/2026-06-18-seo-for-small-businesses.md
  - thoughts/shared/research/2026-07-11-hornbill-aviation-website-visual-style.md
related_design:
  - thoughts/shared/design/visual_identity.md
  - thoughts/shared/design/brand_identity_writing_style.md
  - thoughts/shared/design/v2-visual-and-motion-system.md
  - thoughts/shared/design/v2-information-architecture-and-seo.md
  - thoughts/shared/design/v2-voice-and-copy.md
  - thoughts/shared/design/v2-components.md
  - thoughts/shared/design/v2-webgl-cockpit-showpiece.md
topic: "V2 page-by-page UX specification for hornbillaviation.com"
tags: [design, v2, ux, page-spec, story-pages, product-pages, schema, seo]
status: draft
---

> **Launch state — read [`v2-resolutions.md`](./v2-resolutions.md) first.** Homepage hero is a static sunset-gradient placeholder (no WebGL at launch). 3 instructors at launch (Trygve, Joel, Ethan; Kurtis later — design the Instructors index so adding him is a content-file change). Reviews/testimonials suppressed. Blog index links to existing posts. Cross-Country Rentals is standalone. No per-city pages. Booking uses Flight Circle's embeddable widget on `/discovery-flight/` and `/book/`. Phone TBD; quick-facts strip renders a "Call us" link to the contact page until assigned.

# V2 Page-by-Page UX Specification

This document specifies every page on the V2 hornbillaviation.com site: URL, register, metadata, section structure, scroll beats (story pages only), CTAs, schema markup, internal links, quick-facts strip behavior, and validation criteria.

It does NOT restate rules owned by sibling docs. It references them:

- **Motion, scroll-driven animation, the WebGL cockpit, and reduced-motion fallbacks** → follow `v2-visual-and-motion-system.md` and `v2-webgl-cockpit-showpiece.md`. Where this doc needs a named motion pattern, it names it (e.g., "horizon-reveal") and links to that doc.
- **Voice register rules, the grounded/poetic split, and the banned-phrase list** → follow `v2-voice-and-copy.md` and `brand_identity_writing_style.md`. This doc shows worked copy examples but does not re-derive the rules.
- **Color tokens, typography scale, component library, card/button/form variants** → follow `v2-components.md` and `visual_identity.md`. This doc references components by name (e.g., `PrimaryButton`, `Card`, `QuickFactsStrip`).
- **Site IA, URL conventions, sitemap, schema conventions, quick-facts strip data model** → follow `v2-information-architecture-and-seo.md`. This doc specifies per-page schema types and quick-facts content but not the JSON-LD scaffold or strip implementation.

A single shared template drives every page below. The template is described once, then each page entry fills it in.

## Current State

The live site (observed 2026-07-11) is a single-page BootstrapMade "Coming Soon" template: a full-screen hornbill-over-Tahoe photo with an 80% dark overlay, a countdown timer, a newsletter form, and four info cards. It uses Raleway/Roboto/Poppins and a single orange accent. There is no real content — no programs, no fleet, no instructors, no pricing, no booking flow. Navigation is three anchor links. The repo's V1 layout doc is archived and explicitly not inherited. The V2 build starts from scratch on a Next.js static-export stack; only the brand docs and the live site's NAP carry over.

## Desired End State

The V2 site is 17 pages across three registers: two story pages (Homepage, Discovery Flight) with cinematic scroll storyboards, fourteen product pages with a uniform section template, and two utility pages (booking flow, 404). One shared page template governs them all. The rest of this section is the page-by-page spec: first the shared template, then each page's metadata, sections/beats, CTAs, schema, internal links, quick-facts strip content, and validation criteria.

### Shared page template

Every page (story or product) renders this skeleton:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- meta, title, description, canonical, og, twitter, schema JSON-LD -->
  <!-- font preloads; critical CSS inline; non-critical CSS deferred -->
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <QuickFactsStrip />     <!-- persistent, anchored, reachable without scrolling -->
  <SiteHeader />          <!-- logo, primary nav, primary CTA -->
  <main id="main">
    <!-- page-specific sections -->
  </main>
  <SiteFooter />          <!-- NAP, hours, nav, social, legal -->
</body>
</html>
```

### QuickFactsStrip

The `QuickFactsStrip` is a persistent, viewport-anchored bar that surfaces the five crawlable facts without requiring scroll: price (discovery flight $199), phone (TBD), address (1008 Gentry Way, Reno, NV 89512), hours (Daily 8:00a–5:00p), and "Part 61 · RNO." On desktop it docks to the bottom edge; on mobile it docks to the top edge below the header. It is `aria-label="Quick facts"`, keyboard-reachable, and the first focusable element after the skip link.

On story pages, the strip fades to 40% opacity during pinned WebGL or scroll-driven beats and returns to 100% between beats. It never disappears. Crawlers and screen readers always see the facts first because the strip is the first content in the DOM after the skip link.

### SiteHeader and SiteFooter

Per `v2-components.md`. Header carries the wordmark, primary nav (Home, Programs, Fleet & Pricing, Instructors, Cross-Country, About, Blog, Contact), and the persistent primary CTA "Book a discovery flight" (`/discovery-flight/`). Footer carries NAP, hours, full nav, and legal. Both are present on every page except `/book/` and `404`, which use minimal chrome.

### CTA placement rules (all pages)

- Primary CTA in the hero.
- Primary CTA repeated at the end of every major section (section break).
- On mobile, a sticky bottom bar renders the primary CTA with the section's anchor (e.g., "Book a discovery flight" on `/discovery-flight/`, "See fleet & rates" on `/fleet/`). The sticky bar is suppressed when the user is already within the booking flow.
- Secondary CTA (ghost/tertiary button) appears once per page, in the hero, when the page has a clear secondary action (e.g., "Meet the instructors" on `/`).

### Schema conventions

Every page emits JSON-LD in `<head>`. Baseline for all pages: `BreadcrumbList` + `WebPage` (or a more specific subtype). Page entries below specify additional types. All schema must validate clean in Google's Rich Results Test with no warnings.

### Cross-cutting budgets

Performance and accessibility budgets are stated once in the Multilayer Validation Requirements section at the end of this doc and apply to every page below. They are not restated per page.

---

## 1. Homepage (`/`) — STORY PAGE

### Metadata

| Field | Value |
|---|---|
| URL | `/` |
| Register | Story |
| Title tag | `Part 61 Flight School in Reno, NV | Hornbill Aviation` (≤ 60 chars) |
| Meta description | `Part 61 flight school at Reno–Tahoe International. PA28 fleet, instructors you choose, real cross-country rentals. Discovery flights from $199.` (≤ 155 chars) |
| H1 | `Learn to fly on your schedule.` (poetic register, ≤ 8 words) |
| Schema | `LocalBusiness` (subtype `FlightSchool`), `EducationalOrganization`, `BreadcrumbList`, `FAQPage` (if homepage FAQ section is included) |

### Quick-facts strip content

`Discovery flight $199 · Phone TBD · 1008 Gentry Way, Reno NV · Daily 8a–5p · Part 61 · RNO`

### Internal links

Hero CTA → `/discovery-flight/`; beats 6–8 link to `/programs/[slug]/`, `/fleet/`, `/instructors/`, `/cross-country-rentals/`. Footer nav on all pages.

### Beat-by-beat scroll storyboard

The homepage is a single cinematic scroll in the left seat of a PA28. Gaze drifts across the panel, out the windscreen, toward the horizon over Tahoe. Each beat below specifies scroll range (0–1), pin/scrub/parallax, visual, poetic copy intent, emotional goal, CTA, and strip behavior.

| Beat | Scroll | Pin/Scrub/Parallax | Visual | Copy intent (poetic) | Emotional goal | CTA | Strip |
|---|---|---|---|---|---|---|---|
| 1. Left seat | 0.00–0.15 | Pinned WebGL cockpit, scroll-scrubbed camera pan across panel | Interior of PA28 from left seat, panel filling frame, hands on yoke | "You sit in the left seat. The panel is lit. The fuel gauges read full." | Competence, calm | None | Faded to 40% |
| 2. Key turn | 0.15–0.25 | Scrubbed: magneto roll, instruments alive | Same cockpit, avionics booting, G5 screens wake | "You turn the key. The fan turns. The gauges come alive one by one." | Anticipation | None | Faded to 40% |
| 3. Horizon-reveal | 0.25–0.40 | Parallax: windscreen brightens, horizon lifts into frame per `horizon-reveal` pattern in `v2-visual-and-motion-system.md` | Camera lifts from panel to windscreen; Tahoe and Sierra fill the glass | "You look up. The Sierra holds the sky. Tahoe sits under the morning." | Slightly epic | None | Faded to 40% |
| 4. Throttle in | 0.40–0.55 | Scrubbed: throttle forward, airspeed alive | Runway in the windscreen, airspeed needle climbing | "You push the throttle in. The wheels leave the runway." | Lift, commitment | None | Fading in to 100% |
| 5. Above Reno | 0.55–0.70 | Parallax: aerial golden-hour photo of KRNO and the Sierra, scroll-drifts across | Real aerial photograph of KRNO and the Sierra at golden hour | "You are above Reno. The valley opens. The desert goes on." | Freedom | None | 100% |
| 6. What you train for | 0.70–0.85 | Static product-register section, fades up | Program cards: SPL, PPL, IR, CPL, CFI, CFII, Mountain Flying. Real aircraft photo behind. | Grounded: "Train for any of these. All on one fleet. All at your pace." | Capability, choice | Primary: `See programs` → `/programs/private-pilot/` | 100% |
| 7. The fleet | 0.85–0.95 | Static, fades up | Four PA28 cards with tail numbers and wet rates. | Grounded: "Four PA28-180s. Same handling. Predictable cost." | Trust, value | Primary: `See fleet & rates` → `/fleet/` | 100% |
| 8. Book | 0.95–1.00 | Static, fades up | Single centered CTA on blue-900 band. | Poetic, restrained: "Your first lesson is a discovery flight. You fly. We watch." | Action | Primary: `Book a discovery flight — $199` → `/discovery-flight/` | 100% |

### Failure modes

- WebGL unavailable or `prefers-reduced-motion: reduce`: render beats 1–4 as a single still cockpit image with windscreen horizon visible. All copy and CTAs remain; beats 5–8 unchanged.
- Slow connection (`effectiveType` ≤ 3g or `saveData`): skip WebGL, render the static fallback; hero LCP image is the cockpit still with `fetchpriority="high"`.
- WebGL context loss: catch the event, swap to the static hero, show no error.

### Validation criteria

- LCP element is the hero image (still or WebGL poster); LCP ≤ 2.0s on a mid-tier Android over 4G.
- All eight beats present and in order; copy matches the worked examples or approved variants in `v2-voice-and-copy.md`.
- `LocalBusiness` schema validates clean; NAP matches the quick-facts strip exactly.
- Skip link reaches `#main`; keyboard tab order reaches the quick-facts strip before the hero CTA.
- Reduced-motion path renders all CTAs without WebGL.

---

## 2. Discovery Flight (`/discovery-flight/`) — STORY PAGE

### Metadata

| Field | Value |
|---|---|
| URL | `/discovery-flight/` |
| Register | Story |
| Title tag | `Discovery Flight in Reno — $199, No Deposit | Hornbill Aviation` |
| Meta description | `Book a discovery flight at Reno–Tahoe International. You sit in the left seat and fly. $199, no deposit. Under 60 seconds to book.` |
| H1 | `Your first lesson is a discovery flight.` |
| Schema | `Service` (subtype `DiscoveryFlight`), `Offer` (price $199, priceCurrency USD, availability InStock), `FAQPage`, `BreadcrumbList` |

### Quick-facts strip content

`Discovery flight $199 · No deposit · Daily 8a–5p · 1008 Gentry Way, Reno NV · Part 61 · RNO`

### Internal links

- Hero CTA → `/book/` (scrolls down to embedded booking flow at beat 5)
- In-context link → `/instructors/` ("See the instructors you might fly with")
- In-context link → `/fleet/` ("The PA28 you'll fly")
- Footer nav

### Beat-by-beat scroll storyboard

| Beat | Scroll | Pin/Scrub/Parallax | Visual | Copy intent (poetic) | Emotional goal | CTA | Strip |
|---|---|---|---|---|---|---|---|
| 1. Pre-flight | 0.00–0.15 | Pinned: photo of instructor and student walking the ramp at blue hour | Two figures walking toward a PA28 on the RNO ramp | "You meet your instructor at the airplane. You walk around it together." | Reassurance, calm | None | 100% |
| 2. Walk-around | 0.15–0.30 | Parallax: detail photos of inspection — fuel sump, tire, prop | Real detail photos from the preflight | "You check the fuel. You check the oil. You look at everything." | Competence | None | 100% |
| 3. Left seat | 0.30–0.45 | Static image: visitor's POV in the left seat, panel lit | Cockpit interior from left seat | "You sit in the left seat. Your instructor sits to your right." | Anticipation | None | 100% |
| 4. You fly | 0.45–0.65 | Parallax: aerial photo over the Sierra at golden hour | Real aerial photo, scroll-drifts | "You push the throttle in. You rotate. You fly." | Lift | None | 100% |
| 5. Book | 0.65–1.00 | Booking flow mounts inline. No pin. | Booking widget (date → name + email → Apple/Google Pay → confirmation). Visible price, duration, no deposit. | Grounded: "Discovery flight — $199. About 60 minutes. No deposit. Pick a day." | Action | Primary: embedded booking flow → `/book/` | 100% |

### Booking flow rules (per `v2-information-architecture-and-seo.md`)

- Three taps to confirmed: date → name + email → pay. Under 60 seconds on mobile.
- Price and duration visible above the fold of beat 5. No "contact for pricing."
- Apple Pay and Google Pay supported. Card fallback present.
- On confirmation: inline success state with booking summary and a link to the pre-flight prep page. The confirmation triggers the immediate confirmation email per the nurture sequence in the research.
- If the booking API is unavailable: render a static fallback with a phone CTA and a mailto link; log the failure.

### Failure modes

- Booking API down: static fallback (phone + mailto) with the same price/duration copy. Show a one-line status: "Online booking is briefly unavailable. Call us and we'll book it for you."
- Reduced motion: beats 1–4 collapse to a single-column story with one image per beat. Booking flow is unchanged.
- Slow connection: booking flow loads with a skeleton; the rest of the page is static.

### Validation criteria

- Booking flow completes in under 60 seconds on a mid-tier Android over 4G, three taps.
- `Service` + `Offer` schema validates clean. `Offer.price` is `199`, `priceCurrency` is `USD`, `availability` is `https://schema.org/InStock`.
- `FAQPage` schema present with at least four Q&A entries (see FAQ section below).
- Mobile sticky CTA bar shows "Book — $199" through beats 1–4, then hides once the booking flow is in view.
- Page reachable in under 2 clicks from `/` (homepage hero CTA is 1 click).

---

## 3. Program page template (`/programs/[slug]/`) — PRODUCT PAGE

Worked example: Private Pilot (`/programs/private-pilot/`).

### Shared metadata template

| Field | Value |
|---|---|
| URL | `/programs/[slug]/` |
| Register | Product |
| Title tag | `[Program name] in Reno, NV — Part 61 Training \| Hornbill Aviation` |
| Meta description | Program-specific; always contains: "Part 61", "Reno", "PA28", and a concrete number (hours or cost). ≤ 155 chars. |
| H1 | `[Program name]` (e.g., `Private pilot`) |
| Schema | `Service`, `Course` (with `coursePrerequisites` and `educationalCredentialAwarded`), `BreadcrumbList`, `FAQPage` |

### Quick-facts strip content (shared)

`Discovery flight $199 · Member rate $159/hr · Daily 8a–5p · 1008 Gentry Way, Reno NV · Part 61 · RNO`

### Section structure (7 sections, all product pages)

1. **Hero.** H1, one-line grounded subhead, primary CTA `Book a discovery flight`, secondary CTA `See fleet & rates`. Single real photograph (the PA28 the student will fly). No narrative arc.
2. **What it is.** Two-column: left = grounded copy (what the certificate lets the holder do, FAA minimums, realistic averages); right = a real photo of the cockpit or panel.
3. **Timeline and cost.** Table: stage, dual hours, solo hours, ground hours, estimated cost. Use IBM Plex Mono for numbers. Cite member rate `$159/hr` and non-member rate `$185/hr`. No hidden fees.
4. **Aircraft.** Card list of the PA28-180s used (tail number, avionics, wet rate). Links to `/fleet/`.
5. **Instructors.** Three instructor cards (photo, name, credential shorthand, specialties). Each links to `/instructors/[slug]/`.
6. **Program-specific FAQ.** Four to six Q&A. Pairs with `FAQPage` schema. Example for PPL: "Do I need a medical?" "How often do I fly?" "What if I have to miss a week?"
7. **Next step.** Centered band on blue-900. Primary CTA `Book a discovery flight` → `/discovery-flight/`. Secondary CTA `Ask a question` → `/contact/`.

### CTA placement

- Hero: primary (`Book a discovery flight`) + secondary (`See fleet & rates`).
- End of sections 3, 4, 5, 6: a single inline primary CTA.
- Sticky mobile bar: `Book — /discovery-flight/`, hidden when section 7 is in view.

### Worked example: Private Pilot (`/programs/private-pilot/`)

- Title tag: `Private Pilot in Reno, NV — Part 61 Training | Hornbill Aviation`
- Meta description: `Earn a private pilot certificate at a Part 61 school at Reno–Tahoe International. PA28 fleet, instructors you choose, 40+ hours. Discovery flight $199.`
- H1: `Private pilot`
- Section 2 copy: "A private pilot certificate lets you fly passengers anywhere in the U.S., day or night, visual conditions. The FAA requires 40 hours. Most students finish between 55 and 70."
- Section 3 table: stages solo, cross-country, night, dual, ground; estimated total cost range using member rate.
- Section 4 aircraft: N6576J and N7824W (the two IFR-equipped PA28s).
- Section 5 instructors: three named CFIs.
- Section 6 FAQ: medical, scheduling, weather, checkride, repeating lessons.

### Per-program differences

| Program | URL slug | Title tag | Key copy anchor | Aircraft |
|---|---|---|---|---|
| Sport Pilot (SPL) | `sport-pilot` | `Sport Pilot in Reno, NV — Light Sport Training` | 20 hours FAA minimum, fly for fun, no medical | N7969W, N0001J (VFR panel) |
| Private Pilot (PPL) | `private-pilot` | `Private Pilot in Reno, NV — Part 61 Training` | 40 hours, passengers anywhere | N6576J, N7824W |
| Instrument Rating (IR) | `instrument-rating` | `Instrument Rating in Reno, NV — IFR Training` | 50 hours PIC cross-country, fly in the clouds | N6576J, N7824W (WAAS GPS) |
| Commercial Pilot (CPL) | `commercial-pilot` | `Commercial Pilot in Reno, NV — Part 61` | 250 hours, fly for hire, complex time | All four PA28s |
| CFI | `cfi` | `Certified Flight Instructor in Reno, NV` | Teach others, add-on for working pilots | N6576J, N7824W |
| CFII | `cfii` | `CFII in Reno, NV — Instrument Instructor` | Teach IFR students | N6576J, N7824W |
| Mountain Flying | `mountain-flying` | `Mountain Flying in the Sierra Nevada` | Density altitude, ridge crossings, KTRK/KTVL/KMMH | All four; route-specific |

Each program page follows the same 7-section structure. Only the copy, table, aircraft list, and FAQ differ.

### Validation criteria

- One H1, sentence case.
- Title tag includes "Reno" and the program name; never generic ("Private Pilot \| Hornbill").
- `Service` + `Course` + `FAQPage` schema validate clean.
- Internal links to `/fleet/`, `/instructors/`, `/discovery-flight/`, and at least one sibling program.
- Cost table numbers use IBM Plex Mono and `tabular-nums`.

---

## 4. Fleet & Pricing (`/fleet/`) — PRODUCT PAGE

### Metadata

| Field | Value |
|---|---|
| URL | `/fleet/` |
| Register | Product |
| Title tag | `PA28 Fleet & Rental Rates in Reno | Hornbill Aviation` |
| Meta description | `Four PA28-180s at Reno–Tahoe International. Member wet rate $159/hr, non-member $185/hr. No fuel surcharge. No membership fee to fly.` |
| H1 | `Four PA28s. Same handling. Predictable cost.` |
| Schema | `ItemList` of `Product` entries (one per aircraft), `Offer` per aircraft, `BreadcrumbList`, `FAQPage` |

### Quick-facts strip content

`Member rate $159/hr wet · Non-member $185/hr · No fuel surcharge · Daily 8a–5p · Part 61 · RNO`

### Section structure (6 sections)

1. **Hero.** H1, subhead with both rates, primary CTA `Book a discovery flight`, secondary `See membership`.
2. **Aircraft cards.** Four cards. Each: real photo, tail number, panel description (dual Garmin G5 + WAAS 375, etc.), wet rate (member and non-member), CTA `Book this aircraft` (links to scheduling or contact per availability). Member vs. non-member shown side-by-side with `tabular-nums`.
3. **What "wet" means.** Short grounded explainer (one paragraph) and a 3-row mini-table: included (fuel, oil), not included (instructor time, ground), surcharge policy (none).
4. **Membership comparison.** Two columns: member ($49/mo, $159/hr) vs. non-member ($0/mo, $185/hr). Show the break-even hour count. Link to `/membership/`.
5. **Cross-country rental policy.** Paragraph + bullet list: who can rent, minimum hours required, cross-country vs. practice area, insurance, checkout requirements. Link to `/cross-country-rentals/`.
6. **FAQ.** Four to six Q&A: "What's wet?" "Can I rent for a weekend trip?" "Do I need a checkout?" "What about fuel surcharges?" "Can I bring a friend?"

### Validation criteria

- Every aircraft card shows a real photo, tail number, and rate matching the brand facts; no "contact us for pricing" anywhere. `ItemList` + `Offer` schema validates clean.

---

## 5. Membership (`/membership/`) — PRODUCT PAGE

### Metadata

| Field | Value |
|---|---|
| URL | `/membership/` |
| Register | Product |
| Title tag | `Flight School Membership in Reno — $49/month | Hornbill Aviation` |
| Meta description | `Hornbill Aviation membership is $49/month. Member PA28 wet rate drops to $159/hr. Break-even at about 2 flight hours a month.` |
| H1 | `Membership` |
| Schema | `Product` (membership), `Offer` ($49/month), `BreadcrumbList`, `FAQPage` |

### Quick-facts strip content

`Membership $49/mo · Member rate $159/hr wet · Daily 8a–5p · 1008 Gentry Way, Reno NV · Part 61 · RNO`

### Section structure (5 sections)

1. **Hero.** H1, $49/month, primary CTA `Book a discovery flight`, secondary `See fleet & rates`.
2. **What membership gets you.** Bullet list: $159/hr wet (vs. $185), scheduling priority, cross-country rental eligibility, no fuel surcharge. Grounded copy.
3. **The math.** Single table: hours/month, member cost, non-member cost, savings. Show break-even at ~2 hours/month. IBM Plex Mono, `tabular-nums`.
4. **How to join.** Three-step grounded list (sign up, schedule a checkout flight, fly). CTA `Start membership` (links to contact or sign-up form).
5. **FAQ.** Four Q&A: cancel anytime, refund policy, can I share, what if I fly less than break-even.

### Validation criteria

- Break-even table present and correct; numbers use `tabular-nums`.
- `Product` + `Offer` schema validates clean; no superlatives in copy.

---

## 6. Instructors index (`/instructors/`) — PRODUCT PAGE

### Metadata

| Field | Value |
|---|---|
| URL | `/instructors/` |
| Register | Product |
| Title tag | `Flight Instructors in Reno — PA28 CFIs | Hornbill Aviation` |
| Meta description | `Meet the CFIs at Hornbill Aviation. Named instructors, real credentials, real hours. Choose one — or bring your own.` |
| H1 | `Instructors` |
| Schema | `CollectionPage`, `BreadcrumbList` |

### Quick-facts strip content

`Choose your instructor · Or bring your own · Daily 8a–5p · 1008 Gentry Way, Reno NV · Part 61 · RNO`

### Section structure (4 sections)

1. **Hero.** H1, subhead "Choose your instructor — or bring your own," primary CTA `Book a discovery flight`.
2. **Instructor grid.** Cards: headshot, name (full name), credentials shorthand, one-line specialty, total hours, `Book with [Name]` button linking to `/instructors/[slug]/`. Always show full names and certificate numbers per E-E-A-T.
3. **Bring your own CFI.** Short grounded paragraph: yes, you can. Here's how. CTA `Ask about bringing your instructor` → `/contact/`.
4. **Next step.** Primary CTA `Book a discovery flight` → `/discovery-flight/`.

### Validation criteria

- Every instructor card shows a full name (first and last); each card links to an individual profile page. No first-name-only entries.

---

## 7. Instructor profile (`/instructors/[slug]/`) — PRODUCT PAGE

### Metadata

| Field | Value |
|---|---|
| URL | `/instructors/[slug]/` |
| Register | Product |
| Title tag | `[Name] — Flight Instructor, [Credentials] in Reno | Hornbill Aviation` |
| Meta description | `[Name] is a [CFI/CFII/...] at Hornbill Aviation in Reno. [Hours] hours, [specialty]. Book with [First name].` |
| H1 | `[Name]` |
| Schema | `Person` (with `jobTitle`, `knowsAbout`, `alumniOf` if applicable), `BreadcrumbList` |

### Quick-facts strip content

`Book with [First name] · Daily 8a–5p · 1008 Gentry Way, Reno NV · Part 61 · RNO`

### Section structure (6 sections)

1. **Hero.** H1, credentials shorthand as subhead (e.g., "FAA CFI, CFII"), professional headshot. Primary CTA `Book with [First name]` → `/book/?instructor=[slug]`.
2. **Origin story.** Two to three short paragraphs in the grounded register. How they got into aviation, how they teach. Real details, no clichés.
3. **Credentials block.** Scannable list: certificates, total hours, dual given, students passed, specialties. IBM Plex Mono labels.
4. **Specialties.** Bullet list (mountain flying, instrument, anxious students, career-changers).
5. **Personal.** One short paragraph of humanizing detail. No "passionate about aviation."
6. **Book.** CTA repeated. Secondary CTA `Ask a question` → `/contact/`.

### Validation criteria

- `Person` schema with `jobTitle` and `knowsAbout`; full name on first mention; no banned phrases; at least one internal link to a relevant program page.

---

## 8. Cross-Country Rentals (`/cross-country-rentals/`) — PRODUCT PAGE

### Metadata

| Field | Value |
|---|---|
| URL | `/cross-country-rentals/` |
| Register | Product |
| Title tag | `Cross-Country Aircraft Rentals in Reno | Hornbill Aviation` |
| Meta description | `Rent the same PA28 you train in and fly real cross-country trips from Reno. Tahoe, Monterey, Bend. Plan a route, file, and go.` |
| H1 | `Fly real trips, not just practice loops.` |
| Schema | `Service`, `BreadcrumbList`, `FAQPage` |

### Quick-facts strip content

`Member rate $159/hr wet · Daily 8a–5p · 1008 Gentry Way, Reno NV · Part 61 · RNO`

### Section structure (5 sections)

1. **Hero.** H1, subhead, primary CTA `Book a discovery flight`, secondary `See fleet & rates`.
2. **What you get.** Grounded: same PA28s you train in, real cross-country eligibility, no practice-area-only restriction. Bullet list.
3. **One trip story.** A single real trip: KRNO → KTVL → KTRK, with route, aircraft, what the student did, what they learned. This is the only section allowed partial poetic register (concreteness, restraint).
4. **Requirements.** Checkout requirements, minimum hours, insurance, weather minimums. Grounded.
5. **FAQ + CTA.** Four Q&A. Primary CTA `Ask about cross-country rental` → `/contact/`.

### Validation criteria

- Trip story names real airports with real identifiers.
- Requirements list is specific (hours, currency, checkout).
- Internal links to `/fleet/` and `/membership/`.

---

## 9. Location / RNO (`/location/`) — PRODUCT PAGE

### Metadata

| Field | Value |
|---|---|
| URL | `/location/` |
| Register | Product |
| Title tag | `Flight School at Reno–Tahoe International (KRNO) | Hornbill Aviation` |
| Meta description | `Hornbill Aviation is a Part 61 flight school based at Reno–Tahoe International Airport (KRNO). 1008 Gentry Way, Reno, NV 89512.` |
| H1 | `Reno–Tahoe International Airport` |
| Schema | `LocalBusiness` (with `geo`, `hasMap`), `Place`, `BreadcrumbList` |

### Quick-facts strip content

`1008 Gentry Way, Reno NV 89512 · Daily 8a–5p · Phone TBD · Part 61 · RNO`

### Section structure (5 sections)

1. **Hero.** H1, subhead "We fly out of KRNO," real photo of the ramp or terminal. Primary CTA `Book a discovery flight`.
2. **The airport.** Grounded paragraph: KRNO, Class C, 4,403 ft MSL, density-altitude considerations. Why training here makes you a better pilot.
3. **Where to find us.** Address, hours, parking instructions. Embedded map.
4. **The airspace.** Short explainer on Class C at KRNO. Link to a blog post when published.
5. **Get here.** Directions from Reno, Sparks, Carson City, Tahoe. Primary CTA `Book a discovery flight`.

### Validation criteria

- `LocalBusiness` schema with `geo` (39.4991, -119.7681) and `hasMap`; NAP matches quick-facts strip and footer exactly; address is a real hangar, not a PO box.

---

## 10. About (`/about/`) — PRODUCT PAGE with partial narrative

### Metadata

| Field | Value |
|---|---|
| URL | `/about/` |
| Register | Product (with one narrative section) |
| Title tag | `About Hornbill Aviation — Part 61 Flight School in Reno` |
| Meta description | `Hornbill Aviation is a Part 61 flight school at Reno–Tahoe International. Uniform PA28 fleet, instructors you choose, real cross-country rentals.` |
| H1 | `About Hornbill Aviation` |
| Schema | `AboutPage`, `Organization`, `BreadcrumbList` |

### Quick-facts strip content

`Part 61 · KRNO · PA28 fleet · 1008 Gentry Way, Reno NV · Daily 8a–5p · Phone TBD`

### Section structure (5 sections)

1. **Hero.** H1, subhead, real photo of the school or founder. Primary CTA `Book a discovery flight`.
2. **Founder story.** Short narrative section — the only section allowed poetic register. How the school started, why Part 61, why KRNO, why a uniform fleet. Restraint and concreteness. This is the narrative section.
3. **What we believe.** Grounded: the four messaging pillars (Flexibility, Consistency, Real-world experience, Value) as four short labeled paragraphs.
4. **The hornbill.** Short grounded paragraph on the namesake: hornbills are distinctive, determined, built for long flights. That is the kind of pilot we train. No clichés.
5. **Visit.** CTA `Book a discovery flight` and `Contact us` → `/contact/`.

### Validation criteria

- `AboutPage` + `Organization` schema validate clean; founder story uses poetic register without banned phrases; hornbill section does not anthropomorphize beyond the documented brand line.

---

## 11. Financing (`/financing/`) — PRODUCT PAGE

### Metadata

| Field | Value |
|---|---|
| URL | `/financing/` |
| Register | Product |
| Title tag | `Flight Training Financing in Reno | Hornbill Aviation` |
| Meta description | `How to pay for flight training at Hornbill Aviation. Membership, pay-as-you-go, financing partners, scholarships for Northern Nevada pilots.` |
| H1 | `Paying for flight training` |
| Schema | `Service`, `BreadcrumbList`, `FAQPage` |

### Quick-facts strip content

`Membership $49/mo · Member rate $159/hr wet · Daily 8a–5p · 1008 Gentry Way, Reno NV · Part 61 · RNO`

### Section structure (5 sections)

1. **Hero.** H1, subhead, primary CTA `Book a discovery flight`.
2. **Three ways to pay.** Three cards: pay-as-you-go (no commitment), membership ($49/mo, $159/hr), financing partner (named partners). Grounded copy.
3. **Cost transparency.** A grounded cost-range table for PPL using member rates. Link to `/programs/private-pilot/`.
4. **Scholarships.** Bullet list of scholarships available to Northern Nevada pilots. Maintain a curated list. Link out to scholarship providers.
5. **FAQ + CTA.** Four to six Q&A about financing. Primary CTA `Ask about financing` → `/contact/`.

### Validation criteria

- Financing partners named only if real partnerships exist; cost table uses real numbers from `/fleet/`; `FAQPage` schema present.

---

## 12. FAQ (`/faq/`) — PRODUCT PAGE

### Metadata

| Field | Value |
|---|---|
| URL | `/faq/` |
| Register | Product |
| Title tag | `Flight Training FAQ — Reno Flight School Questions | Hornbill Aviation` |
| Meta description | `Common questions about learning to fly at Hornbill Aviation in Reno. Cost, time, medical, scheduling, weather, the discovery flight, and more.` |
| H1 | `Questions` |
| Schema | `FAQPage` (the primary schema; ≥ 20 Q&A pairs), `BreadcrumbList` |

### Quick-facts strip content

`Discovery flight $199 · Member rate $159/hr wet · Daily 8a–5p · 1008 Gentry Way, Reno NV · Part 61 · RNO`

### Section structure (4 sections)

1. **Hero.** H1, short subhead. Primary CTA `Book a discovery flight`.
2. **Category groups.** Questions grouped by category: Cost, Time, Medical, Scheduling, Weather, Discovery flight, Cross-country, Membership. Each category is an H2; each question an H3; answer a grounded paragraph. Answers are citable (specific numbers, named places).
3. **Still have questions.** CTA `Ask a question` → `/contact/`.
4. **Footer CTA.** `Book a discovery flight`.

### Validation criteria

- `FAQPage` schema with ≥ 20 question/answer pairs, all validating clean in Rich Results Test.
- Answers are citable sentences (no marketing-speak like "we deliver amazing training").
- Anchor IDs on every question for deep linking from program pages.

---

## 13. Blog index (`/blog/`) — PRODUCT PAGE

### Metadata

| Field | Value |
|---|---|
| URL | `/blog/` |
| Register | Product |
| Title tag | `Flight Training Blog — Reno, Nevada | Hornbill Aviation` |
| Meta description | `Articles on learning to fly at Reno–Tahoe International. Cost guides, Part 61 vs Part 141, mountain flying in the Sierra, and the discovery flight.` |
| H1 | `Notes from the flight line` |
| Schema | `Blog`, `BreadcrumbList` |

### Quick-facts strip content

`Discovery flight $199 · Member rate $159/hr wet · Daily 8a–5p · 1008 Gentry Way, Reno NV · Part 61 · RNO`

### Section structure (3 sections)

1. **Hero.** H1, short subhead.
2. **Post list.** Card list of published posts. Each card: title, author name, publish date, 2-line excerpt, featured image, `Read` link to `/blog/[slug]/`. Sorted by publish date descending. Paginated or infinite scroll if > 20 posts.
3. **CTA.** `Book a discovery flight`.

### Validation criteria

- `Blog` schema present.
- Every post card shows a named author (not "Hornbill Admin").
- Author names link to `/instructors/[slug]/` when the author is a CFI.

---

## 14. Blog post (`/blog/[slug]/`) — PRODUCT PAGE (article layout)

### Metadata

| Field | Value |
|---|---|
| URL | `/blog/[slug]/` |
| Register | Product (article) |
| Title tag | `[Post title] | Hornbill Aviation` (≤ 60 chars, includes "Reno" where natural) |
| Meta description | Hand-written, ≤ 155 chars, contains a concrete number or named place. |
| H1 | `[Post title]` |
| Schema | `Article` (with `author` as `Person`, `datePublished`, `dateModified`, `image`), `BreadcrumbList` |

### Quick-facts strip content

`Discovery flight $199 · Member rate $159/hr wet · Daily 8a–5p · 1008 Gentry Way, Reno NV · Part 61 · RNO`

### Section structure (5 sections)

1. **Article header.** H1, byline (author name linking to `/instructors/[slug]/`, publish date, read time). Featured image with descriptive `alt`.
2. **Article body.** Long-form, 800–1,500 words. Grounded voice with poetic restraint where appropriate. Real numbers, named places, real aircraft. No banned phrases. Headings (H2, H3) for structure. Inline images with `width`/`height` and `alt`.
3. **Author box.** At the end: author name, credentials shorthand, headshot, link to full profile.
4. **Related posts.** Three cards linking to other posts.
5. **CTA.** `Book a discovery flight`.

### Validation criteria

- `Article` schema with `author` of type `Person`, `datePublished`, and `dateModified`.
- Author byline links to a named profile page.
- Images lazy-loaded with explicit dimensions.
- No "Click here" links. Link text describes the destination.

---

## 15. Contact (`/contact/`) — PRODUCT PAGE

### Metadata

| Field | Value |
|---|---|
| URL | `/contact/` |
| Register | Product |
| Title tag | `Contact Hornbill Aviation — Reno Flight School` |
| Meta description | `Call, email, or visit Hornbill Aviation at 1008 Gentry Way, Reno, NV 89512. Office hours daily 8a–5p. Questions answered within one business day.` |
| H1 | `Contact` |
| Schema | `ContactPage`, `LocalBusiness` (with `contactPoint`), `BreadcrumbList` |

### Quick-facts strip content

`Phone TBD · office@hornbillaviation.com · 1008 Gentry Way, Reno NV 89512 · Daily 8a–5p · Part 61 · RNO`

### Section structure (4 sections)

1. **Hero.** H1, subhead "Questions or a first flight — either is fine."
2. **Contact methods.** Three cards: phone (click-to-call), email (mailto), address (with map link). Each is a large tap target on mobile.
3. **Form.** Name, email, message. Three fields. No reCAPTCHA challenge unless spam becomes a problem; prefer honeypot. Submit posts to the custom API backend. Success state shows confirmation inline.
4. **Hours and directions.** Hours table, embedded map, parking note.

### Validation criteria

- `ContactPage` + `LocalBusiness` schema with `contactPoint`.
- Form is three fields. No phone-number-required gate.
- Click-to-call link present and works on mobile.
- Form has accessible labels, focus rings, and error states (`coral`).

---

## 16. Booking entry (`/book/`) — UTILITY PAGE

### Metadata

| Field | Value |
|---|---|
| URL | `/book/` |
| Register | Utility |
| Title tag | `Book a Discovery Flight in Reno — $199 | Hornbill Aviation` |
| Meta description | `Book a discovery flight at Hornbill Aviation. $199, no deposit, about 60 minutes. Pick a day and pay.` |
| H1 | `Book a discovery flight` |
| Schema | `Service` + `Offer` |

### Page behavior

Minimal chrome: header reduced to logo + close link; no full nav; no footer; no quick-facts strip (price is already on the page). The booking flow is the whole page. Accepts query params (`?instructor=[slug]`, `?program=[slug]`) to pre-select context.

### Flow

1. **Date and time.** Calendar picker, available slots from the booking API.
2. **Your details.** Name, email, phone. Three fields.
3. **Pay.** Apple Pay / Google Pay / card. Price and duration visible. No deposit means no deposit.
4. **Confirmation.** Inline success: booking summary, instructor name, date/time, what to bring, parking, photo of the aircraft. Trigger immediate confirmation email.

### Failure modes

- Booking API down: render phone + mailto fallback with the price/duration copy. Log the failure.
- Slot data unavailable: show a "request a time" form that posts to the CRM.

### Validation criteria

- Reachable in under 2 clicks from `/` and under 2 clicks from `/discovery-flight/`.
- Flow completes in under 60 seconds on mobile (3 taps to confirmed).
- Apple Pay and Google Pay supported.
- `prefers-reduced-motion` disables any confetti or motion in the success state.

---

## 17. 404 — UTILITY PAGE

### Metadata

| Field | Value |
|---|---|
| URL | (any unmatched path) |
| Register | Utility |
| Title tag | `Page not found | Hornbill Aviation` |
| Meta description | (none) |
| H1 | `That page is off the chart.` |
| Schema | `WebPage` only |

### Page behavior

Minimal chrome: header reduced to logo. No quick-facts strip. One real photo of a PA28 in flight or a sectional-chart motif. Three lines of copy in the grounded register. Primary CTA `Back to home`. Secondary `Book a discovery flight`. Three suggested links: `/programs/private-pilot/`, `/fleet/`, `/contact/`.

### Validation criteria

- Returns HTTP 404 (not 200).
- All links resolve to existing pages.
- No broken images.
- WCAG AA contrast on the photo overlay.

---

## Existing Patterns

Patterns carried forward from the brand docs, the live site, and the archived V1 layout:

- **NAP record.** 1008 Gentry Way, Reno, NV 89512; office@hornbillaviation.com; phone TBD. Used verbatim across quick-facts strip, `/location/`, `/contact/`, footer, and `LocalBusiness` schema. The live site already publishes this address; V2 keeps it identical for local SEO continuity.
- **Color intent tokens.** The palette (`blue-900`, `cream-50`, `cream-25`, `gold-500`, `coral`, `teal-500`, `ink`) and the intent-token layer from `visual_identity.md` are reused as-is. V2 does not introduce new colors.
- **Typography stack.** Nunito Sans 800 for headings, Poppins 500 for body, IBM Plex Mono for data labels. Sentence case for headings. The all-caps wordmark is the only display exception.
- **Voice attributes and the banned-phrase list.** From `brand_identity_writing_style.md`. V2 adds the grounded/poetic register split on top of this; it does not replace the voice rules.
- **Retro header/footer treatment.** Header and footer go from navy to cream-50; nav items color-blocked; coral cheatline along the header's bottom edge. Defined in `visual_identity.md` §8 and preserved in V2.
- **CTA phrasing.** CTAs begin with a verb and name the destination ("Book a discovery flight," "See fleet & rates"). From the writing-style guide.
- **Real-photography preference.** Golden hour and blue hour, real aircraft and instructors, no stock. From `visual_identity.md` §5.

## New Patterns

New patterns V2 introduces. These govern the page specs above and are not inherited from V1.

- **Two registers (story vs. product).** Story pages (Homepage, Discovery Flight) use beat-by-beat scroll storyboards with poetic-register copy. Product pages use a uniform section template with grounded copy. The registers differ in narrative ambition, not in craft. Specified in `v2-voice-and-copy.md` and applied per page above.
- **QuickFactsStrip.** A persistent, viewport-anchored bar that surfaces the five crawlable facts (price, phone, address, hours, Part 61 · RNO) without requiring scroll. Docks bottom on desktop, top on mobile. Fades to 40% on story-page pinned beats; never fades on product pages. Defined in `v2-information-architecture-and-seo.md`; per-page content specified above.
- **First-person cockpit POV.** Camera sits in the left seat; the visitor is the protagonist; copy addresses the visitor as "you." Drives the homepage and discovery flight storyboards.
- **Scroll storyboard format.** Story pages specify each beat by scroll-progress range, pin/scrub/parallax designation, visual, copy intent (with a worked poetic example), emotional goal, CTA, and strip behavior. The homepage names the `horizon-reveal` motion pattern from `v2-visual-and-motion-system.md`.
- **WebGL on the homepage only.** One pannable, scroll-tilted PA28 cockpit showpiece. Code-split; never loads on other pages. Static fallback on reduced motion, low-power devices, or slow connections. Spec detail in `v2-webgl-cockpit-showpiece.md`.
- **Booking flow as a dynamic client component.** Three taps to confirmed, under 60 seconds on mobile, Apple/Google Pay, mounted at `/book/` and embedded at `/discovery-flight/` beat 5. Hits a custom API backend. API-down fallback renders a phone + mailto path.
- **CTA placement rules.** Primary CTA in hero; repeated at section breaks; sticky mobile bar with section anchor; one secondary CTA per page in the hero. Suppressed inside the booking flow.
- **Per-page schema.** Each page spec names its schema types. Baseline `BreadcrumbList` + `WebPage` on all pages; `LocalBusiness` + `EducationalOrganization` on `/`; `Service` + `Course` + `FAQPage` on program pages; `Article` with `Person` author on blog posts; `Offer` on discovery flight, fleet, and membership. All schema validates clean with no warnings.
- **Reduced-motion fallbacks per page.** Story pages collapse to a static single-column document with all copy and CTAs. WebGL does not load. Booking flow is unchanged. Specified per page above and enforced in the Multilayer Validation section.

---

## Resolved Design Decisions

| Decision | Rationale |
|---|---|
| Homepage is the only page with WebGL | Per V2 decisions: one WebGL showpiece on the homepage only. All other pages use CSS scroll-driven animation and photography. |
| Quick-facts strip docks to bottom on desktop, top on mobile | Desktop: avoid covering content; mobile: avoid thumb interference and keep facts above the fold below the header. |
| Story pages fade the strip during pinned beats; product pages never fade | The strip must always be present; on story pages fading it during cinematic beats preserves immersion without losing crawlable facts. |
| Program pages use 7 sections, not a narrative arc | Product pages do not force a narrative. The 7-section template is uniform across all program pages for mechanical implementation. |
| All instructor cards show full names | E-E-A-T advantage over both named competitors (NV Flight first-name-only for 3 of 6; BLFS first-name-only for all 14). |
| Booking flow is a dynamic client-side component on `/book/` and embedded on `/discovery-flight/` | Per V2 decisions: static site with dynamic booking component hitting a custom API backend. |
| About page has one narrative section (founder story) and otherwise product register | About is a product page but the founder story is the one place poetic register earns its keep outside story pages. |
| 404 has minimal chrome and no quick-facts strip | The strip exists to surface crawlable facts; on a 404 the priority is recovery, not facts. |
| `/book/` accepts query params for instructor and program pre-select | Lets instructor pages and program pages deep-link into the booking flow with context, reducing friction. |
| Cost tables use IBM Plex Mono with `tabular-nums` | Aligns numbers; matches the brand's data-label convention; prevents layout shift when numbers change. |

---

## Open Questions

1. **Phone number.** The brand facts list "phone TBD." Every page surfaces the phone in the quick-facts strip, header, footer, and contact page. When the number is assigned, update one source-of-truth token; verify every surface in the validation pass.
2. **Booking API backend.** Spec assumes a custom API backend. What is the endpoint contract? What are the availability and confirmation response shapes? The booking flow implementation needs this contract before build.
3. **Instructor photos.** All instructor pages and the instructors index assume real headshots. Do we have photos for every CFI at launch, or do we ship placeholder profiles and add photos later?
4. **Cross-country rental requirements.** The cross-country page cites minimum hours and checkout requirements. What are the actual numbers Hornbill will enforce? They need to be real before publish.
5. **Financing partners.** The financing page lists partners by name. Which partnerships are confirmed? Listing partners we don't have is worse than a shorter list.
6. **Blog launch content.** The blog index and post templates assume published posts. How many posts ship at launch? The research recommends cost guides, Part 61 vs Part 141, and Sierra mountain flying as the first three.
7. **Local landing pages for secondary cities.** The research recommends Sparks, Carson City, Minden, Truckee, South Lake Tahoe pages. Are these in V2 scope or a later phase? This doc does not spec them; if they are in scope, they follow the `/location/` template with city-specific H1 and copy.
8. **GBP products catalog mapping.** The research recommends mapping each program as a GBP product. Does the booking API integrate with GBP, or is product maintenance manual?
9. **Schema for membership.** Membership is modeled as `Product` with an `Offer`. Confirm this is the intended schema type; an alternative is `SubscriptionProduct` or a custom approach.
10. **Reviews at launch.** Both the homepage and discovery flight page benefit from social proof adjacent to CTAs. With no reviews at launch, do we suppress the review component, or seed with beta-student testimonials? The research permits the latter but it needs stakeholder sign-off.

---

## Multilayer Validation Requirements

Validation happens at every layer. Each check is concrete and runnable. These apply to every page above unless a page overrides.

### HTML / semantic

- One `<h1>` per page; heading hierarchy has no skipped levels.
- Skip link present and targets `#main`; quick-facts strip is the first focusable content after it.
- All images have `alt` (empty for decorative); all form fields have `<label>`.
- Lighthouse accessibility audit ≥ 95 on every page template.

### CSS / visual

- Use intent tokens (`--color-*`), not raw palette values, per `v2-components.md`.
- All interactive elements have `:focus-visible` styles using `gold-500`.
- `prefers-reduced-motion: reduce` disables all non-essential animation.
- Mobile breakpoints at 576 / 768 / 992 / 1200 px; tested on three real phone widths.

### JS / interaction

- No scroll handlers that trigger layout; use `IntersectionObserver` and `requestAnimationFrame`.
- All interactive components keyboard-reachable; visible focus; Escape closes overlays.
- INP ≤ 200 ms on mid-tier mobile (Moto G class) measured with WebPageTest on a 4G profile.
- No console errors in a full click-through of the booking flow.

### SEO / schema

- Title tags and meta descriptions within character limits per page.
- One self-referencing canonical per page.
- `sitemap.xml` includes all 17 page types (plus per-program and per-instructor pages); `robots.txt` references it.
- All schema validates clean in Google's Rich Results Test (no warnings, no errors).
- `LocalBusiness` NAP identical on `/`, `/location/`, `/contact/`, footer, and quick-facts strip.

### Performance

- LCP ≤ 2.0 s on CrUX field data (not just lab) for every page. LCP element is the hero image or first text block, never a WebGL canvas.
- CLS ≤ 0.1; every image and canvas has reserved space (explicit `width`/`height`).
- JS payload per page within budget (product ≤ 120 KB gzipped; story ≤ 180 KB with WebGL chunk code-split to `/` only).
- Fonts: one request; `font-display: swap`; preload heading + body weights only.
- Images: AVIF or WebP; `fetchpriority="high"` on LCP hero; lazy-load below the fold.

### Accessibility

- WCAG 2.2 AA minimum; aim AAA where the palette allows.
- Keyboard pass through every page and the booking flow without a mouse.
- Screen-reader pass: NVDA + VoiceOver. Quick-facts strip announced first.
- Reduced-motion path renders all CTAs and content on every page; WebGL does not load on `/`, a still hero renders instead.

### Content

- No banned phrases anywhere (automated grep check in CI).
- All CTAs begin with a verb. All claims use specific numbers, named places, or aircraft identifiers.
- All pages reach the discovery flight CTA within 3 clicks.
- All instructor pages use full names; all blog posts have named authors.

### Booking flow

- Full booking flow completes in under 60 seconds on mobile, three taps to confirmed.
- Apple Pay and Google Pay available; confirmation email fires within seconds.
- API-down fallback renders and logs.

### Cross-page consistency

- Quick-facts strip content consistent across pages (price, phone, address, hours, Part 61, RNO).
- Footer NAP matches quick-facts strip matches `/location/` matches `/contact/` matches schema.
- Header nav and CTA identical on every page (except `/book/` and 404 minimal chrome).