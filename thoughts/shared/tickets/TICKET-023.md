---
id: TICKET-023
title: Pilot tools / widgets
status: triage
priority: medium
assignee:
created: 2026-06-18
updated: 2026-06-18
---

## Problem to Solve
Pilot-focused tools drive repeat traffic, earn backlinks, and signal topical authority for RNO/PA28 training. Each widget needs its own lightweight, accurate component and landing page.

## Solution Approach
Build six widgets as isolated React/Vue/Svelte or vanilla JS islands: (1) KRNO METAR/TAF display from NOAA/NWS with plain-language decoding, (2) density-altitude calculator with RNO elevation pre-filled, (3) cross-country fuel/time estimator with PA28 defaults and sample routes, (4) RNO sunrise/sunset display, (5) practice area/local route map as static SVG, (6) flight-training cost estimator with sliders. Each widget gets a dedicated `/tools/[widget]/` landing page with FAQPage schema. Keep external API calls client-side only, cache aggressively, and link widgets from blog posts, student resources, and footer.

## References
- `thoughts/shared/design/website_layout_design.md:303-349`

## Comments

### 2026-06-18 - Claude Code
Created from website layout design vertical-slice split.
