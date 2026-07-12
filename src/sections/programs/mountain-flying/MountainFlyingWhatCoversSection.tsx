import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { mountainFlyingProgram } from "@/content/programs/mountain-flying";

export function MountainFlyingWhatCoversSection() {
  const { whatCourseCovers } = mountainFlyingProgram;

  return (
    <Section background="default" id="what-the-course-covers">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal variant="glide">
            <p className="panel-label-lg text-accent mb-4">What the course covers</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
              {whatCourseCovers.title}
            </h2>
            <p className="mt-4 text-muted leading-relaxed text-pretty">
              {whatCourseCovers.intro}
            </p>
          </Reveal>

          <Reveal variant="glide">
            <ul className="space-y-6">
              {whatCourseCovers.items.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span
                    className="mt-2 flex h-2 w-2 flex-shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-heading text-xl font-extrabold text-heading">
                      {item.label}
                    </h3>
                    <p className="mt-1 text-muted text-pretty">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}