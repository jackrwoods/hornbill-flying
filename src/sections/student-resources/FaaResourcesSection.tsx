import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { ResourceCard } from "@/components/ResourceCard";
import { externalResources } from "@/content/student-resources";

export function FaaResourcesSection() {
  const regulations = externalResources.filter(
    (r) =>
      r.category === "faa" &&
      (r.title.includes("14 CFR") || r.title.includes("AC "))
  );
  const weather = externalResources.filter(
    (r) => r.category === "weather" && !r.title.includes("1800WXBrief")
  );
  const notams = externalResources.filter((r) =>
    r.title.includes("NOTAM")
  );
  const safety = externalResources.filter(
    (r) => r.title.includes("FAASTeam") || r.title.includes("WINGS")
  );
  const medical = externalResources.filter((r) => r.category === "medical");

  return (
    <Section background="default" id="faa-resources">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">FAA resources</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
            Useful FAA resources
          </h2>
          <p className="mt-4 max-w-2xl text-muted text-pretty">
            Curated links to the regulations, advisories, weather products, and
            safety programs you will reference most often during training.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <Reveal variant="glide">
            <h3 className="font-heading text-2xl text-heading">
              Regulations and advisory circulars
            </h3>
            <div className="mt-4 grid gap-4">
              {regulations.map((resource) => (
                <ResourceCard
                  key={resource.title}
                  title={resource.title}
                  description={resource.description}
                  links={[
                    {
                      href: resource.url,
                      label: "Open resource",
                      external: true,
                    },
                  ]}
                  tags={["FAA"]}
                />
              ))}
            </div>
          </Reveal>

          <Reveal variant="glide">
            <h3 className="font-heading text-2xl text-heading">
              Weather products
            </h3>
            <div className="mt-4 grid gap-4">
              {weather.map((resource) => (
                <ResourceCard
                  key={resource.title}
                  title={resource.title}
                  description={resource.description}
                  links={[
                    {
                      href: resource.url,
                      label: "Open resource",
                      external: true,
                    },
                  ]}
                  tags={["Weather"]}
                />
              ))}
            </div>
          </Reveal>

          <Reveal variant="glide">
            <h3 className="font-heading text-2xl text-heading">NOTAMs</h3>
            <div className="mt-4 grid gap-4">
              {notams.map((resource) => (
                <ResourceCard
                  key={resource.title}
                  title={resource.title}
                  description={resource.description}
                  links={[
                    {
                      href: resource.url,
                      label: "Open resource",
                      external: true,
                    },
                  ]}
                  tags={["FAA"]}
                />
              ))}
            </div>
          </Reveal>

          <Reveal variant="glide">
            <h3 className="font-heading text-2xl text-heading">
              Safety programs
            </h3>
            <div className="mt-4 grid gap-4">
              {safety.map((resource) => (
                <ResourceCard
                  key={resource.title}
                  title={resource.title}
                  description={resource.description}
                  links={[
                    {
                      href: resource.url,
                      label: "Open resource",
                      external: true,
                    },
                  ]}
                  tags={["FAA"]}
                />
              ))}
            </div>
          </Reveal>

          <Reveal variant="glide" className="lg:col-span-2">
            <h3 className="font-heading text-2xl text-heading">Medical</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {medical.map((resource) => (
                <ResourceCard
                  key={resource.title}
                  title={resource.title}
                  description={resource.description}
                  links={[
                    {
                      href: resource.url,
                      label: "Open resource",
                      external: true,
                    },
                  ]}
                  tags={["FAA"]}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}