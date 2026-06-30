# Hornbill Aviation — Visual Identity

A brand foundation document for the Hornbill Aviation website.

---

## 1. Brand summary

**Name:** Hornbill Aviation
**Tagline candidate:** *Built around how you learn best.*

### What the brand stands for

Hornbill Aviation is a Part 61 flight school at Reno–Tahoe (RNO) built around **student choice and real-world experience**.

- A uniform fleet of similarly equipped PA28 aircraft keeps training consistent and costs predictable.
- Students can choose their instructor — or bring their own — so the learning relationship fits the person.
- Cross-country rentals let students fly real trips, not just practice-area loops.
- Competitive hourly rates at RNO lower the barrier to staying in the air.

### Brand promise

**We make learning to fly fit your life, not the other way around.**

The school turns the dream of flying into a practical, supported journey — whether the goal is a private certificate, a professional career, or weekend adventure.

---

## 2. Logo

### Primary mark

The primary mark is `logo.svg` — a wide-format vector logo. It combines:

- A hornbill bird in flight
- A sun and mountain motif
- Rope and nautical/aviation insignia styling
- A palette of deep blue, gold, coral, teal, warm cream, and dark ink tones
- The words "Hornbill Flying Club" and "Est. 2026"

### Name vs. logo wording

The website and public brand name is **Hornbill Aviation**. The logo currently reads "Hornbill Flying Club". Until the wordmark is updated, use the mark as-is for hero/brand moments and pair it with the text name "Hornbill Aviation" so search and signage stay coherent. Treat the SVG as the visual symbol; do not crop or edit it to remove the word "Club". Do not stretch, recolor, or rotate it.

### Logo usage rules

- **Clear space:** keep the height of the hornbill mark as minimum clear space on all sides.
- **Backgrounds:** place on cream, white, blue, or photo backgrounds with sufficient contrast. Avoid placing over busy sky/busy terrain without a subtle overlay.
- **Minimum size:** 80 px wide on screen; 1 inch wide in print.
- **Aspect ratio:** preserve the logo's natural width-to-height ratio (do not force it into a square or circle).
- **Don't:** stretch, recolor, add drop shadows, rotate, or place inside another shape.

---

## 3. Color system

The palette is built from warm, sunny earth tones and confident aviation blues. It keeps the site friendly and approachable while giving navigation, calls to action, and safety information enough contrast to feel professional.

### Primary colors

| Token | Hex | Usage |
|-------|-----|-------|
| `blue-900` | `#004E7C` | Primary headings, primary buttons, dark band surfaces (PageHeader, dark sections) |
| `cream-50` | `#FFF8EC` | Page background, light sections, logo-safe background, header background, footer background |
| `cream-25` | `#FFFDF6` | Content cards, form fields, subtle surfaces |
| `white` | `#FFFFFF` | Cards, form fields, contrast text on dark |

### Accent colors

| Token | Hex | Usage |
|-------|-----|-------|
| `gold-500` | `#F8AF12` | Primary CTA highlights, icon fills, badge backgrounds, key links |
| `gold-400` | `#F9A90C` | Hover states, subtle highlights, dividers, warm accents |
| `coral` | `#F45115` | Alert/attention moments, hornbill beak accent, active nav state, form errors |
| `teal-500` | `#007C80` | Success states, availability indicators, soft functional accents |

### Functional colors

| Token | Hex | Usage |
|-------|-----|-------|
| `ink` | `#2E2717` | Body text on light backgrounds |
| `ink-light` | `#827D74` | Secondary/body-supporting text, captions, metadata |
| `teal-100` | `#E6F0F0` | Callout boxes, info banners, soft aviation reference |
| `success` | `#007C80` | Form success, availability indicators |
| `error` | `#F45115` | Form errors, warnings |

### Color combinations

| Context | Background | Text / Accent | Notes |
|---------|------------|---------------|-------|
| Hero / dark section | `blue-900` | `cream-50` text, `gold-500` accents | High authority, trust |
| Body content | `cream-50` | `ink` text, `blue-900` headings, `gold-500` CTAs | Readable, warm |
| Cream cards | `cream-25` | `ink` text, `blue-900` headings, `gold-500` links | Clean, modern |
| Highlight strip | `gold-500` | `blue-900` text | Use sparingly for CTAs |
| Attention / CTA alt | `coral` | `white` text | For time-sensitive or action prompts |
| Success / available | `teal-500` | `white` text | Availability, confirmation |

### Accessibility notes

