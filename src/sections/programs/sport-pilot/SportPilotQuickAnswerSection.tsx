import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { sportPilotProgram } from "@/content/programs/sport-pilot";

export function SportPilotQuickAnswerSection() {
  return (
    <Section background="teal" id="quick-answer">
      <Container>
        <div className="rounded-xl border-l-4 border-gold-500 bg-white p-6 shadow-sm md:p-8">
          <h2 className="font-heading text-2xl text-navy-900">
            What is Sport Pilot training at Hornbill Aviation?
          </h2>
          <p className="mt-3 text-ink leading-relaxed">
            {sportPilotProgram.quickAnswer}
          </p>
        </div>
      </Container>
    </Section>
  );
}
