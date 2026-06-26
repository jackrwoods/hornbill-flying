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

The circular hornbill crest (`logo.jpeg`) is the anchor asset. It combines:

- A hornbill in flight, holding a propeller
- A sunburst behind mountains
- Rope and nautical/aviation insignia styling
- A dark navy surround with gold and cream lettering
- The words "Hornbill Flying Club" and "Est. 2026"

### Name vs. logo wording

The website and public brand name is **Hornbill Aviation**. The logo currently reads "Hornbill Flying Club". Until the wordmark is updated, use the crest as-is for hero/brand moments and pair it with the text name "Hornbill Aviation" so search and signage stay coherent. Treat the crest as the visual symbol; do not crop or edit it to remove the word "Club".

### Logo usage rules

- **Clear space:** keep the height of the letter "H" in "Hornbill" as minimum clear space on all sides.
- **Backgrounds:** place on light cream, white, navy, or photo backgrounds with sufficient contrast. Avoid placing over busy sky/busy terrain without a subtle overlay.
- **Minimum size:** 80 px wide on screen; 1 inch wide in print.
- **Don't:** stretch, recolor, add drop shadows, rotate, or place inside another shape.

---

## 3. Color system

Derived directly from the hornbill bird and the existing crest. The palette balances the natural drama of the hornbill (deep blue-black, warm gold, bright orange) with the clarity required for an aviation training website.

### Primary colors

| Token | Hex | Usage |
|-------|-----|-------|
| `navy-900` | `#0B1C2C` | Primary headings, primary buttons, nav bar background, footer background |
| `navy-800` | `#142A3D` | Secondary surfaces, card borders, hover states |
| `cream-50` | `#F7F4EC` | Page background, logo-safe background, light sections |
| `white` | `#FFFFFF` | Content cards, form fields, contrast text on dark |

### Accent colors

| Token | Hex | Usage |
|-------|-----|-------|
| `gold-500` | `#C89F4F` | Primary CTA highlights, icon fills, badge backgrounds, key links |
| `gold-400` | `#DDB970` | Hover states, subtle highlights, dividers |
| `orange-500` | `#E87A2A` | Alert/attention moments, hornbill beak accent, active nav state |
| `orange-400` | `#F2954F` | Hover on orange elements, progress indicators |

### Functional colors

| Token | Hex | Usage |
|-------|-----|-------|
| `ink` | `#1A1A1A` | Body text on light backgrounds |
| `ink-light` | `#5A6573` | Secondary/body-supporting text, captions, metadata |
| `sky-100` | `#E3EFF7` | Callout boxes, info banners, soft aviation reference |
| `success` | `#2D7A46` | Form success, availability indicators |
| `error` | `#B52B2B` | Form errors, warnings |

### Color combinations

| Context | Background | Text / Accent | Notes |
|---------|------------|---------------|-------|
| Hero / dark section | `navy-900` | `cream-50` text, `gold-500` accents | High authority, trust |
| Body content | `cream-50` | `ink` text, `navy-900` headings, `gold-500` CTAs | Readable, warm |
| White cards | `white` | `ink` text, `navy-900` headings, `gold-500` links | Clean, modern |
| Highlight strip | `gold-500` | `navy-900` text | Use sparingly for CTAs |
| Attention / CTA alt | `orange-500` | `white` text | For time-sensitive or action prompts |

### Accessibility notes

- `gold-500` on `navy-900`: passes WCAG AA for large text and UI components.
- `gold-500` on `cream-50` or `white`: does **not** pass AA for normal text. Use `navy-900` for text, `gold-500` only for icons, borders, and large buttons with navy text.
- `orange-500` on `white`: passes AA for large text; use for buttons, not long paragraphs.
- Body text should stay `ink` on `cream-50` or `white`.

---

## 4. Typography

Principles: easy to read first, inspirational second, aviation-appropriate third. Type should feel clean, confident, and slightly aspirational — like a flight school that takes safety seriously but still makes flying feel like an adventure.

### Font families

| Role | Font | Fallback | Rationale |
|------|------|----------|-----------|
| Headings | **Instrument Serif** | Georgia, serif | Elegant, editorial, slightly technical without being cold. Named after aircraft instruments — subtle aviation tie. |
| Body | **Inter** | system-ui, sans-serif | Highly legible, modern, friendly. Workhorse for schedules, pricing, forms, long content. |
| Accent / labels / numbers | **IBM Plex Mono** | Courier New, monospace | Aviation-tactical feel for flight hours, aircraft IDs, route names, stats, and small labels. Use sparingly. |

### Web loading

