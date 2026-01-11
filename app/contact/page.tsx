import Information from "@/components/ui/contact/Information";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Dependable Accounting - Staten Island, NY',
  description: 'Get in touch with Dependable Accounting for all your accounting needs. Located at 73 Ottavio Promenade, Staten Island. Call (718) 351-9201 or email us today.',
  keywords: ['keyword1', 'keyword2', 'keyword3', 'keyword4', 'keyword5'],
  openGraph: {
    title: 'Contact Us | Dependable Accounting',
    description: 'Get in touch with Dependable Accounting for all your accounting needs in Staten Island, NY.',
    images: ['/best_accounting_staten_island.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Dependable Accounting',
    description: 'Get in touch with Dependable Accounting for all your accounting needs in Staten Island, NY.',
    images: ['/best_accounting_staten_island.jpg'],
  },
};

export default function Contact() {
  return (
    <section className="h-fit py-10">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-primary!">Get In Touch</h1>
        <h3 className="text-grey! text-center max-w-xs md:max-w-fit font-sourceLight">
          Have a question or need assistance? We&apos;re here to help.
        </h3>
        <Information />
      </div>
    </section>
  );
}
