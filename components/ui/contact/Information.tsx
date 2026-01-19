import CallUs from "./CallUs";
import Email from "./Email";
import Visit from "./Visit";

export default function Information() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:max-w-fit">
      {/* Left group: CallUs, Visit, Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:max-w-2xl place-items-center">
        <CallUs />
        <Visit />
        <div className="md:col-span-2 w-full place-items-center2">
          <Email />
        </div>
      </div>

      {/* Map */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3033.732695635998!2d-74.2296676!3d40.5032936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24bff715c5d45%3A0xbb40fa5bcbce4aad!2sDependable%20Accounting%20Co%20Ltd!5e0!3m2!1sen!2sus!4v1767744723770!5m2!1sen!2sus"
        className="w-full h-[450px] md:max-w-2xl"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
