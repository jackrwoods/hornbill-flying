import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { instrumentRatingProgram } from "@/content/programs/instrument-rating";

export function InstrumentRatingExperienceSection() {
  const { experience } = instrumentRatingProgram;

  return (
    <Section background="teal" id="experience">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          {experience.title}
        </h2>
        <p className="mt-4 max-w-3xl text-ink-light">{experience.intro}</p>

        <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">
          <table className="w-full text-left">
            <tbody className="divide-y divide-navy-800/10">
              {experience.rows.map((row) => (
                <tr key={row.label}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-body font-medium text-ink"
                  >
                    {row.label}
                  </th>
                  <td className="px-6 py-4 text-right font-mono text-navy-900">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm text-ink-light">{experience.note}</p>
      </Container>
    </Section>
  );
}
