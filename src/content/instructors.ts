import type { Instructor } from "@/types";

export const instructors: Instructor[] = [
  {
    slug: "trygve",
    name: "Trygve",
    title: "Certified Flight Instructor — Instrument",
    tagline: "Private through CFI/CFII, instrument, and mountain flying at RNO",
    specialties: [
      "CFI/CFII Mentoring",
      "Flight Reviews",
      "CPL",
      "Mountain Flying",
      "IPCs",
    ],
    photo: "/images/instructors/person-leaning-airplane-hoodie.png",
    previewPhoto: "/images/instructors/trygve-portrait.webp",
    altText:
      "Headshot of Trygve, Certified Flight Instructor Instrument at Hornbill Aviation",
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
      "checks, insurance checkouts, and mountain flying. He is an Assistant Chief Pilot at Hornbill Aviation, a FAASTeam " +
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
    bookingSlug: "trygve",
    bookingLink: "/instructors/trygve/",
    website: "https://nevadacfi.com",
    metaTitle: "Trygve — Flight Instructor in Reno, NV",
    metaDescription:
      "Train with Trygve, a CFI/CFII at Reno-Tahoe (RNO). Specialties: private, instrument, commercial, CFI/CFII, and mountain flying. Book a discovery flight with Trygve.",
    faq: [
      {
        id: "trygve-discovery",
        question: "Can I request Trygve for my discovery flight?",
        answer:
          "Yes. Select Trygve when booking a discovery flight. He is a good fit for first-time flyers as well as pilots adding instrument, commercial, or CFI/CFII ratings.",
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
    slug: "ethan",
    name: "Ethan",
    title: "Certified Flight Instructor",
    tagline: "Private and Commercial students from discovery flight to checkride",
    specialties: [
      "Discovery Flights",
      "Private Pilot",
      "Instrument",
      "Commercial Pilot",
    ],
    photo: "/images/instructors/person-by-airplane-propeller.png",
    previewPhoto: "/images/instructors/ethan-portrait.webp",
    altText:
      "Headshot of Ethan, Certified Flight Instructor at Hornbill Aviation",
    certificateNumber: null,
    publishCertificate: false,
    bio:
      "Ethan is a current CFI at Hornbill Aviation taking on Private and Commercial students. Growing up, he always had a passion " +
      "for things that seemed 'unattainable.' Wondering what the view from above was like, he took his first discovery flight at the " +
      "age of 16 and instantly fell in love with it, quickly earning his Private Pilot certificate during his junior year of high school. " +
      "After graduating, Ethan chose to stay in Reno and attend UNR. Throughout the four years, he earned four pilot ratings and graduated " +
      "with a dual degree while working a full-time job.\n\n" +
      "When he is not flying, Ethan loves to work on trucks, hunt, be outdoors, and travel the world. He has toured and lived in various " +
      "parts of the world but always finds his way back to Reno as 'there is no place more beautiful than Nevada.' Start your aviation " +
      "journey with Ethan now!",
    credentials: {
      certificates: ["CFI", "Commercial ASEL"],
    },
    typicalAvailability:
      "Based at KRNO; available by appointment",
    teachesPrograms: ["private-pilot", "commercial-pilot"],
    bookingSlug: "ethan",
    bookingLink: "/instructors/ethan/",
    website: null,
    metaTitle: "Ethan — Flight Instructor in Reno, NV",
    metaDescription:
      "Train with Ethan, a CFI at Reno-Tahoe (RNO). Specialties: private pilot, commercial pilot, discovery flights. Book a discovery flight with Ethan.",
    faq: [
      {
        id: "ethan-discovery",
        question: "Can I request Ethan for my discovery flight?",
        answer:
          "Yes. Select Ethan when booking a discovery flight. His own aviation journey started with a discovery flight at age 16, and he enjoys introducing new students to flying.",
      },
      {
        id: "ethan-ratings",
        question: "What ratings does Ethan teach?",
        answer:
          "Ethan teaches Private Pilot and Commercial Pilot training at Hornbill Aviation.",
      },
      {
        id: "ethan-background",
        question: "What is Ethan's background?",
        answer:
          "Ethan earned his Private Pilot certificate in high school, then stayed in Reno for UNR where he earned four pilot ratings and a dual degree while working full-time before joining Hornbill Aviation as a CFI.",
      },
    ],
    published: true,
  },
  {
    slug: "joel",
    name: "Joel",
    title: "Certified Flight Instructor — Instrument",
    tagline: "Private through Commercial, instrument, and CFI/CFII training",
    specialties: [
      "Discovery Flights",
      "Private Pilot",
      "Instrument",
      "Commercial Pilot",
    ],
    photo: "/images/instructors/person-by-airplane-american-flag.png",
    previewPhoto: "/images/instructors/joel-portrait.webp",
    altText:
      "Headshot of Joel, Certified Flight Instructor Instrument at Hornbill Aviation",
    certificateNumber: null,
    publishCertificate: false,
    bio:
      "Joel is a Certified Flight Instructor dedicated to sharing the joy of flight. He blends deep aviation knowledge with " +
      "hands-on training to help each student reach their potential. Outside the cockpit, Joel enjoys snowboarding, mountain biking, " +
      "and time in nature — an adventurous spirit that complements his approach to aviation.\n\n" +
      "He holds Commercial Pilot, Airplane Multiengine Land, CFI, and CFII certificates and teaches Private, Instrument, Commercial, " +
      "and CFI/CFII training at Reno–Tahoe International (KRNO).",
    credentials: {
      certificates: ["CFI", "CFII", "Commercial ASEL", "AMEL"],
    },
    typicalAvailability:
      "Based at KRNO; available weekdays and weekends by appointment",
    teachesPrograms: [
      "private-pilot",
      "instrument-rating",
      "commercial-pilot",
    ],
    bookingSlug: "joel",
    bookingLink: "/instructors/joel/",
    website: null,
    metaTitle: "Joel — Flight Instructor in Reno, NV",
    metaDescription:
      "Train with Joel, a CFI/CFII at Reno-Tahoe (RNO). Specialties: private, instrument, commercial, CFI/CFII. Book a discovery flight with Joel.",
    faq: [
      {
        id: "joel-discovery",
        question: "Can I request Joel for my discovery flight?",
        answer:
          "Yes. Select Joel when booking a discovery flight. He is a good fit for first-time flyers as well as pilots adding instrument, commercial, or CFI/CFII ratings.",
      },
      {
        id: "joel-ratings",
        question: "What ratings does Joel teach?",
        answer:
          "Joel teaches Private Pilot, Instrument Rating, Commercial Pilot, CFI, and CFII add-on training.",
      },
      {
        id: "joel-multi",
        question: "Does Joel teach multiengine training?",
        answer:
          "Joel holds an AMEL certificate and can provide multiengine guidance where it complements a student's goals and aircraft availability.",
      },
    ],
    published: true,
  },
  {
    slug: "kurtis",
    name: "Kurtis",
    title: "Certified Flight Instructor",
    tagline: "Private, Instrument, and Commercial training at RNO",
    specialties: [
      "Discovery Flights",
      "Private Pilot",
      "Instrument",
      "Commercial Pilot",
    ],
    photo: "/images/instructors/person-by-airplane-tail.png",
    previewPhoto: "/images/instructors/jeremy-portrait.webp",
    altText:
      "Headshot of Kurtis, Certified Flight Instructor at Hornbill Aviation",
    certificateNumber: null,
    publishCertificate: false,
    bio:
      "Kurtis is a Certified Flight Instructor with Hornbill Aviation, working with Private, Instrument, and Commercial pilot " +
      "candidates at Reno–Tahoe International (KRNO). He enjoys guiding first-time flyers from discovery flight through checkride " +
      "and helping existing pilots add new ratings.\n\n" +
      "He holds Commercial Pilot, Airplane Single-Engine Land, and CFI certificates and is available by appointment at KRNO.",
    credentials: {
      certificates: ["CFI", "Commercial ASEL"],
    },
    typicalAvailability:
      "Based at KRNO; available by appointment",
    teachesPrograms: ["private-pilot", "instrument-rating", "commercial-pilot"],
    bookingSlug: "kurtis",
    bookingLink: "/instructors/kurtis/",
    website: null,
    metaTitle: "Kurtis — Flight Instructor in Reno, NV",
    metaDescription:
      "Train with Kurtis, a CFI at Reno-Tahoe (RNO). Specialties: discovery flights, private pilot, instrument, commercial pilot. Book a discovery flight with Kurtis.",
    faq: [
      {
        id: "kurtis-discovery",
        question: "Can I request Kurtis for my discovery flight?",
        answer:
          "Yes. Select Kurtis when booking a discovery flight. He is a good match for first-time flyers and anyone starting their aviation journey.",
      },
      {
        id: "kurtis-ratings",
        question: "What ratings does Kurtis teach?",
        answer:
          "Kurtis teaches Private Pilot, Instrument Rating, and Commercial Pilot training at Hornbill Aviation.",
      },
      {
        id: "kurtis-availability",
        question: "Where is Kurtis based?",
        answer:
          "Kurtis is based at Reno–Tahoe International (KRNO) and is available by appointment.",
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
