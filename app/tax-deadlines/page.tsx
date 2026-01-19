import PayrollTax from "@/components/ui/tax-deadlines/PayrollTax";
import SalesTax from "@/components/ui/tax-deadlines/SalesTax";
import TaxDeadlines from "@/components/ui/tax-deadlines/TaxDeadlines";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tax Deadlines | NY, NJ & FL Filing Dates | Dependable Accounting',
  description: 'Stay compliant with important tax deadlines for businesses, nonprofits, sales tax, and payroll filings in NY, NJ, and FL. Updated quarterly filing dates and due dates.',
  keywords: ['tax deadlines', 'tax return deadline', 'personal tax return deadline', 'keyword4', 'keyword5'],
  openGraph: {
    title: 'Tax Deadlines 2026 | NY, NJ, FL Filing Dates',
    description: 'Stay on top of important tax deadlines for businesses, nonprofits, and payroll tax filings in NY, NJ, and FL.',
    images: ['/best_tax_returns_staten_island.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tax Deadlines 2026 | NY, NJ & FL Filing Dates',
    description: 'Stay on top of important tax deadlines for businesses, nonprofits, and payroll tax filings in NY, NJ, and FL.',
    images: ['/best_tax_returns_staten_island.jpg'],
  },
};

export default function taxDeadlines() {
  return (
    <section className="h-fit py-10">
        <div className="flex flex-col items-center justify-center gap-2 md:gap-4">
          <h1 className="text-primary!">Tax Deadlines</h1>
          <h3 className="text-grey! text-center max-w-xs md:max-w-[550px] xl:max-w-4xl !font-sourceLight">
            Stay on top of important tax deadlines for businesses, nonprofits,
            and payroll tax filings. Review the key due dates to ensure timely
            filing and compliance
          </h3>
        </div>
        <TaxDeadlines />
        <SalesTax />
        <PayrollTax />
    </section>
  );
}
