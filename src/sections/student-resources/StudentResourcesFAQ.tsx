import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { FAQAccordion } from "@/components/FAQAccordion";
import { studentFaqs } from "@/content/student-resources";

export function StudentResourcesFAQ() {
  return (
    <Section background="default" id="faq">
      <Container className="max-w-4xl">
        <h2 className="font-heading text-3xl text-heading md:text-4xl">
          Student resources FAQ
        </h2>
        <p className="mt-4 text-muted">
          Quick answers to the questions we hear most from current and enrolled
          students.
        </p>

        <div className="mt-8">
          <FAQAccordion faqs={studentFaqs} />
        </div>
      </Container>
    </Section>
  );
}
