import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { FAQAccordion } from "@/components/FAQAccordion";
import { fleetFAQs } from "@/content/fleet";

export function FleetFAQSection() {
  return (
    <Section background="white" id="faq">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          Frequently asked questions
        </h2>
        <div className="mt-8 max-w-3xl">
          <FAQAccordion faqs={fleetFAQs} />
        </div>
      </Container>
    </Section>
  );
}
