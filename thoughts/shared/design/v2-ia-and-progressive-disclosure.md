---
date: 2026-07-11
author: Claude Code (design workflow)
repository: hornbill-flying
related_research:
  - thoughts/shared/research/2026-06-17-flight-school-website-competitor-and-findability-research.md
  - thoughts/shared/research/2026-06-18-seo-for-small-businesses.md
  - thoughts/shared/research/2026-07-11-hornbill-aviation-website-visual-style.md
related_design:
  - thoughts/shared/design/visual_identity.md
  - thoughts/shared/design/brand_identity_writing_style.md
  - thoughts/shared/design/archive/2026-06-18-website_layout_design_v1.md
topic: "V2 information architecture, navigation, quick-facts strip, and progressive disclosure rules"
tags: [design, v2, ia, navigation, progressive-disclosure, seo, accessibility, booking]
status: draft
---

> **Launch state — read [`v2-resolutions.md`](./v2-resolutions.md) first.** No per-city landing pages (Sparks, Carson City, Minden, Truckee, South Lake Tahoe) — the single Location/RNO page carries local SEO. Cross-Country Rentals is a standalone product page (confirmed). Booking uses Flight Circle's embeddable widget, not a first-party API. Phone number is TBD; render a "Call us" link to the contact page until assigned.

# Hornbill Aviation V2 — Information Architecture & Progressive Disclosure

A rules document for the LLM redesigning hornbillaviation.com. It specifies the page hierarchy, the persistent quick-facts strip, the progressive disclosure model per page type, the navigation structure, internal linking, breadcrumb wayfinding, the 404 page, and the footer. The story-page and product-page registers are defined at the IA level so layout, sections, and CTA placement follow from page type, not from per-page debate.

## 1. Current State

The live site is a single-page "Coming Soon" BootstrapMade template (verified 2026-07-11). It has no IA: a sticky transparent header with three anchor links (Home, About, Contact), a hero with countdown and newsletter form, an about section, a contact section, and a footer. There is no programs page, no fleet page, no instructors page, no booking flow, no schema, no sitemap, no quick-facts strip.

The archived V1 layout doc (`thoughts/shared/design/archive/2026-06-18-website_layout_design_v1.md`) defined a 23-page static site with clean URLs, individual program pages, individual instructor pages, and a discovery-flight booking page. V1 was never built. V2 starts from that page list, drops what does not serve the V2 vision, and adds the immersive story register, the quick-facts strip, and the source-order progressive disclosure model.

## 2. Desired End State

### 2.1 Page hierarchy and URL structure

Every page on V2 is one of two registers: **story** (immersive narrative) or **product** (focused factual page). The register is part of the page's definition, not a layout decision left to the implementer.

| Page | URL | Register | Primary purpose |
|------|-----|----------|-----------------|
| Home | `/` | Story | Position the school, funnel to discovery flight |
| Discovery Flight | `/discovery-flight/` | Story + booking | #1 conversion page; embeds booking widget |
| Sport Pilot | `/programs/sport-pilot/` | Product | SPL requirements, timeline, cost |
| Private Pilot | `/programs/private-pilot/` | Product | PPL requirements, timeline, cost |
| Instrument Rating | `/programs/instrument-rating/` | Product | IR requirements, timeline, cost |
| Commercial Pilot | `/programs/commercial-pilot/` | Product | CPL pathway |
| CFI | `/programs/certified-flight-instructor/` | Product | CFI training |
| CFII | `/programs/cfii/` | Product | CFII add-on |
| Mountain Flying | `/programs/mountain-flying/` | Product | Regional differentiator |
| Fleet & Pricing | `/fleet/` | Product | Transparent rates, aircraft, membership |
| Membership | `/membership/` | Product | Membership tier and savings math |
| Instructors index | `/instructors/` | Product | Team overview |
| Instructor profile | `/instructors/[slug]/` | Product | Bio, credentials, booking link |
| Cross-Country Rentals | `/cross-country-rentals/` | Product | Real-world flying differentiator |
| About | `/about/` | Product | Founder story, Part 61 philosophy, safety |
| Contact | `/contact/` | Product | NAP, hours, map, form |
| FAQ | `/faq/` | Product | Common questions, FAQPage schema |
| Blog index | `/blog/` | Product | Pillar and cluster content hub |
| Blog post | `/blog/[slug]/` | Product | Individual article, Article schema |
| Location / RNO | `/location/` | Product | Airport, directions, airspace, local SEO |
| Financing | `/financing/` | Product | Payment expectations, partners |
| Privacy Policy | `/privacy/` | Product (legal) | Legal baseline, footer-only |
| Terms of Service | `/terms/` | Product (legal) | Legal baseline, footer-only |
| Cancellation Policy | `/cancellation-policy/` | Product (legal) | Reduces booking anxiety, footer-only |
| Student Resources | `/student-resources/` | Product | Enrolled-student resources + SEO |
| 404 | `/404/` (catch-all) | Product | Helpful dead-end |

