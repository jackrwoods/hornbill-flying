import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { instructorRate } from "@/content/fleet";

export function InstructorRateSection() {
  return (
    <Section background="default" id="instructor-rate">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-heading">
          CFI instruction rates
        </h2>
        <div className="mt-8 max-w-2xl rounded-xl bg-white p-6 shadow-sm">
          <p className="font-mono text-xs uppercase tracking-wide text-muted">
            CFI instruction
          </p>
          <p className="mt-2 font-heading text-4xl text-heading">
            {instructorRate.hourly ? (
              <>
                ${instructorRate.hourly}
                <span className="text-lg font-body text-muted">/hr</span>
              </>
            ) : (
              <span className="text-2xl">Confirm with operations</span>
            )}
          </p>
          <p className="mt-4 text-muted">{instructorRate.note}</p>
          {!instructorRate.hourly && (
            <p className="mt-4 text-sm text-muted">
              Our instruction rate is being finalized. Call or email for the
              current CFI hourly rate.
            </p>
          )}
        </div>
      </Container>
    </Section>
  );
}
