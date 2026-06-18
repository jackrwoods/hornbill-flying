import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { instrumentRatingProgram } from "@/content/programs/instrument-rating";

export function InstrumentRatingQuickAnswerSection() {
  return (
    <Section background="sky" id="quick-answer">
      <Container>
        <div className="rounded-xl border-l-4 border-gold-500 bg-white p-6 shadow-sm md:p-8">
          <h2 className="font-heading text-2xl text-navy-900">
            What is Instrument Rating training at Hornbill?
          </h2>
          <p className="mt-3 text-ink leading-relaxed">
            {instrumentRatingProgram.quickAnswer}
          </p>
        </div>
      </Container>
    </Section>
  );
}
