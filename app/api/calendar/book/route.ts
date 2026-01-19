import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getCalendarClient } from "@/lib/google";
import { ipRatelimit, emailRatelimit } from "@/lib/ratelimit";
import { z } from "zod";
import { siteConfig } from "@/config/site";

// Dynamically create the enum from config
const meetingTypeIds = siteConfig.meetingTypes.map((type) => type.id) as [
  string,
  ...string[]
];

// Match your form schema
const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email"),
  phone: z.string().optional(),
  meetingType: z.enum(meetingTypeIds),
  selectedDuration: z.string().min(1, "Duration is required"),
  selectedDate: z.string().min(1, "Date is required"),
  selectedTime: z.string().min(1, "Time is required"),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    // Get IP for rate limiting
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

    // Check IP rate limit (5 attempts per hour)
    const ipLimit = await ipRatelimit.limit(ip);
    if (!ipLimit.success) {
      return NextResponse.json(
        { error: "Too many requests, please try again later" },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Validate the form data
    const validatedData = bookingSchema.parse(body);
    const {
      name,
      email,
      phone,
      meetingType,
      selectedDuration,
      selectedTime,
      message,
    } = validatedData;

    // Check email rate limit (2 bookings per day)
    const emailLimit = await emailRatelimit.limit(email);
    if (!emailLimit.success) {
      return NextResponse.json(
        { error: "Too many requests, please try again later" },
        { status: 429 }
      );
    }

    // Parse the date and time
    const startTime = new Date(selectedTime);
    const now = new Date();

    // Get meeting type from config
    const meetingTypeObj = siteConfig.meetingTypes.find(
      (type) => type.id === meetingType
    );
    const meetingLabel = meetingTypeObj?.label || meetingType;

    // Duration validation: ensure duration is valid for this meeting type
    const duration = parseInt(selectedDuration, 10);
    const validDurations = meetingTypeObj?.duration || [];
    if (!validDurations.includes(duration)) {
      return NextResponse.json(
        { error: "Invalid duration for this meeting type" },
        { status: 400 }
      );
    }

    // Date/Time validation: must be in the future
    if (startTime <= now) {
      return NextResponse.json(
        { error: "Please select a future time" },
        { status: 400 }
      );
    }

    // Date/Time validation: respect minimum notice hours
    const minNoticeMs = siteConfig.business.minimumNoticeHours * 60 * 60 * 1000;
    if (startTime.getTime() - now.getTime() < minNoticeMs) {
      return NextResponse.json(
        { error: `Bookings require at least ${siteConfig.business.minimumNoticeHours} hours notice` },
        { status: 400 }
      );
    }

    // Date/Time validation: within advance booking window
    const maxAdvanceMs = siteConfig.business.advanceBookingDays * 24 * 60 * 60 * 1000;
    if (startTime.getTime() - now.getTime() > maxAdvanceMs) {
      return NextResponse.json(
        { error: `Bookings can only be made up to ${siteConfig.business.advanceBookingDays} days in advance` },
        { status: 400 }
      );
    }

    // Date/Time validation: during business hours
    const { openHour, closeHour } = siteConfig.business;
    const hour = startTime.getHours();
    if (hour < openHour || hour >= closeHour) {
      return NextResponse.json(
        { error: `Bookings are only available between ${openHour}am and ${closeHour > 12 ? closeHour - 12 + 'pm' : closeHour + 'am'}` },
        { status: 400 }
      );
    }

    // Set end time based on selected duration
    const endTime = new Date(startTime);
    endTime.setMinutes(startTime.getMinutes() + duration);

    const calendar = getCalendarClient();

    // Double-booking check: verify slot is still available
    const existingEvents = await calendar.events.list({
      calendarId: "primary",
      timeMin: startTime.toISOString(),
      timeMax: endTime.toISOString(),
      singleEvents: true,
    });

    const conflictingEvents = (existingEvents.data.items || []).filter((event) => {
      // Skip all-day events
      if (event.start?.date || event.end?.date) return false;
      // Skip events marked as "free"
      if (event.transparency === "transparent") return false;
      return true;
    });

    if (conflictingEvents.length > 0) {
      return NextResponse.json(
        { error: "This time slot is no longer available. Please select another time." },
        { status: 409 }
      );
    }

    // Create the event
    const event = {
      summary: `${meetingLabel} with ${name}`,
      description: `
Meeting Type: ${meetingLabel}
Client: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ""}
${message ? `\nMessage: ${message}` : ""}
      `.trim(),
      start: {
        dateTime: startTime.toISOString(),
        timeZone: siteConfig.business.timezone,
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: siteConfig.business.timezone,
      },
      attendees: [{ email: email, displayName: name }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 }, // 1 day before
          { method: "popup", minutes: 10 }, // 10 minutes before
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
      sendUpdates: "all", // Send email invitations
    });

    return NextResponse.json({
      success: true,
      message: "Booking confirmed!",
      event: {
        id: response.data.id,
        htmlLink: response.data.htmlLink,
        summary: response.data.summary,
        start: response.data.start?.dateTime,
        end: response.data.end?.dateTime,
      },
    });
  } catch (error) {
    console.error("Booking error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    if (error && typeof error === "object" && "code" in error && error.code === 409) {
      return NextResponse.json(
        { error: "Time slot is no longer available" },
        { status: 409 }
      );
    }

    const message = error instanceof Error ? error.message : "Failed to create booking";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
