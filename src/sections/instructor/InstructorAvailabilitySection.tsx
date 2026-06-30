import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
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
        <h2 className="font-heading text-3xl md:text-4xl text-heading">
          Schedule a lesson with {firstName}
        </h2>

        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-body text-lg font-semibold text-heading">
              Typical availability
            </h3>
            <p className="mt-2 text-muted">{instructor.typicalAvailability}</p>
            <p className="mt-4 text-muted">
              Exact slots change with aircraft maintenance, weather, and other
              bookings. See up-to-date availability and book with the instructor
              you want.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-xl bg-callout p-6">
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
          </div>
        </div>

        <p className="mt-8 text-sm text-muted">
          Want to know which aircraft {firstName} usually flies? See the{" "}
          <Link
            href="/fleet/"
            className="font-semibold text-accent hover:text-on-dark-accent-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
          >
            Fleet & Pricing page
          </Link>{" "}
          for the current PA28 lineup.
        </p>
      </Container>
    </Section>
  );
}
