---
date: 2026-06-18
author: Claude Code (design agent)
repository: hornbill-flying
related_research:
  - thoughts/shared/research/2026-06-17-flight-school-website-competitor-and-findability-research.md
  - thoughts/shared/research/2026-06-17-online-marketing-small-business-flight-school.md
related_design:
  - thoughts/shared/design/brand_identity_writing_style.md
  - thoughts/shared/design/visual_identity.md
topic: "Website layout and feature design for Hornbill Flight Center"
tags: [design, website, seo, booking, conversion, flight-school]
status: draft
---

# Hornbill Flight Center — Website Layout & Feature Design

A vertical-slice design document for the public-facing Hornbill Flight Center website. It captures decisions across the page layer, content layer, booking/API layer, and SEO/distribution layer.

## Executive decisions (from user interview)

| Decision | Value | Implication |
|----------|-------|-------------|
| Offerings | Single-engine instruction from Sport Pilot (SPL) through CFI/CFII | Site needs pages for SPL, PPL, IR, CPL, CFI, CFII. No multi-engine page. |
| Hourly wet rate | $159/hr with membership | Membership tier is a core product, not a footnote; pricing page must show both rates. |
| Non-member aircraft rental | $185/hr | Non-members can still rent, but at a higher rate. Clear without being punitive. |
| Instructors at launch | 4 CFIs with real bios and certificate numbers | Individual instructor pages are viable from day one; E-E-A-T signal is strong. |
| Scheduling | Custom API backend | Discovery-flight and lesson booking flow will hit an internal API; the frontend is a static marketing site with dynamic booking components. |
| Site type | Static marketing site (Next.js static export) | Next.js chosen for heavier client-side booking widget interactivity. |
| SEO targets | “Part 61 flight school Reno, NV” in H1/meta; 1–2 blog posts/month | Homepage and program pages lead with Part 61 + Reno/RNO. Blog is built in from launch. |
| Membership price | $49/month | At 6 hours/month, membership pays for itself vs. non-member rate. |
| Discovery flight | $199, $0 deposit | Low-friction booking; payment collected at flight or via full prepay option. |
| NAP | 1008 Gentry Way, Reno, NV 89512; office@hornbillaviation.com; 555-555-1234 | Must match GBP, schema, and all citations byte-for-byte. |

---

## 1. Pages & content map

### Core pages (launch)

| Page | URL | Primary purpose | Conversion role |
|------|-----|-----------------|-----------------|
| Home | `/` | Position the school and funnel to discovery flight | Primary CTA: book discovery flight |
| Discovery Flight | `/discovery-flight/` | Dedicated booking landing page | #1 conversion page |
| Sport Pilot | `/programs/sport-pilot/` | SPL requirements, timeline, cost | Long-tail + trust |
| Private Pilot | `/programs/private-pilot/` | PPL requirements, timeline, cost | Main enrollment page |
| Instrument Rating | `/programs/instrument-rating/` | IR requirements and timeline | Secondary enrollment |
| Commercial Pilot | `/programs/commercial-pilot/` | CPL pathway | Career-track page |
| Flight Instructor (CFI) | `/programs/certified-flight-instructor/` | CFI training | Advanced enrollment |
| Flight Instructor Instrument (CFII) | `/programs/cfii/` | CFII add-on | Advanced enrollment |
| Mountain Flying | `/programs/mountain-flying/` | Single-engine mountain/density-altitude course | Regional differentiator |
| Fleet & Pricing | `/fleet/` | Transparent rates, aircraft, membership | Trust + pre-qualification |
| Membership | `/membership/` | Explain the membership tier and savings | Revenue + retention |
| Instructors | `/instructors/` | Team overview | Trust + E-E-A-T |
| Individual Instructor | `/instructors/[slug]/` | Bio, credentials, availability, booking link | Direct booking with CFI |
| Cross-Country / Rentals | `/cross-country-rentals/` | Real-world flying differentiator | Trust + secondary conversion |
| Location / RNO | `/location/` | Airport, directions, airspace, local SEO | Local search capture |
| About | `/about/` | Founder story, Part 61 philosophy, safety | Trust |
| Financing | `/financing/` | Stratus Financial, payment expectations | Objection removal |
| FAQ | `/faq/` | Common prospective-student questions | Friction reduction |
| Blog | `/blog/` | Pillar + cluster content hub | SEO + nurture |
| Blog Post | `/blog/[slug]/` | Individual article | SEO + authority |
| Contact | `/contact/` | Phone, address, hours, form | Secondary conversion |
| Schedule / Book | `/book/` | Embedded booking app entry point | Conversion infrastructure |
| 404 | `/404/` | Helpful dead-end page | Retention |

