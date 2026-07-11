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
topic: "V2 accessibility and SEO — WCAG 2.2 AA, AEO, schema, E-E-A-T, Core Web Vitals as an accessibility issue"
tags: [design, v2, accessibility, seo, aeo, schema, eeat, wcag, web-vitals]
status: draft
---

> **Launch state — read [`v2-resolutions.md`](./v2-resolutions.md) first.** AggregateRating is omitted at launch (reviews suppressed — owner flips a toggle when ready). Phone number is TBD; the LocalBusiness schema renders with `telephone` empty until assigned. 3 instructors at launch (Trygve, Joel, Ethan); do not publish CFI certificate numbers without written consent. No per-city landing pages. Blog has existing posts at launch.

# V2 Accessibility & SEO — Hornbill Aviation

This is the source of truth for any LLM implementing pages, components, schema, or copy on V2 hornbillaviation.com. Rules are unambiguous; where a rule depends on copy, the exact text is given.

Accessibility and SEO are one concern here. Both ask the same question: can a crawler, a screen reader, a keyboard, or a person on a slow phone get to the facts without friction? The immersive narrative layers on top of a crawlable, semantic, fast foundation. The foundation ships first.

---

## 1. Current State

The live V1 site (audited in `2026-07-11-hornbill-aviation-website-visual-style.md`) is a single temporary "Coming Soon" page. Accessibility and SEO posture is minimal:

- One `<h1 class="sitename">Coming Soon...</h1>` inside the logo link — a logo-as-heading anti-pattern that dilutes the H1 with non-descriptive text.
- No `LocalBusiness`, `EducationalOrganization`, `FAQPage`, `Service`, or `BreadcrumbList` schema; no meta description; no OG tags; no canonical.
- Single background image with no `alt` and no explicit dimensions (CLS risk).
- No skip link; no focus-visible styles; no `prefers-reduced-motion` handling; no robots.txt or sitemap.xml.

V2 starts from a clean foundation. Do not inherit V1 patterns unless restated below.

---

## 2. Desired End State

A V2 visitor — human, crawler, or answer engine — reaches the facts (price, phone, address, hours, Part 61, RNO, programs, CFI names) without scrolling through the story. The immersive narrative (cinematic scroll, WebGL cockpit showpiece on homepage only) layers on top. Accessibility and SEO are the foundation the story stands on.

- **Every page passes WCAG 2.2 AA** (axe DevTools + Lighthouse a11y + manual keyboard/screen-reader pass). Target AAA contrast where the palette allows.
- **Every page is fully crawlable and answer-engine-citable.** SEO content lives in the HTML, not JS-injected. A persistent quick-facts strip (price, phone, address, hours, Part 61, RNO) is in the DOM at first paint, visually anchored, reachable without scrolling.
- **Every page has correct schema**, validated by Google's Rich Results Test.
- **Core Web Vitals are met as an accessibility outcome**: LCP ≤ 2.0s, INP ≤ 200ms, CLS ≤ 0.1 (CrUX field data). Slow sites exclude users on low-end devices and slow connections — an accessibility failure, not a performance nit.
- **Reduced-motion users get a static, fully-usable site.** No parallax, no auto-scroll, no infinite loops in reduced mode. The WebGL cockpit shows a static hero image.
- **WebGL cockpit is operable by keyboard** (arrow keys pan/tilt, pause, reset) and described for screen readers.

---

## 3. Existing Patterns (preserve or extend)

| Pattern | Source | Preserve / extend |
|---|---|---|
| `ink` body text on `cream-50`/`cream-25`/`white` | `visual_identity.md` §3 | Preserve — passes AA at 4.5:1. Default body-text pairing. |
| `gold-500` on `blue-900` passes AA for large text + UI | `visual_identity.md` §3 | Preserve for large headings and UI on dark. Not for body text. |
| `gold-500` on `cream-50`/`white` does not pass AA for normal text | `visual_identity.md` §3 | Preserve the restriction. `gold-500` is icons/borders/large buttons with dark text only on light surfaces. |
| `coral` on `white` passes AA for large text only | `visual_identity.md` §3 | Preserve. Buttons/short labels, not paragraphs. |
| CTA buttons begin with a verb; link text describes destination | `brand_identity_writing_style.md` §8 | Preserve. This is both a writing rule and an accessibility rule (no "click here"). |
| Sentence-case headings; one idea per sentence; short sentences | `brand_identity_writing_style.md` §8 | Preserve. Plain language is an accessibility requirement. |
| Named CFIs with real credentials | research `2026-06-17-...` | Extend into E-E-A-T system: per-CFI author pages with LinkedIn links and certificate numbers (with consent). |
| NAP: 1008 Gentry Way, Reno, NV 89512; office@hornbillaviation.com; phone TBD | brand facts | Preserve byte-for-byte across every surface. Phone is TBD; until confirmed, render no phone anywhere. |

---

## 4. New Patterns

### 4.1 Semantic HTML — required structure per page

Every page uses this landmark skeleton. Do not add `role` to native elements (no `role="main"` on `<main>`, no `role="navigation"` on `<nav>`).

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>…</title>
    <meta name="description" content="…" />
    <link rel="canonical" href="https://hornbillaviation.com/…" />
    <meta property="og:title" content="…" />
    <meta property="og:description" content="…" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://hornbillaviation.com/og/…avif" />
    <meta name="theme-color" content="#004E7C" />
    <!-- JSON-LD blocks, one per schema type -->
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <header>… site header, nav …</header>
    <aside class="quick-facts" aria-label="Quick facts">…</aside>
    <main id="main">
      <article>… page content, one <h1> …</article>
    </main>
    <footer>… NAP, hours, links …</footer>
  </body>
