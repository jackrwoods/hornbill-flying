import { Container } from "@/components/Container";
import { CTALink } from "@/components/CTALink";
import { PhoneLink } from "@/components/PhoneLink";
import { Reveal } from "@/components/Reveal";
import { siteFacts } from "@/content/siteFacts";

export function DiscoveryCta() {
  return (
    <section className="bg-immersive-bg-night text-on-immersive relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint-grid opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 bg-sunset-placeholder-dawn opacity-25" aria-hidden="true" />
      <Container className="relative z-10 py-24 md:py-32 text-center">
        <Reveal variant="stagger" className="mx-auto max-w-3xl flex flex-col items-center">
          <p className="font-display text-3xl md:text-4xl lg:text-5xl leading-snug text-on-immersive text-balance">
            Your first lesson is a discovery flight.
          </p>
          <p className="mt-6 text-on-immersive-muted text-pretty max-w-xl">
            {siteFacts.discoveryPrice} · {siteFacts.discoveryQualifier} · about 60 minutes · {siteFacts.airportLong}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            <CTALink
              href={siteFacts.discoveryHref}
              variant="secondary"
              analytics="discovery_flight_booking_started"
              className="px-8 py-4 text-base"
            >
              Book a discovery flight — {siteFacts.discoveryPrice}
            </CTALink>
            {siteFacts.phoneTbd ? (
              <CTALink href={siteFacts.contactHref} variant="tertiary" className="border-on-immersive/40 text-on-immersive hover:bg-on-dark-subtle">
                Call or text us
              </CTALink>
            ) : (
              <PhoneLink className="text-on-immersive text-base" analytics="phone_click_home">
                Call or text
              </PhoneLink>
            )}
            <CTALink
              href={`mailto:${siteFacts.email}`}
              variant="tertiary"
              className="border-on-immersive/40 text-on-immersive hover:bg-on-dark-subtle"
              analytics="email_click_home"
            >
              Email us
            </CTALink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}