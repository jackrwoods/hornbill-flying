---
id: TICKET-022-plan
title: "Implementation plan: Blog launch content"
ticket: TICKET-022
status: draft
created: 2026-06-18
---

# TICKET-022 — Blog Launch Content Implementation Plan

## 1. Scope summary

TICKET-022 produces the launch content cluster for the Hornbill Flight Center blog. This ticket is about **content and on-page SEO wiring**, not about building the blog engine or site shell.

What this ticket produces:

- One pillar page at `/blog/flight-training-reno-nv/` (2,500+ words, comprehensive guide to flight training in Reno).
- Seven cluster posts published in the first 90 days:
  1. Cost of a Private Pilot license in Nevada
  2. Part 61 vs Part 141
  3. First discovery flight at RNO
  4. Mountain flying in the Sierra Nevada
  5. Density altitude at KRNO
  6. Medical certificate guide for student pilots
  7. PPL timeline part-time vs full-time
- Eight MDX content files in `src/content/blog/` with complete frontmatter.
- A shared author data file (`src/content/authors.ts`) that maps each post's `author` slug to name, credentials, bio, photo, and LinkedIn.
- Content conventions that the blog template (TICKET-021) will consume: Article schema fields, FAQPage schema fields, hero images, internal-link targets, and Quick Answer Boxes.
- An editorial calendar note in `thoughts/shared/content-calendar.md` showing the 90-day publish order.

This ticket does **not** implement:

- The Next.js blog index page (`/blog/`)
- The `[slug]` post template or MDX rendering pipeline
- Author detail pages or instructor pages
- The booking widget, program pages, discovery-flight page, or pilot tools
- Any runtime API or CMS integration

Those are owned by TICKET-021 (blog infrastructure), TICKET-001 (shell), TICKET-003 (discovery flight), the program-page tickets, and TICKET-023 (pilot tools).

---

## 2. Exact file paths to create or modify

### New content files

| File | Purpose |
|------|---------|
| `src/content/blog/flight-training-reno-nv.mdx` | Pillar page: comprehensive Reno flight-training guide. |
| `src/content/blog/private-pilot-license-cost-nevada.mdx` | Cluster post #1: cost of PPL in Nevada. |
| `src/content/blog/part-61-vs-part-141.mdx` | Cluster post #2: Part 61 vs Part 141 comparison. |
| `src/content/blog/first-discovery-flight-rno.mdx` | Cluster post #3: what to expect on a first discovery flight. |
| `src/content/blog/mountain-flying-sierra-nevada.mdx` | Cluster post #4: mountain flying guide. |
| `src/content/blog/density-altitude-krno.mdx` | Cluster post #5: density altitude at RNO. |
| `src/content/blog/medical-certificate-student-pilots.mdx` | Cluster post #6: medical certificate guide. |
| `src/content/blog/ppl-timeline-part-time-vs-full-time.mdx` | Cluster post #7: training timeline. |
| `src/content/authors.ts` | Author registry for blog bylines. |

### Static assets

| File | Purpose |
|------|---------|
| `public/images/blog/flight-training-reno-nv-hero.webp` | Pillar hero image (real PA28 at RNO, 1200×630 and 16:9 crop). |
| `public/images/blog/<post-slug>-hero.webp` | One hero image per cluster post. |
| `public/images/blog/authors/<author-slug>.webp` | Author headshots (or reuse instructor photos once available). |
| `public/images/blog/<post-slug>-inline-*.webp` | Optional inline photos/diagrams (mountain routes, density-altitude diagram, etc.). |

### Modify (soft edits, mostly route/config updates)

| File | Change |
|------|--------|
| `src/lib/routes.ts` (TICKET-001) | Ensure `/blog/` and every post slug are registered as published routes so nav, sitemap, and breadcrumbs include them. |
| `src/content/programs.ts` (TICKET-001) | Confirm program URLs referenced in posts match (`/programs/private-pilot/`, etc.). |
| `src/content/instructors.ts` (TICKET-001) | If real CFIs exist, align author slugs; otherwise leave placeholders and note TODO in `src/content/authors.ts`. |
| `thoughts/shared/content-calendar.md` | Add the 90-day publish schedule (create the file if it does not exist). |

