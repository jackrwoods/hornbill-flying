import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { cancellationPolicy } from "@/content/fleet";

export function CancellationPolicySection() {
  return (
    <Section background="default" id="cancellation-policy">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Policy</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
            Cancellation and refund policy
          </h2>
          <p className="mt-4 max-w-3xl text-muted leading-relaxed text-pretty">
            {cancellationPolicy.text}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}