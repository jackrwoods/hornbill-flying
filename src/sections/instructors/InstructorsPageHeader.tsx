import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export function InstructorsPageHeader() {
  return (
    <>
      <PageHeader
        eyebrow="Our Team"
        title="Part 61 flight instructors in Reno, NV"
        subtitle="Choose the CFI who fits your goals and schedule."
        placeholderLabel="CFIs on the ramp at KRNO — photography coming"
        sunsetVariant="dawn"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Instructors" },
        ]}
      >
        <p className="mt-6 max-w-2xl text-on-immersive-muted leading-relaxed text-pretty">
          Hornbill Aviation is a Part 61 school, so you choose your instructor
          or bring your own. Every CFI is available in any plane in the fleet.
        </p>
        <p className="mt-6 inline-flex flex-wrap items-center gap-2 rounded-full bg-on-dark-subtle px-4 py-2 text-sm font-mono text-immersive-accent">
          <span className="nums">4 CFIs</span>
          <span aria-hidden="true">·</span>
          <span>1 similarly equipped PA28 fleet</span>
          <span aria-hidden="true">·</span>
          <span>train at RNO</span>
        </p>
      </PageHeader>

      <Section background="card">
        <Container>
          <Reveal variant="glide" className="max-w-3xl card-cinematic p-6">
            <p className="panel-label-lg text-accent mb-3">How it works</p>
            <h2 className="font-heading text-lg text-heading">
              How CFIs work with Hornbill
            </h2>
            <ul className="mt-4 grid gap-3 text-body sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span aria-hidden="true" className="text-accent">✓</span>
                <span>CFIs set their own rates</span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true" className="text-accent">✓</span>
                <span>CFIs are independent contractors</span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true" className="text-accent">✓</span>
                <span>CFIs manage their own schedules</span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true" className="text-accent">✓</span>
                <span>All CFIs are approved by Hornbill Aviation via a check flight in our aircraft</span>
              </li>
            </ul>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}