---
id: TICKET-029
title: Final QA — schema, CWV, accessibility, local SEO, booking E2E
status: triage
priority: medium
assignee:
created: 2026-06-18
updated: 2026-06-18
---

## Problem to Solve
Before launch, the site must pass validation across structure, SEO, performance, accessibility, and the critical booking conversion path to avoid regressions that hurt trust and conversions.

## Solution Approach
Run the full validation checklist: internal link crawl (every page reachable within 3 clicks from home), Google Rich Results Test for all schema types, PageSpeed Insights + CrUX for Core Web Vitals (LCP ≤2.0s, INP ≤200ms, CLS ≤0.1), WCAG 2.2 AA accessibility audit, end-to-end booking test with a $0/test transaction verifying confirmation email/CRM entry/nurture sequence, mobile UX check on 5+ devices, GSC indexing/sitemap submission/unique title+H1+meta per page, copy/voice check against brand writing style guide, and NAP byte-for-byte match across GBP, site, and top directories.

## References
- `thoughts/shared/design/website_layout_design.md:487-498`
- `thoughts/shared/design/brand_identity_writing_style.md`

## Comments

### 2026-06-18 - Claude Code
Created from website layout design vertical-slice split.
