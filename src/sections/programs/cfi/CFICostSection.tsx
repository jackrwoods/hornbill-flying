import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { cfiProgram } from "@/content/programs/cfi";

export function CFICostSection() {
  return (
    <Section background="callout" id="cost">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-heading">
          {cfiProgram.cost.title}
        </h2>
        <p className="mt-4 max-w-3xl text-muted">{cfiProgram.cost.intro}</p>

        <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">
          <table className="w-full text-left">
            <tbody className="divide-y divide-border-subtle">
              {cfiProgram.cost.rows.map((row) => (
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
                  Typical total
                </th>
                <td className="px-6 py-4 text-right font-heading text-2xl text-heading">
                  {cfiProgram.cost.totalRange}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <p className="mt-6 text-sm text-muted">{cfiProgram.cost.note}</p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link
            href="/fleet/"
            className="text-sm font-semibold text-accent hover:text-on-dark-accent-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
          >
            See fleet and rates
          </Link>
          <Link
            href="/membership/"
            className="text-sm font-semibold text-accent hover:text-on-dark-accent-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
          >
            Membership details
          </Link>
        </div>
      </Container>
    </Section>
  );
}