- `gold-500` on `blue-900`: passes WCAG AA for large text and UI components.
- `gold-500` on `cream-50` or `white`: does **not** pass AA for normal text. Use `blue-900` or `ink` for text, and `gold-500` only for icons, borders, and large buttons with dark text.
- `coral` on `white`: passes AA for large text; use for buttons and short labels, not long paragraphs.
- Body text should stay `ink` on `cream-50`, `cream-25`, or `white`.

---

## 3a. Token system

The codebase uses a two-layer token system so colors can change without renaming usages.

### Palette layer (`--palette-*`)
Raw color values, used by SVG/illustrations and as the substrate for intent tokens. Rarely used directly in components.

### Intent layer (`--color-*`)
Usage-named tokens, used by components. Examples: `--color-bg`, `--color-card`, `--color-dark`, `--color-body`, `--color-heading`, `--color-accent`, `--color-active`, `--color-header-bg`, `--color-header-button-1-bg`. When the palette changes, only the palette layer and the intent-to-palette mapping need to update; component classes don't change.

### New alpha-aware intent tokens

| Token | Maps to | Usage |
|---|---|---|
| `border` | `blue-900` | Strong input/button borders |
| `border-subtle` | `blue-800` /10 | Card and list borders |
| `border-soft` | `blue-800` /20 | Slightly stronger subtle borders |
| `dark-subtle` | `blue-900` /5 | Hover washes on light surfaces |
| `dark-soft` | `blue-800` /10 | Skeleton/placeholder surfaces |
| `accent-subtle` | `gold-500` /10 | Selected-option backgrounds |
| `error-subtle` | `coral` /10 | Error callout backgrounds |
| `success-subtle` | `teal-500` /10 | Success callout backgrounds |
| `callout-subtle` | `teal-100` /70 | Soft callout hover/alt surfaces |
| `on-dark-accent` | `gold-500` | Accent text/icons on dark surfaces |
| `on-dark-accent-hover` | `gold-400` | Hover accent text on dark surfaces |
| `on-dark-subtle` | `cream-50` /10 | Hover/focus overlays on dark surfaces |
| `on-dark-soft` | `cream-50` /50 | Muted text on dark surfaces |

### CSS scrim utilities

Two component utilities in `globals.css` replace repeated hero/page-header gradients:

- `.bg-hero-scrim` — `90% → 60% → 40%` dark overlay for homepage and program heroes.
- `.bg-pageheader-scrim` — `90% → 70% → 50%` dark overlay for `PageHeader` image bands.

### Legacy aliases (deprecated)
The codebase retains color-name tokens (`navy-900`, `sand-50`, `orange`, `rust`, etc.) as aliases of the palette layer for backwards compatibility. New work uses intent tokens. A follow-up ticket migrates remaining usages.

---

## 4. Typography

Principles: easy to read first, inspirational second, aviation-appropriate third. Type should feel clean, confident, and slightly aspirational — like a flight school that takes safety seriously but still makes flying feel like an adventure.

### Font families

| Role | Font | Fallback | Rationale |
|------|------|----------|-----------|
| Headings | **Nunito Sans Extra Bold (800)** | system-ui, sans-serif | Strong, friendly, modern display presence; pairs with the warmer Poppins body. |
| Body | **Poppins Medium (500)** | system-ui, sans-serif | Warm, modern, and highly legible across schedules, pricing, forms, and long content. |
| Accent / labels / numbers | **IBM Plex Mono** | Courier New, monospace | Aviation-tactical feel for flight hours, aircraft IDs, route names, stats, and small labels. Use sparingly. |

### Web loading

- Nunito Sans (variable weight) and Poppins load from Google Fonts.
- IBM Plex Mono loads only if the UI uses data labels, aircraft identifiers, or pricing tables.
- Single request: `https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Poppins:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap`

### Type scale

| Style | Font | Size | Line height | Weight | Usage |
|-------|------|------|-------------|--------|-------|
| H1 | Nunito Sans | 48–64 px / 3–4 rem | 1.1 | 800 | Hero page titles |
| H2 | Nunito Sans | 36–48 px / 2.25–3 rem | 1.15 | 800 | Section titles |
| H3 | Nunito Sans | 24–32 px / 1.5–2 rem | 1.2 | 800 | Sub-sections, card titles |
| H4 | Poppins | 18–20 px / 1.125–1.25 rem | 1.3 | 600 | Labels, smaller headers |
| Body | Poppins | 16–18 px / 1–1.125 rem | 1.6 | 500 | Paragraphs, descriptions |
| Body small | Poppins | 14 px / 0.875 rem | 1.5 | 500 | Captions, metadata, disclaimers |
| Label / data | IBM Plex Mono | 13–14 px / 0.8125–0.875 rem | 1.4 | 500 | Aircraft type, hours, rates, route codes |
| Button | Poppins | 14–16 px / 0.875–1 rem | 1 | 600 | All buttons |