</html>
```

- One `<h1>` per page, stating the primary keyword phrase and reading naturally (e.g., `<h1>Part 61 Flight Training in Reno, NV</h1>` on homepage). Do not put the school name in the H1 except on the homepage.
- Heading hierarchy: never skip levels. `<h2>` for sections, `<h3>` for subsections. No `<h4>` for visual styling — use the correct type style instead.
- Lists are `<ul>`/`<ol>`, not `<div>` + bullet characters.
- Buttons vs links: a `<button>` triggers an in-page action (open menu, submit form, expand accordion, pause WebGL). An `<a>` navigates to a URL. Never use `<a>` with `onclick` for an action; never use `<div>` with `onclick` for either.
- `<nav>` wraps primary and footer navigation. Each `<nav>` gets `aria-label` if more than one nav exists on the page (`aria-label="Primary"`, `aria-label="Footer"`).
- The quick-facts strip is `<aside aria-label="Quick facts">` — a complement to `<main>`, not a child of it. In the DOM at first paint so crawlers and screen readers reach the facts before the story.

### 4.2 ARIA — where to use it, where not

Use ARIA only when a native element cannot do the job.

| Component | Pattern |
|---|---|
| Mobile menu toggle | `<button aria-expanded="false" aria-controls="mobile-nav">Menu</button>` paired with `<nav id="mobile-nav">`. Toggle `aria-expanded` on open/close. |
| FAQ accordion | `<h3>` containing `<button aria-expanded="false" aria-controls="faq-1">`, paired with `<div id="faq-1" role="region" aria-labelledby="faq-1-button" hidden>`. Use `hidden` to remove collapsed content from the a11y tree. |
| Booking modal | `role="dialog" aria-modal="true" aria-labelledby="booking-title"`. Focus trap inside; focus returns to the trigger button on close. |
| WebGL cockpit | `role="img" aria-label="…"` with the full scene description as the accessible name (see §4.5). Canvas wrapped in `<figure>`; controls are real `<button>`s outside the canvas. |
| Live form errors | `aria-live="polite"` on the error summary. `aria-invalid="true"` on the invalid field. Error message linked via `aria-describedby`. |
| Success banner | `role="status"` (implicit `aria-live="polite"`) on the success message container. |
| Active nav item | `aria-current="page"` on the link to the current page. |

Do NOT add ARIA to native-semantic elements: `<button>`, `<a>`, `<nav>`, `<main>`, `<header>`, `<footer>`, `<h1>`–`<h6>`, `<ul>`/`<ol>`/`<li>`, `<figure>`, `<figcaption>`, `<table>`/`<th>`/`<td>`. Adding `role="button"` to a `<div>` is always worse than using a `<button>`.

### 4.3 Keyboard navigation

Every interactive element is operable by keyboard, in logical order, with a visible focus indicator.

- **Focus ring:** `:focus-visible` outline is `3px solid #F8AF12` (gold-500) with `outline-offset: 2px`. Never `outline: none` without a replacement. On photo overlays where gold is too low-contrast, fall back to `3px solid #FFFFFF` with a `1px #004E7C` offset ring.
- **Tab order:** DOM order equals tab order. Never `tabindex` > 0. `tabindex="-1"` only for programmatic focus (e.g., the dialog container on open).
- **Skip link:** first focusable element on every page. Visually hidden until `:focus`. Targets `#main`.
- **Mobile nav:** opens on a `<button>`. Focus moves into the menu. Tab trapped while open. Esc closes and returns focus to the toggle. `aria-expanded` reflects state.
- **Booking modal:** focus moves to the modal title on open. Tab trapped. Esc closes and returns focus to the booking CTA. If booking succeeds and the modal closes, move focus to the success banner.
- **FAQ accordion:** Tab moves between accordion `<button>`s. Enter/Space toggles. No focus trap; Tab continues past naturally.
- **WebGL cockpit (see §4.5):** canvas is not in tab order. A toolbar of real `<button>`s (Pan left/right, Tilt up/down, Pause, Reset) is in tab order. Arrow keys also pan/tilt when the cockpit `<figure>` has focus (`tabindex="0"` on the figure, not the canvas).
- **Calendar widget:** a real `<table>` with `<th scope="col">` day headers and `<td>` cells containing `<button>`s for selectable dates. Arrow keys move between date buttons; Enter/Space selects. Disabled dates get `aria-disabled="true"` and `tabindex="-1"`. Prev/next month are `<button aria-label="Previous month">` / `aria-label="Next month"`.

### 4.4 Color contrast — V2 immersive palette verification

Body text 4.5:1 minimum; large text (≥18pt regular or ≥14pt bold) and UI component boundaries 3:1 minimum.

| Foreground | Background | Ratio | Use | Verdict |
|---|---|---|---|---|
| `ink` #2E2717 | `cream-50` #FFF8EC | 13.4:1 | Body text | Pass (AA + AAA) |
| `ink` #2E2717 | `cream-25` #FFFDF6 | 13.5:1 | Body text in cards | Pass (AA + AAA) |
| `ink` #2E2717 | `white` #FFFFFF | 13.6:1 | Body text on contrast surfaces | Pass (AA + AAA) |
| `blue-900` #004E7C | `cream-50` #FFF8EC | 6.9:1 | Headings on light | Pass (AA + AAA) |
| `gold-500` #F8AF12 | `blue-900` #004E7C | 5.2:1 | Large headings/UI on dark | Pass (AA large, AA UI) |
| `gold-500` #F8AF12 | `cream-50` #FFF8EC | 1.6:1 | Body text on cream | **Fail — icons/borders only.** |
| `gold-500` #F8AF12 | `white` #FFFFFF | 1.7:1 | Body text on white | **Fail — icons/borders only.** |
| `blue-900` #004E7C | `gold-500` #F8AF12 | 5.2:1 | Text on gold buttons | Pass (AA large; button labels ≥14pt bold only) |
| `cream-50` #FFF8EC | `blue-900` #004E7C | 6.9:1 | Text on dark sections | Pass (AA + AAA) |
| `coral` #F45115 | `white` #FFFFFF | 3.3:1 | Short labels on white | AA large only — not for body |
| `coral` #F45115 | `cream-50` #FFF8EC | 3.2:1 | Short labels on cream | AA large only — not for body |
| `teal-500` #007C80 | `white` #FFFFFF | 4.6:1 | Success text on white | Pass (AA + AAA) |
| `ink-light` #827D74 | `cream-50` #FFF8EC | 3.0:1 | Secondary text/captions | **AA large only.** For secondary body text, use `ink` at min opacity 0.7 (ratio 9.4:1). |

