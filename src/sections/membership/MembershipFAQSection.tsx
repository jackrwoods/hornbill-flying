import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { FAQAccordion } from "@/components/FAQAccordion";
import { membershipContent, membershipFAQs } from "@/content/membership";

export function MembershipFAQSection() {
  return (
    <Section background="default" id="faq">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">FAQ</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
            {membershipContent.faqTitle}
          </h2>
        </Reveal>
        <Reveal variant="glide" className="mt-8 max-w-3xl">
          <FAQAccordion faqs={membershipFAQs} />
        </Reveal>
      </Container>
    </Section>
  );
}