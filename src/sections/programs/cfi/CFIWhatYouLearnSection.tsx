import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SunsetPlaceholder } from "@/components/SunsetPlaceholder";
import { cfiProgram } from "@/content/programs/cfi";

export function CFIWhatYouLearnSection() {
  return (
    <Section background="default" id="what-you-learn">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">What you learn</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
            {cfiProgram.whatYouLearn.title}
          </h2>
          <p className="mt-4 text-muted text-pretty">
            {cfiProgram.whatYouLearn.intro}
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {cfiProgram.whatYouLearn.items.map((item) => (
            <Reveal
              key={item.title}
              variant="glide"
              className="card-cinematic p-6 flex flex-col"
            >
              <h3 className="font-heading text-xl font-extrabold text-heading">
                {item.title}
              </h3>
              <p className="mt-2 text-muted text-pretty">{item.description}</p>
            </Reveal>
          ))}
        </div>

        <Reveal
          variant="horizon"
          className="mt-10 card-cinematic overflow-hidden flex flex-col"
        >
          <SunsetPlaceholder
            variant="default"
            label="CFI candidate reviewing a sectional chart — photography coming"
            className="aspect-[4/3] w-full"
          />
          <figcaption className="px-5 py-3 text-sm text-muted text-pretty">
            Lesson planning in the PA28 at RNO — consistent avionics mean you
            spend less time relearning the panel and more time learning to teach.
          </figcaption>
        </Reveal>

        <Reveal variant="glide" className="mt-6 text-muted">
          After your initial CFI, you can add instrument instruction with our{" "}
          <Link
            href="/programs/cfii/"
            className="beak-flash font-semibold text-accent"
          >
            CFII add-on
          </Link>{" "}
          program.
        </Reveal>
      </Container>
    </Section>
  );
}