import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { instrumentRatingProgram } from "@/content/programs/instrument-rating";

export function InstrumentRatingQuickAnswerSection() {
  return (
    <Section background="callout" id="quick-answer">
      <Container>
        <div className="rounded-xl border-l-4 border-accent bg-white p-6 shadow-sm md:p-8">
          <h2 className="font-heading text-2xl text-heading">
            What is Instrument Rating training at Hornbill Aviation?
          </h2>
          <p className="mt-3 text-body leading-relaxed">
            {instrumentRatingProgram.quickAnswer}
          </p>
        </div>
      </Container>
    </Section>
  );
}