**URL rules.** Slug style is lowercase, hyphen-separated, keyword-rich. Preserve every V1 URL that already follows this pattern. No trailing slashes except on the discovery-flight and blog post routes that already used them in V1 — pick one convention and apply it site-wide; the chosen convention is **trailing slash on directory-style routes** (`/programs/private-pilot/`) and **no trailing slash on the root** (`/`). Redirects: add `301` redirects from any V1 URL that changes (none anticipated beyond the index route). Add a `canonical` link to every page.

### 2.2 The persistent quick-facts strip

The quick-facts strip is the single non-negotiable IA element that anchors the V2 progressive disclosure model. It carries the facts a prospective student needs without scrolling through the story, and it carries the primary CTA on every page.

**Contents (exact, in this order, IBM Plex Mono, small-caps):**

1. `PART 61` (badge-style, gold-500 background, blue-900 text)
2. `KRNO` (badge, teal-500 background, white text)
3. `PA28 $159/HR WET` (member rate, links to `/fleet/`)
4. `DISCOVERY $199` (links to `/discovery-flight/`)
5. `1008 GENTRY WAY, RENO NV` (links to `/location/`)
6. `DAILY 8A–5P` (links to `/contact/`)
7. Phone link `tel:+1XXXXXXXXXX` (placeholder until phone TBD is resolved; click-to-call)

The strip never hides a fact behind a tap. All seven facts are visible at once on desktop. On mobile, the strip is horizontally scrollable within the bottom bar; the first four (Part 61, KRNO, PA28 rate, Discovery price) are visible without scrolling, the rest swipe in.

**Desktop placement and scroll behavior.**

The desktop header is a two-row sticky element at the top of the viewport:

- **Row 1 (h-9, always visible):** the quick-facts strip, full width, cream-50 background, ink text, IBM Plex Mono 13px. A thin coral cheatline (h-1) runs along its bottom edge as a brand cue (used here as a divider, not as a throughline symbol).
- **Row 2 (h-16, collapses on scroll-down, expands on scroll-up):** logo (left), primary nav (center), phone link + `Book a discovery flight` button (right). Background cream-50.

Scroll behavior: when the viewport scrolls down past 80px, Row 2 collapses to h-0 with a 200ms transform; Row 1 stays. When the viewport scrolls up any amount, Row 2 expands back. The `Book a discovery flight` button is therefore always reachable: when Row 2 is collapsed, the `DISCOVERY $199` fact in Row 1 links to the booking page; when Row 2 is expanded, the full button is visible. On story pages where the immersive story occupies the full viewport, Row 1 sits on top of the story with a subtle gradient scrim so the strip remains legible over photography.

**Mobile placement and scroll behavior.**

Mobile has two anchored elements:

- **Top sticky bar (h-14):** logo (left), hamburger button (right), `Book` icon button (right, gold-500, always tappable). Background cream-50 with bottom coral cheatline.
- **Bottom fixed bar (h-14, always visible):** horizontally scrollable quick-facts strip (left 70% of bar) + `Book` button (right 30%, gold-500, blue-900 text). The bottom bar never collapses; it carries the primary CTA. Add `env(safe-area-inset-bottom)` padding for notched devices.

The bottom bar does not react to scroll direction. It is always visible. The top bar does not collapse on mobile (it is already minimal).

**Story pages vs. product pages.** The strip is identical on both registers. The only difference is what sits beneath it. On story pages, the immersive story hero is positioned to start below Row 1 (desktop) / below the top bar (mobile), with the story's first frame visible behind Row 1's subtle scrim. On product pages, the page hero band begins below the header. The strip never competes with the story for attention because it is slim, monochrome, and factual; the story carries the emotion.

**Reduced-motion and accessibility.** The strip's collapse/expand animation is a `transform: translateY()` only, 200ms, and is disabled (instant) when `prefers-reduced-motion: reduce`. The strip is a `<nav aria-label="Quick facts">` containing a `<ul>`; each fact is an `<li>` with a link. The badges are `<span>` with `aria-hidden="true"` decorative labels and a visually-hidden full-text alternative.

