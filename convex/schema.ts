import { defineTable, defineSchema } from "convex/server";
import { v } from "convex/values";

export const userSchema = {
  users: defineTable({
    email: v.string(),
    clerkUserId: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  }).index("byClerkUserId", ["clerkUserId"]),
};

export const assignmentSchema = {
  user_assignments: defineTable({
    created_by: v.string(),
    id: v.string(),
    assignment_name: v.string(),
    assginment_due_date: v.string(),
    course: v.string(),
    notes: v.string(),
    priority: v.string(),
  }),
};

export const courseSchema = {
  user_courses: defineTable({
    created_by: v.string(),
    id: v.string(),
    course_color: v.string(),
    course_name: v.string(),
    prof: v.string(),
    course_code: v.string(),
  }),
};

export const eventSchema = {
  user_events: defineTable({
    created_by: v.string(),
    type: v.string(),
    id: v.string(),
    event_name: v.string(),
    start_time: v.string(),
    end_time: v.string(),
    location: v.optional(v.string()),
    isRecurring: v.boolean(),
    meetingTime: v.optional(v.string()),
    event_date: v.string(),
    event_desc: v.optional(v.string()),
    meetingUrl: v.optional(v.string()),
    priority: v.optional(v.string()),
    recurring_pattern: v.optional(v.string()),
    schoolDetails: v.optional(
      v.object({
        schoolSubType: v.string(),
        course: v.string(),

        assignmentDetails: v.object({
          assginmentDueDate: v.string(),
          assignmentName: v.string(),
        }),
      }),
    ),
  }).index("byStartTime", ["start_time"]),
};

export default defineSchema({
  ...userSchema,
  ...eventSchema,
  ...courseSchema,
  ...assignmentSchema,
});