---

## 3. Reusable components to use from TICKET-001 (shell) and other tickets

### From TICKET-001 — hard prerequisite

| Component / file | How it is used |
|------------------|----------------|
| `src/app/layout.tsx` | Wraps every page with fonts, global metadata, header, footer, and base schema. |
| `Header` / `MobileNav` | Blog index and post pages inherit the global nav, including the persistent CTA. |
| `Footer` | Inherits canonical NAP and footer links. |
| `Container` | Max-width wrapper for blog index and post body. |
| `Section` | Vertical rhythm for page sections. |
| `PageHeader` | Breadcrumb + H1 + subtitle on the blog index (if needed) and on any standalone landing pages. |
| `Button` / `CTALink` | Post CTAs to `/discovery-flight/` and program pages. |
| `PhoneLink` | Click-to-call link in byline/contact CTAs. |
| `SchemaInjector` + `src/lib/schema.ts` | Inject Article, FAQPage, and BreadcrumbList JSON-LD per post. |
| `FAQAccordion` | Render FAQ sections inside posts with FAQPage schema support. |
| `src/lib/seo.ts` | Build per-post title, description, canonical, OpenGraph. |
| `src/lib/routes.ts` | Single source of truth for all internal link targets. |

### From TICKET-021 — blog infrastructure (hard prerequisite)

| Component / file | How it is used |
|------------------|----------------|
| Blog post template (`src/app/blog/[slug]/page.tsx`) | Renders each MDX file. Must read frontmatter, pass author data, and inject Article/FAQPage schema. |
| Blog index page (`src/app/blog/page.tsx`) | Lists the 8 launch posts (and later posts). |
| `AuthorBio` component | Renders the named author byline + bio at the bottom of each post. |
| `ArticleSchema` component | Emits Article / BlogPosting JSON-LD from frontmatter + author data. |
| `BlogCard` / `PostCard` | Renders post teasers on `/blog/` and in the homepage `LatestPosts` section. |
| `RelatedPosts` component | Suggests related cluster posts at the end of each article. |
| `MdxComponents` mapping | Supplies styled headings, paragraphs, lists, links, images, and callout blocks for MDX content. |
| Reading-time helper | Computes reading time from MDX body for the byline. |

### From dependent page tickets (soft prerequisites for internal links)

| Ticket | Asset used in blog content |
|--------|----------------------------|
| TICKET-003 — Discovery Flight | `/discovery-flight/` links in every post. |
| Program-page tickets | `/programs/private-pilot/`, `/programs/sport-pilot/`, `/programs/instrument-rating/`, `/programs/commercial-pilot/`, `/programs/certified-flight-instructor/`, `/programs/cfii/`, `/programs/mountain-flying/`. |
| TICKET-023 — Pilot tools | Links to `/tools/density-altitude-calculator/` and `/tools/cross-country-estimator/` where relevant. |
| Instructor / about pages | Author bio pages at `/instructors/<slug>/` or `/about/`. |

---

## 4. Page content/structure, schema markup, and SEO metadata

### 4.1 Global blog conventions (must be enforced in every MDX file)

**Frontmatter contract** (example shown with pillar post values):

