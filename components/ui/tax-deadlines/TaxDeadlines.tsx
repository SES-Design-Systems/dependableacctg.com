export default function TaxDeadlines() {
  return (
    <section className="section-container flex flex-col items-center justify-center">
      <h3>Tax Returns</h3>
      <table className="w-full md:max-w-lg lg:max-w-2xl border border-grey/20 full-shadow my-6">
        <thead>
          <tr className="border border-b border-grey/20">
            <th className="w-3/5 p-4 text-left text-primary">Type</th>
            <th className="w-1/5 p-4 text-left text-primary">Date</th>
            <th className="w-1/5 p-4 text-left text-primary">Ext.</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-grey/20 hover:bg-primary/5">
            <td className="p-4 bg-grey/2">S-corp &amp; partnership</td>
            <td className="p-4 border-l border-grey/20 bg-grey/10">3/15</td>
            <td className="p-4 bg-grey/10">9/15</td>
          </tr>
          <tr className="border-b border-grey/20 hover:bg-primary/5">
            <td className="p-4 bg-grey/2">
              Trust, Estates, Personal &amp; C. Corporations
            </td>
            <td className="p-4 bg-grey/10 border-l border-grey/20">4/15</td>
            <td className="p-4 bg-grey/10">10/15</td>
          </tr>
          <tr className="hover:bg-primary/5">
            <td className="p-4 bg-grey/2">Non for profit</td>
            <td className="p-4 bg-grey/10 border-l border-grey/20">5/15</td>
            <td className="p-4 bg-grey/10">11/15</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
