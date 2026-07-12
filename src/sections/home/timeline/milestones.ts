/**
 * Homepage V2 cinematic timeline — the 9 pilot-journey milestones.
 *
 * The timeline is a single straight horizontal line. The first look is the
 * full timeline zoomed out; as the user scrolls, the camera zooms into each
 * node one at a time, panning right along the line, then zooms back out at
 * the end so all 9 nodes become a clickable program nav map.
 *
 * Copy registers (per `v2-narrative-and-voice.md`):
 *   - `poeticLine`:    4–14 words, fragments allowed, one flight/Sierra
 *                      metaphor, subject "you". The H2 inside the overlay.
 *   - `groundedLine`:  12–22 words, present tense, with a specific number
 *                      or named place. Reads below the H2.
 *   - `differentiator`: one sentence — the Hornbill angle at this stage.
 *
 * All copy has been checked against the V2 §4.6 avoid-list and the brand
 * banned-phrase list (`brand_identity_writing_style.md` §7).
 *
 * `svgX` / `svgY` are the node positions in the TimelineCanvas SVG's user
 * coordinate system (canvas is 3200 × 1800, 16:9 to map cleanly to desktop
 * viewports). All 9 nodes sit on y=600 (upper portion — the camera frames
 * this at the top of the viewport so overlay panels render below), evenly
 * spaced along x from 200 to 3000 (350-unit spacing):
 *
 *    1 ─── 2 ─── 3 ─── 4 ─── 5 ─── 6 ─── 7 ─── 8 ─── 9   ← horizontal line (y=600)
 */

export interface Milestone {
  /** 1-based beat index. */
  index: number;
  /** Journey milestone title (e.g., "First Solo"). Shown as the SVG node label. */
  title: string;
  /** Eyebrow above the H2 (e.g., "02 · First Solo"). */
  eyebrow: string;
  /** Destination when the node is clicked. */
  href: string;
  /** CTA text inside the overlay panel. */
  linkLabel: string;
  /** V2 poetic register, 4–14 words. Rendered as H2. */
  poeticLine: string;
  /** Grounded register, 12–22 words with a number or named place. */
  groundedLine: string;
  /** One-sentence Hornbill differentiator for this stage of the journey. */
  differentiator: string;
  /** IBM Plex Mono "coming soon" brief for the photographer. */
  imageLabel: string;
  /** SunsetPlaceholder variant for the fallback card stack. */
  sunsetVariant: "default" | "vertical" | "soft" | "dawn";
  /** SVG node X position in user units (canvas 2400 wide). */
  svgX: number;
  /** SVG node Y position in user units (canvas 1800 tall). */
  svgY: number;
  /** Background media asset (image or video) for the cinematic timeline. */
  mediaSrc: string;
  /** Alt text / brief description of the media asset. */
  mediaAlt: string;
  /** True if the media is a video that should play muted and looped. */
  mediaIsVideo?: boolean;
}

