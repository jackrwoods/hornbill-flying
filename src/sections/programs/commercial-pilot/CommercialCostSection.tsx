import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { commercialPilotProgram } from "@/content/programs/commercial-pilot";

export function CommercialCostSection() {
  const { cost } = commercialPilotProgram;

  return (
    <Section background="default" id="cost">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Cost</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
            {cost.title}
          </h2>
          <p className="mt-4 text-muted text-pretty">{cost.intro}</p>
        </Reveal>

        <Reveal variant="glide" className="mt-10 card-cinematic overflow-hidden">
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
                  Typical total
                </th>
                <td className="nums px-6 py-4 text-right font-heading text-2xl text-heading">
                  {cost.totalRange}
                </td>
              </tr>
            </tfoot>
          </table>
        </Reveal>

        <p className="mt-6 text-sm text-muted text-pretty">{cost.note}</p>
        <Reveal variant="glide" className="mt-4 flex flex-wrap gap-4">
          {cost.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="beak-flash text-sm font-semibold text-accent"
            >
              {link.label}
            </Link>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}