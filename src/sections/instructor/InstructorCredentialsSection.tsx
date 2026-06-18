import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import type { Instructor } from "@/types";

interface InstructorCredentialsSectionProps {
  instructor: Instructor;
}

export function InstructorCredentialsSection({
  instructor,
}: InstructorCredentialsSectionProps) {
  const { credentials, publishCertificate, certificateNumber } = instructor;

  return (
    <Section background="sky" id="credentials">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          Credentials & experience
        </h2>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {credentials.certificates.map((certificate) => (
            <li
              key={certificate}
              className="rounded-lg bg-white p-4 shadow-sm"
            >
              <p className="font-mono text-xs uppercase tracking-wide text-gold-500">
                Certificate / Rating
              </p>
              <p className="mt-1 font-semibold text-navy-900">{certificate}</p>
            </li>
          ))}

          {credentials.totalHours && (
            <li className="rounded-lg bg-white p-4 shadow-sm">
              <p className="font-mono text-xs uppercase tracking-wide text-gold-500">
                Total flight hours
              </p>
              <p className="mt-1 font-semibold text-navy-900">
                {credentials.totalHours}
              </p>
            </li>
          )}

          {credentials.hoursInstructing && (
            <li className="rounded-lg bg-white p-4 shadow-sm">
              <p className="font-mono text-xs uppercase tracking-wide text-gold-500">
                Hours instructing
              </p>
              <p className="mt-1 font-semibold text-navy-900">
                {credentials.hoursInstructing}
              </p>
            </li>
          )}
        </ul>

        {publishCertificate && certificateNumber && (
          <p className="mt-6 text-sm text-ink-light">
            FAA certificate number: {certificateNumber}
          </p>
        )}

        <p className="mt-6 max-w-3xl text-ink-light">
          All instruction follows FAA Part 61 standards and Hornbill Flight
          Center safety practices. Aircraft are inspected before each flight and
          maintained on a recurring schedule.
        </p>
      </Container>
    </Section>
  );
}
