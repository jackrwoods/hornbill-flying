import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { PhoneLink } from "@/components/PhoneLink";
import { ResourceCard } from "@/components/ResourceCard";
import Link from "next/link";

export function MedicalSection() {
  return (
    <Section background="card" id="medical">
      <Container>
        <h2 className="font-heading text-3xl text-heading md:text-4xl">
          FAA medical certificate guide
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Medical certification is a common early hurdle. Here is what you need,
          where to schedule an exam, and how to handle typical questions.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="font-heading text-2xl text-heading">
                Which medical certificate do I need?
              </h3>
              <div className="mt-4 overflow-hidden rounded-lg border border-border-subtle bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="bg-bg text-heading">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">Certificate</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Typical use</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Training path</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    <tr>
                      <td className="px-4 py-3 font-medium">Third class</td>
                      <td className="px-4 py-3 text-muted">
                        Private Pilot, Sport Pilot, recreational flying
                      </td>
                      <td className="px-4 py-3 text-muted">
                        PPL, SPL, most initial training
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Second class</td>
                      <td className="px-4 py-3 text-muted">
                        Commercial pilot operations
                      </td>
                      <td className="px-4 py-3 text-muted">
                        Commercial Pilot
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">First class</td>
                      <td className="px-4 py-3 text-muted">
                        Airline transport pilot
                      </td>
                      <td className="px-4 py-3 text-muted">
                        ATP and some career-track planning
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">BasicMed</td>
                      <td className="px-4 py-3 text-muted">
                        Limited Private Pilot privileges after a medical course
                      </td>
                      <td className="px-4 py-3 text-muted">
                        Not for student pilot solo or IFR training
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-2xl text-heading">
                How to schedule your exam
              </h3>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted">
                <li>
                  Complete your application in{" "}
                  <a
                    href="https://medxpress.faa.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-heading underline hover:text-accent"
                  >
                    FAA MedXPress
                  </a>{" "}
                  before your appointment.
                </li>
                <li>
                  Find an Aviation Medical Examiner with the{" "}
                  <a
                    href="https://www.faa.gov/pilots/medical/ame_locator/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-heading underline hover:text-accent"
                  >
                    FAA AME locator
                  </a>
                  .
                </li>
                <li>
                  Bring your ID, MedXPress confirmation number, and a list of any
                  medications.
                </li>
              </ol>
            </div>

            <div>
              <h3 className="font-heading text-2xl text-heading">
                Common medical questions
              </h3>
              <dl className="mt-4 space-y-4 text-muted">
                <div>
                  <dt className="font-semibold text-heading">
                    Can I wear glasses?
                  </dt>
                  <dd>
                    Yes. Corrective lenses are allowed for all classes of medical
                    certificates. Your certificate will simply note that you
                    must wear them while flying.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-heading">
                    What about ADHD or common medications?
                  </dt>
                  <dd>
                    Some diagnoses and medications require extra documentation or
                    a special issuance. Talk to an AME early so you know what to
                    bring.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-heading">
                    Is BasicMed enough for flight training?
                  </dt>
                  <dd>
                    BasicMed does not authorize student pilot solos or Instrument
                    Rating training. Most students start with a third-class
                    medical.
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <Link
                href="/blog/medical-certificate-student-pilots/"
                className="inline-flex items-center font-semibold text-heading underline hover:text-accent focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
              >
                Read the medical certificate guide for student pilots
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <ResourceCard
              title="FAA MedXPress"
              description="Complete your medical application online before visiting an AME."
              links={[
                {
                  href: "https://medxpress.faa.gov/",
                  label: "Start application",
                  external: true,
                },
              ]}
              tags={["FAA"]}
            />
            <ResourceCard
              title="AME Locator"
              description="Find an Aviation Medical Examiner near you."
              links={[
                {
                  href: "https://www.faa.gov/pilots/medical/ame_locator/",
                  label: "Find an AME",
                  external: true,
                },
              ]}
              tags={["FAA"]}
            />
            <ResourceCard
              title="BasicMed"
              description="Alternative medical certification rules for certain pilots."
              links={[
                {
                  href: "https://www.faa.gov/pilots/medical/basic_med",
                  label: "Learn about BasicMed",
                  external: true,
                },
              ]}
              tags={["FAA"]}
            />

            <div className="rounded-xl bg-dark p-6 text-on-dark">
              <h3 className="font-heading text-xl text-on-dark">
                Questions? Call us.
              </h3>
              <p className="mt-2 text-sm text-on-dark">
                Not sure which medical path fits your training goal? We can point
                you in the right direction before you schedule an exam.
              </p>
              <div className="mt-4">
                <PhoneLink
                  className="text-on-dark hover:text-on-dark-accent-hover"
                  showIcon
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
