import { match } from "node:assert";
import type { Course, Event, GroupedEvent } from "./types/event";

export type ConvertedEvent = Omit<Event, "start_time" | "end_time"> & {
  start_time: Date;
  end_time: Date;
};

export const EVENT_TYPE_COLORS: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  meeting: {
    bg: "bg-[var(--event-meeting)]",
    text: "text-[var(--event-meeting-foreground)]",
    label: "Meeting",
  },
  task: {
    bg: "bg-[var(--event-task)]",
    text: "text-[var(--event-task-foreground)]",
    label: "Task",
  },
  reminder: {
    bg: "bg-[var(--event-reminder)]",
    text: "text-[var(--event-reminder-foreground)]",
    label: "Reminder",
  },
  personal: {
    bg: "bg-[var(--event-personal)]",
    text: "text-[var(--event-personal-foreground)]",
    label: "Personal",
  },
  work: {
    bg: "bg-[var(--event-work)]",
    text: "text-[var(--event-work-foreground)]",
    label: "Work",
  },
  school: {
    bg: "bg-[var(--event-assignment)]",
    text: "text-[var(--event-work-foreground)]",
    label: "School",
  },
};

export const SCHOOL_SUB_TYPES: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  assignment: {
    bg: "bg-[var(--event-meeting)]",
    text: "text-[var(--event-meeting-foreground)]",
    label: "assignment",
  },
  meeting: {
    bg: "bg-[var(--event-task)]",
    text: "text-[var(--event-task-foreground)]",
    label: "meeting",
  },
  exam: {
    bg: "bg-[var(--event-reminder)]",
    text: "text-[var(--event-reminder-foreground)]",
    label: "exam",
  },
};

export const formattedDate = (event_date: string, time: string): Date => {
  return new Date(`${event_date}T${time}`);
};

export const getDateKey = (date: string): string => {
  const dateKeySplit = date.split("-");
  const result = new Date(
    Number(dateKeySplit[0]),
    Number(dateKeySplit[1]) - 1,
    Number(dateKeySplit[2])
  ).toISOString();
  return result;
};

export const orderDates = (
  groupedEvents: Record<string, ConvertedEvent[]>
): Record<string, ConvertedEvent[]> => {
  const dateKeys = Object.keys(groupedEvents);
  // Assuming getDateKey returns a parsable date string (e.g., "YYYY-MM-DD")
  const sortedDateKeys = dateKeys.sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA.getTime() - dateB.getTime(); // Ascending chronological order
  });

  // 3. Re-build the object in the desired order
  const orderedGroupedEvents = sortedDateKeys.reduce(
    (acc, dateKey) => {
      // Reassign the original array of events using the sorted key
      acc[dateKey] = groupedEvents[dateKey];
      return acc;
    },
    {} as Record<string, ConvertedEvent[]>
  );
  return orderedGroupedEvents;
};

export function updatedFormatTime(event: ConvertedEvent): string {
  if (event.type != "school") {
    return `${event.start_time.toLocaleTimeString()} - ${event.end_time.toLocaleTimeString()}`;
  } else {
    switch (event.schoolDetails?.schoolSubType) {
      case "assignment":
        if (event.schoolDetails.assignmentDetails) {
          const obj = Object.values(event.schoolDetails.assignmentDetails);
          const assignmentDate = new Date(obj[0]);
          const date = assignmentDate.toLocaleDateString();
          const time = assignmentDate.toLocaleTimeString();
          return `${date}-${time}`;
        }
      case "exam":
        if (event.schoolDetails.examDetails) {
          const obj = Object.values(event.schoolDetails.examDetails);
          const examDate = new Date(obj[1]);
          const date = examDate.toLocaleDateString();
          const time = examDate.toLocaleTimeString();
          return `${date}-${time}`;
        }
    }
  }
  return "";
}
export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    // 1. Compare UTC Year
    date1.getFullYear() === date2.getFullYear() &&
    // 2. Compare UTC Month
    date1.getMonth() === date2.getMonth() &&
    // 3. Compare UTC Day of the Month
    date1.getDate() === date2.getDate()
  );
}

