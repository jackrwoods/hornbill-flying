import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { FAQAccordion } from "@/components/FAQAccordion";
import { membershipContent, membershipFAQs } from "@/content/membership";

export function MembershipFAQSection() {
  return (
    <Section background="default" id="faq">
      <Container>
        <h2 className="font-heading text-3xl text-heading md:text-4xl">
          {membershipContent.faqTitle}
        </h2>
        <div className="mt-8 max-w-3xl">
          <FAQAccordion faqs={membershipFAQs} />
        </div>
      </Container>
    </Section>
  );
}
