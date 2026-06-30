import { AssetImage as Image } from "@/components/AssetImage";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { cfiProgram } from "@/content/programs/cfi";

export function CFIWhatYouLearnSection() {
  return (
    <Section background="default" id="what-you-learn">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-heading">
          {cfiProgram.whatYouLearn.title}
        </h2>
        <p className="mt-4 max-w-3xl text-muted">
          {cfiProgram.whatYouLearn.intro}
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {cfiProgram.whatYouLearn.items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border-t-4 border-accent bg-white p-6"
            >
              <h3 className="font-heading text-xl text-heading">
                {item.title}
              </h3>
              <p className="mt-2 text-muted">{item.description}</p>
            </div>
          ))}
        </div>

        <figure className="mt-10 overflow-hidden rounded-xl bg-white shadow-sm">
          <Image
            src="/images/programs/cfi-instructor-pa28.webp"
            alt="CFI candidate and instructor reviewing a sectional chart on a tablet in a PA28 cockpit at Reno-Tahoe International Airport"
            width={870}
            height={653}
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, 870px"
          />
          <figcaption className="px-5 py-3 text-sm text-muted">
            Lesson planning in the PA28 at RNO — consistent avionics mean you
            spend less time relearning the panel and more time learning to teach.
          </figcaption>
        </figure>

        <p className="mt-6 text-muted">
          After your initial CFI, you can add instrument instruction with our{" "}
          <Link
            href="/programs/cfii/"
            className="font-semibold text-accent hover:text-on-dark-accent-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
          >
            CFII add-on
          </Link>{" "}
          program.
        </p>
      </Container>
    </Section>
  );
}
