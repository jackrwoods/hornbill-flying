import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { FAQAccordion } from "@/components/FAQAccordion";
import { commercialPilotProgram } from "@/content/programs/commercial-pilot";

export function CommercialFAQSection() {
  return (
    <Section background="cream" id="faq">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          Frequently asked questions
        </h2>
        <div className="mt-8 max-w-3xl">
          <FAQAccordion faqs={commercialPilotProgram.faq} />
        </div>
      </Container>
    </Section>
  );
}
