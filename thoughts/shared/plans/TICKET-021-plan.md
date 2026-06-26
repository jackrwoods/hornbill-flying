---
id: TICKET-021-plan
title: "Implementation plan: Blog infrastructure"
ticket: TICKET-021
status: draft
created: 2026-06-18
related_tickets:
  - TICKET-001
  - TICKET-002
  - TICKET-003
  - TICKET-004
  - TICKET-005
  - TICKET-006
  - TICKET-007
  - TICKET-008
  - TICKET-009
  - TICKET-010
  - TICKET-011
  - TICKET-013
  - TICKET-014
related_design:
  - thoughts/shared/design/website_layout_design.md
  - thoughts/shared/design/brand_identity_writing_style.md
  - thoughts/shared/design/visual_identity.md
---

# TICKET-021 — Blog Infrastructure Implementation Plan

## 1. Scope summary

TICKET-021 builds the content hub that Hornbill Aviation will use for SEO authority and prospective-student nurture. It creates a static-site blog pipeline, an index page, a post-detail template, and archive pages for categories and tags.

What this ticket produces:

- A Markdown/MDX content pipeline under `src/content/blog/`.
- A static `/blog/` index page that lists all posts, surfaces the pillar page, and links to category/tag archives.
- A dynamic `/blog/[slug]/` post template rendered at build time via `generateStaticParams`.
- Optional `/blog/category/[category]/` and `/blog/tag/[tag]/` archive pages for topical clustering and long-tail SEO.
- Author bylines that map blog authors to either instructor detail pages (`/instructors/[slug]/`) or a dedicated author record for non-instructor contributors.
- Article schema on every post; FAQPage schema when a post includes an FAQ block.
- Internal-linking conventions that connect every post to relevant program pages, the discovery-flight page, and the pillar page.
- Launch content stubs for the pillar page and at least one cluster post so the index is not empty at build time.

What this ticket does **not** implement:

- A client-side CMS or admin interface (content is file-based; future CMS integration is out of scope).
- Live comment system, search, or pagination beyond archive grouping.
- The full editorial calendar workflow (content scheduling lives in `thoughts/shared/content-calendar.md`, maintained separately).

## 2. Project conventions (set by TICKET-001)

The site is a Next.js 15+ App Router project configured for **static export** (`output: 'export'`, `distDir: 'dist'`, trailing-slash URLs). This ticket follows the file/folder conventions established in TICKET-001:

```
/Users/jack/hornbill-flying/
├── next.config.ts                    # TICKET-001: output: 'export', distDir: 'dist', trailingSlash
├── package.json                      # TICKET-001
├── tailwind.config.ts                # TICKET-001: theme tokens
├── src/
│   ├── app/
│   │   ├── layout.tsx                # TICKET-001: RootLayout, global metadata, header/footer
│   │   ├── blog/
│   │   │   ├── page.tsx              # THIS TICKET — blog index
│   │   │   ├── [slug]/page.tsx       # THIS TICKET — blog post detail
│   │   │   ├── category/
│   │   │   │   └── [category]/page.tsx  # THIS TICKET — category archive
│   │   │   └── tag/
│   │   │       └── [tag]/page.tsx    # THIS TICKET — tag archive
│   │   ├── discovery-flight/page.tsx # TICKET-003: internal-link target
│   │   ├── programs/*/page.tsx       # TICKET-005–011: internal-link targets
│   │   └── instructors/[slug]/page.tsx # TICKET-014: author-link target
│   ├── components/
│   │   ├── Header.tsx                # TICKET-001
│   │   ├── Footer.tsx                # TICKET-001
│   │   ├── MobileNav.tsx             # TICKET-001
│   │   ├── Container.tsx             # TICKET-001
│   │   ├── Section.tsx               # TICKET-001
│   │   ├── PageHeader.tsx            # TICKET-001
│   │   ├── Button.tsx                # TICKET-001
│   │   ├── CTALink.tsx               # TICKET-001
│   │   ├── PhoneLink.tsx             # TICKET-001
│   │   ├── SchemaInjector.tsx        # TICKET-001
│   │   ├── FAQAccordion.tsx          # TICKET-001
│   │   ├── BlogPostCard.tsx          # THIS TICKET
│   │   ├── BlogAuthorBio.tsx         # THIS TICKET
│   │   ├── BlogTagList.tsx           # THIS TICKET
│   │   ├── TableOfContents.tsx       # THIS TICKET
│   │   ├── RelatedPosts.tsx          # THIS TICKET
│   │   └── LatestPosts.tsx           # THIS TICKET (also consumed by TICKET-002 homepage)
│   ├── lib/
│   │   ├── config.ts                 # TICKET-001
│   │   ├── seo.ts                    # TICKET-001
│   │   ├── schema.ts                 # TICKET-001 + THIS TICKET additions
│   │   ├── routes.ts                 # TICKET-001 + THIS TICKET additions
│   │   └── utils.ts                  # TICKET-001
│   ├── content/
│   │   ├── site.ts                   # TICKET-001
│   │   ├── programs.ts               # TICKET-005–011 / TICKET-001
│   │   ├── instructors.ts            # TICKET-013–014
│   │   ├── authors.ts                # THIS TICKET
│   │   ├── blog/
│   │   │   ├── flight-training-reno-nv.mdx   # THIS TICKET — pillar page
│   │   │   └── private-pilot-license-cost-nevada.mdx  # THIS TICKET — cluster post stub
│   │   └── faq.ts                    # TICKET-001 / other tickets
│   └── styles/
│       └── globals.css               # TICKET-001
├── public/
│   └── images/
│       ├── blog/                     # THIS TICKET — hero images and post assets
│       └── instructors/              # TICKET-013–014 — reused for author photos
└── dist/                             # static export output
```

