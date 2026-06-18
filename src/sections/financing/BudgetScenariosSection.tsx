import Link from "next/link";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { financingContent } from "@/content/financing";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function BudgetScenariosSection() {
  const { budgetScenarios, links } = financingContent;

  return (
    <Section background="white" id="budgets">
      <Container>
        <h2 className="font-heading text-3xl md:text-4xl text-navy-900">
          {budgetScenarios.title}
        </h2>
        <p className="mt-4 max-w-3xl text-ink-light">{budgetScenarios.intro}</p>

        <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-navy-900 text-white">
              <tr>
                {budgetScenarios.columns.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    className="px-4 py-3 text-sm font-semibold sm:px-6"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800/10">
              {budgetScenarios.scenarios.map((scenario) => (
                <tr key={scenario.name}>
                  <th
                    scope="row"
                    className="px-4 py-4 align-top font-body font-semibold text-navy-900 sm:px-6"
                  >
                    <span className="block">{scenario.name}</span>
                    <span className="block text-sm font-normal text-ink-light">
                      {scenario.frequency}
                    </span>
                  </th>
                  <td className="px-4 py-4 align-top text-ink-light sm:px-6">
                    {scenario.hoursPerMonth} hours
                  </td>
                  <td className="px-4 py-4 align-top font-mono text-navy-900 sm:px-6">
                    <span className="block">
                      {currency.format(scenario.memberMonthlyEstimate)} member
                    </span>
                    <span className="block text-ink-light">
                      {currency.format(scenario.nonMemberMonthlyEstimate)} non-member
                    </span>
                  </td>
                  <td className="px-4 py-4 align-top text-ink-light sm:px-6">
                    {scenario.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm text-ink-light">{budgetScenarios.footnote}</p>
        <p className="mt-2 text-sm text-ink-light">
          {budgetScenarios.membershipNote}{" "}
          <Link
            href={links.membership}
            className="font-semibold text-gold-500 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded"
          >
            See membership details.
          </Link>
        </p>
      </Container>
    </Section>
  );
}
