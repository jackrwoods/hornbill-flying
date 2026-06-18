import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { financingContent } from "@/content/financing";

export function FinancingHeroSection() {
  const { hero } = financingContent;

  return (
    <>
      <PageHeader
        title={hero.title}
        subtitle={hero.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Financing" },
        ]}
      />
      <Section background="navy" className="py-6 md:py-8">
        <Container>
          <p className="text-center text-sm font-medium tracking-wide text-cream-50/90 sm:text-base">
            {hero.reassurance}
          </p>
        </Container>
      </Section>
    </>
  );
}
