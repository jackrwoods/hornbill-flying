---
id: TICKET-027-plan
title: "Implementation plan: 404 page"
ticket: TICKET-027
status: draft
created: 2026-06-18
---

## 1. Scope summary

TICKET-027 builds the public 404 page at `/404/` for the Hornbill Flight Center static Next.js marketing site. The goal is to turn dead-end traffic into retained traffic by giving visitors friendly, on-brand copy, clear routes back to high-value pages, and a lightweight search or sitemap fallback. The page must be lightweight, inherit the site shell from TICKET-001, and avoid becoming the canonical URL for any real content.

What this ticket produces:

- A fully styled, accessible `not-found.tsx` page reachable as `/404/` (or `/404.html` depending on host rewrite rules) after static export.
- Friendly, brand-voice copy aligned with the Hornbill writing style guide.
- Four clear CTAs: Home, Discovery Flight, Programs, and Contact, plus a site-search fallback and a sitemap link.
- Correct SEO metadata (title, meta description, canonical) that does not accidentally override canonicals on real pages.
- No 404 URL entry in `sitemap.xml` or `robots.txt` disallow rules.
- Accessibility compliance: single H1, descriptive link text, keyboard focus order, color contrast.

What this ticket does **not** implement: a server-rendered 404 status (handled by host/CDN), a new site-search backend, a dedicated HTML sitemap page, or booking API integration.

---

## 2. Exact file paths to create or modify

### Modify (existing files from TICKET-001)

| File | Purpose |
|------|---------|
| `src/app/not-found.tsx` | Enhance the placeholder 404 page into the full, branded `/404/` page. This is the canonical App Router source for 404 output. |
| `src/lib/routes.ts` | Ensure the 404 CTAs reference stable routes and confirm the 404 route itself is excluded from the generated sitemap. |
| `src/lib/seo.ts` | Add a `buildNotFoundMetadata()` helper or confirm that per-page metadata can override the title template for 404. |

### Create (new files)

| File | Purpose |
|------|---------|
| `src/components/SiteSearchForm.tsx` | Client-side search form that submits `site:<domain> <query>` to Google. Lightweight, no backend. |
| `src/components/NotFoundHelp.tsx` | Composes the subheadline, site search prompt, and quick-link grid. |
| `src/components/QuickLinkGrid.tsx` | Reusable icon + link grid for Home, Discovery Flight, Programs, Contact, Fleet, Instructors, Location, Blog. |
| `public/images/404/hornill-crest-404.svg` or `.webp` | Optional small crest/illustration for the 404 page (fallback to existing `public/logo.jpeg` if an optimized asset is not ready). |
| `src/content/not-found.ts` | Copy map for the 404 page: headline, subheadline, body, search label, CTA labels. Keeps copy out of markup. |

### Verify (existing build/config files)

| File | Purpose |
|------|---------|
| `next.config.ts` | Confirm `output: 'export'`, `trailingSlash: true`, and `distDir: 'dist'` so `/404/` is generated correctly. |
| `src/app/sitemap.ts` | Confirm the sitemap generator filters out the 404 route and any unpublished routes. |
| `src/app/robots.ts` | Confirm `robots.txt` allows all user-agents and references the sitemap; no disallow for `/404/` is needed. |

---

## 3. Reusable components to use from TICKET-001 (shell) and other tickets

### From TICKET-001 (must already exist)

These components are introduced in TICKET-001 and are required for this page. TICKET-027 therefore **depends on TICKET-001 being complete**.

| Component | Usage on 404 page |
|-----------|-------------------|
| `app/layout.tsx` | Wraps the 404 page with global fonts, base metadata, base JSON-LD schema, Header, and Footer. |
| `Header` / `MobileNav` | Persistent sticky header and mobile menu so the user can navigate away from the dead end. |
| `Footer` | Provides canonical NAP and footer quick links. |
| `Container` | Max-width wrapper for the 404 content. |
| `Section` | Vertical spacing wrapper for the main 404 block. |
| `Button` | Primary/secondary CTA styling for the quick-link grid and search form. |
| `CTALink` | Reuse the existing "Book a discovery flight" CTA in the body copy. |
| `PhoneLink` | Optional contact CTA with the canonical phone number. |
| `NavLink` | If the quick-link grid needs active-state aware links. |
| `SchemaInjector` | Only if page-specific schema is added; otherwise base schema from layout is sufficient. |
| `src/lib/config.ts` | Source of truth for site base URL, NAP, brand name, and production domain used in site search. |
| `src/lib/seo.ts` | `buildTitle`, `buildCanonical`, `buildOpenGraph` helpers for page metadata. |
| `src/lib/routes.ts` | Route map for CTA destinations; ensures URLs stay consistent across tickets. |

