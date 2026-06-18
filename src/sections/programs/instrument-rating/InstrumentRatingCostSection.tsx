import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { instrumentRatingProgram } from "@/content/programs/instrument-rating";

export function InstrumentRatingCostSection() {
  const { cost } = instrumentRatingProgram;

  return (
    <Section background="sky" id="cost">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          {cost.title}
        </h2>
        <p className="mt-4 max-w-3xl text-ink-light">{cost.intro}</p>

        <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">
          <table className="w-full text-left">
            <tbody className="divide-y divide-navy-800/10">
              {cost.rows.map((row) => (
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
                  Typical total range
                </th>
                <td className="px-6 py-4 text-right font-heading text-2xl text-navy-900">
                  {cost.totalRange}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <p className="mt-6 text-sm text-ink-light">{cost.note}</p>
        <div className="mt-4 flex flex-wrap gap-4">
          {cost.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
