import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
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
        <h2 className="font-heading text-3xl text-heading md:text-4xl">
          Useful FAA resources
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Curated links to the regulations, advisories, weather products, and
          safety programs you will reference most often during training.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
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
          </div>

          <div>
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
          </div>

          <div>
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
          </div>

          <div>
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
          </div>

          <div className="lg:col-span-2">
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
          </div>
        </div>
      </Container>
    </Section>
  );
}
