import type { FAQItem } from "@/types";
import { siteConfig } from "@/lib/config";

const memberRate = `$${siteConfig.pricing.memberWetRate}/hr`;
const nonMemberRate = `$${siteConfig.pricing.nonMemberWetRate}/hr`;
const membershipRate = `$${siteConfig.pricing.membershipMonthly}/month`;
const discoveryFlightHref = "/discovery-flight/";
const fleetHref = "/fleet/";
const membershipHref = "/membership/";
const contactHref = "/contact/";
const privatePilotHref = "/programs/private-pilot/";
const instrumentRatingHref = "/programs/instrument-rating/";
const crossCountryRentalsHref = "/cross-country-rentals/";
const locationHref = "/location/";
const toolsDensityAltitudeHref = "/tools/density-altitude/";
const blogDensityAltitudeHref = "/blog/density-altitude-krno/";
const studentResourcesHref = "/student-resources/";
const aboutHref = "/about/";

export const mountainFlyingProgram = {
  slug: "mountain-flying",
  title: "Mountain Flying",
  fullTitle: "Mountain Flying and Density-Altitude Course",
  metaTitle: "Mountain Flying Course in Reno, NV",
  metaDescription:
    "Learn mountain flying and density altitude at RNO. Part 61 Sierra Nevada course in a PA28 fleet. Book a discovery flight or consultation today.",
  hero: {
    title: "Mountain flying training in Reno, NV.",
    subtitle:
      "Learn to fly the Sierra Nevada safely. Build confidence in density altitude, mountain weather, and high-terrain route planning from Reno–Tahoe (RNO).",
    image: "/images/programs/mountain-flying-hero.webp",
    imageAlt:
      "Hornbill PA28 Cherokee on the ramp with snow-capped Sierra Nevada mountains in the background",
    cta: {
      primary: {
        label: "Book a discovery flight",
        href: discoveryFlightHref,
        analytics: "mountain_flying_discovery_booking_started",
      },
      secondary: {
        label: "See the fleet and rates",
        href: fleetHref,
        analytics: "fleet_click",
      },
    },
  },
  quickAnswer:
    "Hornbill Aviation's Mountain Flying course teaches single-engine pilots to operate safely in the Sierra Nevada and high-desert terrain around Reno–Tahoe (RNO). You study density altitude, mountain weather, ridge crossing, and escape-route planning, then apply it on real routes from RNO with a CFI who knows the local area.",
  whatCourseCovers: {
    title: "What the course covers",
    intro:
      "This is a judgment-first course. Every flight starts with a honest go/no-go decision and ends with a debrief that makes the next mountain flight safer.",
    items: [
      {
        label: "Density-altitude performance",
        description:
          "Calculate pressure altitude and density altitude for RNO's 4,415 ft field elevation. Apply the numbers to takeoff, climb, and landing performance in warm weather.",
      },
      {
        label: "Mountain weather patterns",
        description:
          "Read the diurnal cycle, wind, turbulence, mountain waves, and afternoon thunderstorm potential along Sierra ridge lines.",
      },
      {
        label: "Terrain avoidance and ridge crossing",
        description:
          "Practice ridge-crossing angles, canyon judgment, and the golden rule of always having an out — even when the pass looks clear.",
      },
      {
        label: "Emergency options and escape routes",
        description:
          "Identify bailout airports, valleys, and turn-around points before takeoff. Brief them so the decision is already made if weather or performance shift.",
      },
      {
        label: "High-elevation airport operations",
        description:
          "Plan approaches and departures at airports like KTRK and KMMH where density altitude, runway slope, and terrain matter.",
      },
      {
        label: "Preflight decision-making",
        description:
          "Build personal minimums, weather windows, and a no-pressure go/no-go framework you can use on every flight.",
      },
    ],
  },
  densityAltitude: {
    title: "Density altitude at RNO",
    intro:
      "Reno–Tahoe International (RNO, KRNO) sits at roughly 4,415 ft above sea level. On a warm summer afternoon, the density altitude can climb well above 7,000 ft. That changes everything: takeoff roll, climb rate, and landing distance all behave differently than at sea level.",
    points: [
      {
        label: "Elevation",
        description:
          "RNO's field elevation of ~4,415 ft is your starting pressure altitude when the altimeter is 29.92 inHg.",
      },
      {
        label: "Temperature",
        description:
          "Warm air is less dense. A 30 °C day at RNO can push density altitude thousands of feet above the field elevation.",
      },
      {
        label: "Pressure",
        description:
          "Low-pressure systems raise pressure altitude. Combine that with heat and your aircraft performs as if it is at a much higher elevation.",
      },
      {
        label: "Humidity",
        description:
          "Water vapor displaces air molecules slightly. The effect is smaller than heat or pressure, but it matters on the margins.",
      },
    ],
    toolLink: {
      label: "Try the KRNO density-altitude calculator",
      href: toolsDensityAltitudeHref,
    },
    blogLink: {
      label: "Read: Density altitude at KRNO: what student pilots need to know",
      href: blogDensityAltitudeHref,
    },
  },
  terrainWeather: {
    title: "Terrain and weather considerations",
    intro:
      "The Sierra Nevada is a beautiful and demanding training area. The course focuses on the conditions you will actually see when flying west from RNO.",
    items: [
      {
        label: "Sierra ridge orientation and passes",
        description:
          "The range runs north-south. Common VFR crossings include the Carson Valley, Tahoe basin, and passes near Mammoth. Each has its own terrain, airspace, and weather traps.",
      },
      {
        label: "Leeside turbulence and rotor",
        description:
          "Strong west or southwest winds create mountain waves and rotor on the lee side of the Sierra. The course teaches you to read the sky and stay on the ground when the pattern is active.",
      },
      {
        label: "Afternoon thunderstorms",
        description:
          "Sierra convection builds most afternoons in summer. We plan mountain flights for morning windows and use them as go/no-go practice.",
      },
      {
        label: "Snow, icing, and seasonal closures",
        description:
          "Higher airports like Truckee (KTRK) and Mammoth Lakes (KMMH) close or restrict operations in winter weather. Seasonal planning is part of the syllabus.",
      },
      {
        label: "Class C airspace around RNO",
        description:
          "You will learn the transition routes, communication expectations, and how to stay clear of restricted and MOA airspace west of Reno.",
      },
      {
        label: "Visual illusions",
        description:
          "Rising terrain, sloping runways, and flat-light days can fool your senses. The ground brief covers the cues and cross-checks that keep you oriented.",
      },
    ],
  },
  sampleRoutes: {
    title: "Sample routes from RNO",
    intro:
      "These are representative routes, not a fixed syllabus. Every flight is chosen for the weather, your experience, and instructor approval.",
    disclaimer:
      "Exact routes depend on weather, currency, and instructor approval.",
    routes: [
      {
        code: "RNO → KTVL",
        name: "Lake Tahoe",
        distance: "~40 nm",
        focus: "Short mountain crossing, high-elevation airport, terrain awareness.",
      },
      {
        code: "RNO → KTRK",
        name: "Truckee–Tahoe",
        distance: "~50 nm",
        focus: "Higher elevation, weather considerations, approach options.",
      },
      {
        code: "RNO → KMEV",
        name: "Minden–Tahoe",
        distance: "~30 nm",
        focus: "Carson Valley routing, ridge crossing, density-altitude landing.",
      },
      {
        code: "RNO → KMMH",
        name: "Mammoth Lakes",
        distance: "~90 nm",
        focus: "Advanced route — higher terrain, weather windows, performance planning.",
      },
    ],
  },
  prerequisitesDurationCost: {
    title: "Prerequisites, duration, and cost",
    intro:
      "Mountain flying is not an entry-level course. You should be comfortable with basic performance calculations, aircraft control, and cross-country planning before adding terrain complexity.",
    prerequisites: {
      title: "Prerequisites",
      items: [
        "Hold at least a Private Pilot certificate (strongly recommended).",
        "Hold a current medical certificate or BasicMed as appropriate for the flight.",
        "Completed a recent flight review or equivalent checkout at Hornbill.",
        "Comfortable with basic performance calculations and cross-country navigation.",
      ],
    },
    duration: {
      title: "Duration",
      description:
        "Typically 1–2 ground sessions plus 2–4 instructional flights, depending on your experience and the weather windows available.",
    },
    cost: {
      title: "Cost estimate",
      description:
        "These numbers are a realistic starting point, not a guarantee. Destination landing and tie-down fees vary and are not included.",
      rows: [
        { label: "PA28 member wet rate", value: memberRate },
        { label: "PA28 non-member wet rate", value: nonMemberRate },
        { label: "Aircraft rental (4 flights typical)", value: `4 × ${memberRate} member / 4 × ${nonMemberRate} non-member` },
        { label: "Flight instruction (6 hours dual typical)", value: "6 × $70/hr" },
        { label: "Ground instruction / briefings", value: "2–4 hours" },
        { label: "Monthly membership", value: membershipRate },
      ],
      memberTotal: "$1,800–$2,400",
      nonMemberTotal: "$2,000–$2,700",
      note: `Members pay ${memberRate} wet versus ${nonMemberRate} non-member. At just over 2 flight hours per month, the ${membershipRate} membership pays for itself.`,
      links: [
        { label: "See fleet and rates", href: fleetHref },
        { label: "Membership details", href: membershipHref },
      ],
    },
  },
  safety: {
    title: "Safety emphasis",
    intro:
      "Mountain flying is a judgment course as much as a stick-and-rudder course. The goal is not to thrill you; it is to build the decision-making that lets you fly the Sierra Nevada for years.",
    nonNegotiables: [
      "Personal minimums written before the briefing.",
      "Escape routes identified for every leg.",
      "Weather window with a hard turn-around time.",
      "Aircraft performance margins calculated for the actual conditions.",
      "A no-pressure go/no-go call — the CFI cancels the flight if conditions warrant it.",
    ],
    note: "Every mountain flight is briefed. Terrain and emergency options are identified before departure. We would rather reschedule than push into marginal conditions.",
    links: [
      { label: "Our safety philosophy", href: aboutHref },
      { label: "Weather briefing tools", href: studentResourcesHref },
    ],
  },
  whyHornbill: {
    title: "Why Hornbill for mountain flying",
    items: [
      {
        title: "Home airport at RNO",
        description:
          "You start every flight at 4,415 ft, at the foot of the Sierra Nevada. Density altitude is not theoretical here — it is the first item on the checklist.",
      },
      {
        title: "Uniform PA28 fleet",
        description:
          "Train and rent the same 180 HP PA28s, including N7824W configured with mountain performance in mind. Consistent handling means consistent decisions.",
      },
      {
        title: "CFIs with local route experience",
        description:
          "Our certificated flight instructors know the passes, valleys, and weather patterns around RNO because they fly them regularly.",
      },
      {
        title: "Real cross-country rentals",
        description:
          "After checkout, rent the same aircraft and keep flying the mountains. The course is the beginning of your real-world mountain experience.",
      },
    ],
    links: [
      { label: "Our location at RNO", href: locationHref },
      { label: "Cross-country rentals", href: crossCountryRentalsHref },
    ],
  },
  relatedPathways: {
    title: "Related programs and next steps",
    items: [
      {
        title: "Private Pilot",
        description: "Build the foundation you need before advanced mountain training.",
        href: privatePilotHref,
      },
      {
        title: "Instrument Rating",
        description: "Add instrument skills for mountain IFR and weather decision-making.",
        href: instrumentRatingHref,
      },
      {
        title: "Cross-Country Rentals",
        description: "Rent the same PA28s and fly real mountain routes after checkout.",
        href: crossCountryRentalsHref,
      },
      {
        title: "Discovery Flight",
        description: "New to Hornbill? Fly with a CFI and see what our training is like.",
        href: discoveryFlightHref,
      },
    ],
  },
  faq: [
    {
      id: "mountain-flying-requirements",
      question: "Do I need a Private Pilot certificate to take the mountain flying course?",
      answer:
        "We strongly recommend at least a Private Pilot certificate. Mountain flying adds complexity on top of basic aircraft control, navigation, and weather judgment. A solid Private Pilot foundation keeps the course safe and productive.",
    },
    {
      id: "mountain-flying-duration",
      question: "How long does the mountain flying course take?",
      answer:
        "Most students complete the course in 1–2 ground sessions plus 2–4 instructional flights. The exact timeline depends on your experience, weather windows, and how quickly you build comfort with high-terrain decision-making.",
    },
    {
      id: "mountain-flying-aircraft",
      question: "What aircraft is used for mountain flying training?",
      answer:
        "We train in Hornbill's uniform PA28 fleet, all with 180 HP Lycoming engines. N7824W is set up with performance-friendly configuration for mountain work. You can rent the same aircraft after checkout.",
    },
    {
      id: "density-altitude-definition",
      question: "What is density altitude and why does it matter at RNO?",
      answer:
        "Density altitude is the altitude the aircraft 'feels' based on temperature, pressure, and humidity. RNO's field elevation is roughly 4,415 ft, but on a hot day the density altitude can exceed 7,000 ft. That reduces climb performance, increases takeoff distance, and changes landing behavior.",
    },
    {
      id: "mountain-flying-weather-cancellations",
      question: "What weather conditions cancel a mountain flying lesson?",
      answer:
        "We cancel or reschedule for strong winds aloft, active mountain waves or rotor, afternoon thunderstorms, low visibility, icing conditions, or any condition that leaves inadequate escape routes. The course teaches you to make that same call yourself.",
    },
    {
      id: "mountain-flying-routes",
      question: "Which routes will I fly during the course?",
      answer:
        "Typical routes include RNO to Lake Tahoe (KTVL), Truckee–Tahoe (KTRK), Minden–Tahoe (KMEV), and, for advanced students, Mammoth Lakes (KMMH). Your CFI chooses the route based on weather, your currency, and the learning objective for that day.",
    },
    {
      id: "mountain-flying-rentals",
      question: "Can I rent a Hornbill aircraft for mountain cross-country flights after the course?",
      answer:
        "Yes. After a mountain checkout, you can rent the same PA28s for real cross-country trips. That is one of the reasons students train at Hornbill: the aircraft you learn in are the aircraft you rent.",
    },
    {
      id: "mountain-flying-cost",
      question: "How much does mountain flying training cost?",
      answer:
        `Most students spend roughly $1,800–$2,400 as a member or $2,000–$2,700 as a non-member, including aircraft rental at ${memberRate} member / ${nonMemberRate} non-member, flight instruction, and ground briefings. Destination landing and tie-down fees are extra.`,
    },
    {
      id: "mountain-flying-certificate",
      question: "Is this an FAA certificate or a checkout?",
      answer:
        "This is not an FAA certificate. You receive a Mountain Flying Course Completion from Hornbill Aviation, plus the judgment and experience to operate safely in the Sierra Nevada. Many students also use the course as the basis for a formal mountain checkout for rentals.",
    },
    {
      id: "density-altitude-krno-learn-more",
      question: "Where can I learn more about density altitude at KRNO?",
      answer:
        "Use our density-altitude calculator for RNO, or read the blog post 'Density altitude at KRNO: what student pilots need to know.' Both are linked in the density-altitude section above.",
    },
  ] as FAQItem[],
  bottomCTA: {
    title: "Ready to fly the Sierra Nevada?",
    primaryCta: "Book a discovery flight",
    primaryHref: discoveryFlightHref,
    primaryAnalytics: "mountain_flying_booking_started",
    secondaryCta: "Talk to an instructor",
    secondaryHref: `${contactHref}?subject=Mountain%20Flying%20course`,
  },
};
