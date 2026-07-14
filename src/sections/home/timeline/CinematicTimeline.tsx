"use client";
import type { JSX } from "react";
import { useRef, useState, useEffect, useMemo } from "react";
import {
  useScroll,
  useTransform,
  useMotionValue,
  type MotionValue,
} from "framer-motion";
import { TimelineCanvas } from "@/sections/home/timeline/TimelineCanvas";
import { TimelineOverlay } from "@/sections/home/timeline/TimelineOverlay";
import { TimelineMedia } from "@/sections/home/timeline/TimelineMedia";
import { MilestoneStack } from "@/sections/home/timeline/MilestoneStack";
import {
  milestones,
  TIMELINE_CANVAS_WIDTH,
  TIMELINE_CANVAS_HEIGHT,
} from "@/sections/home/timeline/milestones";

/**
 * Cinematic homepage timeline — a sticky-pinned scroll-driven camera over a
 * straight horizontal SVG line of 6 milestone nodes.
 *
 * Scroll story:
 *   - First look (scroll 0): full timeline zoomed out (scale 0.85) and
 *     centered in the visible sticky viewport below the site header. All
 *     nodes at full opacity. The nav-map header is visible.
 *   - Zoom in (0 → 0.05): camera zooms from the centered overview into
 *     node 1, and the line shifts from viewport-center to the top portion
 *     (viewport y=400) so overlay panels render below it.
 *   - Pan (0.05 → 0.93): scale=1.4 (bigger than the overview), camera
 *     SNAPS right from node to node (staircase, not smooth pan). The
 *     camera holds at each node, then snaps to the next. The active node
 *     lights up (radius 30, opacity 1); inactive nodes dim (radius 18,
 *     opacity 0.5). Each milestone's overlay panel crossfades in as its
 *     node centers.
 *   - Hold (0.80 → 0.93): hold on node 6.
 *   - Zoom out (0.93 → 1.0): scale 1.4 → 0.85, camera pulls back to the
 *     centered overview. All nodes return to full opacity; overlay panels
 *     fade out; the nav-map header fades back in.
 *
 * Camera math (SVG user units, canvas 3200 × 1800, `xMidYMid meet`):
 *   - Nodes sit at y=600. Viewport center is at user (1600, 900).
 *   - Overview (scale 0.85, centered): translate = (240, 390) — centroid
 *     (1600, 600) maps to viewport (1600, 900).
 *   - Zoomed-in (scale 1.4, line at viewport y=400):
 *     translate_x = 1600 - 1.4*xN, translate_y = 400 - 1.4*600 = -440.
 *
 * Mobile / `prefers-reduced-motion: reduce` collapses to `<MilestoneStack />`
 * — no pin, no SVG, no Framer scroll. The `enabled` gate defaults to `true`
 * so the cinematic SVG (with all 6 crawlable nodes) renders on the server;
 * `useEffect` flips `enabled` to `false` after mount if the viewport is
 * below 768px or the user prefers reduced motion.
 *
 * Pinned-section height is 400vh (desktop only). This is a deliberate
 * deviation from `v2-visual-and-motion-system.md` §4f's 250vh cap —
 * justified because all camera motion is compositor-only (`transform` +
 * `opacity` on a `<motion.g>`), so INP won't suffer, and mobile fully
 * collapses to the stack (well within the mobile pin budget).
 */

// Camera translate X: staircase pattern that steps between nodes. The
// camera holds at each node for ~0.11 of the scroll interval, then
// transitions to the next node over ~0.04. Transition windows are centered
// at the midpoints between panel peaks.
//
// At scale 1.4: translate_x = 1600 - 1.4*xN.
// Node x values: 200, 760, 1320, 1880, 2440, 3000
// Camera x values: 1320, 536, -248, -1032, -1816, -2600
const CAMERA_X_INPUT = [
  0,    0.05, 0.16, 0.20, 0.31, 0.35, 0.46, 0.50, 0.61, 0.65,
  0.76, 0.80, 0.93, 1,
];
const CAMERA_X_OUTPUT = [
  240,  1320, 1320, 536,  536,  -248, -248, -1032, -1032, -1816,
  -1816, -2600, -2600, 240,
];

// Jet marker x position: same staircase as the camera, but in world-space
// node-x coordinates. The jet sits at the active node during each hold,
// then flies to the next node during the camera transition window. Since
// the jet lives inside the camera-transformed group, it stays centered on
// screen while the path and other nodes slide underneath — the visual of
// the jet flying along the timeline. At scroll 0 it rests at node 1; at
// scroll 1 it rests at node 6 (journey complete).
const JET_X_INPUT = CAMERA_X_INPUT;
const JET_X_OUTPUT = [
  milestones[0].svgX, milestones[0].svgX, milestones[0].svgX,
  milestones[1].svgX, milestones[1].svgX,
  milestones[2].svgX, milestones[2].svgX,
  milestones[3].svgX, milestones[3].svgX,
  milestones[4].svgX, milestones[4].svgX,
  milestones[5].svgX, milestones[5].svgX, milestones[5].svgX,
];