```mdx
---
title: "Flight training in Reno, NV: a complete guide"
description: "Everything you need to know about learning to fly in Reno, from choosing a Part 61 school and fleet type to checkride costs and mountain flying at RNO."
slug: "flight-training-reno-nv"
date: "2026-07-01"
updated: "2026-07-01"
author: "alex-morgan"
category: "Getting Started"
tags: ["Reno", "RNO", "Part 61", "flight training", "PA28"]
heroImage: "/images/blog/flight-training-reno-nv-hero.webp"
heroAlt: "Hornbill PA28 Cherokee on the ramp at Reno-Tahoe International Airport"
wordCountTarget: 2600
quickAnswer: "Hornbill Flight Center is a Part 61 flight school at Reno–Tahoe (RNO) offering Sport Pilot through CFII training in a consistent PA28 fleet. Students choose their instructor, train at their own pace, and can rent the same aircraft for real cross-country trips."
faq:
  - question: "What is a Part 61 flight school?"
    answer: "Part 61 schools follow FAA regulations in 14 CFR Part 61, training one student at a time with flexible scheduling. You choose your instructor and pace, unlike the fixed curriculum of most Part 141 academies."
  - question: "How much does flight training cost in Reno?"
    answer: "Total cost depends on certificate, hours, and membership. Member PA28 wet rate is $159/hour; non-member is $185/hour. A Private Pilot certificate typically runs $12,000–$18,000 all-in at RNO."
  - question: "Do I need a medical certificate to start?"
    answer: "No medical is required for a discovery flight. Sport Pilot and Private Pilot students need at least a third-class medical before solo."
---
```

**Required frontmatter fields**

- `title` — unique, sentence case, ≤60 characters.
- `description` — unique per post, ≤155 characters, includes target keyword + Reno/RNO.
- `slug` — matches filename, URL-safe, hyphenated.
- `date` — ISO publish date.
- `updated` — ISO date (can equal `date` at launch).
- `author` — slug matching an entry in `src/content/authors.ts`.
- `category` — one of: `Getting Started`, `Cost & Planning`, `Training Tips`, `Safety & Mountain Flying`, `Medical & Certification`.
- `tags` — 3–6 tags.
- `heroImage` — absolute path to optimized WebP.
- `heroAlt` — descriptive alt text including aircraft type and RNO where natural.
- `wordCountTarget` — used during copy review, not build logic.
- `quickAnswer` — 50–70 word direct answer for AI/answer-engine optimization. Rendered in a styled callout near the top of the post and used as the `abstract` field in Article schema.
- `faq` — optional array of `{question, answer}` pairs. Required on posts where FAQPage schema is appropriate.

**Permalink and title-tag convention**

- URL: `https://hornbillaviation.com/blog/<slug>/`
- Title tag: `<Primary keyword> | Hornbill Flight Center` (under 60 chars).
- Canonical: self-referencing with trailing slash.
- OpenGraph type: `article` for posts, `website` for `/blog/`.

### 4.2 Pillar page: `/blog/flight-training-reno-nv/`

**Metadata**

| Element | Value |
|---------|-------|
| Title tag | `Flight Training in Reno, NV: A Complete Guide | Hornbill Flight Center` |
| Meta description | `Learn to fly in Reno with a Part 61 school at RNO. Choose your instructor, train in a PA28 fleet, and see real costs, timelines, and mountain-flying tips.` |
| H1 | `Flight training in Reno, NV` |
| Subtitle | `A practical guide to certificates, costs, schedules, and flying in the Sierra Nevada.` |
| Word-count target | 2,600+ words |
| Author | `alex-morgan` (placeholder CFI; update once real CFIs are hired) |

**Suggested content outline**

1. **Quick Answer Box** — 50–70 word answer summarizing the whole topic.
2. **Why Reno is a strong training environment** — high-altitude, mountain flying, Class C exposure, weather diversity.
3. **Part 61 vs Part 141** — link to cluster post and `/about/`.
4. **Certificates and ratings available at Hornbill** — SPL, PPL, IR, CPL, CFI, CFII, Mountain Flying; link each to its program page.
5. **The PA28 fleet advantage** — consistency, predictable costs; link to `/fleet/`.
6. **Cost breakdown** — member vs non-member wet rate, membership, instructor estimates, materials, checkride; link to cost cluster post and `/financing/`.
7. **Typical timelines** — part-time vs full-time; link to timeline cluster post.
8. **Discovery flight: the best first step** — link to `/discovery-flight/`.
9. **Medical certificates** — link to medical cluster post.
10. **Mountain flying and density altitude** — link to mountain-flying and density-altitude cluster posts, plus `/programs/mountain-flying/`.
11. **Choosing an instructor** — link to `/instructors/`.
12. **Next steps / CTA** — primary CTA to `/discovery-flight/`, secondary to `/contact/`.

