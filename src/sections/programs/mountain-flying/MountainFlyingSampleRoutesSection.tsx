import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { mountainFlyingProgram } from "@/content/programs/mountain-flying";

export function MountainFlyingSampleRoutesSection() {
  const { sampleRoutes } = mountainFlyingProgram;

  return (
    <Section background="white" id="sample-routes">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          {sampleRoutes.title}
        </h2>
        <p className="mt-4 max-w-3xl text-ink-light">
          {sampleRoutes.intro}
        </p>

        <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-cream-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 font-body text-sm font-semibold uppercase tracking-wide text-ink-light"
                >
                  Route
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-body text-sm font-semibold uppercase tracking-wide text-ink-light"
                >
                  Distance
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-body text-sm font-semibold uppercase tracking-wide text-ink-light"
                >
                  What it teaches
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800/10">
              {sampleRoutes.routes.map((route) => (
                <tr key={route.code}>
                  <th
                    scope="row"
                    className="px-6 py-4 align-top font-mono text-navy-900"
                  >
                    {route.code}
                    <span className="ml-2 block font-body text-sm font-normal text-ink-light">
                      {route.name}
                    </span>
                  </th>
                  <td className="px-6 py-4 align-top font-mono text-ink">
                    {route.distance}
                  </td>
                  <td className="px-6 py-4 align-top text-ink-light">
                    {route.focus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm text-ink-light">
          {sampleRoutes.disclaimer}
        </p>
      </Container>
    </Section>
  );
}
