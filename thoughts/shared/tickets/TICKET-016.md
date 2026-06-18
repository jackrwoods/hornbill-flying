---
id: TICKET-016
title: Location / RNO page
status: triage
priority: high
assignee:
created: 2026-06-18
updated: 2026-06-18
---

## Problem to Solve
Local SEO and prospective visitors need a dedicated page covering where Hornbill is based at Reno-Tahoe (RNO), how to get there, parking, airport access, and why the local airspace matters for training.

## Solution Approach
Build `/location/` with exact NAP, map embed, written directions, parking/airport access instructions, Class C airspace intro, density altitude note, common training routes, and LocalBusiness schema with geo coordinates (39.4991, -119.7681). Include FAQPage schema and internal links to Contact, Fleet, and Mountain Flying.

## References
- `thoughts/shared/design/website_layout_design.md:37-65`
- `thoughts/shared/design/website_layout_design.md:266-273` (local SEO)
- `thoughts/shared/design/website_layout_design.md:20-33` (NAP)

## Comments

### 2026-06-18 - Claude Code
Created from website layout design vertical-slice split.
