import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { CTALink } from "@/components/CTALink";

const steps = [
  "CFIs set their own rates.",
  "CFIs are independent contractors.",
  "CFIs manage their own schedules.",
  "All CFIs are approved by Hornbill Aviation via a check flight in our aircraft.",
];

export function InstructorsHowItWorksSection() {
  return (
    <Section
      background="default"
      id="how-it-works"
      className="relative overflow-hidden bg-sunset-placeholder-soft bg-sunset-shimmer py-20 md:py-28"
    >
      <Container className="relative z-10">
        <Reveal
          variant="glide"
          className="card-immersive p-6 md:p-10 lg:p-12"
        >
          <p className="panel-label-lg text-immersive-accent mb-4 text-center">
            How it works
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-on-immersive text-balance text-center">
            How CFIs work with Hornbill
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-on-immersive-muted text-pretty text-center">
            Four simple expectations for every instructor on our team.
          </p>
          <ol className="mt-8 grid gap-5 sm:grid-cols-2">
            {steps.map((step, index) => (
              <li key={index} className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex-none inline-flex h-10 w-10 items-center justify-center rounded-full border border-immersive-accent/30 font-mono text-lg text-immersive-accent"
                >
                  {index + 1}
                </span>
                <span className="pt-2 text-on-immersive leading-relaxed">
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex justify-center">
            <CTALink
              href="/discovery-flight/"
              variant="secondary"
              analytics="discovery_flight_booking_started"
              className="min-h-[48px] px-8 py-4 text-base"
            >
              Book a discovery flight
            </CTALink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}