export const milestones: Milestone[] = [
  {
    index: 1,
    title: "Discovery Flight",
    eyebrow: "01 · Discovery Flight",
    href: "/discovery-flight/",
    linkLabel: "See Discovery Flight",
    poeticLine: "Your first flight as Pilot-in-command.",
    groundedLine:
      "Your first lesson is a discovery flight at RNO — about 60 minutes, $199, and no deposit.",
    differentiator: "See if flying is for you without any commitment.",
    imageLabel: "PA28 on the RNO ramp at golden hour, preflight — photography coming",
    sunsetVariant: "dawn",
    svgX: 200,
    svgY: 600,
    mediaSrc: "/images/programs/private-pilot-hero.webp",
    mediaAlt: "Private pilot training hero — PA28 on the ramp at golden hour.",
  },
  {
    index: 2,
    title: "First Solo",
    eyebrow: "02 · First Solo",
    href: "/programs/private-pilot/",
    linkLabel: "See Private Pilot",
    poeticLine: "The cockpit is all yours.",
    groundedLine:
      "Most Hornbill students solo between 15 and 25 hours.",
    differentiator:
      "Our experienced CFIs ensure you will take flight with confidence.",
    imageLabel: "PA28 lifting off RNO runway 17R, solo — photography coming",
    sunsetVariant: "default",
    svgX: 550,
    svgY: 600,
    mediaSrc: "/images/programs/private-pilot-og.webp",
    mediaAlt: "First solo — PA28 lifting off RNO runway 17R.",
  },
  {
    index: 3,
    title: "PPL",
    eyebrow: "03 · Private Pilot",
    href: "/programs/private-pilot/",
    linkLabel: "See Private Pilot",
    poeticLine: "A Licence to Learn. Or for fun.",
    groundedLine:
      "FAA minimum 40 hours; most Hornbill students finish between 55 and 70, then take the checkride.",
    differentiator:
      "Earn your wings at your own pace through our FAA Part 61 program.",
    imageLabel:
      "Left-seat PA28 panel, dual Garmin G5, checkride-ready — photography coming",
    sunsetVariant: "default",
    svgX: 900,
    svgY: 600,
    mediaSrc: "/images/timeline/ppl-checkride.jpg",
    mediaAlt: "Private Pilot checkride — left-seat PA28 panel with dual Garmin G5.",
  },
  {
    index: 4,
    title: "Cross-country",
    eyebrow: "04 · Cross-country",
    href: "/programs/private-pilot/",
    linkLabel: "See Private Pilot",
    poeticLine: "Visit real destinations as you build time.",
    groundedLine:
      "Plan an overnight trip to California, Idaho, Utah, or Arizona.",
    differentiator: "Hornbill encourages pilots to take real trips in our fleet.",
    imageLabel: "PA28 over Lake Tahoe at altitude, southbound — photography coming",
    sunsetVariant: "vertical",
    svgX: 1250,
    svgY: 600,
    mediaSrc: "/images/timeline/cross-country-flight.mp4",
    mediaAlt: "Cross-country flight — PA28 over the Sierra Nevada.",
    mediaIsVideo: true,
  },
  {
    index: 5,
    title: "Initial IFR Training",
    eyebrow: "05 · First Time in Cloud",
    href: "/programs/instrument-rating/",
    linkLabel: "See Instrument Rating",
    poeticLine: "Master the instruments.",
    groundedLine:
      "Your first IMC lesson, in an aircraft with cutting-edge Garmin avionics and WAAS-enabled GPS.",
    differentiator:
      "Our fleet is equipped with the latest Garmin avionics.",
    imageLabel: "First IMC lesson in a PA28, hood on, panel lit — photography coming",
    sunsetVariant: "soft",
    svgX: 1600,
    svgY: 600,
    mediaSrc: "/images/programs/instrument-cross-country.webp",
    mediaAlt: "First IMC lesson — PA28 in instrument cross-country conditions.",
  },
  {
    index: 6,
    title: "Instrument Rating",
    eyebrow: "06 · Instrument Rating",
    href: "/programs/instrument-rating/",
    linkLabel: "See Instrument Rating",
    poeticLine: "Soar through the clouds.",
    groundedLine:
      "Gain real-world experience flying through the challenging weather surrounding the Sierra Nevada mountains.",
    differentiator:
      "We believe the best experience is \"actual\" IMC time.",
    imageLabel:
      "IFR checkride, approach plate, attitude indicator alive — photography coming",
    sunsetVariant: "soft",
    svgX: 1950,
    svgY: 600,
    mediaSrc: "/images/programs/instrument-rating-hero.webp",
    mediaAlt: "Instrument rating — approach plate and attitude indicator alive.",
  },
  {
    index: 7,
    title: "Commercial",
    eyebrow: "07 · Commercial Pilot",
    href: "/programs/commercial-pilot/",
    linkLabel: "See Commercial Pilot",
    poeticLine: "Get paid to fly.",
    groundedLine:
      "Our commercial students graduate with real-world experiences that stand out during job interviews.",
    differentiator:
      "Hornbill students get real-world experience which translates into real jobs.",
    imageLabel: "PA28 on short final at RNO, gear down — photography coming",
    sunsetVariant: "vertical",
    svgX: 2300,
    svgY: 600,
    mediaSrc: "/images/programs/cfi-hero.webp",
    mediaAlt: "Commercial pilot — PA28 on short final at RNO.",
  },
  {
    index: 8,
    title: "CFI",
    eyebrow: "08 · Certified Flight Instructor",
    href: "/programs/certified-flight-instructor/",
    linkLabel: "See Certified Flight Instructor",
    poeticLine: "Move into the right seat.",
    groundedLine:
      "Earn the Fundamentals of Instruction and spin-training endorsements, then sign off your first student at RNO.",
    differentiator:
      "Part 61 flexibility. You teach on your schedule and set your own instruction rates.",
    imageLabel: "CFI and student in the right seat, sectional open — photography coming",
    sunsetVariant: "dawn",
    svgX: 2650,
    svgY: 600,
    mediaSrc: "/images/programs/cfi-instructor-pa28.webp",
    mediaAlt: "CFI and student in the right seat of a PA28 with sectional open.",
  },
  {
    index: 9,
    title: "CFII",
    eyebrow: "09 · CFII",
    href: "/programs/cfii/",
    linkLabel: "See CFII",
    poeticLine:
      "Teach advanced ratings.",
    groundedLine:
      "A CFII adds instrument-instructor privileges to your CFI; teach IFR students in our WAAS-equipped PA28s at RNO.",
    differentiator:
      "Teach advanced students and build valuable experience in IMC.",
    imageLabel: "CFII and student in IMC, attitude indicator alive — photography coming",
    sunsetVariant: "soft",
    svgX: 3000,
    svgY: 600,
    mediaSrc: "/images/timeline/overview-destination.jpg",
    mediaAlt: "Sierra Nevada destination — the view from the end of the journey.",
  },
];

/** SVG canvas dimensions in user units. */
export const TIMELINE_CANVAS_WIDTH = 3200;
export const TIMELINE_CANVAS_HEIGHT = 1800;