- Instrument Serif and Inter load from Google Fonts.
- IBM Plex Mono loads only if UI uses data labels, aircraft identifiers, or pricing tables.
- Consider a single request: `https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap`

### Type scale

| Style | Font | Size | Line height | Weight | Usage |
|-------|------|------|-------------|--------|-------|
| H1 | Instrument Serif | 48–64 px / 3–4 rem | 1.1 | 400 | Hero page titles |
| H2 | Instrument Serif | 36–48 px / 2.25–3 rem | 1.15 | 400 | Section titles |
| H3 | Instrument Serif | 24–32 px / 1.5–2 rem | 1.2 | 400 | Sub-sections, card titles |
| H4 | Inter | 18–20 px / 1.125–1.25 rem | 1.3 | 600 | Labels, smaller headers |
| Body | Inter | 16–18 px / 1–1.125 rem | 1.6 | 400 | Paragraphs, descriptions |
| Body small | Inter | 14 px / 0.875 rem | 1.5 | 400 | Captions, metadata, disclaimers |
| Label / data | IBM Plex Mono | 13–14 px / 0.8125–0.875 rem | 1.4 | 500 | Aircraft type, hours, rates, route codes |
| Button | Inter | 14–16 px / 0.875–1 rem | 1 | 600 | All buttons |

### Typography rules

- Headings can use sentence case or title case, but be consistent. Prefer sentence case for a friendlier tone: *"Start your flight training"*.
- Avoid all-caps except for IBM Plex Mono data labels and small UI badges.
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
- Avoid cartoonish clip-art aviation icons. Use clean, thin-stroke icons in `navy-900` or `gold-500`.

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
| Primary | `navy-900` | `white` | Main conversion action |
| Secondary | `gold-500` | `navy-900` | Supporting action, standout but less dominant |
| Tertiary | transparent, `navy-900` border | `navy-900` | Low-priority, ghost action |
| Accent | `orange-500` | `white` | Time-sensitive / limited availability |

### Links

- Default: `navy-900`, underline on hover.
- Inline links on dark backgrounds: `gold-400`.
- Active/selected: `orange-500`.

### Cards

- White or cream background, subtle shadow, rounded 8–12 px corners.
- Accent top border in `gold-500` for featured/pricing cards.

### Forms

- Inputs: `white` background, `navy-900` border, `ink` text.
- Focus ring: `gold-500`.
- Error state: `error` red, `error` text.
- Labels: `Inter 600`, `ink`.

### Badges / tags

- `gold-500` background with `navy-900` text for status tags: "Available now," "Part 61."
- `sky-100` background with `navy-900` text for informational tags: "Cross-country ready."

---

## 8. Design decisions log

| Decision | Rationale | Notes |
|----------|-----------|-------|
| Website name is **Hornbill Aviation** | User confirmed; more inclusive of training-center positioning than the logo's "Flying Club." | Logo will be updated separately; keep using crest for now. |
| Color palette pulled from hornbill + crest | Deep navy from the bird's plumage and crest surround; gold from the crest rope and accents; orange from the hornbill's beak. | Keeps natural/aviation tension: bird warmth + professional navy. |
| Heading font: **Instrument Serif** | Chosen for legibility first, subtle aviation reference second (aircraft instruments), elegance third. | Pair with Inter body for contrast and readability. |
| Body font: **Inter** | Highly readable, modern, friendly, works at all sizes. | Use for everything except headings and data labels. |
| Data/accent font: **IBM Plex Mono** | Adds controlled aviation/tactical flavor for numbers, rates, aircraft IDs. | Do not overuse; keep it functional. |
| Primary differentiators: flexibility, uniform PA28 fleet, instructor choice, lowest RNO rates, cross-country rentals | Captured from interview. These shape what the homepage and copy must communicate. | Cross-country rentals = real-world experience; make this concrete in messaging. |
| Part 61, Reno–Tahoe (RNO) | Regulatory and geographic context. Part 61 supports the flexibility narrative. | Mentioned in copy where it helps the student understand the learning model. |
| Voice avoids LLM/marketing clichés | User explicitly requested. Documented with forbidden phrases and replacement principles. | Will be tested against actual homepage copy later. |

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
Primary navy:    #0B1C2C
Secondary navy:  #142A3D
Cream:           #F7F4EC
Gold:            #C89F4F
Orange:          #E87A2A
Body text:       #1A1A1A
Muted text:      #5A6573
Sky highlight:   #E3EFF7

Headings:        Instrument Serif
Body:            Inter
Data/labels:     IBM Plex Mono
```
