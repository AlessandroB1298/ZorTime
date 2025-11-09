import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Event } from "@/lib/types/event";

export const createEvent = mutation({
  args: {
    id: v.string(),
    created_by: v.string(),
    type: v.string(),
    event_name: v.string(),
    start_time: v.string(),
    end_time: v.string(),
    location: v.optional(v.string()),
    isRecurring: v.boolean(),
    recurring_pattern: v.optional(v.string()),
    meetingTime: v.optional(v.string()),
    event_date: v.string(),
    event_desc: v.optional(v.string()),
    meetingUrl: v.optional(v.string()),
    priority: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("user_events", {
      created_by: args.created_by,
      id: args.id,
      type: args.type,
      event_name: args.event_name,
      start_time: args.start_time,
      end_time: args.end_time,
      location: args.location,
      isRecurring: args.isRecurring,
      recurring_pattern: args.recurring_pattern,
      meetingTime: args.meetingTime,
      meetingUrl: args.meetingUrl,
      event_date: args.event_date,
      event_desc: args.event_desc,
      priority: args.priority,
    });
  },
});

export const getUserEvents = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args): Promise<Event[]> => {
    return await ctx.db
      .query("user_events")
      .filter((q) => q.eq(q.field("created_by"), args.userId))
      .collect();
  },
});

export const deleteUserEvent = mutation({
  args: {
    id: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const event = await ctx.db
      .query("user_events")
      .filter((q) => q.eq(q.field("id"), args.id))
      .unique();

    if (event && event.created_by === args.userId) {
      await ctx.db.delete(event._id);
    }
  },
});

export const updateUserEvent = mutation({
  args: {
    id: v.string(),
    type: v.optional(v.string()),
    event_name: v.optional(v.string()),
    start_time: v.optional(v.string()),
    end_time: v.optional(v.string()),
    location: v.optional(v.string()),
    isRecurring: v.optional(v.boolean()),
    recurring_pattern: v.optional(v.string()),
    meetingTime: v.optional(v.string()),
    event_date: v.optional(v.string()),
    event_desc: v.optional(v.string()),
    meetingUrl: v.optional(v.string()),
    priority: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const event = await ctx.db
      .query("user_events")
      .filter((q) => q.eq(q.field("id"), args.id))
      .unique();

    if (event) {
      await ctx.db.patch(event._id, {
        type: args.type,
        event_name: args.event_name,
        start_time: args.start_time,
        end_time: args.end_time,
        location: args.location,
        isRecurring: args.isRecurring,
        recurring_pattern: args.recurring_pattern,
        event_date: args.event_date,
        event_desc: args.event_desc,
        meetingUrl: args.meetingUrl,
        priority: args.priority,
      });
    }
  },
});
