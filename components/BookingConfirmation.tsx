import { CalendarCheck, X } from "lucide-react";
import { siteConfig } from "@/config/site";

interface Confirm {
  date: string;
  time: string;
  meetingType: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  onClose: () => void;
}

export default function BookingConfirmation({
  date,
  time,
  meetingType,
  name,
  email,
  phone,
  message,
  onClose,
}: Confirm) {
  // Convert string date to formatted date
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Convert string time to formatted time
  const formattedTime = new Date(time).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="relative w-[360px] lg:w-[460px] h-fit bg-white flex flex-col items-center justify-start rounded-xl gap-10 py-10 px-3 full-shadow">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-black transition-colors cursor-pointer"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      <div className="flex flex-col items-center justify-between lg:justify-start gap-4 w-full">
        <CalendarCheck className="text-green-700 size-18" />
        <div className="text-xl text-center text-black">
          {name.split(" ")[0]}, we&apos;ve confirmed your appointment.
        </div>
      </div>
      <div className="grid grid-cols-[1fr_40px_1fr] place-items-center w-full">
        <div className="font-bold text-black text-2xl">{formattedTime}</div>
        <span className="bg-gray-400 h-7 w-0.5" />
        <div className="font-bold text-black text-center text-2xl">
          {siteConfig.business.businessInfo.name}
        </div>
      </div>
      <div className="flex flex-col items-center gap-5 w-full">
        <div className="flex flex-col items-center justify-between gap-3 text-lg w-full text-gray-500">
          <div>{formattedDate}</div>
          <div className="flex items-center justify-center gap-3 w-full">
            <div className="text-center">
              {siteConfig.business.businessInfo.address}
            </div>
            <span className="bg-gray-400 h-6 w-0.5" />
            <div className="text-center">{siteConfig.business.businessInfo.city}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
