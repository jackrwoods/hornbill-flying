import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { mountainFlyingProgram } from "@/content/programs/mountain-flying";

export function MountainFlyingTerrainWeatherSection() {
  const { terrainWeather } = mountainFlyingProgram;

  return (
    <Section background="default" id="terrain-and-weather">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Terrain &amp; weather</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
            {terrainWeather.title}
          </h2>
          <p className="mt-4 text-muted text-pretty">{terrainWeather.intro}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {terrainWeather.items.map((item) => (
            <Reveal
              key={item.label}
              variant="glide"
              className="card-cinematic p-6 flex flex-col"
            >
              <h3 className="font-heading text-xl font-extrabold text-heading">
                {item.label}
              </h3>
              <p className="mt-2 text-muted text-pretty">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}