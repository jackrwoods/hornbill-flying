import { Container } from "@/components/Container";
import { CTALink } from "@/components/CTALink";
import { Reveal } from "@/components/Reveal";
import { HeroMedia } from "@/components/home/HeroMedia";

/**
 * Homepage hero (V2 Beat 1).
 *
 * Server-rendered for LCP — the sunset-gradient placeholder inside `HeroMedia`
 * paints in HTML before any media loads. No `"use client"` directive here;
 * `Reveal` is a client component but can be imported into a server component.
 *
 * Copy register: H1 is poetic (V2 narrative §4.3 Beat 1), subhead is grounded.
 * Both have been checked against the V2 avoid-list (`v2-narrative-and-voice.md`
 * §4.6) and the brand banned list (`brand_identity_writing_style.md` §7).
 */
export function Hero() {
  return (
    <section className="relative -mt-16 min-h-svh overflow-hidden bg-immersive-bg text-on-immersive lg:-mt-18">
      <HeroMedia />
      <Container className="relative z-10 flex min-h-svh flex-col justify-end pb-20 md:pb-28">
        <Reveal variant="stagger" className="max-w-2xl">
          <p>
            Hornbill Aviation · RNO
          </p>
          <h1 className="font-heading font-extrabold leading-[1.02] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-on-immersive text-balance">
            Life is better at 10,000 ft
          </h1>
          <p className="mt-8 font-display text-2xl md:text-3xl leading-snug text-on-immersive-muted text-balance max-w-xl">
            From first flight to CFII, Hornbill offers Part 61 flight training at Reno–Tahoe International Airport.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <CTALink
              href="/discovery-flight/"
              variant="secondary"
              analytics="discovery_flight_booking_started"
            >
              Book a discovery flight
            </CTALink>
            <CTALink
              href="/fleet/"
              variant="tertiary"
              className="border-on-immersive/40 text-on-immersive hover:bg-on-dark-subtle"
            >
              See the fleet
            </CTALink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}