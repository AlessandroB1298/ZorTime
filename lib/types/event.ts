export type EventType = "meeting" | "task" | "reminder" | "personal" | "work";
export type ReccuringType = "weekly" | "daily" | "monthly";
export type Priority = "low" | "medium" | "high";

export interface Event {
  id: string;
  type: string;
  event_name: string;
  start_time: string;
  end_time: string;
  location?: string;
  isRecurring: boolean;
  recurringPattern?: string;
  created_by: string;
  completed?: boolean;
  meetingTime?: string;
  event_date: string;
  event_desc?: string;
  meetingUrl?: string;
  attendees?: string;
  priority?: string;
  reminderTime?: string;
}

export interface GroupedEvent {
  category: string;
  color: string;
  events: Event[];
}

export type CalendarView = "today" | "week" | "month" | "agenda";

export const PRIORITYLEVEL: Record<string, { bg: string; label: string }> = {
  low: {
    label: "low",
    bg: "bg-green-500",
  },
  medium: {
    label: "medium",
    bg: "bg-orange-500",
  },
  high: {
    label: "high",
    bg: "bg-red-500",
  },
};
