---
id: TICKET-013
title: Instructors index page
status: triage
priority: high
assignee:
created: 2026-06-18
updated: 2026-06-18
---

## Problem to Solve
Prospective students want to see the instructor team before committing, so the index page must introduce all CFIs, their specialties, and paths to book with each one.

## Solution Approach
Build `/instructors/` as a team overview with intro copy, 4 instructor cards (photo/placeholder, name, specialties, certificate number if consented, brief bio), and "Book with [Name]" links to individual instructor pages. Implement Person schema where possible, internal links to each `/instructors/[slug]/`, and FAQPage schema if helpful.

## References
- `thoughts/shared/design/website_layout_design.md:37-65`
- `thoughts/shared/design/website_layout_design.md:20-27` (executive decisions on instructors)

## Comments

### 2026-06-18 - Claude Code
Created from website layout design vertical-slice split.
