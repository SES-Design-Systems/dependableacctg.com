import { NextResponse } from "next/server";
import { getCalendarClient } from "@/lib/google";
import { siteConfig } from "@/config/site";
import { validateBookingEnv, ENV_ERROR_MESSAGE } from "@/lib/env";

// Calculate timezone offset in milliseconds for a given date and timezone
function getTimezoneOffset(date: Date, timezone: string): number {
  const utcTime = date.toLocaleString("en-US", { timeZone: "UTC" });
  const tzTime = date.toLocaleString("en-US", { timeZone: timezone });
  return new Date(utcTime).getTime() - new Date(tzTime).getTime();
}

// Parse time string "HH:MM" into hours and minutes
function parseTime(timeStr: string): { hour: number; minute: number } {
  const [hour, minute] = timeStr.split(':').map(Number);
  return { hour, minute: minute || 0 };
}

export async function GET(req: Request) {
  try {
    const envCheck = validateBookingEnv();
    if (!envCheck.valid) {
      console.error("Missing environment variables:", envCheck.missing);
      return NextResponse.json({ error: ENV_ERROR_MESSAGE }, { status: 503 });
    }

    const { searchParams } = new URL(req.url);
    const duration = parseInt(searchParams.get("duration") || "30");
    const date =
      searchParams.get("date") || new Date().toISOString().split("T")[0];

    // Validate date format and force local timezone
    const selectedDate = new Date(date + "T12:00:00"); // Add noon to avoid timezone shifts
    if (isNaN(selectedDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      );
    }

    // Get schedule for the selected day
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
    const dayOfWeek = selectedDate.getDay();
    const daySchedule = siteConfig.business.schedule[dayNames[dayOfWeek]];

    // Check if the day is available for booking
    if (!daySchedule) {
      return NextResponse.json({
        date: selectedDate.toISOString().split("T")[0],
        availableSlots: [],
        totalSlots: 0,
      });
    }

    const calendar = getCalendarClient();
    const { timezone } = siteConfig.business;
    const tzOffset = getTimezoneOffset(selectedDate, timezone);

    // Parse date for UTC calculations
    const [year, month, day] = date.split('-').map(Number);

    // Get calendar events for the full day in business timezone
    const timeMin = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0) + tzOffset);
    const timeMax = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999) + tzOffset);

    // Use events API instead of freebusy to get individual events
    const res = await calendar.events.list({
      calendarId: "primary",
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = res.data.items || [];

    // Convert events to busy slots, filtering out all-day events
    const busySlots: { start: string; end: string }[] = [];
    for (const event of events) {
      // Skip all-day events (they use 'date' instead of 'dateTime')
      if (event.start?.date || event.end?.date) {
        continue;
      }

      // Skip events marked as "free"
      if (event.transparency === "transparent") {
        continue;
      }

      if (event.start?.dateTime && event.end?.dateTime) {
        busySlots.push({
          start: event.start.dateTime,
          end: event.end.dateTime,
        });
      }
    }

    // Generate slots based on business hours in the configured timezone
    const openTime = parseTime(daySchedule.open);
    const closeTime = parseTime(daySchedule.close);

    // Create times in UTC, accounting for business timezone
    // tzOffset is (UTC - businessTZ), so we add it to convert business time to UTC
    const openTimeUTC = Date.UTC(year, month - 1, day, openTime.hour, openTime.minute, 0, 0) + tzOffset;
    const closeTimeUTC = Date.UTC(year, month - 1, day, closeTime.hour, closeTime.minute, 0, 0) + tzOffset;

    const slots: { start: string; end: string }[] = [];
    let current = new Date(openTimeUTC);
    const endOfDay = new Date(closeTimeUTC);

    while (current < endOfDay) {
      const slotEnd = new Date(current.getTime() + duration * 60000);

      const overlaps = busySlots.some((b) => {
        if (!b.start || !b.end) return false;
        const busyStart = new Date(b.start);
        const busyEnd = new Date(b.end);
        return busyStart < slotEnd && busyEnd > current;
      });

      const exceedsEndOfDay = slotEnd > endOfDay;

      if (!overlaps && !exceedsEndOfDay) {
        slots.push({
          start: current.toISOString(),
          end: slotEnd.toISOString(),
        });
      }

      current = new Date(current.getTime() + 30 * 60000); // move forward 30 min
    }

    return NextResponse.json({
      date: selectedDate.toISOString().split("T")[0],
      availableSlots: slots,
      totalSlots: slots.length,
    });
  } catch (err) {
    console.error("Availability check error:", err);
    const message =
      err instanceof Error ? err.message : "Failed to check availability";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
