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
  - thoughts/shared/design/visual_identity.md
  - thoughts/shared/design/brand_identity_writing_style.md
topic: "V2 visual language and motion grammar for hornbillaviation.com"
tags: [design, v2, visual-system, motion, webgl, scroll-driven, accessibility, performance]
status: draft
---

> **Launch state — read [`v2-resolutions.md`](./v2-resolutions.md) first.** The WebGL cockpit showpiece described here is **post-launch** — no 3D cockpit asset is available, and none is expected for a while. At launch the homepage hero is a static sunset-gradient placeholder box (warm gold-to-coral-to-blue-900), swapped for a real graded cockpit photo when photography is commissioned. All image slots use sunset-gradient placeholders at launch. The motion grammar, color system, typography rules, and reduced-motion fallbacks below still apply; the WebGL-specific sections are post-launch.

# Hornbill Aviation — V2 Visual & Motion System

This document owns the visual language and motion grammar for the V2 overhaul. It defines how the site looks and moves across both registers — STORY pages (Homepage, Discovery Flight) and PRODUCT pages (Programs, Fleet & Pricing, Instructors, About, Contact, Blog). The implementing LLM should not need to ask follow-up questions; every rule here is concrete and actionable.

The narrative point of view is first-person cockpit: the visitor sits in the left seat. Every visual and motion decision reinforces that the visitor is the protagonist, looking out through the windscreen.

---

## 1. Current State

The live site (`hornbillaviation.com` as of 2026-07-11) is a BootstrapMade "ComingSoon" template — a full-screen hornbill-over-Tahoe photo under an 80% black scrim, white Raleway/Roboto/Poppins type, a single `#f69500` accent, AOS `fade-up` entrances, and a `background-attachment: fixed` parallax on desktop. There is no scroll-driven story, no WebGL, no motion grammar, no reduced-motion path beyond disabling AOS under 768px. The repo's Next.js codebase (`globals.css`) has the V1 brand tokens wired: the two-layer palette/intent system, `Nunito Sans 800` / `Poppins 500` / `IBM Plex Mono`, and two scrim utilities (`.bg-hero-scrim`, `.bg-pageheader-scrim`) that currently render as flat 50–55% black overlays rather than the gradients the brand doc describes.

V1 motion: smooth-scroll, hover transitions at 0.3–0.5s, AOS fade-ups, fixed-background parallax. No named motion vocabulary, no easing system, no scroll-scrubbed timelines, no pinned sections.

## 2. Desired End State

V2 is a cinematic, scroll-driven site with ONE WebGL showpiece (homepage only). The visual language is uniform across both registers; only the narrative ambition differs.

**Story pages** (Homepage, Discovery Flight) behave like Apple product pages: pinned sections, scroll-scrubbed timelines, parallax layers, full-bleed photographic transitions, kinetic typography, and the WebGL cockpit showpiece driving the homepage hero-to-story handoff. The visitor scrolls and the world moves — gaze drifts across the panel, lifts to the windscreen, settles on the Tahoe horizon.

**Product pages** are calmer: well-photographed, lightly animated, no scroll-narrative arc. Same color, type, and motion tokens, but motion is limited to entrance reveals, hover responses, and small parallax. No pinned sections, no scrubbed timelines, no WebGL.

Across both registers: a persistent "quick facts" strip anchored to the viewport (price, phone, address, hours, Part 61, RNO) so SEO-relevant facts are reachable without scrolling the story. Underlying HTML carries all facts first; the immersive layer renders on top.

**Performance contract:** LCP ≤ 2.0s, INP ≤ 200ms, CLS ≤ 0.1 (CrUX field data). The WebGL showpiece never blocks LCP; its JS+assets idle-load after LCP and only on capable devices.

**Accessibility contract:** WCAG 2.2 AA. Every motion pattern has a reduced-motion fallback that conveys the same information and emotional intent without motion. The WebGL scene has a keyboard pan/tilt model, a pause mechanism, and a real-text scene description for screen readers.

## 3. Existing Patterns

Preserve and extend from V1 / brand docs:

- **Two-layer token system** (`--palette-*` raw, `--color-*` intent). V2 extends the intent layer with immersive-mode tokens; it does not rename existing ones.
- **Scrim utilities** `.bg-hero-scrim` and `.bg-pageheader-scrim` — keep the names, but redefine them as real multi-stop gradients (see §New Patterns). The current flat 50% overlays do not survive V2.
- **Typography stack:** Nunito Sans 800 (headings), Poppins 500 (body), IBM Plex Mono 500 (data/labels). Sentence case. Tabular nums for pricing and aircraft data.
- **Retro header/footer:** cream-50 backgrounds, color-blocked nav, coral cheatline. These remain. The cheatline is a header detail, not a throughline symbol — do not extend it into page content as a motif.
- **Imagery preference:** real RNO/Sierra photography at golden hour and blue hour, real aircraft, real instructors. Avoid stock. Avoid harsh midday except technical cockpit shots.
- **Voice registers:** Grounded (facts) and Poetic (story moments). Visual motion follows the same split: fact surfaces are static or lightly revealed; story surfaces move.

## 4. New Patterns

### 4a. Cinematic scroll-driven motion grammar

Named patterns. Each is defined by: trigger, what moves, duration/easing, register (story-only or both), and reduced-motion fallback.

| Name | Register | Trigger | What moves | Easing/Duration |
|---|---|---|---|---|
| `horizon-reveal` | both | intersection (0.4) | foreground photo lifts 12–20px and fades from 0.6→1.0 opacity as section enters; horizon line stays fixed | `ease-out`, 0.6s |
| `panel-pass` | story | scroll position (scrubbed) | a full-bleed panel slides laterally 20–40% across viewport as user scrolls 100% of the pinned section | scrubbed, no easing (linear to scroll) |
| `wing-tilt` | story | scroll position (scrubbed) | an image/element rotates on the Z axis ±3° as the section scrolls through its pin range | scrubbed |
| `compass-rotate` | story | scroll position (scrubbed) | a sectional-chart motif or compass rose rotates 0→90° across a pinned section | scrubbed |
| `altitude-lift` | story | scroll position (scrubbed) | text block translates Y -40px→0 and opacity 0→1 across 80% of the pin range | scrubbed |
| `runway-recede` | story | scroll position (scrubbed) | background image scales 1.0→1.12 and translates Y 0→-8% (receding runway feel) | scrubbed |
| `glide-entrance` | both | intersection (0.2) | element enters from Y+24px, opacity 0→1 | `ease-out-quart`, 0.5s |
| `gaze-drift` | story (WebGL) | scroll position (scrubbed) | camera tilt/pan inside the cockpit scene follows scroll 0→1 across the hero pin range | scrubbed |
| `beak-flash` | both | hover (interactive elements only) | gold-500 underline or icon fill animates width 0→100% | `ease-out`, 0.2s |