**Photo-overlay text rule:** text over a photograph (hero, page headers, scroll beats) sits on a `bg-hero-scrim` or `bg-pageheader-scrim` gradient overlay. Verify the text color (always `cream-50` or `white` on photo overlays) passes 4.5:1 against the *darkest pixel of the underlying image at the text's position*. Failure mode: bright sky under light text drops below 4.5:1. Mitigation: increase scrim opacity at the text band until it passes; never tint the text instead. If a photo is swapped, re-run the check.

**White-on-graded-photo focus ring:** if a focus ring lands on a photo overlay, use `3px solid #FFFFFF` with `outline-offset: 2px` and a `1px #004E7C` secondary ring.

### 4.5 WebGL cockpit — accessibility

The homepage-only WebGL cockpit must be operable by keyboard and described for screen readers. No strobing, no rapid motion.

**Scene description (render verbatim as the `aria-label` on the cockpit `<figure>`):**

> A view from the left seat of a Piper PA28 cockpit at Reno–Tahoe International Airport. The instrument panel stretches across the foreground: a Garmin G5 flight display and a GPS navigator on the left, the six-pack of round gauges in the center, throttle and mixture knobs on the lower right. The yoke sits in front of you. Through the windscreen, the ramp and runway run out toward the Sierra Nevada, where the peaks rise above Lake Tahoe under golden-hour light.

**Structure:**

```html
<figure class="cockpit" tabindex="0" role="img" aria-label="A view from the left seat of a Piper PA28 cockpit at Reno–Tahoe International Airport. The instrument panel stretches across the foreground: a Garmin G5 flight display and a GPS navigator on the left, the six-pack of round gauges in the center, throttle and mixture knobs on the lower right. The yoke sits in front of you. Through the windscreen, the ramp and runway run out toward the Sierra Nevada, where the peaks rise above Lake Tahoe under golden-hour light.">
  <canvas aria-hidden="true"></canvas>
  <div class="cockpit-controls">
    <button type="button" data-cockpit="pan-left" aria-label="Pan view left">Pan left</button>
    <button type="button" data-cockpit="pan-right" aria-label="Pan view right">Pan right</button>
    <button type="button" data-cockpit="tilt-up" aria-label="Tilt view up">Tilt up</button>
    <button type="button" data-cockpit="tilt-down" aria-label="Tilt view down">Tilt down</button>
    <button type="button" data-cockpit="pause" aria-label="Pause cockpit motion">Pause</button>
    <button type="button" data-cockpit="reset" aria-label="Reset cockpit view">Reset view</button>
  </div>
  <figcaption>PA28 cockpit, left seat. Use arrow keys to pan and tilt; the Pause button stops scroll-driven motion.</figcaption>
</figure>
```

**Keyboard behavior:**

- The `<figure>` has `tabindex="0"`. When focused, ArrowLeft/ArrowRight pan; ArrowUp/ArrowDown tilt. Each press moves the camera a fixed step (5°); holding repeats at the OS rate.
- The controls toolbar of real `<button>`s is also in the tab order, immediately after the figure, so a keyboard user who does not discover arrow-key support can still pan/tilt via buttons.
- The Pause button toggles scroll-driven motion; `aria-pressed` reflects state.
- No motion faster than 2° of camera change per 100ms. No strobing (no alternating high-contrast frames faster than 3Hz). No infinite auto-rotation.

**Reduced motion / low-power fallback:** when `prefers-reduced-motion: reduce` is active, or when WebGL is unsupported (feature-detect), the canvas does not initialize. The `<figure>` instead renders a static hero image (`/images/cockpit-hero-left-seat.avif`) with the same `aria-label`. The controls toolbar is removed from the DOM. The `figcaption` is unchanged. No degraded "your device is too slow" dead end.

### 4.6 Reduced-motion — global behavior

Every motion pattern has a reduced equivalent.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

In JS: disable Framer Motion scroll-driven animations (replace with instant state changes); disable WebGL cockpit (§4.5). No parallax, no auto-scroll (`scrollIntoView` uses `behavior: 'auto'`), no infinite loops (no auto-rotating testimonials, no marquee, no infinite logo strip).

Reduced motion is not "less polish" — it is a fully usable site. Test by enabling "Reduce motion" in macOS System Settings → Accessibility → Display, then walking every page.

### 4.7 Image accessibility

- Every `<img>` has `alt`. Decorative images use `alt=""` (empty, not omitted). Informative images have descriptive alt including aircraft/location naturally, max 125 chars. Patterns:
  - `alt="N6576J, a Piper PA28-180, parked on the KRNO ramp at golden hour with the Sierra Nevada behind the tail"`
  - `alt="Instrument panel of N7824W showing dual Garmin G5 flight displays and a WAAS GPS navigator"`
  - `alt="A student and instructor doing a preflight walkaround of a PA28 on the Reno–Tahoe ramp"`
  - `alt=""` on decorative sectional-chart texture backgrounds.
