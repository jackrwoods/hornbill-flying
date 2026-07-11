---
date: 2026-07-11
author: Claude Code (design workflow)
repository: hornbill-flying
related_research:
  - thoughts/shared/research/2026-07-11-hornbill-aviation-website-visual-style.md
  - thoughts/shared/research/2026-06-17-flight-school-website-competitor-and-findability-research.md
  - thoughts/shared/research/2026-06-17-online-marketing-small-business-flight-school.md
  - thoughts/shared/research/2026-06-18-seo-for-small-businesses.md
related_design:
  - thoughts/shared/design/brand_identity_writing_style.md
  - thoughts/shared/design/visual_identity.md
topic: "V2 narrative POV, voice registers, story arcs, symbolism, and CTA integration"
tags: [design, v2, narrative, voice, copy, storyboarding, symbolism]
status: draft
---

> **Launch state — read [`v2-resolutions.md`](./v2-resolutions.md) first.** Several rules in this doc are modified at launch: WebGL cockpit showpiece is post-launch (homepage ships a static sunset-gradient placeholder hero); photography uses sunset-gradient placeholders until real photos are commissioned; reviews/testimonials are suppressed; 3 instructors at launch (Trygve, Joel, Ethan). The full V2 vision below is the target; the launch scope is the subset.

# V2 Narrative & Voice

This document owns storytelling and voice rules for the V2 overhaul of hornbillaviation.com. It extends — and never contradicts — `brand_identity_writing_style.md`. That doc sets the brand's tone; this doc sets how the tone is staged across an immersive, scroll-driven site.

---

## 1. Current State

The live site is a single-page BootstrapMade "Coming Soon" template. Copy is third-person and institutional ("A new flight training center... coming soon to Northern Nevada"). The hero is a hornbill superimposed over Lake Tahoe, dimmed by an 80% black overlay. There is no scroll narrative, no program content, no pricing, no instructor bios, no booking flow. The V1 layout doc (archived) is set aside; V2 starts fresh. What V2 inherits: the voice, the four messaging pillars, the banned-phrase list, and the visual palette. Everything else — narrative structure, POV, scroll choreography, symbolism — is new.

---

## 2. Desired End State

Every page is written and framed from the **first-person cockpit** POV. The visitor is the protagonist; the camera sits in the left seat of a PA28; copy addresses the visitor as "you." Two story pages (Homepage, Discovery Flight) run a cinematic scroll narrative with a WebGL cockpit showpiece on the homepage only. Product pages (Programs, Fleet & Pricing, Instructors, About, Contact, Blog) use the same POV and voice but do not force a narrative arc — they are focused, well-photographed, lightly animated.

Voice operates in two registers, switched by content type, not by page:

- **Grounded** for facts: pricing, FAQ, contact, program details, fleet specs, instructor credentials. The existing brand voice — specific numbers, named places, active voice, no superlatives.
- **Poetic** for story moments: hero, scroll beats, discovery flight narrative, transitions. Short evocative sentences, sensory detail, restraint. Emotion through concreteness, not adjectives.

A persistent **quick-facts strip** (price, phone, address, hours, Part 61, RNO) is anchored to the viewport, grounded only, crawlable first. The primary CTA — **"Book a discovery flight"** — appears on every page, contextualized to the register it sits in.

---

## 3. Existing Patterns (preserve or extend)

| Pattern | Source | Why it survives into V2 |
|---|---|---|
| "You" as the subject of most sentences | `brand_identity_writing_style.md` §5 | V2's first-person cockpit POV is this rule taken literally — the visitor is "you," in the left seat. |
| Lead with the reader's outcome, not the school's offering | `brand_identity_writing_style.md` §5 | Story beats open on what the visitor sees or does, not what Hornbill provides. |
| Specific numbers and named places (PA28-180, $159/hr wet, RNO, Part 61) | `brand_identity_writing_style.md` §5 | Poetic beats stay concrete by leaning on the same specifics — "the Garmin G5 at 4,403 feet," not "modern avionics." |
| CTA verbs: "Book," "See," "Meet," "Start," "Call" | `brand_identity_writing_style.md` §8 | V2's primary CTA "Book a discovery flight" inherits this directly. |
| Imagery mood: "capable, calm, slightly epic — the viewer should feel 'I could do that'" | `visual_identity.md` §5 | Emotional target for every story beat. |
| Color palette, typography tokens, banned-phrase list | `visual_identity.md` §3–4; `brand_identity_writing_style.md` §7 | Unchanged. Poetic copy does not change the palette. The banned list is extended in §4.6. |

