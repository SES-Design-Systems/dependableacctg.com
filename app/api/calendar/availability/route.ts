import { NextResponse } from "next/server";
import { getCalendarClient } from "@/lib/google";
import { siteConfig } from "@/config/site";

export async function GET(req: Request) {
  try {
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

    const calendar = getCalendarClient();

    const timeMin = new Date(selectedDate);
    timeMin.setHours(0, 0, 0, 0);
    const timeMax = new Date(selectedDate);
    timeMax.setHours(23, 59, 59, 999);

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

    // Generate slots based on business hours
    const { openHour, closeHour } = siteConfig.business;
    const slots: { start: string; end: string }[] = [];
    let current = new Date(selectedDate);
    current.setHours(openHour, 0, 0, 0);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(closeHour, 0, 0, 0);

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
