import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { PhoneLink } from "@/components/PhoneLink";
import { BookingStepper } from "./BookingStepper";
import {
  CANCELLATION_WEATHER_POLICY,
  WHAT_TO_EXPECT_ITEMS,
  RELATED_PROGRAM_LINKS,
} from "@/content/booking";
import type { BookingStepDefinition } from "@/types/booking";

interface BookingShellProps {
  title: string;
  subtitle?: string;
  steps?: BookingStepDefinition[];
  currentStepIndex?: number;
  children: React.ReactNode;
}

/**
 * Page-level wrapper for the booking flow: page header, sticky stepper,
 * main content area, and a help / trust sidebar.
 */
export function BookingShell({
  title,
  subtitle,
  steps,
  currentStepIndex,
  children,
}: BookingShellProps) {
  return (
    <>
      <PageHeader
        title={title}
        subtitle={subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Book" },
        ]}
      />
      {steps && currentStepIndex !== undefined && (
        <BookingStepper steps={steps} currentIndex={currentStepIndex} />
      )}
      <Section background="default">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
            <div className="min-w-0">
              {children}
            </div>
            <aside className="space-y-6 lg:sticky lg:top-[10rem]">
              <div className="rounded-xl border border-border-subtle bg-white p-5 shadow-sm">
                <h2 className="font-heading text-xl text-heading">Questions?</h2>
                <p className="mt-2 text-sm text-muted">
                  Call or text us and we will get you scheduled.
                </p>
                <div className="mt-4">
                  <PhoneLink className="text-heading hover:text-accent" />
                </div>
              </div>

              <div className="rounded-xl border border-border-subtle bg-white p-5 shadow-sm">
                <h2 className="font-heading text-xl text-heading">
                  Cancellation &amp; weather
                </h2>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {CANCELLATION_WEATHER_POLICY}
                </p>
              </div>

              <div className="rounded-xl border border-border-subtle bg-white p-5 shadow-sm">
                <h2 className="font-heading text-xl text-heading">What to expect</h2>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {WHAT_TO_EXPECT_ITEMS.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-border-subtle bg-white p-5 shadow-sm">
                <h2 className="font-heading text-xl text-heading">Related programs</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {RELATED_PROGRAM_LINKS.map((link) => (
                    <li key={link.slug}>
                      <a
                        href={link.href}
                        className="font-medium text-heading hover:text-accent hover:underline"
                      >
                        {link.label}
                      </a>
                      <p className="text-muted">{link.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
