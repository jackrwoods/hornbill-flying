import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { cfiProgram } from "@/content/programs/cfi";

export function CFIQuickAnswerSection() {
  return (
    <Section background="callout" id="quick-answer">
      <Container>
        <div className="rounded-xl border-l-4 border-accent bg-white p-6 shadow-sm md:p-8">
          <h2 className="font-heading text-2xl text-heading">
            What is CFI training at Hornbill Aviation?
          </h2>
          <p className="mt-3 text-body leading-relaxed">
            {cfiProgram.quickAnswer}
          </p>
        </div>
      </Container>
    </Section>
  );
}
