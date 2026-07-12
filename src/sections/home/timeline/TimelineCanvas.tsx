"use client";
import { useRef, useEffect, type JSX } from "react";
import type { MotionValue } from "framer-motion";
import { motion, useMotionValue, useTransform } from "framer-motion";
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
  /** Camera scale (0.85 = zoomed-out overview, 1.4 = zoomed-in on a node). */
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
  const svgRef = useRef<SVGSVGElement>(null);
  const svgWidth = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const svgHeight = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight : 0
  );

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const update = () => {
      const rect = svg.getBoundingClientRect();
      svgWidth.set(rect.width);
      svgHeight.set(rect.height);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(svg);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [svgWidth, svgHeight]);

  // The SVG uses `preserveAspectRatio="xMidYMid meet"`, so its user-unit
  // viewBox is scaled uniformly and centered inside the actual CSS box.
  // Convert the user-unit camera values into CSS-pixel transform values so
  // the timeline stays centered in the rendered viewport across aspect
  // ratios. The camera values are authored as if `scale(cameraScale)` is
  // applied about the top-left of the scaled SVG content (which maps to the
  // SVG origin), so the translate must include `offset * (1 - scale)` to keep
  // that origin stable while scaling.
  const scaleCss = useTransform([svgWidth, svgHeight], ([w, h]: number[]) =>
    w > 0 && h > 0
      ? Math.min(
          w / TIMELINE_CANVAS_WIDTH,
          h / TIMELINE_CANVAS_HEIGHT
        )
      : 1
  );
  const offsetX = useTransform([svgWidth, scaleCss], ([w, s]: number[]) =>
    (w - TIMELINE_CANVAS_WIDTH * s) / 2
  );
  const offsetY = useTransform([svgHeight, scaleCss], ([h, s]: number[]) =>
    (h - TIMELINE_CANVAS_HEIGHT * s) / 2
  );
  const cssX = useTransform(
    [cameraX, cameraScale, scaleCss, offsetX],
    ([x, cs, s, ox]) =>
      (x as number) * (s as number) +
      (ox as number) * (1 - (cs as number))
  );
  const cssY = useTransform(
    [cameraY, cameraScale, scaleCss, offsetY],
    ([y, cs, s, oy]) =>
      (y as number) * (s as number) +
      (oy as number) * (1 - (cs as number))
  );
  const cssScale = useTransform([cameraScale], ([s]) => s as number);

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${TIMELINE_CANVAS_WIDTH} ${TIMELINE_CANVAS_HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="100%"
      className="block h-full w-full"
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

      {/* Camera group: Framer-driven translate + scale. The values above are
           in SVG user units; they are converted to CSS pixels below so the
           timeline centers correctly inside the `xMidYMid meet` viewport. */}
      <motion.g
        style={{
          x: cssX,
          y: cssY,
          scale: cssScale,
          originX: 0,
          originY: 0,
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
                    fontSize={36}
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