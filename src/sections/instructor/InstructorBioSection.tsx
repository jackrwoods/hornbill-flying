import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import type { Instructor } from "@/types";

interface InstructorBioSectionProps {
  instructor: Instructor;
}

export function InstructorBioSection({ instructor }: InstructorBioSectionProps) {
  const paragraphs = instructor.bio.split("\n\n");

  return (
    <Section background="default" id="bio">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Bio</p>
          <h2 className="font-heading text-3xl md:text-4xl text-heading">
            About {instructor.name.split(" ")[0]}
          </h2>
          <div className="mt-6 prose-cinematic">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}