// Horizontal correction for the overview state. The node-line midpoint
// (x=1600) centers the circles, but the text labels extend asymmetrically
// ("Discovery Flight" is much wider than "CFI"), so the visual composition
// reads shifted left. We express the desired correction in CSS pixels so it is
// viewport-independent in rendered space; the matching user-unit offset is
// `cssShift / scaleCss`. This correction is applied only at the overview
// states (scroll 0 and 1) so the per-node pan positions remain unchanged.
const OVERVIEW_X_SHIFT_CSS_PX = 120;

// Camera translate Y: the scroll-driven values below express the camera's
// offset from the overview centering position. The actual overview cameraY
// is computed responsively from the viewport so the node line (y=600) sits
// in the middle of the visible sticky area below the site header. The pan
// state is a fixed 900-unit lift from that overview center so the line
// moves to the upper viewport and leaves room for overlay panels.
const CAMERA_Y_INPUT = [0, 0.05, 0.93, 1];
const CAMERA_Y_OFFSET_OUTPUT = [0, -900, -900, 0];

// Total sticky top area: desktop has the 36px QuickFactsStrip + 72px
// Header; below the lg breakpoint only the 64px Header is sticky.
const HEADER_HEIGHT_DESKTOP = 108;
const HEADER_HEIGHT_MOBILE_HEADER_ONLY = 64;

// Camera scale: zoomed out (0.85) at first look → zoomed in (1.4) for the
// pan → zoomed back out (0.85) at the end.
const SCALE_INPUT = [0, 0.05, 0.93, 1];
const SCALE_OUTPUT = [0.85, 1.4, 1.4, 0.85];

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
 * Transition windows (where adjacent panels crossfade): 0.16–0.20, 0.31–0.35,
 * 0.46–0.50, 0.61–0.65, 0.76–0.80.
 *
 * Panel 0 fades in during the zoom-in (0.02→0.05). Panel 5 fades out
 * just before the zoom-out (0.91→0.93).
 */
