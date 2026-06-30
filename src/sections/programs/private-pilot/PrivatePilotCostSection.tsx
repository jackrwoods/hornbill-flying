import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { privatePilotProgram } from "@/content/programs/private-pilot";

export function PrivatePilotCostSection() {
  const { cost } = privatePilotProgram;

  return (
    <Section background="callout" id="cost">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-heading">
          {cost.title}
        </h2>
        <p className="mt-4 max-w-3xl text-muted">{cost.intro}</p>

        <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">
          <table className="w-full text-left">
            <tbody className="divide-y divide-border-subtle">
              {cost.rows.map((row) => (
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
            <tfoot className="bg-bg">
              <tr>
                <th
                  scope="row"
                  className="px-6 py-4 font-heading text-lg text-heading"
                >
                  Realistic total range
                </th>
                <td className="px-6 py-4 text-right font-heading text-2xl text-heading">
                  {cost.totalRange}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <p className="mt-6 text-sm text-muted">{cost.totalNote}</p>
        <div className="mt-4 flex flex-wrap gap-4">
          {cost.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-accent hover:text-on-dark-accent-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
