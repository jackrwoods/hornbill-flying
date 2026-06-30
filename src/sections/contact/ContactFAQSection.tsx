import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { FAQAccordion } from "@/components/FAQAccordion";
import { contactFAQ } from "@/content/contact";

export function ContactFAQSection() {
  return (
    <Section background="sand" id="faq">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          Common questions
        </h2>
        <FAQAccordion faqs={contactFAQ} className="mt-6" />
      </Container>
    </Section>
  );
}