**Concrete example — story page (Homepage hero → "you in the left seat"):**
A pinned section of 200vh. Scroll progress 0→1 maps to: `gaze-drift` (camera lifts from panel to windscreen to horizon), `runway-recede` (background windscreen photo scales 1.0→1.08), `altitude-lift` (hero headline fades and lifts out as the second beat's subhead fades and lifts in at progress 0.5). At progress 1.0 the section unpins and the next section (`horizon-reveal`) enters.

**Concrete example — product page (Fleet & Pricing):**
No pinned sections. Each aircraft card uses `glide-entrance` on intersection. The fleet photo at top of page uses `horizon-reveal`. Hover on a rate row triggers `beak-flash` underline. That is the entire motion budget for this page.

Rules:
- Story pages may use all patterns. Product pages may use only `horizon-reveal`, `glide-entrance`, and `beak-flash`.
- Never animate `width` or `height` of layout-affecting boxes (CLS). Animate `transform` and `opacity` only.
- Scrubbed timelines use `transform` + `opacity` exclusively, driven by `scroll` progress via Framer Motion `useScroll` or native `scroll-timeline` CSS where supported.
- No two scrubbed transforms on the same element in the same direction.

### 4b. WebGL cockpit showpiece — full spec

**Scope:** Homepage only. One scene. Never loaded on any other page.

**Scene composition:** Left-seat interior of a PA28-180. Visible elements: the dash panel with the dual Garmin G5 stack (reference N6576J), the yoke, the windscreen frame, the right-seat coaming, and through the windscreen the ramp, runway, and the Sierra with Lake Tahoe toward the horizon. Golden-hour lighting, warm directional key from the left (sun coming through the pilot's window), soft fill from above. Color temperature ~3200K warm key against a ~5500K sky for contrast.

**Asset approach — pick one, prefer (1):**
1. **High-fidelity CGI model** (recommended): Blender/Substance-authored PA28 cockpit interior, exported as glTF (draco-compressed). Pros: full camera freedom, perfect golden-hour relight, no chromatic aberration, small payload, reusable. Cons: one-time artist commission, risk of looking synthetic if under-graded.
2. **Stitched 360° photo sphere shot in the real aircraft**: pros: indisputable authenticity; cons: fixed camera node (rotation only, no real drift), chromatic aberration near seams, exposure locked at capture, large payload (8K equirect ≥ 4MB even as KTX2).

V2 ships the CGI model. If not ready by launch, ship the static graded hero image (see fallbacks) — do not ship the photo sphere as the primary experience; it compromises the camera path.

**Camera path (scroll-driven, scrubbed 0→1 across a 200vh pin):**
- 0.00: gaze rests on the instrument panel (camera pitched -12°, yaw 0°, FOV 55°).
- 0.35: gaze lifts to the windscreen (pitch +4°, FOV 50°).
- 0.70: gaze settles on the horizon (pitch +10°, yaw drifts +6° toward Tahoe, FOV 45°).
- 1.00: holds on horizon; gentle 1.5° sine sway, 8s period (alive-but-calm idle).

**Interaction model:**
- **Primary (all devices):** scroll-tilt. Scroll progress drives the camera path above. This is the default and the only required interaction.
- **Desktop (pointer):** optional. Pointer position adds ±4° yaw and ±2° pitch on top of the scroll-driven base. Use `@react-three/drei` `PointerLockControls`-like light mapping; do not pointer-lock (keep cursor visible). Inactive for 3s → pointer influence decays to zero.
- **Mobile (device-tilt):** optional, opt-in only. A small "Tilt to look" button appears after the section is pinned. Tapping enables `DeviceOrientationControls` and shows a "Stop" button. iOS 13+ requires the permission gesture; handle it. If denied, the button disappears for the session. Never auto-request device orientation on page load.

**Lighting:** one warm directional light from the left (`#FFE7B0`, intensity 2.4), one cool fill from above (`#B8D4E0`, intensity 0.5), a low ambient (`#1A1410`, intensity 0.3). Hemisphere light for sky/ground gradient. Golden-hour bias: warm key, cool sky, dark warm shadows.

**Performance budget (hard limits):**
- Frame time ≤ 16ms on a 2021 mid-tier device (target: iPhone 12 / Pixel 5 class).
- GPU memory ≤ 64MB.
- Initial JS+asset load ≤ 2MB compressed (glTF draco + KTX2 textures + JS bundle for the scene only, excluding app shell).
- Lazy-load after LCP. The scene's chunk is dynamically imported on `requestIdleCallback` (or `setTimeout` 1500ms fallback) AND only after the hero text has painted AND only if the device passes the capability check.
- Render loop pauses when the canvas is offscreen (`IntersectionObserver`) or when the tab is hidden (`visibilitychange`).
- DPR cap: `Math.min(devicePixelRatio, 2)`. On mobile, cap at 1.5.

**Capability gate (must run before loading the scene):**
1. `window.matchMedia('(prefers-reduced-motion: reduce)').matches` → render fallback image, never load scene.
2. `navigator.hardwareConcurrency < 4` or `navigator.deviceMemory < 4` (where available) → render fallback.
3. WebGL2 not available (`!canvas.getContext('webgl2')`) → render fallback.
4. Save-Data header (`navigator.connection?.saveData`) → render fallback.
5. Any failure in scene init (e.g., texture decode) → catch and render fallback.

**Fallback (static graded hero image):**
- A single graded AVIF/WebP photo of the left-seat PA28 interior, golden hour, panel in foreground, Tahoe through the windscreen. Same composition as the CGI camera's 0.70 frame.
- Used for: reduced-motion, low-power, no-WebGL, Save-Data, and any scene-init failure.
- Must convey the left-seat POV without motion. The hero headline and quick-facts strip render on top of this image exactly as they do on the WebGL version.
- The fallback image is the LCP element candidate for all users on the homepage hero (see Performance). The WebGL canvas layers above it only after idle-load; if the canvas never loads, the image is the hero.

**Accessibility:**
- The canvas has `role="img"` and an `aria-label` that is a real-text scene description: "Interior of a Piper PA28-180 cockpit from the left seat. The instrument panel fills the foreground with two Garmin G5 digital displays. Through the windscreen, the ramp and runway at Reno–Tahoe International Airport lead toward the Sierra Nevada and Lake Tahoe on the golden-hour horizon."
- A visually-hidden live region updates as scroll progresses through three beats: "Gaze on the instrument panel." → "Gaze lifts to the windscreen." → "Gaze settles on the Tahoe horizon." Updates are throttled to one per beat, not per frame.
- Keyboard: when the section is focused, arrow keys pan/tilt (←/→ yaw, ↑/↓ pitch) within ±4° of the current scroll-driven base. `Space` toggles a "pause" that decouples the scene from scroll until pressed again (an on-screen pause button mirrors this control). `Esc` releases focus.
- `prefers-reduced-motion: reduce` → static fallback image, no scrubbed camera, no idle sway. The same three-beat description still renders to the live region on scroll so screen-reader users get the narrative arc.

### 4c. Color extension for immersive mode

The palette extends to full-bleed dark/photographic surfaces without new hues — only new intents and gradient rules.

**New intent tokens (add to `globals.css`):**

| Token | Maps to | Usage |
|---|---|---|
| `--color-immersive-bg` | `blue-900` | Pinned story section backgrounds (dark) |
| `--color-immersive-bg-deep` | `color-mix(blue-900 80%, #000 20%)` | Deepest story transitions |
| `--color-on-immersive` | `cream-50` | Primary text on dark immersive surfaces |
| `--color-on-immersive-muted` | `color-mix(cream-50 70%, transparent)` | Secondary text on dark immersive surfaces |
| `--color-scrim-hero` | gradient (see below) | Hero scrim |
| `--color-scrim-pageheader` | gradient (see below) | Page header scrim |

**Scrim rules (redefine the existing utilities):**
```css
.bg-hero-scrim {
  background: linear-gradient(
    180deg,
    rgba(15, 15, 15, 0.0) 0%,
    rgba(15, 15, 15, 0.55) 45%,
    rgba(15, 15, 15, 0.75) 100%
  );
}
.bg-pageheader-scrim {
  background: linear-gradient(
    180deg,
    rgba(0, 78, 124, 0.55) 0%,   /* blue-900 tint for brand cohesion */
    rgba(15, 15, 15, 0.55) 60%,
    rgba(15, 15, 15, 0.35) 100%
  );
}
```
The hero scrim is bottom-weighted (text lives in the lower third). The page-header scrim carries a blue-900 tint at the top to keep the brand present even over photography.

**Text-on-photo rules:**
- Over any photo, text sits on a scrim region of ≥ 0.5 opacity, or on a `cream-25` panel with `ink` text. Never place body text directly on ungraded photography.
- Minimum contrast 4.5:1 for body, 3:1 for large text (≥ 24px). Verify per photo; if a photo can't meet it, increase scrim opacity or switch to a panel.
- `gold-500` accents over dark photos use `on-dark-accent`; hover uses `on-dark-accent-hover`. Never use `gold-500` for body text on dark — fails AA.
- `coral` is reserved for alerts and active nav. Do not use it as an accent over immersive photography.

**Gradient rules:** gradients are only used for scrims (above) and for section-to-section transitions. A transition gradient fades `blue-900`/`cream-50` over 80–120px at section boundaries. No decorative gradients. No rainbow gradients. No mesh gradients.

### 4d. Typography in immersive mode

- **Over photography (dark scrim):** headings `cream-50` Nunito Sans 800, body `cream-50` Poppins 500 at ≥ 16px, labels `gold-500` IBM Plex Mono 500 uppercase, letter-spacing 0.08em. Body line-height 1.7 (slightly looser than the 1.6 light-mode default because dark surfaces read tighter).
- **At scale (hero):** H1 up to clamp(2.5rem, 6vw, 4rem). Beyond 4rem, switch to `clamp(2.5rem, 5vw, 4rem)` — never exceed 4rem; the cockpit POV is intimate, not billboarded.
- **Kinetic typography:** limited to two patterns. (1) `altitude-lift` — a line translates up and fades in, scrubbed to scroll. (2) `word-cascade` — a two-line headline reveals line-by-line on intersection with `glide-entrance` staggered 80ms between lines. No letter-by-letter reveals. No typewriter effects. No split-flap. No scrolling marquees.
- **Type-as-image moment:** the homepage hero wordmark "HORNBILL AVIATION" in Nunito Sans 900 uppercase, -0.02em, sits as a quiet top-left anchor over the cockpit scene — never animated, never scaled, never recolored. It reads as a panel label, not a billboard.
- **IBM Plex Mono** labels in the cockpit-adjacent UI (e.g., the quick-facts strip) use tabular nums and a 0.08em letter-spacing to evoke panel stenciling.

### 4e. Image grading recipe

A repeatable grade applied to every real photograph so the site feels cinematic without looking filtered. Apply in this order:

1. **White balance:** warm the key to 3200K equivalent (+8 on temperature, +3 on tint in Lightroom terms). Cool shadows by -5 on temperature to separate subject from background.
2. **Exposure:** lift shadows +12, drop highlights -18, slight S-curve (blacks -8, whites +6).
3. **Contrast:** +14 clarity, +6 vibrance, 0 saturation. Never push saturation above 0 — the warm white balance does the work.
4. **Color grade:** shadows tinted `#1A2E3D` (cool blue, 15% strength), highlights tinted `#F8AF12` (gold-500, 8% strength). Mids neutral.
5. **Grain:** additive film grain, 8% opacity, ISO 800 profile, monochrome. Applied as a CSS overlay `url(#grain)` SVG filter or a tiled PNG at 30% size — not baked into the photo (keeps the asset smaller and the grade swappable).
6. **Vignette:** -1.0 stops at the corners, 30px feather, roundness +30. Only on hero and full-bleed images. Never on cards.
7. **Sharpen:** output sharpening for screen at 0.4 radius, 40% amount.

Export: AVIF primary, WebP fallback, JPEG fallback of last resort. `loading="lazy"` for everything below the fold; `fetchpriority="high"` and `loading="eager"` for the LCP image. Always specify `width` and `height` (or `aspect-ratio`) to lock CLS at 0.

### 4f. Layout primitives for scroll-driven scenes

| Primitive | When to use | When not to use |
|---|---|---|
| **Pinned section** (`position: sticky` or Framer `useScroll` target) | Story pages only, when a scroll range drives a single cinematic beat | Product pages, any fact-dense section |
| **Scrubbed timeline** | Inside a pinned section, mapping scroll progress 0→1 to transforms | Hover states, entrances, anything that should feel snappy |
| **Parallax layer** | Foreground/background separation over a full-bleed photo, max 20% delta | Text blocks, card grids |
| **Sticky panel** | Quick-facts strip (always), instructor name on long bio pages (product) | Story beat transitions |
| **Full-bleed transition** | Moving between dark and light sections in a story | Within a product page |

Rules:
- Pinned sections never exceed 250vh. Long pins kill INP.
- Only one pinned section active at a time. The next pin starts as the previous unpins.
- Parallax delta ≤ 20% of element height. Larger deltas read as jitter.
- The quick-facts strip is sticky from the top of the viewport and collapses to a minimal form (icons + price + phone) on mobile to avoid blocking content.

### 4g. Motion tokens

```css
:root {
  /* Durations */
  --motion-instant: 80ms;       /* hover feedback, focus ring */
  --motion-quick:  150ms;      /* small UI transitions */
  --motion-base:   300ms;      /* default entrance */
  --motion-slow:   500ms;      /* glide-entrance, horizon-reveal */
  --motion-cinema: 800ms;      /* section transitions */

  /* Easings */
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-soft: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-scrub: linear;        /* scrubbed timelines are linear to scroll */

  /* Distances */
  --rise-entrance: 24px;
  --rise-story: 40px;
  --parallax-delta: 20%;
  --tilt-delta: 3deg;

  /* Staggers */
  --stagger-tight: 60ms;
  --stagger-loose: 120ms;
}
```

Named animation shorthand (use these names in code):
- `--anim-glide-entrance`: `transform translateY(var(--rise-entrance)); opacity 0 → 1; var(--ease-out-quart) var(--motion-slow)`
- `--anim-horizon-reveal`: `transform translateY(16px) scale(1.02); opacity 0.6 → 1; var(--ease-out-quart) var(--motion-slow)`
- `--anim-beak-flash`: `background-size 0% → 100% (underline); var(--ease-out-quart) var(--motion-quick)`

### 4h. Reduced-motion fallbacks

For every pattern, the fallback conveys the same information and emotional intent, just without motion. Implement via `@media (prefers-reduced-motion: reduce)` and a `.reduce-motion` class toggled by user control in the quick-facts strip.

| Pattern | Reduced-motion fallback |
|---|---|
| `horizon-reveal` | Photo renders at final state (full opacity, no translate). |
| `panel-pass` | Both panels render stacked, fully visible. No lateral slide. |
| `wing-tilt` | Image renders at 0°. |
| `compass-rotate` | Motif renders at final rotation (45°). |
| `altitude-lift` | Text renders at final position, full opacity. |
| `runway-recede` | Background renders at scale 1.0, no translate. |
| `glide-entrance` | Element renders visible, no translate. |
| `gaze-drift` (WebGL) | Static fallback hero image at the 0.70 frame (horizon). Three-beat live-region updates still fire on scroll. |
| `beak-flash` | Underline renders at full width, no animation. |

Additionally, under reduced motion: disable `scroll-behavior: smooth`, disable all parallax, disable the WebGL idle sway, and disable `word-cascade` stagger (show full headline immediately).

### 4i. Mobile-specific motion rules

Mobile runs a strict subset. Mobile budget: GPU memory ≤ 32MB, frame time ≤ 16ms on iPhone 12 class, no device-tilt by default.

| Pattern | Mobile behavior |
|---|---|
| `gaze-drift` (WebGL) | Loaded only if capability gate passes AND `navigator.connection?.effectiveType` is not `2g`/`slow-2g`. DPR cap 1.5. No pointer pan (no pointer). Device-tilt opt-in only. |
| `panel-pass` | Disabled. Replace with a static cross-fade between two stacked panels. |
| `wing-tilt` | Disabled. |
| `compass-rotate` | Disabled. |
| `runway-recede` | Scale only (no translate), delta halved to 4%. |
| `altitude-lift` | Disabled. Text fades in on intersection only. |
| `horizon-reveal` | Runs, but translate halved to 8px. |
| `glide-entrance` | Runs. |
| `beak-flash` | Runs. |
| Parallax | Disabled. |
| Pinned sections | Mobile caps pin at 150vh (vs 200–250vh desktop). Two pins max per story page. |

The quick-facts strip on mobile collapses to a 44px-tall bar with: Part 61 badge, price, phone, address icon. Tap expands. It never overlaps the WebGL canvas's active area; the canvas top is inset 56px on mobile to clear the strip.

## 5. Resolved Design Decisions

| Decision | Rationale |
|---|---|
| Ship CGI cockpit model, not photo sphere | CGI gives the required camera path (panel → windscreen → horizon) with a real Z-dolly feel. A photo sphere is rotation-only and reads as a frozen node. CGI also relights cleanly to golden hour. |
| Scroll-tilt as primary interaction; pointer/device-tilt optional | Scroll is universal, discoverable, and accessible. Pointer pan adds desktop delight without cost. Device-tilt is opt-in because auto-requesting orientation is intrusive and fails on desktop browsers. |
| One WebGL scene, homepage only | WebGL cost (bundle, GPU, accessibility) is justified once for the hero story. Product pages stay fast and crawlable. |
| Fallback image is the LCP candidate, not the canvas | The canvas idle-loads after LCP. The graded hero image is always present, always the LCP element, and always conveys the left-seat POV. The site never has a blank canvas while waiting. |
| Redefine scrim utilities as real gradients | The current flat 50% overlays flatten photography and don't protect text at top or bottom. The brand doc already specified gradient stops (90/60/40 hero, 90/70/50 pageheader); V2 honors that. |
| No logbook as a design device; no cheat-line as throughline | Per V2 design decisions. The cheatline stays a header detail; the logbook is not a visual motif. Throughline symbols are the hornbill and the Sierra/Tahoe landscape. |
| Motion is `transform` + `opacity` only | Layout-property animations cause CLS and burn main-thread time. This rule protects the Core Web Vitals contract. |
| Mobile motion is a strict subset | Mobile GPU and battery budgets are real; 65%+ of discovery-flight bookings originate on mobile. The story must work on mobile without the full desktop effects. |
| Product pages use only three motion patterns | Restraint on fact pages keeps them fast and lets the story pages feel special by contrast. |
| Quick-facts strip is sticky, collapses on mobile | Facts must be reachable without scrolling the story. Mobile collapse prevents the strip from dominating a small screen. |

## 6. Open Questions

1. **CGI model production:** Who authors the PA28 cockpit glTF, and is there budget/timeline? If not ready by launch, the static graded hero image ships as the homepage hero with no WebGL — is that acceptable for V2 launch?
2. **Photo access:** Are there usable golden-hour photos of the actual PA28 interiors (N6576J, N7824W) and the RNO ramp/Sierra? The grading recipe assumes real photography; stock is disallowed. If no photos, does launch ship CGI-only or commission a shoot?
3. **Phone number:** The NAP lists "phone TBD." The quick-facts strip and header CTA need a real number before launch. What is it?
4. **Device-tilt permission UX:** Confirm the "Tilt to look" opt-in button copy and placement. Is a first-person hint ("Tilt to look") the right label, or should it say "Move your phone to look around"?
5. **Keyboard pan range:** The ±4° keyboard pan range matches the pointer range. Is that enough for a satisfying keyboard-only exploration, or should keyboard get a wider ±8° range since it's a deliberate, slower interaction?
6. **Grain delivery:** Bake grain into AVIF exports, or ship a CSS SVG-filter overlay? The overlay is swappable and keeps assets smaller but adds a compositing layer. Which does the performance budget prefer after measurement?
7. **Section pin lengths:** 200–250vh desktop pins are a starting point. Do they feel right in user testing, or do they cause scroll fatigue on the Discovery Flight story page?

## 7. Multilayer Validation Requirements

**Design layer (pre-implementation):**
- Every story page has a storyboard showing the scroll progress 0→1 with the named motion patterns at each beat. No pattern is used on a page without being listed in this doc.
- Every product page has a motion budget listing only patterns from the allowed product set (`horizon-reveal`, `glide-entrance`, `beak-flash`).
- Color contrast verified per photo: each photo + text pairing logs its scrim opacity and measured contrast ratio.

**Build layer (CI):**
- Lighthouse CI on every PR: LCP ≤ 2.0s, INP ≤ 200ms, CLS ≤ 0.1 on the homepage and one product page. Fail the build on regression beyond 10%.
- Bundle size check: the WebGL scene's lazy chunk ≤ 2MB compressed (gzip + brotli). Fail the build if exceeded.
- `prefers-reduced-motion` smoke test: a Playwright test loads the homepage with reduced motion on and asserts the WebGL canvas never mounts and the fallback image renders.
- Capability gate test: a Playwright test stubs `navigator.hardwareConcurrency = 2` and asserts the fallback image renders.

**Runtime layer (production):**
- R3F frame time logged at the 90th percentile; alert if p90 > 16ms on the supported-device cohort.
- Canvas pause verified: an IntersectionObserver test confirms `requestAnimationFrame` stops when the canvas scrolls offscreen.
- GPU memory sampled via `EXT_memory_info` (WebGL2) where available; alert if > 64MB.

**Accessibility layer:**
- Axe and manual screen-reader pass (VoiceOver + NVDA) on every story page: the three-beat live-region updates fire on scroll under reduced motion.
- Keyboard-only pass: arrow keys pan/tilt the scene, Space pauses, Esc releases focus. All controls reachable, all visible.
- Focus order: quick-facts strip → hero content → WebGL canvas (focusable with `tabindex="0"`) → rest of page. No focus traps in pinned sections.

**SEO / AEO layer:**
- View-source check: all quick-facts (price, phone, address, hours, Part 61, RNO) are in the underlying HTML, not rendered only by JS. A `curl` of the homepage returns the facts.
- The WebGL canvas `aria-label` and the live-region beats are present in the server-rendered HTML (the live region starts at beat one).
- Lighthouse SEO score ≥ 95 on homepage and all program pages.