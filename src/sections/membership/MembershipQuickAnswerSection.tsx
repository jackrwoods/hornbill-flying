import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { membershipContent } from "@/content/membership";

export function MembershipQuickAnswerSection() {
  const { quickAnswer } = membershipContent;

  return (
    <Section background="callout" id="quick-answer">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Overview</p>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-heading text-balance">
            {quickAnswer.title}
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-muted leading-relaxed text-pretty">
            {quickAnswer.text}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}