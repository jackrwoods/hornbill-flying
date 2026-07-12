import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { sportPilotProgram } from "@/content/programs/sport-pilot";

export function SportPilotQuickAnswerSection() {
  return (
    <Section background="callout" id="quick-answer">
      <Container>
        <Reveal variant="glide" className="card-cinematic p-6 md:p-8">
          <p className="panel-label-lg text-accent mb-4">Quick Answer</p>
          <h2 className="font-heading text-2xl text-heading">
            What is Sport Pilot training at Hornbill Aviation?
          </h2>
          <p className="mt-3 text-body leading-relaxed">
            {sportPilotProgram.quickAnswer}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}