import { AssetImage as Image } from "@/components/AssetImage";
import { Container } from "@/components/Container";
import { CTALink } from "@/components/CTALink";
import { PhoneLink } from "@/components/PhoneLink";
import { membershipContent } from "@/content/membership";

export function MembershipHeroSection() {
  const { hero } = membershipContent;

  return (
    <section className="relative overflow-hidden bg-dark text-on-dark">
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          fetchPriority="high"
          loading="eager"
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-hero-scrim" />
      </div>

      <Container className="relative z-10">
        <div className="py-20 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl leading-tight md:text-5xl lg:text-6xl">
              {hero.h1}
            </h1>
            <p className="mt-4 font-heading text-2xl text-on-dark-accent-hover md:text-3xl">
              {hero.headline}
            </p>
            <p className="mt-6 text-lg text-on-dark md:text-xl">
              {hero.valueProp}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <CTALink
                href={hero.cta.primary.href}
                query={hero.cta.primary.query}
                variant="secondary"
                analytics={hero.cta.primary.analytics}
              >
                {hero.cta.primary.label}
              </CTALink>
              <CTALink
                href={hero.cta.secondary.href}
                variant="tertiary"
                className="text-on-dark hover:bg-on-dark-subtle"
                analytics="fleet_click"
              >
                {hero.cta.secondary.label}
              </CTALink>
              <PhoneLink
                className="inline-flex min-h-[44px] items-center text-on-dark hover:text-on-dark-accent-hover"
                showIcon
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
