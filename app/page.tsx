import Hero from "@/components/ui/Hero";
import Services from "@/components/services/Services";
import HomeSchedule from "@/components/ui/HomeSchedule";
import HomeAbout from "@/components/ui/HomeAbout";

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
