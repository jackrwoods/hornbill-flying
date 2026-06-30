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
    <Section background="callout" id="credentials">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-heading">
          Credentials & experience
        </h2>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {credentials.certificates.map((certificate) => (
            <li
              key={certificate}
              className="rounded-lg bg-white p-4 shadow-sm"
            >
              <p className="font-mono text-xs uppercase tracking-wide text-accent">
                Certificate / Rating
              </p>
              <p className="mt-1 font-semibold text-heading">{certificate}</p>
            </li>
          ))}

          {credentials.totalHours && (
            <li className="rounded-lg bg-white p-4 shadow-sm">
              <p className="font-mono text-xs uppercase tracking-wide text-accent">
                Total flight hours
              </p>
              <p className="mt-1 font-semibold text-heading">
                {credentials.totalHours}
              </p>
            </li>
          )}

          {credentials.hoursInstructing && (
            <li className="rounded-lg bg-white p-4 shadow-sm">
              <p className="font-mono text-xs uppercase tracking-wide text-accent">
                Hours instructing
              </p>
              <p className="mt-1 font-semibold text-heading">
                {credentials.hoursInstructing}
              </p>
            </li>
          )}
        </ul>

        {publishCertificate && certificateNumber && (
          <p className="mt-6 text-sm text-muted">
            FAA certificate number: {certificateNumber}
          </p>
        )}

        <p className="mt-6 max-w-3xl text-muted">
          All instruction follows FAA Part 61 standards and Hornbill Aviation
          flight center safety practices. Aircraft are inspected before each
          flight and maintained on a recurring schedule.
        </p>
      </Container>
    </Section>
  );
}
