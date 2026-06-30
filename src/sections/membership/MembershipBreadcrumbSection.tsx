import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";

export function MembershipBreadcrumbSection() {
  return (
    <div className="border-b border-border-subtle bg-bg py-4">
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
