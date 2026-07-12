import { Hero } from "@/sections/home/Hero";
import { SportPilotBeat } from "@/sections/home/timeline/SportPilotBeat";
import { PrivatePilotBeat } from "@/sections/home/timeline/PrivatePilotBeat";
import { InstrumentRatingBeat } from "@/sections/home/timeline/InstrumentRatingBeat";
import { CommercialPilotBeat } from "@/sections/home/timeline/CommercialPilotBeat";
import { CFIBeat } from "@/sections/home/timeline/CFIBeat";
import { CFIIBeat } from "@/sections/home/timeline/CFIIBeat";
import { MountainFlyingAside } from "@/sections/home/MountainFlyingAside";
import { DiscoveryCta } from "@/sections/home/DiscoveryCta";

/**
 * Homepage V2 — program timeline overhaul.
 * Hero → 6 program beats (Sport → CFII) → Mountain Flying aside →
 * Discovery Flight CTA. The global Header and Footer render via the
 * root layout and are not touched here. See
 * `thoughts/shared/plans/2026-07-12-homepage-v2-program-timeline.md`.
 */
export function HomepageTimeline() {
  return (
    <>
      <Hero />
      <SportPilotBeat />
      <PrivatePilotBeat />
      <InstrumentRatingBeat />
      <CommercialPilotBeat />
      <CFIBeat />
      <CFIIBeat />
      <MountainFlyingAside />
      <DiscoveryCta />
    </>
  );
}