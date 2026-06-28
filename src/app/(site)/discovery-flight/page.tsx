import type { Metadata } from "next";
import { Suspense } from "react";
import { AssetImage as Image } from "@/components/AssetImage";
import Link from "next/link";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { FAQAccordion } from "@/components/FAQAccordion";
import { SchemaInjector } from "@/components/SchemaInjector";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { BookingSkeleton } from "@/components/booking/BookingSkeleton";
import { CTALink } from "@/components/CTALink";
import { PhoneLink } from "@/components/PhoneLink";
import { buildTitle, buildCanonical, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import { buildSchemaGraph } from "@/lib/schema";
import {
  buildDiscoveryFlightWebPage,
  buildDiscoveryBreadcrumbList,
  buildDiscoveryFlightEvent,
  buildTahoeScenicEvent,
  buildDiscoveryFAQPage,
} from "@/lib/schema/discoveryFlight";

const TITLE = "Book a Discovery Flight in Reno, NV | $199";
const DESCRIPTION =
  "Book a $199 discovery flight at Reno–Tahoe (RNO). Choose a standard PA28, scenic Tahoe flight, or gift voucher. Pick a date, enter your details, and pay online.";

export const metadata: Metadata = {
  title: buildTitle("Book a Discovery Flight in Reno, NV | $199"),
  description: DESCRIPTION,
  alternates: {
    canonical: buildCanonical("/discovery-flight/"),
  },
  openGraph: buildOpenGraph({
    url: buildCanonical("/discovery-flight/"),
    title: buildTitle(TITLE),
    description: DESCRIPTION,
  }),
  twitter: buildTwitter({
    title: buildTitle(TITLE),
    description: DESCRIPTION,
  }),
};

const WHAT_IS_INCLUDED = [
  { label: "Left seat", text: "You sit in the left seat and handle the controls." },
  { label: "Preflight briefing", text: "Your CFI walks you through the aircraft and the plan." },
  { label: "45–60 minutes aloft", text: "Standard flight around Reno; Tahoe scenic option adds Lake Tahoe views." },
  { label: "Post-flight debrief", text: "Ask questions and get a clear next step if you want to continue." },
  { label: "No experience needed", text: "Discovery flights are built for first-timers." },
];

const WHY_HORNBILL = [
  { label: "Choose your instructor", text: "Pick the CFI whose schedule and style fit you." },
  { label: "Consistent PA28 fleet", text: "Same handling, predictable costs, no surprises when you switch aircraft." },
  { label: "Real cross-country experience", text: "Train with trips that look like actual flying, not just practice-area loops." },
  { label: "Transparent pricing", text: `$${siteConfig.pricing.discoveryFlight} for a standard discovery flight. No hidden fees.` },
];

const DISCOVERY_FAQ = [
  {
    id: "discovery-what",
    question: "What happens on a discovery flight?",
    answer:
      "You meet your CFI, preflight the PA28, then fly for 45–60 minutes around the Reno area. You sit in the left seat, handle the controls, and decide if flying is for you.",
  },
  {
    id: "discovery-who",
    question: "Who can take a discovery flight?",
    answer:
      "Almost anyone. No prior experience or medical certificate is required for an introductory flight. Bring a valid photo ID.",
  },
  {
    id: "discovery-bring",
    question: "What should I bring?",
    answer:
      "A valid photo ID, comfortable clothes, and sunglasses. We provide headsets and a preflight briefing.",
  },
  {
    id: "discovery-weight",
    question: "Is there a weight limit?",
    answer:
      "We ask for your weight during booking so we can plan the PA28's weight and balance. It is optional and kept private.",
  },
  {
    id: "discovery-weather",
    question: "What if the weather is bad?",
    answer:
      "If weather is below VFR minimums or the aircraft is unavailable, we reschedule at no charge. You can also cancel or reschedule up to 24 hours before your flight.",
  },
  {
    id: "discovery-gift",
    question: "How do gift vouchers work?",
    answer:
      "You buy a voucher online. The recipient receives a code and books a discovery flight at a time that works for them. Vouchers are valid for 12 months.",
  },
  {
    id: "discovery-cancel",
    question: "What is your cancellation policy?",
    answer:
      "You can cancel or reschedule up to 24 hours before your discovery flight. Same-day cancellations may be charged at the discretion of operations.",
  },
];

export default function DiscoveryFlightPage() {
  const pageSchema = buildSchemaGraph(
    buildDiscoveryFlightWebPage(),
    buildDiscoveryBreadcrumbList(),
    buildDiscoveryFlightEvent(),
    buildTahoeScenicEvent(),
    buildDiscoveryFAQPage(DISCOVERY_FAQ)
  );

  return (
    <>
      <SchemaInjector schema={pageSchema} id="discovery-flight-schema" />

      <Section background="white" id="hero-details">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="overflow-hidden rounded-2xl bg-navy-900">
                <Image
                  src="/images/discovery-flight-hero.jpg"
                  alt="PA28 Cherokee on the ramp at Reno-Tahoe International Airport"
                  width={1200}
                  height={800}
                  priority
                  fetchPriority="high"
                  loading="eager"
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="order-1 space-y-6 lg:order-2">
              <nav aria-label="Breadcrumb" className="text-sm text-ink-light">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link href="/" className="hover:text-navy-900 hover:underline">Home</Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-navy-900">Discovery Flight</li>
                </ol>
              </nav>
              <h1 className="font-heading text-4xl text-navy-900 md:text-5xl">
                Book a discovery flight in Reno, NV.
              </h1>
              <p className="text-lg text-ink-light">
                {`Spend 45–60 minutes in the left seat of a PA28 at Reno–Tahoe (RNO). $${siteConfig.pricing.discoveryFlight}. No deposit required.`}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="#booking-widget"
                  className="inline-flex min-h-[3.25rem] items-center justify-center rounded-lg bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
                  Book now
                </a>
                <CTALink
                  href="/discovery-flight/"
                  query={{ type: "gift" }}
                  variant="tertiary"
                  analytics="discovery_flight_gift_voucher_started"
                >
                  Buy a gift voucher
                </CTALink>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-navy-900">
                  Part 61 school
                </span>
                <span className="rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-navy-900">
                  PA28 fleet
                </span>
                <span className="rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-navy-900">
                  RNO
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="cream" id="whats-included">
        <Container>
          <h2 className="font-heading text-3xl text-navy-900 md:text-4xl">
            What’s included
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHAT_IS_INCLUDED.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-navy-800/10 bg-white p-5 shadow-sm"
              >
                <h3 className="font-heading text-xl text-navy-900">{item.label}</h3>
                <p className="mt-2 text-ink-light">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="white" id="booking-widget">
        <Container>
          <h2 className="font-heading text-3xl text-navy-900 md:text-4xl">
            Book your flight
          </h2>
          <p className="mt-2 max-w-2xl text-ink-light">
            Choose your flight type, pick a date and time, enter your details,
            and pay online. Most visitors complete a booking in under a minute.
          </p>
          <div className="mt-8 max-w-4xl">
            <Suspense fallback={<BookingSkeleton />}>
              <BookingWidget />
            </Suspense>
          </div>
        </Container>
      </Section>

      <Section background="navy" id="why-hornbill">
        <Container>
          <h2 className="font-heading text-3xl text-white md:text-4xl">
            Why train with Hornbill Aviation?
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_HORNBILL.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <h3 className="font-heading text-xl text-gold-400">{item.label}</h3>
                <p className="mt-2 text-cream-50/90">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <PhoneLink className="text-gold-400 hover:text-gold-500" />
          </div>
        </Container>
      </Section>

      <Section background="cream" id="faq">
        <Container>
          <h2 className="font-heading text-3xl text-navy-900 md:text-4xl">
            Frequently asked questions
          </h2>
          <div className="mt-8 max-w-3xl">
            <FAQAccordion faqs={DISCOVERY_FAQ} />
          </div>
          <p className="mt-6 text-sm text-ink-light">
            Still have questions?{" "}
            <Link
              href="/cancellation-policy/"
              className="font-medium text-navy-900 hover:text-gold-500 hover:underline"
            >
              Read our cancellation and weather policy
            </Link>
            {" "}or call us.
          </p>
        </Container>
      </Section>
    </>
  );
}
