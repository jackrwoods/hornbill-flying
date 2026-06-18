---
id: TICKET-001
title: Site shell, shared components, and global SEO setup
status: triage
priority: critical
assignee:
created: 2026-06-18
updated: 2026-06-18
---

## Problem to Solve
Every public page needs a consistent header, footer, navigation, typography, color system, and base schema so visitors can navigate, trust the brand, and search engines can index the site correctly.

## Solution Approach
Build the shared Next.js layout shell: sticky header with dropdown programs nav, persistent "Book a discovery flight" CTA and phone link, mobile hamburger menu, and footer with NAP, quick links, and legal links. Implement global metadata (title template, canonicals, OpenGraph), `robots.txt`, auto-generated `sitemap.xml`, and base JSON-LD schema (Organization + LocalBusiness + EducationalOrganization) with exact NAP. Set up Tailwind/theme tokens from the visual identity doc. Establish the URL convention and component folder structure used by all page tickets.

## References
- `thoughts/shared/design/website_layout_design.md:78-121` (homepage technical SEO)
- `thoughts/shared/design/website_layout_design.md:241-299` (SEO techniques)
- `thoughts/shared/design/website_layout_design.md:395-423` (navigation & UX)
- `thoughts/shared/design/visual_identity.md`

## Comments

### 2026-06-18 - Claude Code
Created from website layout design vertical-slice split.