## 3. Exact file paths to create or modify

### New application routes

| File | Purpose |
|------|---------|
| `src/app/blog/page.tsx` | Blog index route. Renders the page H1, featured/pillar post, latest-post grid, category list, and discovery-flight CTA. |
| `src/app/blog/[slug]/page.tsx` | Dynamic blog post route with `generateStaticParams`, page-level metadata, Article schema, and post composition. |
| `src/app/blog/category/[category]/page.tsx` | Category archive route with `generateStaticParams` and category-specific H1/metadata. |
| `src/app/blog/tag/[tag]/page.tsx` | Tag archive route with `generateStaticParams` and tag-specific H1/metadata. |

### New reusable blog components (under `src/components/`)

| File | Purpose |
|------|---------|
| `src/components/BlogPostCard.tsx` | Teaser card for a post: hero image, title, excerpt, date, category, author, read-time estimate. Used on index, archives, and homepage. |
| `src/components/BlogAuthorBio.tsx` | Author byline block: photo, name, credentials, short bio, link to instructor page or author record. |
| `src/components/BlogTagList.tsx` | Renders category and tag chips; links to archive pages. |
| `src/components/TableOfContents.tsx` | Auto-generated TOC from post headings (H2/H3). Client-side only; collapsible on mobile. |
| `src/components/RelatedPosts.tsx` | Lists 3 related posts by shared category/tag, with fallback to latest posts. |
| `src/components/LatestPosts.tsx` | Renders the N most recent posts; consumed by homepage (TICKET-002) and blog sidebar. |
| `src/components/Prose.tsx` | Typography wrapper for MDX-rendered content (max-width, heading spacing, link color, list styles). |
| `src/components/PostHero.tsx` | Hero block for a post: title, description, hero image, author/date/read-time. |
| `src/components/PostFAQ.tsx` | FAQ block rendered inside a post; emits FAQPage schema when present. |

### New section components (under `src/sections/blog/`)

| File | Purpose |
|------|---------|
| `src/sections/blog/BlogIndexHeroSection.tsx` | Index page header: H1, subheadline, category chips. |
| `src/sections/blog/BlogIndexGridSection.tsx` | Grid of post cards with optional pillar/featured post treatment. |
| `src/sections/blog/BlogIndexSidebarSection.tsx` | Sidebar with category list, tag cloud, discovery-flight CTA, and latest posts. |
| `src/sections/blog/BlogPostBodySection.tsx` | Wrapper that renders MDX content inside `Prose`, with TOC and author bio. |
| `src/sections/blog/BlogPostCTASection.tsx` | Bottom-of-post CTA block linking to discovery flight or a relevant program page. |

### New content/data files

