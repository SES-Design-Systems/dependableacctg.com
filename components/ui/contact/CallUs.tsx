"use client";

import Image from "next/image";

export default function CallUs() {
  const now = new Date();
  const month = now.getMonth(); // 0 = Jan, 3 = Apr
  const day = now.getDate();
  const isTaxSeason = month < 3 || (month === 3 && day <= 15);

  return (
    <div className="contact-container full-shadow">
      <a
        href="tel:+17183519201"
        className="cursor-pointer hover:scale-105 transition-all duration-300"
      >
        <Image
          src="/icons/phone-call.svg"
          alt="phone"
          height={40}
          width={40}
          className=""
        />
      </a>
      <h3>Call</h3>
      <span className=" h-[1px] w-full bg-grey/20" />
      <a href="tel:+17183519201" className="hover:!text-primary/70">
        +1 (718) 351-9201
      </a>
      <p suppressHydrationWarning className="text-center">
        Office Hours <br />{" "}
        {isTaxSeason ? <span>10am-7pm</span> : <span>9am-5pm</span>}
      </p>
    </div>
  );
}
