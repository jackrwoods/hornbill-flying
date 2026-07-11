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
topic: "V2 engineering and performance contract for hornbillaviation.com"
tags: [design, v2, engineering, performance, webgl, core-web-vitals, seo, accessibility]
status: draft
---

> **Launch state — read [`v2-resolutions.md`](./v2-resolutions.md) first.** Booking backend is **Flight Circle** (embeddable widget), not a first-party API — see §4.8. WebGL cockpit showpiece is **post-launch** (no asset available); the homepage ships a static sunset-gradient placeholder hero, and the WebGL budget/lifecycle sections below are post-launch targets. Phone number is TBD; `siteFacts.ts` is the single source of truth.

# Hornbill Aviation — V2 Engineering & Performance Contract

This document is the engineering and performance contract for the V2 overhaul of hornbillaviation.com. It tells the implementing LLM exactly what stack to use, what budgets to hold, how to split code, how to ship images and fonts, where the static/dynamic boundary runs, how to degrade gracefully, and how to verify correctness at every layer. It is a spec, not a sketch. Where a rule could be misread, the doc says what to do and what failure looks like.

The site is a statically generated marketing surface with a single dynamic client surface (the booking widget). One WebGL showpiece lives on the homepage. Everything else is HTML, CSS, and a small amount of TypeScript. The performance posture is Apple-product-page ambition on a small-flight-school budget: real photography, tight budgets, graceful degradation, and Core Web Vitals (CWV) that hold in field data, not just lab runs.

---

## 1. Current State

The live site (hornbillaviation.com) is a single-page "Coming Soon" BootstrapMade template served as static HTML. It loads Bootstrap 5, Bootstrap Icons, the AOS animation library, three Google Font families (Roboto, Poppins, Raleway), and one background JPEG. There is no React, no build step beyond the template, no schema markup, and no booking flow. LCP is the background photo behind an 80% dark overlay; INP is fine only because the page does almost nothing.

The repository (`hornbill-flying`) already contains the V1 Next.js codebase that replaces the Coming Soon page. Its `package.json` confirms the stack the V2 work inherits: Next.js 16 (static export via `output: "export"`), React 19, TypeScript 5, Tailwind v4, `sharp` for image processing, `next-mdx-remote` for blog MDX, `gray-matter` for frontmatter, `zod` for validation, and `gh-pages` for deploy. `next.config.ts` sets `basePath`/`assetPrefix` to `/hornbill-flying` in production, `trailingSlash: true`, and `images.unoptimized: true` (a constraint of static export — see the image strategy for how to handle this). The V1 booking library in `src/lib/booking/api.ts` defines a first-party API contract against `/api/availability`, `/api/bookings`, and `/api/gift-vouchers` — **this is superseded by Flight Circle at launch (see §4.8 and v2-resolutions.md).** The first-party contract is retained only as a post-launch fallback interface if Flight Circle's UX cannot meet the under-60s booking target.

V2 inherits this foundation and rebuilds the experience layer on top: a scroll-driven immersive homepage with one WebGL cockpit showpiece, a focused set of product pages, and the same static-with-dynamic-booking architecture. The engineering work is not "rewrite the stack" — it is "hold the budgets while adding immersion."

---

## 2. Desired End State

A statically generated Next.js site where:

- Every marketing page renders to plain HTML/CSS at build time and is fully crawlable. Pricing, NAP, program details, FAQ answers, and instructor credentials live in the HTML, not behind a client fetch.
- One homepage showpiece renders a pannable, scroll-tilted PA28 cockpit interior via WebGL. It loads only after the LCP image paints, only on devices that support WebGL, only when `prefers-reduced-motion: no-preference`, and only when the homepage is the active route.
- A persistent "quick facts" strip (price, phone, address, hours, Part 61, RNO) is anchored to the viewport and present in the HTML for crawlers and screen readers.
- A booking widget mounts on demand on the Discovery Flight page (and any other page that surfaces a "Book" CTA). At launch it wraps Flight Circle's embeddable widget (see §4.8); it does not talk to a first-party API. The widget is built against an interface so a first-party API can replace Flight Circle post-launch if needed.
- Core Web Vitals hold in field data (CrUX): LCP ≤ 2.0s, INP ≤ 200ms, CLS ≤ 0.1 on every route. The WebGL showpiece never blocks LCP. Scroll-driven motion never blocks INP.
- Reduced-motion, no-WebGL, low-power, and slow-connection paths each render a coherent, complete experience — never a broken page.
- The build is a single `npm run build` that emits `out/`, deployable to Cloudflare Pages (recommended) with long-immutable cache headers on static assets and short TTLs on HTML.

---

## 3. Existing Patterns

Carry these forward from V1 and the brand docs:

- **Static export with `output: "export"`.** The marketing site is fully static. The only dynamic surface is the booking widget, which is a client component hitting a separate API backend. This split is correct and stays.
- **`trailingSlash: true`.** Keeps URLs consistent and plays well with static hosts. Keep it.
- **Booking API contract in `src/lib/booking/api.ts`.** The endpoint paths, request shapes, and typed errors (`BookingApiError`) are the contract. V2 keeps the paths and extends the client with retry, timeout, and offline fallback — it does not rename endpoints.
- **Color and type tokens from `visual_identity.md`.** Engineering does not invent colors. Use the intent tokens (`--color-bg`, `--color-card`, `--color-heading`, `--color-accent`, etc.) and the alpha-aware tokens (`border-subtle`, `dark-soft`, `accent-subtle`). Typography uses Nunito Sans 800 (headings), Poppins 500 (body), IBM Plex Mono (data/labels).
- **`sharp` is already a dependency.** Use it for any build-time image optimization that `next/image` cannot do under static export (see image strategy).
- **MDX for blog via `next-mdx-remote` with `gray-matter`.** Blog posts are static MDX files. Keep this. Do not pull blog content from the API.
- **Zod for validation.** Every API response the booking widget receives is parsed through a Zod schema before it touches the UI. This is already the pattern; extend it, do not drop it.

