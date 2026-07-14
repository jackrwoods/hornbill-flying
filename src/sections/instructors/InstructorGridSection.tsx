import Link from "next/link";
import { AssetImage as Image } from "@/components/AssetImage";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { SunsetPlaceholder } from "@/components/SunsetPlaceholder";
import { instructors } from "@/content/instructors";
import { siteConfig } from "@/lib/config";

export function InstructorGridSection() {
  return (
    <Section background="default" id="team">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">The Team</p>
          <h2 className="font-heading text-3xl md:text-4xl text-heading text-balance">
            Meet the team
          </h2>
          <p className="mt-4 max-w-2xl text-muted text-pretty">
            Compare CFIs and choose the one whose specialties and availability
            match your goals.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {instructors.map((instructor) => {
            const firstName = instructor.name.split(" ")[0];
            const bioPreview =
              instructor.bio.split("\n\n")[0] ?? instructor.bio;
            return (
              <Reveal
                key={instructor.slug}
                variant="glide"
                className="card-cinematic relative flex flex-col p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl focus-within:-translate-y-1"
              >
                <div className="aspect-[4/5] w-full overflow-hidden rounded-lg">
                  {instructor.photo ? (
                    <Image
                      src={instructor.photo}
                      alt={instructor.altText}
                      width={400}
                      height={500}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <SunsetPlaceholder
                      variant="vertical"
                      label={`${instructor.name} — portrait photography coming`}
                      className="h-full w-full"
                    />
                  )}
                </div>

                <h3 className="mt-5 font-heading text-2xl text-heading">
                  {instructor.name}
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {instructor.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-heading"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                <p className="mt-4 line-clamp-3 text-muted leading-relaxed">
                  {bioPreview}
                </p>

                {instructor.teachesPrograms.includes(
                  "certified-flight-instructor"
                ) && (
                  <p className="mt-3 text-sm text-muted">
                    {firstName} also mentors{" "}
                    <Link
                      href="/programs/certified-flight-instructor/"
                      className="beak-flash relative z-20 font-semibold text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 rounded"
                    >
                      CFI candidates
                    </Link>
                    .
                  </p>
                )}

                {instructor.publishCertificate && instructor.certificateNumber && (
                  <p className="mt-3 text-xs text-muted nums">
                    Certificate: {instructor.certificateNumber}
                  </p>
                )}

                <div className="mt-auto flex flex-col gap-3 pt-5">
                  <a
                    href={siteConfig.flightCircleScheduleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-20 inline-flex items-center justify-center rounded-lg bg-dark px-5 py-3 text-center text-sm font-semibold text-on-dark transition-colors hover:bg-dark-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
                  >
                    Book with {firstName}
                  </a>
                </div>

                <Link
                  href={instructor.bookingLink}
                  className="absolute inset-0 z-10"
                  aria-label={`View ${instructor.name} profile`}
                />
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}