import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { cancellationPolicy } from "@/content/fleet";

export function CancellationPolicySection() {
  return (
    <Section background="sand" id="cancellation-policy">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          Cancellation and refund policy
        </h2>
        <p className="mt-4 max-w-3xl text-ink-light leading-relaxed">
          {cancellationPolicy.text}
        </p>
      </Container>
    </Section>
  );
}
