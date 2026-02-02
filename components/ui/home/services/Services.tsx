import { Calculator, ClipboardCheck, DollarSign, Scale } from "lucide-react";
import ServiceCard from "./ServiceCard";

export default function Services() {
  return (
    <section
      id="services"
      className="section-container flex flex-col items-center justify-center gap-15 md:gap-20"
    >
      <div>
        <h2>Our Services</h2>
      </div>

      <div className="grid grid-cols-1 place-items-center md:grid-cols-2 xl:grid-cols-4 gap-10 xl:gap-4 2xl:gap-8">
        <ServiceCard
          icon={<DollarSign className="size-12 lg:size-14 xl:size-16" />}
          title="Financial statements"
          description="Clear, accurate financial statements that show how your business is performing 
          and where your money is going. We prepare reports you can actually understand and use to 
          make better decisions."
        />
        <ServiceCard
          icon={<Calculator className="size-12 lg:size-14 xl:size-16" />}
          title="Payroll & Sales Tax"
          description="We handle payroll processing and ensure all payroll and sales taxes are 
          filed correctly and on time. This helps you stay compliant and avoid costly penalties."
        />
        <ServiceCard
          icon={<ClipboardCheck className="size-12 lg:size-14 xl:size-16" />}
          title="Workers Comp Audits"
          description="We assist with workers’ compensation and general liability audits to ensure 
          your records are accurate and your premiums are fair."
        />
        <ServiceCard
          icon={<Scale className="size-12 lg:size-14 xl:size-16" />}
          title="Offer in Compromise"
          description="If you owe back taxes, we help negotiate with the IRS to potentially settle 
          your tax debt for less than you owe. We guide you through the process and handle 
          communication on your behalf."
        />
      </div>
    </section>
  );
}