### From other tickets (not blocking, but should match conventions)

| Component / Ticket | How it relates |
|--------------------|----------------|
| `DiscoveryFlightSection` / booking ticket | The 404 page links to `/discovery-flight/`; no booking widget is embedded. |
| Program page routes (TICKET-002 through TICKET-008) | The "Programs" CTA points to `/programs/` if a landing index exists, or to `/programs/private-pilot/` as a sensible default. If no program index is planned, link directly to `/programs/private-pilot/` and add a secondary "All programs" link that opens the header programs dropdown on click (fallback: link to homepage programs grid). |
| Contact page (TICKET-025) | The "Contact" CTA points to `/contact/`. |
| Blog index (TICKET-021) | Optional quick link to `/blog/` for content seekers. |

---

## 4. Page content/structure, schema markup, and SEO metadata

### 4.1 URL and status behavior

**Canonical public URL:** `/404/` (trailing slash per project convention).

**Next.js source:** `src/app/not-found.tsx`.

**Static export output:** With `output: 'export'` and `trailingSlash: true`, Next.js emits `dist/404/index.html`. Hosting providers (Vercel, Netlify, AWS CloudFront/S3, etc.) should map unmatched paths to this file and return HTTP `404`. The plan includes a verification step to confirm the host is configured accordingly.

**Important:** Do **not** create a separate `src/app/404/page.tsx` route; `not-found.tsx` is the canonical App Router mechanism and avoids duplicate 404 pages.

### 4.2 Metadata

**Title tag:**
```
Page Not Found | Hornbill Flight Center
```

**Meta description (under 155 characters):**
```
That route is not in our flight plan. Return to Hornbill Flight Center home, book a discovery flight, or view our programs.
```
(137 characters)

**Canonical:**
- Self-referencing canonical to `https://hornbillaviation.com/404/`.
- The 404 canonical must **not** be reused as the canonical for any other page.
- Do **not** add a `noindex` robots meta tag; the host will serve the file with a 404 status. (If host cannot guarantee 404 status, add `noindex` as a defensive fallback and document it.)

**OpenGraph / Twitter:**
- Inherit defaults from `src/lib/seo.ts` (`og:type=website`, site name, default OG image).
- Override `og:title` and `twitter:title` to `Page Not Found | Hornbill Flight Center`.
- Override `og:description` / `twitter:description` with the 404 meta description.

### 4.3 Content structure

Render order inside `not-found.tsx`:

1. **Visual anchor**
   - Hornbill crest logo (`public/logo.jpeg` or optimized 404 crest asset) at a modest size (e.g., 120–160 px width).
   - Alt text: "Hornbill Flight Center crest".

2. **H1**
   - Text: "Page not found".
   - This is the only H1 on the page.

3. **Subheadline (sentence-case H2 or large body text)**
   - Text: "That route is not in our flight plan."
   - Use a warm, on-brand tone. Avoid aviation clichés per the brand guide.

4. **Body copy**
   - "You may have mistyped the URL or the page has moved. Try a search, or choose one of the links below to get back on course."

5. **Site search prompt**
   - Label: "Search the site".
   - Input placeholder: "e.g., discovery flight, private pilot, fleet".
   - Submit button: "Search".
   - On submit, navigate to: `https://www.google.com/search?q=site:hornbillaviation.com%20<encoded-query>`.
   - Use `encodeURIComponent` for the query; keep the `site:` prefix literal.
   - No results are rendered on the page; the user is sent to Google.

6. **Quick-link grid (CTAs)**
   Primary four (must be prominent):
   - **Home** → `/` (icon: home or aircraft)
   - **Book a discovery flight** → `/discovery-flight/` (use `CTALink` component)
   - **View programs** → `/programs/` if an index exists, otherwise `/programs/private-pilot/` with a secondary "See all programs" disclosure trigger (fallback: homepage anchor `#programs`).
   - **Contact us** → `/contact/`

   Secondary links (smaller, in a second row or footer-adjacent block):
   - Fleet & Pricing → `/fleet/`
   - Instructors → `/instructors/`
   - Location → `/location/`
   - Blog → `/blog/`
   - Phone click-to-call: `+1-555-555-1234` (via `PhoneLink`)

7. **Sitemap link**
   - "See all pages on our sitemap." → `/sitemap.xml`.
   - Opens in a new tab or same tab; either is acceptable because `sitemap.xml` is machine-readable.

### 4.4 Schema markup