### 2.3 Progressive disclosure model per page type

| Page type | Above the fold | Revealed on scroll | Behind a tap or accordion |
|-----------|----------------|--------------------|---------------------------|
| Homepage (story) | Hero headline, subhead, primary CTA `Book a discovery flight`, quick-facts strip. WebGL cockpit showpiece begins its pan. | Story beats: program preview, discovery flight teaser, instructor preview, pricing snapshot, social proof, FAQ accordion (collapsed), latest blog teasers. Full `<section aria-label="Site facts">` with NAP, hours, program list, prices, FAQ Q&A pairs in HTML. | FAQ accordion expands on tap. Instructor preview cards link to instructor profile pages. Program cards link to program pages. |
| Discovery Flight (story + booking) | Headline `Book your discovery flight in Reno`, price `$199 / 45–60 min / no deposit`, booking widget (calendar visible), one trust signal (named CFI + certificate number), quick-facts strip. | What happens on a discovery flight (pre-flight, hands-on, debrief), route description, what to bring, FAQ. | Calendar time-slot grid expands on tap. Payment step (Apple Pay / Google Pay) appears after time selection. FAQ accordion expands. |
| Program page (product) | Program name, `What you'll do`, typical hours, cost range, primary CTA `Book a discovery flight` or `Talk to a CFI`, quick-facts strip. | Syllabus stages, prerequisites, what you can do after, mountain/density-altitude considerations for KRNO, program-specific FAQ (collapsed), financing link. | FAQ accordion expands. Financing details link to `/financing/`. `Book with [instructor]` links to instructor profile. |
| Fleet & Pricing (product) | Transparency promise headline, member vs. non-member wet rate, discovery flight price, membership price, primary CTA `Book a discovery flight`. | Per-aircraft cards (tail number, avionics, wet rate), full PPL cost breakdown table, fuel surcharge policy, cross-country rental policy, FAQ. | Full cost breakdown table is visible (not collapsed). Cross-country rental policy expands on tap. FAQ accordion expands. |
| Instructors index (product) | Team overview, E-E-A-T promise (named CFIs with certificate numbers), CTA. | Individual CFI cards (headshot, name, credentials shorthand, specialties, `Book with [Name]`). | CFI cards link to full instructor profile pages. |
| Instructor profile (product) | Headshot, name, credentials block, total hours, specialties, `Book with [Name]` CTA. | Origin story, training journey, personal details, LinkedIn link, CFI certificate number. | Booking widget on this page (deep-linked to this CFI). |
| About (product) | School story headline, founder photo, Part 61 philosophy. | Why RNO, why a uniform fleet, safety record statement. | Nothing significant. |
| Contact (product) | NAP block, hours, map embed, contact form, quick-facts strip. | Directions, parking, what to expect on a first visit. | Form submits to API backend. |
| FAQ (product) | H1 `Questions about learning to fly at RNO`, search input. | FAQ categories, all Q&A pairs in HTML (FAQPage schema). | Each category accordion expands. |
| Blog index (product) | Latest 3 posts, category filter. | Archive list, author bylines. | Filter chips toggle categories. |
| Blog post (product) | H1, author byline (named CFI + credentials + photo), publish date, reading time. | Article body, related posts block, CTA to relevant program. | Nothing. |
| Location (product) | KRNO overview, address, map, airspace diagram. | Directions from Reno/Sparks/Carson City, parking, ramp access. | Nothing. |
| Financing (product) | Payment options, partner logos, expectations. | Cost breakdowns by program, financing FAQ. | Partner details expand. |
| 404 | Headline `Page not found`, search input, top 5 links, quick-facts strip. | Sitemap-style list of all pages. | Search results appear inline. |

### 2.4 SEO content coexists with layered storytelling — source-order principle

The rule: **all facts live in crawlable HTML, in the DOM, before any immersive story container.** Crawlers and screen readers see facts first. Humans see the story first because the story is visually layered on top via CSS positioning.

**Source order, every page:**

