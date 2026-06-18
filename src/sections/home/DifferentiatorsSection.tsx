import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { homepageDifferentiators } from "@/content/homepage";

export function DifferentiatorsSection() {
  return (
    <Section background="cream">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-center text-navy-900">
          What makes Hornbill different
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {homepageDifferentiators.map((item) => (
            <div
              key={item.id}
              className="rounded-xl bg-white p-6 shadow-sm border-t-4 border-gold-500"
            >
              <h3 className="font-heading text-2xl text-navy-900">
                {item.title}
              </h3>
              <p className="mt-3 text-ink-light">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
