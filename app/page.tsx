import Hero from "@/components/ui/home/Hero";
import Services from "@/components/ui/home/services/Services";
import HomeSchedule from "@/components/ui/home/HomeSchedule";
import HomeAbout from "@/components/ui/home/HomeAbout";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dependable Accounting | Professional Accounting Services in Staten Island',
  description: 'Expert accounting, bookkeeping, and tax services for businesses and individuals in Staten Island, NY. Trusted by local businesses for over [X] years.',
  keywords: ['keyword1', 'keyword2', 'keyword3', 'keyword4', 'keyword5'],
  openGraph: {
    title: 'Dependable Accounting | Professional Accounting Services',
    description: 'Expert accounting, bookkeeping, and tax services for businesses and individuals in Staten Island, NY.',
    images: ['/best_accounting_staten_island.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dependable Accounting | Professional Accounting Services',
    description: 'Expert accounting, bookkeeping, and tax services for businesses and individuals in Staten Island, NY.',
    images: ['/best_accounting_staten_island.jpg'],
  },
};

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
