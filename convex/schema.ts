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

export const eventSchema = {
  user_events: defineTable({
    created_by: v.string(),
    id: v.string(),
    type: v.string(),
    event_name: v.string(),
    start_time: v.string(),
    end_time: v.string(),
    location: v.optional(v.string()),
    isRecurring: v.boolean(),
    meetingTime: v.optional(v.string()),
    start_date: v.optional(v.string()),
    end_date: v.optional(v.string()),
    event_desc: v.optional(v.string()),
    meetingUrl: v.optional(v.string()),
    priority: v.optional(v.string()),
    recurring_pattern: v.optional(v.string()),
  }).index("byStartTime", ["start_time"]),
};

export default defineSchema({
  ...userSchema,
  ...eventSchema,
});
