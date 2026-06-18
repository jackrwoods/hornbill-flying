---
id: TICKET-003
title: Discovery Flight landing page and booking widget
status: triage
priority: critical
assignee:
created: 2026-06-18
updated: 2026-06-18
---

## Problem to Solve
Prospective students need a dedicated, low-friction landing page that explains the $199 discovery flight and lets them choose a flight type, pick a date/time, enter details, and pay—ideally in under 60 seconds on mobile.

## Solution Approach
Build `/discovery-flight/` as a conversion-focused landing page. Include headline, pricing/duration, what's included, flight-type selector (standard PA28, Lake Tahoe scenic, gift voucher), date/time calendar fed by `/api/availability`, instructor preference, minimal booking form (name, phone, email, optional weight), payment step (deposit or full prepay via Stripe/Apple Pay/Google Pay), and confirmation view with booking reference, calendar invite, and cancellation/weather policy. Implement Event schema, FAQPage schema, and unique title/meta. Support `?type=gift` query parameter for gift-voucher mode.

## References
- `thoughts/shared/design/website_layout_design.md:37-65` (pages map)
- `thoughts/shared/design/website_layout_design.md:161-237` (online booking)
- `thoughts/shared/design/website_layout_design.md:254-265` (schema priority)

## Comments

### 2026-06-18 - Claude Code
Created from website layout design vertical-slice split.
