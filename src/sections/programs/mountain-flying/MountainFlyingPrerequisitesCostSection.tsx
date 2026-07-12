import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { mountainFlyingProgram } from "@/content/programs/mountain-flying";

export function MountainFlyingPrerequisitesCostSection() {
  const { prerequisitesDurationCost } = mountainFlyingProgram;

  return (
    <Section background="default" id="prerequisites-duration-cost">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Prerequisites &amp; cost</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
            {prerequisitesDurationCost.title}
          </h2>
          <p className="mt-4 text-muted text-pretty">
            {prerequisitesDurationCost.intro}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal variant="glide" className="card-cinematic p-6 md:p-8">
            <h3 className="font-heading text-xl font-extrabold text-heading">
              {prerequisitesDurationCost.prerequisites.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {prerequisitesDurationCost.prerequisites.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span
                    className="mt-1 flex h-2 w-2 flex-shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  <span className="text-muted text-pretty">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal variant="glide" className="card-cinematic p-6 md:p-8">
            <h3 className="font-heading text-xl font-extrabold text-heading">
              {prerequisitesDurationCost.duration.title}
            </h3>
            <p className="mt-4 text-muted text-pretty">
              {prerequisitesDurationCost.duration.description}
            </p>
          </Reveal>
        </div>

        <div className="mt-12">
          <Reveal variant="glide">
            <h3 className="font-heading text-2xl font-extrabold text-heading">
              {prerequisitesDurationCost.cost.title}
            </h3>
            <p className="mt-2 max-w-3xl text-muted text-pretty">
              {prerequisitesDurationCost.cost.description}
            </p>
          </Reveal>

          <Reveal variant="glide" className="mt-6 card-cinematic overflow-hidden">
            <table className="w-full text-left">
              <tbody className="divide-y divide-border-subtle">
                {prerequisitesDurationCost.cost.rows.map((row) => (
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
              <tfoot className="bg-bg">
                <tr>
                  <th
                    scope="row"
                    className="px-6 py-4 font-heading text-lg text-heading"
                  >
                    Typical total — member
                  </th>
                  <td className="nums px-6 py-4 text-right font-heading text-2xl text-heading">
                    {prerequisitesDurationCost.cost.memberTotal}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="px-6 py-4 font-heading text-lg text-heading"
                  >
                    Typical total — non-member
                  </th>
                  <td className="nums px-6 py-4 text-right font-heading text-2xl text-heading">
                    {prerequisitesDurationCost.cost.nonMemberTotal}
                  </td>
                </tr>
              </tfoot>
            </table>
          </Reveal>

          <p className="mt-4 text-sm text-muted text-pretty">
            {prerequisitesDurationCost.cost.note}
          </p>
          <Reveal variant="glide" className="mt-4 flex flex-wrap gap-4">
            {prerequisitesDurationCost.cost.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="beak-flash text-sm font-semibold text-accent"
              >
                {link.label}
              </Link>
            ))}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}