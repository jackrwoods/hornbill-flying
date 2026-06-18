---
id: TICKET-014
title: Individual instructor pages
status: triage
priority: high
assignee:
created: 2026-06-18
updated: 2026-06-18
---

## Problem to Solve
Each instructor needs a dedicated page for E-E-A-T signals, direct booking with that CFI, and SEO long-tail queries like "learn to fly with [Name] Reno".

## Solution Approach
Build the `/instructors/[slug]/` template and generate pages for 4 placeholder instructors at launch. Each page includes bio, credentials (certificate number if consented), specialties, availability/schedule link, direct "Book with [Name]" CTA pointing to the booking flow with instructor preselected, and back-link to the instructors index. Implement Person schema and internal links to related program pages and Discovery Flight.

## References
- `thoughts/shared/design/website_layout_design.md:37-65`
- `thoughts/shared/design/website_layout_design.md:20-27`
- `thoughts/shared/design/website_layout_design.md:276-279` (E-E-A-T)

## Comments

### 2026-06-18 - Claude Code
Created from website layout design vertical-slice split.
