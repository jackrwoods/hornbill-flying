import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { instrumentRatingProgram } from "@/content/programs/instrument-rating";

export function InstrumentRatingExperienceSection() {
  const { experience } = instrumentRatingProgram;

  return (
    <Section background="callout" id="experience">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Experience</p>
          <h2 className="font-heading text-3xl md:text-4xl text-heading text-balance">
            {experience.title}
          </h2>
          <p className="mt-4 text-muted text-pretty">{experience.intro}</p>
        </Reveal>

        <Reveal variant="glide" className="mt-8 card-cinematic overflow-hidden">
          <table className="w-full text-left">
            <tbody className="divide-y divide-border-subtle">
              {experience.rows.map((row) => (
                <tr key={row.label}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-body font-medium text-body"
                  >
                    {row.label}
                  </th>
                  <td className="nums px-6 py-4 text-right text-heading">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <p className="mt-6 text-sm text-muted">{experience.note}</p>
      </Container>
    </Section>
  );
}