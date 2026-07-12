import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { privatePilotProgram } from "@/content/programs/private-pilot";

export function PrivatePilotRequirementsSection() {
  const { requirements } = privatePilotProgram;

  return (
    <Section background="card" id="requirements">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Requirements</p>
          <h2 className="font-heading text-3xl md:text-4xl text-heading text-balance">
            {requirements.title}
          </h2>
          <p className="mt-4 text-muted text-pretty">{requirements.intro}</p>
        </Reveal>

        <Reveal variant="glide" className="mt-8 card-cinematic overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-bg">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 text-left font-heading text-lg text-heading"
                >
                  Requirement
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left font-heading text-lg text-heading"
                >
                  FAA minimum
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {requirements.rows.map((row) => (
                <tr key={row.requirement}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-body font-medium text-body"
                  >
                    {row.requirement}
                  </th>
                  <td className="px-6 py-4 text-muted nums">{row.minimum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <p className="mt-6 rounded-lg bg-callout p-4 text-body">
          {requirements.note}
        </p>
      </Container>
    </Section>
  );
}