- Every `<img>` has explicit `width` and `height` (or `aspect-ratio` CSS) to prevent CLS. Use Next.js Image for content images; do not bypass with raw `<img>`.
- Lazy-load below-the-fold images with `loading="lazy"`. Do not lazy-load the LCP image — set `fetchpriority="high"`. Lazy loading does not block screen readers: a lazy image with `alt` is still in the a11y tree.
- No images of text. Use IBM Plex Mono on real text, not rasterized. Exception: the logo SVG — use `alt=""` when adjacent text says "Hornbill Aviation," or `alt="Hornbill Aviation"` if no adjacent text.

### 4.8 SEO — per-page rules

**Title tag:** 50–60 chars. Pattern by page type:

| Page type | Title |
|---|---|
| Homepage | `Part 61 Flight School in Reno, NV \| Hornbill Aviation` |
| Discovery Flight | `Discovery Flight in Reno, NV \| Hornbill Aviation` |
| Program (PPL) | `Private Pilot License in Reno, NV \| Hornbill Aviation` |
| Program (IR) | `Instrument Rating in Reno, NV \| Hornbill Aviation` |
| Program (CPL) | `Commercial Pilot License in Reno, NV \| Hornbill Aviation` |
| Program (CFI) | `Flight Instructor Training in Reno, NV \| Hornbill Aviation` |
| Program (Mountain) | `Mountain Flying Training in Reno, NV \| Hornbill Aviation` |
| Fleet & Pricing | `PA28 Fleet & Rental Rates in Reno, NV \| Hornbill Aviation` |
| Instructors | `Flight Instructors in Reno, NV \| Hornbill Aviation` |
| About | `About Hornbill Aviation — Part 61 School at KRNO` |
| Contact | `Contact Hornbill Aviation in Reno, NV` |
| Blog post | `[Post title] \| Hornbill Aviation, Reno NV` |

Primary keyword first; city/state on every commercial page; brand last, separated by ` \| `. Never keyword-stuff.

**Meta description:** 120–155 chars. Pattern: primary keyword + value prop + CTA. Example (Discovery Flight): `Book a $199 discovery flight at Reno–Tahoe International. You sit in the left seat, handle the controls, and decide if flying is for you. No deposit.` (148 chars).

**H1:** one per page, primary keyword phrase, reads naturally. Not the school name on non-homepage pages.

**URL structure:** short, hyphenated, descriptive, lowercase. No query strings on canonical URLs. No `.html` suffix. Patterns:

- `/` (homepage)
- `/discovery-flight`
- `/programs/private-pilot` · `/programs/instrument-rating` · `/programs/commercial-pilot` · `/programs/cfi` · `/programs/cfii` · `/programs/mountain-flying`
- `/fleet` · `/instructors` · `/instructors/[slug]`
- `/about` · `/contact` · `/blog` · `/blog/[slug]`
- `/locations/reno` · `/locations/sparks` · `/locations/carson-city` · `/locations/tahoe`

**Internal linking:** 3–5 contextual internal links per page, descriptive anchor text ("See the PA28 fleet and rates" not "click here" not "learn more"). Footer links don't count toward the 3–5.

**Canonical:** self-referencing `<link rel="canonical">` on every page. For paginated blog index, canonical each page to itself.

**Sitemap:** auto-generated at build (Next.js static export) at `/sitemap.xml`. Includes every static page and every blog post. Excludes 404, search results, client-only routes. `lastmod` from the page's last git commit.

**robots.txt:**

```
User-agent: *
Allow: /

# Do not block AI answer-engine crawlers — they are how the site gets cited.
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://hornbillaviation.com/sitemap.xml
```

Do not blanket-block AI crawlers. The site's facts (pricing, NAP, Part 61, RNO, programs) are citable; answer engines citing them is a conversion path, not a leak. Block only resource-hogging scrapers via server rate limiting, not robots.txt.

### 4.9 Schema markup — JSON-LD templates

Inject all schema as `<script type="application/ld+json">` blocks in `<head>`. One block per type per page. Validate every page with Google's Rich Results Test.

**LocalBusiness** (homepage + every location page; use the most specific subtype):

```json
{
  "@context": "https://schema.org",
  "@type": "FlightSchool",
  "name": "Hornbill Aviation",
  "description": "Part 61 flight school at Reno–Tahoe International Airport (KRNO) offering Sport Pilot, Private Pilot, Instrument Rating, Commercial Pilot, CFI, CFII, and Mountain Flying training in a uniform PA28 fleet.",
  "url": "https://hornbillaviation.com",
  "telephone": "[PHONE-TBD]",
  "email": "office@hornbillaviation.com",
  "address": { "@type": "PostalAddress", "streetAddress": "1008 Gentry Way", "addressLocality": "Reno", "addressRegion": "NV", "postalCode": "89512", "addressCountry": "US" },
  "geo": { "@type": "GeoCoordinates", "latitude": 39.4991, "longitude": -119.7681 },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "07:00", "closes": "19:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday","Sunday"], "opens": "08:00", "closes": "17:00" }
  ],
  "areaServed": { "@type": "City", "name": "Reno, NV" },
  "priceRange": "$$",
  "currenciesAccepted": "USD",
  "paymentAccepted": "Cash, Credit Card, Apple Pay, Google Pay"
}
```

Replace `[PHONE-TBD]` once the phone is confirmed — and in that same deploy, update every NAP surface (footer, contact page, schema, GBP, every directory).

