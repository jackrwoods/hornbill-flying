---
id: TICKET-002
title: Homepage
status: triage
priority: critical
assignee:
created: 2026-06-18
updated: 2026-06-18
---

## Problem to Solve
The homepage must immediately communicate that Hornbill is a Part 61 flight school in Reno, NV, and convert visitors into discovery flight bookings in under three clicks.

## Solution Approach
Implement the homepage at `/` with one H1: "Part 61 flight school in Reno, NV." Build the hero with real PA28 ramp photo, primary CTA to `/discovery-flight/`, secondary gift-voucher CTA, and click-to-call phone. Add trust strip, four "What makes Hornbill different" cards, programs grid linking to each program page, discovery-flight teaser, instructor preview with booking links, pricing snapshot, social proof/testimonials (or founder credibility block if no reviews), FAQ accordion with FAQPage schema, and latest-blog teasers. Implement title tag, meta description, LocalBusiness/EducationalOrganization/Organization schema, BreadcrumbList, and hero image with `fetchpriority="high"` + explicit dimensions.

## References
- `thoughts/shared/design/website_layout_design.md:78-121`
- `thoughts/shared/design/website_layout_design.md:37-65` (pages map)

## Comments

### 2026-06-18 - Claude Code
Created from website layout design vertical-slice split.
