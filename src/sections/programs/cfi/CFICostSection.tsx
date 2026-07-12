import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { cfiProgram } from "@/content/programs/cfi";

export function CFICostSection() {
  return (
    <Section background="callout" id="cost">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Cost</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
            {cfiProgram.cost.title}
          </h2>
          <p className="mt-4 text-muted text-pretty">{cfiProgram.cost.intro}</p>
        </Reveal>

        <Reveal variant="glide" className="mt-10 card-cinematic overflow-hidden">
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
                  {cfiProgram.cost.totalRange}
                </td>
              </tr>
            </tfoot>
          </table>
        </Reveal>

        <p className="mt-6 text-sm text-muted text-pretty">{cfiProgram.cost.note}</p>
        <Reveal variant="glide" className="mt-4 flex flex-wrap gap-4">
          <Link
            href="/fleet/"
            className="beak-flash text-sm font-semibold text-accent"
          >
            See fleet and rates
          </Link>
          <Link
            href="/membership/"
            className="beak-flash text-sm font-semibold text-accent"
          >
            Membership details
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}