**EducationalOrganization** (homepage + About; pairs with LocalBusiness, does not replace it):

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Hornbill Aviation",
  "additionalType": "https://schema.org/FlightSchool",
  "url": "https://hornbillaviation.com",
  "address": { "@type": "PostalAddress", "streetAddress": "1008 Gentry Way", "addressLocality": "Reno", "addressRegion": "NV", "postalCode": "89512", "addressCountry": "US" },
  "department": [
    { "@type": "EducationalOrganization", "name": "Private Pilot Training" },
    { "@type": "EducationalOrganization", "name": "Instrument Rating Training" }
  ]
}
```

**Service** (one per program page):

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Private Pilot Training",
  "provider": { "@type": "FlightSchool", "name": "Hornbill Aviation", "url": "https://hornbillaviation.com" },
  "areaServed": { "@type": "City", "name": "Reno, NV" },
  "description": "Part 61 Private Pilot training in a PA28 fleet at KRNO. FAA minimum 40 hours; typical 55–70 hours. Fly passengers anywhere in the U.S. after the checkride.",
  "offers": { "@type": "Offer", "priceCurrency": "USD", "price": "185", "description": "Non-member PA28 wet rate per hour. Member rate $159/hr." }
}
```

**Course** (one per program page, in addition to Service):

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Private Pilot Training",
  "description": "Part 61 Private Pilot certificate training at KRNO in a PA28 fleet.",
  "provider": { "@type": "FlightSchool", "name": "Hornbill Aviation", "url": "https://hornbillaviation.com" },
  "educationalCredentialAwarded": "FAA Private Pilot Certificate",
  "coursePrerequisites": "FAA Class 3 Medical, US citizenship or TSA clearance, minimum 17 at checkride.",
  "hasCourseInstance": {
    "@type": "CourseInstance", "courseMode": "onsite",
    "location": { "@type": "Place", "name": "Reno–Tahoe International Airport (KRNO)", "address": { "@type": "PostalAddress", "streetAddress": "1008 Gentry Way", "addressLocality": "Reno", "addressRegion": "NV", "postalCode": "89512", "addressCountry": "US" } }
  }
}
```

**FAQPage** (top 5 commercial pages: homepage, discovery flight, PPL, IR, fleet):

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How much is a discovery flight at Hornbill Aviation?", "acceptedAnswer": { "@type": "Answer", "text": "$199, no deposit. The flight is 45–60 minutes with you in the left seat." } },
    { "@type": "Question", "name": "Is Hornbill Aviation Part 61 or Part 141?", "acceptedAnswer": { "@type": "Answer", "text": "Part 61. We train at Reno–Tahoe International (KRNO) on a flexible schedule that adapts to you." } },
    { "@type": "Question", "name": "What does the PA28 cost per hour?", "acceptedAnswer": { "@type": "Answer", "text": "$159/hour wet for members, $185/hour wet for non-members. No fuel surcharge." } }
  ]
}
```

**BreadcrumbList** (site-wide, every page below the homepage):

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://hornbillaviation.com" },
    { "@type": "ListItem", "position": 2, "name": "Programs", "item": "https://hornbillaviation.com/programs" },
    { "@type": "ListItem", "position": 3, "name": "Private Pilot", "item": "https://hornbillaviation.com/programs/private-pilot" }
  ]
}
```

**Article** (every blog post):

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "How Much Does It Cost to Get a Private Pilot License in Reno",
  "author": { "@type": "Person", "name": "Jack Woods", "url": "https://hornbillaviation.com/instructors/jack-woods" },
  "datePublished": "2026-07-15", "dateModified": "2026-07-15",
  "publisher": { "@type": "Organization", "name": "Hornbill Aviation", "url": "https://hornbillaviation.com" },
  "mainEntityOfPage": "https://hornbillaviation.com/blog/ppl-cost-reno",
  "image": "https://hornbillaviation.com/blog/ppl-cost-reno/cover.avif"
}
```