- Inherit base JSON-LD from `app/layout.tsx`: `Organization`, `LocalBusiness`, `EducationalOrganization`, `WebSite`.
- **Do not** add `BreadcrumbList` to the 404 page (a 404 is not part of the site hierarchy).
- **Do not** add `FAQPage`, `Service`, `Course`, `Article`, or `AggregateRating` schema to this page.
- Optional: include a minimal `WebPage` schema with `@type: WebPage`, `name: "Page not found"`, and `isPartOf` referencing the website `@id`. If added, the `@id` must be `https://hornbillaviation.com/404/#webpage` and the URL must be `https://hornbillaviation.com/404/`. Mark this as optional; base schema from layout is sufficient for launch.

### 4.5 Heading hierarchy

- H1: "Page not found" only.
- H2: "That route is not in our flight plan." (or a section title like "Get back on course" if the subheadline is rendered as large body text).
- H3: Quick-link group headings, if needed (e.g., "Popular pages").
- No skipped levels.

### 4.6 Copy voice checklist

Review all 404 copy against `thoughts/shared/design/brand_identity_writing_style.md`:

- Avoid: "unlock your potential", "soar to new heights", "sky's the limit", "passion for aviation", "world-class", "premier", LLM hedges.
- Use: direct second person, concrete CTAs, aviation terms naturally.
- Tone: friendly, reassuring, professional.

---

## 5. API/widget/data requirements

### APIs used directly by TICKET-027

None. The 404 page is fully static. The site-search form is a client-side redirect to Google with a `site:` operator; no backend call is made.

### Data files to create or modify

| File | Data |
|------|------|
| `src/content/not-found.ts` | Static copy object: `headline`, `subheadline`, `body`, `searchLabel`, `searchPlaceholder`, `searchButton`, `primaryCTAs[]` (label, routeKey, icon), `secondaryCTAs[]`, `sitemapLinkText`. |
| `src/lib/config.ts` | Read `siteUrl` for the Google `site:` search prefix. No writes unless the base URL is not yet defined (TICKET-001 responsibility). |
| `src/lib/routes.ts` | Read route entries for CTA destinations. Add a 404 route entry only if needed for type safety, but mark `published: false` and exclude from sitemap. |

### External integrations

- Google custom search redirect only. No API key, no search widget embedding.
- No analytics events required on 404, but optionally fire a `404_page_view` event if analytics is configured in a later ticket. Document this as optional.

---

## 6. Dependencies on other tickets

### Hard blockers (must be done first)

| Ticket | Why it blocks TICKET-027 |
|--------|--------------------------|
| **TICKET-001** — Site shell, shared components, and global SEO setup | Provides `app/layout.tsx`, Header, Footer, Container, Section, Button, CTALink, PhoneLink, `src/lib/config.ts`, `src/lib/seo.ts`, `src/lib/routes.ts`, base schema, and the initial `not-found.tsx` file. TICKET-027 modifies and extends that file. |

### Soft / content dependencies (can be stubbed)

| Ticket | What is needed | Fallback if not ready |
|--------|----------------|-----------------------|
| Program pages (TICKET-002–TICKET-008) | A real `/programs/` index or `/programs/private-pilot/` page | Link to homepage `#programs` grid and note in plan that the link target should be updated when program pages ship. |
| Discovery Flight page (TICKET-009 / booking ticket) | `/discovery-flight/` landing page | Link still points to `/discovery-flight/`; if the page is not built, the 404 page itself remains valid and the link will be a dead end until that ticket ships. |
| Contact page (TICKET-025) | `/contact/` page | Link still points to `/contact/`; stub page from shell is acceptable. |

### What does not block this ticket

- Real instructor photos/bios.
- Blog posts.
- Booking widget or Stripe integration.
- Pilot widgets.
- Real customer reviews.

---

## 7. Verification steps

### 7.1 Build and export verification

1. Run `npm install` (if not already done) and `npm run build`.
2. Confirm `dist/404/index.html` exists and contains:
   - `<title>Page Not Found | Hornbill Flight Center</title>`
   - Exactly one `<h1>` with text "Page not found".
   - The subheadline "That route is not in our flight plan."
   - All four primary CTAs (Home, Discovery Flight, Programs, Contact) with valid `href` values.
   - The site-search form.
3. Confirm there is no `dist/404.html` conflicting with `dist/404/index.html` (Next.js with `trailingSlash: true` should produce only the latter; if both exist, adjust `next.config.ts`).
4. Confirm no server-only Next.js APIs are used in `not-found.tsx`.

### 7.2 SEO metadata checks

