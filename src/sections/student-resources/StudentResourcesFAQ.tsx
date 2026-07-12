import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { FAQAccordion } from "@/components/FAQAccordion";
import { studentFaqs } from "@/content/student-resources";

export function StudentResourcesFAQ() {
  return (
    <Section background="default" id="faq">
      <Container className="max-w-4xl">
        <Reveal variant="glide">
          <p className="panel-label-lg text-accent mb-4">FAQ</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
            Student resources FAQ
          </h2>
          <p className="mt-4 text-muted text-pretty">
            Quick answers to the questions we hear most from current and enrolled
            students.
          </p>
        </Reveal>

        <Reveal variant="glide" className="mt-8">
          <FAQAccordion faqs={studentFaqs} />
        </Reveal>
      </Container>
    </Section>
  );
}