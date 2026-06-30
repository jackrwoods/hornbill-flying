import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { privatePilotProgram } from "@/content/programs/private-pilot";

export function PrivatePilotRequirementsSection() {
  const { requirements } = privatePilotProgram;

  return (
    <Section background="card" id="requirements">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-heading">
          {requirements.title}
        </h2>
        <p className="mt-4 max-w-3xl text-muted">{requirements.intro}</p>

        <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">
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
                  <td className="px-6 py-4 text-muted">{row.minimum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 rounded-lg bg-callout p-4 text-body">
          {requirements.note}
        </p>
      </Container>
    </Section>
  );
}
