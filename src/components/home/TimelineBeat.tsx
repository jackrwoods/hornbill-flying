"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { SunsetPlaceholder } from "@/components/SunsetPlaceholder";
import { useScrubbedTransform } from "@/hooks/useScrubbedTransform";
import { cn } from "@/lib/utils";

interface TimelineBeatProps {
  /** 1-based beat index, for the panel label and aria id. */
  index: number;
  /** e.g., "02 · Private Pilot". */
  eyebrow: string;
  /** 1–2 short poetic lines. */
  poeticLine: React.ReactNode;
  /** One grounded subline — what the certificate lets you do. */
  groundedLine: React.ReactNode;
  /** Link to /programs/[slug]/. */
  href: string;
  /** e.g., "See Private Pilot". */
  linkLabel: string;
  sunsetVariant?: "default" | "vertical" | "soft" | "dawn";
  /** IBM Plex Mono "coming soon" label for the image slot. */
  imageLabel: string;
  /** Image side; alternates per beat for visual rhythm. */
  imageSide?: "left" | "right";
}

/**
 * Shared shell for one program timeline beat on the V2 homepage. Desktop:
 * scroll-scrubbed `runway-recede` (background), `horizon-reveal` (image), and
 * `altitude-lift` (copy) via Framer's passive `useScroll`. Mobile + reduced
 * motion: `useScrubbedTransform` returns `null` and the shell renders at final
 * state — no pin, no scrub. Per v2-visual-and-motion-system.md §4a and §4i.
 */
export function TimelineBeat(props: TimelineBeatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const bgScale = useScrubbedTransform({
    target: ref,
    output: [1.0, 1.12],
  });
  const bgY = useScrubbedTransform({
    target: ref,
    output: [0, -8],
  });
  const imgY = useScrubbedTransform({
    target: ref,
    output: [16, 0],
    offset: ["start 0.9", "center 0.4"],
  });
  const imgOpacity = useScrubbedTransform({
    target: ref,
    output: [0.6, 1],
    offset: ["start 0.9", "center 0.4"],
  });
  const textY = useScrubbedTransform({
    target: ref,
    output: [-40, 0],
    offset: ["start 0.85", "center 0.3"],
  });
  const textOpacity = useScrubbedTransform({
    target: ref,
    output: [0, 1],
    offset: ["start 0.85", "center 0.3"],
  });

  const imageSide =
    props.imageSide ?? (props.index % 2 === 0 ? "left" : "right");

  return (
    <section
      ref={ref}
      aria-labelledby={`beat-${props.index}-heading`}
      className="relative story-hero-viewport bg-immersive-bg text-on-immersive min-h-[120vh] md:min-h-[180vh]"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={bgScale && bgY ? { scale: bgScale, y: bgY } : undefined}
        aria-hidden="true"
      >
        <SunsetPlaceholder
          variant={props.sunsetVariant ?? "default"}
          label={props.imageLabel}
          vignette
          grain
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-panel-scrim-bottom" />
      </motion.div>
      <Container className="relative z-10 grid h-full min-h-[inherit] items-center gap-8 py-20 md:py-28 md:grid-cols-2 md:gap-16">
        <div
          className={cn(imageSide === "right" ? "md:order-2" : "md:order-1")}
        >
          <motion.div
            className="aspect-[4/5] w-full overflow-hidden rounded-xl ring-1 ring-on-immersive/10"
            style={
              imgY && imgOpacity ? { y: imgY, opacity: imgOpacity } : undefined
            }
          >
            <SunsetPlaceholder
              variant={props.sunsetVariant ?? "vertical"}
              label={props.imageLabel}
              vignette
              grain
              className="h-full w-full"
            />
          </motion.div>
        </div>
        <motion.div
          className={cn(
            "max-w-xl",
            imageSide === "right" ? "md:order-1" : "md:order-2"
          )}
          style={
            textY && textOpacity ? { y: textY, opacity: textOpacity } : undefined
          }
        >
          <p className="panel-label-lg text-immersive-accent mb-5">
            {props.eyebrow}
          </p>
          <h2
            id={`beat-${props.index}-heading`}
            className="font-heading font-extrabold leading-[1.04] text-3xl sm:text-4xl md:text-5xl text-on-immersive text-balance"
          >
            {props.poeticLine}
          </h2>
          <p className="mt-6 text-on-immersive-muted text-pretty leading-relaxed">
            {props.groundedLine}
          </p>
          <a
            href={props.href}
            className="beak-flash mt-8 inline-flex w-fit text-sm font-semibold text-immersive-accent"
          >
            {props.linkLabel}
          </a>
        </motion.div>
      </Container>
    </section>
  );
}