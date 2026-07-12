import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { FAQAccordion } from "@/components/FAQAccordion";
import { contactFAQ } from "@/content/contact";

export function ContactFAQSection() {
  return (
    <Section background="default" id="faq">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Questions</p>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-heading text-balance">
            Common questions
          </h2>
        </Reveal>
        <Reveal variant="glide" className="mt-8 max-w-3xl">
          <FAQAccordion faqs={contactFAQ} />
        </Reveal>
      </Container>
    </Section>
  );
}