| File | Purpose |
|------|---------|
| `src/content/authors.ts` | Author registry. Each author has `slug`, `name`, `role`, `bio`, `photo`, `linkedin`, and an `instructorSlug` when the author maps to an instructor page. |
| `src/content/blog.ts` *(optional loader/index)* | Helper that reads `src/content/blog/*.mdx`, validates frontmatter, sorts by date, and exposes `getAllPosts()`, `getPostBySlug()`, `getPostsByCategory()`, `getPostsByTag()`, `getAllCategories()`, `getAllTags()`. |
| `src/content/blog/flight-training-reno-nv.mdx` | Launch pillar page: comprehensive guide to flight training in Reno (~2,500+ words). Frontmatter + body + internal links + FAQ block. |
| `src/content/blog/private-pilot-license-cost-nevada.mdx` | Launch cluster post: cost guide. Demonstrates the full post template and internal-linking conventions. |
| `src/content/blog/discovery-flight-rno.mdx` | Launch cluster post: what to expect on a discovery flight at RNO. |
| `src/content/blog/part-61-vs-part-141.mdx` | Launch cluster post: comparison article. |
| `public/images/blog/` | Hero images and inline images for launch posts. Must be WebP/AVIF with explicit dimensions. |

### Modified shared files (coordinate with owning tickets)

| File | Purpose |
|------|---------|
| `src/lib/schema.ts` | Add `buildArticleSchema(post, author)`, `buildBlogPostingSchema`, `buildBreadcrumbList` variants for blog index/post/archive, and `buildFAQPageSchema` reuse. |
| `src/lib/routes.ts` | Add `BLOG_INDEX`, `BLOG_POST(slug)`, `BLOG_CATEGORY(category)`, `BLOG_TAG(tag)` route helpers. |
| `src/lib/seo.ts` | Add `buildBlogTitle`, `buildBlogDescription` helpers; no breaking changes to existing helpers. |
| `src/lib/utils.ts` | Add `formatDate`, `estimateReadTime`, `slugify`, `kebabCase` helpers for blog use. |
| `package.json` | Add `next-mdx-remote` (or `@next/mdx`), `gray-matter`, `zod`, `rehype-slug`, `remark-gfm`. Ensure no conflict with TICKET-001 dependencies. |
| `next.config.ts` | If using `@next/mdx`, register the MDX plugin here. If using `next-mdx-remote`, no config change is required. |
| `tailwind.config.ts` | Extend prose/typography tokens if a Tailwind typography plugin is adopted; otherwise keep within `Prose` component. |

### Documentation

| File | Purpose |
|------|---------|
| `thoughts/shared/plans/TICKET-021-plan.md` | This plan. |
| `src/content/blog/README.md` | Brief authoring guide for future content contributors: frontmatter schema, image conventions, internal-link syntax, FAQ block usage. |

## 4. Reusable components to use from TICKET-001 (shell) and other tickets

### From TICKET-001 (must be complete first)

| Component / Helper | How it is used |
|--------------------|----------------|
| `app/layout.tsx` | Wraps every blog route with global metadata, header, footer, and base Organization/LocalBusiness/EducationalOrganization schema. |
| `Header` / `MobileNav` | Persistent navigation, including the global "Book a discovery flight" CTA and phone link. |
| `Footer` | Site-wide NAP and links. |
| `Container` | Max-width wrapper for every section. |
| `Section` | Consistent vertical spacing and background variants. |
| `PageHeader` | Breadcrumb trail + page H1 block on index and archive pages. |
| `Button` / `CTALink` | CTA buttons at the bottom of posts and in the sidebar. |
| `SchemaInjector` | Renders page-specific JSON-LD `<script type="application/ld+json">` tags. |
| `FAQAccordion` | Used inside `PostFAQ` for post-level FAQs that generate FAQPage schema. |
| `src/lib/schema.ts` | Extend with Article/BlogPosting builders; reuse existing Organization/LocalBusiness/BreadcrumbList helpers. |
| `src/lib/seo.ts` | `buildTitle`, `buildCanonical`, `buildOpenGraph`, `buildTwitter` for per-post metadata. |
| `src/lib/routes.ts` | Source of truth for blog, program, instructor, and discovery-flight URLs. |
| `src/lib/config.ts` | Site base URL, NAP, brand defaults for schema `publisher` linkage. |

### From TICKET-002 (homepage)

| Component / Helper | How it is used |
|--------------------|----------------|
| `LatestPosts` | The homepage will consume `LatestPosts` to render the 3 most recent blog teasers. Ensure the component is exported from this ticket and accepts a `limit` prop. |

### From TICKET-003 (discovery flight)

| Component / Helper | How it is used |
|--------------------|----------------|
| `/discovery-flight/` route | Every post CTA links to `/discovery-flight/` (or `?type=gift` for gift-oriented posts). |

### From TICKET-005 through TICKET-011 (program pages)

