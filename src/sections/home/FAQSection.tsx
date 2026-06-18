import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { FAQAccordion } from "@/components/FAQAccordion";
import { homeFAQ } from "@/content/faq";

export function FAQSection() {
  return (
    <Section background="white" id="faq">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-3xl md:text-4xl text-center text-navy-900">
            Common questions
          </h2>
          <div className="mt-10">
            <FAQAccordion faqs={homeFAQ} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
