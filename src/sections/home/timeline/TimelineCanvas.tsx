"use client";
import type { JSX } from "react";
import type { MotionValue } from "framer-motion";
import { motion } from "framer-motion";
import {
  milestones,
  TIMELINE_CANVAS_WIDTH,
  TIMELINE_CANVAS_HEIGHT,
  type Milestone,
} from "@/sections/home/timeline/milestones";

interface TimelineCanvasProps {
  /** Camera translate X in SVG user units. */
  cameraX: MotionValue<number>;
  /** Camera translate Y in SVG user units. */
  cameraY: MotionValue<number>;
  /** Camera scale (0.6 = zoomed-out overview, 1.4 = zoomed-in on a node). */
  cameraScale: MotionValue<number>;
  /** Per-node circle radius MotionValue (9 entries; active node r=30, inactive r=18). Optional — if not provided, a static r=18 with CSS hover scale is used. */
  nodeRadii?: MotionValue<number>[];
  /** Per-node opacity MotionValue (9 entries; active/overview node = 1, inactive during pan = 0.5). Optional — if not provided, all nodes render at full opacity. */
  nodeOpacities?: MotionValue<number>[];
}

/**
 * Build the straight-line path `d` string connecting the 9 milestones in order.
 *
 *   1 ─── 2 ─── 3 ─── 4 ─── 5 ─── 6 ─── 7 ─── 8 ─── 9   ← horizontal line (y=600)
 */
function buildPathD(ms: ReadonlyArray<Pick<Milestone, "svgX" | "svgY">>): string {
  if (ms.length === 0) return "";
  return ms.map((m, i) => `${i === 0 ? "M" : "L"} ${m.svgX} ${m.svgY}`).join(" ");
}

const PATH_D = buildPathD(milestones);

export function TimelineCanvas(props: TimelineCanvasProps): JSX.Element {
  const { cameraX, cameraY, cameraScale, nodeRadii, nodeOpacities } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${TIMELINE_CANVAS_WIDTH} ${TIMELINE_CANVAS_HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="100%"
      className="h-full w-full"
      role="img"
      aria-label="Pilot journey timeline from Discovery Flight through CFII, laid out as a horizontal flight path across a sectional-chart grid."
    >
      <defs>
        <pattern
          id="timeline-blueprint-grid"
          width={48}
          height={48}
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 48 0 L 0 0 0 48"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            opacity={0.15}
          />
        </pattern>
      </defs>

      {/* Background: chart grid layer */}
      <rect
        x={0}
        y={0}
        width={TIMELINE_CANVAS_WIDTH}
        height={TIMELINE_CANVAS_HEIGHT}
        fill="url(#timeline-blueprint-grid)"
        className="text-on-immersive"
      />

      {/* Camera group: Framer-driven translate + scale. Wraps all canvas content. */}
      <motion.g
        style={{
          x: cameraX,
          y: cameraY,
          scale: cameraScale,
          willChange: "transform",
        }}
      >
        {/* The horizontal flight path: sectional-chart magenta dashed line */}
        <path
          d={PATH_D}
          fill="none"
          stroke="var(--palette-cyan-500)"
          strokeWidth={8}
          strokeDasharray="16 16"
          strokeLinecap="round"
          opacity={0.7}
        />

        {/* The 9 milestone nodes */}
        {milestones.map((m, i) => {
          const radius = nodeRadii?.[i];
          const opacity = nodeOpacities?.[i];
          const circleProps = radius ? { r: radius } : { r: 18 };
          return (
            <g
              key={m.index}
              className="timeline-node group cursor-pointer"
              transform={`translate(${m.svgX} ${m.svgY})`}
            >
              <motion.g style={opacity ? { opacity } : undefined}>
                <a
                  href={m.href}
                  aria-label={`${m.title} — ${m.linkLabel}`}
                  className="focus:outline-none"
                >
                  <motion.circle
                    cx={0}
                    cy={0}
                    {...circleProps}
                    fill="var(--color-immersive-bg-night)"
                    stroke="var(--palette-cyan-500)"
                    strokeWidth={4}
                    className="transition-[r] duration-200 group-hover:[r:30]"
                  />
                  <text
                    x={0}
                    y={60}
                    textAnchor="middle"
                    fontFamily="var(--font-body)"
                    fontSize={28}
                    fill="var(--color-on-immersive)"
                  >
                    {m.title}
                  </text>
                </a>
              </motion.g>
            </g>
          );
        })}
      </motion.g>
    </svg>
  );
}