import Link from "next/link";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { membershipRates } from "@/content/fleet";
import { memberRateBillingNote } from "@/content/pricing";

export function MembershipComparisonSection() {
  const {
    monthly,
    memberRate,
    nonMemberRate,
    savingsPerHour,
    breakEvenHours,
  } = membershipRates;

  return (
    <Section background="default" id="membership">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-heading">
          Membership vs non-member rates
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Transparent pricing. One membership lowers every PA28 wet rate.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border-t-4 border-accent bg-white p-6 shadow-sm">
            <p className="font-mono text-xs uppercase tracking-wide text-muted">
              Member
            </p>
            <p className="mt-2 font-heading text-4xl text-heading">
              ${memberRate}
              <span className="text-lg font-body text-muted">/hr wet</span>
            </p>
            <p className="mt-1 text-sm text-muted">
              ${monthly}/month · students and renters who fly regularly
            </p>
            <p className="mt-3 text-sm text-muted">{memberRateBillingNote}</p>
            <p className="mt-4 text-sm font-semibold text-success">
              Save ${savingsPerHour}/hr. At about {breakEvenHours} hours per month,
              membership pays for itself.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="font-mono text-xs uppercase tracking-wide text-muted">
              Non-member
            </p>
            <p className="mt-2 font-heading text-4xl text-heading">
              ${nonMemberRate}
              <span className="text-lg font-body text-muted">/hr wet</span>
            </p>
            <p className="mt-1 text-sm text-muted">
              No monthly fee · occasional renters or visitors
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/membership/"
            className="inline-flex items-center text-sm font-semibold text-accent hover:text-on-dark-accent-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
            data-analytics="membership_signup_started"
          >
            See membership details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="ml-1"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
