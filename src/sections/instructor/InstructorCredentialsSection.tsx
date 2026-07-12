import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
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
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Credentials</p>
          <h2 className="font-heading text-3xl md:text-4xl text-heading">
            Credentials &amp; experience
          </h2>
        </Reveal>

        <Reveal variant="glide" className="mt-8">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {credentials.certificates.map((certificate) => (
              <li
                key={certificate}
                className="card-cinematic p-4"
              >
                <p className="panel-label text-accent">Certificate / Rating</p>
                <p className="mt-1 font-semibold text-heading">{certificate}</p>
              </li>
            ))}

            {credentials.totalHours && (
              <li className="card-cinematic p-4">
                <p className="panel-label text-accent">Total flight hours</p>
                <p className="mt-1 font-semibold text-heading nums">
                  {credentials.totalHours}
                </p>
              </li>
            )}

            {credentials.hoursInstructing && (
              <li className="card-cinematic p-4">
                <p className="panel-label text-accent">Hours instructing</p>
                <p className="mt-1 font-semibold text-heading nums">
                  {credentials.hoursInstructing}
                </p>
              </li>
            )}
          </ul>
        </Reveal>

        {publishCertificate && certificateNumber && (
          <Reveal variant="glide" className="mt-6">
            <p className="text-sm text-muted nums">
              FAA certificate number: {certificateNumber}
            </p>
          </Reveal>
        )}

        <Reveal variant="glide" className="mt-6 max-w-3xl">
          <p className="text-muted text-pretty">
            All instruction follows FAA Part 61 standards and Hornbill Aviation
            flight center safety practices. Aircraft are inspected before each
            flight and maintained on a recurring schedule.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}