---

## 4. New Patterns

### 4.1 The first-person cockpit POV

The camera sits in the left seat of a PA28 looking forward and slightly out the left windscreen. Copy is addressed to the visitor as "you," present tense. The school, instructor, and aircraft are referenced as needed ("Your CFI sits to your right," "The PA28 holds 48 gallons usable").

**Story pages (Homepage, Discovery Flight):** the POV is explicit and sustained. Beats describe what "you" see, touch, hear, and decide. Visuals are framed from the pilot's perspective — panel, windscreen, horizon, ramp.

Story-page example (poetic):
> "You reach for the mixture. The PA28 settles into idle. Ahead, the Sierra fills the windscreen from Pyramid Peak to Jobs Peak. Your CFI nods. The runway is yours."

**Product pages:** the POV is held lightly. Copy addresses the visitor as "you" and frames facts from the pilot's seat, but does not narrate a sequence. There is no scroll arc, no "you reach for the mixture" staging. The POV shows up as direct address and as one framing image per section.

Product-page example (grounded):
> "Private Pilot (PPL) is your first certificate. You train in a PA28-180, fly solo after your instructor signs you off, and take a checkride with an FAA-designated examiner. FAA minimum is 40 hours; most students finish between 55 and 70."

### 4.2 Voice registers — full rules

| Dimension | Grounded | Poetic |
|---|---|---|
| Used for | Pricing, FAQ, contact, program details, fleet specs, instructor credentials, quick-facts strip, nav, button labels, alt text | Hero, scroll beats, discovery flight narrative, transitions, section openers on story pages |
| Sentence length | 12–22 words. One idea per sentence. | 4–14 words. Fragments allowed. |
| Tense | Present, simple | Present; continuous for sensory lines ("the engine is settling"). |
| Subject | "You" or the noun ("The PA28," "The rate"). | "You" almost always. |
| Adjectives | Few, factual ("wet," "dual Garmin G5"). | Almost none. Nouns and verbs carry it. |
| Numbers | Always. "$159/hr wet," "4,403 ft MSL." | Sparingly, only for grounding — "48 gallons," "2,500 feet." |
| Names | Required (RNO, PA28-180, N6576J, Part 61). | One or two per beat, never a list. |
| Metaphor | None. | One per beat, drawn from flight or the Sierra — never from marketing. |
| Exclamation | Never. | Never. |
| Banned phrases | Original list + §4.6 extension. | Same. |

**Switch rule:** the register is chosen by content type, not by paragraph. A pricing table inside a story page is grounded. A transition sentence inside a product page may be one poetic line. When in doubt, default to grounded; poetic is earned, not assumed.

**Before / after — grounded (pricing card):**
- Before (wrong register): "Your journey begins at $159 an hour — the lowest wet rate on the ramp, where the Sierra meets the sky."
- After (grounded): "PA28-180 wet rate: $159/hr for members, $185/hr for non-members. No fuel surcharge. Billed on Hobbs time."

**Before / after — poetic (homepage scroll beat):**
- Before (wrong register): "Hornbill Aviation operates a uniform fleet of four PA28-180s at KRNO with dual Garmin G5 avionics on two aircraft."
- After (poetic): "Four PA28s. Two with dual Garmin G5. Same cockpit, same handling, every time you fly."

**Before / after — register break inside a product page (PPL):**
- Before (wrong place): "The horizon tilts as you bank toward your first solo — the moment the runway becomes yours."
- After (grounded): "You solo after your instructor endorses you and signs you off for the flight. Most students solo between 15 and 25 hours."

