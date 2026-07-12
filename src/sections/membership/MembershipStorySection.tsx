import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { membershipContent } from "@/content/membership";

export function MembershipStorySection() {
  const { story } = membershipContent;

  return (
    <Section background="default" id="story">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Story</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
            {story.title}
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-muted leading-relaxed text-pretty">
            {story.lede}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {story.blocks.map((block) => (
            <Reveal key={block.label} variant="glide" className="card-cinematic p-6 flex flex-col">
              <p className="panel-label text-accent">{block.label}</p>
              <p className="mt-3 text-body leading-relaxed text-pretty">{block.body}</p>
              {block.summary && (
                <p className="mt-3 text-body leading-relaxed text-pretty">
                  {block.summary}
                </p>
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}