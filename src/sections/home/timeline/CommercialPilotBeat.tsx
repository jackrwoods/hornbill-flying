import { TimelineBeat } from "@/components/home/TimelineBeat";
import { programs } from "@/content/programs";

const commercialPilot = programs.find((p) => p.slug === "commercial-pilot")!;

/**
 * Homepage V2 program timeline beat 4 — Commercial Pilot. Thin wrapper around
 * the shared `TimelineBeat` shell. See
 * `thoughts/shared/plans/2026-07-12-homepage-v2-program-timeline.md` §2d.
 */
export function CommercialPilotBeat() {
  return (
    <TimelineBeat
      index={4}
      eyebrow="04 · Commercial Pilot"
      poeticLine={
        <>You round out on short final, and the work begins to pay.</>
      }
      groundedLine={
        <>
          Part 61 requires 250 hours total time and 10 in a complex or
          technically advanced airplane.
        </>
      }
      href={commercialPilot.url}
      linkLabel="See Commercial Pilot"
      sunsetVariant="vertical"
      imageLabel="PA28 on short final at RNO, gear down — photography coming"
      imageSide="left"
    />
  );
}