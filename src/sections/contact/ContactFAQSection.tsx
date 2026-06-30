import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { FAQAccordion } from "@/components/FAQAccordion";
import { contactFAQ } from "@/content/contact";

export function ContactFAQSection() {
  return (
    <Section background="default" id="faq">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-heading">
          Common questions
        </h2>
        <FAQAccordion faqs={contactFAQ} className="mt-6" />
      </Container>
    </Section>
  );
}
