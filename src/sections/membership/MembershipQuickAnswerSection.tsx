import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { membershipContent } from "@/content/membership";

export function MembershipQuickAnswerSection() {
  const { quickAnswer } = membershipContent;

  return (
    <Section background="sky" id="quick-answer">
      <Container>
        <h2 className="font-heading text-2xl text-navy-900 md:text-3xl">
          {quickAnswer.title}
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-ink-light leading-relaxed">
          {quickAnswer.text}
        </p>
      </Container>
    </Section>
  );
}
