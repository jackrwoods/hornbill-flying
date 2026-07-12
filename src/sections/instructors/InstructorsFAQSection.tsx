import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { FAQAccordion } from "@/components/FAQAccordion";
import { instructorsFAQ } from "@/content/instructors-faq";

export function InstructorsFAQSection() {
  return (
    <Section background="card" id="faq">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">FAQ</p>
          <h2 className="font-heading text-3xl md:text-4xl text-heading">
            Common questions
          </h2>
        </Reveal>
        <Reveal variant="glide" className="mt-8 max-w-3xl">
          <FAQAccordion faqs={instructorsFAQ} />
        </Reveal>
      </Container>
    </Section>
  );
}