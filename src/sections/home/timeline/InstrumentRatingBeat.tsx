import { TimelineBeat } from "@/components/home/TimelineBeat";
import { programs } from "@/content/programs";

const instrumentRating = programs.find((p) => p.slug === "instrument-rating")!;

export function InstrumentRatingBeat() {
  return (
    <TimelineBeat
      index={3}
      eyebrow="03 · Instrument Rating"
      poeticLine={
        <>
          You climb into cloud. The panel glows. The Sierra lets go.
        </>
      }
      groundedLine={
        <>
          You log 50 hours PIC cross-country and fly WAAS GPS approaches in
          N6576J and N7824W.
        </>
      }
      href={instrumentRating.url}
      linkLabel="See Instrument Rating"
      sunsetVariant="soft"
      imageLabel="PA28 in IMC, panel lit, hood on — photography coming"
      imageSide="right"
    />
  );
}