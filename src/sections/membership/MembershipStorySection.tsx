import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { membershipContent } from "@/content/membership";

export function MembershipStorySection() {
  const { story } = membershipContent;

  return (
    <Section background="default" id="story">
      <Container>
        <h2 className="font-heading text-3xl text-heading md:text-4xl">
          {story.title}
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-muted leading-relaxed">
          {story.lede}
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {story.blocks.map((block) => (
            <div
              key={block.label}
              className="rounded-xl border border-border-subtle bg-white p-6"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                {block.label}
              </p>
              <p className="mt-3 text-body leading-relaxed">{block.body}</p>
              {block.summary && (
                <p className="mt-3 text-body leading-relaxed">{block.summary}</p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}