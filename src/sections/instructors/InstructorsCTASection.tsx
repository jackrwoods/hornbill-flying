import { AssetImage as Image } from "@/components/AssetImage";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { CTALink } from "@/components/CTALink";
import { PhoneLink } from "@/components/PhoneLink";

export function InstructorsCTASection() {
  return (
    <Section
      background="immersive-night"
      id="ready-to-fly"
      className="relative overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-blueprint-grid opacity-40"
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="/images/discovery-flight-hero.jpg"
          alt=""
          fill
          priority={false}
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-hero-scrim" />
      </div>
      <Container className="relative z-10 py-24 md:py-32 text-center">
        <Reveal
          variant="stagger"
          className="mx-auto max-w-3xl flex flex-col items-center"
        >
          <p className="panel-label-lg text-immersive-accent mb-6">Book</p>
          <p className="font-display text-3xl md:text-4xl lg:text-5xl leading-snug text-on-immersive text-balance">
            Not sure which instructor is right for you?
          </p>
          <p className="mt-6 text-on-immersive-muted text-pretty max-w-2xl">
            Book a discovery flight and meet the team in person. It is the
            easiest way to see who fits your learning style before you commit
            to training.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CTALink
              href="/discovery-flight/"
              variant="secondary"
              analytics="discovery_flight_booking_started"
              className="min-h-[48px] px-8 py-4 text-base"
            >
              Book a discovery flight
            </CTALink>
            <PhoneLink
              className="min-h-[48px] text-on-immersive hover:text-immersive-accent"
              showIcon
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}