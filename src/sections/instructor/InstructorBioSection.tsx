import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import type { Instructor } from "@/types";

interface InstructorBioSectionProps {
  instructor: Instructor;
}

export function InstructorBioSection({ instructor }: InstructorBioSectionProps) {
  const paragraphs = instructor.bio.split("\n\n");

  return (
    <Section background="default" id="bio">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-heading">
          About {instructor.name.split(" ")[0]}
        </h2>
        <div className="mt-6 max-w-3xl space-y-5 text-body leading-relaxed">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </Section>
  );
}
