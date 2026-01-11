import Information from "@/components/ui/contact/Information";

export default function Contact() {
  return (
    <section className="h-fit py-10">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-primary!">Get In Touch</h1>
        <h3 className="text-grey! text-center max-w-xs md:max-w-fit">
          Have a question or need assistance? We're here to help.
        </h3>
        <Information />
      </div>
    </section>
  );
}
