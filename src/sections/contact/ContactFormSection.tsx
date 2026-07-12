import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";

export function ContactFormSection() {
  return (
    <Section background="card" id="send-message">
      <Container>
        <Reveal variant="glide" className="mx-auto max-w-2xl">
          <p className="panel-label-lg text-accent mb-4">Message</p>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-heading text-balance">
            Send us a message
          </h2>
          <p className="mt-4 text-muted text-pretty">
            Have a question about training, memberships, or rentals? Fill out the
            form and we will reply within one business day.
          </p>

          <div className="card-cinematic mt-8 p-6 md:p-8">
            <ContactForm />
          </div>

          <p className="mt-4 text-sm text-muted">
            We only use this information to respond to your question.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}