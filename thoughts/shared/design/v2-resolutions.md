---
date: 2026-07-11
author: Jack Woods (decisions) / Claude Code (capture)
repository: hornbill-flying
topic: "V2 open-question resolutions — authoritative source of truth"
tags: [design, v2, decisions]
status: authoritative
---

# V2 Open-Question Resolutions

This document is the authoritative resolution of the open questions surfaced by the six V2 rulebook docs. **An implementing LLM reads this first, alongside the six rulebooks.** Where a resolution materially changes a rule in a rulebook, that rulebook has been edited to reference this doc; where a resolution is content state (not a design rule), it lives only here.

The six rulebooks:
- `v2-narrative-and-voice.md`
- `v2-visual-and-motion-system.md`
- `v2-ia-and-progressive-disclosure.md`
- `v2-engineering-and-performance.md`
- `v2-accessibility-and-seo.md`
- `v2-page-by-page-ux-spec.md`

## Resolutions

| # | Question | Resolution | Affects |
|---|----------|-----------|---------|
| 1 | Canonical phone number for NAP | **Leave TBD.** Do not block launch on this. When assigned, update a single `siteFacts.ts` token; footer, contact, schema, GBP, and directories pick it up. | All docs reference `siteFacts.ts` as the single source of truth; no doc hardcodes a phone number. |
| 2 | Launch instructors | **Trygve, Joel, and Ethan at launch. Kurtis added later (4th CFI).** Build the Instructors index and individual profile pages for 3 CFIs at launch; design the index so adding Kurtis later is a content-file change, not a code change. Use full names on the public site (first name + last name, not first-name-only like the competitors — this is the E-E-A-T advantage). CFI certificate numbers: do **not** publish unless each instructor gives written consent; default to name + credentials + specialties + hours + bio without the certificate number. | Page-by-page spec (Instructors index, Instructor profile); content file `src/content/instructors.ts` (implementation concern, not a doc edit). |
| 3 | WebGL cockpit asset | **Not available at launch, and not expected for a while.** The WebGL cockpit showpiece is **post-launch**. The homepage ships with a static graded hero image at launch — specifically, a sunset-gradient placeholder box (per resolution #4) until real photography is commissioned, then a real graded photo of the PA28 cockpit from the left seat. The WebGL showpiece becomes a post-launch enhancement; do not block launch on it. Design and engineering docs updated to reflect this. | Visual & motion doc, engineering doc, page-by-page spec (Homepage). |
| 4 | Photography | **Will be commissioned. Until then, use placeholders: solid boxes with a sunset gradient (warm gold-to-coral-to-blue-900 vertical or diagonal).** Every image slot in V2 ships with a placeholder at launch — the cockpit hero, instructor portraits, aircraft photos, section backgrounds, blog hero images. The placeholder is a CSS gradient box (no <img> tag needed at launch for placeholder-only slots; use a div with the gradient and a small IBM Plex Mono label like `PA28 cockpit — coming soon` for hero slots, or unlabeled for decorative slots). When real photos arrive, replace the gradient divs with <img> tags following the image-grading recipe in the visual & motion doc. Never use AI-generated imagery. Never use unverified stock. | Visual & motion doc, narrative doc, page-by-page spec (all image slots). |
| 5 | Booking backend | **Flight Circle.** Not a custom API backend. Use Flight Circle's embeddable booking widget for the public discovery-flight booking flow. This replaces the custom `/api/availability`, `/api/bookings`, `/api/instructors/:slug/availability`, `/api/webhooks/stripe`, `/api/gift-vouchers` endpoints specified in the V1 layout doc and carried into the engineering doc. The booking flow is embedded via Flight Circle's widget on `/discovery-flight/` and `/book/`; no first-party API backend is built at launch. Gift vouchers, payment, and availability are all handled by Flight Circle. The "under 60 seconds on mobile, under 3 clicks" requirement still holds — verify against Flight Circle's widget, and if it cannot meet the target, raise the issue rather than ship a slow flow. | Engineering doc (booking section), IA doc (booking reachability), page-by-page spec (Discovery Flight, Booking entry). |
| 6 | AggregateRating trigger | **Manual.** The owner will add AggregateRating schema and the homepage review component manually when the review count is sufficient. Do not build automated review-count detection. At launch, suppress the review/testimonial component and omit AggregateRating schema. | Narrative doc, page-by-page spec (Homepage, Discovery Flight), accessibility & SEO doc (already correct — AggregateRating omitted at launch). |
| 7 | Local landing pages (Sparks, Carson City, Minden, Truckee, South Lake Tahoe) | **Not in V2 scope.** Do not build per-city landing pages. The single Location/RNO page and the homepage's local-SEO signals (NAP, schema, "RNO," "Reno–Tahoe," "Part 61") carry the local SEO load. Per-city pages can be revisited in a later phase if the data justifies it. | IA doc (URL hierarchy), page-by-page spec (Location page). |
| 8 | Blog | **Blog posts already exist.** The blog index links to existing posts at launch; do not treat the blog as empty or "coming soon." Build the blog index and post pages to render the existing content (MDX or markdown files in `src/content/blog/`). E-E-A-T rules still apply: every post needs a named author (one of the 3 launch CFIs), an author bio page, and Article schema. | Page-by-page spec (Blog index, Blog post); content file `src/content/blog/` (implementation concern). |
| 9 | Cross-Country Rentals | **Standalone product page at `/cross-country-rentals/`.** Not a section within Fleet & Pricing. It is a differentiator worth its own page, its own URL, and its own schema. | IA doc (already correct), page-by-page spec (already correct). |
| 10 | Reviews at launch | **Suppress.** Do not render the review/testimonial component on the Homepage, Discovery Flight, or anywhere else at launch. Do not render AggregateRating schema. Do not render a "Google reviews" badge. Do not seed with beta-student testimonials. The components and schema are built but gated behind a feature flag or a `siteFacts.reviewsEnabled = false` toggle that the owner flips to `true` manually when reviews exist. When the toggle flips, the components render and AggregateRating schema is added. | Narrative doc, page-by-page spec (Homepage, Discovery Flight), accessibility & SEO doc. |

## Launch scope summary

At launch, the V2 site ships with:

- **Story pages:** Homepage (with a **static sunset-gradient placeholder hero**, no WebGL) and Discovery Flight (with the Flight Circle booking widget embedded).
- **Product pages:** Program pages (SPL, PPL, IR, CPL, CFI, CFII, Mountain Flying), Fleet & Pricing, Membership, Instructors index (3 CFIs: Trygve, Joel, Ethan), Instructor profiles (3), Cross-Country Rentals, Location/RNO, About, Financing, FAQ, Blog index (existing posts), Blog post pages, Contact, Booking entry, 404.
- **Persistent quick-facts strip:** visible on every page, with phone TBD (render a "Call us" link that's empty or links to the contact page until the number is assigned).
- **Reviews:** suppressed.
- **WebGL:** not shipped.
- **Photography:** sunset-gradient placeholders throughout.
- **Booking:** Flight Circle embedded widget.
- **Local pages:** Reno only (no per-city pages).

## Post-launch scope

- WebGL cockpit showpiece (when a real PA28 cockpit asset is produced or commissioned).
- Real photography replacing placeholders (when the shoot is commissioned).
- AggregateRating schema + review components (when the owner flips the toggle).
- 4th instructor (Kurtis) added as a content-file change.
- Per-city landing pages (only if the data later justifies it).