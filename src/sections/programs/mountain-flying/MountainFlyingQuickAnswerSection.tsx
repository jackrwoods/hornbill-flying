import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { mountainFlyingProgram } from "@/content/programs/mountain-flying";

export function MountainFlyingQuickAnswerSection() {
  return (
    <Section background="callout" id="quick-answer">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Overview</p>
          <div className="card-cinematic p-6 md:p-8">
            <h2 className="font-heading text-2xl md:text-3xl text-heading text-balance">
              What is the Mountain Flying course at Hornbill Aviation?
            </h2>
            <p className="mt-3 text-body leading-relaxed text-pretty">
              {mountainFlyingProgram.quickAnswer}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}