### 4.3 Story page — Homepage scroll storyboard

The homepage runs 8 beats. Each beat has a scroll position, a visual, a copy intent, an emotional goal, and (if any) a CTA. The WebGL cockpit showpiece is beat 2; no other page uses WebGL.

| # | Scroll position | Visual | Copy intent (register) | Emotional goal | CTA |
|---|---|---|---|---|---|
| 1 | Hero (0%) | Full-bleed blue-hour ramp shot at KRNO, PA28 tied down, Sierra on the horizon. Cream panel lower-left with wordmark. | One line: "You in the left seat. The Sierra out the windscreen." (poetic) | Calm capability. "I could do that." | Primary: "Book a discovery flight." Secondary: "See the fleet." |
| 2 | Cockpit reveal (≈12%) | WebGL pannable PA28 cockpit interior from the left seat. As visitor scrolls, gaze drifts across the panel, out the windscreen, toward Tahoe on the horizon. | One line per gaze stop: "The panel you'll learn first." / "The horizon you'll aim for." (poetic, 2–3 lines total) | Tactile intimacy with the aircraft. | None. Let the scroll carry. |
| 3 | The school (≈28%) | Cream card on a quiet ramp photo. | Grounded paragraph: Part 61 at RNO, four PA28-180s, instructor choice, cross-country rentals. 2 sentences. | "This is a real school, not a fantasy." | Text link: "Read about the school." |
| 4 | The fleet (≈42%) | Four aircraft cards, tail numbers visible, dual Garmin G5 called out on N6576J and N7824W. | Grounded: "Same cockpit. Same handling. Two with dual Garmin G5 and WAAS GPS." | Predictability. | Primary: "See fleet and rates." |
| 5 | The rates (≈55%) | One quiet line on cream: "$159/hr wet for members." | Grounded, one line. No table here — the table lives on the Fleet & Pricing page. | Value without crowing. | Text link: "See all rates." |
| 6 | The place (≈68%) | Golden-hour photo flying past Tahoe south shore, shot from inside the cockpit. | Poetic, 2 lines: "Lake Tahoe from 2,500 feet. A cross-country you can actually take." | "I want to fly there." | None. |
| 7 | The instructors (≈80%) | One instructor headshot, named, with credentials shorthand. Rotate on load. | Grounded: "Sarah Martinez, CFI/CFII, 2,100 hours. You pick her, or bring your own." | Trust through a real person. | Text link: "Meet the instructors." |
| 8 | The close (≈92%) | Back to the ramp, blue hour, PA28 tied down. Quick-facts strip visible above. | Poetic, 1 line: "Your first flight is $199. No deposit. Book it today." | Decision. | Primary, full-width: "Book a discovery flight." |

### 4.4 Story page — Discovery Flight scroll storyboard

The Discovery Flight page is the #1 conversion page. The booking flow (calendar → name/email → Apple Pay → confirmation) is a dynamic client-side component layered on top of the story. It must be reachable in under 3 clicks and under 60 seconds on mobile. The story must not block the booking; the booking must not break the story. 8 beats:

| # | Scroll position | Visual | Copy intent (register) | Emotional goal | CTA |
|---|---|---|---|---|---|
| 1 | Hero (0%) | First-person cockpit shot, hand on the yoke, windscreen showing the runway numbers. | Poetic, 1 line: "Your first lesson. You fly." | Resolve. | Primary: "Book a discovery flight — $199." |
| 2 | What it is (≈12%) | Cream card. | Grounded, 3 sentences: "A discovery flight is your first lesson. You sit in the left seat, handle the controls, and fly. 45–60 minutes in the air, no commitment." | Reassurance. | None. |
| 3 | The pre-brief (≈25%) | Instructor and student at a table, sectional chart open. | Poetic, 2 lines: "Fifteen minutes on the ground first. Your CFI shows you the panel, the route, the plan." | "I know what will happen." | None. |
| 4 | The flight (≈40%) | Windscreen shot over the numbers, rolling. | Poetic, 2 lines: "You roll. You rotate. The runway falls away and the Sierra takes its place." | The moment of flight. | None. |
| 5 | The controls (≈55%) | Close on the yoke and throttle, student's hand. | Poetic, 1 line: "Your hands on the controls. Your CFI to your right." | "I am flying." | None. |
| 6 | The debrief (≈70%) | Back on the ramp, engine off, two people talking by the wing. | Poetic, 2 lines: "Ten minutes back on the ground. What you did well, what comes next." | "This is a real path." | None. |
| 7 | The booking (≈82%) | The booking component: calendar, name/email, Apple Pay. Quiet card on cream. | Grounded, 1 line above the form: "$199, no deposit. Pick a time." | Action without pressure. | The booking component itself is the CTA. |
| 8 | The close (≈94%) | Blue-hour ramp. Quick-facts strip visible. | Poetic, 1 line: "Today you decided to fly." | Quiet conviction. | Text link: "Questions? Call or text." |

