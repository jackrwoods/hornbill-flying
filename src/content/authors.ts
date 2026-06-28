export type Author = {
  slug: string;
  name: string;
  credentials: string;
  bio: string;
  photo: string;
  linkedIn?: string;
  isPlaceholder?: boolean;
};

// TODO: replace placeholder authors with real Hornbill Aviation CFIs once hired and photographed.
// Certificate numbers are intentionally omitted at launch per the owner.
export const authors: Author[] = [
  {
    slug: "alex-morgan",
    name: "Alex Morgan",
    credentials: "Certified Flight Instructor (CFI), Commercial Pilot",
    bio:
      "Alex teaches Private Pilot and Instrument Rating students at Hornbill Aviation. " +
      "They specialize in mountain-flying instruction and helping part-time students stay on schedule.",
    photo: "/images/blog/authors/alex-morgan.webp",
    linkedIn: "https://www.linkedin.com/in/alex-morgan-placeholder",
    isPlaceholder: true,
  },
  {
    slug: "jordan-lee",
    name: "Jordan Lee",
    credentials: "CFI, CFII, Commercial Pilot",
    bio:
      "Jordan is a Hornbill Aviation instructor with a focus on discovery flights, student medical certification guidance, " +
      "and transition training into the Reno mountain environment.",
    photo: "/images/blog/authors/jordan-lee.webp",
    linkedIn: "https://www.linkedin.com/in/jordan-lee-placeholder",
    isPlaceholder: true,
  },
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}