---

## 4. New Patterns

### 4.1 Tech stack confirmation

| Layer | Choice | Why this and not the alternative |
|---|---|---|
| Framework | Next.js 16, static export (`output: "export"`) | Already in the repo. Static export gives a crawlable, CDN-cheap site. Alternative: Astro. Rejected — the booking widget is a heavy React component and the team already ships React 19; switching to Astro means re-porting the widget and losing `next/image`'s loader ecosystem. |
| UI runtime | React 19, TypeScript 5 | Already in the repo. Server Components are not used (static export has no server). Everything is a Client Component or a statically rendered page. |
| Styling | Tailwind v4 | Already in the repo. v4 moves the config into CSS, which keeps the design tokens in one file (`globals.css`) and avoids a `tailwind.config.js` drift problem. |
| WebGL | React Three Fiber (`@react-three/fiber`) + `@react-three/drei` | R3F is the only library that lets you write a scene as React components with Suspense boundaries, lazy-load it as a separate chunk, and suspend/resume the render loop from outside. Alternatives: raw Three.js (more code, no Suspense story, harder to lazy-split), Babylon.js (larger base, weaker React integration), `<model-viewer>` (great for orbiting a model, wrong tool for a scroll-driven interior camera with custom shader pass). Drei gives `useGLTF`, `PerspectiveCamera`, `ScrollControls`, and `Preload` — all needed for the cockpit piece. |
| Motion | Framer Motion | The site has two motion surfaces: scroll-driven CSS transforms on story pages and a small number of React-driven transitions (booking step changes, accordion, nav). Framer Motion handles the React side with `LayoutGroup` and `AnimatePresence` and coexists with CSS scroll-driven animations. Alternative: GSAP. Rejected — GSAP's ScrollTrigger is excellent but pulls in a second timeline engine that fights Framer for scroll ownership, and GSAP is harder to tree-shake. Use native CSS `animation-timeline: scroll()` for the scroll-driven transforms and Framer only for discrete state transitions. |
| Images | Next.js `<Image>` with AVIF/WebP, `sharp` at build time | See 4.4. Under static export, `next/image` cannot do server-side optimization, so the loader is configured to serve pre-optimized assets from `public/` and emit responsive `srcset` manually. |
| Fonts | Self-hosted, subset to `latin`, `font-display: swap`, preloaded | See 4.6. |
| Validation | Zod | Already in the repo. Every booking API response is schema-validated. |
| Blog | MDX via `next-mdx-remote`, frontmatter via `gray-matter` | Already in the repo. Posts are static. |

Hard rule: do not add a second animation library, a second state library, or a second styling system. If a need arises that the current stack cannot meet, raise it in Open Questions rather than pulling in a dependency.

### 4.2 WebGL budget and lifecycle

The cockpit showpiece is the single most expensive thing on the site. It gets a hard budget and a lifecycle that keeps it off the critical path.

**Budgets (hard limits, enforced in CI via a bundle size check):**

| Resource | Ceiling | Notes |
|---|---|---|
| Showpiece JS chunk (R3F + drei + scene code, gzipped) | 150 KB | Measure the gzipped size of the dynamic import chunk. If it exceeds 150 KB, drop a drei helper or move to a lighter camera rig. |
| Showpiece assets (cockpit GLB + textures), compressed (gzip + brotli on the GLB, AVIF/WebP on textures) | 2 MB total | The GLB is the dominant cost. Use a Draco-compressed GLB (`draco` decoder from drei) and keep texture maps at 1024px max for the panel, 512px for seats, 256px for out-the-windscreen background plate. |
| Frame time | ≤ 16 ms (60 Hz) on a mid-range 2022 phone (Pixel 6 / iPhone 12) | Measured with `requestAnimationFrame` timestamps in a perf overlay. If frame time exceeds 20 ms, drop texture resolution or pause the render loop when the canvas is off-screen. |
| GPU memory | ≤ 64 MB | Track via the `EXT_memory` extension where available; otherwise estimate from geometry + texture sizes. Dispose the scene on unmount. |
| Concurrent RAF loops | 1 | The showpiece owns the only RAF. Scroll-driven CSS animations do not use RAF. |

**Lifecycle — the showpiece must not affect LCP, INP, or CLS:**

