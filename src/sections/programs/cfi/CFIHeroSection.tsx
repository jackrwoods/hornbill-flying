import { AssetImage as Image } from "@/components/AssetImage";
import { Container } from "@/components/Container";
import { CTALink } from "@/components/CTALink";
import { PhoneLink } from "@/components/PhoneLink";
import { cfiProgram } from "@/content/programs/cfi";

export function CFIHeroSection() {
  const { hero } = cfiProgram;

  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
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
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/60 to-navy-900/40" />
      </div>

      <Container className="relative z-10">
        <div className="py-20 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl leading-tight md:text-5xl lg:text-6xl">
              {hero.title}
            </h1>
            <p className="mt-6 text-lg text-cream-50/90 md:text-xl">
              {hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <CTALink
                href={hero.cta.primary.href}
                variant="secondary"
                analytics={hero.cta.primary.analytics}
              >
                {hero.cta.primary.label}
              </CTALink>
              <PhoneLink
                href={hero.cta.secondary.href}
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 hover:no-underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy-900"
                showIcon={false}
                analytics={hero.cta.secondary.analytics}
              >
                {hero.cta.secondary.label}
              </PhoneLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