### 4.5 Product pages — POV without an arc

Product pages hold the POV lightly: direct address ("you"), one framing image per section from the pilot's perspective, grounded register for all facts. A single poetic line is allowed per section as an opener; after that, grounded. No scroll arc, no WebGL, no sequence of events.

**Worked example — Private Pilot (PPL) page:**

Section 1 — Header
- Image: first-person panel shot, dual Garmin G5 visible.
- Poetic opener (1 line): "Your first certificate. The one that lets you take a passenger anywhere in the country."
- Grounded subhead: "Private Pilot (PPL) at Hornbill Aviation, RNO."

Section 2 — What it is (grounded): "PPL is your first pilot certificate. You train in a PA28-180, fly solo after your instructor endorses you, and pass a checkride with an FAA-designated examiner. FAA minimum is 40 hours; most Hornbill students finish between 55 and 70."

Section 3 — What you'll do (grounded, parallel list):
- "Learn the panel and the PA28's systems."
- "Fly the traffic pattern at KRNO."
- "Solo in the practice area."
- "Fly two cross-countries, one solo."
- "Pass the FAA knowledge test and the checkride."

Section 4 — Time and cost (grounded, table):
| Item | Hours | Cost |
|---|---|---|
| Aircraft (PA28-180, member wet rate) | 60 | $9,540 |
| Instructor | 40 | $2,800 |
| Ground, materials, knowledge test, checkride | — | $1,200 |
| **Typical total** | — | **~$13,540** |

Below: "Your actual total depends on how often you fly and how fast you pick it up. Members fly more for less."

Section 5 — The aircraft (grounded): "You train in a PA28-180. Four in the fleet, all similarly equipped. Two — N6576J and N7824W — have dual Garmin G5 and WAAS GPS. Switch between them and the panel feels the same."

Section 6 — FAQ (grounded, FAQPage schema):
- "How long does it take?" — "Part 61 lets you set the pace. Two flights a week finishes most students in four to six months."
- "Do I need a medical?" — "Yes, a third-class FAA medical or a BasicMed check. We help you figure out which."
- "Can I fly at night?" — "Yes, after you meet the night-training requirements."

Section 7 — CTA (grounded): Primary button "Book a discovery flight." Text link "See fleet and rates."

Absent: no "the horizon tilts," no "your wings await," no scroll-driven reveal, no WebGL. The POV shows up only as direct address and a framing image. The page is fast, crawlable, and answer-engine-friendly.

### 4.6 V2 avoid-list (extends the banned-phrase list)

Add these to the existing banned list. They are V2-specific patterns the implementing LLM must not produce.

1. "Cockpit of your dreams"
2. "Take to the skies"
3. "The world below"
4. "Your wings await"
5. "The freedom of flight"
6. "Born to fly"
7. "Slip the surly bonds" (or any citation of High Flight)
8. "Leave the ground behind"
9. "The thrill of flight"
10. "Pilot in command of your life"
11. "Chart your course" (as a life metaphor)
12. "Your aviation journey"
13. "The sky is calling"
14. "Defy gravity"
15. "Unleash your inner pilot"
16. "From passenger to pilot"
17. "The magic of flight"
18. "Where dreams take flight"
19. "Above it all"
20. "Your first flight of many"
21. "The cockpit awaits"
22. "Feel the freedom of the open sky"
23. "Every pilot remembers their first flight"
24. "Join the ranks of pilots"

