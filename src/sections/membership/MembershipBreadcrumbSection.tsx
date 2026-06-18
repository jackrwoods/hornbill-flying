import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";

export function MembershipBreadcrumbSection() {
  return (
    <div className="border-b border-navy-800/10 bg-cream-50 py-4">
      <Container>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Membership" },
          ]}
        />
      </Container>
    </div>
  );
}
