import BookingForm from "@/components/BookingForm";
import Information from "@/components/ui/contact/Information";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Tax Appointment | Staten Island Accountant | Dependable Accounting",
  description:
    "Schedule your tax return appointment with a trusted Staten Island accountant. Book online for personal or business tax preparation. Located in Staten Island, NY.",
  keywords: [
    "book tax appointment Staten Island",
    "tax accountant near me",
    "Staten Island tax preparer",
    "schedule tax return appointment",
    "accountant Staten Island NY",
    "tax consultation Staten Island",
  ],
  openGraph: {
    title: "Book a Tax Appointment | Staten Island Accountant",
    description:
      "Schedule your tax return appointment with a trusted Staten Island accountant. Book online for personal or business tax preparation.",
    images: ["/logos/full_logo_white.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Tax Appointment | Staten Island Accountant",
    description:
      "Schedule your tax return appointment with a trusted Staten Island accountant. Book online for personal or business tax preparation.",
    images: ["/logos/full_logo_white.png"],
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
