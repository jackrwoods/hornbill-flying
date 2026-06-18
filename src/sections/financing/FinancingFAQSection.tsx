import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { FAQAccordion } from "@/components/FAQAccordion";
import { financingContent, financingFAQs } from "@/content/financing";

export function FinancingFAQSection() {
  return (
    <Section background="cream" id="faq">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          {financingContent.faqTitle || "Financing questions"}
        </h2>
        <div className="mt-8 max-w-3xl">
          <FAQAccordion faqs={financingFAQs} />
        </div>
      </Container>
    </Section>
  );
}
