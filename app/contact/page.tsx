import BookingForm from "@/components/BookingForm";
import Information from "@/components/ui/contact/Information";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Dependable Accounting - Staten Island, NY",
  description:
    "Get in touch with Dependable Accounting for all your accounting needs. Located at 73 Ottavio Promenade, Staten Island. Call (718) 351-9201 or email us today.",
  keywords: ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  openGraph: {
    title: "Contact Us | Dependable Accounting",
    description:
      "Get in touch with Dependable Accounting for all your accounting needs in Staten Island, NY.",
    images: ["/best_accounting_staten_island.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Dependable Accounting",
    description:
      "Get in touch with Dependable Accounting for all your accounting needs in Staten Island, NY.",
    images: ["/best_accounting_staten_island.jpg"],
  },
};

export default function Contact() {
  return (
    <>
      <section id="contactInfo" className="section-container h-fit py-10">
        <div className="flex flex-col items-center justify-center gap-4 pb-10">
          <h1 className="text-primary!">Get In Touch</h1>
          <h3 className="text-grey! text-center max-w-xs md:max-w-fit font-sourceLight pb-10">
            Have a question or need assistance? We&apos;re here to help.
          </h3>
          <Information />
        </div>
        <h3 className="text-center pb-6">Book Your Tax Meeting Today</h3>
        <BookingForm />
      </section>
    </>
  );
}