export function getWeekDays(date: Date): Date[] {
  const day = date.getDay();
  const diff = date.getDate() - day;
  const sunday = new Date(date.setDate(diff));

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    return d;
  });
}

export function getMonthDays(date: Date): Date[] {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const days: Date[] = [];

  // Add days from previous month
  const firstDayOfWeek = firstDay.getDay();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const d = new Date(firstDay);
    d.setDate(firstDay.getDate() - i - 1);
    days.push(d);
  }

  // Add days of current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }

  // Add days from next month to complete the grid
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const d = new Date(lastDay);
    d.setDate(lastDay.getDate() + i);
    days.push(d);
  }

  return days;
}

export function getEventName(event: Event | ConvertedEvent): string {
  if (event.type == "school") {
    switch (event.schoolDetails?.schoolSubType) {
      case "assignment":
        if (event.schoolDetails.assignmentDetails) {
          const assignmentName =
            event.schoolDetails.assignmentDetails["assignmentName"];
          return event.schoolDetails.course + " " + assignmentName;
        }
      case "exam":
        if (event.schoolDetails.examDetails) {
          const examName = event.schoolDetails.examDetails["examName"];
          const course = event.schoolDetails.examDetails["course"];
          return course + " " + examName;
        }
    }
  }
  return event.event_name;
}

export function correctedUTCDate(dateString: string): Date {
  const dateArray = dateString.split("-");
  const year = dateArray[0];
  const month = parseInt(dateArray[1], 10) - 1;
  const date = dateArray[2];

  return new Date(parseInt(year), month, parseInt(date));
}
export function getEventsForDay(events: Event[], date: Date): Event[] {
  return events.filter((event) => {
    if (event.type == "school") {
      switch (event.schoolDetails?.schoolSubType) {
        case "assignment":
          if (event.schoolDetails.assignmentDetails) {
            const obj = Object.values(event.schoolDetails.assignmentDetails);
            const assignmentDate = obj[0];
            return isSameDay(new Date(assignmentDate), date);
          }
        case "exam":
          if (event.schoolDetails.examDetails) {
            const obj = Object.values(event.schoolDetails.examDetails);
            const examDate = obj[1];
            return isSameDay(new Date(examDate), date);
          }
      }
    }
    const eventDate = correctedUTCDate(event.event_date);
    return isSameDay(eventDate, date);
  });
}

export function getEventsForWeek(events: Event[], date: Date): Event[] {
  const weekDays = getWeekDays(new Date(date));
  const startOfWeek = weekDays[0];
  const endOfWeek = weekDays[6];

  return events.filter((event) => {
    const eventDate = new Date(event.start_time);
    return eventDate >= startOfWeek && eventDate <= endOfWeek;
  });
}

export function getEventsForMonth(events: Event[], date: Date): Event[] {
  const updatedDate = date.toISOString();
  const year = updatedDate.split("-")[0];
  const month = updatedDate.split("-")[1];

  return events.filter((event) => {
    if (event.type == "school") {
      switch (event.schoolDetails?.schoolSubType) {
        case "assignment":
          if (event.schoolDetails.assignmentDetails) {
            const obj = Object.values(event.schoolDetails.assignmentDetails);
            const assignmentDate = new Date(obj[0]);
            return (
              assignmentDate.toISOString().split("-")[0] === year &&
              assignmentDate.toISOString().split("-")[1] === month
            );
          }
        case "exam":
          if (event.schoolDetails.examDetails) {
            const obj = Object.values(event.schoolDetails.examDetails);
            const examDate = new Date(obj[1]);
            return (
              examDate.toISOString().split("-")[0] === year &&
              examDate.toISOString().split("-")[1] === month
            );
          }
      }
    }
    const eventDate = new Date(event.event_date);
    return (
      eventDate.toISOString().split("-")[0] === year &&
      eventDate.toISOString().split("-")[1] === month
    );
  });
}

