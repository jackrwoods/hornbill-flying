import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { PhoneLink } from "@/components/PhoneLink";
import { BookingCTALink } from "@/components/BookingCTALink";
import type { Instructor } from "@/types";

interface InstructorAvailabilitySectionProps {
  instructor: Instructor;
}

export function InstructorAvailabilitySection({
  instructor,
}: InstructorAvailabilitySectionProps) {
  const firstName = instructor.name.split(" ")[0];

  return (
    <Section background="card" id="schedule">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Schedule</p>
          <h2 className="font-heading text-3xl md:text-4xl text-heading">
            Schedule a lesson with {firstName}
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <Reveal variant="glide">
            <h3 className="font-body text-lg font-semibold text-heading">
              Typical availability
            </h3>
            <p className="mt-2 text-muted text-pretty">
              {instructor.typicalAvailability}
            </p>
            <p className="mt-4 text-muted text-pretty">
              Exact slots change with aircraft maintenance, weather, and other
              bookings. See up-to-date availability and book with the instructor
              you want.
            </p>
          </Reveal>

          <Reveal
            variant="glide"
            className="card-cinematic p-6 flex flex-col gap-4"
          >
            <BookingCTALink
              instructorSlug={instructor.bookingSlug}
              instructorFirstName={firstName}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Book with {firstName}
            </BookingCTALink>
            <div className="text-muted">
              Prefer to call?{" "}
              <PhoneLink className="text-heading" />
            </div>
          </Reveal>
        </div>

        <Reveal variant="glide" className="mt-8">
          <p className="text-sm text-muted text-pretty">
            Want to know which aircraft {firstName} usually flies? See the{" "}
            <Link
              href="/fleet/"
              className="beak-flash font-semibold text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 rounded"
            >
              Fleet &amp; Pricing page
            </Link>{" "}
            for the current PA28 lineup.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}