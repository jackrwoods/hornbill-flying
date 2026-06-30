import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { mountainFlyingProgram } from "@/content/programs/mountain-flying";

export function MountainFlyingTerrainWeatherSection() {
  const { terrainWeather } = mountainFlyingProgram;

  return (
    <Section background="default" id="terrain-and-weather">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-heading">
          {terrainWeather.title}
        </h2>
        <p className="mt-4 max-w-3xl text-muted">
          {terrainWeather.intro}
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {terrainWeather.items.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border-t-4 border-accent bg-white p-6 shadow-sm"
            >
              <h3 className="font-heading text-xl text-heading">
                {item.label}
              </h3>
              <p className="mt-2 text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
