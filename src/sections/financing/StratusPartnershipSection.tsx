import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { CTALink } from "@/components/CTALink";
import { financingContent } from "@/content/financing";

export function StratusPartnershipSection() {
  const { stratus, links } = financingContent;

  return (
    <Section background="cream" id="stratus">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          Financing through {stratus.name}
        </h2>
        <p className="mt-4 max-w-3xl text-ink-light">{stratus.description}</p>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {stratus.howItWorks.map((step) => (
            <li key={step} className="flex items-start gap-3">
              <span className="mt-1 flex h-2 w-2 flex-shrink-0 rounded-full bg-gold-500" />
              <span className="text-ink">{step}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-3xl text-ink-light">{stratus.requirements}</p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={links.stratus}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-gold-500 px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:ring-offset-2"
            data-analytics="stratus_financing_click"
          >
            See Stratus financing options
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
              className="ml-2"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
          <CTALink href={links.fleet} variant="tertiary">
            See training costs
          </CTALink>
        </div>
      </Container>
    </Section>
  );
}