**Schema markup**

- `Article` (or `BlogPosting`) with headline, image, datePublished, dateModified, author Person, publisher Organization, description, mainEntityOfPage.
- `FAQPage` if FAQ frontmatter is provided.
- `BreadcrumbList`: Home → Blog → Flight Training in Reno, NV.

### 4.3 Cluster post specifications

| # | Slug | Title tag / H1 | Word count | Category | Author | FAQPage? |
|---|------|----------------|------------|----------|--------|----------|
| 1 | `private-pilot-license-cost-nevada` | `Private Pilot License Cost in Nevada | Hornbill Flight Center` / `How much does a Private Pilot license cost in Nevada?` | 1,200 | Cost & Planning | `alex-morgan` | Yes |
| 2 | `part-61-vs-part-141` | `Part 61 vs Part 141: Which Is Right for You? | Hornbill Flight Center` / `Part 61 vs Part 141: which is right for you?` | 1,000 | Getting Started | `alex-morgan` | Yes |
| 3 | `first-discovery-flight-rno` | `First Discovery Flight at RNO: What to Expect | Hornbill Flight Center` / `What to expect on your first discovery flight at RNO` | 1,000 | Getting Started | `jordan-lee` | Yes |
| 4 | `mountain-flying-sierra-nevada` | `Mountain Flying in the Sierra Nevada | Hornbill Flight Center` / `Mountain flying in the Sierra Nevada: a guide for Reno pilots` | 1,400 | Safety & Mountain Flying | `jordan-lee` | Yes |
| 5 | `density-altitude-krno` | `Density Altitude at KRNO: What Student Pilots Need to Know | Hornbill Flight Center` / `Density altitude at KRNO: what student pilots need to know` | 1,100 | Safety & Mountain Flying | `alex-morgan` | Yes |
| 6 | `medical-certificate-student-pilots` | `Medical Certificate Guide for Student Pilots | Hornbill Flight Center` / `Medical certificate guide for student pilots` | 1,200 | Medical & Certification | `jordan-lee` | Yes |
| 7 | `ppl-timeline-part-time-vs-full-time` | `PPL Timeline: Part-Time vs Full-Time Training | Hornbill Flight Center` / `How long does PPL training take part-time vs full-time?` | 1,100 | Cost & Planning | `alex-morgan` | Yes |

**Each cluster post must include:**

- A Quick Answer Box near the top (50–70 words).
- 3–5 contextual internal links to program pages, the pillar page, `/discovery-flight/`, `/fleet/`, `/membership/`, `/financing/`, `/contact/`, `/tools/density-altitude-calculator/`, or `/tools/cross-country-estimator/`.
- A link back to the pillar page `/blog/flight-training-reno-nv/` using descriptive anchor text.
- A byline block at the end with author name, credentials, short bio, and optional LinkedIn link.
- One primary CTA to `/discovery-flight/` and one secondary CTA to `/contact/`.
- At least one hero image with explicit width/height and descriptive `alt`.

### 4.4 Author data: `src/content/authors.ts`

```ts
export type Author = {
  slug: string;
  name: string;
  credentials: string;
  bio: string;
  photo: string;
  linkedIn?: string;
  isPlaceholder?: boolean;
};

export const authors: Author[] = [
  {
    slug: "alex-morgan",
    name: "Alex Morgan",
    credentials: "Certified Flight Instructor (CFI), Commercial Pilot",
    bio: "Alex teaches Private Pilot and Instrument Rating students at Hornbill Flight Center. They specialize in mountain-flying instruction and helping part-time students stay on schedule.",
    photo: "/images/blog/authors/alex-morgan.webp",
    linkedIn: "https://www.linkedin.com/in/alex-morgan-placeholder",
    isPlaceholder: true,
  },
  {
    slug: "jordan-lee",
    name: "Jordan Lee",
    credentials: "CFI, CFII, Commercial Pilot",
    bio: "Jordan is a Hornbill instructor with a focus on discovery flights, student medical certification guidance, and transition training into the Reno mountain environment.",
    photo: "/images/blog/authors/jordan-lee.webp",
    linkedIn: "https://www.linkedin.com/in/jordan-lee-placeholder",
    isPlaceholder: true,
  },
];
```