### Typography rules

- Headings use sentence case for a friendlier, more direct tone: *"Start your flight training"*.
- **Exception — brand wordmark:** the "HORNBILL AVIATION" wordmark in the header and footer uses Nunito Sans 900 (extra bold), uppercase, with -0.02em letter-spacing. This is the only all-caps display use of the heading font outside of IBM Plex Mono data labels.
- Avoid all-caps except for IBM Plex Mono data labels, small UI badges, and the brand wordmark.
- Keep line length to ~65 characters for body text.
- Use `font-variant-numeric: tabular-nums` for pricing and aircraft data.

---

## 5. Imagery style

### Photography

- **Real, not stocky.** Prefer actual aircraft, actual instructors, actual ramp and runway shots at RNO and the surrounding Sierra / high-desert landscape.
- **Time of day:** golden hour and blue hour. Avoid harsh midday unless it's a technical cockpit shot.
- **Subjects:** students and instructors doing preflight, cockpit prep, debrief, loading bags for a cross-country, flying past Tahoe / Truckee / the desert.
- **Mood:** capable, calm, slightly epic. The viewer should feel *"I could do that."*

### Illustration / graphics

- Line-art aircraft silhouettes and sectional-chart motifs can be used as subtle texture.
- The hornbill crest should remain the only bird illustration.
- Avoid cartoonish clip-art aviation icons. Use clean, thin-stroke icons in `blue-900` or `gold-500`.

---

## 6. Voice and writing style

### Voice attributes

| Attribute | What it means here |
|-----------|-------------------|
| **Friendly** | Warm and human. Use "you" and "your". No stiff institutional language. |
| **Confident** | State facts plainly. The school knows what it's doing; the copy doesn't hedge. |
| **Inspirational** | Connect flying to the student's goal, not to abstract dreams. Ground inspiration in what happens next. |
| **Reassuring** | Anticipate concerns (cost, time, flexibility, safety) and answer them directly. |
| **Encouraging** | Learning to fly is hard. The voice should make the next step feel achievable. |
| **Professional** | Clean, accurate, no hype. Safety and competence come through in specificity. |

### Tone by context

| Context | Tone | Example |
|---------|------|---------|
| Homepage hero | Inviting + bold | *"Learn to fly on your schedule, with instructors you choose and aircraft you can count on."* |
| Pricing / rates | Transparent + calm | *"PA28 rental: $X/hour. No fuel surcharge, no membership fee."* |
| Safety / maintenance | Confident + specific | *"Every aircraft is maintained on a strict schedule and inspected before each flight."* |
| Cross-country program | Exciting + grounded | *"Don't just practice maneuvers — plan a trip, file a route, and go."* |
| Instructor profiles | Warm + credible | *"Meet the instructors who will actually be in the airplane with you."* |

### What to avoid

Avoid these common weak-writing patterns:

- **Cheesy marketing voice:** "unlock your potential," "soar to new heights," "sky's the limit," "elevate your dreams."
- **Excessive balance:** "We offer both flexibility and structure." Pick the angle and own it.
- **Abstract language:** "Our mission is to provide world-class aviation education solutions." Say what you actually do.
- **Over-explanation:** Don't justify every claim. One concrete detail beats three qualifying clauses.
- **Symmetrical structure:** Avoid forced parallel lists and mirrored sentence pairs that sound like they came from a template.
- **Generic aviation clichés:** "passion for aviation," "aviation family," "take your dreams to the sky."
- **LLM hedging:** "it's important to note," "in today's world," "at the end of the day."

### Writing rules

1. **Lead with the reader's outcome.** Not "We have 10 instructors." Instead: "Choose the instructor whose schedule and style fit you."
2. **Use specific numbers and names.** "PA28-161" over "our fleet"; "RNO" over "our airport"; "$149/hour wet" over "competitive rates."
3. **One idea per sentence.** Short beats clever.
4. **Prefer active voice.** "You file the flight plan. We check the weather together."
5. **Call things what students call them.** "Checkride" not "final examination"; "cross-country" not "long-distance training flight."
6. **CTAs are clear actions.** "See aircraft and rates," "Book a discovery flight," "Meet our instructors." No "Learn more" unless there is genuinely nothing more concrete to say.

---

## 7. Component usage notes

### Buttons