### Footer-only / secondary pages

| Page | URL | Purpose |
|------|-----|---------|
| Privacy Policy | `/privacy/` | Legal baseline |
| Terms of Service | `/terms/` | Legal baseline |
| Cancellation / Refund Policy | `/cancellation-policy/` | Reduces booking anxiety |
| Student Resources | `/student-resources/` | Weather, medical, syllabi, POH access (supports enrolled students + SEO) |

---

## 2. Main page (homepage) content

The homepage has one job: get a prospective student to book a discovery flight in under three clicks. Everything else supports that CTA.

### Above-the-fold hero

- **Headline (H1):** *“Part 61 flight school in Reno, NV.”* — 6 words, exact match for the primary SEO quick win. Brand voice allows direct, confident statements.
- **Subheadline:** *“Train in a consistent PA28 fleet, choose your instructor, and fly real cross-country routes from Reno–Tahoe (RNO).”*
- **Primary CTA button:** *“Book a discovery flight”* → `/discovery-flight/`
- **Secondary CTA button:** *“Buy a gift voucher”* → `/discovery-flight/?type=gift`
- **Tertiary action:** Click-to-call phone number in the sticky header (persistent on mobile).
- **Hero visual:** Real photo of a Hornbill PA28 on the RNO ramp, not a stock Cessna. Show the actual aircraft the student will fly.
- **Trust strip below hero:**
  - Part 61 school at RNO
  - Wet PA28 rental from $159/hr with membership
  - 4 named CFIs with certificate numbers
  - Real cross-country rentals

### Next scroll sections

1. **What makes Hornbill different** — four cards aligned to the four messaging pillars:
   - **Flexibility:** Part 61, choose your instructor or bring your own.
   - **Consistency:** Uniform PA28 fleet; predictable handling and costs.
   - **Real-world experience:** Cross-country rentals from day one.
   - **Value:** $159/hr wet with membership; transparent pricing, no fuel surcharge.
2. **Programs grid** — SPL, PPL, IR, CPL, CFI, CFII, Mountain Flying. Each card links to its program page. Keep descriptions short; lead with outcome.
3. **Discovery flight teaser** — *“Discovery flight: $199 for 45–60 minutes. No deposit required.”* Price, duration, what happens, repeat CTA.
4. **Instructor preview** — 4 headshots with names, specialties, and *“Book with [Name]”* links.
5. **Pricing snapshot** — Membership vs non-member wet rate, discovery flight price, one-line CTA to full Fleet & Pricing page.
6. **Social proof** — 3 named testimonials (with photos if available), Google review badge once 5+ reviews exist. If no reviews yet, this section is hidden and replaced with a founder/instructor credibility block.
7. **FAQ accordion** — 5–6 questions, with FAQPage schema.
8. **Latest blog posts** — 3 most recent teasers.

### Homepage technical requirements

- One H1 only.
- Title tag: `Part 61 Flight School in Reno, NV | Hornbill Flight Center`
- Meta description under 155 chars, includes “discovery flight,” “PA28,” “RNO.”
- LocalBusiness + EducationalOrganization + Organization schema.
- FAQPage schema on the FAQ accordion.
- BreadcrumbList.
- Hero image with explicit width/height, `fetchpriority="high"`, `loading="eager"`.
- Sticky mobile header with *“Book a discovery flight”* + tappable phone number.

---

## 3. Blog integration

### Architecture

- Static site generates blog posts from Markdown/MDX files at build time.
- Files live in `src/content/blog/` or equivalent.
- Each post has frontmatter: `title`, `description`, `date`, `author` (CFI name), `tags`, `category`, `heroImage`, `slug`.
- Author frontmatter maps to an `authors/[slug].json` or instructor page; pulls name, credentials, photo, LinkedIn.

