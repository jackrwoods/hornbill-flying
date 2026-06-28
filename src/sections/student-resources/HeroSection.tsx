import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { CTALink } from "@/components/CTALink";

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
      />

      <Section background="sky" className="py-8 md:py-10">
        <Container className="max-w-4xl">
          <div className="rounded-lg border-l-4 border-gold-500 bg-white p-6 shadow-sm">
            <p className="text-ink">
              Hornbill Aviation students can check the latest KRNO METAR/TAF,
              download training syllabi and PA28 checklists, review FAA medical
              certificate requirements, and use our Reno-specific flight tools.
              Everything is organized below and kept current.
            </p>
          </div>

          <div className="mt-6">
            <CTALink variant="secondary">Book a discovery flight</CTALink>
          </div>
        </Container>
      </Section>
    </>
  );
}
