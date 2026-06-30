import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { FAQAccordion } from "@/components/FAQAccordion";
import { cfiProgram } from "@/content/programs/cfi";

export function CFIFAQSection() {
  return (
    <Section background="default" id="faq">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-heading">
          Frequently asked questions
        </h2>
        <div className="mt-8 max-w-3xl">
          <FAQAccordion faqs={cfiProgram.faq} />
        </div>
      </Container>
    </Section>
  );
}
