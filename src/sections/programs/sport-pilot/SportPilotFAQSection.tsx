import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { FAQAccordion } from "@/components/FAQAccordion";
import { sportPilotProgram } from "@/content/programs/sport-pilot";

export function SportPilotFAQSection() {
  return (
    <Section background="default" id="faq">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">FAQ</p>
          <h2 className="font-heading text-3xl md:text-4xl text-heading">
            Frequently asked questions
          </h2>
        </Reveal>
        <div className="mt-8 max-w-3xl">
          <FAQAccordion faqs={sportPilotProgram.faq} />
        </div>
      </Container>
    </Section>
  );
}