Notes:

- Certificate numbers are intentionally omitted at launch per the design doc.
- `isPlaceholder` flags authors that must be replaced with real CFIs once hired/photographed.
- If instructor pages ship before blog launch, use the same slugs in `src/content/instructors.ts` so author bylines link to `/instructors/<slug>/`.

### 4.5 Schema markup requirements per post

**Article / BlogPosting JSON-LD**

| Field | Source |
|-------|--------|
| `@type` | `Article` (preferred) or `BlogPosting` |
| `headline` | Frontmatter `title` |
| `description` | Frontmatter `description` |
| `image` | Absolute URL from `heroImage` |
| `author` | `{ @type: "Person", name, url: <instructor or author page>, jobTitle: <credentials> }` |
| `publisher` | References `/#organization` from root layout |
| `datePublished` | Frontmatter `date` |
| `dateModified` | Frontmatter `updated` |
| `mainEntityOfPage` | Post canonical URL |
| `articleSection` | Frontmatter `category` |
| `keywords` | Frontmatter `tags` |
| `abstract` | Frontmatter `quickAnswer` |

**FAQPage JSON-LD (where `faq` frontmatter exists)**

- `@id`: `<canonical-url>/#faqpage`
- `mainEntity`: array of `Question` / `Answer`
- Each `Answer.text` must be plain text; strip any Markdown links or render a plain-text fallback.

**BreadcrumbList JSON-LD**

- Home → Blog → Post title (or Home → Blog for the index page).

**Other schemas**

- Base `Organization`, `LocalBusiness`, and `EducationalOrganization` are already injected by the root layout from TICKET-001. Do not duplicate them on individual posts.

### 4.6 SEO metadata per post

- Unique title tag under 60 characters.
- Unique meta description under 155 characters.
- Self-referencing canonical with trailing slash.
- OpenGraph `og:type` = `article` for posts.
- OpenGraph `og:image` = absolute hero image URL (1200×630 recommended).
- Twitter card = `summary_large_image`.
- `robots` meta defaults to `index, follow`.
- H1 is the post title (or a close variant) and must be the only H1.

### 4.7 Heading hierarchy rules

- One H1 per post (rendered by the blog template from frontmatter `title`).
- H2 for major sections.
- H3 for subsections.
- H4 only for small labels inside tables/cards.
- Do not skip levels.

### 4.8 Internal-linking rules

- 3–5 contextual links per post, minimum.
- Anchor text must describe the destination (`discovery flight page`, `Private Pilot program page`, `pillar guide to flight training in Reno`).
- Every post links back to the pillar page `/blog/flight-training-reno-nv/`.
- Every post links to `/discovery-flight/`.
- Cost posts link to `/fleet/`, `/membership/`, `/financing/`, and `/programs/private-pilot/`.
- Mountain/density posts link to `/programs/mountain-flying/` and `/tools/density-altitude-calculator/`.
- Medical post links to `/programs/private-pilot/` and `/programs/sport-pilot/`.
- Timeline post links to `/programs/private-pilot/` and cost cluster post.

---

## 5. API/widget/data requirements

### Build-time data

- The blog infrastructure ticket (TICKET-021) must provide an MDX loader that reads `src/content/blog/*.mdx` and extracts frontmatter.
- `src/content/authors.ts` is imported at build time to resolve author data.
- Post routes are generated via `generateStaticParams` in `src/app/blog/[slug]/page.tsx` (TICKET-021).
- Sitemap generation (TICKET-001 / TICKET-021) must include all `/blog/<slug>/` URLs and their `lastmod` dates.

### Runtime APIs

- **None.** Blog posts are static HTML pages. No runtime CMS, database, or external API calls are required for content delivery.
- Pilot-tool links (e.g., `/tools/density-altitude-calculator/`) call APIs only on those widget pages, not inside blog posts.

### Analytics events (to add when analytics infrastructure ships)

