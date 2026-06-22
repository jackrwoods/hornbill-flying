import { AssetImage as Image } from "@/components/AssetImage";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { cfiProgram } from "@/content/programs/cfi";

export function CFIWhatYouLearnSection() {
  return (
    <Section background="cream" id="what-you-learn">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          {cfiProgram.whatYouLearn.title}
        </h2>
        <p className="mt-4 max-w-3xl text-ink-light">
          {cfiProgram.whatYouLearn.intro}
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {cfiProgram.whatYouLearn.items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border-t-4 border-gold-500 bg-white p-6"
            >
              <h3 className="font-heading text-xl text-navy-900">
                {item.title}
              </h3>
              <p className="mt-2 text-ink-light">{item.description}</p>
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
          <figcaption className="px-5 py-3 text-sm text-ink-light">
            Lesson planning in the PA28 at RNO — consistent avionics mean you
            spend less time relearning the panel and more time learning to teach.
          </figcaption>
        </figure>

        <p className="mt-6 text-ink-light">
          After your initial CFI, you can add instrument instruction with our{" "}
          <Link
            href="/programs/cfii/"
            className="font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
          >
            CFII add-on
          </Link>{" "}
          program.
        </p>
      </Container>
    </Section>
  );
}