If a phrase is not on either list and feels like marketing, do not use it. Rule of thumb: if a real CFI would not say it to a nervous prospective student across the desk, cut it.

### 4.7 Emotional beat taxonomy

Named beats the story pages cycle through. Each comes with a copy example in the poetic register. Use the name in internal docs; never expose the name to the visitor.

| Beat name | Emotional target | Copy example (poetic) |
|---|---|---|
| The moment of decision | Resolve before action | "You've thought about this for years. Today you book it." |
| The pre-brief | "I know what will happen" | "Fifteen minutes on the ground. Your CFI shows you the panel, the route, the plan." |
| The first touch of the controls | Tactile intimacy | "Your hand on the yoke. The weight of it is real." |
| The engine start | Mechanical trust | "The Lycoming turns. Oil pressure climbs. The panel comes alive." |
| The takeoff roll | Acceleration, commitment | "You roll. You rotate. The runway falls away." |
| The horizon reveal | "I am flying" | "The Sierra fills the windscreen. You are in the air." |
| The bank | Control, joy held quietly | "You bank left. The horizon tilts. The lake appears under the wing." |
| The cross-country | Real-world experience | "Two hours north. A real trip, a real destination, a real lunch." |
| The approach | Calm competence | "You line up on the numbers. The runway rises to meet you." |
| The debrief | "This is a real path" | "Ten minutes back on the ground. What you did well, what comes next." |
| The quiet close | Settled conviction | "Today you decided to fly." |

### 4.8 CTA integration — "Book a discovery flight" everywhere

The single primary CTA across the site is **"Book a discovery flight."** It appears on every page. Context changes; the verb and the destination do not.

| Context | CTA form | Register |
|---|---|---|
| Homepage hero / close | Primary button, full-width | Poetic line allowed above |
| Discovery Flight hero | Primary button with price: "Book a discovery flight — $199" | Poetic line above |
| Discovery Flight booking beat | The booking component itself is the CTA | Grounded line above |
| Product page header / footer | Primary button | Grounded |
| Quick-facts strip | Text link "Book a discovery flight" | Grounded, always visible |
| Nav (desktop & mobile) | Button "Book a discovery flight" | Grounded, persistent |

Rules:
- Never vary the verb. Not "Schedule," not "Reserve," not "Start." Always "Book."
- The object is always "a discovery flight" (with the article). Do not abbreviate to "Book now."
- Secondary CTAs are named in the storyboards ("See the fleet," "See fleet and rates," "Meet the instructors," "Read about the school," "Questions? Call or text"). They never displace the primary.
- A CTA never appears under a poetic line that contradicts the action. No "Your wings await — Book a discovery flight." The line above a CTA is either grounded or a poetic line about the next concrete step.

### 4.9 Quick-facts strip — grounded, always

The quick-facts strip is anchored to the viewport, reachable without scrolling through the story. Grounded only. No poetic lines, no flourishes.

Contents (left to right, horizontal scroll on mobile):
- **Part 61** (IBM Plex Mono label)
- **RNO**
- **Discovery flight $199** (with "Book" link)
- **PA28-180 $159/hr wet, members** (with "See rates" link)
- **Open daily 8a–5p**
- **1008 Gentry Way, Reno, NV 89512**
- **Call or text** (phone link, number TBD)

Rules:
- Numbers and NAP are identical to schema markup and the Contact page. Drift breaks local SEO; automated diff on every build.
- Visible on story and product pages. On the homepage hero it can collapse to a thin bar; it expands on scroll.
- First thing a screen reader encounters after the skip link. Not hidden behind a toggle.
- Crawlable in the underlying HTML before the immersive story. Crawlers and assistive tech see the facts first.

---

## 5. Resolved Design Decisions

