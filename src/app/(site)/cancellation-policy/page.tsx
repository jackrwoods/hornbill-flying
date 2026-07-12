import type { Metadata } from "next";
import Link from "next/link";
import { SchemaInjector } from "@/components/SchemaInjector";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { Prose } from "@/components/Prose";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTALink } from "@/components/CTALink";
import { siteFacts } from "@/content/siteFacts";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";
import {
  buildBreadcrumbList,
  buildFAQPage,
  buildSchemaGraph,
  buildWebPage,
} from "@/lib/schema";
import { routeMap } from "@/lib/routes";
import { cancellationPolicy } from "@/content/legal/cancellation";

const PAGE_TITLE = "Cancellation, Refund & Weather Policy";
const PAGE_DESCRIPTION =
  "Our cancellation, refund, and weather policy for discovery flights and lessons at Hornbill Aviation in Reno, NV.";
const cancellationRoute = routeMap.find((r) => r.slug === "cancellation-policy")!;
const pagePath = cancellationRoute.href;
const canonical = buildCanonical(pagePath);

export const metadata: Metadata = {
  title: buildTitle(PAGE_TITLE),
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical,
  },
  openGraph: buildOpenGraph({
    url: canonical,
    title: buildTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
  }),
  twitter: buildTwitter({
    title: buildTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
  }),
};

export default function CancellationPolicyPage() {
  const schema = buildSchemaGraph(
    buildBreadcrumbList([
      { name: "Home", url: buildCanonical("/") },
      { name: PAGE_TITLE, url: canonical },
    ]),
    buildWebPage(PAGE_TITLE, pagePath),
    buildFAQPage(cancellationPolicy.faq)
  );

  return (
    <>
      <SchemaInjector schema={schema} id="cancellation-schema" />
      <PageHeader
        title="Cancellation, refund & weather policy"
        subtitle="Clear rules so you can book with confidence. Life happens; weather happens. Here's how we handle both."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: PAGE_TITLE },
        ]}
        eyebrow="Legal · Cancellation"
        placeholderLabel="Office desk, morning — photography coming"
        sunsetVariant="soft"
      />
      <Section background="default">
        <Container>
          <Reveal variant="glide">
            <Prose>
              <p className="text-muted">
                Effective date: {cancellationPolicy.effectiveDate}
              </p>

              <section id="discovery-flights">
                <h2>Discovery flights</h2>
                <p>
                  You can cancel or reschedule a discovery flight at no charge up
                  to {cancellationPolicy.discoveryWindow}. That gives us enough
                  time to offer the slot to another student.
                </p>
                <p>
                  If you cancel inside that window,{" "}
                  <span className="nums">{cancellationPolicy.discoveryLateFee}</span> may be forfeited.
                </p>
                <p>
                  No-shows are treated as late cancellations and forfeit the
                  deposit unless an exception is approved by the office.
                </p>
              </section>

              <section id="flight-lessons">
                <h2>Flight lessons</h2>
                <p>
                  The same {cancellationPolicy.lessonWindow} window applies to
                  ongoing flight lessons. Cancel or reschedule before then and there
                  is no charge.
                </p>
                <p>To reschedule or cancel, use the link in your confirmation email, call the office, or text us. We confirm changes as quickly as possible.</p>
              </section>

              <section id="membership-cancellation">
                <h2>Membership cancellation</h2>
                <p>{cancellationPolicy.membershipPolicy.summary}</p>
                <ul>
                  {cancellationPolicy.membershipPolicy.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section id="weather-and-safety">
                <h2>Weather and safety</h2>
                <p>{cancellationPolicy.weatherPolicy.summary}</p>
                <ul>
                  {cancellationPolicy.weatherPolicy.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section id="refund-methods">
                <h2>Refund methods</h2>
                <p>{cancellationPolicy.refundPolicy.summary}</p>
                <ul>
                  {cancellationPolicy.refundPolicy.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section id="gift-vouchers">
                <h2>Gift vouchers</h2>
                <p>{cancellationPolicy.giftVoucherPolicy.summary}</p>
                <ul>
                  {cancellationPolicy.giftVoucherPolicy.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section id="contact-us">
                <h2>Contact us</h2>
                <p>
                  {cancellationPolicy.nap.streetAddress},{" "}
                  {cancellationPolicy.nap.addressLocality},{" "}
                  {cancellationPolicy.nap.addressRegion}{" "}
                  {cancellationPolicy.nap.postalCode}
                  <br />
                  <a href={`mailto:${cancellationPolicy.nap.email}`}>
                    {cancellationPolicy.nap.email}
                  </a>
                  <br />
                  <span className="nums">{cancellationPolicy.nap.telephoneFormatted}</span>
                </p>
                <p>
                  Still have questions?{" "}
                  <Link href={cancellationPolicy.cta.secondary.href} className="beak-flash">
                    Contact us
                  </Link>{" "}
                  and we&apos;ll walk you through it.
                </p>
              </section>
            </Prose>
          </Reveal>
        </Container>
      </Section>

      <Section background="card">
        <Container>
          <Reveal variant="glide" className="mx-auto max-w-2xl">
            <p className="panel-label-lg text-accent mb-4">Questions</p>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-heading text-balance">
              Common questions
            </h2>
            <div className="mt-8">
              <FAQAccordion faqs={cancellationPolicy.faq} />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Closing CTA band */}
      <section className="bg-immersive-bg-night text-on-immersive relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-grid opacity-60" aria-hidden="true" />
        <div className="absolute inset-0 bg-sunset-placeholder-dawn opacity-25" aria-hidden="true" />
        <Container className="relative z-10 py-24 md:py-32 text-center">
          <Reveal variant="stagger" className="mx-auto max-w-3xl flex flex-col items-center">
            <p className="panel-label-lg text-immersive-accent mb-6">Book</p>
            <p className="font-display text-3xl md:text-4xl lg:text-5xl leading-snug text-on-immersive text-balance">
              Your first lesson is a discovery flight. You fly. We watch.
            </p>
            <p className="mt-6 text-on-immersive-muted text-pretty max-w-xl">
              {siteFacts.discoveryPrice} · {siteFacts.discoveryQualifier} · about 60 minutes · {siteFacts.airportLong}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <CTALink
                href={cancellationPolicy.cta.primary.href}
                analytics={cancellationPolicy.cta.primary.analytics}
                variant="secondary"
                className="px-8 py-4 text-base"
              >
                {cancellationPolicy.cta.primary.label}
              </CTALink>
              <CTALink
                href={cancellationPolicy.cta.secondary.href}
                variant="tertiary"
                analytics="contact_click"
                className="border-on-immersive/40 text-on-immersive hover:bg-on-dark-subtle"
              >
                {cancellationPolicy.cta.secondary.label}
              </CTALink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
