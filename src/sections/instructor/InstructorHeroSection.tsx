import Link from "next/link";
import { AssetImage as Image } from "@/components/AssetImage";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { SunsetPlaceholder } from "@/components/SunsetPlaceholder";
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
          <Reveal variant="horizon">
            {instructor.photo ? (
              <div className="aspect-[4/5] w-full max-w-sm overflow-hidden rounded-xl">
                <Image
                  src={instructor.photo}
                  alt={instructor.altText}
                  width={400}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <SunsetPlaceholder
                variant="dawn"
                label={`${instructor.name} — portrait photography coming`}
                className="aspect-[4/5] w-full max-w-sm rounded-xl"
              />
            )}
          </Reveal>

          <Reveal variant="glide" className="flex flex-col gap-5">
            <p className="panel-label-lg text-accent">{instructor.title}</p>
            <h2 className="font-heading text-3xl md:text-4xl text-heading text-balance">
              {instructor.tagline}
            </h2>
            <p className="text-lg text-muted leading-relaxed text-pretty">
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
                className="beak-flash inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-heading focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 rounded"
              >
                Back to all instructors
              </Link>
              {instructor.website && (
                <a
                  href={instructor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="beak-flash inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-heading focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 rounded"
                >
                  {displayDomain(instructor.website)}
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}