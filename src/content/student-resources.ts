export interface ExternalResource {
  title: string;
  url: string;
  description: string;
  category: "weather" | "medical" | "faa" | "planning";
  isFaa?: boolean;
}

export interface DownloadableDocument {
  title: string;
  slug: string;
  description: string;
  filePath?: string; // /downloads/...  (undefined = coming soon)
  externalUrl?: string;
  format: "PDF";
  size?: string;
  lastUpdated?: string; // ISO date
  tailNumber?: string; // for POH cards
}

export interface StudentFaqItem {
  id: string;
  question: string;
  answer: string;
}

export const externalResources: ExternalResource[] = [
  {
    title: "Aviation Weather Center",
    url: "https://aviationweather.gov/",
    description:
      "Official NOAA source for METARs, TAFs, AIRMETs, SIGMETs, and PIREPs.",
    category: "weather",
  },
  {
    title: "1800WXBrief",
    url: "https://www.1800wxbrief.com/",
    description:
      "Leidos Flight Service standard and abbreviated briefings, NOTAMs, and flight plan filing.",
    category: "weather",
  },
  {
    title: "ForeFlight",
    url: "https://foreflight.com/",
    description:
      "Electronic flight bag, charts, weather, and route planning for iPad and iPhone.",
    category: "planning",
  },
  {
    title: "SkyVector",
    url: "https://skyvector.com/",
    description:
      "Free online sectional charts, IFR charts, and airport information.",
    category: "planning",
  },
  {
    title: "FAA MedXPress",
    url: "https://medxpress.faa.gov/",
    description:
      "Complete your FAA medical application online before visiting an AME.",
    category: "medical",
    isFaa: true,
  },
  {
    title: "FAA AME Locator",
    url: "https://www.faa.gov/pilots/medical/ame_locator/",
    description:
      "Find an Aviation Medical Examiner near Reno or your home airport.",
    category: "medical",
    isFaa: true,
  },
  {
    title: "BasicMed",
    url: "https://www.faa.gov/pilots/medical/basic_med",
    description:
      "Alternative medical certification rules for certain pilots and operations.",
    category: "medical",
    isFaa: true,
  },
  {
    title: "FAA NOTAM Search",
    url: "https://notams.aim.faa.gov/",
    description:
      "Official NOTAM lookup for airports, airspace, and TFRs before flight.",
    category: "faa",
    isFaa: true,
  },
  {
    title: "AIRMETs / SIGMETs",
    url: "https://aviationweather.gov/gairmet",
    description:
      "Graphical AIRMET and SIGMET products for hazardous weather en route.",
    category: "weather",
  },
  {
    title: "METAR / TAF Guide",
    url: "https://www.aviationweather.gov/help?page=metar",
    description:
      "NOAA reference for reading and decoding METARs and TAFs.",
    category: "weather",
  },
  {
    title: "14 CFR Part 61",
    url: "https://www.ecfr.gov/current/title-14/chapter-I/subchapter-D/part-61",
    description:
      "Certification of pilots, flight instructors, and ground instructors.",
    category: "faa",
    isFaa: true,
  },
  {
    title: "14 CFR Part 91",
    url: "https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-91",
    description:
      "General operating and flight rules for U.S. civil aircraft.",
    category: "faa",
    isFaa: true,
  },
  {
    title: "AC 61-98B — Currency of Experience",
    url: "https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_61-98B.pdf",
    description:
      "FAA guidance on recency of experience and flight review requirements.",
    category: "faa",
    isFaa: true,
  },
  {
    title: "AC 90-48D — Pilot Certification",
    url: "https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_90-48D.pdf",
    description:
      "FAA advisory circular on pilot certification and training topics.",
    category: "faa",
    isFaa: true,
  },
  {
    title: "FAASTeam",
    url: "https://www.faasafety.gov/",
    description:
      "FAA safety seminars, online courses, and pilot proficiency events.",
    category: "faa",
    isFaa: true,
  },
  {
    title: "WINGS Program",
    url: "https://www.faasafety.gov/WINGS/pub/",
    description:
      "Pilot proficiency program that can satisfy flight review requirements.",
    category: "faa",
    isFaa: true,
  },
];

