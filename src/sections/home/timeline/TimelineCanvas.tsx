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
  /** Per-node circle radius MotionValue (6 entries; active node r=30, inactive r=18). Optional — if not provided, a static r=18 with CSS hover scale is used. */
  nodeRadii?: MotionValue<number>[];
  /** Per-node opacity MotionValue (6 entries; active/overview node = 1, inactive during pan = 0.5). Optional — if not provided, all nodes render at full opacity. */
  nodeOpacities?: MotionValue<number>[];
  /** Jet marker x position in SVG user units (world space). Drives the small jet that flies along the path, node to node, as the user scrolls. */
  jetX?: MotionValue<number>;
}

/**
 * Build the straight-line path `d` string connecting the 6 milestones in order.
 *
 *   1 ─── 2 ─── 3 ─── 4 ─── 5 ─── 6   ← horizontal line (y=600)
 */
function buildPathD(ms: ReadonlyArray<Pick<Milestone, "svgX" | "svgY">>): string {
  if (ms.length === 0) return "";
  return ms.map((m, i) => `${i === 0 ? "M" : "L"} ${m.svgX} ${m.svgY}`).join(" ");
}

const PATH_D = buildPathD(milestones);

export function TimelineCanvas(props: TimelineCanvasProps): JSX.Element {
  const { cameraX, cameraY, cameraScale, nodeRadii, nodeOpacities, jetX } = props;
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
      className="relative z-[5] block h-full w-full"
      role="img"
      aria-label="Pilot journey timeline from Discovery Flight through CFI, laid out as a horizontal flight path across a sectional-chart grid."
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
          stroke="var(--palette-magenta-500)"
          strokeWidth={8}
          strokeDasharray="16 16"
          strokeLinecap="round"
          opacity={0.7}
        />

        {/* The 6 milestone nodes */}
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
                    fill="var(--palette-gold-600)"
                    stroke="var(--palette-gold-600)"
                    strokeWidth={4}
                    className="transition-[r,fill] duration-200 group-hover:[r:30] group-hover:[fill:var(--color-on-immersive)]"
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

        {/* The small airplane marker that flies along the path, node to node.
             Lives inside the camera group so it inherits the camera
             transform — during camera transitions it stays centered on
             screen while the path slides underneath, giving the visual of
             the plane "flying" to the next milestone. Drawn on top of the
             nodes; centered on the line at y=600. The path is extracted
             from `/Users/jack/Downloads/file.svg`, scaled down and rotated
             so it points right (direction of travel). */}
        {jetX && (
          <motion.g
            style={{ x: jetX, y: 600 }}
            aria-hidden="true"
          >
            <g transform="translate(-46.76, -46.42) scale(0.195) rotate(45, 239.79, 238.05)">
              <path
                fill="white"
                opacity={1}
                d="
                  M200.374344,382.389954
                  C199.779053,383.002319 199.401016,383.335968 199.083023,383.719360
                  C191.449844,392.922424 183.122086,392.385223 177.096405,381.815552
                  C168.353394,366.479370 159.957123,350.943542 151.568710,335.408813
                  C149.826920,332.183136 147.578064,329.923065 144.350388,328.176636
                  C128.822632,319.774933 113.366051,311.239960 97.944969,302.643341
                  C87.881569,297.033417 86.434250,287.320831 94.467125,279.083313
                  C102.376343,270.972656 110.442574,263.013885 118.503006,255.052338
                  C122.791092,250.816833 127.668282,248.953018 133.933197,250.413116
                  C141.372116,252.146805 148.982330,253.148010 156.521805,254.446350
                  C159.022522,254.876984 161.467499,255.121078 163.538773,253.072433
                  C175.483063,241.258636 187.454224,229.472031 199.516541,217.577332
                  C197.675934,214.889343 195.347702,214.264084 193.344406,213.271072
                  C164.989670,199.215897 136.622971,185.184708 108.231689,171.203506
                  C104.230530,169.233154 100.798462,166.814789 98.953659,162.565552
                  C96.769814,157.535385 96.847420,152.645721 100.761383,148.629700
                  C110.875694,138.251678 121.103462,127.978722 131.496994,117.881065
                  C135.506729,113.985497 140.625641,113.487473 145.983429,114.883224
                  C180.762009,123.943398 215.548401,132.973618 250.331665,142.015762
                  C254.840179,143.187759 259.408081,144.178650 263.832886,145.610580
                  C267.503601,146.798477 269.923340,145.760941 272.561096,143.044968
                  C283.007172,132.289078 293.845856,121.913925 304.270905,111.138237
                  C315.273499,99.765526 327.805756,91.069504 343.383331,87.357941
                  C360.966278,83.168571 376.194916,86.877586 386.755554,99.692436
                  C392.275146,106.390213 393.142609,115.021156 392.849915,123.372383
                  C392.169556,142.781845 383.049469,158.186249 369.337402,171.410294
                  C357.586639,182.742859 346.265961,194.520340 334.612793,205.956039
                  C332.273224,208.251923 331.835968,210.322021 332.654572,213.453247
                  C343.002686,253.035355 353.158417,292.667755 363.508453,332.249329
                  C365.106873,338.362000 363.979919,343.174408 359.369812,347.617767
                  C350.133728,356.519836 341.216156,365.751343 332.094788,374.773743
                  C323.272888,383.499939 313.486969,381.906097 307.926849,370.733459
                  C293.382477,341.507507 278.951080,312.225342 264.444855,282.980347
                  C263.725952,281.531067 263.435974,279.770325 261.583832,278.658569
                  C259.013000,279.720032 257.404724,282.125153 255.456192,284.062653
                  C245.650681,293.812775 235.931824,303.650238 226.105576,313.379272
                  C223.887100,315.575806 223.171524,317.713715 223.886734,320.941559
                  C225.575851,328.565002 226.748123,336.304321 228.074783,344.006195
                  C229.139435,350.187073 227.520111,355.438873 222.922012,359.900909
                  C215.389343,367.210571 208.043945,374.713196 200.374344,382.389954
                  M159.769043,166.622070
                  C182.171753,177.675507 204.607193,188.663269 226.963730,199.809326
                  C238.624222,205.622787 240.184158,215.617676 231.052887,224.759140
                  C213.626419,242.205063 196.020554,259.476257 178.839722,277.160553
                  C173.275955,282.887360 167.226242,284.285828 159.841919,282.813690
                  C153.320053,281.513489 146.765579,280.352020 140.193802,279.333862
                  C133.354324,278.274261 129.436951,280.498871 125.901474,287.358765
                  C137.727692,293.765045 149.495239,300.312805 161.437256,306.525269
                  C166.382553,309.097870 170.014893,312.495361 172.466232,317.552490
                  C175.732712,324.291229 179.456085,330.810150 183.038742,337.393311
                  C185.955215,342.752350 188.953339,348.066986 192.153870,353.831024
                  C196.648895,349.546814 202.119171,346.984833 200.602524,339.753754
                  C199.137054,332.766632 198.253235,325.658905 197.044083,318.616180
                  C195.864655,311.746552 197.435410,306.160706 202.704483,301.031982
                  C220.126846,284.073730 237.270233,266.824402 254.318497,249.487976
                  C264.333038,239.304184 274.477905,240.638443 280.817963,253.451492
                  C295.071442,282.257446 309.271271,311.089996 323.542999,339.886871
                  C324.303314,341.420929 324.547028,343.487976 327.059692,344.167572
                  C328.391907,342.930634 329.732910,341.442780 331.307861,340.268738
                  C336.029663,336.748901 336.738098,332.801666 335.157257,326.903015
                  C324.994690,288.982697 315.456787,250.895401 305.427429,212.938614
                  C303.516785,205.707611 304.649567,200.208694 310.093292,194.907806
                  C325.130310,180.265472 339.898926,165.344986 354.646576,150.409012
                  C361.772064,143.192551 366.124908,134.510071 366.673676,124.244194
                  C367.153046,115.276436 363.419617,112.127388 354.438538,113.591873
                  C344.101013,115.277534 335.208160,119.724586 327.789642,127.199417
                  C314.059418,141.033859 300.011383,154.561661 286.559998,168.660141
                  C280.381500,175.135864 273.968079,176.688324 265.463898,174.434509
                  C226.557007,164.123291 187.556427,154.165680 148.594437,144.062027
                  C147.306488,143.728027 145.899628,142.909622 144.775635,143.868790
                  C141.307571,146.828308 137.394821,149.438721 135.235580,154.356506
                  C143.376205,158.424744 151.240204,162.354752 159.769043,166.622070
                  z"
              />
            </g>
          </motion.g>
        )}
      </motion.g>
    </svg>
  );
}