1. Verify the `<title>` is exactly `Page Not Found | Hornbill Flight Center`.
2. Verify the meta description is under 155 characters and contains "discovery flight" and "programs".
3. Verify the canonical link points to `https://hornbillaviation.com/404/` (trailing slash, absolute URL).
4. Verify there is no `<meta name="robots" content="noindex" ...>` unless the host cannot return a 404 status.
5. Verify OpenGraph and Twitter title/description tags are present and correct.

### 7.3 Sitemap and robots.txt checks

1. Open `dist/sitemap.xml` and confirm `/404/` is **not** listed.
2. Open `dist/robots.txt` and confirm it contains `Allow: /` and references the sitemap.
3. Confirm `src/lib/routes.ts` either omits the 404 route or filters it with `published: false` / `excludeFromSitemap: true`.

### 7.4 Schema validation

1. Run the generated `dist/404/index.html` HTML through:
   - Google Rich Results Test (live or code-snippet mode).
   - Schema.org validator.
2. Confirm only inherited base schema (`Organization`, `LocalBusiness`, `EducationalOrganization`, `WebSite`) is present, and it is parseable.
3. If `WebPage` schema is added, confirm `@id` and `url` are exactly `https://hornbillaviation.com/404/` and `https://hornbillaviation.com/404/#webpage`, respectively.
4. Confirm NAP in schema matches the footer byte-for-byte: `1008 Gentry Way, Reno, NV 89512`, `+1-555-555-1234`, `office@hornbillaviation.com`.

### 7.5 Accessibility checks

1. Run axe-core or Lighthouse accessibility audit; target WCAG 2.2 AA with no critical errors.
2. Verify exactly one H1 on the page.
3. Verify heading hierarchy: H1 → H2 → H3 with no skipped levels.
4. Verify the search input has an associated `<label>` and the submit button has accessible text.
5. Verify all CTA links have descriptive text (no "Click here", no bare URLs).
6. Verify color contrast: `gold-500` on `navy-900` for UI accents passes AA; body text is `ink` on `cream-50` or `white`.
7. Verify keyboard focus order: logo → H1 → search input → search button → primary CTAs → secondary CTAs → footer links.

### 7.6 Functional checks

1. Click each CTA and confirm navigation to the correct route:
   - Home → `/`
   - Book a discovery flight → `/discovery-flight/`
   - View programs → `/programs/` (or fallback target documented in Section 4.3)
   - Contact us → `/contact/`
2. Submit the search form with a query and confirm the browser navigates to `https://www.google.com/search?q=site:hornbillaviation.com%20<query>`.
3. Confirm the sitemap link opens `/sitemap.xml`.
4. Confirm the phone link uses `tel:+15555551234`.

### 7.7 Host / CDN 404 status verification

1. Deploy or serve the `dist/` output through the target host/CDN.
2. Request a non-existent URL (e.g., `/this-page-does-not-exist/`).
3. Confirm the response body is the 404 page and the HTTP status is `404`.
4. If the host serves the 404 page body with a `200` status, reconfigure the host to return `404` for unmatched paths (or add `noindex` to the page metadata as a fallback and open a follow-up infrastructure ticket).

### 7.8 Cross-ticket contract checks

1. Confirm `src/app/not-found.tsx` does not import server-only Next.js APIs and does not define its own `Header`/`Footer` markup.
2. Confirm `src/content/not-found.ts` uses route keys from `src/lib/routes.ts` rather than hard-coded URLs.
3. Confirm the 404 page metadata uses `buildTitle`, `buildCanonical`, and `buildOpenGraph` from `src/lib/seo.ts`.
4. Confirm the 404 page can be updated independently of `app/layout.tsx`.

---

## 8. Implementation order (suggested)

1. Verify TICKET-001 is merged and `src/app/not-found.tsx`, `src/lib/config.ts`, `src/lib/routes.ts`, `src/lib/seo.ts`, and shared components exist.
2. Create `src/content/not-found.ts` with the 404 copy map.
3. Create `src/components/SiteSearchForm.tsx`.
4. Create `src/components/QuickLinkGrid.tsx`.
5. Create `src/components/NotFoundHelp.tsx` composing the subheadline, body, search form, and quick-link grid.
6. Modify `src/app/not-found.tsx` to render the logo, H1, `NotFoundHelp`, and inherited layout.
7. Update `src/lib/seo.ts` if a 404-specific metadata helper is needed; otherwise compose metadata inline in `not-found.tsx`.
8. Verify `src/lib/routes.ts` and `src/app/sitemap.ts` exclude `/404/`.
9. Add or optimize the 404 crest/visual asset in `public/images/404/` (or reuse `public/logo.jpeg`).
10. Run `npm run build`, fix errors, and execute the verification steps in Section 7.
11. Update ticket status and hand off to QA/deployment.
