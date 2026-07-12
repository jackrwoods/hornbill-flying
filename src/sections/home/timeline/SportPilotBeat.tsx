import { TimelineBeat } from "@/components/home/TimelineBeat";
import { programs } from "@/content/programs";

const sportPilot = programs.find((p) => p.slug === "sport-pilot")!;

/**
 * Homepage V2 program timeline beat 1 — Sport Pilot. Thin wrapper around the
 * shared `TimelineBeat` shell. See
 * `thoughts/shared/plans/2026-07-12-homepage-v2-program-timeline.md` §2a.
 */
export function SportPilotBeat() {
  return (
    <TimelineBeat
      index={1}
      eyebrow="01 · Sport Pilot"
      poeticLine={
        <>Sunrise on the windscreen. You climb out over the high desert.</>
      }
      groundedLine={
        <>
          Part-time students finish in 3–6 months in our PA28 fleet at RNO,
          from $5,500 with membership.
        </>
      }
      href={sportPilot.url}
      linkLabel="See Sport Pilot"
      sunsetVariant="dawn"
      imageLabel="PA28 over the high desert east of RNO at sunrise — photography coming"
      imageSide="right"
    />
  );
}