1. **Idle-load after LCP.** The showpiece chunk is fetched only after the `window` `load` event fires AND the LCP element has painted (detected via PerformanceObserver on `largest-contentful-paint`). Until then, the hero shows a static fallback image (the cockpit at a neutral gaze angle) with the same aspect ratio as the canvas, so there is zero CLS when the canvas swaps in.
2. **Suspend on `visibilitychange`.** When `document.hidden` is true, pause the render loop (`gl.setLoop(null)` or set a `paused` ref). Resume on visible. This keeps background tabs from burning battery.
3. **Suspend on `prefers-reduced-motion: reduce`.** Do not mount the canvas at all. Render the static fallback image and the scroll story is told through cross-fading static frames instead of a live 3D camera. The fallback must contain the same narrative beats (gaze drifts across panel, out the windscreen, toward Tahoe) as a sequence of static images positioned along scroll.
4. **Suspend on no-WebGL.** Feature-detect with a `canvas.getContext('webgl2') ?? canvas.getContext('webgl')` check wrapped in try/catch. On failure, use the static fallback. Do not show an error.
5. **Suspend on low-power.** If `navigator.deviceMemory < 4` or `navigator.hardwareConcurrency < 4`, or if `navigator.connection?.effectiveType` is `slow-2g`/`2g` or `saveData` is true, use the static fallback. Do not attempt the WebGL path. (See 4.10 for the full decision tree.)
6. **Homepage only.** The showpiece chunk is imported only on `/`. It is not in the shared bundle. Route away from `/` and the chunk is never requested.
7. **Canvas placeholder reserves space.** The canvas container has an explicit `aspect-ratio` and `min-height` set in CSS so that mounting the canvas (or failing to) does not shift layout. CLS budget for the hero is 0.

**Loader and Suspense boundary:**

```tsx
// app/page.tsx (homepage, statically rendered shell)
import { lazy } from "react";
const CockpitShowpiece = lazy(() => import("@/components/webgl/CockpitShowpiece"));

export default function HomePage() {
  return (
    <>
      {/* Static hero shell — LCP image lives here, in the HTML */}
      <HeroShell />
      <CockpitFallbackZone>
        {/* Suspense boundary so fallback image shows until chunk + GLB resolve */}
        <Suspense fallback={<CockpitStaticFallback />}>
          <CockpitShowpiece />
        </Suspense>
      </CockpitFallbackZone>
      <ScrollStory />
    </>
  );
}
```

Inside `CockpitShowpiece`, the GLB loads via `useGLTF` (drei) with `Suspense`, and `Preload` warms the texture cache. The component itself is the one that gates on the device/feature checks above; if any check fails it returns `<CockpitStaticFallback />` and never mounts R3F.

### 4.3 Code splitting — per-route table

| Route | Statically rendered (in HTML) | Client-only (hydrated) | Lazy-loaded on interaction |
|---|---|---|---|
| `/` (Homepage) | Hero shell + LCP image, quick facts strip, all story section text, FAQ, schema | Sticky header/nav, quick facts strip interactions, scroll progress for CSS scroll animations | WebGL cockpit chunk (after LCP, gated by device checks) |
| `/discovery-flight/` | Full narrative + pricing + FAQ + schema | Booking widget (lazy) | Booking widget chunk + calendar; mounts when user scrolls to the booking zone or clicks a Book CTA |
| `/programs/*` (7 pages) | Full content + pricing + FAQ + schema | Sticky header, accordion | None |
| `/fleet/` | Full content + pricing table + schema | Sticky header | None |
| `/instructors/` and `/instructors/[slug]/` | Full bios + credentials + schema | Sticky header | Instructor availability probe (lazy) — fires only when user clicks "Book with [Name]" |
| `/about/`, `/contact/`, `/location/`, `/financing/`, `/faq/`, `/membership/`, `/cross-country-rentals/` | Full content + schema | Sticky header, contact form (lazy) | Contact form chunk |
| `/blog/` | Post list + schema | Sticky header | None |
| `/blog/[slug]/` | Full MDX rendered to HTML at build time + schema | Sticky header, reading progress | None |
| `/book/` | Shell only | Booking widget (primary mount) | Booking widget chunk (loads immediately on this route) |

Hard rules:
- Framer Motion is lazy-loaded on every route except where it is needed above the fold. On story pages it is needed for the booking-step transitions only, so it sits in the booking chunk, not the shared bundle.
- The booking widget is one dynamic import, mounted on demand. It is never in the shared bundle.
- The WebGL chunk is never imported on any route except `/`.
- `IBM Plex Mono` is only loaded on routes that display data labels (fleet, instructors, pricing). Use a `next/font` conditional or a manual `preload` only on those routes.

### 4.4 Image strategy

**Formats:** AVIF primary, WebP fallback, JPEG fallback only for the LCP hero (so that very old browsers still get a fast hero). Use `<picture>` with `<source>`:

```html
<picture>
  <source type="image/avif" srcset="/img/hero/cockpit-left-seat.avif 1x, /img/hero/cockpit-left-seat@2x.avif 2x" />
  <source type="image/webp" srcset="/img/hero/cockpit-left-seat.webp 1x, /img/hero/cockpit-left-seat@2x.webp 2x" />
  <img src="/img/hero/cockpit-left-seat.jpg" width="1600" height="900"
       alt="Left-seat view of the PA28 panel over the RNO ramp at golden hour"
       loading="eager" fetchpriority="high" decoding="async" />
</picture>
```

**Sizing and art direction:** Every image has explicit `width` and `height` attributes (CLS budget = 0). For above-the-fold hero images, serve a mobile-sized source (≤ 800px wide) and a desktop source (≤ 1600px wide) via a `<picture>` media query:

```html
<picture>
  <source media="(max-width: 768px)" srcset="..." />
  <source media="(min-width: 769px)" srcset="..." />
  <img ... />
</picture>
```

