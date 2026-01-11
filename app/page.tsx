import Hero from "@/components/ui/home/Hero";
import Services from "@/components/ui/home/services/Services";
import HomeSchedule from "@/components/ui/home/HomeSchedule";
import HomeAbout from "@/components/ui/home/HomeAbout";

export default function Home() {
  return (
    <section className="h-fit pb-10">
      <Hero />
      <Services />
      <HomeSchedule />
      <HomeAbout />
    </section>
  );
}
