import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { privatePilotProgram } from "@/content/programs/private-pilot";

export function PrivatePilotQuickAnswerSection() {
  return (
    <Section background="callout" id="quick-answer">
      <Container>
        <div className="rounded-xl border-l-4 border-accent bg-white p-6 shadow-sm md:p-8">
          <h2 className="font-heading text-2xl text-heading">
            What is a private pilot license at Hornbill Aviation?
          </h2>
          <p className="mt-3 text-body leading-relaxed">
            {privatePilotProgram.quickAnswer}
          </p>
        </div>
      </Container>
    </Section>
  );
}
