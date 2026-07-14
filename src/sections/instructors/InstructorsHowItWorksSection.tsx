import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export function InstructorsHowItWorksSection() {
  return (
    <Section background="card">
      <Container>
        <Reveal variant="glide" className="max-w-3xl card-cinematic p-6">
          <p className="panel-label-lg text-accent mb-3">How it works</p>
          <h2 className="font-heading text-lg text-heading">
            How CFIs work with Hornbill
          </h2>
          <ul className="mt-4 grid gap-3 text-body sm:grid-cols-2">
            <li className="flex items-start gap-2">
              <span aria-hidden="true" className="text-accent">✓</span>
              <span>CFIs set their own rates</span>
            </li>
            <li className="flex items-start gap-2">
              <span aria-hidden="true" className="text-accent">✓</span>
              <span>CFIs are independent contractors</span>
            </li>
            <li className="flex items-start gap-2">
              <span aria-hidden="true" className="text-accent">✓</span>
              <span>CFIs manage their own schedules</span>
            </li>
            <li className="flex items-start gap-2">
              <span aria-hidden="true" className="text-accent">✓</span>
              <span>All CFIs are approved by Hornbill Aviation via a check flight in our aircraft</span>
            </li>
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}