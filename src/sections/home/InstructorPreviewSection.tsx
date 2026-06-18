import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { InstructorPreviewCard } from "@/components/InstructorPreviewCard";
import { instructors } from "@/content/instructors";

export function InstructorPreviewSection() {
  return (
    <Section background="white">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-center text-navy-900">
          Meet your instructors
        </h2>
        <p className="mt-4 mx-auto max-w-2xl text-center text-ink-light">
          Choose the CFI whose schedule and style fit you. All four teach in the
          same PA28 fleet you will train in.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {instructors.map((instructor) => (
            <InstructorPreviewCard key={instructor.slug} instructor={instructor} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/instructors/"
            className="inline-block text-sm font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
          >
            Meet all instructors
          </Link>
        </div>
      </Container>
    </Section>
  );
}
