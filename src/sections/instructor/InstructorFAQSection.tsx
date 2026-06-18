import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { FAQAccordion } from "@/components/FAQAccordion";
import type { Instructor } from "@/types";

interface InstructorFAQSectionProps {
  instructor: Instructor;
}

export function InstructorFAQSection({ instructor }: InstructorFAQSectionProps) {
  const firstName = instructor.name.split(" ")[0];
  const faqs = instructor.faq;

  if (!faqs || faqs.length === 0) return null;

  return (
    <Section background="cream" id="faq">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          Questions about training with {firstName}
        </h2>
        <FAQAccordion faqs={faqs} className="mt-6" />
      </Container>
    </Section>
  );
}
