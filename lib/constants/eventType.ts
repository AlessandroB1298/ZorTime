export type baseEventType = {
  Id?: Number;
  Subject?: string;
  location?: string;
  StartTime?: Date;
  EndTime?: Date;
  Color: string;
  RecurrenceRule?: string;
};

export interface AssignmentEvent extends baseEventType {
  eventType: "assignment-event"; // Discriminator
  assignmentTitle: string;
  locked_at: Date;
  courseId: string;
  submissionType: string;
  Color: "#FF0000";
}

export interface ReminderEvent extends baseEventType {
  eventType: "reminder-event"; // Discriminator
  importance: "Critical" | "Medium" | "Nonurgent";
}

export interface PersonalEvent extends baseEventType {
  eventType: "personal-event";
}

// The main 'eventType' is now a union of all possible specific event types
export type EventType = AssignmentEvent | ReminderEvent | PersonalEvent;

// Example data with the new types
export const data: EventType[] = [
  {
    Subject: "Assignment",
    Id: 1,
    location: "Office",
    eventType: "assignment-event",
    StartTime: new Date(2025, 10, 1, 9, 30),
    EndTime: new Date(2025, 10, 1, 11, 30),
    Color: "#FF0000",
    courseId: "002",
    assignmentTitle: "blog entry",
    locked_at: new Date(2025, 10, 1, 10, 30),
    submissionType: "text file",
  },
  {
    Subject: "Personal",
    location: "Office",
    eventType: "personal-event",
    Color: "#008000",
    Id: 2,
    StartTime: new Date(2025, 10, 20, 11, 0),
    EndTime: new Date(2025, 10, 20, 15, 0),
  },
  {
    Subject: "Call with Bob",
    location: "Phone",
    eventType: "reminder-event",
    Color: "#800080",
    Id: 3,
    StartTime: new Date(2025, 10, 22, 10, 0),
    EndTime: new Date(2025, 10, 22, 10, 30),
    importance: "Critical",
  },
];
