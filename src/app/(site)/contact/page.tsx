import type { Metadata } from "next";
import {
  buildTitle,
  buildCanonical,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";
import {
  buildBreadcrumbList,
  buildContactPageLocalBusiness,
  buildContactPoint,
  buildFAQPage,
  buildSchemaGraph,
} from "@/lib/schema";
import { SchemaInjector } from "@/components/SchemaInjector";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { CTALink } from "@/components/CTALink";
import { ContactDetailsSection } from "@/sections/contact/ContactDetailsSection";
import { ContactMapSection } from "@/sections/contact/ContactMapSection";
import { ContactFormSection } from "@/sections/contact/ContactFormSection";
import { ContactFAQSection } from "@/sections/contact/ContactFAQSection";
import { contactFAQ } from "@/content/contact";
import { siteFacts } from "@/content/siteFacts";

const PAGE_TITLE = "Contact Hornbill Aviation in Reno, NV";
const PAGE_DESCRIPTION =
  "Call 555-555-1234 or email office@hornbillaviation.com. Visit us at 1880 Gentry Way, Reno, NV. Book a discovery flight or send a message.";

export const metadata: Metadata = {
  title: buildTitle(PAGE_TITLE),
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: buildCanonical("/contact/"),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical("/contact/"),
    title: buildTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
  }),
  twitter: buildTwitter({
    title: buildTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
  }),
};

export default function ContactPage() {
  const schema = buildSchemaGraph(
    buildBreadcrumbList([
      { name: "Home", url: buildCanonical("/") },
      { name: "Contact", url: buildCanonical("/contact/") },
    ]),
    buildContactPoint(),
    buildContactPageLocalBusiness(),
    buildFAQPage(contactFAQ)
  );

  return (
    <>
      <SchemaInjector schema={schema} id="contact-schema" />
      <PageHeader
        title="Contact Hornbill Aviation"
        subtitle="Call, email, or stop by. We're here to answer questions and help you book your first flight."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
        eyebrow="Contact · KRNO"
        placeholderLabel="Office on the RNO ramp — photography coming"
        sunsetVariant="dawn"
      />
      <ContactDetailsSection />
      <ContactMapSection />
      <ContactFormSection />
      <ContactFAQSection />

      {/* Closing CTA band */}
      <section className="bg-immersive-bg-night text-on-immersive relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-grid opacity-60" aria-hidden="true" />
        <div className="absolute inset-0 bg-sunset-placeholder-dawn opacity-25" aria-hidden="true" />
        <Container className="relative z-10 py-24 md:py-32 text-center">
          <Reveal variant="stagger" className="mx-auto max-w-3xl flex flex-col items-center">
            <p className="panel-label-lg text-immersive-accent mb-6">Book</p>
            <p className="font-display text-3xl md:text-4xl lg:text-5xl leading-snug text-on-immersive text-balance">
              Still on the fence? Fly first. You sit in the left seat.
            </p>
            <p className="mt-6 text-on-immersive-muted text-pretty max-w-xl">
              {siteFacts.discoveryPrice} · {siteFacts.discoveryQualifier} · about 60 minutes · {siteFacts.airportLong}
            </p>
            <div className="mt-10">
              <CTALink
                href="/discovery-flight/"
                variant="secondary"
                analytics="discovery_flight_booking_started"
                className="px-8 py-4 text-base"
              >
                Book a discovery flight — {siteFacts.discoveryPrice}
              </CTALink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
