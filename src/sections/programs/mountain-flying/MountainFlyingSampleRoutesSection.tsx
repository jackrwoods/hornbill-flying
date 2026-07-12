import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { mountainFlyingProgram } from "@/content/programs/mountain-flying";

export function MountainFlyingSampleRoutesSection() {
  const { sampleRoutes } = mountainFlyingProgram;

  return (
    <Section background="card" id="sample-routes">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Sample routes</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
            {sampleRoutes.title}
          </h2>
          <p className="mt-4 text-muted text-pretty">{sampleRoutes.intro}</p>
        </Reveal>

        <Reveal variant="glide" className="mt-10 card-cinematic overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-bg">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 panel-label text-muted"
                >
                  Route
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 panel-label text-muted"
                >
                  Distance
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 panel-label text-muted"
                >
                  What it teaches
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {sampleRoutes.routes.map((route) => (
                <tr key={route.code}>
                  <th
                    scope="row"
                    className="nums px-6 py-4 align-top text-heading"
                  >
                    {route.code}
                    <span className="ml-2 block font-body text-sm font-normal text-muted">
                      {route.name}
                    </span>
                  </th>
                  <td className="nums px-6 py-4 align-top text-body">
                    {route.distance}
                  </td>
                  <td className="px-6 py-4 align-top text-muted text-pretty">
                    {route.focus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <p className="mt-4 text-sm text-muted text-pretty">
          {sampleRoutes.disclaimer}
        </p>
      </Container>
    </Section>
  );
}