1. `<a href="#main" class="skip-link">Skip to content</a>`
2. `<header>` with quick-facts strip and nav
3. `<main id="main">`
4. `<section aria-label="Site facts">` — the full factual content of the page: NAP, hours, program list with prices, FAQ Q&A pairs as `<details>`/`<summary>` or plain `<h3>`+`<p>`, instructor names with credentials. This section is the crawlable substrate. On story pages, it is visually positioned below the story hero (the user scrolls past the story to reach it). On product pages, it IS the main content.
5. The immersive story container (story pages only) — `<section aria-label="Cockpit view" aria-hidden="true">` containing the WebGL canvas and an accessible text alternative describing the scene. Visually positioned to overlay the top of the viewport (`position: fixed` or `absolute` with z-index above the facts section). The `aria-hidden` is removed if the story contains essential information not present in the facts section.
6. Story beats / additional sections
7. `</main>`
8. `<footer>`

**Implementation technique for story pages.** Use CSS grid or `order` to visually reorder without changing DOM order:

```html
<main id="main" class="story-page">
  <section aria-label="Site facts" class="facts">…full crawlable content…</section>
  <section aria-label="Cockpit view" class="story-hero" aria-hidden="true">
    <canvas id="cockpit-webgl"></canvas>
    <p class="visually-hidden">A pannable interior view of the PA28 cockpit from the left seat, looking out over the panel toward the windscreen and the Tahoe horizon.</p>
  </section>
  <section class="story-beats">…</section>
</main>
```

```css
.story-page { display: grid; }
.story-hero { position: fixed; inset: 0; z-index: 1; }
.facts { position: relative; z-index: 2; background: var(--color-bg); margin-top: 100vh; }
.story-beats { position: relative; z-index: 2; background: var(--color-bg); }
```

The facts section is pushed down by `100vh` (one viewport height) so the story hero occupies the first viewport. Once the user scrolls past the story, the facts section rises into view. Crawlers traverse facts first because they are first in the DOM.

**Product pages** do not use this layering. The facts section is the main content in normal flow; the page hero is a standard image band, not an immersive overlay.

**FAQ Q&A pairs** are always in the DOM as full `<h3>` question + `<p>` answer pairs (or `<details>`/`<summary>`), never loaded on tap from JSON. The accordion visual collapse is CSS-only (`<details>` element or `max-height` transition); the content is present in HTML at first paint for crawlers.

### 2.5 Navigation structure

**Desktop primary nav (Row 2 center):** Discovery Flight, Programs (dropdown), Fleet & Pricing, Instructors, About, Blog, Contact. Plus a phone link and `Book a discovery flight` button on the right.

**Programs dropdown** is a hover/focus disclosure: a button with `aria-haspopup="menu"` and `aria-expanded`, revealing a list of all seven program pages. Keyboard-navigable: arrow keys move within the menu, Escape closes, Enter activates.

**Mobile menu — disclosure pattern.** The hamburger button at top-right uses the standard disclosure pattern:

```html
<button aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu" id="menu-toggle">…</button>
<aside id="mobile-menu" hidden>
  …nav + quick facts + CTA…
</aside>
```

Behavior: tap toggle `aria-expanded` and the `hidden` attribute. When open, the menu is a full-screen overlay (`position: fixed; inset: 0`), focus moves to the first menu item, focus is trapped within the menu, Escape closes it and returns focus to the toggle. The menu contains: a `Book a discovery flight` button at top, the seven nav links, a `Programs` subgroup with its own disclosure button (`aria-expanded`) that expands the program sub-list inline, a quick-facts block (NAP, hours, phone), and a close button.

**Primary vs. secondary nav.**

| Tier | Items |
|------|-------|
| Primary (desktop nav, mobile menu top) | Discovery Flight, Programs, Fleet & Pricing, Instructors, About, Blog, Contact |
| Secondary (footer only) | FAQ, Location, Financing, Cross-Country Rentals, Membership, Student Resources |
| Buried (reachable via index pages) | Individual program pages (via Programs dropdown), individual instructor profiles (via Instructors index), individual blog posts (via Blog index), Privacy, Terms, Cancellation Policy |

### 2.6 Internal linking rules

- 3–5 contextual links per page, in body copy, with descriptive anchor text. Never "click here" or "learn more."
- Cross-link story ↔ product: the homepage story links to `/programs/private-pilot/`, `/fleet/`, `/instructors/`, and `/discovery-flight/`. The discovery flight story links to `/fleet/` (the aircraft you'll fly) and `/instructors/` (the CFI you'll fly with). Each program page links to `/discovery-flight/`, `/fleet/`, and one or two related program pages (e.g., PPL → IR, IR → CPL, CFI → CFII). Each instructor profile links to the programs that instructor teaches.
- Every page has a `Related` block at the bottom with three links chosen by page type (program pages link to two sibling programs + Fleet & Pricing; blog posts link to the relevant program + Fleet & Pricing + one sibling post).
- Footer cross-links to all primary and secondary nav items.
- Anchor text rule: the anchor text describes the destination. `See the PA28 fleet and wet rates` not `our fleet`. `Book a discovery flight` not `get started`.