/**
 * Groups an array of Event objects into an array of GroupedEvent objects,
 * where the category is derived from event.type.
 * @param events The array of Event objects to group.
 * @returns An array of GroupedEvent objects.
 */

export function groupEventCategory(events: Event[]): GroupedEvent[] {
  const groupedMap = new Map<string, GroupedEvent>();
  events.forEach((event) => {
    const category = event.type;
    if (groupedMap.has(category)) {
      groupedMap.get(category)!.events.push(event);
    } else {
      groupedMap.set(category, {
        category: category,
        events: [event],
        color: EVENT_TYPE_COLORS[event.type].bg,
      });
    }
  });
  const finalEventGroup: GroupedEvent[] = Array.from(groupedMap.values()).map(
    (group) => {
      return {
        ...group,
      };
    }
  );

  return finalEventGroup;
}

export function formatEventDate(
  eventDate: string,
  start_time: string,
  end_time: string
): string {
  const start = new Date(eventDate);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const start_time_readable = new Date(start_time);
  const end_time_readable = new Date(end_time);

  // Check if it's today
  const isToday = start.toDateString() === today.toDateString();
  const isTomorrow = start.toDateString() === tomorrow.toDateString();

  // Format date
  const dateStr = isToday
    ? "Today"
    : isTomorrow
      ? "Tomorrow"
      : start.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

  return `${dateStr} • ${start_time_readable.toLocaleTimeString()} - ${end_time_readable.toLocaleTimeString()}`;
}

export function capitalizeString(value: string | undefined): string {
  if (value) {
    const firstLetter = value.charAt(0).toUpperCase();
    const remainderString = value.substring(1, value.length);
    return firstLetter + remainderString;
  }
  return "";
}

export function convert24HourTo12Hour(time24h: string): string {
  if (!time24h || !time24h.includes(":")) {
    return "Invalid Time Format";
  }

  const [hourStr, minuteStr] = time24h.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  if (
    isNaN(hour) ||
    isNaN(minute) ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    return "Invalid Time Values";
  }

  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour === 0 ? 12 : hour; // Convert 0 (midnight) to 12 AM

  const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;

  return `${hour}:${formattedMinute} ${ampm}`;
}

export function convert12HourTo24Hour(time12h: string): string {
  const result = formatTime(new Date(time12h));

  const [timePart, ampmPart] = result.split(" ");

  const [hours, minutes] = timePart.split(":");

  let hourNum = parseInt(hours, 10);

  if (ampmPart === "PM" && hourNum !== 12) {
    hourNum += 12;
  } else if (ampmPart === "AM" && hourNum === 12) {
    hourNum = 0; // Midnight (12 AM) becomes 00 in 24-hour format
  }

  // Ensure hours are always two digits
  const hour24h = hourNum.toString().padStart(2, "0");

  // If seconds are not provided, default to '00'

  return `${hour24h}:${minutes}`;
}

export function parseISOString(date: string): string {
  const split_date = date.split("T");

  return split_date[0];
}

/**
 * Finds the color for a given course name from the course data array.
 * @param courseName The name of the course from the event (e.g., event.schoolDetails?.course).
 * @param courses The array of course objects containing names and colors.
 * @returns The course color string (e.g., 'bg-red-500') or a default string if not found.
 */
export const getCourseColor = (courseName: string, courses: Course[]) => {
  if (!courseName || !courses) {
    return "bg-gray-200"; // Default color if data is missing
  }

  // Use .find() to get the matching course object
  const matchingCourse = courses.find(
    (course) => course.course_name === courseName
  );

  // Return the color if a match is found, otherwise return a default color
  return matchingCourse ? matchingCourse.course_color : "bg-gray-200";
};
