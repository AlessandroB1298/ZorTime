import {AgendaView} from "@/app/components/calendar/views/agenda";
import {useGetUserEvents} from "@/convex/queries";
import {Loader2} from "lucide-react";

type AgendaViewContainerProps = {
    userId : string
    currentDate : Date
}

export default function AgendaViewContainer({ userId, currentDate}:AgendaViewContainerProps) {
    const {data, isLoading, error, isError} = useGetUserEvents(userId);

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
            {data &&  (
                <AgendaView events={data} currentDate={currentDate} />
            )}
        </div>
    )
}