| Component / Helper | How it is used |
|--------------------|----------------|
| `/programs/[slug]/` routes | Posts link contextually to relevant program pages (e.g., the PPL cost post links to `/programs/private-pilot/`). |

### From TICKET-013 and TICKET-014 (instructors)

| Component / Helper | How it is used |
|--------------------|----------------|
| `src/content/instructors.ts` | Author bylines map to instructor records via `instructorSlug`. Reuse instructor photos, names, and credentials. |
| `/instructors/[slug]/` routes | Author names in bylines link to their instructor detail page when `instructorSlug` is set. |

## 5. Page content/structure, schema markup, and SEO metadata

### 5.1 Frontmatter schema

Every MDX file in `src/content/blog/` must include:

```yaml
---
title: "Post title in sentence case"
description: "Compelling summary under 155 characters."
date: "2026-06-18"
author: "author-slug"        # must exist in src/content/authors.ts
slug: "url-slug"             # must be unique and URL-safe
category: "Category Name"      # e.g., "Getting Started", "Training Tips", "Mountain Flying"
tags: ["tag-one", "tag-two"] # lowercase, kebab-case
heroImage: "/images/blog/slug-hero.webp"
heroAlt: "Descriptive alt text including aircraft/location"
featured: false                # true for the pillar/featured post on the index
updated: "2026-06-18"        # optional; defaults to date
---
```

Validate frontmatter at build time with Zod. Fail the build on missing/invalid required fields.

### 5.2 Blog index page (`/blog/`)

**URL:** `https://hornbillaviation.com/blog/`

**SEO metadata:**
- **Title:** `Flight Training Blog & Guides | Hornbill Aviation`
- **Meta description:** `Practical flight training guides from Hornbill Aviation. Part 61 training, Reno-Tahoe flying, and what to expect on your first lesson.`
- **Canonical:** self-referencing, trailing slash.
- **OpenGraph:** `og:type: website`, title mirrors page title, description mirrors meta, default OG image.

**Schema markup:**
1. **BreadcrumbList:** `Home > Blog`
2. (Optional) **CollectionPage** for the index if useful for Rich Results.

**Page structure (in order):**
1. `PageHeader` — breadcrumb + H1 + subheadline.
2. Featured/pillar post block — large hero card for the post with `featured: true` (the Reno flight-training pillar).
3. Latest posts grid — remaining posts sorted by `date` descending, 3 or 6 per page (no pagination at launch; add when post count exceeds ~12).
4. Categories sidebar/list — link chips to `/blog/category/[category]/`.
5. Discovery-flight CTA section — "Ready to fly? Book a discovery flight at RNO."

### 5.3 Blog post page (`/blog/[slug]/`)

**URL pattern:** `https://hornbillaviation.com/blog/[slug]/`

**SEO metadata:**
- **Title:** `{title} | Hornbill Aviation` (use `buildTitle`).
- **Meta description:** from frontmatter `description`.
- **Canonical:** self-referencing.
- **OpenGraph:** `og:type: article`; `og:image` from `heroImage`; publish/modified dates.
- **Twitter:** `summary_large_image`.

**Schema markup (rendered via `SchemaInjector`):**
1. **Article** (or **BlogPosting**) with:
   - `headline`: post title
   - `description`: frontmatter description
   - `image`: absolute hero image URL
   - `datePublished`
   - `dateModified` (same as `datePublished` unless `updated` is set)
   - `author`: `@type: Person`, name, URL (instructor page or author record), `jobTitle`, `image` if available
   - `publisher`: Organization referencing the site Organization schema `@id`
   - `mainEntityOfPage`: canonical URL
   - `articleSection`: category
   - `keywords`: tags joined by commas
2. **BreadcrumbList:** `Home > Blog > [title]`
3. **FAQPage:** only if the post includes a `<PostFAQ />` block.

**Page structure (in order):**
1. `PostHero` — title, description, hero image with explicit width/height, author byline, date, category/tags, read-time estimate.
2. Optional `TableOfContents` — generated from H2/H3 headings.
3. `BlogPostBodySection` — MDX content wrapped in `Prose`.
4. `PostFAQ` (conditional) — accordion FAQs with schema.
5. `BlogAuthorBio` — named author bio with photo, credentials, and link.
6. `RelatedPosts` — 3 related posts by category/tag.
7. `BlogPostCTASection` — contextual CTA to the most relevant program page or `/discovery-flight/`.
8. Category/tag footer chips.

