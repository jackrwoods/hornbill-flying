import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { ContactInfoCard } from "@/components/ContactInfoCard";
import { CTALink } from "@/components/CTALink";
import { PhoneLink } from "@/components/PhoneLink";

export function ContactDetailsSection() {
  return (
    <Section background="white" id="contact-details">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
              Reach us directly
            </h2>
            <p className="mt-4 max-w-xl text-ink-light">
              Questions about training, memberships, or rentals? Call or email
              the office. We reply to every message and are happy to walk you
              through the next step.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTALink
                href="/discovery-flight/"
                variant="primary"
                className="min-h-[48px]"
              >
                Book a discovery flight
              </CTALink>
              <PhoneLink
                className="min-h-[48px] inline-flex items-center justify-center rounded-lg border-2 border-navy-900 bg-transparent px-5 py-3 text-sm font-semibold text-navy-900 hover:bg-navy-900/5 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:ring-offset-2"
                showIcon
              />
            </div>
          </div>

          <ContactInfoCard />
        </div>
      </Container>
    </Section>
  );
}
