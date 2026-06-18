---
id: TICKET-028
title: Analytics, conversion events, and UTM setup
status: triage
priority: medium
assignee:
created: 2026-06-18
updated: 2026-06-18
---

## Problem to Solve
Hornbill needs day-one visibility into how visitors find the site, where they drop off, and whether they book, call, or sign up for membership.

## Solution Approach
Set up Google Analytics 4 via GTM with Measurement ID, Google Search Console domain property (DNS TXT), and Microsoft Clarity for recordings/heatmaps. Implement UTM parameter conventions for all external links. Fire conversion events for: discovery_flight_booking_started, discovery_flight_booking_completed, phone_click, email_click, membership_signup_started, membership_signup_completed, program_page_view, instructor_page_view, and blog_subscription. Build a simple events layer the page tickets can import.

## References
- `thoughts/shared/design/website_layout_design.md:427-450`

## Comments

### 2026-06-18 - Claude Code
Created from website layout design vertical-slice split.
