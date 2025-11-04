import { Card } from "@/components/ui/card";
import { GroupedEvent } from "@/lib/types/event";
import { Calendar1, MapPin, Repeat } from "lucide-react";
import { formatEventDate } from "@/lib/event-utils";

export function EventContainer(props: Readonly<GroupedEvent>) {
  return (
    <div>
      <Card className={`rounded-2xl p-6 ${props.color} shadow-sm border-0`}>
        <h2 className="mb-4 font-bold">{props.category.toUpperCase()}</h2>
        <div className="space-y-3">
          {props.events.length === 0 ? (
            <p className="text-gray-500 text-sm">No events yet</p>
          ) : (
            props.events.map((event) => (
              <div
                key={event.id}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 hover:bg-white/90 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={event.completed || false}
                    className="w-5 h-5 rounded-md border-2 border-gray-300 mt-0.5 flex-shrink-0"
                    readOnly
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p
                        className={
                          event.completed
                            ? "line-through text-gray-500"
                            : "text-gray-800"
                        }
                      >
                        {event.event_name}
                      </p>
                      {event.isRecurring && (
                        <Repeat className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      )}
                    </div>
                    <div className="mt-2 space-y-1.5">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Calendar1 className="w-4 h-4 flex-shrink-0" />
                        {event.event_date && (
                          <span>
                            {formatEventDate(
                              event.event_date,
                              event.start_time,
                              event.end_time,
                            )}
                          </span>
                        )}
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                      {event.isRecurring && event.recurringPattern && (
                        <div className="text-gray-500 text-sm ml-6">
                          {event.recurringPattern}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
