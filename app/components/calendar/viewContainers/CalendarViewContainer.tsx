import { useGetUserEvents } from "@/convex/queries";
import { Loader2 } from "lucide-react";
import { MonthView } from "@/app/components/calendar/views/monthView";
import { ViewType } from "@/lib/types/view";

export default function CalendarViewContainer({
  userId,
  currentDate,
}: Readonly<ViewType>) {
  const { data, isLoading, error, isError } = useGetUserEvents(userId);

  if (isLoading) {
    return (
      <div className={"flex items-center justify-center min-h-screen "}>
        <Loader2 size={45} className={"animate-spin"} />
      </div>
    );
  }
  if (isError) {
    return <div>{String(error)}</div>;
  }
  return (
    <div>
      {data && (
        <MonthView userId={userId} events={data} currentDate={currentDate} />
      )}
    </div>
  );
}
