import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
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
    <Section background="cream" id="syllabi-and-poh">
      <Container>
        <h2 className="font-heading text-3xl text-navy-900 md:text-4xl">
          Training syllabi and aircraft documents
        </h2>
        <p className="mt-4 max-w-3xl text-ink-light">
          Download the current syllabi and quick-reference documents for your
          training. POH links are provided for reference; always verify with the
          physical POH in the aircraft before flight.
        </p>

        <div className="mt-10">
          <h3 className="font-heading text-2xl text-navy-900">Syllabi</h3>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {syllabi.map((doc) => (
              <DownloadCard key={doc.slug} document={doc} />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="font-heading text-2xl text-navy-900">
            Checklists and quick-reference
          </h3>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {checklists.map((doc) => (
              <DownloadCard key={doc.slug} document={doc} />
            ))}
            {pohCards.map((doc) => (
              <DownloadCard key={doc.slug} document={doc} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
