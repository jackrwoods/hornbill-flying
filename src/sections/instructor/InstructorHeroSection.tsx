import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { InstructorPortrait } from "@/components/InstructorPortrait";
import { BookingCTALink } from "@/components/BookingCTALink";
import type { Instructor } from "@/types";

interface InstructorHeroSectionProps {
  instructor: Instructor;
}

function displayDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "");
  }
}

export function InstructorHeroSection({ instructor }: InstructorHeroSectionProps) {
  const firstName = instructor.name.split(" ")[0];

  return (
    <Section background="card" id="about">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <InstructorPortrait
            src={instructor.photo || "/logo.svg"}
            alt={instructor.altText}
            priority
          />

          <div className="flex flex-col gap-5">
            <p className="font-mono text-sm uppercase tracking-wide text-accent">
              {instructor.title}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-heading">
              {instructor.tagline}
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              {instructor.bio.split("\n\n")[0]}
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
              <BookingCTALink
                instructorSlug={instructor.bookingSlug}
                instructorFirstName={firstName}
                variant="secondary"
              />
              <Link
                href="/instructors/"
                className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-heading transition-colors hover:bg-dark/5 focus:outline-none focus:ring-2 focus:ring-dark focus:ring-offset-2"
              >
                Back to all instructors
              </Link>
              {instructor.website && (
                <a
                  href={instructor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-heading transition-colors hover:bg-dark/5 focus:outline-none focus:ring-2 focus:ring-dark focus:ring-offset-2"
                >
                  {displayDomain(instructor.website)}
                </a>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}