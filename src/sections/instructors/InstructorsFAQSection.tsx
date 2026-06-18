import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { FAQAccordion } from "@/components/FAQAccordion";
import { instructorsFAQ } from "@/content/instructors-faq";

export function InstructorsFAQSection() {
  return (
    <Section background="white" id="faq">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          Common questions
        </h2>
        <FAQAccordion faqs={instructorsFAQ} className="mt-6" />
      </Container>
    </Section>
  );
}