### Launch content cluster

Pillar page: `/blog/flight-training-reno-nv/` (comprehensive, 2,500+ words).
Cluster posts published in first 90 days:

1. *“How much does it cost to get a private pilot license in Nevada?”*
2. *“Part 61 vs Part 141: Which is right for you?”*
3. *“What to expect on your first discovery flight at RNO”*
4. *“Mountain flying in the Sierra Nevada: a guide for Reno pilots”*
5. *“Density altitude at KRNO: what student pilots need to know”*
6. *“Medical certificate guide for student pilots”*
7. *“How long does PPL training take part-time vs full-time?”*

### SEO/content conventions

- Every post has a named author with a bio and verifiable credentials.
- Article schema on every post.
- FAQPage schema where appropriate.
- Internal links from each post to the relevant program page, discovery flight page, and pillar page.
- 1:7 repurposing rule: each post generates short-form video, LinkedIn post, email feature, and 3–5 social graphics.

### Publishing cadence

- Target 1–2 posts/month consistently.
- Editorial calendar maintained in `thoughts/shared/content-calendar.md` (separate artifact).

---

## 4. Online booking (custom API backend)

### Core user flow

Discovery flight booking is the #1 conversion event. The frontend posts to a custom API backend.

**Frontend flow (target: under 60 seconds on mobile):**

1. **Step 1 — Choose flight type**
   - Standard PA28 discovery flight (45–60 min)
   - Lake Tahoe scenic discovery flight (75 min)
   - Gift voucher — purchasable without selecting a date; recipient books later
2. **Step 2 — Choose date/time**
   - Calendar widget fed by `/api/availability`
   - Only show slots where an aircraft + CFI are both free
3. **Step 3 — Your details**
   - First name, last name, phone, email
   - Optional: preferred instructor
   - Optional: weight (for W&B sanity)
4. **Step 4 — Payment**
   - $25–$50 deposit or full prepay
   - Stripe/Apple Pay/Google Pay
   - Posts to `/api/bookings`
5. **Step 5 — Confirmation**
   - Booking reference, calendar invite, immediate confirmation email
   - Clear cancellation/weather policy

