import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { DownloadCard } from "@/components/DownloadCard";
import { downloadableDocuments } from "@/content/student-resources";

export function SyllabiAndPohSection() {
  const syllabi = downloadableDocuments.filter(
    (d) => !d.tailNumber && d.slug !== "checklist-pa28"
  );
  const checklists = downloadableDocuments.filter(
    (d) => d.slug === "checklist-pa28"
  );
  const pohCards = downloadableDocuments.filter((d) => d.tailNumber);

  return (
    <Section background="default" id="syllabi-and-poh">
      <Container>
        <Reveal variant="glide" className="max-w-3xl">
          <p className="panel-label-lg text-accent mb-4">Syllabi &amp; POH</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-heading text-balance">
            Training syllabi and aircraft documents
          </h2>
          <p className="mt-4 max-w-3xl text-muted text-pretty">
            Download the current syllabi and quick-reference documents for your
            training. POH links are provided for reference; always verify with the
            physical POH in the aircraft before flight.
          </p>
        </Reveal>

        <div className="mt-10">
          <Reveal variant="glide">
            <h3 className="font-heading text-2xl text-heading">Syllabi</h3>
          </Reveal>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {syllabi.map((doc) => (
              <Reveal key={doc.slug} variant="glide">
                <DownloadCard document={doc} />
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <Reveal variant="glide">
            <h3 className="font-heading text-2xl text-heading">
              Checklists and quick-reference
            </h3>
          </Reveal>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {checklists.map((doc) => (
              <Reveal key={doc.slug} variant="glide">
                <DownloadCard document={doc} />
              </Reveal>
            ))}
            {pohCards.map((doc) => (
              <Reveal key={doc.slug} variant="glide">
                <DownloadCard document={doc} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}