import Image from "next/image";
import PrimaryButton from "../Button";

export default function HomeSchedule() {
  return (
    <section
      id="homeSchedule"
      className="section-container relative min-h-0 md:min-h-[400px]"
    >
      <Image
        src="/best_accounting_staten_island.jpg"
        alt="image"
        width={979}
        height={319}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 py-10 flex flex-col items-start justify-center gap-4 ">
        <h3>Schedule Your Appointment <br className="md:hidden"/> Online</h3>
        <h4 className="text-grey!">Book a time that works for you.</h4>
        <span className="block h-[2px] bg-grey/60 w-[300px] rounded-full" />
        <PrimaryButton />
      </div>
    </section>
  );
}
