import { useGetUserEvents } from "@/convex/queries";
import SchoolAgenda from "./schoolAgenda";
import { Loader2 } from "lucide-react";
import { useState } from "react";

type SchoolAgendaViewContainerProps={
  user_id : string,
}

export default function SchoolAgendaViewContainer({user_id}: SchoolAgendaViewContainerProps){
  const{data, isLoading, isError, error} = useGetUserEvents(user_id)
  const [currentDate, setCurrentDate] = useState(new Date());


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

  return(
    <div>
      <div className="flex items-center justify-between m-4">
          <div>
            <h1 className="mb-2">School Agenda</h1>
        </div>
      </div>
     {data && (
       <div>
         <SchoolAgenda
         userId={user_id}
         events={data}
         currentDate={currentDate}
         />
       </div>
     )}
    </div>
  )
}
