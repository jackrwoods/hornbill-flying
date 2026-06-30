import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { cfiProgram } from "@/content/programs/cfi";

export function CFICostSection() {
  return (
    <Section background="teal" id="cost">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          {cfiProgram.cost.title}
        </h2>
        <p className="mt-4 max-w-3xl text-ink-light">{cfiProgram.cost.intro}</p>

        <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">
          <table className="w-full text-left">
            <tbody className="divide-y divide-navy-800/10">
              {cfiProgram.cost.rows.map((row) => (
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
            <tfoot className="bg-sand-50">
              <tr>
                <th
                  scope="row"
                  className="px-6 py-4 font-heading text-lg text-navy-900"
                >
                  Typical total
                </th>
                <td className="px-6 py-4 text-right font-heading text-2xl text-navy-900">
                  {cfiProgram.cost.totalRange}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <p className="mt-6 text-sm text-ink-light">{cfiProgram.cost.note}</p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link
            href="/fleet/"
            className="text-sm font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
          >
            See fleet and rates
          </Link>
          <Link
            href="/membership/"
            className="text-sm font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
          >
            Membership details
          </Link>
        </div>
      </Container>
    </Section>
  );
}
