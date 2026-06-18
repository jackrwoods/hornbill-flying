import Link from "next/link";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { financingContent } from "@/content/financing";

export function PaymentExpectationsSection() {
  const { paymentExpectations, links } = financingContent;

  return (
    <Section background="cream" id="payments">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          {paymentExpectations.title}
        </h2>
        <p className="mt-4 max-w-3xl text-ink-light">{paymentExpectations.intro}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {paymentExpectations.items.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-navy-800/10 bg-white p-5 shadow-sm"
            >
              <h3 className="font-heading text-xl text-navy-900">{item.label}</h3>
              <p className="mt-2 text-ink-light">
                {item.label === "Cancellation policy" ? (
                  <>
                    {item.description.replace(" See our full cancellation and refund policy for details.", "")}
                    {" "}
                    <Link
                      href={links.cancellationPolicy}
                      className="font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
                    >
                      See our full cancellation and refund policy.
                    </Link>
                  </>
                ) : (
                  item.description
                )}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-sm text-ink-light">
          {paymentExpectations.disclaimer}
        </p>
      </Container>
    </Section>
  );
}
