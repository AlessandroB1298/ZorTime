import { Event } from "@/lib/types/event"
import { useEffect, useState } from "react"
import { AgendaView } from "../calendar/views/agenda";
import { Loader2 } from "lucide-react";

type SchoolAgendaProps={
  events : Event[],
  currentDate : Date,
  userId : string
}

export default function SchoolAgenda({events, currentDate, userId} : SchoolAgendaProps){
  const [schoolEvents, setEvents] = useState<Event[]>();

  useEffect(()=>{
    const updatedEvents: Event[] = events.filter(event=> event.type == "school")
    setEvents(updatedEvents);

  },[events])

  return(
    <div>

     {schoolEvents ? (
      <div className="m-8">
        <AgendaView
          events={schoolEvents}
          currentDate={currentDate}
          userId={userId}
        />
      </div>
     ) : (
       <div>
         <Loader2 className="animate-spin"/>
       </div>
     )}
    </div>
  )
}