### API surface

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/availability` | GET | Returns available slots for a date range, filtered by aircraft/instructor/flight type |
| `/api/bookings` | POST | Creates a discovery flight or lesson booking |
| `/api/bookings/:id` | GET | Retrieves booking details |
| `/api/bookings/:id/cancel` | POST | Cancels booking, applies refund policy |
| `/api/instructors/:slug/availability` | GET | Returns availability for a specific CFI |
| `/api/webhooks/stripe` | POST | Stripe payment events |
| `/api/gift-vouchers` | POST | Create/purchase a discovery flight gift voucher |
| `/api/gift-vouchers/:code` | GET | Validate voucher code at booking time |

### Availability model

- Backend owns the canonical schedule (aircraft, instructors, maintenance, existing lessons).
- Frontend requests a 14-day rolling availability window.
- Slots respect:
  - Aircraft maintenance windows
  - Instructor unavailability
  - Sunrise/sunset at RNO
  - Minimum turnaround between flights
  - Discovery-flight duration by type

### Booking backend responsibilities

- Persist bookings.
- Send confirmation email/SMS immediately.
- Trigger CRM entry (Attio / Folk / HubSpot via webhook).
- Enqueue pre-flight nurture sequence:
  - Immediate: confirmation + what to wear/parking/instructor photo
  - 48 hours before: SMS reminder
  - 24 hours before: “What to expect” email
- Record payment status and deposit policy.
- Expose admin endpoints for staff to view/confirm/reschedule.

### Frontend booking components

- `DiscoveryFlightPicker` — flight type + date/time selector
- `InstructorSelector` — optional CFI preference
- `BookingForm` — minimal fields (name, phone, email, weight)
- `PaymentStep` — Stripe Elements or checkout
- `ConfirmationView` — booking reference + next steps

### Mobile requirements

- Calendar is thumb-tappable.
- Apple Pay / Google Pay available.
- Sticky *“Book a discovery flight”* CTA on every page leads directly into the booking flow.
- Form never exceeds 5 visible fields in a single step; multi-step for clarity, not more fields.

---

## 5. SEO techniques

### On-page SEO

| Element | Rule | Example |
|---------|------|---------|
| Title tag | Primary keyword first, city/state, brand | `Private Pilot License Training in Reno, NV | Hornbill Flight Center` |
| Meta description | Keyword + value prop + CTA | `Earn your private pilot license at RNO. Part 61, choose your CFI, train in a PA28 fleet. Book a discovery flight.` |
| H1 | One per page, primary keyword | *“Part 61 flight school in Reno, NV”* |
| URLs | Short, hyphenated, descriptive | `/programs/private-pilot/`, `/discovery-flight/` |
| Alt text | Descriptive, includes location/aircraft | `PA28 Cherokee on the ramp at Reno-Tahoe International Airport` |
| Internal links | 3–5 contextual links per page | Program pages link to discovery flight, fleet, related programs |

### Schema markup (priority order)

1. **Organization** — homepage + about
2. **LocalBusiness** + **EducationalOrganization** — homepage, contact, location
3. **Service** — every program page
4. **Course** — every program page (FAA credential awarded, prerequisites)
5. **FAQPage** — homepage, discovery flight, FAQ, every program page
6. **BreadcrumbList** — site-wide
7. **Article** — every blog post
8. **AggregateRating** — once 5+ reviews exist
9. **Event** — discovery flight (bookable service)

### Local SEO

- Google Business Profile: primary category **Flight School**; secondary: Aviation Training, Aircraft Rental Service, Pilot School.
- NAP identical across GBP, site footer, contact page, schema, and every directory.
- Address = actual KRNO hangar/FBO address.
- Add geo coordinates for RNO (39.4991, -119.7681) in LocalBusiness schema.
- Location page covers: directions, parking, airport access, Class C airspace intro, density altitude note, training routes.
- Service-area / city landing pages if budget allows: Reno, Sparks, Carson City, Minden, Truckee, South Lake Tahoe.

### Content/authority SEO

- Pillar page + cluster articles.
- E-E-A-T: named authors on every post and program page with bio pages linking to LinkedIn.
- CFI certificate numbers published (with consent) for expertise signal.
- Original photography preferred over stock.
- Citations to FAA regs/ACs where appropriate.

### Technical SEO

- Static export = fast LCP.
- WebP/AVIF images, explicit dimensions.
- Sitemap auto-generated from routes.
- robots.txt references sitemap, allows AI crawlers (no blanket blocking).
- Self-referencing canonicals.
- HTTPS.
- Core Web Vitals targets: LCP ≤2.0s, INP ≤200ms, CLS ≤0.1.

### AI / answer-engine optimization

- Quick Answer Box at top of key pages: 50–70 word direct answer.
- Conversational H2/H3 headers matching real queries.
- FAQ sections with FAQPage schema.
- Tables and lists for structured extraction.
- Citable factual statements: *“Hornbill Flight Center is a Part 61 flight school at KRNO offering SPL, PPL, IR, CPL, CFI, and CFII training in a PA28 fleet.”*

---

## 6. Useful widgets for pilots

Pilot-focused widgets drive repeat traffic, earn backlinks, and signal topical authority. Each should be lightweight, accurate, and clearly tied to RNO.

### Widget 1: KRNO METAR / TAF display

- Pull from NOAA/NWS Aviation Weather API.
- Show current METAR and TAF for RNO.
- Decode into plain language for student pilots.
- Link to full briefing on Aviation Weather Center.

### Widget 2: Density altitude calculator

- Input: elevation (auto-filled 4,403 ft for RNO), altimeter, temperature.
- Output: pressure altitude, density altitude, rough takeoff-performance caution flag.
- Tie to a blog post: *“Density altitude at KRNO.”*

### Widget 3: Cross-country fuel / time estimator

- Input: origin (auto RNO), destination, PA28 cruise speed (e.g., 115 kt), fuel burn (e.g., 9 gph), winds optional.
- Output: estimated flight time, fuel required, VFR reserve fuel.
- Pre-populate sample routes: RNO → Tahoe (KTVL), RNO → Monterey (KMRY), RNO → Bend (KBDN).

### Widget 4: Sunrise / sunset at RNO

- Use NOAA or `suncalc`-style calculation.
- Show today’s sunrise/sunset, last legal evening flight time, earliest morning slot.
- Useful for scheduling and safety.

### Widget 5: Practice area / local route map

- Static SVG/map showing common training areas near RNO.
- Labels: practice area, nearby airports (KRTS, KMLC, KLOL, KSPZ), Sierra ridge, Class C boundary.
- Include altitude and airspace notes.

### Widget 6: Flight training cost estimator

- Sliders/inputs: target certificate, estimated hours per week, membership status, instructor rate.
- Output: rough total cost range, weeks to completion.
- Link to transparent pricing page.

### Widget implementation notes

- Build as small, isolated React/Vue/Svelte components or vanilla JS islands.
- Keep external API calls client-side only (no server load on static build).
- Cache aggressively; widgets must not hurt INP.
- Each widget page gets its own landing page with FAQ schema (e.g., `/tools/density-altitude-calculator/`, `/tools/cross-country-estimator/`).
- Link widgets from blog posts, student resources, and footer.

---

## 7. Membership tier design

### Membership page content

- Headline: *“Fly more for less. Stay in the air without the markup.”*
- Pricing card:
  - **Monthly membership:** $49/month
  - **Member PA28 wet rate:** $159/hr
  - **Non-member PA28 wet rate:** $185/hr
  - Savings: $26/hr — at just over 2 hours per month, membership pays for itself.
- Benefits list:
  - Discounted wet rate
  - Priority scheduling
  - Unlimited ground school access
  - 12-hour cancellation window
  - Cross-country rental eligibility
  - No long-term contract
- Clear CTA: *“Start membership”* → booking/API sign-up.

### Pricing page structure

1. Positioning sentence.
2. Membership vs non-member rate comparison table.
3. Per-aircraft cards with tail number, wet rate, avionics, and notes.
4. Instructor rate.
5. Discovery flight price.
6. Financing options.
7. Cancellation/refund policy.
8. FAQ.

### Fleet page aircraft cards

| Tail | Engine | Avionics | Notes |
|------|--------|----------|-------|
| N6576J | 180 HP Lycoming | Dual Garmin G5 units, WAAS Garmin 375 GPS | Cruise prop for efficient IFR cross-country flying |
| N7824W | 180 HP Lycoming | Dual Garmin G5 units, WAAS Garmin 480 GPS | Set up for performance around the mountains |
| N7969W | 180 HP Lycoming | VFR panel | Training and local rental workhorse |
| N0001J | 180 HP Lycoming | VFR panel | Training and local rental workhorse |

---

## 8. Navigation & UX

### Header nav

- Logo + text brand name → home
- Programs (dropdown): Sport Pilot, Private Pilot, Instrument Rating, Commercial Pilot, CFI, CFII, Mountain Flying
- Fleet & Pricing
- Membership
- Instructors
- Cross-Country
- Location
- Blog
- About
- **Persistent primary CTA:** *“Book a discovery flight”*
- **Persistent phone link**

### Mobile nav

- Hamburger menu with disclosure pattern (button + `aria-expanded`).
- Sticky bar at bottom or top with: *“Book a discovery flight”* + phone icon.
- Touch targets ≥44 px.

### Footer

- Address + phone + hours + map embed
- Quick links: Discovery Flight, Programs, Fleet, Membership, Instructors, Location, About, FAQ, Blog, Contact, Privacy, Terms
- Social links (only if active)
- FAA Part 61 statement
- © Hornbill Flight Center

---

## 9. Analytics & measurement

### Day-one stack

- Google Analytics 4 (Measurement ID via GTM)
- Google Search Console (Domain property, DNS TXT)
- Microsoft Clarity (session recording + heatmaps)
- UTM parameter convention for all external links

### Conversion events

- `discovery_flight_booking_started`
- `discovery_flight_booking_completed`
- `phone_click`
- `email_click`
- `membership_signup_started`
- `membership_signup_completed`
- `program_page_view`
- `instructor_page_view`
- `blog_subscription`

### Funnel to track

Session → Program/Fleet page → Discovery Flight page → Booking started → Booking completed → Showed up → Enrolled

---

## 10. Resolved design decisions

| Decision | Rationale |
|----------|-----------|
| Static marketing site (Next.js static export) | Maximizes speed, SEO, and low hosting cost; Next.js chosen for heavier client-side booking widget interactivity. |
| Single-engine only | User confirmed. No multi-engine page; avoids competing with FlyReno. |
| Membership tier at $49/month | Must be a first-class page; break-even at just over 2 flight hours/month. |
| $159/hr member wet rate / $185/hr non-member | Transparently shown on Fleet & Pricing and Membership pages. |
| Discovery flight at $199, $0 deposit | Low-friction first commitment; payment handled at flight or via optional full prepay. |
| 4 CFI placeholder pages from launch | Real bios + photos deferred until CFIs are hired/photographed; certificate numbers intentionally omitted per owner. Pages still publish with name, placeholder focus area, and booking CTA. |
| Custom API backend + Stripe | User preference. Stripe handles discovery flight and gift voucher payments; email alerts for new bookings. |
| NAP: 1008 Gentry Way, Reno, NV 89512; office@hornbillaviation.com; 555-555-1234 | Must match GBP, schema, and all citations byte-for-byte. |
| Mountain Flying program page | Regional differentiator; single-engine mountain/density-altitude course at KRNO. |
| Discovery flight gift vouchers | Available from launch; separate voucher purchase + redemption flow in booking API. |
| “Part 61 flight school in Reno, NV” as homepage H1 | Research identifies it as the single biggest aviation SEO quick win; neither local competitor owns it. |
| Blog from launch | 1–2 posts/month compounds over 12–24 months; needed to outrank incumbents. |
| Pilot widgets | Drive repeat traffic, local authority, and backlinks; tie to RNO and PA28 specifically. |

---

## 11. Open questions

| # | Question | Why it matters |
|---|----------|--------------|
| 1 | Instructor photos and real bios | Placeholder names at launch; replace with real CFIs once hired/photographed. Certificate numbers intentionally omitted per owner. |
| 2 | Payment processor | **Stripe** — handles deposits/full payment in the booking API. |
| 3 | Booking alert channel | **Email** — immediate notification to operations inbox. |
| 4 | Block-time packages | **No** — only membership and pay-as-you-go rates at launch. |
| 5 | Mountain flying course page | **Yes** — add `/programs/mountain-flying/` as a regional differentiator. |
| 6 | Gift vouchers | **Yes** — offer discovery flight gift vouchers from day one. |

---

## 12. Multilayer validation requirements

| Layer | Validation method |
|-------|-------------------|
| Page structure | Internal link crawl; every page reachable within 3 clicks from home. |
| Schema | Validate every page with Google Rich Results Test. |
| Core Web Vitals | PageSpeed Insights + CrUX; target LCP ≤2.0s, INP ≤200ms, CLS ≤0.1. |
| Accessibility | WCAG 2.2 AA audit; keyboard navigation, color contrast, form labels, heading hierarchy. |
| Booking flow | End-to-end test booking with $0/test transaction; verify confirmation email, CRM entry, nurture sequence. |
| Mobile UX | Test on 5+ devices; sticky CTA, thumb-friendly calendar, Apple Pay/Google Pay. |
| SEO | GSC indexing, sitemap submitted, title/H1/meta unique per page, canonicals correct. |
| Copy/voice | Check against brand writing style guide cliché/superlative/LLM-hedge list. |
| Local SEO | NAP byte-for-byte match across GBP, site, and top 10 directories. |

---

## Related documents

- [[Brand Identity & Writing Style]](../design/brand_identity_writing_style.md)
- [[Visual Identity]](../design/visual_identity.md)
- [[Competitive & Findability Research]](../research/2026-06-17-flight-school-website-competitor-and-findability-research.md)
- [[Online Marketing Research]](../research/2026-06-17-online-marketing-small-business-flight-school.md)
