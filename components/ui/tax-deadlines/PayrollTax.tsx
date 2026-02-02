export default function PayrollTax() {
  return (
    <section className="section-container !pt-0 flex flex-col items-center justify-center">
      <table className="w-full md:max-w-lg lg:max-w-2xl border border-grey/20 full-shadow my-6">
        <thead>
          <tr className="border border-b border-grey/20">
            <th className="w-1/2 p-4 text-left text-accent2 leading-none tracking-[-1px] text-xl sm:text-2xl lg:text-3xl xl:text-4xl">
              Payroll Tax
            </th>
            <th className="w-1/2 p-4 whitespace-nowrap text-left text-primary">
              NY, NJ &amp; FL
            </th>
          </tr>
          <tr className="border-b border-grey/20">
            <th className="w-1/2 p-4 text-left text-primary">Period</th>
            <th className="w-1/2 p-4 text-left text-primary">Due Date</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-grey/20 hover:bg-primary/5">
            <td className="p-4">Jan-March</td>
            <td className="p-4 border-l border-grey/20 bg-grey/10">4/30</td>
          </tr>
          <tr className="border-b border-grey/20 hover:bg-primary/5">
            <td className="p-4">April-June</td>
            <td className="p-4 border-l border-grey/20 bg-grey/10">7/31</td>
          </tr>
          <tr className="border-b border-grey/20 hover:bg-primary/5">
            <td className="p-4">July-Sept</td>
            <td className="p-4 border-l border-grey/20 bg-grey/10">10/31</td>
          </tr>
          <tr className="hover:bg-primary/5">
            <td className="p-4">Oct-Dec</td>
            <td className="p-4 border-l border-grey/20 bg-grey/10">1/31</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
