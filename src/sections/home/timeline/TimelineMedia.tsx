"use client";
import type { JSX } from "react";
import type { MotionValue } from "framer-motion";
import { motion, useTransform } from "framer-motion";
import { AssetImage as Image } from "@/components/AssetImage";
import { milestones } from "@/sections/home/timeline/milestones";
import { assetPath } from "@/lib/assets";

interface TimelineMediaProps {
  /**
   * 6 opacity MotionValues, one per milestone. Each drives a media layer's
   * opacity across the scroll, matching the overlay panels so the images
   * fade/change with the text.
   */
  panelOpacities: MotionValue<number>[];
  /**
   * MotionValue from the orchestrator that is 1 at the start and end overview
   * states and 0 during the per-node pan. Used to fade in a default background
   * when no node is focused.
   */
  overviewBoost: MotionValue<number>;
}

/**
 * Full-bleed background media for the cinematic timeline.
 *
 * Layers, bottom to top:
 *   1. Solid immersive-bg base layer.
 *   2. A default background video for the overview / intro states.
 *   3. One absolutely-positioned image or video layer per milestone, crossfading
 *      with the overlay panels as nodes come into focus.
 *   4. A dark immersive-bg wash for tone and text contrast.
 *
 * The per-node media opacities are tied to the same panel opacity windows used
 * by TimelineOverlay, so the background fades/change in lockstep with the text.
 */
export function TimelineMedia({ panelOpacities, overviewBoost }: TimelineMediaProps): JSX.Element {
  // Invert the overview boost so the default background is strongest when no
  // node is focused, and fades out as soon as a node panel appears.
  const defaultOpacity = useTransform(overviewBoost, [0, 1], [0, 1]);

  return (
    <div
      className="absolute inset-0 z-0 bg-immersive-bg"
      aria-hidden="true"
    >
      {/* Default background for the unfocused overview state. */}
      <motion.div
        style={{ opacity: defaultOpacity, willChange: "opacity" }}
        className="absolute inset-0"
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster=""
        >
          <source src={assetPath("/images/timeline/background.mp4")} type="video/mp4" />
        </video>
      </motion.div>

      {milestones.map((m, i) => {
        const opacity = panelOpacities[i];
        return (
          <motion.div
            key={m.index}
            data-timeline-media-layer
            style={{ opacity, willChange: "opacity" }}
            className="absolute inset-0"
          >
            {m.mediaIsVideo ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster=""
              >
                <source src={assetPath(m.mediaSrc)} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={m.mediaSrc}
                alt={m.mediaAlt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            )}
          </motion.div>
        );
      })}

      {/* Darker immersive wash for tone and readability. */}
      <div className="absolute inset-0 z-[2] bg-immersive-bg/70" />
    </div>
  );
}
