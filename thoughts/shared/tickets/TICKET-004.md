---
id: TICKET-004
title: Private Pilot program page
status: triage
priority: critical
assignee:
created: 2026-06-18
updated: 2026-06-18
---

## Problem to Solve
The Private Pilot License (PPL) is the main enrollment path. Prospective students need clear requirements, timeline, cost expectations, and a direct path to book a discovery flight or start training.

## Solution Approach
Build `/programs/private-pilot/` with an H1 targeting "Private Pilot License Training in Reno, NV". Include overview, Part 61 requirements (FAA minimums vs realistic timeline), estimated cost using the membership/non-member rates, fleet consistency message, instructor choice, financing link, FAQ accordion with FAQPage schema, and prominent CTA to book a discovery flight. Implement Service + Course schema with FAA credential awarded and prerequisites. Add internal links to Fleet & Pricing, Discovery Flight, Membership, and related program pages.

## References
- `thoughts/shared/design/website_layout_design.md:37-65` (pages map)
- `thoughts/shared/design/website_layout_design.md:245-265` (on-page SEO + schema)

## Comments

### 2026-06-18 - Claude Code
Created from website layout design vertical-slice split.
