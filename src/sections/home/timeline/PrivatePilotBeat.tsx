import { TimelineBeat } from "@/components/home/TimelineBeat";
import { programs } from "@/content/programs";

const privatePilot = programs.find((p) => p.slug === "private-pilot")!;

export function PrivatePilotBeat() {
  return (
    <TimelineBeat
      index={2}
      eyebrow="02 · Private Pilot"
      poeticLine={
        <>You take the left seat, and the country opens under VFR.</>
      }
      groundedLine={
        <>
          The FAA minimum is 40 hours; most Hornbill students finish between
          55 and 70.
        </>
      }
      href={privatePilot.url}
      linkLabel="See Private Pilot"
      sunsetVariant="default"
      imageLabel="Left-seat PA28 panel, dual Garmin G5 — photography coming"
      imageSide="left"
    />
  );
}