**Event** (discovery flights — one per upcoming scheduled flight, or a recurring template):

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Discovery Flight at Hornbill Aviation",
  "startDate": "2026-08-01T09:00:00-07:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": { "@type": "Place", "name": "Reno–Tahoe International Airport (KRNO)", "address": { "@type": "PostalAddress", "streetAddress": "1008 Gentry Way", "addressLocality": "Reno", "addressRegion": "NV", "postalCode": "89512", "addressCountry": "US" } },
  "offers": { "@type": "Offer", "price": "199", "priceCurrency": "USD", "url": "https://hornbillaviation.com/discovery-flight", "availability": "https://schema.org/InStock" },
  "organizer": { "@type": "FlightSchool", "name": "Hornbill Aviation", "url": "https://hornbillaviation.com" }
}
```

**AggregateRating** — do not add until the site has 5+ verified Google reviews. Then embed inside the LocalBusiness block:

```json
"aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "5" }
```

Never fabricate a rating. A false AggregateRating is a trust-destroying offense and a Google policy violation.

### 4.10 AEO — Answer Engine Optimization

Answer engines (Google AI Overviews, ChatGPT, Perplexity, Gemini) cite pages that state facts in plain, quotable sentences. The site is built to be cited, not just ranked.

**Quick-answer box:** a 50–70 word direct answer at the top of key pages, in plain text (not inside an accordion). Visually distinguished (cream-25 card, gold-500 left border, IBM Plex Mono "Quick answer" label) and in the DOM at first paint.

Pages that get a quick-answer box:

| Page | Quick-answer question | Answer (50–70 words) |
|---|---|---|
| Homepage | "What is Hornbill Aviation?" | "Hornbill Aviation is a Part 61 flight school at Reno–Tahoe International Airport (KRNO) in Reno, Nevada. We train Sport, Private, Instrument, Commercial, CFI, CFII, and Mountain pilots in a uniform fleet of four PA28-180s. Member wet rate is $159/hour; non-member is $185/hour. Discovery flights are $199 with no deposit." |
| Discovery Flight | "How much is a discovery flight in Reno?" | "A discovery flight at Hornbill Aviation in Reno costs $199 with no deposit. You sit in the left seat of a PA28, handle the controls, and fly for 45–60 minutes over the Reno–Tahoe area. The flight counts toward your logbook if you continue training. Book online in under 60 seconds." |
| Private Pilot | "How do I get a private pilot license in Reno?" | "To earn a Private Pilot certificate in Reno, train at a Part 61 school like Hornbill Aviation. You need an FAA medical, 40 hours minimum flight time (typical 55–70), a written knowledge test, and a checkride. At Hornbill you train in a PA28 at KRNO, on your schedule, with an instructor you choose." |
| Instrument Rating | "How long is instrument training in Reno?" | "Instrument rating training at Hornbill Aviation in Reno takes 50 hours of instrument flight (FAA minimum) plus a written and a checkride. Most students fly 3–6 months part-time in our PA28 fleet. We use dual Garmin G5 and WAAS GPS-equipped aircraft for the training." |
| Fleet & Pricing | "How much does it cost to rent a PA28 in Reno?" | "At Hornbill Aviation at KRNO, the PA28-180 rents at $159/hour wet for members and $185/hour wet for non-members. Membership is $49/month. There is no fuel surcharge. The fleet is four aircraft with consistent handling and predictable costs." |

**Conversational heading phrasing:** H2/H3 sections on commercial and blog pages use natural-language question phrasing matching how people search. Examples: "How much does a private pilot license cost in Nevada?", "Part 61 or Part 141 — which fits your schedule?", "What can you do after a private pilot certificate?", "Can you rent a PA28 for a cross-country trip?"

**Citable factual statements** — 10 model statements. Each is a single declarative sentence, no hedging, no superlatives, with a specific number or name:

1. "Hornbill Aviation is a Part 61 flight school at Reno–Tahoe International Airport (KRNO)."
2. "The fleet is four PA28-180s with tail numbers N6576J, N7824W, N7969W, and N0001J."
3. "The member wet rate for the PA28 is $159 per Hobbs hour; the non-member rate is $185."
4. "A discovery flight is $199 and requires no deposit."
5. "Membership is $49 per month."
6. "N6576J and N7824W are equipped with dual Garmin G5 displays and WAAS GPS navigators."
7. "KRNO is at 39.4991, -119.7681, elevation 4,403 feet MSL."
8. "The FAA minimum for a Private Pilot certificate is 40 flight hours; most students at Hornbill finish in 55–70."
9. "Hornbill's address is 1008 Gentry Way, Reno, NV 89512."
10. "We offer Sport Pilot, Private Pilot, Instrument Rating, Commercial Pilot, CFI, CFII, and Mountain Flying training."

### 4.11 Local SEO

**NAP consistency:** name, address, and phone must match byte-for-byte across: site footer (every page), contact page, homepage LocalBusiness schema, every location page, Google Business Profile, Bing Places, Yelp, Facebook Business Page, AOPA Flight Training Directory, FlightSchoolList.com, and every other directory.

The canonical NAP:

- **Name:** Hornbill Aviation
- **Address:** 1008 Gentry Way, Reno, NV 89512
- **Email:** office@hornbillaviation.com
- **Phone:** TBD — until confirmed, render no phone anywhere on the site, in schema, or in directories. A missing phone is better than an inconsistent one.

Quarterly NAP audit via BrightLocal or Whitespark. NAP inconsistency is a known friction point for both named competitors.

**GBP alignment:** GBP primary category "Flight School"; secondary "Aviation Training," "Aircraft Rental Service," "Pilot School." Hours on GBP match the LocalBusiness `openingHoursSpecification` exactly. GBP address matches the site address exactly. GBP website URL is `https://hornbillaviation.com` (no UTM tags in the canonical URL field).

**Geo coordinates:** `39.4991, -119.7681` (KRNO) in LocalBusiness `geo`. Place the coordinates at the airport ramp where students actually meet, not at the street address.

**Location pages:** one page per secondary city (`/locations/reno`, `/locations/sparks`, `/locations/carson-city`, `/locations/tahoe`). Each has: `<h1>` including city + primary service; quick-answer box naming the city and school; map embed of KRNO with caption naming both city and airport; programs list, fleet summary, discovery flight CTA; LocalBusiness schema repeated with the same NAP (one physical location — location pages are for catchment-area SEO, not fake addresses); one paragraph of genuinely useful local content (drive time from the city to KRNO, airspace the route crosses, local considerations). Do not publish thin duplicate location pages with only the city name swapped — that is spam and Google filters it.

### 4.12 E-E-A-T

Google's March 2026 Core Update formalized author provenance as a ranking signal. For a flight school, this means named CFIs with verifiable credentials.

- **Named authors on every blog post and every program page.** The author is a CFI or the chief instructor. The byline links to the author's bio page (`/instructors/[slug]`).
- **CFI credentials published with consent.** Each instructor bio page lists: full name, CFI certificate number (if the instructor consents — otherwise omit), ratings held (CFI/CFII/MEI/ATP/AGI/IGI as applicable), total flight hours, dual given, students passed, specialties, and a one-paragraph origin story in the brand voice.
- **Author bio pages** link to the instructor's LinkedIn profile (with consent). LinkedIn cross-referencing is part of Google's E-E-A-T verification.
- **Original photography preferred over stock.** Real RNO/Sierra golden-hour and blue-hour photography. Stock imagery is the failure mode for E-E-A-T — Google can detect stock and downweights it; prospective students disengage.
- **Citations to FAA regs/ACs where appropriate.** Blog posts and program pages that reference regulations cite the specific FAR (e.g., "FAR 61.109 requires 40 hours of flight time for a Private Pilot certificate") with a link to the current eCFR URL.