| # | Decision | Rationale | Source |
|---|---|---|---|
| 1 | First-person cockpit POV site-wide | Makes the visitor the protagonist; matches the brand's "you" rule literally; differentiates from third-person competitor copy. | V2 §3; brand doc §5 |
| 2 | Two registers switched by content type, not by page | Keeps facts crawlable and AEO-citable while letting story moments breathe. | V2 §4.2 |
| 3 | WebGL on Homepage only | One showpiece preserves CWV budget (LCP ≤ 2.0s, INP ≤ 200ms, CLS ≤ 0.1) and keeps product pages fast. | V2 §4; SEO research |
| 4 | "Book a discovery flight" is the single primary CTA everywhere | Discovery flight is the #1 conversion page; one verb across the site reduces friction. | Competitor research |
| 5 | Quick-facts strip is grounded only, crawlable first | SEO + progressive disclosure: crawlers and screen readers see facts before the story. | V2 §6; SEO research |
| 6 | Hornbill and Sierra/Tahoe are the only throughline symbols | Keeps symbolism restrained and on-brand; no logbook motif, no cheat-line seam. | V2 §5 |
| 7 | No cartoon hornbill, no mascot, no sunset-over-Tahoe cliché | Preserves "capable, calm, slightly epic" mood; prevents kitsch. | V2 §4.7; visual identity §5 |
| 8 | Product pages use the POV lightly, no narrative arc | Keeps product pages fast, scannable, and AEO-citable. | V2 §7 |
| 9 | Banned-phrase list extended with 24 V2-specific entries | Aviation clichés proliferate in immersive copy; the list is the implementing LLM's hard constraint. | V2 §4.6 |
| 10 | Poetic register tightens to 4–14 words per line | Short lines make scroll beats feel cinematic rather than explanatory. | V2 §4.2 |

---

## 6. Open Questions

1. **Phone number.** NAP shows "phone TBD." The quick-facts strip, nav, and Discovery Flight close all need a real number before launch. Which number is canonical — the existing GBP or a new call-tracking line?
2. **Instructor names.** Homepage beat 7 and the Instructors page both need real named CFIs with credentials shorthand and certificate numbers for E-E-A-T. Which instructors are confirmed for launch, and are full name + CFI certificate number cleared for public use?
3. **Photography.** The storyboards assume real RNO/Sierra golden-hour and blue-hour photography from the pilot's perspective. What is the photo budget and shoot schedule, and the fallback if real photography is not ready (approved stock from a named photographer, never AI-generated)?
4. **WebGL cockpit asset.** The homepage showpiece needs a PA28 interior model accurate to the fleet (dual Garmin G5 on two of four aircraft). Is there a 3D scan or photogrammetry source, or does the model need to be built? What is the polygon/texture budget to hold LCP ≤ 2.0s on mobile?
5. **Booking backend.** The Discovery Flight booking component hits a custom API backend. Which platform (Flight Schedule Pro, Aviatize, Roverd, custom) is the backend, and what is the API contract?
6. **Quick-facts strip on mobile.** Does the strip collapse to a horizontal scroll, a "facts" tap, or always show the three highest-priority facts (Part 61, RNO, $199 discovery flight)?
7. **Rotating instructor on homepage beat 7.** Rotation implies more than one confirmed instructor. If only one is launch-ready, does this beat become static?
8. **Tone calibration with the client.** The poetic register is new territory. Are 4–14-word lines acceptable, or does the client want a higher floor (e.g., 8–16)?

---

## 7. Multilayer Validation Requirements

Validation happens at five layers. Each layer has a concrete check; a layer is not done until its check passes.

### Layer 1 — Copy lint (automated, pre-merge)
- **Banned-phrase scan.** Grep all copy (including alt text, button labels, schema string fields) against the original banned list plus §4.6. Any hit fails the build. Pre-commit hook + CI.
- **Register sentence-length scan.** For `poetic` blocks, flag lines over 14 words. For `grounded` blocks, flag sentences over 22 words. Warnings, not failures; zero warnings on merge to main.
- **"You" subject scan.** In story-page copy, at least 60% of sentences have "you" as subject or object. Below 60% = rewrite.

