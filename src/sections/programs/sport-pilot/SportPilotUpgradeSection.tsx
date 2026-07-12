import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { sportPilotProgram } from "@/content/programs/sport-pilot";

export function SportPilotUpgradeSection() {
  const { upgradePathway } = sportPilotProgram;

  return (
    <Section background="default" id="upgrade-pathway">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal variant="glide">
            <p className="panel-label-lg text-accent mb-4">Upgrade pathway</p>
            <h2 className="font-heading text-3xl md:text-4xl text-heading text-balance">
              {upgradePathway.title}
            </h2>
            <p className="mt-4 text-muted leading-relaxed text-pretty">
              {upgradePathway.intro}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              {upgradePathway.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="beak-flash text-sm font-semibold text-accent focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </Reveal>

          <div className="space-y-6">
            {upgradePathway.items.map((item) => (
              <Reveal key={item.title} variant="glide" className="card-cinematic p-6">
                <h3 className="font-heading text-xl text-heading">
                  {item.title}
                </h3>
                <p className="mt-2 text-muted text-pretty">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}