**Internal-linking conventions for every post:**
- Link the first mention of "discovery flight" to `/discovery-flight/`.
- Link certificate/rating names to their program pages (e.g., "Private Pilot" → `/programs/private-pilot/`).
- Link the pillar page from every cluster post at least once.
- Link to `/fleet/` when discussing rates or aircraft.
- Use descriptive anchor text; avoid "click here" or "read more."

### 5.4 Category archive page (`/blog/category/[category]/`)

**URL pattern:** `https://hornbillaviation.com/blog/category/[kebab-category]/`

**SEO metadata:**
- **Title:** `{Category} Articles | Hornbill Aviation Blog`
- **Meta description:** `Hornbill Aviation {category} articles: practical guides for pilots training in Reno, NV.`

**Schema markup:**
- **BreadcrumbList:** `Home > Blog > {Category}`

**Page structure:**
- `PageHeader` with category H1.
- Post grid filtered to that category.
- Link back to `/blog/` and to other categories.

### 5.5 Tag archive page (`/blog/tag/[tag]/`)

**URL pattern:** `https://hornbillaviation.com/blog/tag/[tag]/`

**SEO metadata:**
- **Title:** `#{tag} Articles | Hornbill Aviation Blog`
- **Meta description:** `Posts tagged #{tag} from Hornbill Aviation's flight training blog.`

**Schema markup:**
- **BreadcrumbList:** `Home > Blog > #{tag}`

**Page structure:**
- `PageHeader` with tag H1.
- Post grid filtered to that tag.
- Link back to `/blog/`.

### 5.6 Author registry (`src/content/authors.ts`)

Authors must be named and verifiable. Example record:

```ts
{
  slug: "sarah-chen",
  name: "Sarah Chen",
  role: "Certified Flight Instructor",
  bio: "Sarah teaches primary students and instrument rating prep at Hornbill Aviation. She has 1,500 hours in PA28s and specializes in building confidence in the pattern.",
  photo: "/images/instructors/sarah-chen.webp",
  linkedin: "https://www.linkedin.com/in/sarah-chen-example",
  instructorSlug: "sarah-chen"  // links to /instructors/sarah-chen/
}
```

For non-instructor contributors, omit `instructorSlug` and link to a lightweight author page at `/blog/author/[slug]/` only if needed at launch; otherwise link to the author record's external profile or omit the link.

## 6. API/widget/data requirements

### Dependencies to add to `package.json`

| Package | Purpose |
|---------|---------|
| `next-mdx-remote` | Compile and render MDX at build time without requiring a custom Next.js webpack setup. |
| `gray-matter` | Parse YAML frontmatter from MDX files. |
| `zod` | Validate frontmatter and author shapes; fail build on invalid data. |
| `rehype-slug` | Add IDs to headings so `TableOfContents` can link to them. |
| `remark-gfm` | Support GitHub-flavored Markdown tables and task lists. |

### Alternative: `@next/mdx`

If the project prefers `@next/mdx`, register it in `next.config.ts` and store posts under a dedicated `src/app/blog/[slug]/page.mdx` convention. The plan assumes `next-mdx-remote` because it gives finer control over frontmatter, sorting, and archive generation.

### Build-time data flow

1. At build time, `src/content/blog.ts` reads every `.mdx` file in `src/content/blog/`.
2. `gray-matter` extracts frontmatter; `zod` validates it.
3. `next-mdx-remote` compiles the MDX body and returns a serializable result.
4. `generateStaticParams` in `src/app/blog/[slug]/page.tsx` returns every validated slug.
5. `generateStaticParams` in category and tag routes returns every unique normalized category/tag.
6. Posts are sorted by `date` descending; the most recent post is surfaced first.

### No runtime APIs

This ticket does not require any external API calls at runtime. METAR widgets, booking APIs, and search are handled by other tickets.

## 7. Dependencies on other tickets

| Ticket | Dependency reason | Blocker? |
|--------|-------------------|----------|
| **TICKET-001** | Shell, shared components, schema helpers, routes, config, and global metadata must exist before blog routes can compose pages. | **Hard blocker** |
| **TICKET-003** | Discovery Flight page must exist so every post can link to it and the bottom CTA has a valid destination. | **Hard blocker** for full verification; can stub link if absolutely necessary. |
| **TICKET-005–011** | Program pages must exist so posts can internally link to Sport Pilot, Private Pilot, Instrument Rating, Commercial Pilot, CFI, CFII, and Mountain Flying. | Soft blocker — posts can be authored with links and verified once program pages ship. |
| **TICKET-013** | Instructors index page defines the `src/content/instructors.ts` data contract and slug list that author bylines consume. | Soft blocker; blog can define `authors.ts` independently and map later. |
| **TICKET-014** | Individual instructor pages provide the destination URLs for author bylines. | Soft blocker; authors can link externally or to a placeholder until instructor pages ship. |
| **TICKET-002** | Homepage consumes `LatestPosts` from this ticket. This is not a blocker for TICKET-021, but coordinate the `LatestPosts` API contract. | Coordination only |

