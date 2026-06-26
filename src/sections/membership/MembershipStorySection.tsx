import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { membershipContent } from "@/content/membership";

export function MembershipStorySection() {
  const { story } = membershipContent;

  return (
    <Section background="cream" id="story">
      <Container>
        <h2 className="font-heading text-3xl text-navy-900 md:text-4xl">
          {story.title}
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-ink-light leading-relaxed">
          {story.lede}
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {story.blocks.map((block) => (
            <div
              key={block.label}
              className="rounded-xl border border-navy-800/10 bg-white p-6"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
                {block.label}
              </p>
              <p className="mt-3 text-ink leading-relaxed">{block.body}</p>
              {block.summary && (
                <p className="mt-3 text-ink leading-relaxed">{block.summary}</p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}