### 4.13 Core Web Vitals as an accessibility issue

| Metric | Target | Alert | Accessibility rationale |
|---|---|---|---|
| LCP | ≤ 2.0s | 1.6s | Slow LCP on a slow phone or rural connection is slow time-to-content for the user who needs it most. |
| INP | ≤ 200ms | 160ms | Above 200ms, keyboard and switch users perceive lag between input and response. |
| CLS | ≤ 0.1 | 0.08 | Layout shift moves content under a finger, cursor, or screen-reader focus point. Direct accessibility failure for low-vision and motor-impaired users. |
| TTFB | ≤ 500ms | 400ms | Slow TTFB blocks the whole page on slow connections. |

Engineering rules (enforced, not aspirational): hero/LCP image is AVIF (WebP fallback), preloaded, `fetchpriority="high"`, under 100KB, explicit dimensions. Below-the-fold images: `loading="lazy"`, AVIF/WebP, explicit dimensions. Fonts: Nunito Sans + Poppins + IBM Plex Mono; `font-display: swap` or `optional`; preload only weights used above the fold. Third-party JS deferred or moved to Partytown web workers; analytics, chat, call-tracking never block the main thread. Static export served via CDN with edge caching.

---

## 5. Resolved Design Decisions

| Decision | Rationale |
|---|---|
| WCAG 2.2 AA, not AAA, as the conformance target | AA is the realistic standard across an immersive site with photo overlays and WebGL. AAA is targeted where the palette allows (body text on cream passes AAA at 13.4:1). AA vs AAA was an open question in V1 visual identity; this doc resolves it for V2. |
| ARIA on native semantics is forbidden | "No ARIA is better than bad ARIA." Native HTML elements carry correct semantics for free. Adding `role` to them is noise. |
| WebGL cockpit renders a static hero image under reduced motion / low-power | Reduced-motion users get a usable, static site. Low-power devices get the same fallback via WebGL feature detection. No degraded "your device is too slow" dead end. |
| `gold-500` on light backgrounds is forbidden for text | The palette doc already says this; this doc makes it a hard rule with contrast ratios listed. |
| Quick-facts strip is `<aside>`, not `<div>` or `<main>` child | It is a complement to the main content, both semantically and visually. Crawlers and screen readers reach it before the story. |
| AI crawlers are allowed in robots.txt | AEO is non-optional. Blocking GPTBot/ClaudeBot/PerplexityBot blocks citation in answer engines, which is a conversion path for a Part 61 flight school. Do not blanket-block. |
| AggregateRating schema is not added until 5+ reviews | A false rating violates Google policy and destroys trust. A missing rating is honest. |
| Phone is not rendered anywhere until confirmed | NAP consistency requires byte-for-byte match. A wrong phone is worse than a missing phone. The `[PHONE-TBD]` placeholder appears in schema templates as a single source of truth. |
| One Event schema per discovery flight booking (or a recurring template) | Discovery flights qualify for Event rich results; surfacing them in search increases booking funnel entry. |
| Location pages for catchment cities, with genuine local content | Sparks, Carson City, Minden, Truckee, South Lake Tahoe are underserved by competitors. Thin duplicate location pages are forbidden — each must have one paragraph of real local content. |

---

## 6. Open Questions

1. **Phone number.** Brand facts list phone as TBD. Until confirmed, no phone renders anywhere. When confirmed, the same deploy updates footer, contact page, schema, GBP, and every directory simultaneously. Who owns the confirmation and the deploy coordination?
2. **CFI certificate numbers.** Publishing certificate numbers strengthens E-E-A-T but requires each instructor's consent. Which instructors consent? Where is consent recorded?
3. **Hours of operation.** The LocalBusiness schema template above assumes 07:00–19:00 weekdays, 08:00–17:00 weekends. Confirm actual hours before launch; update schema and GBP in the same deploy.
4. **AggregateRating readiness.** The site has zero reviews at launch. What is the trigger condition for adding AggregateRating — 5 verified Google reviews? Who verifies and adds it?
5. **Location page depth.** How many location pages ship at launch (Reno is certain; Sparks, Carson City, Minden, Truckee, Tahoe are candidates)? Each needs genuine local content, not a city-name swap.
6. **Photo ownership/licensing.** The research notes some asset filenames suggest NV Flight origin. Confirm which photos are owned/licensed for Hornbill use before they go on the live site. Stock photography is an E-E-A-T failure mode.
7. **Reduced-motion WebGL fallback image.** Which specific photo of the PA28 cockpit from the left seat becomes the static hero? It must match the scene description in §4.5.
8. **Blog author bylines at launch.** If only one CFI is available to author at launch, every blog post carries the same byline. Is that acceptable, or do we delay blog launch until two authors are available?

---

## 7. Multilayer Validation Requirements

Validation is per-page, before merge. A page is not done until every check passes.

