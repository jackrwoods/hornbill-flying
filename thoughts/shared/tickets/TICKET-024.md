---
id: TICKET-024
title: Booking app entry page
status: triage
priority: high
assignee:
created: 2026-06-18
updated: 2026-06-18
---

## Problem to Solve
The booking app needs a clean entry point at `/book/` that can embed the discovery-flight widget and future lesson scheduling flows without cluttering individual marketing pages.

## Solution Approach
Build `/book/` as a lightweight shell that hosts the booking components (`DiscoveryFlightPicker`, `InstructorSelector`, `BookingForm`, `PaymentStep`, `ConfirmationView`). At launch it primarily loads the discovery-flight flow; leave extension points for lesson booking. Ensure mobile-first layout, sticky progress/stepper, and deep-linking so marketing CTAs can route users directly into specific flows.

## References
- `thoughts/shared/design/website_layout_design.md:37-65`
- `thoughts/shared/design/website_layout_design.md:161-237`
- `thoughts/shared/design/website_layout_design.md:224-231`

## Comments

### 2026-06-18 - Claude Code
Created from website layout design vertical-slice split.
