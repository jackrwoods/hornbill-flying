import { Container } from "./Container";
import { CTALink } from "./CTALink";
import { homepageDiscoveryTeaser } from "@/content/homepage";

export function DiscoveryFlightTeaser({ className }: { className?: string }) {
  return (
    <Container className={className}>
      <div className="rounded-2xl bg-dark px-6 py-12 text-center text-on-dark md:px-12 md:py-16">
        <h2 className="font-heading text-3xl md:text-4xl">
          {homepageDiscoveryTeaser.headline}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-on-dark">
          {homepageDiscoveryTeaser.subtext}
        </p>

        <ul className="mx-auto mt-8 flex max-w-2xl flex-col items-center justify-center gap-3 text-on-dark sm:flex-row">
          {homepageDiscoveryTeaser.bullets.map((bullet) => (
            <li key={bullet} className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0 text-on-dark-accent"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {bullet}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <CTALink
            href="/discovery-flight/"
            variant="secondary"
            analytics="discovery_flight_booking_started"
          >
            {homepageDiscoveryTeaser.cta}
          </CTALink>
          <CTALink
            href="/discovery-flight/"
            query={homepageDiscoveryTeaser.secondaryQuery}
            variant="tertiary"
            className="text-on-dark hover:bg-on-dark-subtle"
            analytics="discovery_flight_gift_voucher_started"
          >
            {homepageDiscoveryTeaser.secondaryCta}
          </CTALink>
        </div>
      </div>
    </Container>
  );
}
