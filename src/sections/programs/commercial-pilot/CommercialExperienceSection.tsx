import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { commercialPilotProgram } from "@/content/programs/commercial-pilot";

export function CommercialExperienceSection() {
  const { experience } = commercialPilotProgram;

  return (
    <Section background="callout" id="experience">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-heading">
          {experience.title}
        </h2>
        <p className="mt-4 max-w-3xl text-muted">{experience.intro}</p>

        <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">
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
                  <td className="px-6 py-4 text-right font-mono text-heading">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm text-muted">{experience.note}</p>
      </Container>
    </Section>
  );
}
