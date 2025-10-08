import { Minus } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-40 min-h-screen">
      <div className="w-full flex justify-between p-1 lg:p-3 font-joan">
        <h3>Dependable Accounting Co.</h3>
        <h3>(718) 351-9201</h3>
      </div>
      <div className="font-noto uppercase flex-grow">
        <div className="flex flex-col items-center justify-center gap-6 bg-white-trans md:bg-none p-2 rounded-xl">
          <h2 className="flex items-center gap-1"><Minus />new website<Minus /></h2>
          <h1 className="font-bold">under construction</h1>
          <h2 className="font-semibold text-primary">stay tuned</h2>
        </div>
      </div>
      <div className="bg-white w-full">
        {/* <p className="text-center p-1">&copy; {new Date().getFullYear()} Dependable Accounting Co. All rights reserved.</p> */}
      </div>
    </div>
  );
}
