import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";

export function ContactFormSection() {
  return (
    <Section background="white" id="send-message">
      <Container>
        <div className="mx-auto max-w-2xl">
          <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
            Send us a message
          </h2>
          <p className="mt-4 text-ink-light">
            Have a question about training, memberships, or rentals? Fill out the
            form and we will reply within one business day.
          </p>

          <div className="mt-8 rounded-xl border border-navy-800/10 bg-sand-50 p-6 md:p-8">
            <ContactForm />
          </div>

          <p className="mt-4 text-sm text-ink-light">
            We only use this information to respond to your question.
          </p>
        </div>
      </Container>
    </Section>
  );
}
