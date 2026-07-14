import { Hero } from "@/sections/home/Hero";
import { CinematicTimeline } from "@/sections/home/timeline/CinematicTimeline";
import { MilestoneStack } from "@/sections/home/timeline/MilestoneStack";
import { DiscoveryCta } from "@/sections/home/DiscoveryCta";

/**
 * Homepage V2 — cinematic program timeline.
 *
 * Hero → sticky-pinned cinematic timeline (9 milestones along an N-shaped
 * SVG canvas, pan + zoom-out to a clickable program nav map) → Discovery
 * Flight CTA. The global Header and Footer render via the root layout and
 * are not touched here. See
 * `thoughts/shared/plans/2026-07-12-homepage-v2-program-timeline.md`.
 *
 * Both the cinematic timeline and the mobile card stack are rendered to the
 * DOM; CSS controls which is visible (`lg:hidden` on the stack,
 * `hidden lg:block` on the cinematic wrapper). This is a progressive-
 * enhancement fix for iOS Safari, where the previous design — SSR the
 * cinematic SVG and let a `useEffect` collapse to the card stack on narrow
 * viewports — left mobile users staring at a 3200×1800 SVG crushed into a
 * phone screen if hydration stalled or was blocked. `CinematicTimeline`
 * still keeps its `matchMedia` gate as a safety net for `prefers-reduced-
 * motion: reduce` and for desktop windows resized below the `lg` breakpoint.
 */
export function HomepageTimeline() {
  return (
    <>
      <Hero />
      <div className="lg:hidden">
        <MilestoneStack />
      </div>
      <div className="hidden lg:block">
        <CinematicTimeline />
      </div>
      <DiscoveryCta />
    </>
  );
}