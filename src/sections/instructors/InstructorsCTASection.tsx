import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CTALink } from "@/components/CTALink";
import { PhoneLink } from "@/components/PhoneLink";

export function InstructorsCTASection() {
  return (
    <Section background="navy" id="ready-to-fly">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl text-white">
              Not sure which instructor is right for you?
            </h2>
            <p className="mt-3 max-w-2xl text-sand-50/90">
              Book a discovery flight and meet the team in person. It is the
              easiest way to see who fits your learning style before you commit
              to training.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <CTALink
              href="/discovery-flight/"
              variant="secondary"
              className="min-h-[48px]"
            >
              Book a discovery flight
            </CTALink>
            <PhoneLink
              className="min-h-[48px] text-white hover:text-gold-400"
              showIcon
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
