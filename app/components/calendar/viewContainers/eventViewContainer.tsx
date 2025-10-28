"use client"
import {useGetUserEvents} from "@/convex/queries";
import {Loader2} from "lucide-react";
import {EventContainer} from "@/app/components/calendar/viewContainers/eventContainer";
import {GroupedEvent} from "@/lib/types/event";
import {useEffect, useState} from "react";
import {groupEventCategory} from "@/lib/event-utils";

type eventViewContainerProps = {
    userId : string
}


export default function EventViewContainer({ userId}:eventViewContainerProps) {
    const {data, isLoading, error, isError} = useGetUserEvents(userId);
    const[groupedData, setGroupedData] = useState<GroupedEvent[]>();

    useEffect(()=>{
        if(data){
            const groupedEvents =  groupEventCategory(data);
            setGroupedData(groupedEvents)
        }
    },[data])
    if(isLoading){
        return (
            <div className={"flex items-center justify-center min-h-screen "}>
                <Loader2 size={45} className={"animate-spin"}/>
            </div>
        )
    }
    if(isError){
        return(
            <div>
                {String(error)}
            </div>
        )
    }


    return (
        <div>
            {groupedData &&  (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedData.map((event, index) => (
                        <div key={index+1}>
                            <EventContainer category={event.category} color={event.color} events={event.events} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}