**Recommended implementation order:**
1. TICKET-001 (shell)
2. TICKET-003 (discovery flight page, for valid internal links)
3. TICKET-021 (blog infrastructure) — can proceed before program/instructor pages by linking to stubs or routes that will exist.
4. TICKET-013/014 (instructors) — finalize author-to-instructor mapping.
5. TICKET-005–011 (program pages) — verify all internal program links resolve.
6. TICKET-002 (homepage) — wire `LatestPosts` once blog posts exist.

## 8. Verification steps

### Build and routing

- [ ] `npm run build` completes without errors and produces static HTML in `dist/`.
- [ ] `dist/blog/index.html` exists.
- [ ] `dist/blog/[slug]/index.html` exists for every MDX file in `src/content/blog/`.
- [ ] `dist/blog/category/[category]/index.html` exists for every unique category.
- [ ] `dist/blog/tag/[tag]/index.html` exists for every unique tag.
- [ ] `next export` does not produce 404s for any generated blog path.

### Content and data

- [ ] Every MDX post passes Zod frontmatter validation.
- [ ] Every `author` frontmatter value resolves to a record in `src/content/authors.ts`.
- [ ] Author bylines display name, role, and bio; link to instructor page when `instructorSlug` is set.
- [ ] Hero images have explicit `width`/`height`, `alt` text, and are served from `public/images/blog/`.
- [ ] No broken internal links from posts to `/discovery-flight/`, program pages, or pillar page.

### Schema and SEO

- [ ] Google Rich Results Test passes for `/blog/` (BreadcrumbList).
- [ ] Google Rich Results Test passes for `/blog/[slug]/` (Article + BreadcrumbList; FAQPage when applicable).
- [ ] Each post has a unique title tag and meta description.
- [ ] Canonical URLs are self-referencing and use trailing slashes.
- [ ] Article schema includes valid `author` (Person), `publisher` (Organization reference), `datePublished`, `dateModified`, `image`, `headline`, and `keywords`.
- [ ] FAQPage schema validates for any post containing a `PostFAQ` block.

### Accessibility

- [ ] Heading hierarchy is logical (one H1 per page, no skipped levels).
- [ ] `TableOfContents` links map to valid heading IDs.
- [ ] Author photos and hero images have descriptive `alt` text.
- [ ] Color contrast of text over hero images meets WCAG AA (use overlay if needed).
- [ ] Focus order is correct through post content and CTAs.

### Performance

- [ ] Hero images are WebP/AVIF and optimized.
- [ ] MDX components do not introduce unnecessary client-side JavaScript; `TableOfContents` is the primary client component.
- [ ] Lighthouse/PageSpeed Insights LCP ≤ 2.0s on blog index and post pages.

### Copy and voice

- [ ] All launch posts are reviewed against the brand writing style guide.
- [ ] No aviation clichés, empty superlatives, or LLM hedges in published posts.
- [ ] CTAs are concrete: "Book a discovery flight," "See the PPL program," etc.
- [ ] Internal links use descriptive anchor text.

### Analytics (if TICKET-001 analytics are ready)

- [ ] Blog index and post pages fire `blog_page_view` events if the analytics layer is configured.
- [ ] CTA clicks to `/discovery-flight/` carry source attribution (e.g., `?ref=blog-[slug]`).

---

## Open questions to resolve before implementation

1. **Author-to-instructor mapping:** Should every blog author be one of the 4 launch CFIs, or will there be non-instructor contributors (founder, guest writers)? This determines whether a dedicated `/blog/author/[slug]/` route is needed.
2. **MDX tooling:** Confirm whether the project uses `next-mdx-remote` or `@next/mdx`. `next-mdx-remote` is recommended for archive generation and frontmatter control.
3. **Pillar post content:** Who authors the 2,500-word Reno flight-training pillar and supplies the hero image?
4. **Launch post count:** How many cluster posts must ship with the site versus be added post-launch? This plan recommends 4 stubs minimum.
5. **Comments / search:** Out of scope for launch, but confirm before cutting.
