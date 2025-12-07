"use client";

import type { Event } from "@/lib/types/event";
import {
  EVENT_TYPE_COLORS,
  getMonthDays,
  getEventsForDay,
  formatDate,
  getEventName,
} from "@/lib/event-utils";
import { Card } from "@/components/ui/card";
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AgendaView } from "@/app/components/calendar/views/agenda";
import FinalEventForm from "../finalEventForm";
import { useGetUserCourses } from "@/convex/queries";
import { Loader2 } from "lucide-react";
import { getCourseColor } from "@/lib/event-utils";

interface MonthViewProps {
  events: Event[];
  currentDate: Date;
  userId: string;
}

export function MonthView({
  events,
  currentDate,
  userId,
}: Readonly<MonthViewProps>) {
  const {data, isLoading , isError , error } = useGetUserCourses(userId);
  const monthDays = getMonthDays(new Date(currentDate));
  const today = new Date();
  const currentMonth = currentDate.getMonth();

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];



  if(isLoading){
    return(
      <div className="flex items-center justify-center">
        <Loader2 className="animate-spin"/>
      </div>
    )
  }
  if(isError){
    return(
      <div className="flex items-center justify-center">
        <div>
          {error?.message+"" +error?.stack}
        </div>
      </div>
    )
  }

  return (
    <Card className="p-4 border-white">
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}
        {monthDays.map((day, index) => {
          const dayEvents = getEventsForDay(events, day);
          const isToday = day.toDateString() === today.toDateString();
          const isCurrentMonth = day.getMonth() === currentMonth;

          return (
            <Dialog key={index + 1}>
              <DialogTrigger className={"cursor-pointer"} asChild>
                <div
                  key={index + 1}
                  className={`min-h-[100px]  rounded-lg border p-2 ${
                    isToday ? "bg-popover/50 border-primary" : "bg-background/80"
                  } ${!isCurrentMonth ? "opacity-40" : ""}`}
                >
                  <div
                    className={`text-sm font-medium mb-1 ${
                      isToday ? "text-primary" : ""
                    }`}
                  >
                    {day.getDate()}
                  </div>
                  <div className="space-y-1 ">
                    {dayEvents.slice(0, 3).map((event) => {

                      const colors = EVENT_TYPE_COLORS[event.type];

                      return (
                        <div className="h-4" key={event.id}>
                          {event.type == "school"  && data && event.schoolDetails?.course ? (
                            <div>
                              <div
                                key={event.id}
                                style={{backgroundColor : getCourseColor(event.schoolDetails.course, data)}}
                                className={`text-[10px] rounded px-1 py-0.5 truncate`}
                              >
                               {event.completed ? (
                                 <>
                                   <span className="line-through">
                                     {getEventName(event)}
                                   </span>

                                 </>
                               ): (
                                 <>
                                   {getEventName(event)}
                                 </>
                               )}
                              </div>
                            </div>
                          ):(
                            <div
                              key={event.id}
                              className={`text-[10px] rounded px-1 py-0.5 truncate ${colors.bg}`}
                            >
                             {event.completed ? (
                               <>
                                 <span className="line-through">
                                   {getEventName(event)}
                                 </span>

                               </>
                             ): (
                               <>
                                 {getEventName(event)}

                               </>
                             )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {dayEvents.length > 3 && (
                      <div className="text-[10px] text-muted-foreground px-1">
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle
                  className={
                    "text-2xl font-bold text-muted-foreground flex flex-row justify-between mx-auto p-2 w-full"
                  }
                >
                  {formatDate(day)}
                  <FinalEventForm userId={userId} day={day.toISOString()} />
                </DialogTitle>
                <DialogDescription>
                  Here are all the events for today
                </DialogDescription>
                <div>
                  <AgendaView
                    userId={userId}
                    events={dayEvents}
                    currentDate={day}
                  />
                </div>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </Card>
  );
}
