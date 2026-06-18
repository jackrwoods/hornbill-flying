import Link from "next/link";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { financing } from "@/content/fleet";

export function FinancingOptionsSection() {
  return (
    <Section background="white" id="financing">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          Financing your training
        </h2>
        <p className="mt-4 max-w-2xl text-ink-light">{financing.description}</p>
        <div className="mt-8">
          <Link
            href={financing.pageUrl}
            className="inline-flex items-center text-sm font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
          >
            Financing options
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
