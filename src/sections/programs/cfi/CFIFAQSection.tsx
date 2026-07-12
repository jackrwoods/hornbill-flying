import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { FAQAccordion } from "@/components/FAQAccordion";
import { cfiProgram } from "@/content/programs/cfi";

export function CFIFAQSection() {
  return (
    <Section background="default" id="faq">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Questions</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
            Frequently asked questions
          </h2>
        </Reveal>
        <div className="mt-10 max-w-3xl">
          <Reveal variant="glide">
            <FAQAccordion faqs={cfiProgram.faq} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}