- `blog_post_view` — page view with post slug.
- `discovery_flight_booking_started` — on the primary CTA in each post.
- `internal_link_click` — data attribute on contextual links showing destination.
- `author_link_click` — on byline links.

---

## 6. Dependencies on other tickets

### Hard blockers (must be completed first)

| Ticket | Why it blocks |
|--------|---------------|
| **TICKET-001** — Site shell, shared components, global SEO setup | Provides the root layout, header/footer, route map, schema helpers, SEO helpers, `Container`/`Section`/`PageHeader`/`Button`/`CTALink`/`PhoneLink`/`SchemaInjector`/`FAQAccordion`, and static-export config. |
| **TICKET-021** — Blog infrastructure | Provides the `/blog/` index page, the `/blog/[slug]/` post template, MDX parsing, frontmatter-to-schema wiring, author-bio rendering, related-posts logic, and sitemap integration. Without it, the MDX files have nowhere to render. |

### Soft dependencies (consume when ready; content can link to stubs)

| Ticket / page | Dependency detail |
|---------------|-------------------|
| TICKET-003 — Discovery Flight page | Every post links to `/discovery-flight/`. The link can resolve to a stub route if necessary, but the route should exist in `routes.ts`. |
| Program-page tickets | Posts link to `/programs/*`. Stubs are acceptable at build time. |
| Instructor / author-page ticket | Author bylines can link to `/instructors/<slug>/` once those pages exist. If they do not exist, keep the byline unlinked but include the author photo and bio. |
| TICKET-018 — Financing page | Cost posts link to `/financing/` for Stratus Financial context. |
| TICKET-023 — Pilot tools | Mountain/density posts link to `/tools/density-altitude-calculator/` and `/tools/cross-country-estimator/`. |
| Visual identity + brand writing style | Already available as design files; used for copy voice and image treatment. |

### Ordering recommendation

1. Complete TICKET-001 first.
2. Complete or run TICKET-021 in parallel with this ticket. Both need each other: the template needs sample content, and content needs a template to render against.
3. Write all eight MDX files and `src/content/authors.ts` in a single branch so the template can be tested against real frontmatter.
4. Update `src/lib/routes.ts` and the sitemap as routes are added.
5. Coordinate with the discovery-flight and program-page tickets so internal links resolve before launch.

---

## 7. Verification steps

### 7.1 Build and export verification

1. Run `npm install` and `npm run build`.
2. Confirm `dist/blog/index.html` and `dist/blog/<slug>/index.html` are generated for all 8 slugs.
3. Confirm no build-time MDX parsing errors or TypeScript errors (`tsc --noEmit`).
4. Confirm no Next.js server-only features are used on blog routes.
5. Confirm `next-sitemap` (or the dynamic `sitemap.ts`) emits all 8 post URLs.

### 7.2 SEO metadata checks

1. Verify every post has a unique title tag under 60 characters.
2. Verify every post has a unique meta description under 155 characters that includes a target keyword and `Reno`, `RNO`, or `Hornbill`.
3. Verify canonical URLs are self-referencing with trailing slashes (`https://hornbillaviation.com/blog/<slug>/`).
4. Verify OpenGraph `og:title`, `og:description`, `og:url`, and `og:image` are present and use absolute URLs.
5. Verify `/blog/` index page title and description are unique vs. homepage and posts.

### 7.3 Schema validation

1. Run each generated post HTML through:
   - Google Rich Results Test
   - Schema.org validator (validator.schema.org)
2. Confirm every post contains `Article` (or `BlogPosting`) JSON-LD with:
   - `headline`, `description`, `image`, `author` (Person), `publisher` (Organization), `datePublished`, `dateModified`, `mainEntityOfPage`.
3. Confirm posts with `faq` frontmatter contain valid `FAQPage` JSON-LD with `Question`/`Answer` pairs.
4. Confirm `BreadcrumbList` JSON-LD on every post: Home → Blog → Post.
5. Confirm no duplicate `@id` values and all URLs are absolute.
6. Confirm base `Organization` / `LocalBusiness` schemas from the layout still validate (no regressions).