| Layer | Check | Tool / method | Pass criterion |
|---|---|---|---|
| HTML | Semantic structure review | Manual read of the rendered HTML | One `<h1>`, logical h2→h3, landmarks present, no `role` on native semantics, skip link first |
| HTML | Skip link reachable | Keyboard Tab from page load | Skip link visible on first Tab; activates to `#main` |
| ARIA | axe DevTools scan | axe DevTools browser extension | 0 violations, all rules |
| ARIA | Lighthouse a11y audit | Chrome Lighthouse | Score 100; 0 failures |
| Keyboard | Tab order walkthrough | Keyboard only, no mouse | Every interactive element reachable in logical order; visible focus ring at every stop |
| Keyboard | Mobile menu open/close | Keyboard Esc + Tab | Focus moves in on open, trapped while open, returns to toggle on close |
| Keyboard | Booking modal open/close | Keyboard Esc + Tab | Focus moves to modal title on open, trapped, returns to trigger on close |
| Keyboard | FAQ accordion | Keyboard Tab + Enter/Space | Each accordion toggles; collapsed content removed from a11y tree |
| Keyboard | Calendar widget | Arrow keys + Enter | Dates navigable by arrow keys; disabled dates skipped; selection works |
| Keyboard | WebGL cockpit | Arrow keys + Tab | Figure focusable; arrow keys pan/tilt; controls toolbar buttons work; Pause stops motion |
| Screen reader | VoiceOver (macOS) | VoiceOver walkthrough | All landmarks announced; quick-facts reachable; H1 announced once; form errors announced; booking modal announced as dialog |
| Screen reader | NVDA (Windows) | NVDA walkthrough | Same as VoiceOver |
| Screen reader | TalkBack (Android) | TalkBack walkthrough | Same as VoiceOver; touch navigation works |
| Color contrast | Lighthouse contrast audit | Chrome Lighthouse | 0 contrast failures |
| Color contrast | Manual photo-overlay check | Contrast checker on darkest pixel under text | 4.5:1 minimum for body text under any photo |
| Reduced motion | macOS Reduce Motion | System Settings → Accessibility → Display → Reduce Motion | No parallax, no auto-scroll, no infinite loops; WebGL cockpit shows static image; all content reachable |
| Reduced motion | prefers-reduced-motion query | DevTools → Rendering → Emulate CSS `prefers-reduced-motion: reduce` | Same as above, in-browser |
| SEO | Title tag length | Manual check | 50–60 chars per page; primary keyword first; brand last |
| SEO | Meta description length | Manual check | 120–155 chars; keyword + value prop + CTA |
| SEO | H1 count | Manual check | Exactly one `<h1>` per page |
| SEO | URL structure | Manual check | Short, hyphenated, lowercase, no query strings, no `.html` |
| SEO | Internal links | Manual count | 3–5 contextual internal links with descriptive anchor per page |
| SEO | Alt text | Manual review of every `<img>` | Decorative → `alt=""`; informative → descriptive, ≤125 chars, aircraft/location named naturally |
| SEO | Canonical | Manual check | Self-referencing `<link rel="canonical">` on every page |
| SEO | Sitemap | Fetch `/sitemap.xml` | All static pages and blog posts present; 404/search/4xx excluded |
| SEO | robots.txt | Fetch `/robots.txt` | Allows all crawlers including AI bots; references sitemap |
| Schema | Rich Results Test | Google Rich Results Test, per page | 0 errors; all eligible rich result types detected |
| Schema | Schema valid JSON-LD | Schema.org validator | All blocks valid; no missing required fields |
| AEO | Quick-answer box present | Manual check on key pages | 50–70 word direct answer in DOM at first paint on homepage, discovery flight, PPL, IR, fleet, FAQ |
| AEO | FAQPage schema | Rich Results Test | FAQ rich result eligible on top 5 commercial pages |
| Local SEO | NAP byte-for-byte | Manual diff across footer, contact, schema, GBP | Identical strings everywhere; phone absent if TBD |
| E-E-A-T | Named author on blog + program pages | Manual check | Byline present, links to author bio page |
| E-E-A-T | Author bio page | Manual check | Credentials, hours, specialties, LinkedIn link (with consent) present |
| Core Web Vitals | Lighthouse perf audit (field data proxy) | Chrome Lighthouse | LCP ≤ 2.0s, INP ≤ 200ms, CLS ≤ 0.1 |
| Core Web Vitals | CrUX field data (post-launch) | Search Console → Core Web Vitals | All three metrics in "Good" band for the page |
| Anti-patterns | No overlay/widget | Manual code review | No accessiBe, UserWay, or similar overlay script present |
| Anti-patterns | No hover-only interactions | Keyboard-only walkthrough | Every hover-revealed content also reachable by focus |
| Anti-patterns | No placeholder-as-label | Manual form review | Every input has a `<label>` (visible or `aria-label`); placeholder is never the only label |
| Anti-patterns | No autoplaying motion | Manual page load | No motion autoplays without a visible Pause control |
| Anti-patterns | No color-only signaling | Manual review | Status/error states conveyed by text + icon, not color alone |
| Anti-patterns | No "click here" | Manual link text review | Every link text describes destination |

**Banned accessibility anti-patterns — never ship** (validated by the Anti-patterns rows above):

- Accessibility overlays/widgets (accessiBe, UserWay, EqualWeb). Unreliable, can break screen readers, subject of NAD lawsuits. Fix the HTML instead.
- Hover-only interactions (tooltips, dropdowns, reveals requiring `:hover` without `:focus`). Every hover state has a focus equivalent.
- Placeholder-as-label. The `<label>` element is the label. Placeholder is hint text; it disappears on input and is not announced as a label.
- Autoplaying motion without a pause control. Any autoplaying motion has a visible, keyboard-reachable Pause button.
- Color-only signaling. Error, availability, success states conveyed by text and icon in addition to color.
- Link text like "click here," "learn more," "read more." Anchor text describes the destination.

---

This is the rulebook for the V2 accessibility and SEO surface. Any LLM implementing a page, component, schema block, or copy line for hornbillaviation.com follows these rules and validates against the §7 checklist before declaring the work done.