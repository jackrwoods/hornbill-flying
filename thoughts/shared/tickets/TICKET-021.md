---
id: TICKET-021
title: Blog infrastructure
status: triage
priority: high
assignee:
created: 2026-06-18
updated: 2026-06-18
---

## Problem to Solve
The site needs a content hub for SEO and nurture that can publish long-form articles from launch and grow to 1–2 posts per month.

## Solution Approach
Build `/blog/` index page and `/blog/[slug]/` post template. Set up Markdown/MDX source in `src/content/blog/` with frontmatter: `title`, `description`, `date`, `author` (CFI name/slug), `tags`, `category`, `heroImage`, `slug`. Map authors to `authors/[slug].json` or instructor pages. Add category/tag archive pages if valuable. Implement Article schema, FAQPage schema where appropriate, named-author bylines with bio, and internal-linking conventions to program pages and discovery flight.

## References
- `thoughts/shared/design/website_layout_design.md:37-65`
- `thoughts/shared/design/website_layout_design.md:124-158` (blog integration)

## Comments

### 2026-06-18 - Claude Code
Created from website layout design vertical-slice split.
