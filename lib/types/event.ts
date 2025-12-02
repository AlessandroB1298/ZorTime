export type EventType =
  | "meeting"
  | "task"
  | "reminder"
  | "personal"
  | "work"
  | "school";
export type ReccuringType = "weekly" | "daily" | "monthly";
export type Priority = "low" | "medium" | "high";
export type GeneralEventType =
  | "work"
  | "personal"
  | "reminder"
  | "task"
  | "meeting";
export type SchoolSubtype = "meeting" | "assignment" | "exam";

export interface Course {
  course_name: string;
  prof: string;
  course_color: string;
  id: string;
  course_code: string;
  created_by: string;
}

export interface Event {
  id: string;
  type: GeneralEventType | "school";
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

  schoolDetails?: {
    schoolSubType: SchoolSubtype;
    course: string;

    assignmentDetails?: {
      assignmentDueDate: string;
      assignmentName: string;
    };
    examDetails?: {
      examDate: string;
      examName: string;
      course: string;
    };
  };
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

export type AssignmentKey = "assignmentDueDate" | "assignmentName";
export type ExamKey = "examDate" | "examName" | "course";
