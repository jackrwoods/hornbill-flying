import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { mountainFlyingProgram } from "@/content/programs/mountain-flying";

export function MountainFlyingQuickAnswerSection() {
  return (
    <Section background="sky" id="quick-answer">
      <Container>
        <div className="rounded-xl border-l-4 border-gold-500 bg-white p-6 shadow-sm md:p-8">
          <h2 className="font-heading text-2xl text-navy-900">
            What is the Mountain Flying course at Hornbill Aviation?
          </h2>
          <p className="mt-3 text-ink leading-relaxed">
            {mountainFlyingProgram.quickAnswer}
          </p>
        </div>
      </Container>
    </Section>
  );
}
