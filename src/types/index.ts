export interface NAP {
  name: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  telephone: string;
  telephoneFormatted: string;
  email: string;
  geo: {
    latitude: number;
    longitude: number;
  };
}

export interface SiteConfig {
  baseUrl: string;
  brandName: string;
  tagline: string;
  nap: NAP;
  priceRange: string;
  officeHours: OpeningHours[];
  contactHours: OpeningHours[];
  social: Record<string, string | undefined>;
  analytics: {
    gaMeasurementId?: string;
    clarityProjectId?: string;
  };
  pricing: {
    membershipMonthly: number;
    memberWetRate: number;
    nonMemberWetRate: number;
    discoveryFlight: number;
  };
  mapEmbedUrl: string;
  googleMapsDirectionsUrl: string;
  flightCircleScheduleUrl: string;
  contactFormEndpoint: string;
  recaptchaSiteKey?: string;
}

export interface OpeningHours {
  dayOfWeek: string | string[];
  opens: string;
  closes: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  published?: boolean;
}

export interface RouteMeta {
  slug: string;
  label: string;
  href: string;
  published: boolean;
  changefreq:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
  children?: RouteMeta[];
}

export interface Program {
  slug: string;
  title: string;
  shortDescription: string;
  url: string;
  icon?: string;
  targetCertificate: string;
  duration: string;
  costRange: string;
}

export interface InstructorCredentials {
  certificates: string[];
  totalHours?: string;
  hoursInstructing?: string;
}

export interface Instructor {
  slug: string;
  name: string;
  title: string;
  tagline: string;
  specialties: string[];
  photo?: string;
  previewPhoto?: string;
  altText: string;
  certificateNumber?: string | null;
  publishCertificate: boolean;
  bio: string;
  credentials: InstructorCredentials;
  typicalAvailability: string;
  teachesPrograms: string[];
  bookingSlug: string;
  bookingLink: string;
  website?: string | null;
  metaTitle: string;
  metaDescription: string;
  faq?: FAQItem[];
  published: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface DownloadableDocument {
  title: string;
  slug: string;
  description: string;
  filePath?: string; // /documents/...  (undefined = coming soon)
  externalUrl?: string;
  format: "PDF" | "XLS" | "XLSX";
  size?: string;
  lastUpdated?: string; // ISO date
  tailNumber?: string; // for aircraft-specific documents
}

export interface BlogAuthor {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
  linkedin?: string;
  instructorSlug?: string;
}

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  slug: string;
  category: string;
  tags: string[];
  heroImage: string;
  heroAlt: string;
  featured: boolean;
  updated?: string;
  wordCountTarget?: number;
  quickAnswer?: string;
  faq?: { question: string; answer: string }[];
}

export interface BlogPost extends BlogPostFrontmatter {
  content: string;
  readTime: number;
  authorName: string;
}

export interface BlogPostTeaser {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  href: string;
}

export interface Testimonial {
  name: string;
  role?: string;
  quote: string;
  image?: string;
}

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "accent" | "header-cta";
export type SectionBackground = "sand" | "white" | "navy" | "gold" | "teal";

export interface AircraftPhoto {
  src: string;
  alt: string;
}

export interface Aircraft {
  kind: "aircraft";
  tail: string;
  slug: string;
  engine: string;
  avionics: string[];
  notes: string;
  photo: string;
  photoAlt: string;
  gallery: AircraftPhoto[];
  ifrEquipped: boolean;
  crossCountryReady: boolean;
  metaTitle: string;
  metaDescription: string;
  documents?: DownloadableDocument[];
  published: boolean;
}

export interface Simulator {
  kind: "simulator";
  slug: string;
  name: string;
  tagline: string;
  description: string;
  photo: string;
  photoAlt: string;
  notes: string;
  metaTitle: string;
  metaDescription: string;
  documents?: DownloadableDocument[];
  published: boolean;
}

export type FleetMember = Aircraft | Simulator;

export function isAircraft(member: FleetMember): member is Aircraft {
  return member.kind === "aircraft";
}

export interface Rate {
  label: string;
  amount: number;
  unit?: string;
  description?: string;
}
