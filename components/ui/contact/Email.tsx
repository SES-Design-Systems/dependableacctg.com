import Image from "next/image";

export default function Email() {
  return (
    <div className="contact-container md:!items-start md:!h-[175px] full-shadow">
      <div className="flex flex-col md:flex-row items-center justify-center gap-2">
        <a
          href="mailto:info@dependableacctg.com"
          className="cursor-pointer hover:scale-105 transition-all duration-300"
        >
          <Image
            src="/icons/email.svg"
            alt="email"
            height={40}
            width={40}
            className=""
          />
        </a>

        <h3 className="!font-bold">Email</h3>
      </div>
      <span className="h-[1px] w-full bg-grey/20" />
      <a
        href="mailto:info@dependableacctg.com"
        className="hover:!text-primary/70"
      >
        info@dependableacctg.com
      </a>
      <p className="text-center">We typically respond within 1 business day</p>
    </div>
  );
}
