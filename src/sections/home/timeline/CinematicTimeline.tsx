"use client";
import type { JSX } from "react";
import { useRef, useState, useEffect } from "react";
import {
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { TimelineCanvas } from "@/sections/home/timeline/TimelineCanvas";
import { TimelineOverlay } from "@/sections/home/timeline/TimelineOverlay";
import { MilestoneStack } from "@/sections/home/timeline/MilestoneStack";

/**
 * Cinematic homepage timeline — a sticky-pinned scroll-driven camera over a
 * straight horizontal SVG line of 9 milestone nodes.
 *
 * Scroll story:
 *   - First look (scroll 0): full timeline zoomed out (scale 0.6) and
 *     centered in the viewport. All nodes at full opacity. The nav-map
 *     header is visible.
 *   - Zoom in (0 → 0.05): camera zooms from the centered overview into
 *     node 1, and the line shifts from viewport-center to the top portion
 *     (viewport y=400) so overlay panels render below it.
 *   - Pan (0.05 → 0.85): scale=1.4 (bigger than the overview), camera
 *     SNAPS right from node to node (staircase, not smooth pan). The
 *     camera holds at each node for 80% of the scroll interval, then
 *     snaps to the next in 20%. The active node lights up (radius 30,
 *     opacity 1); inactive nodes dim (radius 18, opacity 0.5). Each
 *     milestone's overlay panel crossfades in as its node centers.
 *   - Hold (0.85 → 0.93): hold on node 9.
 *   - Zoom out (0.93 → 1.0): scale 1.4 → 0.6, camera pulls back to the
 *     centered overview. All nodes return to full opacity; overlay panels
 *     fade out; the nav-map header fades back in.
 *
 * Camera math (SVG user units, canvas 3200 × 1800, `xMidYMid meet`):
 *   - Nodes sit at y=600. Viewport center is at user (1600, 900).
 *   - Overview (scale 0.6, centered): translate = (640, 540) — centroid
 *     (1600, 600) maps to viewport (1600, 900).
 *   - Zoomed-in (scale 1.4, line at viewport y=400):
 *     translate_x = 1600 - 1.4*xN, translate_y = 400 - 1.4*600 = -440.
 *
 * Mobile / `prefers-reduced-motion: reduce` collapses to `<MilestoneStack />`
 * — no pin, no SVG, no Framer scroll. The `enabled` gate defaults to `true`
 * so the cinematic SVG (with all 9 crawlable nodes) renders on the server;
 * `useEffect` flips `enabled` to `false` after mount if the viewport is
 * below 768px or the user prefers reduced motion.
 *
 * Pinned-section height is 500vh (desktop only). This is a deliberate
 * deviation from `v2-visual-and-motion-system.md` §4f's 250vh cap —
 * justified because all camera motion is compositor-only (`transform` +
 * `opacity` on a `<motion.g>`), so INP won't suffer, and mobile fully
 * collapses to the stack (well within the mobile pin budget).
 */

// Camera translate X: staircase pattern that steps between nodes. The
// camera holds at each node for 60% of the scroll interval, then transitions
// to the next node over the remaining 40%. Transition windows are centered
// at the midpoints between panel peaks (0.10, 0.20, ... 0.80).
//
// At scale 1.4: translate_x = 1600 - 1.4*xN.
// Node x values: 200, 550, 900, 1250, 1600, 1950, 2300, 2650, 3000
// Camera x values: 1320, 830, 340, -150, -640, -1130, -1620, -2110, -2600
const CAMERA_X_INPUT = [
  0,    0.05, 0.08, 0.12, 0.18, 0.22, 0.28, 0.32, 0.38, 0.42,
  0.48, 0.52, 0.58, 0.62, 0.68, 0.72, 0.78, 0.82, 0.93, 1,
];
const CAMERA_X_OUTPUT = [
  640,  1320, 1320, 830,  830,  340,  340,  -150, -150, -640,
  -640, -1130, -1130, -1620, -1620, -2110, -2110, -2600, -2600, 640,
];

// Camera translate Y: centered (540) at the overview, top portion (-440)
// during the zoomed-in pan. At scale 0.6: 900 - 0.6*600 = 540.
// At scale 1.4: 400 - 1.4*600 = -440.
const CAMERA_Y_INPUT = [0, 0.05, 0.93, 1];
const CAMERA_Y_OUTPUT = [540, -440, -440, 540];

// Camera scale: zoomed out (0.6) at first look → zoomed in (1.4) for the
// pan → zoomed back out (0.6) at the end.
const SCALE_INPUT = [0, 0.05, 0.93, 1];
const SCALE_OUTPUT = [0.6, 1.4, 1.4, 0.6];

// Nav-map header: visible at the first look, fades out as the camera zooms
// into node 1, hidden during the pan, fades back in at the zoom-out.
const NAV_HEADER_INPUT = [0, 0.02, 0.93, 0.97];
const NAV_HEADER_OUTPUT = [1, 0, 0, 1];

// Overview boost: 1 at the overview states (scroll 0 and 1.0), 0 during the
// pan. Combined with per-node panel opacity to produce node opacity:
//   overview (boost=1, panel=0) → 1.0 (all nodes bright)
//   pan inactive (boost=0, panel=0) → 0.5 (dimmed)
//   pan active (boost=0, panel=1) → 1.0 (lit up)
const OVERVIEW_BOOST_INPUT = [0, 0.02, 0.93, 0.97];
const OVERVIEW_BOOST_OUTPUT = [1, 0, 0, 1];

/**
 * Per-panel opacity windows — staircase pattern matching the camera steps.
 * Each panel holds at full opacity while the camera holds on its node, then
 * fades out during the 0.04 transition window as the camera moves to the
 * next node. The next panel fades in during the same transition window.
 *
 * Transition windows (where adjacent panels crossfade): 0.08–0.12, 0.18–0.22,
 * 0.28–0.32, 0.38–0.42, 0.48–0.52, 0.58–0.62, 0.68–0.72, 0.78–0.82.
 *
 * Panel 0 fades in during the zoom-in (0.02→0.05). Panel 8 fades out
 * just before the zoom-out (0.91→0.93).
 */
const PANEL_OPACITY_WINDOWS: Array<{
  input: number[];
  output: number[];
}> = [
  { input: [0.02, 0.05, 0.08, 0.12], output: [0, 1, 1, 0] },
  { input: [0.08, 0.12, 0.18, 0.22], output: [0, 1, 1, 0] },
  { input: [0.18, 0.22, 0.28, 0.32], output: [0, 1, 1, 0] },
  { input: [0.28, 0.32, 0.38, 0.42], output: [0, 1, 1, 0] },
  { input: [0.38, 0.42, 0.48, 0.52], output: [0, 1, 1, 0] },
  { input: [0.48, 0.52, 0.58, 0.62], output: [0, 1, 1, 0] },
  { input: [0.58, 0.62, 0.68, 0.72], output: [0, 1, 1, 0] },
  { input: [0.68, 0.72, 0.78, 0.82], output: [0, 1, 1, 0] },
  { input: [0.78, 0.82, 0.91, 0.93], output: [0, 1, 1, 0] },
];

/**
 * Node opacity combine function. When the overview boost is 1 (scroll 0 or
 * 1.0), all nodes are at full opacity regardless of panel state. During the
 * pan, the active node (panel=1) is at 1.0 and inactive nodes (panel=0) are
 * at 0.5. Capped at 1.0.
 */
function combineNodeOpacity(overview: number, panel: number): number {
  return Math.min(1, 0.5 + overview * 0.5 + panel * 0.5);
}

export function CinematicTimeline(): JSX.Element {
  const containerRef = useRef<HTMLElement>(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    setEnabled(!reduce && desktop);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cameraX = useTransform(scrollYProgress, CAMERA_X_INPUT, CAMERA_X_OUTPUT);
  const cameraY = useTransform(scrollYProgress, CAMERA_Y_INPUT, CAMERA_Y_OUTPUT);
  const cameraScale = useTransform(scrollYProgress, SCALE_INPUT, SCALE_OUTPUT);
  const navMapHeaderOpacity = useTransform(
    scrollYProgress,
    NAV_HEADER_INPUT,
    NAV_HEADER_OUTPUT
  );
  const overviewBoost = useTransform(
    scrollYProgress,
    OVERVIEW_BOOST_INPUT,
    OVERVIEW_BOOST_OUTPUT
  );

  // 9 unrolled useTransform calls for panel opacities — keeps the
  // react-hooks linter happy (constant call count, no loops/conditionals).
  const p0 = useTransform(scrollYProgress, PANEL_OPACITY_WINDOWS[0].input, PANEL_OPACITY_WINDOWS[0].output);
  const p1 = useTransform(scrollYProgress, PANEL_OPACITY_WINDOWS[1].input, PANEL_OPACITY_WINDOWS[1].output);
  const p2 = useTransform(scrollYProgress, PANEL_OPACITY_WINDOWS[2].input, PANEL_OPACITY_WINDOWS[2].output);
  const p3 = useTransform(scrollYProgress, PANEL_OPACITY_WINDOWS[3].input, PANEL_OPACITY_WINDOWS[3].output);
  const p4 = useTransform(scrollYProgress, PANEL_OPACITY_WINDOWS[4].input, PANEL_OPACITY_WINDOWS[4].output);
  const p5 = useTransform(scrollYProgress, PANEL_OPACITY_WINDOWS[5].input, PANEL_OPACITY_WINDOWS[5].output);
  const p6 = useTransform(scrollYProgress, PANEL_OPACITY_WINDOWS[6].input, PANEL_OPACITY_WINDOWS[6].output);
  const p7 = useTransform(scrollYProgress, PANEL_OPACITY_WINDOWS[7].input, PANEL_OPACITY_WINDOWS[7].output);
  const p8 = useTransform(scrollYProgress, PANEL_OPACITY_WINDOWS[8].input, PANEL_OPACITY_WINDOWS[8].output);
  const panelOpacities: MotionValue<number>[] = [p0, p1, p2, p3, p4, p5, p6, p7, p8];

  // 9 unrolled per-node radius transforms (active r=30, inactive r=18),
  // derived from each panel's opacity (0→18, 1→30).
  const r0 = useTransform(p0, [0, 1], [18, 30]);
  const r1 = useTransform(p1, [0, 1], [18, 30]);
  const r2 = useTransform(p2, [0, 1], [18, 30]);
  const r3 = useTransform(p3, [0, 1], [18, 30]);
  const r4 = useTransform(p4, [0, 1], [18, 30]);
  const r5 = useTransform(p5, [0, 1], [18, 30]);
  const r6 = useTransform(p6, [0, 1], [18, 30]);
  const r7 = useTransform(p7, [0, 1], [18, 30]);
  const r8 = useTransform(p8, [0, 1], [18, 30]);
  const nodeRadii: MotionValue<number>[] = [r0, r1, r2, r3, r4, r5, r6, r7, r8];

  // 9 unrolled per-node opacity transforms — combine the overview boost
  // (all nodes bright at scroll 0 and 1.0) with the panel opacity (active
  // node bright during the pan) to produce the final node opacity.
  const o0 = useTransform([overviewBoost, p0], ([o, p]: number[]) => combineNodeOpacity(o, p));
  const o1 = useTransform([overviewBoost, p1], ([o, p]: number[]) => combineNodeOpacity(o, p));
  const o2 = useTransform([overviewBoost, p2], ([o, p]: number[]) => combineNodeOpacity(o, p));
  const o3 = useTransform([overviewBoost, p3], ([o, p]: number[]) => combineNodeOpacity(o, p));
  const o4 = useTransform([overviewBoost, p4], ([o, p]: number[]) => combineNodeOpacity(o, p));
  const o5 = useTransform([overviewBoost, p5], ([o, p]: number[]) => combineNodeOpacity(o, p));
  const o6 = useTransform([overviewBoost, p6], ([o, p]: number[]) => combineNodeOpacity(o, p));
  const o7 = useTransform([overviewBoost, p7], ([o, p]: number[]) => combineNodeOpacity(o, p));
  const o8 = useTransform([overviewBoost, p8], ([o, p]: number[]) => combineNodeOpacity(o, p));
  const nodeOpacities: MotionValue<number>[] = [o0, o1, o2, o3, o4, o5, o6, o7, o8];

  if (!enabled) {
    return <MilestoneStack />;
  }

  return (
    <section
      ref={containerRef}
      aria-label="Your flight training journey, from Discovery Flight through CFII"
      className="relative h-[500vh] bg-immersive-bg"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <TimelineCanvas
          cameraX={cameraX}
          cameraY={cameraY}
          cameraScale={cameraScale}
          nodeRadii={nodeRadii}
          nodeOpacities={nodeOpacities}
        />
        <TimelineOverlay
          panelOpacities={panelOpacities}
          navMapHeaderOpacity={navMapHeaderOpacity}
        />
      </div>
    </section>
  );
}