| Type | Background | Text | Usage |
|------|------------|------|-------|
| Primary | `blue-900` | `white` | Main conversion action |
| Secondary | `gold-500` | `blue-900` | Supporting action, standout but less dominant |
| Tertiary | transparent, `blue-900` border | `blue-900` | Low-priority, ghost action |
| Accent | `coral` | `white` | Time-sensitive / limited availability |

### Links

- Default: `blue-900`, underline on hover.
- Inline links on dark backgrounds: `gold-500`.
- Active/selected: `coral`.

### Cards

- `cream-25` or white background, subtle shadow, rounded 8–12 px corners.
- Accent top border in `gold-500` for featured/pricing cards.

### Forms

- Inputs: `cream-25` background, `blue-900` border, `ink` text.
- Focus ring: `gold-500`.
- Error state: `error` coral, `error` text.
- Labels: `Poppins 600`, `ink`.

### Badges / tags

- `gold-500` background with `blue-900` text for status tags: "Available now," "Part 61."
- `teal-100` background with `blue-900` text for informational tags: "Cross-country ready."

---

## 8. Design decisions log

| Decision | Rationale | Notes |
|----------|-----------|-------|
| Website name is **Hornbill Aviation** | User confirmed; more inclusive of training-center positioning than the logo's "Flying Club." | Logo will be updated separately; keep using crest for now. |
| Color palette: warm cream, ink, gold, coral, teal, deep blue | Built from the existing crest and site direction: `#FFF8EC` and `#FFFDF6` as warm light backgrounds, `#2E2717` for readable body text, `#F8AF12` / `#F9A90C` for sunny accents, `#F45115` for attention, `#007C80` for success states, `#004E7C` for authoritative navy surfaces. | Keeps natural/aviation tension: bird warmth + professional blue. |
| Heading font: **Nunito Sans Extra Bold** | Chosen for a bold, friendly, modern display presence. | Pair with Poppins body for contrast and warmth. |
| Body font: **Poppins Medium** | Warm, modern, friendly, works at all sizes. | Use for everything except headings and data labels. |
| Data/accent font: **IBM Plex Mono** | Adds controlled aviation/tactical flavor for numbers, rates, aircraft IDs. | Do not overuse; keep it functional. |
| Primary differentiators: flexibility, uniform PA28 fleet, instructor choice, lowest RNO rates, cross-country rentals | Captured from interview. These shape what the homepage and copy must communicate. | Cross-country rentals = real-world experience; make this concrete in messaging. |
| Part 61, Reno–Tahoe (RNO) | Regulatory and geographic context. Part 61 supports the flexibility narrative. | Mentioned in copy where it helps the student understand the learning model. |
| Voice avoids LLM/marketing clichés | User explicitly requested. Documented with forbidden phrases and replacement principles. | Will be tested against actual homepage copy later. |
| Retro header / footer treatment (1970s pre-deregulation aviation) | Header and footer go from dark navy to cream-50. Header wordmark uses all-caps Nunito Sans 900. Top-level nav items are color-blocked in 5 shades drawn from the logo palette (gold-500, gold-400, coral, ink, blue-900). Hover state is an inset cream/white border (box-shadow: inset 0 0 0 2px) — stays within header bounds, no layout shift. A coral cheatline (h-1 stripe) runs along the bottom edge of the header. | Evokes Braniff / Southwest / National "Fly Me" era; warm, tactile, non-corporate. Wordmark exception documented in §4 Typography rules. |

---

## 9. Open questions

1. **Logo update timeline:** Will the crest be updated to read "Hornbill Aviation" before launch, or should the website carry the old wording for a period?
2. **Photography availability:** Do real aircraft/instructor/location photos exist, or should we plan a photoshoot and use the crest + approved stock in the meantime?
3. **Tone calibration:** Is the voice in this document the right level of warmth vs. authority? Finalize after reviewing actual page copy.
4. **Accessibility target:** Is WCAG AA the target, or should we aim for AAA for color contrast where possible?
5. **Brand extension:** Will this identity also apply to print materials, apparel, and aircraft livery, or only the website?

---

## 10. Quick reference

```
Page background: #FFF8EC
Card/surface:    #FFFDF6
Body text:       #2E2717
Gold 500:        #F8AF12
Gold 400:        #F9A90C
Coral:           #F45115
Teal:            #007C80
Blue 900:        #004E7C
Muted text:      #827D74
Teal highlight:  #E6F0F0

Headings:        Nunito Sans Extra Bold
Body:            Poppins Medium
Data/labels:     IBM Plex Mono
```
