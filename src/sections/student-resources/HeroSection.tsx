import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { CTALink } from "@/components/CTALink";
import { Reveal } from "@/components/Reveal";

export function HeroSection() {
  return (
    <>
      <PageHeader
        title="Student resources for Reno pilots"
        subtitle="Everything current and enrolled students need in one place: RNO weather, FAA medical guidance, syllabi, POH downloads, flight-planning tools, and quick links to Hornbill Aviation programs and pilot tools."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Student Resources" },
        ]}
        eyebrow="Student resources"
        placeholderLabel="Ramp checklist, PA28 — photography coming"
      />

      <Section background="callout" className="py-8 md:py-10">
        <Container className="max-w-4xl">
          <Reveal variant="glide">
            <div className="card-cinematic p-6">
              <p className="text-body">
                Hornbill Aviation students can check the latest KRNO METAR/TAF,
                download training syllabi and PA28 checklists, review FAA medical
                certificate requirements, and use our Reno-specific flight tools.
                Everything is organized below and kept current.
              </p>
            </div>

            <div className="mt-6">
              <CTALink href="/discovery-flight/" variant="secondary">
                Book a discovery flight
              </CTALink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}