"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import ReCAPTCHA from "react-google-recaptcha";
import { siteConfig } from "@/config/site";
import BookingConfirmation from "./BookingConfirmation";

const meetingType = siteConfig.meetingTypes.map(
  (type) => type.id
) as unknown as readonly [string, ...string[]];

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid Email"),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?[\d\s\-\(\)]+$/.test(val), {
      message: "Invalid phone format",
    }),
  meetingType: z.enum(meetingType, {
    message: "Please select a meeting type",
  }),
  selectedDuration: z.string().min(1, "Please select a duration"),
  selectedDate: z.string().min(1, "Please select a date"),
  selectedTime: z.string().min(1, "Please select a time"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface AvailableSlot {
  start: string;
  end: string;
}

export default function BookingForm() {
  const [selected, setSelected] = useState<Date>();
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingData, setBookingData] = useState<FormData | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const watchedMeetingType = watch("meetingType");
  const watchedDuration = watch("selectedDuration");

  // Get available durations for selected meeting type
  const availableDurations =
    siteConfig.meetingTypes.find((type) => type.id === watchedMeetingType)
      ?.duration || [];

  // Clear duration when meeting type changes
  useEffect(() => {
    setValue("selectedDuration", "", { shouldValidate: true });
    setAvailableSlots([]);
  }, [watchedMeetingType, setValue]);

  // Fetch available slots when date or duration changes
  useEffect(() => {
    if (selected && watchedDuration) {
      fetchAvailableSlots();
    } else {
      setAvailableSlots([]);
    }
  }, [selected, watchedDuration]);

  const fetchAvailableSlots = async () => {
    if (!selected || !watchedDuration) return;

    setLoadingSlots(true);
    try {
      const duration = watchedDuration;

      // Use the same local date format
      const year = selected.getFullYear();
      const month = String(selected.getMonth() + 1).padStart(2, "0");
      const day = String(selected.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;

      const response = await fetch(
        `/api/calendar/availability?date=${dateStr}&duration=${duration}`
      );
      const data = await response.json();

      if (response.ok) {
        setAvailableSlots(data.availableSlots || []);
      } else {
        console.error("Failed to fetch availability:", data.error);
        setAvailableSlots([]);
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/calendar/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setBookingData(data);
        setIsConfirmed(true);
        reset();
        setSelected(undefined);
        setAvailableSlots([]);
        setIsVerified(false);
        recaptchaRef.current?.reset();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert("Failed to create booking. Please try again.");
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelected(date);

    if (date) {
      // Use local date format instead of ISO to avoid timezone issues
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const localDateStr = `${year}-${month}-${day}`;

      setValue("selectedDate", localDateStr, { shouldValidate: true });
    } else {
      setValue("selectedDate", "", { shouldValidate: true });
    }
    setValue("selectedTime", "", { shouldValidate: true }); // Clear selected time when date changes
  };

  const formatTimeSlot = (slot: AvailableSlot) => {
    const start = new Date(slot.start);
    return start.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleCaptchaChange = async (token: string | null) => {
    try {
      if (token) {
        const response = await fetch("/api/recaptcha", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          setIsVerified(true);
        } else {
          handleCaptchaFailure();
        }
      }
    } catch {
      handleCaptchaFailure();
    }
  };

  const handleCaptchaExpired = () => {
    setIsVerified(false);
  };

  const handleCaptchaFailure = () => {
    setIsVerified(false);
    reset();
    setSelected(undefined);
    setAvailableSlots([]);
    recaptchaRef.current?.reset();
  };

  return (
    <div className="relative w-full flex justify-center">
      {isConfirmed && bookingData && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <BookingConfirmation
            date={bookingData.selectedDate}
            time={bookingData.selectedTime}
            meetingType={bookingData.meetingType}
            name={bookingData.name}
            email={bookingData.email}
            phone={bookingData.phone}
            message={bookingData.message}
            onClose={() => setIsConfirmed(false)}
          />
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-[1fr_auto] gap-4 md:max-w-2xl xl:max-w-fit"
      >
        <div className="flex flex-col items-center md:items-start justify-center gap-2 border border-grey/20 p-4 w-full full-shadow">
          {/* Name Field */}

          <div className="form-field">
            <label htmlFor="name" className="booking-form-label">
              {siteConfig.text.booking.nameLabel}*
            </label>
            <input
              {...register("name")}
              id="name"
              className="booking-form-input"
              placeholder={siteConfig.text.booking.namePlaceholder}
            />
            {errors.name && (
              <p className="error-message">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="form-field">
            <label htmlFor="email" className="booking-form-label">
              {siteConfig.text.booking.emailLabel}*
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="booking-form-input"
              placeholder={siteConfig.text.booking.emailPlaceholder}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Field */}
          <div className="form-field">
            <label htmlFor="phone" className="booking-form-label">
              {siteConfig.text.booking.phoneLabel}
            </label>
            <input
              {...register("phone")}
              type="tel"
              id="phone"
              className="booking-form-input"
              placeholder={siteConfig.text.booking.phonePlaceholder}
            />
            {errors.phone && (
              <p className="error-message">{errors.phone.message}</p>
            )}
          </div>

          {/* Meeting Type Dropdown */}
          <div className="flex flex-col items-center justify-center form-field">
            <select
              {...register("meetingType")}
              className="booking-form-input !text-sm"
            >
              <option value="">
                {siteConfig.text.booking.meetingTypeLabel}*
              </option>
              {siteConfig.meetingTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.meetingType && (
              <p className="error-message">{errors.meetingType.message}</p>
            )}
          </div>

          {/* Duration Selector */}
          {watchedMeetingType && availableDurations.length > 0 && (
            <div className="form-field">
              <label className="booking-form-label">Duration*</label>
              <div className="flex gap-3">
                {availableDurations.map((duration) => (
                  <label key={duration} className="cursor-pointer">
                    <input
                      type="radio"
                      value={duration}
                      {...register("selectedDuration")}
                      className="hidden peer"
                    />
                    <div className="px-4 py-2 border border-grey/20 rounded peer-checked:bg-[var(--color-primary)] peer-checked:text-white transition-colors">
                      {duration} min
                    </div>
                  </label>
                ))}
              </div>
              {errors.selectedDuration && (
                <p className="error-message">
                  {errors.selectedDuration.message}
                </p>
              )}
            </div>
          )}

          {/* Message Field */}
          <div className="form-field">
            <label htmlFor="message" className="booking-form-label">
              {siteConfig.text.booking.messageLabel}
            </label>
            <textarea
              {...register("message")}
              id="message"
              rows={4}
              className="booking-form-input max-h-32"
              placeholder={siteConfig.text.booking.messagePlaceholder}
            />
          </div>
        </div>

        <div className="border border-grey/20 full-shadow p-4 w-fit flex flex-col h-full md:row-span-2">
          {/* Date Picker */}
          <div>
            <label className="booking-form-label">
              {siteConfig.text.booking.dateLabel} *
            </label>
            <DayPicker
              mode="single"
              required
              selected={selected}
              onSelect={handleDateSelect}
              disabled={{ before: new Date() }}
              className="text-sm lg:text-base"
            />
            <input
              type="hidden"
              {...register("selectedDate")}
              value={selected ? selected.toLocaleDateString() : ""}
            />
            {errors.selectedDate && (
              <p className="error-message">{errors.selectedDate.message}</p>
            )}
          </div>

          {/* Time Slots */}
          <div className="flex-1 overflow-y-auto">
            <label className="booking-form-label">
              {siteConfig.text.booking.timeLabel} *
            </label>

            {!selected && (
              <p className="text-muted text-sm mb-2">
                {siteConfig.text.booking.selectDateFirst}
              </p>
            )}

            {selected && !watchedDuration && (
              <p className="text-muted text-sm mb-2">
                Please select a duration first
              </p>
            )}

            {loadingSlots && (
              <p className="loading-text">Loading available times...</p>
            )}

            {selected &&
              watchedDuration &&
              !loadingSlots &&
              availableSlots.length === 0 && (
                <p className="error-message">
                  {siteConfig.text.booking.noTimesAvailable}
                </p>
              )}

            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {availableSlots.map((slot, index) => (
                <label key={index} className="cursor-pointer">
                  <input
                    {...register("selectedTime")}
                    type="radio"
                    value={slot.start}
                    className="hidden peer"
                    disabled={Boolean(!selected)}
                  />
                  <div className="time-slot-clickable peer-checked:bg-[var(--color-primary)] peer-checked:text-white">
                    {formatTimeSlot(slot)}
                  </div>
                </label>
              ))}
            </div>
            {errors.selectedTime && (
              <p className="error-message">{errors.selectedTime.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {/* reCAPTCHA */}
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
            onChange={handleCaptchaChange}
            onExpired={handleCaptchaExpired}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={
              isSubmitting ||
              !isValid ||
              !isVerified ||
              Boolean(
                selected && watchedDuration && availableSlots.length === 0
              )
            }
            className="button-style"
          >
            <span className="button">
              {isSubmitting
                ? siteConfig.text.booking.submittingButton
                : siteConfig.text.booking.submitButton}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
