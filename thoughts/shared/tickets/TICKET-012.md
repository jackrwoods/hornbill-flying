---
id: TICKET-012
title: Membership page
status: triage
priority: high
assignee:
created: 2026-06-18
updated: 2026-06-18
---

## Problem to Solve
Visitors need to understand the $59/month membership tier, how it saves money on the $159/hr member wet rate vs the $185/hr non-member rate, and what benefits they get beyond the discount.

## Solution Approach
Build `/membership/` with headline "Fly more for less. Stay in the air without the markup." Include pricing card (monthly $59, member wet rate $159, non-member $185, savings note), benefits list (discounted wet rate, priority scheduling, unlimited ground school, 12-hour cancellation window, cross-country rental eligibility, no long-term contract), and a clear "Start membership" CTA that connects to the booking/API sign-up flow. Implement FAQPage schema and internal links to Fleet & Pricing and Discovery Flight.

## References
- `thoughts/shared/design/website_layout_design.md:37-65`
- `thoughts/shared/design/website_layout_design.md:354-392`

## Comments

### 2026-06-18 - Claude Code
Created from website layout design vertical-slice split.