### 2.7 Story-page vs. product-page register split at the IA level

| Dimension | Story page | Product page |
|-----------|------------|--------------|
| Hero | Full-bleed immersive, scroll-driven, WebGL on homepage only | Standard image band, title, subhead, CTA |
| Sections | Narrative beats, one per scroll, minimal chrome | Cards, tables, accordions, multiple sections |
| CTAs | One primary CTA repeated at story beats | Primary CTA + secondary CTAs (e.g., `Talk to a CFI`, `See the fleet`) |
| Facts section | Below the fold, source-order first, visually revealed after story | In normal flow, above the fold, primary content |
| Narrative arc | Yes — hero → beats → reveal → CTA | No — factual, scannable, modular |
| Breadcrumbs | Hidden (homepage) or minimal (`Home > Discovery Flight`) | Visible (`Home > Programs > Private Pilot`) |
| Animation | Scroll-driven GPU transforms, WebGL, parallax | Subtle hover transitions, accordion expand, no parallax |

### 2.8 Booking flow reachability — under 3 clicks from any page

The booking widget lives on `/discovery-flight/` and is above the fold. "Clicks" here means navigation clicks; form-field interactions (date pick, time pick, payment) are not counted.

| Starting page | Click path to booking widget | Clicks |
|--------------|--------------------------------|--------|
| Homepage | `Book a discovery flight` CTA → `/discovery-flight/` (widget visible) | 1 |
| Any program page | Program CTA `Book a discovery flight` → `/discovery-flight/` (widget visible) | 1 |
| Fleet & Pricing | `Book a discovery flight` button → `/discovery-flight/` | 1 |
| Instructor profile | `Book with [Name]` → `/discovery-flight/?instructor=[slug]` (widget pre-filled) | 1 |
| Blog post | End-of-post CTA → `/discovery-flight/` | 1 |
| Any page (mobile) | Bottom-bar `Book` button → `/discovery-flight/` | 1 |
| Any page (desktop, scrolled) | Quick-facts `DISCOVERY $199` link → `/discovery-flight/` | 1 |
| 404 page | `Book a discovery flight` button → `/discovery-flight/` | 1 |

Maximum: 1 navigation click to reach the booking widget from any page. The booking flow itself (date → time → name/email → Apple Pay → confirm) is a 4-step form with Apple Pay / Google Pay shortcuts that complete in under 60 seconds on mobile.

### 2.9 Breadcrumb and wayfinding rules