### Layer 2 — Semantic HTML and a11y (per page)
- **Quick-facts strip is first in the DOM** after the skip link, before any story content. Verify by viewing source, not by visual position.
- **One H1 per page.** Program pages: "Private Pilot (PPL) at Hornbill Aviation, RNO." The H1 is the topic, not a poetic flourish.
- **All CTAs are real links or buttons** with accessible names equal to the visible label ("Book a discovery flight," never "Book now" in code).
- **Reduced-motion.** With `prefers-reduced-motion: reduce`, all scroll-driven transforms are replaced by static sections in DOM order; the WebGL showpiece is replaced by a static first-person cockpit image. Verify with the OS setting on.
- **Keyboard.** Tab through every story page: quick-facts strip first, then the primary CTA, then story content. No keyboard trap in the WebGL canvas (canvas is not focusable; scroll proceeds with keyboard).
- **Screen reader.** VoiceOver the homepage. The quick-facts strip announces as a list of facts. The WebGL canvas has a single `aria-label` ("Panorama of the PA28 cockpit interior from the left seat") and no live region.

### Layer 3 — SEO and AEO (per page, pre-deploy)
- **Schema validates.** LocalBusiness + EducationalOrganization on homepage; Service + Course + FAQPage on program pages. Google Rich Results Test: zero errors, zero unresolved warnings.
- **Citable sentences.** Each program page and the FAQ page has at least one grounded-register citable factual statement (e.g., "Hornbill Aviation is a Part 61 flight school at KRNO offering PPL, IR, and CPL training in a uniform PA28-180 fleet."). No citable sentence uses a banned phrase or a superlative.
- **NAP consistency.** Quick-facts strip NAP matches schema NAP and Contact page NAP character-for-character. Automated diff on every build.
- **Headings hierarchy.** One H1, then H2s in DOM order, no skipped levels. Lighthouse SEO audit scores 100.

### Layer 4 — Performance (per page, pre-deploy)
- **Core Web Vitals (field).** LCP ≤ 2.0s, INP ≤ 200ms, CLS ≤ 0.1 on mobile, measured via CrUX. Lab: Lighthouse mobile LCP ≤ 2.5s, CLS ≤ 0.1, TBT ≤ 200ms.
- **Homepage WebGL budget.** The cockpit scene loads after first paint and never blocks LCP. The LCP element is the hero image (blue-hour ramp shot), not the canvas. Canvas initializes on idle; on low-power devices or `prefers-reduced-motion`, the static image stays and the canvas never mounts.
- **Image budget.** Hero and beat images are AVIF with WebP fallback, under 100KB each, explicit `width`/`height`, `fetchpriority="high"` on the LCP image only. Below-the-fold images lazy-load.
- **Fonts.** Nunito Sans, Poppins, IBM Plex Mono load with `font-display: swap`, preloaded only for critical families. No layout shift from fonts (CLS contribution 0).

### Layer 5 — Voice and narrative (per story page, manual review)
- **Beat coverage.** Homepage runs all 8 beats in order; Discovery Flight runs all 8 beats in order. Each beat has its visual, copy intent, emotional goal, and (if any) CTA, matching §4.3 and §4.4.
- **POV holds.** No story-page copy refers to the visitor in the third person. No product-page copy stages a sequence of events ("you roll, you rotate") — that staging is reserved for story pages.
- **Symbolism restraint.** The hornbill appears only in the wordmark and the brand crest (no cartoon, no mascot, no repeated decorative use). The Sierra/Tahoe landscape appears in photography and in one or two poetic lines per story page, never as a generic sunset-over-Tahoe cliché. No logbook motifs anywhere. No cheat-line seam used as a throughline symbol.
- **CTA consistency.** "Book a discovery flight" appears on every page with the exact verb and object. The quick-facts strip and the nav carry it. Secondary CTAs do not displace it.
- **Read-aloud test.** A real CFI reads the homepage and the Discovery Flight page aloud. If they would not say a line to a nervous prospective student, the line is rewritten. This is the final gate.