**Loading strategy:**
- LCP image: `loading="eager"`, `fetchpriority="high"`, `decoding="async"`. Preload it in `<head>` with `<link rel="preload" as="image" fetchpriority="high" href="..." />` and a `<link rel="preload" as="image" imagesrcset="..." imagesizes="..." />` for the responsive case.
- All other images: `loading="lazy"`, `fetchpriority="auto"`, `decoding="async"`. Set explicit dimensions so lazy loading does not cause CLS.

**Next.js Image under static export:** `next/image` cannot server-optimize under `output: "export"` (hence the current `images.unoptimized: true`). V2 keeps `unoptimized: true` and pre-optimizes images at build time with a custom script (`npm run build:images`) that runs `sharp` to emit AVIF + WebP + JPEG at the required widths into `public/img/`. The `<picture>` element is hand-written (or wrapped in a small `<Picture>` React component) so that the responsive `srcset` and art direction are explicit in the markup.

**Concrete build-time image pipeline:**

```ts
// scripts/optimize-images.ts (run before next build)
import sharp from "sharp";
import { readdir, mkdir } from "fs/promises";
// For each source image in raw-img/, emit:
//   - <name>.avif, <name>@2x.avif (mobile), <name>-wide.avif, <name>-wide@2x.avif (desktop)
//   - same for .webp
//   - same for .jpg (quality 80)
// Quality: avif 50, webp 72, jpg 80. Max dimensions: mobile 800px, desktop 1600px wide.
// Hero images additionally: mobile 1000px, desktop 2000px (higher fidelity for LCP).
```

`npm run build` runs `build:images` then `next build`. The `out/` directory contains the optimized images alongside the static HTML.

### 4.5 Core Web Vitals — per-page budgets

| Metric | Global target | Homepage | Discovery Flight | Program pages | Fleet | Blog post |
|---|---|---|---|---|---|---|
| LCP | ≤ 2.0s | ≤ 2.0s (hero photo) | ≤ 2.0s (hero photo) | ≤ 1.8s | ≤ 1.8s | ≤ 1.5s (text LCP) |
| INP | ≤ 200ms | ≤ 200ms | ≤ 150ms (booking flow is interactive) | ≤ 200ms | ≤ 200ms | ≤ 200ms |
| CLS | ≤ 0.1 | ≤ 0.05 (hero canvas must not shift) | ≤ 0.05 (booking widget mount must not shift) | ≤ 0.1 | ≤ 0.1 | ≤ 0.05 |
| TBT (lab) | ≤ 200ms | ≤ 200ms | ≤ 150ms | ≤ 150ms | ≤ 150ms | ≤ 100ms |

**How the WebGL showpiece must not violate LCP:** The showpiece chunk and GLB are requested only after the LCP element paints. The LCP element is the hero photo, served from the HTML. The canvas container has a fixed `aspect-ratio` so that mounting (or failing to mount) the canvas does not shift the LCP. The showpiece never appears in the preload list. Its `<link rel="prefetch">` (low priority) is injected by JS after LCP, not by the HTML.

**How scroll-driven motion must not violate INP:**
- Scroll-driven transforms use `transform` and `opacity` only. Never `width`, `height`, `top`, `left`, `margin`, `padding`, or `box-shadow` on scroll. These trigger layout and paint; `transform`/`opacity` are compositor-only.
- No main-thread work during scroll. The scroll handler (if any) is passive (`addEventListener('scroll', fn, { passive: true })`) and only updates CSS custom properties that the compositor reads. No `getBoundingClientRect` in a scroll handler (forces layout). Use `IntersectionObserver` for section reveals instead of scroll math.
- The WebGL render loop does not run during user input on the booking widget. When the booking widget mounts, the showpiece drops to 30 Hz; when the booking widget is active (user is filling the form), the showpiece pauses entirely.
- Long tasks (> 50 ms) are broken up with `scheduler.yield()` where available, or `setTimeout(fn, 0)` otherwise. The booking widget's state updates are batched.

### 4.6 Font strategy

Self-host all three families. Google Fonts adds a DNS lookup, a render-blocking request, and a privacy/GDPR surface; self-hosting removes all three and lets you subset and preload precisely.

**Files to self-host (subset to `latin`, variable font where available):**
- `Nunito-Sans-800.woff2` (headings — only weight 800)
- `Poppins-500.woff2` (body — only weight 500)
- `Poppins-600.woff2` (buttons/labels — only weight 600)
- `IBMPlexMono-500.woff2` (data labels — only weight 500, only on routes that use it)

**Preload tags in `<head>` (every page):**

```html
<link rel="preload" href="/fonts/Nunito-Sans-800.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/fonts/Poppins-500.woff2" as="font" type="font/woff2" crossorigin />
```

`IBM Plex Mono` is preloaded only on `/fleet/`, `/instructors/*`, and any page that shows a pricing table. Use a per-route `<head>` injection.

**`@font-face` declaration:**

