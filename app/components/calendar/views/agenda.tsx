"use client";

import { PRIORITYLEVEL, type Event } from "@/lib/types/event";
import {
  EVENT_TYPE_COLORS,
  formatTime,
  formatDate,
  getEventsForMonth,
} from "@/lib/event-utils";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Calendar, Repeat, Trash2 } from "lucide-react";
import EditEventForm from "@/app/components/calendar/EditEvent";
import { useDeleteUserEvent } from "@/convex/mutations";

export interface AgendaViewProps {
  events: Event[];
  currentDate: Date;
  userId: string;
}

type ConvertedEvent = Omit<Event, "start_time" | "end_time"> & {
  start_time: Date;
  end_time: Date;
};

export function AgendaView({
  events,
  currentDate,
  userId,
}: Readonly<AgendaViewProps>) {
  const rawMonthEvents = getEventsForMonth(events, currentDate);
  const deleteEvent = useDeleteUserEvent();

  const monthEvents: ConvertedEvent[] = rawMonthEvents
    .map((event) => ({
      ...event,
      start_time: new Date(event.start_time),
      end_time: new Date(event.end_time),
    }))
    .sort((a, b) => a.start_time.getTime() - b.start_time.getTime());

  if (monthEvents.length === 0) {
    return (
      <Card className="p-12 text-center bg-primary border-secondary">
        <p className="text-background/50">No events scheduled</p>
      </Card>
    );
  }

  // Group events by date
  const groupedEvents = monthEvents.reduce(
    (acc, event) => {
      const dateKey = event.start_time.toDateString();
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    },
    {} as Record<string, ConvertedEvent[]>,
  );

  return (
    <Card className="overflow-hidden border dark:border-white border-muted">
      <div className="divide-y divide-border">
        {Object.entries(groupedEvents).map(([dateKey, dayEvents]) => (
          <div key={dateKey} className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold">{formatDate(new Date(dateKey))}</h3>
            </div>
            <div className="space-y-3 ml-6">
              {dayEvents.map((event) => {
                const colors = EVENT_TYPE_COLORS[event.type];
                return (
                  <div
                    key={event.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-primary/50"
                  >
                    <div
                      className={`h-10 w-1 rounded-full ${colors.bg} flex-shrink-0`}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`h-2 w-2 rounded-full ${colors.bg}`} />
                        <span className="text-xs font-medium text-muted-foreground uppercase">
                          {colors.label}
                        </span>

                        {event.priority && (
                          <div className="flex flex-row items-center gap-2">
                            <div
                              className={`h-2 w-2 rounded-full ${PRIORITYLEVEL[event.priority].bg}`}
                            ></div>
                            <div className="text-xs font-medium uppercase">
                              {event.priority}
                            </div>
                          </div>
                        )}
                        {event.isRecurring && (
                          <Repeat className="h-3 w-3 text-muted-foreground" />
                        )}
                      </div>

                      <h4 className="font-semibold mb-2">{event.event_name}</h4>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          <span>
                            {formatTime(event.start_time)} -{" "}
                            {formatTime(event.end_time)}
                          </span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <EditEventForm
                        event={{
                          id: event.id,
                          type: event.type,
                          event_date: event.event_date,
                          created_by: event.created_by,
                          event_name: event.event_name,
                          start_time: event.start_time.toLocaleTimeString(),
                          end_time: event.end_time.toLocaleTimeString(),
                          event_desc: event.event_desc,
                          priority: event.priority,
                          location: event.location,
                          isRecurring: event.isRecurring,
                          recurringPattern: event.recurringPattern,
                        }}
                      />
                      <Trash2
                        onClick={() => {
                          deleteEvent.mutate({
                            id: event.id,
                            userId: userId,
                          });
                        }}
                        className="hover:text-red-600 hover:cursor-pointer"
                        size={25}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
