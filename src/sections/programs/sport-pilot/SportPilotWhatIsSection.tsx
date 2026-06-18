import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { sportPilotProgram } from "@/content/programs/sport-pilot";

export function SportPilotWhatIsSection() {
  const { whatIs } = sportPilotProgram;

  return (
    <Section background="cream" id="what-is-sport-pilot">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
              {whatIs.title}
            </h2>
            <p className="mt-4 text-ink-light leading-relaxed">{whatIs.intro}</p>
            <p className="mt-6 rounded-lg bg-sky-100 p-4 text-ink">
              {whatIs.note}
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-xl text-navy-900">Privileges</h3>
              <ul className="mt-3 space-y-3">
                {whatIs.privileges.map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <span
                      className="mt-1 flex h-2 w-2 flex-shrink-0 rounded-full bg-gold-500"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-semibold text-ink">{item.label}:</span>{" "}
                      <span className="text-ink-light">{item.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-xl text-navy-900">Limitations</h3>
              <ul className="mt-3 space-y-3">
                {whatIs.limitations.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span
                      className="mt-1 flex h-2 w-2 flex-shrink-0 rounded-full bg-orange-500"
                      aria-hidden="true"
                    />
                    <span className="text-ink-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
