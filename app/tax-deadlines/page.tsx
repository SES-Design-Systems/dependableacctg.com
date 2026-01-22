import PayrollTax from "@/components/ui/tax-deadlines/PayrollTax";
import SalesTax from "@/components/ui/tax-deadlines/SalesTax";
import TaxDeadlines from "@/components/ui/tax-deadlines/TaxDeadlines";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '2026 Tax Deadlines | NY, NJ & FL Filing Dates | Staten Island Accountant',
  description: 'Important 2026 tax deadlines for personal and business returns, payroll, and sales tax in NY, NJ, and FL. Staten Island accountant helping you stay compliant.',
  keywords: [
    '2026 tax deadlines',
    'tax return deadline 2026',
    'NY tax filing deadline',
    'business tax deadline',
    'payroll tax due dates',
    'sales tax filing dates NY',
    'Staten Island tax help',
    'quarterly tax deadlines',
  ],
  openGraph: {
    title: '2026 Tax Deadlines | NY, NJ & FL | Staten Island Accountant',
    description: 'Important 2026 tax deadlines for personal and business returns, payroll, and sales tax. Stay compliant with Dependable Accounting.',
    images: ['/logos/full_logo_white.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026 Tax Deadlines | NY, NJ & FL | Staten Island Accountant',
    description: 'Important 2026 tax deadlines for personal and business returns, payroll, and sales tax. Stay compliant with Dependable Accounting.',
    images: ['/logos/full_logo_white.png'],
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
