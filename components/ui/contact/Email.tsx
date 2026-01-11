import Image from "next/image";

export default function Email() {
  return (
    <div className="contact-container md:!items-start md:!h-[175px] full-shadow">
      <div className="flex flex-col md:flex-row items-center justify-center gap-2">
        <Image
          src="/icons/email.svg"
          alt="phone"
          height={40}
          width={40}
          className=""
        />

        <h4>Email Us</h4>
      </div>
      <span className="h-[1px] w-full bg-grey/20" />
      <a href="mailto:andrew@dependableacctg.com">info@dependableacctg.com</a>
      <p className="text-center">We typically respond within 1 business day</p>
    </div>
  );
}
