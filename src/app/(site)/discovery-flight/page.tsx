import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SunsetPlaceholder } from "@/components/SunsetPlaceholder";
import { Reveal } from "@/components/Reveal";
import { FAQAccordion } from "@/components/FAQAccordion";
import { SchemaInjector } from "@/components/SchemaInjector";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { BookingSkeleton } from "@/components/booking/BookingSkeleton";
import { CTALink } from "@/components/CTALink";
import { PhoneLink } from "@/components/PhoneLink";
import { cn } from "@/lib/utils";
import { siteFacts } from "@/content/siteFacts";
import { buildTitle, buildCanonical, buildOpenGraph, buildTwitter } from "@/lib/seo";
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
  "Book a $199 discovery flight at Reno–Tahoe (RNO). You sit in the left seat and fly. No deposit. Under 60 seconds to book.";

export const metadata: Metadata = {
  title: buildTitle(TITLE),
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
];

function PoeticLine({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-display text-2xl md:text-3xl lg:text-4xl leading-snug text-on-immersive text-balance max-w-3xl ${className}`}>
      {children}
    </p>
  );
}

function StoryBeat({
  eyebrow,
  variant = "home",
  scrim = "bottom",
  placeholderLabel,
  className,
  children,
}: {
  eyebrow: string;
  variant?: "default" | "vertical" | "soft" | "dawn" | "home";
  scrim?: "bottom" | "left" | "none";
  placeholderLabel?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("relative story-hero-viewport overflow-hidden bg-immersive-bg text-on-immersive", className)}>
      <div className="absolute inset-0 z-0">
        <SunsetPlaceholder
          variant={variant}
          label={placeholderLabel}
          vignette
          grain
          className="scrub-runway-recede h-full w-full"
        />
        <div
          className={
            scrim === "bottom"
              ? "absolute inset-0 bg-panel-scrim-bottom"
              : scrim === "left"
                ? "absolute inset-0 bg-panel-scrim-left"
                : ""
          }
        />
      </div>
      <Container className="relative z-10 flex h-full items-end pb-20 md:pb-28">
        <Reveal variant="stagger" className="max-w-2xl">
          <p className="panel-label-lg text-immersive-accent mb-5">{eyebrow}</p>
          {children}
        </Reveal>
      </Container>
    </section>
  );
}

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

      {/* Beat 1 — Pre-flight */}
      <StoryBeat
        eyebrow="Beat 01 · Pre-flight"
        scrim="left"
        placeholderLabel="Instructor and student on the ramp — photography coming"
        className="-mt-16 lg:-mt-18"
      >
        <h1 className="font-heading font-extrabold leading-[1.05] text-4xl sm:text-5xl md:text-6xl text-on-immersive text-balance">
          Your first lesson is a discovery flight.
        </h1>
        <PoeticLine className="mt-8">
          You meet your instructor at the airplane. You walk around it together.
        </PoeticLine>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="#booking"
            className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            data-analytics="discovery_flight_booking_started"
          >
            Book a discovery flight — {siteFacts.discoveryPrice}
          </a>
          <CTALink
            href="/discovery-flight/"
            query={{ type: "gift" }}
            variant="tertiary"
            analytics="discovery_flight_gift_voucher_started"
            className="border-on-immersive/40 text-on-immersive hover:bg-on-dark-subtle"
          >
            Buy as a gift
          </CTALink>
        </div>
      </StoryBeat>

      {/* Beat 2 — Walk-around */}
      <StoryBeat
        eyebrow="Beat 02 · Walk-around"
        placeholderLabel="Fuel sump, tire, prop — photography coming"
      >
        <PoeticLine>
          You check the fuel. You check the oil. You look at everything.
        </PoeticLine>
      </StoryBeat>

      {/* Beat 3 — Left seat */}
      <StoryBeat
        eyebrow="Beat 03 · Left seat"
        scrim="left"
        placeholderLabel="Left seat, panel lit — photography coming"
      >
        <PoeticLine>
          You sit in the left seat. Your instructor sits to your right.
        </PoeticLine>
      </StoryBeat>

      {/* Beat 4 — You fly */}
      <StoryBeat
        eyebrow="Beat 04 · You fly"
        placeholderLabel="Aerial over the Sierra, golden hour — photography coming"
      >
        <PoeticLine>
          You push the throttle in. You rotate. You fly.
        </PoeticLine>
      </StoryBeat>

      {/* Beat 5 — Book (grounded, booking widget) */}
      <section
        id="booking"
        className="bg-bg text-body py-20 md:py-28 scroll-mt-32"
      >
        <Container>
          <Reveal variant="glide" className="max-w-3xl">
            <p className="panel-label-lg text-accent mb-4">Beat 05 · Book</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
              Discovery flight — {siteFacts.discoveryPrice}. About 60 minutes. No deposit. Pick a day.
            </h2>
            <p className="mt-4 text-muted text-pretty max-w-2xl">
              Choose your flight type, pick a date and time, enter your details,
              and pay online. Most visitors complete a booking in under a minute.
            </p>
          </Reveal>
          <div className="mt-10 max-w-4xl">
            <Suspense fallback={<BookingSkeleton />}>
              <BookingWidget />
            </Suspense>
          </div>
        </Container>
      </section>

      {/* FAQ (grounded) */}
      <section className="bg-card text-body py-20 md:py-28 border-t border-border-subtle">
        <Container>
          <Reveal variant="glide" className="max-w-3xl">
            <p className="panel-label-lg text-accent mb-4">Questions</p>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-heading">
              Frequently asked questions
            </h2>
          </Reveal>
          <div className="mt-10 max-w-3xl">
            <FAQAccordion faqs={DISCOVERY_FAQ} />
          </div>
          <p className="mt-8 text-sm text-muted">
            Still have questions?{" "}
            <Link
              href="/cancellation-policy/"
              className="beak-flash font-medium text-heading"
            >
              Read our cancellation and weather policy
            </Link>{" "}
            or call us.
          </p>
          <div className="mt-6">
            <PhoneLink className="text-heading" />
          </div>
        </Container>
      </section>
    </>
  );
}