const PANEL_OPACITY_WINDOWS: Array<{
  input: number[];
  output: number[];
}> = [
  { input: [0.02, 0.05, 0.16, 0.20], output: [0, 1, 1, 0] },
  { input: [0.16, 0.20, 0.31, 0.35], output: [0, 1, 1, 0] },
  { input: [0.31, 0.35, 0.46, 0.50], output: [0, 1, 1, 0] },
  { input: [0.46, 0.50, 0.61, 0.65], output: [0, 1, 1, 0] },
  { input: [0.61, 0.65, 0.76, 0.80], output: [0, 1, 1, 0] },
  { input: [0.76, 0.80, 0.91, 0.93], output: [0, 1, 1, 0] },
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

  // Measure the viewport so the overview cameraY can be centered in the
  // visible area below the sticky header. Default to a typical desktop
  // viewport for the server/initial paint, then correct after hydration.
  const [viewport, setViewport] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 1440,
    height: typeof window !== "undefined" ? window.innerHeight : 900,
  }));

  useEffect(() => {
    const update = () =>
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scaleCss = useMemo(() => {
    if (viewport.width === 0 || viewport.height === 0) return 0.5;
    return Math.min(
      viewport.width / TIMELINE_CANVAS_WIDTH,
      viewport.height / TIMELINE_CANVAS_HEIGHT
    );
  }, [viewport]);

  const headerHeight =
    viewport.width >= 1024
      ? HEADER_HEIGHT_DESKTOP
      : HEADER_HEIGHT_MOBILE_HEADER_ONLY;

  // Vertically center the node line (y=600) in the visible sticky area
  // below the header. Derivation:
  //   visualCenter = (viewportHeight + headerHeight) / 2
  //   visualCenter = offsetY + cameraY*scaleCss + 0.85*scaleCss*600
  //   offsetY = (viewportHeight - 1800*scaleCss) / 2
  //   => cameraY = headerHeight / (2*scaleCss) + 390
  const centerYOffset =
    scaleCss > 0 ? headerHeight / (2 * scaleCss) + 390 : 498;
  // Keep the MotionValue instance stable across resizes; update its value
  // via `.set()` so the cameraY transform keeps its subscription.
  const centerYOffsetMv = useMotionValue(498);

  useEffect(() => {
    centerYOffsetMv.set(centerYOffset);
  }, [centerYOffset]);

  // Responsive horizontal correction for the overview. Convert the desired
  // CSS-pixel shift into SVG user units so the rendered shift stays the same
  // across viewport sizes. The correction fades out during the zoom/pan so
  // the per-node positions remain centered.
  const overviewXOffset =
    scaleCss > 0 ? OVERVIEW_X_SHIFT_CSS_PX / scaleCss : 800;
  const overviewXOffsetMv = useMotionValue(800);

  useEffect(() => {
    overviewXOffsetMv.set(overviewXOffset);
  }, [overviewXOffset]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cameraXBase = useTransform(
    scrollYProgress,
    CAMERA_X_INPUT,
    CAMERA_X_OUTPUT
  );
  const overviewXShiftFactor = useTransform(
    scrollYProgress,
    [0, 0.05, 0.93, 1],
    [1, 0, 0, 1]
  );
  const cameraXOffset = useTransform(
    [overviewXOffsetMv, overviewXShiftFactor],
    ([offset, factor]) => (offset as number) * (factor as number)
  );
  const cameraX = useTransform(
    [cameraXBase, cameraXOffset],
    ([base, off]) => (base as number) + (off as number)
  );
  const cameraYBase = useTransform(
    scrollYProgress,
    CAMERA_Y_INPUT,
    CAMERA_Y_OFFSET_OUTPUT
  );
  const cameraY = useTransform(
    [cameraYBase, centerYOffsetMv],
    ([base, cy]) => (base as number) + (cy as number)
  );
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

  // 6 unrolled useTransform calls for panel opacities — keeps the
  // react-hooks linter happy (constant call count, no loops/conditionals).
  const p0 = useTransform(scrollYProgress, PANEL_OPACITY_WINDOWS[0].input, PANEL_OPACITY_WINDOWS[0].output);
  const p1 = useTransform(scrollYProgress, PANEL_OPACITY_WINDOWS[1].input, PANEL_OPACITY_WINDOWS[1].output);
  const p2 = useTransform(scrollYProgress, PANEL_OPACITY_WINDOWS[2].input, PANEL_OPACITY_WINDOWS[2].output);
  const p3 = useTransform(scrollYProgress, PANEL_OPACITY_WINDOWS[3].input, PANEL_OPACITY_WINDOWS[3].output);
  const p4 = useTransform(scrollYProgress, PANEL_OPACITY_WINDOWS[4].input, PANEL_OPACITY_WINDOWS[4].output);
  const p5 = useTransform(scrollYProgress, PANEL_OPACITY_WINDOWS[5].input, PANEL_OPACITY_WINDOWS[5].output);
  const panelOpacities: MotionValue<number>[] = [p0, p1, p2, p3, p4, p5];

  // 6 unrolled per-node radius transforms (active r=30, inactive r=18),
  // derived from each panel's opacity (0→18, 1→30).
  const r0 = useTransform(p0, [0, 1], [18, 30]);
  const r1 = useTransform(p1, [0, 1], [18, 30]);
  const r2 = useTransform(p2, [0, 1], [18, 30]);
  const r3 = useTransform(p3, [0, 1], [18, 30]);
  const r4 = useTransform(p4, [0, 1], [18, 30]);
  const r5 = useTransform(p5, [0, 1], [18, 30]);
  const nodeRadii: MotionValue<number>[] = [r0, r1, r2, r3, r4, r5];

  // 6 unrolled per-node opacity transforms — combine the overview boost
  // (all nodes bright at scroll 0 and 1.0) with the panel opacity (active
  // node bright during the pan) to produce the final node opacity.
  const o0 = useTransform([overviewBoost, p0], ([o, p]: number[]) => combineNodeOpacity(o, p));
  const o1 = useTransform([overviewBoost, p1], ([o, p]: number[]) => combineNodeOpacity(o, p));
  const o2 = useTransform([overviewBoost, p2], ([o, p]: number[]) => combineNodeOpacity(o, p));
  const o3 = useTransform([overviewBoost, p3], ([o, p]: number[]) => combineNodeOpacity(o, p));
  const o4 = useTransform([overviewBoost, p4], ([o, p]: number[]) => combineNodeOpacity(o, p));
  const o5 = useTransform([overviewBoost, p5], ([o, p]: number[]) => combineNodeOpacity(o, p));
  const nodeOpacities: MotionValue<number>[] = [o0, o1, o2, o3, o4, o5];

  // Jet marker x in world space — drives the small jet that flies along the
  // path, node to node, as the user scrolls.
  const jetX = useTransform(scrollYProgress, JET_X_INPUT, JET_X_OUTPUT);

  if (!enabled) {
    return <MilestoneStack />;
  }

  return (
    <section
      ref={containerRef}
      aria-label="Your flight training journey, from Discovery Flight through CFI"
      className="relative h-[400vh] bg-immersive-bg"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <TimelineMedia
          panelOpacities={panelOpacities}
          overviewBoost={overviewBoost}
        />
        <TimelineCanvas
          cameraX={cameraX}
          cameraY={cameraY}
          cameraScale={cameraScale}
          nodeRadii={nodeRadii}
          nodeOpacities={nodeOpacities}
          jetX={jetX}
        />
        <TimelineOverlay
          panelOpacities={panelOpacities}
          navMapHeaderOpacity={navMapHeaderOpacity}
        />
      </div>
    </section>
  );
}