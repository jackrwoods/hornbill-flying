import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
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
    <Section background="default" id="faq">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">FAQ</p>
          <h2 className="font-heading text-3xl md:text-4xl text-heading">
            Questions about training with {firstName}
          </h2>
        </Reveal>
        <Reveal variant="glide" className="mt-8 max-w-3xl">
          <FAQAccordion faqs={faqs} />
        </Reveal>
      </Container>
    </Section>
  );
}