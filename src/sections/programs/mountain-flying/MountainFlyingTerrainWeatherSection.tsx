import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { mountainFlyingProgram } from "@/content/programs/mountain-flying";

export function MountainFlyingTerrainWeatherSection() {
  const { terrainWeather } = mountainFlyingProgram;

  return (
    <Section background="cream" id="terrain-and-weather">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          {terrainWeather.title}
        </h2>
        <p className="mt-4 max-w-3xl text-ink-light">
          {terrainWeather.intro}
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {terrainWeather.items.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border-t-4 border-gold-500 bg-white p-6 shadow-sm"
            >
              <h3 className="font-heading text-xl text-navy-900">
                {item.label}
              </h3>
              <p className="mt-2 text-ink-light">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
