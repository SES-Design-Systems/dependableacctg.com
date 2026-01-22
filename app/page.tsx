import Hero from "@/components/ui/home/Hero";
import Services from "@/components/ui/home/services/Services";
import HomeSchedule from "@/components/ui/home/HomeSchedule";
import HomeAbout from "@/components/ui/home/HomeAbout";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Staten Island Accountant | Tax Returns | Dependable Accounting',
  description: 'Trusted Staten Island accountant offering personal and business tax returns, and tax planning services. Serving Staten Island, NY and surrounding areas.',
  keywords: [
    'Staten Island accountant',
    'tax returns Staten Island',
    'accountant Staten Island NY',
    'tax preparation Staten Island',
    'business tax returns Staten Island',
    'personal tax returns Staten Island',
  ],
  openGraph: {
    title: 'Staten Island Accountant | Tax Returns',
    description: 'Trusted Staten Island accountant offering personal and business tax returns, bookkeeping, and tax planning services.',
    images: ['/logos/full_logo_white.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Staten Island Accountant | Tax Returns',
    description: 'Trusted Staten Island accountant offering personal and business tax returns, and tax planning services.',
    images: ['/logos/full_logo_white.png'],
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
