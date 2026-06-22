import type { Instructor } from "@/types";

// TODO: data ticket — replace placeholder names, bios, and photos with real CFIs
// once hired and photographed. Certificate numbers intentionally omitted per owner.

export const instructors: Instructor[] = [
  {
    slug: "trygve-inda",
    name: "Trygve Inda",
    title: "Certified Flight Instructor — Instrument",
    tagline: "Private through CFI/CFII, instrument, and mountain flying at RNO",
    specialties: [
      "Private through Commercial pilot training",
      "Instrument Rating (CFII)",
      "CFI/CFII mentoring",
      "Mountain flying and cross-country trips",
    ],
    photo: "/images/instructors/placeholder-avatar.svg",
    altText:
      "Headshot of Trygve Inda, Certified Flight Instructor Instrument at Hornbill Flight Center",
    certificateNumber: null,
    publishCertificate: false,
    bio:
      "Trygve is a commercial pilot and CFI/CFII based at Reno–Tahoe International (KRNO). " +
      "He grew up in an airline family at Lake Tahoe and later lived in Europe and the Middle East. " +
      "His aviation passion began in 2012 during a Cessna 182 trip around southern Africa. " +
      "Since then, he has flown his Piper Dakota as far as Guatemala and Maine, and has flown general aviation " +
      "aircraft in 42 US states and ten foreign countries.\n\n" +
      "An aircraft owner since 2015, Trygve is semi-retired and not headed to the airlines — he is passionate about " +
      "introducing people to aviation and helping them grow into skilled aviators. He holds Commercial Pilot, CFI, CFII, " +
      "and Advanced/Instrument Ground Instructor certificates, with High-Performance, Complex, and Tailwheel endorsements.\n\n" +
      "He teaches Private, Instrument, Commercial, and CFI/CFII training, plus flight reviews, instrument proficiency " +
      "checks, insurance checkouts, and mountain flying. He is an Assistant Chief Pilot at NV Flight, a FAASTeam " +
      "Representative, and the IMC Club Program Coordinator for EAA Chapter 1361.",
    credentials: {
      certificates: [
        "CFI",
        "CFII",
        "Commercial ASEL",
        "Instrument Rating",
        "AGI/IGI Ground Instructor",
      ],
      totalHours: "2,000+",
    },
    typicalAvailability:
      "Based at KRNO; also available at Stead (KRTS) and other locations using the student's aircraft. Cross-country training trips to states bordering Nevada and repositioning flights nationwide with advance notice.",
    teachesPrograms: [
      "private-pilot",
      "instrument-rating",
      "commercial-pilot",
      "mountain-flying",
      "certified-flight-instructor",
      "cfii",
    ],
    bookingSlug: "trygve-inda",
    bookingLink: "/instructors/trygve-inda/",
    metaTitle: "Trygve Inda — Flight Instructor in Reno, NV",
    metaDescription:
      "Train with Trygve Inda, a CFI/CFII at Reno-Tahoe (RNO). Specialties: private, instrument, commercial, CFI/CFII, and mountain flying. Book a discovery flight with Trygve.",
    faq: [
      {
        id: "trygve-discovery",
        question: "Can I request Trygve for my discovery flight?",
        answer:
          "Yes. Select Trygve Inda when booking a discovery flight. He is a good fit for first-time flyers as well as pilots adding instrument, commercial, or CFI/CFII ratings.",
      },
      {
        id: "trygve-ratings",
        question: "What ratings does Trygve teach?",
        answer:
          "Trygve teaches Private Pilot, Instrument Rating, Commercial Pilot, CFI, and CFII add-on training, plus flight reviews, instrument proficiency checks, and mountain flying.",
      },
      {
        id: "trygve-trips",
        question: "Does Trygve offer cross-country or delivery training?",
        answer:
          "Yes. Trygve is available for cross-country training trips to states bordering Nevada and for repositioning or delivery flights nationwide with reasonable advance notice.",
      },
    ],
    published: true,
  },
  {
    slug: "alex-rivera",
    name: "Alex Rivera",
    title: "Certified Flight Instructor",
    tagline: "Cross-country and mountain flying around Reno–Tahoe",
    specialties: [
      "Primary flight training",
      "Cross-country planning",
      "Mountain flying",
      "First-time students",
    ],
    photo: "/images/instructors/placeholder-avatar.svg",
    altText:
      "Headshot of Alex Rivera, Certified Flight Instructor at Hornbill Flight Center",
    certificateNumber: null,
    publishCertificate: false,
    bio:
      "Alex grew up watching Sierra storms roll across the ridges east of Reno, then learned to read them from the left seat. " +
      "Today he teaches primary students and private-pilot candidates in the same PA28 fleet they will eventually rent for real trips. " +
      "He likes the first lesson best: when a student realizes the airplane responds to calm input, not force.\n\n" +
      "His lessons lean on local knowledge. He uses the RNO Class C transition, the Truckee corridor, and the Sierra foothills as " +
      "teaching terrain, so students learn radio work, terrain awareness, and density-altitude thinking in context. " +
      "When the weather is right, he routes cross-countries through Tahoe, Minden, or the high desert so the training logbook " +
      "fills with places, not just patterns.\n\n" +
      "Alex is especially good with part-time students. He keeps ground briefings short and preparation clear, " +
      "so a busy schedule does not stall progress.",
    credentials: {
      certificates: ["CFI", "Commercial ASEL", "Instrument Rating"],
      totalHours: "1,200+",
      hoursInstructing: "800+",
    },
    typicalAvailability:
      "Weekdays 7 a.m.–2 p.m.; Saturday mornings and cross-country days by appointment",
    teachesPrograms: [
      "private-pilot",
      "mountain-flying",
      "instrument-rating",
    ],
    bookingSlug: "alex-rivera",
    bookingLink: "/instructors/alex-rivera/",
    metaTitle: "Alex Rivera — Flight Instructor in Reno, NV",
    metaDescription:
      "Train with Alex Rivera, a Part 61 CFI at Reno-Tahoe (RNO). Specialties: private pilot, mountain flying, cross-country. Book a discovery flight with Alex.",
    faq: [
      {
        id: "alex-discovery",
        question: "Can I request Alex for my discovery flight?",
        answer:
          "Yes. Book a discovery flight and select Alex Rivera as your preferred instructor. If his schedule is full that day, we will suggest the next available CFI.",
      },
      {
        id: "alex-ratings",
        question: "What ratings does Alex teach?",
        answer:
          "Alex teaches Private Pilot, Instrument Rating, and the Mountain Flying course. He also mentors students on cross-country and high-density-altitude flying.",
      },
      {
        id: "alex-mountain",
        question: "Does Alex teach mountain flying at RNO?",
        answer:
          "Yes. He teaches the Mountain Flying course and integrates Sierra and high-desert terrain into primary and instrument training when the weather and student readiness allow.",
      },
    ],
    published: true,
  },
  {
    slug: "jordan-chen",
    name: "Jordan Chen",
    title: "Certified Flight Instructor — Instrument",
    tagline: "Instrument training and CFI prep",
    specialties: [
      "Instrument Rating prep",
      "CFI training",
      "CFII add-ons",
      "IFR procedures",
    ],
    photo: "/images/instructors/placeholder-avatar.svg",
    altText:
      "Headshot of Jordan Chen, Certified Flight Instructor Instrument at Hornbill Flight Center",
    certificateNumber: null,
    publishCertificate: false,
    bio:
      "Jordan came to instrument flying the way most pilots should: after a few too many cancelled plans due to a thin overcast. " +
      "That frustration turned into a specialty. Now Jordan trains instrument students and CFI/CFII candidates who want procedures " +
      "to feel automatic, not memorized.\n\n" +
      "He breaks IFR down into manageable pieces: clearances, approaches, holds, and weather decisions. " +
      "Students practice in the PA28's Garmin G5 and WAAS GPS environment, then transfer those skills to actual IMC and " +
      "RNO's busy airspace when conditions are safe. His goal is not just a checkride pass, but the judgment to say no when a flight " +
      "does not make sense.\n\n" +
      "Jordan also works with future instructors on the fundamentals of teaching: briefings, evaluations, and correcting errors " +
      "without overwhelming a student.",
    credentials: {
      certificates: ["CFI", "CFII", "Commercial ASEL", "Instrument Rating"],
      totalHours: "1,500+",
      hoursInstructing: "1,000+",
    },
    typicalAvailability:
      "Weekdays 2 p.m.–8 p.m.; Sunday afternoons by appointment",
    teachesPrograms: [
      "instrument-rating",
      "certified-flight-instructor",
      "cfii",
      "private-pilot",
    ],
    bookingSlug: "jordan-chen",
    bookingLink: "/instructors/jordan-chen/",
    metaTitle: "Jordan Chen — Flight Instructor in Reno, NV",
    metaDescription:
      "Train with Jordan Chen, a Part 61 CFI at Reno-Tahoe (RNO). Specialties: instrument rating, CFI, CFII. Book a discovery flight with Jordan.",
    faq: [
      {
        id: "jordan-discovery",
        question: "Can I request Jordan for my discovery flight?",
        answer:
          "Yes. Choose Jordan Chen when you book a discovery flight. Discovery flights are VFR, so you will get a feel for the airplane and the local area before starting instrument training.",
      },
      {
        id: "jordan-ratings",
        question: "What ratings does Jordan teach?",
        answer:
          "Jordan teaches Private Pilot, Instrument Rating, Certified Flight Instructor, and CFII add-on training.",
      },
      {
        id: "jordan-ifr",
        question: "Does Jordan teach actual IFR flying at RNO?",
        answer:
          "Yes. Once you are ready, Jordan builds real-world IFR experience in and out of RNO's Class C airspace, always within personal and aircraft limitations.",
      },
    ],
    published: true,
  },
  {
    slug: "morgan-patel",
    name: "Morgan Patel",
    title: "Certified Flight Instructor",
    tagline: "Sport Pilot through Private Pilot, first lessons made calm",
    specialties: [
      "Sport Pilot",
      "Private Pilot",
      "First-time flyers",
      "Anxious students",
    ],
    photo: "/images/instructors/placeholder-avatar.svg",
    altText:
      "Headshot of Morgan Patel, Certified Flight Instructor at Hornbill Flight Center",
    certificateNumber: null,
    publishCertificate: false,
    bio:
      "Morgan's first flights were not in a big cockpit; they were in a light-sport aircraft over the high desert. " +
      "That small-airplane background shows up in every lesson. New students leave the first flight understanding what the controls " +
      "actually do, not just what they are called.\n\n" +
      "Morgan teaches Sport Pilot and Private Pilot in the Hornbill PA28 fleet. Lessons move at the student's pace, " +
      "with an eye toward solo, cross-country, and the checkride. Morgan is especially good with students who arrive nervous: " +
      "the briefing is clear, the first maneuvers are gentle, and questions are encouraged.\n\n" +
      "When a student is ready to stretch, Morgan routes them toward the Sierra foothills and nearby airports so the training " +
      "feels like real flying, not just pattern work.",
    credentials: {
      certificates: ["CFI", "Commercial ASEL", "Instrument Rating"],
      totalHours: "900+",
      hoursInstructing: "600+",
    },
    typicalAvailability:
      "Weekdays 8 a.m.–4 p.m.; some Saturday and Sunday slots",
    teachesPrograms: ["sport-pilot", "private-pilot", "mountain-flying"],
    bookingSlug: "morgan-patel",
    bookingLink: "/instructors/morgan-patel/",
    metaTitle: "Morgan Patel — Flight Instructor in Reno, NV",
    metaDescription:
      "Train with Morgan Patel, a Part 61 CFI at Reno-Tahoe (RNO). Specialties: sport pilot, private pilot, first-time flyers. Book a discovery flight with Morgan.",
    faq: [
      {
        id: "morgan-discovery",
        question: "Can I request Morgan for my discovery flight?",
        answer:
          "Yes. Select Morgan Patel when booking your discovery flight. Morgan is a good match for first-time flyers and anyone who wants a calm introduction to the controls.",
      },
      {
        id: "morgan-ratings",
        question: "What ratings does Morgan teach?",
        answer:
          "Morgan teaches Sport Pilot, Private Pilot, and the Mountain Flying course. Morgan also works with students who need extra patience building confidence early in training.",
      },
      {
        id: "morgan-anxious",
        question: "Is Morgan a good fit if I am nervous about flying?",
        answer:
          "Yes. Morgan is used to working with anxious students and keeps early lessons low-stress, clear, and paced to your comfort level.",
      },
    ],
    published: true,
  },
  {
    slug: "taylor-brooks",
    name: "Taylor Brooks",
    title: "Certified Flight Instructor",
    tagline: "Commercial maneuvers, CFI/CFII add-ons, checkride prep",
    specialties: [
      "Commercial Pilot training",
      "CFI/CFII add-ons",
      "Advanced maneuvers",
      "Checkride preparation",
    ],
    photo: "/images/instructors/placeholder-avatar.svg",
    altText:
      "Headshot of Taylor Brooks, Certified Flight Instructor at Hornbill Flight Center",
    certificateNumber: null,
    publishCertificate: false,
    bio:
      "Taylor learned that advanced training is really about the basics done precisely. Chandelles, lazy eights, and steep spirals " +
      "look impressive, but they are built on smooth control coordination and energy management. That is what Taylor drills with " +
      "commercial students and CFI/CFII candidates.\n\n" +
      "Taylor teaches Commercial Pilot, CFI, and CFII add-ons in Hornbill's consistent PA28 fleet. Because every aircraft handles " +
      "similarly, students spend less time relearning the panel and more time mastering the maneuvers and teaching techniques the " +
      "checkride demands.\n\n" +
      "Checkride prep with Taylor is practical: mock oral exams, scenario-based instruction, and flights that simulate the " +
      "pressure of the big day without creating unnecessary stress.",
    credentials: {
      certificates: ["CFI", "CFII", "Commercial ASEL", "Instrument Rating"],
      totalHours: "2,000+",
      hoursInstructing: "1,400+",
    },
    typicalAvailability:
      "Weekends and select weekday evenings by appointment",
    teachesPrograms: [
      "commercial-pilot",
      "certified-flight-instructor",
      "cfii",
      "instrument-rating",
    ],
    bookingSlug: "taylor-brooks",
    bookingLink: "/instructors/taylor-brooks/",
    metaTitle: "Taylor Brooks — Flight Instructor in Reno, NV",
    metaDescription:
      "Train with Taylor Brooks, a Part 61 CFI at Reno-Tahoe (RNO). Specialties: commercial pilot, CFI, CFII. Book a discovery flight with Taylor.",
    faq: [
      {
        id: "taylor-discovery",
        question: "Can I request Taylor for my discovery flight?",
        answer:
          "Yes. You can select Taylor Brooks when booking a discovery flight. It is a great way to meet Taylor before starting commercial, CFI, or CFII training.",
      },
      {
        id: "taylor-ratings",
        question: "What ratings does Taylor teach?",
        answer:
          "Taylor teaches Commercial Pilot, Certified Flight Instructor, CFII add-on, and Instrument Rating. Taylor also specializes in advanced maneuvers and checkride preparation.",
      },
      {
        id: "taylor-checkride",
        question: "Does Taylor do checkride prep?",
        answer:
          "Yes. Taylor runs mock orals and practical prep sessions for commercial, CFI, and CFII checkrides, focusing on the judgment and teaching skills examiners ask about.",
      },
    ],
    published: true,
  },
];

/**
 * Returns only instructors that should have public detail pages.
 */
export function getPublishedInstructors(): Instructor[] {
  return instructors.filter((i) => i.published);
}

/**
 * Finds an instructor by slug, or returns undefined if not found.
 */
export function getInstructorBySlug(slug: string): Instructor | undefined {
  return instructors.find((i) => i.slug === slug);
}
