import Image from "next/image";

export default function CallUs() {
  return (
    <div className="contact-container full-shadow">
      <Image
        src="/icons/phone-call.svg"
        alt="phone"
        height={40}
        width={40}
        className=""
      />
      <h3>Call</h3>
      <span className=" h-[1px] w-full bg-grey/20" />
      <a href="tel:+17183519201" className="hover:!text-primary/70">+1 (718) 351-9201</a>
      <p className="text-center">Office Hours <br/> Mon-Fri, 9am - 5pm</p>
    </div>
  );
}