- `BreadcrumbList` JSON-LD schema on every interior page. The homepage has no breadcrumb.
- Visible breadcrumb trail at the top of content on product pages: `Home > Programs > Private Pilot`. Each crumb is a link except the current page. Separators are `/` in ink-light, IBM Plex Mono.
- Story pages: no visible breadcrumb (homepage), or minimal `Home > Discovery Flight` (discovery flight).
- Schema example:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://hornbillaviation.com/"},
    {"@type": "ListItem", "position": 2, "name": "Programs", "item": "https://hornbillaviation.com/programs/"},
    {"@type": "ListItem", "position": 3, "name": "Private Pilot", "item": "https://hornbillaviation.com/programs/private-pilot/"}
  ]
}
```

### 2.10 The 404 page

- H1: `Page not found`
- Subhead (grounded voice): `That route doesn't exist on the ground or in the air. Let's get you back to the runway.`
- Site search input (label `Search hornbillaviation.com`, searches page titles + FAQ + blog)
- Top 5 links: Discovery Flight, Private Pilot, Fleet & Pricing, Instructors, Contact
- Full sitemap-style list below: every primary and secondary nav item
- Quick-facts strip visible (header + mobile bottom bar still render)
- `Book a discovery flight` button
- HTTP status: 404 (not 200). Served as a static page from the Next.js custom 404.

### 2.11 The footer

Four-column layout on desktop, stacked on mobile:

| Column | Contents |
|--------|----------|
| Brand | Logo, tagline `Built around how you learn best.`, full NAP (1008 Gentry Way, Reno, NV 89512; office@hornbillaviation.com; phone), social links |
| Programs | Links to all seven program pages + Discovery Flight |
| Resources | FAQ, Blog, Cross-Country Rentals, Financing, Membership, Student Resources, Location |
| Legal + CTA | Privacy, Terms, Cancellation Policy, `Book a discovery flight` button, copyright line |

The footer reinforces NAP consistency: the NAP block in the footer is byte-identical to the NAP in the quick-facts strip, the Contact page, the LocalBusiness schema, and the Google Business Profile. Any change to NAP is made in all five places in the same release.

## 3. Existing Patterns

Patterns from V1, the brand docs, or the live site worth preserving:

- **Clean keyword-rich URLs** from the V1 layout doc (`/programs/private-pilot/`, `/instructors/[slug]/`). Preserve as-is.
- **Individual program pages** (not a shared Courses page). V1 established this; V2 keeps it. The competitor research shows a shared Courses page is a documented conversion killer.
- **Individual instructor profile pages** with named CFIs and certificate numbers. The single biggest E-E-A-T advantage over both named competitors.
- **Transparent pricing** (member and non-member wet rates, discovery flight price, membership price) on the Fleet & Pricing page. V1 spec; V2 keeps.
- **NAP consistency** across quick-facts strip, Contact page, footer, LocalBusiness schema, GBP. Lock in a single source of truth.
- **LocalBusiness + EducationalOrganization + Service + FAQPage + BreadcrumbList + Article schema.** V1 spec; V2 keeps and extends.
- **Discovery flight as the #1 conversion page** with visible pricing and embedded booking widget. V1 spec; V2 keeps.
- **Brand voice two-register split** (grounded for facts, poetic for story moments) from the brand docs. The IA register split (story vs. product) maps to the voice register split: story pages use poetic voice in story beats and grounded voice in the facts section; product pages use grounded voice throughout.
- **Color and typography tokens** from `visual_identity.md`. The quick-facts strip uses cream-50 background, ink text, IBM Plex Mono labels, gold-500 and teal-500 badges, coral cheatline divider.
- **Retro header/footer treatment** from `visual_identity.md` decision log: cream-50 header, all-caps Nunito Sans 900 wordmark, coral cheatline along the bottom edge.

## 4. New Patterns

New patterns required for V2, with examples.

### 4.1 The quick-facts strip as an IA primitive

The strip is not a design element; it is an IA primitive. It is the always-reachable layer of facts that lets the immersive story exist without burying SEO content. Implementation:

- One React component `<QuickFactsStrip />` rendered in the header on every page. Props: `{ variant: 'desktop-ribbon' | 'mobile-bottom' }`.
- Data source: a single `siteFacts` object in `src/content/siteFacts.ts` containing `part`, `airport`, `memberRate`, `discoveryPrice`, `address`, `hours`, `phone`. Every fact in the strip pulls from this object. The Contact page, footer, and LocalBusiness schema also pull from it. One source of truth.

### 4.2 Source-order progressive disclosure

See section 2.4. The pattern is new: facts first in the DOM, story layered on top via CSS positioning. This is the V2 answer to "how do SEO and immersive storytelling coexist." The implementation is a CSS grid or `order`-based visual reorder with no DOM reorder.

### 4.3 Story-page vs. product-page register as an IA type

Each page declares its register in frontmatter or route metadata. The register determines: hero treatment, section chrome, CTA pattern, breadcrumb visibility, animation budget. This prevents the implementer from choosing a layout per page; the layout follows from the register.

```ts
type PageRegister = 'story' | 'product';
// In each page route:
export const register: PageRegister = 'story'; // homepage, discovery-flight
// or 'product' for everything else
```

### 4.4 Disclosure-pattern mobile menu

Standard ARIA disclosure pattern (section 2.5). Not a hamburger that slides a drawer; a toggle button with `aria-expanded` and `aria-controls` that shows/hides a full-screen overlay with focus trap. The Programs subgroup inside the menu is itself a disclosure button with its own `aria-expanded`.

### 4.5 Booking-widget deep-linking

The booking widget on `/discovery-flight/` accepts query params: `?instructor=[slug]`, `?type=gift`, `?program=[slug]`. Instructor profile pages link to `/discovery-flight/?instructor=[slug]` and the widget pre-selects that CFI. Program pages link to `/discovery-flight/?program=[slug]` and the widget pre-fills the "what's your goal" field. This makes the booking flow personalized in 1 click from any product page.

### 4.6 Related-content block

Every page ends with a `Related` block of three links, chosen by page type. This is a new IA element that guarantees 3–5 contextual internal links per page without relying on the implementer to add them per page. The block is data-driven: a `relatedLinks` map keyed by page type.

## 5. Resolved Design Decisions

| Decision | Value | Rationale |
|----------|-------|-----------|
| Two registers at the IA level | Story and product | Maps to the voice two-register split; lets the immersive story exist on two pages without forcing every page into the story mold |
| Quick-facts strip is always visible, never collapses | Desktop Row 1 + mobile bottom bar | Facts must be reachable without scrolling through the story (design decision 6); the strip is the implementation |
| Desktop Row 2 (nav) collapses on scroll-down, expands on scroll-up | Transform-based, 200ms | Maximizes story viewport on story pages while keeping nav accessible; preserves the `Book` CTA via Row 1's `DISCOVERY $199` link |
| Mobile bottom bar never collapses | Always visible | Carries the primary `Book` CTA; 65%+ of discovery bookings are mobile; the CTA must be 1 tap away |
| Source order: facts first, story layered on top | CSS grid/`order`, no DOM reorder | Crawlers and screen readers see facts first; humans see the story first (design decision 6) |
| Booking widget on `/discovery-flight/` only, deep-linkable | One widget, query-param personalization | Single conversion surface; 1 click from any page; preserves the #1 conversion page role |
| Individual program and instructor pages | Preserve from V1 | Conversion and E-E-A-T advantage over competitors |
| Breadcrumbs hidden on story pages, visible on product pages | Register-driven | Story pages prioritize immersion; product pages prioritize wayfinding |
| NAP single source of truth | `siteFacts.ts` object | Prevents the NAP inconsistency that plagues both named competitors |
| 404 returns HTTP 404 with helpful content | Next.js custom 404 | SEO-correct; user-friendly |
| Programs dropdown on desktop, disclosure subgroup on mobile | ARIA `aria-haspopup` / `aria-expanded` | Standard accessible disclosure pattern; keyboard-navigable |

## 6. Open Questions

1. **Phone number.** The brand docs list phone as TBD. The quick-facts strip, footer, Contact page, and LocalBusiness schema all need a phone value. Resolve before launch; the `siteFacts.ts` object makes the change single-point.
2. **Trailing-slash convention.** This doc specifies trailing slash on directory-style routes. Confirm the Next.js static export is configured to serve `/programs/private-pilot/` (with slash) and redirect `/programs/private-pilot` (no slash) to it, or vice versa. Pick one and enforce site-wide.
3. **Site search on 404.** The 404 page spec includes a search input. Confirm whether the static export includes a client-side search index (e.g., Pagefind, FlexSearch) or whether search is out of scope for V2 launch. If out of scope, replace the search input with a larger sitemap list.
4. **Booking widget vendor.** The widget is specified as a client-side component hitting a custom API backend (design decision 10). Confirm whether the custom backend will support deep-link params (`?instructor=`, `?type=gift`, `?program=`) or whether the widget reads params client-side only.
5. **Blog cadence and authorship.** Each blog post needs a named CFI author with credentials for E-E-A-T. Confirm which CFIs will author posts and at what cadence (research recommends 1–2 posts/month, consistent for 12+ months).
6. **Instructor count at launch.** The V1 doc assumed 4 CFIs. Confirm the launch count; the Instructors index and profile pages are built per CFI.
7. **Location page vs. Contact page.** V2 spec keeps both `/location/` and `/contact/`. Confirm both are needed or merge into one. If merged, redirect `/location/` to `/contact/` with a 301.
8. **Cross-Country Rentals as a standalone page.** Confirm whether this is a separate product page or a section within Fleet & Pricing. The competitor research treats cross-country as a differentiator worth its own page; this doc keeps it separate.

## 7. Multilayer Validation Requirements

Validation happens at every layer. Each check is concrete and runnable.

### DOM / HTML layer

- **Source-order check:** for every story page, run a headless crawl (e.g., `curl` + `grep`) and assert that the `<section aria-label="Site facts">` appears before the `<section aria-label="Cockpit view">` in the raw HTML. Crawl the page with JavaScript disabled; the facts must be present.
- **Quick-facts strip presence:** every page HTML contains `<nav aria-label="Quick facts">` with all seven facts as `<li>` items. Assert in a unit test.
- **Semantic structure:** every page has exactly one `<h1>`, a `<main id="main">`, a `<header>`, a `<footer>`, and a skip link as the first focusable element. Run with an HTML validator (e.g., `html-validator-node`).
- **NAP consistency:** the NAP string in the quick-facts strip, footer, Contact page, and LocalBusiness JSON-LD are byte-identical. Assert in a test that reads all four sources from `siteFacts.ts` and the rendered pages.

### Schema layer

- **BreadcrumbList** on every interior page; validate with Google's Rich Results Test.
- **LocalBusiness** on homepage with full NAP, geo, hours, `sameAs`.
- **Service** on every program page; **FAQPage** on FAQ, homepage, discovery flight, and every program page; **Article** on every blog post with named author.
- Run the Rich Results Test on every page before deploy; fail the build on errors.

### Accessibility layer

- **Disclosure pattern:** the mobile menu toggle has `aria-expanded` toggling between `true`/`false`, `aria-controls` matching the menu id, and the menu has `hidden` toggling. Keyboard test: Tab to toggle, Enter to open, focus moves into menu, Tab cycles within menu, Escape closes and returns focus to toggle.
- **Focus trap:** when the mobile menu is open, Tab does not leave the menu. Test with a Playwright script.
- **Reduced motion:** with `prefers-reduced-motion: reduce`, the desktop Row 2 collapse/expand is instant (no transform animation). Test by setting the media query and asserting no transition.
- **Screen reader:** the quick-facts strip announces as `Quick facts navigation` with seven items. The WebGL hero announces the accessible text alternative. The facts section is reachable before the story in reading order. Test with NVDA or VoiceOver.
- **Color contrast:** quick-facts strip text (ink on cream-50) passes WCAG AA at 4.5:1. Badges (gold-500 background with blue-900 text, teal-500 background with white text) pass AA for large text and UI components. Assert with axe-core.

### Performance layer

- **LCP ≤ 2.0s** on homepage and discovery flight (field data via CrUX; lab data via Lighthouse). The LCP element on story pages is the story hero's text, not the WebGL canvas (canvas is not the LCP element because it's `aria-hidden` and below the text in paint order). The facts section is not the LCP element because it's `margin-top: 100vh`.
- **INP ≤ 200ms:** the booking widget, mobile menu toggle, and FAQ accordions respond in under 200ms. The WebGL canvas does not block main-thread input; it runs in a Web Worker or uses `requestAnimationFrame` without long tasks.
- **CLS ≤ 0.1:** all images have explicit `width`/`height`; the quick-facts strip has a fixed height (h-9 desktop, h-14 mobile); the desktop Row 2 collapse uses `transform` (not height changes) so it does not cause CLS.
- **WebGL fallback:** on devices that fail WebGL context creation or that report low GPU confidence, the hero renders a static AVIF image of the cockpit interior instead of the canvas. Detect with a `try/canvas.getContext('webgl')` check at runtime. The fallback image is lazy-loaded with `fetchpriority="high"` only when the fallback activates.
- **Mobile page weight:** homepage initial JS bundle under 150KB gzipped excluding the WebGL code, which is code-split and loaded only on the homepage. Discovery flight page under 100KB gzipped excluding the booking widget, which is also code-split.

### SEO / AEO layer

- **Crawl with JS disabled:** `curl` the homepage; assert the facts section, NAP, program list with prices, FAQ Q&A pairs, and instructor names are all in the raw HTML. This is the single most important SEO validation for the source-order pattern.
- **Sitemap:** `sitemap.xml` lists every URL in section 2.1; submit via Search Console.
- **Robots.txt:** allows OAI-SearchBot, Claude-SearchBot, PerplexityBot, Google-Extended (do not block AI crawlers; design decision 6 + research finding that blocking excludes you from AI Overviews).
- **Internal links:** every page has 3–5 contextual links with descriptive anchor text. Assert with a script that greps for `click here` and `learn more` (must be zero).
- **Booking reachability:** a Playwright script navigates from each primary nav page to the booking widget in 1 click; assert the widget is visible above the fold on `/discovery-flight/`.

### Booking flow layer

- **Click count:** from every page in section 2.1, the booking widget is reachable in 1 navigation click. Assert with a Playwright script that runs through every page.
- **Mobile booking time:** on a mid-range mobile (e.g., Pixel 5), the booking flow from landing on `/discovery-flight/` to confirmation completes in under 60 seconds with Apple Pay. Assert with a Playwright trace.
- **Deep-link params:** `/discovery-flight/?instructor=[slug]` pre-selects the CFI; `?type=gift` switches the widget to gift mode; `?program=[slug]` pre-fills the goal field. Assert with Playwright.