```css
@font-face {
  font-family: "Nunito Sans";
  src: url("/fonts/Nunito-Sans-800.woff2") format("woff2");
  font-weight: 800;
  font-display: swap;
  font-style: normal;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

Repeat for Poppins 500/600 and IBM Plex Mono. `font-display: swap` is mandatory. The `unicode-range` is the latin subset so the browser does not fetch glyphs the page does not use.

### 4.7 Caching and CDN strategy

**Recommendation: move from GitHub Pages to Cloudflare Pages.**

Rationale:
- GitHub Pages serves with a 10-minute cache TTL on HTML and no edge POP outside the US east region. The site's audience is Northern Nevada, but field CWV are measured globally and Google's crawler hits from arbitrary IPs. Cloudflare has a POP in Reno (SJC edge) and serves static assets with `cache-control: public, max-age=31536000, immutable` out of the box.
- Cloudflare Pages supports the static export output directory (`out/`) with zero config, plus custom headers via a `_headers` file, plus redirect rules via a `_redirects` file, plus free AVIF/Brotli compression, plus free origin-routed image resizing if you later opt in.
- Vercel is the natural home for Next.js but the site is a static export with a separate API backend; Vercel's serverless functions would not be used for the API (the API is its own backend). Cloudflare Pages keeps the marketing site and the API cleanly separated.
- Netlify is a fine alternative; Cloudflare wins on edge POP coverage in the western US and on price (free tier covers this site easily).

**Cache headers (Cloudflare Pages `_headers` file):**

```
/*
  Cache-Control: public, max-age=300, must-revalidate

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/img/*
  Cache-Control: public, max-age=31536000, immutable

/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=300, must-revalidate

/favicon.ico
  Cache-Control: public, max-age=86400
```

Hashed filenames in `/_next/static/`, `/img/`, and `/fonts/` get immutable year-long cache. HTML gets a 5-minute TTL with revalidation so content updates propagate fast. The booking API (on its own origin) sets its own headers — see 4.8.

If GitHub Pages must stay for the short term, set `basePath` and `assetPrefix` as V1 does, but plan the Cloudflare move before V2 launch. GitHub Pages cannot send `cache-control: immutable` and cannot serve AVIF with the right MIME on all paths.

### 4.8 Booking API integration boundary

**Static (marketing site, on Cloudflare Pages):**
- All page HTML, all marketing copy, all pricing, all FAQ, all instructor bios, all blog MDX, all schema markup. None of this depends on the API being up.

**Dynamic (booking widget, mounted on demand):**
- Availability queries, booking creation, gift voucher creation, Stripe payment, instructor-specific availability. All of these go through the booking widget, which is a client component that mounts on `/discovery-flight/`, `/book/`, and on any "Book with [Name]" CTA on `/instructors/[slug]/`.

**How the widget mounts on a static page:**

```tsx
// app/discovery-flight/page.tsx
import { lazy, Suspense } from "react";
const BookingWidget = lazy(() => import("@/components/booking/BookingWidget"));

export default function DiscoveryFlightPage() {
  return (
    <>
      {/* Full static narrative, pricing, FAQ, schema — all in HTML */}
      <DiscoveryFlightNarrative />
      <BookingZone>
        <Suspense fallback={<BookingSkeleton />}>
          <BookingWidget flightType="discovery" />
        </Suspense>
      </BookingZone>
    </>
  );
}
```

The `BookingZone` reserves a fixed `min-height` so the widget mounting does not cause CLS.

**Booking backend: Flight Circle.** The booking backend is Flight Circle, not a first-party API. The `BookingWidget` component wraps Flight Circle's embeddable booking widget (iframe or script embed, per Flight Circle's current integration docs). There are no first-party `/api/availability`, `/api/bookings`, `/api/gift-vouchers`, or `/api/webhooks/stripe` endpoints at launch. Availability, booking creation, payment, gift vouchers, and confirmation emails are all handled by Flight Circle.

**What the frontend holds:**
- `NEXT_PUBLIC_FLIGHT_CIRCLE_EMBED_URL` (or the equivalent embed ID per Flight Circle's integration docs).
- No Stripe keys, no API base URL, no server-side booking state. The frontend is purely a static host that embeds Flight Circle's widget.

**What the BookingWidget wraps:**
- Flight Circle's embed (iframe or script). The wrapper reserves a fixed `min-height` to prevent CLS when the embed loads.
- Deep-link params (`?instructor=`, `?type=gift`, `?program=`) are read client-side and passed to Flight Circle if Flight Circle supports them via its embed config; otherwise the wrapper surfaces the same options as UI inside the embed.

**Timeout, loading, and offline fallback:**
- The Flight Circle embed has an 8-second load timeout. If it fails to load, the widget shows the offline fallback (see 4.10): a clear message ("Booking is temporarily unavailable") with a tappable phone number (once `siteFacts.ts` has one) and an email link to `office@hornbillaviation.com`.
- The wrapper does not retry a failed embed load (Flight Circle's own retry behavior, if any, is respected).
- The "under 60 seconds on mobile, under 3 clicks" requirement from the IA doc still applies. If Flight Circle's default embed cannot meet it, raise the issue with the owner rather than ship a slow flow. A custom first-party API is the post-launch fallback if Flight Circle's UX cannot meet the target.

**Gift vouchers and instructor-specific booking:**
- Gift vouchers: handled by Flight Circle if it supports them. If not, gift vouchers are a post-launch feature; do not ship a half-built voucher flow at launch.
- Instructor-specific booking ("Book with Trygve / Joel / Ethan"): use Flight Circle's per-instructor embed config if it supports instructor filtering. If it does not, the Instructors index links to the generic discovery-flight booking flow, and the instructor choice is made in person or by request.

**Stripe:** Stripe is not integrated first-party at launch. If Flight Circle uses Stripe under the hood, that is Flight Circle's concern, not the frontend's. The frontend holds no Stripe keys.

**Migrating off Flight Circle later (post-launch, if needed):** If a first-party API becomes necessary (e.g., to hit the under-60s target, or to add gift vouchers Flight Circle can't support), the `BookingWidget` interface stays the same; only its implementation swaps from "Flight Circle embed wrapper" to "client hitting `/api/*`." Build the wrapper against an interface, not against Flight Circle's API directly, so the swap is one file.

### 4.9 Build and deploy pipeline

**npm scripts:**

```json
{
  "scripts": {
    "dev": "next dev",
    "build:images": "tsx scripts/optimize-images.ts",
    "build": "npm run build:images && next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "playwright test",
    "test:a11y": "axe-core in playwright",
    "lighthouse": "lhci autorun",
    "deploy": "wrangler pages deploy out --project-name hornbill-aviation"
  }
}
```

**Static export config:** Keep `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`. Drop the `basePath`/`assetPrefix` — the V2 site lives at the root domain, not under `/hornbill-flying`. (If a staged preview is needed, deploy to a Cloudflare Pages preview URL instead of using a base path.)

**Environment variables:**
- `NEXT_PUBLIC_API_BASE_URL` — API origin, e.g. `https://api.hornbillaviation.com`.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key for the booking widget.
- `NEXT_PUBLIC_SENTRY_DSN` (optional) — frontend error reporting.
- API-only (not on the frontend): `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `DATABASE_URL`, `SENTRY_DSN` (server).

Secrets live in Cloudflare Pages dashboard (encrypted at rest, injected at build). For local dev, use a `.env.local` file in `.gitignore`. Never commit secrets.

**Deploy pipeline:**
1. On push to `main`: CI runs `npm ci`, `npm run typecheck`, `npm run lint`, `npm run test`, `npm run lighthouse` (against a preview build).
2. If all green and Lighthouse budgets pass: `npm run build` emits `out/`.
3. `wrangler pages deploy out/` pushes to Cloudflare Pages production.
4. The API backend deploys independently on its own pipeline.

### 4.10 Error boundaries, loading states, and fallbacks

**WebGL showpiece failure modes:**

| Failure | User sees | Engineering |
|---|---|---|
| No WebGL / WebGL2 context | Static fallback image of the cockpit at a neutral gaze angle | Feature-detect before mount; render `<CockpitStaticFallback />` |
| `prefers-reduced-motion: reduce` | Sequence of static cockpit frames cross-fading on scroll | Never mount R3F; render `<CockpitStaticFallback />` with a `prefers-reduced-motion` variant |
| Low power (`deviceMemory < 4` or `hardwareConcurrency < 4`) | Static fallback | As above |
| Slow connection (`effectiveType` in `['slow-2g','2g']` or `saveData`) | Static fallback; the showpiece chunk is never requested | As above |
| GLB fetch fails | Static fallback; error logged to Sentry | `<Suspense>` fallback stays in place; `useGLTF` error caught and rendered as fallback |
| Frame time exceeds 20 ms for 3 consecutive seconds | Render loop drops to 30 Hz, then pauses if off-screen | Perf overlay detects; `gl.setFrameInterval` or manual RAF throttle |

**Booking widget failure modes:**

| Failure | User sees | Engineering |
|---|---|---|
| API unreachable (network) | "We can't reach the booking system right now. Call or text us at [phone] and we'll book you in under a minute." | Phone number is in the HTML, always reachable. Widget shows offline state with click-to-call. |
| API timeout (8s) | Same as above | `AbortController` timeout |
| Availability empty for selected date | "No slots open that day. Try the next available: [date]." with a one-tap "next available" button | UI guides to next open slot |
| Stripe payment fails | Inline error on the payment field; booking not created; user can retry | Stripe error mapped to a human message |
| Booking creation 5xx | "Something went wrong on our end. Your card was not charged. Call [phone] and we'll fix it." | Never leave the user thinking they were charged when they weren't |

**Loading states:**
- Every Suspense fallback is a skeleton with the same dimensions as the mounted component (zero CLS).
- Booking widget skeleton shows the calendar outline and the form fields as static blocks; never an indeterminate spinner without context.
- The WebGL canvas placeholder is a static image of the cockpit at the neutral gaze angle; it is the same image used for the reduced-motion fallback, so the swap (when it happens) is invisible.

### 4.11 Reduced-motion and low-power decision tree

This runs in the browser, on the client, before the showpiece mounts. The logic lives in `src/lib/device-capabilities.ts`:

```ts
export interface DeviceCapabilities {
  webgl: boolean;
  reducedMotion: boolean;
  lowPower: boolean;
  slowConnection: boolean;
  showpieceAllowed: boolean;
}

export function detectCapabilities(): DeviceCapabilities {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const webgl = detectWebGL();
  const lowPower = detectLowPower();
  const slowConnection = detectSlowConnection();
  return {
    webgl,
    reducedMotion,
    lowPower,
    slowConnection,
    showpieceAllowed: webgl && !reducedMotion && !lowPower && !slowConnection,
  };
}

function detectWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2") ?? c.getContext("webgl");
    return !!gl && !!gl.getParameter(gl.VERSION);
  } catch { return false; }
}

function detectLowPower(): boolean {
  const dm = (navigator as any).deviceMemory;
  const hc = navigator.hardwareConcurrency;
  if (dm && dm < 4) return true;
  if (hc && hc < 4) return true;
  return false;
}

function detectSlowConnection(): boolean {
  const c = (navigator as any).connection;
  if (!c) return false;
  if (c.saveData) return true;
  if (c.effectiveType && ["slow-2g", "2g"].includes(c.effectiveType)) return true;
  return false;
}
```

Decision tree:
1. If `reducedMotion` → render static fallback. Stop.
2. If `!webgl` → render static fallback. Stop.
3. If `lowPower` → render static fallback. Stop.
4. If `slowConnection` → render static fallback. Stop.
5. Otherwise → mount the WebGL showpiece after LCP.

Re-evaluate on `visibilitychange` (pause/resume render loop) and on `matchMedia` change for `prefers-reduced-motion` (if the user switches the OS setting while on the page, swap to the fallback without a reload).

### 4.12 Testing strategy

| Layer | Tool | What it checks | When it runs |
|---|---|---|---|
| Unit | Vitest (or Node test runner) | Pure functions: booking parsers, device-capability detection, schema validation | Every CI run |
| Type | `tsc --noEmit` | No type errors | Every CI run |
| Lint | `next lint`, `eslint` | Code style, banned patterns | Every CI run |
| Accessibility | `@axe-core/playwright` | WCAG 2.2 AA on every route, every state (default, booking open, booking error, reduced-motion fallback) | Every CI run |
| End-to-end | Playwright | Booking flow under 60s on mobile viewport; keyboard-only nav through homepage story; reduced-motion path renders fallback; no-WebGL path renders fallback | Every CI run |
| Performance lab | Lighthouse CI | LCP, INP, CLS, TBT on every route against the per-page budgets in 4.5 | Every CI run; fails build if any budget exceeded |
| Performance field | CrUX (via Search Console + API) | Real-user LCP, INP, CLS over 28-day windows | Monitored weekly; alert if any metric crosses the "Needs Improvement" threshold |
| Bundle size | `size-limit` or a custom check on the `out/` chunks | WebGL chunk ≤ 150 KB gz; booking chunk ≤ 80 KB gz; shared bundle ≤ 120 KB gz | Every CI run |
| Visual regression | Playwright screenshots | Hero, quick facts strip, booking widget, blog post across mobile + desktop | Every CI run (on PR) |

**Lighthouse CI config (`.lighthouserc.json`) — budgets to enforce in CI:**

```json
{
  "ci": {
    "assert": {
      "preset": "lighthouse:no-pwa",
      "assertions": {
        "largest-contentful-paint": ["error", { "maxNumericValue": 2000 }],
        "interaction-to-next-paint": ["error", { "maxNumericValue": 200 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["warn", { "maxNumericValue": 200 }],
        "unused-javascript": ["warn", { "maxNumericValue": 80000 }]
      }
    },
    "urls": [
      "http://localhost:3000/",
      "http://localhost:3000/discovery-flight/",
      "http://localhost:3000/programs/private-pilot/",
      "http://localhost:3000/fleet/",
      "http://localhost:3000/instructors/",
      "http://localhost:3000/blog/"
    ]
  }
}
```

---

## 5. Resolved Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| WebGL library | React Three Fiber + drei | Only library with Suspense-based lazy loading, React-idiomatic scene authoring, and a clean suspend/resume story. Matches the React 19 / Next.js stack. |
| Motion library | Framer Motion for discrete transitions; native CSS `animation-timeline: scroll()` for scroll-driven transforms | Avoids two timeline engines fighting over scroll. Framer handles booking step transitions and accordion; CSS handles the story scroll. |
| Image pipeline | `next/image` with `unoptimized: true` + build-time `sharp` pre-optimization | Static export cannot server-optimize. Pre-optimizing with `sharp` gives AVIF/WebP/JPEG at the right widths without a runtime cost. |
| Font hosting | Self-hosted, subset to latin, `font-display: swap`, preloaded | Removes render-blocking Google Fonts request; controls subsetting; improves LCP. |
| Deploy target | Cloudflare Pages (move from GitHub Pages) | Edge POPs in the western US, free AVIF/Brotli, custom `_headers` for immutable caching, free tier covers the site. |
| Booking widget mount | Lazy, on demand, fixed `min-height` zone | Keeps the booking chunk out of the shared bundle; zero CLS on mount. |
| WebGL budget | 150 KB JS gz + 2 MB assets + 16 ms frame + 64 MB GPU | Keeps the showpiece from dominating the homepage budget; enforceable in CI. |
| LCP element | Hero photo in the static HTML, not the canvas | The canvas loads after LCP; the photo is the LCP. |
| Reduced-motion path | Static cockpit frame sequence, never mounts R3F | Honors `prefers-reduced-motion` from the engineering layer up. |
| Low-power / slow-connection path | Static fallback, chunk never requested | Keeps the site fast on the devices the booking audience actually uses (65% mobile). |
| API contract | Keep V1 endpoints, add timeout + retry + offline fallback | No rename; the V1 contract in `src/lib/booking/api.ts` is the source of truth. |

---

## 6. Open Questions

1. **API backend hosting.** Where does the custom API backend live? A separate Cloudflare Worker, a small Node service on Fly.io, or something else? The frontend contract is fixed, but the backend deploy story affects latency from the western US and needs a decision before launch.
2. **Stripe payment flow.** Does the booking widget collect payment inline (Stripe Elements) or redirect to Stripe Checkout? Inline keeps the user on the page (better for the under-60-second mobile target); redirect is simpler to build. The choice affects the booking chunk size and the error surface.
3. **WebGL asset source.** The cockpit GLB must be produced from real PA28 interior reference. Is there a photogrammetry budget, or will the asset be modeled by hand? The asset budget (2 MB compressed) assumes Draco + 1024px textures; a denser asset may need a higher ceiling or a lower texture cap.
4. **Blog MDX rendering.** `next-mdx-remote` renders MDX at request time on the client in V1. For V2 static export, blog posts must render to HTML at build time. Confirm the build-time MDX pipeline (static import + `compileMDX` at build, or a `getStaticProps`-equivalent in App Router via `generateStaticParams`).
5. **CrUX monitoring.** Do we want a Sentry-style alert on CrUX metric regressions, or is weekly manual review via Search Console sufficient? This affects whether we wire the CrUX API into a CI check.
6. **`IBM Plex Mono` preload scope.** Which exact routes use data labels? Confirm the list (fleet, instructors, pricing, blog with flight-hour stats?) so the preload is scoped correctly and the font does not load on routes that do not use it.
7. **WebGL chunk ceiling under real drei usage.** The 150 KB gz ceiling assumes a trimmed drei import (only `useGLTF`, `PerspectiveCamera`, `ScrollControls`, `Preload`). If the scene needs `Environment` or `ContactShadows`, the chunk grows. Confirm the helper set before locking the ceiling.
8. **Image optimization script ownership.** Is `scripts/optimize-images.ts` a new file, or does it extend an existing script? The repo does not currently have an image optimization step beyond `sharp` as a dependency.

---

## 7. Multilayer Validation Requirements

| Layer | What to verify | How | Pass criterion |
|---|---|---|---|
| Build | Static export emits `out/` with HTML for every route | `npm run build` then `ls out/` | Every route in the sitemap has a corresponding `index.html` in `out/` |
| Build | No server components accidentally added | `grep -r "use server" src/` returns nothing | Zero hits |
| Bundle | WebGL chunk ≤ 150 KB gz | `size-limit` on `out/_next/static/chunks/*cockpit*` | Under 150 KB |
| Bundle | Booking chunk ≤ 80 KB gz | `size-limit` on the booking dynamic import | Under 80 KB |
| Bundle | Shared bundle ≤ 120 KB gz | `size-limit` on the shared chunk | Under 120 KB |
| Images | Every image has explicit width/height | Crawl `out/` for `<img` without `width`/`height` | Zero violations |
| Images | LCP image has `fetchpriority="high"` and `loading="eager"` | Grep the homepage HTML | Present |
| Images | All non-LCP images have `loading="lazy"` | Grep all route HTML | Present |
| Fonts | Preload tags present for Nunito 800 + Poppins 500 | Grep `<head>` of every route | Present on every route; Plex Mono only on data-label routes |
| Fonts | `font-display: swap` on every `@font-face` | Grep `globals.css` | Present |
| Fonts | Self-hosted (no `fonts.googleapis.com` in HTML) | Grep `out/` for `fonts.googleapis.com` | Zero hits |
| CWV lab | LCP ≤ 2.0s on every route | Lighthouse CI | All routes under 2.0s |
| CWV lab | INP ≤ 200ms on every route | Lighthouse CI | All routes under 200ms |
| CWV lab | CLS ≤ 0.1 on every route, ≤ 0.05 on homepage | Lighthouse CI | As specified |
| WebGL | Showpiece chunk not requested before LCP | Playwright network log on `/` | Chunk request timestamp > LCP timestamp |
| WebGL | Static fallback renders when `prefers-reduced-motion: reduce` | Playwright with reduced-motion emulation | Canvas not in DOM; fallback image present |
| WebGL | Static fallback renders when WebGL unsupported | Playwright with WebGL disabled | Canvas not in DOM; fallback image present |
| WebGL | Render loop pauses on `document.hidden` | Playwright: trigger visibilitychange, assert RAF count stops | RAF count flat during hidden |
| Booking | Widget mounts on `/discovery-flight/` scroll | Playwright: scroll to booking zone, assert widget in DOM | Widget in DOM |
| Booking | Flow completes under 60s on mobile | Playwright: mobile viewport, full flow | < 60s end-to-end |
| Booking | Offline fallback shows phone on API failure | Playwright: block API route, open widget | Phone number visible |
| Booking | No duplicate POST on retry | Playwright: fail first POST, assert no retry | One POST only |
| Accessibility | axe-core zero critical violations on every route + state | `@axe-core/playwright` | Zero critical |
| Accessibility | Keyboard-only nav reaches every CTA on `/` | Playwright keyboard | All CTAs reachable |
| Accessibility | Screen reader announces quick facts strip first | Manual VoiceOver / NVDA pass on `/` | Quick facts announced before story |
| Cache | Static assets have `immutable` cache header | `curl -I` on a hashed asset | `cache-control: public, max-age=31536000, immutable` |
| Cache | HTML has short TTL | `curl -I` on a route | `cache-control: public, max-age=300, must-revalidate` |
| Secrets | No secret in any `NEXT_PUBLIC_` var | Grep `.env*` and source | Zero matches |
| Secrets | No secret committed | `git-secrets` or `gitleaks` scan | Zero matches |