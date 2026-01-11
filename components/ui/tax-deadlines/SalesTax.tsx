"use client";

import { useState } from "react";

export default function SalesTax() {
  const [activeState, setActiveState] = useState("NY");

  return (
    <section className="section-container !pt-0 !pb-0 flex flex-col items-center justify-center">
      <h3 className="pb-2">Business Owners</h3>
      <p className="text-center max-w-xs md:max-w-lg">
        All employees and subcontractors must recieve their tax documents (W-2&apos;s
        &amp; 1099&apos;s)
        <span className="font-bold"> no later then Januray 31st</span>
      </p>
      <table className="w-full md:max-w-lg lg:max-w-2xl border border-grey full-shadow my-6">
        <thead>
          <tr className="border border-b border-primary">
            <th className="w-1/2 p-4 text-left text-primary flex gap-2 items-center">
              State:
              <select
                value={activeState}
                onChange={(e) => setActiveState(e.target.value)}
                className="bg-white border border-grey rounded p-1 cursor-pointer"
              >
                <option value="NY">NY</option>
                <option value="NJ">NJ</option>
                <option value="FL">FL</option>
              </select>
            </th>
            <th className="w-1/2 p-4 text-left text-accent2 leading-none tracking-[-1px] text-xl sm:text-2xl lg:text-3xl xl:text-4xl ">Sales Tax</th>
          </tr>
          {activeState !== "FL" && (
            <tr className="border-b border-grey">
              <th className="w-1/2 p-4 text-left text-primary">Period</th>
              <th className="w-1/2 p-4 text-left text-primary">Due Date</th>
            </tr>
          )}
        </thead>
        <tbody>
          {activeState === "FL" ? (
            <tr>
              <td colSpan={2} className="p-4 text-center">
                <p>Florida sales tax is a montly filing only due on or before the 18th of the month.</p>
              </td>
            </tr>
          ) : activeState === "NY" ? (
            <>
              <tr className="border-b border-grey/20 hover:bg-primary/5">
                <td className="p-4">Dec-Feb</td>
                <td className="p-4">3/20</td>
              </tr>
              <tr className="border-b border-grey/20 hover:bg-primary/5">
                <td className="p-4">March-May</td>
                <td className="p-4">6/20</td>
              </tr>
              <tr className="border-b border-grey/20 hover:bg-primary/5">
                <td className="p-4">June-Aug</td>
                <td className="p-4">9/20</td>
              </tr>
              <tr className="hover:bg-primary/5">
                <td className="p-4">Sep-Nov</td>
                <td className="p-4">12/20</td>
              </tr>
            </>
          ) : (
            <>
              <tr className="border-b border-grey/20 hover:bg-primary/5">
                <td className="p-4">Jan-March</td>
                <td className="p-4">4/20</td>
              </tr>
              <tr className="border-b border-grey/20 hover:bg-primary/5">
                <td className="p-4">April-June</td>
                <td className="p-4">7/20</td>
              </tr>
              <tr className="border-b border-grey/20 hover:bg-primary/5">
                <td className="p-4">July-Sept</td>
                <td className="p-4">10/20</td>
              </tr>
              <tr className="hover:bg-primary/5">
                <td className="p-4">Oct-Dec</td>
                <td className="p-4">1/20</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </section>
  );
}
