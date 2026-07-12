import { Hero } from "@/sections/home/Hero";
import { CinematicTimeline } from "@/sections/home/timeline/CinematicTimeline";
import { MountainFlyingAside } from "@/sections/home/MountainFlyingAside";
import { DiscoveryCta } from "@/sections/home/DiscoveryCta";

/**
 * Homepage V2 — cinematic program timeline.
 *
 * Hero → sticky-pinned cinematic timeline (9 milestones along an N-shaped
 * SVG canvas, pan + zoom-out to a clickable program nav map) → Mountain
 * Flying aside → Discovery Flight CTA. Mobile and `prefers-reduced-motion`
 * collapse the cinematic timeline to a vertical card stack internally.
 * The global Header and Footer render via the root layout and are not
 * touched here. See `thoughts/shared/plans/2026-07-12-homepage-v2-program-timeline.md`.
 */
export function HomepageTimeline() {
  return (
    <>
      <Hero />
      <CinematicTimeline />
      <MountainFlyingAside />
      <DiscoveryCta />
    </>
  );
}