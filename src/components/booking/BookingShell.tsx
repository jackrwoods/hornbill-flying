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
      <Section background="cream">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
            <div className="min-w-0">
              {children}
            </div>
            <aside className="space-y-6 lg:sticky lg:top-[10rem]">
              <div className="rounded-xl border border-navy-800/10 bg-white p-5 shadow-sm">
                <h2 className="font-heading text-xl text-navy-900">Questions?</h2>
                <p className="mt-2 text-sm text-ink-light">
                  Call or text us and we will get you scheduled.
                </p>
                <div className="mt-4">
                  <PhoneLink className="text-navy-900 hover:text-gold-500" />
                </div>
              </div>

              <div className="rounded-xl border border-navy-800/10 bg-white p-5 shadow-sm">
                <h2 className="font-heading text-xl text-navy-900">
                  Cancellation &amp; weather
                </h2>
                <p className="mt-2 text-sm text-ink-light leading-relaxed">
                  {CANCELLATION_WEATHER_POLICY}
                </p>
              </div>

              <div className="rounded-xl border border-navy-800/10 bg-white p-5 shadow-sm">
                <h2 className="font-heading text-xl text-navy-900">What to expect</h2>
                <ul className="mt-3 space-y-2 text-sm text-ink-light">
                  {WHAT_TO_EXPECT_ITEMS.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-navy-800/10 bg-white p-5 shadow-sm">
                <h2 className="font-heading text-xl text-navy-900">Related programs</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {RELATED_PROGRAM_LINKS.map((link) => (
                    <li key={link.slug}>
                      <a
                        href={link.href}
                        className="font-medium text-navy-900 hover:text-gold-500 hover:underline"
                      >
                        {link.label}
                      </a>
                      <p className="text-ink-light">{link.description}</p>
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
