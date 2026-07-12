import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { instrumentRatingProgram } from "@/content/programs/instrument-rating";

export function InstrumentRatingCostSection() {
  const { cost } = instrumentRatingProgram;

  return (
    <Section background="callout" id="cost">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Cost</p>
          <h2 className="font-heading text-3xl md:text-4xl text-heading text-balance">
            {cost.title}
          </h2>
          <p className="mt-4 text-muted text-pretty">{cost.intro}</p>
        </Reveal>

        <Reveal variant="glide" className="mt-8 card-cinematic overflow-hidden">
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
                  Typical total range
                </th>
                <td className="nums px-6 py-4 text-right font-heading text-2xl text-heading">
                  {cost.totalRange}
                </td>
              </tr>
            </tfoot>
          </table>
        </Reveal>

        <p className="mt-6 text-sm text-muted">{cost.note}</p>
        <div className="mt-4 flex flex-wrap gap-4">
          {cost.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="beak-flash text-sm font-semibold text-accent focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}