// TODO: data ticket — replace placeholder syllabi/POH PDFs with actual files or vendor links.
export const downloadableDocuments: DownloadableDocument[] = [
  {
    title: "Private Pilot syllabus",
    slug: "syllabus-private-pilot",
    description:
      "Private Pilot training syllabus aligned with Part 61 requirements and the Hornbill Aviation PA28 fleet.",
    format: "PDF",
    size: "Coming soon",
    lastUpdated: "2026-06-18",
  },
  {
    title: "Instrument Rating syllabus",
    slug: "syllabus-instrument",
    description:
      "Instrument Rating syllabus covering attitude instrument flying, approaches, and IFR cross-country.",
    format: "PDF",
    size: "Coming soon",
    lastUpdated: "2026-06-18",
  },
  {
    title: "Commercial Pilot syllabus",
    slug: "syllabus-commercial",
    description:
      "Commercial Pilot syllabus outline for advanced maneuvers and aeronautical experience.",
    format: "PDF",
    size: "Coming soon",
    lastUpdated: "2026-06-18",
  },
  {
    title: "CFI / CFII syllabus outlines",
    slug: "syllabus-cfi-cfii",
    description:
      "Flight instructor training outlines for CFI and CFII checkride preparation.",
    format: "PDF",
    size: "Coming soon",
    lastUpdated: "2026-06-18",
  },
  {
    title: "PA28 checklist / quick-reference",
    slug: "checklist-pa28",
    description:
      "Shared PA28 normal checklist and quick-reference card for training flights.",
    format: "PDF",
    size: "Coming soon",
    lastUpdated: "2026-06-18",
  },
  {
    title: "POH quick-reference — N6576J",
    slug: "poh-n6576j",
    description:
      "Quick-reference POH extracts for tail number N6576J. Verify with the physical POH before flight.",
    format: "PDF",
    size: "Coming soon",
    lastUpdated: "2026-06-18",
    tailNumber: "N6576J",
  },
  {
    title: "POH quick-reference — N7824W",
    slug: "poh-n7824w",
    description:
      "Quick-reference POH extracts for tail number N7824W. Verify with the physical POH before flight.",
    format: "PDF",
    size: "Coming soon",
    lastUpdated: "2026-06-18",
    tailNumber: "N7824W",
  },
  {
    title: "POH quick-reference — N7969W",
    slug: "poh-n7969w",
    description:
      "Quick-reference POH extracts for tail number N7969W. Verify with the physical POH before flight.",
    format: "PDF",
    size: "Coming soon",
    lastUpdated: "2026-06-18",
    tailNumber: "N7969W",
  },
  {
    title: "POH quick-reference — N0001J",
    slug: "poh-n0001j",
    description:
      "Quick-reference POH extracts for tail number N0001J. Verify with the physical POH before flight.",
    format: "PDF",
    size: "Coming soon",
    lastUpdated: "2026-06-18",
    tailNumber: "N0001J",
  },
];

export const studentFaqs: StudentFaqItem[] = [
  {
    id: "check-weather-rno",
    question: "How do I check the weather before a flight at RNO?",
    answer:
      "Start with the live KRNO METAR and TAF widget on this page, then open a full briefing on the FAA Aviation Weather Center or call 1-800-WX-BRIEF. Always obtain an official preflight briefing before every flight.",
  },
  {
    id: "pa28-checklist",
    question: "Where can I find the current PA28 checklist?",
    answer:
      "Download the shared PA28 checklist from the Training syllabi and aircraft documents section below. Carry the physical checklist in the aircraft and confirm it matches the current POH.",
  },
  {
    id: "medical-private-pilot",
    question: "What FAA medical certificate do I need for a Private Pilot?",
    answer:
      "A third-class medical certificate is required for a Private Pilot certificate. You can also operate under BasicMed for many Private Pilot privileges after completing the required medical course.",
  },
  {
    id: "basicmed-training",
    question: "Can I use BasicMed for flight training?",
    answer:
      "BasicMed works for many training flights, but it does not cover all privileges. A traditional third-class medical is usually simpler for students working toward a Private Pilot certificate or Instrument Rating.",
  },
  {
    id: "practice-areas",
    question: "Where are the local practice areas around Reno?",
    answer:
      "The common practice area lies northeast of RNO over the desert, outside the Class C shelf. See the practice area map tool for a visual reference, and always verify current sectional charts and NOTAMs before departing.",
  },
  {
    id: "cross-country-fuel",
    question: "How do I estimate cross-country fuel for the PA28?",
    answer:
      "Use the cross-country estimator tool to enter origin, destination, cruise speed, and fuel burn. It adds a 30-minute day VFR reserve. Cross-check the result with your POH and current winds before filing.",
  },
  {
    id: "broken-link",
    question: "Who do I contact if a syllabus link is broken?",
    answer:
      "Call or text Hornbill Aviation at 555-555-1234, or email office@hornbillaviation.com. We will send you the correct document and fix the link.",
  },
];
