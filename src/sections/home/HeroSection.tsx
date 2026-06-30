import { AssetImage as Image } from "@/components/AssetImage";
import { Container } from "@/components/Container";
import { CTALink } from "@/components/CTALink";
import { homepageHero } from "@/content/homepage";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-dark text-on-dark">
      <div className="absolute inset-0 z-0">
        <Image
          src={homepageHero.image}
          alt={homepageHero.imageAlt}
          width={homepageHero.imageWidth}
          height={homepageHero.imageHeight}
          priority
          fetchPriority="high"
          loading="eager"
          className="object-cover opacity-40 w-full h-full"
          sizes="100vw"
          style={{ minWidth: "100%", minHeight: "100%" }}
        />
        <div className="absolute inset-0 bg-hero-scrim" />
      </div>

      <Container className="relative z-10">
        <div className="py-20 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl leading-tight md:text-5xl lg:text-6xl">
              {homepageHero.h1}
            </h1>
            <p className="mt-6 text-lg text-on-dark md:text-xl">
              {homepageHero.subheadline}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <CTALink
                href="/discovery-flight/"
                variant="secondary"
                analytics="discovery_flight_booking_started"
              >
                {homepageHero.ctaPrimary}
              </CTALink>
              <CTALink
                href="/discovery-flight/"
                query={homepageHero.ctaSecondaryQuery}
                variant="tertiary"
                className="text-on-dark hover:bg-on-dark-subtle"
                analytics="discovery_flight_gift_voucher_started"
              >
                {homepageHero.ctaSecondary}
              </CTALink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
