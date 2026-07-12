"use client";
import type { JSX } from "react";
import type { MotionValue } from "framer-motion";
import { motion } from "framer-motion";
import { CTALink } from "@/components/CTALink";
import { milestones } from "@/sections/home/timeline/milestones";

interface TimelineOverlayProps {
  /**
   * 9 opacity MotionValues, one per milestone panel. Each drives a panel's
   * opacity across the scroll. The orchestrator owns the `useTransform`
   * calls that produce these values; this component only reads them.
   */
  panelOpacities: MotionValue<number>[];
  /**
   * Opacity of the end-state "nav map" header (visible at
   * scrollYProgress >= 0.93). Fades in as the camera zooms out and the
   * per-milestone panels fade away.
   */
  navMapHeaderOpacity: MotionValue<number>;
}

/**
 * HTML overlay that sits on top of the SVG canvas during the cinematic
 * scroll. Renders 9 crossfading panels (one per milestone) plus an
 * end-state "nav map" header that appears at the zoom-out.
 *
 * The container is `pointer-events-none` so the SVG nodes underneath
 * remain hoverable/clickable; each panel's CTALink re-enables
 * `pointer-events-auto` so it stays clickable. Only opacity changes
 * during scroll — no React state, no re-renders — so this is INP-safe
 * per the V2 plan.
 */
export function TimelineOverlay(
  props: TimelineOverlayProps
): JSX.Element {
  const { panelOpacities, navMapHeaderOpacity } = props;

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {milestones.map((m, i) => {
        const opacity = panelOpacities[i];
        return (
          <motion.div
            key={m.index}
            style={{ opacity, willChange: "opacity" }}
            className="absolute inset-0"
          >
            {/* Scrim behind the panel text for readability over the SVG canvas. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-2/3 bg-panel-scrim-bottom"
            />
            <div className="absolute bottom-12 left-6 max-w-xl md:bottom-16 md:left-12">
              <p className="panel-label-lg text-immersive-accent mb-4">
                {m.eyebrow}
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-snug text-on-immersive text-balance">
                {m.poeticLine}
              </h2>
              <p className="mt-5 text-on-immersive-muted text-pretty">
                {m.groundedLine}
              </p>
              <p className="mt-3 text-immersive-accent text-pretty">
                {m.differentiator}
              </p>
              <div className="mt-8">
                <CTALink
                  href={m.href}
                  variant="secondary"
                  analytics={`timeline_${m.index}_see_program`}
                  className="pointer-events-auto"
                >
                  {m.linkLabel}
                </CTALink>
              </div>
            </div>
          </motion.div>
        );
      })}

      <motion.div
        style={{ opacity: navMapHeaderOpacity, willChange: "opacity" }}
        className="absolute inset-x-0 top-12 md:top-16 text-center"
      >
        <p className="panel-label-lg text-immersive-accent">The journey</p>
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mt-3 text-on-immersive text-balance">
          Pick a program. Start anywhere.
        </h2>
        <p className="mt-3 text-on-immersive-muted">
          Each node opens that program&apos;s page.
        </p>
      </motion.div>
    </div>
  );
}