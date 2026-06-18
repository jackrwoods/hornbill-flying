import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { mountainFlyingProgram } from "@/content/programs/mountain-flying";

export function MountainFlyingPrerequisitesCostSection() {
  const { prerequisitesDurationCost } = mountainFlyingProgram;

  return (
    <Section background="cream" id="prerequisites-duration-cost">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          {prerequisitesDurationCost.title}
        </h2>
        <p className="mt-4 max-w-3xl text-ink-light">
          {prerequisitesDurationCost.intro}
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl border-t-4 border-gold-500 bg-white p-6 shadow-sm md:p-8">
            <h3 className="font-heading text-xl text-navy-900">
              {prerequisitesDurationCost.prerequisites.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {prerequisitesDurationCost.prerequisites.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span
                    className="mt-1 flex h-2 w-2 flex-shrink-0 rounded-full bg-gold-500"
                    aria-hidden="true"
                  />
                  <span className="text-ink-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border-t-4 border-gold-500 bg-white p-6 shadow-sm md:p-8">
            <h3 className="font-heading text-xl text-navy-900">
              {prerequisitesDurationCost.duration.title}
            </h3>
            <p className="mt-4 text-ink-light">
              {prerequisitesDurationCost.duration.description}
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="font-heading text-2xl text-navy-900">
            {prerequisitesDurationCost.cost.title}
          </h3>
          <p className="mt-2 max-w-3xl text-ink-light">
            {prerequisitesDurationCost.cost.description}
          </p>

          <div className="mt-6 overflow-hidden rounded-xl bg-white shadow-sm">
            <table className="w-full text-left">
              <tbody className="divide-y divide-navy-800/10">
                {prerequisitesDurationCost.cost.rows.map((row) => (
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
              <tfoot className="bg-cream-50">
                <tr>
                  <th
                    scope="row"
                    className="px-6 py-4 font-heading text-lg text-navy-900"
                  >
                    Typical total — member
                  </th>
                  <td className="px-6 py-4 text-right font-heading text-2xl text-navy-900">
                    {prerequisitesDurationCost.cost.memberTotal}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="px-6 py-4 font-heading text-lg text-navy-900"
                  >
                    Typical total — non-member
                  </th>
                  <td className="px-6 py-4 text-right font-heading text-2xl text-navy-900">
                    {prerequisitesDurationCost.cost.nonMemberTotal}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <p className="mt-4 text-sm text-ink-light">
            {prerequisitesDurationCost.cost.note}
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            {prerequisitesDurationCost.cost.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
