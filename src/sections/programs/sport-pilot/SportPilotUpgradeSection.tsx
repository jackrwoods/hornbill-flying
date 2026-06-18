import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { sportPilotProgram } from "@/content/programs/sport-pilot";

export function SportPilotUpgradeSection() {
  const { upgradePathway } = sportPilotProgram;

  return (
    <Section background="cream" id="upgrade-pathway">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
              {upgradePathway.title}
            </h2>
            <p className="mt-4 text-ink-light leading-relaxed">
              {upgradePathway.intro}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              {upgradePathway.links.map((link) => (
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
          <div className="space-y-6">
            {upgradePathway.items.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border-t-4 border-gold-500 bg-white p-6 shadow-sm"
              >
                <h3 className="font-heading text-xl text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-ink-light">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
