import { NextResponse } from "next/server";
import { getCalendarClient } from "@/lib/google";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const duration = parseInt(searchParams.get("duration") || "30");
    const date =
      searchParams.get("date") || new Date().toISOString().split("T")[0];

    console.log("[Availability] Request params:", { date, duration });

    // Validate date format and force local timezone
    const selectedDate = new Date(date + 'T12:00:00'); // Add noon to avoid timezone shifts
    if (isNaN(selectedDate.getTime())) {
      console.log("[Availability] Invalid date format");
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

    console.log("[Availability] Query range:", {
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
    });

    // Use events API instead of freebusy to get individual events
    const res = await calendar.events.list({
      calendarId: "primary",
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = res.data.items || [];
    console.log("[Availability] All events from Google:", events.map(e => ({
      summary: e.summary,
      start: e.start,
      end: e.end,
    })));

    // Convert events to busy slots, filtering out all-day events
    const busySlots: { start: string; end: string }[] = [];
    for (const event of events) {
      // Skip all-day events (they use 'date' instead of 'dateTime')
      if (event.start?.date || event.end?.date) {
        console.log("[Availability] Ignoring all-day event:", event.summary);
        continue;
      }

      // Skip events marked as "free"
      if (event.transparency === "transparent") {
        console.log("[Availability] Ignoring free event:", event.summary);
        continue;
      }

      if (event.start?.dateTime && event.end?.dateTime) {
        busySlots.push({
          start: event.start.dateTime,
          end: event.end.dateTime,
        });
      }
    }
    console.log("[Availability] Busy slots (excluding all-day):", busySlots);

    // Generate slots (9am–5pm)
    const slots: { start: string; end: string }[] = [];
    let current = new Date(selectedDate);
    current.setHours(9, 0, 0, 0);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(17, 0, 0, 0);

    console.log("[Availability] Generating slots:", {
      slotStart: current.toISOString(),
      slotEnd: endOfDay.toISOString(),
      duration,
    });

    while (current < endOfDay) {
      const slotEnd = new Date(current.getTime() + duration * 60000);

      // Fix the type safety issue
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
      } else {
        console.log("[Availability] Slot skipped:", {
          slotStart: current.toISOString(),
          slotEnd: slotEnd.toISOString(),
          reason: overlaps ? "overlaps with busy" : "exceeds end of day",
        });
      }

      current = new Date(current.getTime() + 30 * 60000); // move forward 30 min
    }

    console.log("[Availability] Final result:", {
      date: selectedDate.toISOString().split("T")[0],
      totalSlots: slots.length,
      slots: slots.map(s => new Date(s.start).toLocaleTimeString()),
    });

    return NextResponse.json({
      date: selectedDate.toISOString().split("T")[0],
      availableSlots: slots,
      totalSlots: slots.length,
    });
  } catch (err) {
    console.error("Availability check error:", err);
    const message = err instanceof Error ? err.message : "Failed to check availability";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
