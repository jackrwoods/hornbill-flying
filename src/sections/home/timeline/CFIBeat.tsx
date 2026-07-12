import { TimelineBeat } from "@/components/home/TimelineBeat";
import { programs } from "@/content/programs";

const cfi = programs.find((p) => p.slug === "certified-flight-instructor")!;

/**
 * Homepage V2 program timeline beat 5 — Certified Flight Instructor. Thin
 * wrapper around the shared `TimelineBeat` shell. See
 * `thoughts/shared/plans/2026-07-12-homepage-v2-program-timeline.md` §2e.
 */
export function CFIBeat() {
  return (
    <TimelineBeat
      index={5}
      eyebrow="05 · Certified Flight Instructor"
      poeticLine={
        <>
          You move to the right seat, and the sectional becomes a chalkboard.
        </>
      }
      groundedLine={
        <>
          You earn the Fundamentals of Instruction and spin-training
          endorsements, then sign off your first student at RNO.
        </>
      }
      href={cfi.url}
      linkLabel="See Certified Flight Instructor"
      sunsetVariant="dawn"
      imageLabel="CFI and student in the right seat, sectional open — photography coming"
      imageSide="right"
    />
  );
}