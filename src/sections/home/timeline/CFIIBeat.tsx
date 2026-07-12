import { TimelineBeat } from "@/components/home/TimelineBeat";
import { programs } from "@/content/programs";

const cfii = programs.find((p) => p.slug === "cfii")!;

/**
 * Homepage V2 program timeline beat 7 — CFII. Thin wrapper around the shared
 * `TimelineBeat` shell. See
 * `thoughts/shared/plans/2026-07-12-homepage-v2-program-timeline.md` §2f.
 */
export function CFIIBeat() {
  return (
    <TimelineBeat
      index={6}
      eyebrow="06 · CFII"
      poeticLine={
        <>
          You teach in cloud. The attitude indicator becomes your student&apos;s
          horizon.
        </>
      }
      groundedLine={
        <>
          A CFII adds instrument-instructor privileges to your CFI, and you
          teach IFR students in WAAS-equipped PA28s at RNO.
        </>
      }
      href={cfii.url}
      linkLabel="See CFII"
      sunsetVariant="soft"
      imageLabel="IFR approach plate, panel lit, attitude indicator alive — photography coming"
      imageSide="left"
    />
  );
}