### 7.4 Content quality checks

1. Confirm pillar post body is 2,500+ words (count body text, not frontmatter).
2. Confirm each cluster post is at least 900 words.
3. Confirm every post includes a 50–70 word Quick Answer Box near the top.
4. Confirm every post has 3–5 contextual internal links with descriptive anchor text (no `click here`, `learn more`, `read more`).
5. Confirm every cluster post links back to the pillar page.
6. Confirm every post links to `/discovery-flight/`.
7. Confirm no aviation clichés or LLM hedges (`soar to new heights`, `unlock your potential`, `passion for aviation`, `it's important to note`, `at the end of the day`, etc.).
8. Confirm no empty superlatives (`best`, `premier`, `world-class`).
9. Confirm all prices/rates match the design doc: member `$159/hour wet`, non-member `$185/hour wet`, membership `$49/month`, discovery flight `$199`.
10. Confirm NAP is byte-for-byte consistent wherever mentioned: `1008 Gentry Way, Reno, NV 89512`, `+1-555-555-1234`, `office@hornbillaviation.com`.

### 7.5 Author and byline checks

1. Confirm every post frontmatter `author` matches an entry in `src/content/authors.ts`.
2. Confirm the rendered byline shows name, credentials, short bio, and photo.
3. Confirm certificate numbers are not published at launch (per owner decision).
4. Confirm placeholder authors are flagged with `isPlaceholder: true`.

### 7.6 Image checks

1. Confirm every hero image is WebP (or AVIF with WebP fallback), optimized, and has explicit width/height.
2. Confirm every image has descriptive `alt` text that includes location/aircraft where natural.
3. Confirm the pillar hero image `fetchpriority="high"` and `loading="eager"` (if rendered above the fold).

### 7.7 Accessibility and heading checks

1. Run axe-core or Lighthouse on `/blog/` and every post page.
2. Confirm exactly one H1 per page and no skipped heading levels.
3. Confirm FAQ accordion buttons use `aria-expanded` and `aria-controls` (if FAQ sections are rendered with `FAQAccordion`).
4. Confirm touch targets ≥44 px on CTAs and accordion toggles.

### 7.8 Link and navigation checks

1. Crawl `dist/` and confirm all internal links resolve to existing `index.html` files:
   - `/blog/flight-training-reno-nv/`
   - `/blog/private-pilot-license-cost-nevada/`
   - `/blog/part-61-vs-part-141/`
   - `/blog/first-discovery-flight-rno/`
   - `/blog/mountain-flying-sierra-nevada/`
   - `/blog/density-altitude-krno/`
   - `/blog/medical-certificate-student-pilots/`
   - `/blog/ppl-timeline-part-time-vs-full-time/`
   - `/discovery-flight/`
   - All linked `/programs/*` pages
2. Confirm the blog index page links to all 8 posts.
3. Confirm the homepage `LatestPosts` section (TICKET-001) surfaces the 3 most recent posts once content exists.

### 7.9 Editorial calendar check

1. Confirm `thoughts/shared/content-calendar.md` lists the 90-day publish order for the 7 cluster posts.
2. Confirm the pillar page is scheduled as the first publication, with cluster posts following weekly or bi-weekly.

---

## 8. Implementation order (suggested)

1. Finalize TICKET-001 and TICKET-021 (or run them in lockstep).
2. Create `src/content/authors.ts` with two placeholder CFIs.
3. Create hero-image assets in `public/images/blog/` and `public/images/blog/authors/`.
4. Draft the pillar MDX file (`src/content/blog/flight-training-reno-nv.mdx`) first to establish tone and link conventions.
5. Draft the 7 cluster MDX files, reusing the same frontmatter shape and linking back to the pillar.
6. Update `src/lib/routes.ts` and the sitemap to publish all 8 routes.
7. Render the blog index page and each post through the TICKET-021 template.
8. Run the verification checklist, fix any MDX/schema/SEO errors, and update the editorial calendar.
9. Mark the ticket complete and hand off to the content/editorial owner for final copy review and author replacement.
