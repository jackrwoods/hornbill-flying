import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { sportPilotProgram } from "@/content/programs/sport-pilot";

export function SportPilotWhatIsSection() {
  const { whatIs } = sportPilotProgram;

  return (
    <Section background="default" id="what-is-sport-pilot">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-heading">
              {whatIs.title}
            </h2>
            <p className="mt-4 text-muted leading-relaxed">{whatIs.intro}</p>
            <p className="mt-6 rounded-lg bg-callout p-4 text-body">
              {whatIs.note}
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-xl text-heading">Privileges</h3>
              <ul className="mt-3 space-y-3">
                {whatIs.privileges.map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <span
                      className="mt-1 flex h-2 w-2 flex-shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-semibold text-body">{item.label}:</span>{" "}
                      <span className="text-muted">{item.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-xl text-heading">Limitations</h3>
              <ul className="mt-3 space-y-3">
                {whatIs.limitations.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span
                      className="mt-1 flex h-2 w-2 flex-shrink-0 rounded-full bg-alert"
                      aria-hidden="true"
                    />
                    <span className="text-muted">{item}</span>
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
